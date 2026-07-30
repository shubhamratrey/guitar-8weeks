"use client";

import { getAudioContext } from "./audio";
import { getChord } from "./chords";

/** Open string pitches in standard tuning, high e → low E. */
const OPEN_HZ = [329.63, 246.94, 196.0, 146.83, 110.0, 82.41];

export const noteHz = (stringIndex: number, fret: number) =>
  OPEN_HZ[stringIndex] * 2 ** (fret / 12);

const buffers = new Map<string, AudioBuffer>();

/**
 * Karplus-Strong: excite a delay line the length of one wave period with a
 * noise burst, then feed it back through a two-sample average. It's the
 * cheapest thing that genuinely sounds like a plucked string rather than a
 * synth beep, and it's all generated here — no samples to ship.
 */
function pluckBuffer(ctx: AudioContext, hz: number, seconds: number): AudioBuffer {
  const key = `${hz.toFixed(1)}:${seconds}`;
  const cached = buffers.get(key);
  if (cached) return cached;

  const rate = ctx.sampleRate;
  const length = Math.floor(rate * seconds);
  const buffer = ctx.createBuffer(1, length, rate);
  const y = buffer.getChannelData(0);
  const period = Math.max(2, Math.round(rate / hz));

  // the pick: a short noise burst, smoothed so it isn't fizzy
  for (let i = 0; i < period; i++) y[i] = Math.random() * 2 - 1;
  for (let i = 1; i < period; i++) y[i] = (y[i] + y[i - 1]) * 0.5;

  // the string: feedback with a gentle lowpass, which is what makes it decay
  const decay = 0.9965;
  for (let i = period; i < length; i++) {
    y[i] = decay * 0.5 * (y[i - period] + y[i - period + 1]);
  }

  // overall shape, so notes fade instead of stopping dead
  for (let i = 0; i < length; i++) {
    y[i] *= (1 - i / length) ** 1.4;
  }

  buffers.set(key, buffer);
  return buffer;
}

export const warmUpSynth = (): Promise<AudioContext> => getAudioContext();

/** One note. `when` is seconds from now. */
export function pluck(
  ctx: AudioContext,
  stringIndex: number,
  fret: number,
  when = 0,
  gain = 0.42,
): void {
  if (stringIndex < 0 || stringIndex > 5 || fret < 0) return;

  const source = ctx.createBufferSource();
  source.buffer = pluckBuffer(ctx, noteHz(stringIndex, fret), 2.4);

  // roll off the top so it reads as a warm neck pickup rather than a buzz
  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 3600;
  tone.Q.value = 0.4;

  const level = ctx.createGain();
  level.gain.value = gain;

  source.connect(tone).connect(level).connect(ctx.destination);
  source.start(ctx.currentTime + when);
}

let noiseBuffer: AudioBuffer | null = null;

/**
 * The dead strum: fretting hand relaxed so the strings are touched but not
 * pressed, giving a percussive "chk" with no pitch. Short filtered noise is a
 * near-perfect stand-in.
 */
export function deadStrum(ctx: AudioContext, when = 0, gain = 0.3): void {
  if (!noiseBuffer) {
    const length = Math.floor(ctx.sampleRate * 0.14);
    noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      const t = i / length;
      data[i] = (Math.random() * 2 - 1) * (1 - t) ** 3;
    }
  }

  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;

  // band-limited so it reads as muted strings rather than a hiss
  const body = ctx.createBiquadFilter();
  body.type = "bandpass";
  body.frequency.value = 1500;
  body.Q.value = 1.1;

  const level = ctx.createGain();
  level.gain.value = gain;

  source.connect(body).connect(level).connect(ctx.destination);
  source.start(ctx.currentTime + when);
}

export type StrokeDirection = "down" | "up";

/**
 * One stroke of a chord. The three sound genuinely different on a guitar, so
 * they're modelled differently here:
 *  - down: low string to high, the whole chord, full volume
 *  - up: high string to low, only the top strings, quieter — an upstroke rarely
 *    catches the bass strings
 *  - muted: no pitch at all, just the percussive click
 */
export function strum(
  ctx: AudioContext,
  chordId: string,
  {
    capo = 0,
    direction = "down" as StrokeDirection,
    muted = false,
    when = 0,
    gain = 0.26,
  } = {},
): void {
  if (muted) {
    deadStrum(ctx, when, gain * 1.1);
    return;
  }

  const chord = getChord(chordId);
  if (!chord) return;

  const up = direction === "up";

  let notes = chord.frets
    .map((fret, i) => ({ stringIndex: 5 - i, fret: fret < 0 ? -1 : fret + capo }))
    .filter((note) => note.fret >= 0);

  // An upstroke starts at the thin strings and usually doesn't reach the bass.
  if (up) notes = notes.filter((note) => note.stringIndex <= 3);

  notes.sort((a, b) => (up ? a.stringIndex - b.stringIndex : b.stringIndex - a.stringIndex));

  const spread = up ? 0.009 : 0.013;
  const level = up ? gain * 0.72 : gain;

  notes.forEach((note, i) => {
    pluck(ctx, note.stringIndex, note.fret, when + i * spread, level);
  });
}

/** Chord tones one at a time, for picked rather than strummed parts. */
export function arpeggiate(
  ctx: AudioContext,
  chordId: string,
  { capo = 0, step = 0, when = 0, gain = 0.34 } = {},
): void {
  const chord = getChord(chordId);
  if (!chord) return;

  const notes = chord.frets
    .map((fret, i) => ({ stringIndex: 5 - i, fret: fret < 0 ? -1 : fret + capo }))
    .filter((note) => note.fret >= 0)
    .sort((a, b) => b.stringIndex - a.stringIndex);

  if (!notes.length) return;
  const note = notes[step % notes.length];
  pluck(ctx, note.stringIndex, note.fret, when, gain);
}
