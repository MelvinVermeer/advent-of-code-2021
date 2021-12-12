type Path = string[];

const START = "start";
const END = "end";

const isBigCave = (s: string) => {
  if (s === START || s === END) {
    return false;
  }
  return s === s.toUpperCase();
};

const isSmallCave = (s: string) => {
  if (s === START || s === END) {
    return false;
  }
  return s === s.toLowerCase();
};

const countOccurrences = (arr: string[]) => {
  return arr.reduce((occ, s) => {
    occ[s] = occ[s] ?? 0;
    occ[s] += 1;
    return occ;
  }, {} as Record<string, number>);
};

const onlyOneSmallCaveVisitedTwice = (path: Path) => {
  const smallCaves = path.filter(isSmallCave);
  const smallCavesVisitedMoreThanOnce = Object.values(
    countOccurrences(smallCaves)
  ).filter((visitCount) => visitCount > 1);
  return smallCavesVisitedMoreThanOnce.length < 2;
};

const getNewPaths = (paths: Path[], routes: Path[]) => {
  let newPaths: Path[] = [];

  for (const path of paths) {
    const lastStep = path[path.length - 1];

    if (lastStep === END) {
      newPaths.push(path);
      continue;
    }

    const possible = routes
      // select the route 'from' the last step on the route
      .filter(([from]) => from === lastStep)
      .map(([, to]) => to)
      // ensure we are not going back into small caves
      .filter((to) => isBigCave(to) || !path.includes(to));

    newPaths.push(...possible.map((step) => [...path, step]));
  }

  return newPaths;
};

const getNewPathsV2 = (paths: Path[], routes: Path[]) => {
  let newPaths: Path[] = [];

  for (const path of paths) {
    const lastStep = path[path.length - 1];

    if (lastStep === END) {
      newPaths.push(path);
      continue;
    }

    const possible = routes
      // select the route 'from' the last step on the route
      .filter(([from]) => from === lastStep)
      .map(([, to]) => to)
      // ensure we are not going back into small caves more than twice
      .filter(
        (to) => isBigCave(to) || path.filter((step) => step === to).length < 2
      )
      // dont visit start or end twice
      .filter((to) => ![START, END].includes(to) || !path.includes(to))
      // ensure we only visit 1 small cave twice
      .filter((to) => onlyOneSmallCaveVisitedTwice([...path, to]));

    newPaths.push(...possible.map((step) => [...path, step]));
  }

  return newPaths;
};

export const findAllPaths = (data: string[]): any => {
  const routes: Path[] = [];
  for (const route of data.map((row) => row.split("-"))) {
    routes.push(route);
    routes.push([route[1], route[0]]);
  }

  let paths: Path[] = [[START]];

  while (!paths.every((path) => path.includes(END))) {
    paths = getNewPaths(paths, routes);
  }

  return paths;
};

export const findAllPathsV2 = (data: string[]): any => {
  const routes: Path[] = [];
  for (const route of data.map((row) => row.split("-"))) {
    routes.push(route);
    routes.push([route[1], route[0]]);
  }

  let paths: Path[] = [[START]];

  while (!paths.every((path) => path.includes(END))) {
    paths = getNewPathsV2(paths, routes);
  }

  return paths;
};
