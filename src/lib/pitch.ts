/** Open string pitches in standard tuning, thickest first. */
export const OPEN_STRINGS = [
  { label: "E", octave: 2, hz: 82.41 },
  { label: "A", octave: 2, hz: 110.0 },
  { label: "D", octave: 3, hz: 146.83 },
  { label: "G", octave: 3, hz: 196.0 },
  { label: "B", octave: 3, hz: 246.94 },
  { label: "e", octave: 4, hz: 329.63 },
];

const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

/**
 * Autocorrelation pitch detection.
 *
 * A guitar's waveform is strongly periodic, so the lag at which the signal best
 * matches a delayed copy of itself is one period. Peak-picking skips the initial
 * decline from lag 0, then parabolic interpolation between the samples either
 * side of the peak gets sub-sample accuracy — without it, resolution at the
 * high E is far too coarse to read cents.
 */
export function detectPitch(buffer: Float32Array, sampleRate: number): number | null {
  const size = buffer.length;

  let rms = 0;
  for (let i = 0; i < size; i += 1) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / size);
  // Too quiet to be a plucked string; don't chase room noise.
  if (rms < 0.008) return null;

  const minLag = Math.max(2, Math.floor(sampleRate / 1300));
  const maxLag = Math.min(size - 1, Math.floor(sampleRate / 65));
  if (maxLag <= minLag) return null;

  const corr = new Float32Array(maxLag + 2);
  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let sum = 0;
    for (let i = 0; i < size - lag; i += 1) sum += buffer[i] * buffer[i + lag];
    corr[lag] = sum / (size - lag);
  }

  // Walk past the descending shoulder next to lag 0 before looking for the peak.
  let lag = minLag;
  while (lag < maxLag && corr[lag] > corr[lag + 1]) lag += 1;

  let peak = -1;
  let peakValue = -Infinity;
  for (; lag <= maxLag; lag += 1) {
    if (corr[lag] > peakValue) {
      peakValue = corr[lag];
      peak = lag;
    }
  }
  if (peak < 1) return null;

  // Reject weak matches, which are usually noise rather than a note.
  const energy = rms * rms;
  if (energy <= 0 || peakValue / energy < 0.35) return null;

  const before = corr[peak - 1] ?? 0;
  const at = corr[peak];
  const after = corr[peak + 1] ?? 0;
  const denominator = 2 * (2 * at - before - after);
  const shift = denominator !== 0 ? (after - before) / denominator : 0;
  const period = peak + Math.max(-1, Math.min(1, shift));

  const hz = sampleRate / period;
  return hz >= 60 && hz <= 1300 ? hz : null;
}

export interface Reading {
  hz: number;
  /** Note name with octave, e.g. "A2". */
  note: string;
  /** How far off, in cents. Negative is flat, positive is sharp. */
  cents: number;
  /** Index into OPEN_STRINGS of the string this is nearest to. */
  nearestString: number;
}

export function describePitch(hz: number): Reading {
  const midi = 12 * Math.log2(hz / 440) + 69;
  const rounded = Math.round(midi);
  const cents = Math.round((midi - rounded) * 100);
  const note = `${NOTE_NAMES[((rounded % 12) + 12) % 12]}${Math.floor(rounded / 12) - 1}`;

  let nearestString = 0;
  let smallest = Infinity;
  OPEN_STRINGS.forEach((string, i) => {
    const distance = Math.abs(1200 * Math.log2(hz / string.hz));
    if (distance < smallest) {
      smallest = distance;
      nearestString = i;
    }
  });

  return { hz, note, cents, nearestString };
}

/** Median of the recent readings — a plucked note wavers as it decays. */
export function steadyHz(history: number[]): number | null {
  if (history.length < 3) return null;
  const sorted = [...history].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}
