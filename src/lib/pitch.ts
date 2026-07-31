/**
 * Open string pitches in standard tuning, indexed the way tab rows are: 0 is
 * the high e, 5 the low E. The single source of truth for both the synth and
 * the tuner, so the two can't disagree about what a string sounds like.
 */
export const STRING_HZ = [329.63, 246.94, 196.0, 146.83, 110.0, 82.41];

const STRING_LABELS = ["e", "B", "G", "D", "A", "E"];

/** Pitch of a fretted note. Twelve frets to an octave. */
export const noteHz = (stringIndex: number, fret: number) =>
  STRING_HZ[stringIndex] * 2 ** (fret / 12);

/** The same strings thickest-first, which is the order a tuner displays them. */
export const OPEN_STRINGS = STRING_HZ.map((hz, i) => ({
  label: STRING_LABELS[i],
  hz,
  /** Index into STRING_HZ, for talking to the synth. */
  stringIndex: i,
})).reverse();

const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

const MIN_HZ = 70; // below the low E, with headroom
const MAX_HZ = 1320; // above the high e at the 12th fret
/** Coarse search runs on a 4x-decimated copy; the fundamentals are all low. */
const DECIMATE = 4;

export interface Detection {
  hz: number;
  /** Normalised correlation at the chosen period, 0–1. */
  confidence: number;
}

/**
 * Normalised autocorrelation, run in two stages.
 *
 * Three things matter for a steady reading:
 *
 * 1. Normalising by the energy of both windows, so `confidence` means the same
 *    thing whether you played hard or soft, and the gate below is meaningful.
 * 2. Choosing the EARLIEST strong peak rather than the tallest. The tallest is
 *    frequently at twice the true period, which reads an octave low — the
 *    classic autocorrelation failure, and worst on the bass strings.
 * 3. A coarse pass on a decimated copy, refined at full rate only near the
 *    winner. Searching every lag at 44.1kHz costs millions of operations per
 *    reading, which drops frames and makes the display lurch.
 */
export function detectPitch(buffer: Float32Array, sampleRate: number): Detection | null {
  const n = buffer.length;

  let mean = 0;
  for (let i = 0; i < n; i += 1) mean += buffer[i];
  mean /= n;

  let rms = 0;
  for (let i = 0; i < n; i += 1) {
    const v = buffer[i] - mean;
    rms += v * v;
  }
  rms = Math.sqrt(rms / n);
  // Too quiet to be a plucked string; don't chase room noise.
  if (rms < 0.005) return null;

  /* ---- coarse pass on a decimated, DC-removed copy ---- */
  const m = Math.floor(n / DECIMATE);
  const small = new Float32Array(m);
  for (let i = 0; i < m; i += 1) {
    let sum = 0;
    for (let k = 0; k < DECIMATE; k += 1) sum += buffer[i * DECIMATE + k] - mean;
    small[i] = sum / DECIMATE;
  }

  const smallRate = sampleRate / DECIMATE;
  const minLag = Math.max(2, Math.floor(smallRate / MAX_HZ));
  const maxLag = Math.min(m - 8, Math.floor(smallRate / MIN_HZ));
  if (maxLag <= minLag + 2) return null;

  const nac = new Float32Array(maxLag + 2);
  let strongest = 0;
  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let dot = 0;
    let energyA = 0;
    let energyB = 0;
    const count = m - lag;
    for (let i = 0; i < count; i += 1) {
      const a = small[i];
      const b = small[i + lag];
      dot += a * b;
      energyA += a * a;
      energyB += b * b;
    }
    const scale = Math.sqrt(energyA * energyB);
    const value = scale > 0 ? dot / scale : 0;
    nac[lag] = value;
    if (value > strongest) strongest = value;
  }

  if (strongest < 0.5) return null;

  // Earliest local peak within 88% of the strongest, to stay on the fundamental.
  const threshold = strongest * 0.88;
  let coarse = -1;
  for (let lag = minLag + 1; lag < maxLag; lag += 1) {
    if (nac[lag] >= threshold && nac[lag] >= nac[lag - 1] && nac[lag] >= nac[lag + 1]) {
      coarse = lag;
      break;
    }
  }
  if (coarse < 0) return null;

  /* ---- refine at full rate, only around the winner ---- */
  const centre = coarse * DECIMATE;
  const lo = Math.max(2, centre - DECIMATE * 2);
  const hi = Math.min(n - 8, centre + DECIMATE * 2);

  const fine = new Float32Array(hi - lo + 1);
  let bestLag = centre;
  let bestValue = -Infinity;
  for (let lag = lo; lag <= hi; lag += 1) {
    let dot = 0;
    let energyA = 0;
    let energyB = 0;
    const count = n - lag;
    for (let i = 0; i < count; i += 1) {
      const a = buffer[i] - mean;
      const b = buffer[i + lag] - mean;
      dot += a * b;
      energyA += a * a;
      energyB += b * b;
    }
    const scale = Math.sqrt(energyA * energyB);
    const value = scale > 0 ? dot / scale : 0;
    fine[lag - lo] = value;
    if (value > bestValue) {
      bestValue = value;
      bestLag = lag;
    }
  }

  // Sub-sample accuracy. Without this, cents resolution on the high strings is
  // far too coarse to tune by.
  const at = bestLag - lo;
  const before = at > 0 ? fine[at - 1] : bestValue;
  const after = at < fine.length - 1 ? fine[at + 1] : bestValue;
  const denominator = 2 * (2 * bestValue - before - after);
  const shift = denominator !== 0 ? (after - before) / denominator : 0;
  const period = bestLag + Math.max(-1, Math.min(1, shift));

  const hz = sampleRate / period;
  if (hz < MIN_HZ || hz > MAX_HZ) return null;
  return { hz, confidence: bestValue };
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

/** Median, which throws out the odd rogue reading a mean would average in. */
export function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
