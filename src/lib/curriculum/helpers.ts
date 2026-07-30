import type { LessonItem, TabBlock } from "../types";

/**
 * Build a tab block. Rows run high e → low E. Short or empty rows are fine —
 * the renderer pads them out with dashes.
 */
export const tab = (
  rows: [string, string, string, string, string, string],
  opts: Omit<TabBlock, "lines"> = {},
): TabBlock => ({ lines: rows, ...opts });

/** Empty tab row shorthand, so song data stays readable. */
export const _ = "";

/* ---------------- reusable warmups ---------------- */

const tune = (): LessonItem => ({
  id: "w-tune",
  title: "Tune up",
  kind: "warmup",
  minutes: 1,
  how: [
    "Open the tuner in the panel on this screen and play one string at a time. Low to high: E A D G B e.",
    "Tune every single session. An out-of-tune guitar makes correct playing sound wrong.",
  ],
});

const chromatic = (bpm: number): LessonItem => ({
  id: "w-chromatic",
  title: "Chromatic 1-2-3-4",
  kind: "warmup",
  minutes: 4,
  bpm: { start: bpm, target: bpm + 20 },
  how: [
    "Low E string: fret 1 with index, 2 with middle, 3 with ring, 4 with pinky. One note per click.",
    "Same on every string, then come back down.",
    "One finger per fret and leave each finger down until you need it. That's the whole point of the drill.",
  ],
  tab: tab([_, _, _, _, _, "-1--2--3--4--"]),
});

const spider = (): LessonItem => ({
  id: "w-spider",
  title: "Finger independence walk",
  kind: "warmup",
  minutes: 4,
  bpm: { start: 70, target: 100 },
  how: [
    "Index on low E fret 1, middle on A fret 2, ring on D fret 3, pinky on G fret 4.",
    "Now play them in a scrambled order: 1-3-2-4, then 4-2-3-1.",
    "Ugly and slow is fine. This is the drill that fixes your pinky.",
  ],
});

const changes = (chords: string[], target: number): LessonItem => ({
  id: "w-changes",
  title: `One-minute changes: ${chords.join(" ↔ ")}`,
  kind: "warmup",
  minutes: 4,
  how: [
    "Set a timer for 60 seconds. Switch between the two shapes as many times as you can.",
    "Count each clean switch. Write the number down — beating yesterday is the game.",
    `Target: ${target} clean changes in a minute.`,
  ],
  chords,
});

const pentaRun = (bpm: number): LessonItem => ({
  id: "w-penta",
  title: "Pentatonic box run",
  kind: "warmup",
  minutes: 4,
  bpm: { start: bpm, target: bpm + 20 },
  how: [
    "A minor pentatonic, box 1 at the 5th fret. Up and down, strict alternate picking.",
    "Down-up-down-up without exception, even when you change strings.",
  ],
});

const stretch = (): LessonItem => ({
  id: "w-stretch",
  title: "Hands loose",
  kind: "warmup",
  minutes: 1,
  how: [
    "Shake your hands out. Roll your wrists ten times each way.",
    "If your forearm aches during practice, stop and shake out again. Pain is not progress.",
  ],
});

const bendWarm = (): LessonItem => ({
  id: "w-bend",
  title: "Bend to pitch",
  kind: "warmup",
  minutes: 4,
  how: [
    "G string, fret 7. Play fret 8 first so your ear knows the target.",
    "Now bend fret 7 up until it matches that pitch exactly. Use three fingers behind the note.",
    "Ten bends. Listen, don't just push.",
  ],
});

/** The warmup block for a given week. Grows as your hands do. */
export function warmupFor(week: number): LessonItem[] {
  switch (week) {
    case 1:
      return [tune(), chromatic(60)];
    case 2:
      return [tune(), chromatic(70)];
    case 3:
      return [tune(), chromatic(75), changes(["Em", "Am"], 30)];
    case 4:
      return [tune(), spider(), changes(["G", "C"], 25)];
    case 5:
      return [tune(), chromatic(85), pentaRun(60)];
    case 6:
      return [tune(), spider(), pentaRun(70)];
    case 7:
      return [tune(), pentaRun(80), bendWarm()];
    case 8:
      return [tune(), stretch(), pentaRun(90)];
    default:
      return [tune()];
  }
}

/** A jam day closes every week: nothing new, just play. */
export function jamDay(
  day: number,
  week: number,
  opts: { title: string; goal: string; win: string; play: string[]; record: string },
): import("../types").Lesson {
  return {
    day,
    week,
    title: opts.title,
    goal: opts.goal,
    win: opts.win,
    warmup: [tune(), stretch()],
    core: [
      {
        id: "jam-play",
        title: "Play what you already know",
        kind: "song",
        minutes: 12,
        essential: true,
        how: [
          "No new material today. No metronome unless you want it.",
          ...opts.play.map((p) => `Play: ${p}`),
          "Mistakes are allowed. Stopping to fix them is not — play through to the end.",
        ],
      },
    ],
    extension: [
      {
        id: "jam-record",
        title: "Record 30 seconds",
        kind: "song",
        minutes: 10,
        how: [
          `Phone voice memo. ${opts.record}`,
          "Keep the file. In week 8 you'll listen to week 1 and not believe it.",
          "Recording yourself is the fastest feedback you can get for free.",
        ],
      },
      {
        id: "jam-fun",
        title: "Mess about",
        kind: "song",
        minutes: 10,
        how: [
          "Play something badly on purpose. Try a riff you have no business attempting.",
          "This is the item that keeps you coming back. Don't skip it because it isn't 'productive'.",
        ],
      },
    ],
    skills: ["repertoire", "performing"],
  };
}
