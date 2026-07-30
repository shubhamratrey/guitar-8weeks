/** A note on the staff. `string` is 0 = high e … 5 = low E, matching tab rows. */
export interface ScoreNote {
  string: number;
  fret: number;
  /** Which beat of the bar it falls on, 0-indexed. Fractions are fine. */
  beat: number;
}

export interface ScoreBar {
  /** Chord name printed above the bar. */
  chord?: string;
  /** Fret numbers on the staff. Omit for a rhythm-only bar. */
  notes?: ScoreNote[];
  /** Text above the bar, e.g. "let ring" or "P.M." */
  direction?: string;
  /**
   * Syllables sung over this bar, hyphenated so they line up with the notes.
   * Only set for public-domain and traditional words.
   */
  lyric?: string;
}

export interface Score {
  beatsPerBar: number;
  bars: ScoreBar[];
  /** Repeat the whole thing when playback reaches the end. */
  title?: string;
}

/**
 * Turn a chord progression into a rhythm chart: one bar per chord, strummed
 * across the bar. This is the chart a beginner actually plays from.
 */
export function chartFromLoop(loop: string[], beatsPerBar = 4): Score {
  return {
    beatsPerBar,
    bars: loop.map((chord) => ({ chord })),
  };
}

export const totalBeats = (score: Score) => score.bars.length * score.beatsPerBar;
