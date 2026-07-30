"use client";

import { useApp } from "@/lib/AppProvider";

export function StreakPill() {
  const { streak } = useApp();

  if (streak.streak === 0) {
    return (
      <span className="shrink-0 rounded-md border border-line px-3 py-2 text-[11.5px] text-dim">
        no streak yet
      </span>
    );
  }

  return (
    <span
      className="flex shrink-0 items-baseline gap-1.5 rounded-md border border-amber/35 bg-amber/[0.07] px-3.5 py-2"
      title={
        streak.shielded
          ? "A missed day is being covered by your weekly shield"
          : `Longest run: ${streak.longest} days`
      }
    >
      <span className="display text-[19px] leading-none text-amber">{streak.streak}</span>
      <span className="legend">
        {streak.shielded ? "day · held" : streak.streak === 1 ? "day" : "days"}
      </span>
    </span>
  );
}
