import { border } from "./classes";

export const getVar = (
  variable: "text" | "text-light" | "bg" | "border"
): { [key: string]: string } => {
  switch (variable) {
    case "text":
      return { color: "var(--txt)" };
    case "text-light":
      return {
        color: "var(--txt)",
        opacity: "var(---text-light-opacity)",
      };
    case "bg":
      return { "background-color": "var(--bg)" };
    case "border":
      return {
        "border-color": "var(--border)",
      };
    default:
      return {};
  }
};

export const getBorder = (position?: "top" | "bottom" | "left" | "right") => {
  return {
    ...border,
    [`border${position ? `-${position}` : ""}-width`]: "1px",
    [`border${position ? `-${position}` : ""}-style`]: "solid",
  };
};
