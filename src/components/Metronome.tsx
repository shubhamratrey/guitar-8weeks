"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAudioContext, scheduleClick } from "@/lib/audio";

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.12;

/**
 * Scheduled against the AudioContext clock rather than setInterval alone —
 * timer drift is very audible once you're above about 100 bpm.
 */
export function Metronome({ initialBpm = 80 }: { initialBpm?: number }) {
  const [bpm, setBpm] = useState(initialBpm);
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(0);

  const ctxRef = useRef<AudioContext | null>(null);
  const nextNoteRef = useRef(0);
  const beatRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bpmRef = useRef(bpm);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
    setBeat(0);
    beatRef.current = 0;
  }, []);

  const start = useCallback(async () => {
    const ctx = await getAudioContext();
    ctxRef.current = ctx;
    nextNoteRef.current = ctx.currentTime + 0.06;
    beatRef.current = 0;
    setRunning(true);

    timerRef.current = setInterval(() => {
      const c = ctxRef.current;
      if (!c) return;
      while (nextNoteRef.current < c.currentTime + SCHEDULE_AHEAD_S) {
        const accent = beatRef.current % 4 === 0;
        scheduleClick(c, nextNoteRef.current, accent);
        setBeat(beatRef.current % 4);
        nextNoteRef.current += 60 / bpmRef.current;
        beatRef.current += 1;
      }
    }, LOOKAHEAD_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const nudge = (delta: number) => setBpm((b) => Math.min(220, Math.max(40, b + delta)));

  return (
    <div className="rounded-md border border-line-soft bg-panel-2 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-1.5">
          <span className="display text-[30px] leading-none tabular-nums text-text">
            {bpm}
          </span>
          <span className="legend">bpm</span>
        </div>

        <div className="flex items-center gap-1.5" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-colors duration-75 ${
                running && beat === i ? (i === 0 ? "bg-amber" : "bg-text") : "bg-line"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => (running ? stop() : start())}
          className={`min-w-20 px-4 py-2.5 text-[13px] font-bold ${
            running ? "rounded-md border border-line text-muted" : "btn-brand"
          }`}
        >
          {running ? "Stop" : "Start"}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => nudge(-5)}
          className="h-9 w-9 shrink-0 rounded-md border border-line text-lg leading-none text-muted hover:border-amber hover:text-amber"
          aria-label="5 bpm slower"
        >
          −
        </button>
        <input
          type="range"
          min={40}
          max={220}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-amber"
          aria-label="Tempo"
        />
        <button
          onClick={() => nudge(5)}
          className="h-9 w-9 shrink-0 rounded-md border border-line text-lg leading-none text-muted hover:border-amber hover:text-amber"
          aria-label="5 bpm faster"
        >
          +
        </button>
      </div>
    </div>
  );
}
