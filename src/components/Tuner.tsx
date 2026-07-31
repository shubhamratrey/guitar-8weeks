"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { describePitch, detectPitch, median, OPEN_STRINGS, type Reading } from "@/lib/pitch";

type State = "idle" | "asking" | "listening" | "denied" | "unsupported";

const IN_TUNE_CENTS = 5;
/** 20 readings a second. Faster just re-analyses overlapping audio and jitters. */
const ANALYSE_MS = 50;
const CONFIDENCE_FLOOR = 0.55;
/** Readings kept for the median — a quarter-second of history. */
const WINDOW = 5;
/** Needle smoothing. Lower is calmer but lags further behind your hand. */
const SMOOTHING = 0.3;
/** Consecutive agreeing readings before the note name is allowed to change. */
const NOTE_HOLD = 3;

export function Tuner() {
  const [state, setState] = useState<State>("idle");
  const [reading, setReading] = useState<Reading | null>(null);

  const ctxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  // Explicit ArrayBuffer: getFloatTimeDomainData won't take the
  // SharedArrayBuffer-capable default type.
  const bufferRef = useRef<Float32Array<ArrayBuffer> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const historyRef = useRef<number[]>([]);
  const smoothCentsRef = useRef<number | null>(null);
  const noteRef = useRef<string | null>(null);
  const candidateRef = useRef<{ note: string; count: number } | null>(null);
  const quietRef = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    void ctxRef.current?.close();
    ctxRef.current = null;
    analyserRef.current = null;
    historyRef.current = [];
    smoothCentsRef.current = null;
    noteRef.current = null;
    candidateRef.current = null;
    setReading(null);
    setState("idle");
  }, []);

  useEffect(() => stop, [stop]);

  const listen = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setState("unsupported");
      return;
    }

    setState("asking");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          // Each of these reshapes the very signal being measured.
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      streamRef.current = stream;

      const ctx = new AudioContext();
      ctxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      // ~186ms at 44.1kHz: enough cycles of the low E to lock onto.
      analyser.fftSize = 8192;
      ctx.createMediaStreamSource(stream).connect(analyser);
      analyserRef.current = analyser;
      bufferRef.current = new Float32Array(analyser.fftSize);

      setState("listening");

      timerRef.current = setInterval(() => {
        const node = analyserRef.current;
        const buffer = bufferRef.current;
        if (!node || !buffer) return;

        node.getFloatTimeDomainData(buffer);
        const found = detectPitch(buffer, ctx.sampleRate);

        if (!found || found.confidence < CONFIDENCE_FLOOR) {
          quietRef.current += 1;
          // Hold the last reading for about a second so it doesn't blank out
          // between plucks or as a note decays.
          if (quietRef.current > 20) {
            historyRef.current = [];
            smoothCentsRef.current = null;
            noteRef.current = null;
            candidateRef.current = null;
            setReading(null);
          }
          return;
        }

        quietRef.current = 0;
        historyRef.current.push(found.hz);
        if (historyRef.current.length > WINDOW) historyRef.current.shift();

        const steady = median(historyRef.current);
        if (steady === null) return;

        const next = describePitch(steady);

        /*
         * Note-name hysteresis. Right between two notes the raw reading flips
         * back and forth; requiring agreement before switching stops the big
         * letter flickering while you turn the peg.
         */
        if (noteRef.current === null) {
          noteRef.current = next.note;
          candidateRef.current = null;
        } else if (next.note !== noteRef.current) {
          const candidate = candidateRef.current;
          if (candidate?.note === next.note) {
            candidate.count += 1;
            if (candidate.count >= NOTE_HOLD) {
              noteRef.current = next.note;
              candidateRef.current = null;
              smoothCentsRef.current = next.cents;
            }
          } else {
            candidateRef.current = { note: next.note, count: 1 };
          }
        } else {
          candidateRef.current = null;
        }

        // Exponential smoothing on the needle only; the numbers stay honest.
        const previous = smoothCentsRef.current;
        const smoothed =
          previous === null ? next.cents : previous + (next.cents - previous) * SMOOTHING;
        smoothCentsRef.current = smoothed;

        setReading({
          hz: steady,
          note: noteRef.current ?? next.note,
          cents: Math.round(smoothed),
          nearestString: next.nearestString,
        });
      }, ANALYSE_MS);
    } catch {
      setState("denied");
    }
  }, []);

  const cents = reading?.cents ?? 0;
  const inTune = reading !== null && Math.abs(cents) <= IN_TUNE_CENTS;
  const needle = Math.max(-50, Math.min(50, cents));

  return (
    <section className="panel space-y-4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="legend">Tuner</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
            Play one string at a time. Green means it&apos;s right; the needle shows which
            way to turn the peg.
          </p>
        </div>
        <button
          onClick={() => (state === "listening" ? stop() : listen())}
          className={`shrink-0 px-3.5 py-2.5 text-[12.5px] font-semibold ${
            state === "listening" ? "rounded-md border border-line text-muted" : "btn-brand"
          }`}
        >
          {state === "listening" ? "■ Stop" : state === "asking" ? "…" : "Turn on mic"}
        </button>
      </div>

      {state === "denied" && (
        <p className="text-[12.5px] leading-relaxed text-heat">
          Microphone access was blocked. Allow it for this site in your browser settings,
          then try again.
        </p>
      )}
      {state === "unsupported" && (
        <p className="text-[12.5px] leading-relaxed text-heat">
          This browser won&apos;t give a page microphone access. The reference tones in the
          metronome panel still work for tuning by ear.
        </p>
      )}

      {state === "listening" && (
        <>
          <div className="relative h-24 overflow-hidden rounded-md border border-line-soft bg-ink/60">
            <div className="absolute inset-y-0 left-1/2 w-px bg-line" aria-hidden />
            {[-50, -25, 25, 50].map((mark) => (
              <div
                key={mark}
                className="absolute top-2 h-2 w-px bg-line-soft"
                style={{ left: `${50 + mark}%` }}
                aria-hidden
              />
            ))}

            {reading && (
              <div
                className="absolute inset-y-2 w-[3px] rounded-full transition-[left,background] duration-150 ease-out"
                style={{
                  left: `calc(${50 + needle}% - 1.5px)`,
                  background: inTune ? "var(--color-good)" : "var(--color-amber)",
                }}
                aria-hidden
              />
            )}

            <div className="absolute inset-x-0 bottom-2 flex justify-between px-3 text-[10px] text-dim">
              <span>flat ♭</span>
              <span>
                {reading ? `${cents > 0 ? "+" : ""}${cents} cents` : "play a string…"}
              </span>
              <span>♯ sharp</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="legend">Hearing</p>
              <p
                className="display text-[38px] leading-none transition-colors"
                style={{ color: inTune ? "var(--color-good)" : "var(--color-text)" }}
              >
                {reading ? reading.note : "—"}
              </p>
            </div>
            {reading && (
              <p className="font-mono text-[12px] text-dim">{reading.hz.toFixed(1)} Hz</p>
            )}
          </div>

          <div className="flex gap-1.5">
            {OPEN_STRINGS.map((string, i) => {
              const active = reading?.nearestString === i;
              return (
                <div
                  key={string.label}
                  className={`flex-1 rounded-md border py-2 text-center font-mono text-[13px] transition-colors ${
                    active && inTune
                      ? "border-good bg-good/[0.10] text-good"
                      : active
                        ? "border-amber bg-amber/[0.08] text-amber"
                        : "border-line-soft text-dim"
                  }`}
                >
                  {string.label}
                </div>
              );
            })}
          </div>
          <p className="text-[11.5px] leading-relaxed text-dim">
            Pluck once and let it ring rather than playing repeatedly — the reading settles
            after about half a second. Tuning up to a note holds better than tuning down to
            it.
          </p>
        </>
      )}
    </section>
  );
}
