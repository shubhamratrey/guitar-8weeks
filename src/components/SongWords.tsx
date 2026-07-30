"use client";

import { useSyncExternalStore } from "react";
import { getServerWords, getWords, setWords, subscribeWords } from "@/lib/songNotes";

/**
 * Your own words for a song. The app can't ship lyrics for anything still in
 * copyright, but typing the lines you already know against the chart is the
 * thing that makes a progression make sense — so there's a private place to
 * do it, saved on this device only.
 */
export function SongWords({ songId }: { songId: string }) {
  const words = useSyncExternalStore(
    subscribeWords,
    () => getWords(songId),
    getServerWords,
  );

  return (
    <section className="panel space-y-2.5 p-4">
      <div>
        <p className="legend">Your own words</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
          Type the lines as you sing them and mark where the chords land — a slash or a
          chord name above the word works well. Saved on this device, never sent anywhere.
        </p>
      </div>

      <textarea
        value={words}
        onChange={(e) => setWords(songId, e.target.value)}
        rows={5}
        spellCheck={false}
        placeholder={"Am              F\nyour line goes here…"}
        className="w-full resize-y rounded-md border border-line bg-panel-2 px-3.5 py-3 font-mono text-[13px] leading-relaxed text-text placeholder:text-dim/60 outline-none focus:border-amber"
      />

      {words.trim().length > 0 && (
        <button
          onClick={() => setWords(songId, "")}
          className="text-[11.5px] text-dim underline decoration-dotted hover:text-heat"
        >
          clear
        </button>
      )}
    </section>
  );
}
