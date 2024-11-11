import type { Option } from "../utils";
import { useQuery, Query, QueryOptions, Debounce } from "searchpal-lib";
import { useRef } from "react";
import {
  isArray,
  isEqual,
  isError,
  isNumber,
  isPlainObject,
  omit,
  pick,
} from "amenities";

const search = (options: Option[], term: string) =>
  options.filter((option) => option.label.includes(term));

const makeSearch =
  (options: Option[], delay = 500) =>
  async (term: string): Promise<Option[]> => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return search(options, term);
  };

type Merge<T> = T & {};

type NoNever<T> = Merge<{
  [K in keyof T as T[K] extends never ? never : K]: T[K];
}>;

type Serialize<T> = T extends Function
  ? never
  : T extends (infer U)[]
    ? Serialize<U>[]
    : T extends Record<string, any>
      ? NoNever<{
          [K in Extract<keyof T, string | number>]: Serialize<T[K]>;
        }> & {}
      : Extract<T, string | number | boolean>;

export type QueryStateError = { name: string };

export type QueryState = Serialize<Query> & {
  error?: QueryStateError;
};

export type QuerySpecProps = Omit<QueryOptions, "debounce"> & {
  options: Option[];
  requestTime?: number;
  debounce?:
    | number
    | ({
        default: number;
      } & {
        [query: string]: number;
      });
};

const serialize = (query: Query) => {
  let data: Partial<Query> = { ...query };
  if (data.error) {
    const { error } = data;
    data.error = {
      name: isError(error) ? error.name : String(error),
    };
  }

  return JSON.stringify(omit(data, "setQuery", "reset", "inputProps.onChange"));
};

const QuerySpec = ({
  options,
  requestTime = 100,
  debounce,
  ...props
}: QuerySpecProps) => {
  const search = makeSearch(options, requestTime);

  let queryDebounce: Debounce = 0;
  if (isPlainObject(debounce)) {
    const map = debounce;
    queryDebounce = (query) => map[query] ?? map.default;
  } else if (isNumber(debounce)) {
    queryDebounce = debounce;
  }

  const throwNextError = useRef(false);

  const query = useQuery(
    async (term) => {
      if (throwNextError.current) {
        throwNextError.current = false;
        throw new Error("This is a test error");
      }
      return search(term);
    },
    {
      ...props,
      format: (query) => query.trim(),
      debounce: queryDebounce,
    }
  );

  return (
    <>
      <input {...query.inputProps} />
      <button id="reset" onClick={() => query.reset()}>
        Reset
      </button>
      <button
        id="throw-next"
        onClick={() => {
          throwNextError.current = true;
        }}
      >
        Throw
      </button>
      <pre id="state">{serialize(query)}</pre>
    </>
  );
};

export { QuerySpec };
export type { Option };
