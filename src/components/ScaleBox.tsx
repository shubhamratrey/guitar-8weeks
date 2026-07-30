const STRING_LABELS = ["e", "B", "G", "D", "A", "E"];

/** Minor pentatonic box 1, as offsets from the root fret, high e → low E. */
const BOX_1: number[][] = [
  [0, 3],
  [0, 3],
  [0, 2],
  [0, 2],
  [0, 2],
  [0, 3],
];

/**
 * Fretboard view — strings horizontal, so it matches what you see looking down
 * at the neck. Root notes are highlighted because knowing where home is
 * matters more than knowing the shape.
 */
export function ScaleBox({
  rootFret = 5,
  label = "A minor pentatonic — box 1",
}: {
  rootFret?: number;
  label?: string;
}) {
  const frets = 5;
  const w = 300;
  const h = 150;
  const padX = 30;
  const padY = 16;
  const gridW = w - padX - 16;
  const gridH = h - padY * 2;
  const fretGap = gridW / frets;
  const stringGap = gridH / 5;

  const x = (offset: number) => padX + fretGap * (offset + 0.5);
  const y = (stringIndex: number) => padY + stringGap * stringIndex;

  return (
    <figure className="rounded-xl border border-line-soft bg-ink/60 p-3">
      <figcaption className="mb-2 text-[11px] font-medium tracking-wide text-muted">
        {label}
      </figcaption>
      <div className="tabscroll">
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ minWidth: 280 }} role="img" aria-label={label}>
          {/* strings */}
          {STRING_LABELS.map((s, i) => (
            <g key={s}>
              <line
                x1={padX}
                y1={y(i)}
                x2={padX + gridW}
                y2={y(i)}
                stroke="var(--color-line)"
                strokeWidth={i >= 4 ? 1.5 : 1}
              />
              <text
                x={padX - 9}
                y={y(i) + 4}
                textAnchor="end"
                fontSize={11}
                fill="var(--color-dim)"
                fontFamily="var(--font-mono)"
              >
                {s}
              </text>
            </g>
          ))}

          {/* fret wires */}
          {Array.from({ length: frets + 1 }, (_, f) => (
            <line
              key={f}
              x1={padX + fretGap * f}
              y1={padY}
              x2={padX + fretGap * f}
              y2={padY + gridH}
              stroke="var(--color-line)"
              strokeWidth={1}
            />
          ))}

          {/* fret numbers */}
          {Array.from({ length: frets }, (_, f) => (
            <text
              key={f}
              x={x(f)}
              y={h - 2}
              textAnchor="middle"
              fontSize={10}
              fill="var(--color-dim)"
              fontFamily="var(--font-mono)"
            >
              {rootFret + f}
            </text>
          ))}

          {/* scale dots */}
          {BOX_1.map((offsets, stringIndex) =>
            offsets.map((offset) => {
              const isRoot = offset === 0 && (stringIndex === 5 || stringIndex === 0);
              return (
                <circle
                  key={`${stringIndex}-${offset}`}
                  cx={x(offset)}
                  cy={y(stringIndex)}
                  r={9}
                  fill={isRoot ? "var(--color-amber)" : "var(--color-panel-2)"}
                  stroke={isRoot ? "var(--color-amber)" : "var(--color-muted)"}
                  strokeWidth={1.4}
                />
              );
            }),
          )}
        </svg>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-dim">
        Filled dots are the root note — land your phrases there. Index finger covers fret{" "}
        {rootFret}, ring and pinky take the rest.
      </p>
    </figure>
  );
}
