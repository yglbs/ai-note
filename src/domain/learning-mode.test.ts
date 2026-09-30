import { describe, expect, it } from "vitest";
import { isLearningModeOn } from "./learning-mode";

describe("learning mode", () => {
  it("defaults to off unless explicitly on", () => {
    expect(isLearningModeOn(undefined)).toBe(false);
    expect(isLearningModeOn(null)).toBe(false);
    expect(isLearningModeOn("off")).toBe(false);
    expect(isLearningModeOn("on")).toBe(true);
  });
});
