"use client";

import { useState } from "react";
import { ChordDiagram } from "@/components/ChordDiagram";
import { ScaleBox } from "@/components/ScaleBox";

const GROUPS = [
  {
    label: "Start here",
    hint: "The chords in most songs. Learn these six and you can play a lot.",
    ids: ["Em", "Am", "E", "A", "D", "G", "C", "Dm"],
  },
  {
    label: "Power chords",
    hint: "Two fingers, movable anywhere. All of rock and metal runs on these.",
    ids: ["E5", "A5", "D5", "G5", "C5", "F5", "B5"],
  },
  {
    label: "Easier stand-ins",
    hint: "Use these while the hard shapes are still coming together.",
    ids: ["Am7", "Em7", "Cadd9", "Fmaj7", "Dsus2"],
  },
  {
    label: "Barre chords",
    hint: "Week 6 material. Hard at first, then suddenly not.",
    ids: ["F", "Bm", "Bb"],
  },
];

const TAB_KEY: [string, string][] = [
  ["0", "Open string — don't fret it"],
  ["5", "Press the 5th fret"],
  ["h", "Hammer-on: 5h7 means hammer up to fret 7"],
  ["p", "Pull-off: 7p5 means flick off to fret 5"],
  ["/ \\", "Slide up or down"],
  ["b", "Bend: 7b9 means bend fret 7 to sound like 9"],
  ["x", "Muted, percussive click"],
];

export default function ReferencePage() {
  const [tab, setTab] = useState<"chords" | "extras">("chords");

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-bold text-text">Chords</h1>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">
          Thickest string on the left. Numbers in the dots are which finger: 1 index, 2
          middle, 3 ring, 4 pinky.
        </p>
      </header>

      <div className="flex gap-2">
        {(
          [
            ["chords", "Chord shapes"],
            ["extras", "Scale & tab"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 rounded-lg border px-3 py-2.5 text-[13px] font-semibold transition-colors ${
              tab === key
                ? "border-amber bg-amber/[0.08] text-amber"
                : "border-line-soft bg-panel text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "chords" ? (
        <div className="space-y-4">
          {GROUPS.map((group) => (
            <section key={group.label} className="panel p-4">
              <h2 className="text-[13px] font-semibold text-text">{group.label}</h2>
              <p className="mt-1 mb-4 text-[12px] leading-relaxed text-dim">{group.hint}</p>
              <div className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-4">
                {group.ids.map((id) => (
                  <ChordDiagram key={id} id={id} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <ScaleBox rootFret={5} label="A minor pentatonic — the solo shape" />

          <section className="panel space-y-2.5 p-4">
            <h2 className="text-[13px] font-semibold text-text">Why this one shape matters</h2>
            <p className="text-[12.5px] leading-relaxed text-muted">
              Slide it anywhere and it still works. Wherever your index finger lands on the
              thickest string names the key — fret 5 is A, fret 3 is G, fret 7 is B.
            </p>
            <p className="text-[12.5px] leading-relaxed text-muted">
              Learn it once and you can solo in any key. Most rock and blues lead playing is
              built on it.
            </p>
          </section>

          <section className="panel space-y-3 p-4">
            <h2 className="text-[13px] font-semibold text-text">Reading tab</h2>
            <p className="text-[12.5px] leading-relaxed text-muted">
              Six lines, one per string. Top line is the thinnest string, bottom is the
              thickest. Numbers are frets, read left to right.
            </p>
            <ul className="space-y-2 pt-1">
              {TAB_KEY.map(([symbol, meaning]) => (
                <li key={symbol} className="flex gap-3 text-[12.5px] text-muted">
                  <code className="w-8 shrink-0 font-mono font-semibold text-amber">
                    {symbol}
                  </code>
                  <span>{meaning}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel space-y-2.5 p-4">
            <h2 className="text-[13px] font-semibold text-text">12-bar blues</h2>
            <pre className="tabscroll font-mono text-[12px] leading-relaxed text-muted">
{`| A | A | A | A |
| D | D | A | A |
| E | D | A | A |`}
            </pre>
            <p className="text-[12px] leading-relaxed text-dim">
              Twelve bars, then repeat. Every blues jam assumes you know this.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
