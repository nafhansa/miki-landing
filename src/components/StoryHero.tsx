'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroScene } from './HeroScene';

gsap.registerPlugin(ScrollTrigger);

export default function StoryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 4 Ref untuk 4 Bagian Cerita
  const text1Ref = useRef<HTMLDivElement>(null); // BAB 1: Intro (LIMITLESS STRIDE)
  const text2Ref = useRef<HTMLDivElement>(null); // BAB 2: Top View
  const text3Ref = useRef<HTMLDivElement>(null); // BAB 3: Side View
  const text4Ref = useRef<HTMLDivElement>(null); // BAB 4: Front View
  
  // Kirim array ini ke HeroScene agar GSAP bisa mengontrolnya
  const textRefs = [text1Ref, text2Ref, text3Ref, text4Ref]; 

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ".story-container",
      start: "top top",
      end: "bottom bottom",
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    // FIX 1: Tambahkan 'text-white' dan hapus 'bg-white' agar background hitam dari Canvas terlihat
    <div ref={containerRef} className="story-container relative h-[400vh] bg-black text-white">
        
      {/* Layer 3D (Background) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <Canvas shadows className="bg-black">
          <HeroScene textRefs={textRefs} />
        </Canvas>
      </div>

      {/* Layer Teks (Overlay) - z-10 agar di atas Canvas */}
      <div className="sticky top-0 h-screen w-full z-10 pointer-events-none flex flex-col justify-center items-center">
        
        {/* === MATERI 1: START VIEW (IGNITION) === */}
        {/* FIX 2: opacity-1 agar langsung MUNCUL saat dibuka */}
        <div ref={text1Ref} className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 max-w-3xl opacity-1">
          <div className="flex items-center gap-2 mb-4">
             <span className="w-8 h-[2px] bg-blue-500"></span>
             <span className="text-blue-400 font-mono text-xs tracking-[0.2em] uppercase">01 — The Ignition</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
            LIMITLESS <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500">
              STRIDE.
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed font-light mb-8">
            Every great journey starts with a decision. Before the sweat and the glory, there is only you and the starting line.
          </p>

          <div className="flex gap-4 pointer-events-auto">
             <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all">
                Start Running
             </button>
          </div>
        </div>

        {/* === MATERI 2: TOP VIEW === */}
        <div ref={text2Ref} className="absolute right-8 md:right-24 top-1/3 max-w-md p-6 opacity-0 text-right">
            <span className="text-purple-500 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">02 — The Vision</span>
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Clear The<br/>Noise</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
                From above, the path becomes clear. Distractions fade away, leaving only the geometry of your movement.
            </p>
        </div>

        {/* === MATERI 3: SIDE VIEW === */}
        <div ref={text3Ref} className="absolute left-8 md:left-24 top-1/3 max-w-md p-6 opacity-0">
            <span className="text-pink-500 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">03 — The Endurance</span>
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Rise Above<br/>Limits</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
                It's not just about speed, it's about rhythm. Find your flow state where effort feels like flying.
            </p>
        </div>

        {/* === MATERI 4: FRONT VIEW (ENDING) === */}
        <div ref={text4Ref} className="absolute bottom-16 md:bottom-24 text-center max-w-2xl p-6 opacity-0">
            <span className="text-green-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">04 — The Victory</span>
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Own Your<br/>Pace</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
                You've arrived. The only competition that matters is the one in the mirror. Keep moving forward.
            </p>
        </div>

      </div>
    </div>
  );
}