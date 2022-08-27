import { isNumber, str } from "../../../../utils";
import { Properties } from "./types";
import { Property } from "csstype";

// Modal's background color
export class Background implements Properties<"background"> {
  background?: string;
  constructor(backgroundColor?: Property.BackgroundColor) {
    if (backgroundColor) this.background = str(backgroundColor);
  }
}

export type BackgroundThemer = (
  backgroundColor: Property.BackgroundColor
) => Background;

export const background: BackgroundThemer = (backgroundColor) =>
  new Background(backgroundColor);

// Modal's text color
export class Text implements Properties<"text" | "textSecondary"> {
  text?: string;
  textSecondary?: string;
  constructor(
    primaryColor?: Property.Color | null,
    secondaryColor?: Property.Color
  ) {
    if (primaryColor) this.text = str(primaryColor);
    if (secondaryColor) this.textSecondary = str(primaryColor);
  }
}

export type TextThemer = (
  primaryColor: Property.Color | null,
  secondaryColor?: Property.Color
) => Text;
export const text: TextThemer = (primaryColor, secondaryColor) =>
  new Text(primaryColor, secondaryColor);

// Border used throughout modal
export class Border implements Properties<"borderColor" | "borderWidth"> {
  borderColor?: string;
  borderWidth?: string;
  constructor(
    borderColor?: Property.BorderColor | null,
    borderWidth?: Property.BorderWidth | number
  ) {
    if (borderColor) this.borderColor = str(borderColor);
    if (borderWidth)
      this.borderWidth = str(
        `${borderWidth}${isNumber(borderWidth) ? "px" : ""}`
      );
  }
}
export type BorderThemer = (
  borderColor: Property.BorderColor | null,
  borderWidth?: Property.BorderWidth | number
) => Border;
export const border: BorderThemer = (borderColor, borderWidth) =>
  new Border(borderColor, borderWidth);

// Modal's box shadow
export class Shadow implements Properties<"shadow"> {
  shadow?: string;
  constructor(boxShadow?: Property.BoxShadow) {
    if (boxShadow) this.shadow = str(boxShadow);
  }
}
export type ShadowThemer = (boxShadow: Property.BoxShadow) => Shadow;
export const shadow: ShadowThemer = (boxShadow) => new Shadow(boxShadow);
