import { isValidElement, Fragment } from "react";
import { Renderable, RenderableItem } from "../../types";

export const isArray = (obj?: any): obj is any[] => Array.isArray(obj);

export const isStringArray = (arr: any[]): arr is string[] => {
  if (!isArray(arr)) {
    return false;
  }
  for (const obj of arr) {
    if (!isString(obj)) {
      return false;
    }
  }

  return true;
};

export const isFunction = (obj: any): obj is Function =>
  typeof obj === "function";

export const isObject = (obj: any): obj is Object =>
  obj !== null && typeof obj === "object";

export const isRenderableItem = (obj: any): obj is RenderableItem =>
  isString(obj) ||
  isNumber(obj) ||
  isValidElement(obj) ||
  (obj?.type && obj.type === Fragment) ||
  obj === false;

export const isRenderable = (obj: any): obj is Renderable => {
  if (isArray(obj)) {
    for (const item of obj) {
      if (!isRenderableItem(item)) return false;
    }
    return true;
  }
  return isRenderableItem(obj);
};

export const isInteger = (obj: any): boolean =>
  String(Math.floor(Number(obj))) === obj;

export const isString = (obj: any): obj is string =>
  typeof obj === "string" || obj instanceof String;

export const isNumber = (obj: any): obj is number =>
  typeof obj === "number" && isFinite(obj);

export const isBoolean = (obj: any): obj is boolean =>
  typeof obj === "boolean" && (obj === false || obj === true);

export const isSymbol = (obj: any): obj is symbol => typeof obj === "symbol";

export const isSame = (item1: any, item2: any) => {
  const obj1 = toComparable(item1),
    obj2 = toComparable(item2);
  if (isObject(obj1) && isObject(obj2)) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        (areObjects && !isSame(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }
    return true;
  } else {
    return obj1 === obj2;
  }
};

export const isError = (e: any): e is Error => e instanceof Error;

export const toComparable: (obj: any) => any = (obj: any) => {
  if (isString(obj) || isNumber(obj) || isBoolean(obj)) {
    return obj;
  }
  if (isObject(obj)) {
    if (isArray(obj)) {
      const arrayed = obj;
      const results = [];
      for (const item of arrayed) results.push(toComparable(item));
      return results;
    } else {
      if (isValidElement(obj)) {
        let props: { [key: string]: any } = {};
        if (isObject(obj.props)) {
          const elProps = obj.props as { [key: string]: any };
          const propNames = Object.keys(elProps);
          if (propNames.length) {
            for (const prop of propNames) {
              props[prop] = toComparable(elProps[prop]);
            }
          }
        }
        return {
          ...(isString(obj.type) ? { type: obj.type } : {}),
          key: obj.key || "",
          props,
        };
      }
      const arrayed = Object.entries(obj);
      const results: [key: string, value: any][] = [];
      for (const item of arrayed)
        results.push([item[0], toComparable(item[1])]);
      return Object.fromEntries(results);
    }
  }
  if (isFunction(obj?.toString)) {
    try {
      const str = obj.toString();
      return str;
    } catch (e) {
      return "";
    }
  }
  return obj;
};
