import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { classes } from "../../../../../../utils/css";

import { Span } from "../../../../Typography";

export const Button = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <ButtonBase type="button" onClick={onClick}>
      <Label weight="bold" truncate align="center">
        Select
      </Label>
    </ButtonBase>
  );
};

const Label = styled(Span)`
  position: relative;
  z-index: 5;
  /* text-transform: uppercase; */
  color: ${classes.accent.bg.color};
`;

const ButtonBase = styled.button`
  padding: 0.7rem 0.8rem;
  width: 100%;
  transition: 250ms;
  background-size: 200% auto;
  border-radius: 10px;
  display: block;
  border: 0px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.5s;
    background: linear-gradient(
      30deg,
      transparent 0%,
      transparent 20%,
      #fff 60%,
      transparent 100%
    );
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }
  &:hover {
    background-position: right center;
    text-decoration: none;
    &::after {
      transform: scaleX(1.5) translateX(-10%);
      opacity: 0.2;
    }
  }
  &:active {
    transform: scale(0.975);
  }
  ${classes.accent.bg}
`;
