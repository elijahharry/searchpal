async function resolve<A extends any[], R>(
  target: (...args: A) => R | Promise<R>,
  ...args: A
): Promise<R> {
  const result = target(...args);
  return await Promise.resolve(result);
}

async function resolveOptional<A extends any[], R>(
  target: ((...args: A) => R | Promise<R>) | undefined | null,
  ...args: A
): Promise<R | undefined> {
  if (!target) return;
  const result = target(...args);
  return await Promise.resolve(result);
}

export { resolve, resolveOptional };
