import React, { FunctionComponent } from "react";
import { DetailProps } from "../../../types";

import { Label, Value } from "./Detail.styled";
import { Link } from "../Search/Link";

export const Detail: FunctionComponent<DetailProps> = ({
  label,
  href,
  value,
}) => {
  return (
    <>
      <Label>{label}</Label>
      <Value>
        <Link href={href} target="_blank">
          {value}
        </Link>
      </Value>
    </>
  );
};
