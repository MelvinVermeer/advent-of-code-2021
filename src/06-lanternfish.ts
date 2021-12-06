export const countFishAfterDays = (fish: number[], days: number): any => {
  for (let day = 1; day <= days; day++) {
    fish = fish.map((x) => x - 1);

    const bornCount = fish.filter((x) => x === -1).length;
    const babies = Array(bornCount).fill(8);

    fish = fish.map((x) => (x === -1 ? 6 : x));
    fish.push(...babies);
  }

  return fish.length;
};
