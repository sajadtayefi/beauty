"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { useUiStore } from "@/store/ui-store";

export function Navbar() {
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* brand — right in RTL */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-[11px] font-semibold tracking-widest text-bg">
            {site.monogram}
          </span>
          <span className="text-lg font-semibold text-text">{site.name}</span>
        </Link>

        {/* center nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="ناوبری اصلی">
          {site.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-1 py-2 text-sm font-medium text-muted transition-colors hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* left actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/book"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-bg shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-lift active:translate-y-0 sm:block"
          >
            {site.cta}
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-text transition-colors hover:bg-primary/5 md:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className={`absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "top-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1.5 h-0.5 rounded bg-current transition-all duration-200 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-3 h-0.5 rounded bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "top-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
            aria-label="ناوبری موبایل"
          >
            <div className="flex flex-col gap-1 px-5 pb-5 pt-2">
              {site.nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-text transition-colors hover:bg-primary/5"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-bg"
              >
                {site.cta}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
