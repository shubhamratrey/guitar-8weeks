"use client";

import Link from "next/link";
import { ScaleBox } from "./ScaleBox";
import { SongWords } from "./SongWords";
import { TabSheet } from "./TabSheet";
import { chartFromLoop } from "@/lib/score";
import { DIFFICULTY_LABEL, lessonSearchUrl, type Song } from "@/lib/songs";

/**
 * Full-screen player. Covers the app chrome entirely so the staff gets the whole
 * viewport, with the transport pinned to the bottom.
 */
export function SongStage({ song }: { song: Song }) {
  const score = song.score ?? (song.loop.length ? chartFromLoop(song.loop) : null);

  return (
    <div data-stage-scroll className="fixed inset-0 z-40 overflow-y-auto bg-ink">
      <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href="/songs"
              className="legend inline-flex items-center gap-1.5 hover:text-amber"
            >
              ← Song bank
            </Link>
            <h1 className="display mt-2 text-[26px] leading-tight text-text sm:text-[32px]">
              {song.title}
            </h1>
            <p className="mt-1 text-[13px] text-dim">{song.artist}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="legend">{DIFFICULTY_LABEL[song.difficulty]}</p>
            {song.capo !== undefined && (
              <p className="mt-1 text-[12px] text-muted">capo {song.capo}</p>
            )}
          </div>
        </div>

        <div className="rule my-4" />

        <p className="text-[13.5px] leading-relaxed text-muted">{song.teaches}</p>

        {song.note && (
          <p className="mt-3 border-l-2 border-amber pl-3.5 text-[13px] leading-relaxed text-muted">
            {song.note}
          </p>
        )}

        {song.soloScale && (
          <section className="mt-5 space-y-2.5">
            <div>
              <p className="legend">Solo over it</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                These changes cycle, so one scale shape covers the whole song. Loop the
                chart below and improvise over the top — that beats copying a solo note
                for note.
              </p>
            </div>
            <ScaleBox rootFret={song.soloScale.rootFret} label={song.soloScale.label} />
          </section>
        )}

        <div className="mt-5">
          {score ? (
            <TabSheet
              score={score}
              strum={song.strum}
              capo={song.capo}
              initialBpm={song.bpm ?? 70}
              stage
            />
          ) : (
            <div className="panel space-y-3 p-5">
              <p className="text-[13.5px] leading-relaxed text-muted">
                There&apos;s no chart for this one in the app. It needs a full arrangement
                rather than a chord loop, and published transcriptions are licensed
                material, so it isn&apos;t reproduced here.
              </p>
              <a
                href={lessonSearchUrl(song)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md border border-line px-3.5 py-2.5 text-[12.5px] font-medium text-text hover:border-amber hover:text-amber"
              >
                Find a video lesson ↗
              </a>
            </div>
          )}
        </div>

        {/* words you type yourself, for anything we can't ship lyrics for */}
        {!song.open && (
          <div className="mt-4">
            <SongWords songId={song.id} />
          </div>
        )}
      </div>
    </div>
  );
}
