import { join } from "amenities";

const cdn = /* @__PURE__ */ (() => {
  const url = process.env.CDN_URL;
  if (!url) throw new Error("CDN_URL is not defined");
  const cleanSlash = /\/\/+/g;
  const path = (...paths: string[]) =>
    url + ("/" + join(paths, "/")).replace(cleanSlash, "/");
  path.url = url;
  return path;
})();

export { cdn };
