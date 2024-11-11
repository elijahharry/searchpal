import { useMemo, useRef } from "react";

function useDeepMemo<T>(value: T, compare: (prev: T, next: T) => boolean) {
  const cache = useRef<{ value: T }>();

  return useMemo(() => {
    if (cache.current) {
      const { value: prev } = cache.current;
      if (compare(prev, value)) return prev;
    }
    cache.current = { value };
    return value;
    // eslint-disable-next-line react-hooks/exhaustive-de
  }, [value]);
}

export { useDeepMemo };
