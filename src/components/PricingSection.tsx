'use client';

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Selector scoped
      const blocks = gsap.utils.toArray(".pricing-reveal-block");
      const content = gsap.utils.toArray(".pricing-content");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center", 
          end: "bottom bottom",
        }
      });

      // 1. Animasi Overlay Grid
      tl.to(blocks, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: {
          amount: 0.8,
          from: "random",
          grid: [10, 10]
        },
        ease: "power2.inOut",
      })
      
      // 2. Animasi Cards Muncul
      .fromTo(content, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const tiers = [
    {
      name: "Starter",
      price: "Free",
      desc: "Perfect for trying out the organ simulation.",
      features: ["Daily Food Scan (Limit 3)", "Basic Organ Visualization", "Standard Health Stats", "7-Day History"],
      notIncluded: ["Future Face Prediction", "Smart Restaurant Nudge", "Social Leaderboard"],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Pro Health",
      price: "Rp 49.000",
      period: "/month",
      desc: "Unlock the full potential of your digital body.",
      features: ["Unlimited Food Scans", "Advanced Organ X-Ray", "Future Face Prediction", "Smart Restaurant Nudge", "Social Leaderboard", "30-Day History"],
      notIncluded: [],
      cta: "Go Pro",
      highlight: true
    },
    {
      name: "Lifetime",
      price: "Rp 499.000",
      period: "/once",
      desc: "One-time payment for eternal health tracking.",
      features: ["Everything in Pro", "Priority AI Processing", "Exclusive Avatar Skins", "Early Access Features", "Lifetime Data Storage", "Family Sharing (up to 3)"],
      notIncluded: [],
      cta: "Get Lifetime",
      highlight: false
    }
  ];

  return (
    <section ref={containerRef} className="relative py-24 bg-black text-white min-h-screen overflow-hidden">
      
      {/* BACKGROUND OVERLAY (Z-10) */}
      <div ref={overlayRef} className="absolute inset-0 z-10 grid grid-cols-10 md:grid-cols-20 grid-rows-10 md:grid-rows-20 w-full h-full pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="pricing-reveal-block bg-[#F72585] w-full h-full border-[0.5px] border-[#F72585]" />
        ))}
      </div>

      {/* CONTENT CONTAINER (Z-20) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* HEADER */}
        <div className="pricing-content text-center max-w-3xl mx-auto mb-16 opacity-0"> 
          <h2 className="text-sm font-bold tracking-widest text-[#CCFF00] uppercase mb-3">
            Pricing Plans
          </h2>
          <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
            Invest in Your Body. <br /> It&#39;s the Only Place You Have to Live.
          </h3>
        </div>

        {/* CARDS GRID */}
        {/* 'items-stretch' adalah default grid, memastikan semua kolom tingginya sama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              // UPDATE CLASS:
              // 1. h-full: Agar kartu mengisi tinggi penuh grid
              // 2. flex flex-col: Agar kita bisa mengatur posisi button di bawah
              className={`pricing-content opacity-0 relative p-8 rounded-[2rem] transition-all duration-300 h-full flex flex-col ${
                tier.highlight 
                  ? "bg-zinc-900 border border-[#CCFF00]/50 shadow-[0_0_30px_-10px_rgba(204,255,0,0.3)] scale-100 md:scale-105 z-30" 
                  : "bg-zinc-900/50 border border-white/10 hover:-translate-y-2 hover:border-white/30"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#CCFF00] text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              {/* SECTION ATAS (Header & Features) - Diberi flex-grow agar mendorong button ke bawah */}
              <div className="flex-1">
                <div className="mb-8">
                  <h4 className={`text-xl font-bold mb-2 ${tier.highlight ? "text-[#CCFF00]" : "text-white"}`}>
                    {tier.name}
                  </h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && <span className={`text-sm ${tier.highlight ? "text-gray-300" : "text-gray-400"}`}>{tier.period}</span>}
                  </div>
                  <p className={`mt-4 text-sm leading-relaxed ${tier.highlight ? "text-gray-300" : "text-gray-400"}`}>
                    {tier.desc}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 rounded-full p-0.5 ${tier.highlight ? "bg-[#CCFF00] text-black" : "bg-white/10 text-white"}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                  {tier.notIncluded.map((feature, i) => (
                    <div key={i} className={`flex items-start gap-3 text-sm ${tier.highlight ? "text-gray-500" : "text-gray-500"}`}>
                      <div className="mt-0.5 rounded-full p-0.5 bg-white/5 text-gray-500">
                        <X size={12} strokeWidth={3} />
                      </div>
                      <span className="line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION BAWAH (Button) - Karena parent flex-col & atasnya flex-1, ini otomatis di paling bawah */}
              <button className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-auto ${
                tier.highlight 
                  ? "bg-[#CCFF00] text-black hover:bg-[#b3e600] shadow-[0_0_20px_-5px_rgba(204,255,0,0.4)]" 
                  : "border border-white/20 text-white bg-transparent hover:bg-white hover:text-black"
              }`}>
                {tier.cta}
                <Zap size={18} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}