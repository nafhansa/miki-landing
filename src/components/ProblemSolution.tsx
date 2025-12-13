'use client';

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Clock, FileWarning } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- DATA KONTEN (MASIH LENGKAP) ---
const PROBLEMS = [
  {
    icon: <AlertTriangle size={32} />,
    title: "Hidden Ingredients",
    desc: "Excess sodium & sugar hide in 'healthy' foods. You don't feel the damage now, but your kidneys do.",
    color: "text-red-500",
    bg: "bg-red-500/10",
    // Glow Merah
    glowClass: "group-hover:shadow-[0_0_50px_-10px_rgba(239,68,68,0.5)] group-hover:border-red-500/50"
  },
  {
    icon: <Clock size={32} />,
    title: "The 5-Year Lag",
    desc: "Chronic diseases don't appear overnight. They build up silently over years of unmonitored habits.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    // Glow Orange
    glowClass: "group-hover:shadow-[0_0_50px_-10px_rgba(249,115,22,0.5)] group-hover:border-orange-500/50"
  },
  {
    icon: <FileWarning size={32} />,
    title: "Boring Tracking",
    desc: "Manual calorie counting is tedious and abstract. It feels like homework, impossible to sustain.",
    color: "text-gray-300",
    bg: "bg-gray-500/10",
    // Glow Silver
    glowClass: "group-hover:shadow-[0_0_50px_-10px_rgba(209,213,219,0.4)] group-hover:border-gray-400/50"
  }
];

export default function ProblemSolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const IMAGE_URL = "/problem-cover.jpg"; 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1, // Momentum scrub agar smooth
          pin: true,
          anticipatePin: 1,
        }
      });

      // 1. SHRINK (Mengecil)
      tl.to(cardsRef.current, {
        scale: 0.85, 
        duration: 1,
        ease: "power2.inOut" 
      });

      tl.to(".section-title", {
        y: -50,
        scale: 0.9,
        opacity: 0.5,
        duration: 1,
        ease: "power2.inOut"
      }, "<");

      // 2. SPLIT (Memisah)
      tl.to(cardsRef.current, {
        gap: "2rem", 
        duration: 1,
        ease: "power2.inOut"
      }, ">-0.2");

      // ROUNDED CORNERS: Dianimasikan langsung di Front & Back
      tl.to([".card-front", ".card-back"], {
        borderRadius: "1.5rem", 
        duration: 1,
        ease: "power2.inOut"
      }, "<");

      // 3. FLIP (Berputar menampilkan KONTEN)
      tl.to(".problem-card-inner", {
        rotateY: 180,
        duration: 1.2,
        stagger: 0.15, 
        ease: "power2.inOut"
      }, ">-0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black text-white relative">
      
      <div ref={triggerRef} className="h-screen w-full flex flex-col items-center justify-center overflow-hidden py-10">
        
        {/* Title */}
        <div className="section-title text-center mb-8 relative z-10 will-change-transform">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#CCFF00] uppercase mb-3">
            The Invisible Problem
          </h2>
          <h3 className="text-3xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Eating Blindly? <br /> See the Truth.
          </h3>
        </div>

        {/* Cards Wrapper */}
        <div 
          ref={cardsRef} 
          className="flex w-full max-w-6xl h-[50vh] md:h-[60vh] gap-0 px-4 will-change-transform"
        >
          {PROBLEMS.map((item, index) => (
            <div 
              key={index} 
              className="problem-card relative flex-1 group perspective-1000"
            >
              {/* INNER 3D CONTAINER */}
              <div 
                className={`
                  problem-card-inner relative w-full h-full 
                  transition-all duration-500 ease-out transform-style-3d 
                  border border-transparent
                  ${item.glowClass} 
                  group-hover:-translate-y-3
                `}
                style={{ borderRadius: '1.5rem' }} 
              >
                
                {/* --- FRONT SIDE (GAMBAR) --- */}
                {/* z-20 agar di awal dia di atas */}
                <div 
                  className="card-front absolute inset-0 w-full h-full backface-hidden overflow-hidden bg-gray-900 z-20"
                  style={{
                    backgroundImage: `url(${IMAGE_URL})`,
                    backgroundSize: '300% 100%', 
                    backgroundPosition: `${index * 50}% center`,
                    borderRadius: '0px'
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* --- BACK SIDE (KONTEN TEXT) --- */}
                {/* transform rotateY(180deg) wajib ada di style awal */}
                <div 
                  className="card-back absolute inset-0 w-full h-full backface-hidden overflow-hidden bg-[#111] p-8 flex flex-col justify-center items-center text-center z-10"
                  style={{ 
                    transform: 'rotateY(180deg)',
                    borderRadius: '0px'
                  }}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.bg} ${item.color} shadow-inner`}>
                    {item.icon}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-[#CCFF00] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {item.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        /* Penting: -webkit prefix untuk Safari/iOS */
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
    </section>
  );
}