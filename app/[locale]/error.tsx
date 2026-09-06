"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ locale: string }>();
  const locale = params.locale === "ar" ? "ar" : "en";

  const isArabic = locale === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="
        flex
        min-h-[70vh]
        
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
          {isArabic ? "حدث خطأ" : "Something went wrong"}
        </p>

        {/* Main heading */}
        <h1
          className="
            font-light
            leading-[0.85]
            tracking-[-0.075em]
            text-[clamp(4.5rem,22vw,14rem)]
            sm:text-[clamp(6rem,18vw,16rem)]
            lg:text-[clamp(8rem,16vw,18rem)]
            2xl:text-[clamp(10rem,14vw,20rem)]
          "
        >
          {isArabic ? "خطأ" : "Error"}
        </h1>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-7
            max-w-[34rem]
            px-2
            text-[15px]
            font-light
            leading-[1.45]
            tracking-[-0.02em]
            text-neutral-600
            min-[375px]:text-base
            sm:mt-8
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
            ? "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."
            : "An unexpected error occurred. Please try again."}
        </p>

        {/* Actions */}
        <div
          className="
            mt-8
            flex
            w-full
            flex-col
            items-stretch
            justify-center
            gap-3
            px-2
            min-[400px]:flex-row
            min-[400px]:items-center
            min-[400px]:px-0
            sm:mt-10
            sm:gap-4
          "
        >
          {/* Try again */}
          <button
            type="button"
            onClick={() => reset()}
            className="
              inline-flex
              min-h-12
              items-center
              justify-center
              border
              border-black
              bg-black
              px-6
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
              sm:px-7
              sm:py-4
              sm:text-sm
              md:px-8
              lg:px-9
            "
          >
            {isArabic ? "حاول مرة أخرى" : "Try again"}
          </button>

          {/* Back home */}
          <Link
            href={`/${locale}`}
            className="
              inline-flex
              min-h-12
              items-center
              justify-center
              border
              border-black
              bg-transparent
              px-6
              py-3.5
              text-xs
              font-medium
              text-black
              transition-colors
              duration-300
              hover:bg-black
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-black
              focus-visible:ring-offset-2
              sm:min-h-13
              sm:px-7
              sm:py-4
              sm:text-sm
              md:px-8
              lg:px-9
            "
          >
            {isArabic ? "العودة إلى الرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </main>
  );
}