import styled from "styled-components";
import { classes, getVar, mediaQuery } from "../../../../../utils/css";
import { Span } from "../../../Typography";

export const Li = styled.li<{ active: boolean }>`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 0.5rem;
  ${(props) =>
    props.active && { backgroundColor: "var(--spotlight-selected-option)" }}
  & a {
    text-decoration: none;
  }
`;

export const Details = styled.div<{ clickable: boolean }>`
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-decoration: none;
  ${(props) => props.clickable && { cursor: "pointer" }}
`;

export const Media = styled.div<{ active: boolean; showPreview: boolean }>`
  pointer-events: none;
  margin-right: 0.5rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 9999px;
  --spotlight-avatar-outline: ${(props) =>
    props.active ? "#fff" : "var(--spotlight-border)"};
  /* box-shadow: 0 0 0 1px */
  /* ${(props) => (props.active ? "#fff" : "var(--spotlight-border)")}; */
  margin-right: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  ${mediaQuery("md")} {
    width: 1.55rem;
    height: 1.55rem;
  }
  ${mediaQuery("lg")} {
    height: 1.75rem;
    width: 1.75rem;
  }
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
`;

export const Label = styled(Span)`
  display: block;
  flex: 1 1 auto;
  text-decoration: none;
  ${getVar("text")}
  ${mediaQuery("md")} {
    ${classes.text.size.smd}
  }
`;
