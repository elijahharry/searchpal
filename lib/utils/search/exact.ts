import { SearchOption, countOccurances, prepResults } from "./shared";

export const searchExact = (query: string, options: SearchOption[]) => {
  if (!options || !options.length) {
    return [];
  }
  if (!query) {
    return [];
  }

  const queries = splitQuery(query),
    queries_ = splitQuery(query.toLowerCase()),
    items = options.map(({ id, keywords }) => {
      const combo = keywords.filter(Boolean).join(" "),
        combo_ = combo.toLowerCase();
      return {
        id,
        combo,
        combo_,
      };
    });

  const results = items
    .map(({ id, combo, combo_ }) => {
      let score = 0;
      for (let i = 0; i < queries.length; i++) {
        score += countOccurances(combo, queries[i]);
        if (combo !== combo_ || queries[i] !== queries_[i]) {
          score += countOccurances(combo_, queries_[i]) * 0.5;
        }
      }
      if (combo_.indexOf(queries_[0]) === 0 && score) {
        score += 5;
      }
      return {
        id,
        score,
      };
    })
    .filter((o) => o.score > 0);

  if (results.length) {
    return prepResults(results, 0.2);
  }

  return [];
};

const splitQuery = (query: string) =>
  query.split(/[, ]+/).filter((str) => str && str.trim().length > 0);
