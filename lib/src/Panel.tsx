import { createContext, useContext, useState } from "react";
import { useIsomporhicLayoutEffect } from "./util/useIsomorphicLayoutEffect";
import { useSemanticMemo } from "./util/useSemanticMemo";
import { getTransition } from "./util/getTransition";
import { startElementEventListener } from "./util/listener";
import { startTimeout } from "./util/startTimeout";
import { forward, ForwardProps } from "./util/forward";
import { useSearch } from "./Search";
import { useStyles, WithStyle } from "./Styles";
import { useSearchNode } from "./util/useSearchNode";

export type PanelOptions = WithStyle<{}>;

export type PanelProps = ForwardProps<"div", PanelOptions>;

const Panel = forward.div<PanelOptions>(
  ({ children, ref: propRef, className, noStyle, ...props }, Ctn) => {
    const [ref, node] = useSearchNode("panel", propRef);
    const { isVisible } = useSearch();
    const { cx } = useStyles();

    const visible = useSemanticMemo(
      () =>
        isVisible && {
          at: Date.now(),
        },
      [isVisible]
    );

    const [hoverEvents, setHoverEvents] = useState(false);

    useIsomporhicLayoutEffect(() => {
      if (!(visible && node)) return setHoverEvents(false);

      const listen = () => {
        const remove = startElementEventListener(node, "mousemove", () => {
          setHoverEvents(true);
          remove();
        });
        return remove;
      };

      const style = node.style,
        pointerEvents = node.style.pointerEvents;

      if (pointerEvents === "none") return listen();
      const transition = getTransition(node);

      if (!transition) return listen();

      const offset = (transition.ms - (Date.now() - visible.at)) * 10;
      if (offset <= 5) return listen();

      style.pointerEvents = "none";
      const destruct = () => {
        destructors.forEach((fn) => fn());
      };

      const begin = () => {
        destruct();
        destructors.length = 0;
        destructors.push(listen());
      };

      const destructors: Array<() => void> = [
        () => (style.pointerEvents = pointerEvents),
        startElementEventListener(node, "transitionend", begin),
        startTimeout(begin, offset),
      ];

      return destruct;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    return (
      <HoverEvents.Provider value={hoverEvents}>
        <Ctn
          {...props}
          ref={ref}
          className={cx(
            { noStyle, className },
            "panel",
            isVisible ? "revealPanel" : "hidePanel"
          )}
        >
          {children}
        </Ctn>
      </HoverEvents.Provider>
    );
  }
);

const HoverEvents = createContext(
  // Default to true, in-case user is not using the Panel component
  true
);
HoverEvents.displayName = "HoverEvents";

const usePanelHoverEvents = () => useContext(HoverEvents);

export { Panel, usePanelHoverEvents };
