"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowIcon } from "@/components/icons/Icons";
import en from "@/locales/en.json";
import type { Locale } from "@/i18n/config";

type ProductsTranslations = typeof en.products;

const products = [
  { key: "conveyorBelt", image: "/images/p1.jpg" },
  { key: "ballisticTiles", image: "/images/p2.jpeg" },
  { key: "horseFlooring", image: "/images/p3.jpg" },
  { key: "floorTiles", image: "/images/p4.jpg" },
  { key: "kidsTiles", image: "/images/p5.jpg" },
  { key: "gymTiles", image: "/images/p6.jpg" },
] as const;

export default function ProductsSection({
  translations,
  locale,
}: {
  translations: ProductsTranslations;
  locale: Locale;
}) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(() =>
    products.map(() => false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          setVisible((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    imageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black text-white">
      {/* HEADER */}
      <div className="flex h-[160px] items-end justify-between px-4 pb-8">
        <h2 className="text-white text-[clamp(0.9rem,1.2vw,1.25rem)] leading-[1.1] font-medium">
          {translations.targetSectors}
        </h2>

        <button
          type="button"
          onClick={() => router.push(`/${locale}/products`)}
          className="group inline-flex items-center gap-2 text-white text-[clamp(0.9rem,1.2vw,1.25rem)] leading-[1.1] font-medium transition-opacity duration-300 hover:opacity-70"
        >
          <span>{translations.explore}</span>
          <ArrowIcon className="h-[1em] w-[1em]" />
        </button>
      </div>

      {/* PRODUCTS — SINGLE COLUMN */}
      <div
        className="
          mx-auto flex w-[calc(100%-1rem)] flex-col gap-6
          min-[400px]:w-[calc(100%-1.25rem)]
          sm:w-[97%] sm:gap-8
          md:gap-10
          lg:gap-12
          xl:gap-14
          2xl:gap-16
        "
      >
        {products.map((item, index) => (
          <div
            key={item.key}
            onClick={() => router.push(`/${locale}/products`)}
            className="group relative w-full cursor-pointer"
          >
            <div
              className="
                relative aspect-[16/9] w-full overflow-hidden
                md:aspect-[16/8]
                lg:aspect-[16/7]
                2xl:aspect-[16/6.5]
              "
            >
              <div
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                data-index={index}
                className={`absolute inset-0 h-full w-full will-change-transform transition-transform duration-[1400ms] ease-out ${
                  visible[index] ? "scale-100" : "scale-[1.04]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={translations.items[item.key]}
                  fill
                  sizes="97vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="relative max-w-[90%] px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5">
                  <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l-[0.5px] border-t-[0.5px] border-gray-200" />
                  <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r-[0.5px] border-t-[0.5px] border-gray-200" />
                  <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-[0.5px] border-l-[0.5px] border-gray-200" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b-[0.5px] border-r-[0.5px] border-gray-200" />

                  <h3
                    className="
                      text-center font-normal leading-[0.95] tracking-[-0.055em] text-gray-200
                      text-[clamp(0.9rem,3vw,1.2rem)]
                      min-[500px]:text-[clamp(1rem,2.5vw,1.5rem)]
                      md:text-[clamp(1.2rem,2vw,1.8rem)]
                      lg:text-[clamp(1.4rem,1.8vw,2rem)]
                      xl:text-[clamp(1.5rem,1.6vw,2.2rem)]
                      2xl:text-[clamp(1.6rem,1.4vw,2.4rem)]
                    "
                  >
                    {translations.items[item.key]}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-20 sm:h-24 md:h-32 lg:h-40" />
    </section>
  );
}