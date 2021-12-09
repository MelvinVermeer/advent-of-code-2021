import { basinsProduct, sumRiskPoints } from "../src/09-smoke-basin";
import { readFileSync } from "fs";

const data = readFileSync("test/data/09", "utf8").split("\n");

describe("09 - Smoke Basin", () => {
  const sample = [
    "2199943210",
    "3987894921",
    "9856789892",
    "8767896789",
    "9899965678",
  ];
  describe("Part 1", () => {
    it("Sample", () => {
      expect(sumRiskPoints(sample)).toEqual(15);
    });

    it("Answer", () => {
      expect(sumRiskPoints(data)).toEqual(607);
    });
  });

  describe("Part 2", () => {
    it("Sample", () => {
      expect(basinsProduct(sample)).toEqual(1134);
    });

    it("Answer", () => {
      expect(basinsProduct(data)).toEqual(900864);
    });
  });
});
