// https://adventofcode.com/2021/day/1

export const countIncreases = (depths: number[]): number => {
  let previous: number | undefined;
  let increases = 0;

  for (const current of depths) {
    if (previous !== undefined && current > previous) {
      increases += 1;
    }

    previous = current;
  }

  return increases;
};

export const countIncreasesUsingSlidingWindows = (depths: number[]): number => {
  const windowDepths = [];

  for (let i = 0; i + 2 < depths.length; i++) {
    windowDepths.push(depths[i] + depths[i + 1] + depths[i + 2]);
  }

  return countIncreases(windowDepths);
};
