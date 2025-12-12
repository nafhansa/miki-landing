'use client';

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Clock, FileWarning, ArrowRight, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolution() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

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
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div ref={triggerRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="gsap-title text-sm font-bold tracking-widest text-[#00B7B5] uppercase mb-3">
            The Invisible Problem
          </h2>
          <h3 className="gsap-title text-3xl lg:text-4xl font-bold text-[#005461] leading-tight">
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
              Excess sodium and sugar hide in "healthy" foods. You don't feel the damage now, but your kidneys do.
            </p>
          </div>

          <div className="gsap-card group p-8 rounded-3xl bg-[#F4F4F4] hover:bg-white border-2 border-transparent hover:border-[#005461]/10 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
              <Clock size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#005461] mb-3">The 5-Year Lag</h4>
            <p className="text-gray-600 leading-relaxed">
              Chronic diseases don't appear overnight. They build up silently over years of unmonitored habits.
            </p>
          </div>

          <div className="gsap-card group p-8 rounded-3xl bg-[#F4F4F4] hover:bg-white border-2 border-transparent hover:border-[#005461]/10 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-600 mb-6 group-hover:scale-110 transition-transform">
              <FileWarning size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#005461] mb-3">Boring Tracking</h4>
            <p className="text-gray-600 leading-relaxed">
              Manual calorie counting feels like homework. It's tedious, abstract, and impossible to sustain.
            </p>
          </div>

        </div>

        <div className="gsap-solution-trigger relative w-full max-w-5xl mx-auto">
          <div className="gsap-solution relative bg-[#005461] rounded-[3rem] p-8 md:p-12 overflow-hidden text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-[#005461]/30">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B7B5] rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="z-10 max-w-lg">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start opacity-80">
                <ShieldCheck size={20} className="text-[#00B7B5]" />
                <span className="font-semibold tracking-wide text-sm uppercase">The Solution</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Stop Guessing. <span className="text-[#00B7B5]">Start Visualizing.</span>
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We turn your health data into a living, breathing Avatar. See exactly how that salty meal affects your virtual kidneys in real-time.
              </p>
            </div>

            <div className="z-10 flex-shrink-0">
              <button className="flex items-center gap-3 bg-white text-[#005461] px-8 py-4 rounded-xl font-bold hover:bg-[#00B7B5] hover:text-white transition-all duration-300 shadow-lg">
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