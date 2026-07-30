import type { Lesson, WeekInfo } from "../types";
import { WEEK_1 } from "./week1";
import { WEEK_2 } from "./week2";
import { WEEK_3 } from "./week3";
import { WEEK_4 } from "./week4";
import { WEEK_5 } from "./week5";
import { WEEK_6 } from "./week6";
import { WEEK_7 } from "./week7";
import { WEEK_8 } from "./week8";

export const LESSONS: Lesson[] = [
  ...WEEK_1,
  ...WEEK_2,
  ...WEEK_3,
  ...WEEK_4,
  ...WEEK_5,
  ...WEEK_6,
  ...WEEK_7,
  ...WEEK_8,
];

export const TOTAL_DAYS = LESSONS.length;

export const WEEKS: WeekInfo[] = [
  {
    week: 1,
    title: "Get sound out of it",
    theme: "Tuning, clean fretting, your first two riffs, Em and Am.",
    payoff: "Smoke on the Water and Seven Nation Army",
  },
  {
    week: 2,
    title: "Power chords and palm muting",
    theme: "The two-finger shape, the chug, steady downpicking.",
    payoff: "Iron Man and Back in Black",
  },
  {
    week: 3,
    title: "Open chords and strumming",
    theme: "The big six chords, a real strum pattern, the capo.",
    payoff: "Zombie, and your first Hindi song",
  },
  {
    week: 4,
    title: "Rhythm that grooves",
    theme: "Dynamics, sixteenth notes, arpeggio picking, fast changes.",
    payoff: "A ballad, picked properly",
  },
  {
    week: 5,
    title: "Pentatonic and blues",
    theme: "Box 1, alternate picking, 12-bar blues, bends and vibrato.",
    payoff: "Your first solo over a backing track",
  },
  {
    week: 6,
    title: "Barre chords and metal",
    theme: "F and Bm, movable barre shapes, gallops, speed work.",
    payoff: "A heavy riff you wrote yourself",
  },
  {
    week: 7,
    title: "Lead: make it sing",
    theme: "Hammer-ons, slides, four licks, phrasing, improvising.",
    payoff: "Twelve bars improvised, no plan",
  },
  {
    week: 8,
    title: "Make it real",
    theme: "Polish four pieces, stand up, play for someone, record it.",
    payoff: "A recorded set of four pieces",
  },
];

const BY_DAY = new Map(LESSONS.map((l) => [l.day, l]));

export const getLesson = (day: number): Lesson | undefined => BY_DAY.get(day);

export const getWeekInfo = (week: number): WeekInfo | undefined =>
  WEEKS.find((w) => w.week === week);

export const lessonsForWeek = (week: number): Lesson[] =>
  LESSONS.filter((l) => l.week === week);

/** The one core item that counts as "done" on a ten-minute day. */
export const essentialItem = (lesson: Lesson) =>
  lesson.core.find((i) => i.essential) ?? lesson.core[0];

/** Total minutes if you do absolutely everything. */
export const fullMinutes = (lesson: Lesson) =>
  [...lesson.warmup, ...lesson.core, ...lesson.extension].reduce(
    (sum, i) => sum + i.minutes,
    0,
  );

/** Minutes for the bare-minimum version of the day. */
export const quickMinutes = (lesson: Lesson) =>
  lesson.warmup[0].minutes + essentialItem(lesson).minutes;
