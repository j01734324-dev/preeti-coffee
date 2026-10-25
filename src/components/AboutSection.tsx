import React from 'react';
import { Sparkles, Coffee, Heart, CheckCircle2 } from 'lucide-react';
import { businessConfig } from '../data/config';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#F6F0E6] text-[#24150F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Warm Brand Portrait / Atmosphere */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-[#FFFDF9]">
                <img
                  src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=1000&auto=format&fit=crop"
                  alt="Barista brewing coffee at Preeti Coffee Shop"
                  className="w-full h-[460px] sm:h-[520px] object-cover"
                />
              </div>

              {/* Decorative Warm Quote Stamp */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 p-5 rounded-2xl bg-[#24150F] text-[#F6F0E6] border border-[#B87943]/40 shadow-xl max-w-[240px]">
                <Coffee className="w-6 h-6 text-[#B87943] mb-2" />
                <p className="font-serif italic text-sm text-[#F6F0E6] leading-snug">
                  “A quiet sanctuary in the heart of your neighborhood.”
                </p>
                <p className="text-[10px] text-[#D8C3A5] uppercase tracking-wider font-sans mt-2">
                  — Preeti Coffee Philosophy
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Brand Story */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B87943]/15 border border-[#B87943]/30 text-[#7c4d26] text-xs font-sans tracking-widest uppercase mb-5 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#B87943]" />
              <span>ABOUT PREETI COFFEE SHOP</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#24150F] leading-[1.15] mb-6">
              Coffee Tastes Better <br />
              <span className="italic text-[#B87943]">When You Feel at Home.</span>
            </h2>

            {/* Core Brand Story Copy from Brief */}
            <div className="space-y-4 text-base sm:text-lg text-[#533b30] font-sans font-light leading-relaxed mb-8">
              <p className="text-[#24150F] font-normal font-serif text-xl sm:text-2xl italic">
                “Some places are made for more than coffee. They are made for conversations, quiet moments, familiar faces, and the little breaks that make a day better.”
              </p>
              <p>
                Preeti Coffee Shop is a place to pause, recharge, and enjoy your cup. Whether you are catching up with an old friend over cappuccino, reading your favorite book in our sunny corner, or picking up an espresso on your daily walk, you are always part of our café family.
              </p>
              <p className="text-sm">
                We take pride in our welcoming warmth, careful extraction, and thoughtful hospitality.
              </p>
            </div>

            {/* Experience Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#D8C3A5]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B87943] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#24150F] text-base">Welcoming Hospitality</h4>
                  <p className="text-xs text-[#7c4d26] font-sans">Every guest is greeted with warmth and kindness.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B87943] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#24150F] text-base">Fresh Roasts Daily</h4>
                  <p className="text-xs text-[#7c4d26] font-sans">Tested brew recipes for consistent, sweet extraction.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B87943] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#24150F] text-base">Cozy Atmosphere</h4>
                  <p className="text-xs text-[#7c4d26] font-sans">Quiet tables, comfortable seating, and soft jazz.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B87943] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#24150F] text-base">Neighborhood Community</h4>
                  <p className="text-xs text-[#7c4d26] font-sans">A gathering space for everyday moments and celebrations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
