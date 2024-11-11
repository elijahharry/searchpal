import {
  cloneElement,
  isValidElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useCallback,
} from "react";
import { debug } from "./util/notice";
import { isFunction } from "amenities";
import { useSearch, useSearchMethods } from "./Search";
import { useMergeCallbacks } from "./util/useMergeCallbacks";

export interface TriggerChildProps {
  "aria-haspopup": boolean;
  "aria-expanded": boolean;
  "aria-controls"?: string;
  "data-opens"?: string;
  onClick: MouseEventHandler<HTMLElement>;
}

export type TriggerChildCallback = (props: TriggerChildProps) => ReactNode;

export type TriggerChildren = ReactNode | TriggerChildCallback;

export type TriggerProps = {
  children?: TriggerChildren;
};

const TriggerElement = ({
  target,
  props,
}: {
  target: ReactElement;
  props: TriggerChildProps;
}) => {
  const onClick = useMergeCallbacks(target.props.onClick, props.onClick);

  return cloneElement(target, {
    ...target.props,
    ...props,
    onClick,
  });
};

const applyProps = (child: TriggerChildren, props: TriggerChildProps) => {
  if (child) {
    if (isFunction(child)) {
      return child(props);
    }

    if (!isValidElement(child)) {
      debug(
        "The Trigger component expects a single child that is a valid React element, but it receieved something else. As a result, the provided children have not been passed any props."
      );
      return child;
    }

    return <TriggerElement target={child} props={props} />;
  }
};

const Trigger = ({ children }: TriggerProps) => {
  const { setOpen, ids, isOpen } = useSearch();
  const { setTriggerEvent } = useSearchMethods();

  const onClick = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      if (e.defaultPrevented) return;
      setTriggerEvent(e.nativeEvent);
      setOpen(true);
    },
    [setOpen, setTriggerEvent]
  );

  const props: TriggerChildProps = {
    "aria-haspopup": true,
    onClick,
    ...(isOpen && ids.dialog
      ? {
          "aria-expanded": true,
          "aria-controls": ids.dialog,
        }
      : { "aria-expanded": false }),
  };

  return <>{applyProps(children, props)}</>;
};

export { Trigger };
