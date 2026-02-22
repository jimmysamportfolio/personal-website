import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import type React from "react";
import { Toaster } from "sonner"
import { crimsonPro } from "@/lib/fonts";
import { SiteNavbar } from "@/components/SiteNavbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Ethan Hansen",
    default: "Ethan Hansen",
  },
  description:
    "Ethan's Design Engineer Portfolio - showcasing design, engineering, and business projects with a focus on creativity and innovation.",
  keywords: [
    "Ethan",
    "Hansen",
    "Portfolio",
    "Design",
    "Engineering",
    "Business",
  ],
  openGraph: {
    title: "Ethan's Portfolio",
    description:
      "Showcasing design, engineering, and business projects with creativity and innovation.",
    url: "https://www.ethanthansen.com",
    siteName: "Ethan's Portfolio",
    images: [
      {
        url: "https://rvkf0y9jdjpjjuzl.public.blob.vercel-storage.com/ethan-portfolio.png",
        width: 1200,
        height: 630,
        alt: "Ethan's Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan's Portfolio",
    description: "Design, engineering, and business projects by Ethan.",
    images: [
      "https://rvkf0y9jdjpjjuzl.public.blob.vercel-storage.com/portfolio-preview.png",
    ],
  },
  alternates: {
    canonical: "https://www.ethanthansen.com",
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