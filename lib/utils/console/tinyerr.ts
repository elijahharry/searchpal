export const tinyerr = (error: string) => {
  if (process.env.NODE_ENV === "development") {
    console.error(new Error(error));
  }
};
