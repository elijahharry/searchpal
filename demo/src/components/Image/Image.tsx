import NextImage from "next/image";

export const Image = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <NextImage
      src={`${
        !src.includes("https")
          ? "https://searchpal.s3.us-east-2.amazonaws.com/"
          : ""
      }${src}`}
      alt={alt}
      objectFit="cover"
      objectPosition="center"
      layout="fill"
    />
  );
};
