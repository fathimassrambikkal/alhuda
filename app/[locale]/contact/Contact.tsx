"use client";

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
          pt-28 pb-0
          sm:pt-36 sm:pb-0
          lg:pt-44 lg:pb-0
        "
      >
        <div className="mx-auto max-w-[1700px]">
          <h1
            ref={headingRef}
            className="
              font-light
              tracking-[-0.065em]
              leading-[1.02]
              min-[800px]:leading-[0.94]
              text-[clamp(2rem,6vw,6.2rem)]
              text-gray-900
            "
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
          </h1>

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

     {/* Contact Information - Luxury Minimalist Centered */}
<section className="mt-12 w-full bg-white text-black sm:mt-16 lg:mt-20">
  <div className="mx-auto max-w-[1700px] px-[clamp(1.5rem,4vw,5rem)] py-[clamp(3rem,5vw,6rem)]">
    <div className="flex flex-col items-center gap-5 sm:gap-7 lg:gap-8 text-center">
      {/* Decorative line - more prominent */}
      <div className="w-16 h-px bg-black/40 mb-1"></div>
      
      {/* Label - slightly bolder */}
      <p className="text-[clamp(0.65rem,0.9vw,0.75rem)] font-medium uppercase tracking-[0.25em] text-black/40">
        {translations.getInTouch || "Get in touch"}
      </p>
      
      {/* Email - larger & more prominent */}
      <a
        href="mailto:support@alhudaqa.com"
        className="text-[clamp(2rem,5.5vw,4.8rem)] font-light leading-[1.1] tracking-[-0.06em] text-black transition-all duration-700 hover:tracking-[-0.02em] hover:opacity-60"
      >
        support@alhudaqa.com
      </a>
      
      {/* Divider - more visible */}
      <div className="w-24 h-px bg-black/20 my-2"></div>
      
      {/* Phone numbers - larger & more prominent */}
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-8 mt-1">
        <a href="tel:+97430233304" className="text-[clamp(1rem,1.5vw,1.2rem)] font-normal tracking-[0.08em] text-gray-900 transition-all duration-300 hover:text-black/40 hover:tracking-[0.15em] [direction:ltr]">
          +974 3023 3304
        </a>
        <span className="hidden text-gray-900 sm:block text-[clamp(1rem,1.5vw,1.2rem)] font-normal">/</span>
        <a href="tel:+97455693943" className="text-[clamp(1rem,1.5vw,1.2rem)] font-ormal tracking-[0.08em] text-gray-900 transition-all duration-300 hover:text-black/40 hover:tracking-[0.15em] [direction:ltr]">
          +974 5569 3943
        </a>
      </div>
      
      {/* Bottom decorative line - more prominent */}
      <div className="w-16 h-px bg-black/30 mt-4"></div>
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