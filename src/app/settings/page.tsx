"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("billing");

  return (
    <div className="min-h-screen w-full bg-bg-deep pt-24 pb-10 px-6 md:px-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed top-20 left-20 w-[300px] h-[300px] bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        {/* Page Title & Back Button */}
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition text-white">
                ←
            </button>
            <h1 className="text-3xl font-black italic text-white tracking-tighter">SETTINGS</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
                <TabButton 
                    active={activeTab === "profile"} 
                    onClick={() => setActiveTab("profile")} 
                    label="Profile" 
                    icon={<UserIcon />} 
                />
                <TabButton 
                    active={activeTab === "billing"} 
                    onClick={() => setActiveTab("billing")} 
                    label="Billing & Plans" 
                    icon={<CreditCardIcon />} 
                />
                <TabButton 
                    active={activeTab === "notifications"} 
                    onClick={() => setActiveTab("notifications")} 
                    label="Notifications" 
                    icon={<BellIcon />} 
                />
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 min-h-[500px]">
                
                {activeTab === "profile" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                        
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-normal to-blue-dark p-[2px]">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                     <span className="text-3xl font-bold text-white">JD</span>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white font-medium hover:bg-white/20 transition">Change Avatar</button>
                        </div>

                        <div className="grid gap-4 max-w-lg">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 uppercase tracking-wider">Display Name</label>
                                <input type="text" defaultValue="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-normal" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 uppercase tracking-wider">Email Address</label>
                                <input type="email" defaultValue="john.doe@example.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-normal" />
                            </div>
                        </div>

                         <div className="pt-4">
                            <button className="px-6 py-3 bg-blue-normal text-black rounded-xl font-bold hover:bg-blue-normal-hover transition shadow-[0_0_15px_rgba(var(--color-blue-normal-rgb),0.3)]">Save Changes</button>
                        </div>
                    </div>
                )}

                {activeTab === "billing" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        
                        {/* Current Plan Summary */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-white/10">
                            <div>
                                <div className="text-sm text-blue-400 font-bold mb-1">CURRENT PLAN</div>
                                <div className="text-3xl font-black text-white italic">PRO MAX</div>
                                <div className="text-gray-400 text-sm mt-2">$99.00 / month • Renews on Dec 24, 2025</div>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <button className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition">Change Plan</button>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Payment Method</h3>
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Visual Credit Card */}
                                <div className="w-full md:w-80 h-48 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 p-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-normal/20 blur-[40px] rounded-full" />
                                    <div className="relative z-10 flex flex-col justify-between h-full">
                                        <div className="flex justify-between items-start">
                                            <div className="text-white/50 text-xs tracking-widest">CREDIT CARD</div>
                                            <svg width="40" height="24" viewBox="0 0 40 24" fill="white" className="opacity-80"><path d="M0 0h40v24H0z" fill="none"/><path d="M4 0h32c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H4c-2.21 0-4-1.79-4-4V4c0-2.21 1.79-4 4-4zm0 6v12h32V6H4zm0-2h32V4H4v2z" fill="currentColor"/></svg>
                                        </div>
                                        <div>
                                            <div className="text-white text-xl font-mono tracking-widest mb-1">•••• •••• •••• 4242</div>
                                            <div className="flex justify-between items-end">
                                                <div className="text-gray-400 text-xs">JOHN DOE</div>
                                                <div className="text-gray-400 text-xs">12/28</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Add Method Button */}
                                <button className="flex-1 min-h-[100px] rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition group">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-blue-normal transition-colors">+</div>
                                    <span className="text-sm text-gray-400 group-hover:text-white">Add Payment Method</span>
                                </button>
                            </div>
                        </div>

                        {/* Invoice History */}
                        <div>
                             <h3 className="text-lg font-bold text-white mb-4">Invoice History</h3>
                             <div className="border border-white/10 rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm text-gray-400">
                                    <thead className="bg-white/5 text-white">
                                        <tr>
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Amount</th>
                                            <th className="p-4 font-medium">Status</th>
                                            <th className="p-4 font-medium text-right">Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <tr>
                                            <td className="p-4">Nov 24, 2025</td>
                                            <td className="p-4 text-white">$99.00</td>
                                            <td className="p-4"><span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">Paid</span></td>
                                            <td className="p-4 text-right"><button className="text-blue-500 hover:text-blue-400">Download</button></td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">Oct 24, 2025</td>
                                            <td className="p-4 text-white">$99.00</td>
                                            <td className="p-4"><span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">Paid</span></td>
                                            <td className="p-4 text-right"><button className="text-blue-500 hover:text-blue-400">Download</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                             </div>
                        </div>

                    </div>
                )}
                
                {activeTab === "notifications" && (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                        Notification settings coming soon...
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for icons & buttons
function TabButton({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode }) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active 
                ? "bg-blue-normal text-black shadow-[0_0_15px_rgba(var(--color-blue-normal-rgb),0.3)] font-bold" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    )
}

function UserIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function CreditCardIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
}
function BellIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
}
