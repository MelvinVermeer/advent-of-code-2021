import { followCommands } from "../src/02-dive";
import { data } from "./data/02.data";

describe("02 - Dive", () => {
  describe("Part 1", () => {
    it("Follows the commands to calculate the final position", () => {
      const sample = [
        "forward 5",
        "down 5",
        "forward 8",
        "up 3",
        "down 8",
        "forward 2",
      ];

      expect(followCommands(sample)).toEqual(150);
    });

    it("Answer", () => {
      expect(followCommands(data)).toEqual(1690020);
    });
  });

  describe("Part 2", () => {
    const useAim = true;

    it("Uses the aim algorithm to calculate the final position", () => {
      const sample = [
        "forward 5",
        "down 5",
        "forward 8",
        "up 3",
        "down 8",
        "forward 2",
      ];

      expect(followCommands(sample, useAim)).toEqual(900);
    });

    it("Answer", () => {
      expect(followCommands(data, useAim)).toEqual(1408487760);
    });
  });
});
