import { calculateMinimumFuel } from "../src/07-the-treachery-of-whales";
import { data } from "./data/07.data";

describe("07 - The Treachery of Whales", () => {
  const sample = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
  describe("Part 1", () => {
    it("Sample", () => {
      expect(calculateMinimumFuel(sample, "human")).toEqual(37);
    });

    it("Answer ", () => {
      expect(calculateMinimumFuel(data, "human")).toBe(355764);
    });
  });

  describe("Part 2", () => {
    it("Sample", () => {
      expect(calculateMinimumFuel(sample, "crab")).toEqual(168);
    });

    it("Answer", () => {
      expect(calculateMinimumFuel(data, "crab")).toEqual(99634572);
    });
  });
});
