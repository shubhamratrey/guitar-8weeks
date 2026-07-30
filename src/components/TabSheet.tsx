"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChordDiagram } from "./ChordDiagram";
import { clickNow } from "@/lib/audio";
import { getChord } from "@/lib/chords";
// aliased: the component already has a `strum` prop for the pattern text
import { arpeggiate, playNote, strum as strumChord, warmUpSynth } from "@/lib/synth";
import { parseStrum, type Stroke } from "@/lib/strum";
import type { ScoreNote } from "@/lib/score";
import type { Score } from "@/lib/score";

const BARS_PER_SYSTEM = 4;
const STRINGS = 6;

/* geometry in SVG units. Stage mode is the same drawing, scaled up. */
const INLINE = { barW: 150, left: 22, top: 34, gap: 13, chord: 13, fret: 10.5, dot: 7 };
const STAGE = { barW: 190, left: 28, top: 44, gap: 19, chord: 17, fret: 13.5, dot: 9.5 };

const ROW_LABELS = ["e", "B", "G", "D", "A", "E"];

/**
 * Trim text to what fits inside one bar. SVG text doesn't wrap or clip, so a
 * long direction would otherwise print straight over the next bar's.
 */
function fitToBar(text: string, barWidth: number, fontSize: number): string {
  const budget = Math.floor((barWidth - 8) / (fontSize * 0.55));
  if (text.length <= budget) return text;
  return `${text.slice(0, Math.max(1, budget - 1)).trimEnd()}…`;
}

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
  /** Rhythm marks live under the staff so they don't collide with the strings. */
  const rhythmY = G.top + staffH + 16;
  const hasLyrics = bars.some((bar) => bar.lyric);
  const systemH = rhythmY + (hasLyrics ? 46 : 26);

  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(initialBpm);
  const [loop, setLoop] = useState(true);
  const [withClick, setWithClick] = useState(false);
  const [withGuitar, setWithGuitar] = useState(true);
  /** Write chord voicings on the staff as fret numbers, not just as slashes. */
  const [showFrets, setShowFrets] = useState(true);
  /** Beats elapsed, fractional. Drives everything visual. */
  const [beats, setBeats] = useState<number | null>(null);

  const rafRef = useRef(0);
  const startedAtRef = useRef(0);
  const lastBeatRef = useRef(-1);
  const lastSystemRef = useRef(-1);
  const systemRefs = useRef<(SVGSVGElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<() => void>(() => {});
  const liveRef = useRef({ bpm, loop, withClick, withGuitar });
  const audioRef = useRef<AudioContext | null>(null);
  const eventPtrRef = useRef(0);

  useEffect(() => {
    liveRef.current = { bpm, loop, withClick, withGuitar };
  }, [bpm, loop, withClick, withGuitar]);

  const total = bars.length * beatsPerBar;

  /**
   * Everything to be sounded, flattened onto one beat timeline. Written notes
   * fire at their exact beat; a rhythm bar strums its chord once per beat,
   * alternating direction so it moves like a hand rather than a machine.
   */
  const timeline = useMemo(() => {
    const events: {
      at: number;
      notes: ScoreNote[];
      chord?: string;
      stroke?: Stroke;
      /** Which chord tone to pick, for arpeggiated parts. */
      step?: number;
    }[] = [];

    const plan = parseStrum(strum);

    bars.forEach((bar, index) => {
      const base = index * beatsPerBar;

      if (bar.notes?.length) {
        const byBeat = new Map<number, ScoreNote[]>();
        for (const note of bar.notes) {
          const at = byBeat.get(note.beat) ?? [];
          at.push(note);
          byBeat.set(note.beat, at);
        }
        for (const [beat, notes] of byBeat) events.push({ at: base + beat, notes });
        return;
      }

      if (!bar.chord) return;

      if (plan?.kind === "arpeggio") {
        for (let beat = 0; beat < beatsPerBar; beat++) {
          events.push({ at: base + beat, notes: [], chord: bar.chord, step: beat });
        }
        return;
      }

      if (plan?.kind === "strum") {
        // Spread the hand's motion evenly across the bar.
        const slot = beatsPerBar / plan.strokes.length;
        plan.strokes.forEach((stroke, i) => {
          if (stroke === "-") return;
          events.push({ at: base + i * slot, notes: [], chord: bar.chord, stroke });
        });
        return;
      }

      // No recognised pattern: a plain downstroke on each beat.
      for (let beat = 0; beat < beatsPerBar; beat++) {
        events.push({ at: base + beat, notes: [], chord: bar.chord, stroke: "D" });
      }
    });

    return events.sort((a, b) => a.at - b.at);
  }, [bars, beatsPerBar, strum]);

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
      eventPtrRef.current = 0;
      elapsed = 0;
    }

    setBeats(elapsed);

    const whole = Math.floor(elapsed);
    if (whole !== lastBeatRef.current) {
      lastBeatRef.current = whole;
      if (liveRef.current.withClick) void clickNow(whole % beatsPerBar === 0);
    }

    // Sound everything the playhead has passed. A pointer rather than a search,
    // so sub-beat notes land accurately without re-scanning each frame.
    const ctx = audioRef.current;
    if (ctx && liveRef.current.withGuitar) {
      while (
        eventPtrRef.current < timeline.length &&
        timeline[eventPtrRef.current].at <= elapsed
      ) {
        const event = timeline[eventPtrRef.current];
        if (event.chord && event.step !== undefined) {
          arpeggiate(ctx, event.chord, { capo: capo ?? 0, step: event.step });
        } else if (event.chord) {
          strumChord(ctx, event.chord, {
            capo: capo ?? 0,
            direction: event.stroke === "U" ? "up" : "down",
            muted: event.stroke === "X",
          });
        } else {
          for (const note of event.notes) {
            playNote(ctx, note.string, note.fret, {
              // Hammer-ons and pull-offs come from the fretting hand, not the pick.
              soft: note.art === "h" || note.art === "p",
              toFret: note.art === "s" || note.art === "b" ? note.to : undefined,
              glide: note.art === "b" ? 0.12 : 0.18,
              vibrato: note.art === "v",
            });
          }
        }
        eventPtrRef.current += 1;
      }
    } else if (ctx) {
      // Keep the pointer level with the playhead while muted, so unmuting
      // mid-song doesn't dump every skipped note at once.
      while (
        eventPtrRef.current < timeline.length &&
        timeline[eventPtrRef.current].at <= elapsed
      ) {
        eventPtrRef.current += 1;
      }
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
  }, [total, beatsPerBar, stop, timeline, capo]);

  useEffect(() => {
    frameRef.current = frame;
  }, [frame]);

  const start = useCallback(() => {
    if (!total) return;
    // Resolve the audio context before the first frame so note one isn't lost
    // to the promise, and so iOS unlocks audio on this tap.
    void warmUpSynth().then((ctx) => {
      audioRef.current = ctx;
    });
    startedAtRef.current = performance.now();
    lastBeatRef.current = -1;
    lastSystemRef.current = -1;
    eventPtrRef.current = 0;
    setPlaying(true);
    rafRef.current = requestAnimationFrame(() => frameRef.current());
  }, [total]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  /**
   * The transport is fixed over the bottom of the viewport, so the sheet needs
   * that much clear space beneath it — and the scrollport needs matching
   * scroll-padding, or scrollIntoView parks the last system underneath it.
   * Measured rather than hardcoded because the footer wraps taller on a phone.
   * Written straight to the DOM to avoid a render pass on every resize.
   */
  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    if (!footer || !content) return;

    const scroller = content.closest<HTMLElement>("[data-stage-scroll]");

    const apply = () => {
      const room = `${footer.offsetHeight + 28}px`;
      content.style.paddingBottom = room;
      if (scroller) scroller.style.scrollPaddingBottom = room;
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(footer);
    return () => {
      observer.disconnect();
      if (scroller) scroller.style.scrollPaddingBottom = "";
    };
  }, [stage]);

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
          checked={withGuitar}
          onChange={(e) => setWithGuitar(e.target.checked)}
          className="accent-amber"
        />
        guitar
      </label>

      {bars.some((bar) => !bar.notes && bar.chord) && (
        <label className="flex items-center gap-1.5 text-[11.5px] text-dim">
          <input
            type="checkbox"
            checked={showFrets}
            onChange={(e) => setShowFrets(e.target.checked)}
            className="accent-amber"
          />
          fret numbers
        </label>
      )}

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
    <div className="flex items-start gap-6 rounded-md border border-line-soft bg-panel-2 p-4">
      {currentChord && (
        <div>
          <p className="legend mb-2">Playing</p>
          {getChord(currentChord) ? (
            <ChordDiagram id={currentChord} size={stage ? 150 : 120} />
          ) : (
            <p className="display text-[26px] text-text">{currentChord}</p>
          )}
        </div>
      )}
      {nextChord && (
        <div className="opacity-70">
          <p className="legend mb-2">Next</p>
          {getChord(nextChord) ? (
            <ChordDiagram id={nextChord} size={stage ? 120 : 100} showStringNames={false} />
          ) : (
            <p className="display text-[20px] text-text">{nextChord}</p>
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

              /*
               * Size the glyphs to the busiest spacing in this bar. Eighth notes
               * sit half as far apart as quarters, so a fixed radius overlaps.
               */
              const beatW = G.barW / beatsPerBar;
              const xOf = (beat: number) => x + (beat + 0.5) * beatW;
              const beats = [...new Set((bar.notes ?? []).map((n) => n.beat))].sort(
                (a, b) => a - b,
              );
              let tightest = beatW;
              for (let b = 1; b < beats.length; b += 1) {
                tightest = Math.min(tightest, (beats[b] - beats[b - 1]) * beatW);
              }
              const dotR = Math.max(5, Math.min(G.dot, tightest * 0.46));
              const noteFont = Math.max(7.5, Math.min(G.fret, dotR * 1.45));

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
                      y={rhythmY + 20}
                      fontSize={G.fret * 0.8}
                      fill="var(--color-dim)"
                      fontFamily="var(--font-sans)"
                    >
                      {/* Clipped to its own bar so a long note can't run into
                          the next bar's text. */}
                      {fitToBar(bar.direction, G.barW, G.fret * 0.8)}
                    </text>
                  )}

                  {/* words, under everything, so you can see where you are */}
                  {bar.lyric && (
                    <text
                      x={x + 4}
                      y={rhythmY + (bar.direction ? 38 : 22)}
                      fontSize={G.fret * 0.95}
                      fill={isActive ? "var(--color-amber)" : "var(--color-muted)"}
                      fontFamily="var(--font-sans)"
                      fontWeight={isActive ? 600 : 400}
                    >
                      {bar.lyric}
                    </text>
                  )}

                  {/* The chord written out on the staff, so a chart reads as tab
                      rather than as a box you have to look up. Frets are shifted
                      by the capo, which is where they actually sound. */}
                  {!bar.notes &&
                    showFrets &&
                    Array.from({ length: beatsPerBar }, (_, beatIndex) => {
                      const chord = getChord(bar.chord ?? "");
                      if (!chord) return null;
                      const bx = x + (beatIndex + 0.5) * (G.barW / beatsPerBar);
                      const lit = isActive && Math.floor(beatInBar) === beatIndex;
                      return chord.frets.map((fret, stringFromLowE) => {
                        if (fret < 0) return null;
                        const stringIndex = 5 - stringFromLowE;
                        const fy = G.top + stringIndex * G.gap;
                        return (
                          <g key={`v-${beatIndex}-${stringFromLowE}`}>
                            <circle cx={bx} cy={fy} r={G.dot} fill="var(--color-ink)" />
                            <text
                              x={bx}
                              y={fy + G.fret * 0.34}
                              textAnchor="middle"
                              fontSize={G.fret}
                              fontWeight={lit ? 700 : 500}
                              fill={lit ? "var(--color-amber)" : "var(--color-text)"}
                              fontFamily="var(--font-mono)"
                            >
                              {/* what actually sounds, capo included */}
                              {fret + (capo ?? 0)}
                            </text>
                          </g>
                        );
                      });
                    })}

                  {/* rhythm marks, in their own lane below the staff */}
                  {!bar.notes &&
                    Array.from({ length: beatsPerBar }, (_, b) => {
                      const bx = x + (b + 0.5) * (G.barW / beatsPerBar);
                      const lit = isActive && Math.floor(beatInBar) === b;
                      return (
                        <line
                          key={b}
                          x1={bx - 5}
                          y1={rhythmY + 6}
                          x2={bx + 5}
                          y2={rhythmY - 6}
                          stroke={lit ? "var(--color-amber)" : "var(--color-muted)"}
                          strokeWidth={lit ? 3 : 1.8}
                          strokeLinecap="round"
                        />
                      );
                    })}

                  {/* written fret numbers */}
                  {bar.notes?.map((note, n) => {
                    const bx = xOf(note.beat);
                    const by = G.top + note.string * G.gap;
                    const lit =
                      isActive && Math.floor(beatInBar) === Math.floor(note.beat);
                    return (
                      <g key={`n-${n}`}>
                        <circle cx={bx} cy={by} r={dotR} fill="var(--color-ink)" />
                        <text
                          x={bx}
                          y={by + noteFont * 0.34}
                          textAnchor="middle"
                          fontSize={noteFont}
                          fontWeight={lit ? 700 : 500}
                          fill={lit ? "var(--color-amber)" : "var(--color-text)"}
                          fontFamily="var(--font-mono)"
                        >
                          {note.fret}
                        </text>
                      </g>
                    );
                  })}

                  {/*
                   * Articulations sit above the staff, not beside the numbers —
                   * at eighth-note spacing there is no room beside them, and a
                   * slur arc is how printed tab shows a hammer-on anyway.
                   */}
                  {bar.notes?.map((note, n) => {
                    if (!note.art) return null;
                    const bx = xOf(note.beat);
                    const by = G.top + note.string * G.gap;
                    const lift = by - dotR - 3;

                    if (note.art === "h" || note.art === "p") {
                      const from = (bar.notes ?? [])
                        .filter((o) => o.string === note.string && o.beat < note.beat)
                        .sort((a, b) => b.beat - a.beat)[0];
                      if (!from) return null;
                      const fx = xOf(from.beat);
                      const mid = (fx + bx) / 2;
                      return (
                        <g key={`a-${n}`}>
                          <path
                            d={`M ${fx + dotR * 0.5} ${lift} Q ${mid} ${lift - 7} ${bx - dotR * 0.5} ${lift}`}
                            fill="none"
                            stroke="var(--color-amber)"
                            strokeWidth={1.2}
                          />
                          <text
                            x={mid}
                            y={lift - 8}
                            textAnchor="middle"
                            fontSize={noteFont * 0.75}
                            fill="var(--color-amber)"
                            fontFamily="var(--font-mono)"
                          >
                            {note.art}
                          </text>
                        </g>
                      );
                    }

                    // Slides and bends name their target, the way tab writes 7b9.
                    const label =
                      note.art === "v"
                        ? "~"
                        : `${note.art === "s" ? "/" : "b"}${note.to ?? ""}`;
                    return (
                      <text
                        key={`a-${n}`}
                        x={bx + dotR + 1}
                        y={by + noteFont * 0.34}
                        fontSize={noteFont * 0.8}
                        fill="var(--color-amber)"
                        fontFamily="var(--font-mono)"
                      >
                        {label}
                      </text>
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
        {/* padding-bottom is set from the footer's measured height */}
        <div ref={contentRef} className="space-y-4">
          {strum && <p className="font-mono text-[12px] text-muted">{strum}</p>}
          {sheet}
        </div>
        {/* transport pinned to the bottom, so it's reachable mid-song */}
        <div
          ref={footerRef}
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
