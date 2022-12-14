import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import {
  SetActive,
  SearchProps,
  SearchLabels,
  Searchable,
  SearchBreakpoints,
  LinkComponent,
} from "../../types";

import { useEventListener } from "../hooks/useEventListener";
import { isString, isNumber, search, SearchOption } from "../../utils";
import { useSearchChildren } from "../hooks/useSearchChildren";
import { Hidden } from "./Search.styled";

export interface SearchValues {
  options: Omit<Searchable, "keywords">[];
  active: string | null;
  setActive: SetActive;
  id: string;
  query: string;
  setQuery: (query: string) => void;
  show: boolean;
  ids: SearchIds;
  suggestion: { label: string; id: string } | null;
  hoverable: boolean;
  enableHover: () => void;
  disableHover: () => void;
  label: string;
  labels: SearchLabels;
  breakpoints: SearchBreakpoints;
  link?: LinkComponent;
  loading: boolean;
  custom: boolean;
}

export type SearchSetter = {
  options: Dispatch<SetStateAction<Omit<Searchable, "keywords">[]>>;
  search: Dispatch<SetStateAction<Pick<Searchable, "keywords" | "id">[]>>;
};

type SearchIds = {
  id: string;
  search: string;
  options: string;
  optionsLabel: string;
  errors: string[];
  getOptionId: (id: string) => string;
  heading: string;
};

const SearchContext = createContext<SearchValues>({} as SearchValues);
const SearchSetterContext = createContext<SearchSetter>({
  options: () => {},
  search: () => {},
} as SearchSetter);

export const useSearch = () => {
  return useContext(SearchContext);
};

export const useSearchSetter = () => {
  return useContext(SearchSetterContext);
};

export function SearchProvider({
  children,
  startExpanded,
  show,
  onClose,
  id,
  link,
  label: searchLabel,
  labels: reqLabels,
  algo = "combo",
  previewBreakpoint = 570,
  input,
}: PropsWithChildren<
  Omit<SearchProps, "color" | "searches" | "children"> & {
    show: boolean;
    id: string;
  }
> & { input: SearchProps["children"] }) {
  const [query, setQuery] = useState("");

  const [elements, custom, loading] = useSearchChildren(input, query);

  const [options, setOptions] = useState<Omit<Searchable, "keywords">[]>([]);
  const [searchOptions, setSearchOptions] = useState<
    Pick<Searchable, "keywords" | "id">[]
  >([]);

  const searchResults = useMemo(() => {
    if (!query) {
      if (startExpanded) {
        return searchOptions.slice(0, 10);
      }
      return [];
    }
    const ids = search(
        query,
        searchOptions.map(
          (option) => new SearchOption(option.id, option.keywords)
        ),
        algo
      ),
      index = (id: string) => ids.results.indexOf(id),
      searchResults = searchOptions
        .filter((option) => ids.results.includes(option.id))
        .sort((a, b) => index(a.id) - index(b.id));

    return searchResults.slice(0, 10);
  }, [query, searchOptions, algo, startExpanded]);

  const results = useMemo(() => {
    if (custom) return options.slice(0, 10);
    const ids = searchResults.map(({ id }) => id);
    if (!ids.length) return [];
    return options
      .filter((opt) => ids.includes(opt.id))
      .sort((a) => ids.indexOf(a.id));
  }, [custom, options, searchResults]);

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setActive((active) => {
      if (active) {
        for (const opt of results) {
          if (opt.id === active) {
            return active;
          }
        }
      }
      return null;
    });
  }, [results]);

  const [hoverSelectable, setHoverSelectable] = useState(false);
  const disableHoverSelect = () => setHoverSelectable(false);
  const enableHoverSelect = () => setHoverSelectable(true);

  const getActiveIndex = () => {
    if (active) {
      for (let i = 0; i < results.length; i++) {
        const option = results[i];
        if (option?.id === active) {
          return i;
        }
      }
    }
    return null;
  };

  const suggestion = useMemo(() => {
    if (custom) return null;
    if (query && results[0]) {
      if (isString(results[0].label)) {
        const label = results[0].label,
          query_ = query.toLowerCase(),
          label_ = label.toLowerCase();
        if (label_.includes(query_) && label_.indexOf(query_) === 0) {
          return { label: results[0].label, id: results[0].id };
        }
      }
    }
    return null;
  }, [results, query, custom]);

  const selectSuggestion = () =>
    suggestion?.label && query !== suggestion?.label && setSuggested();

  const setSuggested = () => {
    if (suggestion) {
      setQuery(suggestion.label);
      setActive(suggestion.id);
    }
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (show) {
      const setActiveFromIndex = (index: number) => {
        if (results[index]) setActive(results[index].id);
      };
      const activeIndex = getActiveIndex();
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "ArrowDown":
          if (results.length > 0) {
            e.preventDefault();
            setActiveFromIndex(
              Math.min(
                isNumber(activeIndex) ? activeIndex + 1 : 0,
                results.length - 1
              )
            );
          }
          break;
        case "ArrowUp":
          if (results.length > 0) {
            e.preventDefault();
            setActiveFromIndex(
              isNumber(activeIndex)
                ? Math.max(0, activeIndex - 1)
                : results.length - 1
            );
          }
          break;
        case "ArrowRight":
          if (suggestion) {
            e.preventDefault();
            selectSuggestion();
          }
          break;
        case "Home":
          e.preventDefault();
          setActiveFromIndex(0);
          break;
        case "Tab":
          if (suggestion) {
            e.preventDefault();
            selectSuggestion();
          }
          break;
        case "Enter":
          if (!active && suggestion) {
            e.preventDefault();
            selectSuggestion();
          }
          break;
        default:
          return;
      }
    }
  });

  const ids = useMemo<SearchIds>(
    () => ({
      id: id,
      heading: `${id}-heading`,
      search: `${id}-search`,
      options: `${id}-results`,
      optionsLabel: `${id}-results-label`,
      getOptionId: (option) => `${id}-result-${option}`,
      errors: [`${id}-err-a`, `${id}-err-b`],
    }),
    [id]
  );

  const labels = useMemo<SearchLabels>(() => {
    return {
      title:
        reqLabels?.title && isString(reqLabels?.title)
          ? reqLabels.title
          : defaultLabels.title,
      subtitle:
        reqLabels?.subtitle && isString(reqLabels.subtitle)
          ? reqLabels.subtitle
          : defaultLabels.subtitle,
      results:
        reqLabels?.results && isString(reqLabels.results)
          ? reqLabels.results
          : defaultLabels.results,
      noResults: reqLabels?.noResults
        ? isString(reqLabels.noResults)
          ? {
              title: reqLabels.noResults,
              subtitle: defaultLabels.noResults.subtitle,
            }
          : {
              title: isString(reqLabels.noResults?.title)
                ? reqLabels.noResults.title
                : defaultLabels.noResults.title,
              subtitle: isString(reqLabels.noResults.subtitle)
                ? reqLabels.noResults.subtitle
                : defaultLabels.noResults.subtitle,
            }
        : defaultLabels.noResults,
    };
  }, [reqLabels]);

  const setters = useMemo(
    () => ({ search: setSearchOptions, options: setOptions }),
    [setSearchOptions, setOptions]
  );

  return (
    <SearchSetterContext.Provider value={setters}>
      <SearchContext.Provider
        value={{
          active,
          setActive,
          id,
          query,
          setQuery,
          show,
          ids,
          suggestion,
          hoverable: hoverSelectable,
          enableHover: enableHoverSelect,
          disableHover: disableHoverSelect,
          labels,
          label: isString(searchLabel) ? searchLabel : "Search for anything...",
          link,
          breakpoints: {
            preview: previewBreakpoint,
          },
          options: results,
          loading,
          custom,
        }}
      >
        <Hidden>{elements}</Hidden>
        {children}
      </SearchContext.Provider>
    </SearchSetterContext.Provider>
  );
}

const defaultLabels: SearchLabels = {
  title: "Search prompt",
  subtitle: "Use this dialog to perform a quick search.",
  results: "Search results",
  noResults: {
    title: "No results found for query.",
    subtitle: "Try searching for something else.",
  },
};
