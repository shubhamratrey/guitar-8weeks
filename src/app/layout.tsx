import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { SideNav } from "@/components/SideNav";
import { AppProvider } from "@/lib/AppProvider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eight Weeks — Electric Guitar",
  description: "A day-by-day electric guitar plan for beginners, with progress tracking.",
};

export const viewport: Viewport = {
  themeColor: "#14100b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <AppProvider>
          <div className="mx-auto flex min-h-dvh w-full max-w-6xl gap-10 px-4 sm:px-6 lg:px-8">
            <SideNav />
            <main className="min-w-0 flex-1 pb-28 pt-6 lg:pb-16 lg:pt-8">{children}</main>
          </div>
          <NavBar />
        </AppProvider>
      </body>
    </html>
  );
}
