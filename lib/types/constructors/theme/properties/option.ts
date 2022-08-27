import { str } from "../../../../utils";
import { Properties, CSS } from "./types";

export class Option
  implements
    Properties<
      "optionSelectedBg" | "optionBg" | "optionSelectedText" | "optionText"
    >
{
  optionSelectedBg?: string;
  optionSelectedText?: string;
  optionBg?: string;
  optionText?: string;
  constructor(
    isSelected: "selected" | null | boolean,
    backgroundColor?: CSS<"backgroundColor"> | null,
    textColor?: CSS<"color">
  ) {
    if (isSelected === "selected" || isSelected === true) {
      if (backgroundColor) this.optionSelectedBg = str(backgroundColor);
      if (textColor) this.optionSelectedText = str(textColor);
      return;
    }
    if (backgroundColor) this.optionBg = str(backgroundColor);
    if (textColor) this.optionText = str(textColor);
    return;
  }
}

export type OptionThemer = (
  isSelected: "selected" | null | boolean,
  backgroundColor: CSS<"backgroundColor"> | null,
  textColor?: CSS<"color">
) => Option;

export const option: OptionThemer = (mode, backgroundColor, textColor) =>
  new Option(mode, backgroundColor, textColor);
