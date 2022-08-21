import React, { PropsWithChildren } from "react";
import { isFunction } from "../../../../utils";
import { useSearch } from "../../../context";

export const Link = ({
  children,
  href,
  target,
}: PropsWithChildren<{
  href?: string | null;
  target?: string;
}>) => {
  const { link: CustomLink } = useSearch();

  if (isFunction(CustomLink) && href) {
    return (
      <CustomLink href={href} target={target}>
        {children}
      </CustomLink>
    );
  }
  return <>{children}</>;
};
