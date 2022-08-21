import { useState, useEffect, useMemo } from "react";
import { useSearch } from "../context";

export const useScreenSize = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const grabSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    grabSize();
    window.addEventListener("resize", grabSize);
    return () => window.removeEventListener("resize", grabSize);
  }, []);

  const context = useSearch();
  const breakpoints = context?.breakpoints;
  const showPreview = useMemo(() => {
    const breakAt = breakpoints.preview || 580;
    if (width >= breakAt) {
      return true;
    }
    return false;
  }, [width, breakpoints]);

  return { width, height, showPreview };
};
