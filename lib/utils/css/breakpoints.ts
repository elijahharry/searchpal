import { isNumber } from "..";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const mediaQuery = (size: keyof typeof breakpoints | number) =>
  `@media (min-width: ${isNumber(size) ? size : breakpoints[size]}px)`;
