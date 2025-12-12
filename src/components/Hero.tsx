import { ArrowRight, ScanLine, Activity } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F4F4F4]">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#00B7B5]/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#018790]/10 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#005461]/5 text-[#005461] text-sm font-semibold mb-8 border border-[#005461]/10">
            <Activity size={16} />
            <span>The #1 Health MIIKI App</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-[#005461] leading-tight mb-8">
            Don't Let Your Body <span className="text-[#018790]">Game Over.</span>
          </h1>

          <p className="text-gray-600 text-xl mb-10 leading-relaxed max-w-2xl">
            Revolutionize your health journey. Scan your food with AI, visualize the impact on your <span className="font-bold text-[#005461]">Internal Organs</span>, and avatarize your longevity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button className="flex items-center justify-center gap-2 bg-[#005461] hover:bg-[#018790] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#005461]/20 transform hover:-translate-y-1">
              <ScanLine size={20} />
              Scan Food Now
            </button>
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#005461] border border-gray-200 px-8 py-4 rounded-xl font-bold transition-all">
              Learn More
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-[#F4F4F4]"></div>
              ))}
            </div>
            <p>Trusted by <span className="font-bold text-[#005461]">10,000+</span> healthy users</p>
          </div>
        </div>
      </div>
    </section>
  );
}