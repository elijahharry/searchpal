import { isNumber, memoize } from "amenities";
import { StaticImageData } from "next/image";
import sharp from "sharp";

export const getStaticImageData = memoize(
  async (src: string): Promise<StaticImageData> => {
    const res = await fetch(src);

    if (!res.ok) {
      console.error("Image not found: %s", src, res.status, res.statusText);
      return { src, width: 100, height: 100 };
    }

    const buffer = await res.arrayBuffer();

    const image = sharp(Buffer.from(buffer));

    const { width, height } = await image.metadata();

    if (!(isNumber(width) && isNumber(height)))
      return { src, width: 100, height: 100 };

    const aspect = width / height;

    const blurWidth = 10,
      blurHeight = Math.round(blurWidth / aspect);

    const { data, info } = await image
      .resize(blurWidth, blurHeight, { fit: "inside" })
      .toFormat("png")
      .modulate({
        saturation: 1.2,
      })
      .normalise()
      .toBuffer({ resolveWithObject: true });

    return {
      src,
      width,
      height,
      blurWidth,
      blurHeight,
      blurDataURL: `data:image/${info.format};base64,${data.toString(
        "base64"
      )}`,
    };
  }
);
