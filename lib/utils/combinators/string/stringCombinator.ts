import { isArray, isNumber, isString, isFunction } from "../../is";

export const stringCombinator = (
  ...args: [combinator: string, ...rest: any[]]
) => {
  if (typeof args[0] !== "string") {
    throw TypeError(
      "Arguement zero must be a combinator (i.e. '-', ' ', ', ', etc)"
    );
  }
  return getCombinatorValue(args[0], args.slice(1));
};

const getCombinatorValue = (comb: string, args: any[]) => {
  let str = "";
  for (const arg of args) {
    const result = getValue(comb, arg);
    if (result) {
      if (str) str += comb;
      str += result;
    }
  }
  return str;
};

const getValue = (comb: string, v: any) => {
  const result = getStringValue(comb, v);
  if (isString(result)) {
    return result;
  }
  return "";
};

const getStringValue: (comb: string, v: any) => any = (comb, v) => {
  if (isString(v)) {
    return v;
  } else if (isNumber(v)) {
    return v.toString();
  } else if (isArray(v)) {
    return getCombinatorValue(comb, v);
  } else if (isFunction(v)) {
    return getStringValue(comb, v());
  }
  return "";
};
