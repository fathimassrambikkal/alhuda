"use client";

/**
 * Same optimization as Products.tsx: GSAP + ScrollTrigger scrub replaced
 * with a one-shot IntersectionObserver + CSS transition. See notes there.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface ProductSliderImage {
  id: number;
  src: string;
  alt: string;
}

interface ProductImageSliderProps {
  title: string;
  images: ProductSliderImage[];
}

export default function ProductImageSlider({
  title,
  images,
}: ProductImageSliderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(() =>
    images.map(() => false)
  );

  useEffect(() => {
    setVisible(images.map(() => false));
  }, [images]);

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
  }, [images]);

  return (
    <section ref={sectionRef} className="relative bg-black text-white">
      {/* PRODUCT TITLE TILE */}
      <div
        className="
          flex w-full items-center justify-center bg-black
          px-4 py-12
          min-[400px]:px-5 min-[400px]:py-14
          sm:px-6 sm:py-16
          md:py-20
          lg:py-24
          xl:py-28
          2xl:py-32
        "
      >
        <div
          className="
            relative max-w-[95%]
            px-4 py-2.5
            min-[400px]:px-5 min-[400px]:py-3
            sm:px-6 sm:py-3.5
            md:px-7 md:py-4
            lg:px-8 lg:py-5
          "
        >
          <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l-[0.5px] border-t-[0.5px] border-gray-200" />
          <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r-[0.5px] border-t-[0.5px] border-gray-200" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-[0.5px] border-l-[0.5px] border-gray-200" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b-[0.5px] border-r-[0.5px] border-gray-200" />

          <h2
            className="
              whitespace-normal text-left font-normal leading-[0.95] tracking-[-0.055em] text-gray-200
              text-[clamp(0.85rem,3vw,1.2rem)]
              min-[400px]:text-[clamp(1rem,3.5vw,1.4rem)]
              sm:text-[clamp(1.2rem,3vw,1.8rem)]
              md:text-[clamp(1.4rem,2.5vw,2rem)]
              lg:text-[clamp(1.6rem,2.2vw,2.4rem)]
              xl:text-[clamp(1.8rem,2vw,2.8rem)]
              2xl:text-[clamp(2rem,1.8vw,3.2rem)]
              3xl:text-[clamp(2.5rem,2vw,4rem)]
              4xl:text-[clamp(3rem,2.2vw,5rem)]
            "
          >
            {title}
          </h2>
        </div>
      </div>

      {/* PRODUCT IMAGES */}
      <div
        className="
          mx-auto flex w-[calc(100%-1rem)] flex-col gap-3
          min-[400px]:w-[calc(100%-1.25rem)]
          sm:w-[97%] sm:gap-4
          lg:gap-5
        "
      >
        {images.map((image, index) => (
          <div
            key={`${image.id}-${image.src}`}
            className="relative aspect-[4/3] w-full overflow-hidden"
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
                src={image.src}
                alt={image.alt}
                fill
                sizes="97vw"
                className="object-cover object-center"
              />
            </div>

            <div className="absolute inset-0 bg-black/25" />
          </div>
        ))}
      </div>

      <div className="h-16 sm:h-20 md:h-24 lg:h-32" />
    </section>
  );
}