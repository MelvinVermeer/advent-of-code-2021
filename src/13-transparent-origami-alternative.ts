import { printGrid } from "./shared";

type Position = [number, number];
type Instruction = [string, number];

const DOT = "#";
const EMPTY = ".";

const stringToDot = (dot: string) => dot.split(",").map(Number) as Position;
const dotToString = ([x, y]: Position) => `${x},${y}`;
const getUniqueDots = (dots: Position[]) =>
  [...new Set(dots.map(dotToString))].map(stringToDot);

const draw = (dots: Position[]) => {
  const maxY = Math.max(...dots.map(([, y]) => y));
  const maxX = Math.max(...dots.map(([x]) => x));

  let grid: string[][] = [];

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      grid[y] = grid[y] ?? [];
      grid[y][x] = EMPTY;
    }
  }

  dots.forEach(([x, y]) => (grid[y][x] = DOT));

  printGrid(grid);
};

export const countDotsAfterFolding = (
  dots: Position[],
  instructions: Instruction[]
): number => {
  instructions.forEach(([dir, foldLine]) => {
    dots = dots.map(([x, y]) => {
      if (dir === "y" && y > foldLine) {
        return [x, y - 2 * (y - foldLine)];
      }

      if (dir === "x" && x > foldLine) {
        return [x - 2 * (x - foldLine), y];
      }

      return [x, y];
    });
  });

  const uniqueDots = getUniqueDots(dots);

  if (instructions.length > 1) {
    draw(uniqueDots);
  }

  return uniqueDots.length;
};
