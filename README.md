# Eight Weeks — Electric Guitar

A day-by-day beginner plan for electric guitar with progress tracking. 56 days
across 8 weeks, built around one idea: **it should be impossible to fall behind.**

## Why it's built this way

- **Days advance when you finish one, not when the calendar moves.** Miss a week
  and you resume exactly where you left off. The app never tells you you're behind.
- **A short-day mode.** One tap strips the day down to the single item that matters
  and still logs it as complete. Ten honest minutes beats a skipped day.
- **Nothing is required to log a session.** No forms, no mandatory ratings. One button.
- **A streak you can't lose to one bad day.** One missed day per week is forgiven
  automatically; two misses close together does break it.

## Screens

| Screen | What it's for |
| --- | --- |
| Today | The current day's practice, a metronome, and one "I practised" button |
| Song bank | Browsable Hindi and English songs — chords, capo, difficulty, what each teaches |
| Progress | Streak, hours played, all 56 days as a grid, recent sessions |
| Chords | Chord diagrams, the pentatonic shape, how to read tab |

Riffs in the plan render in an animated tab player: a playhead glides through the
notes at whatever tempo you set, with an optional click and looping.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000. It works immediately — progress saves to
`localStorage`, so there's nothing to configure between you and day 1.

## Optional: syncing across devices

Progress is device-local until you add Firebase config. To sync a phone and a
laptop, create `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Then enable **Google sign-in** and **Firestore** in the Firebase console. A
"Sign in with Google" button appears on the Progress screen. Data lives at
`players/{uid}` and merges last-write-wins per day, so opening the app on a
second device won't clobber the first.

Lock Firestore to the signed-in owner:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /players/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## Layout

```
src/lib/curriculum/     the 56 lessons, one file per week
src/lib/songs.ts        the song bank
src/lib/store.ts        localStorage read/write and the merge rule
src/lib/localStore.ts   localStorage as a useSyncExternalStore source
src/lib/progress.ts     streak and stats derivations
src/components/         TabPlayer, Metronome, ChordDiagram, ScaleBox
```

The curriculum is plain data in code rather than a database, so lessons are
version-controlled and there's no CMS to maintain. To change a day, edit its
week file.

## On tabs and songs

The song bank stores factual, functional information — chord names, capo
positions, difficulty, and what a song teaches — and links out to a full tab and
a video lesson for each. It deliberately does not host song transcriptions,
which are licensed material.

The short riff fragments inside the lessons are teaching excerpts. Those marked
*simplified* are beginner reductions rather than exact transcriptions, and each
links to a video lesson so you can check yourself against the recording.
