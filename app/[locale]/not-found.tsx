"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFound() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale === "ar" ? "ar" : "en";

  const isArabic = locale === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="
        flex
        min-h-[70vh]
        min-h-[70svh]
        items-center
        justify-center
        bg-white
        px-4
        py-20
        text-black
        sm:px-6
        sm:py-24
        md:px-8
        lg:px-12
        xl:px-16
        2xl:px-20
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1800px]
          text-center
        "
      >
        {/* Eyebrow */}
        <p
          className="
            mb-5
            text-[10px]
            font-medium
            uppercase
            tracking-[0.16em]
            text-neutral-500
            min-[375px]:text-[11px]
            sm:mb-6
            sm:text-xs
            sm:tracking-[0.18em]
            md:text-sm
          "
        >
          {isArabic ? "خطأ 404" : "Error 404"}
        </p>

        {/* 404 */}
        <h1
          className="
            font-light
            leading-[0.8]
            tracking-[-0.08em]
            text-[clamp(5rem,28vw,17rem)]
            sm:text-[clamp(7rem,23vw,19rem)]
            md:text-[clamp(8rem,20vw,20rem)]
            lg:text-[clamp(10rem,17vw,22rem)]
            2xl:text-[clamp(12rem,15vw,25rem)]
          "
        >
          404
        </h1>

        {/* Title */}
        <h2
          className="
            mt-7
            font-light
            leading-[1]
            tracking-[-0.055em]
            text-[clamp(1.8rem,7vw,4.5rem)]
            sm:mt-8
            sm:text-[clamp(2.2rem,6vw,5rem)]
            lg:text-[clamp(3rem,4vw,5rem)]
          "
        >
          {isArabic ? "الصفحة غير موجودة" : "Page not found"}
        </h2>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-6
            max-w-[34rem]
            px-2
            text-[15px]
            font-light
            leading-[1.5]
            tracking-[-0.02em]
            text-neutral-600
            min-[375px]:text-base
            sm:mt-7
            sm:max-w-[38rem]
            sm:px-0
            sm:text-lg
            md:text-xl
            lg:text-2xl
            2xl:max-w-[44rem]
            2xl:text-[1.7rem]
          "
        >
          {isArabic
            ? "الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها."
            : "The page you're looking for doesn't exist or may have been moved."}
        </p>

        {/* Home button */}
        <div className="mt-8 sm:mt-10">
          <Link
            href={`/${locale}`}
            className="
              inline-flex
              min-h-12
              items-center
              justify-center
              border
              border-black
              bg-black
              px-7
              py-3.5
              text-xs
              font-medium
              text-white
              transition-opacity
              duration-300
              hover:opacity-70
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-black
              focus-visible:ring-offset-2
              sm:min-h-13
              sm:px-8
              sm:py-4
              sm:text-sm
              md:px-9
              lg:px-10
            "
          >
            {isArabic ? "العودة إلى الرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </main>
  );
}