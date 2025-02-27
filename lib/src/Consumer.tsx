import { ReactNode } from "react";
import { Search, useSearch } from "./Search";
import { isFunction } from "hoolock";

function Consumer<Data = any>({
  children,
}: {
  children?: ReactNode | ((search: Search<Data>) => ReactNode | void);
}) {
  const search = useSearch();

  return <>{isFunction(children) ? children(search) : children}</>;
}

export { Consumer };
