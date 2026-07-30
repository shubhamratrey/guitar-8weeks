import { getChord } from "@/lib/chords";

const STRINGS = 6;
const FRETS = 4;

/**
 * Standard chord chart: six vertical strings with low E on the left, frets
 * running down. Drawn as SVG so it stays sharp and needs no assets.
 */
export function ChordDiagram({ id, size = 88 }: { id: string; size?: number }) {
  const chord = getChord(id);
  if (!chord) return null;

  const pad = size * 0.16;
  const w = size;
  const h = size * 1.12;
  const gridW = w - pad * 2;
  const gridH = h - pad * 2.1;
  const stringGap = gridW / (STRINGS - 1);
  const fretGap = gridH / FRETS;

  const x = (stringIndex: number) => pad + stringIndex * stringGap;
  const y = (fretOffset: number) => pad * 1.5 + fretGap * (fretOffset - 0.5);

  const showNut = chord.baseFret === 1;
  const dotR = stringGap * 0.34;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        role="img"
        aria-label={`${chord.name} chord diagram`}
        className="overflow-visible"
      >
        {/* open / muted markers above the nut */}
        {chord.frets.map((fret, i) => {
          if (fret > 0) return null;
          const cx = x(i);
          const cy = pad * 0.75;
          return fret === 0 ? (
            <circle
              key={`o-${i}`}
              cx={cx}
              cy={cy}
              r={dotR * 0.52}
              fill="none"
              stroke="var(--color-muted)"
              strokeWidth={1.2}
            />
          ) : (
            <g key={`x-${i}`} stroke="var(--color-dim)" strokeWidth={1.3}>
              <line x1={cx - 3} y1={cy - 3} x2={cx + 3} y2={cy + 3} />
              <line x1={cx - 3} y1={cy + 3} x2={cx + 3} y2={cy - 3} />
            </g>
          );
        })}

        {/* nut, or the fret number when the shape sits up the neck */}
        {showNut ? (
          <line
            x1={pad}
            y1={pad * 1.5}
            x2={pad + gridW}
            y2={pad * 1.5}
            stroke="var(--color-text)"
            strokeWidth={3}
            strokeLinecap="round"
          />
        ) : (
          <text
            x={pad - 5}
            y={pad * 1.5 + fretGap * 0.62}
            textAnchor="end"
            fontSize={size * 0.13}
            fill="var(--color-muted)"
            fontFamily="var(--font-mono)"
          >
            {chord.baseFret}
          </text>
        )}

        {/* frets */}
        {Array.from({ length: FRETS }, (_, f) => (
          <line
            key={`f-${f}`}
            x1={pad}
            y1={pad * 1.5 + fretGap * (f + 1)}
            x2={pad + gridW}
            y2={pad * 1.5 + fretGap * (f + 1)}
            stroke="var(--color-line)"
            strokeWidth={1}
          />
        ))}

        {/* strings */}
        {Array.from({ length: STRINGS }, (_, s) => (
          <line
            key={`s-${s}`}
            x1={x(s)}
            y1={pad * 1.5}
            x2={x(s)}
            y2={pad * 1.5 + gridH}
            stroke="var(--color-line)"
            strokeWidth={s === 0 ? 1.6 : 1}
          />
        ))}

        {/* barre bar */}
        {chord.barre && (
          <line
            x1={x(chord.barre[0])}
            y1={y(1)}
            x2={x(chord.barre[1])}
            y2={y(1)}
            stroke="var(--color-amber)"
            strokeWidth={dotR * 1.9}
            strokeLinecap="round"
          />
        )}

        {/* finger dots */}
        {chord.frets.map((fret, i) => {
          if (fret <= 0) return null;
          const offset = fret - chord.baseFret + 1;
          if (offset < 1 || offset > FRETS) return null;
          const isBarreDot =
            chord.barre && offset === 1 && i >= chord.barre[0] && i <= chord.barre[1];
          if (isBarreDot) return null;
          return (
            <g key={`d-${i}`}>
              <circle cx={x(i)} cy={y(offset)} r={dotR} fill="var(--color-amber)" />
              {chord.fingers[i] > 0 && (
                <text
                  x={x(i)}
                  y={y(offset) + dotR * 0.42}
                  textAnchor="middle"
                  fontSize={dotR * 1.15}
                  fill="#1a1207"
                  fontWeight={700}
                  fontFamily="var(--font-sans)"
                >
                  {chord.fingers[i]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <span className="text-xs font-semibold tracking-wide text-text">{chord.id}</span>
    </div>
  );
}

export function ChordRow({ ids }: { ids: string[] }) {
  const known = ids.filter((id) => getChord(id));
  if (!known.length) return null;
  return (
    <div className="tabscroll -mx-1 flex gap-4 px-1 pb-1">
      {known.map((id) => (
        <ChordDiagram key={id} id={id} />
      ))}
    </div>
  );
}
