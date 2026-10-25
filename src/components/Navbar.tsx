import React, { useState, useEffect } from 'react';
import { businessConfig, getWhatsAppOrderUrl } from '../data/config';
import { Coffee, Menu, X, MessageSquare, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount = 0, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Signature', href: '#signature' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Visit Us', href: '#visit' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#130D0A]/90 backdrop-blur-md border-b border-[#B87943]/20 py-3.5 shadow-xl'
          : 'bg-gradient-to-b from-[#130D0A]/80 via-[#130D0A]/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B87943] rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-full bg-[#B87943]/20 border border-[#B87943]/40 flex items-center justify-center text-[#B87943] group-hover:bg-[#B87943] group-hover:text-white transition-all duration-300">
            <Coffee className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#F6F0E6] group-hover:text-[#B87943] transition-colors leading-none">
              {businessConfig.wordmark}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8C3A5]/70 font-sans mt-0.5">
              COFFEE SHOP
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#D8C3A5] hover:text-white transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B87943] rounded group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B87943] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {cartCount > 0 && onOpenCart && (
            <button
              onClick={onOpenCart}
              className="relative px-3.5 py-1.5 rounded-full border border-[#B87943]/40 bg-[#24150F] hover:bg-[#B87943]/20 text-[#F6F0E6] text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Coffee className="w-3.5 h-3.5 text-[#B87943]" />
              <span>Order List</span>
              <span className="ml-1 px-1.5 py-0.2 bg-[#B87943] text-white text-[10px] font-bold rounded-full">
                {cartCount}
              </span>
            </button>
          )}

          <a
            href={getWhatsAppOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#B87943] hover:bg-[#a36836] text-white text-xs font-semibold tracking-wide uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Order / Inquire</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          {cartCount > 0 && onOpenCart && (
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full bg-[#24150F] border border-[#B87943]/40 text-[#F6F0E6]"
              aria-label="View Order"
            >
              <Coffee className="w-4 h-4 text-[#B87943]" />
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#B87943] text-white text-[10px] font-bold rounded-full">
                {cartCount}
              </span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#24150F] border border-[#B87943]/30 text-[#D8C3A5] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B87943] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#130D0A]/98 border-b border-[#B87943]/30 px-6 py-6 shadow-2xl backdrop-blur-xl animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif text-[#F6F0E6] hover:text-[#B87943] py-1 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={getWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#B87943] text-white text-center text-sm font-semibold tracking-wide uppercase flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="#visit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full border border-[#B87943]/40 text-[#D8C3A5] text-center text-sm font-medium hover:text-white hover:bg-white/5 flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#B87943]" />
                <span>Find Our Café</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
