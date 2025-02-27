import { isString } from "hoolock";
import { forward, ForwardProps } from "./util/forward";
import { useStyles, WithStyle } from "./Styles";
import { useSearch } from "./Search";
import { useEffect, useRef } from "react";
import { useSearchIdNode } from "./util/useSearchNode";

export type InputOptions = WithStyle<{
  label?: string | null | false;
  placeholder?: string | null | false;
  autoFocus?: boolean;
}>;

export type InputProps = ForwardProps<"input", InputOptions>;

const rmEllipsis = /\.\.+$/;

const defaultLabel = (placeholder: string | null | false | undefined) => {
  if (isString(placeholder) && placeholder.length) {
    return placeholder.replace(rmEllipsis, "");
  }
};

const inputProps: JSX.IntrinsicElements["input"] = {
  type: "text",
  autoComplete: "off",
};

const Input = forward.input<InputOptions>(
  (
    {
      placeholder = "Search for something...",
      label = defaultLabel(placeholder),
      ref: propRef,
      id: propId,
      className,
      noStyle,
      autoFocus = true,
      ...props
    },
    Element
  ) => {
    const [ref, id, node] = useSearchIdNode("input", propRef, propId);

    const autoFocused = useRef(false);

    const { options, selected, isOpen, ids } = useSearch();
    const { cx } = useStyles();

    useEffect(() => {
      if (!autoFocus) return;
      if (node && isOpen) {
        if (!autoFocused.current) {
          node.focus();
          autoFocused.current = true;
        }
        return;
      }
      autoFocused.current = false;
    }, [node, isOpen, autoFocus]);

    const overrideProps: JSX.IntrinsicElements["input"] = {
      id,
      ref,
      className: cx({ className, noStyle }, "input"),
      placeholder: placeholder || undefined,
      role: "combobox",
      "aria-expanded": isOpen && !!options.list.length,
      ...(ids.listbox && { "aria-controls": ids.listbox }),
    };

    if (selected) {
      overrideProps["aria-activedescendant"] = selected.id;
    }

    return (
      <>
        {!!(label && isString(label)) && (
          <label htmlFor={id} className={cx(null, "srOnly")}>
            {label}
          </label>
        )}
        <Element {...inputProps} {...props} {...overrideProps} />
      </>
    );
  }
);

export { Input };
