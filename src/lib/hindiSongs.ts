import type { Song } from "./songs";

/**
 * Beginner chord versions of well-known Hindi songs.
 *
 * These are practice charts, not transcriptions: the common simplified
 * progression, usually with a capo so open shapes work. A large share of Hindi
 * film songs sit on a handful of shape sets — which is exactly why learning
 * Am-F-C-G and Em-C-G-D pays off so quickly.
 *
 * Keys and voicings vary between versions, so check anything here against the
 * recording before treating it as definitive.
 */

const ALL_PURPOSE = "D · D U · U D U";
const SIMPLE = "D · D · D · D";
const BALLAD = "D · D U · D · D U";
const PICKED = "Arpeggio — pick the strings one at a time";
const SIXTEENTHS = "1 e and a — keep the hand moving";

const uniq = (chords: string[]) => [...new Set(chords)];

interface Opts {
  loop?: string[];
  chords?: string[];
  capo?: number;
  strum?: string;
  bpm?: number;
  note?: string;
  planDay?: number;
}

const S = (
  id: string,
  title: string,
  artist: string,
  difficulty: 1 | 2 | 3,
  teaches: string,
  o: Opts = {},
): Song => ({
  id,
  title,
  artist,
  language: "hindi",
  difficulty,
  teaches,
  loop: o.loop ?? [],
  chords: o.chords ?? uniq(o.loop ?? []),
  capo: o.capo,
  strum: o.strum,
  bpm: o.bpm,
  note: o.note,
  planDay: o.planDay,
});

/** The shape set that covers an enormous amount of Hindi music. */
const ENGINE = ["Am", "Fmaj7", "C", "G"];

export const HINDI_SONGS: Song[] = [
  /* ---- the core shape set, from the plan ---- */
  S("tum-hi-ho", "Tum Hi Ho", "Arijit Singh · Aashiqui 2", 1,
    "The four-shape set that unlocks dozens of Hindi songs.",
    { loop: ENGINE, capo: 2, strum: BALLAD, bpm: 60, planDay: 20,
      note: "Capo 2 with these shapes. Without a capo it's Bm, G, D, A — that needs barre chords." }),
  S("kabira", "Kabira", "Yeh Jawaani Hai Deewani", 1,
    "Gentle strumming on the same shape set. Easy to sing along to.",
    { loop: ENGINE, capo: 2, strum: ALL_PURPOSE, bpm: 72, planDay: 20 }),
  S("channa-mereya", "Channa Mereya", "Arijit Singh · Ae Dil Hai Mushkil", 1,
    "Arpeggio picking rather than strumming. Sounds far harder than it is.",
    { loop: ENGINE, capo: 2, strum: PICKED, bpm: 58, planDay: 25 }),
  S("ae-dil-hai-mushkil", "Ae Dil Hai Mushkil", "Arijit Singh", 2,
    "Barre chords in a real song, once week 6 is behind you.",
    { loop: ["Bm", "G", "D", "A"], strum: BALLAD, bpm: 62, planDay: 37 }),

  /* ---- modern ballads ---- */
  S("tujhe-kitna", "Tujhe Kitna Chahne Lage", "Arijit Singh · Kabir Singh", 1,
    "Slow changes on the engine shapes. A good first singalong.",
    { loop: ENGINE, capo: 2, strum: BALLAD, bpm: 62 }),
  S("tera-ban-jaunga", "Tera Ban Jaunga", "Kabir Singh", 1,
    "Straightforward four-chord strumming at a comfortable tempo.",
    { loop: ["C", "G", "Am", "Fmaj7"], strum: ALL_PURPOSE, bpm: 72 }),
  S("kesariya", "Kesariya", "Arijit Singh · Brahmastra", 1,
    "Modern strumming pattern, very singable.",
    { loop: ["Am", "C", "G", "Fmaj7"], capo: 2, strum: ALL_PURPOSE, bpm: 75 }),
  S("raabta", "Raabta", "Arijit Singh", 1,
    "Steady rhythm playing with a clear chorus lift.",
    { loop: ENGINE, capo: 2, strum: ALL_PURPOSE, bpm: 78 }),
  S("shayad", "Shayad", "Arijit Singh · Love Aaj Kal", 1,
    "Light, unhurried strumming with plenty of space.",
    { loop: ENGINE, capo: 2, strum: BALLAD, bpm: 66 }),
  S("hawayein", "Hawayein", "Arijit Singh · Jab Harry Met Sejal", 2,
    "Long sustained chords and a patient right hand.",
    { loop: ["Am", "C", "G", "Fmaj7"], capo: 2, strum: PICKED, bpm: 68 }),
  S("khairiyat", "Khairiyat", "Arijit Singh · Chhichhore", 1,
    "Warm, mid-tempo strumming on familiar shapes.",
    { loop: ENGINE, capo: 2, strum: ALL_PURPOSE, bpm: 80 }),
  S("humdard", "Humdard", "Arijit Singh · Ek Villain", 2,
    "Picked verses opening into strummed choruses.",
    { loop: ["Am", "Fmaj7", "C", "G"], capo: 2, strum: PICKED, bpm: 62 }),
  S("zaalima", "Zaalima", "Arijit Singh & Harshdeep Kaur · Raees", 2,
    "A minor-key groove with a strong rhythmic pull.",
    { loop: ["Am", "Dm", "G", "C"], strum: ALL_PURPOSE, bpm: 88 }),
  S("dil-diyan-gallan", "Dil Diyan Gallan", "Atif Aslam · Tiger Zinda Hai", 1,
    "Relaxed strumming, very forgiving tempo.",
    { loop: ENGINE, capo: 2, strum: BALLAD, bpm: 70 }),
  S("bolna", "Bolna", "Arijit Singh & Asees Kaur · Kapoor & Sons", 1,
    "Simple loop, gentle dynamics.",
    { loop: ["C", "G", "Am", "Fmaj7"], strum: BALLAD, bpm: 68 }),
  S("muskurane", "Muskurane", "Arijit Singh · CityLights", 2,
    "Soft picking with a slow harmonic movement.",
    { loop: ["Am", "C", "G", "Fmaj7"], capo: 2, strum: PICKED, bpm: 64 }),
  S("mast-magan", "Mast Magan", "Arijit Singh · 2 States", 1,
    "Easy strumming with an airy, open feel.",
    { loop: ENGINE, capo: 2, strum: ALL_PURPOSE, bpm: 76 }),
  S("zehnaseeb", "Zehnaseeb", "Chinmayi & Shekhar · Hasee Toh Phasee", 2,
    "Light picking and restraint.",
    { loop: ["Am", "Fmaj7", "C", "G"], capo: 2, strum: PICKED, bpm: 70 }),
  S("sanam-re", "Sanam Re", "Arijit Singh", 1,
    "A slow ballad on the engine shapes.",
    { loop: ENGINE, capo: 2, strum: BALLAD, bpm: 64 }),
  S("tera-yaar-hoon-main", "Tera Yaar Hoon Main", "Arijit Singh", 1,
    "Bright, simple strumming. A good one to play for friends.",
    { loop: ["C", "G", "Am", "Fmaj7"], strum: ALL_PURPOSE, bpm: 84 }),

  /* ---- Rockstar / Rahman ---- */
  S("tum-ho", "Tum Ho", "Mohit Chauhan · Rockstar", 2,
    "Slow, exposed picking. Every mistake shows, which is the point.",
    { loop: ["Am", "Fmaj7", "C", "G"], capo: 2, strum: PICKED, bpm: 60 }),
  S("phir-se-ud-chala", "Phir Se Ud Chala", "Mohit Chauhan · Rockstar", 2,
    "Rolling strumming that has to stay even for a long time.",
    { loop: ["Am", "C", "G", "Fmaj7"], capo: 2, strum: ALL_PURPOSE, bpm: 92 }),
  S("kun-faya-kun", "Kun Faya Kun", "A. R. Rahman · Rockstar", 2,
    "A long, meditative loop. Excellent for locking into a groove.",
    { loop: ["Am", "G", "Fmaj7", "G"], strum: ALL_PURPOSE, bpm: 84 }),
  S("nadaan-parindey", "Nadaan Parindey", "Mohit Chauhan · Rockstar", 2,
    "Driving rhythm with real attack.",
    { loop: ["Am", "Fmaj7", "C", "G"], strum: SIXTEENTHS, bpm: 100 }),
  S("sadda-haq", "Sadda Haq", "Mohit Chauhan · Rockstar", 3,
    "Distorted power chords at tempo. A rock rhythm workout.",
    { loop: ["E5", "G5", "A5", "E5"], strum: "Hard downstrokes, palm muted", bpm: 120 }),
  S("ilahi", "Ilahi", "Arijit Singh · Yeh Jawaani Hai Deewani", 1,
    "Loose, travelling strum. Feels great almost immediately.",
    { loop: ENGINE, capo: 2, strum: ALL_PURPOSE, bpm: 92 }),
  S("balam-pichkari", "Balam Pichkari", "Yeh Jawaani Hai Deewani", 2,
    "Fast, percussive strumming. A rhythm test.",
    { loop: ["Am", "G", "Fmaj7", "C"], strum: SIXTEENTHS, bpm: 118 }),
  S("give-me-some-sunshine", "Give Me Some Sunshine", "3 Idiots", 1,
    "Slow and simple. One of the friendliest Hindi songs for a beginner.",
    { loop: ["C", "G", "Am", "Fmaj7"], strum: SIMPLE, bpm: 68 }),
  S("behti-hawa", "Behti Hawa Sa Tha Woh", "3 Idiots", 1,
    "Light strumming with a walking feel.",
    { loop: ["G", "Em", "C", "D"], strum: ALL_PURPOSE, bpm: 88 }),
  S("manja", "Manja", "Amit Trivedi · Kai Po Che", 2,
    "Bright, energetic strumming with dynamics.",
    { loop: ["Am", "Fmaj7", "C", "G"], strum: SIXTEENTHS, bpm: 104 }),

  /* ---- Atif / indie / pop ---- */
  S("tere-bin", "Tere Bin", "Atif Aslam", 1,
    "Mid-tempo strumming that suits a beginner's hand well.",
    { loop: ENGINE, capo: 2, strum: ALL_PURPOSE, bpm: 80 }),
  S("aadat", "Aadat", "Atif Aslam · Jal", 1,
    "Simple rock strumming. A very common first band song.",
    { loop: ["Am", "Fmaj7", "C", "G"], strum: ALL_PURPOSE, bpm: 88 }),
  S("woh-lamhe", "Woh Lamhe", "Atif Aslam · Zeher", 2,
    "Builds from picked verse to full strum.",
    { loop: ["Am", "Fmaj7", "C", "G"], strum: PICKED, bpm: 76 }),
  S("jeene-laga-hoon", "Jeene Laga Hoon", "Atif Aslam & Shreya Ghoshal", 1,
    "Cheerful four-chord strumming.",
    { loop: ["C", "G", "Am", "Fmaj7"], strum: ALL_PURPOSE, bpm: 84 }),
  S("tum-mile", "Tum Mile", "Pritam", 2,
    "Slow, atmospheric picking.",
    { loop: ["Am", "C", "G", "Fmaj7"], capo: 2, strum: PICKED, bpm: 66 }),
  S("emptiness", "Tune Mere Jaana (Emptiness)", "Rohan Rathore", 1,
    "Four chords, very slow. Almost everyone learns this one early.",
    { loop: ["Am", "Fmaj7", "C", "G"], strum: SIMPLE, bpm: 62 }),
  S("purani-jeans", "Purani Jeans", "Ali Haider", 1,
    "Classic strumming that sits perfectly in a beginner's range.",
    { loop: ["G", "Em", "C", "D"], strum: ALL_PURPOSE, bpm: 86 }),
  S("iktara", "Iktara", "Kavita Seth · Wake Up Sid", 1,
    "Light picking and space. Good for practising restraint.",
    { loop: ["Am", "C", "G", "Fmaj7"], capo: 2, strum: PICKED, bpm: 64 }),
  S("saibo", "Saibo", "Shor in the City", 1,
    "Gentle, folky strumming.",
    { loop: ENGINE, capo: 2, strum: ALL_PURPOSE, bpm: 78 }),
  S("galliyan", "Galliyan", "Ankit Tiwari · Ek Villain", 2,
    "A minor-key progression and a more expressive strum.",
    { loop: ["Am", "Dm", "G", "C"], strum: ALL_PURPOSE, bpm: 68 }),

  /* ---- bigger / harder ---- */
  S("bekhayali", "Bekhayali", "Sachet Tandon · Kabir Singh", 3,
    "Barre chords at tempo with a driving rhythm. A week-8 target.",
    { loop: ["Bm", "G", "D", "A"], strum: ALL_PURPOSE, bpm: 80 }),
  S("agar-tum-saath-ho", "Agar Tum Saath Ho", "Arijit Singh & Alka Yagnik · Tamasha", 2,
    "Dynamics — it needs quiet verses and a big chorus to work.",
    { loop: ["Am", "C", "G", "Fmaj7"], strum: PICKED, bpm: 60 }),
  S("phir-le-aya-dil", "Phir Le Aya Dil", "Arijit Singh · Barfi", 2,
    "Fingerpicking and slow chord movement. Lovely and unhurried.",
    { loop: ["Am", "Em", "F", "G"], strum: PICKED, bpm: 56 }),
  S("abhi-mujh-mein", "Abhi Mujh Mein Kahin", "Sonu Nigam · Agneepath", 3,
    "A wide, dramatic progression. Needs real control of dynamics.",
    { loop: ["Am", "Fmaj7", "C", "G"], capo: 2, strum: PICKED, bpm: 62 }),
  S("ae-watan", "Ae Watan", "Arijit Singh · Raazi", 2,
    "Stately, simple, and very exposed. Timing has nowhere to hide.",
    { loop: ["C", "G", "Am", "Fmaj7"], strum: SIMPLE, bpm: 70 }),
  S("chaiyya-chaiyya", "Chaiyya Chaiyya", "Sukhwinder Singh · Dil Se", 2,
    "Rhythmic drive and percussive strumming. Genuinely fun to play.",
    { loop: ["Am", "G", "Fmaj7", "C"], strum: "Percussive — mix in dead strums", bpm: 92 }),
  S("kal-ho-naa-ho", "Kal Ho Naa Ho", "Sonu Nigam", 2,
    "A long ballad with a big lift. Good practice at holding a song together.",
    { loop: ["C", "G", "Am", "Fmaj7"], strum: BALLAD, bpm: 72 }),
  S("tum-se-hi", "Tum Se Hi", "Mohit Chauhan · Jab We Met", 1,
    "Easy strumming, endlessly familiar.",
    { loop: ENGINE, capo: 2, strum: ALL_PURPOSE, bpm: 82 }),
  S("chura-liya", "Chura Liya Hai Tumne", "Asha Bhosle & Mohammed Rafi", 2,
    "A classic with a picked intro figure. Worth learning for the phrasing.",
    { loop: ["Am", "Dm", "G", "C"], strum: PICKED, bpm: 74 }),
  S("lag-jaa-gale", "Lag Jaa Gale", "Lata Mangeshkar", 2,
    "Slow, spacious, and all about touch. A study in playing quietly.",
    { loop: ["Am", "Dm", "G", "C"], strum: PICKED, bpm: 62 }),
];
