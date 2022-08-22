import { useRect, useScreenSize } from "../../../hooks";
import React, { useEffect, useMemo, useState } from "react";
import { useSearch } from "../../../context";

import { Preview } from "./Preview";
import {
  Column,
  Container,
  Main,
  Resultless,
  ResultsList,
} from "./Results.styled";
import { H6, Paragraph } from "../../Typography";
import { Result } from "./Result";

export const Results = () => {
  const { showPreview } = useScreenSize();
  const {
    options,
    query,
    active: activeId,
    ids,
    enableHover,
    show,
    labels: { results: resultsLabel, noResults },
  } = useSearch();
  const [ref, { height }] = useRect();

  const [animate, setAnimate] = useState({ height: 0, transition: false });
  useEffect(() => {
    setAnimate((animate) => {
      if (!animate?.height || animate?.height < height) {
        return {
          height: height,
          transition: false,
        };
      }
      return {
        height: height,
        transition: true,
      };
    });
  }, [height]);

  const active = useMemo(() => {
    const opts = options.filter((opt) => opt.id === activeId);
    if (opts[0] && opts[0]?.previewless !== true) {
      return opts[0];
    }
    return null;
  }, [options, activeId]);

  return (
    <Container
      animate={animate.transition || !show}
      height={!show ? 0 : animate.height}
      onMouseMove={() => enableHover()}
    >
      <Main ref={ref}>
        <Column pad={query ? true : options.length > 0} left>
          <Paragraph id={ids.optionsLabel} sr-only>
            {resultsLabel}
          </Paragraph>
          <ResultsList
            id={ids.options}
            role="listbox"
            aria-labelledby={ids.optionsLabel}
          >
            {options.map((opt, i) => (
              <Result {...opt} key={i.toString()} />
            ))}
          </ResultsList>
          {options.length < 1 && query && (
            <Resultless>
              <H6
                weight="medium"
                {...(ids.errors[0] ? { id: ids.errors[0] } : {})}
                align="center"
              >
                {noResults.title}
              </H6>
              <Paragraph
                {...(ids.errors[1] ? { id: ids.errors[1] } : {})}
                fade
                size="sm"
                align="center"
              >
                {noResults.subtitle}
              </Paragraph>
            </Resultless>
          )}
        </Column>
        {showPreview && active && (
          <Column pad={false}>
            <Preview key={activeId} {...active} />
          </Column>
        )}
      </Main>
    </Container>
  );
};
