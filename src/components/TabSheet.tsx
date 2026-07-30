"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChordDiagram } from "./ChordDiagram";
import { clickNow } from "@/lib/audio";
import { getChord } from "@/lib/chords";
import type { Score } from "@/lib/score";

const BARS_PER_SYSTEM = 4;
const STRINGS = 6;

/* geometry in SVG units. Stage mode is the same drawing, scaled up. */
const INLINE = { barW: 150, left: 22, top: 34, gap: 13, chord: 13, fret: 10.5, dot: 7 };
const STAGE = { barW: 190, left: 28, top: 44, gap: 19, chord: 17, fret: 13.5, dot: 9.5 };

const ROW_LABELS = ["e", "B", "G", "D", "A", "E"];

/**
 * The notation surface: a tab staff that wraps across systems like printed
 * music, with bar numbers, chord names, and a playhead that sweeps in time.
 */
export function TabSheet({
  score,
  initialBpm = 70,
  strum,
  capo,
  stage = false,
}: {
  score: Score;
  initialBpm?: number;
  strum?: string;
  capo?: number;
  /** Full-screen presentation: bigger staff, transport pinned to the bottom. */
  stage?: boolean;
}) {
  const { bars, beatsPerBar } = score;
  const G = stage ? STAGE : INLINE;
  const staffH = G.gap * (STRINGS - 1);
  const systemH = G.top + staffH + 26;

  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(initialBpm);
  const [loop, setLoop] = useState(true);
  const [withClick, setWithClick] = useState(true);
  /** Beats elapsed, fractional. Drives everything visual. */
  const [beats, setBeats] = useState<number | null>(null);

  const rafRef = useRef(0);
  const startedAtRef = useRef(0);
  const lastBeatRef = useRef(-1);
  const lastSystemRef = useRef(-1);
  const systemRefs = useRef<(SVGSVGElement | null)[]>([]);
  const frameRef = useRef<() => void>(() => {});
  const liveRef = useRef({ bpm, loop, withClick });

  useEffect(() => {
    liveRef.current = { bpm, loop, withClick };
  }, [bpm, loop, withClick]);

  const total = bars.length * beatsPerBar;

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    setBeats(null);
    lastBeatRef.current = -1;
    lastSystemRef.current = -1;
  }, []);

  const frame = useCallback(() => {
    if (!total) return;
    const beatMs = 60_000 / liveRef.current.bpm;
    let elapsed = (performance.now() - startedAtRef.current) / beatMs;

    if (elapsed >= total) {
      if (!liveRef.current.loop) {
        stop();
        return;
      }
      startedAtRef.current = performance.now();
      lastBeatRef.current = -1;
      elapsed = 0;
    }

    setBeats(elapsed);

    const whole = Math.floor(elapsed);
    if (whole !== lastBeatRef.current) {
      lastBeatRef.current = whole;
      if (liveRef.current.withClick) void clickNow(whole % beatsPerBar === 0);
    }

    // Follow the music down the page, the way a page-turner would.
    const system = Math.floor(Math.floor(elapsed / beatsPerBar) / BARS_PER_SYSTEM);
    if (system !== lastSystemRef.current) {
      lastSystemRef.current = system;
      systemRefs.current[system]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }

    rafRef.current = requestAnimationFrame(() => frameRef.current());
  }, [total, beatsPerBar, stop]);

  useEffect(() => {
    frameRef.current = frame;
  }, [frame]);

  const start = useCallback(() => {
    if (!total) return;
    startedAtRef.current = performance.now();
    lastBeatRef.current = -1;
    lastSystemRef.current = -1;
    setPlaying(true);
    rafRef.current = requestAnimationFrame(() => frameRef.current());
  }, [total]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  if (!bars.length) return null;

  const systems: { bars: typeof bars; offset: number }[] = [];
  for (let i = 0; i < bars.length; i += BARS_PER_SYSTEM) {
    systems.push({ bars: bars.slice(i, i + BARS_PER_SYSTEM), offset: i });
  }

  const activeBar = beats === null ? -1 : Math.floor(beats / beatsPerBar);
  const beatInBar = beats === null ? 0 : beats - activeBar * beatsPerBar;
  const currentChord = bars[activeBar >= 0 ? activeBar : 0]?.chord;
  const nextChord = bars[((activeBar >= 0 ? activeBar : 0) + 1) % bars.length]?.chord;

  const transport = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <button
        onClick={() => (playing ? stop() : start())}
        className={`px-4 py-2.5 text-[13px] font-semibold ${
          playing ? "rounded-md border border-line text-muted" : "btn-brand"
        }`}
      >
        {playing ? "■ Stop" : "▶ Play along"}
      </button>

      <label className="flex items-center gap-2 text-[11.5px] text-dim">
        <input
          type="range"
          min={40}
          max={160}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-line accent-amber sm:w-32"
          aria-label="Tempo"
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

      <span className="ml-auto hidden text-[11px] text-dim sm:block">
        {bars.length} bars · {beatsPerBar}/4
        {capo !== undefined ? ` · capo ${capo}` : ""}
      </span>
    </div>
  );

  const shapes = (currentChord || nextChord) && (
    <div className="flex items-end gap-5 rounded-md border border-line-soft bg-panel-2 p-3.5">
      {currentChord && (
        <div>
          <p className="legend mb-1.5">Playing</p>
          {getChord(currentChord) ? (
            <ChordDiagram id={currentChord} size={stage ? 92 : 80} />
          ) : (
            <p className="display text-[22px] text-text">{currentChord}</p>
          )}
        </div>
      )}
      {nextChord && (
        <div className="opacity-55">
          <p className="legend mb-1.5">Next</p>
          {getChord(nextChord) ? (
            <ChordDiagram id={nextChord} size={stage ? 70 : 62} />
          ) : (
            <p className="display text-[18px] text-text">{nextChord}</p>
          )}
        </div>
      )}
      <div className="ml-auto flex items-center gap-1.5 self-center" aria-hidden>
        {Array.from({ length: beatsPerBar }, (_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors duration-75 ${
              playing && Math.floor(beatInBar) === i
                ? i === 0
                  ? "bg-amber"
                  : "bg-text"
                : "bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );

  const sheet = (
    <div
      className={
        stage
          ? "space-y-3"
          : "space-y-2 rounded-md border border-line-soft bg-ink/70 p-3"
      }
    >
      {systems.map((system, systemIndex) => {
        const width = G.left + system.bars.length * G.barW + 10;
        const inThisSystem =
          activeBar >= system.offset && activeBar < system.offset + system.bars.length;
        const playheadX =
          G.left + (activeBar - system.offset) * G.barW + (beatInBar / beatsPerBar) * G.barW;

        return (
          <svg
            key={system.offset}
            ref={(el) => {
              systemRefs.current[systemIndex] = el;
            }}
            viewBox={`0 0 ${width} ${systemH}`}
            width="100%"
            role="img"
            aria-label={`Bars ${system.offset + 1} to ${system.offset + system.bars.length}`}
          >
            {Array.from({ length: STRINGS }, (_, s) => (
              <line
                key={s}
                x1={G.left}
                y1={G.top + s * G.gap}
                x2={G.left + system.bars.length * G.barW}
                y2={G.top + s * G.gap}
                stroke="var(--color-line)"
                strokeWidth={s === 5 ? 1.3 : 0.9}
              />
            ))}

            {ROW_LABELS.map((label, s) => (
              <text
                key={label}
                x={G.left - 7}
                y={G.top + s * G.gap + 3.5}
                textAnchor="end"
                fontSize={G.fret * 0.85}
                fill="var(--color-dim)"
                fontFamily="var(--font-mono)"
              >
                {label}
              </text>
            ))}

            {inThisSystem && (
              <line
                x1={playheadX}
                y1={G.top - 8}
                x2={playheadX}
                y2={G.top + staffH + 8}
                stroke="var(--color-amber)"
                strokeWidth={2}
              />
            )}

            {system.bars.map((bar, i) => {
              const x = G.left + i * G.barW;
              const index = system.offset + i;
              const isActive = index === activeBar;

              return (
                <g key={index}>
                  {isActive && (
                    <rect
                      x={x}
                      y={G.top - 8}
                      width={G.barW}
                      height={staffH + 16}
                      fill="var(--color-amber)"
                      opacity={0.07}
                    />
                  )}

                  <line
                    x1={x}
                    y1={G.top}
                    x2={x}
                    y2={G.top + staffH}
                    stroke="var(--color-line)"
                    strokeWidth={1}
                  />

                  <text
                    x={x + 3}
                    y={G.top - 13}
                    fontSize={G.fret * 0.8}
                    fill="var(--color-dim)"
                    fontFamily="var(--font-mono)"
                  >
                    {index + 1}
                  </text>

                  {bar.chord && (
                    <text
                      x={x + 18}
                      y={G.top - 12}
                      fontSize={G.chord}
                      fill={isActive ? "var(--color-amber)" : "var(--color-text)"}
                      fontFamily="var(--font-display)"
                    >
                      {bar.chord}
                    </text>
                  )}

                  {bar.direction && (
                    <text
                      x={x + 4}
                      y={G.top + staffH + 17}
                      fontSize={G.fret * 0.8}
                      fill="var(--color-dim)"
                      fontFamily="var(--font-sans)"
                    >
                      {bar.direction}
                    </text>
                  )}

                  {/* rhythm slashes when there are no written notes */}
                  {!bar.notes &&
                    Array.from({ length: beatsPerBar }, (_, b) => {
                      const bx = x + (b + 0.5) * (G.barW / beatsPerBar);
                      const mid = G.top + staffH / 2;
                      const lit = isActive && Math.floor(beatInBar) === b;
                      return (
                        <line
                          key={b}
                          x1={bx - 5}
                          y1={mid + 7}
                          x2={bx + 5}
                          y2={mid - 7}
                          stroke={lit ? "var(--color-amber)" : "var(--color-muted)"}
                          strokeWidth={lit ? 2.6 : 1.6}
                        />
                      );
                    })}

                  {/* written fret numbers */}
                  {bar.notes?.map((note, n) => {
                    const bx = x + (note.beat + 0.5) * (G.barW / beatsPerBar);
                    const by = G.top + note.string * G.gap;
                    const lit =
                      isActive && Math.floor(beatInBar) === Math.floor(note.beat);
                    return (
                      <g key={n}>
                        <circle cx={bx} cy={by} r={G.dot} fill="var(--color-ink)" />
                        <text
                          x={bx}
                          y={by + G.fret * 0.34}
                          textAnchor="middle"
                          fontSize={G.fret}
                          fontWeight={lit ? 700 : 500}
                          fill={lit ? "var(--color-amber)" : "var(--color-text)"}
                          fontFamily="var(--font-mono)"
                        >
                          {note.fret}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}

            <line
              x1={G.left + system.bars.length * G.barW}
              y1={G.top}
              x2={G.left + system.bars.length * G.barW}
              y2={G.top + staffH}
              stroke="var(--color-line)"
              strokeWidth={2.5}
            />
          </svg>
        );
      })}
    </div>
  );

  if (stage) {
    return (
      <>
        <div className="space-y-4 pb-40">
          {strum && (
            <p className="font-mono text-[12px] text-muted">{strum}</p>
          )}
          {sheet}
        </div>
        {/* transport pinned to the bottom, so it's reachable mid-song */}
        <div
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-ink/95 backdrop-blur"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="mx-auto w-full max-w-5xl space-y-3 px-4 py-3 sm:px-6">
            {shapes}
            {transport}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="legend">
          {score.title ?? "Rhythm chart"}
          {capo !== undefined ? ` · capo ${capo}` : ""}
        </p>
        {strum && <p className="font-mono text-[11.5px] text-muted">{strum}</p>}
      </div>
      {sheet}
      {shapes}
      {transport}
    </div>
  );
}
