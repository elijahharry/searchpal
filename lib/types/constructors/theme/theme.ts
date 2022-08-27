import { isArray, isString } from "../../../utils";
import {
  ThemeProperties,
  ThemeProperty,
  getThemeProperties,
  AccentThemer,
} from "./properties";

export type ColorVars = {
  "--accent": string;
  "--accent-txt": string;
  "--bg": string;
  "--txt": string;
  "--txt-secondary": string;
  "--border-color": string;
  "--border-width": string;
  "--shadow": string;
  "--backdrop": string;
  "--backdrop-opacity": string;
  "--option-bg": string;
  "--option-txt": string;
  "--selected-option-bg": string;
  "--selected-option-txt": string;
};

export type ThemeVariant = "light" | "dark";

export class Theme {
  variant: ThemeVariant;
  #properties: ThemeProperties;
  accent(color, text) {
    this.#addProperty({ accent: color || undefined, accentText: text });
  }
  #addProperty(property: ThemeProperty) {
    let properties = this.#properties || {},
      values: Partial<ThemeProperty> = {};
    Object.entries(property).forEach(([key, value]) => {
      if (isString(value)) values = { ...values, [key]: value };
    });

    const additions = Object.keys(values) as (keyof ThemeProperties)[];
    if (additions.length > 0) {
      for (const key of additions) {
        if (properties[key]) delete properties[key];
      }
    }
    this.#properties = { ...properties, ...values };
  }

  toVariables() {
    const {
      accent,
      accentText,
      background,
      backdrop,
      backdropOpacity,
      text,
      textSecondary,
      borderColor,
      borderWidth,
      shadow,
      optionBg,
      optionSelectedBg,
      optionSelectedText,
      optionText,
    } = this.#properties;
    return {
      "--accent": accent,
      "--accent-txt": accentText,
      "--txt": text,
      "--txt-secondary": textSecondary,
      "--shadow": shadow,
      "--backdrop": backdrop,
      "--backdrop-opacity": backdropOpacity,
      "--bg": background,
      "--border-color": borderColor,
      "--border-width": borderWidth,
      "--option-bg": optionBg,
      "--option-txt": optionText,
      "--selected-option-bg": optionSelectedBg,
      "--selected-option-txt": optionSelectedText,
    } as ColorVars;
  }
  constructor(variant: ThemeVariant, props: ThemeProperty[]) {
    this.variant = variant;
    this.#properties = variant === "dark" ? defaults.dark : defaults.light;
    for (const property of getThemeProperties(props)) {
      this.#addProperty(property);
    }
  }
}

try {
  const theme = new Theme("dark", []);
  theme.variant = "light";
  theme.accent("#fff", "#000");
} catch (e) {}

export type ThemeCreator = (
  variant: ThemeVariant,
  ...args: ThemeProperty[]
) => Theme;

export const theme: ThemeCreator = (variant, ...properties) =>
  new Theme(variant, properties);

export const getThemes = (obj: any) =>
  (isArray(obj) ? obj : [obj]).filter(
    (item) => item instanceof Theme
  ) as Theme[];

const defaults: { light: ThemeProperties; dark: ThemeProperties } = {
  light: {
    accent: "#3b82f6",
    accentText: "#fff",
    background: "#fff",
    text: "#27272a",
    textSecondary: "#929294",
    borderColor: "#f2f3f6",
    borderWidth: "1px",
    shadow: "0 25px 50px -12px rgba(156,163,175,.2)",
    backdrop: "#e5e7eb",
    backdropOpacity: ".65",
    optionBg: "transparent",
    optionText: "var(--txt)",
    optionSelectedBg: "#f4f4f5",
    optionSelectedText: "var(--txt)",
  },
  dark: {
    accent: "#3b82f6",
    accentText: "#fff",
    background: "#1f2937",
    text: "#fff",
    textSecondary: "#8e939a",
    borderColor: "#494949",
    borderWidth: "1px",
    shadow: "0 25px 50px -12px rgba(31,41,55,.8)",
    backdrop: "#111827",
    backdropOpacity: ".65",
    optionBg: "transparent",
    optionText: "var(--txt)",
    optionSelectedBg: "#4b5563",
    optionSelectedText: "var(--txt)",
  },
};
