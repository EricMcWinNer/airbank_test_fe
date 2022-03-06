export const wordify = (word: string): string => {
  let splitWords = splitPascalCase(word);
  return splitWords.join(" ");
};

export const splitPascalCase = (word: string): string[] =>
  word.split(/(?=[A-Z])/);

export const trueCapitalize = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
