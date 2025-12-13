"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ProfilePage() {
  const containerRef = useRef(null);

  // Simple entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(".profile-item", 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#050510] pt-24 pb-10 px-6 md:px-20 relative overflow-hidden">
        
        {/* Background Elements */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#F72585]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            
            {/* Header / User Info */}
            <div className="profile-item flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-white/10 pb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#F72585] to-blue-600 p-[2px]">
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

            {/* Apps Download Section */}
            <div className="profile-item space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#F72585] block rounded-full"></span>
                    INSTALL APPLICATION
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* App Store */}
                    <button className="group relative flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-4">
                             {/* Apple Icon */}
                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.12-1.2 2.3.18 3.59 1.54 4.38 2.5-3.8 1.83-3.05 6.64.92 8.35-.69 1.4-1.52 2.85-2.5 3.98l-2 .6zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs text-gray-400">Download on the</div>
                                <div className="text-lg font-bold text-white">App Store</div>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                            →
                        </div>
                    </button>

                    {/* Play Store */}
                    <button className="group relative flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-4">
                             {/* Play Store Icon */}
                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,12.5L17.38,15.69L15.13,13.44L17.38,11.19L20.3,14.38C20.93,13.76 21.34,12.94 21.34,12C21.34,11.06 20.93,10.24 20.3,9.62L20.3,12.5M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs text-gray-400">Get it on</div>
                                <div className="text-lg font-bold text-white">Google Play</div>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                            →
                        </div>
                    </button>
                </div>
            </div>

            {/* Subscription Plan Section */}
            <div className="profile-item space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 block rounded-full"></span>
                    YOUR SUBSCRIPTION
                </h2>
                
                <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                         <svg width="120" height="120" viewBox="0 0 24 24" fill="white"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/></svg>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <div className="text-sm font-semibold text-[#F72585] tracking-widest uppercase mb-2">Current Plan</div>
                            <h3 className="text-4xl font-black text-white italic">PRO <span className="text-blue-500">MAX</span></h3>
                            <p className="text-gray-400 mt-2 max-w-sm">
                                Next billing date: <span className="text-white">December 24, 2025</span>. 
                                You have access to all premium features.
                            </p>
                        </div>
                        <div className="flex gap-3">
                             <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition">
                                Manage
                             </button>
                             <button className="px-6 py-3 rounded-xl bg-[#F72585] text-white font-bold hover:bg-[#d01e6f] transition shadow-[0_0_20px_rgba(247,37,133,0.3)]">
                                Upgrade
                             </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}