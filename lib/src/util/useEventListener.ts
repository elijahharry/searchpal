import { useEffect } from "react";
import { useEncase } from "./useEncase";
import { startEventListener } from "./listener";

const useEventListener = <E extends keyof WindowEventMap>(
  event: E,
  onEvent: (event: WindowEventMap[E]) => void,
  enable: boolean = true
) => {
  const fn = useEncase(onEvent);

  useEffect(() => {
    if (enable) return startEventListener(event, (e) => fn.current(e));
  }, [event, enable]);

  return fn;
};

export { useEventListener };
