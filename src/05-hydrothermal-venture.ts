type Point = { x: number; y: number };
type Line = [Point, Point];
type Grid = number[][];

const toPoint = (s: string): Point => {
  const [x, y] = s.split(",").map((x) => Number(x));
  return { x, y };
};

const toLine = (s: string): Line => {
  const [a, b] = s.split(" -> ").map(toPoint);
  return [a, b];
};

const isDiagonal = ([a, b]: Line): boolean => {
  return !(a.x === b.x || a.y === b.y);
};

const toPoints = ([a, b]: Line): Point[] => {
  const points: Point[] = [a];

  while (
    points[points.length - 1].x !== b.x ||
    points[points.length - 1].y !== b.y
  ) {
    const lastPoint = points[points.length - 1];
    const newPoint = { x: lastPoint.x, y: lastPoint.y };
    if (lastPoint.x < b.x) {
      newPoint.x = lastPoint.x + 1;
    }

    if (lastPoint.x > b.x) {
      newPoint.x = lastPoint.x - 1;
    }

    if (lastPoint.y < b.y) {
      newPoint.y = lastPoint.y + 1;
    }

    if (lastPoint.y > b.y) {
      newPoint.y = lastPoint.y - 1;
    }

    points.push(newPoint);
  }

  return points;
};

export const countDangerousAreas = (
  data: string[],
  shouldIncludeDiagonal = false
): number => {
  const emptyGrid: Grid = [[]];

  const grid = data
    .map(toLine)
    .filter((line) => shouldIncludeDiagonal || !isDiagonal(line))
    .reduce(drawLine, emptyGrid);

  return grid.flat().filter((x) => x >= 2).length;
};
