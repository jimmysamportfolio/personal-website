import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import type React from "react";
import { Toaster } from "sonner"
import { crimsonPro } from "@/lib/fonts";
import { SiteNavbar } from "@/components/SiteNavbar";

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
            <div className="max-w-[571px] px-6 mx-0 sm:px-0 sm:mx-auto mt-4 mb-8 w-full tracking-tight">{children}</div>
          </div>
          <Toaster richColors position="bottom-center"/>
        </ThemeProvider>
      </body>
    </html>
  );
}