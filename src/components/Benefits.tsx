'use client';

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScanLine, Activity, MapPin, Bell } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Benefits() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<Element>(".feature-row");

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest text-[#CCFF00] uppercase mb-3">
            Core Technology
          </h2>
          <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
            Advanced Tech. <br /> Simple Experience.
          </h3>
        </div>

        <div className="feature-row flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-32">
          <div className="w-full lg:w-1/2">
            <div className="w-12 h-12 bg-[#F72585]/20 rounded-xl flex items-center justify-center text-[#F72585] mb-6">
              <ScanLine size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Real-time AI Food Recognition
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Forget manual logging. Just point your camera. Our computer vision model identifies ingredients, estimates portion sizes, and detects hidden sugars instantly.
            </p>
            <ul className="space-y-3">
              {['98% Accuracy', 'Detects Sauces & Oils', 'Instant Macro Calculation'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full max-w-md mx-auto aspect-square bg-black rounded-[2rem] overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl">🥗</span>
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-[#CCFF00] rounded-xl flex items-end justify-start p-0 overflow-hidden shadow-[0_0_15px_rgba(204,255,0,0.5)]">
                 <div className="bg-[#CCFF00] text-black text-[10px] px-2 py-1 font-bold absolute bottom-0 left-0">Salad Bowl</div>
              </div>
              
              <div className="absolute left-0 right-0 h-0.5 bg-[#F72585] shadow-[0_0_20px_rgba(247,37,133,0.8)] top-0 group-hover:top-full transition-all duration-[2500ms] ease-linear"></div>
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-white">Scanning...</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Safe</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#CCFF00] h-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-row flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24 mb-32">
          <div className="w-full lg:w-1/2">
            <div className="w-12 h-12 bg-[#F8961E]/20 rounded-xl flex items-center justify-center text-[#F8961E] mb-6">
              <Activity size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Dynamic Organ Simulation
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Your avatar&#39;s organs react to your habits. High sodium? Watch the kidneys turn stony. Too much sugar? The pancreas gets inflamed. It&#39;s cause and effect, visualized.
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative">
             <div className="relative w-full max-w-md mx-auto aspect-square bg-black rounded-[2rem] overflow-hidden border border-white/10 flex items-center justify-center">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                
                <div className="relative z-10 text-center">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-[#F72585] rounded-full blur-2xl opacity-20 animate-ping"></div>
                    <div className="text-9xl animate-pulse">🫀</div>
                  </div>
                  <div className="mt-8 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
                    <p className="text-white text-sm opacity-80 mb-1">Cardiovascular Health</p>
                    <div className="flex items-center gap-2 justify-center">
                       <span className="w-3 h-3 bg-[#CCFF00] rounded-full animate-pulse"></span>
                       <span className="text-xl font-bold text-white">Excellent</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="feature-row flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2">
            <div className="w-12 h-12 bg-[#CCFF00]/20 rounded-xl flex items-center justify-center text-[#CCFF00] mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Context-Aware Nudges
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Using GPS and dwelling time, we know when you&#39;re at a restaurant. We&#39;ll suggest the healthiest menu item that fits your remaining macros for the day.
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative">
             <div className="relative w-full max-w-md mx-auto aspect-square bg-black rounded-[2rem] overflow-hidden border border-white/10">
                <div 
                  className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_symbol_location_02.png')] bg-repeat opacity-10" 
                  style={{ backgroundSize: '200px' }}
                ></div>
                
                 <div 
                  className="absolute inset-0 bg-[url('https://tile.openstreetmap.org/15/16422/10803.png')] bg-cover bg-center opacity-30 grayscale-[40%]"
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border border-[#F72585]/30 rounded-full absolute animate-[ping_3s_linear_infinite]"></div>
                  <div className="w-48 h-48 border border-[#CCFF00]/50 rounded-full absolute animate-[ping_3s_linear_infinite_1s]"></div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#F8961E] border-4 border-white rounded-full shadow-lg z-20"></div>

                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-12 bg-white p-4 rounded-xl shadow-xl z-30 w-56 transform transition-all hover:scale-105 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                      <Bell size={14} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Suggestion</p>
                      <p className="text-sm font-bold text-white leading-tight">Order the Grilled Salmon!</p>
                      <p className="text-xs text-green-600 mt-1">Fits your protein goal.</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
