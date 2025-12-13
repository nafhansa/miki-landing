"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

export default function OverlayNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const theme = {
    red: "#F72585",
    blue: "#0055ff",
    dark: "#050505",
    white: "#ffffff",
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    if (isAnimating || !containerRef.current || !menuRef.current) return;

    setIsAnimating(true);
    const container = containerRef.current;
    const blocks = Array.from(
      container.querySelectorAll(".overlay-reveal-block")
    ) as HTMLDivElement[];
    const menuItems = Array.from(
      menuRef.current.querySelectorAll(".overlay-menu-item")
    ) as HTMLButtonElement[];

    container.style.opacity = "1";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          container.style.opacity = "0";
          setIsAnimating(false);
        },
      });

      if (!isOpen) {
        tl.add(() => {
          setIsOpen(true);
        }, 0)
          .fromTo(
            blocks,
            { scale: 1, opacity: 1 },
            {
              scale: 0,
              opacity: 0,
              duration: 1,
              stagger: { each: 0.003, from: "random", grid: [10, 10] },
              ease: "power1.inOut",
            },
            0
          )
          .fromTo(
            menuItems,
            { y: 8, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, stagger: 0.05, ease: "power2.out" },
            0.05
          );
      } else {
        tl.set(menuItems, { autoAlpha: 0 }, 0)
          .fromTo(
            blocks,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              stagger: { each: 0.003, from: "random", grid: [10, 10] },
              ease: "power1.inOut",
            },
            0
          )
          .add(() => {
            setIsOpen(false);
          }, 0.1)
          .to(
            blocks,
            {
              scale: 0,
              opacity: 0,
              duration: 0.35,
              stagger: { each: 0.003, from: "random", grid: [10, 10] },
              ease: "power1.inOut",
            },
            0.15
          );
      }
    }, containerRef);
  };

  const navigateWithReveal = (target: "home" | "pricing" | "downloads") => {
    if (isAnimating || !containerRef.current) return;
    setIsAnimating(true);
    const container = containerRef.current;
    const blocks = Array.from(
      container.querySelectorAll(".overlay-reveal-block")
    ) as HTMLDivElement[];
    container.style.opacity = "1";

    const tl = gsap.timeline({
      onComplete: () => {
        container.style.opacity = "0";
        setIsAnimating(false);
      },
    });

    tl.add(() => {
      setIsOpen(false);
    }, 0)
      .fromTo(
        blocks,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          stagger: { each: 0.0025, from: "random", grid: [10, 10] },
          ease: "power1.inOut",
        },
        0
      )
      .to(
        blocks,
        {
          scale: 0,
          opacity: 0,
          duration: 0.22,
          stagger: { each: 0.0025, from: "random", grid: [10, 10] },
          ease: "power1.inOut",
        },
        0.18
      )
      .add(() => {
        if (target === "home") {
          router.push("/#hero");
        } else if (target === "pricing") {
          router.push("/pricing");
        } else if (target === "downloads") {
          router.push("/downloads");
        }
      }, 0.25);
  };
  const handleHome = () => navigateWithReveal("home");
  const handlePricing = () => navigateWithReveal("pricing");
  const handleDownloads = () => navigateWithReveal("downloads");

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed right-8 top-8 z-[2000] flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-[#AD0D0E] hover:bg-black/80 hover:shadow-[0_0_20px_rgba(173,13,14,0.4)] active:scale-95"
      >
        <div className="flex flex-col gap-1.5">
            <span 
                className={`block h-[2px] w-6 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2 bg-[#AD0D0E]" : ""}`} 
                style={{ boxShadow: isOpen ? `0 0 10px ${theme.red}` : "none" }}
            />
            <span 
                className={`block h-[2px] w-4 bg-white transition-all duration-300 self-end ${isOpen ? "opacity-0" : ""}`} 
            />
            <span 
                className={`block h-[2px] w-6 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2 bg-[#AD0D0E]" : ""}`} 
                style={{ boxShadow: isOpen ? `0 0 10px ${theme.red}` : "none" }}
            />
        </div>
      </button>

      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-[1500] grid grid-cols-10 md:grid-cols-20 grid-rows-10 md:grid-rows-20 w-full h-full overflow-hidden opacity-0"
      >
        {Array.from({ length: 400 }).map((_, i) => (
          <div
            key={i}
            className="overlay-reveal-block bg-[#F72585] w-full h-full border-[0.5px] border-[#F72585]"
          />
        ))}
      </div>

      <div
        ref={menuRef}
        className={`fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden transition-opacity duration-0 ${
            isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #050510 0%, #0b0f26 60%, #1a0b2e 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 1200px at 20% 10%, rgba(128,0,255,0.18), transparent 60%), radial-gradient(900px 900px at 80% 70%, rgba(0,140,255,0.18), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(2px 2px at 12% 22%, rgba(255,255,255,0.35) 40%, transparent 60%), radial-gradient(1px 1px at 76% 68%, rgba(255,255,255,0.25) 40%, transparent 60%), radial-gradient(1px 1px at 42% 54%, rgba(255,255,255,0.2) 40%, transparent 60%)",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
        
        <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)", 
                backgroundSize: "50px 50px" 
            }} 
        />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <div className="group relative overflow-hidden p-2">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 transition-all duration-300 group-hover:left-[-20px] group-hover:text-[#AD0D0E] group-hover:opacity-0 md:-left-8">
                    01
                </span>
                <button
                    onClick={handleHome}
                    className="relative block font-black uppercase italic tracking-tighter text-white transition-all duration-300 hover:tracking-widest"
                    style={{ fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 0.9 }}
                >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500">
                        HOME
                    </span>
                    <span 
                        className="absolute left-0 top-0 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
                        style={{ 
                            WebkitTextStroke: `1px ${theme.red}`, 
                            color: "transparent",
                            textShadow: `0 0 10px ${theme.red}` 
                        }}
                    >
                        HOME
                    </span>
                </button>
            </div>

            <div className="group relative overflow-hidden p-2">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 transition-all duration-300 group-hover:left-[-20px] group-hover:text-[#AD0D0E] group-hover:opacity-0 md:-left-8">
                    02
                </span>
                <button
                    onClick={handlePricing}
                    className="relative block font-black uppercase italic tracking-tighter text-white transition-all duration-300 hover:tracking-widest"
                    style={{ fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 0.9 }}
                >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500">
                        PRICING
                    </span>
                    <span 
                        className="absolute left-0 top-0 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
                        style={{ 
                            WebkitTextStroke: `1px ${theme.red}`, 
                            color: "transparent",
                            textShadow: `0 0 10px ${theme.red}` 
                        }}
                    >
                        PRICING
                    </span>
                </button>
            </div>

            <div className="group relative overflow-hidden p-2">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 transition-all duration-300 group-hover:left-[-20px] group-hover:text-[#AD0D0E] group-hover:opacity-0 md:-left-8">
                    03
                </span>
                <button
                    onClick={handleDownloads}
                    className="relative block font-black uppercase italic tracking-tighter text-white transition-all duration-300 hover:tracking-widest"
                    style={{ fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 0.9 }}
                >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500">
                        DOWNLOADS
                    </span>
                    <span 
                        className="absolute left-0 top-0 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
                        style={{ 
                            WebkitTextStroke: `1px ${theme.red}`, 
                            color: "transparent",
                            textShadow: `0 0 10px ${theme.red}` 
                        }}
                    >
                        DOWNLOADS
                    </span>
                </button>
            </div>
        </div>
      </div>
    </>
  );
}
