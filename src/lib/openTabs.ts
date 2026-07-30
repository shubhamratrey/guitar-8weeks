import type { Score } from "./score";
import type { Song } from "./songs";

/**
 * Songs and exercises we can ship complete, note for note: public-domain
 * melodies, traditional progressions, and drills written for this app.
 * Everything here renders as a full playable tab rather than a chord chart.
 */

const bar = (
  notes: [string: number, fret: number, beat: number][],
  extra: { chord?: string; direction?: string; lyric?: string } = {},
) => ({
  ...extra,
  notes: notes.map(([string, fret, beat]) => ({ string, fret, beat })),
});

/* string indices: 0 = high e, 1 = B, 2 = G, 3 = D, 4 = A, 5 = low E */

const ODE_TO_JOY: Score = {
  title: "Ode to Joy — Beethoven",
  beatsPerBar: 4,
  bars: [
    // all on the B string: C=1, D=3, E=5, F=6, G=8
    bar([[1, 5, 0], [1, 5, 1], [1, 6, 2], [1, 8, 3]], { direction: "first phrase" }),
    bar([[1, 8, 0], [1, 6, 1], [1, 5, 2], [1, 3, 3]]),
    bar([[1, 1, 0], [1, 1, 1], [1, 3, 2], [1, 5, 3]]),
    bar([[1, 5, 0], [1, 3, 2]]),
    bar([[1, 5, 0], [1, 5, 1], [1, 6, 2], [1, 8, 3]], { direction: "repeat, new ending" }),
    bar([[1, 8, 0], [1, 6, 1], [1, 5, 2], [1, 3, 3]]),
    bar([[1, 1, 0], [1, 1, 1], [1, 3, 2], [1, 5, 3]]),
    bar([[1, 3, 0], [1, 1, 2]], { direction: "resolve home" }),
  ],
};

const MARY_LAMB: Score = {
  title: "Mary Had a Little Lamb",
  beatsPerBar: 4,
  bars: [
    // B string: C=1, D=3, E=5
    bar([[1, 5, 0], [1, 3, 1], [1, 1, 2], [1, 3, 3]], { lyric: "Ma-ry had a" }),
    bar([[1, 5, 0], [1, 5, 1], [1, 5, 2]], { lyric: "lit-tle lamb" }),
    bar([[1, 3, 0], [1, 3, 1], [1, 3, 2]], { lyric: "lit-tle lamb" }),
    bar([[1, 5, 0], [1, 5, 1], [1, 5, 2]], { lyric: "lit-tle lamb" }),
    bar([[1, 5, 0], [1, 3, 1], [1, 1, 2], [1, 3, 3]], { lyric: "Ma-ry had a" }),
    bar([[1, 5, 0], [1, 5, 1], [1, 5, 2], [1, 5, 3]], { lyric: "lit-tle lamb, its" }),
    bar([[1, 3, 0], [1, 3, 1], [1, 5, 2], [1, 3, 3]], { lyric: "fleece was white as" }),
    bar([[1, 1, 0]], { direction: "let it ring", lyric: "snow" }),
  ],
};

/** In 3/4 so the 6/8 lilt lands right and the syllables sit on the beat. */
const ROW_YOUR_BOAT: Score = {
  title: "Row, Row, Row Your Boat",
  beatsPerBar: 3,
  bars: [
    // B string: C=1, D=3, E=5, F=6, G=8. High e fret 8 is the C an octave up.
    bar([[1, 1, 0], [1, 1, 1], [1, 1, 2]], { lyric: "Row, row, row" }),
    bar([[1, 3, 0], [1, 5, 1]], { lyric: "your boat" }),
    bar([[1, 5, 0], [1, 3, 1], [1, 5, 2]], { lyric: "gent-ly down" }),
    bar([[1, 6, 0], [1, 8, 1]], { lyric: "the stream" }),
    bar([[0, 8, 0], [0, 8, 1], [0, 8, 2]], { lyric: "Mer-ri-ly" }),
    bar([[1, 8, 0], [1, 8, 1], [1, 8, 2]], { lyric: "mer-ri-ly" }),
    bar([[1, 5, 0], [1, 5, 1], [1, 5, 2]], { lyric: "mer-ri-ly" }),
    bar([[1, 1, 0], [1, 1, 1], [1, 1, 2]], { lyric: "mer-ri-ly" }),
    bar([[1, 8, 0], [1, 6, 1], [1, 5, 2]], { lyric: "life is but" }),
    bar([[1, 3, 0], [1, 1, 1]], { direction: "let it ring", lyric: "a dream" }),
  ],
};

const FRERE_JACQUES: Score = {
  title: "Frère Jacques",
  beatsPerBar: 4,
  bars: [
    bar([[1, 1, 0], [1, 3, 1], [1, 5, 2], [1, 1, 3]], { lyric: "Frè-re Jac-ques" }),
    bar([[1, 1, 0], [1, 3, 1], [1, 5, 2], [1, 1, 3]], { lyric: "Frè-re Jac-ques" }),
    bar([[1, 5, 0], [1, 6, 1], [1, 8, 2]], { lyric: "dor-mez vous?" }),
    bar([[1, 5, 0], [1, 6, 1], [1, 8, 2]], { lyric: "dor-mez vous?" }),
    bar([[1, 8, 0], [1, 10, 0.5], [1, 8, 1], [1, 6, 1.5], [1, 5, 2], [1, 1, 3]], {
      lyric: "son-nez les ma-ti-nes",
    }),
    bar([[1, 8, 0], [1, 10, 0.5], [1, 8, 1], [1, 6, 1.5], [1, 5, 2], [1, 1, 3]], {
      lyric: "son-nez les ma-ti-nes",
    }),
    // do–sol–do: the low G sits on the open G string, below the B string's C.
    bar([[1, 1, 0], [2, 0, 1], [1, 1, 2]], { lyric: "ding ding dong" }),
    bar([[1, 1, 0], [2, 0, 1], [1, 1, 2]], { direction: "and round again", lyric: "ding ding dong" }),
  ],
};

/** The traditional 12-bar form, arranged here as a shuffle in A. */
const BLUES_SHUFFLE: Score = {
  title: "Blues Shuffle in A — full 12 bars",
  beatsPerBar: 4,
  bars: [
    ...Array.from({ length: 4 }, (_, i) =>
      bar(
        [[4, 0, 0], [3, 2, 0], [4, 0, 1], [3, 4, 1], [4, 0, 2], [3, 2, 2], [4, 0, 3], [3, 4, 3]],
        i === 0 ? { chord: "A5", direction: "shuffle — long, short" } : { chord: "A5" },
      ),
    ),
    ...Array.from({ length: 2 }, () =>
      bar(
        [[4, 5, 0], [3, 7, 0], [4, 5, 1], [3, 9, 1], [4, 5, 2], [3, 7, 2], [4, 5, 3], [3, 9, 3]],
        { chord: "D5" },
      ),
    ),
    ...Array.from({ length: 2 }, () =>
      bar(
        [[4, 0, 0], [3, 2, 0], [4, 0, 1], [3, 4, 1], [4, 0, 2], [3, 2, 2], [4, 0, 3], [3, 4, 3]],
        { chord: "A5" },
      ),
    ),
    bar(
      [[4, 7, 0], [3, 9, 0], [4, 7, 1], [3, 11, 1], [4, 7, 2], [3, 9, 2], [4, 7, 3], [3, 11, 3]],
      { chord: "E5", direction: "the turnaround" },
    ),
    bar(
      [[4, 5, 0], [3, 7, 0], [4, 5, 1], [3, 9, 1], [4, 5, 2], [3, 7, 2], [4, 5, 3], [3, 9, 3]],
      { chord: "D5" },
    ),
    ...Array.from({ length: 2 }, () =>
      bar(
        [[4, 0, 0], [3, 2, 0], [4, 0, 1], [3, 4, 1], [4, 0, 2], [3, 2, 2], [4, 0, 3], [3, 4, 3]],
        { chord: "A5" },
      ),
    ),
  ],
};

const ALT_PICKING_LADDER: Score = {
  title: "Alternate picking ladder",
  beatsPerBar: 4,
  bars: [
    bar([[5, 5, 0], [5, 7, 1], [5, 8, 2], [5, 7, 3]], { direction: "down up down up, no exceptions" }),
    bar([[4, 5, 0], [4, 7, 1], [4, 8, 2], [4, 7, 3]]),
    bar([[3, 5, 0], [3, 7, 1], [3, 8, 2], [3, 7, 3]]),
    bar([[2, 5, 0], [2, 7, 1], [2, 8, 2], [2, 7, 3]]),
    bar([[1, 5, 0], [1, 7, 1], [1, 8, 2], [1, 7, 3]]),
    bar([[0, 5, 0], [0, 7, 1], [0, 8, 2], [0, 7, 3]], { direction: "then back down" }),
  ],
};

const HAMMER_ROLL: Score = {
  title: "Hammer-on and pull-off rolls",
  beatsPerBar: 4,
  bars: [
    bar([[2, 5, 0], [2, 7, 0.5], [2, 5, 1], [2, 7, 1.5], [2, 5, 2], [2, 7, 2.5], [2, 5, 3]], {
      direction: "pick only the first note of each pair",
    }),
    bar([[1, 5, 0], [1, 8, 0.5], [1, 5, 1], [1, 8, 1.5], [1, 5, 2], [1, 8, 2.5], [1, 5, 3]]),
    bar([[0, 5, 0], [0, 8, 0.5], [0, 5, 1], [0, 8, 1.5], [0, 5, 2], [0, 8, 2.5], [0, 5, 3]]),
    bar([[2, 5, 0], [2, 7, 1], [2, 5, 2]], { direction: "slow it right down to finish" }),
  ],
};

type Pos = [string: number, fret: number];

/**
 * A rolling arpeggio bar: bass note, up through three strings, back down, and
 * the bass again. Eight notes to a bar, which is the figure under most
 * arpeggiated ballads.
 */
const arpBar = (
  bass: Pos,
  [a, b, c]: [Pos, Pos, Pos],
  extra: { chord?: string; direction?: string } = {},
) =>
  bar(
    [
      [bass[0], bass[1], 0],
      [a[0], a[1], 0.5],
      [b[0], b[1], 1],
      [c[0], c[1], 1.5],
      [b[0], b[1], 2],
      [a[0], a[1], 2.5],
      [bass[0], bass[1], 3],
      [a[0], a[1], 3.5],
    ],
    extra,
  );

/* Bass note and the three upper strings of each shape, high e = 0. */
const SHAPES: Record<string, { bass: Pos; uppers: [Pos, Pos, Pos] }> = {
  Bm: { bass: [4, 2], uppers: [[2, 4], [1, 3], [0, 2]] },
  "F#": { bass: [5, 2], uppers: [[2, 3], [1, 2], [0, 2]] },
  A: { bass: [4, 0], uppers: [[2, 2], [1, 2], [0, 0]] },
  E: { bass: [5, 0], uppers: [[2, 1], [1, 0], [0, 0]] },
  G: { bass: [5, 3], uppers: [[2, 0], [1, 0], [0, 3]] },
  D: { bass: [3, 0], uppers: [[2, 2], [1, 3], [0, 2]] },
  Em: { bass: [5, 0], uppers: [[2, 0], [1, 0], [0, 0]] },
};

const CYCLE = ["Bm", "F#", "A", "E", "G", "D", "Em", "F#"];

/**
 * Written for this plan to drill the skill behind arpeggiated barre-chord
 * ballads: hold a barre, pick the strings one at a time, and change without a
 * gap in the sound. Sixteen bars — the cycle twice, second time with the bass
 * ringing longer so you have to hold the shape.
 */
const ARPEGGIO_STUDY: Score = {
  title: "Arpeggio study in B minor — 16 bars",
  beatsPerBar: 4,
  bars: [
    ...CYCLE.map((chord, i) =>
      arpBar(SHAPES[chord].bass, SHAPES[chord].uppers, {
        chord,
        direction: i === 0 ? "hold the shape — pick, never strum" : undefined,
      }),
    ),
    ...CYCLE.map((chord, i) =>
      arpBar(SHAPES[chord].bass, SHAPES[chord].uppers, {
        chord,
        direction:
          i === 0
            ? "again — let the bass ring under the whole bar"
            : i === CYCLE.length - 1
              ? "back to the top"
              : undefined,
      }),
    ),
  ],
};

/**
 * Four original licks over the same changes, so you have something to actually
 * play as a solo rather than copying one. All inside B minor pentatonic at the
 * 7th fret — the shape on the song page.
 */
const BM_LICKS: Score = {
  title: "B minor pentatonic licks — 8 bars",
  beatsPerBar: 4,
  bars: [
    bar([[0, 10, 0], [0, 7, 1], [1, 10, 2], [1, 7, 3]], {
      chord: "Bm",
      direction: "lick 1 — straight down the top",
    }),
    bar([[2, 9, 0], [2, 7, 1], [3, 9, 2], [3, 7, 3]]),
    bar([[2, 7, 0], [2, 9, 1], [1, 7, 2], [1, 10, 3]], {
      chord: "A",
      direction: "lick 2 — the answer, climbing",
    }),
    bar([[0, 7, 0], [0, 10, 2]], { direction: "leave space here" }),
    bar([[1, 7, 0], [1, 7, 0.5], [1, 10, 1], [2, 9, 2], [2, 7, 3]], {
      chord: "G",
      direction: "lick 3 — repeat a note, then fall",
    }),
    bar([[3, 9, 0], [3, 7, 1], [4, 9, 2], [4, 7, 3]], { chord: "D" }),
    bar([[4, 7, 0], [5, 10, 1], [5, 7, 2]], {
      chord: "Em",
      direction: "lick 4 — down to the bass strings",
    }),
    bar([[4, 7, 0]], { chord: "F#", direction: "land on B, the home note, and hold" }),
  ],
};

const BARRE_SHIFTER: Score = {
  title: "Barre chord shifter",
  beatsPerBar: 4,
  bars: [
    bar([[5, 5, 0], [4, 7, 0], [3, 7, 0], [5, 5, 2], [4, 7, 2], [3, 7, 2]], {
      chord: "A",
      direction: "index barres fret 5",
    }),
    bar([[5, 3, 0], [4, 5, 0], [3, 5, 0], [5, 3, 2], [4, 5, 2], [3, 5, 2]], { chord: "G" }),
    bar([[5, 8, 0], [4, 10, 0], [3, 10, 0], [5, 8, 2], [4, 10, 2], [3, 10, 2]], { chord: "C" }),
    bar([[5, 5, 0], [4, 7, 0], [3, 7, 0]], { chord: "A", direction: "release, don't drag" }),
  ],
};

const TWINKLE: Score = {
  title: "Twinkle, Twinkle, Little Star",
  beatsPerBar: 4,
  bars: [
    bar([[1, 1, 0], [1, 1, 1], [0, 3, 2], [0, 3, 3]], { lyric: "Twin-kle twin-kle" }),
    bar([[0, 5, 0], [0, 5, 1], [0, 3, 2]], { lyric: "lit-tle star" }),
    bar([[0, 1, 0], [0, 1, 1], [0, 0, 2], [0, 0, 3]], { lyric: "how I won-der" }),
    bar([[1, 3, 0], [1, 3, 1], [1, 1, 2]], { lyric: "what you are" }),
  ],
};

const JINGLE_BELLS: Score = {
  title: "Jingle Bells — chorus",
  beatsPerBar: 4,
  bars: [
    bar([[0, 0, 0], [0, 0, 1], [0, 0, 2]], { lyric: "Jin-gle bells" }),
    bar([[0, 0, 0], [0, 0, 1], [0, 0, 2]], { lyric: "jin-gle bells" }),
    bar([[0, 0, 0], [0, 3, 1], [1, 1, 2], [1, 3, 3]], { lyric: "jin-gle all the" }),
    bar([[0, 0, 0]], { direction: "let it ring", lyric: "way" }),
  ],
};

const SARGAM: Score = {
  title: "Sa Re Ga Ma Pa Dha Ni Sa — the major scale",
  beatsPerBar: 4,
  bars: [
    bar([[4, 3, 0], [4, 5, 1], [3, 2, 2], [3, 3, 3]], { direction: "Sa Re Ga Ma" }),
    bar([[3, 5, 0], [2, 2, 1], [2, 4, 2], [2, 5, 3]], { direction: "Pa Dha Ni Sa" }),
    bar([[2, 5, 0], [2, 4, 1], [2, 2, 2], [3, 5, 3]], { direction: "and back down" }),
    bar([[3, 3, 0], [3, 2, 1], [4, 5, 2], [4, 3, 3]]),
  ],
};

const PENTATONIC_CLIMB: Score = {
  title: "Pentatonic climb — A minor, box 1",
  beatsPerBar: 4,
  bars: [
    bar([[5, 5, 0], [5, 8, 1], [4, 5, 2], [4, 7, 3]], { direction: "strict down-up picking" }),
    bar([[3, 5, 0], [3, 7, 1], [2, 5, 2], [2, 7, 3]]),
    bar([[1, 5, 0], [1, 8, 1], [0, 5, 2], [0, 8, 3]]),
    bar([[0, 8, 0], [0, 5, 1], [1, 8, 2], [1, 5, 3]], { direction: "then reverse it" }),
  ],
};

const POWER_CHORD_WORKOUT: Score = {
  title: "Power chord workout",
  beatsPerBar: 4,
  bars: [
    bar(
      [[5, 0, 0], [4, 2, 0], [5, 0, 1], [4, 2, 1], [5, 0, 2], [4, 2, 2], [5, 0, 3], [4, 2, 3]],
      { chord: "E5", direction: "all downstrokes" },
    ),
    bar(
      [[5, 3, 0], [4, 5, 0], [5, 3, 1], [4, 5, 1], [5, 3, 2], [4, 5, 2], [5, 3, 3], [4, 5, 3]],
      { chord: "G5" },
    ),
    bar(
      [[5, 5, 0], [4, 7, 0], [5, 5, 1], [4, 7, 1], [5, 5, 2], [4, 7, 2], [5, 5, 3], [4, 7, 3]],
      { chord: "A5" },
    ),
    bar([[5, 0, 0], [4, 2, 0], [5, 0, 2], [4, 2, 2]], { chord: "E5", direction: "let it ring" }),
  ],
};

const GALLOP_DRILL: Score = {
  title: "Gallop rhythm drill",
  beatsPerBar: 4,
  bars: [
    bar(
      [
        [5, 0, 0], [4, 2, 0],
        [5, 0, 1], [4, 2, 1], [5, 0, 1.5], [4, 2, 1.5],
        [5, 0, 2], [4, 2, 2],
        [5, 0, 3], [4, 2, 3], [5, 0, 3.5], [4, 2, 3.5],
      ],
      { chord: "E5", direction: "P.M. — dum-diddy, dum-diddy" },
    ),
    bar(
      [
        [5, 3, 0], [4, 5, 0],
        [5, 3, 1], [4, 5, 1], [5, 3, 1.5], [4, 5, 1.5],
        [5, 3, 2], [4, 5, 2],
        [5, 3, 3], [4, 5, 3], [5, 3, 3.5], [4, 5, 3.5],
      ],
      { chord: "G5" },
    ),
  ],
};

const CHROMATIC: Score = {
  title: "Chromatic 1-2-3-4 warmup",
  beatsPerBar: 4,
  bars: [
    bar([[5, 1, 0], [5, 2, 1], [5, 3, 2], [5, 4, 3]], { direction: "one finger per fret" }),
    bar([[4, 1, 0], [4, 2, 1], [4, 3, 2], [4, 4, 3]]),
    bar([[3, 1, 0], [3, 2, 1], [3, 3, 2], [3, 4, 3]]),
    bar([[2, 1, 0], [2, 2, 1], [2, 3, 2], [2, 4, 3]]),
  ],
};

export const OPEN_SONGS: Song[] = [
  {
    id: "open-ode-to-joy",
    title: "Ode to Joy",
    artist: "Beethoven · public domain",
    language: "english",
    difficulty: 1,
    chords: [],
    loop: [],
    score: ODE_TO_JOY,
    open: true,
    bpm: 70,
    teaches: "Reading a melody and playing single notes cleanly on one string.",
    note: "Everything sits on the B string. A great first melody — you'll know instantly if a note is wrong.",
  },
  {
    id: "open-twinkle",
    title: "Twinkle, Twinkle, Little Star",
    artist: "Traditional · public domain",
    language: "english",
    difficulty: 1,
    chords: [],
    loop: [],
    score: TWINKLE,
    open: true,
    bpm: 66,
    teaches: "Moving between two strings while keeping the rhythm steady.",
  },
  {
    id: "open-jingle-bells",
    title: "Jingle Bells",
    artist: "J. Pierpont, 1857 · public domain",
    language: "english",
    difficulty: 1,
    chords: [],
    loop: [],
    score: JINGLE_BELLS,
    open: true,
    bpm: 88,
    teaches: "Repeated notes and a quick two-string move at the end of the phrase.",
  },
  {
    id: "open-sargam",
    title: "Sargam — Sa Re Ga Ma",
    artist: "Traditional · public domain",
    language: "hindi",
    difficulty: 1,
    chords: [],
    loop: [],
    score: SARGAM,
    open: true,
    bpm: 60,
    teaches: "The major scale across three strings. Sing the syllables as you play them.",
    note: "This is the same scale Western players call 'do re mi'. Learning it by ear pays off in every song you'll play.",
  },
  {
    id: "open-mary-lamb",
    title: "Mary Had a Little Lamb",
    artist: "Traditional · public domain",
    language: "english",
    difficulty: 1,
    chords: [],
    loop: [],
    score: MARY_LAMB,
    open: true,
    bpm: 76,
    teaches: "Three notes on one string. The gentlest possible first melody.",
  },
  {
    id: "open-row-your-boat",
    title: "Row, Row, Row Your Boat",
    artist: "Traditional · public domain",
    language: "english",
    difficulty: 1,
    chords: [],
    loop: [],
    score: ROW_YOUR_BOAT,
    open: true,
    bpm: 84,
    teaches: "Holding long notes, then a run of quick repeated ones.",
  },
  {
    id: "open-frere-jacques",
    title: "Frère Jacques",
    artist: "Traditional · public domain",
    language: "english",
    difficulty: 1,
    chords: [],
    loop: [],
    score: FRERE_JACQUES,
    open: true,
    bpm: 88,
    teaches: "Repeating phrases and your first eighth-note run.",
  },
  {
    id: "open-blues-shuffle",
    title: "Blues Shuffle in A",
    artist: "Traditional form · arranged for this plan",
    language: "english",
    difficulty: 2,
    chords: ["A5", "D5", "E5"],
    loop: [],
    score: BLUES_SHUFFLE,
    open: true,
    bpm: 70,
    planDay: 31,
    soloScale: { rootFret: 5, label: "A minor pentatonic — box 1 at the 5th fret" },
    teaches: "The full 12-bar form with the classic shuffle figure, note for note.",
    note: "The whole twelve bars are written out. Loop it and improvise over the top — this is the single best thing you can practise for lead playing.",
  },
  {
    id: "open-alt-picking",
    title: "Alternate Picking Ladder",
    artist: "Exercise written for this plan",
    language: "english",
    difficulty: 2,
    chords: [],
    loop: [],
    score: ALT_PICKING_LADDER,
    open: true,
    bpm: 65,
    planDay: 30,
    teaches: "Strict down-up picking across all six strings.",
  },
  {
    id: "open-hammer-roll",
    title: "Hammer-on & Pull-off Rolls",
    artist: "Exercise written for this plan",
    language: "english",
    difficulty: 2,
    chords: [],
    loop: [],
    score: HAMMER_ROLL,
    open: true,
    bpm: 60,
    planDay: 43,
    teaches: "Getting several notes from one pick stroke.",
  },
  {
    id: "open-arpeggio-study",
    title: "Arpeggio Study in B Minor",
    artist: "Exercise written for this plan",
    language: "english",
    difficulty: 3,
    chords: ["Bm", "F#", "A", "E", "G", "D", "Em"],
    loop: [],
    score: ARPEGGIO_STUDY,
    open: true,
    bpm: 60,
    planDay: 38,
    teaches:
      "Holding a barre while picking single strings, and changing chords without a gap in the sound.",
    note: "Sixteen bars written out in full, over the same eight changes as Hotel California. This is the technique the song actually demands — get it clean here and the song becomes a matter of learning notes rather than learning a skill.",
  },
  {
    id: "open-bm-licks",
    title: "B Minor Pentatonic Licks",
    artist: "Written for this plan",
    language: "english",
    difficulty: 2,
    chords: ["Bm", "A", "G", "D", "Em", "F#"],
    loop: [],
    score: BM_LICKS,
    open: true,
    bpm: 66,
    planDay: 45,
    soloScale: { rootFret: 7, label: "B minor pentatonic — box 1 at the 7th fret" },
    teaches: "Four licks and, more importantly, where to leave gaps between them.",
    note: "Original licks over the Bm–F#–A–E–G–D–Em–F# cycle, so you can solo over that progression with phrases of your own instead of copying someone's. Learn all four, then start swapping their order.",
  },
  {
    id: "open-barre-shifter",
    title: "Barre Chord Shifter",
    artist: "Exercise written for this plan",
    language: "english",
    difficulty: 3,
    chords: ["A", "G", "C"],
    loop: [],
    score: BARRE_SHIFTER,
    open: true,
    bpm: 60,
    planDay: 38,
    teaches: "Moving a barre shape cleanly without dragging across the strings.",
  },
  {
    id: "open-house-rising-sun",
    title: "House of the Rising Sun",
    artist: "Traditional folk · public domain",
    language: "english",
    difficulty: 2,
    chords: ["Am", "C", "D", "F"],
    loop: ["Am", "C", "D", "F", "Am", "C", "E", "E"],
    strum: "Arpeggio — pick the strings one at a time, in 6/8",
    open: true,
    bpm: 66,
    teaches: "The traditional eight-bar progression, and arpeggio picking across changes.",
    note: "The traditional folk progression. Countless recorded arrangements exist — this is the underlying chord sequence.",
  },
  {
    id: "open-scarborough",
    title: "Scarborough Fair",
    artist: "Traditional English · public domain",
    language: "english",
    difficulty: 2,
    chords: ["Am", "G", "C", "Dm"],
    loop: ["Am", "G", "Am", "Am", "C", "Am", "Dm", "Am"],
    strum: "Fingerpicked, gently, in 3/4 feel",
    open: true,
    bpm: 60,
    teaches: "A modal folk progression and light fingerpicking.",
  },
  {
    id: "open-greensleeves",
    title: "Greensleeves",
    artist: "Traditional English · public domain",
    language: "english",
    difficulty: 2,
    chords: ["Am", "G", "E", "C"],
    loop: ["Am", "G", "Am", "E", "C", "G", "Am", "E"],
    strum: "Arpeggio — let each chord ring",
    open: true,
    bpm: 72,
    teaches: "Minor-key movement and a chord change onto E that needs a clean stretch.",
  },
  {
    id: "open-auld-lang-syne",
    title: "Auld Lang Syne",
    artist: "Traditional Scottish · public domain",
    language: "english",
    difficulty: 1,
    chords: ["G", "C", "D"],
    loop: ["G", "C", "G", "D", "G", "C", "D", "G"],
    strum: "D · D U · U D U",
    open: true,
    bpm: 76,
    teaches: "Three-chord strumming everyone can sing over.",
  },
  {
    id: "open-12-bar-blues",
    title: "12-Bar Blues in A",
    artist: "Traditional blues form · public domain",
    language: "english",
    difficulty: 1,
    chords: ["A5", "D5", "E5"],
    loop: ["A5", "A5", "A5", "A5", "D5", "D5", "A5", "A5", "E5", "D5", "A5", "A5"],
    strum: "Shuffle — long-short, long-short",
    open: true,
    bpm: 70,
    planDay: 31,
    soloScale: { rootFret: 5, label: "A minor pentatonic — box 1 at the 5th fret" },
    teaches: "The form behind half of all popular music. Learn it and you can jam with anyone.",
  },
  {
    id: "open-power-chords",
    title: "Power Chord Workout",
    artist: "Exercise written for this plan",
    language: "english",
    difficulty: 1,
    chords: ["E5", "G5", "A5"],
    loop: [],
    score: POWER_CHORD_WORKOUT,
    open: true,
    bpm: 80,
    planDay: 8,
    teaches: "Moving the two-finger power chord shape cleanly and in time.",
  },
  {
    id: "open-gallop",
    title: "Gallop Rhythm Drill",
    artist: "Exercise written for this plan",
    language: "english",
    difficulty: 2,
    chords: ["E5", "G5"],
    loop: [],
    score: GALLOP_DRILL,
    open: true,
    bpm: 70,
    planDay: 39,
    teaches: "The dum-diddy rhythm behind most heavy metal riffs.",
  },
  {
    id: "open-pentatonic",
    title: "Pentatonic Climb",
    artist: "Exercise written for this plan",
    language: "english",
    difficulty: 2,
    chords: [],
    loop: [],
    score: PENTATONIC_CLIMB,
    open: true,
    bpm: 60,
    planDay: 29,
    teaches: "Box 1 of the minor pentatonic with strict alternate picking.",
  },
  {
    id: "open-chromatic",
    title: "Chromatic Warmup",
    artist: "Exercise written for this plan",
    language: "english",
    difficulty: 1,
    chords: [],
    loop: [],
    score: CHROMATIC,
    open: true,
    bpm: 60,
    planDay: 2,
    teaches: "Finger independence. The drill that fixes your pinky.",
  },
];
