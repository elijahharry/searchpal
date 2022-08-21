import { isSame } from "../../utils";
import { useEffect, useState } from "react";

export const useRefreshLimiter = <T = any>(obj: T) => {
  const [stateObj, setStateObj] = useState(obj);
  useEffect(() => {
    if (!isSame(obj, stateObj)) setStateObj(obj);
  }, [obj, stateObj]);
  return stateObj;
};
