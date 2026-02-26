"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";


const menuItems = [
  { href: "/about", label: "about" },
];

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const backgroundVariants = {
    hidden: {
      clipPath: "inset(0 0 100% 0)",
    },
    visible: {
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      clipPath: "inset(0 0 100% 0)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        delay: 0.2 + i * 0.05,
        ease: "easeOut",
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        delay: (menuItems.length - i) * 0.02,
        ease: "easeIn",
      },
    }),
  };

  return (
    <div className="relative z-40 w-full">
      <header className="py-4">
        <div className="px-6 mx-0 sm:px-0 sm:mx-auto w-full flex h-14 max-w-[571px] items-center justify-between text-sm text-[#3b3b3b]">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            jimmy.sam
          </Link>

          <nav className="hidden items-center gap-8 sm:flex">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-0.5 hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[101] h-8 w-8 sm:hidden"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-6 w-6 flex-col items-center justify-center">
                <span
                  className={`absolute h-[1px] bg-foreground transition-all duration-300 ${
                    isOpen ? "w-6 translate-y-0 rotate-45" : "w-6 -translate-y-1"
                  }`}
                />
                <span
                  className={`absolute h-[1px] w-6 bg-foreground transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-[1px] bg-foreground transition-all duration-300 ${
                    isOpen ? "w-6 translate-y-0 -rotate-45" : "w-6 translate-y-1"
                  }`}
                />
              </div>
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="h-full w-full overflow-auto pt-32">
              <div className="space-y-6 px-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 text-4xl"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}