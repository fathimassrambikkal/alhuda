import en from "@/locales/en.json";

type ProductHeroTranslations = typeof en.productHero;

interface ProductHeroProps {
  translations: ProductHeroTranslations;
  locale: "en" | "ar";
}

export default function ProductHero({
  translations,
  locale,
}: ProductHeroProps) {
  const isArabic = locale === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden bg-black text-white"
    >
      <div className="relative min-h-[50vh] px-4 sm:px-5 md:px-6">
        {/* PRODUCT HERO TEXT */}
        <div
          className={`
            absolute
            top-[20vh]
            sm:top-[21vh]
            md:top-[24vh]
            ${isArabic
              ? "right-4 sm:right-5 md:right-6"
              : "left-4 sm:left-5 md:left-6"
            }
          `}
        >
          <h1
            className="
              font-medium
              leading-[0.9]
              tracking-[-0.06em]
              text-white
            "
          >
            {translations.title.map((line, index) => (
              <div
                key={line}
                className="overflow-hidden"
              >
                <div
                  className="
                    hero-line-anim
                    text-[clamp(32px,7vw,52px)]
                    min-[400px]:text-[clamp(36px,6vw,58px)]
                    sm:text-[clamp(42px,5vw,64px)]
                    md:text-[clamp(50px,4.5vw,72px)]
                    lg:text-[clamp(60px,4vw,82px)]
                  "
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {line}
                </div>
              </div>
            ))}
          </h1>
        </div>
      </div>

      <style>{`
        @keyframes lineReveal {
          from {
            transform: translateY(110%);
            opacity: 0;
          }

          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .hero-line-anim {
          display: block;
          transform: translateY(110%);
          opacity: 0;
          animation: lineReveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-line-anim {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}