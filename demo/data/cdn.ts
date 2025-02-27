import { join } from "hoolock";

const cdn = /* @__PURE__ */ (() => {
  const url = "https://cdn.elijahharry.com";
  const cleanSlash = /\/\/+/g;
  const path = (...paths: string[]) =>
    url + ("/" + join(paths, "/")).replace(cleanSlash, "/");
  path.url = url;
  return path;
})();

export { cdn };
