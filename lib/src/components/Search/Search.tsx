import { isBoolean } from "../../../utils";
import { Portal } from "../Portal";
import { useAnimatedRender, useOnClickOutside, useUuid } from "../../hooks";
import React, { useRef, useState, useEffect, PropsWithChildren } from "react";
import { Results } from "./Results";
import { SearchProps } from "../../../types";
import { SearchProvider } from "../../context";
import { Field } from "./Field";
import { AriaTitles } from "./AriaTitles";

import {
  Container,
  Backdrop,
  ModalContainer,
  Modal,
  Children,
} from "./Search.styled";

import { Error } from "./Error/Error";
import { usePaletteVariables } from "../../hooks/usePalette";

export const Search = ({
  palette,
  dark: darkPref = "user",
  animate = "slide",
  children,
  ...props
}: PropsWithChildren<SearchProps>) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isBoolean(props.open)) setOpen(props.open);
  }, [props.open]);

  const [render, show, transitioning] = useAnimatedRender(open, 300);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, props.onClose);

  const colors = usePaletteVariables(palette, darkPref);

  const id = useUuid();

  if (render && id) {
    return (
      <SearchProvider {...props} id={id} show={show}>
        <Children aria-hidden>{children}</Children>
        <Portal id={`${id}-portal`}>
          <Container
            role="dialog"
            aria-labelledby={`${id}-heading`}
            aria-modal
            vars={colors}
          >
            <AriaTitles onClose={props.onClose} />
            <Backdrop show={show} aria-hidden />
            <ModalContainer show={show}>
              <Modal
                ref={ref}
                transitioning={transitioning}
                show={show}
                animate={animate}
              >
                <Field />
                <Results
                // key={`results-${render}`}
                />
                <Error />
              </Modal>
            </ModalContainer>
          </Container>
        </Portal>
      </SearchProvider>
    );
  }
  return null;
};
