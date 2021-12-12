import { findAllPaths, findAllPathsV2 } from "../src/12-passage-pathing";
import { readFileSync } from "fs";

const data = readFileSync("test/data/12", "utf8").split("\n");

describe("12 - Passage Pathing", () => {
  const sample = ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"];
  const sample2 = [
    "dc-end",
    "HN-start",
    "start-kj",
    "dc-start",
    "dc-HN",
    "LN-dc",
    "HN-end",
    "kj-sa",
    "kj-HN",
    "kj-dc",
  ];
  const sample3 = [
    "fs-end",
    "he-DX",
    "fs-he",
    "start-DX",
    "pj-DX",
    "end-zg",
    "zg-sl",
    "zg-pj",
    "pj-he",
    "RW-he",
    "fs-DX",
    "pj-RW",
    "zg-RW",
    "start-pj",
    "he-WI",
    "zg-he",
    "pj-fs",
    "start-RW",
  ];

  describe("Part 1", () => {
    it("Sample1", () => {
      expect(findAllPaths(sample)).toHaveLength(10);
    });
    it("Sample2", () => {
      expect(findAllPaths(sample2)).toHaveLength(19);
    });
    it("Sample3", () => {
      expect(findAllPaths(sample3)).toHaveLength(226);
    });
    it("Answer", () => {
      expect(findAllPaths(data)).toHaveLength(4167);
    });
  });

  describe("Part 2", () => {
    it("Sample", () => {
      expect(findAllPathsV2(sample)).toHaveLength(36);
    });

    it("Sample2", () => {
      expect(findAllPathsV2(sample2)).toHaveLength(103);
    });

    it("Sample3", () => {
      expect(findAllPathsV2(sample3)).toHaveLength(3509);
    });

    it("Answer", () => {
      expect(findAllPathsV2(data)).toHaveLength(98441);
    });
  });
});
