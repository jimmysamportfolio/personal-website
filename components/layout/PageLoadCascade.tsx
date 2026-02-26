"use client";

import { motion } from "framer-motion";
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";

const itemVariant = {
  hidden: { opacity: 0, y: 4, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const CascadeCounterContext = createContext<MutableRefObject<number> | null>(null);

export function PageLoadCascade({
  children,
  className,
  stagger = 0.06,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const parentCounterRef = useContext(CascadeCounterContext);
  const localCounterRef = useRef(0);
  const reservationRef = useRef<{ start: number; count: number } | null>(null);

  const counterRef = parentCounterRef ?? localCounterRef;
  const childArray = Children.toArray(children);

  if (
    reservationRef.current === null ||
    reservationRef.current.count !== childArray.length
  ) {
    const start = counterRef.current;
    counterRef.current += childArray.length;
    reservationRef.current = { start, count: childArray.length };
  }

  const startIndex = reservationRef.current.start;

  return (
    <CascadeCounterContext.Provider value={counterRef}>
      <motion.div className={className} initial="hidden" animate="show">
        {childArray.map((child, idx) => {
          const key =
            isValidElement(child) && child.key != null ? String(child.key) : idx;

          return (
            <motion.div
              key={key}
              variants={itemVariant}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: (startIndex + idx) * stagger,
              }}
            >
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    </CascadeCounterContext.Provider>
  );
}
