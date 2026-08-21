"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams, useRouter } from "next/navigation";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const locale = params.locale === "ar" ? "ar" : "en";
  const t = locale === "ar" ? ar : en;

  const NAV_LINKS = [
    { label: t.nav.home, href: `/${locale}` },
    { label: t.nav.about, href: `/${locale}/about` },
    { label: t.nav.products, href: `/${locale}/products` },
    { label: t.nav.contact, href: `/${locale}/contact` },
  ];

  const SOCIAL_LINKS = [
    {
      label: t.footer.instagram,
      href: "https://www.instagram.com/hichem.halaoui?igsh=MW81NDVqaGtqamdodQ%3D%3D",
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

  const currentLabel = NAV_LINKS.find((l) => l.href === pathname)?.label ?? t.nav.home;

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const toggle = () => setOpen((v) => !v);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cx(
          "fixed inset-0 z-[998] bg-black/60 backdrop-blur-[18px] backdrop-saturate-[70%]",
          "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <header
        className={cx(
          /* FIX: left-* -> start-* so this mirrors correctly in RTL (dir="rtl" on <html>/<div>) */
          "fixed start-[10px] top-[10px] z-[999] overflow-hidden rounded-[4px]",
          "border border-white/[0.12] bg-black/50 text-white",
          "backdrop-blur-[26px] backdrop-saturate-150 shadow-[0_12px_50px_rgba(0,0,0,0.35)]",
          "transition-[height,width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "w-[360px] max-w-[calc(100vw-20px)]",
          open ? "h-[min(720px,calc(100vh-20px))]" : "h-[118px]",
          "md:max-w-[360px]",
          "max-md:start-[8px] max-md:top-[8px] max-md:w-[78vw] max-md:max-w-[calc(100vw-16px)]",
          open ? "max-md:h-[min(570px,calc(100vh-16px))]" : "max-md:h-[92px]",
          "max-sm:w-[76vw] max-sm:max-w-[calc(100vw-16px)]",
          open ? "max-sm:h-[min(500px,calc(100vh-16px))]" : "max-sm:h-[82px]",
          "max-[320px]:w-[83vw] max-[320px]:max-w-[calc(100vw-16px)]",
          open ? "max-[320px]:h-[min(450px,calc(100vh-16px))]" : "max-[320px]:h-[72px]",
          "min-[1400px]:start-[20px] min-[1400px]:top-[20px] min-[1400px]:w-[360px]",
          "min-[2560px]:start-[40px] min-[2560px]:top-[40px] min-[2560px]:w-[360px]"
        )}
      >
        {/* TOP BAR */}
        <div className="relative z-20 flex h-[76px] items-start justify-between px-[20px] pt-[16px] max-md:h-[60px] max-md:px-[13px] max-md:pt-[10px] max-sm:h-[56px] max-sm:px-[10px] max-sm:pt-[8px] max-[320px]:h-[48px] max-[320px]:px-[8px] max-[320px]:pt-[6px]">
          <div className="flex items-start gap-[20px] max-md:gap-[10px] max-sm:gap-[8px]">
            <Link href={`/${locale}`} onClick={() => setOpen(false)} aria-label="Al Huda Rubber Industry" className="block shrink-0">
              <Image
                src="/images/logo.webp"
                alt="Al Huda Rubber Industry"
                width={85}
                height={85}
                priority
                className="h-[66px] w-[66px] object-contain max-md:h-[48px] max-md:w-[48px] max-sm:h-[40px] max-sm:w-[40px] max-[320px]:h-[34px] max-[320px]:w-[34px]"
              />
            </Link>
            <span className="pt-[12px] text-[11px] font-medium uppercase tracking-[-0.02em] text-white/45 max-md:pt-[7px] max-md:text-[8px] max-sm:pt-[4px] max-sm:text-[7px] max-[320px]:pt-[2px] max-[320px]:text-[6px]">
              /{currentLabel}
            </span>
          </div>
          <div className="flex items-center gap-[14px] pt-[5px] max-md:gap-[9px] max-md:pt-[1px] max-sm:gap-[7px]">
            <button
              type="button"
              onClick={switchLanguage}
              className="flex h-[26px] items-center justify-center rounded-full border border-white/25 px-3 text-[11px] font-medium text-white transition-all hover:bg-white/10 max-md:h-[22px] max-md:px-2.5 max-md:text-[9px] max-sm:h-[20px] max-sm:px-2 max-sm:text-[8px]"
            >
              {locale === "en" ? "AR" : "EN"}
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-menu-panel"
              className="flex h-[26px] items-center text-[15px] font-medium tracking-[-0.04em] text-white transition-opacity duration-300 hover:opacity-50 max-md:h-[22px] max-md:text-[11px] max-sm:h-[20px] max-sm:text-[10px] max-[320px]:text-[9px]"
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-menu-panel"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-white/[0.09] transition-all duration-300 hover:bg-white/[0.15] max-md:h-[28px] max-md:w-[28px] max-md:rounded-[7px] max-sm:h-[24px] max-sm:w-[24px] max-sm:rounded-[6px] max-[320px]:h-[20px] max-[320px]:w-[20px] max-[320px]:rounded-[5px]"
            >
              <span className={cx("grid grid-cols-3 gap-[3px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-sm:gap-[2px]", open ? "rotate-90" : "rotate-0")}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="h-[3px] w-[3px] rounded-full bg-white max-md:h-[2px] max-md:w-[2px] max-sm:h-[1.5px] max-sm:w-[1.5px]" />
                ))}
              </span>
            </button>
          </div>
        </div>

        {/* COMPANY NAME */}
        <div className="absolute start-[106px] max-md:start-[71px] max-sm:start-[62px] max-[320px]:start-[52px] top-[78px] max-md:top-[62px] max-sm:top-[40px] max-[320px]:top-[50px]">
          <span className="whitespace-nowrap text-[15px] font-medium tracking-[-0.05em] text-white max-md:text-[10px] max-sm:text-[9px] max-[320px]:text-[8px]">
            {t.nav.company}
          </span>
        </div>

        {/* OPEN MENU */}
        <div
          id="mobile-menu-panel"
          /* FIX: inert removes hidden content from tab order + a11y tree when closed,
             instead of relying on opacity/pointer-events alone. Supported in all
             current evergreen browsers; React passes it through as a DOM attribute. */
          inert={!open ? true : undefined}
          className={cx(
            "absolute inset-x-0 bottom-0 top-[112px] flex flex-col px-[25px] pb-[22px] transition-opacity duration-500",
            "max-md:top-[83px] max-md:px-[14px] max-md:pb-[13px]",
            "max-sm:top-[78px] max-sm:px-[10px] max-sm:pb-[10px]",
            "max-[320px]:top-[68px] max-[320px]:px-[8px] max-[320px]:pb-[8px]",
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <nav className="mt-[5px]">
            <ul>
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className="group relative flex min-h-[61px] items-center max-md:min-h-[44px] max-sm:min-h-[38px] max-[320px]:min-h-[32px]"
                  >
                    <span
                      className={cx("absolute start-0 bottom-0 h-[1px] bg-white/40 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", open ? "w-full" : "w-0")}
                      style={{ transitionDelay: open ? `${i * 80 + 180}ms` : "0ms" }}
                    />
                    <span
                      className={cx(
                        "relative text-[28px] font-medium leading-none tracking-[-0.065em] text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "max-md:text-[19px] max-sm:text-[16px] max-[320px]:text-[14px]",
                        open ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
                      )}
                      style={{ transitionDelay: open ? `${i * 80}ms` : "0ms" }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <p className="mb-[9px] text-[10px] font-medium uppercase tracking-[0.08em] text-white/40 max-md:mb-[5px] max-md:text-[7px] max-sm:mb-[4px] max-sm:text-[6px] max-[320px]:mb-[3px] max-[320px]:text-[5px]">
              {t.nav.followUs}
            </p>
            <div>
              {SOCIAL_LINKS.map((social, i) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={open ? 0 : -1}
                  className={cx(
                    "block text-[15px] font-medium tracking-[-0.035em] text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white/50",
                    "max-md:text-[10px] max-sm:text-[9px] max-[320px]:text-[8px]",
                    open ? "translate-y-0 opacity-100" : "translate-y-[100%] opacity-0"
                  )}
                  style={{ transitionDelay: open ? `${400 + i * 70}ms` : "0ms" }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}