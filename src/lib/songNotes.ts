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
