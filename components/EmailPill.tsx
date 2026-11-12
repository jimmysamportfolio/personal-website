"use client";

import { useRef, useState } from "react";

/** Email link that also copies the address and confirms in place. It still opens the mail app. */
export function EmailPill({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const onClick = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  };

  return (
    <a href={`mailto:${address}`} onClick={onClick} className={copied ? "copied" : undefined}>
      <span className="swap">
        <span className="a">Email</span>
        <span className="b" aria-hidden="true">Copied</span>
      </span>
      <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
    </a>
  );
}
