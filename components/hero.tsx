"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { fadeUp } from "@/lib/motion";
import { SparkleIcon } from "@/components/icons";

export function Hero() {
  const { hero } = site;

  return (
    <section id="home" className="relative overflow-hidden">
      {/* soft background shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl rtl:translate-x-1/2"
      />
      <span>
        this is mew code
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 end-[-6rem] h-80 w-80 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:grid-cols-[1.05fr_1fr] md:gap-8 md:pb-28 md:pt-16">
        {/* copy — right in RTL */}
        <div className="order-2 md:order-1">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium text-muted"
          >
            <SparkleIcon className="h-3.5 w-3.5 text-accent" />
            {hero.badge}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="max-w-xl text-4xl font-bold leading-[1.25] tracking-tight text-text sm:text-5xl md:text-[3.4rem]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-lg text-base leading-8 text-muted"
          >
            {hero.intro}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/book"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-bg shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0"
            >
              {hero.primaryCta}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              >
                ←
              </span>
            </Link>
            <a
              href="#our-work"
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-7 text-sm font-medium text-text transition-colors duration-200 hover:border-primary/30"
            >
              {hero.secondaryCta}
            </a>
          </motion.div>
        </div>

        {/* visual — left in RTL */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="relative order-1 md:order-2"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-lift md:max-w-none">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 46vw, 92vw"
              className="object-cover object-top"
            />
          </div>

          {/* floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-5 start-4 flex items-center gap-3 rounded-2xl border border-line bg-surface/95 p-4 shadow-lift backdrop-blur sm:start-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-strong">
              <SparkleIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-text">
                {hero.floating[0].title}
              </p>
              <p className="mt-0.5 text-xs leading-5 text-muted">
                {hero.floating[0].body}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-4 end-4 hidden items-center gap-3 rounded-2xl border border-line bg-surface/95 p-4 shadow-lift backdrop-blur sm:flex lg:end-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <SparkleIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-text">
                {hero.floating[1].title}
              </p>
              <p className="mt-0.5 text-xs leading-5 text-muted">
                {hero.floating[1].body}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
