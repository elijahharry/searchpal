import { useCallback, useMemo } from "react";

type Callback = (...args: any[]) => any;

const mergeCallbacks = <T extends Callback>(
  target: T | undefined,
  source: T
): T => {
  return ((...args) => {
    if (target) target(...args);
    return source(...args);
  }) as T;
};

const useMergeCallbacks = <T extends (...args: any[]) => any>(
  target: T | undefined,
  source: T,
  deps: React.DependencyList = []
) => {
  return useMemo(() => mergeCallbacks(target, source), deps.concat([target]));
};

export { useMergeCallbacks, mergeCallbacks };
