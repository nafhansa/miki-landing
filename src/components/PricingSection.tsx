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
      const blocks = document.querySelectorAll(".pricing-reveal-block");
      const content = document.querySelectorAll(".pricing-content");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom bottom",
        }
      });

      tl.to(blocks, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: {
          amount: 1,
          from: "random",
          grid: "auto"
        },
        ease: "power2.inOut",
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: "none" });
          }
        }
      })
      .from(content, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.5");

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
    <section ref={containerRef} className="relative py-24 bg-[#F4F4F4] overflow-hidden min-h-screen">
      
      <div ref={overlayRef} className="absolute inset-0 z-30 grid grid-cols-10 md:grid-cols-20 grid-rows-10 md:grid-rows-20 w-full h-full pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="pricing-reveal-block bg-[#005461] w-full h-full border-[0.5px] border-[#005461]" />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="pricing-content text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-[#00B7B5] uppercase mb-3">
            Pricing Plans
          </h2>
          <h3 className="text-3xl lg:text-4xl font-bold text-[#005461] leading-tight">
            Invest in Your Body. <br /> It&#39;s the Only Place You Have to Live.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`pricing-content relative p-8 rounded-[2rem] transition-all duration-300 ${
                tier.highlight 
                  ? "bg-[#005461] text-white shadow-2xl shadow-[#005461]/30 scale-105 z-20" 
                  : "bg-white text-[#005461] border border-gray-100 shadow-lg hover:-translate-y-2"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00B7B5] text-[#005461] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h4 className={`text-xl font-bold mb-2 ${tier.highlight ? "text-[#00B7B5]" : "text-[#005461]"}`}>
                  {tier.name}
                </h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && <span className={`text-sm ${tier.highlight ? "text-gray-300" : "text-gray-500"}`}>{tier.period}</span>}
                </div>
                <p className={`mt-4 text-sm leading-relaxed ${tier.highlight ? "text-gray-300" : "text-gray-500"}`}>
                  {tier.desc}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className={`mt-0.5 rounded-full p-0.5 ${tier.highlight ? "bg-[#00B7B5] text-[#005461]" : "bg-[#005461]/10 text-[#005461]"}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
                {tier.notIncluded.map((feature, i) => (
                  <div key={i} className={`flex items-start gap-3 text-sm ${tier.highlight ? "text-gray-500" : "text-gray-400"}`}>
                    <div className="mt-0.5 rounded-full p-0.5 bg-gray-200 text-gray-400">
                      <X size={12} strokeWidth={3} />
                    </div>
                    <span className="line-through">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                tier.highlight 
                  ? "bg-[#00B7B5] hover:bg-white hover:text-[#005461] text-[#005461]" 
                  : "bg-[#005461] hover:bg-[#00B7B5] text-white"
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
