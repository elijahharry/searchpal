import styled from "styled-components";

export const Hidden = styled.div`
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
