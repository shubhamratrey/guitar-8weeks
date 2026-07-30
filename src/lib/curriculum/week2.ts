import type { Lesson } from "../types";
import { _, jamDay, tab, warmupFor } from "./helpers";

const w = () => warmupFor(2);

export const WEEK_2: Lesson[] = [
  {
    day: 8,
    week: 2,
    title: "The power chord",
    goal: "Two fingers, one shape, movable anywhere. This unlocks rock and metal.",
    win: "You can play a chord that sounds heavy.",
    warmup: w(),
    core: [
      {
        id: "d8-shape",
        title: "The movable shape",
        kind: "technique",
        minutes: 8,
        essential: true,
        chords: ["G5", "C5"],
        how: [
          "Index on low E fret 3. Ring finger on A string fret 5. Strum ONLY those two strings.",
          "That's G5. Now slide the identical shape to fret 5 and it's A5. Fret 8, it's C5.",
          "One shape, twelve chords. Nothing else on the guitar gives you this much for this little.",
          "Add your pinky on the D string, same fret as the ring finger, for a fatter three-string version.",
        ],
      },
      {
        id: "d8-open",
        title: "Open power chords",
        kind: "technique",
        minutes: 7,
        chords: ["E5", "A5", "D5"],
        how: [
          "E5: low E open, index on A fret 2, middle on D fret 2. Three strings.",
          "A5: A open, index on D fret 2, middle on G fret 2.",
          "D5: D open, index on G fret 2, ring on B fret 3.",
          "These three come up constantly in rock. Learn them as shapes, not as fret numbers.",
        ],
      },
      {
        id: "d8-mute",
        title: "Silence the other strings",
        kind: "technique",
        minutes: 5,
        how: [
          "A power chord with the high strings ringing sounds like a mess. Deaden them.",
          "Let the side of your strumming palm rest lightly on the strings you're not playing.",
          "Strum hard across all six. Only the power chord should sound. That's the goal.",
        ],
      },
    ],
    extension: [
      {
        id: "d8-ladder",
        title: "Power chord ladder",
        kind: "drill",
        minutes: 8,
        bpm: { start: 60, target: 90 },
        how: [
          "The two-finger shape at fret 3, then 5, then 7, then 8, then 10, then 12, and back down.",
          "Four strums on each. Slide, don't hop — keep light contact with the strings as you move.",
        ],
      },
      {
        id: "d8-distort",
        title: "Turn up the gain",
        kind: "theory",
        minutes: 5,
        how: [
          "Push the gain/drive on your amp up to about 7. Play your power chords.",
          "Notice that distortion hides nothing — it exposes sloppy muting. Now you know why muting matters.",
        ],
      },
    ],
    skills: ["powerchord", "powerchord-move", "noise-control"],
  },

  {
    day: 9,
    week: 2,
    title: "Palm muting",
    goal: "The percussive chug behind every rock and metal rhythm part.",
    win: "That tight 'chunk' sound instead of an open ringing blur.",
    warmup: w(),
    core: [
      {
        id: "d9-palm",
        title: "Find the palm mute spot",
        kind: "technique",
        minutes: 8,
        essential: true,
        chords: ["E5"],
        how: [
          "Rest the fleshy side of your picking palm on the strings, right where they meet the bridge.",
          "Pick E5. Too far forward and the note dies completely. Too far back and nothing changes.",
          "You want it short and thick — the note still has pitch but it's clipped. Hunt for that spot.",
          "Keep the palm planted there while you pick. It doesn't lift between notes.",
        ],
      },
      {
        id: "d9-chug",
        title: "Eighth-note chugs",
        kind: "drill",
        minutes: 8,
        bpm: { start: 70, target: 100 },
        chords: ["E5"],
        how: [
          "E5 palm muted. All downstrokes, two per click at 70 bpm.",
          "Every chug identical in length and volume. Consistency is the entire skill here.",
          "Your forearm will get tired. That's the muscle you're building.",
        ],
        tab: tab([_, _, _, "-2-2-2-2-2-2-2-2-", "-2-2-2-2-2-2-2-2-", "-0-0-0-0-0-0-0-0-"], {
          label: "E5 palm-muted chugs",
          note: "Every note muted. Marked P.M. in real tab.",
        }),
      },
      {
        id: "d9-openclose",
        title: "Muted and open together",
        kind: "drill",
        minutes: 5,
        how: [
          "Seven muted chugs, then one open ringing strum, repeat.",
          "Lifting the palm at exactly the right moment is the trick. This shows up in real songs constantly.",
        ],
      },
    ],
    extension: [
      {
        id: "d9-move",
        title: "Chug and move",
        kind: "drill",
        minutes: 8,
        bpm: { start: 65, target: 85 },
        how: [
          "Four muted chugs on E5, four on G5 (fret 3), four on A5 (fret 5), back to E5.",
          "Keep the palm down through the moves. Don't let the rhythm break while you shift.",
        ],
      },
      {
        id: "d9-riffs",
        title: "Old riffs, new touch",
        kind: "song",
        minutes: 6,
        how: ["Play Seven Nation Army palm muted. Completely different feel, same notes."],
      },
    ],
    skills: ["palm-mute", "downpicking", "powerchord"],
  },

  {
    day: 10,
    week: 2,
    title: "Downpicking that doesn't wobble",
    goal: "Even, relentless downstrokes at a controlled tempo.",
    win: "You can hold a driving rhythm for a full minute without falling apart.",
    warmup: w(),
    core: [
      {
        id: "d10-down",
        title: "Sixty seconds, no stopping",
        kind: "drill",
        minutes: 10,
        essential: true,
        bpm: { start: 80, target: 110 },
        chords: ["E5"],
        how: [
          "E5 palm muted, eighth notes, all downstrokes, at 80 bpm. One full minute without a break.",
          "Watch for the classic failure: it speeds up when you get tense. Stay locked to the click.",
          "Made it? Add 5 bpm and go again. Fell apart? Drop 10 and rebuild.",
          "This drill is the whole foundation of metal rhythm playing. It's also the most honest test of your timing.",
        ],
      },
      {
        id: "d10-accent",
        title: "Accent the downbeat",
        kind: "drill",
        minutes: 6,
        bpm: { start: 75, target: 95 },
        how: [
          "Same chugging, but hit the 1 of every four notes noticeably harder.",
          "Now you have a groove rather than a machine gun. Dynamics are what make rhythm feel good.",
        ],
      },
      {
        id: "d10-changes",
        title: "Power chord changes in time",
        kind: "drill",
        minutes: 5,
        how: [
          "Two bars of E5, two bars of A5, two of D5, two of E5, on repeat at 80 bpm.",
          "The change must happen exactly on the beat, not a fraction before or after.",
        ],
        chords: ["E5", "A5", "D5"],
      },
    ],
    extension: [
      {
        id: "d10-endurance",
        title: "Endurance push",
        kind: "drill",
        minutes: 10,
        bpm: { start: 100, target: 130 },
        how: [
          "Thirty seconds of chugging at 100. Rest thirty. Repeat five times, adding 5 bpm each round.",
          "Stop immediately if your forearm hurts rather than aches. Tendons don't forgive.",
        ],
      },
      {
        id: "d10-play-along",
        title: "Play with a real drummer",
        kind: "song",
        minutes: 8,
        how: [
          "Search a 'rock drum backing track 90 bpm' on YouTube and chug along.",
          "Far more fun than a metronome, and much less forgiving.",
        ],
        watch: "rock drum backing track 90 bpm",
      },
    ],
    skills: ["downpicking", "palm-mute", "timing", "dynamics"],
  },

  {
    day: 11,
    week: 2,
    title: "Iron Man",
    goal: "Your first full song built on power chords.",
    win: "A riff that makes people in the room turn around.",
    warmup: w(),
    core: [
      {
        id: "d11-ironman",
        title: "Black Sabbath — Iron Man",
        kind: "song",
        minutes: 14,
        essential: true,
        bpm: { start: 60, target: 85 },
        chords: ["B5", "D5", "E5"],
        how: [
          "Power chords with the root on the A string: index on A, ring on D two frets higher.",
          "B5 = A string 2. D5 = A string 5. E5 = A string 7. Move the same shape.",
          "Rhythm is slow and heavy. Two strums per chord, let them ring. Don't rush it — the weight is the point.",
          "Gain up. This riff needs distortion to sound right.",
        ],
        tab: tab([_, _, _, "--4--4--7--7--9--9--7--7--4--", "--2--2--5--5--7--7--5--5--2--", _], {
          label: "Iron Man — main riff",
          simplified: true,
          note: "Simplified rhythm. Get the notes and the feel first; the exact note lengths come from listening to the record.",
        }),
        watch: "Iron Man guitar riff lesson slow beginner",
      },
      {
        id: "d11-slide",
        title: "Clean shape moves",
        kind: "drill",
        minutes: 6,
        how: [
          "Practise only the moves: fret 2 to fret 5 to fret 7 and back, in time, keeping the shape.",
          "Release finger pressure as you slide, then press again when you land. Grinding the strings kills your speed and your fingertips.",
        ],
      },
    ],
    extension: [
      {
        id: "d11-full",
        title: "Learn the intro too",
        kind: "song",
        minutes: 10,
        how: [
          "The song opens with a slow bending 'I am Iron Man' figure before the main riff.",
          "Look it up and add it. Having a real intro makes it feel like a performance.",
        ],
        watch: "Iron Man intro guitar lesson",
      },
      {
        id: "d11-along",
        title: "Play with the record",
        kind: "song",
        minutes: 8,
        how: [
          "Put the actual track on and play along. You'll be too slow at first — that's information, not failure.",
        ],
      },
    ],
    skills: ["powerchord-move", "palm-mute", "repertoire", "timing"],
  },

  {
    day: 12,
    week: 2,
    title: "Moving power chords with intent",
    goal: "Stop counting frets. Start knowing where the notes are.",
    win: "You can find any power chord on the neck in a second.",
    warmup: w(),
    core: [
      {
        id: "d12-notes",
        title: "Six landmark notes",
        kind: "theory",
        minutes: 7,
        essential: true,
        how: [
          "Low E string: fret 3 = G, fret 5 = A, fret 7 = B, fret 8 = C, fret 10 = D, fret 12 = E.",
          "A string: fret 2 = B, fret 3 = C, fret 5 = D, fret 7 = E, fret 10 = G.",
          "Learn only these ten. Play each one and say its name out loud.",
          "A power chord is named after its lowest note. Know the note, know the chord.",
        ],
      },
      {
        id: "d12-call",
        title: "Name it, play it",
        kind: "drill",
        minutes: 7,
        how: [
          "Say a chord name at random — G5, C5, D5, A5, E5, B5 — then find it in under two seconds.",
          "Both strings. Low E root and A string root.",
          "This is the drill that turns tab-reading into actually playing.",
        ],
      },
      {
        id: "d12-prog",
        title: "Progressions by name",
        kind: "song",
        minutes: 6,
        how: [
          "Play G5 - C5 - D5 - G5 without looking anything up. Four strums each.",
          "Then A5 - D5 - E5 - A5. That's the most common progression in rock music.",
        ],
      },
    ],
    extension: [
      {
        id: "d12-teenspirit",
        title: "Smells Like Teen Spirit",
        kind: "song",
        minutes: 12,
        bpm: { start: 70, target: 115 },
        chords: ["F5", "Bb5"],
        how: [
          "Four power chords: F5, Bb5, Ab5, Db5. Each played four times.",
          "F5 = low E fret 1. Bb5 = A string fret 1. Ab5 = low E fret 4. Db5 = A string fret 4.",
          "So it's two shapes, alternating strings, moving up three frets. Once you see that it's easy.",
        ],
        tab: tab([_, _, _, "------3------------6---", "--3---1------6-----4---", "--1----------4---------"], {
          label: "Teen Spirit — F5 Bb5 Ab5 Db5",
          note: "Each chord repeats four times in the actual riff.",
        }),
        watch: "Smells Like Teen Spirit guitar lesson beginner",
      },
    ],
    skills: ["powerchord-move", "repertoire"],
  },

  {
    day: 13,
    week: 2,
    title: "Back in Black",
    goal: "Groove, space, and the swagger of a rhythm part that breathes.",
    win: "Three rock riffs you can play on demand.",
    warmup: w(),
    core: [
      {
        id: "d13-bib",
        title: "AC/DC — Back in Black",
        kind: "song",
        minutes: 14,
        essential: true,
        bpm: { start: 60, target: 90 },
        chords: ["E5", "D5", "A5"],
        how: [
          "Three chords: E5, then D5, then A5. Open, ringing, not palm muted.",
          "The magic is in the gaps. Stop the strings with your palm between chords so there's real silence.",
          "Count 1-2-3-4 out loud and place the chords deliberately. Rushing this riff kills it stone dead.",
          "Medium gain, not full metal distortion. AC/DC is cleaner than people think.",
        ],
        tab: tab([_, _, _, "----------7--7------5--5--", "----------7--7------5--5--", "--0--0--0-----------------"], {
          label: "Back in Black — opening figure",
          simplified: true,
          note: "Simplified. Get E5 → D5 → A5 with clean silence between them, then copy the exact rhythm from the record.",
        }),
        watch: "Back in Black guitar riff lesson beginner slow",
      },
      {
        id: "d13-stops",
        title: "Practise the silence",
        kind: "drill",
        minutes: 6,
        how: [
          "Strum E5, then kill it dead with your palm on beat 3. Silence for two beats. Repeat.",
          "Controlling when notes STOP is as much a technique as starting them, and almost nobody drills it.",
        ],
      },
    ],
    extension: [
      {
        id: "d13-three",
        title: "All three riffs, no stopping",
        kind: "song",
        minutes: 10,
        how: [
          "Iron Man, then Teen Spirit, then Back in Black. Straight through, no restarts.",
          "This is a set list now. Two weeks in.",
        ],
      },
      {
        id: "d13-sandman",
        title: "Metallica chug, in the style of",
        kind: "drill",
        minutes: 8,
        bpm: { start: 80, target: 110 },
        how: [
          "Palm muted E5 chugs for seven beats, then a quick 3-2-0 walk down on the A string.",
          "That shape of riff — chug, chug, chug, fill — is the backbone of Enter Sandman and a hundred others.",
        ],
        tab: tab([_, _, _, _, "----------------3-2-0-", "-0-0-0-0-0-0-0--------"], {
          label: "Chug and fill",
          simplified: true,
          note: "An exercise in the style of Enter Sandman, not the exact part.",
        }),
      },
    ],
    skills: ["powerchord", "dynamics", "noise-control", "repertoire"],
  },

  jamDay(14, 2, {
    title: "Jam day — two weeks in",
    goal: "Play your three riffs like you mean it.",
    win: "You have a set. Short, but real.",
    play: [
      "Iron Man",
      "Back in Black",
      "Smells Like Teen Spirit",
      "Smoke on the Water and Seven Nation Army, for old times' sake",
    ],
    record: "Record Iron Man and save it as 'week 2'.",
  }),
];
