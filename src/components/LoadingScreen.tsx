'use client';

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsFinished(true)
      });

      const letters = document.querySelectorAll(".miiki-char");
      const blocks = document.querySelectorAll(".reveal-block");

      // 1. Set Initial Random Pos (Supaya pas muncul udah acak)
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
        ease: "elastic.out(1, 0.3)", // Efek memantul dikit
        stagger: {
          amount: 0.3,
          from: "center"
        }
      })
      // 4. Efek Flash/Neon Blink
      .to(letters, {
        textShadow: "0 0 50px #00FFFF, 0 0 20px #00FFFF", // Neon Glow Hardcode biar nyala
        color: "#ffffff",
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      })
      // 5. TULISAN HILANG (Sesuai request)
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
        stagger: {
          amount: 1,
          from: "random",
          grid: "auto"
        },
        ease: "power2.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (isFinished) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Grid Overlay Background */}
      <div className="absolute inset-0 grid grid-cols-10 md:grid-cols-12 lg:grid-cols-20 grid-rows-10 md:grid-rows-12 lg:grid-rows-20 w-full h-full pointer-events-auto">
        {Array.from({ length: 400 }).map((_, i) => (
          // Warna background ini bisa diganti sesuai variable theme baru kamu nanti
          // Saat ini pakai hitam pekat biar kontras
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
