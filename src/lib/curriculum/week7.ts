import type { Lesson } from "../types";
import { _, jamDay, tab, warmupFor } from "./helpers";

const w = () => warmupFor(7);

export const WEEK_7: Lesson[] = [
  {
    day: 43,
    week: 7,
    title: "Hammer-ons and pull-offs",
    goal: "Notes made by the fretting hand alone. Fast, smooth, effortless.",
    win: "Your lead lines start to flow instead of stutter.",
    warmup: w(),
    core: [
      {
        id: "d43-hammer",
        title: "Hammer-ons",
        kind: "technique",
        minutes: 10,
        essential: true,
        how: [
          "Pick the G string at fret 5. While it's still ringing, slam your ring finger down on fret 7.",
          "You get a second note without picking again. Hammer firmly and land right behind the fret.",
          "Weak, quiet hammer-ons mean you're being too gentle. It's a percussive move.",
        ],
        tab: tab([_, _, "--5h7--", _, _, _], { label: "Hammer-on: 'h' means hammer" }),
      },
      {
        id: "d43-pull",
        title: "Pull-offs",
        kind: "technique",
        minutes: 8,
        how: [
          "Fret the G string at 7 with your ring finger AND at 5 with your index at the same time.",
          "Pick it, then flick the ring finger off sideways. The index note rings out.",
          "Flick down and off the string, don't lift straight up. The flick is what makes the note sound.",
        ],
        tab: tab([_, _, "--7p5--", _, _, _], { label: "Pull-off: 'p' means pull-off" }),
      },
      {
        id: "d43-combine",
        title: "Roll them together",
        kind: "drill",
        minutes: 6,
        bpm: { start: 60, target: 90 },
        how: [
          "Pick once, then hammer up and pull off, over and over: 5h7p5h7p5.",
          "One pick stroke, five notes. This is where speed comes from cheaply.",
        ],
      },
    ],
    extension: [
      {
        id: "d43-scale",
        title: "Pentatonic with hammer-ons",
        kind: "drill",
        minutes: 12,
        bpm: { start: 55, target: 80 },
        how: [
          "Run the pentatonic box, but pick only the first note on each string and hammer the second.",
          "Half the picking, twice as smooth.",
        ],
      },
    ],
    skills: ["hammer-pull", "pentatonic", "alt-picking"],
  },

  {
    day: 44,
    week: 7,
    title: "Slides",
    goal: "Move between notes without a break in the sound.",
    win: "Your solos connect instead of jumping around.",
    warmup: w(),
    core: [
      {
        id: "d44-slide",
        title: "Basic slide",
        kind: "technique",
        minutes: 10,
        essential: true,
        how: [
          "Pick the G string at fret 5 and slide your finger up to fret 7 without lifting or re-picking.",
          "Keep steady pressure the whole way. Let up and the note dies mid-slide.",
          "Then slide back down. Land exactly on the target fret, not near it.",
        ],
        tab: tab([_, _, "--5/7--7\\5--", _, _, _], {
          label: "Slide up ( / ) and slide down ( \\ )",
        }),
      },
      {
        id: "d44-long",
        title: "Long slides",
        kind: "drill",
        minutes: 6,
        how: [
          "Slide from fret 3 all the way to fret 12 on the G string, and back.",
          "Great for learning where you are on the neck by feel rather than by counting.",
        ],
      },
      {
        id: "d44-connect",
        title: "Slide between boxes",
        kind: "technique",
        minutes: 8,
        how: [
          "Play the pentatonic box at fret 5, then slide your index up to fret 7 and play the box shape there.",
          "Now you're moving around the neck instead of being trapped in one block.",
        ],
      },
    ],
    extension: [
      {
        id: "d44-all",
        title: "Everything in one phrase",
        kind: "song",
        minutes: 12,
        how: [
          "Build one phrase using a slide, a hammer-on, a bend and vibrato.",
          "Four techniques, one line. That's what a real solo is made of.",
        ],
      },
    ],
    skills: ["slides", "hammer-pull", "pentatonic", "licks"],
  },

  {
    day: 45,
    week: 7,
    title: "Four licks to own",
    goal: "A small vocabulary of phrases you can play without thinking.",
    win: "Four licks in the bank. Enough to improvise with.",
    warmup: w(),
    core: [
      {
        id: "d45-lick1",
        title: "Lick 1 — the descent",
        kind: "technique",
        minutes: 6,
        essential: true,
        bpm: { start: 60, target: 85 },
        how: ["Straight down the top of the box. Even, unhurried, let the last note ring."],
        tab: tab(["--8--5----------", "-------8--5-----", "-------------7--", _, _, _], {
          label: "Lick 1",
        }),
      },
      {
        id: "d45-lick2",
        title: "Lick 2 — the bend",
        kind: "technique",
        minutes: 6,
        how: ["Bend the G string up a full step, hold it, add vibrato, then resolve down."],
        tab: tab([_, "--------8--", "--7b9------", _, _, _], { label: "Lick 2" }),
      },
      {
        id: "d45-lick3",
        title: "Lick 3 — the roll",
        kind: "technique",
        minutes: 6,
        bpm: { start: 60, target: 90 },
        how: ["Hammer-on and pull-off rolls on the G string. One pick stroke, lots of notes."],
        tab: tab([_, _, "--5h7p5--7p5--", _, _, _], { label: "Lick 3" }),
      },
      {
        id: "d45-lick4",
        title: "Lick 4 — the double stop",
        kind: "technique",
        minutes: 6,
        how: [
          "Play the B and high e strings together at fret 5, then both at fret 8. Two notes at once.",
          "Instantly sounds like classic rock lead playing.",
        ],
        tab: tab(["--5-----8--", "--5-----8--", _, _, _, _], { label: "Lick 4" }),
      },
    ],
    extension: [
      {
        id: "d45-memorise",
        title: "No looking",
        kind: "drill",
        minutes: 12,
        how: [
          "Close the app. Play all four licks from memory, three times each.",
          "A lick you have to read isn't a lick you own yet.",
        ],
      },
    ],
    skills: ["licks", "bends", "hammer-pull", "vibrato"],
  },

  {
    day: 46,
    week: 7,
    title: "Build a solo",
    goal: "Assemble your licks into twelve bars that make sense.",
    win: "A solo you can play on demand.",
    warmup: w(),
    core: [
      {
        id: "d46-map",
        title: "Map the twelve bars",
        kind: "theory",
        minutes: 7,
        essential: true,
        how: [
          "Bars 1–4: lick 1, then leave two bars of space. Space is not a failure to play.",
          "Bars 5–8: lick 2, then lick 4.",
          "Bars 9–12: lick 3, then finish on the root note (A, fret 5 on the low E) with vibrato.",
          "Write it down. A solo with a plan beats noodling every time.",
        ],
      },
      {
        id: "d46-play",
        title: "Play it over the track",
        kind: "song",
        minutes: 12,
        how: [
          "Blues backing track in A. Play your twelve-bar solo exactly as planned.",
          "Five times through. Same solo each time — you're building something repeatable, not improvising yet.",
        ],
        watch: "slow blues backing track in A 12 bar",
      },
    ],
    extension: [
      {
        id: "d46-vary",
        title: "Change one thing",
        kind: "song",
        minutes: 12,
        how: [
          "Play the same solo but swap one lick for a different one each time through.",
          "This is the bridge between playing a written solo and genuinely improvising.",
        ],
      },
    ],
    skills: ["improv", "licks", "12-bar", "performing"],
  },

  {
    day: 47,
    week: 7,
    title: "Phrasing",
    goal: "Why some players sound great with five notes and others sound bad with fifty.",
    win: "Your playing starts to sound like it means something.",
    warmup: w(),
    core: [
      {
        id: "d47-space",
        title: "Play half as much",
        kind: "drill",
        minutes: 10,
        essential: true,
        how: [
          "Over the backing track, play a short phrase then stay completely silent for four beats. Repeat for twelve bars.",
          "It'll feel wrong and empty. Record it and listen back — it sounds far better than you think.",
          "Every beginner plays too many notes. This is the single biggest upgrade available to you right now.",
        ],
      },
      {
        id: "d47-call",
        title: "Call and response",
        kind: "drill",
        minutes: 8,
        how: [
          "Play a phrase. Then play an answer to it — similar shape, different ending.",
          "Question, then answer. That's how solos hold attention.",
        ],
      },
      {
        id: "d47-target",
        title: "Land on the right note",
        kind: "theory",
        minutes: 6,
        how: [
          "End your phrases on A (fret 5, low E string, or fret 5 on the high e). It's the home note in A minor.",
          "Ending anywhere else sounds unresolved. Sometimes you want that. Usually you don't.",
        ],
      },
    ],
    extension: [
      {
        id: "d47-copy",
        title: "Steal from a real solo",
        kind: "song",
        minutes: 12,
        how: [
          "Find a slow blues solo you like. Learn just four notes of it — one phrase.",
          "Copying phrases is how every player you admire learned to phrase.",
        ],
      },
    ],
    skills: ["improv", "licks", "vibrato", "performing"],
  },

  {
    day: 48,
    week: 7,
    title: "Improvise for real",
    goal: "Twelve bars, no plan, no stopping.",
    win: "You can make something up on the spot. That's the whole point of learning a scale.",
    warmup: w(),
    core: [
      {
        id: "d48-improv",
        title: "Twelve bars, made up",
        kind: "song",
        minutes: 14,
        essential: true,
        how: [
          "Backing track on. Play whatever comes out of the pentatonic box. Do not stop, do not restart.",
          "It will be bad at first. Play four more choruses. It gets noticeably better within one session.",
          "One rule: leave space. Silence is allowed and it's usually an improvement.",
        ],
        watch: "slow blues backing track in A 12 bar",
      },
      {
        id: "d48-limits",
        title: "Three notes only",
        kind: "drill",
        minutes: 8,
        how: [
          "Improvise twelve bars using only three notes from the box.",
          "Restriction forces you into rhythm and phrasing rather than hunting for notes. It's the fastest way to sound better.",
        ],
      },
    ],
    extension: [
      {
        id: "d48-record",
        title: "Record and be honest",
        kind: "song",
        minutes: 10,
        how: [
          "Record twelve bars. Listen back. Write down one thing that worked and one that didn't.",
          "That's a practice plan for next week, generated by you rather than by an app.",
        ],
      },
    ],
    skills: ["improv", "pentatonic", "performing", "licks"],
  },

  jamDay(49, 7, {
    title: "Jam day — you're a lead player now",
    goal: "Solo over a track and enjoy it.",
    win: "Seven weeks. You improvise over changes.",
    play: [
      "Your twelve-bar solo",
      "Free improvisation over the backing track",
      "All four licks from memory",
      "Any song you feel like",
    ],
    record: "Record your solo as 'week 7'.",
  }),
];
