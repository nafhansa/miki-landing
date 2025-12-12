import { Activity, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#005461] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 lg:gap-32 mb-16">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <div className="w-8 h-8 bg-[#00B7B5] rounded-lg flex items-center justify-center text-[#005461]">
                <Activity size={20} />
              </div>
              <span>MIIKI APP</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              The first gamified health companion that visualizes your internal organs based on what you eat. Scan, track, and live longer.
            </p>
          </div>

          <div className="min-w-[150px] flex flex-col items-center text-center">
            <h4 className="font-bold text-lg mb-6">Product</h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li><Link href="/pricing" className="hover:text-[#00B7B5] transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-[#00B7B5] transition-colors">Download App</a></li>
              <li><a href="#" className="hover:text-[#00B7B5] transition-colors">Features</a></li>
            </ul>
          </div>

          <div className="max-w-xs w-full">
            <h4 className="font-bold text-lg mb-6">Stay Healthy</h4>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest health tips and feature updates directly to your inbox.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 pl-10 text-sm focus:outline-none focus:border-[#00B7B5] focus:bg-white/20 placeholder:text-gray-400"
                />
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button className="w-full bg-[#00B7B5] text-[#005461] font-bold py-3 rounded-xl hover:bg-white transition-all">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} MIIKI APP. All rights reserved.</p>
          <div className="hidden md:block w-1 h-1 bg-gray-500 rounded-full"></div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
