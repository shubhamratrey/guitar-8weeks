/** One slot of a strumming hand's motion. */
export type Stroke = "D" | "U" | "X" | "-";

/**
 * Patterns are written the way they're taught: D down, U up, X a muted dead
 * strum, · a slot where the hand keeps moving but misses the strings. The label
 * shown on screen and the strokes that get played come from the same string, so
 * they can't drift apart.
 */
export const STRUM = {
  allPurpose: "D · D U · U D U",
  simple: "D · D · D · D",
  ballad: "D · D U · D · D U",
  funk: "D · X D U · X U",
  sixteenths: "D U D U D U D U D U D U D U D U",
  /** Palm-muted riffs are still pitched — muted strokes are a separate thing. */
  downstrokes: "D D D D D D D D",
  picked: "Arpeggio — pick the strings one at a time",
} as const;

/** Free-text notes that mean "pick it, don't strum it". */
const ARPEGGIO_HINTS = ["arpeggio", "pick the strings", "fingerpick", "fingerstyle"];

export type StrumPlan =
  | { kind: "strum"; strokes: Stroke[] }
  | { kind: "arpeggio" }
  | null;

/**
 * Work out what to sound for a strum label. Anything unrecognised returns null
 * so the caller can fall back to a plain chord on each beat.
 */
export function parseStrum(label?: string): StrumPlan {
  if (!label) return null;

  const lower = label.toLowerCase();
  if (ARPEGGIO_HINTS.some((hint) => lower.includes(hint))) return { kind: "arpeggio" };

  // Uppercase only, deliberately: lowercase d/u/x are everywhere in ordinary
  // prose ("Hard downstrokes with muted clicks") and would parse into nonsense.
  const strokes: Stroke[] = [];
  for (const char of label) {
    if (char === "D") strokes.push("D");
    else if (char === "U") strokes.push("U");
    else if (char === "X") strokes.push("X");
    else if (char === "·") strokes.push("-");
  }

  // A couple of stray capitals isn't a pattern.
  return strokes.length >= 4 ? { kind: "strum", strokes } : null;
}
