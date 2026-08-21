import React from "react";

type IconProps = {
  className?: string;
};

/* =========================================
   Diagonal Arrow
========================================= */

export const ArrowIcon = ({ className = "" }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`relative top-[0.08em] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className}`}
  >
    <path d="M7 7h10v10" />
    <path d="M17 7L7 17" />
  </svg>
);

/* =========================================
   Right Arrow
========================================= */

export const ChevronArrowIcon = ({ className = "" }: IconProps) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 group-hover:translate-x-1 ${className}`}
  >
    <path
      d="M4 2L8 6L4 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);