import { useMemo, useRef } from "react";
import { isNumber, isObject, isString } from "../../utils";

import { ColorVars, SearchPalette } from "../../types";
import { useDarkMode } from "./useDarkMode";

type CompletePalette = { dark: SearchPalette; light: SearchPalette };

export const usePaletteVariables = (
  palette: Partial<CompletePalette> | SearchPalette = {},
  darkPreference?: boolean | "user"
) => {
  const userDark = useDarkMode();
  const dark = useMemo(
    () => (darkPreference === "user" ? userDark : darkPreference),
    [userDark, darkPreference]
  );

  const defaultPalette = useRef<CompletePalette>({
    light: {
      bg: "#fff",
      text: "#27272a",
      border: "#f2f3f6",
      backdrop: "#e5e7eb",
      shadow: "rgba(156,163,175,.2)",
      optionSelected: "#f4f4f5",
      backdropOpacity: 65,
      accent: {
        color: "#3b82f6",
        text: "#fff",
      },
    },
    dark: {
      bg: "#1f2937",
      text: "#fff",
      border: "#374151",
      backdrop: "#111827",
      shadow: "rgba(31,41,55,.8)",
      optionSelected: "#4b5563",
      accent: {
        color: "#3b82f6",
        text: "#fff",
      },
      backdropOpacity: 65,
    },
  });

  const palettes = useMemo(() => {
    const input: CompletePalette = isObject(palette)
      ? isDynamicPalette(palette)
        ? { dark: palette.dark || {}, light: palette.light || {} }
        : { dark: palette || {}, light: palette || {} }
      : defaultPalette.current;

    const generateVars = (mode: keyof CompletePalette) => {
      const base = defaultPalette.current[mode] as SearchPalette & {
          accent: { color: string; text: string };
        },
        user = input[mode];
      return {
        "--backdrop": user.backdrop || base.backdrop,
        "--bg": user.bg || base.bg,
        "--border": user.border || base.border,
        "--txt": user.text || base.text,
        "--shadow": user.shadow || base.shadow,
        "--selected-option": user.optionSelected || base.optionSelected,
        "--accent": user.accent
          ? isAccent(user.accent)
            ? user.accent.color || base.accent.color
            : user.accent
          : base.accent.color,
        "--accent-txt":
          user.accent && isAccent(user.accent) && isString(user.accent.text)
            ? user.accent.text
            : base.accent.text,
        "--backdrop-opacity": `${getHundreths(
          isNumber(user.backdropOpacity)
            ? user.backdropOpacity
            : base.backdropOpacity || 60
        )}`,
      } as ColorVars;
    };

    return { dark: generateVars("dark"), light: generateVars("light") };
  }, [palette]);

  return dark ? palettes.dark : palettes.light;
};

const isDynamicPalette = (palette: any): palette is Partial<CompletePalette> =>
  isObject(palette) && (isObject(palette?.light) || isObject(palette?.dark));

const isAccent = (accent: any): accent is { color?: string; text?: string } =>
  typeof accent === "object" &&
  (isString(accent.color) || isString(accent.text));

const getHundreths = (num: number) => Math.round((num / 100) * 100) / 100;
