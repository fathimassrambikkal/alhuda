import type { Metadata } from "next";

import ProductHero from "@/components/sections/ProductHero";
import ProductImageSlider from "@/components/sections/ProductImageSlider";
import GetToKnowUs from "@/components/sections/GetToKnowUs";

import { getTranslations } from "@/i18n/getTranslations";
import type { Locale } from "@/i18n/config";

interface ProductsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = locale === "ar";

  const title = isArabic
    ? "منتجات وحلول المطاط | الهدى للمطاط"
    : "Rubber Products & Solutions | Alhuda for Rubber";

  const description = isArabic
    ? "استكشف منتجات الهدى للمطاط في قطر، بما في ذلك السيور الناقلة المطاطية، الأرضيات المطاطية، البلاط المطاطي الباليستي، أرضيات الصالات الرياضية، المسارات الرياضية الخارجية، الإكسسوارات البحرية ومستلزمات مواقف السيارات واللفائف المطاطية."
    : "Explore Alhuda for Rubber products in Qatar, including rubber conveyor belts, rubber flooring, ballistic rubber tiles, gym flooring, outdoor sports tracks, marine accessories, parking accessories, printing press rolls, and industrial rubber rolls.";

  return {
    title,
    description,

    alternates: {
      canonical: `https://alhudaqa.com/${locale}/products`,
      languages: {
        en: "https://alhudaqa.com/en/products",
        ar: "https://alhudaqa.com/ar/products",
      },
    },

    openGraph: {
      title,
      description,
      url: `https://alhudaqa.com/${locale}/products`,
      locale: isArabic ? "ar_QA" : "en_QA",
      type: "website",
      siteName: "Alhuda for Rubber",
      images: [
        {
          url: "/images/og-image-products.jpg",
          width: 1200,
          height: 630,
          alt: isArabic
            ? "منتجات الهدى للمطاط"
            : "Alhuda for Rubber Products",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image-products.jpg"],
    },
  };
}

export default async function ProductsPage({
  params,
}: ProductsPageProps) {
  const { locale } = await params;

  const translations = await getTranslations(locale);

  return (
    <div className="bg-black text-white">
      {/* ==================================================
          PRODUCTS HERO — ONLY ONCE
      ================================================== */}
      <ProductHero
        translations={translations.productHero}
        locale={locale}
      />

      {/* ==================================================
          01 — RUBBER CONVEYOR BELT
      ================================================== */}
      <ProductImageSlider
        title={translations.products.rubberConveyorBelt.title}
        images={[
          {
            id: 1,
            src: "/images/rubber-conveyor-1.jpg",
            alt: translations.products.rubberConveyorBelt.images.conveyorBelt,
          },
          {
            id: 2,
            src: "/images/rubber-conveyor-2.jpg",
            alt: translations.products.rubberConveyorBelt.images.conveyorSystem,
          },
          {
            id: 3,
            src: "/images/rubber-conveyor-3.jpg",
            alt: translations.products.rubberConveyorBelt.images.conveyorRoll,
          },
          {
            id: 4,
            src: "/images/rubber-conveyor-4.jpg",
            alt: translations.products.rubberConveyorBelt.images.industrialSystem,
          },
        ]}
      />

      {/* ==================================================
          02 — BALLISTIC RUBBER TILES
      ================================================== */}
      <ProductImageSlider
        title={translations.products.ballisticRubberTiles.title}
        images={[
          {
            id: 1,
            src: "/images/p2.jpeg",
            alt: translations.products.ballisticRubberTiles.images.ballisticTiles,
          },
          {
            id: 2,
            src: "/images/ballistic-rubber-2.jpeg",
            alt: translations.products.ballisticRubberTiles.images.ballisticTiles,
          },
        ]}
      />

      {/* ==================================================
          03 — RUBBER FLOORING FOR HORSE
      ================================================== */}
      <ProductImageSlider
        title={translations.products.rubberFlooringHorse.title}
        images={[
          {
            id: 1,
            src: "/images/horse-rubber-1.jpeg",
            alt: translations.products.rubberFlooringHorse.images.horseFlooring,
          },
          {
            id: 2,
            src: "/images/horse-rubber-2.jpg",
            alt: translations.products.rubberFlooringHorse.images.horseFlooringAlt,
          },
          {
            id: 3,
            src: "/images/horse-rubber-3.jpg",
            alt: translations.products.rubberFlooringHorse.images.horseFlooringAlt,
          },
        ]}
      />

      {/* ==================================================
          04 — RUBBER FLOOR TILES
      ================================================== */}
      <ProductImageSlider
        title={translations.products.rubberFloorTiles.title}
        images={[
          {
            id: 1,
            src: "/images/rubber-flooring-1.jpg",
            alt: translations.products.rubberFloorTiles.images.floorTiles,
          },
          {
            id: 2,
            src: "/images/rubber-flooring-2.jpg",
            alt: translations.products.rubberFloorTiles.images.floorTiles,
          },
        ]}
      />

      {/* ==================================================
          05 — KIDS & SCHOOL
      ================================================== */}
      <ProductImageSlider
        title={
          translations.products.rubberFloorTilesForKidsAndSchool.title
        }
        images={[
          {
            id: 1,
            src: "/images/p5.jpg",
            alt:
              translations.products.rubberFloorTilesForKidsAndSchool.images
                .kidsTiles,
          },
          {
            id: 2,
            src: "/images/school-2.jpeg",
            alt:
              translations.products.rubberFloorTilesForKidsAndSchool.images
                .schoolTiles,
          },
        ]}
      />

      {/* ==================================================
          06 — GYM
      ================================================== */}
      <ProductImageSlider
        title={translations.products.gym.title}
        images={[
          {
            id: 1,
            src: "/images/gym-1.jpg",
            alt: translations.products.gym.images.gymFlooring,
          },
          {
            id: 2,
            src: "/images/gym-2.jpg",
            alt: translations.products.gym.images.gymFlooring,
          },
          {
            id: 3,
            src: "/images/gym-3.jpg",
            alt: translations.products.gym.images.gymFlooring,
          },
          {
            id: 4,
            src: "/images/gym-5.jpg",
            alt: translations.products.gym.images.gymFlooring,
          },
          {
            id: 5,
            src: "/images/p6.jpg",
            alt: translations.products.gym.images.gymFlooring,
          },
        ]}
      />

      {/* ==================================================
          07 — OUTDOOR SPORTS
      ================================================== */}
      <ProductImageSlider
        title={translations.products.outdoorSport.title}
        images={[
          {
            id: 1,
            src: "/images/outdoor-sport-1.jpg",
            alt: translations.products.outdoorSport.images.sportsTrack,
          },
          {
            id: 2,
            src: "/images/outdoor-sport-2.jpg",
            alt: translations.products.outdoorSport.images.sportsTrack,
          },
          {
            id: 3,
            src: "/images/outdoor-sport-3.jpg",
            alt: translations.products.outdoorSport.images.sportsTrack,
          },
        ]}
      />

      {/* ==================================================
          08 — MARINE
      ================================================== */}
      <ProductImageSlider
        title={translations.products.marine.title}
        images={[
          {
            id: 1,
            src: "/images/marine-1.jpg",
            alt: translations.products.marine.images.marineAccessories,
          },
          {
            id: 2,
            src: "/images/marine-2.jpg",
            alt: translations.products.marine.images.marineAccessories,
          },
          {
            id: 3,
            src: "/images/marine-3.jpg",
            alt: translations.products.marine.images.marineAccessories,
          },
        ]}
      />

      {/* ==================================================
          09 — PARKING
      ================================================== */}
      <ProductImageSlider
        title={translations.products.parking.title}
        images={[
          {
            id: 1,
            src: "/images/parking-1.jpg",
            alt: translations.products.parking.images.parkingAccessories,
          },
          {
            id: 2,
            src: "/images/parking-2.webp",
            alt: translations.products.parking.images.parkingAccessories,
          },
          {
            id: 3,
            src: "/images/parking-3.webp",
            alt: translations.products.parking.images.parkingAccessories,
          },
        ]}
      />

      {/* ==================================================
          10 — PRINTING PRESS
      ================================================== */}
      <ProductImageSlider
        title={translations.products.printingPressRubberRolls.title}
        images={[
          {
            id: 1,
            src: "/images/printing-1.jpg",
            alt:
              translations.products.printingPressRubberRolls.images
                .printingRolls,
          },
          {
            id: 2,
            src: "/images/printing-2.jpg",
            alt:
              translations.products.printingPressRubberRolls.images
                .printingRolls,
          },
          {
            id: 3,
            src: "/images/printing-3.jpg",
            alt:
              translations.products.printingPressRubberRolls.images
                .printingRolls,
          },
          {
            id: 4,
            src: "/images/printing-4.jpg",
            alt:
              translations.products.printingPressRubberRolls.images
                .printingRolls,
          },
        ]}
      />

      {/* ==================================================
          11 — INDUSTRIAL RUBBER ROLLS
      ================================================== */}
      <ProductImageSlider
        title={translations.products.industrialRubberRolls.title}
        images={[
          {
            id: 1,
            src: "/images/industrial-1.jpeg",
            alt:
              translations.products.industrialRubberRolls.images
                .industrialRolls,
          },
          {
            id: 2,
            src: "/images/industrial-2.jpeg",
            alt:
              translations.products.industrialRubberRolls.images
                .industrialRolls,
          },
          {
            id: 3,
            src: "/images/industrial-3.jpeg",
            alt:
              translations.products.industrialRubberRolls.images
                .industrialRolls,
          },
        ]}
      />

      {/* ==================================================
          GET TO KNOW US
      ================================================== */}
      <GetToKnowUs
        text={translations.getToKnowUs.text}
        href={`/${locale}/contact`}
      />
    </div>
  );
}