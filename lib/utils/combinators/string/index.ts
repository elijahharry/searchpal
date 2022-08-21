import { stringCombinator } from "./stringCombinator";
import { stringCombinatorUniqueLast } from "./stringCombinatorUniqueLast";

export const spaceCombinator = (...args: any[]) =>
  stringCombinator(" ", ...args);

export const sentenceCombinator = (final: "and" | "or", ...args: any[]) =>
  stringCombinatorUniqueLast(", ", ` ${final} `, ...args);

export const emptyCombinator = (...args: any[]) =>
  stringCombinator("", ...args);
