"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChordRow } from "@/components/ChordDiagram";
import { getChord } from "@/lib/chords";
import { ALL_SONGS } from "@/lib/songLibrary";
import { DIFFICULTY_LABEL, type Language, type Song } from "@/lib/songs";

type Filter = "all" | Language | "fulltab";

export default function SongsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [level, setLevel] = useState<0 | 1 | 2 | 3>(0);
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_SONGS.filter((s) => {
      if (filter === "fulltab" && !s.score) return false;
      if ((filter === "hindi" || filter === "english") && s.language !== filter) return false;
      if (level !== 0 && s.difficulty !== level) return false;
      if (q && !`${s.title} ${s.artist}`.toLowerCase().includes(q)) return false;
      return true;
    }).sort((a, b) => {
      // Complete tabs first — they're the ones you can play here and now.
      if (Boolean(a.score) !== Boolean(b.score)) return a.score ? -1 : 1;
      return a.difficulty - b.difficulty || a.title.localeCompare(b.title);
    });
  }, [filter, level, query]);

  return (
    <div className="space-y-6">
      <header>
        <p className="legend">Pick something to learn</p>
        <h1 className="display mt-1.5 text-[30px] leading-none text-text">Song bank</h1>
        <div className="rule mt-4" />
        <p className="mt-4 text-[13px] leading-relaxed text-muted">
          Open any song to play it full screen: a staff with bar lines, a playhead that
          sweeps in time, and the shape you need next shown ahead.
        </p>
      </header>

      <div className="space-y-2.5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a song or artist…"
          className="w-full rounded-md border border-line bg-panel px-3.5 py-2.5 text-[13.5px] text-text placeholder:text-dim/70 outline-none focus:border-amber"
        />

        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "Everything"],
              ["fulltab", "Full tabs"],
              ["hindi", "Hindi"],
              ["english", "English"],
            ] as const
          ).map(([key, label]) => (
            <Chip key={key} active={filter === key} onClick={() => setFilter(key)}>
              {label}
            </Chip>
          ))}

          <span className="mx-1 w-px self-stretch bg-line" aria-hidden />

          {(
            [
              [0, "Any level"],
              [1, "Beginner"],
              [2, "Getting there"],
              [3, "A project"],
            ] as const
          ).map(([key, label]) => (
            <Chip key={key} active={level === key} onClick={() => setLevel(key)}>
              {label}
            </Chip>
          ))}
        </div>
      </div>

      {filter === "fulltab" && (
        <p className="rounded-md border border-line-soft bg-panel px-3.5 py-3 text-[12.5px] leading-relaxed text-muted">
          Complete, note-for-note tabs: public-domain melodies, traditional pieces, and
          exercises written for this plan. Everything here is free to include in full.
        </p>
      )}

      <p className="text-[12px] text-dim">
        {shown.length} song{shown.length === 1 ? "" : "s"}
      </p>

      <div className="grid gap-2.5 lg:grid-cols-2">
        {shown.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
        {!shown.length && (
          <p className="panel p-6 text-center text-[13px] text-muted">
            Nothing matches that. Try clearing the filters.
          </p>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border px-3 py-2 text-[12.5px] font-medium transition-colors ${
        active
          ? "border-amber bg-amber/[0.08] text-amber"
          : "border-line bg-panel text-muted hover:border-amber/40"
      }`}
    >
      {children}
    </button>
  );
}

function SongCard({ song }: { song: Song }) {
  const drawable = song.chords.filter((c) => getChord(c)).slice(0, 4);
  const playable = Boolean(song.score) || song.loop.length > 0;

  return (
    <Link
      href={`/songs/${song.id}`}
      className="panel group flex flex-col p-4 transition-colors hover:border-amber/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="display text-[19px] leading-snug text-text group-hover:text-amber">
            {song.title}
          </h2>
          <p className="mt-0.5 text-[12.5px] text-dim">{song.artist}</p>
        </div>
        <div
          className="flex shrink-0 items-center gap-1 pt-1.5"
          aria-label={DIFFICULTY_LABEL[song.difficulty]}
        >
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`h-1.5 w-1.5 rounded-full ${
                n <= song.difficulty ? "bg-amber" : "bg-line"
              }`}
              aria-hidden
            />
          ))}
        </div>
      </div>

      <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{song.teaches}</p>

      {drawable.length > 0 && (
        <div className="mt-3.5">
          <ChordRow ids={drawable} />
        </div>
      )}

      <div className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px]">
        {song.score ? (
          <span className="rounded border border-amber/40 bg-amber/[0.08] px-1.5 py-0.5 font-semibold uppercase tracking-wider text-amber">
            full tab
          </span>
        ) : (
          playable && (
            <span className="rounded border border-line px-1.5 py-0.5 uppercase tracking-wider text-dim">
              chord chart
            </span>
          )
        )}
        <span className="text-dim">{song.language === "hindi" ? "Hindi" : "English"}</span>
        {song.capo !== undefined && <span className="text-dim">capo {song.capo}</span>}
        {song.planDay && <span className="text-dim">day {song.planDay}</span>}
        <span className="ml-auto text-amber opacity-0 transition-opacity group-hover:opacity-100">
          open →
        </span>
      </div>
    </Link>
  );
}
