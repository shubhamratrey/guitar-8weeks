import type { Lesson } from "../types";
import { _, jamDay, tab, warmupFor } from "./helpers";

const w = () => warmupFor(5);

export const WEEK_5: Lesson[] = [
  {
    day: 29,
    week: 5,
    title: "Minor pentatonic box 1",
    goal: "Five notes, one shape. Every rock and blues solo you love lives here.",
    win: "The single most valuable pattern in guitar. You'll use it for the rest of your life.",
    warmup: w(),
    core: [
      {
        id: "d29-box",
        title: "Learn the box",
        kind: "technique",
        minutes: 12,
        essential: true,
        bpm: { start: 55, target: 75 },
        how: [
          "Start at the 5th fret. That makes it A minor pentatonic.",
          "Low E: frets 5 and 8. A: 5 and 7. D: 5 and 7. G: 5 and 7. B: 5 and 8. High e: 5 and 8.",
          "Index finger covers every fret 5. Ring covers the 7s, pinky covers the 8s.",
          "Ascend all twelve notes, then descend. One note per click, dead slow. Say nothing, just listen for evenness.",
        ],
        tab: tab([
          "-------------------5--8--",
          "----------------5--8-----",
          "-------------5--7--------",
          "----------5--7-----------",
          "------5--7---------------",
          "-5--8--------------------",
        ], { label: "A minor pentatonic, box 1 (5th fret), ascending" }),
      },
      {
        id: "d29-shape",
        title: "See the shape, not the numbers",
        kind: "theory",
        minutes: 6,
        how: [
          "Look at the pattern: two notes per string, and it's a symmetrical block with a bulge on the top and bottom strings.",
          "Memorise the SHAPE. Then slide it: at fret 3 it's G minor, at fret 7 B minor, at fret 12 E minor.",
          "One shape, every key. This is why guitarists love it.",
        ],
      },
    ],
    extension: [
      {
        id: "d29-random",
        title: "Random order",
        kind: "drill",
        minutes: 10,
        how: [
          "Play notes from the box in no particular order for two minutes. Just wander.",
          "Everything you play will sound broadly okay. That's what a scale is for.",
        ],
      },
      {
        id: "d29-keys",
        title: "Move it around",
        kind: "drill",
        minutes: 6,
        how: ["Play the box starting at frets 3, 5, 7, 10 and 12. Same shape every time."],
      },
    ],
    skills: ["pentatonic", "alt-picking", "timing"],
  },

  {
    day: 30,
    week: 5,
    title: "Alternate picking",
    goal: "Down-up-down-up, no exceptions. This is where lead speed comes from.",
    win: "Clean, even single notes at a decent clip.",
    warmup: w(),
    core: [
      {
        id: "d30-alt",
        title: "Strict alternation",
        kind: "technique",
        minutes: 10,
        essential: true,
        bpm: { start: 60, target: 90 },
        how: [
          "Pentatonic box, up and down, alternating strictly: down, up, down, up.",
          "The hard part is string changes — the alternation must continue across them without resetting.",
          "Small motions from the wrist. If your whole arm is swinging, you've capped your speed already.",
        ],
      },
      {
        id: "d30-pairs",
        title: "Two notes per string, in fours",
        kind: "drill",
        minutes: 8,
        bpm: { start: 65, target: 95 },
        how: [
          "Play each pair of notes twice before moving on: 5-8, 5-8, then next string 5-7, 5-7.",
          "Four notes per string forces the picking hand to stay honest.",
        ],
      },
    ],
    extension: [
      {
        id: "d30-speed",
        title: "Speed ladder",
        kind: "drill",
        minutes: 12,
        bpm: { start: 70, target: 110 },
        how: [
          "One full pass through the box at 70. Clean? Add 5. Any mistake, drop 10.",
          "Find the tempo where you break. Then live 10 bpm below it for a week. That's how speed is built.",
        ],
      },
    ],
    skills: ["alt-picking", "pentatonic", "timing"],
  },

  {
    day: 31,
    week: 5,
    title: "12-bar blues",
    goal: "The form that half of all popular music is built on.",
    win: "You can play a 12-bar blues, which means you can jam with anyone.",
    warmup: w(),
    core: [
      {
        id: "d31-form",
        title: "The twelve bars",
        kind: "theory",
        minutes: 7,
        essential: true,
        chords: ["A5", "D5", "E5"],
        how: [
          "In A: four bars of A5, two bars of D5, two of A5, one E5, one D5, two A5.",
          "Count it out loud as you play. Twelve bars, then it repeats forever.",
          "Memorise the sequence today. Every blues jam on earth assumes you know it.",
        ],
      },
      {
        id: "d31-shuffle",
        title: "The shuffle rhythm",
        kind: "drill",
        minutes: 10,
        bpm: { start: 60, target: 90 },
        how: [
          "Not straight eighths — it's a limp: LONG-short, LONG-short. Like saying 'sha-ffle, sha-ffle'.",
          "On A5, alternate between the plain power chord and adding your pinky two frets up on the D string.",
          "That in-and-out movement is the classic blues rhythm figure.",
        ],
        tab: tab([_, _, _, "--2--4--2--4--2--4--", "--0--0--0--0--0--0--", _], {
          label: "A shuffle figure",
          note: "Long-short feel throughout.",
        }),
      },
    ],
    extension: [
      {
        id: "d31-full",
        title: "Full twelve bars with the shuffle",
        kind: "song",
        minutes: 10,
        how: [
          "Play all twelve bars with the shuffle figure, moving it to D (A string fret 5) and E (fret 7).",
          "Four times through without stopping.",
        ],
      },
      {
        id: "d31-backing",
        title: "Play with a backing track",
        kind: "song",
        minutes: 8,
        how: ["Search 'slow blues backing track in A' and play the rhythm along with it."],
        watch: "slow blues backing track in A 12 bar",
      },
    ],
    skills: ["12-bar", "powerchord-move", "timing", "counting"],
  },

  {
    day: 32,
    week: 5,
    title: "Your first lick",
    goal: "Turn the scale into something that sounds like music.",
    win: "A phrase that sounds like an actual solo, not an exercise.",
    warmup: w(),
    core: [
      {
        id: "d32-lick",
        title: "The descending lick",
        kind: "technique",
        minutes: 10,
        essential: true,
        bpm: { start: 55, target: 80 },
        how: [
          "High e fret 8, then 5. B string 8, then 5. G string 7, then 5. Let it breathe.",
          "Play it, then stop for two beats of silence, then play it again.",
          "That silence is what makes it a phrase instead of a scale run. Space is the most underrated thing in lead playing.",
        ],
        tab: tab(["--8--5------------", "--------8--5------", "--------------7--5", _, _, _], {
          label: "Descending A minor pentatonic lick",
        }),
      },
      {
        id: "d32-over",
        title: "Play the lick over the blues",
        kind: "song",
        minutes: 8,
        how: [
          "Put on the blues backing track in A. Play your lick once per four bars. Nothing else.",
          "One phrase, well placed, over a groove. That's already a solo.",
        ],
        watch: "slow blues backing track in A 12 bar",
      },
    ],
    extension: [
      {
        id: "d32-variants",
        title: "Three variations",
        kind: "drill",
        minutes: 12,
        how: [
          "Play the lick backwards. Then start it on a different note. Then play it twice as slow.",
          "Four phrases from one idea. This is how players with a small vocabulary sound endlessly inventive.",
        ],
      },
    ],
    skills: ["licks", "pentatonic", "improv"],
  },

  {
    day: 33,
    week: 5,
    title: "Bending",
    goal: "Push a string sideways and make it sing. This is the sound of electric guitar.",
    win: "A bend that lands in tune instead of somewhere near it.",
    warmup: w(),
    core: [
      {
        id: "d33-bend",
        title: "Bend to a target pitch",
        kind: "technique",
        minutes: 12,
        essential: true,
        how: [
          "G string, fret 7, ring finger. Put your middle and index behind it on frets 6 and 5 for support.",
          "First, play fret 9 so your ear learns the target. Now bend fret 7 up until it matches exactly.",
          "Push with your whole hand rotating from the wrist, not by pulling with the fingertip.",
          "Most beginner bends are under-bent and sound sour. Aim high, then correct down.",
        ],
        tab: tab([_, _, "--7b9--", _, _, _], {
          label: "Full-step bend on the G string",
          note: "'b' means bend. 7b9 = fret 7 bent up to sound like fret 9.",
        }),
      },
      {
        id: "d33-half",
        title: "Half-step bends",
        kind: "drill",
        minutes: 6,
        how: [
          "Same thing, but only bend up one fret's worth. B string fret 8 bent to sound like fret 9.",
          "Smaller bends are harder to control. Ten of each.",
        ],
      },
    ],
    extension: [
      {
        id: "d33-lick",
        title: "Bend inside a lick",
        kind: "song",
        minutes: 10,
        how: [
          "Take yesterday's lick and bend the G string note instead of playing it plain.",
          "Same phrase, ten times more expressive.",
        ],
      },
      {
        id: "d33-strings",
        title: "A note on strings",
        kind: "theory",
        minutes: 5,
        how: [
          "Bending is much easier on light strings (9s or 10s). If yours feel like cables, that's the strings, not you.",
          "Old strings also refuse to bend in tune. Change them every couple of months once you're playing daily.",
        ],
      },
    ],
    skills: ["bends", "licks", "pentatonic"],
  },

  {
    day: 34,
    week: 5,
    title: "Vibrato",
    goal: "The wobble that makes a held note sound alive.",
    win: "Your long notes stop sounding dead.",
    warmup: w(),
    core: [
      {
        id: "d34-vib",
        title: "Wrist vibrato",
        kind: "technique",
        minutes: 10,
        essential: true,
        how: [
          "Fret a note on the G string with your ring finger, three fingers supporting behind it.",
          "Rotate your wrist to bend the string slightly up, release, up, release. Rhythmically, not randomly.",
          "It's a series of tiny bends, not a shaking finger. The motion comes from the wrist.",
          "Slow and wide first. Fast and narrow sounds nervous.",
        ],
      },
      {
        id: "d34-timed",
        title: "Vibrato in time",
        kind: "drill",
        minutes: 8,
        bpm: { start: 60, target: 80 },
        how: [
          "Metronome at 60. Two wobbles per click. Then three. Then four.",
          "Controlled vibrato is what separates a great note from a merely correct one. Uncontrolled vibrato sounds panicked.",
        ],
      },
    ],
    extension: [
      {
        id: "d34-combine",
        title: "Bend, then vibrato",
        kind: "technique",
        minutes: 10,
        how: [
          "Bend the G string up a full step, hold it, then add vibrato at the top of the bend.",
          "Hard. Also the single most recognisable move in blues-rock lead playing.",
        ],
      },
      {
        id: "d34-solo",
        title: "Two-note solo",
        kind: "song",
        minutes: 8,
        how: [
          "Over the blues backing track, play just two notes for a whole twelve bars — but bend and vibrato them.",
          "Proof that expression matters more than note count.",
        ],
      },
    ],
    skills: ["vibrato", "bends", "licks"],
  },

  jamDay(35, 5, {
    title: "Jam day — you can solo now",
    goal: "Rhythm and lead over the same twelve bars.",
    win: "You improvised over a backing track. That's a real musician thing to do.",
    play: [
      "12-bar blues rhythm in A, four times through",
      "Your lick over a blues backing track",
      "Pentatonic box up and down, as fast as stays clean",
      "Any song from earlier weeks you feel like playing",
    ],
    record: "Record twelve bars of you soloing over a backing track. Save as 'week 5'.",
  }),
];
