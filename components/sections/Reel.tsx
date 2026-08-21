"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// full rect corners -> diamond points (edge midpoints), same point count so
// clip-path interpolates smoothly: all 4 sides pull inward toward center.
const RECT = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100],
];
const DIAMOND = [
  [50, 0],
  [100, 50],
  [50, 100],
  [0, 50],
];

function clipAt(t: number) {
  const pts = RECT.map((c, i) => {
    const d = DIAMOND[i];
    const x = c[0] + (d[0] - c[0]) * t;
    const y = c[1] + (d[1] - c[1]) * t;
    return `${x}% ${y}%`;
  });
  return `polygon(${pts.join(",")})`;
}

export default function Reel() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  const playBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const modalVideo = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Magnetic effect
  useEffect(() => {
    const magnetic = (button: HTMLButtonElement | null) => {
      if (!button) return;
      const move = (e: PointerEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(button, { x: x * 0.25, y: y * 0.25, duration: 0.8, ease: "power3.out" });
      };
      const leave = () => {
        gsap.to(button, { x: 0, y: 0, duration: 1, ease: "elastic.out(1,0.35)" });
      };
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", leave);
      button.addEventListener("pointerup", leave);
      button.addEventListener("pointercancel", leave);
      return () => {
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerleave", leave);
        button.removeEventListener("pointerup", leave);
        button.removeEventListener("pointercancel", leave);
      };
    };
    const cleanup1 = magnetic(playBtn.current);
    const cleanup2 = magnetic(closeBtn.current);
    return () => {
      cleanup1?.();
      cleanup2?.();
    };
  }, []);

  // Video progress bar
  useEffect(() => {
    const video = modalVideo.current;
    if (!video) return;
    const update = () => {
      if (!progressRef.current) return;
      const progress = (video.currentTime / video.duration) * 100;
      progressRef.current.style.width = `${progress || 0}%`;
    };
    video.addEventListener("timeupdate", update);
    return () => video.removeEventListener("timeupdate", update);
  }, [open]);

  // ESC key
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) closeReel();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);

  const openReel = () => {
    setOpen(true);
    setTimeout(() => {
      const video = modalVideo.current;
      if (!video) return;
      video.currentTime = 0;
      video.muted = false;
      video.play();
      setPlaying(true);
      setMuted(false);

      gsap.set(videoWrapRef.current, { clearProps: "all" });
      if (videoWrapRef.current) {
        videoWrapRef.current.style.clipPath = clipAt(0);
      }

      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(
        videoWrapRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power4.out" }
      );
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }, 20);
  };

  const closeReel = () => {
    modalVideo.current?.pause();
    const wrap = videoWrapRef.current;
    if (!wrap) return;
    const proxy = { t: 0 };

    const tl = gsap.timeline({
      onComplete: () => setOpen(false),
    });

    tl.to(proxy, {
      t: 1,
      duration: 0.5,
      ease: "power2.inOut",
      onUpdate: () => {
        wrap.style.clipPath = clipAt(proxy.t);
      },
    }, 0)
      .to(wrap, { scale: 0.05, duration: 0.45, ease: "power3.in" }, 0.25)
      .to(wrap, { opacity: 0, duration: 0.25 }, 0.45)
      .to(backdropRef.current, { opacity: 0, duration: 0.4 }, 0.3)
      .to(modalRef.current, { opacity: 0, duration: 0.3 }, 0.4);
  };

  const togglePlay = () => {
    if (!modalVideo.current) return;
    if (playing) modalVideo.current.pause();
    else modalVideo.current.play();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!modalVideo.current) return;
    modalVideo.current.muted = !modalVideo.current.muted;
    setMuted(modalVideo.current.muted);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen overflow-hidden bg-black">
        <video ref={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover scale-105">
          <source src="/images/reel.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-20 flex h-full items-center justify-center px-6">
          <div className="relative flex flex-col items-center">
            <h1 className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-extralight tracking-[-0.06em]" style={{ mixBlendMode: "screen" }}>
              Showreel
            </h1>
            <button
              ref={playBtn}
              onClick={openReel}
              className="mt-8 flex touch-none items-center gap-3 text-white/90 md:absolute md:left-full md:top-1/2 md:mt-0 md:ml-16 md:-translate-y-1/2 md:whitespace-nowrap md:text-white/70 group transition-colors hover:text-white"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M3 2L9 6L3 10V2Z" />
              </svg>
              <span className="text-lg font-light tracking-wide">Play Reel</span>
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,.55)_100%)]" />
      </section>

      {/* MODAL */}
      {open && (
        <div
          ref={backdropRef}
          onClick={closeReel}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 lg:p-10"
        >
          <div ref={modalRef} onClick={(e) => e.stopPropagation()} className="relative flex w-full max-w-[1400px] flex-col">
            {/* CLOSE BUTTON - Fixed position with mix-blend-mode */}
            <button
              ref={closeBtn}
              onClick={closeReel}
              className="fixed top-6 right-6 z-[1001] flex items-center gap-2 text-white touch-none group"
              style={{ mixBlendMode: "difference" }}
            >
              <svg 
                width="30" 
                height="30" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="transition-transform duration-300 group-hover:rotate-90"
              >
                <path 
                  d="M6 6L18 18M18 6L6 18" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  strokeLinecap="round" 
                />
              </svg>
              <span className="text-sm font-light tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                Close Reel
              </span>
            </button>

            <div ref={videoWrapRef} className="relative overflow-hidden bg-black rounded-2xl shadow-2xl" style={{ transformOrigin: "center center" }}>
              <video ref={modalVideo} playsInline preload="auto" className="aspect-video w-full object-cover">
                <source src="/images/reel.mp4" type="video/mp4" />
              </video>

              {/* Bottom controls overlay - positioned slightly above bottom */}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 py-6 pb-8">
                <button 
                  onClick={togglePlay}
                  className="transition-transform hover:scale-110 text-white/80 hover:text-white"
                >
                  {playing ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M3 2L9 6L3 10V2Z" />
                    </svg>
                  )}
                </button>

                {/* Progress bar */}
                <div className="relative h-[2px] flex-1 overflow-hidden bg-white/20 rounded-full cursor-pointer group">
                  <div ref={progressRef} className="absolute left-0 top-0 h-full w-0 rounded-full bg-white transition-all duration-100" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
                </div>

                {/* Mute button */}
                <button 
                  onClick={toggleMute}
                  className="transition-transform hover:scale-110 text-white/80 hover:text-white"
                >
                  {muted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path fill="currentColor" d="M5 10H9L14 5V19L9 14H5Z" />
                      <path stroke="currentColor" strokeWidth="2" d="M18 7L22 17" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path fill="currentColor" d="M5 10H9L14 5V19L9 14H5Z" />
                      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M18 9C19 10 20 11 20 12C20 13 19 14 18 15" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}