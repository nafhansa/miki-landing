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
    ) as HTMLButtonElement[]; // Pastikan class ini ada di button menu nanti

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
            menuItems, // Target menu items animation
            { y: 50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
            0.5
          );
      } else {
        tl.to(menuItems, { autoAlpha: 0, y: -20, duration: 0.3 }, 0)
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

  // Update tipe target navigasi
  const navigateWithReveal = (target: "home" | "pricing" | "downloads" | "login") => {
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
        if (target === "home") router.push("/#hero");
        else if (target === "pricing") router.push("/pricing");
        else if (target === "downloads") router.push("/downloads");
        else if (target === "login") router.push("/login"); // New Route
      }, 0.25);
  };

  const handleHome = () => navigateWithReveal("home");
  const handlePricing = () => navigateWithReveal("pricing");
  const handleDownloads = () => navigateWithReveal("downloads");
  const handleLogin = () => navigateWithReveal("login"); // New Handler

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed right-8 top-8 z-[2000] flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-[#F72585] hover:bg-black/80 hover:shadow-[0_0_20px_rgba(247,37,133,0.4)] active:scale-95"
      >
        <div className="flex flex-col gap-1.5">
            <span 
                className={`block h-[2px] w-6 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2 bg-[#F72585]" : ""}`} 
                style={{ boxShadow: isOpen ? `0 0 10px ${theme.red}` : "none" }}
            />
            <span 
                className={`block h-[2px] w-4 bg-white transition-all duration-300 self-end ${isOpen ? "opacity-0" : ""}`} 
            />
            <span 
                className={`block h-[2px] w-6 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2 bg-[#F72585]" : ""}`} 
                style={{ boxShadow: isOpen ? `0 0 10px ${theme.red}` : "none" }}
            />
        </div>
      </button>

      {/* Grid Reveal Layer */}
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

      {/* Menu Layer */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden transition-opacity duration-0 ${
            isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[#050510]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a0b2e] via-[#050510] to-[#050510]" />
        
        {/* Menu Items Container */}
        <div className="relative z-10 flex flex-col items-center gap-2 text-center">
            
            {/* HOME */}
            <div className="group overlay-menu-item relative overflow-hidden p-2">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 transition-all duration-300 group-hover:left-[-20px] group-hover:text-[#F72585] group-hover:opacity-0 md:-left-8">01</span>
                <button onClick={handleHome} className="menu-btn relative block font-black uppercase italic tracking-tighter text-white transition-all duration-300 hover:tracking-widest" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 0.9 }}>
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500">HOME</span>
                    <span className="absolute left-0 top-0 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ WebkitTextStroke: `1px ${theme.red}`, color: "transparent", textShadow: `0 0 10px ${theme.red}` }}>HOME</span>
                </button>
            </div>

            {/* PRICING */}
            <div className="group overlay-menu-item relative overflow-hidden p-2">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 transition-all duration-300 group-hover:left-[-20px] group-hover:text-[#F72585] group-hover:opacity-0 md:-left-8">02</span>
                <button onClick={handlePricing} className="menu-btn relative block font-black uppercase italic tracking-tighter text-white transition-all duration-300 hover:tracking-widest" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 0.9 }}>
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500">PRICING</span>
                    <span className="absolute left-0 top-0 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ WebkitTextStroke: `1px ${theme.red}`, color: "transparent", textShadow: `0 0 10px ${theme.red}` }}>PRICING</span>
                </button>
            </div>

            {/* DOWNLOADS */}
            <div className="group overlay-menu-item relative overflow-hidden p-2">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 transition-all duration-300 group-hover:left-[-20px] group-hover:text-[#F72585] group-hover:opacity-0 md:-left-8">03</span>
                <button onClick={handleDownloads} className="menu-btn relative block font-black uppercase italic tracking-tighter text-white transition-all duration-300 hover:tracking-widest" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 0.9 }}>
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500">DOWNLOADS</span>
                    <span className="absolute left-0 top-0 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ WebkitTextStroke: `1px ${theme.red}`, color: "transparent", textShadow: `0 0 10px ${theme.red}` }}>DOWNLOADS</span>
                </button>
            </div>

            {/* LOGIN (NEW) */}
            <div className="group overlay-menu-item relative overflow-hidden p-2">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 transition-all duration-300 group-hover:left-[-20px] group-hover:text-[#F72585] group-hover:opacity-0 md:-left-8">04</span>
                <button onClick={handleLogin} className="menu-btn relative block font-black uppercase italic tracking-tighter text-white transition-all duration-300 hover:tracking-widest" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 0.9 }}>
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500">LOGIN</span>
                    <span className="absolute left-0 top-0 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ WebkitTextStroke: `1px ${theme.red}`, color: "transparent", textShadow: `0 0 10px ${theme.red}` }}>LOGIN</span>
                </button>
            </div>

        </div>
      </div>
    </>
  );
}