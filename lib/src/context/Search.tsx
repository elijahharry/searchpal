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
import {
  isString,
  isNumber,
  arrString,
  search,
  cn,
  SearchOption,
} from "../../utils";

type Data = {
  options: Searchable[];
  errors: string[];
};

export interface SearchValues {
  // data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  options: Searchable[];
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
  error: string | null;
  link?: LinkComponent;
}

type SearchIds = {
  id: string;
  search: string;
  options: string;
  optionsLabel: string;
  errors: string[];
  getOptionId: (id: string) => string;
  heading: string;
};

const SearchContext = createContext<SearchValues>({
  // options: [],
  // active: null,
  // setActive: () => {},
  // id: 'spotlight',
  // query: '',
  // setQuery: () => {},
  // show: false,
  // ids: {
  //   id: 'spotlight',
  //   search: 'search',
  //   options: 'results',
  //   getOptionId: () => 'option',
  //   errors: [],
  //   optionsLabel: 'option-label',
  // },
  // hoverable: false,
  // enableHover: () => {},
  // disableHover: () => {},
  // suggestion: null,
} as SearchValues);

export function useSearch() {
  return useContext(SearchContext);
}

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
}: PropsWithChildren<
  Omit<SearchProps, "color" | "searches" | "children"> & {
    show: boolean;
    id: string;
  }
>) {
  const [query, setQuery] = useState("");

  // const options = useOptionElements(optionsInput);
  const [{ options, errors }, setData] = useState<Data>({
    options: [],
    errors: [],
  });

  const results = useMemo(() => {
    if (!query) {
      if (startExpanded) {
        return options.slice(0, 10);
      }
      return [];
    }

    const ids = search(
        query,
        options.map(
          (option) =>
            new SearchOption(
              option.id,
              arrString(option?.keywords, option?.label)
            )
        ),
        algo
      ),
      index = (id: string) => ids.results.indexOf(id),
      searchResults = options
        .filter((option) => ids.results.includes(option.id))
        .sort((a, b) => index(a.id) - index(b.id));

    return searchResults.slice(0, 10);
    // return sort;
  }, [query, options, algo, startExpanded]);

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
  }, [results, query]);

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

  return (
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
        error:
          errors.length > 0
            ? cn(
                "Encountered",
                errors.length,
                `option${
                  errors.length > 1 ? "s" : ""
                } with errors during processing. Check console for the details.`
              )
            : "",
        options: results,
        setData,
      }}
    >
      {children}
    </SearchContext.Provider>
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
