import { isNumber, isString } from "../../is";
import { arrayCombinator } from "../array";

export const stringCombinatorUniqueLast = (
  ...args: [combinator: string, lastCombinator: string, ...rest: any]
) => {
  if (!args[0]) {
    throw "Arguement zero must be a combinator (i.e. '-', ' ', ', ', etc)";
  }
  if (!args[1]) {
    throw "Arguement one must be a final combinator (i.e. ' and ', ' or ', etc)";
  }
  const arr = arrayCombinator<string | number>(
    (value) => (isNumber(value) || isString(value)) && (value ? true : false),
    ...args.slice(2)
  );

  if (arr.length > 1) {
    const final = arr.pop();
    return [arr.join(args[0]), final].join(args[1]);
  }
  if (arr.length > 0) {
    return arr[0].toString();
  }
  return "";
};
