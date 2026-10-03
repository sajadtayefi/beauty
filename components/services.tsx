"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { fadeUp, staggerParent } from "@/lib/motion";
import {
  ArrowIcon,
  ChatIcon,
  ImplantIcon,
  SparkleIcon,
  ToothIcon,
} from "@/components/icons";

const serviceIcons: Record<string, typeof ToothIcon> = {
  smile_design: SparkleIcon,
  restoration: ToothIcon,
  implant: ImplantIcon,
  consult: ChatIcon,
};

export function Services() {
  const { heading, intro, items } = site.services;

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-xl"
        >
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 leading-8 text-muted">{intro}</p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((service) => {
            const Icon = serviceIcons[service.id] ?? ToothIcon;
            return (
              <motion.article
                key={service.id}
                variants={fadeUp}
                className="group relative flex flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent-strong transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-base font-semibold text-text">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  {service.description}
                </p>
                <Link
                  href="/book"
                  aria-label={`رزرو ${service.title}`}
                  className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent-strong transition-colors hover:text-text"
                >
                  رزرو
                  <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
