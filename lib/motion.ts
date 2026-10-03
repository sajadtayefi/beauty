import type { Transition, Variants } from "framer-motion";

export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Subtle, fast motion — the site should feel calm, not flashy. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.09 * i, ease: easeOut },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};

/** RTL slide: content enters from the right when moving forward. */
export const slideX: Variants = {
  hidden: (dir: 1 | -1 = 1) => ({ opacity: 0, x: dir === 1 ? 36 : -36 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: easeOut },
  },
  exit: (dir: 1 | -1 = 1) => ({
    opacity: 0,
    x: dir === 1 ? -28 : 28,
    transition: { duration: 0.22, ease: easeOut },
  }),
};

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
