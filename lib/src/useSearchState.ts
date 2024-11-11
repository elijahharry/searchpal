import { forEntries } from "amenities";
import { Reducer, useReducer } from "react";
import { sortByDocumentPosition } from "./util/sortByDocumentPosition";
import type { Option } from "./Option";
import { assertContains } from "./util/assertContains";
import { useIsomporhicLayoutEffect } from "./util/useIsomorphicLayoutEffect";
import { revealScrolled } from "./util/revealScrolled";

export type OptionMap<Data = any> = Record<string, Option<Data>>;

export interface Options<Data = any> {
  list: Option<Data>[];
  map: OptionMap<Data>;
  ids: string[];
}

export interface Ids {
  dialog: string | null;
  input: string | null;
  listbox: string | null;
}

export interface Nodes {
  dialog: HTMLDivElement | null;
  input: HTMLInputElement | null;
  listbox: HTMLDivElement | null;
  panel: HTMLDivElement | null;
}

export interface SearchState<Data = any> {
  ids: Ids;
  nodes: Nodes;
  options: Options<Data>;
  selected: Option<Data> | null;
}

type Action<T extends string, P> = {
  type: T;
  payload: P;
};

type EffectAction<T extends string> = {
  type: `effect.${T}`;
};

export type SearchAction<Data = any> =
  | Action<"option.add", Option<Data>>
  | Action<"option.remove", string>
  | Action<
      "id",
      {
        key: keyof Ids;
        value: string | null;
      }
    >
  | Action<"node", { key: keyof Nodes; value: HTMLElement | null }>
  | Action<"option.select", string>
  | Action<"option.unselect", string | null>
  | EffectAction<"options">;

export type SearchDispatch<Data = any> = (action: SearchAction<Data>) => void;

type State = SearchState<any>;

type Updates = {
  [K in keyof State]?: K extends (typeof shouldMerge)["$typeof"]
    ? Partial<State[K]>
    : State[K];
};

const initialState = /* @__PURE__ */ ((): State => {
  const ids = { dialog: null, input: null, listbox: null };
  return {
    ids,
    nodes: { ...ids, panel: null },
    options: {
      list: [],
      map: {},
      ids: [],
    },
    selected: null,
  };
})();

const shouldMerge = assertContains(["ids", "nodes", "options"] as const);

const set = (state: State, updates: Updates) => {
  let merged: State | undefined;
  forEntries(updates, ([key, value]) => {
    const target = (merged ??= { ...state });
    if (shouldMerge(key))
      // @ts-expect-error
      value = { ...state[key], ...value };
    // @ts-expect-error
    target[key] = value;
  });
  return merged ?? state;
};

const updateOptions = (state: State, update: (map: OptionMap) => OptionMap) =>
  set(state, { options: { map: update(state.options.map) } });

const reducer: Reducer<State, SearchAction> = (state, action) => {
  switch (action.type) {
    case "option.add": {
      return updateOptions(state, (map) => ({
        ...map,
        [action.payload.id]: action.payload,
      }));
    }
    case "option.remove": {
      return updateOptions(state, ({ [action.payload]: _, ...map }) => map);
    }
    case "option.select": {
      const option = state.options.map[action.payload];
      if (option) {
        revealScrolled(option.node, state.nodes.dialog);
        return set(state, { selected: option });
      }
      return state;
    }
    case "option.unselect": {
      if (
        state.selected &&
        (!action.payload || action.payload === state.selected.id)
      ) {
        return set(state, { selected: null });
      }
      return state;
    }
    case "id": {
      const { key, value } = action.payload;
      return set(state, { ids: { [key]: value } });
    }

    case "node": {
      const { key, value } = action.payload;
      return set(state, {
        nodes: {
          [key]: value,
        },
      });
    }
    case "effect.options": {
      const {
        options: { map },
        selected: prevSelected,
      } = state;

      const list: Option[] = [];

      forEntries(map, ([, option]) => {
        list.push(option);
      });

      sortByDocumentPosition(list, (o) => o.node);

      const ids = list.map((o) => o.id);

      const selected = (prevSelected && map[prevSelected.id]) || null;

      return set(state, {
        options: { list, map, ids },
        selected,
      });
    }
    default: {
      return state;
    }
  }
};

const useSearchState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { options } = state;

  useIsomporhicLayoutEffect(() => {
    dispatch({ type: "effect.options" });
  }, [options.map]);

  return [state, dispatch] as const;
};

export { useSearchState };
export type { Option };
