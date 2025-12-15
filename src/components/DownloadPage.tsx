'use client';

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Apple, Play, ShieldCheck, Activity } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DownloadPage() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  const physicalPhoneRef = useRef<HTMLDivElement>(null);
  const notchRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const mikiLogoRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);

  // Gunakan useEffect biasa agar jalan setelah render, tambah timeout kecil
  React.useEffect(() => {
    // 1. Matikan scroll restoration browser (biar gak balik ke bawah pas refresh)
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Paksa scroll ke atas dengan sedikit delay agar layout stabil dulu
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Setup Awal
      gsap.set(textContentRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: containerRef.current,
          anticipatePin: 1,
        }
      });

      // --- SEQUENCE CINEMATIC ZOOM OUT ---

      // 1. HP SCALE (Zoom Out)
      tl.fromTo(physicalPhoneRef.current,
        {
          scale: 12,          // Turunkan dikit dari 15 biar lebih aman
          borderWidth: "0px",
          borderRadius: "0px"
        },
        {
          scale: 1,
          borderWidth: "12px",
          borderRadius: "3rem",
          duration: 2.5,
          ease: "power2.inOut"
        }
        , "start");

      // 2. NOTCH (PONI) TURUN
      tl.fromTo(notchRef.current,
        { y: "-200%" },
        { y: "0%", duration: 2, ease: "power2.inOut" }
        , "start+=0.5");

      // 3. LOGO ADJUSTMENT
      // Di awal: Kita kecilkan logo (scale 0.15) supaya pas HP-nya raksasa, logonya terlihat ukuran wajar.
      tl.fromTo(mikiLogoRef.current,
        {
          scale: 0.15,
          opacity: 1,
          y: 10, // <--- UBAH ANGKA INI: Semakin besar, semakin turun posisinya di awal
        },
        {
          scale: 1,
          opacity: 1,
          y: 0, // Kembali ke tengah saat HP mengecil
          duration: 2.5,
          ease: "power2.inOut"
        }
        , "start");

      // 4. LOADING BAR (Opsional: Sembunyikan pas di-zoom biar gak ganggu, muncul pas udah jadi HP)
      tl.fromTo(loadingBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
        , "start+=1.5");

      // 5. TEXT LUAR MUNCUL
      tl.to(textContentRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "start+=2");

      // 6. GESER POSISI HP KE ATAS DIKIT
      tl.to(phoneWrapperRef.current, { y: -30, duration: 2 }, "start+=0.5");

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative h-[300vh] bg-black font-sans">

      <section
        ref={containerRef}
        className="h-screen w-full overflow-hidden flex flex-col items-center justify-center relative bg-black text-white pb-30"
      >

        {/* BACKGROUND ACCENT */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(var(--color-blue-normal-rgb),0.2),_transparent_70%)] pointer-events-none" />

        {/* === PART 1: HP AREA === */}
        <div className="relative z-20 flex-shrink-0 w-full flex items-center justify-center scale-90 md:scale-100 origin-bottom">

          <div ref={phoneWrapperRef} className="relative flex items-center justify-center">

            {/* PHYSICAL PHONE */}
            <div
              ref={physicalPhoneRef}
              className="relative w-[280px] h-[560px] md:w-[320px] md:h-[640px] overflow-hidden bg-black z-30 shadow-2xl border-zinc-800 ring-1 ring-white/5"
              style={{ willChange: 'transform, border-radius, border-width' }}
            >

              {/* NOTCH */}
              <div ref={notchRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[1.5rem] z-50 pointer-events-none" />

              {/* SCREEN CONTENT */}
              <div className="absolute inset-0 w-full h-full overflow-hidden z-20 bg-gradient-to-b from-bg-deep via-black to-black">

                {/* Glow Effect */}
                <div className="absolute top-0 w-full h-[50%] bg-blue-normal/30 blur-[80px] rounded-full pointer-events-none" />

                {/* --- LOGO WRAPPER (FIXED CENTER) --- */}
                {/* Menggunakan absolute inset-0 agar TERKUNCI di tengah walau di-zoom */}
                <div className="absolute inset-0 flex items-center justify-center z-40">

                  <div ref={mikiLogoRef} className="flex flex-col items-center origin-center">
                    {/* Icon */}
                    <div className="relative mb-6 group">
                      <div className="absolute inset-0 bg-blue-normal blur-3xl opacity-40 animate-pulse rounded-full" />
                      <div className="relative bg-zinc-950/80 backdrop-blur-md border border-white/10 text-white w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl">
                        <Activity size={36} className="text-blue-normal" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Main Text */}
                    <h1 className="text-5xl font-black tracking-tighter text-white mb-4 text-center drop-shadow-2xl">
                      MIKI
                    </h1>

                    {/* Subtext */}
                    <div className="flex items-center gap-3 overflow-hidden opacity-90">
                      <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-blue-normal" />
                      <p className="text-blue-normal text-[10px] font-mono tracking-[0.4em] uppercase whitespace-nowrap animate-pulse">
                        System Loading
                      </p>
                      <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-blue-normal" />
                    </div>
                  </div>

                </div>

                {/* Loading Bar Bawah (Absolute Bottom) */}
                <div ref={loadingBarRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[140px] h-1 bg-zinc-800 rounded-full overflow-hidden z-30">
                  <div className="w-full h-full bg-blue-normal animate-[shimmer_2s_infinite_linear] origin-left" />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* === PART 2: TITLE & INFO === */}
        <div ref={textContentRef} className="relative z-10 text-center max-w-xl px-6 flex flex-col items-center mt-6 md:mt-10">

          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
            Your Digital Twin <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-normal via-purple-normal to-dpurple-normal">
              Is Ready.
            </span>
          </h2>

          <p className="text-gray-400 text-sm md:text-base mb-6 max-w-md mx-auto leading-relaxed">
            Experience the next evolution of health tracking. MIKI analyzes your biology and visualizes your potential.
          </p>

          <div className="flex flex-row gap-3 w-auto justify-center">
            <button className="group bg-white text-black px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-blue-light transition-all active:scale-95">
              <Apple size={22} className="shrink-0" />
              <div className="text-left leading-none">
                <div className="text-[9px] font-medium opacity-70 uppercase tracking-wide">Download on</div>
                <div className="text-sm font-bold mt-0.5">App Store</div>
              </div>
            </button>

            <button className="group bg-zinc-900 border border-white/20 text-white px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-zinc-800 hover:border-blue-normal/40 transition-all active:scale-95">
              <Play size={20} className="fill-current shrink-0" />
              <div className="text-left leading-none">
                <div className="text-[9px] font-medium opacity-60 uppercase tracking-wide">Get it on</div>
                <div className="text-sm font-bold mt-0.5">Google Play</div>
              </div>
            </button>
          </div>

          <div className="flex gap-6 mt-6 opacity-40 justify-center">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              <ShieldCheck size={14} className="text-green-400" /> End-to-End Encrypted
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}