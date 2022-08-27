import React from "react";
import styled from "styled-components";
import { getVarClass } from "../../../../../../utils/css";

export const Arrow = () => {
  return (
    <Container aria-hidden>
      <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z" />
      </Svg>
    </Container>
  );
};

const Container = styled.div`
  ${getVarClass("text")}
`;

const Svg = styled.svg`
  stroke: currentColor;
  fill: currentColor;
  height: 11px;
  width: 11px;
  stroke-width: 0px;
`;
