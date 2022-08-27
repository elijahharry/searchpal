export type ThemeProperties = {
  accent: string;
  accentText: string;
  background: string;
  text: string;
  textSecondary: string;
  borderColor: string;
  borderWidth: string;
  shadow: string;
  backdrop: string;
  backdropOpacity: string;
  optionBg: string;
  optionText: string;
  optionSelectedBg: string;
  optionSelectedText: string;
};

export type Properties<T extends keyof ThemeProperties> = Partial<
  Pick<ThemeProperties, T>
>;
