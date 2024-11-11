import { noop } from "./noop";

const startTimeout = (fn: () => void, ms: number): (() => void) => {
  if (ms > 0) {
    const timer = setTimeout(fn, ms);
    return () => clearTimeout(timer);
  }
  fn();
  return noop;
};

export { startTimeout };
