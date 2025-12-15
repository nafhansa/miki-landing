'use client';

import React, { useLayoutEffect, useMemo, useRef, forwardRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/offscreen';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type OverlayProps = React.ComponentPropsWithoutRef<'div'>;

const StartOverlay = forwardRef<HTMLDivElement, OverlayProps>(function StartOverlay(_, ref) {
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="absolute left-4 md:left-10 top-35 md:top-20 max-w-3xl opacity-100 will-change-transform">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-[2px] bg-blue-normal"></span>
        <span className="text-blue-normal font-mono text-xs tracking-[0.2em] uppercase">01 — The Awakening</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
        FUTURE <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-normal via-purple-normal to-dpurple-normal">DEFINED.</span>
      </h1>
      <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed font-light mb-8">
        Your health is data waiting to be decoded. Don&#39;t just track your steps. Decide your future. Meet the AI that knows your body better than you do.
      </p>
      <div className="flex gap-4 pointer-events-auto">
        <button className="px-8 py-3 bg-transparent border border-white text-white font-bold rounded-full hover:bg-blue-normal hover:text-black transition-all">Start Living</button>
      </div>
    </div>
  );
});

const TopOverlay = forwardRef<HTMLDivElement, OverlayProps>(function TopOverlay(_, ref) {
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="absolute right-8 md:right-24 top-1/3 max-w-md p-6 opacity-0 text-right will-change-transform">
      <span className="text-purple-normal font-mono text-xs tracking-[0.2em] uppercase mb-3 block">02 — The Intelligence</span>
      <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Scan The<br />Nutritions</h2>
      <p className="text-gray-300 text-lg leading-relaxed">Snap a barcode and reveal hidden dangers. Our OCR analyzes sodium, sugar, and predicts post-meal drowsiness.</p>
    </div>
  );
});

const SideOverlay = forwardRef<HTMLDivElement, OverlayProps>(function SideOverlay(_, ref) {
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="absolute left-8 md:left-24 top-1/3 max-w-md p-6 opacity-0 will-change-transform">
      <span className="text-dpurple-normal font-mono text-xs tracking-[0.2em] uppercase mb-3 block">03 — The Ecosystem</span>
      <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Sync Your<br />Reality</h2>
      <p className="text-gray-300 text-lg leading-relaxed">From wearable stats to healthy spots nearby. Connect with friends who keep you honest.</p>
    </div>
  );
});

const FrontOverlay = forwardRef<HTMLDivElement, OverlayProps>(function FrontOverlay(_, ref) {
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="absolute bottom-16 md:bottom-24 left-0 right-0 mx-auto text-center max-w-2xl p-6 opacity-0 flex flex-col items-center will-change-transform">
      <span className="text-blue-normal font-mono text-xs tracking-[0.2em] uppercase mb-3 block">04 — The Evolution</span>
      <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Meet Your<br />Avatar</h2>
      <p className="text-gray-300 text-lg leading-relaxed">Visualize the impact of today&#39;s choices on your body 10 years from now.</p>
    </div>
  );
});

export default function StoryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const textRefs = useMemo(() => [text1Ref, text2Ref, text3Ref, text4Ref] as const, []);

  const [showCanvas, setShowCanvas] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // For debug indicator

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      // Defer state change to avoid synchronous setState inside effect
      const id = window.setTimeout(() => setShowCanvas(true), 0);
      return () => window.clearTimeout(id);
    }
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShowCanvas(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const worker = useMemo(() => {
    if (!showCanvas) return null;
    return new Worker(new URL('./worker/Scene.tsx', import.meta.url), { type: 'module' });
  }, [showCanvas]);

  useEffect(() => {
    return () => { worker?.terminate(); };
  }, [worker]);

  useLayoutEffect(() => {
    // --- SAFETY GUARD: Cegah warning 'GSAP target not found' ---
    if (!containerRef.current || !textRefs[0].current || !textRefs[1].current) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.story-container', start: 'top top', end: 'bottom bottom', scrub: 1.5 }
    });

    // Simple: Each text matches its camera view
    // Start (0%) → text1, Top (25%) → text2, Side (50%) → text3, Front (75%) → text4

    tl.set(textRefs[0].current, { opacity: 1, y: 0 })
      // Text1 fades out before Top view (25%)
      .to(textRefs[0].current, { opacity: 0, y: -50, duration: 0.05 }, '0.10')

      // Text2 fades in for Top view (25%)
      .fromTo(textRefs[1].current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.05 }, '0.10')
      // Text2 fades out before Side view (50%)
      .to(textRefs[1].current, { opacity: 0, x: -50, duration: 0.05 }, '0.20')

      // Text3 fades in for Side view (50%)
      .fromTo(textRefs[2].current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.05 }, '0.20')
      // Text3 fades out before Front view (75%)
      .to(textRefs[2].current, { opacity: 0, duration: 0.05 }, '0.30')

      // Text4 fades in for Front view (75%)
      .fromTo(textRefs[3].current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.05 }, '0.30');

    let isTicking = false;
    let currentProgress = 0;

    const onUpdate = (self: ScrollTrigger) => {
      currentProgress = self.progress;
      setScrollProgress(self.progress); // Update debug indicator
      if (!isTicking && worker) {
        window.requestAnimationFrame(() => {
          worker.postMessage({ type: 'scroll', value: currentProgress });
          isTicking = false;
        });
        isTicking = true;
      }
    };

    const st = ScrollTrigger.create({
      trigger: '.story-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate
    });

    return () => {
      tl.kill();
      st.kill();
    };
  }, [textRefs, worker]);

  return (
    <div id="hero" ref={containerRef} className="story-container relative h-[400vh] bg-black text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          {showCanvas && worker ? (
            <Canvas
              className="bg-black"
              worker={worker}
              shadows
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
              fallback={<div className="w-full h-full bg-black flex items-center justify-center">Loading Scene...</div>}
            />
          ) : (
            <div className="w-full h-full bg-black" />
          )}
        </div>

        {/* Scroll Progress Indicator - Debug Tool */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end gap-2">
          {/* Percentage Display */}
          <div className="bg-black/80 border border-blue-normal px-3 py-2 rounded-lg font-mono text-sm">
            <span className="text-blue-normal">{Math.round(scrollProgress * 100)}%</span>
          </div>

          {/* Progress Bar with Markers */}
          <div className="relative w-2 h-80 bg-gray-800/50 rounded-full">
            {/* Current Progress Fill */}
            <div
              className="absolute bottom-0 w-full bg-gradient-to-t from-blue-normal to-purple-normal rounded-full transition-all duration-100"
              style={{ height: `${scrollProgress * 100}%` }}
            />

            {/* View Markers */}
            {[
              { pos: 0, label: 'Start', color: 'bg-blue-normal' },
              { pos: 25, label: 'Top', color: 'bg-purple-normal' },
              { pos: 50, label: 'Side', color: 'bg-dpurple-normal' },
              { pos: 75, label: 'Front', color: 'bg-blue-normal' },
              { pos: 100, label: 'End', color: 'bg-white' },
            ].map(({ pos, label, color }) => (
              <div
                key={pos}
                className="absolute right-0 flex items-center gap-2"
                style={{ bottom: `${pos}%`, transform: 'translateY(50%)' }}
              >
                <span className="text-xs text-gray-400 font-mono whitespace-nowrap">{label}</span>
                <div className={`w-3 h-3 rounded-full ${color} border-2 border-black`} />
              </div>
            ))}
          </div>
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