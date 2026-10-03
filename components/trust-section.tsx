"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { fadeUp, staggerParent } from "@/lib/motion";

export function TrustSection() {
  const { heading, items } = site.trust;

  return (
    <section aria-label="مزیت‌های ما" className="border-y border-line bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 md:py-16">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10 text-center text-xl font-semibold text-text md:text-2xl"
        >
          {heading}
        </motion.h2>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="text-center">
              <p className="text-sm font-semibold text-text">{item.title}</p>
              <p className="mx-auto mt-2 max-w-[26ch] text-sm leading-6 text-muted">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
