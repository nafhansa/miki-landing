'use client';

import React, { useLayoutEffect, useRef, forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroScene } from './HeroScene';

gsap.registerPlugin(ScrollTrigger);

type OverlayProps = React.ComponentPropsWithoutRef<'div'>;

const StartOverlay = forwardRef<HTMLDivElement, OverlayProps>(function StartOverlay(_, ref) {
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>} 
      className="absolute left-4 md:left-10 top-35 md:top-20 max-w-3xl opacity-100 will-change-transform"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-[2px] bg-blue-normal"></span>
        <span className="text-blue-normal font-mono text-xs tracking-[0.2em] uppercase">01 — The Awakening</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
        FUTURE <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-normal via-purple-normal to-dpurple-normal">
          DEFINED.
        </span>
      </h1>
      <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed font-light mb-8">
        Your health is data waiting to be decoded. Don&#39;t just track your steps. Decide your future. Meet the AI that knows your body better than you do.
      </p>
      <div className="flex gap-4 pointer-events-auto">
        <button className="px-8 py-3 bg-transparent border border-white text-white font-bold rounded-full hover:bg-blue-normal hover:text-black transition-all">
          Start Living
        </button>
      </div>
    </div>
  );
});

const TopOverlay = forwardRef<HTMLDivElement, OverlayProps>(function TopOverlay(_, ref) {
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="absolute right-8 md:right-24 top-1/3 max-w-md p-6 opacity-0 text-right will-change-transform" style={{ willChange: "transform, opacity" }}>
      <span className="text-purple-normal font-mono text-xs tracking-[0.2em] uppercase mb-3 block">02 — The Intelligence</span>
      <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Scan The<br />Nutritions</h2>
      <p className="text-gray-300 text-lg leading-relaxed">
        Snap a barcode and reveal hidden dangers. Our OCR analyzes sodium, sugar, and predicts post-meal drowsiness. Eat smarter, not just less.
      </p>
    </div>
  );
});

const SideOverlay = forwardRef<HTMLDivElement, OverlayProps>(function SideOverlay(_, ref) {
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="absolute left-8 md:left-24 top-1/3 max-w-md p-6 opacity-0 will-change-transform" style={{ willChange: "transform, opacity" }}>
      <span className="text-dpurple-normal font-mono text-xs tracking-[0.2em] uppercase mb-3 block">03 — The Ecosystem</span>
      <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Sync Your<br />Reality</h2>
      <p className="text-gray-300 text-lg leading-relaxed">
        From wearable stats to healthy spots nearby. Connect with friends who keep you honest. Your environment is now your quest.
      </p>
    </div>
  );
});

const FrontOverlay = forwardRef<HTMLDivElement, OverlayProps>(function FrontOverlay(_, ref) {
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="absolute bottom-16 md:bottom-24 left-0 right-0 mx-auto text-center max-w-2xl p-6 opacity-0 flex flex-col items-center will-change-transform" style={{ willChange: "transform, opacity" }}>
      <span className="text-blue-normal font-mono text-xs tracking-[0.2em] uppercase mb-3 block">04 — The Evolution</span>
      <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Meet Your<br />Avatar</h2>
      <p className="text-gray-300 text-lg leading-relaxed">
        Visualize the impact of today&#39;s choices on your body 10 years from now. Shape your digital twin, save your future self.
      </p>
    </div>
  );
});

export default function StoryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const textRefs = [text1Ref, text2Ref, text3Ref, text4Ref];

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '.story-container',
      start: 'top top',
      end: 'bottom bottom',
    });
    return () => {
      st.kill();
    };
  }, []);

  return (
    <div id="hero" ref={containerRef} className="story-container relative h-[400vh] bg-black text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Canvas 
            shadows 
            className="bg-black" 
            dpr={[1, 1.5]} 
            gl={{ antialias: true, alpha: true, powerPreference: "default" }} 
            onCreated={({ gl }) => { 
              console.log("✅ WebGL Context Created:", gl.info.render); 
            }} 
          >
            <AdaptiveDpr />
            <PerformanceMonitor onChange={({ factor }) => console.log("⚡ Perf Factor:", factor)} />
            <HeroScene textRefs={textRefs} />
          </Canvas>
        </div>
        <div className="absolute inset-0 w-full h-full z-50 pointer-events-none">
          <StartOverlay ref={text1Ref} />
          <TopOverlay ref={text2Ref} />
          <SideOverlay ref={text3Ref} />
          <FrontOverlay ref={text4Ref} />
        </div>
      </div>
    </div>
  );
}
