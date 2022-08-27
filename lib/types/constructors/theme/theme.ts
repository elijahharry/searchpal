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
  #light: ThemeProperties;
  #dark: ThemeProperties;
  #configured: ThemeVariant[];
  #editing: ThemeVariant | "global";

  setMode(mode: "light" | "dark" | "global" | null) {
    const set = (mode: ThemeVariant | "global") => (this.#editing = mode);
    switch (mode) {
      case "light":
        set("light");
        return;
      case "dark":
        set("dark");
        return;
      default:
        set("global");
        return;
    }
  }
  accent(color, text) {
    this.#addProperty({ accent: color || undefined, accentText: text });
  }
  #addProperty(property: ThemeProperty) {
    const getUpdated = (props: ThemeProperties | undefined) => {
      let properties = props || ({} as ThemeProperties),
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
      return { ...properties, ...values };
    };

    if (this.#editing === "dark" || this.#editing === "global") {
      this.#dark = getUpdated(this.#dark);
    }
    if (this.#editing === "light" || this.#editing === "global") {
      this.#light = getUpdated(this.#light);
    }

    if (this.#editing !== "global" && !this.#configured.includes(this.#editing))
      this.#configured = [...this.#configured, this.#editing];
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
    } = this.#light;
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
  constructor(variant?: ThemeVariant, props?: ThemeProperty[]) {
    this.#dark = defaults.dark;
    this.#light = defaults.light;
    this.#configured = [];

    // this.variant = variant;
    // this.#properties = variant === "dark" ? defaults.dark : defaults.light;
    // for (const property of getThemeProperties(props)) {
    //   this.#addProperty(property);
    // }
  }
}

try {
  const theme = new Theme();
  theme.setMode("light");
  theme.accent("#fff", "#000");

  console.log(theme);
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
