import { isString } from "amenities";
import { useMemo, useRef } from "react";
import { randomId, safeId } from "./id";
import { noop } from "./noop";

const useId: (id?: string | undefined) => string | undefined =
  typeof window === "undefined"
    ? noop
    : (providedId) => {
        const fallbackId = useRef<string>();
        return useMemo(
          () =>
            providedId && isString(providedId)
              ? safeId(providedId)
              : (fallbackId.current ??= randomId()),
          [providedId]
        );
      };

export { useId };
