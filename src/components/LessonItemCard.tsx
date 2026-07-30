"use client";

import { useState } from "react";
import { ChordRow } from "./ChordDiagram";
import { TabPlayer } from "./TabPlayer";
import type { LessonItem } from "@/lib/types";

/**
 * One thing to do, collapsed to a tappable row. Everything you need to actually
 * do it is one tap away — no deeper.
 */
export function LessonItemCard({
  item,
  done,
  onToggle,
  startOpen = false,
}: {
  item: LessonItem;
  done: boolean;
  onToggle: () => void;
  startOpen?: boolean;
}) {
  const [open, setOpen] = useState(startOpen);
  const hasDetail = Boolean(item.how?.length || item.tab || item.chords?.length || item.watch);

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors ${
        done ? "border-good/30 bg-good/[0.06]" : "border-line-soft bg-panel"
      }`}
    >
      <div className="flex items-center gap-3 p-3.5">
        <button
          onClick={onToggle}
          aria-pressed={done}
          aria-label={done ? `Untick ${item.title}` : `Tick ${item.title}`}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-all ${
            done ? "border-good bg-good text-ink" : "border-line text-transparent"
          }`}
        >
          ✓
        </button>

        <button
          onClick={() => hasDetail && setOpen((o) => !o)}
          className="min-w-0 flex-1 text-left"
          aria-expanded={hasDetail ? open : undefined}
        >
          <span
            className={`block text-[15px] font-semibold leading-snug ${
              done ? "text-muted line-through decoration-good/40" : "text-text"
            }`}
          >
            {item.title}
          </span>
          <span className="mt-0.5 block text-[12px] text-dim">
            {item.minutes} min
            {hasDetail && <span className="text-amber/70"> · {open ? "hide" : "how to"}</span>}
          </span>
        </button>
      </div>

      {open && hasDetail && (
        <div className="animate-rise space-y-3 border-t border-line-soft px-3.5 pb-4 pt-3">
          {item.how && (
            <ol className="space-y-2">
              {item.how.map((step, i) => (
                <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                  <span className="mt-0.5 font-mono text-[11px] text-dim">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}

          {item.chords?.length ? <ChordRow ids={item.chords} /> : null}
          {item.tab && <TabPlayer tab={item.tab} />}

          {item.watch && (
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.watch)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-amber hover:underline"
            >
              Watch someone play it ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}
