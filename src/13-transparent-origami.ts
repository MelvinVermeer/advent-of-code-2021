import { printGrid } from "./shared";

type Position = [number, number];
type Grid = string[][];
type Instruction = [string, number];

const DOT = "#";
const EMPTY = ".";

const flipHorizontal = (grid: Grid): Grid => {
  return grid.map((row) => row.map((cell) => cell).reverse());
};

const flipVertical = (grid: Grid): Grid => {
  const newGrid = grid.map((row) => row.map((cell) => cell));
  return newGrid.reverse();
};

const cutVertical = (grid: Grid, pos: number): [Grid, Grid] => {
  const a = grid.slice(0, pos);
  const b = grid.slice(pos + 1);
  return [a, b];
};

const cutHorizontal = (grid: Grid, pos: number): [Grid, Grid] => {
  const a = grid.map((row) => row.slice(0, pos));
  const b = grid.map((row) => row.slice(pos + 1));
  return [a, b];
};

const countDots = (grid: Grid): number =>
  grid.flat().filter((cell) => cell === DOT).length;

const stack = (a: Grid, b: Grid): Grid => {
  const maxY = Math.max(a.length, b.length);
  const maxX = Math.max(a[0].length, b[0].length);

  let grid: Grid = [[]];

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      grid[y] = grid[y] ?? [];
      grid[y][x] = a[y]?.[x] === DOT || b[y]?.[x] === DOT ? DOT : EMPTY;
    }
  }

  return grid;
};

const fold = (grid: Grid, foldInstruction: Instruction) => {
  const [direction, position] = foldInstruction;

  if (direction === "y") {
    const [grid1, grid2] = cutVertical(grid, position);
    const flipped = flipVertical(grid2);
    return stack(grid1, flipped);
  }

  const [grid1, grid2] = cutHorizontal(grid, position);
  const flipped = flipHorizontal(grid2);
  return stack(grid1, flipped);
};

export const countDotsAfterFolding = (
  dots: Position[],
  instructions: Instruction[]
): number => {
  let grid: Grid = [[]];
  const maxY = Math.max(
    ...instructions.filter(([d]) => d === "y").map(([, p]) => p * 2 + 1),
    ...dots.map(([, y]) => y + 1)
  );
  const maxX = Math.max(
    ...instructions.filter(([d]) => d === "x").map(([, p]) => p * 2 + 1),
    ...dots.map(([x]) => x + 1)
  );
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      grid[y] = grid[y] ?? [];
      grid[y][x] = EMPTY;
    }
  }
  dots.forEach(([x, y]) => (grid[y][x] = DOT));

  const folded = instructions.reduce(fold, grid);

  if (instructions.length > 1) {
    printGrid(folded);
  }

  return countDots(folded);
};
