import { ForwardedRef, useEffect } from "react";
import { Ids, Nodes, useSearchMethods } from "../Search";
import { useForwardedRef } from "./useForwardedRef";
import { useId } from "./useId";

function useSearchNode<N extends keyof Nodes>(
  name: N,
  fwdRef: ForwardedRef<Nodes[N]>
) {
  const methods = useSearchMethods();
  const [ref, node] = useForwardedRef(fwdRef);

  useEffect(() => {
    return methods.setNode(name, node);
  }, [node, methods.setNode, name]);

  return [ref, node, methods] as const;
}

function useSearchIdNode<N extends keyof Ids>(
  name: N,
  fwdRef: ForwardedRef<Nodes[N]>,
  propId: string | undefined
) {
  const [ref, node, methods] = useSearchNode(name, fwdRef);
  const id = useId(propId);

  useEffect(() => {
    if (id) return methods.setId(name, id);
  }, [id, methods.setId, name]);

  return [ref, id, node] as const;
}

export { useSearchNode, useSearchIdNode };
