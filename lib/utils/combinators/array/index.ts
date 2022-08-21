import { isNumber, isString } from "../../is";
import { arrayCombinator } from "./arrayCombinator";

export * from "./arrayCombinator";

export const arrString = (...args: any[]) =>
  arrayCombinator<string>((obj) => isString(obj), ...args);

export const arrStringNumber = (...args: any[]) =>
  arrayCombinator<string | number>(
    (obj) => isString(obj) || isNumber(obj),
    ...args
  );

export const arrTruthy = (...args: any[]) =>
  arrayCombinator<number | string | true | object>(
    (obj) => (obj ? true : false),
    ...args
  );
