"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { useUiStore } from "@/store/ui-store";
import { fadeUp, staggerParent } from "@/lib/motion";

export function Portfolio() {
  const openLightbox = useUiStore((s) => s.openLightbox);
  const { heading, intro, items } = site.portfolio;
  const [featured, ...rest] = items;

  return (
    <section id="our-work" className="border-y border-line bg-surface py-20 md:py-28">
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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* featured case — large, spans two rows */}
          <motion.button
            type="button"
            variants={fadeUp}
            onClick={() => openLightbox(featured.id)}
            aria-label={`نمایش ${featured.title}`}
            className="group relative row-span-2 aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl sm:col-span-2 sm:aspect-auto sm:min-h-[32rem]"
          >
            <Image
              src={featured.image}
              alt={featured.alt}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent transition-opacity duration-500" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-start">
              <div>
                <p className="text-xs font-medium text-accent">{featured.category}</p>
                <p className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                  {featured.title}
                </p>
              </div>
              <span
                aria-hidden
                className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg text-white backdrop-blur transition-all duration-300 group-hover:bg-white/25"
              >
                +
              </span>
            </div>
          </motion.button>

          {rest.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              variants={fadeUp}
              onClick={() => openLightbox(item.id)}
              aria-label={`نمایش ${item.title}`}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-start">
                <div>
                  <p className="text-xs font-medium text-accent">{item.category}</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {item.title}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="mb-1 text-lg text-white/0 transition-all duration-300 group-hover:text-white/90"
                >
                  +
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
