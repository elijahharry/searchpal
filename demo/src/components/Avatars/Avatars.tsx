import React, { useId } from "react";

export const Avatars = ({
  images,
}: {
  images: { src: string; alt: string }[];
}) => {
  const labelId = useId();

  return (
    <>
      <span className="reader">{images.map((img) => img.alt).join(", ")}</span>
      <div className="avatars" aria-labelledby={labelId}>
        {images.map((img, i) => (
          <div
            className="avatar"
            key={`${img.src || "img"}-${i}`}
            aria-hidden
            // {...(!img.alt ? { "aria-hidden": true } : {})}
          >
            <img alt={img.alt} src={img.src} />
          </div>
        ))}
      </div>
    </>
  );
};
