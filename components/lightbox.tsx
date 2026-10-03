"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { site } from "@/lib/site";
import { useUiStore } from "@/store/ui-store";
import { fadeIn, scaleIn } from "@/lib/motion";

export function Lightbox() {
  const lightboxItemId = useUiStore((s) => s.lightboxItemId);
  const closeLightbox = useUiStore((s) => s.closeLightbox);

  const item = site.portfolio.items.find((i) => i.id === lightboxItemId);

  useEffect(() => {
    if (!lightboxItemId) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxItemId, closeLightbox]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/90 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <motion.figure
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-2xl"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 672px, 90vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-start">
              <span>
                <span className="block text-xs font-medium text-accent">
                  {item.category}
                </span>
                <span className="mt-1 block text-xl font-semibold text-white">
                  {item.title}
                </span>
              </span>
            </figcaption>
          </motion.figure>

          <button
            type="button"
            onClick={closeLightbox}
            aria-label="بستن"
            className="absolute end-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
