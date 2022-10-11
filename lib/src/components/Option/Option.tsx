import React, {
  FunctionComponent,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  arrString,
  getChildComponentProps,
  isArray,
  isFunction,
  isString,
} from "../../../utils";
import { DetailProps, Img, OptionProps, Searchable } from "../../../types";
import { useSearchSetter } from "../../context";
import { useUuid } from "../../hooks";
import { Detail } from "../Detail";

export const Option: FunctionComponent<OptionProps> = ({
  keywords,
  children,
  label,
  ...props
}) => {
  const id = useUuid();
  const terms = useMemo(
    () =>
      [
        ...(isFunction(keywords)
          ? keywords(arrString)
          : isArray(keywords)
          ? keywords
          : []),
        label,
      ].filter((keyword) => isString(keyword)),
    [keywords, label]
  );
  const details = useMemo(
    () =>
      getChildComponentProps(children, Detail).filter((detail) =>
        isString(detail.label)
      ),
    [children]
  );

  if (!isString(label) || !id) return null;

  return (
    <OptionDisplay
      keywords={terms}
      details={details}
      label={label}
      id={id}
      {...props}
    />
  );
};

const OptionDisplay = memo(
  ({ keywords: keywords_, id: id_, ...option }: Searchable) => {
    const setters = useSearchSetter();
    const setOptions = useMemo(() => setters.options, [setters]);
    const setSearch = useMemo(() => setters.search, [setters]);

    const previousKeywords = useRef([] as string[]);
    const [keywords, setKeywords] = useState(() => keywords_);
    useEffect(() => {
      if (!compareKeywords(previousKeywords.current, keywords_)) {
        setKeywords(keywords_);
        previousKeywords.current = keywords_;
      }
    }, [keywords_]);

    useEffect(() => {
      const id = id_;
      setSearch((options) => [
        ...options.filter((opt) => opt.id !== id),
        { keywords, id },
      ]);
      return () =>
        setSearch((options) => options.filter((opt) => opt.id !== id));
    }, [keywords, setSearch, id_]);

    useEffect(() => {
      const id = id_;
      setOptions((options) => [
        ...options.filter((opt) => opt.id !== id),
        { ...option, id },
      ]);
      return () =>
        setOptions((options) => options.filter((opt) => opt.id !== id));
    }, [option, id_, setOptions]);

    return null;
  },
  (a, b) => {
    return (
      a.id === b.id &&
      a.label === b.label &&
      a.href === b.href &&
      a.previewless === b.previewless &&
      a.onClick === b.onClick &&
      Object.is(a.sublabel, b.sublabel) &&
      Object.is(a.arrow, b.arrow) &&
      Object.is(a.button, b.button) &&
      Object.is(a.cta, b.cta) &&
      Object.is(a.media, b.media) &&
      Object.is(a.preview, b.preview) &&
      compareImg(a.img, b.img) &&
      compareKeywords(a.keywords, b.keywords) &&
      compareDetails(a.details, b.details)
    );
  }
);

const compareImg = (a?: Img, b?: Img) =>
  (!a && !b) || (a?.alt === b?.alt && a?.src === b?.src);

const compareKeywords = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const compareDetails = (a: DetailProps[], b: DetailProps[]) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const d1 = a[i],
      d2 = b[i];
    if (
      d1.label !== d2.label ||
      d1.href !== d2.href ||
      !Object.is(d1.value, d2.value)
    )
      return false;
  }
  return true;
};
