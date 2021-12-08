export const arrayIncludes = (array1: string[], array2: string[]): boolean =>
  array1.every((item) => array2.includes(item));
