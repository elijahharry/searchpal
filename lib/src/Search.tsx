import {
  ReactNode,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
  Provider,
  useEffect,
} from "react";
import { isDefined, isFunction } from "hoolock";
import { useMounted } from "./util/useMounted";
import { error } from "./util/notice";
import { ColorScheme, StylesProvider, WithStyle } from "./Styles";
import { useEventListener } from "./util/useEventListener";
import { useSearchState } from "./useSearchState";
import type {
  Ids,
  Option,
  SearchState,
  Nodes,
  Options,
  OptionMap,
} from "./useSearchState";
import { useStableCallback } from "./util/useStableCallback";
import { resolve, resolveOptional } from "./util/resolve";
import { startTimeout } from "./util/startTimeout";

type ContextCallback<Params extends any[] = [], Data = any> = (
  ...args: [...Params, search: Search<Data>]
) => void | Promise<void>;

type Callback<A extends any[]> = (...args: A) => void | Promise<void>;

type KeyDownCallback<Data = any> = Callback<
  [e: KeyboardEvent, search: Search<Data>]
>;

type SubmitCallback<Data = any> = Callback<
  [option: Option<Data>, search: Search<Data>]
>;

type ChangeCallback<Data = any> = Callback<
  [option: Option<Data> | null, search: Search<Data>]
>;

type CloseCallback<Data = any> = Callback<[search: Search<Data>]>;

type OpenCallback<Data = any> = Callback<[search: Search<Data>]>;

interface SearchProps<Data = any> extends WithStyle {
  open?: boolean;
  setOpen?(open: boolean): void;
  children?: ReactNode;
  colorScheme?: ColorScheme;
  /**
   * Custom callback to handle the submission of an option. An option is submitted when a user:
   * - Clicks on an option
   * - Presses the `Enter` key while an option is selected
   */
  onSubmit?: SubmitCallback<Data>;
  /**
   * Custom callback to handle changes to the selected option. This callback is called whenever an option is selected or unselected, which can occur when a user:
   * - Hovers over an option
   * - Navigates via the keyboard: `ArrowUp`, `ArrowDown`, `Home`, `End`
   */
  onChange?: ChangeCallback<Data>;
  /**
   * Apply your own logic to handle keydown events.
   *
   * To cancel the default behavior, run `e.preventDefault()`.
   */
  onKeyDown?: KeyDownCallback;
  onClose?: CloseCallback<Data>;
  onOpen?: OpenCallback<Data>;
}

interface Search<Data = any> extends SearchState<Data> {
  isOpen: boolean;
  isVisible: boolean;
  setOpen(open: boolean): void;
  close(): void;
  open(): void;
  select(id: string): void;
  unselect(id?: string): void;
  submit(id: string): Promise<void>;
}

interface SearchMethods<Data = any> {
  setId(key: keyof Ids, id: string): () => void;
  setNode(key: keyof Nodes, node: HTMLElement | null): () => void;
  setOption(option: Option<Data>): () => void;
  setSelected(id: string): void;
  removeSelected(id?: string): void;
  submit(id: string): void;
  setTriggerEvent(e: MouseEvent): void;
}

function Search<Data = any>({
  open: propOpen,
  setOpen: setPropOpen,
  children,
  noStyle,
  colorScheme,
  onSubmit,
  onChange,
  onKeyDown,
  onClose,
  onOpen,
}: SearchProps<Data>): JSX.Element {
  const [state, dispatch] = useSearchState();

  const submit = useStableCallback(async (id: string) => {
    const option = state.options.map[id];
    if (!option) return;
    onSubmit && (await resolve(onSubmit, option, search));
  });

  const triggerEvents = useRef<Set<MouseEvent>>();

  const [methods] = useState<SearchMethods<Data>>(() => ({
    setId: (key, id) => {
      dispatch({ type: "id", payload: { key, value: id } });
      return () => dispatch({ type: "id", payload: { key, value: null } });
    },
    setNode: (key, node) => {
      dispatch({ type: "node", payload: { key, value: node } });
      return () => dispatch({ type: "node", payload: { key, value: null } });
    },
    setOption: (option) => {
      dispatch({ type: "option.add", payload: option });
      return () => dispatch({ type: "option.remove", payload: option.id });
    },
    setSelected: (id) => dispatch({ type: "option.select", payload: id }),
    removeSelected: (id) =>
      dispatch({ type: "option.unselect", payload: id || null }),
    submit: (...args) => submit(...args),
    setTriggerEvent: (e) => {
      const events = (triggerEvents.current ??= new Set());
      events.add(e);
    },
  }));

  const [fallbackOpen, setFallbackOpen] = useState(false);

  const isOpen = useMounted() && isDefined(propOpen) ? propOpen : fallbackOpen;
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (isOpen) return startTimeout(() => setIsVisible(true), 4);
    setIsVisible(false);
  }, [isOpen]);

  const setOpen = useStableCallback((open: boolean) => {
    setFallbackOpen(open);
    resolveOptional(setPropOpen, open);
    if (open) {
      resolveOptional(onOpen, search);
      return;
    }
    resolveOptional(onClose, search);
    triggerEvents.current?.clear();
  });

  if (process.env.NODE_ENV === "development") {
    if (propOpen && !isFunction(setPropOpen)) {
      error(
        'The "open" prop was provided to the "Search" component but no "setOpen" prop was provided. As a result, the user won\'t be able to close the modal. Please provide a "setOpen" prop to fix this issue.'
      );
    }
  }

  useEffect(
    () => {
      if (onChange) resolve(onChange, state.selected, search);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.selected]
  );

  useEventListener(
    "keydown",
    async (e) => {
      if (!isOpen) return;
      await resolveOptional(onKeyDown, e, search);
      if (e.defaultPrevented) return;

      const { options, selected } = state;

      const setSelection = (
        i: number | ((options: { ids: string[]; max: number }) => number)
      ) => {
        const optionIds = options.ids;

        if (!optionIds.length) return;
        const target = isFunction(i)
          ? i({ ids: optionIds, max: optionIds.length - 1 })
          : i;
        const optionId = optionIds[target];
        if (!optionId) return;
        dispatch({ type: "option.select", payload: optionId });
      };

      const moveSelection = (
        fn: (i: Record<"current" | "max", number>) => number
      ) => {
        setSelection(({ max, ids }) => {
          if (selected) {
            const current = ids.indexOf(selected.id);
            if (current !== -1) return fn({ current, max });
          }
          return 0;
        });
      };
      switch (e.key) {
        case "Escape":
          setOpen(false);
          break;
        case "Enter":
          e.preventDefault();
          if (selected) submit(selected.id);
          break;
        case "ArrowDown":
          e.preventDefault();
          moveSelection(({ current, max }) =>
            current < max ? current + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          moveSelection(({ current, max }) =>
            current > 0 ? current - 1 : max
          );
          break;
        case "Home":
          e.preventDefault();
          setSelection(0);
          break;
        case "End":
          e.preventDefault();
          setSelection(({ max }) => max);
          break;
      }
    },
    isOpen
  );

  useEventListener(
    "click",
    (e) => {
      if (!(isOpen && e.target instanceof Node)) return;
      const panel = state.nodes.panel;
      if (!panel || panel.contains(e.target)) return;
      if (triggerEvents.current && triggerEvents.current.has(e)) {
        triggerEvents.current.delete(e);
        return;
      }
      setOpen(false);
    },
    true
  );

  const search = useMemo<Search>(
    () => {
      return {
        ...state,
        setOpen,
        close: () => setOpen(false),
        open: () => setOpen(true),
        isOpen,
        isVisible,
        select: methods.setSelected,
        unselect: methods.removeSelected,
        submit,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, isOpen, isVisible]
  );

  const selectedId = state.selected && state.selected.id;

  return (
    <SearchProvider value={search}>
      <SearchMethodsProvider value={methods}>
        <SelectedIdProvider value={selectedId}>
          <StylesProvider {...{ noStyle, colorScheme }}>
            {children}
          </StylesProvider>
        </SelectedIdProvider>
      </SearchMethodsProvider>
    </SearchProvider>
  );
}

function makeContext<T>(name: string, initialValue: T): [Provider<T>, () => T] {
  const Context = createContext<T>(initialValue);
  Context.displayName = name;

  return [Context.Provider, () => useContext(Context)] as const;
}
function makeRequiredContext<T>(name: string) {
  const [Provider, useValue] = makeContext<T | null>(name, null);
  const useRequiredValue = (): T => {
    const value = useValue();
    if (value) return value;
    error(
      'Could not locate a required context. Please make sure you\'ve wrapped this tree with the "Root" or "Search" component.'
    );
  };
  return [Provider, useRequiredValue] as const;
}

const [SearchProvider, useSearch] = makeRequiredContext<Search>("Search") as [
    Provider<Search>,
    <Data = any>() => Search<Data>,
  ],
  [SearchMethodsProvider, useSearchMethods] =
    makeRequiredContext<SearchMethods>("SearchMethods"),
  [SelectedIdProvider, useSelectedId] = makeContext<string | null>(
    "SelectedId",
    null
  );

export { Search, useSearch, useSearchMethods, useSelectedId };
export type {
  Callback,
  ContextCallback,
  ChangeCallback,
  SubmitCallback,
  KeyDownCallback,
  CloseCallback,
  OpenCallback,
  Ids,
  SearchProps,
  Nodes,
  Options,
  OptionMap,
  SearchMethods,
};
