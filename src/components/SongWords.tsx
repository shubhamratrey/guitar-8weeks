"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import {
  exportAllWords,
  getServerWords,
  getWords,
  setWords,
  subscribeWords,
} from "@/lib/songNotes";

/**
 * Your own words for a song, kept on this device.
 *
 * The app doesn't ship lyrics — they're copyrighted — so this is where you put
 * the lines you already know, either typed or loaded from your own text file.
 * Nothing here is committed to the repo or sent anywhere.
 */
export function SongWords({ songId, title }: { songId: string; title: string }) {
  const words = useSyncExternalStore(subscribeWords, () => getWords(songId), getServerWords);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const showing = open || words.length > 0;

  const loadFile = (file: File) => {
    file
      .text()
      .then((text) => {
        setWords(songId, text.trimEnd());
        setStatus(`Loaded ${file.name}`);
      })
      .catch(() => setStatus("Couldn't read that file"));
  };

  const download = () => {
    const blob = new Blob([words], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${songId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const backupAll = () => {
    const blob = new Blob([exportAllWords()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-song-words.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!showing) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-md border border-line bg-panel px-4 py-3 text-left text-[13px] text-muted hover:border-amber/50"
      >
        Add your own words for {title} <span className="text-amber">→</span>
      </button>
    );
  }

  return (
    <section className="panel space-y-3 p-4">
      <div>
        <p className="legend">Your own words</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
          Type or paste the lines as you sing them, with chord names above the word where
          the change lands. Saved on this device only — not in the repo, not sent anywhere.
        </p>
      </div>

      <textarea
        value={words}
        onChange={(e) => setWords(songId, e.target.value)}
        rows={12}
        spellCheck={false}
        placeholder={"Am                    F\nfirst line of the verse\nC                     G\nsecond line of the verse"}
        className="w-full resize-y rounded-md border border-line bg-panel-2 px-3.5 py-3 font-mono text-[13px] leading-[1.7] text-text placeholder:text-dim/60 outline-none focus:border-amber"
      />

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => fileInput.current?.click()}
          className="rounded-md border border-line px-3 py-2 text-[12px] font-medium text-muted hover:border-amber hover:text-amber"
        >
          Load a .txt file
        </button>
        <input
          ref={fileInput}
          type="file"
          accept=".txt,.md,text/plain"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) loadFile(file);
          }}
        />

        {words.trim().length > 0 && (
          <>
            <button
              onClick={download}
              className="rounded-md border border-line px-3 py-2 text-[12px] font-medium text-muted hover:border-amber hover:text-amber"
            >
              Save as .txt
            </button>
            <button
              onClick={backupAll}
              className="rounded-md border border-line px-3 py-2 text-[12px] font-medium text-muted hover:border-amber hover:text-amber"
            >
              Back up all songs
            </button>
            <button
              onClick={() => {
                setWords(songId, "");
                setStatus(null);
              }}
              className="ml-auto text-[11.5px] text-dim underline decoration-dotted hover:text-heat"
            >
              clear
            </button>
          </>
        )}
      </div>

      {status && <p className="text-[11.5px] text-amber">{status}</p>}

      <p className="text-[11.5px] leading-relaxed text-dim">
        Keeping your lyric files in a <code className="text-muted">lyrics/</code> folder in
        this project works well — it&apos;s gitignored, so it stays off GitHub.
      </p>
    </section>
  );
}
