import { useRef } from "react";

const useEncase = <T>(value: T) => {
  const ref = useRef<T>(value);
  if (ref.current !== value) {
    ref.current = value;
  }
  return ref;
};

export { useEncase };
