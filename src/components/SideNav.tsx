"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/AppProvider";
import { TOTAL_DAYS } from "@/lib/curriculum";

const TABS = [
  { href: "/", label: "Today" },
  { href: "/songs", label: "Song bank" },
  { href: "/progress", label: "Progress" },
  { href: "/reference", label: "Chords" },
];

/** Desktop navigation. The bottom bar takes over below lg. */
export function SideNav() {
  const pathname = usePathname();
  const { stats, currentDay } = useApp();

  return (
    <aside className="hidden w-56 shrink-0 py-8 lg:block">
      <div className="sticky top-8">
        <Link href="/" className="block">
          <p className="legend">Electric guitar</p>
          <p className="display mt-1 text-[26px] leading-none text-text">Eight Weeks</p>
        </Link>

        <div className="rule my-6" />

        <nav className="space-y-1">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[14px] transition-colors ${
                  active
                    ? "bg-panel font-semibold text-amber"
                    : "text-muted hover:bg-panel/60 hover:text-text"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 rounded-full ${active ? "bg-amber" : "bg-line"}`}
                />
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="rule my-6" />

        <div className="space-y-1 px-3">
          <p className="legend">Where you are</p>
          <p className="display text-[15px] text-text">
            Day {currentDay} <span className="text-dim">of {TOTAL_DAYS}</span>
          </p>
          <p className="text-[12px] text-dim">
            {stats.daysDone} session{stats.daysDone === 1 ? "" : "s"} logged
          </p>
        </div>
      </div>
    </aside>
  );
}
