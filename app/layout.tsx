import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krahaso.app"),
  title: "Krahaso — Bli më lirë. Fito shpërblime.",
  description:
    "Krahaso çmimet e shportës në supermarketet e Kosovës, gjej shportën më të lirë dhe fito pikë nga blerjet e tua.",
  openGraph: {
    title: "Krahaso — Bli më lirë. Fito shpërblime.",
    description:
      "Krahaso çmimet e shportës në supermarketet e Kosovës, gjej shportën më të lirë dhe fito pikë nga blerjet e tua.",
    url: "https://krahaso.app",
    siteName: "Krahaso",
    locale: "sq_AL",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#159A63",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
