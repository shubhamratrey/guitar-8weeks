import type { Lesson } from "../types";
import { _, jamDay, tab, warmupFor } from "./helpers";

const w = () => warmupFor(1);

export const WEEK_1: Lesson[] = [
  {
    day: 1,
    week: 1,
    title: "Make a noise people recognise",
    goal: "Get the guitar working, learn to hold a pick, and play a riff you already know by ear.",
    win: "You can play the Smoke on the Water riff. On day one.",
    warmup: [
      {
        id: "d1-setup",
        title: "Plug in and set the amp flat",
        kind: "warmup",
        minutes: 4,
        how: [
          "Cable into the guitar first, then the amp. Amp volume at zero when you plug in — that's what the click is.",
          "Set gain/drive low, tone knobs at 12 o'clock, then bring volume up to talking level.",
          "On the guitar: volume all the way up, pickup selector to the bridge (the position nearest the strings' anchor) for riffs.",
          "No amp yet? Everything in this plan works unplugged. It's just quieter.",
        ],
      },
      {
        id: "d1-tune",
        title: "Tune it",
        kind: "warmup",
        minutes: 4,
        how: [
          "Get a tuner app (GuitarTuna, or 'guitar tuner' in your browser). Clip-on tuners are better and cost almost nothing.",
          "Thickest string to thinnest: E A D G B e.",
          "Turn the tuning peg slowly while the note rings. Flat means tighten.",
          "Do this at the start of every session for the next eight weeks, no exceptions.",
        ],
      },
    ],
    core: [
      {
        id: "d1-hold",
        title: "Hold the pick and the neck",
        kind: "technique",
        minutes: 5,
        how: [
          "Pick: rest it on the pad of your index finger, thumb on top. Only 5mm of tip sticks out.",
          "Grip it like you'd hold a crisp you don't want to snap. Death-gripping kills your speed later.",
          "Fretting hand: thumb on the BACK of the neck, not wrapped over the top. Fingers curled, nails short.",
          "Press just behind the metal fret wire, not on top of it and not in the middle of the gap.",
        ],
      },
      {
        id: "d1-firstnote",
        title: "One clean note, sixty times",
        kind: "drill",
        minutes: 6,
        how: [
          "Fret the low E string at the 3rd fret with your index finger. Pick it once. Listen.",
          "Buzzing? Press slightly harder, move closer to the fret, and check your finger isn't touching the neighbouring string.",
          "Dead thud? You're on top of the fret wire. Slide back a couple of millimetres.",
          "Sixty clean single notes before you move on. This is the most boring six minutes of the whole plan and it fixes the most.",
        ],
      },
      {
        id: "d1-smoke",
        title: "Smoke on the Water — the riff",
        kind: "song",
        minutes: 10,
        essential: true,
        bpm: { start: 60, target: 90 },
        how: [
          "Everything happens on the D string — the 4th string, third from the top.",
          "Index finger plays fret 3, ring finger plays fret 5, pinky plays fret 6.",
          "All downstrokes. Slowly. Say the fret numbers out loud as you play them.",
          "Play it wrong ten times, then a bit less wrong. That's the process, and it's the same process at every level.",
        ],
        tab: tab([_, _, _, "-0--3--5-----0--3--6--5-----0--3--5-----3--0-", _, _], {
          label: "Deep Purple — main riff (single-note beginner version)",
          note: "The original is played as two-note fourths. This single-note version is the same melody and is how everyone learns it.",
        }),
        watch: "Smoke on the Water riff beginner guitar lesson",
      },
    ],
    extension: [
      {
        id: "d1-strings",
        title: "Learn the string names for real",
        kind: "theory",
        minutes: 5,
        how: [
          "Thick to thin: E A D G B e. Say it ten times.",
          "Then point at a random string and name it without counting. You'll need this constantly.",
        ],
      },
      {
        id: "d1-play",
        title: "Just make noise",
        kind: "song",
        minutes: 10,
        how: [
          "Bend a string until it sounds wrong. Slide your hand up the neck. Hit all six strings at once.",
          "You're learning what the instrument does. This counts as practice.",
        ],
      },
    ],
    skills: ["tuning", "pick-grip", "fretting", "single-note"],
  },

  {
    day: 2,
    week: 1,
    title: "Clean, not fast",
    goal: "Kill the buzz. Get all four fingers working.",
    win: "Your riff sounds like a riff instead of a rattle.",
    warmup: w(),
    core: [
      {
        id: "d2-buzz",
        title: "Buzz hunt",
        kind: "drill",
        minutes: 6,
        how: [
          "Play every string at fret 5, one at a time, and listen hard.",
          "Any buzz or thud: adjust and replay until it's clean before moving on.",
          "The fix is almost always one of three things — closer to the fret, more finger tip, thumb behind the neck.",
        ],
      },
      {
        id: "d2-smoke",
        title: "Smoke on the Water, in time",
        kind: "song",
        minutes: 12,
        essential: true,
        bpm: { start: 65, target: 95 },
        how: [
          "Metronome on. Open the tools drawer on this screen if you don't have one.",
          "One note per click at 65. When you can play it four times with zero mistakes, add 5 bpm.",
          "The moment you make a mistake, drop 10 bpm. Speed you can't control isn't speed.",
        ],
        tab: tab([_, _, _, "-0--3--5-----0--3--6--5-----0--3--5-----3--0-", _, _], {
          label: "Main riff",
        }),
      },
      {
        id: "d2-onestring",
        title: "Every fret on the low E",
        kind: "drill",
        minutes: 5,
        how: [
          "Play frets 1 through 12 on the low E string, one finger per fret where you can reach.",
          "Then back down. Even, steady, no gaps in the sound.",
        ],
      },
    ],
    extension: [
      {
        id: "d2-chromatic-up",
        title: "Chromatic up the neck",
        kind: "drill",
        minutes: 8,
        bpm: { start: 60, target: 80 },
        how: [
          "The 1-2-3-4 pattern starting at fret 1, then start at fret 2, then fret 3, all the way to fret 9.",
          "Your pinky will refuse to cooperate. It cooperates in about two weeks.",
        ],
      },
      {
        id: "d2-listen",
        title: "Listen to the song properly",
        kind: "theory",
        minutes: 6,
        how: [
          "Put the actual recording on and follow along with the riff in your head.",
          "Knowing how it's meant to feel is half of learning to play it.",
        ],
        watch: "Deep Purple Smoke on the Water official",
      },
    ],
    skills: ["fretting", "chromatic", "single-note", "timing"],
  },

  {
    day: 3,
    week: 1,
    title: "Your first two chords",
    goal: "Em and Am — the two easiest, most useful shapes on the instrument.",
    win: "You can play two real chords that appear in thousands of songs.",
    warmup: w(),
    core: [
      {
        id: "d3-em",
        title: "E minor",
        kind: "technique",
        minutes: 7,
        essential: true,
        chords: ["Em"],
        how: [
          "Middle finger on A string fret 2. Ring finger on D string fret 2. That's it.",
          "Strum all six strings, slowly, with one downstroke.",
          "Now check it: pick each string one at a time. Every one should ring. Fix whichever doesn't.",
          "Lift your hand off completely, then put the shape back down. Twenty times. Building the muscle memory matters more than holding it.",
        ],
      },
      {
        id: "d3-am",
        title: "A minor",
        kind: "technique",
        minutes: 8,
        chords: ["Am"],
        how: [
          "Index on B string fret 1, middle on D string fret 2, ring on G string fret 2.",
          "Strum five strings — start from the A string, skip the low E.",
          "Pick each string to check it. The B string usually buzzes first; curl that index finger more.",
          "Place and lift twenty times.",
        ],
      },
      {
        id: "d3-strum",
        title: "Four downstrokes each",
        kind: "drill",
        minutes: 5,
        how: [
          "Em four times, Am four times, round and round.",
          "Count out loud: 1 2 3 4. Out loud, not in your head — it works far better and you'll feel silly for about a day.",
          "Take as long as you need to change shapes. Speed comes later.",
        ],
        chords: ["Em", "Am"],
      },
    ],
    extension: [
      {
        id: "d3-strum-hand",
        title: "Strumming hand alone",
        kind: "drill",
        minutes: 6,
        how: [
          "Mute the strings with your fretting hand laid flat across them.",
          "Strum down-up-down-up continuously, evenly, like a pendulum that never stops.",
          "This constant motion is the secret of good strumming. Start it now.",
        ],
      },
      {
        id: "d3-smoke",
        title: "Keep the riff alive",
        kind: "song",
        minutes: 6,
        bpm: { start: 70, target: 100 },
        how: ["Two minutes on Smoke on the Water so it doesn't rust."],
      },
    ],
    skills: ["minor-chords", "fretting", "counting", "noise-control"],
  },

  {
    day: 4,
    week: 1,
    title: "Changing chords without stopping",
    goal: "The switch between chords is the actual skill. Drill it directly.",
    win: "Em to Am in under two seconds, cleanly.",
    warmup: w(),
    core: [
      {
        id: "d4-minute",
        title: "One-minute changes",
        kind: "drill",
        minutes: 8,
        essential: true,
        chords: ["Em", "Am"],
        how: [
          "Sixty seconds on the clock. Em, strum, Am, strum, repeat. Count every clean change.",
          "Log the number in today's notes. Tomorrow you beat it.",
          "Most beginners get 8–15 on the first try. Thirty is a good week-one target.",
        ],
      },
      {
        id: "d4-anchor",
        title: "Find the shortcut",
        kind: "technique",
        minutes: 6,
        chords: ["Em", "Am"],
        how: [
          "Watch your hand closely as you swap Em and Am. Notice both shapes use middle and ring on fret 2.",
          "So the change is really just: move those two across one string, and add the index.",
          "Move all fingers together as one shape, not one finger at a time. This idea alone will save you weeks.",
        ],
      },
      {
        id: "d4-progression",
        title: "Two-chord song loop",
        kind: "song",
        minutes: 6,
        chords: ["Em", "Am"],
        how: [
          "Four downstrokes of Em, four of Am, eight times through without stopping.",
          "If you fumble a change, keep the strumming hand moving and catch up. Never stop the rhythm.",
        ],
      },
    ],
    extension: [
      {
        id: "d4-third",
        title: "Sneak preview: D major",
        kind: "technique",
        minutes: 8,
        chords: ["D"],
        how: [
          "Bottom four strings only. Index on G fret 2, ring on B fret 3, middle on high e fret 2.",
          "It's a cramped little triangle. Just meet it today — you'll drill it properly in week 3.",
        ],
      },
      {
        id: "d4-riff",
        title: "Riff maintenance",
        kind: "song",
        minutes: 6,
        bpm: { start: 75, target: 105 },
        how: ["Smoke on the Water, push the tempo up 5 bpm from yesterday's best."],
      },
    ],
    skills: ["changes", "minor-chords", "counting"],
  },

  {
    day: 5,
    week: 1,
    title: "Second riff, and it's a stadium one",
    goal: "Seven Nation Army — seven notes, all on one string.",
    win: "Two recognisable riffs in your pocket after five days.",
    warmup: w(),
    core: [
      {
        id: "d5-sna",
        title: "Seven Nation Army",
        kind: "song",
        minutes: 12,
        essential: true,
        bpm: { start: 60, target: 90 },
        how: [
          "All on the A string — the 5th string, second from the top.",
          "Frets: 7, 7, 10, 7, 5, 3, 2. That's the whole riff.",
          "Fingering: index on 7, pinky on 10, then index walks down 5, 3, 2. Slide your whole hand down rather than stretching.",
          "All downstrokes. Let each note ring its full length.",
        ],
        tab: tab([_, _, _, _, "--7--7--10--7--5--3--2--", _], {
          label: "The White Stripes — main riff",
        }),
        watch: "Seven Nation Army guitar riff lesson slow",
      },
      {
        id: "d5-both",
        title: "Both riffs back to back",
        kind: "song",
        minutes: 6,
        how: [
          "Smoke on the Water, then straight into Seven Nation Army, no pause between them.",
          "Switching material without stopping is its own skill. Start now.",
        ],
      },
      {
        id: "d5-chords",
        title: "Chord check-in",
        kind: "drill",
        minutes: 4,
        chords: ["Em", "Am"],
        how: ["One minute of Em↔Am changes. Beat yesterday's number or match it."],
      },
    ],
    extension: [
      {
        id: "d5-octave",
        title: "Why those frets?",
        kind: "theory",
        minutes: 6,
        how: [
          "Fret 7 on the A string is an E. Fret 5 is a D, fret 3 a C, fret 2 a B.",
          "So the riff is E-E-G-E-D-C-B. Notes have names and the names are useful.",
          "Learn just two landmarks today: 5th fret on the A string is D, 7th fret is E.",
        ],
      },
      {
        id: "d5-power",
        title: "Sneak preview: power chord",
        kind: "technique",
        minutes: 8,
        chords: ["E5"],
        how: [
          "Index on A string fret 2, middle on D string fret 2, low E open. Strum just those three.",
          "That's a power chord — the engine of every rock and metal song. Full drill tomorrow week.",
        ],
      },
    ],
    skills: ["single-note", "changes", "timing"],
  },

  {
    day: 6,
    week: 1,
    title: "Put the week together",
    goal: "Riffs and chords in one session, to a click.",
    win: "You can hold steady time — the thing that separates players from people holding guitars.",
    warmup: w(),
    core: [
      {
        id: "d6-metronome",
        title: "Strum on the click",
        kind: "drill",
        minutes: 8,
        essential: true,
        bpm: { start: 60, target: 80 },
        chords: ["Em", "Am"],
        how: [
          "Metronome at 60. One downstrum exactly on each click. Em for four clicks, Am for four clicks.",
          "The goal isn't the chord, it's landing on the click. Boring, and it's the difference between sounding like a player and sounding like a beginner.",
          "When it locks in, go to 70, then 80.",
        ],
      },
      {
        id: "d6-riffs",
        title: "Both riffs to the click",
        kind: "song",
        minutes: 8,
        bpm: { start: 70, target: 100 },
        how: [
          "Smoke on the Water and Seven Nation Army, both against the metronome.",
          "One note per click at first. Then two notes per click if you're comfortable.",
        ],
      },
    ],
    extension: [
      {
        id: "d6-updown",
        title: "Down and up strums",
        kind: "technique",
        minutes: 8,
        chords: ["Em"],
        how: [
          "Em held down. Strum down-up-down-up on eighth notes at 60 bpm.",
          "Upstrokes hit fewer strings and that's fine — that's how they're meant to sound.",
        ],
      },
      {
        id: "d6-week-review",
        title: "What's shaky?",
        kind: "theory",
        minutes: 5,
        how: [
          "Name the one thing that felt worst this week. Spend five minutes only on that.",
          "Then note it in the log. Naming your weak spot is how you stop avoiding it.",
        ],
      },
    ],
    skills: ["timing", "counting", "strum-basic", "changes"],
  },

  jamDay(7, 1, {
    title: "Jam day — week 1 done",
    goal: "No new material. Play the things you can play.",
    win: "One week in, and you didn't quit. That's the hard part.",
    play: [
      "Smoke on the Water, as fast as you can play it cleanly",
      "Seven Nation Army",
      "Em and Am, four strums each, round and round",
    ],
    record: "Play Smoke on the Water once and save it as 'week 1'.",
  }),
];
