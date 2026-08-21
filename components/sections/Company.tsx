"use client";

import Image from "next/image";
import en from "@/locales/en.json";

type CompanyTranslations = typeof en.company;

const clients = [
  {
    name: "Smeet",
    image: "/images/smeet.jpg",
  },
  {
    name: "First Pack",
    image: "/images/first-pack.png",
  },
  {
    name: "Alhadaf Shooting Range",
    image: "/images/alhadaf.png",
  },
  {
    name: "Bin Aman",
    image: "/images/bin-aman.jpg",
  },
  {
    name: "Qatar Polymer",
    image: "/images/qatar-polymer.webp",
  },
  {
    name: "Qatar Building Company",
    image: "/images/qatar-building.jpg",
  },
  {
    name: "Qatar Airways",
    image: "/images/qatar_airways.png",
  },
  {
    name: "Al Raya",
    image: "/images/alraya.webp",
  },
  {
    name: "Dar Al Sharq",
    image: "/images/alsharq.webp",
  },
  {
    name: "Aspire",
    image: "/images/aspire.webp",
  },
  {
    name: "ALDAR",
    image: "/images/aldar.webp",
  },
  {
    name: "Nal",
    image: "/images/Nal.webp",
  },
];

function isTinted(index: number, columns: number) {
  const row = Math.floor(index / columns);
  const col = index % columns;

  return (row + col) % 2 === 0;
}

export default function Company({
  translations,
}: {
  translations: CompanyTranslations;
}) {
  const columns = 6;

  return (
    <section className="w-full bg-neutral-50 py-[clamp(2.75rem,4.5vw,5rem)]">
      <div className="mx-auto w-full max-w-[1800px] px-[clamp(0.875rem,2.2vw,3rem)]">
        {/* Heading */}
        <div className="max-w-[clamp(18rem,58vw,62rem)]">
          <h2
            className="
              font-medium
              leading-[0.98]
              tracking-[-0.06em]
              text-neutral-900
              text-[clamp(1.9rem,4.8vw,4.25rem)]
            "
          >
            {translations.title}
          </h2>
        </div>

        {/* Logo Grid */}
        <div
          className="
            mt-[clamp(1.75rem,4vw,4rem)]
            grid
            grid-cols-2
            min-[500px]:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-6
            border-l
            border-t
            border-neutral-200
          "
        >
          {clients.map((client, index) => (
            <div
              key={client.name}
              className={`
                group
                flex
                items-center
                justify-center
                border-b
                border-r
                border-neutral-200
                px-[clamp(0.4rem,1.2vw,1.25rem)]
                h-[clamp(5.5rem,13vw,8rem)]
                transition-colors
                duration-300
                ${isTinted(index, columns) ? "bg-neutral-100" : "bg-transparent"}
              `}
            >
              <Image
                src={client.image}
                alt={client.name}
                width={500}
                height={300}
                className="
                  w-[clamp(5rem,14vw,11rem)]
                  max-h-[clamp(2.5rem,6vw,4.25rem)]
                  object-contain
                  grayscale
                  transition-all
                  duration-500
                  ease-out
                  group-hover:grayscale-0
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}