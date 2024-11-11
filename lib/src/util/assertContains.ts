export type AssertContains<T> = {
  (value: any): value is T;
  $typeof: T;
};

const assertContains = <T extends any[] | readonly any[]>(elements: T) => {
  const targets = new Set(elements);

  const contains = (value: any): value is T[number] => targets.has(value);

  return contains as AssertContains<T[number]>;
};

export { assertContains };
