import { CSSProperties } from "react";

export type ColorVars = {
  "--bg": string;
  "--txt": string;
  "--border": string;
  "--selected-option": string;
  "--accent": string;
  "--backdrop": string;
  "--accent-txt": string;
  "--shadow": string;
  "--backdrop-opacity": string;
};

type ThemeProperties = {
  accent: CSSProperties["backgroundColor"];
  accentText: CSSProperties["color"];
  bg: CSSProperties["backgroundColor"];
  text: CSSProperties["color"];
  border: CSSProperties["borderColor"];
  shadow: CSSProperties["boxShadow"];
  optionSelected: CSSProperties["backgroundColor"];
  backdrop: CSSProperties["backgroundColor"];
  backdropOpacity: number;
};

export type ThemeVariant = "light" | "dark";

export class Theme implements ThemeProperties {
  accent: CSSProperties["backgroundColor"];
  accentText: CSSProperties["color"];
  bg: CSSProperties["backgroundColor"];
  text: CSSProperties["color"];
  border: CSSProperties["borderColor"];
  shadow: CSSProperties["boxShadow"];
  optionSelected: CSSProperties["backgroundColor"];
  backdrop: CSSProperties["backgroundColor"];
  backdropOpacity: number;
  variant: ThemeVariant;
  getVars() {
    return {
      "--bg": str(this.bg),
      "--accent": str(this.accent),
      "--accent-txt": str(this.accentText),
      "--backdrop": str(this.backdrop),
      "--backdrop-opacity": str(getHundreths(this.backdropOpacity)),
      "--shadow": str(this.shadow),
      "--selected-option": str(this.optionSelected),
      "--txt": str(this.text),
      "--border": str(this.border),
    } as ColorVars;
  }
  constructor(variant: ThemeVariant, theme: Partial<ThemeProperties> = {}) {
    const base = variant === "dark" ? defaults.dark : defaults.light;
    this.variant = variant;
    this.accent = theme.accent || base.accent;
    this.accentText = theme.accentText || base.accentText;
    this.backdrop = theme.backdrop || base.backdrop;
    this.backdropOpacity = theme.backdropOpacity || base.backdropOpacity;
    this.bg = theme.bg || base.bg;
    this.border = theme.border || base.border;
    this.optionSelected = theme.optionSelected || base.optionSelected;
    this.shadow = theme.shadow || base.shadow;
    this.text = theme.text || base.text;
  }
}

const defaults: { light: ThemeProperties; dark: ThemeProperties } = {
  light: {
    accent: "#3b82f6",
    accentText: "#fff",
    bg: "#fff",
    text: "#27272a",
    border: "#f2f3f6",
    shadow: "0 25px 50px -12px rgba(156,163,175,.2)",
    optionSelected: "#f4f4f5",
    backdrop: "#e5e7eb",
    backdropOpacity: 65,
  },
  dark: {
    accent: "#3b82f6",
    accentText: "#fff",
    bg: "#1f2937",
    text: "#fff",
    border: "#374151",
    shadow: "0 25px 50px -12px rgba(31,41,55,.8)",
    backdrop: "#111827",
    optionSelected: "#4b5563",
    backdropOpacity: 65,
  },
};

const getHundreths = (num: number) => Math.round((num / 100) * 100) / 100;
const str = (obj: any) => `${obj}`;
