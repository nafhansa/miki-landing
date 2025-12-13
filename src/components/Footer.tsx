import { Activity, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 md:pt-20 md:pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 lg:gap-20 mb-16 text-center md:text-left">
          
          {/* 1. BRAND & DESC */}
          <div className="flex flex-col items-center md:items-start space-y-5 max-w-sm">
            <div className="flex items-center gap-3 text-2xl font-bold tracking-tight">
              <div className="w-10 h-10 bg-blue-normal rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(var(--color-blue-normal-rgb),0.4)]">
                <Activity size={22} />
              </div>
              <span>MIKI APP</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              The first gamified health companion that visualizes your internal organs based on what you eat. Scan, track, and live longer.
            </p>
          </div>

          {/* 2. PRODUCT LINKS */}
          {/* Di Mobile tetap center, di Desktop kita buat agak rapi */}
          <div className="flex flex-col items-center md:items-start min-w-[120px]">
            <h4 className="font-bold text-lg mb-4 md:mb-6 text-white">Product</h4>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li>
                <Link href="/pricing" className="hover:text-blue-light hover:translate-x-1 transition-all duration-300 inline-block">
                    Pricing
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-blue-light hover:translate-x-1 transition-all duration-300 inline-block">
                    Download App
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. NEWSLETTER */}
          <div className="w-full max-w-sm md:max-w-xs flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4 md:mb-6 text-white">Stay Healthy</h4>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Get the latest health tips and feature updates directly to your inbox.
            </p>
            <form className="w-full space-y-3">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 px-4 pl-11 text-sm text-white focus:outline-none focus:border-blue-normal focus:bg-zinc-900 transition-all placeholder:text-gray-600"
                />
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-normal transition-colors" />
              </div>
              <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-blue-normal hover:shadow-[0_0_20px_rgba(var(--color-blue-normal-rgb),0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-xs md:text-sm text-gray-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} MIKI APP. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
