import React from 'react';
import { HeartHandshake, CupSoda, Clock, Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  const brandValues = [
    {
      icon: CupSoda,
      title: 'Made for the Moment',
      description:
        'Every single cup is pulled on-demand. We honor the time it takes to balance extraction, heat, and texture so you can pause fully.',
    },
    {
      icon: HeartHandshake,
      title: 'Comfort in Every Cup',
      description:
        'A soothing sanctuary in the middle of a busy city. Warm lighting, comfortable seating, and familiar smiles that make you feel immediately welcome.',
    },
    {
      icon: Clock,
      title: 'Your Everyday Coffee Ritual',
      description:
        'Whether an early morning espresso on the go, a slow afternoon read, or quiet evening conversations, Preeti is here for your routine.',
    },
  ];

  return (
    <section
      id="story"
      className="relative py-24 sm:py-32 bg-[#F6F0E6] text-[#24150F] overflow-hidden transition-colors duration-700"
    >
      {/* Top Transition Wave / Angle */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#24150F] to-transparent opacity-10 pointer-events-none" />

      {/* Decorative Warm Elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B87943]/15 border border-[#B87943]/30 text-[#7c4d26] text-xs font-sans tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B87943]" />
            <span>THE ART OF COFFEE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#24150F] leading-[1.15] mb-6">
            Good Coffee. <span className="italic text-[#B87943]">Better Moments.</span>
          </h2>

          <p className="text-base sm:text-xl text-[#533b30] font-sans font-normal leading-relaxed">
            From the first aroma to the final sip, every cup is an invitation to slow down and enjoy the moment.
          </p>
        </div>

        {/* Editorial Story Layout: Photo Composition & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20">
          {/* Left: Atmospheric Art Gallery Imagery */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-7 overflow-hidden rounded-2xl shadow-xl border border-[#D8C3A5]/50 group">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop"
                alt="Fresh artisanal coffee cup on café wooden table"
                className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-4">
              <div className="overflow-hidden rounded-2xl shadow-md border border-[#D8C3A5]/50 group">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop"
                  alt="Cozy café ambiance with warm lighting"
                  className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-md border border-[#D8C3A5]/50 group">
                <img
                  src="https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?q=80&w=600&auto=format&fit=crop"
                  alt="Barista pouring velvety micro-foam"
                  className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-serif italic text-2xl text-[#B87943] mb-3">Our Philosophy</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#24150F] mb-5 leading-snug">
              Brewed with heart, poured with purpose.
            </h3>
            <p className="text-[#533b30] text-sm sm:text-base leading-relaxed mb-6 font-sans">
              We believe a coffee shop is more than four walls and an espresso machine. It is a breathing room between appointments, a corner to share laughter, or simply a warm ceramic mug between your palms on a breezy day.
            </p>
            <p className="text-[#533b30] text-sm sm:text-base leading-relaxed mb-8 font-sans">
              At Preeti Coffee Shop, every roast profile is tested, every milk pour is balanced, and every smile across the counter is genuine.
            </p>

            <div className="p-5 rounded-2xl bg-[#EFE6D7] border border-[#D8C3A5] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#B87943] text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
                P
              </div>
              <div>
                <p className="font-serif font-bold text-[#24150F]">Preeti Coffee Sanctuary</p>
                <p className="text-xs text-[#7c4d26] font-sans">Warm roasts. Peaceful seating. Welcoming company.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Brand Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#FFFDF9] border border-[#D8C3A5]/60 hover:border-[#B87943] shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-[#24150F] text-[#B87943] flex items-center justify-center mb-6 group-hover:bg-[#B87943] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#24150F] mb-3 group-hover:text-[#B87943] transition-colors">
                  {val.title}
                </h4>
                <p className="text-sm text-[#533b30] leading-relaxed font-sans">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
