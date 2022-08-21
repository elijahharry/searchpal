import React, { useEffect, useRef } from "react";

import { useSearch } from "../../../context";
import { useFocus } from "../../../hooks";
import { cn } from "../../../../utils";
import { Suggestion } from "./Suggestion";
import { Container, Input, InputContainer, SvgIcon } from "./Field.styled";
import { Label } from "../../Typography";

export const Field = () => {
  const { show, options, active, query, setQuery, ids, disableHover, label } =
    useSearch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
  }, [show]);

  const [focus, focusProps] = useFocus(() => disableHover());

  return (
    <Container>
      <SvgIcon
        viewBox="0 0 24 24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
      </SvgIcon>
      <InputContainer>
        {/* <InputMain> */}
        <Label htmlFor={ids.search} sr-only>
          {label}
        </Label>
        {focus && <Suggestion />}
        <Input
          type="text"
          placeholder={label}
          // placeholder="Testing"
          ref={inputRef}
          role="combobox"
          aria-expanded={options.length > 0}
          aria-controls={ids.options}
          id={ids.search}
          aria-activedescendant={active ? ids.getOptionId(active) : undefined}
          value={query}
          onChange={(e) => {
            disableHover();
            setQuery(e.target.value);
          }}
          {...(options.length < 1 && query
            ? { "aria-describedby": cn(ids.errors), "aria-invalid": true }
            : {})}
          {...focusProps}
          autoComplete="off"
        />
        {/* </InputMain> */}
      </InputContainer>
    </Container>
  );
};
