import { isArray, isRenderable } from "../is";
import { RenderableItem } from "../../types";

const checkRenderable = (node: any, pushTo: RenderableItem[]) => {
  if (isArray(node)) {
    for (const obj of node) {
      checkRenderable(obj, pushTo);
    }
    return;
  }
  if (isRenderable(node)) pushTo.push(node);
  return;
};

export const getRenderable = (node: any) => {
  let fixed: RenderableItem[] = [];
  checkRenderable(node, fixed);
  fixed = fixed.filter((item) => item !== false);
  if (fixed.length < 1) return undefined;
  return fixed;
};
