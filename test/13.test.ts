import { countDotsAfterFolding } from "../src/13-transparent-origami";
import { readFileSync } from "fs";

const data = readFileSync("test/data/13", "utf8").split("\n");

const sample = [
  "6,10",
  "0,14",
  "9,10",
  "0,3",
  "10,4",
  "4,11",
  "6,0",
  "6,12",
  "4,1",
  "0,13",
  "10,12",
  "3,4",
  "3,0",
  "8,4",
  "1,10",
  "2,14",
  "8,10",
  "9,0",
  "",
  "fold along y=7",
  "fold along x=5",
];

const parseInstructions = (data: string[]) => {
  let dots: [number, number][] = [];
  let instructions: [string, number][] = [];
  let allDotsAdded = false;
  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    if (element === "") {
      allDotsAdded = true;
      continue;
    }

    if (!allDotsAdded) {
      dots.push(element.split(",").map(Number) as [number, number]);
    }

    if (allDotsAdded) {
      const [foldDirection, foldPosition] = element
        .replace("fold along ", "")
        .split("=");
      instructions.push([foldDirection, Number(foldPosition)]);
    }
  }

  return { dots, instructions };
};

describe("13 - Transparent Origami", () => {
  const { dots: sampleDots, instructions: sampleInstructions } =
    parseInstructions(sample);
  const { dots, instructions } = parseInstructions(data);

  describe("Part 1", () => {
    it("Sample", () => {
      expect(
        countDotsAfterFolding(sampleDots, [sampleInstructions[0]])
      ).toEqual(17);
    });
    it("Answer", () => {
      expect(countDotsAfterFolding(dots, [instructions[0]])).toEqual(695);
    });
  });

  describe("Part 2", () => {
    it("Sample", () => {
      expect(countDotsAfterFolding(sampleDots, sampleInstructions)).toEqual(16);
    });

    it("Answer - GJZGLUPJ", () => {
      expect(countDotsAfterFolding(dots, instructions)).toEqual(89);
    });
  });
});
