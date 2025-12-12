'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroScene } from './HeroScene';

gsap.registerPlugin(ScrollTrigger);

// --- KOMPONEN UTAMA ---
export default function StoryHero() {
  // Inisialisasi Ref dengan tipe HTMLDivElement
  const containerRef = useRef<HTMLDivElement>(null);
  
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  
  // Array refs untuk dikirim ke controller
  const textRefs = [text1Ref, text2Ref, text3Ref, text4Ref];


  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ".story-container",
      start: "top top",
      end: "bottom bottom",
      onLeave: () => {
        if (text4Ref.current) gsap.set(text4Ref.current, { opacity: 0 });
      },
      onEnterBack: () => {
        if (text4Ref.current) gsap.set(text4Ref.current, { opacity: 0 });
      }
    });
    return () => {
      st.kill();
    };
  }, [text4Ref]);

  return (
    <div ref={containerRef} className="story-container relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <Canvas shadows>
          <HeroScene textRefs={textRefs} />
        </Canvas>
      </div>
      <div className="sticky top-0 h-screen z-10 pointer-events-none flex flex-col justify-center items-center">
        <div ref={text1Ref} className="absolute left-[10%] top-1/3 max-w-md p-6 opacity-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Start Your Journey</h2>
          <p className="text-gray-600">Every run begins with a single intention. The background fades away, leaving only focus.</p>
        </div>
        <div ref={text2Ref} className="absolute right-[10%] top-1/3 max-w-md p-6 opacity-0 text-right">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Rise Above</h2>
          <p className="text-gray-600">Seeing things from a higher perspective changes everything. The obstacles look smaller from here.</p>
        </div>
        <div ref={text3Ref} className="absolute left-[10%] bottom-1/3 max-w-md p-6 opacity-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Your Pace</h2>
          <p className="text-gray-600">It&#39;s not about speed, it&#39;s about consistency. Side by side with your goals, keep moving forward.</p>
        </div>
      </div>
    </div>
  );
}
