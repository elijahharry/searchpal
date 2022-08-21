import React from "react";
import styled from "styled-components";
import { useSearch } from "../../../context";
import { classes } from "../../../../utils/css";
import { SearchProps } from "../../../../types";
import { H2, Paragraph } from "../../Typography";

export const AriaTitles = ({
  onClose,
}: {
  onClose: SearchProps["onClose"];
}) => {
  const {
    labels: { title, subtitle },
    ids: { heading },
  } = useSearch();
  return (
    <>
      <H2 sr-only id={heading}>
        {title}
      </H2>
      <Paragraph sr-only>{subtitle}</Paragraph>
      <Button onClick={() => onClose()}>Close</Button>
    </>
  );
};

const Button = styled.button`
  ${classes.srOnly}
`;
