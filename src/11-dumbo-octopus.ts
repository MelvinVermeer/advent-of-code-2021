type Grid = number[][];
type Position = [number, number];

const STEPS = 100;

const NEIGHBORS = [
  [0, -1], // N
  [1, -1], // NE
  [1, 0], // E
  [1, 1], // SE
  [0, 1], // S
  [-1, 1], // SW
  [-1, 0], // W
  [-1, -1], // NW
];

const toGrid = (rows: string[]): Grid =>
  rows.map((row) => row.split("").map(Number));

const getNeighbors = (
  map: (number | undefined)[][],
  [x, y]: Position
): Position[] =>
  NEIGHBORS.map<Position>(([xx, yy]) => [xx + x, yy + y]).filter(
    ([xx, yy]) => map[yy]?.[xx] !== undefined
  );

const didAllOctopusFlash = (grid: Grid): boolean =>
  !grid.flat().some((energyLevel) => energyLevel > 0);

const shouldOctopusFlash = (energyLevel: number | undefined) =>
  energyLevel && energyLevel > 9;

const hasOctopusThatShouldFlash = (grid: (number | undefined)[][]): boolean =>
  grid.flat().some(shouldOctopusFlash);

const resetEnergyLevelAfterFlash = (x: number | undefined): number => x ?? 0;

const increaseNeighborEnergyLevels = (
  newGrid: (number | undefined)[][],
  position: Position
) => {
  const neighbors = getNeighbors(newGrid, position);

  neighbors.forEach(([x, y]) => {
    newGrid[y][x]! += +1;
  });

  return newGrid;
};

const step = (grid: Grid): Grid => {
  let newGrid: (number | undefined)[][] = grid.map((row) =>
    row.map((x) => x + 1)
  );

  while (hasOctopusThatShouldFlash(newGrid)) {
    for (let y = 0; y < newGrid.length; y++) {
      for (let x = 0; x < newGrid[0].length; x++) {
        if (shouldOctopusFlash(newGrid[y][x])) {
          newGrid = increaseNeighborEnergyLevels(newGrid, [x, y]);
          newGrid[y][x] = undefined;
        }
      }
    }
  }

  return newGrid.map((row) => row.map(resetEnergyLevelAfterFlash));
};

export const countFlashes = (data: string[]): number => {
  let grid = toGrid(data);
  let flashCount = 0;

  for (let i = 1; i <= STEPS; i++) {
    grid = step(grid);
    flashCount += grid.flat().filter((x) => x === 0).length;
  }

  return flashCount;
};

export const getEveryoneFlashingStep = (data: string[]): any => {
  let grid = toGrid(data);
  let stepNumber = 0;

  while (!didAllOctopusFlash(grid)) {
    grid = step(grid);
    stepNumber++;
  }

  return stepNumber;
};
