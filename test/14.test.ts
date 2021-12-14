import { differenceBetweenMostAndLeastCommonElement } from "../src/14-extended-polymerization";
import { readFileSync } from "fs";

const data = readFileSync("test/data/14", "utf8").split("\n");

describe("14 - Extended Polymerization", () => {
  const sample = [
    "NNCB",
    "",
    "CH -> B",
    "HH -> N",
    "CB -> H",
    "NH -> C",
    "HB -> C",
    "HC -> B",
    "HN -> C",
    "NN -> C",
    "BH -> H",
    "NC -> B",
    "NB -> B",
    "BN -> B",
    "BB -> N",
    "BC -> B",
    "CC -> N",
    "CN -> C",
  ];

  describe("Part 1", () => {
    it("Sample", () => {
      expect(
        differenceBetweenMostAndLeastCommonElement(
          sample[0],
          sample.slice(2),
          10
        )
      ).toEqual(1588);
    });

    it("Answer", () => {
      expect(
        differenceBetweenMostAndLeastCommonElement(data[0], data.slice(2), 10)
      ).toEqual(2745);
    });
  });

  describe("Part 2", () => {
    it("Sample", () => {
      expect(
        differenceBetweenMostAndLeastCommonElement(
          sample[0],
          sample.slice(2),
          40
        )
      ).toEqual(2188189693529);
    });

    it("Answer", () => {
      expect(
        differenceBetweenMostAndLeastCommonElement(data[0], data.slice(2), 40)
      ).toEqual(3420801168962);
    });
  });
});
