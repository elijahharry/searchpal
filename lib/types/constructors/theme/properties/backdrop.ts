import { str } from "../../../../utils";
import { Properties, CSS } from "./types";
import { Property } from "csstype";

export class Backdrop implements Properties<"backdrop" | "backdropOpacity"> {
  backdrop?: string;
  backdropOpacity?: string;
  constructor(
    backgroundColor?: CSS<"backgroundColor"> | null,
    opacity?: Property.Opacity
  ) {
    if (backgroundColor) this.backdrop = str(backgroundColor);
    if (opacity) this.backdropOpacity = str(opacity);
  }
}

export type BackdropThemer = (
  backgroundColor: CSS<"backgroundColor"> | null,
  opacity?: Property.Opacity
) => Backdrop;

export const backdrop: BackdropThemer = (backgroundColor, opacity) =>
  new Backdrop(backgroundColor, opacity);
