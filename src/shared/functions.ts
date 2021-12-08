export const compose =
  <T>(functions: ((arg: T) => T)[]) =>
  (arg: T) =>
    functions.reduce((arg: T, func: (x: T) => T) => func(arg), arg);
