import { searchExact } from "./exact";
import { searchFuzzy } from "./fuzzy";
import { SearchOption } from "./shared";

export type SearchMode = "fuzz" | "exact" | "combo";

export const search = (
  query: string,
  options: SearchOption[],
  mode: SearchMode = "combo"
) => {
  if (!options || !options.length) {
    return empty;
  }
  if (!query) {
    return empty;
  }

  if (mode === "combo" || mode === "exact") {
    const exacts = searchExact(query, options);

    if (exacts.length) {
      return {
        results: exacts,
        fuzzed: false,
      };
    }
  }

  if (mode === "combo" || mode === "fuzz") {
    const fuzz = searchFuzzy(query, options);
    if (fuzz.length) {
      return {
        results: fuzz,
        fuzzed: true,
      };
    }
  }

  return empty;
};

const empty = { results: [], fuzzed: false };
