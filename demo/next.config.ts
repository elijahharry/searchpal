import { mkdirSync, rmSync } from "fs";
import type { NextConfig } from "next";
import path from "path";
import { memoize } from "amenities";
import { packDistribution } from "../dev/packDistribution";
import { spawnSync } from "child_process";
import { nanoid } from "nanoid";

const prepareDistribution = memoize(() => {
  const cache = path.resolve(__dirname, ".cache");
  try {
    rmSync(cache, { recursive: true });
  } catch (e) {}

  const pack = packDistribution(cache);

  const outputDirname = path.resolve(cache, "searchpal-" + nanoid());
  mkdirSync(outputDirname);

  spawnSync("tar", ["-xzf", pack.tgz, "-C", outputDirname], {
    stdio: "inherit",
  });

  rmSync(pack.tgz);

  return path.join(outputDirname, "package");
});

const CDN = new URL(process.env.CDN_URL!);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: CDN.hostname,
      },
    ],
  },
  webpack(config) {
    const resolve = (config.resolve ??= {});

    let searchpal: string;

    if (process.env.NODE_ENV === "production") {
      searchpal = prepareDistribution();
    } else {
      searchpal = "searchpal-lib";
    }

    resolve.alias = {
      ...resolve.alias,
      searchpal,
    };

    return { ...config, resolve };
  },
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
