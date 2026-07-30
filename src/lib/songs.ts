import type { Score } from "./score";

export type Language = "hindi" | "english";

export interface Song {
  id: string;
  title: string;
  artist: string;
  language: Language;
  /** 1 = playable in week 1–3, 2 = needs barre or picking, 3 = a project. */
  difficulty: 1 | 2 | 3;
  /** Capo fret for the shapes listed below, when one is normally used. */
  capo?: number;
  /**
   * Shapes commonly used to play it. Keys and voicings vary between versions —
   * a starting point, not a definitive answer.
   */
  chords: string[];
  /**
   * The main progression a beginner plays, one chord per bar, so it can be
   * played along with in-app. It loops, which is how you practise a song.
   * Empty for riff-based songs and for pieces that need a full arrangement.
   */
  loop: string[];
  /**
   * A complete, note-for-note tab. Only present for public-domain melodies,
   * traditional material, and exercises written for this app.
   */
  score?: Score;
  /** True when the piece is public domain, traditional, or original to the app. */
  open?: boolean;
  /** Suggested strumming or picking approach. */
  strum?: string;
  /** Sensible starting tempo for playing along. */
  bpm?: number;
  /**
   * The scale to improvise with over these changes. Lets you solo over a song
   * without needing anyone's transcription of the recorded solo.
   */
  soloScale?: { rootFret: number; label: string };
  /** What playing this song actually trains. */
  teaches: string;
  /** Day in the 56-day plan where this song comes up, if it does. */
  planDay?: number;
  note?: string;
}

export const lessonSearchUrl = (song: Song) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${song.title} guitar lesson beginner`,
  )}`;

export const DIFFICULTY_LABEL: Record<Song["difficulty"], string> = {
  1: "Beginner",
  2: "Getting there",
  3: "A project",
};
