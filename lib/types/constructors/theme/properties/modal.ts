import { isNumber, str } from "../../../../utils";
import { Properties, CSS } from "./types";

// Modal's background color
export class Background implements Properties<"background"> {
  background?: string;
  constructor(backgroundColor?: CSS<"backgroundColor">) {
    if (backgroundColor) this.background = str(backgroundColor);
  }
}

export type BackgroundThemer = (
  backgroundColor: CSS<"backgroundColor">
) => Background;

export const background: BackgroundThemer = (backgroundColor) =>
  new Background(backgroundColor);

// Modal's text color
export class Text implements Properties<"text" | "textSecondary"> {
  text?: string;
  textSecondary?: string;
  constructor(
    primaryColor?: CSS<"color"> | null,
    secondaryColor?: CSS<"color">
  ) {
    if (primaryColor) this.text = str(primaryColor);
    if (secondaryColor) this.textSecondary = str(primaryColor);
  }
}

export type TextThemer = (
  primaryColor: CSS<"color"> | null,
  secondaryColor?: CSS<"color">
) => Text;
export const text: TextThemer = (primaryColor, secondaryColor) =>
  new Text(primaryColor, secondaryColor);

// Border used throughout modal
export class Border implements Properties<"borderColor" | "borderWidth"> {
  borderColor?: string;
  borderWidth?: string;
  constructor(
    borderColor?: CSS<"borderColor"> | null,
    borderWidth?: CSS<"borderWidth"> | number
  ) {
    if (borderColor) this.borderColor = str(borderColor);
    if (borderWidth)
      this.borderWidth = str(
        `${borderWidth}${isNumber(borderWidth) ? "px" : ""}`
      );
  }
}
export type BorderThemer = (
  borderColor: CSS<"borderColor"> | null,
  borderWidth?: CSS<"borderWidth"> | number
) => Border;
export const border: BorderThemer = (borderColor, borderWidth) =>
  new Border(borderColor, borderWidth);

// Modal's box shadow
export class Shadow implements Properties<"shadow"> {
  shadow?: string;
  constructor(boxShadow?: CSS<"boxShadow">) {
    if (boxShadow) this.shadow = str(boxShadow);
  }
}
export type ShadowThemer = (boxShadow: CSS<"boxShadow">) => Shadow;
export const shadow: ShadowThemer = (boxShadow) => new Shadow(boxShadow);
