import styled from "styled-components";
import { classes, getVarClass } from "../../../../utils/css";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  width: auto;
  left: 0;
`;

export const SvgIcon = styled.svg`
  ${getVarClass("text-light")}
  height: 22px;
  width: 22px;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
`;

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
  height: auto;
  ${getVarClass("text")}
`;

export const Input = styled.input`
  position: relative;
  z-index: 10;
  height: auto;
  padding: 0.75rem;
  border-width: 0;
  background-color: transparent;
  display: block;
  width: 100%;
  box-sizing: border-box;
  ${getVarClass("text")};
  &::placeholder {
    ${getVarClass("text-light")}
  }
  &:focus {
    outline: none;
  }
  ${classes.inputText}
`;
