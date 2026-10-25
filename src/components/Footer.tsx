import React from 'react';
import { businessConfig, getWhatsAppOrderUrl } from '../data/config';
import { Coffee, MapPin, Phone, MessageSquare, Instagram, Facebook, ArrowUp } from 'lucide-react';

interface FooterProps {
  onExploreMenu: () => void;
  onFindCafe: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onExploreMenu, onFindCafe }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#130D0A] text-[#F6F0E6] border-t border-[#B87943]/20 pt-20 pb-12 overflow-hidden">
      {/* Warm Ambient Pool */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-[#B87943]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Final Cinematic Call to Action */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-20 relative z-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#B87943] font-sans font-semibold mb-3 block">
          THE ART OF A PERFECT CUP
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#F6F0E6] mb-4">
          Your Perfect Cup Is Waiting.
        </h2>
        <p className="font-serif italic text-lg sm:text-2xl text-[#D8C3A5] max-w-xl mx-auto mb-8">
          “Make a little time for something good.”
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreMenu}
            className="px-7 py-3 rounded-full bg-[#B87943] hover:bg-[#a36836] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
          >
            Explore Menu
          </button>
          <button
            onClick={onFindCafe}
            className="px-7 py-3 rounded-full border border-[#D8C3A5]/40 hover:border-[#B87943] text-[#F6F0E6] hover:text-[#B87943] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Visit Us
          </button>
          <a
            href={getWhatsAppOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full bg-[#24150F] hover:bg-[#B87943]/20 text-[#D8C3A5] hover:text-white border border-[#B87943]/30 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#B87943]" />
            <span>Order or Enquire</span>
          </a>
        </div>
      </div>

      {/* Main Footer Links & Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-[#B87943]/15">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#B87943]/20 text-[#B87943] flex items-center justify-center">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#F6F0E6]">
                {businessConfig.wordmark}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#D8C3A5]/80 font-sans max-w-sm leading-relaxed mb-6">
              {businessConfig.tagline} An artisanal coffee house built for quiet pauses, authentic conversation, and handcrafted single-origin roasts.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={businessConfig.links.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#24150F] border border-[#B87943]/30 flex items-center justify-center text-[#D8C3A5] hover:text-[#B87943] hover:border-[#B87943] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={businessConfig.links.facebookUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#24150F] border border-[#B87943]/30 flex items-center justify-center text-[#D8C3A5] hover:text-[#B87943] hover:border-[#B87943] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#F6F0E6] uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D8C3A5]">
              <li>
                <a href="#hero" className="hover:text-[#B87943] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#B87943] transition-colors">
                  The Art of Coffee
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#B87943] transition-colors">
                  Signature Menu
                </a>
              </li>
              <li>
                <a href="#signature" className="hover:text-[#B87943] transition-colors">
                  Featured Moment
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#B87943] transition-colors">
                  Café Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#B87943] transition-colors">
                  About Preeti
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#F6F0E6] uppercase tracking-wider mb-4">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs text-[#D8C3A5] font-sans">
              <p className="font-medium text-[#F6F0E6]">Weekdays:</p>
              <p className="text-[#D8C3A5]/70">7:00 AM – 9:00 PM</p>
              <p className="font-medium text-[#F6F0E6] pt-1">Weekends:</p>
              <p className="text-[#D8C3A5]/70">8:00 AM – 10:00 PM</p>
              <p className="text-[11px] text-[#B87943] pt-2">Fresh roasts daily</p>
            </div>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#F6F0E6] uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#D8C3A5] font-sans">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B87943] shrink-0 mt-0.5" />
                <span>{businessConfig.address.street}, {businessConfig.address.cityAndPin}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B87943] shrink-0" />
                <a href={`tel:${businessConfig.contact.phone}`} className="hover:text-[#B87943] transition-colors">
                  {businessConfig.contact.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#B87943] shrink-0" />
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B87943] transition-colors"
                >
                  WhatsApp Ordering
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8C3A5]/60 font-sans">
          <p>© {currentYear} {businessConfig.name}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>Crafted with passion for authentic coffee lovers.</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#D8C3A5] hover:text-[#B87943] transition-colors cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
