import { useEffect, useState } from "react";

const useScreenWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export { useScreenWidth };
