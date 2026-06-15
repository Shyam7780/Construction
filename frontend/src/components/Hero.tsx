import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img 
        src="/images/hero.jpg" 
        alt="Premium Construction Site" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur text-white text-sm tracking-[3px] rounded-full mb-6">EST. 2008 • LOS ANGELES</div>
        <h1 className="text-white text-7xl md:text-8xl font-semibold tracking-tighter mb-6 leading-none">
          Building<br />Excellence.
        </h1>
        <p className="text-white/90 text-xl md:text-2xl max-w-2xl mx-auto mb-10">
          Premium residential and commercial construction with uncompromising quality and craftsmanship.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#calculator" className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#f59e0b] hover:bg-[#d97706] text-[#1e3a5f] font-semibold rounded-lg text-lg transition">
            Get Instant Estimate <ArrowRight size={20} />
          </a>
          <a href="#contact" className="inline-flex items-center justify-center gap-3 px-9 py-4 border-2 border-white text-white hover:bg-white hover:text-[#1e3a5f] font-semibold rounded-lg text-lg transition">
            Start Your Project
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/70 text-sm tracking-widest">
        SCROLL TO EXPLORE <div className="h-px w-8 bg-white/40 mt-2" />
      </div>
    </section>
  );
}
