import { SearchMode } from "../utils/search/search";
import {
  PropsWithChildren,
  ReactElement,
  CSSProperties,
  ReactFragment,
  MouseEvent,
} from "react";
import {
  ArrowComponent,
  ButtomComponent,
  LinkComponent,
  MediaComponent,
  PreviewComponent,
} from "./components";

// export type SingleNode = ;

export type RenderableItem =
  | string
  | number
  | ReactElement
  | ReactFragment
  | false;

export type Renderable = RenderableItem | RenderableItem[];

export type SetActive = (key: string | null) => void;

export type SearchPalette = {
  accent?:
    | CSSProperties["backgroundColor"]
    | {
        color: CSSProperties["backgroundColor"];
        text?: CSSProperties["color"];
      };
  bg?: CSSProperties["backgroundColor"];
  text?: CSSProperties["color"];
  backdrop?: CSSProperties["backgroundColor"];
  border?: CSSProperties["borderColor"];
  shadow?: CSSProperties["backgroundColor"];
  optionSelected?: CSSProperties["backgroundColor"];
};

export type SearchProps = {
  open: boolean;
  onClose: () => void;
  label?: string;
  startExpanded?: boolean;
  link?: LinkComponent;
  palette?: SearchPalette | { dark?: SearchPalette; light?: SearchPalette };
  dark?: boolean | "user";
  animate?: "grow" | "fade" | "slide";
  labels?: {
    title?: string;
    subtitle?: string;
    results?: string;
    noResults?: string | { title?: string; subtitle?: string };
  };
  algo?: SearchMode;
  previewBreakpoint?: number;
};

export type SearchLabels = {
  title: string;
  subtitle: string;
  results: string;
  noResults: { title: string; subtitle: string };
};

export type SearchBreakpoints = {
  preview: number;
};

export type ColorVars = {
  "--spotlight-bg": string;
  "--spotlight-txt": string;
  // "--spotlight-txt-light": string;
  "--spotlight-border": string;
  "--spotlight-selected-option": string;
  "--spotlight-accent": string;
  "--spotlight-backdrop": string;
  "--spotlight-accent-txt": string;
  "--spotlight-shadow": string;
};

export type GetKeywords = (...args: any[]) => string[];

export type DetailProps = {
  label: string;
  value: Renderable;
  href?: string;
};

export type Img = {
  src: string;
  alt?: string;
};

export type OptionProps = PropsWithChildren<{
  label: string;
  keywords?:
    | string[]
    | ((interpreter: (...args: any[]) => string[]) => string[]);
  sublabel?: Renderable;
  img?: Img;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  media?: Renderable | MediaComponent;
  preview?: Renderable | PreviewComponent;
  arrow?: Renderable | ArrowComponent;
  button?: Renderable | ButtomComponent;
}>;

export type SearchableOptionProps = Omit<OptionProps, "keyword"> & {
  id: string;
  keywords: string[];
};
