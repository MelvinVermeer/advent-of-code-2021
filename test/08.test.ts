import {
  countOccurrences,
  sumSolvedDigits,
  solveSingle,
} from "../src/08-seven-segment-search";
import { data } from "./data/08.data";

describe("08 - Seven Segment Search", () => {
  const sample = [
    "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
    "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
    "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
    "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
    "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
    "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
    "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
    "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
    "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
    "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
  ];

  describe("Part 1", () => {
    it("Sample", () => {
      expect(countOccurrences(sample, ["1", "4", "7", "8"])).toEqual(26);
    });

    it("Answer", () => {
      expect(countOccurrences(data, ["1", "4", "7", "8"])).toEqual(237);
    });
  });

  describe("Part 2", () => {
    it("Sample - single", () => {
      expect(
        solveSingle(
          "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf"
        )
      ).toEqual("5353");
    });

    it("Sample", () => {
      expect(sumSolvedDigits(sample)).toEqual(61229);
    });

    it("Answer", () => {
      expect(sumSolvedDigits(data)).toEqual(1009098);
    });
  });
});
