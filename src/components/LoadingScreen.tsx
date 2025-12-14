'use client';

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsFinished(true);
          // Panggil callback agar page.tsx tau loading kelar
          if (onFinish) onFinish();
        }
      });

      // Animasi Loadingmu (Disederhanakan untuk brevity, paste logika animasimu di sini)
      const letters = document.querySelectorAll(".miiki-char");
      const blocks = document.querySelectorAll(".reveal-block");

      tl.set(letters, { opacity: 0, scale: 0.5 })
        .to(letters, { opacity: 1, duration: 0.5 })
        .to(letters, { scale: 1, duration: 1, ease: "elastic.out" })
        .to(letters, { opacity: 0, duration: 0.3, delay: 0.5 })
        .to(blocks, { scale: 0, duration: 0.8, stagger: { amount: 0.5, grid: "auto", from: "random" } });

    }, containerRef);

    return () => ctx.revert();
  }, [onFinish]);

  if (isFinished) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-auto">
       <div className="absolute inset-0 grid grid-cols-10 md:grid-cols-20 w-full h-full">
         {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="reveal-block bg-[#050510] border-[0.5px] border-white/5 w-full h-full" />
         ))}
       </div>
       <div className="relative z-10 flex gap-2">
         {["M", "I", "I", "K", "I"].map((char, i) => (
           <span key={i} className="miiki-char text-6xl font-black text-[#00FFFF]">{char}</span>
         ))}
       </div>
    </div>
  );
}