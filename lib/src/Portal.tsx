import { createPortal } from "react-dom";
import { forward, ForwardProps } from "./util/forward";
import { ReactNode } from "react";
import { isFunction } from "amenities";
import { Search, useSearch } from "./Search";
import { useStyles, WithStyle } from "./Styles";
import { useSearchIdNode } from "./util/useSearchNode";
import { ariaLabel, ariaDescription } from "./util/ariaDetail";

export type PortalOptions = WithStyle<{
  container?: Element | DocumentFragment;
  /** Optionally pass through a render function. It will only be called when the search modal is open, which can improve performance. */
  children?: ReactNode | ((search: Search) => ReactNode);
}>;

export type PortalProps = ForwardProps<"div", PortalOptions>;

type RenderPortalProps = WithStyle<{
  Container: "div";
  htmlProps: JSX.IntrinsicElements["div"];
  noStyle: boolean | undefined;
  children?: ReactNode;
  search: Search;
}>;

const Portal = forward.div<PortalOptions>(
  ({ container, noStyle, children, ...htmlProps }, Container) => {
    const search = useSearch();

    if (search.isOpen) {
      const props: RenderPortalProps = {
        Container,
        htmlProps,
        noStyle,
        search,
      };

      return createPortal(
        <RenderPortal {...props}>
          {isFunction(children) ? children(search) : children}
        </RenderPortal>,
        container ?? document.body
      );
    }

    return null;
  }
);

const RenderPortal = ({
  Container,
  htmlProps,
  noStyle,
  children,
  search,
}: RenderPortalProps) => {
  const { cx } = useStyles();

  const [ref, id] = useSearchIdNode(
    "dialog",
    // @ts-expect-error
    htmlProps.ref,
    htmlProps.id
  );

  const { close } = search;

  const props: JSX.IntrinsicElements["div"] = {
    role: "dialog",
    "aria-modal": true,
    ...htmlProps,
    ...ariaLabel(htmlProps, "Search"),
    ...ariaDescription(htmlProps, "Use the input to enter a search term."),
    className: cx(
      {
        className: htmlProps.className,
        noStyle,
      },
      "portal"
    ),
    id,
    ref,
  };

  return (
    <Container {...props}>
      <button onClick={close} className={cx(null, { force: "srOnly" })}>
        Close
      </button>
      {children}
    </Container>
  );
};

export { Portal };
