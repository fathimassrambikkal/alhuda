"use client";

/** Same optimization as About.tsx — see notes there. */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import GetToKnowUs from "@/components/sections/GetToKnowUs";
import en from "@/locales/en.json";

type ContactTranslations = typeof en.contact;

export default function ContactPage({
  translations,
}: {
  translations: ContactTranslations;
}) {
  const params = useParams();
  const locale = params.locale === "ar" ? "ar" : "en";

  const headingRef = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ensure exactly 3 lines for display
  const displayLines = translations.intro.slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section
        className="
          px-[clamp(1.5rem,4vw,5rem)]
          pt-28 pb-20
          sm:pt-36 sm:pb-28
          lg:pt-44 lg:pb-36
        "
      >
        <div className="mx-auto max-w-[1700px]">
          <h2
            ref={headingRef}
            className="font-light tracking-[-0.065em] leading-[0.94] text-[clamp(2rem,6vw,6.2rem)]"
          >
            {displayLines.map((line, index) => (
              <div
                key={index}
                className={`overflow-hidden ${
                  index === 0 ? "lg:pl-[10%]" : ""
                }`}
              >
                <div
                  className={`reveal-line ${inView ? "reveal-line-in" : ""}`}
                  style={{ transitionDelay: `${index * 0.18}s` }}
                >
                  {line}
                </div>
              </div>
            ))}
          </h2>

          <div className="relative mt-20 aspect-[16/9] w-full overflow-hidden sm:mt-28 lg:mt-36">
            <Image
              src="/images/contact.avif"
              alt={translations.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <GetToKnowUs
        text={translations.seeOurWork}
        href={`/${locale}/products`}
      />

      <style>{`
        .reveal-line {
          display: block;
          transform: translateY(120%);
          opacity: 0;
          transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        
        .reveal-line-in {
          transform: translateY(0);
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-line {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
            will-change: auto !important;
          }
        }
      `}</style>
    </main>
  );
}