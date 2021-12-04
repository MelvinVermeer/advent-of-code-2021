import { firstBingo, lastBingo } from "../src/04-giant-squid";
import { boards, numbers } from "./data/04.data";

const sampleNumbers = [
  7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
  20, 8, 19, 3, 26, 1,
];

const sampleBoards = [
  [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ],
  [
    [3, 15, 0, 2, 22],
    [9, 18, 13, 17, 5],
    [19, 8, 7, 25, 23],
    [20, 11, 10, 24, 4],
    [14, 21, 16, 12, 6],
  ],
  [
    [14, 21, 17, 24, 4],
    [10, 16, 15, 9, 19],
    [18, 8, 23, 26, 20],
    [22, 11, 13, 6, 5],
    [2, 0, 12, 3, 7],
  ],
];

describe("04 - Giant Squid", () => {
  describe("Part 1 - returns a checksum for the first winning board", () => {
    it("Test bingo for a row", () => {
      expect(
        firstBingo(
          [
            [
              [1, 2],
              [3, 4],
            ],
          ],
          [1, 2]
        )
      ).toEqual(2 * 7);
    });

    it("Test bingo for a column", () => {
      expect(
        firstBingo(
          [
            [
              [1, 2],
              [3, 4],
            ],
          ],
          [1, 3]
        )
      ).toEqual(3 * 6);
    });

    it("Sample", () => {
      expect(firstBingo(sampleBoards, sampleNumbers)).toEqual(188 * 24);
    });

    it("Answer", () => {
      expect(firstBingo(boards, numbers)).toEqual(49686);
    });
  });

  describe("Part 2 - returns a checksum for the last winning board", () => {
    it("Sample", () => {
      expect(lastBingo(sampleBoards, sampleNumbers)).toEqual(148 * 13);
    });

    it("Answer", () => {
      expect(lastBingo(boards, numbers)).toEqual(26878);
    });
  });
});
