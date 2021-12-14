import { first, last } from "./shared";

const step = (
  polymer: Record<string, number>,
  insertion: Record<string, string>
) => {
  let pairs: Record<string, number> = {};

  Object.entries(polymer).forEach(([pair, count]) => {
    const newPair1 = pair[0] + insertion[pair];
    const newPair2 = insertion[pair] + pair[1];

    pairs[newPair1] = (pairs[newPair1] ?? 0) + count;
    pairs[newPair2] = (pairs[newPair2] ?? 0) + count;
  });

  return pairs;
};

const mapPairs = (polymer: string): Record<string, number> => {
  let pairs: Record<string, number> = {};

  for (let i = 0; i < polymer.length - 1; i++) {
    const a = polymer[i];
    const b = polymer[i + 1];

    pairs[a + b] = (pairs[a + b] ?? 0) + 1;
  }

  return pairs;
};

const countLetters = (
  pairs: Record<string, number>,
  polymer: string
): Record<string, number> => {
  const counts: Record<string, number> = {};

  Object.entries(pairs).forEach(([pair, count]) => {
    const letter1 = pair[0];
    const letter2 = pair[1];

    counts[letter1] = (counts[letter1] ?? 0) + count;
    counts[letter2] = (counts[letter2] ?? 0) + count;
  });

  // All letter are counted twice except the first and last letter, compensate
  counts[first(polymer)] += 1;
  counts[last(polymer)] += 1;

  // Divide all counts by 2, to compensate for that double counting
  return Object.fromEntries(
    Object.entries(counts).map(([letter, count]) => [letter, count / 2])
  );
};

export const differenceBetweenMostAndLeastCommonElement = (
  polymerTemplate: string,
  insertionRules: string[],
  steps: number
): any => {
  const insertion = Object.fromEntries(
    insertionRules.map((x) => x.split(" -> "))
  );

  let pairs = mapPairs(polymerTemplate);
  for (let i = 0; i < steps; i++) {
    pairs = step(pairs, insertion);
  }

  const countPerLetter = countLetters(pairs, polymerTemplate);
  const counts = Object.values(countPerLetter).sort((a, b) => a - b);

  return last(counts) - first(counts);
};
