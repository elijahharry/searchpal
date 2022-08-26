import { useEffect, useMemo } from "react";

import {
  ColorVars,
  SearchProps,
  testTheme,
  Theme,
  ThemeVariant,
} from "../../types";
import { useDarkMode } from "./useDarkMode";
import { isArray, isFunction } from "../../utils";

const defaults = {
  light: new Theme("light"),
  dark: new Theme("dark"),
};

export const useTheme = (
  input: SearchProps["theme"],
  darkPreference: SearchProps["dark"] = "user"
) => {
  testTheme();

  return {} as ColorVars;
  //   const userDark = useDarkMode();
  //   const dark = useMemo(
  //     () => (darkPreference === "user" ? userDark : darkPreference),
  //     [userDark, darkPreference]
  //   );

  //   const themes = useMemo(() => {
  //     const value = isFunction(input) ? input(Theme) : input,
  //       arr = (isArray(value) ? value : [value]).filter(
  //         (obj) => obj instanceof Theme
  //       ) as Theme[];

  //     // Add darkPreference === "user" to if statement for autofill
  //     if (arr.length === 0) {
  //       const checkVariant = (variant: ThemeVariant) => {
  //         for (const theme of arr) {
  //           if (theme.variant === variant) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       };
  //       const modes: ThemeVariant[] = ["dark", "light"];
  //       for (const mode of modes) {
  //         if (!checkVariant(mode)) arr.push(defaults[mode]);
  //       }
  //     }
  //     return arr;
  //   }, [input, darkPreference]);

  //   const active = useMemo(() => {
  //     const variant: ThemeVariant = dark ? "dark" : "light";
  //     for (const theme of themes) {
  //       if (theme.variant === variant) {
  //         return theme;
  //       }
  //     }
  //     if (themes[0]) return themes[0];
  //     return dark ? defaults.dark : defaults.light;
  //   }, [themes, dark]);

  //   if (active) {
  //     return active.getVars();
  //   }

  //   return defaults[dark ? "dark" : "light"].getVars();
};
