"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import en from "@/locales/en.json";

gsap.registerPlugin(ScrollTrigger);

type PrinciplesTranslations = typeof en.principles;

export default function IntroPrinciples({
  translations,
}: {
  translations: PrinciplesTranslations;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Intro animation
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

  // Principles animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the left heading
      gsap.fromTo(
        ".principles-heading",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: principlesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate each principle item
      gsap.fromTo(
        ".principle-item",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: principlesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate the description
      gsap.fromTo(
        ".principles-description",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, principlesRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Intro Section */}
      <section className="bg-white text-black py-32 lg:py-44">
        <div className="mx-auto max-w-[1700px] px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <div className="max-w-[1800px] mx-auto">
            <h2
              ref={headingRef}
              className="
                font-light
                tracking-[-0.065em]
                leading-[1.02]
                min-[800px]:leading-[0.94]
                text-[clamp(2rem,6vw,6.2rem)]
              "
            >
              {translations.intro.map((line, index) => (
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
        </div>
      </section>

      {/* Divider Border */}
      <div className="border-t border-neutral-300"></div>

      {/* Principles Section - Flex Layout */}
      <section className="bg-white text-black pt-10 md:pt-16 pb-20 md:pb-32">
        <div className="max-w-[1700px] mx-auto px-5 sm:px-8 lg:px-12">
          <div >
            <div
              ref={principlesRef}
              className="flex justify-between items-start gap-8"
            >
              {/* Left */}
              <div className="principles-heading shrink-0 w-[28%]">
                <p
                  className="
                    text-[22px]
                    sm:text-[26px]
                    md:text-[34px]
                    xl:text-[52px]
                    leading-[1.05]
                    min-[800px]:leading-[0.95]
                    tracking-[-0.04em]
                    font-light
                  "
                >
                  {translations.title.map((line, index) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              {/* Right */}
              <div className="flex-1 max-w-[900px]">
                <div className="space-y-2 md:space-y-3">
                  {translations.reasons.map((item) => (
                    <div
                      key={item.number}
                      className="principle-item flex gap-3 md:gap-6"
                    >
                      <span
                        className="
                          w-12
                          sm:w-16
                          md:w-24
                          text-neutral-500
                          text-[24px]
                          sm:text-[36px]
                          md:text-[48px]
                          xl:text-[64px]
                          leading-[1.05]
                          min-[800px]:leading-none
                          font-light
                        "
                      >
                        {item.number}
                      </span>

                      <span
                        className="
                          text-[24px]
                          sm:text-[36px]
                          md:text-[48px]
                          xl:text-[64px]
                          leading-[1.05]
                          min-[800px]:leading-none
                          tracking-[-0.05em]
                          font-light
                        "
                      >
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  ref={descriptionRef}
                  className="mt-10 sm:mt-14 md:mt-20 md:ml-24 max-w-[650px] principles-description"
                >
                  <p
                    className="
                      text-[18px]
                      sm:text-[22px]
                      md:text-[30px]
                      xl:text-[50px]
                      leading-[1.12]
                      min-[800px]:leading-[1.05]
                      tracking-[-0.04em]
                      font-light
                    "
                  >
                    {translations.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}