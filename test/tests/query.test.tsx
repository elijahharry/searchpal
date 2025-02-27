import { expect, test } from "@playwright/experimental-ct-react";
import { QuerySpec, QuerySpecProps, Option, QueryState } from "./query.spec";
import { ElementHandle, makeOptions, Page, retry, withTrace } from "../utils";
import { isFunction, keys, pick } from "hoolock";

type CompareQuery = Partial<QueryState>;
type GetQuery = () => Promise<QueryState>;
type IsQuery = (query: CompareQuery) => Promise<void>;
type After = (ms: number) => {
  is: IsQuery;
};

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

const obscure = () =>
  Array.from({ length: 10 }, () =>
    Math.random().toString(36).substring(2, 15)
  ).join("");

function queries<P extends QuerySpecProps>(
  name: string,
  props: P | (() => P),
  fn: (ctx: {
    props: P;
    options: Option[];
    input: ElementHandle<HTMLInputElement>;
    page: Page;
    wait(ms: number): Promise<void>;
    reset(): Promise<void>;
    /** Will throw an error the next time the search function is called */
    throwNext(): Promise<void>;
    get: GetQuery;
    is: IsQuery;
    after: After;
  }) => void | Promise<void>
) {
  const getProps = isFunction(props) ? props : () => props;

  test(name, async ({ page, mount }, t) => {
    const props = getProps();
    await mount(<QuerySpec {...props} />);

    const parse = async () => {
      const pre = (await page.$("pre#state"))!;
      expect(pre).toBeTruthy();
      const state = await pre.evaluate((node) => JSON.parse(node.textContent!));
      return state as QueryState;
    };

    const compare = async (compare: CompareQuery) => {
      const state = await parse();
      expect(pick(state, ...keys(compare))).toEqual(compare);
    };

    const get = withTrace(() => parse());

    const is = withTrace(async (query: CompareQuery) => compare(query));

    const after = (ms: number) => ({
      is: withTrace(async (q: any) => {
        await waitFor(ms);
        await retry(() => compare(q), 3, 10);
      }),
    });

    const input = (await page.$("input"))!;
    expect(input).toBeTruthy();

    const [reset, throwNext] = await Promise.all(
      ["reset", "throw-next"].map(async (id) => {
        const node = await page.$(`#${id}`);
        if (!node) {
          throw new Error(`Button not found: #${id}`);
        }
        return async () => {
          await node.click();
        };
      })
    );

    const wait = (ms: number) => page.waitForTimeout(ms);

    await fn({
      props,
      options: props.options,
      input: (await page.$("input"))!,
      is,
      after,
      get,
      reset,
      throwNext,
      page,
      wait,
    });
  });
}

queries(
  "searches for options",
  {
    options: makeOptions(20),
    debounce: 0,
    requestTime: 100,
  },
  async ({ options, input, is, wait, after }) => {
    await is({
      items: [],
      query: "",
      isStale: false,
      isLoading: false,
      isFetching: false,
      isNotFound: false,
      isError: false,
    });

    const option = options[0];

    await input.fill(option.label);

    await is({
      items: [],
      query: option.label,
      isStale: true,
      isLoading: true,
      isFetching: true,
      isNotFound: false,
      isError: false,
    });

    await after(100).is({
      items: [option],
      query: option.label,
      isStale: false,
      isLoading: false,
      isFetching: false,
      isNotFound: false,
      isError: false,
    });

    const notFound = obscure();

    await input.fill(notFound);

    await is({
      query: notFound,
      items: [option],
      isLoading: true,
      isFetching: true,
      isNotFound: false,
      isError: false,
    });

    await after(100).is({
      query: notFound,
      items: [],
      isLoading: false,
      isFetching: false,
      isNotFound: true,
      isError: false,
    });
  }
);

queries(
  "debounces search",
  {
    options: makeOptions(20),
    requestTime: 100,
    debounce: 200,
  },
  async ({ options, input, is, after, props }) => {
    const [initial] = options;

    await is({
      query: "",
      items: [],
      isLoading: false,
      isWaiting: false,
      isFetching: false,
    });

    await input.fill(initial.label);

    await is({
      query: initial.label,
      items: [],
      isLoading: true,
      isWaiting: true,
      isFetching: false,
    });

    await after(props.debounce).is({
      query: initial.label,
      items: [],
      isLoading: true,
      isWaiting: false,
      isFetching: true,
    });

    await after(props.requestTime).is({
      items: [initial],
      isLoading: false,
      isWaiting: false,
      isFetching: false,
    });
  }
);

queries(
  "uses debounce callback",
  () => {
    const options = makeOptions(20);
    return {
      options,
      requestTime: 100,
      debounce: {
        default: 0,
        [options[0].label]: 200,
      },
    };
  },
  async ({ options, input, is, after }) => {
    const [debounce, ...noDebounce] = options;

    await is({ items: [] });

    await input.fill(debounce.label);

    await is({
      items: [],
      isLoading: true,
      isWaiting: true,
      isFetching: false,
    });

    await after(200).is({
      items: [],
      isLoading: true,
      isWaiting: false,
      isFetching: true,
    });

    await after(100).is({
      items: [debounce],
      isLoading: false,
      isWaiting: false,
      isFetching: false,
    });

    for (const none of noDebounce.slice(0, 4)) {
      await input.fill(none.label);
      await is({
        query: none.label,
        isLoading: true,
        isWaiting: false,
        isFetching: true,
      });
      await after(100).is({
        query: none.label,
        items: [none],
        isLoading: false,
        isWaiting: false,
        isFetching: false,
      });
    }
  }
);

queries(
  "uses initial results",
  () => {
    const options = makeOptions(20);
    return {
      options,
      initialItems: options.slice(0, 5),
      requestTime: 200,
      debounce: 200,
    };
  },
  async ({ options, input, props, is, after }) => {
    const update = options[6];

    await is({
      items: props.initialItems,
      query: "",
      isLoading: false,
      isNotFound: false,
    });

    await input.fill(update.label);

    await is({
      items: props.initialItems,
      query: update.label,
      isLoading: true,
      isWaiting: true,
      isFetching: false,
      isNotFound: false,
    });

    await after(props.debounce).is({
      items: props.initialItems,
      query: update.label,
      isLoading: true,
      isWaiting: false,
      isFetching: true,
      isNotFound: false,
    });

    await after(props.requestTime).is({
      items: [update],
      query: update.label,
      isLoading: false,
      isWaiting: false,
      isFetching: false,
      isNotFound: false,
    });

    const notFound = obscure();

    await input.fill(notFound);

    await is({
      query: notFound,
      items: [update],
      isLoading: true,
      isWaiting: true,
      isFetching: false,
      isNotFound: false,
    });

    await after(props.debounce).is({
      query: notFound,
      items: [update],
      isLoading: true,
      isWaiting: false,
      isFetching: true,
      isNotFound: false,
    });

    await after(props.requestTime).is({
      query: notFound,
      items: [],
      isLoading: false,
      isWaiting: false,
      isFetching: false,
      isNotFound: true,
    });

    await input.fill("");

    await is({
      items: props.initialItems,
      query: "",
      isLoading: false,
      isWaiting: false,
      isFetching: false,
      isNotFound: false,
    });
  }
);

queries(
  "handles errors",
  {
    options: makeOptions(20),
    requestTime: 100,
    debounce: 0,
  },
  async ({ throwNext, input, options, is, after, props }) => {
    const [a, b, c] = options;

    await is({ isError: false, error: undefined, query: "" });

    await input.fill(a.label);

    await is({
      isError: false,
      error: undefined,
      query: a.label,
      isLoading: true,
    });

    await after(props.requestTime).is({ items: [a], isLoading: false });

    await throwNext();

    await input.fill(b.label);

    await is({
      items: [a],
      isError: true,
      error: { name: "Error" },
      isLoading: false,
    });

    await input.fill(c.label);

    await is({
      items: [a],
      isError: true,
      error: { name: "Error" },
      isStale: true,
      isLoading: true,
    });

    await after(150).is({
      items: [c],
      isError: false,
      error: undefined,
      isStale: false,
      isLoading: false,
    });
  }
);

queries(
  "resets",
  {
    options: makeOptions(20),
    requestTime: 100,
    debounce: 0,
  },
  async ({ input, options, reset, is, after, props }) => {
    await is({ query: "", items: [] });

    const [option] = options;

    await input.fill(option.label);

    await after(props.requestTime).is({ query: option.label, items: [option] });

    await reset();

    await is({ query: "", items: [] });
  }
);
