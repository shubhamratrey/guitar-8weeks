import type { Score } from "./score";

export type Language = "hindi" | "english";

export interface Song {
  id: string;
  title: string;
  artist: string;
  language: Language;
  /** 1 = playable in week 1–3, 2 = needs barre or picking, 3 = a project. */
  difficulty: 1 | 2 | 3;
  /** Capo fret for the shapes listed below, when one is normally used. */
  capo?: number;
  /**
   * Shapes commonly used to play it. Chord choices and keys vary between
   * versions — treat these as a starting point and check a full tab.
   */
  chords: string[];
  /**
   * The main progression a beginner actually plays, one chord per bar, so it can
   * be played along with in-app. Empty for riff-based songs and for pieces that
   * only make sense from a full arrangement.
   */
  loop: string[];
  /**
   * A complete, note-for-note tab. Only present for public-domain melodies,
   * traditional material, and exercises written for this app.
   */
  score?: Score;
  /** True when the piece is public domain, traditional, or original to the app. */
  open?: boolean;
  /** Suggested strumming or picking approach. */
  strum?: string;
  /** Sensible starting tempo for playing along. */
  bpm?: number;
  /** What playing this song actually trains. */
  teaches: string;
  /** Day in the 56-day plan where this song comes up, if it does. */
  planDay?: number;
  note?: string;
}

const ALL_PURPOSE = "D · D U · U D U";
const SIMPLE = "D · D · D · D";
const BALLAD = "D · D U · D · D U";
const PICKED = "Arpeggio — pick the strings one at a time";
const ROCK = "All downstrokes, palm muted";

/**
 * A library for choosing what to learn next: what a song teaches, the shapes it
 * needs, and its main progression to play along with. Full transcriptions are
 * licensed material, so those link out rather than being reproduced here.
 */
export const SONGS: Song[] = [
  /* ---------------- english, beginner ---------------- */
  {
    id: "smoke-on-the-water",
    title: "Smoke on the Water",
    artist: "Deep Purple",
    language: "english",
    difficulty: 1,
    chords: [],
    loop: [],
    teaches: "Single-note riff picking on one string. The classic first riff.",
    planDay: 1,
    note: "Everything happens on the D string. The riff is taught with a playable tab on day 1 of your plan.",
  },
  {
    id: "seven-nation-army",
    title: "Seven Nation Army",
    artist: "The White Stripes",
    language: "english",
    difficulty: 1,
    chords: [],
    loop: [],
    teaches: "Seven notes on one string, plus sliding your hand along the neck.",
    planDay: 5,
    note: "Playable tab on day 5 of your plan.",
  },
  {
    id: "iron-man",
    title: "Iron Man",
    artist: "Black Sabbath",
    language: "english",
    difficulty: 1,
    chords: ["B5", "D5", "E5"],
    loop: ["B5", "D5", "E5", "D5"],
    strum: ROCK,
    bpm: 60,
    teaches: "Moving power chords slowly and heavily. Your first full riff song.",
    planDay: 11,
  },
  {
    id: "back-in-black",
    title: "Back in Black",
    artist: "AC/DC",
    language: "english",
    difficulty: 1,
    chords: ["E5", "D5", "A5"],
    loop: ["E5", "D5", "A5", "E5"],
    strum: "Open, ringing chords with real silence between them",
    bpm: 60,
    teaches: "Groove and silence — stopping the strings is the whole trick here.",
    planDay: 13,
  },
  {
    id: "smells-like-teen-spirit",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    language: "english",
    difficulty: 1,
    chords: ["F5", "Bb5"],
    loop: ["F5", "Bb5", "Ab5", "Db5"],
    strum: ROCK,
    bpm: 70,
    teaches: "Four power chords, two shapes, moving up three frets.",
    planDay: 12,
    note: "Ab5 is the low E at fret 4; Db5 is the A string at fret 4. Same two shapes as F5 and Bb5, moved up.",
  },
  {
    id: "zombie",
    title: "Zombie",
    artist: "The Cranberries",
    language: "english",
    difficulty: 1,
    chords: ["Em", "C", "G", "D"],
    loop: ["Em", "C", "G", "D"],
    strum: ALL_PURPOSE,
    bpm: 70,
    teaches: "Four open chords, one strum pattern, whole song. A great first full song.",
    planDay: 17,
  },
  {
    id: "boulevard",
    title: "Boulevard of Broken Dreams",
    artist: "Green Day",
    language: "english",
    difficulty: 1,
    chords: ["Em", "G", "D", "A"],
    loop: ["Em", "G", "D", "A"],
    strum: ALL_PURPOSE,
    bpm: 80,
    teaches: "Steady strumming across four chords.",
    planDay: 18,
    note: "The record sits a semitone away, so these shapes sound right alone but won't play along exactly.",
  },
  {
    id: "knockin",
    title: "Knockin' on Heaven's Door",
    artist: "Bob Dylan",
    language: "english",
    difficulty: 1,
    chords: ["G", "D", "Am", "C"],
    loop: ["G", "D", "Am", "G", "D", "C"],
    strum: SIMPLE,
    bpm: 65,
    teaches: "Slow, forgiving changes. The song to learn while chords still feel hard.",
  },
  {
    id: "let-it-be",
    title: "Let It Be",
    artist: "The Beatles",
    language: "english",
    difficulty: 1,
    chords: ["C", "G", "Am", "F"],
    loop: ["C", "G", "Am", "F"],
    strum: ALL_PURPOSE,
    bpm: 70,
    teaches: "The four-chord backbone of popular music. Use Fmaj7 until F is ready.",
  },
  {
    id: "riptide",
    title: "Riptide",
    artist: "Vance Joy",
    language: "english",
    difficulty: 1,
    chords: ["Am", "G", "C"],
    loop: ["Am", "G", "C", "C"],
    strum: ALL_PURPOSE,
    bpm: 90,
    teaches: "Three chords and a driving strum. Very hard to get wrong.",
  },
  {
    id: "wonderwall",
    title: "Wonderwall",
    artist: "Oasis",
    language: "english",
    difficulty: 1,
    capo: 2,
    chords: ["Em", "G", "D", "A"],
    loop: ["Em", "G", "D", "A"],
    strum: ALL_PURPOSE,
    bpm: 80,
    teaches: "Capo use and a persistent strum pattern.",
    note: "Commonly played capo 2. The full version uses Em7 and A7sus4 voicings; these simpler shapes work fine.",
  },
  {
    id: "perfect",
    title: "Perfect",
    artist: "Ed Sheeran",
    language: "english",
    difficulty: 1,
    chords: ["G", "Em", "C", "D"],
    loop: ["G", "Em", "C", "D"],
    strum: BALLAD,
    bpm: 63,
    teaches: "Slow swaying strumming and clean changes.",
  },

  /* ---------------- english, further on ---------------- */
  {
    id: "nothing-else-matters",
    title: "Nothing Else Matters",
    artist: "Metallica",
    language: "english",
    difficulty: 2,
    chords: ["Em", "D", "C"],
    loop: ["Em", "D", "C", "Em"],
    strum: PICKED,
    bpm: 55,
    teaches: "Fingerpicked arpeggios on open strings, then full chords.",
    note: "The intro is picked one note at a time. A good target once week 4 is done.",
  },
  {
    id: "enter-sandman",
    title: "Enter Sandman",
    artist: "Metallica",
    language: "english",
    difficulty: 2,
    chords: ["E5"],
    loop: [],
    teaches: "Palm-muted chugging and tight downpicking.",
    planDay: 41,
    note: "A chug-and-fill exercise in this style is on day 41 of your plan.",
  },
  {
    id: "someone-like-you",
    title: "Someone Like You",
    artist: "Adele",
    language: "english",
    difficulty: 2,
    capo: 2,
    chords: ["G", "D", "Em", "C"],
    loop: ["G", "D", "Em", "C"],
    strum: PICKED,
    bpm: 68,
    teaches: "Arpeggio picking held steady under a vocal.",
  },
  {
    id: "sweet-child",
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    language: "english",
    difficulty: 3,
    chords: ["D", "C", "G"],
    loop: ["D", "C", "G", "D"],
    strum: SIMPLE,
    bpm: 62,
    teaches: "Fast, accurate string-skipping in the intro riff. A real test.",
    note: "The chords are easy; the intro riff is not. Learn the riff at half speed from a full tab.",
  },
  {
    id: "hotel-california",
    title: "Hotel California",
    artist: "Eagles",
    language: "english",
    difficulty: 3,
    chords: ["Bm", "A", "E", "G", "D", "Em"],
    loop: [],
    teaches: "Barre chords, arpeggios, and a long structure to hold together.",
    note: "The progression uses chords beyond the shapes taught here. Worth learning from a full tab.",
  },
  {
    id: "stairway",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    language: "english",
    difficulty: 3,
    chords: ["Am", "C", "D", "Fmaj7", "G"],
    loop: [],
    teaches: "Fingerpicked melody and bass at once. A months-long project, worth starting.",
    note: "A picked arrangement rather than a strummed progression — learn it from a full tab. Don't make it your first fingerpicking song.",
  },

  /* ---------------- hindi, beginner ---------------- */
  {
    id: "tum-hi-ho",
    title: "Tum Hi Ho",
    artist: "Arijit Singh · Aashiqui 2",
    language: "hindi",
    difficulty: 1,
    capo: 2,
    chords: ["Am", "Fmaj7", "C", "G"],
    loop: ["Am", "Fmaj7", "C", "G"],
    strum: BALLAD,
    bpm: 60,
    teaches: "The four-shape set that unlocks dozens of Hindi songs.",
    planDay: 20,
    note: "Capo 2 with these shapes. Without a capo it's Bm, G, D, A — that needs barre chords.",
  },
  {
    id: "kabira",
    title: "Kabira",
    artist: "Yeh Jawaani Hai Deewani",
    language: "hindi",
    difficulty: 1,
    capo: 2,
    chords: ["Am", "Fmaj7", "C", "G"],
    loop: ["Am", "Fmaj7", "C", "G"],
    strum: ALL_PURPOSE,
    bpm: 72,
    teaches: "Gentle strumming on the same shape set. Easy to sing along to.",
    planDay: 20,
  },
  {
    id: "channa-mereya",
    title: "Channa Mereya",
    artist: "Arijit Singh · Ae Dil Hai Mushkil",
    language: "hindi",
    difficulty: 1,
    capo: 2,
    chords: ["Am", "Fmaj7", "C", "G"],
    loop: ["Am", "Fmaj7", "C", "G"],
    strum: PICKED,
    bpm: 58,
    teaches: "Arpeggio picking rather than strumming. Sounds far harder than it is.",
    planDay: 25,
  },
  {
    id: "ae-dil-hai-mushkil",
    title: "Ae Dil Hai Mushkil",
    artist: "Arijit Singh",
    language: "hindi",
    difficulty: 2,
    chords: ["Bm", "G", "D", "A"],
    loop: ["Bm", "G", "D", "A"],
    strum: BALLAD,
    bpm: 62,
    teaches: "Barre chords in a real song, once week 6 is behind you.",
    planDay: 37,
  },
  {
    id: "pehla-nasha",
    title: "Pehla Nasha",
    artist: "Jo Jeeta Wohi Sikandar",
    language: "hindi",
    difficulty: 1,
    chords: ["G", "Em", "C", "D"],
    loop: ["G", "Em", "C", "D"],
    strum: ALL_PURPOSE,
    bpm: 70,
    teaches: "Relaxed strumming and a melody everyone in the room already knows.",
  },
  {
    id: "iktara",
    title: "Iktara",
    artist: "Wake Up Sid",
    language: "hindi",
    difficulty: 1,
    capo: 2,
    chords: ["Am", "C", "G", "Fmaj7"],
    loop: ["Am", "C", "G", "Fmaj7"],
    strum: PICKED,
    bpm: 64,
    teaches: "Light picking and space. Good for practising restraint.",
  },
  {
    id: "tujhe-kitna",
    title: "Tujhe Kitna Chahne Lage",
    artist: "Arijit Singh · Kabir Singh",
    language: "hindi",
    difficulty: 1,
    capo: 2,
    chords: ["Am", "Fmaj7", "C", "G"],
    loop: ["Am", "Fmaj7", "C", "G"],
    strum: BALLAD,
    bpm: 62,
    teaches: "Same shape set again — proof of how much one set buys you.",
  },
  {
    id: "tera-ban-jaunga",
    title: "Tera Ban Jaunga",
    artist: "Kabir Singh",
    language: "hindi",
    difficulty: 1,
    chords: ["C", "G", "Am", "Fmaj7"],
    loop: ["C", "G", "Am", "Fmaj7"],
    strum: ALL_PURPOSE,
    bpm: 72,
    teaches: "Straightforward four-chord strumming at a comfortable tempo.",
  },
  {
    id: "kesariya",
    title: "Kesariya",
    artist: "Arijit Singh · Brahmastra",
    language: "hindi",
    difficulty: 1,
    capo: 2,
    chords: ["Am", "C", "G", "Fmaj7"],
    loop: ["Am", "C", "G", "Fmaj7"],
    strum: ALL_PURPOSE,
    bpm: 75,
    teaches: "Modern strumming pattern, very singable.",
  },
  {
    id: "raabta",
    title: "Raabta",
    artist: "Arijit Singh",
    language: "hindi",
    difficulty: 1,
    capo: 2,
    chords: ["Am", "Fmaj7", "C", "G"],
    loop: ["Am", "Fmaj7", "C", "G"],
    strum: ALL_PURPOSE,
    bpm: 78,
    teaches: "Steady rhythm playing with a clear chorus lift.",
  },
  {
    id: "galliyan",
    title: "Galliyan",
    artist: "Ankit Tiwari · Ek Villain",
    language: "hindi",
    difficulty: 2,
    chords: ["Am", "Dm", "G", "C"],
    loop: ["Am", "Dm", "G", "C"],
    strum: ALL_PURPOSE,
    bpm: 68,
    teaches: "A minor-key progression and a more expressive strum.",
  },
  {
    id: "agar-tum-saath-ho",
    title: "Agar Tum Saath Ho",
    artist: "Arijit Singh & Alka Yagnik · Tamasha",
    language: "hindi",
    difficulty: 2,
    chords: ["Am", "C", "G", "Fmaj7", "Dm"],
    loop: ["Am", "C", "G", "Fmaj7"],
    strum: PICKED,
    bpm: 60,
    teaches: "Dynamics — it needs quiet verses and a big chorus to work.",
  },
  {
    id: "phir-le-aya-dil",
    title: "Phir Le Aya Dil",
    artist: "Arijit Singh · Barfi",
    language: "hindi",
    difficulty: 2,
    chords: ["Am", "Em", "F", "G", "C"],
    loop: ["Am", "Em", "F", "G"],
    strum: PICKED,
    bpm: 56,
    teaches: "Fingerpicking and slow chord movement. Lovely and unhurried.",
  },
  {
    id: "bekhayali",
    title: "Bekhayali",
    artist: "Sachet Tandon · Kabir Singh",
    language: "hindi",
    difficulty: 3,
    chords: ["Bm", "G", "D", "A", "F"],
    loop: ["Bm", "G", "D", "A"],
    strum: ALL_PURPOSE,
    bpm: 80,
    teaches: "Barre chords at tempo with a driving rhythm. A week-8 target.",
  },
  {
    id: "chaiyya-chaiyya",
    title: "Chaiyya Chaiyya",
    artist: "Sukhwinder Singh · Dil Se",
    language: "hindi",
    difficulty: 2,
    chords: ["Am", "G", "F", "C"],
    loop: ["Am", "G", "F", "C"],
    strum: "Percussive — mix in dead strums for the groove",
    bpm: 92,
    teaches: "Rhythmic drive and percussive strumming. Genuinely fun to play.",
  },
];

export const lessonSearchUrl = (song: Song) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${song.title} guitar lesson beginner`,
  )}`;

export const DIFFICULTY_LABEL: Record<Song["difficulty"], string> = {
  1: "Beginner",
  2: "Getting there",
  3: "A project",
};
