import { str } from "../../../../utils";
import { Properties, CSS } from "./types";
import { CSSProperties } from "react";

export class Accent implements Properties<"accent" | "accentText"> {
  accent?: string;
  accentText?: string;
  constructor(
    color: CSSProperties["backgroundColor"] | null,
    text?: CSS<"color">
  ) {
    if (color) this.accent = str(color);
    if (text) this.accentText = text ? str(text) : "#fff";
  }
}

export type AccentThemer = (
  color: CSS<"backgroundColor"> | null,
  text?: CSS<"color"> | undefined
) => Accent;
export const accent: AccentThemer = (color, text) => new Accent(color, text);
