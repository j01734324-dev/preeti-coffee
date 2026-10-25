import React, { useState } from 'react';
import { menuItems, MENU_CATEGORIES, MenuCategory, MenuItem } from '../data/menu';
import { Sparkles, Search, Plus, Check, MessageSquare, Coffee } from 'lucide-react';
import { getWhatsAppOrderUrl } from '../data/config';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  cartItems: MenuItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, cartItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ? true : item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tastingNotes?.some((note) =>
        note.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const isItemInCart = (id: string) => cartItems.some((ci) => ci.id === id);

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-[#1A100B] text-[#F6F0E6] overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#B87943]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#532e18]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24150F] border border-[#B87943]/30 text-[#D8C3A5] text-xs font-sans tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B87943]" />
            <span>SIGNATURE MENU</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F6F0E6] leading-tight mb-5">
            Find Your <span className="italic text-[#B87943]">Perfect Cup.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8C3A5] font-sans font-light">
            A little comfort, a little indulgence, a lot to love.
          </p>
        </div>

        {/* Filter Categories & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-14">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#B87943] text-white font-semibold shadow-md'
                    : 'bg-[#24150F]/70 text-[#D8C3A5] hover:text-white hover:bg-[#24150F] border border-[#B87943]/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8C3A5]/50" />
            <input
              type="text"
              placeholder="Search drinks or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#24150F] border border-[#B87943]/30 text-sm text-[#F6F0E6] placeholder-[#D8C3A5]/40 focus:outline-none focus:border-[#B87943] transition-colors"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const added = isItemInCart(item.id);
            return (
              <div
                key={item.id}
                className={`group rounded-2xl bg-[#24150F]/80 border transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-2xl ${
                  item.isSignature
                    ? 'border-[#B87943] shadow-lg shadow-[#B87943]/10'
                    : 'border-[#B87943]/20 hover:border-[#B87943]/60'
                }`}
              >
                {/* Product Image */}
                <div className="relative h-60 w-full overflow-hidden bg-[#130D0A]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24150F] via-transparent to-black/30" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {item.isSignature && (
                      <span className="px-2.5 py-1 rounded-full bg-[#B87943] text-white text-[10px] uppercase font-bold tracking-wider shadow">
                        Signature Moment
                      </span>
                    )}
                    {item.isPopular && !item.isSignature && (
                      <span className="px-2.5 py-1 rounded-full bg-[#77785A] text-white text-[10px] uppercase font-bold tracking-wider shadow">
                        Guest Favorite
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-xl font-bold text-[#F6F0E6] group-hover:text-[#B87943] transition-colors">
                        {item.name}
                      </h3>
                      {/* Price Placeholder (Owner Editable) */}
                      <span className="shrink-0 text-xs font-sans text-[#D8C3A5] bg-[#1A100B] px-2.5 py-1 rounded-full border border-[#B87943]/30">
                        {item.priceDisplay}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#D8C3A5] font-sans leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tasting Notes */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.tastingNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-sans text-[#D8C3A5]/80 bg-[#130D0A] px-2 py-0.5 rounded border border-white/5"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Action Controls */}
                  <div className="pt-4 border-t border-[#B87943]/15 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onAddToCart(item)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        added
                          ? 'bg-[#77785A] text-white'
                          : 'bg-[#B87943] hover:bg-[#a36836] text-white'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Order</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order List</span>
                        </>
                      )}
                    </button>

                    <a
                      href={getWhatsAppOrderUrl(`Hi Preeti Coffee Shop, I would like to inquire about the ${item.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#130D0A] hover:bg-[#B87943]/20 text-[#D8C3A5] hover:text-white border border-[#B87943]/30 transition-colors"
                      title="Direct WhatsApp Inquiry"
                    >
                      <MessageSquare className="w-4 h-4 text-[#B87943]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#24150F]/50 rounded-2xl border border-[#B87943]/20">
            <Coffee className="w-10 h-10 text-[#B87943] mx-auto mb-3 opacity-60" />
            <h4 className="font-serif text-xl text-[#F6F0E6] mb-1">No creations found</h4>
            <p className="text-sm text-[#D8C3A5] mb-4">
              Try searching with another keyword or pick from our categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-[#B87943] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Informative Note for Café Owner */}
        <div className="mt-14 p-4 rounded-xl bg-[#24150F]/60 border border-[#B87943]/30 text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#D8C3A5]">
            <span className="font-semibold text-[#B87943]">Café Owner Note:</span> Prices are set to editable placeholders. You can adjust items, prices, and descriptions anytime in{' '}
            <code className="text-[#F6F0E6] bg-black/40 px-1 py-0.5 rounded">src/data/menu.ts</code>.
          </p>
        </div>
      </div>
    </section>
  );
};
