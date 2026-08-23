import en from "@/locales/en.json";

type HeroTranslations = typeof en.hero;

export default function Home({
  translations,
}: {
  translations: HeroTranslations;
}) {
  const descLines = translations.description;
  const secLines = translations.secondaryDescription;
  const words = [
    translations.title.engineered,
    translations.title.for,
    translations.title.excellence,
  ];

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover"
        poster="/images/hero-poster.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        style={{ pointerEvents: "none" }}
      >
        <source src="/images/hero.webm" type="video/webm" />
        <source src="/images/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[5] bg-black/40 md:bg-black/30" />

      <div className="absolute inset-0 z-10">
        {/* Left Bottom Heading */}
        <div
          className="
            absolute
            start-5
            top-[clamp(8rem,25vw,11rem)]
            sm:start-6
            md:bottom-[clamp(1.25rem,6vw,4rem)]
            md:top-auto
            md:start-[clamp(1rem,4vw,3.5rem)]
          "
        >
          <h1 className="text-white font-semibold leading-[1.05] tracking-[-0.08em]">
            <div className="overflow-hidden">
              <div className="flex flex-wrap">
                <div className="overflow-hidden me-[clamp(0.5rem,1.5vw,0.75rem)]">
                  <span
                    className="hero-word block text-[clamp(2.2rem,11vw,4rem)]"
                    style={{ animationDelay: "0.9s" }}
                  >
                    {words[0]}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative inline-block">
              <div className="overflow-hidden">
                <div className="flex flex-wrap">
                  {[words[1], words[2]].map((word, i) => (
                    <div
                      key={word}
                      className="overflow-hidden me-[clamp(0.5rem,1.5vw,0.75rem)]"
                    >
                      <span
                        className="hero-word block text-[clamp(2.2rem,11vw,4rem)]"
                        style={{ animationDelay: `${1.02 + i * 0.14}s` }}
                      >
                        {word}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </h1>
        </div>

        {/* Right Middle Description */}
        <div
          className="
            absolute
            start-5
            end-5
            bottom-[clamp(5rem,12vw,8rem)]
            max-w-none
            md:start-auto
            md:end-[clamp(1rem,4vw,4rem)]
            md:top-1/2
            md:bottom-auto
            md:-translate-y-1/2
            md:max-w-[clamp(15rem,55vw,48rem)]
          "
        >
          <div className="flex flex-col">
            <div className="flex flex-col">
              {descLines.map((line, i) => (
                <div key={i} className={`overflow-hidden ${i > 0 ? "-mt-1" : ""}`}>
                  <span
                    className="hero-line block text-[clamp(0.95rem,3.5vw,1.125rem)] font-semibold leading-[1.4] tracking-tight text-white"
                    style={{ animationDelay: `${1.15 + i * 0.12}s` }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col mt-0.5">
              {secLines.map((line, i) => (
                <div key={i} className={`overflow-hidden ${i > 0 ? "-mt-1" : ""}`}>
                  <span
                    className="hero-line block text-[clamp(0.95rem,3.5vw,1.125rem)] font-semibold leading-[1.4] tracking-tight text-white/60"
                    style={{
                      animationDelay: `${1.15 + (descLines.length + i) * 0.12}s`,
                    }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeScale {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes heroPulse {
          from { transform: scale(1); }
          to   { transform: scale(1.018); }
        }
        @keyframes heroWordIn {
          from { transform: translateY(115%); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .hero-video {
          opacity: 0;
          animation:
            heroFadeScale 3s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            heroPulse 24s ease-in-out 3s infinite alternate;
          will-change: transform, opacity;
        }
        .hero-word,
        .hero-line {
          display: block;
          transform: translateY(115%);
          opacity: 0;
          animation: heroWordIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-video,
          .hero-word,
          .hero-line {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}