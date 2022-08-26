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

// type ThemeProperties = {
//   accent: CSSProperties["backgroundColor"];
//   accentText: CSSProperties["color"];
//   bg: CSSProperties["backgroundColor"];
//   text: CSSProperties["color"];
//   border: CSSProperties["borderColor"];
//   shadow: CSSProperties["boxShadow"];
//   optionSelected: CSSProperties["backgroundColor"];
//   backdrop: CSSProperties["backgroundColor"];
//   backdropOpacity: number;
// };

type ThemeProperties = {
  accent: string;
  accentText: string;
  background: string;
  text: string;
  border: string;
  shadow: string;
  optionSelected: string;
  backdrop: string;
  backdropOpacity: string;
};

export type ThemeVariant = "light" | "dark";

const accent = (
  color: CSSProperties["backgroundColor"],
  text?: CSSProperties["color"]
) => new Accent(color, text);
class Accent {
  accent: string;
  accentText: string;
  constructor(
    color: CSSProperties["backgroundColor"],
    text?: CSSProperties["color"]
  ) {
    this.accent = str(color);
    this.accentText = text ? str(text) : "#fff";
  }
}

class Background {
  background: string;
  backgroundOpacity: string;
  constructor(
    backgroundColor: CSSProperties["backgroundColor"],
    opacity?: CSSProperties["opacity"]
  ) {
    this.background = str(backgroundColor);
    this.backgroundOpacity = str(opacity) || ".65";
  }
}
const background = (
  color: CSSProperties["backgroundColor"],
  opacity?: CSSProperties["opacity"]
) => new Background(color, opacity);

class Text {
  text: string;
  constructor(color: CSSProperties["color"]) {
    this.text = str(color);
  }
}
const text = (color: CSSProperties["color"]) => new Text(color);

class Border {
  border: string;
  constructor(borderColor: CSSProperties["borderColor"]) {
    this.border = str(borderColor);
  }
}
const border = (borderColor: CSSProperties["borderColor"]) =>
  new Border(borderColor);

class Shadow {
  shadow: string;
  constructor(boxShadow: CSSProperties["boxShadow"]) {
    this.shadow = str(boxShadow);
  }
}
const shadow = (boxShadow: CSSProperties["boxShadow"]) => new Shadow(boxShadow);

class Option {
  optionSelected: string;
  constructor(selectedBackgroundColor: CSSProperties["backgroundColor"]) {
    this.optionSelected = str(selectedBackgroundColor);
  }
}
const option = (selectedBackgroundColor: CSSProperties["backgroundColor"]) =>
  new Option(selectedBackgroundColor);

class Backdrop {
  backdrop: string;
  backdropOpacity: string;
  constructor(
    backgroundColor: CSSProperties["backgroundColor"],
    opacity: CSSProperties["opacity"]
  ) {
    this.backdrop = str(backgroundColor);
    this.backdropOpacity = str(opacity);
  }
}

type PropertyClasses =
  | Backdrop
  | Option
  | Shadow
  | Border
  | Text
  | Backdrop
  | Background
  | Accent;

const isPropertyClass = (obj: any): obj is PropertyClasses => {
  const instance = (of: any) => {
    try {
      if (obj instanceof of) {
        return true;
      }
    } catch (e) {
      return false;
    }
  };
  if (
    instance(Accent) ||
    instance(Border) ||
    instance(Background) ||
    instance(Backdrop) ||
    instance(Text) ||
    instance(Shadow) ||
    instance(Option)
  ) {
    return true;
  }
  return false;
};

export class Theme {
  // accent: CSSProperties["backgroundColor"];
  // accentText: CSSProperties["color"];
  // bg: CSSProperties["backgroundColor"];
  // text: CSSProperties["color"];
  // border: CSSProperties["borderColor"];
  // shadow: CSSProperties["boxShadow"];
  // optionSelected: CSSProperties["backgroundColor"];
  // backdrop: CSSProperties["backgroundColor"];
  // backdropOpacity: number;
  variant: ThemeVariant;
  properties: ThemeProperties;
  // getVars() {
  //   return {
  //     "--bg": str(this.bg),
  //     "--accent": str(this.accent),
  //     "--accent-txt": str(this.accentText),
  //     "--backdrop": str(this.backdrop),
  //     "--backdrop-opacity": str(getHundreths(this.backdropOpacity)),
  //     "--shadow": str(this.shadow),
  //     "--selected-option": str(this.optionSelected),
  //     "--txt": str(this.text),
  //     "--border": str(this.border),
  //   } as ColorVars;
  // }
  constructor(variant: ThemeVariant, ...args: PropertyClasses[]) {
    this.variant = variant;
    let properties = variant === "dark" ? defaults.dark : defaults.light;
    for (const arg of args) {
      if (isPropertyClass(arg)) {
        properties = { ...properties, ...arg };
      }
    }
    this.properties = properties;
    console.log(properties);
  }
}

const defaults: { light: ThemeProperties; dark: ThemeProperties } = {
  light: {
    accent: "#3b82f6",
    accentText: "#fff",
    background: "#fff",
    text: "#27272a",
    border: "#f2f3f6",
    shadow: "0 25px 50px -12px rgba(156,163,175,.2)",
    optionSelected: "#f4f4f5",
    backdrop: "#e5e7eb",
    backdropOpacity: ".65",
  },
  dark: {
    accent: "#3b82f6",
    accentText: "#fff",
    background: "#1f2937",
    text: "#fff",
    border: "#374151",
    shadow: "0 25px 50px -12px rgba(31,41,55,.8)",
    backdrop: "#111827",
    optionSelected: "#4b5563",
    backdropOpacity: ".65",
  },
};

const getHundreths = (num: number) => Math.round((num / 100) * 100) / 100;
const str = (obj: any) => `${obj}`;

export const testTheme = () => {
  new Theme(
    "light",
    accent("blue"),
    shadow("10px #000"),
    background("#000", 0.2),
    option("ActiveBorder")
  );
};
