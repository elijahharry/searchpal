import { useEffect, useState } from "react";

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") setMounted(true);
  }, []);
  return mounted;
};

export { useMounted };
