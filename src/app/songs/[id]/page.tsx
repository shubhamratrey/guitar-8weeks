import { notFound } from "next/navigation";
import { SongStage } from "@/components/SongStage";
import { OPEN_SONGS } from "@/lib/openTabs";
import { SONGS } from "@/lib/songs";

const ALL = [...SONGS, ...OPEN_SONGS];

export function generateStaticParams() {
  return ALL.map((song) => ({ id: song.id }));
}

/** params is a promise in Next 16 — the sync form was removed. */
export default async function SongPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = ALL.find((s) => s.id === id);
  if (!song) notFound();
  return <SongStage song={song} />;
}
