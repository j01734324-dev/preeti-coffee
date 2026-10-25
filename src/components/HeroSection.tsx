import React from 'react';
import { CoffeeScene3D } from './CoffeeScene3D';
import { businessConfig } from '../data/config';
import { ArrowDown, Sparkles, MapPin, Coffee, Compass } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onFindCafe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu, onFindCafe }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92svh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#130D0A] via-[#1a100b] to-[#24150F] pt-20 pb-12 sm:pt-24 sm:pb-16"
    >
      {/* Background ambient lighting pools */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#B87943]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#532e18]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[78svh]">
          {/* Left Column: Editorial Typography & Brand Story */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start z-10 text-left pt-4 lg:pt-0">
            {/* Minimal Luxury Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#24150F]/80 border border-[#B87943]/35 text-[#D8C3A5] text-[11px] font-sans tracking-widest uppercase mb-5 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B87943]" />
              <span>THE ART OF A PERFECT CUP</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#F6F0E6] leading-[1.08] mb-5">
              A Little Pause.{' '}
              <span className="italic font-normal text-[#B87943] block mt-1">
                A Better Brew.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#D8C3A5] font-sans font-light leading-relaxed mb-8 max-w-lg">
              {businessConfig.subtagline} Step away from the rush into handcrafted roasts, silky microfoam, and the quiet comfort of a familiar neighborhood ritual.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#B87943] hover:bg-[#a36836] text-white text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-xl shadow-[#B87943]/20 hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Coffee className="w-4 h-4" />
                <span>Explore the Menu</span>
              </button>

              <button
                onClick={onFindCafe}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#D8C3A5]/40 hover:border-[#B87943] text-[#F6F0E6] hover:text-[#B87943] bg-[#24150F]/40 hover:bg-[#24150F]/80 text-sm font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B87943]"
              >
                <MapPin className="w-4 h-4 text-[#B87943]" />
                <span>Find Our Café</span>
              </button>
            </div>

            {/* Quick Micro-Accents */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#B87943]/20 w-full max-w-md">
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#F6F0E6]">Fresh</p>
                <p className="text-[11px] text-[#D8C3A5]/70 uppercase tracking-wider font-sans">Batch Roasted</p>
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#F6F0E6]">100%</p>
                <p className="text-[11px] text-[#D8C3A5]/70 uppercase tracking-wider font-sans">Handcrafted</p>
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#F6F0E6]">Daily</p>
                <p className="text-[11px] text-[#D8C3A5]/70 uppercase tracking-wider font-sans">Fresh Bakes</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div className="lg:col-span-6 xl:col-span-7 h-[420px] sm:h-[500px] lg:h-[620px] w-full relative flex items-center justify-center">
            <CoffeeScene3D />
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#story"
        className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#D8C3A5]/60 hover:text-[#B87943] transition-colors group cursor-pointer z-20"
        aria-label="Scroll down to explore"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium group-hover:tracking-[0.3em] transition-all">
          Scroll to explore
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#B87943]" />
      </a>
    </section>
  );
};
