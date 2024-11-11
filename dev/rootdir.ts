import path from "path";
import { readPackageJson } from "./fs";

const rootPackageName = "searchpal";

const findRootDir = () => {
  let currentDir = process.cwd();
  while (true) {
    try {
      const json = readPackageJson(currentDir);

      if (json.name === rootPackageName && json.private && json.workspaces) {
        return currentDir;
      }
    } catch (e) {}

    const nextDir = path.resolve(currentDir, "..");
    if (nextDir === currentDir) {
      break;
    }
    currentDir = nextDir;
  }
  console.error("Could not locate the root repository directory.");
  process.exit(1);
};

export const rootdir = findRootDir();

export const resolveRoot = (...args: string[]) =>
  path.resolve(rootdir, ...args);
