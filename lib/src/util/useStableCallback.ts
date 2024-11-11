import { useCallback } from "react";
import { useEncase } from "./useEncase";

const useStableCallback = <C extends (...args: any[]) => any>(
  callback: C
): C => {
  const stable = useEncase(callback);
  return useCallback(
    (...args: any[]) => stable.current(...args),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ) as C;
};

export { useStableCallback };
