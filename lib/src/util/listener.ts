function startElementEventListener<E extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: E,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[E]) => any
) {
  element.addEventListener(type, listener);
  return () => element.removeEventListener(type, listener);
}

function startEventListener<E extends keyof WindowEventMap>(
  type: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
) {
  // @ts-expect-error
  return startElementEventListener(window, type, listener, options);
}

export { startElementEventListener, startEventListener };
