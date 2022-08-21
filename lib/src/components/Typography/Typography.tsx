import styled from "styled-components";
import { classes, getVar } from "../../../utils/css";

const weights = classes.text.weight;
const sizes = classes.text.size;

type TypographyProps = {
  variant?: "span" | "p" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  weight?: keyof typeof weights;
  size?: keyof typeof sizes;
  "sr-only"?: boolean;
  fade?: boolean;
  truncate?: boolean;
  align?: "center" | "left" | "right";
};

type StyledProps = Omit<TypographyProps, "variant">;

export const H1 = styled.h1<StyledProps>`
  ${(props) => getStyles({ ...props, variant: "h1" })}
`;
export const H2 = styled.h2<StyledProps>`
  ${(props) => getStyles({ ...props, variant: "h2" })}
`;
export const H3 = styled.h3<StyledProps>`
  ${(props) => getStyles({ ...props, variant: "h3" })}
`;
export const H4 = styled.h4<StyledProps>`
  ${(props) => getStyles({ ...props, variant: "h4" })}
`;
export const H5 = styled.h5<StyledProps>`
  ${(props) => getStyles({ ...props, variant: "h5" })}
`;
export const H6 = styled.h6<StyledProps>`
  ${(props) => getStyles({ ...props, variant: "h6" })}
`;
export const Paragraph = styled.p<StyledProps>`
  ${(props) => getStyles({ ...props, variant: "p" })}
`;
export const Label = styled.label<StyledProps>`
  ${(props) => getStyles({ ...props, variant: "label" })}
`;

export const Span = styled.span<StyledProps>`
  ${(props) => getStyles({ ...props, variant: "span" })}
`;

const getStyles = (props: TypographyProps) => {
  let size = props.size ? sizes[props.size] : null,
    weight = props.weight ? weights[props.weight] : null;
  switch (props.variant) {
    case "h1":
      if (!size) size = sizes.lg;
      if (!weight) weight = weights.bold;
      break;
    case "h2":
      if (!size) size = sizes.lg;
      if (!weight) weight = weights.bold;
      break;
    case "h3":
      if (!size) size = sizes.lg;
      if (!weight) weight = weights.bold;
      break;
    case "h4":
      if (!size) size = sizes.md;
      if (!weight) weight = weights.bold;
      break;
    case "h5":
      if (!size) size = sizes.md;
      if (!weight) weight = weights.bold;
      break;
    case "h6":
      if (!size) size = sizes.md;
      if (!weight) weight = weights.normal;
      break;
    default:
      if (!size) size = sizes.md;
      if (!weight) weight = weights.normal;
      break;
  }
  const truncate = props?.truncate ? classes.truncateJs : {},
    sr = props["sr-only"] ? classes.srOnlyJs : {},
    color = props.fade ? getVar("text-light") : getVar("text");
  return {
    // margin: "0",
    marginTop: 0,
    marginBottom: 0,
    ...(props.align ? { textAlign: props.align } : {}),
    ...size,
    ...weight,
    ...color,
    ...sr,
    ...truncate,
  };
};
