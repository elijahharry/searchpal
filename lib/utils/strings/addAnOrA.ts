export const addAnOrA = (str: string) =>
  str.match(vowelRegex) ? `an ${str}` : `a ${str}`;

const vowelRegex = "^[aieouAIEOU].*";
