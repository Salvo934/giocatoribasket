import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Giocatori · Player card basket",
    template: "%s · Giocatori",
  },
  description: "Schede giocatore per procuratori e agenzie di basket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={[dmSans.variable, bebasNeue.variable].join(" ")}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
