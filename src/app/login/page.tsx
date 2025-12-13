"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleLogin = (provider: "google" | "apple") => {
    setLoading(provider);
    // Simulasi delay login lalu redirect ke profile
    setTimeout(() => {
      router.push("/profile");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-bg-deep flex items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_#1a0b2e_0%,_var(--color-bg-deep)_60%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-normal opacity-[0.03] blur-[100px] rounded-full" />

      <div className="relative z-10 w-full max-w-md p-8 flex flex-col items-center gap-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white">
            USER <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-normal to-dpurple-normal">ACCESS</span>
          </h1>
          <p className="text-gray-400 text-sm tracking-wide">Select your authentication protocol</p>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-4">
            
          {/* Google Button */}
          <button
            onClick={() => handleLogin("google")}
            disabled={!!loading}
            className="group relative w-full h-14 bg-white/5 border border-white/10 hover:border-blue-normal/50 hover:bg-white/10 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 overflow-hidden"
          >
             {loading === "google" ? (
                <span className="animate-pulse text-sm font-bold text-gray-300">AUTHENTICATING...</span>
             ) : (
                <>
                    <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="text-white font-medium tracking-wide">Login with Google</span>
                </>
             )}
          </button>

          {/* Apple Button */}
          <button
            onClick={() => handleLogin("apple")}
            disabled={!!loading}
            className="group relative w-full h-14 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 rounded-xl flex items-center justify-center gap-3 transition-all duration-300"
          >
             {loading === "apple" ? (
                 <span className="animate-pulse text-sm font-bold text-gray-300">AUTHENTICATING...</span>
             ) : (
                <>
                    <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.12-1.2 2.3.18 3.59 1.54 4.38 2.5-3.8 1.83-3.05 6.64.92 8.35-.69 1.4-1.52 2.85-2.5 3.98l-2 .6zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span className="text-white font-medium tracking-wide">Login with Apple Cloud</span>
                </>
             )}
          </button>

        </div>
        
        {/* Footer Text */}
        <div className="text-[10px] text-gray-600 uppercase tracking-widest">
            Secured by AES-256
        </div>
      </div>
    </div>
  );
}
