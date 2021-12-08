import { sum } from "./shared";

export const countFishAfterDays = (fish: number[], days: number): any => {
  const countPerDueDate = fish.reduce(
    (counts, fishDueDate) => {
      counts[fishDueDate]++;
      return counts;
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  );

  for (let day = 1; day <= days; day++) {
    const babies = countPerDueDate[0];
    countPerDueDate.shift();
    countPerDueDate[6] += babies;
    countPerDueDate.push(babies);
  }

  return countPerDueDate.reduce(sum, 0);
};
