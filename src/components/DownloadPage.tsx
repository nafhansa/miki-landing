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
      // Kita pakai fromTo agar lebih robust (pasti set opacity 1 di akhir)
      tl.fromTo(".hero-text-element", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      )
      
      // 2. Buttons Entrance (FIXED: Pakai fromTo)
      // Ini memaksa button pasti jadi opacity 1 di akhir animasi
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
    <section ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">
      
      {/* BACKGROUND ELEMENTS (z-0) */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(247,37,133,0.15),_transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_rgba(204,255,0,0.1),_transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* --- LEFT COLUMN: TEXT --- */}
        {/* FIX: Tambahkan 'relative z-30' agar layer ini PASTI DI ATAS layer HP */}
        <div className="max-w-xl relative z-30">
          
          <div className="hero-text-element flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-bold tracking-widest uppercase rounded-full">Available Now</span>
            <span className="px-3 py-1 bg-[#F72585]/10 border border-[#F72585]/30 text-[#F72585] text-xs font-bold tracking-widest uppercase rounded-full flex items-center gap-1"><Star size={10} fill="currentColor" /> 4.9 Rating</span>
          </div>

          <h1 className="hero-text-element text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your Body, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Digitized.</span>
          </h1>

          <p className="hero-text-element text-gray-400 text-lg mb-10 leading-relaxed">
            Stop guessing what your food does to you. Download the app to scan meals, simulate organ health, and predict your future self with AI precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="store-button group relative bg-white text-black px-6 py-3 rounded-xl flex items-center gap-3 transition-all hover:bg-[#CCFF00] hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]">
              <Apple size={32} className="shrink-0" />
              <div className="text-left">
                <div className="text-xs font-medium opacity-80">Download on the</div>
                <div className="text-lg font-bold leading-none">App Store</div>
              </div>
            </button>

            <button className="store-button group relative bg-zinc-900 border border-white/20 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all hover:bg-zinc-800 hover:border-white/40">
              <Play size={28} className="shrink-0 fill-current" />
              <div className="text-left">
                <div className="text-xs font-medium opacity-60 group-hover:opacity-100">GET IT ON</div>
                <div className="text-lg font-bold leading-none">Google Play</div>
              </div>
            </button>
          </div>
          
           {/* Features Grid */}
           <div className="hero-text-element grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div><div className="text-[#CCFF00] mb-2"><Smartphone size={24} /></div><h4 className="font-bold text-sm">AR Scan</h4><p className="text-xs text-gray-500">Real-time analysis</p></div>
            <div><div className="text-[#F72585] mb-2"><Zap size={24} /></div><h4 className="font-bold text-sm">Fast AI</h4><p className="text-xs text-gray-500">Instant results</p></div>
            <div><div className="text-white mb-2"><ShieldCheck size={24} /></div><h4 className="font-bold text-sm">Secure</h4><p className="text-xs text-gray-500">Data encrypted</p></div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: PHONE MOCKUP --- */}
        {/* Layer ini z-20 (lebih rendah dari teks z-30), jadi kalau overlap, teks tetap menang */}
        <div ref={phoneRef} className="relative z-20 flex justify-center lg:justify-end lg:pr-32">
          
          <div className="bg-glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-[#F72585] blur-[120px] opacity-40 rounded-full pointer-events-none" />

          <div className="phone-mockup-inner relative z-10 w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/20">
            {/* ... Isi HP sama ... */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-30" />
            <div className="w-full h-full bg-zinc-900 relative">
              <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-[#CCFF00]/20 to-transparent p-6 pt-12">
                 <div className="flex justify-between items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-white/10" />
                    <div className="w-20 h-2 rounded-full bg-white/10" />
                 </div>
                 <h3 className="text-white font-bold text-2xl w-2/3 leading-tight">Hello, Alex</h3>
              </div>
              <div className="absolute top-32 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                 <div className="flex justify-between mb-4">
                    <span className="text-gray-400 text-xs uppercase tracking-wider">Health Score</span>
                    <span className="text-[#CCFF00] font-bold">92%</span>
                 </div>
                 <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[92%] bg-[#CCFF00]" />
                 </div>
              </div>
              <div className="absolute top-64 left-1/2 -translate-x-1/2 w-48 h-64 bg-gradient-to-b from-[#F72585]/20 to-transparent rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-6 left-4 right-4 h-14 bg-[#CCFF00] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                <span className="text-black font-bold">Scan Food Now</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
          </div>

          <div className="absolute top-20 left-15 bg-zinc-900 p-3 rounded-xl border border-white/10 shadow-xl animate-bounce duration-[3000ms]">
            <Zap size={20} className="text-[#CCFF00]" />
          </div>
          <div className="absolute bottom-40 right-10 bg-zinc-900 p-3 rounded-xl border border-white/10 shadow-xl animate-bounce duration-[4000ms]">
            <Star size={20} className="text-[#F72585]" fill="#F72585" />
          </div>

        </div>

      </div>
    </section>
  );
}