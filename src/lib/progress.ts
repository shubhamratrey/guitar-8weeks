import { TOTAL_DAYS } from "./curriculum";
import { shiftDate, todayIST } from "./dates";
import type { AppData, DayLog } from "./types";

export interface StreakInfo {
  /** Consecutive practice days, with at most one forgiven gap per week. */
  streak: number;
  /** True when a missed day is currently being covered by a shield. */
  shielded: boolean;
  practicedToday: boolean;
  longest: number;
}

/**
 * Streak rules, chosen so one bad day doesn't wipe out weeks of work:
 *  - today not yet done never breaks the streak (the day isn't over)
 *  - one missed day is forgiven per 7-day window
 *  - two misses close together does break it
 */
export function computeStreak(days: Record<string, DayLog>): StreakInfo {
  const dates = new Set(Object.keys(days));
  const today = todayIST();

  let streak = 0;
  let walked = 0;
  let lastForgiven = -Infinity;
  let shielded = false;
  let cursor = today;

  while (walked < 400) {
    if (dates.has(cursor)) {
      streak += 1;
    } else if (walked === 0) {
      // Today is still in progress. Neither credit nor penalty.
    } else if (walked - lastForgiven >= 7) {
      lastForgiven = walked;
      shielded = true;
    } else {
      break;
    }
    walked += 1;
    cursor = shiftDate(cursor, -1);
  }

  return {
    streak,
    shielded: shielded && streak > 0,
    practicedToday: dates.has(today),
    longest: longestRun(dates),
  };
}

function longestRun(dates: Set<string>): number {
  const sorted = [...dates].sort();
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const d of sorted) {
    run = prev && shiftDate(prev, 1) === d ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

export interface Stats {
  daysDone: number;
  totalMinutes: number;
  percentComplete: number;
}

export function computeStats(data: AppData): Stats {
  const logs = Object.values(data.days);
  return {
    daysDone: logs.length,
    totalMinutes: logs.reduce((sum, l) => sum + l.minutes, 0),
    percentComplete: Math.round(((data.meta.currentDay - 1) / TOTAL_DAYS) * 100),
  };
}

export const formatHours = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
};
