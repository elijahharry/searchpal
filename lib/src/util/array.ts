import { isStrictEqual } from "amenities";

function compare<T>(
  a: T[],
  b: T[],
  isSame: (a: T, b: T) => boolean = isStrictEqual
): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++)
    if (!isSame(a[i], b[i])) {
      return false;
    }
  return true;
}

export { compare };
