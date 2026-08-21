/**
 * OPTIMIZATION NOTE
 * ------------------
 * Removed "use client" — this component has no hooks, no state, no
 * event handlers. The grayscale-to-color hover effect is already pure
 * CSS (`group-hover:grayscale-0`). Making it a Server Component means
 * this whole logo grid (12 images) is rendered to HTML on the server
 * and ships zero JS for this section.
 */

import Image from "next/image";
import en from "@/locales/en.json";

type CompanyTranslations = typeof en.company;

const clients = [
  { name: "Smeet", image: "/images/smeet.jpg" },
  { name: "First Pack", image: "/images/first-pack.png" },
  { name: "Alhadaf Shooting Range", image: "/images/alhadaf.png" },
  { name: "Bin Aman", image: "/images/bin-aman.jpg" },
  { name: "Qatar Polymer", image: "/images/qatar-polymer.webp" },
  { name: "Qatar Building Company", image: "/images/qatar-building.jpg" },
  { name: "Qatar Airways", image: "/images/qatar_airways.png" },
  { name: "Al Raya", image: "/images/alraya.webp" },
  { name: "Dar Al Sharq", image: "/images/alsharq.webp" },
  { name: "Aspire", image: "/images/aspire.webp" },
  { name: "ALDAR", image: "/images/aldar.webp" },
  { name: "Nal", image: "/images/Nal.webp" },
];

export default function Company({
  translations,
}: {
  translations: CompanyTranslations;
}) {
  return (
    <section className="w-full overflow-hidden bg-neutral-50 py-14 min-[400px]:py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-3 min-[400px]:px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-4xl">
          <h2
            className="
              text-neutral-900 font-medium leading-none tracking-[-0.06em] whitespace-nowrap
              text-[clamp(20px,6vw,26px)]
              min-[400px]:text-[clamp(24px,5vw,36px)]
              sm:text-[clamp(34px,4vw,44px)]
              md:text-[clamp(44px,3.5vw,60px)]
              lg:text-[clamp(60px,4vw,82px)]
            "
          >
            {translations.title}
          </h2>
        </div>

        <div
          className="
            mt-10 min-[400px]:mt-12 sm:mt-14 md:mt-16
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
            w-full border-l border-t border-neutral-200
          "
        >
          {clients.map((client, index) => (
            <div
              key={client.name}
              className={`
                group flex min-w-0 w-full items-center justify-center
                border-b border-r border-neutral-200
                px-2 min-[400px]:px-3 sm:px-4 md:px-5 lg:px-6
                h-[110px] min-[400px]:h-[120px] sm:h-[135px] md:h-[145px] lg:h-[150px]
                ${index % 2 === 0 ? "bg-neutral-100" : "bg-transparent"}
              `}
            >
              <Image
                src={client.image}
                alt={client.name}
                width={180}
                height={80}
                sizes="(min-width: 1024px) 180px, (min-width: 640px) 15vw, 30vw"
                className="h-auto w-[78%] max-w-[180px] object-contain grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}