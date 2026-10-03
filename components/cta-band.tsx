"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { fadeUp } from "@/lib/motion";

export function CtaBand() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-[2rem] bg-surface-dark px-6 py-14 text-center sm:px-12 md:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 start-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl rtl:translate-x-1/2"
          />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {site.ctaBand.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/70">
            {site.ctaBand.body}
          </p>
          <Link
            href="/book"
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-accent px-8 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-lift active:translate-y-0"
          >
            {site.ctaBand.button}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
