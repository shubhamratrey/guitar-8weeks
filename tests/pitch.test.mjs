import assert from "node:assert/strict";
import test from "node:test";
import { describePitch, detectPitch, median, OPEN_STRINGS } from "../src/lib/pitch.ts";

const RATE = 44100;
const N = 8192;

/**
 * A plucked string: fundamental plus decaying harmonics, with noise.
 * `weakFundamental` models a bass string, where the fundamental is quieter than
 * the second harmonic — the case that makes naive autocorrelation read an
 * octave low.
 */
function pluck(hz, { weakFundamental = false, noise = 0.004, phase = 0 } = {}) {
  const buffer = new Float32Array(N);
  const harmonics = [weakFundamental ? 0.35 : 1, 0.62, 0.4, 0.26, 0.17, 0.1, 0.07];
  for (let i = 0; i < N; i += 1) {
    const t = (i + phase) / RATE;
    let value = 0;
    for (let h = 0; h < harmonics.length; h += 1) {
      value += harmonics[h] * Math.sin(2 * Math.PI * hz * (h + 1) * t);
    }
    buffer[i] = value * 0.22 + (Math.random() * 2 - 1) * noise;
  }
  return buffer;
}

const centsBetween = (a, b) => 1200 * Math.log2(a / b);

test("detects every open string to within 5 cents", () => {
  for (const string of OPEN_STRINGS) {
    const found = detectPitch(
      pluck(string.hz, { weakFundamental: string.hz < 150 }),
      RATE,
    );
    assert.ok(found, `no detection for ${string.label}`);
    const error = Math.abs(centsBetween(found.hz, string.hz));
    assert.ok(error < 5, `${string.label} off by ${error.toFixed(2)} cents`);
  }
});

test("reads a steady note without wandering", () => {
  // Different phases stand in for successive analysis windows.
  const readings = Array.from({ length: 12 }, (_, k) =>
    detectPitch(pluck(110, { weakFundamental: true, phase: k * 137 }), RATE),
  ).filter(Boolean);

  assert.equal(readings.length, 12);
  const errors = readings.map((r) => centsBetween(r.hz, 110));
  const jitter = Math.max(...errors) - Math.min(...errors);
  assert.ok(jitter < 5, `reading wandered by ${jitter.toFixed(2)} cents`);
});

test("does not fall an octave on a weak fundamental", () => {
  for (const hz of [82.41, 110, 146.83]) {
    const found = detectPitch(pluck(hz, { weakFundamental: true }), RATE);
    assert.ok(found);
    const ratio = found.hz / hz;
    assert.ok(
      ratio > 0.97 && ratio < 1.03,
      `${hz}Hz read as ${found.hz.toFixed(2)}Hz (ratio ${ratio.toFixed(3)})`,
    );
  }
});

test("tracks how far out of tune a string is", () => {
  for (const offset of [-40, -30, -12, -5, 5, 12, 30, 40]) {
    const hz = 110 * 2 ** (offset / 1200);
    const found = detectPitch(pluck(hz, { weakFundamental: true }), RATE);
    assert.ok(found);
    const { cents } = describePitch(found.hz);
    assert.ok(
      Math.abs(cents - offset) <= 3,
      `${offset} cents out read as ${cents}`,
    );
  }
});

test("stays silent on near-silence rather than inventing a note", () => {
  const quiet = new Float32Array(N);
  for (let i = 0; i < N; i += 1) quiet[i] = (Math.random() * 2 - 1) * 0.0008;
  assert.equal(detectPitch(quiet, RATE), null);
});

test("names notes and picks the nearest string", () => {
  assert.equal(describePitch(110).note, "A2");
  assert.equal(describePitch(82.41).note, "E2");
  assert.equal(describePitch(329.63).note, "E4");
  // 105Hz is flat of A2 but still closest to it.
  assert.equal(OPEN_STRINGS[describePitch(105).nearestString].label, "A");
  assert.equal(OPEN_STRINGS[describePitch(200).nearestString].label, "G");
});

test("median ignores a rogue reading", () => {
  assert.equal(median([110, 110.2, 220, 110.1, 109.9]), 110.1);
  assert.equal(median([]), null);
});
