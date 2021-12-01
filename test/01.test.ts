import {
  countIncreases,
  countIncreasesUsingSlidingWindows,
} from "../src/01-sonar-sweep";
import { data } from "./data/01.data";

describe("01 - Sonar Sweep", () => {
  describe("Part 1", () => {
    it("Counts the number of increases in an array", () => {
      const sample = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      expect(countIncreases(sample)).toEqual(7);
    });

    it("Answer", () => {
      expect(countIncreases(data)).toEqual(1559);
    });
  });

  describe("Part 2", () => {
    it("Counts the number of increases, using a sliding window(3) sum, in an array", () => {
      const sample = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      expect(countIncreasesUsingSlidingWindows(sample)).toEqual(5);
    });

    it("Answer", () => {
      expect(countIncreasesUsingSlidingWindows(data)).toEqual(1600);
    });
  });
});
