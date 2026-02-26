"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { crimsonPro, nanumPenScript } from "@/lib/fonts";

type Polaroid = {
  src: string;
  alt: string;
  date: string;
  description: string;
};

// Add your own photos here! Place images in public/about/ and add entries below.
const polaroids: Polaroid[] = [];

export default function PolaroidGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="flex w-screen items-center justify-start overflow-visible md:ml-0 md:w-fit"
    >
      <div
        className="
          overflow-x-auto
          py-6
          no-scrollbar
          md:overflow-visible px-0 md:py-4
        "
      >
        <div className="flex w-max space-x-0">
          {polaroids.map((p, i) => {
            const rotation = (i % 2 === 0 ? -1 : 1) * (2);

            return (
              <motion.div
                key={i}
                className={clsx(
                  "relative bg-zinc-50 border border-zinc-200 p-1 w-32",
                  "flex flex-shrink-0 flex-col items-center"
                )}
                style={{
                  rotate: rotation,
                  zIndex: hovered === i ? 50 : i,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={240}
                  height={300}
                  className="aspect-[4/5] object-cover"
                />
                <div className={`my-1 text-center ${nanumPenScript.className}`}>
                  <p className="md:text-sm text-zinc-700 font-medium">{p.description}</p>
                  <p className="text-xs text-zinc-500">{p.date}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
