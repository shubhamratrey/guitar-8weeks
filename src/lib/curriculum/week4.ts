import type { Lesson } from "../types";
import { _, jamDay, tab, warmupFor } from "./helpers";

const w = () => warmupFor(4);

export const WEEK_4: Lesson[] = [
  {
    day: 22,
    week: 4,
    title: "Make the strum breathe",
    goal: "Accents and dynamics. Same chords, completely different feel.",
    win: "Your playing sounds intentional instead of flat.",
    warmup: w(),
    core: [
      {
        id: "d22-accent",
        title: "Accent 2 and 4",
        kind: "drill",
        minutes: 8,
        essential: true,
        bpm: { start: 70, target: 100 },
        chords: ["Em", "C", "G", "D"],
        how: [
          "Standard pattern, but hit beats 2 and 4 harder than 1 and 3.",
          "That's where the snare drum lands. Emphasising it makes your strumming feel like a band.",
          "Exaggerate it at first — much harder than feels natural — then dial back.",
        ],
      },
      {
        id: "d22-loud-soft",
        title: "Loud and quiet on purpose",
        kind: "drill",
        minutes: 6,
        how: [
          "Four bars as quietly as you can while still being clear. Four bars loud. Repeat.",
          "Control over volume is control over emotion. It's also the thing beginners never practise.",
        ],
      },
      {
        id: "d22-song",
        title: "Apply it to a song",
        kind: "song",
        minutes: 6,
        how: [
          "Play Zombie or your Hindi song. Verses quiet, choruses loud.",
          "Suddenly it sounds arranged rather than practised.",
        ],
      },
    ],
    extension: [
      {
        id: "d22-mute-strum",
        title: "Percussive dead strums",
        kind: "technique",
        minutes: 10,
        how: [
          "Relax your fretting hand so the strings stop ringing but stay touched, then strum. You get a percussive 'chk'.",
          "Work it into the pattern: down, chk, down-up, chk.",
          "This one trick makes an acoustic-style strum sound properly funky.",
        ],
      },
    ],
    skills: ["dynamics", "strum-basic", "timing"],
  },

  {
    day: 23,
    week: 4,
    title: "Sixteenth-note strumming",
    goal: "Double the strumming speed without doubling the effort.",
    win: "The busy, driving strum you hear on records.",
    warmup: w(),
    core: [
      {
        id: "d23-count",
        title: "Count in sixteenths",
        kind: "drill",
        minutes: 8,
        essential: true,
        bpm: { start: 50, target: 75 },
        how: [
          "Count: 1-e-and-a, 2-e-and-a, 3-e-and-a, 4-e-and-a.",
          "Down on the number, up on 'e', down on 'and', up on 'a'. Four strums per beat.",
          "Start at 50 bpm. Very slow. The hand stays small and loose — this is wrist, not elbow.",
        ],
      },
      {
        id: "d23-pattern",
        title: "A sixteenth pattern with gaps",
        kind: "drill",
        minutes: 8,
        chords: ["Am"],
        how: [
          "Strum on: 1, e, and, then skip 'a'. Then 2, skip 'e', and, a.",
          "Keep the hand moving through every gap. If the motion stops, the groove dies.",
        ],
      },
    ],
    extension: [
      {
        id: "d23-funk",
        title: "Wrist looseness",
        kind: "drill",
        minutes: 8,
        how: [
          "Mute all strings, strum sixteenths at 80 for a full minute without stopping.",
          "If your forearm burns, you're using your elbow. Loosen the wrist, shrink the motion.",
        ],
      },
      {
        id: "d23-song",
        title: "Sixteenths on a song",
        kind: "song",
        minutes: 8,
        chords: ["Am", "Fmaj7", "C", "G"],
        how: ["Your Hindi shape set with a sixteenth strum. Much more energy."],
      },
    ],
    skills: ["strum-16", "timing", "dynamics"],
  },

  {
    day: 24,
    week: 4,
    title: "Picking chords apart",
    goal: "Arpeggios — playing chord notes one at a time.",
    win: "The pretty, delicate sound behind most Hindi ballads.",
    warmup: w(),
    core: [
      {
        id: "d24-arp",
        title: "Broken chords",
        kind: "technique",
        minutes: 10,
        essential: true,
        bpm: { start: 60, target: 85 },
        chords: ["Am"],
        how: [
          "Hold Am. Instead of strumming, pick single strings in order: A, D, G, B, then back G, D.",
          "One note per click. Every note clean and separate.",
          "Hold the chord shape the whole time — the fretting hand doesn't move at all.",
        ],
        tab: tab(["--------0-------", "-----1-----1----", "--2-----------2-", "-----------0----", "-0--------------", _], {
          label: "Am arpeggio, ascending and back",
        }),
      },
      {
        id: "d24-across",
        title: "Same pattern, four chords",
        kind: "drill",
        minutes: 8,
        chords: ["Am", "Fmaj7", "C", "G"],
        how: [
          "One bar of arpeggio per chord. The picking pattern stays identical, only the shape changes.",
          "Watch the bass note change: Am starts on A, C starts on A, G starts on low E.",
        ],
      },
    ],
    extension: [
      {
        id: "d24-fingers",
        title: "Try it without a pick",
        kind: "technique",
        minutes: 10,
        how: [
          "Thumb plays the bass strings, index-middle-ring take G, B and high e.",
          "Warmer and rounder than a pick. Worth knowing even if you mostly play with one.",
        ],
      },
    ],
    skills: ["arpeggio", "timing", "fretting"],
  },

  {
    day: 25,
    week: 4,
    title: "A ballad, properly",
    goal: "Arpeggio picking on a real song, start to finish.",
    win: "A song that sounds genuinely beautiful, not just correct.",
    warmup: w(),
    core: [
      {
        id: "d25-song",
        title: "Channa Mereya style picking",
        kind: "song",
        minutes: 15,
        essential: true,
        chords: ["Am", "Fmaj7", "C", "G"],
        how: [
          "Capo on 2 (check the linked lesson — versions vary). Shapes Am, Fmaj7, C, G.",
          "Arpeggio picking rather than strumming. Two bars per chord, let it be spacious.",
          "Play it slower than the record. Ballads survive being slow; rushing ruins them.",
        ],
        watch: "Channa Mereya guitar lesson fingerpicking capo",
      },
      {
        id: "d25-mix",
        title: "Pick the verse, strum the chorus",
        kind: "song",
        minutes: 8,
        how: [
          "Arpeggios for the verse, full strumming when the chorus arrives.",
          "That contrast is real arranging. It's what makes one person with a guitar hold a room.",
        ],
      },
    ],
    extension: [
      {
        id: "d25-second",
        title: "Any ballad you like",
        kind: "song",
        minutes: 12,
        how: [
          "Pick a slow song you actually love and try it with these shapes plus a capo.",
          "Playing music you chose yourself is what keeps this going past week four.",
        ],
      },
    ],
    skills: ["arpeggio", "capo", "repertoire", "dynamics"],
  },

  {
    day: 26,
    week: 4,
    title: "Fast changes with lazy fingers",
    goal: "Chord shapes that share fingers, so switching costs almost nothing.",
    win: "Smooth changes at real song tempo.",
    warmup: w(),
    core: [
      {
        id: "d26-cluster",
        title: "G - Cadd9 - Em7 - D",
        kind: "drill",
        minutes: 10,
        essential: true,
        chords: ["G", "Cadd9", "Em7", "D"],
        how: [
          "Keep your ring and pinky planted on the B and high e strings at fret 3 for G, Cadd9 and Em7.",
          "Only the index and middle move. Three chords, two fingers doing the work.",
          "Now play the loop at 90 bpm with a full strum. It should feel almost effortless.",
        ],
      },
      {
        id: "d26-anchor",
        title: "Find your own anchors",
        kind: "theory",
        minutes: 7,
        how: [
          "Take any two chords you struggle with. Look for a finger that could stay put, or nearly.",
          "Am to C: your index barely moves. Em to G: your middle stays on the same string.",
          "Good players are lazy in exactly this way. Copy it.",
        ],
      },
    ],
    extension: [
      {
        id: "d26-grid",
        title: "Change grid again",
        kind: "drill",
        minutes: 12,
        how: [
          "Same six pairs as day 18. One minute each. Compare against your day 18 numbers.",
          "Eight days of work should show up clearly here. Seeing that jump is the point.",
        ],
      },
    ],
    skills: ["changes", "open-gc", "strum-basic"],
  },

  {
    day: 27,
    week: 4,
    title: "Two songs, no stopping",
    goal: "Play through mistakes instead of restarting.",
    win: "You can get to the end of a song. That's rarer than you'd think.",
    warmup: w(),
    core: [
      {
        id: "d27-nostop",
        title: "The no-restart rule",
        kind: "song",
        minutes: 14,
        essential: true,
        how: [
          "Pick two songs you know. Play each from beginning to end.",
          "Absolute rule: no stopping and no going back, whatever happens. Fumble a chord, keep strumming, catch up.",
          "Restarting every time you slip trains you to fall apart under pressure. This is the fix.",
          "Three full run-throughs of each.",
        ],
      },
      {
        id: "d27-weak",
        title: "Patch the worst bar",
        kind: "drill",
        minutes: 6,
        how: [
          "One specific bar in each song is your weak point. Find it.",
          "Play just that bar, plus the one before and after, twenty times. Then run the song again.",
        ],
      },
    ],
    extension: [
      {
        id: "d27-audience",
        title: "Play for one person",
        kind: "song",
        minutes: 8,
        how: [
          "Get someone in the room. Anyone. Play one song for them.",
          "Your hands will shake and it'll be worse than in private. That's exactly why it's worth doing now.",
        ],
      },
    ],
    skills: ["performing", "repertoire", "changes"],
  },

  jamDay(28, 4, {
    title: "Halfway — jam day",
    goal: "Four weeks down. Listen to week 1 and hear the difference.",
    win: "Halfway through, with a real repertoire.",
    play: [
      "Every song you know, back to back",
      "Your ballad with arpeggio picking",
      "All three rock riffs",
    ],
    record:
      "Record your best song as 'week 4' — then play the 'week 1' recording straight after. That gap is four weeks of work.",
  }),
];
