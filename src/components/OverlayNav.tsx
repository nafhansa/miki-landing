"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

export default function OverlayNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const [nodeCount, setNodeCount] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 768px)').matches ? 100 : 400;
    }
    return 400;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = () => setNodeCount(mq.matches ? 100 : 400);
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, []);

  const gridArray = useMemo(() => Array.from({ length: nodeCount }), [nodeCount]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const toggleMenu = () => {
    // --- SAFETY GUARD: Pastikan ref ada sebelum animasi ---
    if (isAnimating || !containerRef.current || !menuRef.current) return;

    setIsAnimating(true);
    const container = containerRef.current;
    const blocks = gsap.utils.toArray(".overlay-reveal-block") as Element[];
    const menuItems = gsap.utils.toArray(".overlay-menu-item") as Element[];

    container.style.opacity = "1";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (container) container.style.opacity = "0"; // Safety check lagi
          setIsAnimating(false);
        }
      });

      if (!isOpen) {
        tl.add(() => setIsOpen(true), 0)
          .fromTo(blocks, 
            { scale: 1, opacity: 1 }, 
            { scale: 0, opacity: 0, duration: 0.8, stagger: { each: 0.005, from: "random", grid: "auto" }, ease: "power1.inOut" }, 0
          )
          .fromTo(menuItems, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, 0.4);
      } else {
        tl.to(menuItems, { autoAlpha: 0, y: -20, duration: 0.3 }, 0)
          .fromTo(blocks, 
            { scale: 0, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.8, stagger: { each: 0.005, from: "random", grid: "auto" }, ease: "power1.inOut" }, 0
          )
          .add(() => setIsOpen(false), 0.1);
      }
    }, containerRef);
    
    return () => ctx.revert();
  };

  const handleNav = (path: string) => {
    // --- SAFETY GUARD ---
    if (isAnimating || !containerRef.current) return;
    
    setIsAnimating(true);
    const container = containerRef.current;
    const blocks = gsap.utils.toArray(".overlay-reveal-block") as Element[];
    container.style.opacity = "1";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (container) container.style.opacity = "0";
          setIsAnimating(false);
        }
      });

      tl.add(() => setIsOpen(false), 0)
        .fromTo(blocks, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: { each: 0.002, from: "random", grid: "auto" }}, 0)
        .to(blocks, { scale: 0, opacity: 0, duration: 0.3, stagger: { each: 0.002, from: "random", grid: "auto" }}, 0.5)
        .add(() => router.push(path), 0.6);
    }, containerRef);
    
    return () => ctx.revert(); // Cleanup manual just in case
  };

  return (
    <>
      <button onClick={toggleMenu} className="fixed right-8 top-8 z-[2000] h-14 w-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-blue-normal transition-all">
        <div className={`flex flex-col gap-1.5 transition-all ${isOpen ? 'rotate-180' : ''}`}>
           <span className={`h-0.5 w-6 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
           <span className={`h-0.5 w-6 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
           <span className={`h-0.5 w-6 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[1500] grid grid-cols-10 md:grid-cols-20 w-full h-full overflow-hidden opacity-0">
        {gridArray.map((_, i) => (
          <div key={i} className="overlay-reveal-block bg-blue-normal w-full h-full border-[0.5px] border-blue-normal will-change-transform" />
        ))}
      </div>

      <div ref={menuRef} className={`fixed inset-0 z-[1000] flex items-center justify-center ${isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}>
        <div className="absolute inset-0 bg-[var(--color-bg-deep)]" />
        <div className="relative z-10 flex flex-col gap-4 text-center">
            {['HOME', 'PRICING', 'DOWNLOADS', 'LOGIN'].map((item) => (
                <button key={item} onClick={() => handleNav(item === 'HOME' ? '/#hero' : `/${item.toLowerCase()}`)} className="overlay-menu-item text-6xl md:text-8xl font-black text-white hover:text-blue-normal transition-colors opacity-0">
                    {item}
                </button>
            ))}
        </div>
      </div>
      
      <style jsx global>{`
        .will-change-transform { will-change: transform, opacity; transform: translateZ(0); }
      `}</style>
    </>
  );
}