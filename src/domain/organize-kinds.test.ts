import { describe, expect, it } from "vitest";
import { isOrganizeKind, ORGANIZE_KINDS } from "./organize-kinds";

describe("organize kinds", () => {
  it("includes sixteen kinds", () => {
    expect(ORGANIZE_KINDS).toHaveLength(16);
    expect(isOrganizeKind("structured")).toBe(true);
    expect(isOrganizeKind("dev_input")).toBe(true);
    expect(isOrganizeKind("podcast")).toBe(false);
  });
});
