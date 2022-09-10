import styled, { css } from "styled-components";
import { mediaQuery, getVarClass } from "../../../utils/css";
import { ColorVars, SearchProps } from "../../../types";

export const Container = styled.div`
  position: relative;
  z-index: 50;
`;

export const ThemeProvider = styled.div<{
  backup: ColorVars;
  theme: ColorVars;
}>`
  ${(props) => props.backup}
  ${(props) => props.theme}
`;

export const Backdrop = styled.span<{ show: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 40;
  transition-property: opacity;
  display: block;
  background-color: var(--backdrop);
  ${(props) =>
    props.show
      ? css`
          transition-duration: 200ms;
          transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
          opacity: var(--backdrop-opacity);
        `
      : css`
          transition-duration: 300ms;
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
          opacity: 0;
        `}
`;

export const ModalContainer = styled.div<{ show: boolean }>`
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  padding: 1rem;
  transition-property: opacity;
  ${(props) =>
    props.show
      ? css`
          transition-duration: 200ms;
          transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
          opacity: 1;
        `
      : css`
          transition-duration: 300ms;
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
          opacity: 0;
        `}
  ${mediaQuery("sm")} {
    padding: 2rem;
  }
  ${mediaQuery("md")} {
    padding: 3rem 2rem;
  }
  ${mediaQuery("lg")} {
    padding-top: 7%;
  }
  ${mediaQuery("xl")} {
    padding-top: 10%;
  }
`;

export const Modal = styled.div<{
  transitioning: boolean;
  animate: SearchProps["animate"];
  show: boolean;
}>`
  overflow: hidden;
  position: relative;
  z-index: 10;
  transition-property: all;
  width: 100%;
  max-width: 48rem;
  border-radius: 1rem;
  border: 1px solid var(--border);
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px var(--shadow);
  ${getVarClass("text")}
  ${getVarClass("bg")}
  ${getVarClass("shadow")}
  ${(props) =>
    props.transitioning &&
    css`
      pointer-events: none;
    `}
  ${(props) =>
    props.show
      ? css`
          transition-duration: 200ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
        `
      : css`
          transition-duration: 300ms;
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
          opacity: 0;
        `}
        ${(props) => {
    const { animate, show } = props;
    switch (animate) {
      case "grow":
        return show
          ? css`
              transform: scale(100);
            `
          : css`
              transform: scale(50);
            `;
      case "slide":
        return show
          ? css`
              transform: translateY(0);
            `
          : css`
              transform: translateY(12rem);
            `;
      default:
        return {};
    }
  }}
`;
