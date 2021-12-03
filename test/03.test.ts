import { createDiagnosticReport } from "../src/03-binary-diagnostic";
import { data } from "./data/03.data";

describe("03 - Binary Diagnostic", () => {
  const sample = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];

  describe("Part 1", () => {
    it("Interprets the gamma and epsilon rates", () => {
      const { gamma, epsilon } = createDiagnosticReport(sample);
      expect(gamma * epsilon).toEqual(198);
    });

    it("Answer", () => {
      const { gamma, epsilon } = createDiagnosticReport(data);
      expect(gamma * epsilon).toEqual(2972336);
    });
  });

  describe("Part 2", () => {
    it("Interprets the oxygen generator and CO2 scrubber ratings", () => {
      const { co2, oxygen } = createDiagnosticReport(sample);
      expect(co2 * oxygen).toEqual(230);
    });

    it("Answer", () => {
      const { co2, oxygen } = createDiagnosticReport(data);
      expect(co2 * oxygen).toEqual(3368358);
    });
  });
});
