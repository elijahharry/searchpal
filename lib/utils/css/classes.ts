import { css } from "styled-components";

export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const srOnlyJs = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
};

export const inputText = css`
  white-space: pre;
  font-size: 1rem;
  /* line-height: 1rem; */
`;

export const truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const truncateJs = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const bg = {
  "background-color": "var(--spotlight-bg)",
};

export const border = {
  "border-color": "var(--spotlight-border)",
};

export const text = {
  color: {
    primary: { color: "var(--spotlight-txt)" },
    secondary: {
      color: "var(--spotlight-txt)",
      opacity: "var(--spotlight-text-light-opacity)",
    },
  },
  weight: {
    light: {
      "font-weight": "300",
    },
    normal: {
      "font-weight": "400",
    },
    medium: {
      "font-weight": "500",
    },
    semibold: {
      "font-weight": "600",
    },
    bold: {
      "font-weight": "700",
    },
  },
  size: {
    xs: {
      "font-size": ".75rem",
      "line-height": "1rem",
    },
    sm: {
      "font-size": ".875rem",
      "line-height": "1.25rem",
    },
    smd: {
      "font-size": ".925rem",
      "line-height": "1.35rem",
    },
    md: {
      "font-size": "1rem",
      "line-height": "1.5rem",
    },
    lg: {
      "font-size": "1.125rem",
      "line-height": "1.75rem",
    },
  },
};

export const accent = {
  bg: {
    "background-color": "var(--spotlight-accent)",
    color: "var(--spotlight-accent-txt)",
  },
  text: {
    color: "var(--spotlight-accent)",
  },
};
