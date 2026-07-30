export type ItemKind = "warmup" | "drill" | "technique" | "song" | "theory";

/** A single thing you do in a practice session. */
export interface LessonItem {
  id: string;
  title: string;
  kind: ItemKind;
  minutes: number;
  /** Step-by-step instructions, written to be read with a guitar in your hands. */
  how?: string[];
  tab?: TabBlock;
  /** Chord ids from lib/chords.ts — rendered as diagrams. */
  chords?: string[];
  bpm?: { start: number; target: number };
  /** YouTube search query. We link rather than embed so nothing rots. */
  watch?: string;
  /** The one item that counts as done on a ten-minute day. */
  essential?: boolean;
}

export interface TabBlock {
  label?: string;
  /** Tab rows, high e first, low E last. Six rows. */
  lines: string[];
  note?: string;
  /** True when this is a beginner reduction rather than the exact recorded part. */
  simplified?: boolean;
}

export interface Lesson {
  day: number;
  week: number;
  title: string;
  /** What today is for, in one line. */
  goal: string;
  /** The payoff, always phrased as something you can now do. */
  win: string;
  warmup: LessonItem[];
  core: LessonItem[];
  extension: LessonItem[];
  /** Loose tags describing what the day covers. */
  skills: string[];
}

export interface WeekInfo {
  week: number;
  title: string;
  theme: string;
  /** The song you can play for someone by the end of this week. */
  payoff: string;
}

export interface Chord {
  id: string;
  name: string;
  /** Fret per string, low E → high e. -1 = don't play, 0 = open. */
  frets: number[];
  /** Finger per string, low E → high e. 0 = open or unused. */
  fingers: number[];
  /** Lowest fret shown in the diagram. */
  baseFret: number;
  /** Strings barred at baseFret, as [fromStringIndex, toStringIndex]. */
  barre?: [number, number];
  tip?: string;
}

/* ---------- stored progress ---------- */

export interface DayLog {
  /** IST calendar date, YYYY-MM-DD. One log per date. */
  date: string;
  /** Curriculum day number completed on that date. */
  day: number;
  minutes: number;
  /** A short session still counts — this just records which it was. */
  short: boolean;
  notes?: string;
  completedAt: string;
}

export interface Meta {
  /** IST date of the first completed day. */
  startedOn?: string;
  /** The day you're on now. Advances only when you finish a day. */
  currentDay: number;
  updatedAt: string;
}

export interface AppData {
  meta: Meta;
  days: Record<string, DayLog>;
}

export const emptyData = (): AppData => ({
  meta: { currentDay: 1, updatedAt: new Date(0).toISOString() },
  days: {},
});
