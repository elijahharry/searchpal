export const getVarClass = (
  variable:
    | "text"
    | "text-light"
    | "bg"
    | "border"
    | "shadow"
    | "option"
    | "option-selected"
): { [key: string]: string } => {
  switch (variable) {
    case "text":
      return { color: "var(--txt)" };
    case "text-light":
      return { color: "var(--txt-secondary)" };
    case "bg":
      return { "background-color": "var(--bg)" };
    case "border":
      return {
        "border-color": "var(--border-color)",
        "border-width": "var(--border-width)",
      };
    case "shadow":
      return {
        boxShadow: "var(--shadow)",
      };
    case "option":
      return {
        backgroundColor: "var(--option-bg)",
        "--txt": "var(--option-txt)",
        color: "var(--option-txt)",
      };
    case "option-selected":
      return {
        backgroundColor: "var(--selected-option-bg)",
        color: "var(--selected-option-txt)",
        "--txt": "var(--selected-option-txt)",
      };
    default:
      return {};
  }
};

export const getVar = (variable: "accent" | "accent-txt") => {
  switch (variable) {
    case "accent":
      return "var(--accent)";
    case "accent-txt":
      return "var(--accent-txt)";
    default:
      return "";
  }
};

export const getBorder = (position?: "top" | "bottom" | "left" | "right") => {
  return {
    ...getVarClass("border"),
    [`border${position ? `-${position}` : ""}-style`]: "solid",
  };
};
