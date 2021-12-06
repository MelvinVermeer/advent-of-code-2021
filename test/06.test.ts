import { functionName } from "../src/06-lanternfish";
import { data } from "./data/06.data";

describe("06 - Lanternfish", () => {
  describe("Part 1", () => {
    it("Sample", () => {
      expect(functionName([3, 4, 3, 1, 2], 80)).toEqual(5934);
    });

    it("Answer", () => {
      expect(functionName(data, 80)).toEqual(374927);
    });
  });

  describe("Part 2", () => {
    it("Sample", () => {
      expect(functionName([3, 4, 3, 1, 2], 256)).toEqual(1);
    });

    // it("Answer", () => {
    //   expect(functionName(data, 80)).toEqual(374927);
    // });
  });
});
