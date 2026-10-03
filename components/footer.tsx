import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="bg-surface-dark py-12 text-white md:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-7 px-5 text-center sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[11px] font-semibold tracking-widest">
            {site.monogram}
          </span>
          <p className="text-lg font-semibold">{site.footer.heading}</p>
        </div>

        <p className="max-w-sm text-sm leading-7 text-white/60">
          {site.footer.intro}
        </p>

        <a
          href={`mailto:${site.footer.email}`}
          className="min-h-11 rounded-full bg-accent px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
        >
          {site.footer.email}
        </a>

        <div className="flex gap-6 text-sm text-white/60">
          {site.socials.map((social) => (
            <a
              key={social.short}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 py-2 transition-colors hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-white/35">
          © {new Date().getFullYear()} {site.name} — {site.footer.rights}
        </p>
      </div>
    </footer>
  );
}
