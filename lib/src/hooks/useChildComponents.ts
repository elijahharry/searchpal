import {
  ReactNode,
  Children,
  useCallback,
  ReactElement,
  isValidElement,
  createElement,
  FunctionComponent,
  ComponentProps,
} from "react";
import { ec } from "../../utils";

export const useChildComponents = <P extends {} = {}>(
  children: ReactNode,
  component: FunctionComponent<P>
) => {
  type Props = ComponentProps<typeof component>;

  const getChildren = useCallback(() => {
    const getChildrenArr = (
      childElements: ReactNode,
      arr: ReactElement<Props>[]
    ) => {
      const isComponent = (
        obj: ReactElement<any>
      ): obj is ReactElement<Props> => obj.type === component;
      Children.forEach(childElements, (child) => {
        if (isValidElement(child)) {
          if (isComponent(child)) arr.push(child);
          if (hasChildren(child)) getChildrenArr(child.props.children, arr);
        }
      });
    };
    const results: ReactElement<Props>[] = [];
    getChildrenArr(children, results);
    return results.map((el, i) =>
      createElement(component, {
        ...(el.props ? el.props : ({} as Props)),
        key: ec(el.key, i + 1),
      })
    );
  }, [component, children]);

  return getChildren();
};

const hasChildren = (
  obj: ReactElement<any>
): obj is ReactElement<{ children?: ReactNode }> =>
  obj.props?.children ? true : false;
