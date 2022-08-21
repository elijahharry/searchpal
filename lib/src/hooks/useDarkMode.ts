import { useEffect, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

export const useDarkMode = (defaultValue?: boolean) => {
  const preferred = useMediaQuery("(prefers-color-scheme: dark)");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(preferred);
  }, [preferred]);

  return dark;
};
