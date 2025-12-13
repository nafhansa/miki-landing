'use client';

import React from 'react';
import { 
  User, 
  CreditCard, 
  Settings, 
  LogOut, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  Shield
} from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* --- 1. HEADER PROFILE --- */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden">
               {/* Placeholder Avatar */}
              <User size={40} className="text-gray-500" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#CCFF00] rounded-full flex items-center justify-center border-4 border-black">
              <Settings size={14} className="text-black" />
            </div>
          </div>
          
          {/* Text Info */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold mb-1">Alex Sander</h1>
            <p className="text-gray-400 text-sm mb-4">alex.sander@example.com</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="text-xs font-mono text-gray-300 uppercase tracking-wider">Member since 2023</span>
            </div>
          </div>

          <button className="hidden md:flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors px-4 py-2 rounded-lg hover:bg-red-500/10">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN (2/3 width) - CURRENT PLAN */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active Plan Card */}
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap size={18} className="text-[#CCFF00]" /> 
                Current Plan
              </h2>
              
              <div className="relative bg-zinc-900 rounded-3xl p-6 md:p-8 border border-white/10 overflow-hidden group hover:border-white/20 transition-all">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F72585]/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold">Pro Plan</span>
                      <span className="px-2 py-0.5 bg-[#F72585] text-white text-[10px] font-bold uppercase tracking-wider rounded">Active</span>
                    </div>
                    <p className="text-gray-400 text-sm">Billed annually. Next payment on <span className="text-white">Dec 14, 2026</span></p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-2xl font-bold text-[#CCFF00]">$99<span className="text-sm text-gray-400 font-normal">/year</span></div>
                  </div>
                </div>

                {/* Progress / Usage */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">Monthly AR Scans</span>
                    <span className="text-white font-mono">85 / 100</span>
                  </div>
                  <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5">
                    <div className="h-full w-[85%] bg-gradient-to-r from-[#CCFF00] to-[#F72585]" />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-[#CCFF00] transition-colors text-sm">
                    Manage Subscription
                  </button>
                  <button className="flex-1 bg-transparent border border-white/20 text-white font-bold py-3 px-4 rounded-xl hover:bg-white/5 transition-colors text-sm">
                    Change Plan
                  </button>
                </div>
              </div>
            </section>

            {/* Billing History */}
            <section>
               <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock size={18} className="text-gray-400" /> 
                Billing History
              </h2>
              <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
                {[
                  { date: 'Dec 14, 2025', desc: 'Pro Plan (Yearly)', amount: '$99.00', status: 'Paid' },
                  { date: 'Dec 14, 2024', desc: 'Pro Plan (Yearly)', amount: '$99.00', status: 'Paid' },
                  { date: 'Nov 14, 2023', desc: 'Basic Plan (Monthly)', amount: '$9.00', status: 'Paid' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 md:p-5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-white">{item.desc}</div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">{item.amount}</div>
                      <div className="text-[10px] text-[#CCFF00]">{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2 text-xs text-gray-500 hover:text-white transition-colors">
                View all invoices
              </button>
            </section>
          </div>

          {/* RIGHT COLUMN (1/3 width) - PAYMENT METHOD & INFO */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Payment Method */}
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Shield size={18} className="text-gray-400" /> 
                Payment Method
              </h2>
              <div className="bg-zinc-900 p-5 rounded-2xl border border-white/10 flex items-center gap-4 mb-3">
                <div className="w-12 h-8 bg-white rounded-md flex items-center justify-center">
                   {/* Logo Visa/Mastercard simple */}
                   <div className="flex -space-x-1">
                     <div className="w-3 h-3 rounded-full bg-red-500/80" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                   </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">•••• 4242</div>
                  <div className="text-xs text-gray-500">Expires 12/28</div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ChevronRight size={16} className="text-gray-500" />
                </button>
              </div>
              <button className="w-full py-3 rounded-xl border border-dashed border-white/20 text-xs text-gray-400 hover:text-white hover:border-white/40 transition-colors">
                + Add New Method
              </button>
            </section>

             {/* Plan Benefits (Reminder) */}
            <section className="bg-gradient-to-b from-zinc-900 to-black p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Your Benefits</h3>
              <ul className="space-y-3">
                {[
                  "Unlimited Food Scans",
                  "Detailed Organ Visualization",
                  "Export Health Data (PDF)",
                  "Priority AI Support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-[#CCFF00] shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            {/* Mobile Sign Out */}
            <button className="md:hidden w-full flex items-center justify-center gap-2 text-sm text-red-500 bg-red-500/10 py-4 rounded-xl border border-red-500/20">
               <LogOut size={16} />
               Sign Out
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}