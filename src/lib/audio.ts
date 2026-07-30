"use client";

let ctx: AudioContext | null = null;

/**
 * One shared AudioContext for the whole app. Browsers cap how many you can
 * create, and iOS starts every one suspended until a user gesture resumes it.
 */
export async function getAudioContext(): Promise<AudioContext> {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") await ctx.resume();
  return ctx;
}

/** A short click, scheduled against the audio clock. */
export function scheduleClick(
  context: AudioContext,
  time: number,
  accent = false,
): void {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.frequency.value = accent ? 1600 : 1050;
  gain.gain.setValueAtTime(accent ? 0.5 : 0.26, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
  osc.connect(gain).connect(context.destination);
  osc.start(time);
  osc.stop(time + 0.05);
}

/** Fire a click right now. Fine for UI-driven ticks, not for tight sequencing. */
export async function clickNow(accent = false): Promise<void> {
  const context = await getAudioContext();
  scheduleClick(context, context.currentTime + 0.01, accent);
}
