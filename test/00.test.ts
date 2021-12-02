import { functionName } from "../src/00-template";
import { data } from "./data/00.data";

describe("00 - Template", () => {
  const sample = [""];
  describe("Part 1", () => {
    it("Sample", () => {
      expect(functionName(sample)).toEqual(sample);
    });

    it("Answer", () => {
      expect(functionName(data)).toEqual(data);
    });
  });

  describe("Part 2", () => {
    it("Sample", () => {
      expect(functionName(sample)).toEqual(sample);
    });

    it("Answer", () => {
      expect(functionName(data)).toEqual(data);
    });
  });
});
