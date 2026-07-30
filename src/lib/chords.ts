import type { Chord } from "./types";

/**
 * Fret arrays run low E → high e. -1 means don't play that string.
 * Fingers: 1 = index, 2 = middle, 3 = ring, 4 = pinky.
 */
export const CHORDS: Chord[] = [
  /* ---- open chords ---- */
  {
    id: "Em",
    name: "E minor",
    frets: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
    baseFret: 1,
    tip: "Easiest chord on the guitar. Strum all six strings.",
  },
  {
    id: "Am",
    name: "A minor",
    frets: [-1, 0, 2, 2, 1, 0],
    fingers: [0, 0, 2, 3, 1, 0],
    baseFret: 1,
    tip: "Same shape as E major, moved one string up. Skip the low E.",
  },
  {
    id: "E",
    name: "E major",
    frets: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
    baseFret: 1,
    tip: "Em with one extra finger on the G string.",
  },
  {
    id: "A",
    name: "A major",
    frets: [-1, 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0],
    baseFret: 1,
    tip: "Three fingers in a row on the 2nd fret. Cramped at first — normal.",
  },
  {
    id: "D",
    name: "D major",
    frets: [-1, -1, 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2],
    baseFret: 1,
    tip: "Only four strings. Keep your thumb behind the neck.",
  },
  {
    id: "G",
    name: "G major",
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [3, 2, 0, 0, 0, 4],
    baseFret: 1,
    tip: "Use ring + middle + pinky. Feels wrong, pays off later.",
  },
  {
    id: "C",
    name: "C major",
    frets: [-1, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
    baseFret: 1,
    tip: "Curl your fingers so the open G and high e ring clean.",
  },
  {
    id: "Dm",
    name: "D minor",
    frets: [-1, -1, 0, 2, 3, 1],
    fingers: [0, 0, 0, 2, 3, 1],
    baseFret: 1,
  },
  {
    id: "Am7",
    name: "A minor 7",
    frets: [-1, 0, 2, 0, 1, 0],
    fingers: [0, 0, 2, 0, 1, 0],
    baseFret: 1,
    tip: "Am with one finger lifted. Use it when Am is tiring you out.",
  },
  {
    id: "Em7",
    name: "E minor 7",
    frets: [0, 2, 2, 0, 3, 0],
    fingers: [0, 1, 2, 0, 3, 0],
    baseFret: 1,
  },
  {
    id: "Cadd9",
    name: "C add 9",
    frets: [-1, 3, 2, 0, 3, 3],
    fingers: [0, 2, 1, 0, 3, 4],
    baseFret: 1,
    tip: "Swaps with G without moving your ring and pinky. Big time-saver.",
  },
  {
    id: "Fmaj7",
    name: "F major 7",
    frets: [-1, -1, 3, 2, 1, 0],
    fingers: [0, 0, 3, 2, 1, 0],
    baseFret: 1,
    tip: "Stand-in for full F while your barre is still developing.",
  },
  {
    id: "Dsus2",
    name: "D sus 2",
    frets: [-1, -1, 0, 2, 3, 0],
    fingers: [0, 0, 0, 1, 2, 0],
    baseFret: 1,
  },

  /* ---- barre chords ---- */
  {
    id: "F",
    name: "F major (barre)",
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    baseFret: 1,
    barre: [0, 5],
    tip: "Roll the index onto its bony edge. Press less than you think.",
  },
  {
    id: "Bm",
    name: "B minor (barre)",
    frets: [-1, 2, 4, 4, 3, 2],
    fingers: [0, 1, 3, 4, 2, 1],
    baseFret: 1,
    barre: [1, 5],
    tip: "Am shape with the index barring across fret 2.",
  },
  {
    id: "Bb",
    name: "B flat (barre)",
    frets: [-1, 1, 3, 3, 3, 1],
    fingers: [0, 1, 2, 3, 4, 1],
    baseFret: 1,
    barre: [1, 5],
  },

  /* ---- power chords ---- */
  {
    id: "E5",
    name: "E5 power",
    frets: [0, 2, 2, -1, -1, -1],
    fingers: [0, 1, 2, 0, 0, 0],
    baseFret: 1,
    tip: "Three strings only. Mute the rest with your palm.",
  },
  {
    id: "A5",
    name: "A5 power",
    frets: [-1, 0, 2, 2, -1, -1],
    fingers: [0, 0, 1, 2, 0, 0],
    baseFret: 1,
  },
  {
    id: "D5",
    name: "D5 power",
    frets: [-1, -1, 0, 2, 3, -1],
    fingers: [0, 0, 0, 1, 3, 0],
    baseFret: 1,
  },
  {
    id: "G5",
    name: "G5 power",
    frets: [3, 5, -1, -1, -1, -1],
    fingers: [1, 3, 0, 0, 0, 0],
    baseFret: 3,
    tip: "The movable shape. Slide it anywhere and it stays a power chord.",
  },
  {
    id: "C5",
    name: "C5 power",
    frets: [-1, 3, 5, -1, -1, -1],
    fingers: [0, 1, 3, 0, 0, 0],
    baseFret: 3,
  },
  {
    id: "F5",
    name: "F5 power",
    frets: [1, 3, -1, -1, -1, -1],
    fingers: [1, 3, 0, 0, 0, 0],
    baseFret: 1,
  },
  {
    id: "B5",
    name: "B5 power",
    frets: [-1, 2, 4, -1, -1, -1],
    fingers: [0, 1, 3, 0, 0, 0],
    baseFret: 2,
  },
];

const BY_ID = new Map(CHORDS.map((c) => [c.id, c]));

export const getChord = (id: string): Chord | undefined => BY_ID.get(id);

/** Minor pentatonic, position 1. Frets are relative to the root fret. */
export const PENTATONIC_BOX: { string: number; offsets: number[] }[] = [
  { string: 0, offsets: [0, 3] },
  { string: 1, offsets: [0, 2] },
  { string: 2, offsets: [0, 2] },
  { string: 3, offsets: [0, 2] },
  { string: 4, offsets: [0, 3] },
  { string: 5, offsets: [0, 3] },
];

export const STRING_LABELS = ["E", "A", "D", "G", "B", "e"];
