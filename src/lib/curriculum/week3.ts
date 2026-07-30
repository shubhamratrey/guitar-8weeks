import type { Lesson } from "../types";
import { jamDay, warmupFor } from "./helpers";

const w = () => warmupFor(3);

export const WEEK_3: Lesson[] = [
  {
    day: 15,
    week: 3,
    title: "E, A and D",
    goal: "Three major chords. With Em and Am you can now play actual songs.",
    win: "Five chords total. Real song territory.",
    warmup: w(),
    core: [
      {
        id: "d15-e",
        title: "E major",
        kind: "technique",
        minutes: 6,
        essential: true,
        chords: ["E"],
        how: [
          "It's Em plus one finger: index on G string fret 1.",
          "Middle on A fret 2, ring on D fret 2, index on G fret 1. All six strings.",
          "Check every string rings. Place and lift fifteen times.",
        ],
      },
      {
        id: "d15-a",
        title: "A major",
        kind: "technique",
        minutes: 6,
        chords: ["A"],
        how: [
          "Three fingers side by side on fret 2: D, G and B strings. Skip the low E.",
          "It feels crowded. Angle your fingers slightly and come at the strings more from the side.",
          "If the high e string gets muted, that's your ring finger leaning. Sit it up straighter.",
        ],
      },
      {
        id: "d15-d",
        title: "D major",
        kind: "technique",
        minutes: 6,
        chords: ["D"],
        how: [
          "Index on G fret 2, ring on B fret 3, middle on high e fret 2. Bottom four strings only.",
          "A tight triangle. Curl your fingers well so they don't flatten across neighbours.",
          "Strum from the D string down. Hitting the low E sounds wrong and you'll hear it.",
        ],
      },
      {
        id: "d15-loop",
        title: "A - D - E loop",
        kind: "song",
        minutes: 5,
        chords: ["A", "D", "E"],
        how: [
          "Four downstrums each: A, D, E, back to A.",
          "This progression is thousands of blues and rock songs. You'll use it forever.",
        ],
      },
    ],
    extension: [
      {
        id: "d15-pairs",
        title: "Change drills, every pair",
        kind: "drill",
        minutes: 12,
        how: [
          "One minute each: A↔D, D↔E, E↔A, A↔Am, E↔Em.",
          "Log your best count. These five pairs cover most of what songs actually ask for.",
        ],
      },
    ],
    skills: ["open-ead", "changes", "fretting"],
  },

  {
    day: 16,
    week: 3,
    title: "G and C — the hard ones",
    goal: "The two shapes that trip up every beginner. Get them now.",
    win: "The big six: E, A, D, G, C, plus Em and Am.",
    warmup: w(),
    core: [
      {
        id: "d16-g",
        title: "G major",
        kind: "technique",
        minutes: 8,
        essential: true,
        chords: ["G"],
        how: [
          "Middle on low E fret 3, index on A fret 2, ring on high e fret 3. All six strings.",
          "Use middle-index-ring, NOT index-middle-ring. It feels worse today and saves you weeks later, because it leaves your pinky free.",
          "Some players use ring and pinky on the top strings instead. Try both, keep the one that changes to C faster.",
        ],
      },
      {
        id: "d16-c",
        title: "C major",
        kind: "technique",
        minutes: 8,
        chords: ["C"],
        how: [
          "Ring on A fret 3, middle on D fret 2, index on B fret 1. Strum from the A string.",
          "The open G and high e strings must ring clearly. That means curling, not flattening.",
          "Most common fault: the index finger lies across the high e and mutes it. Lift the knuckle.",
        ],
      },
      {
        id: "d16-gc",
        title: "G to C, the killer change",
        kind: "drill",
        minutes: 8,
        chords: ["G", "C"],
        how: [
          "One minute of changes. Expect a low number — this is genuinely the hardest common change.",
          "Move all three fingers as one unit. Don't place them one at a time.",
          "Fifteen in a minute is decent today. It'll be forty by week six.",
        ],
      },
    ],
    extension: [
      {
        id: "d16-gcd",
        title: "G - C - D, the pop progression",
        kind: "song",
        minutes: 10,
        chords: ["G", "C", "D"],
        how: [
          "Four strums each, round and round.",
          "Add Em and you have G-Em-C-D, which is an absurd number of songs.",
        ],
      },
      {
        id: "d16-cadd9",
        title: "The Cadd9 cheat",
        kind: "technique",
        minutes: 8,
        chords: ["Cadd9", "G"],
        how: [
          "Cadd9: same as G but move your index and middle to A fret 3 and D fret 2, keeping ring and pinky on the top strings.",
          "Now G to Cadd9 only moves two fingers. It sounds great and it's much faster than G to C.",
          "Loads of real songs use exactly this trick. It isn't cheating, it's arranging.",
        ],
      },
    ],
    skills: ["open-gc", "changes"],
  },

  {
    day: 17,
    week: 3,
    title: "A strum pattern that grooves",
    goal: "Down, down-up, up-down-up. The single most useful pattern in popular music.",
    win: "Your strumming stops sounding like a metronome and starts sounding like music.",
    warmup: w(),
    core: [
      {
        id: "d17-motion",
        title: "The hand never stops",
        kind: "technique",
        minutes: 7,
        essential: true,
        how: [
          "Count out loud: 1 and 2 and 3 and 4 and.",
          "Your hand moves DOWN on every number and UP on every 'and'. Continuously. Like a metronome arm.",
          "To leave a strum out, you keep moving but miss the strings. You never pause the hand.",
          "Get this and strumming patterns stop being memorised sequences. Miss it and every pattern stays hard forever.",
        ],
      },
      {
        id: "d17-pattern",
        title: "D - DU - UDU",
        kind: "drill",
        minutes: 10,
        bpm: { start: 60, target: 90 },
        chords: ["Em"],
        how: [
          "Full pattern: down on 1, down on 2, up on 'and' of 2, up on 'and' of 3, down on 4, up on 'and' of 4.",
          "The gap is on beat 3 — your hand goes down but misses the strings.",
          "Hold Em and drill only the strumming hand until it's automatic. Slowly. 60 bpm.",
        ],
      },
      {
        id: "d17-apply",
        title: "Pattern over changes",
        kind: "song",
        minutes: 6,
        chords: ["Em", "C", "G", "D"],
        how: [
          "One bar of the pattern per chord: Em, C, G, D.",
          "Chord changes happen on the '4 and' — you switch while your hand is still moving.",
        ],
      },
    ],
    extension: [
      {
        id: "d17-zombie",
        title: "Zombie — The Cranberries",
        kind: "song",
        minutes: 12,
        chords: ["Em", "C", "G", "D"],
        how: [
          "Em, C, G, D. One bar each, using today's pattern. That's the entire song.",
          "Your first full song from beginning to end. Play it four times through.",
        ],
        watch: "Zombie Cranberries guitar lesson easy chords",
      },
    ],
    skills: ["strum-basic", "changes", "counting"],
  },

  {
    day: 18,
    week: 3,
    title: "Change drills, seriously",
    goal: "Boring day. Highest payoff day of the week.",
    win: "Chord changes stop being the thing that ruins every song.",
    warmup: w(),
    core: [
      {
        id: "d18-grid",
        title: "The change grid",
        kind: "drill",
        minutes: 14,
        essential: true,
        chords: ["G", "C", "D", "Em", "Am"],
        how: [
          "One minute each, back to back: G↔C, C↔D, D↔Em, Em↔G, Am↔C, G↔D.",
          "Count clean changes for each and write the six numbers in today's notes.",
          "This is the most efficient practice on the entire plan. It is also the dullest. Do it anyway — twice a week is enough.",
        ],
      },
      {
        id: "d18-slow",
        title: "Slow-motion changes",
        kind: "drill",
        minutes: 6,
        how: [
          "Pick your worst pair from the grid. Change between them at a quarter speed, watching your hand.",
          "Find the finger that moves last. That finger is your bottleneck. Move it first for the next fifty reps.",
        ],
      },
    ],
    extension: [
      {
        id: "d18-song",
        title: "Zombie again, faster",
        kind: "song",
        minutes: 8,
        chords: ["Em", "C", "G", "D"],
        how: ["Play it through four times. Notice how much easier it got after the grid."],
      },
      {
        id: "d18-boulevard",
        title: "Boulevard of Broken Dreams",
        kind: "song",
        minutes: 10,
        chords: ["Em", "G", "D", "A"],
        how: [
          "Em, G, D, A. Two bars each, straightforward strumming.",
          "Beginner-friendly key. The record is a semitone away, so it won't match exactly — it still sounds right on its own.",
        ],
        watch: "Boulevard of Broken Dreams easy guitar chords Em G D A",
      },
    ],
    skills: ["changes", "open-gc", "open-ead"],
  },

  {
    day: 19,
    week: 3,
    title: "Am - F - C - G, the engine",
    goal: "One shape set that unlocks a huge amount of Hindi music.",
    win: "The four shapes behind an enormous number of Bollywood songs.",
    warmup: w(),
    core: [
      {
        id: "d19-fmaj7",
        title: "F without the barre",
        kind: "technique",
        minutes: 7,
        essential: true,
        chords: ["Fmaj7"],
        how: [
          "Full F needs a barre and that's week 6. Use Fmaj7 for now: ring on D fret 3, middle on G fret 2, index on B fret 1, high e open.",
          "Strum the top four strings only. It sounds lovely and it works in place of F in almost every song.",
          "This substitution is the reason you can start playing songs today instead of in three weeks.",
        ],
      },
      {
        id: "d19-set",
        title: "The four-shape loop",
        kind: "drill",
        minutes: 10,
        chords: ["Am", "Fmaj7", "C", "G"],
        how: [
          "Am, Fmaj7, C, G. Four strums each, round and round until it's smooth.",
          "Then use the D-DU-UDU pattern from day 17.",
          "Learn this as one connected movement, not four separate chords.",
        ],
      },
      {
        id: "d19-why",
        title: "Why this set matters",
        kind: "theory",
        minutes: 5,
        how: [
          "Put a capo on and these same four shapes move into a new key without changing your fingers.",
          "Most Hindi film songs sit in a key that a capo plus these shapes will cover.",
          "So you're not learning one song. You're learning the machine that plays dozens.",
        ],
      },
    ],
    extension: [
      {
        id: "d19-capo",
        title: "Meet the capo",
        kind: "technique",
        minutes: 8,
        how: [
          "Clamp it just behind a fret, not on top of it. Straight across, firm but not crushing.",
          "Capo on fret 2 turns your Am shape into Bm, C into D, G into A, F into G.",
          "Play the four-shape loop with the capo at 2, then 4. Same fingers, different key. Tune check after moving it.",
          "No capo yet? Get one. They're cheap and it's the single most useful accessory for playing songs.",
        ],
      },
    ],
    skills: ["capo", "changes", "minor-chords", "open-gc"],
  },

  {
    day: 20,
    week: 3,
    title: "Your first Hindi song",
    goal: "Put the shape set to work on something you actually want to play.",
    win: "You can play a song people will sing along to.",
    warmup: w(),
    core: [
      {
        id: "d20-song",
        title: "Tum Hi Ho / Kabira — pick one",
        kind: "song",
        minutes: 15,
        essential: true,
        chords: ["Am", "Fmaj7", "C", "G"],
        how: [
          "Capo on fret 2. Play the shapes Am, Fmaj7, C, G — you're actually sounding Bm, G, D, A.",
          "Both songs live comfortably on this shape set. Start with whichever you can sing along to.",
          "Two bars per chord, slow strumming, sing or hum the melody over it.",
          "Check the linked lesson for the exact key and any capo tweak — versions differ and the shapes stay the same.",
        ],
        watch: "Tum Hi Ho guitar lesson easy chords capo",
      },
      {
        id: "d20-sing",
        title: "Play and sing at once",
        kind: "drill",
        minutes: 8,
        how: [
          "Hum the melody while you strum. Not singing properly, just humming.",
          "It'll wreck your strumming for a bit. Slow the strumming right down until both fit.",
          "Doing two things at once is the skill. It arrives suddenly, usually after a few days of it feeling impossible.",
        ],
      },
    ],
    extension: [
      {
        id: "d20-second",
        title: "A second song, same shapes",
        kind: "song",
        minutes: 12,
        chords: ["Am", "Fmaj7", "C", "G"],
        how: [
          "Pick another song on this shape set — Channa Mereya, Ae Dil Hai Mushkil, Kabira, whichever you like.",
          "Notice how little new work the second song takes. That's the shape set paying off.",
        ],
        watch: "Channa Mereya guitar chords lesson capo",
      },
    ],
    skills: ["capo", "strum-basic", "repertoire", "changes"],
  },

  jamDay(21, 3, {
    title: "Jam day — three weeks in",
    goal: "Rock riffs and a Hindi song in the same session.",
    win: "You can play across two completely different styles.",
    play: [
      "Zombie, all the way through",
      "Your Hindi song with the capo on",
      "Iron Man and Back in Black",
      "G-C-D and Am-F-C-G loops until they're automatic",
    ],
    record: "Record your Hindi song and save it as 'week 3'.",
  }),
];
