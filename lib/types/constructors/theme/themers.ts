import {
  background,
  border,
  shadow,
  text,
  accent,
  backdrop,
  option,
  BackgroundThemer,
  BorderThemer,
  ShadowThemer,
  TextThemer,
  AccentThemer,
  BackdropThemer,
  OptionThemer,
} from "./properties";

export type Themers = {
  accent: AccentThemer;
  text: TextThemer;
  background: BackgroundThemer;
  backdrop: BackdropThemer;
  border: BorderThemer;
  shadow: ShadowThemer;
  option: OptionThemer;
};

export const themers: Themers = {
  accent,
  text,
  background,
  backdrop,
  border,
  shadow,
  option,
};
