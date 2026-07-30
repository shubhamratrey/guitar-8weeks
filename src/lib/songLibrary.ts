import { ENGLISH_SONGS } from "./englishSongs";
import { HINDI_SONGS } from "./hindiSongs";
import { OPEN_SONGS } from "./openTabs";
import type { Song } from "./songs";

/**
 * The whole library, complete tabs first — those are the ones you can play
 * here and now, note for note.
 */
export const ALL_SONGS: Song[] = [...OPEN_SONGS, ...HINDI_SONGS, ...ENGLISH_SONGS];

export const getSong = (id: string): Song | undefined =>
  ALL_SONGS.find((song) => song.id === id);

export const countBy = (predicate: (song: Song) => boolean) =>
  ALL_SONGS.filter(predicate).length;
