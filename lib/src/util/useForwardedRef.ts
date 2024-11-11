import { ForwardedRef, useImperativeHandle } from "react";
import { useRefCallback } from "./useRefCallback";

const useForwardedRef = <T>(fwdRef: ForwardedRef<T>) => {
  const [ref, node] = useRefCallback<T>();
  useImperativeHandle(fwdRef, () => node!, [node]);
  return [ref, node] as const;
};

export { useForwardedRef };
