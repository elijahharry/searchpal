import { isArray } from "../../../../utils";
import { Accent } from "./accent";
import { Backdrop } from "./backdrop";
import { Background, Border, Shadow, Text } from "./modal";
import { Option } from "./option";

export type ThemeProperty =
  | Accent
  | Border
  | Shadow
  | Background
  | Backdrop
  | Option
  | Text;

export const isThemeProperty = (obj: any): obj is ThemeProperty => {
  const instance = (of: any) => {
    try {
      if (obj instanceof of) {
        return true;
      }
    } catch (e) {
      return false;
    }
  };
  if (
    instance(Accent) ||
    instance(Border) ||
    instance(Background) ||
    instance(Backdrop) ||
    instance(Text) ||
    instance(Shadow) ||
    instance(Option)
  ) {
    return true;
  }
  return false;
};

export const getThemeProperties = (input: any) => {
  const arr = isArray(input) ? input : [input];
  return arr.filter((obj) => isThemeProperty(obj)) as ThemeProperty[];
};
