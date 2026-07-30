"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LessonItemCard } from "./LessonItemCard";
import { Metronome } from "./Metronome";
import { StreakPill } from "./StreakPill";
import { useApp } from "@/lib/AppProvider";
import {
  TOTAL_DAYS,
  essentialItem,
  fullMinutes,
  getLesson,
  getWeekInfo,
  quickMinutes,
} from "@/lib/curriculum";
import { istHour } from "@/lib/dates";

const greetingFor = (hour: number) =>
  hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : hour < 22 ? "Good evening" : "Late one";

export function TodayScreen() {
  const { ready, currentDay, todayLog, logDay, undoToday, data } = useApp();

  const [short, setShort] = useState(false);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [showExtra, setShowExtra] = useState(false);
  const [showMetronome, setShowMetronome] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [justLogged, setJustLogged] = useState(false);

  // Derived at render rather than in an effect, and held back until hydration so
  // the server's clock can't disagree with the browser's across an hour boundary.
  const greeting = ready ? greetingFor(istHour()) : "";
  const lesson = getLesson(currentDay);
  const week = lesson ? getWeekInfo(lesson.week) : undefined;

  const items = useMemo(() => {
    if (!lesson) return [];
    return short ? [essentialItem(lesson)] : lesson.core;
  }, [lesson, short]);

  const toggle = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  if (!ready) {
    return (
      <div className="space-y-4 pt-6">
        <div className="h-5 w-28 animate-pulse rounded bg-panel" />
        <div className="h-36 animate-pulse rounded-lg bg-panel" />
        <div className="h-16 animate-pulse rounded-lg bg-panel" />
      </div>
    );
  }

  /* ---- finished all 56 days ---- */
  if (!lesson || data.meta.currentDay > TOTAL_DAYS) {
    return (
      <div className="mx-auto max-w-lg space-y-5 pt-16 text-center">
        <p className="legend">Fin</p>
        <h1 className="display text-4xl text-text">All fifty-six days</h1>
        <div className="rule mx-auto w-24" />
        <p className="text-[14.5px] leading-relaxed text-muted">
          Eight weeks ago you couldn&apos;t tune it. Now you can play a set. Pick the one
          style you enjoyed most and go deep on it next.
        </p>
        <Link href="/progress" className="btn-brand inline-block px-6 py-3 text-[15px] font-semibold">
          See what you did
        </Link>
      </div>
    );
  }

  const minutes = short ? quickMinutes(lesson) : fullMinutes(lesson);

  const submit = () => {
    logDay(currentDay, { minutes, short, notes });
    setJustLogged(true);
    setDone(new Set());
    setNotes("");
    setNoteOpen(false);
    setShowExtra(false);
    window.scrollTo({ top: 0 });
  };

  /* ---- just finished a session ---- */
  if (todayLog && justLogged) {
    const next = getLesson(currentDay);
    return (
      <div className="animate-pop mx-auto max-w-lg space-y-6 pt-16 text-center">
        <p className="legend">Logged</p>
        <h1 className="display text-4xl text-text">Day {todayLog.day} done</h1>
        <div className="rule mx-auto w-24" />
        <p className="text-[14px] text-muted">
          {todayLog.short ? "A short one, and it still counts." : "That's the work done."}
        </p>
        <div className="flex justify-center">
          <StreakPill />
        </div>
        {next && (
          <div className="panel p-5 text-left">
            <p className="legend">Next time</p>
            <p className="display mt-1.5 text-[19px] text-text">{next.title}</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{next.win}</p>
          </div>
        )}
        <button
          onClick={() => setJustLogged(false)}
          className="text-[13px] text-amber underline decoration-amber/40 underline-offset-4"
        >
          Keep playing anyway
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <header className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="legend">{greeting || " "}</p>
          <h1 className="display mt-1.5 text-[34px] leading-none text-text">
            Day {lesson.day}
            <span className="text-[18px] text-dim"> / {TOTAL_DAYS}</span>
          </h1>
          <p className="mt-2 text-[12.5px] text-dim">
            Week {lesson.week} — {week?.title}
          </p>
        </div>
        <StreakPill />
      </header>

      <div className="rule" />

      {todayLog && (
        <div className="flex items-center gap-2 rounded-md border border-good/25 bg-good/[0.06] px-3.5 py-2.5 text-[12.5px]">
          <span className="text-good">Already logged today.</span>
          <button
            onClick={undoToday}
            className="ml-auto text-dim underline decoration-dotted hover:text-heat"
          >
            undo
          </button>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-8">
        {/* main column */}
        <div className="space-y-4">
          <section className="panel p-5">
            <h2 className="display text-[24px] leading-snug text-text">{lesson.title}</h2>
            <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{lesson.goal}</p>
            <div className="mt-4 border-l-2 border-amber pl-3.5">
              <p className="legend">By the end</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-text">{lesson.win}</p>
            </div>
          </section>

          {/* short-day escape hatch */}
          {!short ? (
            <button
              onClick={() => setShort(true)}
              className="w-full rounded-md border border-line bg-panel px-4 py-3 text-left text-[13px] text-muted hover:border-amber/50"
            >
              Only got ten minutes? <span className="text-amber">Shrink today →</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-md border border-amber/30 bg-amber/[0.06] px-3.5 py-3 text-[12.5px]">
              <span className="text-amber">Short version — just the one thing that matters.</span>
              <button
                onClick={() => setShort(false)}
                className="ml-auto shrink-0 text-dim underline decoration-dotted hover:text-amber"
              >
                full day
              </button>
            </div>
          )}

          {/* warmup, folded away because it barely changes */}
          <details className="rounded-md border border-line-soft bg-panel">
            <summary className="cursor-pointer px-4 py-3 text-[13.5px] text-muted">
              Warm up first
              <span className="text-dim">
                {" "}
                · {lesson.warmup.reduce((s, i) => s + i.minutes, 0)} min
              </span>
            </summary>
            <div className="space-y-3.5 border-t border-line-soft px-4 py-3.5">
              {lesson.warmup.map((w) => (
                <div key={w.id}>
                  <p className="text-[13.5px] font-semibold text-text">{w.title}</p>
                  {w.how && (
                    <ul className="mt-1 space-y-1">
                      {w.how.map((step, i) => (
                        <li key={i} className="text-[12.5px] leading-relaxed text-muted">
                          {step}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </details>

          {/* the actual work */}
          <section className="space-y-2">
            <h3 className="legend px-0.5">{short ? "Do this" : "Today's practice"}</h3>
            {items.map((item) => (
              <LessonItemCard
                key={item.id}
                item={item}
                done={done.has(item.id)}
                onToggle={() => toggle(item.id)}
                startOpen={short}
              />
            ))}
          </section>

          {/* extras */}
          {!short && lesson.extension.length > 0 && (
            <section className="space-y-2">
              {showExtra ? (
                <>
                  <h3 className="legend px-0.5">If you&apos;re enjoying it</h3>
                  {lesson.extension.map((item) => (
                    <LessonItemCard
                      key={item.id}
                      item={item}
                      done={done.has(item.id)}
                      onToggle={() => toggle(item.id)}
                    />
                  ))}
                </>
              ) : (
                <button
                  onClick={() => setShowExtra(true)}
                  className="w-full rounded-md border border-line bg-panel px-4 py-3 text-left text-[13px] text-muted hover:border-amber/50"
                >
                  Got more time? <span className="text-amber">Show extras →</span>
                </button>
              )}
            </section>
          )}
        </div>

        {/* action rail — sticky on a laptop, just the bottom of the page on a phone */}
        <aside className="mt-4 space-y-3 lg:mt-0 lg:sticky lg:top-8">
          <div className="panel p-4">
            <p className="legend">Metronome</p>
            {showMetronome ? (
              <div className="animate-rise mt-3">
                <Metronome initialBpm={lesson.core.find((i) => i.bpm)?.bpm?.start ?? 80} />
              </div>
            ) : (
              <button
                onClick={() => setShowMetronome(true)}
                className="mt-2 text-[13px] text-amber underline decoration-amber/40 underline-offset-4"
              >
                Open it
              </button>
            )}
          </div>

          <div className="panel space-y-3 p-4">
            {noteOpen ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                autoFocus
                placeholder="Anything worth remembering?"
                className="w-full resize-none rounded-md border border-line bg-panel-2 px-3 py-2.5 text-[13.5px] text-text placeholder:text-dim/70 outline-none focus:border-amber"
              />
            ) : (
              <button
                onClick={() => setNoteOpen(true)}
                className="text-[12.5px] text-dim underline decoration-dotted"
              >
                add a note
              </button>
            )}

            <button
              onClick={submit}
              className="btn-brand w-full py-3.5 text-[15px] font-bold transition-transform active:scale-[0.99]"
            >
              {todayLog ? "Update today" : "I practised today"}
            </button>
            <p className="text-center text-[11.5px] leading-relaxed text-dim">
              Nothing above is required. Showing up is what&apos;s tracked.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
