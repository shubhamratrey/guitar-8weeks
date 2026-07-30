import { getChord } from "@/lib/chords";

/*
 * Drawn in a fixed 100-unit coordinate space and scaled to whatever size the
 * caller asks for, so the lines stay crisp and proportions never drift.
 */
const STRINGS = 6;
const FRETS = 4;
const LEFT = 12;
const RIGHT = 88;
const STRING_GAP = (RIGHT - LEFT) / (STRINGS - 1);
const MARKER_Y = 9;
const NUT_Y = 24;
const FRET_GAP = 18;
const LABEL_Y = NUT_Y + FRET_GAP * FRETS + 15;
const VIEW_H = LABEL_Y + 6;

const STRING_NAMES = ["E", "A", "D", "G", "B", "e"];

/**
 * A chord chart you can read at a glance with a guitar in your hands: low E on
 * the left, filled dots numbered with the finger to use.
 */
export function ChordDiagram({
  id,
  size = 112,
  showStringNames = true,
}: {
  id: string;
  size?: number;
  /** The E A D G B e row underneath. Worth keeping while you're learning. */
  showStringNames?: boolean;
}) {
  const chord = getChord(id);
  if (!chord) return null;

  const x = (stringIndex: number) => LEFT + stringIndex * STRING_GAP;
  const y = (fretOffset: number) => NUT_Y + FRET_GAP * (fretOffset - 0.5);
  const showNut = chord.baseFret === 1;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg
        viewBox={`0 0 100 ${VIEW_H}`}
        width={size}
        height={size * (VIEW_H / 100)}
        role="img"
        aria-label={`${chord.name} chord`}
      >
        {/* open and muted markers above the nut */}
        {chord.frets.map((fret, i) => {
          if (fret > 0) return null;
          return fret === 0 ? (
            <circle
              key={`o-${i}`}
              cx={x(i)}
              cy={MARKER_Y}
              r={3.4}
              fill="none"
              stroke="var(--color-text)"
              strokeWidth={1.5}
            />
          ) : (
            <g key={`x-${i}`} stroke="var(--color-dim)" strokeWidth={1.8} strokeLinecap="round">
              <line x1={x(i) - 3.2} y1={MARKER_Y - 3.2} x2={x(i) + 3.2} y2={MARKER_Y + 3.2} />
              <line x1={x(i) - 3.2} y1={MARKER_Y + 3.2} x2={x(i) + 3.2} y2={MARKER_Y - 3.2} />
            </g>
          );
        })}

        {/* nut, or the starting fret number when the shape sits up the neck */}
        {showNut ? (
          <line
            x1={LEFT - 1}
            y1={NUT_Y}
            x2={RIGHT + 1}
            y2={NUT_Y}
            stroke="var(--color-text)"
            strokeWidth={4}
            strokeLinecap="butt"
          />
        ) : (
          <text
            x={LEFT - 5}
            y={y(1) + 4}
            textAnchor="end"
            fontSize={11}
            fontWeight={600}
            fill="var(--color-amber)"
            fontFamily="var(--font-mono)"
          >
            {chord.baseFret}
          </text>
        )}

        {/* frets */}
        {Array.from({ length: FRETS }, (_, f) => (
          <line
            key={`f-${f}`}
            x1={LEFT}
            y1={NUT_Y + FRET_GAP * (f + 1)}
            x2={RIGHT}
            y2={NUT_Y + FRET_GAP * (f + 1)}
            stroke="var(--color-muted)"
            strokeOpacity={0.45}
            strokeWidth={1.2}
          />
        ))}

        {/* strings */}
        {Array.from({ length: STRINGS }, (_, s) => (
          <line
            key={`s-${s}`}
            x1={x(s)}
            y1={NUT_Y}
            x2={x(s)}
            y2={NUT_Y + FRET_GAP * FRETS}
            stroke="var(--color-muted)"
            strokeOpacity={s === 0 ? 0.7 : 0.5}
            strokeWidth={s === 0 ? 1.8 : 1.2}
          />
        ))}

        {/* barre */}
        {chord.barre && (
          <line
            x1={x(chord.barre[0])}
            y1={y(1)}
            x2={x(chord.barre[1])}
            y2={y(1)}
            stroke="var(--color-amber)"
            strokeWidth={13}
            strokeLinecap="round"
          />
        )}

        {/* finger dots */}
        {chord.frets.map((fret, i) => {
          if (fret <= 0) return null;
          const offset = fret - chord.baseFret + 1;
          if (offset < 1 || offset > FRETS) return null;
          const underBarre =
            chord.barre && offset === 1 && i >= chord.barre[0] && i <= chord.barre[1];
          return (
            <g key={`d-${i}`}>
              {!underBarre && (
                <circle cx={x(i)} cy={y(offset)} r={7} fill="var(--color-amber)" />
              )}
              {chord.fingers[i] > 0 && (
                <text
                  x={x(i)}
                  y={y(offset) + 3.6}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={700}
                  fill="#17120a"
                  fontFamily="var(--font-sans)"
                >
                  {chord.fingers[i]}
                </text>
              )}
            </g>
          );
        })}

        {/* which string is which */}
        {showStringNames &&
          STRING_NAMES.map((name, i) => (
            <text
              key={name}
              x={x(i)}
              y={LABEL_Y}
              textAnchor="middle"
              fontSize={9}
              fill="var(--color-dim)"
              fontFamily="var(--font-mono)"
            >
              {name}
            </text>
          ))}
      </svg>

      <span className="display text-[15px] leading-none text-text">{chord.id}</span>
    </div>
  );
}

export function ChordRow({ ids, size = 96 }: { ids: string[]; size?: number }) {
  const known = ids.filter((id) => getChord(id));
  if (!known.length) return null;
  return (
    <div className="tabscroll -mx-1 flex gap-4 px-1 pb-1">
      {known.map((id) => (
        <ChordDiagram key={id} id={id} size={size} showStringNames={false} />
      ))}
    </div>
  );
}
