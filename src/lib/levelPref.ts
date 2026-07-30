import type { Level } from "./levels";

/**
 * Your chosen playback level, remembered across songs and sessions — if you're
 * a beginner on one song you're a beginner on the next.
 */
const KEY = "guitar8w:level";

let current: Level | null = null;
const listeners = new Set<() => void>();

const isLevel = (value: unknown): value is Level =>
  value === "beginner" || value === "intermediate" || value === "advanced";

export function subscribeLevel(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

/** Must be referentially stable between writes for useSyncExternalStore. */
export function getLevel(): Level {
  if (current) return current;
  if (typeof window === "undefined") return "intermediate";
  try {
    const stored = window.localStorage.getItem(KEY);
    current = isLevel(stored) ? stored : "intermediate";
  } catch {
    current = "intermediate";
  }
  return current;
}

export const getServerLevel = (): Level => "intermediate";

export function setLevel(level: Level): void {
  current = level;
  try {
    window.localStorage.setItem(KEY, level);
  } catch {
    // storage unavailable; the choice still holds for this session
  }
  for (const listener of listeners) listener();
}
