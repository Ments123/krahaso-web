import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const display = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://krahaso.app"),
  title: "Krahaso çmimet e ushqimeve në Kosovë | Krahaso",
  description: "Krahaso çmimet e shportës në supermarketet e Kosovës, skano blerjet dhe fito shpërblime praktike.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Krahaso — Çdo shportë. Një zgjedhje më e zgjuar.",
    description: "Krahaso çmimet, skano blerjet dhe fito shpërblime — në një aplikacion të ndërtuar për Kosovën.",
    url: "https://krahaso.app",
    siteName: "Krahaso",
    locale: "sq_AL",
    type: "website"
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#16A466" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="sq" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
