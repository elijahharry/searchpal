import { isFunction, isNumber, str } from "../../utils";
import { CSSProperties } from "react";

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
  optionBackground: string;
  optionText: string;
  optionSelectedBackground: string;
  optionSelectedText: string;
};

const propertyKeys: (keyof ThemeProperties)[] = [
  "accent",
  "accentText",
  "backdrop",
  "backdropOpacity",
  "background",
  "borderColor",
  "borderWidth",
  "optionBackground",
  "optionSelectedBackground",
  "optionSelectedText",
  "optionText",
  "shadow",
  "text",
  "textSecondary",
];

const themeProperties = new Set(propertyKeys as string[]);

type CSS<T extends keyof CSSProperties> = Exclude<CSSProperties[T], undefined>;

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

class Palette {
  #properties: ThemeProperties;
  #addProperties(obj: Partial<{ [key in keyof ThemeProperties]: any }>) {
    let properties = { ...this.#properties },
      values: Partial<ThemeProperties> = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (themeProperties.has(key) && (value || value === 0))
        values = { ...values, [key]: str(value) };
    });
    const additions = Object.keys(values) as (keyof ThemeProperties)[];
    if (additions.length > 0) {
      for (const key of additions) {
        if (properties[key]) delete properties[key];
      }
    }
    this.#properties = { ...properties, ...values };
  }
  accent(
    color: CSS<"backgroundColor"> | null,
    text?: CSS<"color"> | undefined
  ) {
    this.#addProperties({ accent: color, accentText: text });
  }
  backdrop(
    backgroundColor: CSS<"backgroundColor"> | null,
    opacity?: CSS<"opacity">
  ) {
    this.#addProperties({
      backdrop: backgroundColor,
      backdropOpacity: opacity,
    });
  }

  bg(backgroundColor: CSS<"backgroundColor">) {
    this.#addProperties({ background: backgroundColor });
  }

  text(primaryColor?: CSS<"color"> | null, secondaryColor?: CSS<"color">) {
    this.#addProperties({ text: primaryColor, textSecondary: secondaryColor });
  }

  border(
    borderColor: CSS<"borderColor"> | null,
    borderWidth?: CSS<"borderWidth"> | number
  ) {
    this.#addProperties({
      borderColor: borderColor,
      borderWidth: borderWidth
        ? `${borderWidth}${isNumber(borderWidth) ? "px" : ""}`
        : undefined,
    });
  }

  shadow(boxShadow: CSS<"boxShadow">) {
    this.#addProperties({ shadow: boxShadow });
  }

  option: {
    (
      backgroundColor: CSS<"backgroundColor"> | null,
      textColor?: CSS<"color">
    ): void;
    selected: (
      backgroundColor: CSS<"backgroundColor"> | null,
      textColor?: CSS<"color">
    ) => void;
  };

  set(theme: Partial<ThemeProperties>) {
    this.#addProperties(theme);
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
      optionBackground,
      optionSelectedBackground,
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
      "--option-bg": optionBackground,
      "--option-txt": optionText,
      "--selected-option-bg": optionSelectedBackground,
      "--selected-option-txt": optionSelectedText,
    } as ColorVars;
  }
  constructor(variant: "light" | "dark" = "light") {
    this.#properties = variant === "dark" ? defaults.dark : defaults.light;

    this.option = Object.assign(
      (
        backgroundColor: CSS<"backgroundColor"> | null,
        textColor?: CSS<"color">
      ) => {
        this.#addProperties({
          optionBackground: backgroundColor,
          optionText: textColor,
        });
      },
      {
        selected: (
          backgroundColor: CSS<"backgroundColor"> | null,
          textColor?: CSS<"color">
        ) => {
          this.#addProperties({
            optionSelectedBackground: backgroundColor,
            optionSelectedText: textColor,
          });
        },
      }
    );
  }
}

export class Theme {
  light: Palette;
  dark: Palette;

  #global(key: keyof Palette, ...args: any) {
    const tuple = [...args] as [any];
    if (tuple.length > 0) {
      if (isFunction(this.light[key])) this.light[key](...tuple);
      if (isFunction(this.dark[key])) this.dark[key](...tuple);
    }
  }

  accent(
    color: CSS<"backgroundColor"> | null,
    text?: CSS<"color"> | undefined
  ) {
    this.#global("accent", color, text);
  }
  backdrop(
    backgroundColor: CSS<"backgroundColor"> | null,
    opacity?: CSS<"opacity">
  ) {
    this.#global("backdrop", backgroundColor, opacity);
  }
  bg(backgroundColor: CSS<"backgroundColor">) {
    this.#global("bg", backgroundColor);
  }
  text(primaryColor?: CSS<"color"> | null, secondaryColor?: CSS<"color">) {
    this.#global("text", primaryColor, secondaryColor);
  }
  border(
    borderColor: CSS<"borderColor"> | null,
    borderWidth?: CSS<"borderWidth"> | number
  ) {
    this.#global("border", borderColor, borderWidth);
  }
  shadow(boxShadow: CSS<"boxShadow">) {
    this.#global("shadow", boxShadow);
  }

  option: {
    (
      backgroundColor: CSS<"backgroundColor"> | null,
      textColor?: CSS<"color">
    ): void;
    selected: (
      backgroundColor: CSS<"backgroundColor"> | null,
      textColor?: CSS<"color">
    ) => void;
  };

  set(theme?: Partial<ThemeProperties>) {
    if (theme) {
      this.#global("set", theme);
    }
  }

  constructor(
    initial?: Partial<ThemeProperties> & {
      light?: Partial<ThemeProperties>;
      dark?: Partial<ThemeProperties>;
    }
  ) {
    this.dark = new Palette("dark");
    this.light = new Palette("light");
    if (initial) {
      this.set(initial);
      if (initial.light) this.light.set(initial.light);
      if (initial.dark) this.dark.set(initial.dark);
    }

    this.option = Object.assign(
      (
        backgroundColor: CSS<"backgroundColor"> | null,
        textColor?: CSS<"color">
      ) => {
        this.#global("set", {
          optionBackground: backgroundColor,
          optionText: textColor,
        });
      },
      {
        selected: (
          backgroundColor: CSS<"backgroundColor"> | null,
          textColor?: CSS<"color">
        ) => {
          this.#global("set", {
            optionSelectedBackground: backgroundColor,
            optionSelectedText: textColor,
          });
        },
      }
    );
  }
}

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
    optionBackground: "transparent",
    optionText: "#27272a",
    optionSelectedBackground: "#f4f4f5",
    optionSelectedText: "#27272a",
  },
  dark: {
    accent: "#3b82f6",
    accentText: "#fff",
    background: "#1f2937",
    text: "#fff",
    textSecondary: "#8e939a",
    borderColor: "#393939",
    borderWidth: "1px",
    shadow: "0 25px 50px -12px rgba(31,41,55,.8)",
    backdrop: "#111827",
    backdropOpacity: ".65",
    optionBackground: "transparent",
    optionText: "#fff",
    optionSelectedBackground: "#4b5563",
    optionSelectedText: "#fff",
  },
};
