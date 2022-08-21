import React, { RefObject, useEffect, useRef } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const useEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
) => {
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!(window && window.addEventListener)) {
      return;
    }
    const eventListener: typeof handler = (event) =>
      savedHandler.current(event);

    window.addEventListener(eventName, eventListener, options);

    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, options]);
};
