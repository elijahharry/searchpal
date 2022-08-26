import styled, { css } from "styled-components";
import { getBorder, getVar, mediaQuery } from "../../../../utils/css";

export const Container = styled.div<{
  show: boolean;
  border: boolean;
}>`
  overflow: hidden;
  position: relative;
  z-index: 10;
  transition-property: all;
  padding: 1rem;
  ${(props) => props.border && getBorder("top")}
  ${(props) =>
    props.show
      ? css`
          transition-duration: 100ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          transition-duration: 150ms;
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(5rem);
        `}
`;

export const Alert = styled.div`
  background-color: #ff0e0e10;
  color: #f11414;
  display: flex;
  align-items: flex-start;
  /* border: 1px solid var(--border); */
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px #ff000010;
  border-radius: 0.5rem;
  padding: 0.8rem;
  justify-content: space-between;
  & svg {
    flex-shrink: 0;
  }
`;

export const Title = styled.h3`
  margin: 0px 0px;
  font-size: 1rem;
  line-height: 1;
  font-weight: 500;
  font-size: 0.85rem;
  padding-right: 0.5rem;
  /* ${getVar("text")}; */
  ${mediaQuery("sm")} {
    font-size: 0.95rem;
  }
  /* margin: 0 0.6rem; */
`;

export const Subtitle = styled.p`
  margin: 0;
  padding-top: 0.25rem;
  font-size: 0.75rem;
  opacity: 0.8;
  /* font-style: italic; */
`;
