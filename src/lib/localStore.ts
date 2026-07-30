import { loadLocal, saveLocal } from "./store";
import { emptyData, type AppData } from "./types";

/**
 * localStorage as a proper external store, so React reads it through
 * useSyncExternalStore instead of copying it into state inside an effect.
 * Both snapshots must be referentially stable between writes or React will
 * re-render forever.
 */

const SERVER_SNAPSHOT: AppData = emptyData();

let current: AppData | null = null;
const listeners = new Set<() => void>();

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function getSnapshot(): AppData {
  if (!current) current = loadLocal();
  return current;
}

/** Used during SSR and hydration; swapped for the real snapshot straight after. */
export function getServerSnapshot(): AppData {
  return SERVER_SNAPSHOT;
}

/** True only once hydration is done — handy for skipping first-paint flashes. */
export const getHydrated = () => true;
export const getServerHydrated = () => false;

export function setStore(next: AppData): void {
  current = next;
  saveLocal(next);
  for (const listener of listeners) listener();
}
