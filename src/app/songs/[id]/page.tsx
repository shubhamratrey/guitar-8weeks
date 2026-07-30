import { notFound } from "next/navigation";
import { SongStage } from "@/components/SongStage";
import { ALL_SONGS, getSong } from "@/lib/songLibrary";

export function generateStaticParams() {
  return ALL_SONGS.map((song) => ({ id: song.id }));
}

/** params is a promise in Next 16 — the sync form was removed. */
export default async function SongPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = getSong(id);
  if (!song) notFound();
  return <SongStage song={song} />;
}
