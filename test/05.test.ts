import { countDangerousAreas } from "../src/05-hydrothermal-venture";
import { data } from "./data/05.data";

describe("05 - Hydrothermal Venture", () => {
  const sample = [
    "0,9 -> 5,9",
    "8,0 -> 0,8",
    "9,4 -> 3,4",
    "2,2 -> 2,1",
    "7,0 -> 7,4",
    "6,4 -> 2,0",
    "0,9 -> 2,9",
    "3,4 -> 1,4",
    "0,0 -> 8,8",
    "5,5 -> 8,2",
  ];

  describe("Part 1", () => {
    it("Sample", () => {
      expect(countDangerousAreas(sample)).toEqual(5);
    });

    it("Answer", () => {
      expect(countDangerousAreas(data)).toEqual(6189);
    });
  });

  describe("Part 2", () => {
    const shouldIncludeDiagonal = true;
    it("Sample", () => {
      expect(countDangerousAreas(sample, shouldIncludeDiagonal)).toEqual(12);
    });

    it("Answer", () => {
      expect(countDangerousAreas(data, shouldIncludeDiagonal)).toEqual(19164);
    });
  });
});
