import { getChildComponentProps, isArray, isRenderable } from "../utils";
// import {
//   ReactElement,
//   isValidElement,
//   FunctionComponent,
//   MouseEventHandler,
// } from "react";
import { arrString, isString, cn, isFunction, isObject } from "../utils";
import { DetailProps, OptionProps } from "./gen";
import { Detail } from "../src/components/Detail";
import { getRenderable } from "../utils/renderable";
import { isStringArray } from "../utils/is/is";

// Constructors

export class OptionError extends Error {
  prop: string;
  fatal: boolean;
  label: string;
  toPretty() {
    let message = `Search: ${this.name ? `${this.name}: ` : ""}`;
    if (this.prop)
      message += `Invalid prop '${this.prop}'${
        this.name === "Detail Error" ? " on Detail" : ""
      }.`;
    if (this.message) message += ` ${this.message}`;
    // if (this.label) message += ` (Option: ${this.label})`;
    message += "\n\n";
    if (this.fatal) {
      message += "Fatal: ";
    } else {
      message += "Minor: ";
    }
    if (this.name === "Detail Error") {
      message += this.fatal
        ? `Detail will not display ${
            this.label ? `under '${this.label}'` : "in the option preview"
          } until ${this.prop ? `'${this.prop}'` : "the issue"} is fixed.`
        : `Detail will still appear in ${
            this.label ? `under '${this.label}'` : "in the option preview"
          } without ${this.prop ? `'${this.prop}'` : "the problem prop"}.`;
    } else {
      message += this.fatal
        ? `Will not appear in search results until ${
            this.prop ? `'${this.prop}'` : "the issue"
          } is fixed.`
        : `Will still appear in search results without ${
            this.prop ? `'${this.prop}'` : "the problem prop"
          }.`;
    }
    if (this.label) message += `\nOption: '${this.label}'`;
    return message;
  }
  constructor(
    message: string,
    {
      prop,
      fatal,
      label,
      name = "Option",
    }: {
      prop: keyof OptionProps | keyof DetailProps;
      fatal?: boolean;
      label?: string;
      name?: "Detail" | "Option";
    }
  ) {
    super(message);
    this.prop = prop;
    this.fatal = fatal || false;
    this.label = label || "";
    this.name = name + " Error";
  }
}

// For internal use only
export class Searchable {
  label: OptionProps["label"];
  sublabel?: OptionProps["sublabel"];
  img?: OptionProps["img"];
  href?: OptionProps["href"];
  details: DetailProps[];
  onClick?: OptionProps["onClick"];
  tinyErrors: OptionError[];
  media?: OptionProps["media"];
  preview?: OptionProps["preview"];
  button?: OptionProps["button"];
  arrow?: OptionProps["arrow"];
  keywords: string[];
  id: string;

  constructor(
    {
      id,
      label,
      keywords,
      sublabel,
      href,
      onClick,
      img,
      children,
      ...rest
    }: OptionProps & { id: string } // existingIds: string[]
  ) {
    this.tinyErrors = [];
    // const tinyErr = (err: string) => this.tinyErrors.push(err);
    const minorError = (...args: ConstructorParameters<typeof OptionError>) =>
      this.tinyErrors.push(
        new OptionError(args[0], { ...args[1], label: label })
      );

    const detailError = (...args: ConstructorParameters<typeof OptionError>) =>
      new OptionError(args[0], { ...args[1], label: label, name: "Detail" });

    if (!id && !isString(id))
      throw new Error(
        "Cannot create a Search option without a unique string id."
      );

    this.id = id;

    if (!label || !isString(label)) {
      throw new OptionError(
        "Cannoot create a Search option without a valid label (must be string).",
        {
          prop: "label",
          fatal: true,
        }
      );
    }
    this.label = label;

    if (sublabel) {
      if (isRenderable(sublabel)) {
        this.sublabel = sublabel;
      } else {
        minorError(
          "Sublabels can either be a string, number or ReactElement. It has been excluded from the option.",
          {
            prop: "sublabel",
          }
        );
      }
    }

    if (href) {
      if (isString(href)) {
        this.href = href;
      } else {
        minorError(
          "A link needs to be a string, so it has been excluded from the option.",
          { prop: "href" }
        );
      }
    }

    if (img) {
      if (isValidImg(img)) {
        this.img = img;
      } else {
        minorError(
          "An image must be an object with a required 'src' (string) and an optional 'alt' (string), i.e. { img: './...', alt: 'sample alt'}. The image has been excluded from the option.",
          { prop: "img" }
        );
      }
    }

    if (onClick) {
      if (isFunction(onClick)) {
        this.onClick = onClick;
      } else {
        minorError(
          "The option click handler must be function. It has been excluded from the option.",
          { prop: "onClick" }
        );
      }
    }

    const components: { key: keyof typeof rest; func: string; hash: string }[] =
      [
        { key: "arrow", func: "ArrowComponent", hash: "arrow" },
        { key: "media", func: "MediaComponent", hash: "media" },
        { key: "preview", func: "PreviewComponent", hash: "preview" },
        { key: "button", func: "ButtonComponent", hash: "button" },
      ];

    for (const component of components) {
      if (rest[component.key]) {
        const custom = { obj: rest[component.key], key: component.key };
        if (isFunction(custom.obj)) {
          this[custom.key] = custom.obj as any;
        } else if (isRenderable(custom.obj)) {
          this[custom.key] = getRenderable(custom.obj) || undefined;
        } else {
          minorError(
            `The '${
              custom.key
            }' prop accepts any renderable object OR a custom '${
              component.func
            }' constructor (function). See examples and more on using '${
              custom.key
            }': ${getLibUrl(component.hash)}`,
            { prop: custom.key }
          );
        }
      }
    }

    // if (media) {
    //   if (isValidElement(media)) {
    //     this.media = media;
    //   } else {
    //     minorError(
    //       "Media must be a valid ReactElement, so it has been excluded from the option.",
    //       { prop: "media" }
    //     );
    //   }
    // }

    // if (preview) {
    //   if (isValidElement(preview)) {
    //     this.preview = preview;
    //   } else {
    //     minorError(
    //       "Preview must be a valid ReactElement, so it has been excluded from the option.",
    //       { prop: "preview" }
    //     );
    //   }
    // }

    // if (button) {
    //   if (isValidElement(button)) {
    //     this.button = button;
    //   } else {
    //     minorError(
    //       "Button must be a valid ReactElement, so it has been excluded from the option.",
    //       { prop: "button" }
    //     );
    //   }
    // }

    // if (arrow) {
    //   if (isRenderable(arrow) || isFunction(arrow)) {
    //     this.arrow = arrow;
    //   } else {
    //     minorError(
    //       cn(
    //         "Arrow can either be a custom Arrow component or a 'renderable' object. Learn more:",
    //         getLibUrl("arrow")
    //       ),
    //       { prop: "arrow" }
    //     );
    //   }
    // }

    this.keywords = [label];

    const addKeywords = (others: any[]) =>
      others.forEach(
        (keyword) => isString(keyword) && this.keywords.push(keyword)
      );

    if (keywords) {
      if (isFunction(keywords)) {
        try {
          const interpretedKeywords = keywords(arrString);
          if (isStringArray(interpretedKeywords)) {
            addKeywords(interpretedKeywords);
          } else {
            addKeywords(
              isArray(interpretedKeywords)
                ? interpretedKeywords
                : ([interpretedKeywords] as any[])
            );
            throw new OptionError(
              cn(
                "Function resolved to",
                isArray(interpretedKeywords)
                  ? "an array with non-string values."
                  : "an object that is not an array.",
                "Did you return the built-in interpreter function? See examples of acceptable usage:",
                getLibUrl("#keyword-interpreter-grin")
              ),
              { prop: "keywords" }
            );
          }
        } catch (e) {
          if (e instanceof OptionError) {
            this.tinyErrors.push(e);
          } else {
            console.error(e);
          }
        }
      } else if (isArray(keywords)) {
        if (isStringArray(keywords)) {
          addKeywords(keywords);
        } else {
          minorError(
            cn(
              "Received an array with non-string values, 'keywords' only accepts an array of strings (or interpreter function). Attempting to filter the array. If your keywords are dependant on conditional formatting, use the built-in keyword interpreter:",
              getLibUrl("#keyword-interpreter-grin")
            ),
            { prop: "keywords" }
          );
          addKeywords(isArray(keywords) ? keywords : ([keywords] as any[]));
        }
      } else {
        minorError(
          cn(
            "You can either pass through an array of strings or function which accesses the built-in keyword interpreter/filterer. See examples:",
            getLibUrl("#keywords")
          ),
          { prop: "keywords" }
        );
      }
    }

    this.details = [];
    const details = getChildComponentProps(children, Detail);
    if (details && details.length) {
      for (const detail of details) {
        try {
          if (!isString(detail.label) || !detail.label) {
            throw detailError(
              "A detail label is required, and it must be a string.",
              { prop: "label", fatal: true }
            );
          }
          const detailValue = getRenderable(detail.value);
          if (!detailValue)
            throw detailError(
              cn(
                "Detail with label:",
                label,
                "has an invalid 'value'. The 'value' prop is required & must be a string, number, ReactFragment, ReactElement or array of those types. See acceptable examples:",
                getLibUrl("detail")
              ),
              {
                prop: "value",
                fatal: true,
              }
            );
          this.details.push({ label: detail.label, value: detailValue });
        } catch (e: any) {
          if (e instanceof OptionError) {
            this.tinyErrors.push(e);
          } else {
            console.error(e);
          }
        }
      }
    }

    // existingIds.push(id);
  }
}

const libUrl = "https://github.com/elijahharry/spotlight/tree/main/lib";
const getLibUrl = (hash: string) => libUrl + "#" + hash;

const isValidImg = (img: any): img is { src: string; alt?: string } =>
  isObject(img) &&
  img.src &&
  isString(img.src) &&
  (!img.alt ? true : isString(img.alt));
