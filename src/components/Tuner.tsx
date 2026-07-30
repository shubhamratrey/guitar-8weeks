"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { describePitch, detectPitch, OPEN_STRINGS, steadyHz, type Reading } from "@/lib/pitch";

type State = "idle" | "asking" | "listening" | "denied" | "unsupported";

const IN_TUNE_CENTS = 5;

/** Chromatic tuner off the microphone. */
export function Tuner() {
  const [state, setState] = useState<State>("idle");
  const [reading, setReading] = useState<Reading | null>(null);

  const ctxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  // Explicit ArrayBuffer: getFloatTimeDomainData won't accept the
  // SharedArrayBuffer-capable default.
  const bufferRef = useRef<Float32Array<ArrayBuffer> | null>(null);
  const historyRef = useRef<number[]>([]);
  const rafRef = useRef(0);
  const quietRef = useRef(0);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    void ctxRef.current?.close();
    ctxRef.current = null;
    analyserRef.current = null;
    historyRef.current = [];
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
          // All of these would fight a tuner: they reshape the very signal
          // we're trying to measure.
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      streamRef.current = stream;

      const ctx = new AudioContext();
      ctxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 4096;
      source.connect(analyser);
      analyserRef.current = analyser;
      bufferRef.current = new Float32Array(analyser.fftSize);

      setState("listening");

      const tick = () => {
        const node = analyserRef.current;
        const buffer = bufferRef.current;
        if (!node || !buffer) return;

        node.getFloatTimeDomainData(buffer);
        const hz = detectPitch(buffer, ctx.sampleRate);

        if (hz) {
          quietRef.current = 0;
          historyRef.current.push(hz);
          if (historyRef.current.length > 8) historyRef.current.shift();
          const steady = steadyHz(historyRef.current);
          if (steady) setReading(describePitch(steady));
        } else {
          // Hold the last reading briefly so it doesn't flicker as a note decays.
          quietRef.current += 1;
          if (quietRef.current > 45) {
            historyRef.current = [];
            setReading(null);
          }
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    } catch {
      setState("denied");
    }
  }, []);

  const cents = reading?.cents ?? 0;
  const inTune = reading !== null && Math.abs(cents) <= IN_TUNE_CENTS;
  // -50..+50 cents mapped across the dial.
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
            state === "listening"
              ? "rounded-md border border-line text-muted"
              : "btn-brand"
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
          This browser won&apos;t give a page microphone access. The reference tones on the
          Today screen still work for tuning by ear.
        </p>
      )}

      {state === "listening" && (
        <>
          {/* the dial */}
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
                className="absolute inset-y-2 w-[3px] rounded-full transition-[left] duration-75"
                style={{
                  left: `calc(${50 + needle}% - 1.5px)`,
                  background: inTune ? "var(--color-good)" : "var(--color-amber)",
                  boxShadow: `0 0 10px 1px ${inTune ? "var(--color-good)" : "var(--color-amber)"}`,
                }}
                aria-hidden
              />
            )}

            <div className="absolute inset-x-0 bottom-2 flex justify-between px-3 text-[10px] text-dim">
              <span>flat ♭</span>
              <span>{reading ? `${cents > 0 ? "+" : ""}${cents} cents` : "listening…"}</span>
              <span>♯ sharp</span>
            </div>
          </div>

          {/* what it heard */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="legend">Hearing</p>
              <p
                className="display text-[38px] leading-none"
                style={{ color: inTune ? "var(--color-good)" : "var(--color-text)" }}
              >
                {reading ? reading.note : "—"}
              </p>
            </div>
            {reading && (
              <p className="font-mono text-[12px] text-dim">{reading.hz.toFixed(1)} Hz</p>
            )}
          </div>

          {/* which string it's closest to */}
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
            Tuning up to the note holds better than tuning down to it — if you&apos;re
            sharp, drop below and come back up.
          </p>
        </>
      )}
    </section>
  );
}
