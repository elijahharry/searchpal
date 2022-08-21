import { useRef, useState, useLayoutEffect, RefObject } from "react";
import { isArray } from "../../utils";

export const useRect = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T>
) => {
  let rectRef = useRef<T>(null);
  if (ref) rectRef = ref;

  const [rect, setRect] = useState({ ...empty });

  const handleResize = (entries: ResizeObserverEntry[]) => {
    if (!isArray(entries)) {
      return;
    }

    const box = entries[0]?.contentRect;
    setRect(
      box
        ? {
            height: box.height,
            width: box.width,
            top: box.top,
            left: box.left,
            right: box.right,
            bottom: box.bottom,
          }
        : { ...empty }
    );
  };

  useLayoutEffect(() => {
    if (!rectRef.current) {
      return;
    }
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      handleResize(entries)
    );
    observer.observe(rectRef.current);
    return () => observer.disconnect();
  }, [rectRef]);

  return [rectRef, rect] as [ref: typeof rectRef, rect: typeof rect];
};

const empty = { bottom: 0, top: 0, left: 0, right: 0, width: 0, height: 0 };
