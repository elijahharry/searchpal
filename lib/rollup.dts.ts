import { regex } from "amenities";

function ansi(codes: number[], str: string) {
  const prefix = codes.map((code) => `\x1b[${code}m`).join("");
  return `${prefix}${str}\x1b[0m`;
}

/**
 * Check to make sure the library exports all types that need to be exported.
 *
 * This is to prevent users from experiencing error `TS4058`.
 */
function validateTypeExports(contents: string) {
  const typeExport = /^type\s+/;
  const exportMatch = contents.match(/export\s+\{([^}]+)\}/);

  if (!exportMatch) return;

  const exports = exportMatch[1].split(/,\s+/).map((item) => {
    item = item.trim();
    let isType = false;
    const name = item.replace(typeExport, () => {
      isType = true;
      return "";
    });
    return { name, isType };
  });

  const exportNames = new Set(exports.map((item) => item.name));

  const matchTypeName = /^(?:declare\s+)?(?:type|interface)\s+([a-zA-Z]+)/;

  const lines = contents.slice(0, exportMatch.index).split(/(\r?\n)/);

  const bundledUnexported = new Set<string>();

  let index = 0;

  lines.forEach((line) => {
    index += line.length;
    const type = line.match(matchTypeName);
    if (!type) return;
    const name = type[1];
    if (exportNames.has(name)) return;

    const refs = Array.from(
      contents
        .slice(index)
        .matchAll(
          regex(
            ["(?:interface.+extends\\s.*)?", "\\b", regex.escape(name)],
            "g"
          )
        )
    );

    if (refs.length && refs.every(([ref]) => /^interface.*extends/.test(ref)))
      return;

    bundledUnexported.add(name);
  });

  if (bundledUnexported.size) {
    const items = Array.from(bundledUnexported);

    console.error(
      ansi([1, 31], "WARNING:"),
      ansi([1], "Found bundled types that were not exported:"),
      ...items.map((item) => `\n  - ${ansi([1], item)}`)
    );
  }
}

export { validateTypeExports };
