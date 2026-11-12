import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "Jimmy Sam" };

const description =
  "Founding engineer at Cedar, building AI agents that help exceptional teams hire through their network.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jimmysam.ca"),
  title: { default: "Jimmy Sam", template: "%s · Jimmy Sam" },
  description,
  openGraph: {
    title: "Jimmy Sam",
    description,
    url: "/",
    siteName: "Jimmy Sam",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: "Jimmy Sam", description, images: [OG_IMAGE.url] },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f6",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
