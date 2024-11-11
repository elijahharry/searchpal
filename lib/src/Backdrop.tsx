import { forward, ForwardProps } from "./util/forward";
import { useSearch } from "./Search";
import { useClasses, WithStyle } from "./Styles";

export type BackdropOptions = WithStyle<{}>;

export type BackdropProps = ForwardProps<"span", BackdropOptions>;

const Backdrop = forward.span<BackdropOptions>(
  ({ className, noStyle, ...props }, Element) => {
    const { isVisible } = useSearch();

    const classes = useClasses(
      { className, noStyle },
      "backdrop",
      isVisible ? "revealBackdrop" : "hideBackdrop"
    );

    return <Element {...props} className={classes} />;
  }
);

export { Backdrop };
