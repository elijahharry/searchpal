import { ariaLabel } from "./util/ariaDetail";
import { forward, ForwardProps } from "./util/forward";
import { useSearch } from "./Search";
import { useStyles, WithStyle } from "./Styles";
import { useSearchIdNode } from "./util/useSearchNode";

export type ResultsOptions = WithStyle<{
  /**
   * The default behavior will 'hide' the listbox when there are no options visible.
   * It will still be visible to screen readers.
   */
  noHide?: boolean;
}>;

export type ResultsProps = ForwardProps<"div", ResultsOptions>;

const Results = forward.div<ResultsOptions>(
  (
    { children, className, noStyle, noHide, ref: fwdRef, id: propId, ...props },
    Element
  ) => {
    const [ref, id] = useSearchIdNode("listbox", fwdRef, propId);

    const { options } = useSearch();
    const { cx } = useStyles();

    const hasOptions = options.list.length > 0;

    const overrideProps: JSX.IntrinsicElements["div"] = {
      id,
      ref,
      role: "listbox",
      tabIndex: -1,
      className: cx(
        { className, noStyle },
        !hasOptions && !noHide && { force: "srOnly" }
      ),
      ...ariaLabel(props, "Search results"),
    };

    if (hasOptions) {
      overrideProps["aria-owns"] = options.ids.join(" ");
    }

    let labelNode: JSX.Element | null = null;

    return (
      <Element {...props} {...overrideProps}>
        {labelNode}
        {children}
      </Element>
    );
  }
);

export { Results };
