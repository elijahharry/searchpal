type AriaPropKey = `aria-${string}`;

export type AriaProps<K extends AriaPropKey> = Partial<Record<K, string>>;

const makeAriaDetail = <S extends AriaPropKey, R extends AriaPropKey>(
  staticProp: S,
  referenceProp: R
) => {
  const propKeys = [staticProp, referenceProp];

  return (props: AriaProps<S | R>, fallback: string) => {
    const finalProps: AriaProps<S | R> = {};
    let useFallback = true;
    for (const key of propKeys)
      if (props[key]) {
        [finalProps[key], useFallback] = [props[key], false];
      }
    if (useFallback) {
      finalProps[staticProp] = fallback;
    }
    return finalProps;
  };
};

export const ariaLabel = makeAriaDetail("aria-label", "aria-labelledby");

export const ariaDescription = makeAriaDetail(
  "aria-description",
  "aria-describedby"
);
