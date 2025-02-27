import { useEffect, SyntheticEvent, useCallback } from "react";
import { warn } from "./util/notice";
import { forward, ForwardProps } from "./util/forward";
import { useId } from "./util/useId";
import { isMatch, isString } from "hoolock";
import { useSearchMethods, useSelectedId } from "./Search";
import { useDeepMemo } from "./util/useDeepMemo";
import { useMergeCallbacks } from "./util/useMergeCallbacks";
import { useClasses, WithStyle } from "./Styles";
import { useForwardedRef } from "./util/useForwardedRef";
import { usePanelHoverEvents } from "./Panel";

export type OptionInput<Data = any> = {
  id: string;
  data?: Data;
};

type Option<Data = any> = OptionInput<Data> & {
  node: HTMLDivElement;
};

export type OptionConfig<Data = any> = WithStyle<
  OptionInput<Data> & {
    /**
     * Provide a custom comparison function for the option's data.
     * Prevents unecessary re-renders when the data has not changed.
     * Performs a shallow equality check by default.
     */
    compare?(a: Data, b: Data): boolean;
  }
>;

export type OptionProps<Data = any> = ForwardProps<"div", OptionConfig<Data>>;

const Option = forward.div<OptionConfig>(
  (
    {
      id: propId,
      data: propData,
      compare,
      noStyle,
      className,
      onMouseEnter,
      onClick,
      onFocus,
      ref: fwdRef,
      ...htmlProps
    },
    Container
  ) => {
    if (process.env.NODE_ENV !== "production") {
      if (!(propId && isString(propId))) {
        warn.once(
          'Receieved an option without a valid "id" prop. All options should have a unique "id" prop. Without it, the search component may not work as expected.'
        );
      }
    }

    const { setOption, setSelected, submit } = useSearchMethods(),
      selectedId = useSelectedId();

    const id = useId(propId),
      [ref, node] = useForwardedRef(fwdRef);

    const data = useDeepMemo(propData, compare || isMatch);

    useEffect(() => {
      if (!(id && node)) return;
      return setOption({ id, node, data });
    }, [id, node, data, setOption]);

    const hoverEvents = usePanelHoverEvents();

    const handleSelect = useCallback(
      (e: SyntheticEvent<HTMLDivElement>) => {
        if (e.defaultPrevented) return;
        if (id) setSelected(id);
      },
      [setSelected, id]
    );

    const handleMouseEnter = useMergeCallbacks(
      onMouseEnter,
      (e) => hoverEvents && handleSelect(e),
      [handleSelect, hoverEvents]
    );

    const handleClick = useMergeCallbacks(
      onClick,
      (e) => {
        if (e.defaultPrevented) return;
        if (id) submit(id);
      },
      [submit, id]
    );

    const handleFocus = useMergeCallbacks(onFocus, (e) => handleSelect(e), [
      handleSelect,
    ]);

    const isSelected = !!(id && selectedId === id);

    const props: JSX.IntrinsicElements["div"] = {
      tabIndex: 0,
      ...htmlProps,
      className: useClasses(
        { noStyle, className },
        "option",
        isSelected && "selectedOption"
      ),
      role: "option",
      "aria-selected": isSelected,
      id,
      ref,
      onMouseEnter: handleMouseEnter,
      onClick: handleClick,
      onFocus: handleFocus,
    };

    return <Container {...props} />;
  }
) as <Data = any>(props: OptionProps<Data>) => JSX.Element;

export { Option };
