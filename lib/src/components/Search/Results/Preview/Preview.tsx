import { Searchable } from "../../../../../types";
// import { useSearch } from "../../../../context";
import React, { isValidElement, useMemo } from "react";
import { Link } from "../../Link";
import { Bottom, Container, Top, Details, DetailList } from "./Preview.styled";
import { useRect } from "../../../../hooks";
import { Detail } from "../../../Detail";
import { Button } from "./Button";
import { isFunction } from "../../../../../utils";
import { PreviewMedia } from "./PreviewMedia";

export const Preview = ({
  media: CustomMedia,
  img,
  label,
  details,
  onClick,
  sublabel,
  href,
  preview: CustomPreview,
  button: CustomButton,
  cta,
}: Searchable) => {
  const [detailsRef, { height: detailsHeight }] = useRect<HTMLDListElement>();
  const detailsScrollable = useMemo(
    () => (detailsHeight >= 400 ? true : false),
    [detailsHeight]
  );

  const media = isFunction(CustomMedia) ? (
    <CustomMedia
      img={img}
      label={label}
      active={false}
      hovered={false}
      focused={false}
    />
  ) : (
    CustomMedia
  );

  return (
    <Container>
      <Top>
        {CustomPreview ? (
          isFunction(CustomPreview) ? (
            <CustomPreview
              label={label}
              sublabel={sublabel}
              img={img}
              media={
                media ? isValidElement(media) ? media : <>{media}</> : undefined
              }
            />
          ) : (
            CustomPreview
          )
        ) : (
          <PreviewMedia
            label={label}
            sublabel={sublabel}
            img={img}
            media={CustomMedia}
          />
        )}
      </Top>
      {details && details.length > 0 && (
        <Details scrollable={detailsScrollable}>
          <DetailList ref={detailsRef}>
            {details.map((detail, i) => (
              <Detail {...detail} key={i.toString()} />
            ))}
          </DetailList>
        </Details>
      )}
      <Bottom>
        <Link href={href}>
          {CustomButton ? (
            isFunction(CustomButton) ? (
              <CustomButton
                label={label}
                cta={cta}
                onClick={isFunction(onClick) ? onClick : undefined}
              />
            ) : (
              CustomButton
            )
          ) : (
            <Button
              onClick={(e) => isFunction(onClick) && onClick(e)}
              cta={cta}
            />
          )}
        </Link>
      </Bottom>
    </Container>
  );
};
