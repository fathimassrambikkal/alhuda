"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}