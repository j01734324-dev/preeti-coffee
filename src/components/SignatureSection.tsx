import React from 'react';
import { Sparkles, Thermometer, Droplets, Award, MessageSquare } from 'lucide-react';
import { getWhatsAppOrderUrl } from '../data/config';

export const SignatureSection: React.FC = () => {
  return (
    <section
      id="signature"
      className="relative py-28 sm:py-36 bg-gradient-to-b from-[#1A100B] via-[#24150F] to-[#130D0A] text-[#F6F0E6] overflow-hidden"
    >
      {/* Background warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#B87943]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Big Editorial Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative frame ring */}
              <div className="absolute -inset-4 rounded-3xl border border-[#B87943]/30 pointer-events-none" />
              <div className="overflow-hidden rounded-2xl shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1592663527359-cf6642f54cff?q=80&w=1200&auto=format&fit=crop"
                  alt="Caramel Affogato Noir — Handcrafted signature coffee"
                  className="w-full h-[450px] sm:h-[540px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#130D0A] via-transparent to-black/20" />

                {/* Floating Craft Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#130D0A]/90 border border-[#B87943]/40 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#B87943] font-semibold">
                        Crafted Daily
                      </p>
                      <h4 className="font-serif text-lg font-bold text-[#F6F0E6]">
                        Caramel Affogato Noir
                      </h4>
                    </div>
                    <span className="text-xs text-[#D8C3A5] font-sans bg-[#24150F] px-2.5 py-1 rounded-full border border-white/10">
                      Signature Pour
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Specifications */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B87943]/20 border border-[#B87943]/40 text-[#D8C3A5] text-xs font-sans tracking-widest uppercase mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#B87943]" />
              <span>THE SIGNATURE EXPERIENCE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F6F0E6] leading-[1.1] mb-6">
              More Than a Drink.{' '}
              <span className="italic font-normal text-[#B87943] block mt-1">
                A Moment of Your Own.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#D8C3A5] font-sans font-light leading-relaxed mb-8">
              The sweet collision of contrasting temperatures and textures. We brew a concentrated double ristretto over slow-churned artisanal vanilla bean gelato, finished with sea-salted caramel swirl and a dusting of roasted hazelnut.
            </p>

            {/* Brewing Profile Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#24150F]/70 border border-[#B87943]/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#B87943]/20 text-[#B87943]">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#D8C3A5]/70 font-sans">Extraction</p>
                  <p className="font-serif text-base font-semibold text-[#F6F0E6]">Double Ristretto (9 Bar)</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#24150F]/70 border border-[#B87943]/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#B87943]/20 text-[#B87943]">
                  <Thermometer className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#D8C3A5]/70 font-sans">Temperature Contrast</p>
                  <p className="font-serif text-base font-semibold text-[#F6F0E6]">92°C Brew / -12°C Gelato</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#24150F]/70 border border-[#B87943]/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#B87943]/20 text-[#B87943]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#D8C3A5]/70 font-sans">Gelato Source</p>
                  <p className="font-serif text-base font-semibold text-[#F6F0E6]">Madagascar Vanilla Pods</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#24150F]/70 border border-[#B87943]/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#B87943]/20 text-[#B87943]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#D8C3A5]/70 font-sans">Finish</p>
                  <p className="font-serif text-base font-semibold text-[#F6F0E6]">Smoked Sea Salt Caramel</p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={getWhatsAppOrderUrl('Hello Preeti Coffee Shop, I would love to order the Caramel Affogato Noir!')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#B87943] hover:bg-[#a36836] text-white text-xs font-semibold tracking-wide uppercase transition-all duration-300 shadow-xl shadow-[#B87943]/20 flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire About This Creation</span>
              </a>

              <a
                href="#menu"
                className="px-6 py-3.5 rounded-full border border-[#D8C3A5]/30 hover:border-[#B87943] text-[#D8C3A5] hover:text-white text-xs font-medium tracking-wide transition-colors"
              >
                View Full Menu
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
