"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clickNow } from "@/lib/audio";
import type { TabBlock } from "@/lib/types";

/** High e at the top, low E at the bottom — the way tab is always written. */
const ROW_LABELS = ["e", "B", "G", "D", "A", "E"];

const CHAR_SAMPLE = "-".repeat(20);

interface Step {
  /** Column index where this note begins. */
  col: number;
  /** Columns it occupies, so a two-digit fret reads as one note. */
  width: number;
}

/**
 * Find the notes. A step starts at any column holding the first digit of a fret
 * number, so "12" counts once rather than twice.
 */
function findSteps(rows: string[]): Step[] {
  const width = rows[0]?.length ?? 0;
  const starts: number[] = [];

  for (let col = 0; col < width; col++) {
    let isStart = false;
    for (const row of rows) {
      const ch = row[col];
      if (ch && /\d/.test(ch)) {
        const prev = col > 0 ? row[col - 1] : undefined;
        if (!prev || !/\d/.test(prev)) isStart = true;
      }
    }
    if (isStart) starts.push(col);
  }

  return starts.map((col, i) => {
    const next = starts[i + 1] ?? width;
    let span = col;
    for (const row of rows) {
      let end = col;
      while (end < width && /\d/.test(row[end] ?? "")) end += 1;
      span = Math.max(span, end);
    }
    return { col, width: Math.max(1, Math.min(span - col, next - col)) };
  });
}

export function TabPlayer({ tab }: { tab: TabBlock }) {
  // Rows are authored loosely; pad them all to the same width so the columns
  // line up as real tab.
  const width = Math.max(12, ...tab.lines.map((l) => l.length));
  const rows = useMemo(
    () => tab.lines.map((line) => line.padEnd(width, "-")),
    [tab.lines, width],
  );
  const steps = useMemo(() => findSteps(rows), [rows]);

  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [loop, setLoop] = useState(true);
  const [withClick, setWithClick] = useState(true);
  /** Fractional column position of the cursor. Drives the glide. */
  const [pos, setPos] = useState<number | null>(null);
  const [noteIndex, setNoteIndex] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const charWidthRef = useRef(7.5);
  const rafRef = useRef(0);
  const startedAtRef = useRef(0);
  const lastNoteRef = useRef(-1);
  // The loop schedules itself through this ref so it never has to close over
  // its own identity.
  const frameRef = useRef<() => void>(() => {});
  // Read inside the animation loop, so changing them mid-play takes effect
  // without tearing down and restarting the frame loop.
  const liveRef = useRef({ bpm, loop, withClick });

  useEffect(() => {
    liveRef.current = { bpm, loop, withClick };
  }, [bpm, loop, withClick]);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    setPos(null);
    setNoteIndex(-1);
    lastNoteRef.current = -1;
  }, []);

  const frame = useCallback(() => {
    const total = steps.length;
    if (!total) return;

    const beatMs = 60_000 / liveRef.current.bpm;
    let beats = (performance.now() - startedAtRef.current) / beatMs;

    if (beats >= total) {
      if (!liveRef.current.loop) {
        stop();
        return;
      }
      startedAtRef.current = performance.now();
      lastNoteRef.current = -1;
      beats = 0;
    }

    const i = Math.min(Math.floor(beats), total - 1);
    const frac = beats - i;
    const from = steps[i].col;
    const to = i + 1 < total ? steps[i + 1].col : from + steps[i].width;
    const at = from + (to - from) * frac;

    setPos(at);

    if (i !== lastNoteRef.current) {
      lastNoteRef.current = i;
      setNoteIndex(i);
      if (liveRef.current.withClick) void clickNow(i === 0);
    }

    // Keep the cursor about a third in from the left. Setting scrollLeft every
    // frame is what makes the scroll glide instead of lurching.
    const box = scrollRef.current;
    if (box) {
      const x = at * charWidthRef.current;
      const target = x - box.clientWidth * 0.33;
      const max = box.scrollWidth - box.clientWidth;
      if (max > 0) box.scrollLeft = Math.max(0, Math.min(target, max));
    }

    rafRef.current = requestAnimationFrame(() => frameRef.current());
  }, [steps, stop]);

  useEffect(() => {
    frameRef.current = frame;
  }, [frame]);

  const start = useCallback(() => {
    if (!steps.length) return;
    // Measure now rather than on mount: by the time you press play the webfont
    // has definitely settled, so the character width is accurate.
    const sample = measureRef.current;
    if (sample) {
      const w = sample.getBoundingClientRect().width / CHAR_SAMPLE.length;
      if (w > 0) charWidthRef.current = w;
    }
    startedAtRef.current = performance.now();
    lastNoteRef.current = -1;
    setPlaying(true);
    rafRef.current = requestAnimationFrame(frame);
  }, [frame, steps.length]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const active = noteIndex >= 0 ? steps[noteIndex] : undefined;

  return (
    <figure className="rounded-md border border-line-soft bg-ink/70 p-3">
      {tab.label && (
        <figcaption className="mb-2.5 flex flex-wrap items-center gap-2 text-[11px] text-muted">
          {tab.label}
          {tab.simplified && (
            <span className="rounded border border-line px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-dim">
              simplified
            </span>
          )}
        </figcaption>
      )}

      <div className="flex gap-1 font-mono text-[13px] leading-[1.65]">
        <div className="shrink-0 select-none text-dim" aria-hidden>
          {ROW_LABELS.map((label) => (
            <div key={label}>{label}|</div>
          ))}
        </div>

        <div ref={scrollRef} className="tabscroll relative flex-1">
          {/* invisible ruler used to convert columns into pixels */}
          <span
            ref={measureRef}
            aria-hidden
            className="pointer-events-none absolute -top-96 left-0 whitespace-pre opacity-0"
          >
            {CHAR_SAMPLE}
          </span>

          <div className="relative w-fit">
            {/* soft band over the note being played */}
            {active && (
              <div
                className="pointer-events-none absolute inset-y-0 rounded-[2px] bg-amber/20"
                style={{ left: `${active.col}ch`, width: `${active.width}ch` }}
                aria-hidden
              />
            )}

            {/* the gliding cursor */}
            {pos !== null && (
              <div
                className="pointer-events-none absolute inset-y-0 w-[2px] bg-amber"
                style={{
                  left: `${pos}ch`,
                  boxShadow: "0 0 10px 1px var(--color-amber)",
                }}
                aria-hidden
              />
            )}

            {rows.map((row, i) => (
              <div key={i} className="relative whitespace-pre text-text/85">
                {row}
              </div>
            ))}
          </div>
        </div>
      </div>

      {steps.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line-soft pt-3">
          <button
            onClick={() => (playing ? stop() : start())}
            className={`px-3.5 py-2 text-[12.5px] font-semibold ${
              playing ? "rounded-md border border-line text-muted" : "btn-brand"
            }`}
          >
            {playing ? "■ Stop" : "▶ Play slowly"}
          </button>

          <label className="flex items-center gap-2 text-[11.5px] text-dim">
            <input
              type="range"
              min={30}
              max={140}
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-line accent-amber"
              aria-label="Playback tempo"
            />
            <span className="font-mono tabular-nums text-muted">{bpm}</span>
          </label>

          <label className="flex items-center gap-1.5 text-[11.5px] text-dim">
            <input
              type="checkbox"
              checked={loop}
              onChange={(e) => setLoop(e.target.checked)}
              className="accent-amber"
            />
            loop
          </label>

          <label className="flex items-center gap-1.5 text-[11.5px] text-dim">
            <input
              type="checkbox"
              checked={withClick}
              onChange={(e) => setWithClick(e.target.checked)}
              className="accent-amber"
            />
            click
          </label>

          <span className="ml-auto text-[11px] text-dim">
            {steps.length} notes · one per beat
          </span>
        </div>
      )}

      {tab.note && <p className="mt-2.5 text-[11px] leading-relaxed text-dim">{tab.note}</p>}
    </figure>
  );
}
