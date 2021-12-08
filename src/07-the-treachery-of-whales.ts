import { difference, sum } from "./shared";

const calculateCrab = (a: number, b: number) => {
  let fuel = 0;
  let distance = Math.abs(a - b);

  for (let i = 0; i <= distance; i++) {
    fuel += i;
  }

  return fuel;
};

const calculateHuman = difference;

export const calculateMinimumFuel = (
  crabPositions: number[],
  method: "human" | "crab"
): any => {
  const fuelCalculator = method === "human" ? calculateHuman : calculateCrab;

  const max = Math.max(...crabPositions);
  const min = Math.min(...crabPositions);

  let leastFuel = fuelCalculator(min, max) * crabPositions.length;

  for (let position = min; position <= max; position++) {
    const fuel = crabPositions
      .map((crabPosition) => fuelCalculator(crabPosition, position))
      .reduce(sum, 0);

    if (fuel < leastFuel) {
      leastFuel = fuel;
    }
  }

  return leastFuel;
};
