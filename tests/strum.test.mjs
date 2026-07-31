import assert from "node:assert/strict";
import test from "node:test";
import { parseStrum, STRUM } from "../src/lib/strum.ts";
// From pitch.ts, not synth.ts — the synth pulls in Web Audio, which Node has no
// business loading just to check a frequency.
import { noteHz } from "../src/lib/pitch.ts";

const strokes = (label) => {
  const plan = parseStrum(label);
  return plan?.kind === "strum" ? plan.strokes.join("") : plan?.kind ?? "none";
};

test("reads the stroke patterns", () => {
  assert.equal(strokes(STRUM.allPurpose), "D-DU-UDU");
  assert.equal(strokes(STRUM.simple), "D-D-D-D");
  assert.equal(strokes(STRUM.ballad), "D-DU-D-DU");
  assert.equal(strokes(STRUM.funk), "D-XDU-XU");
  assert.equal(strokes(STRUM.downstrokes), "DDDDDDDD");
  assert.equal(strokes(STRUM.sixteenths), "DUDUDUDUDUDUDUDU");
});

test("treats picking instructions as arpeggios", () => {
  assert.equal(strokes(STRUM.picked), "arpeggio");
  assert.equal(strokes("Fingerpicked, gently, in 3/4 feel"), "arpeggio");
  assert.equal(strokes("Arpeggio — pick the strings one at a time, in 6/8"), "arpeggio");
});

test("never mistakes prose for a pattern", () => {
  // Lowercase d, u and x are everywhere in ordinary English; reading them would
  // turn a sentence into a rhythm.
  for (const prose of [
    "Hard downstrokes with muted clicks",
    "Accent the upstrokes",
    "Open and ringing, with real silence between",
    "Shuffle — long-short, long-short",
    "Percussive — mix in dead strums",
    "Hard downstrokes, palm muted",
  ]) {
    assert.equal(strokes(prose), "none", `parsed prose: ${prose}`);
  }
});

test("finds a pattern embedded in a sentence", () => {
  assert.equal(strokes("D · D U · U D U with dead strums"), "D-DU-UDU");
});

test("open string frequencies are correct", () => {
  const cents = (a, b) => Math.abs(1200 * Math.log2(a / b));
  // string index 0 is the high e, 5 the low E
  assert.ok(cents(noteHz(5, 0), 82.41) < 1);
  assert.ok(cents(noteHz(4, 0), 110) < 1);
  assert.ok(cents(noteHz(3, 0), 146.83) < 1);
  assert.ok(cents(noteHz(2, 0), 196) < 1);
  assert.ok(cents(noteHz(1, 0), 246.94) < 1);
  assert.ok(cents(noteHz(0, 0), 329.63) < 1);
});

test("fretting a string raises it by the right interval", () => {
  const cents = (a, b) => Math.abs(1200 * Math.log2(a / b));
  // fret 5 on the low E is the open A
  assert.ok(cents(noteHz(5, 5), noteHz(4, 0)) < 1);
  // fret 5 on the B string is the open high e
  assert.ok(cents(noteHz(1, 5), noteHz(0, 0)) < 1);
  // twelve frets is exactly an octave
  assert.ok(cents(noteHz(2, 12), noteHz(2, 0) * 2) < 0.01);
});
