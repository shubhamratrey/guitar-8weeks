"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Today" },
  { href: "/songs", label: "Songs" },
  { href: "/progress", label: "Progress" },
  { href: "/reference", label: "Chords" },
];

/** Mobile navigation. The sidebar takes over from lg upwards. */
export function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-20 border-t border-line bg-ink/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex w-full max-w-2xl">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className="relative flex-1 py-4 text-center"
            >
              {active && (
                <span className="absolute inset-x-7 top-0 h-[2px] bg-amber" aria-hidden />
              )}
              <span
                className={`text-[13px] transition-colors ${
                  active ? "font-semibold text-amber" : "text-dim"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
