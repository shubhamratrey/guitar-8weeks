import type { Lesson } from "../types";
import { _, jamDay, tab, warmupFor } from "./helpers";

const w = () => warmupFor(6);

export const WEEK_6: Lesson[] = [
  {
    day: 36,
    week: 6,
    title: "The F barre chord",
    goal: "The wall every beginner hits. Time to walk through it.",
    win: "A barre chord. Nothing on the guitar feels more like progress.",
    warmup: w(),
    core: [
      {
        id: "d36-barre",
        title: "Index barre alone",
        kind: "technique",
        minutes: 10,
        essential: true,
        how: [
          "Lay your index flat across all six strings at fret 1. Strum. It'll buzz everywhere. Expected.",
          "Now roll your index slightly onto its outer edge, towards the headstock side. Bony edge, not soft pad.",
          "Pull your elbow in towards your body and drop your thumb to the middle of the neck's back.",
          "Press with your arm's weight, not your finger's strength. If you're straining, your position is wrong, not your hand.",
        ],
      },
      {
        id: "d36-f",
        title: "Full F",
        kind: "technique",
        minutes: 10,
        chords: ["F"],
        how: [
          "Index barres fret 1. Middle on G fret 2. Ring on A fret 3. Pinky on D fret 3.",
          "Pick each string one at a time. Find the dead ones and adjust only for them.",
          "The B string is usually the problem — that's where the index needs the most edge.",
          "Two minutes of trying, then rest your hand. Barre chords come from repeated short attempts, not one long grind.",
        ],
      },
      {
        id: "d36-easier",
        title: "Barre at fret 5 first",
        kind: "drill",
        minutes: 6,
        how: [
          "Play the same shape at fret 5 instead of fret 1. Much easier — less string tension up there.",
          "Get it clean at 5, then walk it down: 4, 3, 2, 1. Sneak up on F rather than attacking it.",
        ],
      },
    ],
    extension: [
      {
        id: "d36-reps",
        title: "Short bursts",
        kind: "drill",
        minutes: 10,
        how: [
          "Place F, strum, release. Fifteen times, with a proper pause between each.",
          "Stop if your hand cramps. Barre strength builds over days, not within one session.",
        ],
      },
    ],
    skills: ["barre-f", "fretting", "noise-control"],
  },

  {
    day: 37,
    week: 6,
    title: "Bm and the real key",
    goal: "The second barre shape — and now you can play Hindi songs without a capo.",
    win: "Two barre chords, and songs in their original key.",
    warmup: w(),
    core: [
      {
        id: "d37-bm",
        title: "B minor",
        kind: "technique",
        minutes: 10,
        essential: true,
        chords: ["Bm"],
        how: [
          "It's the Am shape with a barre. Index across the top five strings at fret 2.",
          "Then middle on B fret 3, ring on D fret 4, pinky on G fret 4.",
          "Skip the low E entirely. Five strings is easier than six — this is often cleaner than F.",
        ],
      },
      {
        id: "d37-key",
        title: "Bm - G - D - A, capo off",
        kind: "song",
        minutes: 10,
        chords: ["Bm", "G", "D", "A"],
        how: [
          "Take the capo off. Play Bm, G, D, A.",
          "That's the actual key of Tum Hi Ho and a great many other Hindi songs.",
          "Slow. The Bm to G change is the hard one — barre to open shape.",
        ],
      },
      {
        id: "d37-changes",
        title: "Barre to open, and back",
        kind: "drill",
        minutes: 6,
        how: [
          "One minute of Bm↔G. Then one minute of F↔C.",
          "The skill is releasing the barre completely and reforming it, not sliding it around.",
        ],
      },
    ],
    extension: [
      {
        id: "d37-song",
        title: "Your Hindi song in the real key",
        kind: "song",
        minutes: 12,
        chords: ["Bm", "G", "D", "A"],
        how: [
          "Play the song you learned in week 3, but with barre chords and no capo.",
          "Now it matches the record. Play along with it.",
        ],
      },
    ],
    skills: ["barre-bm", "barre-f", "changes", "repertoire"],
  },

  {
    day: 38,
    week: 6,
    title: "Barre chords everywhere",
    goal: "Barre shapes are movable. Learn the two roots and you have every chord.",
    win: "Any major or minor chord, anywhere on the neck.",
    warmup: w(),
    core: [
      {
        id: "d38-move",
        title: "Slide the F shape",
        kind: "technique",
        minutes: 10,
        essential: true,
        how: [
          "The F shape at fret 1 is F. At fret 3 it's G. Fret 5, A. Fret 8, C.",
          "Whatever note your index sits on, on the low E string, is the chord's name.",
          "You learned those note positions on day 12. Use them: play G, A, C, D as barre chords by name.",
        ],
      },
      {
        id: "d38-minor",
        title: "Minor barre shape",
        kind: "drill",
        minutes: 8,
        how: [
          "Take the F shape and lift your middle finger off the G string. That's a minor barre chord.",
          "At fret 3 it's Gm, fret 5 Am, fret 8 Cm.",
          "Two shapes — major and minor — and you can now play any chord in any key. That's the whole system.",
        ],
      },
      {
        id: "d38-prog",
        title: "A progression with no open chords",
        kind: "song",
        minutes: 6,
        how: [
          "Barre chords only: A (fret 5), D (fret 10 on the A string root), E (fret 7).",
          "Sounds bigger and tighter than the open version. This is how a lot of records are actually played.",
        ],
      },
    ],
    extension: [
      {
        id: "d38-endurance",
        title: "Barre endurance",
        kind: "drill",
        minutes: 10,
        how: [
          "Hold a barre at fret 5 and strum slowly for thirty seconds. Rest. Five rounds.",
          "Boring, and it's exactly what builds the hand.",
        ],
      },
    ],
    skills: ["barre-f", "barre-bm", "powerchord-move", "changes"],
  },

  {
    day: 39,
    week: 6,
    title: "The gallop",
    goal: "Down, down-up. The rhythm that powers heavy metal.",
    win: "You sound like a metal rhythm guitarist.",
    warmup: w(),
    core: [
      {
        id: "d39-gallop",
        title: "The gallop pattern",
        kind: "technique",
        minutes: 12,
        essential: true,
        bpm: { start: 70, target: 100 },
        chords: ["E5"],
        how: [
          "Say it out loud: 'dum-diddy, dum-diddy'. One long note, then two quick ones.",
          "Picking: DOWN, then down-up. All palm muted on E5.",
          "The two quick notes are twice as fast as the long one. Nail the ratio at 70 bpm before touching the speed.",
          "This one rhythm is most of Iron Maiden and a big chunk of Metallica.",
        ],
        tab: tab([_, _, _, "-2--2-2--2--2-2-", "-2--2-2--2--2-2-", "-0--0-0--0--0-0-"], {
          label: "Gallop on E5, palm muted",
        }),
      },
      {
        id: "d39-move",
        title: "Gallop and change",
        kind: "drill",
        minutes: 8,
        bpm: { start: 65, target: 90 },
        how: [
          "Two bars of gallop on E5, two on G5, two on A5, two back on E5.",
          "Don't let the gallop stumble during the chord change.",
        ],
      },
    ],
    extension: [
      {
        id: "d39-reverse",
        title: "Reverse gallop",
        kind: "drill",
        minutes: 10,
        bpm: { start: 60, target: 85 },
        how: [
          "Flip it: 'diddy-dum'. Two quick notes then a long one. Picking is down-up, down.",
          "Harder than it sounds. Great for your picking-hand independence.",
        ],
      },
    ],
    skills: ["gallop", "palm-mute", "downpicking", "timing"],
  },

  {
    day: 40,
    week: 6,
    title: "Speed, properly",
    goal: "Push downpicking towards 140 without your hand seizing up.",
    win: "You can play fast rhythm parts and stay in control.",
    warmup: w(),
    core: [
      {
        id: "d40-ladder",
        title: "The speed ladder",
        kind: "drill",
        minutes: 14,
        essential: true,
        bpm: { start: 100, target: 140 },
        chords: ["E5"],
        how: [
          "Palm-muted E5, eighth notes, all downstrokes. Thirty seconds at 100, then rest thirty.",
          "Add 5 bpm each round. Stop the moment it gets sloppy — sloppy repetitions teach sloppy playing.",
          "Getting to a clean 140 in eight weeks would be very good. 120 is normal and fine.",
          "Real rule: your maximum useful speed is the fastest you can play it CLEANLY, not the fastest you can flail.",
        ],
      },
      {
        id: "d40-relax",
        title: "Find the tension",
        kind: "technique",
        minutes: 6,
        how: [
          "Play at your top speed and notice where you're gripping: jaw, shoulder, forearm, pick hand.",
          "Consciously release each one while still playing. You'll usually gain 10 bpm just from this.",
          "Speed is mostly the absence of tension, not the presence of effort.",
        ],
      },
    ],
    extension: [
      {
        id: "d40-gallop-speed",
        title: "Gallop at speed",
        kind: "drill",
        minutes: 10,
        bpm: { start: 85, target: 115 },
        how: ["Same ladder approach on the gallop pattern. Thirty on, thirty off, +5 each round."],
      },
      {
        id: "d40-honest",
        title: "Where you actually are",
        kind: "theory",
        minutes: 5,
        how: [
          "Log today's clean max bpm. That's your real number.",
          "Metal downpicking at 180+ takes years, not weeks. Knowing that stops you feeling like a failure at 120.",
        ],
      },
    ],
    skills: ["metal-speed", "downpicking", "palm-mute", "gallop"],
  },

  {
    day: 41,
    week: 6,
    title: "A heavy riff of your own",
    goal: "Put the gallop, muting and power chords into one riff.",
    win: "You wrote a riff. That's a different feeling entirely.",
    warmup: w(),
    core: [
      {
        id: "d41-riff",
        title: "Build a riff",
        kind: "song",
        minutes: 12,
        essential: true,
        how: [
          "Pick three power chords — try E5, G5, A5, or E5, C5, D5.",
          "Gallop on the first for two bars, then hit the other two hard for one bar each.",
          "Add a chromatic walk-down on the low E string to link the end back to the start.",
          "Play your riff twenty times until it's a thing you own rather than a thing you're working out.",
        ],
        tab: tab([_, _, _, "-2--2-2--2--2-2----5--5----7--7--", "-2--2-2--2--2-2----5--5----7--7--", "-0--0-0--0--0-0----3--3----5--5--"], {
          label: "Example: gallop on E5, then G5 and A5",
          note: "A starting point. Change it — that's the exercise.",
        }),
      },
      {
        id: "d41-chug",
        title: "The chug-and-fill shape",
        kind: "drill",
        minutes: 8,
        bpm: { start: 85, target: 115 },
        how: [
          "Seven palm-muted chugs on E5, then a 3-2-0 walk down the A string.",
          "Chug, chug, chug, fill. That's the architecture of an enormous number of metal riffs.",
        ],
        tab: tab([_, _, _, _, "----------------3-2-0-", "-0-0-0-0-0-0-0--------"], {
          label: "Chug and fill",
        }),
      },
    ],
    extension: [
      {
        id: "d41-learn",
        title: "Learn a real metal riff",
        kind: "song",
        minutes: 12,
        how: [
          "Pick one: Enter Sandman, Seek and Destroy, or Master of Puppets' intro.",
          "All are built from what you now have — power chords, palm muting, gallops.",
        ],
        watch: "Enter Sandman guitar lesson beginner slow",
      },
    ],
    skills: ["gallop", "palm-mute", "powerchord-move", "repertoire"],
  },

  jamDay(42, 6, {
    title: "Jam day — six weeks",
    goal: "Barre chords, metal riffs, blues solos. All in one session.",
    win: "You're playing four different styles. Six weeks ago you couldn't tune it.",
    play: [
      "Your own riff",
      "Hindi song with barre chords, no capo",
      "12-bar blues with a solo over it",
      "Iron Man and Back in Black",
    ],
    record: "Record your own riff as 'week 6'. It's yours — that one's worth keeping.",
  }),
];
