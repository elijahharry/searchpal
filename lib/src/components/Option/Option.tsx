import { FunctionComponent, useEffect } from "react";
import { arrString, isFunction } from "../../../utils";
import { OptionError, OptionProps, Searchable } from "../../../types";
import { useSearch } from "../../context";
import { useRefreshLimiter, useUuid } from "../../hooks";

export const Option: FunctionComponent<OptionProps> = (props_) => {
  const { setData } = useSearch(),
    uuid = useUuid(),
    props = useRefreshLimiter({ ...props_, id: uuid });

  useEffect(() => {
    if (props.id) {
      const id = props.id;
      try {
        const { keywords, ...rest } = props;
        const terms = arrString(
          props.label,
          isFunction(keywords) ? keywords(arrString) : keywords
        );
        const option = new Searchable({ ...rest, keywords: terms });
        if (checkEnv())
          for (const err of option.tinyErrors) console.error(err.toPretty());
        setData(({ options, errors }) => ({
          options: [...options.filter((opt) => opt.id !== id), option],
          errors: [
            ...errors.filter((err) => err !== id),
            ...(option.tinyErrors.length > 0 ? [id] : []),
          ],
        }));
      } catch (e: any) {
        if (checkEnv()) {
          if (e instanceof OptionError) {
            console.error(e.toPretty());
            // console.error(
            // `Search Option Error: ${e.message}\n\nInvalid prop:`
            // );
          } else {
            console.error(e);
          }
          setData(({ options, errors }) => ({
            options: options.filter((opt) => opt.id !== id),
            errors: [...errors.filter((err) => err !== id), id],
          }));
        }
      }
      return () =>
        setData(({ options, errors }) => ({
          options: options.filter((opt) => opt.id !== id),
          errors: errors.filter((err) => err !== id),
        }));
    }
  }, [props, setData]);

  return null;
};

const checkEnv = () => process.env.NODE_ENV !== "production";
