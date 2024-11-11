import { useEffect, useLayoutEffect } from "react";

const useIsomporhicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export { useIsomporhicLayoutEffect };
