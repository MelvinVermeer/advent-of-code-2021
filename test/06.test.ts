import { countFishAfterDays } from "../src/06-lanternfish";
import { data } from "./data/06.data";

describe("06 - Lanternfish", () => {
  describe("Part 1", () => {
    it("Sample", () => {
      expect(countFishAfterDays([3, 4, 3, 1, 2], 80)).toEqual(5934);
    });

    it("Answer", () => {
      expect(countFishAfterDays(data, 80)).toEqual(374927);
    });
  });

  describe("Part 2", () => {
    it("Sample", () => {
      expect(countFishAfterDays([3, 4, 3, 1, 2], 256)).toEqual(26984457539);
    });

    it("Answer", () => {
      expect(countFishAfterDays(data, 256)).toEqual(1687617803407);
    });
  });
});
