import { FocusEventHandler, useEffect, useState, FocusEvent } from "react";

export const useFocus: (
  onFocus?: ((e?: FocusEvent<any, Element>) => void) | null | false,
  onBlur?: ((e?: FocusEvent<any, Element>) => void) | null | false
) => [
  focus: boolean,
  props: {
    onFocus: FocusEventHandler<any>;
    onBlur: FocusEventHandler<any>;
  },
  touched: boolean
] = (onFocus, onBlur) => {
  const [focus, setFocus] = useState(false);
  const onFocusHandler: FocusEventHandler<any> = (e) => {
    setFocus(true);
    if (onFocus && typeof onFocus === "function") onFocus(e);
  };
  const onBlurHandler: FocusEventHandler<any> = (e) => {
    setFocus(false);
    if (onBlur && typeof onBlur === "function") onBlur(e);
  };
  const [wasFocused, setWasFocused] = useState(false);
  useEffect(() => {
    if (focus) setWasFocused((latest) => (!latest ? true : latest));
  }, [focus]);

  return [
    focus,
    { onBlur: onBlurHandler, onFocus: onFocusHandler },
    wasFocused && !focus,
  ];
};
