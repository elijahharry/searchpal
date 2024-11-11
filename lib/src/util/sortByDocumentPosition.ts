const compareDocumentPosition = (a: HTMLElement, b: HTMLElement) => {
  if (a !== b) {
    const pos = a.compareDocumentPosition(b);
    if (
      pos & Node.DOCUMENT_POSITION_FOLLOWING ||
      pos & Node.DOCUMENT_POSITION_CONTAINED_BY
    ) {
      return -1;
    }
    if (
      pos & Node.DOCUMENT_POSITION_PRECEDING ||
      pos & Node.DOCUMENT_POSITION_CONTAINS
    ) {
      return 1;
    }
  }
  return 0;
};

export const sortByDocumentPosition = <T>(
  arr: T[],
  element: (item: T) => HTMLElement
) => arr.sort((a, b) => compareDocumentPosition(element(a), element(b)));
