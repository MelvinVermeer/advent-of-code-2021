import {
  findWinningAutoCompleteScore,
  sumSyntaxErrorScores,
} from "../src/10-syntax-scoring";
import { readFileSync } from "fs";

const data = readFileSync("test/data/10", "utf8").split("\n");

describe("10 - Syntax Scoring", () => {
  const sample = [
    "[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "{([(<{}[<>[]}>{[]{[(<()>",
    "(((({<>}<{<{<>}{[]{[]{}",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
    "<{([{{}}[<[[[<>{}]]]>[]]",
  ];

  describe("Part 1", () => {
    it("Sample", () => {
      expect(sumSyntaxErrorScores(sample)).toEqual(26397);
    });

    it("Answer", () => {
      expect(sumSyntaxErrorScores(data)).toEqual(415953);
    });
  });

  describe("Part 2", () => {
    it("Sample", () => {
      expect(findWinningAutoCompleteScore(sample)).toEqual(288957);
    });

    it("Answer", () => {
      expect(findWinningAutoCompleteScore(data)).toEqual(2292863731);
    });
  });
});
