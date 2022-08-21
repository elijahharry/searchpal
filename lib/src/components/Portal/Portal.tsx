import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const Portal = ({
  id,
  render,
  children,
}: PropsWithChildren<{ id: string; render?: boolean }>) => {
  const content = <div id={id}>{children}</div>;

  if (typeof window === "object") {
    const main = document.querySelector("body");
    if (main) {
      return createPortal(content, main);
    }
  }

  return null;
};
