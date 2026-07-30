import type { Lesson } from "../types";
import { warmupFor } from "./helpers";

const w = () => warmupFor(8);

export const WEEK_8: Lesson[] = [
  {
    day: 50,
    week: 8,
    title: "Pick your four",
    goal: "Choose the four things you'll be able to play on demand, forever.",
    win: "A set list. Not a list of things you're working on — things you can play.",
    warmup: w(),
    core: [
      {
        id: "d50-audit",
        title: "Repertoire audit",
        kind: "theory",
        minutes: 8,
        essential: true,
        how: [
          "List everything you've touched in seven weeks. Riffs, songs, the blues, your own riff.",
          "Score each one out of five for how confidently you could play it if someone asked right now.",
          "Write the list in today's notes. Being honest here is the whole exercise.",
        ],
      },
      {
        id: "d50-choose",
        title: "Choose four",
        kind: "song",
        minutes: 10,
        how: [
          "Pick one rock riff, one Hindi song, one blues (rhythm plus your solo), and one wildcard you love.",
          "These four get all your attention this week. Everything else waits.",
          "Four songs played well beats twenty played approximately. This is true at every level of playing.",
        ],
      },
      {
        id: "d50-run",
        title: "First run-through",
        kind: "song",
        minutes: 8,
        how: [
          "Play all four, start to finish, in order. No stopping.",
          "Note where it fell apart. That's your work for days 51 to 54.",
        ],
      },
    ],
    extension: [
      {
        id: "d50-listen",
        title: "Listen back to week 1",
        kind: "theory",
        minutes: 8,
        how: [
          "Play the recording you made on day 7. Then play today's.",
          "This is the payoff for having recorded every week. Enjoy it — you earned it.",
        ],
      },
    ],
    skills: ["repertoire", "performing"],
  },

  {
    day: 51,
    week: 8,
    title: "Polish the rhythm songs",
    goal: "Make your two chord-based songs genuinely clean.",
    win: "Two songs that sound finished.",
    warmup: w(),
    core: [
      {
        id: "d51-slow",
        title: "Slow and perfect",
        kind: "song",
        minutes: 12,
        essential: true,
        how: [
          "Play both chord songs at 70% speed. Every chord clean, every change on time.",
          "Any bar you can't play slowly, you can't actually play. Slow reveals everything.",
          "Only speed up once a full pass is flawless.",
        ],
      },
      {
        id: "d51-transitions",
        title: "Fix the joins",
        kind: "drill",
        minutes: 8,
        how: [
          "Verse into chorus, chorus into verse. Those joins are where songs collapse.",
          "Play the last bar of one section and the first bar of the next, ten times each.",
        ],
      },
      {
        id: "d51-dynamics",
        title: "Add the shape back",
        kind: "song",
        minutes: 6,
        how: [
          "Now put the dynamics in: quiet verses, loud choruses, arpeggios where they suit.",
          "Clean first, then musical. Both at once from the start rarely works.",
        ],
      },
    ],
    extension: [
      {
        id: "d51-sing",
        title: "Sing one of them",
        kind: "song",
        minutes: 12,
        how: [
          "Play and sing simultaneously. Badly is fine — nobody's listening.",
          "Being able to accompany yourself is what makes a guitar useful at gatherings.",
        ],
      },
    ],
    skills: ["repertoire", "changes", "dynamics", "performing"],
  },

  {
    day: 52,
    week: 8,
    title: "Polish the riff and the solo",
    goal: "Get your lead and riff material properly tight.",
    win: "A riff and a solo you can play without hesitating.",
    warmup: w(),
    core: [
      {
        id: "d52-riff",
        title: "Riff at full speed",
        kind: "song",
        minutes: 10,
        essential: true,
        how: [
          "Your chosen rock riff with a metronome. Find your clean maximum, then sit 5 bpm below it.",
          "Ten repetitions with zero mistakes. Reset the count if you slip.",
        ],
      },
      {
        id: "d52-solo",
        title: "Solo, note for note",
        kind: "song",
        minutes: 10,
        how: [
          "Your twelve-bar solo over the backing track. Same notes every time, deliberately.",
          "Bends fully in tune, vibrato controlled, phrase endings landing on target notes.",
        ],
        watch: "slow blues backing track in A 12 bar",
      },
      {
        id: "d52-together",
        title: "Rhythm then lead",
        kind: "song",
        minutes: 6,
        how: [
          "Twelve bars of blues rhythm, then twelve bars of your solo, without a gap.",
          "Switching roles mid-song is exactly what playing with other people requires.",
        ],
      },
    ],
    extension: [
      {
        id: "d52-hard",
        title: "The bit you keep avoiding",
        kind: "drill",
        minutes: 12,
        how: [
          "There's one thing you've been quietly skipping for weeks. The barre chord, the fast bit, the bend.",
          "Twelve minutes on only that. Avoidance is what caps people's playing.",
        ],
      },
    ],
    skills: ["repertoire", "improv", "metal-speed", "bends"],
  },

  {
    day: 53,
    week: 8,
    title: "Stand up and stop looking",
    goal: "Play without watching your hands, standing, like an actual performance.",
    win: "You can play without staring at the fretboard.",
    warmup: w(),
    core: [
      {
        id: "d53-stand",
        title: "Strap on, standing up",
        kind: "song",
        minutes: 10,
        essential: true,
        how: [
          "Guitar on a strap, standing. Set the strap so the guitar sits roughly where it did on your lap.",
          "Everything gets harder. The angle changes and your fretting hand has to work differently.",
          "Play all four pieces standing. Expect it to be noticeably worse today.",
        ],
      },
      {
        id: "d53-eyes",
        title: "Don't look",
        kind: "drill",
        minutes: 10,
        how: [
          "Play your chord songs looking straight ahead, not at your hands.",
          "Your fingers know more than you think. Trust them and they get faster.",
          "Start with chords, then try the pentatonic box blind.",
        ],
      },
    ],
    extension: [
      {
        id: "d53-perform",
        title: "Play for someone, properly",
        kind: "song",
        minutes: 12,
        how: [
          "Get an actual person in the room. Standing. Play two pieces.",
          "Nerves make your hands shake and your timing rush. The only fix is doing it more.",
        ],
      },
    ],
    skills: ["performing", "repertoire"],
  },

  {
    day: 54,
    week: 8,
    title: "Full run, no restarts",
    goal: "All four pieces, back to back, like a real short set.",
    win: "You can perform a set. From nothing, in eight weeks.",
    warmup: w(),
    core: [
      {
        id: "d54-set",
        title: "The whole set",
        kind: "song",
        minutes: 15,
        essential: true,
        how: [
          "All four pieces in order, no stopping between them, no restarts for any reason.",
          "Mistakes stay in. Recovering smoothly is the skill being tested, not perfection.",
          "Do this twice with a short break between.",
        ],
      },
      {
        id: "d54-order",
        title: "Choose the order",
        kind: "theory",
        minutes: 6,
        how: [
          "Open with the thing you're most confident about — it settles your nerves.",
          "Put the hardest piece third, not last. Finish on something that feels good.",
        ],
      },
    ],
    extension: [
      {
        id: "d54-worst",
        title: "One last patch",
        kind: "drill",
        minutes: 12,
        how: [
          "The weakest moment in the set — fix only that. Ten minutes, one bar.",
          "Then play the set once more.",
        ],
      },
    ],
    skills: ["performing", "repertoire"],
  },

  {
    day: 55,
    week: 8,
    title: "Record the set",
    goal: "One take of everything. Evidence.",
    win: "A recording of you playing four pieces on electric guitar.",
    warmup: w(),
    core: [
      {
        id: "d55-record",
        title: "One take",
        kind: "song",
        minutes: 15,
        essential: true,
        how: [
          "Phone recording, video if you can. All four pieces in one continuous take.",
          "Take three attempts maximum, then keep the best. Chasing perfection here defeats the point.",
          "Save it somewhere you won't lose it.",
        ],
      },
      {
        id: "d55-compare",
        title: "Week 1 versus week 8",
        kind: "theory",
        minutes: 8,
        how: [
          "Play the day 7 recording, then today's.",
          "Eight weeks. This is what showing up repeatedly does, and it's worth actually sitting with for a minute.",
        ],
      },
    ],
    extension: [
      {
        id: "d55-share",
        title: "Send it to someone",
        kind: "song",
        minutes: 8,
        how: [
          "Send the recording to one person who'll be pleased about it.",
          "Optional, and it does more for your motivation than any drill on this plan.",
        ],
      },
    ],
    skills: ["performing", "repertoire"],
  },

  {
    day: 56,
    week: 8,
    title: "What next",
    goal: "Work out honestly where you are and choose the next eight weeks.",
    win: "Done. And you know exactly what to do next.",
    warmup: w(),
    core: [
      {
        id: "d56-assess",
        title: "Honest assessment",
        kind: "theory",
        minutes: 10,
        essential: true,
        how: [
          "Open the Progress screen. Mark every skill as new, learning or solid. Be strict.",
          "Solid means you could do it cold, right now, without a warmup.",
          "Anything still 'learning' after eight weeks isn't a failure — it's just the next block of work.",
        ],
      },
      {
        id: "d56-next",
        title: "Choose your next eight weeks",
        kind: "theory",
        minutes: 10,
        how: [
          "Pick ONE direction and commit to it. Spreading across four genres again will stall you.",
          "Blues/lead: pentatonic boxes 2–5, the blues scale, learning solos note for note.",
          "Metal: downpicking to 180, drop D tuning, tight alternate picking, three-note-per-string patterns.",
          "Bollywood/singer-songwriter: all barre positions, fingerstyle, capo theory, playing and singing together.",
          "Rock rhythm: full song arrangements, playing along with records start to finish, playing with other people.",
          "Write the choice in today's notes. Then start again at day 1 with the new focus — the drills still apply.",
        ],
      },
      {
        id: "d56-play",
        title: "Play for the sake of it",
        kind: "song",
        minutes: 10,
        how: [
          "No metronome, no plan, no logging targets. Just play.",
          "This is the habit that matters. Everything else was scaffolding for it.",
        ],
      },
    ],
    extension: [
      {
        id: "d56-reset",
        title: "Keep going",
        kind: "theory",
        minutes: 5,
        how: [
          "You can reset the tracker from the Progress screen and run the eight weeks again with your new focus.",
          "The second pass through these drills is where the real gains show up, because now you know what they're for.",
        ],
      },
    ],
    skills: ["repertoire", "performing", "improv"],
  },
];
