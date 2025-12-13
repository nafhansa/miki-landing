'use client';

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Apple, Play, Smartphone, Star, ShieldCheck, Zap } from "lucide-react";

export default function DownloadPage() {
  const containerRef = useRef(null);
  const phoneRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Text Entrance
      tl.fromTo(".hero-text-element", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      )
      
      // 2. Buttons Entrance
      .fromTo(".store-button", 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, 
        "-=0.5"
      );

      // 3. Phone Entrance
      tl.from(phoneRef.current, {
        x: 100,
        opacity: 0,
        rotationY: 45,
        duration: 1.2,
        ease: "power3.out"
      }, "<");

      // 4. Floating Loop
      gsap.to(".phone-mockup-inner", {
        y: -20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 5. Glow Pulse
      gsap.to(".bg-glow-pulse", {
        opacity: 0.6,
        scale: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      // FIX MOBILE: 'py-24' biar bisa discroll di HP, 'lg:h-screen lg:py-0' biar full height di desktop
      className="relative min-h-screen bg-black text-white overflow-hidden flex items-center py-24 lg:py-0"
    >
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(var(--color-blue-normal-rgb),0.15),_transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_rgba(var(--color-purple-normal-rgb),0.1),_transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* --- LEFT COLUMN: TEXT --- */}
        <div className="max-w-xl relative z-30 mx-auto lg:mx-0 text-center lg:text-left">
          
          <div className="hero-text-element flex items-center justify-center lg:justify-start gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-normal/10 border border-blue-normal/30 text-blue-normal text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full">Available Now</span>
            <span className="px-3 py-1 bg-dpurple-normal/10 border border-dpurple-normal/30 text-dpurple-normal text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full flex items-center gap-1"><Star size={10} fill="currentColor" /> 4.9 Rating</span>
          </div>

          {/* FIX FONT SIZE MOBILE: text-4xl biar gak terlalu bongsor di HP */}
          <h1 className="hero-text-element text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your Body, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Digitized.</span>
          </h1>

          <p className="hero-text-element text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-md mx-auto lg:mx-0">
            Stop guessing what your food does to you. Download the app to scan meals, simulate organ health, and predict your future self with AI precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
            <button className="store-button group relative bg-white text-black px-5 py-3 rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-blue-normal hover:shadow-[0_0_20px_rgba(var(--color-blue-normal-rgb),0.4)] w-full sm:w-auto">
              <Apple size={28} className="shrink-0" />
              <div className="text-left">
                <div className="text-[10px] font-medium opacity-80">Download on the</div>
                <div className="text-base font-bold leading-none">App Store</div>
              </div>
            </button>

            <button className="store-button group relative bg-zinc-900 border border-white/20 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-zinc-800 hover:border-white/40 w-full sm:w-auto">
              <Play size={24} className="shrink-0 fill-current" />
              <div className="text-left">
                <div className="text-[10px] font-medium opacity-60 group-hover:opacity-100">GET IT ON</div>
                <div className="text-base font-bold leading-none">Google Play</div>
              </div>
            </button>
          </div>
          
           {/* Features Grid */}
           <div className="hero-text-element grid grid-cols-3 gap-4 md:gap-6 border-t border-white/10 pt-8">
            <div><div className="text-blue-normal mb-2 flex justify-center lg:justify-start"><Smartphone size={24} /></div><h4 className="font-bold text-sm">AR Scan</h4><p className="text-[10px] md:text-xs text-gray-500">Real-time analysis</p></div>
            <div><div className="text-dpurple-normal mb-2 flex justify-center lg:justify-start"><Zap size={24} /></div><h4 className="font-bold text-sm">Fast AI</h4><p className="text-[10px] md:text-xs text-gray-500">Instant results</p></div>
            <div><div className="text-white mb-2 flex justify-center lg:justify-start"><ShieldCheck size={24} /></div><h4 className="font-bold text-sm">Secure</h4><p className="text-[10px] md:text-xs text-gray-500">Data encrypted</p></div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: PHONE MOCKUP --- */}
        {/* z-20 agar di bawah teks, flex center */}
        <div ref={phoneRef} className="relative z-20 flex md:mr-20 justify-center lg:justify-end lg:pr-10 mt-8 lg:mt-0">
          
          <div className="bg-glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[300px] h-[400px] md:h-[500px] bg-dpurple-normal blur-[100px] opacity-40 rounded-full pointer-events-none" />

          {/* FIX MOBILE SIZE: w-[260px] h-[520px] untuk mobile, w-[300px] h-[600px] untuk desktop */}
          <div className="phone-mockup-inner relative z-10 w-[260px] h-[520px] md:w-[300px] md:h-[600px] bg-black rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-8 border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/20">
            
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 md:h-7 bg-black rounded-b-2xl z-30" />
            
            <div className="w-full h-full bg-zinc-900 relative">
              <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-blue-normal/20 to-transparent p-5 pt-10 md:p-6 md:pt-12">
                 <div className="flex justify-between items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-white/10" />
                    <div className="w-20 h-2 rounded-full bg-white/10" />
                 </div>
                 <h3 className="text-white font-bold text-xl md:text-2xl w-2/3 leading-tight">Hello, Alex</h3>
              </div>
              <div className="absolute top-28 md:top-32 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                 <div className="flex justify-between mb-4">
                    <span className="text-gray-400 text-[10px] uppercase tracking-wider">Health Score</span>
                    <span className="text-blue-normal font-bold">92%</span>
                 </div>
                 <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[92%] bg-blue-normal" />
                 </div>
              </div>
              <div className="absolute top-64 left-1/2 -translate-x-1/2 w-48 h-64 bg-gradient-to-b from-dpurple-normal/20 to-transparent rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-6 left-4 right-4 h-12 md:h-14 bg-blue-normal hover:bg-blue-normal-hover rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(var(--color-blue-normal-rgb),0.3)] cursor-pointer hover:scale-105 transition-transform">
                <span className="text-black font-bold text-sm md:text-base">Scan Food Now</span>
              </div>
            </div>
            
            {/* Screen Glare */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
          </div>

          {/* Floating Icons - Adjusted position for mobile to prevent overflow */}
          <div className="absolute top-10 left-0 md:top-20 md:left-10 bg-zinc-900 p-2 md:p-3 rounded-xl border border-white/10 shadow-xl animate-bounce duration-[3000ms]">
            <Zap size={16} className="text-blue-normal md:w-[20px] md:h-[20px]" />
          </div>
          <div className="absolute bottom-20 right-0 md:bottom-20 md:-right-15 bg-zinc-900 p-2 md:p-3 rounded-xl border border-white/10 shadow-xl animate-bounce duration-[4000ms]">
            <Star size={16} className="text-dpurple-normal md:w-[20px] md:h-[20px]" fill="currentColor" />
          </div>

        </div>

      </div>
    </section>
  );
}
