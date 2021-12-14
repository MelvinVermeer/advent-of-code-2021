const countOccurrences = (arr: string[]) => {
  return arr.reduce((occ, s) => {
    occ[s] = occ[s] ?? 0;
    occ[s] += 1;
    return occ;
  }, {} as Record<string, number>);
};

const step = (polymer: string[], insertion: Record<string, string>) => {
  let newPolymerTemplate: string[] = [];
  for (let i = 0; i < polymer.length - 1; i++) {
    const a = polymer[i];
    const b = polymer[i + 1];

    newPolymerTemplate.push(a);
    if (insertion[a + b]) {
      newPolymerTemplate.push(insertion[a + b]);
    }
  }
  newPolymerTemplate.push(polymer[polymer.length - 1]);
  return newPolymerTemplate;
};

export const functionName = (
  polymerTemplate: string,
  insertionRules: string[],
  steps: number
): any => {
  const insertion = Object.fromEntries(
    insertionRules.map((x) => x.split(" -> "))
  );
  let polymer = polymerTemplate.split("");

  for (let i = 0; i < steps; i++) {
    polymer = step(polymer, insertion);
  }

  const count = countOccurrences(polymer);

  const countArray = Object.values(count).sort((a, b) => a - b);
  const lowest = countArray.shift()!;
  const highest = countArray.pop()!;
  return highest - lowest;
};
