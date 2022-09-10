import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { SearchProps } from "../../types";
import { isFunction } from "../../utils";

export const useSearchChildren = (
  children: SearchProps["children"],
  query: string
): [children: ReactNode, isCustom: boolean, isLoading: boolean] => {
  const search =
    useRef<(query: string) => ReactNode | Promise<ReactNode | void> | void>();

  const [isCustomSearch, staticChildren] = useMemo(() => {
    if (isFunction(children)) {
      search.current = children;
      return [true, null];
    }
    search.current = undefined;
    return [false, children];
  }, [children]);

  const [customChildren, setCustomChildren] = useState<ReactNode>(null);
  const [finished, setFinished] = useState("");

  const mostRecent = useRef({ set: 0, ran: 0 });

  useEffect(() => {
    if (!isCustomSearch) return;
    const func = search.current;
    if (!isFunction(func)) return;
    const getMostRecent = () => mostRecent.current;
    const runCustomSearch = async () => {
      let results: ReactNode = undefined;
      const now = Date.now();
      const mr = getMostRecent();
      mostRecent.current = { ...mr, ran: now };
      try {
        results = (await func(query)) || null;
      } catch (e) {
        console.error(e);
        results = null;
      }
      const latest = getMostRecent();
      if (latest.ran !== now && latest.set > now) return;
      mostRecent.current = { ...latest, set: now };
      setCustomChildren(results);
      setFinished(query);
    };
    runCustomSearch();
  }, [query, isCustomSearch]);

  if (isCustomSearch) {
    return [customChildren, isCustomSearch, query !== finished];
  }
  return [staticChildren, false, false];
};
