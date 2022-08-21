import { FunctionComponent, PropsWithChildren, ReactElement } from "react";
import { OptionProps } from "./gen";

export type LinkProps = PropsWithChildren<{
  href: string;
  target?: string;
}>;
export type LinkComponent = FunctionComponent<LinkProps>;

export type ArrowProps = {
  active: boolean;
  hovered: boolean;
  focused: boolean;
};
export type ArrowComponent = FunctionComponent<ArrowProps>;

export type MediaProps = Pick<OptionProps, "img" | "label"> & {
  active: boolean;
  hovered: boolean;
  focused: boolean;
};
export type MediaComponent = FunctionComponent<MediaProps>;

export type PreviewProps = Pick<OptionProps, "label" | "sublabel" | "img"> & {
  media?: ReactElement<any, any>;
};
export type PreviewComponent = FunctionComponent<PreviewProps>;

export type ButtonProps = Pick<OptionProps, "onClick" | "label">;
export type ButtomComponent = FunctionComponent<ButtonProps>;
