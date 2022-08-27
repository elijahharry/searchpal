import { useMemo } from "react";

import { SearchProps, Theme } from "../../types";

import { useDarkMode } from "./useDarkMode";
import { isFunction } from "../../utils";

const backup = new Theme();

export const useTheme = (
  input: SearchProps["theme"],
  darkPreference: SearchProps["dark"] = "user"
) => {
  const userDark = useDarkMode();
  const dark = useMemo(
    () => (darkPreference === "user" ? userDark : darkPreference),
    [userDark, darkPreference]
  );

  const theme = useMemo(() => {
    if (input) {
      const obj = isFunction(input) ? input(new Theme()) : input;
      if (obj instanceof Theme) {
        return obj;
      }
    }
    return backup;
  }, [input]);

  if (dark) {
    return theme.dark.toVariables();
  }
  return theme.light.toVariables();
};
