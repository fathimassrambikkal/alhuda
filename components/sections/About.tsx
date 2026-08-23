"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowIcon } from "@/components/icons/Icons";
import en from "@/locales/en.json";

gsap.registerPlugin(ScrollTrigger);

type AboutTranslations = typeof en.about;

export default function About({
  translations,
}: {
  translations: AboutTranslations;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-line",
        {
          yPercent: 120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="bg-black text-white pt-10 pb-4 lg:pt-20 lg:pb-8"
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20">

        {/* ===========================
            LARGE EDITORIAL HEADING
            — mobile/tablet: no indent, flush left, starts from start
            — desktop (lg+): unchanged, first line keeps its indent
        ============================ */}

        <div className="max-w-[1650px] mx-auto">
          <h2
            ref={headingRef}
            className="
              font-light
              tracking-[-0.065em]
              leading-[1.1]
              text-[clamp(2rem,6vw,6.2rem)]
            "
          >
            {translations.heading.map((line, index) => (
              <div
                key={index}
                className={`overflow-hidden ${
                  index === 0 ? "lg:pl-[10%]" : ""
                }`}
              >
                <div className="reveal-line">
                  {line}
                </div>
              </div>
            ))}
          </h2>
        </div>

        {/* ===========================
            DIVIDER
        ============================ */}

        <div className="mt-14 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28 border-t border-white/15" />

        {/* ===========================
            CONTENT
            — below lg: always a row (never stacks), left column
              widened so "Qatar's trusted rubber" fits on one line,
              right column capped so it doesn't crowd the left, top-aligned
            — lg+: unchanged, original 1fr / 420px layout
        ============================ */}

        <div
          className="
            grid
            grid-cols-[140px_1fr]
            sm:grid-cols-[160px_1fr]
            md:grid-cols-[170px_1fr]
            gap-8 sm:gap-12 md:gap-24 lg:gap-20 xl:gap-24 2xl:gap-32
            items-start
            mt-1
            pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-14
            lg:grid-cols-[1fr_420px]
          "
        >

          {/* LEFT — Now with self-start and width constraint */}

          <div className="self-start">
            <p
              className="
                text-white
                text-[clamp(0.9rem,1.2vw,1.25rem)]
                leading-[1.1] font-medium
                lg:whitespace-nowrap
              "
            >
              {translations.label}
            </p>
          </div>

          {/* RIGHT — Now with self-start to align top */}

          <div className="self-start max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[380px] xl:max-w-[420px] 2xl:max-w-[460px]">
            <p
              className="
                text-white
                text-[clamp(1.1rem,1.8vw,1.8rem)]
                leading-[1.35]
                tracking-[-0.03em]
              "
            >
              {translations.paragraph1}
            </p>

            <p
              className="
                mt-6 sm:mt-7 md:mt-8
                text-white
                text-[clamp(1.1rem,1.8vw,1.8rem)]
                leading-[1.35]
                tracking-[-0.03em]
              "
            >
              {translations.paragraph2}
            </p>
            <Link
              href="/about"
              className="
                group
                inline-flex
                items-center
                gap-2
                mt-8 sm:mt-9 md:mt-10
                text-[clamp(1.1rem,1.8vw,1.8rem)]
                leading-[1.35]
                tracking-[-0.03em]
                font-light
                underline
                underline-offset-8
                hover:opacity-70
                transition-opacity
              "
            >
              <span>{translations.learnMore}</span>
              <ArrowIcon className="w-[1em] h-[1em]" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}