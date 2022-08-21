import styled, { css } from "styled-components";
import { getBorder } from "../../../../utils/css";

export const Container = styled.div<{ animate: boolean; height: number }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: ${(props) => `${props.height}px`};
  ${getBorder("top")}
  ${(props) =>
    props.animate &&
    css`
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      transition-duration: 0.2s;
      transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    `}
`;

export const Main = styled.div`
  position: absolute;
  top: 1;
  left: 0;
  display: flex;
  height: auto;
  width: 100%;
  align-items: stretch;
`;

export const Column = styled.div<{ pad: boolean; left?: boolean }>`
  width: 50%;
  padding: ${(props) => (props.pad ? "1rem" : "0px")};
  ${(props) => props.left && { flexGrow: 1 }}
`;

export const ResultsList = styled.ul`
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;
  & > :not([hidden]) ~ :not([hidden]) {
    margin-top: 0.25rem;
  }
`;

export const Resultless = styled.div`
  padding: 0.5rem;
`;
