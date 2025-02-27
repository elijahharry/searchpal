import { isNumber } from "hoolock";
import { assertContains } from "./assertContains";

const rms = /s$/;

const ignoreProperty = assertContains(["", "none"]);

const getTransition = (el: HTMLElement) => {
  const style = window.getComputedStyle(el);
  const property = style.transitionProperty;
  if (ignoreProperty(property)) return;
  const duration = style.transitionDuration.replace(rms, "");
  const s = parseFloat(duration);
  if (!(isNumber(s) && s > 0)) return;
  return { ms: s * 1000, s };
};

export { getTransition };
