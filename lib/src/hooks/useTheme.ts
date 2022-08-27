import { useMemo } from "react";

import {
  SearchProps,
  ThemeVariant,
  themers,
  theme,
  getThemes,
} from "../../types";

import { useDarkMode } from "./useDarkMode";
import { isFunction } from "../../utils";

const defaults = {
  light: theme("light"),
  dark: theme("dark"),
};

export const useTheme = (
  input: SearchProps["theme"],
  darkPreference: SearchProps["dark"] = "user"
) => {
  const userDark = useDarkMode();
  const dark = useMemo(
    () => (darkPreference === "user" ? userDark : darkPreference),
    [userDark, darkPreference]
  );

  const themes = useMemo(() => {
    const variants = getThemes(
      isFunction(input) ? input(theme, themers) : input
    );
    // Add darkPreference === "user" to if statement for autofill
    if (variants.length === 0) {
      const checkVariant = (variant: ThemeVariant) => {
        for (const theme of variants) {
          if (theme.variant === variant) {
            return true;
          }
        }
        return false;
      };
      const modes: ThemeVariant[] = ["dark", "light"];
      for (const mode of modes) {
        if (!checkVariant(mode)) variants.push(defaults[mode]);
      }
    }
    return variants;
  }, [input]);

  const active = useMemo(() => {
    const variant: ThemeVariant = dark ? "dark" : "light";
    for (const theme of themes) {
      if (theme.variant === variant) {
        return theme;
      }
    }
    if (themes[0]) return themes[0];
    return dark ? defaults.dark : defaults.light;
  }, [themes, dark]);

  if (active) {
    return active.toVariables();
  }

  return defaults[dark ? "dark" : "light"].toVariables();
};
