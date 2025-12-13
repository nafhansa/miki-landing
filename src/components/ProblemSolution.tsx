'use client';

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Clock, FileWarning } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROBLEMS = [
  {
    icon: <AlertTriangle size={32} />,
    title: "Hidden Ingredients",
    desc: "Excess sodium & sugar hide in 'healthy' foods.",
    color: "text-red-500",
    bg: "bg-red-500/10",
    borderColor: "group-hover:border-red-500/50",
    shadow: "group-hover:shadow-[0_0_50px_-10px_rgba(239,68,68,0.5)]"
  },
  {
    icon: <Clock size={32} />,
    title: "The 5-Year Lag",
    desc: "Chronic diseases build up silently over years.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    borderColor: "group-hover:border-orange-500/50",
    shadow: "group-hover:shadow-[0_0_50px_-10px_rgba(249,115,22,0.5)]"
  },
  {
    icon: <FileWarning size={32} />,
    title: "Boring Tracking",
    desc: "Manual calorie counting is tedious and abstract.",
    color: "text-gray-300",
    bg: "bg-gray-500/10",
    borderColor: "group-hover:border-gray-400/50",
    shadow: "group-hover:shadow-[0_0_50px_-10px_rgba(209,213,219,0.4)]"
  }
];

export default function ProblemSolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const IMG_DESKTOP = "/problem-cover.jpg"; 
  const IMG_MOBILE = "/pexels-taryn-elliott-4374578.jpg";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================================
      // 1. DESKTOP ANIMATION (Min-width: 768px)
      // =========================================
      mm.add("(min-width: 768px)", () => {
        // Setup 3D
        gsap.set(".card-back", { rotationY: 180 }); 
        
        // Reset container (Hapus setting border/radius di sini karena container invisible)
        gsap.set(".problem-card-inner", { rotationY: 0 });
        gsap.set(".card-border", { borderWidth: 0 }); 
        
        gsap.set(cardsRef.current, { gap: 0 }); 
        gsap.set([".card-front", ".card-back"], { borderRadius: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });

        // 1. Shrink
        tl.to(cardsRef.current, { scale: 0.85, duration: 1, ease: "power2.inOut" });
        tl.to(".section-title", { y: -50, opacity: 0.5, scale: 0.9, duration: 1 }, "<");
        
        // 2. Split & Rounding
        // Kita animasikan .card-border dan content faces, BUKAN container utamanya
        tl.to(".card-border", { borderWidth: "1px", duration: 0.5, ease: "power2.inOut" }, ">-0.2");
        tl.to(cardsRef.current, { gap: "2rem", duration: 1, ease: "power2.inOut" }, "<");
        
        // PENTING: Target elemen yang visible saja untuk borderRadius
        tl.to([".card-front", ".card-back", ".card-border"], { borderRadius: "1.5rem", duration: 1, ease: "power2.inOut" }, "<");
        
        // 3. Flip
        tl.to(".problem-card-inner", { rotateY: 180, duration: 1.2, stagger: 0.15, ease: "power2.inOut" }, ">-0.5");
      });

      // =========================================
      // 2. MOBILE ANIMATION (Max-width: 767px)
      // =========================================
      mm.add("(max-width: 767px)", () => {
        gsap.set(".card-back", { rotationY: 180 });
        gsap.set(".problem-card-inner", { rotationY: 0 }); 
        gsap.set(".card-border", { borderWidth: 0 });
        
        gsap.set(cardsRef.current, { gap: 0 });
        gsap.set([".card-front", ".card-back"], { borderRadius: 0 });
        gsap.set(".card-front", { display: "block" }); 

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=1500",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });

        tl.to(cardsRef.current, { scale: 0.9, duration: 1, ease: "power2.inOut" });
        tl.to(".section-title", { opacity: 0, y: -20, duration: 0.5 }, "<");

        tl.to(".card-border", { borderWidth: "1px", duration: 0.5, ease: "power2.inOut" }, ">-0.2");
        tl.to(cardsRef.current, { gap: "1.5rem", duration: 1, ease: "power2.inOut" }, "<");
        
        tl.to([".card-front", ".card-back", ".card-border"], { borderRadius: "1.5rem", duration: 1, ease: "power2.inOut" }, "<");

        tl.to(".problem-card-inner", { rotateY: 180, duration: 1, stagger: 0.2, ease: "power2.inOut" }, ">-0.5");
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black text-white relative">
      
      <div ref={triggerRef} className="w-full h-screen flex flex-col items-center justify-center py-10 overflow-hidden">
        
        <div className="section-title text-center mb-8 relative z-10 px-4 transition-opacity">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#CCFF00] uppercase mb-3">
            The Invisible Problem
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Eating Blindly? <br /> See the Truth.
          </h3>
        </div>

        <div 
          ref={cardsRef} 
          className="flex flex-col md:flex-row w-full max-w-6xl h-[65vh] md:h-[60vh] px-6 md:px-0 will-change-transform"
        >
          {PROBLEMS.map((item, index) => (
            <div 
              key={index} 
              className="problem-card relative flex-1 w-full md:w-auto group perspective-1000"
            >
              <div 
                className={`
                  problem-card-inner relative w-full h-full 
                  transition-all duration-500 ease-out transform-style-3d 
                  ${item.shadow} 
                `}
                // HAPUS overflow-hidden DARI SINI !!!
                // HAPUS class border juga dari sini
              >
                
                {/* --- FRONT SIDE --- */}
                <div 
                  className="card-front absolute inset-0 w-full h-full backface-hidden overflow-hidden bg-gray-900 z-[1]"
                >
                  <div 
                    className="absolute inset-0 w-full h-full puzzle-bg"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* --- BACK SIDE --- */}
                <div 
                  className="card-back absolute inset-0 w-full h-full backface-hidden overflow-hidden bg-[#111] p-6 md:p-8 flex flex-col justify-center items-center text-center z-[1]"
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-3 md:mb-6 ${item.bg} ${item.color} shadow-inner`}>
                    {item.icon}
                  </div>
                  
                  <h4 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4 group-hover:text-[#CCFF00] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-xs md:text-lg">
                    {item.desc}
                  </p>
                </div>

                {/* --- BORDER OVERLAY (SOLUSI BOCOR) --- */}
                {/* translate-z-[1px] PENTING:
                    Supaya border ini melayang sedikit di atas gambar 3D, 
                    jadi tidak 'rebutan pixel' (flickering) dengan gambar.
                */}
                <div 
                  className={`
                    card-border absolute inset-0 z-[50] pointer-events-none 
                    rounded-[inherit] border-solid border-transparent 
                    transition-colors duration-300 translate-z-[1px]
                    ${item.borderColor}
                  `}
                />

              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        
        /* Utility class untuk Z-axis */
        .translate-z-\[1px\] { transform: translateZ(1px); }

        /* --- PUZZLE LOGIC --- */
        .puzzle-bg {
            background-image: url('${IMG_MOBILE}');
            background-size: 100% 300% !important; 
            background-repeat: no-repeat;
        }

        .problem-card:nth-child(1) .puzzle-bg { background-position: center top !important; }
        .problem-card:nth-child(2) .puzzle-bg { background-position: center center !important; }
        .problem-card:nth-child(3) .puzzle-bg { background-position: center bottom !important; }

        @media (min-width: 768px) {
            .puzzle-bg {
                background-image: url('${IMG_DESKTOP}') !important;
                background-size: 300% 100% !important;
            }

            .problem-card:nth-child(1) .puzzle-bg { background-position: left center !important; }
            .problem-card:nth-child(2) .puzzle-bg { background-position: center center !important; }
            .problem-card:nth-child(3) .puzzle-bg { background-position: right center !important; }
        }
      `}</style>
    </section>
  );
}
