'use client'

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative mt-16 flex w-full flex-row items-center justify-between overflow-visible text-xs font-light">
      <p>© February 2026</p>
      <button
        onClick={scrollToTop}
        className="flex flex-row gap-1 text-foreground hover:underline items-center"
      >
        Back to top
        <ArrowUp height={8} width={8} />
      </button>
    </div>
  );
}
