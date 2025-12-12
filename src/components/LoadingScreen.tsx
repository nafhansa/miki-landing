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

      tl.to(letters, {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-300, 300),
        rotation: () => gsap.utils.random(-360, 360),
        opacity: 0,
        duration: 0.1, 
      })
      .to(letters, {
        opacity: 1,
        duration: 0.5,
      })
      .to(letters, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
        stagger: {
          amount: 0.3,
          from: "center"
        }
      })
      .to(letters, {
        textShadow: "0 0 30px #00B7B5",
        color: "#ffffff",
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      })
      .to(letters, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        delay: 0.2
      })
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
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 grid grid-cols-10 md:grid-cols-12 lg:grid-cols-20 grid-rows-10 md:grid-rows-12 lg:grid-rows-20 w-full h-full">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="reveal-block bg-[#005461] w-full h-full border-[0.5px] border-[#005461]" />
        ))}
      </div>

      <div className="relative z-10 flex gap-2 md:gap-4 perspective-1000 pointer-events-none">
        {["M", "I", "I", "K", "I"].map((char, index) => (
          <span 
            key={index} 
            className="miiki-char text-6xl md:text-9xl font-black text-[#00B7B5] inline-block opacity-0"
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}