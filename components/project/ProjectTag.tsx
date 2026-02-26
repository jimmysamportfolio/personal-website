"use client";

import { TAGS } from "@/constants/tags";
import { cn } from "@/lib/utils";

type TagKey = keyof typeof TAGS;

interface ProjectTagProps {
  tagKey: string;
}

export function ProjectTag({ tagKey }: ProjectTagProps) {

  const tag = TAGS[tagKey as TagKey];

  if (!tag) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium border border-white text-white">
        {tagKey}
      </span>
    );
  }

  const { icon: Icon, label, borderColor } = tag;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium border backdrop-blur-sm text-nowrap dark:shadow-none shadow-md"
      style={{
        borderColor: borderColor,
        backgroundColor: `${borderColor}3A`,
      }}
    >
      <Icon className={cn(`w-3 h-3 shrink-0`)} style={{ color: borderColor }} />
      <p style={{ color: borderColor }}>{label}</p>
    </span>
  );
}
