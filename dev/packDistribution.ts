import { spawnSync } from "child_process";
import { resolveRoot } from "./rootdir";
import { existsSync, mkdirSync, renameSync } from "fs";
import { makeDistribution } from "./makeDistribution";
import path from "path";
import { nanoid } from "nanoid";

const packDistribution = (outputDir: string) => {
  const dist = resolveRoot("dist");

  if (!existsSync(dist)) makeDistribution();

  // Package into a tarball
  let res = spawnSync("npm", ["pack", "--quiet"], {
    cwd: dist,
    shell: true,
  });

  if (res.status !== 0) {
    console.error("Failed to pack distribution.");
    process.exit(1);
  }

  const tgzFile = res.stdout.toString().trim(),
    tgz = `${dist}/${tgzFile}`;

  try {
    mkdirSync(outputDir, { recursive: true });
  } catch (e) {}

  const target = path.resolve(outputDir, "searchpal-" + nanoid(10) + ".tgz");

  renameSync(tgz, target);

  return { tgz: target };
};

export { packDistribution };
