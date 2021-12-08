import { arrayIncludes, clone, compose, sum } from "./shared";

type Pattern = {
  inputs: string[];
  outputs: string[];
};

type Line = [string, number[]]; // ['ab', [1]] the number array represents possible digits

const digitsPerLength: Record<number, number[]> = {
  2: [1],
  3: [7],
  4: [4],
  5: [2, 3, 5],
  6: [0, 6, 9],
  7: [8],
};

const noOverlap: Record<number, number[]> = {
  1: [2, 5, 6],
  4: [0, 1, 2, 3, 5, 6, 7],
  9: [2],
};

const getSolvedDigits = (lines: Line[]): number[] =>
  lines.filter((line) => line[1].length === 1).flatMap((x) => x[1]);

const removeKnownDigits = (input: Line[]): Line[] => {
  let lines = clone(input);
  const known = getSolvedDigits(lines);

  lines = lines.map(([value, options]) => {
    if (options.length > 1) {
      return [value, options.filter((o) => !known.includes(o))];
    }

    return [value, options];
  });

  const solved = getSolvedDigits(lines);

  if (
    solved.length > 0 &&
    lines.some(
      (line) => line[1].length > 1 && line[1].some((z) => solved.includes(z))
    )
  ) {
    return removeKnownDigits(lines);
  }

  return lines;
};

const solveKnownLengths = (input: Line[]): Line[] => {
  const lines = clone(input);

  for (let i = 0; i < lines.length; i++) {
    lines[i][1] = lines[i][1].filter((x) =>
      digitsPerLength[lines[i][0].length].includes(x)
    );
  }

  return lines;
};

const getSegments = (input: Line[], number: number) => {
  const result = input.find((x) => x[1].length === 1 && x[1][0] === number) ?? [
    "",
  ];
  return result[0].split("");
};

const strategies = {
  cantHold: (a: string[], b: string[]): boolean => arrayIncludes(b, a),
  cantFitIn: (a: string[], b: string[]): boolean => arrayIncludes(a, b),
};

const reduceOverlap =
  (strategy: keyof typeof strategies, number: number) =>
  (input: Line[]): Line[] => {
    const lines = clone(input);
    const segmentsOfGivenNumber = getSegments(lines, number); // ['a', 'b']
    for (let i = 0; i < lines.length; i++) {
      const segmentsOfCurrentOption = lines[i][0].split("");
      const predicate = strategies[strategy];
      if (predicate(segmentsOfCurrentOption, segmentsOfGivenNumber)) {
        lines[i][1] = lines[i][1].filter((x) => !noOverlap[number].includes(x));
      }
    }

    return lines;
  };

const deduce = compose([
  solveKnownLengths,
  reduceOverlap("cantHold", 1),
  reduceOverlap("cantHold", 4),
  reduceOverlap("cantFitIn", 9),
  removeKnownDigits,
]);

const solve = (pattern: Pattern): string => {
  let allOptions: Line[] = pattern.inputs.map((input) => [
    input.split("").sort().join(""),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  ]);

  const results = Object.fromEntries(
    deduce(allOptions).map(([value, options]) => [value, options[0]])
  );

  return pattern.outputs
    .map((out) => results[out.split("").sort().join("")])
    .join("");
};

const parseInput = (data: string[]): Pattern[] =>
  data.map((x) => {
    const [inputs, outputs] = x.split(" | ").map((x) => x.split(" "));
    return {
      inputs,
      outputs,
    };
  });

export const solveSingle = (data: string): string =>
  solve(parseInput([data])[0]);

export const sumSolvedDigits = (data: string[]): any =>
  parseInput(data).map(solve).map(Number).reduce(sum, 0);

export const countOccurrences = (
  data: string[],
  numbersToCount: string[]
): number =>
  parseInput(data)
    .map(solve)
    .join("")
    .split("")
    .filter((x) => numbersToCount.includes(x)).length;
