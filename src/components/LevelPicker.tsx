"use client";

import { useSyncExternalStore } from "react";
import { getLevel, getServerLevel, setLevel, subscribeLevel } from "@/lib/levelPref";
import { LEVELS } from "@/lib/levels";

/** Remembers your choice across songs, so you set it once. */
export function useLevel() {
  return useSyncExternalStore(subscribeLevel, getLevel, getServerLevel);
}

export function LevelPicker({ hint }: { hint?: string }) {
  const level = useLevel();

  return (
    <div className="space-y-2">
      <p className="legend">Playback level</p>
      <div className="flex gap-1.5">
        {LEVELS.map((option) => {
          const active = option.id === level;
          return (
            <button
              key={option.id}
              onClick={() => setLevel(option.id)}
              aria-pressed={active}
              className={`flex-1 rounded-md border px-2.5 py-2.5 text-left transition-colors ${
                active
                  ? "border-amber bg-amber/[0.08]"
                  : "border-line bg-panel hover:border-amber/40"
              }`}
            >
              <span
                className={`block text-[13px] font-semibold ${
                  active ? "text-amber" : "text-text"
                }`}
              >
                {option.label}
              </span>
              <span className="mt-0.5 block text-[11px] leading-snug text-dim">
                {option.blurb}
              </span>
            </button>
          );
        })}
      </div>
      {hint && <p className="text-[12px] leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}
