'use client';

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Clock, FileWarning, ArrowRight, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolution() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(
        ".gsap-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".gsap-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".gsap-solution",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: ".gsap-solution-trigger",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-black text-white overflow-hidden">
      <div ref={triggerRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="gsap-title text-sm font-bold tracking-widest text-[#CCFF00] uppercase mb-3">
            The Invisible Problem
          </h2>
          <h3 className="gsap-title text-3xl lg:text-4xl font-bold text-white leading-tight">
            You Are Eating Blindly, and Your <br/> Future Self is Paying the Price.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          <div className="gsap-card group p-8 rounded-3xl bg-[#F4F4F4] hover:bg-white border-2 border-transparent hover:border-[#005461]/10 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#005461] mb-3">Hidden Ingredients</h4>
            <p className="text-gray-600 leading-relaxed">
              Excess sodium and sugar hide in &ldquo;healthy&rdquo; foods. You don&#39;t feel the damage now, but your kidneys do.
            </p>
          </div>

          <div className="gsap-card group p-8 rounded-3xl bg-[#F4F4F4] hover:bg-white border-2 border-transparent hover:border-[#005461]/10 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
              <Clock size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#005461] mb-3">The 5-Year Lag</h4>
            <p className="text-gray-600 leading-relaxed">
              Chronic diseases don&#39;t appear overnight. They build up silently over years of unmonitored habits.
            </p>
          </div>

          <div className="gsap-card group p-8 rounded-3xl bg-[#F4F4F4] hover:bg-white border-2 border-transparent hover:border-[#005461]/10 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-600 mb-6 group-hover:scale-110 transition-transform">
              <FileWarning size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#005461] mb-3">Boring Tracking</h4>
            <p className="text-gray-600 leading-relaxed">
              Manual calorie counting feels like homework. It&#39;s tedious, abstract, and impossible to sustain.
            </p>
          </div>

        </div>

        <div className="gsap-solution-trigger relative w-full max-w-5xl mx-auto">
          <div
            ref={solutionRef}
            onMouseMove={(e) => {
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              (e.currentTarget as HTMLDivElement).style.setProperty('--mx', x + 'px');
              (e.currentTarget as HTMLDivElement).style.setProperty('--my', y + 'px');
            }}
            className="gsap-solution relative bg-black rounded-[3rem] p-8 md:p-12 overflow-hidden text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 border border-white/10"
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-[3rem]"
              style={{
                background:
                  'radial-gradient(500px circle at var(--mx) var(--my), rgba(247,37,133,0.25), rgba(247,37,133,0) 60%)'
              }}
            ></div>
            
            <div className="z-10 max-w-lg">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start opacity-80">
                <ShieldCheck size={20} className="text-[#F72585]" />
                <span className="font-semibold tracking-wide text-sm uppercase">The Solution</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Stop Guessing. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F72585] via-[#F8961E] to-[#CCFF00]">Start Visualizing.</span>
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We turn your health data into a &ldquo;living, breathing&rdquo; Avatar. See exactly how that salty meal affects your virtual kidneys in real-time.
              </p>
            </div>

            <div className="z-10 flex-shrink-0">
              <button className="flex items-center gap-3 border border-white text-white px-8 py-4 rounded-xl font-bold bg-transparent hover:bg-[#CCFF00] hover:text-black transition-all duration-300">
                See How It Works
                <ArrowRight size={20} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
