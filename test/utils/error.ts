import { isError } from "amenities";

const trace = async <R>(fn: () => R, caller: Function) => {
  try {
    return await fn();
  } catch (e) {
    if (isError(e)) {
      console.log(e.stack);
      Error.captureStackTrace(e, caller);
    }
    throw e;
  }
};

const withTrace = <F extends (...args: any[]) => Promise<any>>(fn: F) => {
  async function traced(...args: Parameters<F>) {
    return await trace(() => fn(...args), traced);
  }

  return traced as F;
};

const retry = async <R>(fn: () => Promise<R>, attempts = 3, interval = 50) => {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === attempts - 1) {
        throw e;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
};

export { withTrace, trace, retry };
