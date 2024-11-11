import { forward, ForwardProps } from "./util/forward";
import { useClasses, WithStyle } from "./Styles";

export type ContainerOptions = WithStyle<{
  noOverflow?: boolean;
}>;

export type ContainerProps = ForwardProps<"div", ContainerOptions>;

const Container = forward.div<ContainerOptions>(
  ({ className, noStyle, noOverflow, ...props }, Element) => {
    const classes = useClasses(
      { className, noStyle },
      "container",
      !noOverflow && "overflowYAuto"
    );
    return <Element {...props} className={classes} />;
  }
);

export { Container };
