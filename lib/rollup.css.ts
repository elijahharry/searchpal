import { entries, memoize, remap } from "amenities";
import json5 from "json5";
import prettier from "prettier";

import { Plugin } from "rollup";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import rename from "postcss-rename";
// @ts-expect-error
import _prefix from "postcss-prefix-selector";
import path from "path";

const prefix = _prefix as {
  (options: {
    prefix: string;
    transform(
      prefix: string,
      selector: string,
      prefixedSelector: string
    ): string;
  }): postcss.Plugin;
};

const { stringify } = json5;

const randomHash = (length = 8) => {
  let abc = "abcdefghijklmnopqrstuvwxyz";
  abc += abc.toUpperCase();
  return Array.from({ length })
    .map(() => abc[Math.floor(Math.random() * abc.length)])
    .join("");
};

const classPrefix = "sp-"; // Short for 'searchpal'

const processCSS = memoize(async (css: string) => {
  let classes: Record<string, string> = {};

  const namespace = `${classPrefix}${randomHash()}`;

  const namespacePrefix = `.${namespace}`;

  const res = await postcss(
    postcss([
      {
        postcssPlugin: "postcss-apply",
        Once(root) {
          root.walkAtRules("apply", (rule) => {
            let classes = rule.params.toString().replace(/\s/g, " ").split(" ");
            classes.forEach((selector) => {
              const classSelector = `.${selector}`,
                root = rule.root();

              const decls: postcss.Declaration[] = [];

              root.walkRules((rule) => {
                const hasSelector = rule.selectors.some((ruleSelector) => {
                  return ruleSelector === classSelector;
                });
                if (!hasSelector) return;
                rule.walkDecls((decl) => {
                  decls.push(decl);
                });
              });

              decls.forEach((decl) => {
                if (!rule.parent) return;
                rule.parent.append({
                  prop: decl.prop,
                  value: decl.value,
                });
              });
            });
            rule.remove();
          });
        },
      },
      autoprefixer({
        overrideBrowserslist: [
          "> 0.01%",
          "last 10 versions",
          "Firefox ESR",
          "not dead",
        ],
        grid: true,
      }),
      cssnano(),
      prefix({
        prefix: namespacePrefix,
        transform(prefix, selector) {
          const prefixed = /^\./.test(selector)
            ? `${prefix}${selector}`
            : `${prefix} ${selector}`;
          return `:where(${prefixed})`;
        },
      }),
      rename({
        prefix: classPrefix,
        except: [namespace],
        outputMapCallback: (map) => (classes = map),
      }),
    ])
  ).process(css, { from: undefined });

  classes = remap({ ...classes, namespace }).entries(([original, renamed]) => {
    const camel = original.replace(/-([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    return [camel, renamed];
  });

  return { styleSheet: res.css, classes };
});

export function css({
  outputCSS = false,
}: {
  outputCSS?: boolean;
} = {}): Plugin {
  const cssFile = /\.css$/;

  let styleSheets: Record<string, string> = {};
  const idCounts: Record<string, number> = {};
  const getStyleSheetId = memoize((id: string) => {
    const basename = path.basename(id, ".css");
    const i = (idCounts[basename] ??= 0);
    idCounts[basename] = i + 1;
    return [basename, i].filter(Boolean).join("-");
  });

  return {
    name: "css-transform",
    buildStart() {
      styleSheets = {};
    },
    async transform(code, id) {
      if (!cssFile.test(id)) return null;

      const { styleSheet, classes } = await processCSS(code);

      const transformedCode = [
        `export const classes = ${stringify(classes)};`,
        `export const styleSheet = ${stringify(styleSheet)};`,
      ].join("\n");

      styleSheets[getStyleSheetId(id)] = styleSheet;

      return {
        code: transformedCode,
        map: null,
      };
    },
    async generateBundle(options, bundle) {
      if (!outputCSS) return;

      await Promise.all(
        entries(styleSheets).map(async ([id, css]) => {
          css = await prettier.format(css, {
            parser: "css",
          });

          const fileName = `${id}.css`;

          bundle[fileName] = {
            type: "asset",
            source: css,
            fileName,
            needsCodeReference: false,
            names: [],
            originalFileNames: [],
            name: fileName,
            originalFileName: "",
          };
        })
      );
    },
  };
}
