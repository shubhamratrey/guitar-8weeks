"use client";

import { useState } from "react";
import { StreakPill } from "@/components/StreakPill";
import { useApp } from "@/lib/AppProvider";
import { TOTAL_DAYS, WEEKS, getLesson, lessonsForWeek } from "@/lib/curriculum";
import { relativeDay } from "@/lib/dates";
import { firebaseConfigured } from "@/lib/firebase";
import { formatHours } from "@/lib/progress";

export default function ProgressPage() {
  const { data, stats, streak, currentDay, jumpToDay, resetEverything, sync, userEmail, signIn, signOut } =
    useApp();
  const [confirmReset, setConfirmReset] = useState(false);

  const doneDays = new Set(Object.values(data.days).map((l) => l.day));
  const recent = Object.values(data.days)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="legend">Your record</p>
          <h1 className="display mt-1.5 text-[30px] leading-none text-text">Progress</h1>
        </div>
        <StreakPill />
      </header>
      <div className="rule" />

      {/* three numbers, nothing more */}
      <div className="grid grid-cols-3 gap-2.5">
        <Stat label="Days" value={`${stats.daysDone}`} sub={`of ${TOTAL_DAYS}`} />
        <Stat label="Played" value={formatHours(stats.totalMinutes)} />
        <Stat label="Best streak" value={`${streak.longest}d`} />
      </div>

      {/* the 56 dots */}
      <section className="panel space-y-3 p-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold text-text">All 56 days</h2>
          <span className="font-mono text-[13px] text-amber">{stats.percentComplete}%</span>
        </div>
        <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1.5">
          {Array.from({ length: TOTAL_DAYS }, (_, i) => {
            const day = i + 1;
            const isDone = doneDays.has(day);
            const isNow = day === currentDay;
            return (
              <button
                key={day}
                onClick={() => jumpToDay(day)}
                title={`Day ${day} — ${getLesson(day)?.title ?? ""}`}
                aria-label={`Day ${day}${isDone ? ", done" : ""}`}
                className={`aspect-square rounded-[4px] transition-colors ${
                  isDone
                    ? "bg-good"
                    : isNow
                      ? "bg-amber"
                      : "bg-line-soft hover:bg-line"
                }`}
              />
            );
          })}
        </div>
        <p className="text-[11.5px] leading-relaxed text-dim">
          Green is done, amber is where you are. Days move when you finish one, not when the
          calendar does — so missing a week never puts you behind.
        </p>
      </section>

      {/* what's coming */}
      <section className="panel divide-y divide-line-soft">
        <h2 className="p-4 pb-3 text-[13px] font-semibold text-text">The eight weeks</h2>
        {WEEKS.map((week) => {
          const lessons = lessonsForWeek(week.week);
          const completed = lessons.filter((l) => doneDays.has(l.day)).length;
          const isCurrent = lessons.some((l) => l.day === currentDay);
          return (
            <div key={week.week} className="flex items-start gap-3 px-4 py-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${
                  completed === lessons.length
                    ? "bg-good/20 text-good"
                    : isCurrent
                      ? "bg-amber text-ink"
                      : "bg-panel-2 text-dim"
                }`}
              >
                {completed === lessons.length ? "✓" : week.week}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-text">{week.title}</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-dim">
                  {week.payoff} · {completed}/{lessons.length}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* recent sessions */}
      {recent.length > 0 && (
        <section className="panel divide-y divide-line-soft">
          <h2 className="p-4 pb-3 text-[13px] font-semibold text-text">Recent sessions</h2>
          {recent.map((log) => (
            <div key={log.date} className="px-4 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[13.5px] font-medium text-text">
                  Day {log.day}
                  <span className="font-normal text-dim">
                    {" "}
                    — {getLesson(log.day)?.title ?? ""}
                  </span>
                </p>
                <span className="shrink-0 font-mono text-[11.5px] text-dim">
                  {relativeDay(log.date)}
                </span>
              </div>
              {log.notes && (
                <p className="mt-2 border-l-2 border-amber/40 pl-3 text-[13px] leading-relaxed text-muted">
                  {log.notes}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* settings, kept small */}
      <section className="panel space-y-3 p-4">
        {firebaseConfigured ? (
          <>
            <p className="text-[12.5px] leading-relaxed text-muted">
              {userEmail
                ? `Synced as ${userEmail} — open this on your phone and it'll match.`
                : sync === "error"
                  ? "Sync failed. Your progress is still safe on this device."
                  : "Sign in to sync between your phone and laptop."}
            </p>
            <button
              onClick={() => (userEmail ? signOut() : signIn())}
              className="rounded-lg border border-line px-4 py-2.5 text-[13px] font-medium text-text hover:border-amber hover:text-amber"
            >
              {userEmail ? "Sign out" : "Sign in with Google"}
            </button>
          </>
        ) : (
          <p className="text-[12.5px] leading-relaxed text-muted">
            Saved on this device. That&apos;s why it worked the moment you opened it.
          </p>
        )}

        {confirmReset ? (
          <div className="space-y-2.5 border-t border-line-soft pt-3">
            <p className="text-[12.5px] text-heat">
              This erases every logged day and sends you back to day 1.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  resetEverything();
                  setConfirmReset(false);
                }}
                className="rounded-lg bg-heat px-4 py-2.5 text-[13px] font-semibold text-ink"
              >
                Erase everything
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="rounded-lg border border-line px-4 py-2.5 text-[13px] font-medium text-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="border-t border-line-soft pt-3 text-left text-[12px] text-dim underline decoration-dotted hover:text-heat"
          >
            Start over
          </button>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="panel p-4">
      <p className="legend">{label}</p>
      <p className="display mt-2 text-[26px] leading-none text-amber">{value}</p>
      {sub && <p className="mt-1 text-[11px] text-dim">{sub}</p>}
    </div>
  );
}
