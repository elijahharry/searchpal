import {
  ForwardedRef,
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
  forwardRef,
} from "react";

namespace ForwardProps {
  export interface PropMap {
    div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    input: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >;
    span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  }

  export interface ElementMap {
    div: HTMLDivElement;
    input: HTMLInputElement;
    span: HTMLSpanElement;
  }

  export type Kind = keyof PropMap;
}

export type ForwardProps<
  E extends ForwardProps.Kind,
  O = {},
> = keyof O extends never
  ? ForwardProps.PropMap[E]
  : Extract<keyof O, keyof ForwardProps.PropMap[E]> extends never
    ? ForwardProps.PropMap[E] & O
    : Omit<ForwardProps.PropMap[E], keyof O> & O;

const forward = <K extends ForwardProps.Kind>(Element: K) => {
  return <O = {}>(
    render: (
      props: ForwardProps<
        K,
        O & { ref: ForwardedRef<ForwardProps.ElementMap[K]> }
      >,
      Element: K
    ) => JSX.Element | null
  ) => {
    const Component = (props: any, ref: any) => {
      return render({ ...props, ref }, Element);
    };
    return forwardRef(Component) as (props: ForwardProps<K, O>) => JSX.Element;
  };
};

forward.div = forward("div");
forward.input = forward("input");
forward.span = forward("span");

export { forward };
