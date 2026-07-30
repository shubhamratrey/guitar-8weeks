import { parseStrum, STRUM } from "./strum";
import type { Song } from "./songs";

export type Level = "beginner" | "intermediate" | "advanced";

export const LEVELS: { id: Level; label: string; blurb: string }[] = [
  {
    id: "beginner",
    label: "Beginner",
    blurb: "Slower, one strum per beat, easiest voicings",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    blurb: "The song's own tempo and strum pattern",
  },
  {
    id: "advanced",
    label: "Advanced",
    blurb: "Full tempo and voicings, no simplifications",
  },
];

/** Substitutions that keep the harmony but ask less of your hand. */
const EASIER: Record<string, string> = {
  F: "Fmaj7",
  Fmaj7: "Fmaj7",
};

/** The reverse: the fuller voicing, once you can hold it. */
const FULLER: Record<string, string> = {
  Fmaj7: "F",
  Am7: "Am",
  Em7: "Em",
  Dsus2: "D",
};

const TEMPO: Record<Level, number> = {
  beginner: 0.7,
  intermediate: 1,
  advanced: 1.15,
};

const clampBpm = (bpm: number) => Math.max(40, Math.min(200, Math.round(bpm)));

export interface Arrangement {
  bpm: number;
  strum?: string;
  loop: string[];
  /** Plain-English summary of what this level changed. */
  hint: string;
}

/**
 * Three arrangements derived from one set of song data, rather than three
 * hand-written charts per song. Each level only ever changes tempo, right-hand
 * density and chord voicing — never the harmony, and never the notes of a
 * written tab.
 */
export function arrangeFor(song: Song, level: Level): Arrangement {
  const baseBpm = song.bpm ?? 70;
  const bpm = clampBpm(baseBpm * TEMPO[level]);
  const plan = parseStrum(song.strum);
  const picked = plan?.kind === "arpeggio";

  // A written tab has its own notes and rhythm. Imposing a strum pattern on it
  // would only mislabel the sheet, so level changes nothing but the tempo.
  if (song.score) {
    return {
      bpm,
      strum: song.strum,
      loop: song.loop,
      hint:
        level === "intermediate"
          ? "As written, at the tempo it's meant to sit at."
          : `Same notes, taken at ${bpm} instead of ${baseBpm} bpm.`,
    };
  }

  if (level === "beginner") {
    return {
      bpm,
      // Picking stays picking; strumming drops to one downstroke per beat.
      strum: picked ? song.strum : STRUM.simple,
      loop: song.loop.map((chord) => EASIER[chord] ?? chord),
      hint: song.score
        ? `Same notes, taken at ${bpm} instead of ${baseBpm}. Get it clean here before moving up.`
        : `One downstroke per beat at ${bpm} bpm, with the easiest voicings. Nail the changes before adding a pattern.`,
    };
  }

  if (level === "advanced") {
    // Deliberately NOT a busier strum. Density is a property of the song, not of
    // the player's skill — sixteenths over a ballad is just the wrong song. What
    // gets harder is the voicings and the tempo.
    return {
      bpm,
      strum: song.strum,
      loop: song.loop.map((chord) => FULLER[chord] ?? chord),
      hint: `${bpm} bpm with the full voicings and no substitutions. Try it with barre shapes further up the neck too.`,
    };
  }

  return {
    bpm,
    strum: song.strum,
    loop: song.loop,
    hint: song.score
      ? "As written, at the tempo it's meant to sit at."
      : "The song's own tempo and strum pattern.",
  };
}
