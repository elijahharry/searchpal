import { isObject } from "amenities";
import NextImage, { StaticImageData } from "next/image";

const Image = ({
  src,
  fill,
  className,
  alt = "",
}: {
  src: string | StaticImageData;
  fill?: boolean;
  className?: string;
  alt?: string;
}) => {
  const hasPlaceholder = !!(isObject(src) && src.blurDataURL);

  return (
    <NextImage
      src={src}
      placeholder={hasPlaceholder ? "blur" : "empty"}
      alt={alt}
      className={className}
      fill={fill}
      {...(fill && {
        sizes: "50vw",
      })}
    />
  );
};

const Avatar = ({
  src,
  className = "size-6",
  alt = "",
}: {
  src: string | StaticImageData;
  className?: string;
  alt?: string;
}) => {
  return (
    <figure
      className={`bg-gray-300 relative rounded-full overflow-hidden ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover object-center" />
    </figure>
  );
};

export { Image, Avatar };
