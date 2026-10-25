import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  span?: string; // Tailwind grid span
}

const GALLERY_ITEMS: GalleryImage[] = [
  {
    id: 'interior-warm',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    title: 'Warm Sunlight & Wooden Tables',
    subtitle: 'Quiet morning light streaming across handcrafted oak tables.',
    span: 'col-span-1 md:col-span-2 row-span-2',
  },
  {
    id: 'latte-art-pour',
    url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=900&auto=format&fit=crop',
    title: 'The Morning Pour',
    subtitle: 'Silky microfoam etched with patient craftsmanship.',
    span: 'col-span-1',
  },
  {
    id: 'roastery-beans',
    url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=900&auto=format&fit=crop',
    title: 'Freshly Roasted Beans',
    subtitle: 'Aromatic whole beans resting after the morning roast.',
    span: 'col-span-1',
  },
  {
    id: 'cozy-seating',
    url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1200&auto=format&fit=crop',
    title: 'Cozy Corners & Conversations',
    subtitle: 'Plush seating designed for slow afternoons with a great book.',
    span: 'col-span-1 md:col-span-2',
  },
  {
    id: 'pastry-tray',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop',
    title: 'Morning Bakes & Pastries',
    subtitle: 'Golden laminated croissants fresh out of our oven.',
    span: 'col-span-1',
  },
  {
    id: 'barista-craft',
    url: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=900&auto=format&fit=crop',
    title: 'Precision Espresso Pull',
    subtitle: 'Extracting balance, clarity, and sweetness in every cup.',
    span: 'col-span-1',
  },
];

export const GallerySection: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => ((prev ?? 0) + 1) % GALLERY_ITEMS.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) =>
          (prev ?? 0) === 0 ? GALLERY_ITEMS.length - 1 : (prev ?? 0) - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#130D0A] text-[#F6F0E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24150F] border border-[#B87943]/30 text-[#D8C3A5] text-xs font-sans tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B87943]" />
            <span>THE CAFÉ EXPERIENCE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F6F0E6] leading-tight mb-5">
            Your Favourite <span className="italic text-[#B87943]">Little Escape.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8C3A5] font-sans font-light">
            Step inside our world of warm lighting, roasted aromas, and welcoming smiles.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[240px] sm:auto-rows-[280px]">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group border border-[#B87943]/20 hover:border-[#B87943]/60 transition-all duration-300 shadow-lg ${
                item.span || 'col-span-1'
              }`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Badge */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#130D0A]/70 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-[#B87943]" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="font-serif text-lg font-bold text-[#F6F0E6] group-hover:text-[#B87943] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#D8C3A5] font-sans mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#D8C3A5]/60">
          <Camera className="w-3.5 h-3.5 text-[#B87943]" />
          <span>Click any image to view in full resolution cinema lightbox.</span>
        </div>
      </div>

      {/* Accessible Fullscreen Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-[#24150F] border border-white/20 text-white hover:text-[#B87943] hover:border-[#B87943] transition-colors z-50 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) =>
                (prev ?? 0) === 0 ? GALLERY_ITEMS.length - 1 : (prev ?? 0) - 1
              );
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#24150F]/80 hover:bg-[#24150F] border border-white/20 text-white hover:text-[#B87943] transition-colors z-50 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => ((prev ?? 0) + 1) % GALLERY_ITEMS.length);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#24150F]/80 hover:bg-[#24150F] border border-white/20 text-white hover:text-[#B87943] transition-colors z-50 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Modal Image Box */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_ITEMS[activeImageIndex].url}
              alt={GALLERY_ITEMS[activeImageIndex].title}
              className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F6F0E6]">
                {GALLERY_ITEMS[activeImageIndex].title}
              </h3>
              <p className="text-sm text-[#D8C3A5] mt-1 font-sans">
                {GALLERY_ITEMS[activeImageIndex].subtitle}
              </p>
              <span className="text-[11px] text-[#D8C3A5]/50 mt-2 block font-sans">
                {activeImageIndex + 1} of {GALLERY_ITEMS.length} (Use keyboard arrows to navigate)
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
