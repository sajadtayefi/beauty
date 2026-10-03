export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  /** Layout weight in the editorial grid. */
  featured?: boolean;
};

/** All site copy lives here — Persian, RTL. Rebranding = editing this file. */
export const site = {
  name: "بل بیوتی لب",
  monogram: "BBL",
  cta: "رزرو آنلاین",
  nav: [
    { label: "خانه", href: "#home" },
    { label: "نمونه‌کارها", href: "#our-work" },
    { label: "درباره ما", href: "#about" },
    { label: "تماس", href: "#contact" },
  ],
  socials: [
    { label: "توییتر", href: "https://twitter.com", short: "Tw" },
    { label: "اینستاگرام", href: "https://instagram.com", short: "Ig" },
    { label: "فیسبوک", href: "https://facebook.com", short: "Fb" },
  ],
  hero: {
    headline: "لبخندت، با دقت شروع می‌شود.",
    intro:
      "مشاوره و خدمات تخصصی دندانپزشکی، با تجربه‌ای ساده، شفاف و شخصی‌سازی‌شده.",
    primaryCta: "رزرو آنلاین",
    secondaryCta: "مشاهده نمونه‌کارها",
    image: "/images/hero-portrait.svg",
    imageAlt: "تصویر هنری از لبخند و مراقبت تخصصی",
    floating: [
      { title: "برنامه‌ریزی شفاف", body: "مراحل درمان را قبل از شروع می‌بینید" },
      { title: "وقت دلخواه شما", body: "رزرو آنلاین در کمتر از یک دقیقه" },
    ],
    badge: "تجربه‌ای ساده و شخصی‌سازی‌شده",
  },
  /** Feature statements — no invented statistics. */
  trust: {
    heading: "تجربه‌ای متفاوت از خدمات دندانپزشکی",
    items: [
      {
        title: "شفافیت کامل",
        body: "از اولین مشاوره تا پایان درمان، همه‌چیز روشن و قابل اعتماد است.",
      },
      {
        title: "توجه شخصی",
        body: "هر طرح درمان با شرایط و انتظارهای خود شما ساخته می‌شود.",
      },
      {
        title: "آسایش در اولویت",
        body: "محیطی آرام و بدون عجله؛ زمان شما در طول مراجعه محترم است.",
      },
      {
        title: "پیگیری دقیق",
        body: "بعد از هر مراجعه، مسیر درمان شما مشخص و دنبال‌شده می‌ماند.",
      },
    ],
  },
  services: {
    heading: "خدمات ما",
    intro: "از مشاورهٔ اولیه تا تکمیل لبخند — همه‌چیز در یک مسیر روشن.",
    items: [
      {
        id: "smile_design",
        title: "طراحی لبخند",
        description: "اصلاح طرح لبخند با برنامه‌ریزی دیجیتال و نتیجهٔ قابل پیش‌بینی.",
      },
      {
        id: "restoration",
        title: "ترمیم",
        description: "کامپوزیت، لمینت و درمان‌های ترمیمی زیبایی با جزئیات دقیق.",
      },
      {
        id: "implant",
        title: "ایمپلنت",
        description: "جایگزینی دندان از دست رفته با ایمپلنت، مرحله‌به‌مرحله.",
      },
      {
        id: "consult",
        title: "مشاورهٔ تخصصی",
        description: "بررسی دقیق وضعیت شما و پاسخ شفاف به همهٔ سؤال‌ها.",
      },
    ],
  },
  portfolio: {
    heading: "نمونه‌کارهای ما",
    intro:
      "گزیده‌ای از نتایجی که با دقت و برنامه‌ریزی ساخته شده‌اند — از اصلاح طرح لبخند تا ترمیم و ایمپلنت.",
    items: [
      {
        id: "smile-makeover",
        title: "اصلاح طرح لبخند",
        category: "طراحی لبخند",
        image: "/images/portfolio-1.svg",
        alt: "نتیجهٔ اصلاح طرح لبخند",
        featured: true,
      },
      {
        id: "restoration-case",
        title: "ترمیم زیبایی",
        category: "ترمیم",
        image: "/images/portfolio-2.svg",
        alt: "نتیجهٔ ترمیم زیبایی دندان",
      },
      {
        id: "implant-case",
        title: "ایمپلنت تک‌دندان",
        category: "ایمپلنت",
        image: "/images/portfolio-3.svg",
        alt: "نتیجهٔ ایمپلنت تک‌دندان",
      },
      {
        id: "consult-case",
        title: "برنامهٔ درمان کامل",
        category: "مشاوره",
        image: "/images/portfolio-4.svg",
        alt: "برنامهٔ درمان کامل پس از مشاوره",
      },
      {
        id: "smile-design-2",
        title: "طراحی لبخند مینیمال",
        category: "طراحی لبخند",
        image: "/images/portfolio-5.svg",
        alt: "طراحی لبخند با رویکرد مینیمال",
      },
      {
        id: "restoration-2",
        title: "بازسازی لبخند",
        category: "ترمیم",
        image: "/images/portfolio-6.svg",
        alt: "بازسازی کامل لبخند",
      },
    ] satisfies PortfolioItem[],
  },
  ctaBand: {
    heading: "آمادهٔ شروع هستید؟",
    body: "در چهار مرحلهٔ کوتاه وقت خود را رزرو کنید؛ بقیهٔ مسیر را با هم می‌سازیم.",
    button: "شروع رزرو",
  },
  footer: {
    heading: "بل بیوتی لب",
    intro: "کلینیک لبخند و خدمات دندانپزشکی با تجربه‌ای ساده، شفاف و شخصی‌سازی‌شده.",
    email: "hello@bellebeautylab.com",
    rights: "تمام حقوق محفوظ است",
  },
} as const;
