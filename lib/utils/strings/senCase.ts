import { cn } from "../combinators";
import { isString } from "../is";

export const senCase = (...args: any) => {
  const str = cn(args.filter((obj: any) => isString(obj)));
  return [str.charAt(0).toUpperCase(), str.slice(1)].join("");
};
