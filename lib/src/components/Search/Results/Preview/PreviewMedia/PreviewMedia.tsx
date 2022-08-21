import React from "react";
import styled from "styled-components";
import { classes, mediaQuery } from "../../../../../../utils/css";
import { Searchable } from "../../../../../../types";
import { H2, Paragraph } from "../../../../Typography";
import { isFunction } from "../../../../../../utils";

export const PreviewMedia = ({
  media: CustomMedia,
  img,
  label,
  sublabel,
}: Pick<Searchable, "media" | "img" | "label" | "sublabel">) => {
  return (
    <Container>
      {(CustomMedia || img) && (
        <Media>
          {CustomMedia ? (
            isFunction(CustomMedia) ? (
              <CustomMedia
                img={img}
                label={label}
                active={false}
                hovered={false}
                focused={false}
              />
            ) : (
              CustomMedia
            )
          ) : (
            img && (
              <Image
                src={img?.src}
                {...(img?.alt ? { alt: img.alt } : { "aria-hidden": true })}
              />
            )
          )}
        </Media>
      )}
      <Title weight="medium" size="md" align="center">
        {label}
      </Title>
      {sublabel && (
        <Subtitle size="sm" fade align="center">
          {sublabel}
        </Subtitle>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(H2)`
  ${mediaQuery("md")} {
    ${classes.text.size.lg}
    ${classes.text.weight.semibold}
  }
`;

const Subtitle = styled(Paragraph)`
  ${mediaQuery("md")} {
    ${classes.text.size.smd}
  }
`;

const Media = styled.div`
  margin-bottom: 0.375rem;
  height: 3.5rem;
  width: 3.5rem;
  overflow: hidden;
  border-radius: 9999px;
  background-color: rgb(243, 244, 246);
  ${mediaQuery("md")} {
    margin-bottom: 0.5rem;
    height: 4rem;
    width: 4rem;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
`;
