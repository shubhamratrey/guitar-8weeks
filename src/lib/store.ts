import { emptyData, type AppData, type DayLog } from "./types";

const KEY = "guitar8w:v1";

export function loadLocal(): AppData {
  if (typeof window === "undefined") return emptyData();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw) as Partial<AppData>;
    // Merge into a fresh shape so an old or hand-edited blob can't crash the app.
    return {
      meta: { ...emptyData().meta, ...parsed.meta },
      days: parsed.days ?? {},
    };
  } catch {
    return emptyData();
  }
}

export function saveLocal(data: AppData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Private browsing or a full quota. Losing a log beats crashing mid-session.
  }
}

export function clearLocal(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

/**
 * Last-write-wins per day, which is right for one person using a phone and a
 * laptop. Worst case, one device's note for a given day beats the other's.
 */
export function mergeData(local: AppData, remote: AppData): AppData {
  const days: Record<string, DayLog> = { ...remote.days };
  for (const [date, log] of Object.entries(local.days)) {
    const existing = days[date];
    if (!existing || log.completedAt > existing.completedAt) days[date] = log;
  }

  const started = [local.meta.startedOn, remote.meta.startedOn].filter(Boolean) as string[];

  return {
    meta: {
      // currentDay only moves forward, so the higher value is the true one.
      currentDay: Math.max(local.meta.currentDay, remote.meta.currentDay),
      startedOn: started.length ? started.sort()[0] : undefined,
      updatedAt:
        local.meta.updatedAt > remote.meta.updatedAt
          ? local.meta.updatedAt
          : remote.meta.updatedAt,
    },
    days,
  };
}
