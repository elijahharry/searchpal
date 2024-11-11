import { isPlainObject, isString, memoize } from "amenities";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
} from "react";

import { classes, styleSheet } from "./Styles.module.css";

import { noop } from "./util/noop";

type Falsey = null | undefined | false | 0 | "";

export type ClassName = string;
export type ClassNameArg = ClassName | { force: ClassName } | Falsey;
export type ClassNameArgs = Array<ClassNameArg>;

export type ColorScheme = "auto" | "light" | "dark";

export type WithStyle<T extends {} = {}> = T & {
  noStyle?: boolean;
};

export type MergeClasses = (
  options: {
    noStyle?: boolean;
    className?: string;
  } | null,
  ...args: ClassNameArgs
) => string | undefined;

interface Styles {
  cx: MergeClasses;
}

const Styles = createContext<Styles>({ cx: () => void 0 });

const getClass = (name: string) => {
  if (process.env.TARGET === "development") {
    // Throw an error if the task is not found
    // in watch/development mode
    if (!(name in classes)) {
      throw new Error(`Class "${name}" not found.`);
    }
  }
  return classes[name];
};

const getThemeClass = memoize(
  (colorScheme: ColorScheme | undefined): ClassName => {
    switch (colorScheme) {
      case "light":
        return "themeLight";
      case "dark":
        return "themeDark";
      default:
        return "themeAuto";
    }
  }
);

const addClasses = (
  enabled: boolean,
  classNames: string[],
  args: ClassNameArgs
) => {
  let arg: ClassNameArgs[number], className: string;
  for (arg of args)
    if (
      arg &&
      (isString(arg) ? enabled : isPlainObject(arg) && (arg = arg.force))
    ) {
      classNames.push(getClass(arg));
    }
};

const joinClasses = (classNames: string[]) =>
  classNames.length > 0 ? classNames.join(" ") : void 0;

let injectStyleSheet = () => {
  if (typeof window === "undefined") return;
  const id = getClass("namespace");
  if (document.getElementById(id)) return;
  injectStyleSheet = noop;
  const style = document.createElement("style");
  [style.id, style.type, style.textContent] = [id, "text/css", styleSheet];
  document.head.appendChild(style);
};

const StylesProvider = ({
  noStyle,
  colorScheme,
  children,
}: {
  noStyle: boolean | undefined;
  colorScheme: ColorScheme | undefined;
  children: ReactNode;
}) => {
  useLayoutEffect(() => injectStyleSheet(), []);

  const themeClass = getThemeClass(colorScheme);

  const cx = useCallback<MergeClasses>(
    (options, ...args) => {
      let classNames: string[] = [],
        minNpLen = 1;

      const { noStyle: noComponentStyle, className } = options ?? {};

      addClasses(!(noComponentStyle ?? noStyle), classNames, args);

      if (className) {
        minNpLen = 2;
        classNames.push(className);
      }

      if (classNames.length >= minNpLen) {
        classNames.unshift(getClass("namespace"), getClass(themeClass));
      }

      return joinClasses(classNames);
    },
    [noStyle, themeClass]
  );

  const state = useMemo<Styles>(() => ({ cx }), [cx]);

  return <Styles.Provider value={state}>{children}</Styles.Provider>;
};

const useStyles = () => useContext(Styles);

const useClasses: MergeClasses = (...args) => useStyles().cx(...args);

export { StylesProvider, useStyles, useClasses };
