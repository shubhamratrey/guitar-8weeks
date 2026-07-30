/**
 * Your own words for a song, kept on your device.
 *
 * The app can't ship lyrics for songs still in copyright, but there's nothing
 * stopping you typing the words you already know against the chart. This is a
 * private scratchpad per song — it never leaves the browser.
 */

const KEY = (songId: string) => `guitar8w:words:${songId}`;

const cache = new Map<string, string>();
const listeners = new Set<() => void>();

export function subscribeWords(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

/** Must return a stable reference between writes, or React re-renders forever. */
export function getWords(songId: string): string {
  const cached = cache.get(songId);
  if (cached !== undefined) return cached;
  if (typeof window === "undefined") return "";
  let value = "";
  try {
    value = window.localStorage.getItem(KEY(songId)) ?? "";
  } catch {
    value = "";
  }
  cache.set(songId, value);
  return value;
}

export const getServerWords = () => "";

const PREFIX = "guitar8w:words:";

/** Everything you've written, as a JSON backup you keep yourself. */
export function exportAllWords(): string {
  const all: Record<string, string> = {};
  if (typeof window !== "undefined") {
    try {
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key?.startsWith(PREFIX)) {
          all[key.slice(PREFIX.length)] = window.localStorage.getItem(key) ?? "";
        }
      }
    } catch {
      // storage unavailable — hand back whatever this session has in memory
      for (const [id, value] of cache) all[id] = value;
    }
  }
  return JSON.stringify(all, null, 2);
}

export function setWords(songId: string, value: string): void {
  cache.set(songId, value);
  try {
    if (value) window.localStorage.setItem(KEY(songId), value);
    else window.localStorage.removeItem(KEY(songId));
  } catch {
    // Private browsing or a full quota — the text stays in memory for the session.
  }
  for (const listener of listeners) listener();
}
