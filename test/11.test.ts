import { countFlashes, getEveryoneFlashingStep } from "../src/11-dumbo-octopus";
import { readFileSync } from "fs";

const data = readFileSync("test/data/11", "utf8").split("\n");

describe("11 - Dumbo Octopus", () => {
  const sample = [
    "5483143223",
    "2745854711",
    "5264556173",
    "6141336146",
    "6357385478",
    "4167524645",
    "2176841721",
    "6882881134",
    "4846848554",
    "5283751526",
  ];
  describe("Part 1", () => {
    it("Sample", () => {
      expect(countFlashes(sample)).toEqual(1656);
    });

    it("Answer", () => {
      expect(countFlashes(data)).toEqual(1793);
    });
  });

  describe("Part 2", () => {
    it("Sample", () => {
      expect(getEveryoneFlashingStep(sample)).toEqual(195);
    });

    it("Answer", () => {
      expect(getEveryoneFlashingStep(data)).toEqual(247);
    });
  });
});
