import { useState, useEffect } from "react";
import { getRand } from "../../utils";

export const useUuid = () => {
  const [uid, setUid] = useState("");
  useEffect(() => {
    setUid((current) => (!current ? getRand() : current));
  }, []);
  return uid;
};
