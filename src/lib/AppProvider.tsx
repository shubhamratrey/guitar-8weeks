"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { TOTAL_DAYS } from "./curriculum";
import { todayIST } from "./dates";
import {
  fetchRemote,
  firebaseConfigured,
  pushRemote,
  signInWithGoogle,
  signOutOfFirebase,
  watchAuth,
} from "./firebase";
import {
  getHydrated,
  getServerHydrated,
  getServerSnapshot,
  getSnapshot,
  setStore,
  subscribe,
} from "./localStore";
import { computeStats, computeStreak, type Stats, type StreakInfo } from "./progress";
import { clearLocal, mergeData } from "./store";
import { emptyData, type AppData, type DayLog } from "./types";

export type SyncState = "off" | "signed-out" | "syncing" | "synced" | "error";

interface AppContextValue {
  data: AppData;
  ready: boolean;
  streak: StreakInfo;
  stats: Stats;
  /** The lesson day you're on. Never tied to the calendar. */
  currentDay: number;
  todayLog: DayLog | undefined;
  logDay: (day: number, input: { minutes: number; short: boolean; notes?: string }) => void;
  undoToday: () => void;
  jumpToDay: (day: number) => void;
  resetEverything: () => void;
  /* firebase */
  sync: SyncState;
  userEmail: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(subscribe, getHydrated, getServerHydrated);

  const [sync, setSync] = useState<SyncState>(firebaseConfigured ? "signed-out" : "off");
  const [uid, setUid] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* watch firebase auth, if it's configured at all */
  useEffect(() => {
    if (!firebaseConfigured) return;
    let unsub = () => {};
    let cancelled = false;

    watchAuth((user) => {
      if (cancelled) return;
      setUid(user?.uid ?? null);
      setUserEmail(user?.email ?? null);
      setSync(user ? "syncing" : "signed-out");
    }).then((fn) => {
      if (cancelled) unsub();
      else unsub = fn;
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  /* on sign-in, pull remote and merge both ways */
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    (async () => {
      try {
        const remote = await fetchRemote(uid);
        if (cancelled) return;
        const local = getSnapshot();
        const merged = remote ? mergeData(local, remote) : local;
        setStore(merged);
        await pushRemote(uid, merged);
        if (!cancelled) setSync("synced");
      } catch {
        if (!cancelled) setSync("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  useEffect(() => {
    return () => {
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
  }, []);

  /** Single write path: persist locally, then debounce the push to Firestore. */
  const commit = useCallback(
    (next: AppData) => {
      setStore({ ...next, meta: { ...next.meta, updatedAt: new Date().toISOString() } });

      if (!uid) return;
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => {
        setSync("syncing");
        pushRemote(uid, getSnapshot())
          .then(() => setSync("synced"))
          .catch(() => setSync("error"));
      }, 1200);
    },
    [uid],
  );

  const logDay = useCallback(
    (day: number, input: { minutes: number; short: boolean; notes?: string }) => {
      const date = todayIST();
      const prev = getSnapshot();
      // Re-logging the same calendar day overwrites rather than advancing twice.
      const advance = !prev.days[date];

      commit({
        meta: {
          ...prev.meta,
          startedOn: prev.meta.startedOn ?? date,
          currentDay: advance
            ? Math.min(prev.meta.currentDay + 1, TOTAL_DAYS + 1)
            : prev.meta.currentDay,
        },
        days: {
          ...prev.days,
          [date]: {
            date,
            day,
            minutes: input.minutes,
            short: input.short,
            notes: input.notes?.trim() || undefined,
            completedAt: new Date().toISOString(),
          },
        },
      });
    },
    [commit],
  );

  const undoToday = useCallback(() => {
    const date = todayIST();
    const prev = getSnapshot();
    if (!prev.days[date]) return;
    const days = { ...prev.days };
    delete days[date];
    commit({
      meta: { ...prev.meta, currentDay: Math.max(1, prev.meta.currentDay - 1) },
      days,
    });
  }, [commit]);

  const jumpToDay = useCallback(
    (day: number) => {
      const prev = getSnapshot();
      commit({
        ...prev,
        meta: { ...prev.meta, currentDay: Math.min(Math.max(1, day), TOTAL_DAYS) },
      });
    },
    [commit],
  );

  const resetEverything = useCallback(() => {
    clearLocal();
    commit(emptyData());
  }, [commit]);

  const signIn = useCallback(async () => {
    try {
      setSync("syncing");
      await signInWithGoogle();
    } catch {
      setSync("error");
    }
  }, []);

  const signOut = useCallback(async () => {
    await signOutOfFirebase();
    setSync("signed-out");
  }, []);

  const streak = useMemo(() => computeStreak(data.days), [data.days]);
  const stats = useMemo(() => computeStats(data), [data]);

  const value: AppContextValue = {
    data,
    ready,
    streak,
    stats,
    currentDay: Math.min(data.meta.currentDay, TOTAL_DAYS),
    todayLog: data.days[todayIST()],
    logDay,
    undoToday,
    jumpToDay,
    resetEverything,
    sync,
    userEmail,
    signIn,
    signOut,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
