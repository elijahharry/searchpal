import { SearchOption, countOccurances, prepResults } from "./shared";

export const searchFuzzy = (query: string, options: SearchOption[]) => {
  if (!options || !options.length) {
    return [];
  }

  if (!query) {
    return [];
  }

  const chunks = chunkString(query, query.length < 2 ? 1 : 2),
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
      for (const chunk of chunks) {
        score += countOccurances(combo, chunk);
        let chunk_ = chunk.toLowerCase();
        if (combo !== combo_ || chunk_ !== chunk) {
          score += countOccurances(combo_, chunk_) * 0.5;
        }
        if (combo_.indexOf(chunk_) === 0) score += 4;
      }
      return {
        id,
        score,
      };
    })
    .filter((o) => o.score > 0);

  if (results.length) {
    return prepResults(results, 0.5);
  }

  return [];
};

const chunkString = (str: string, length: number) => {
  if (str.length < 1) {
    return [];
  }

  const len = length > str.length ? str.length : length;

  const chunks: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const val = str.slice(i, i + len);
    if (val && val.trim() && val.length >= len) chunks.push(val);
  }

  return chunks;
};
