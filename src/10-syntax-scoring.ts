import { sum } from "./shared";

const SCORE_TABLE_SYNTAX_ERROR: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const SCORE_TABLE_AUTOCOMPLETE: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const BRACKET_PAIRS: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const CLOSING_BRACKETS = Object.values(BRACKET_PAIRS);

const isBracketPair = (a: string, b: string) => BRACKET_PAIRS[a] === b;

const removeBracketPairs = (input: string): string => {
  for (let i = 0; i + 1 < input.length; i++) {
    if (isBracketPair(input[i], input[i + 1])) {
      const cleanerInput = input.replace(`${input[i]}${input[i + 1]}`, "");
      return removeBracketPairs(cleanerInput);
    }
  }

  return input;
};

const scoreAutoComplete = (data: string) =>
  getExpectedBrackets(data)
    .split("")
    .reduce(
      (score: number, bracket: string) =>
        score * 5 + SCORE_TABLE_AUTOCOMPLETE[bracket],
      0
    );

const scoreSyntaxError = (data: string): number => {
  const firstClosingBracket = removeBracketPairs(data)
    .split("")
    .find((bracket) => CLOSING_BRACKETS.includes(bracket));

  if (!firstClosingBracket) {
    return 0;
  }

  return SCORE_TABLE_SYNTAX_ERROR[firstClosingBracket];
};

const getExpectedBrackets = (data: string) => {
  const brackets = removeBracketPairs(data).split("");
  const expectedBrackets: string[] = [];

  while (brackets.length > 0) {
    const lastOpeningBracket = brackets.pop() as string;
    const correspondingClosingBracket = BRACKET_PAIRS[lastOpeningBracket];
    expectedBrackets.push(correspondingClosingBracket);
  }

  return expectedBrackets.join("");
};

export const sumSyntaxErrorScores = (data: string[]): any =>
  data.map(scoreSyntaxError).reduce(sum, 0);

export const findWinningAutoCompleteScore = (data: string[]) => {
  const scores = data
    .filter((x) => scoreSyntaxError(x) === 0)
    .map(scoreAutoComplete)
    .sort((a, b) => a - b);

  const middle = Math.floor(scores.length / 2);

  return scores[middle];
};
