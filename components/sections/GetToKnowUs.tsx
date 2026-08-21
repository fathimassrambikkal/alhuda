"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface GetToKnowUsProps {
  text?: string;
  href?: string;
}

export default function GetToKnowUs({
  text,
  href,
}: GetToKnowUsProps) {
  const params = useParams();
  const locale = params.locale === "ar" ? "ar" : "en";

  const defaultText =
    locale === "ar" ? "تعرّف علينا" : "Get to know us";

  const defaultHref = `/${locale}/contact`;

  return (
    <section className="flex min-h-[40vh] w-full items-center justify-center bg-white px-5 py-24 text-black sm:min-h-[65vh] md:min-h-[70vh] md:py-32">
      <Link
        href={href ?? defaultHref}
        className="group inline-block text-center text-[28px] font-light leading-none tracking-[-0.06em] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[60px] 2xl:text-[68px] 3xl:text-[76px] 4xl:text-[84px]"
      >
        <span className="relative inline-block after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-100 after:bg-black after:transition-transform after:duration-500 after:ease-out group-hover:after:scale-x-0">
          {text ?? defaultText}
        </span>
      </Link>

      <style jsx>{`
        @media (min-width: 300px) and (max-width: 639px) {
          .group {
            font-size: clamp(24px, 8vw, 28px) !important;
          }
        }

        @media (min-width: 2560px) {
          .group {
            font-size: clamp(84px, 3.5vw, 110px) !important;
          }
        }
      `}</style>
    </section>
  );
}