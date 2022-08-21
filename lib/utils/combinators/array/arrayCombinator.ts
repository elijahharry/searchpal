import { isArray, isFunction } from "../../is";

export const arrayCombinator = <R>(
  ...args: [checkValue: (value: any) => boolean, ...rest: any[]]
) => {
  const results: R[] = [];
  addArrayValue<R>(results, args[0], args.slice(1));
  return results;
};

export const addArrayValue = <R>(
  results: R[],
  check: (value: any) => boolean,
  args: any[]
) => {
  for (const arg of args) {
    if (isFunction(arg)) {
      const val = arg();
      if (isArray(val)) {
        addArrayValue<R>(results, check, val);
      } else if (check(val)) {
        results.push(val);
      }
    } else if (isArray(arg)) {
      addArrayValue<R>(results, check, arg);
    } else {
      if (check(arg)) {
        results.push(arg);
      }
    }
  }
};
