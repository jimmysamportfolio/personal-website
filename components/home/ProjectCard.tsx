"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import MediaPreview from "@/components/project/MediaPreview";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface ProjectCardProps {
  slug: string;
  title: string;
  role: string;
  tags: string[];
  type?: string;
  previewImage: string;
  featured: boolean;
  date?: string;
  className?: string;
  yearLabel?: string;
  isDimmed?: boolean;
  isActive?: boolean;
  showMeta?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export function ProjectCard({
  slug,
  title,
  role,
  // type,
  // tags,
  previewImage,
  className,
  yearLabel,
  isDimmed = false,
  isActive = false,
  showMeta = true,
  onHoverStart,
  onHoverEnd,
}: ProjectCardProps) {
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSpringX = useSpring(cursorX, {
    stiffness: 400,
    damping: 24,
    mass: 0.2,
  });
  const cursorSpringY = useSpring(cursorY, {
    stiffness: 400,
    damping: 24,
    mass: 0.2,
  });
  const cursorOffsetX = useTransform(cursorSpringX, (value) => value - 4);
  const cursorOffsetY = useTransform(cursorSpringY, (value) => value - 4);

  return (
    <div>
      <Link
        href={`/project/${slug}`}
        className={cn(
          "relative block w-full break-inside-avoid transition-all duration-200 ease-out group",
          className,
          isDimmed && "opacity-20",
          isActive && "z-30 opacity-100",
        )}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        <div className="relative overflow-hidden aspect-[5/3] bg-background transition-all duration-200 ease-out">
          <AnimatePresence>
            {isCursorVisible && (
              <motion.span
                className="pointer-events-none absolute left-0 top-0 z-20 h-2 w-2 bg-white mix-blend-difference"
                style={{ x: cursorOffsetX, y: cursorOffsetY }}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
          <div
            className="h-full"
            onMouseEnter={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              cursorX.set(event.clientX - rect.left);
              cursorY.set(event.clientY - rect.top);
              setIsCursorVisible(true);
            }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              cursorX.set(event.clientX - rect.left);
              cursorY.set(event.clientY - rect.top);
            }}
            onMouseLeave={() => setIsCursorVisible(false)}
          >
            <MediaPreview
              src={previewImage}
              className="absolute flex h-full w-full group-hover:brightness-95 transition-all duration-200 ease-out group-hover:scale-[1.01]"
            />
          </div>
        </div>

        {isActive && (
          <>
            <div className="absolute left-[-8px] top-[-10px] border border-[#e3e3e3] bg-white px-3 py-2 text-[12px] text-black transition-all duration-200 ease-out">
              {title}
            </div>
            <div className="absolute bottom-[-10px] right-[-8px] border border-[#e3e3e3] bg-white px-3 py-2 text-[12px] text-black transition-all duration-200 ease-out">
              {yearLabel ?? "2026"}
            </div>
          </>
        )}
      </Link>

      {showMeta && (
        <div className="flex flex-col my-2 -space-y-0.5">
          <span className="text-foreground font-normal text-sm">{title}</span>
          <span className="text-muted-foreground font-thin text-[11px]">
            {role}
          </span>
        </div>
      )}
    </div>
  );
}
