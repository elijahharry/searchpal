import { isBoolean } from "../../../utils";
import { Portal } from "../Portal";
import { useAnimatedRender, useOnClickOutside, useUuid } from "../../hooks";
import React, { useRef, useState, useEffect } from "react";
import { Results } from "./Results";
import { SearchProps } from "../../../types";
import { SearchProvider } from "../../context";
import { Field } from "./Field";
import { AriaTitles } from "./AriaTitles";
import { useTheme } from "../../hooks/useTheme";

import {
  ThemeProvider,
  Container,
  Backdrop,
  ModalContainer,
  Modal,
} from "./Search.styled";

import { Error } from "./Error/Error";

export const Search = ({
  palette,
  dark = "user",
  animate = "slide",
  children,
  theme,
  ...props
}: SearchProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isBoolean(props.open)) setOpen(props.open);
  }, [props.open]);

  const [render, show, transitioning] = useAnimatedRender(open, 300);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, props.onClose);

  const userTheme = useTheme(theme, dark);
  const defaultTheme = useTheme(undefined, dark);

  const id = useUuid();

  if (render && id) {
    return (
      <SearchProvider {...props} id={id} show={show} input={children}>
        <Portal id={`${id}-portal`}>
          <ThemeProvider backup={defaultTheme} theme={userTheme}>
            <Container
              role="dialog"
              aria-labelledby={`${id}-heading`}
              aria-modal
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
          </ThemeProvider>
        </Portal>
      </SearchProvider>
    );
  }
  return null;
};
