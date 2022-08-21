import { useEffect, useRef, useState } from "react";

export const useAnimatedRender: (
  visible?: boolean | null | undefined,
  duration?: number | null
) => [render: boolean, show: boolean, transitioning: boolean] = (
  visible,
  duration
) => {
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(visible === true ? true : false);

  const delay = useRef(duration || 150);
  useEffect(() => {
    delay.current = duration || 150;
  }, [duration]);

  useEffect(() => {
    if (visible) {
      setRender(true);
      const timer = setTimeout(() => setShow(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      const timer = setTimeout(() => setRender(false), delay.current);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const timer = setTimeout(() => setTransitioning(false), delay.current);
    return () => clearTimeout(timer);
  }, [show]);

  return [render, show, transitioning];
};
