import { sum } from "./shared";

type Board = number[][];

const hasCompleteColumn = (board: Board, numbers: number[]): boolean => {
  for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
    if (board.every((row) => numbers.includes(row[columnIndex]))) {
      return true;
    }
  }

  return false;
};

const hasCompleteRow = (board: Board, numbers: number[]): boolean =>
  board.some((row) => row.every((n) => numbers.includes(n)));

const hasBingo = (board: Board, numbers: number[]): boolean =>
  hasCompleteRow(board, numbers) || hasCompleteColumn(board, numbers);

const findUnmarkedNumbers = (board: Board, numbers: number[]): number[] =>
  board.flat().filter((n) => !numbers.includes(n));

const createChecksum = (board: Board, numbers: number[]): number => {
  const sumOfUnmarkedNumbers = findUnmarkedNumbers(board, numbers).reduce(
    sum,
    0
  );
  const lastCheckedNumber = numbers[numbers.length - 1];

  return sumOfUnmarkedNumbers * lastCheckedNumber;
};

export const firstBingo = (boards: Board[], numbers: number[]): number => {
  const checkedNumbers: number[] = [];
  let winningBoard: Board | undefined;

  while (!winningBoard) {
    checkedNumbers.push(numbers[checkedNumbers.length]);
    winningBoard = boards.find((board) => hasBingo(board, checkedNumbers));
  }

  return createChecksum(winningBoard, checkedNumbers);
};

export const lastBingo = (boards: Board[], numbers: number[]): number => {
  const checkedNumbers: number[] = [];
  let remainingBoards = boards;
  const winningBoards: Board[] = [];

  while (winningBoards.length < boards.length) {
    checkedNumbers.push(numbers[checkedNumbers.length]);
    winningBoards.push(
      ...remainingBoards.filter((board) => hasBingo(board, checkedNumbers))
    );
    remainingBoards = remainingBoards.filter(
      (board) => !hasBingo(board, checkedNumbers)
    );
  }

  return createChecksum(
    winningBoards[winningBoards.length - 1],
    checkedNumbers
  );
};
