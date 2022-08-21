import { useSearch } from "../../../../context";
import { Searchable } from "../../../../../types";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { Link } from "../../Link";
import { useScreenSize } from "../../../../hooks";
import { Details, Image, Label, Li, Media } from "./Result.styled";
import { isFunction } from "../../../../../utils";
import { Arrow } from "./Arrow";

export const Result = ({
  media: CustomMedia,
  img,
  label,
  onClick,
  href,
  id,
  arrow: CustomArrow,
}: Searchable) => {
  const { ids, hoverable, active, setActive } = useSearch();
  const { showPreview } = useScreenSize();
  const isActive = useMemo(() => active === id, [id, active]),
    onSelect = () => setActive(id),
    optId = ids.getOptionId(id),
    clickable = isFunction(onClick);

  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && isActive) {
      const handleEnter = (e: KeyboardEvent) => {
        if (ref.current && e.key === "Enter") {
          const child = ref.current.children[0] as any;
          if (isFunction(child?.click)) child.click();
        }
      };
      window.addEventListener("keydown", handleEnter);
      return () => window.removeEventListener("keydown", handleEnter);
    }
  }, [isActive]);

  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <Li
      active={isActive}
      role="option"
      tabIndex={-1}
      onMouseEnter={() => {
        if (hoverable) {
          setHover(true);
          if (!isActive) onSelect();
        }
      }}
      onMouseLeave={() => setHover(false)}
      id={optId}
      aria-selected={isActive}
      ref={ref}
    >
      <Link href={href}>
        <Details
          clickable={clickable}
          {...(clickable
            ? {
                role: "button",
                tabIndex: -1,
                onClick: onClick,
                onFocus: () => setFocus(true),
                onBlur: () => setFocus(false),
              }
            : {})}
        >
          {(CustomMedia || img) && (
            <Media active={isActive} showPreview={showPreview}>
              {CustomMedia ? (
                isFunction(CustomMedia) ? (
                  <CustomMedia
                    label={label}
                    img={img}
                    active={isActive}
                    hovered={hover}
                    focused={focus}
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
          <Label size="sm" truncate>
            {label}
          </Label>
          {CustomArrow ? (
            isFunction(CustomArrow) ? (
              <CustomArrow active={isActive} hovered={hover} focused={focus} />
            ) : (
              CustomArrow
            )
          ) : (
            <Arrow />
          )}
          {/* <components.Arrow id={id} isSelected={isActive} /> */}
        </Details>
      </Link>
    </Li>
  );
};
