/** App setting key. Value is "on" | "off". Default off: notes-first. */
export const LEARNING_MODE_KEY = "learning_mode";

export function isLearningModeOn(value: string | null | undefined): boolean {
  return value === "on";
}
