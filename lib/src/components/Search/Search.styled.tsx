import styled, { css } from "styled-components";
import { mediaQuery, getVar } from "../../../utils/css";
import { ColorVars, SearchProps } from "../../../types";

export const Container = styled.div<{ vars: ColorVars }>`
  position: relative;
  z-index: 50;
  --spotlight-text-light-opacity: 0.5;
  ${(props) => ({ ...props.vars })};
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
  background-color: var(--spotlight-backdrop);
  ${(props) =>
    props.show
      ? css`
          transition-duration: 200ms;
          transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
          opacity: 0.5;
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
  border: 1px solid var(--spotlight-border);
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px var(--spotlight-shadow);
  ${getVar("text")}
  ${getVar("bg")}
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
      // default:
      //   return show
      //     ? css`
      //         transform: translateY(0);
      //         opacity: 100;
      //       `
      //     : css`
      //         transform: translateY(4rem);
      //         opacity: 0;
      //       `;
    }
  }}
`;

export const Children = styled.div`
  position: absolute;
  width: 0px;
  height: 0px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
  opacity: 0;
  visibility: hidden;
`;
