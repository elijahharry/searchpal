import { RefCallback, useCallback, useState } from "react";

function useRefCallback<T>(): [RefCallback<T>, T | null] {
  const [value, setValue] = useState<T | null>(null);
  const ref = useCallback<RefCallback<T>>((node) => setValue(node), []);

  return [ref, value];
}

export { useRefCallback };
