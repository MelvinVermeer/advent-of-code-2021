import { deduplicate, product, sum } from "./shared";

type HeightMap = number[][];
type Position = [number, number];

const orthogonalNeighbors = [
  [0, -1], // North
  [1, 0], // East
  [0, 1], // South
  [-1, 0], // West
];

const getNeighbors = (map: HeightMap, [x, y]: Position): Position[] =>
  orthogonalNeighbors
    .map<Position>(([xx, yy]) => [xx + x, yy + y])
    .filter(([xx, yy]) => map[yy]?.[xx] !== undefined);

const findLowPoints = (map: HeightMap): Position[] => {
  const lowPoints: Position[] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const self = map[y][x];
      const neighbors = getNeighbors(map, [x, y]);
      if (neighbors.every(([xx, yy]) => map[yy][xx] > self)) {
        lowPoints.push([x, y]);
      }
    }
  }

  return lowPoints;
};

const getBasin = (map: HeightMap, point: Position): Position[] => {
  let points: Position[] = [point];
  let newPointsToCheck: Position[] = [point];

  let shouldExpand = true;
  while (shouldExpand) {
    shouldExpand = true;
    newPointsToCheck = [...points];

    for (const point of points) {
      const neighbors = getNeighbors(map, point);
      const noPeaks = neighbors.filter(([x, y]) => map[y][x] !== 9);

      newPointsToCheck.push(...noPeaks);
    }

    const uniqueNew = deduplicate(newPointsToCheck, ([x, y]) => `${x},${y}`);

    if (uniqueNew.length === points.length) {
      shouldExpand = false;
    }

    points = uniqueNew;
  }

  return points;
};

export const sumRiskPoints = (data: string[]): number => {
  const map = data.map((row) => row.split("").map(Number));

  const lowPoints = findLowPoints(map);
  const riskPoints = lowPoints.map(([x, y]) => map[y][x]).map((x) => x + 1);

  return riskPoints.reduce(sum, 0);
};

export const basinsProduct = (data: string[]): number => {
  const map = data.map((row) => row.split("").map(Number));
  const lowPoints = findLowPoints(map);
  const basins = lowPoints.map((lowPoint) => getBasin(map, lowPoint));

  return basins
    .map((basin) => basin.length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce(product, 1);
};
