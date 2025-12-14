'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Pastikan install gsap
import Footer from "../components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Nav from "../components/OverlayNav";

// 1. Lazy Import Komponen Berat
// ssr: false penting untuk komponen yang butuh window/DOM seperti Three.js
const StoryHero = dynamic(() => import("../components/StoryHero"), {
  ssr: false,
  loading: () => <div className="w-full h-[400vh] bg-black" />, // Placeholder tinggi sesuai asli
});

const ProblemSolution = dynamic(() => import("../components/ProblemSolution"), {
  loading: () => <div className="w-full h-[100vh] bg-background" />,
});

const Benefits = dynamic(() => import("../components/Benefits"), {
  loading: () => <div className="w-full h-[50vh] bg-background" />,
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  // 2. Refresh ScrollTrigger saat komponen berat masuk agar hitungan scroll akurat
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500); // Jeda sedikit untuk memastikan DOM stabil
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Kirim callback onFinish untuk mentrigger load konten utama */}
      <LoadingScreen onFinish={() => setIsLoaded(true)} />
      
      <Nav />

      {/* 3. Conditional Rendering: Konten berat HANYA dirender setelah loading selesai */}
      {isLoaded ? (
        <>
          <StoryHero />
          <ProblemSolution />
          <Benefits />
        </>
      ) : (
        /* Placeholder saat LoadingScreen masih jalan (mencegah CLS/Layar lompat) */
        <div className="invisible h-0 w-0">
           {/* Kita hide konten ini atau biarkan kosong sampai loading kelar */}
        </div>
      )}

      <Footer />
    </main>
  );
}