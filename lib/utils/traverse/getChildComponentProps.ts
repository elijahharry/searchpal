import {
  ReactNode,
  FunctionComponent,
  ComponentProps,
  ReactElement,
  isValidElement,
  Children,
} from "react";

export const getChildComponentProps = <P extends {} = {}>(
  children: ReactNode,
  component: FunctionComponent<P>
) => {
  type Props = ComponentProps<typeof component>;
  const getChildrenArr = (
    childElements: ReactNode,
    arr: ReactElement<Props>[]
  ) => {
    const isComponent = (obj: ReactElement<any>): obj is ReactElement<Props> =>
      obj.type === component;
    Children.forEach(childElements, (child) => {
      if (isValidElement(child)) {
        if (isComponent(child)) arr.push(child);
        if (hasChildren(child)) getChildrenArr(child.props.children, arr);
      }
    });
  };
  const results: ReactElement<Props>[] = [];
  getChildrenArr(children, results);
  return results.map((el, i) => el.props);
};

const hasChildren = (
  obj: ReactElement<any>
): obj is ReactElement<{ children?: ReactNode }> =>
  obj.props?.children ? true : false;
