"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

// Data Plan Mockup
const PLANS = [
  {
    name: "STARTER",
    price: "Free",
    features: ["Basic Access", "1GB Storage", "Community Support"],
    isCurrent: false,
  },
  {
    name: "PRO",
    price: "$29/mo",
    features: ["Full Access", "50GB Storage", "Priority Support", "No Ads"],
    isCurrent: false,
  },
  {
    name: "PRO MAX",
    price: "$99/mo",
    features: ["Unlimited Access", "1TB Storage", "24/7 Dedication", "API Access"],
    isCurrent: true, // Ini plan user saat ini
  },
];

export default function ProfilePage() {
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(".profile-item", 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSettings = () => router.push("/settings");

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-bg-deep pt-24 pb-10 px-6 md:px-20 relative overflow-hidden">
        
        {/* Background Elements */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-normal/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
            
            {/* Header / User Info + Settings Button */}
            <div className="profile-item flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-normal to-blue-dark p-[2px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">JD</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">John Doe</h1>
                        <p className="text-gray-400">john.doe@example.com</p>
                        <div className="mt-2 inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-medium uppercase tracking-wider">
                            Active Member
                        </div>
                    </div>
                </div>

                {/* Tombol Settings */}
                <button 
                    onClick={handleSettings}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                >
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white group-hover:rotate-90 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">Settings</span>
                </button>
            </div>

            {/* Apps Download Section (Sama seperti sebelumnya) */}
            <div className="profile-item space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-normal block rounded-full"></span>
                    INSTALL APPLICATION
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {/* ... (Code button download sama persis kayak sebelumnya) ... */}
                     <button className="group relative flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-4">
                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.12-1.2 2.3.18 3.59 1.54 4.38 2.5-3.8 1.83-3.05 6.64.92 8.35-.69 1.4-1.52 2.85-2.5 3.98l-2 .6zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs text-gray-400">Download on the</div>
                                <div className="text-lg font-bold text-white">App Store</div>
                            </div>
                        </div>
                    </button>
                    <button className="group relative flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-4">
                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,12.5L17.38,15.69L15.13,13.44L17.38,11.19L20.3,14.38C20.93,13.76 21.34,12.94 21.34,12C21.34,11.06 20.93,10.24 20.3,9.62L20.3,12.5M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs text-gray-400">Get it on</div>
                                <div className="text-lg font-bold text-white">Google Play</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Subscription Plans Card Grid */}
            <div className="profile-item space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 block rounded-full"></span>
                    SUBSCRIPTION PLANS
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PLANS.map((plan, i) => (
                        <div 
                            key={i} 
                            className={`relative flex flex-col p-6 rounded-3xl border transition-all duration-300 ${
                                plan.isCurrent 
                                ? "bg-gradient-to-b from-[#1a1a1a] to-black border-blue-normal shadow-[0_0_20px_rgba(var(--color-blue-normal-rgb),0.15)] scale-[1.02]" 
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                        >
                            {plan.isCurrent && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-normal text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-md">
                                    Current Plan
                                </div>
                            )}

                            <div className="mb-4">
                                <h3 className={`text-lg font-bold ${plan.isCurrent ? "text-blue-normal" : "text-white"}`}>{plan.name}</h3>
                                <div className="text-2xl font-black text-white mt-1">{plan.price}</div>
                            </div>

                            <ul className="flex-1 space-y-3 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${plan.isCurrent ? "bg-blue-500" : "bg-gray-600"}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={plan.isCurrent ? () => router.push('/settings') : () => router.push('/pricing')}
                                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                                    plan.isCurrent 
                                    ? "bg-white/10 text-white hover:bg-white/20 border border-white/10" 
                                    : "bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5"
                                }`}
                            >
                                {plan.isCurrent ? "Manage Billing" : "Switch Plan"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );
}
