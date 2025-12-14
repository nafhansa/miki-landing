'use client';

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // 1. SAFETY GUARD: Cegah error 'Invalid scope' jika komponen belum siap
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsFinished(true);
          // Trigger ke page.tsx bahwa loading selesai -> Load 3D Scene sekarang!
          if (onFinish) onFinish();
        }
      });

      const letters = document.querySelectorAll(".miiki-char");
      const blocks = document.querySelectorAll(".reveal-block");

      // --- LOGIKA ORIGINAL (Scramble -> Gabung -> Nyala -> Ilang) ---

      // 1. Set Posisi Acak Awal
      tl.set(letters, {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-300, 300),
        rotation: () => gsap.utils.random(-360, 360),
        opacity: 0,
        scale: 0.5
      })
      // 2. Muncul pelan-pelan (Fade In)
      .to(letters, {
        opacity: 1,
        duration: 0.5,
      })
      // 3. Menyatu ke Tengah (Unite)
      .to(letters, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
        stagger: { amount: 0.3, from: "center" }
      })
      // 4. Efek Flash/Neon Blink (Nyala)
      .to(letters, {
        textShadow: "0 0 50px #00FFFF, 0 0 20px #00FFFF",
        color: "#ffffff",
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      })
      // 5. Tulisan Hilang
      .to(letters, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        delay: 0.2
      })
      // 6. Grid Terbuka (Reveal Website)
      .to(blocks, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: { amount: 0.5, from: "random", grid: "auto" },
        ease: "power2.inOut"
      });

    }, containerRef);

    return () => ctx.revert(); // Cleanup aman
  }, [onFinish]);

  if (isFinished) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-auto"
      style={{ willChange: "transform, opacity" }} // Optimization Hint
    >
      {/* Grid Overlay Background */}
      <div className="absolute inset-0 grid grid-cols-10 md:grid-cols-20 w-full h-full">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="reveal-block bg-[#050510] w-full h-full border-[0.5px] border-white/5" />
        ))}
      </div>

      {/* Text Container */}
      <div className="relative z-10 flex gap-2 md:gap-4 perspective-1000">
        {["M", "I", "I", "K", "I"].map((char, index) => (
          <span 
            key={index} 
            className="miiki-char text-6xl md:text-9xl font-black text-[#00FFFF] inline-block opacity-0"
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}