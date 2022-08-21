import styled, { css } from "styled-components";
import { classes, getVar } from "../../../../../utils/css";

export const Content = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  height: 100%;
  width: 100%;
  padding: 0.75rem;
  ${classes.inputText}
`;

export const Text = styled.span<{ visible: boolean }>`
  ${(props) =>
    !props.visible
      ? css`
          visibility: hidden;
          color: transparent;
        `
      : getVar("text-light")}
`;
