import { useRef, useState, useEffect } from "react";
import { compare } from "./array";

type DependencyList = any[];

type Cache<T> = {
  deps: DependencyList;
  result: T;
};

const makeCache = <T>(factory: () => T, deps: DependencyList): Cache<T> => ({
  deps,
  result: factory(),
});

export function useSemanticMemo<T>(factory: () => T, deps: DependencyList): T {
  const [initial] = useState(() => makeCache(factory, deps));

  const firstPass = useRef<boolean>(true),
    committed = useRef<Cache<T>>(initial);

  const returnCache: boolean =
    firstPass.current || !!compare(committed.current.deps, deps);

  const cache: Cache<T> = returnCache
    ? committed.current
    : makeCache(factory, deps);

  useEffect(() => {
    [firstPass.current, committed.current] = [false, cache];
  }, [cache]);

  return cache.result;
}
