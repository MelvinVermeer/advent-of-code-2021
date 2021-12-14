export const arrayIncludes = (array1: string[], array2: string[]): boolean =>
  array1.every((item) => array2.includes(item));

/**
 * Deduplicates items in the given array
 * @param items
 * @param keyOrKeyFunction the key (property name) to compare items on, or function that creates a key for an object
 * @returns
 */
export const deduplicate = <T>(
  items: T[],
  keyOrKeyFunction: keyof T | ((obj: T) => unknown)
) => {
  const keyFunction =
    typeof keyOrKeyFunction === "function"
      ? keyOrKeyFunction
      : (o: T) => o[keyOrKeyFunction];

  const values = items
    .reduce((map, item) => {
      const key = keyFunction(item);

      if (!map.has(key)) {
        map.set(key, item);
      }

      return map;
    }, new Map<unknown, T>())
    .values();

  return [...values];
};

export const printGrid = (grid: (number | string)[][]) => {
  console.log(
    grid.map((row) => row.map((cell) => cell.toString()).join("")).join("\n")
  );
};

type StringOrArray<T> = {
  [index: number]: T;
  length: number;
};

export const first = <T>(array: StringOrArray<T>): T => array[0];
export const last = <T>(array: StringOrArray<T>): T => array[array.length - 1];
