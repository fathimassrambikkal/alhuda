import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
// FIX: import the single source of truth for Locale instead of redefining it here.
// If a locale is ever added/removed in i18n/config, this file no longer drifts out of sync.
import type { Locale } from "@/i18n/config";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = locale === "ar" ? ar : en;

  const socials = [
    {
      label: t.footer.instagram,
      href: "https://www.instagram.com/hichem.halaoui?igsh=MW81NDVqaGtqamdodQ==",
    },
    {
      label: t.footer.facebook,
      href: "https://www.facebook.com/share/19N7EFxmb7/",
    },
    {
      label: t.footer.tiktok,
      href: "https://vt.tiktok.com/ZSXVxGTeh/",
    },
  ];

  // FIX: compute the year instead of hardcoding 2026 — was already wrong on Jan 1, 2027
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative flex min-h-[600px] w-full flex-col overflow-hidden bg-black text-white">
      {/* =========================
          MAIN CONTENT
      ========================== */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center sm:px-10 md:px-16 lg:px-20">
        {/* Email */}
        <a
          href={`mailto:${t.footer.support}`}
        className="
  break-all
  text-[clamp(1.1rem,3.4vw,2rem)]
  font-medium
  leading-none
  tracking-[-0.03em]
  text-white
  transition-opacity
  duration-300
  hover:opacity-50
  [direction:ltr]
"
          
        >
          {t.footer.support}
        </a>

        {/* Social Links */}
        <div className="mt-10 flex flex-col items-center gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-[clamp(2rem,5.75vw,3.75rem)]
                font-normal
                leading-none
                tracking-[-0.04em]
                text-white
                transition-opacity
                duration-300
                hover:opacity-50
              "
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      {/* =========================
          BOTTOM INFORMATION
      ========================== */}
      <div className="relative z-10 w-full px-6 pb-8 pt-4 text-center sm:px-10">
        {/* Divider */}
        <div className="mx-auto mb-6 h-px w-12 bg-white/15" />

        {/* Address */}
        <p
          className="
            mx-auto
            max-w-md
            text-sm
            font-light
            leading-relaxed
            tracking-wide
            text-white/70
            sm:text-[15px]
            md:text-base
          "
        >
          {t.footer.address}
        </p>

        {/* Phone */}
        <a
          href="tel:+97430233304"
          className="
            mt-3
            block
            text-sm
            font-light
            tracking-wide
            text-white/80
            transition-opacity
            duration-300
            hover:opacity-50
            sm:text-[15px]
            md:text-base
            [direction:ltr]
          "
        >
          +974 3023 3304 / 5569 3943
        </a>

        {/* Divider */}
        <div className="mx-auto my-6 h-px w-12 bg-white/15" />

        {/* Copyright */}
        <p
          className="
        
    text-[11px]
    font-normal
    tracking-[0.16em]
    text-white/70
    sm:text-xs
    md:text-[13px]
          "
        >
          © {currentYear} Alhuda — {t.footer.allRightsReserved}
        </p>
      </div>
    </footer>
  );
}