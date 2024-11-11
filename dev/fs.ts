import fs from "fs";
import path from "path";

export const readJson = <T = any>(path: string): T =>
  JSON.parse(fs.readFileSync(path, "utf8"));

export const readPackageJson = <T = any>(dir: string): T =>
  readJson(path.join(dir, "package.json"));
