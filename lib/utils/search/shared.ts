export class SearchOption {
  keywords: string[];
  id: string;
  constructor(id: string, keywords: string[]) {
    this.keywords = keywords || [];
    this.id = id;
  }
}

export const prepResults = (
  results: {
    id: string;
    score: number;
  }[],
  minPercentOfTop = 0.5
) =>
  results
    .sort((a, b) => b.score - a.score)
    .filter((o) => {
      if (results[0]) {
        return o.score >= results[0].score * minPercentOfTop;
      }
      return true;
    })
    .map((o) => o.id);

export const countOccurances = (
  string: string,
  subString: string,
  allowOverlapping = true
) => {
  string += "";
  subString += "";
  if (subString.length <= 0) return 0;

  var n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : subString.length;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }

  return n;
};
