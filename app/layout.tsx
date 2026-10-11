import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import type React from "react";
import { Toaster } from "sonner"
import { crimsonPro } from "@/lib/fonts";
import { SiteNavbar } from "@/components/layout/SiteNavbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Jimmy Sam",
    default: "Jimmy Sam",
  },
  description:
    "Jimmy's Software Engineering Portfolio - showcasing software engineering, AI, and startup projects.",
  keywords: [
    "Jimmy",
    "Sam",
    "Portfolio",
    "Software",
    "Engineering",
    "AI",
  ],
  openGraph: {
    title: "Jimmy's Portfolio",
    description:
      "Software engineering, AI, and startup projects by Jimmy Sam.",
    siteName: "Jimmy's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jimmy's Portfolio",
    description: "Software engineering, AI, and startup projects by Jimmy Sam.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${crimsonPro.className} ${crimsonPro.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <div className="relative z-20">
            <SiteNavbar />
            <div className="mx-auto mt-8 mb-16 w-full max-w-4xl px-6 tracking-tight sm:px-10 lg:px-0">{children}</div>
          </div>
          <Toaster richColors position="bottom-center"/>
        </ThemeProvider>
      </body>
    </html>
  );
}
