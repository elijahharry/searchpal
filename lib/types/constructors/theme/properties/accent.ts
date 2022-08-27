import { str } from "../../../../utils";
import { Properties } from "./types";
import { Property } from "csstype";

export class Accent implements Properties<"accent" | "accentText"> {
  accent?: string;
  accentText?: string;
  constructor(color?: Property.BackgroundColor | null, text?: Property.Color) {
    if (color) this.accent = str(color);
    if (text) this.accentText = text ? str(text) : "#fff";
  }
}

export type AccentThemer = (
  color?: Property.BackgroundColor | null,
  text?: Property.Color | undefined
) => Accent;

export const accent: AccentThemer = (color, text) => new Accent(color, text);
