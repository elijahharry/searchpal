import {
  ChangeEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useEncase } from "./util/useEncase";
import { isNumber } from "amenities";
import { noop } from "./util/noop";
import { resolve } from "./util/resolve";

interface QueryOptions<I = any> {
  debounce?: Debounce;
  format?(query: string): string;
  initialItems?: I[];
  // initialQuery?: string;
}

interface QueryInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

type Query<I = any> = {
  items: I[];
  query: string;
  setQuery(action: SetStateAction<string>): void;
  inputProps: QueryInputProps;
  isLoading: boolean;
  isFetching: boolean;
  isWaiting: boolean;
  isNotFound: boolean;
  isStale: boolean;
  isError: boolean;
  error?: unknown;
  /** Clears the query and resets the search state. */
  reset(): void;
};

type SearchState<I> = {
  loading: false | { term: string };
  fetching: boolean;
  waiting: boolean;
  error?: unknown;
  term: string;
  items: I[];
};

const emptySearch: Omit<SearchState<any>, "index"> = {
  term: "",
  items: [],
  loading: false,
  fetching: false,
  waiting: false,
};

type DynamicDebounce = (query: string) => number;

type Debounce = number | DynamicDebounce;

const withDebounce = (
  query: string,
  fn: (query: string) => void,
  debounce: Debounce
) => {
  const delay = isNumber(debounce) ? debounce : debounce(query);
  if (delay > 0) {
    const timer = setTimeout(() => fn(query), delay);
    return () => clearTimeout(timer);
  }
  fn(query);
  return noop;
};

const returnInitial = <R>(value: R) => value;

const useQuery = <Item>(
  getItems: (query: string) => Promise<Item[]> | Item[],
  options: QueryOptions<Item> = {}
): Query<Item> => {
  const [search, setSearch] = useState<SearchState<any>>(emptySearch);

  const { initialItems, format = returnInitial } = options;
  const [query, setQuery] = useState("");

  const get = useEncase(getItems);

  const term = format(query);

  useEffect(() => {
    if (term.length === 0) {
      return setSearch(emptySearch);
    }

    const cancelled: { current?: boolean } = {};

    setSearch((prev) => ({
      ...prev,
      loading: { term },
      waiting: true,
    }));

    const cancelDebounce = withDebounce(
      term,
      async (term) => {
        if (cancelled.current) return;
        setSearch((prev) => ({ ...prev, fetching: true, waiting: false }));
        let updates: Partial<SearchState<Item>>;
        try {
          const items = await resolve(get.current, term);
          updates = { items, term, error: void 0 };
        } catch (error) {
          updates = { error };
        }
        if (cancelled.current) return;
        setSearch((prev) => {
          return {
            ...prev,
            ...updates,
            loading: false,
            fetching: false,
          };
        });
      },
      options.debounce ?? 300
    );

    return () => {
      cancelled.current = true;
      cancelDebounce();
    };
    // The 'empty' dependency is purposefully omitted. The methods it calls are persistent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setQuery(event.target.value),
    []
  );

  const prevNotFound = useRef<true | undefined>();

  const isStale = search.term !== term;

  const status = useMemo(() => {
    let { items, fetching, loading, term, error, waiting } = search,
      notFound: boolean;

    if (term.length > 0) {
      notFound =
        !items.length &&
        (prevNotFound.current || !loading || loading.term === term);
    } else {
      if (!items.length && initialItems) {
        items = initialItems;
      }
      notFound = false;
    }

    prevNotFound.current = notFound ? true : void 0;

    return {
      items,
      isWaiting: waiting,
      isFetching: fetching,
      isNotFound: notFound,
      isLoading: !!loading,
      error,
      isError: !!error,
    };
  }, [initialItems, search]);

  const reset = useCallback(() => {
    setQuery("");
    setSearch(emptySearch);
  }, []);

  return {
    query,
    setQuery,
    ...status,
    isStale,
    inputProps: { value: query, onChange },
    reset,
  };
};

export {
  useQuery,
  type Query,
  type QueryOptions,
  type QueryInputProps,
  type Debounce,
  type DynamicDebounce,
};
