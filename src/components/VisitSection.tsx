import React, { useState } from 'react';
import { businessConfig, getWhatsAppOrderUrl } from '../data/config';
import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Navigation,
  Sparkles,
  Wifi,
  Coffee,
  Check,
  Send,
  Calendar,
  Users,
} from 'lucide-react';

export const VisitSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [inquiryGuests, setInquiryGuests] = useState('2');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMsg = `Hello Preeti Coffee Shop! My name is ${inquiryName || 'a guest'}. I would like to reserve or inquire about a visit on ${inquiryDate || 'an upcoming day'} for ${inquiryGuests} guests. Notes: ${inquiryMessage || 'None'}`;
    const url = getWhatsAppOrderUrl(formattedMsg);
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="visit" className="relative py-24 sm:py-32 bg-[#1A100B] text-[#F6F0E6] overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#B87943]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24150F] border border-[#B87943]/30 text-[#D8C3A5] text-xs font-sans tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B87943]" />
            <span>VISIT US</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F6F0E6] leading-tight mb-5">
            Your Next <span className="italic text-[#B87943]">Coffee Stop.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8C3A5] font-sans font-light">
            We are nestled right in your neighborhood. Walk in for your morning brew or stay for an easy afternoon.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Location Details & Quick Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Address Card */}
              <div className="p-6 rounded-2xl bg-[#24150F] border border-[#B87943]/30 hover:border-[#B87943] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#B87943]/20 text-[#B87943] flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#F6F0E6] mb-2">Our Location</h3>
                  <p className="text-sm text-[#D8C3A5] font-sans leading-relaxed">
                    {businessConfig.address.street}
                  </p>
                  <p className="text-sm text-[#D8C3A5] font-sans">
                    {businessConfig.address.cityAndPin}
                  </p>
                  {businessConfig.address.landmark && (
                    <p className="text-xs text-[#B87943] font-sans mt-2">
                      {businessConfig.address.landmark}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-white/5">
                  <a
                    href={businessConfig.links.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B87943] hover:text-[#d19159] transition-colors uppercase tracking-wider"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="p-6 rounded-2xl bg-[#24150F] border border-[#B87943]/30 hover:border-[#B87943] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#B87943]/20 text-[#B87943] flex items-center justify-center mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#F6F0E6] mb-2">Opening Hours</h3>
                  <p className="text-sm text-[#D8C3A5] font-sans leading-relaxed">
                    {businessConfig.hours.weekdays}
                  </p>
                  <p className="text-sm text-[#D8C3A5] font-sans">
                    {businessConfig.hours.weekends}
                  </p>
                  {businessConfig.hours.note && (
                    <p className="text-xs text-[#B87943] font-sans mt-2">
                      {businessConfig.hours.note}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-white/5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#77785A] font-semibold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#77785A]" />
                    <span>Open Today</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons Row */}
            <div className="p-6 rounded-2xl bg-[#24150F] border border-[#B87943]/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B87943]/20 text-[#B87943] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase text-[#D8C3A5]/60 font-sans tracking-wider">Direct Dial</p>
                  <p className="font-serif text-base font-bold text-[#F6F0E6]">
                    {businessConfig.contact.phoneDisplay}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${businessConfig.contact.phone}`}
                  className="px-4 py-2 rounded-full border border-[#D8C3A5]/40 hover:border-[#B87943] text-xs font-semibold text-[#F6F0E6] hover:text-[#B87943] transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-[#B87943] hover:bg-[#a36836] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Café Amenities Pill Bar */}
            <div className="p-4 rounded-xl bg-[#130D0A] border border-white/5 flex flex-wrap items-center justify-around gap-4 text-xs text-[#D8C3A5]">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-[#B87943]" />
                <span>Complimentary High-Speed Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#B87943]" />
                <span>Indoor & Terrace Seating</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#B87943]" />
                <span>Pet-Friendly Outdoor Patio</span>
              </div>
            </div>

            {/* Owner Editable Notice */}
            <div className="p-3.5 rounded-xl bg-[#130D0A]/70 border border-[#B87943]/20 text-xs text-[#D8C3A5]/80">
              <span className="font-semibold text-[#B87943]">Note for Preeti Coffee Shop Owner:</span>{' '}
              Address, telephone, and map link can be customized anytime in{' '}
              <code className="text-[#F6F0E6] bg-black/40 px-1 py-0.5 rounded">src/data/config.ts</code>.
            </div>
          </div>

          {/* Right Column: Quick Visit Inquiry / Reservation Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-[#24150F] border border-[#B87943]/40 shadow-2xl relative">
              <div className="flex items-center gap-2 text-xs uppercase font-sans tracking-widest text-[#B87943] mb-2 font-semibold">
                <Calendar className="w-4 h-4" />
                <span>RESERVE OR INQUIRE</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F6F0E6] mb-2">
                Planning a Visit?
              </h3>
              <p className="text-xs sm:text-sm text-[#D8C3A5] font-sans mb-6">
                Let our team know in advance for group tables, coffee tasting flights, or private corners.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D8C3A5]/80 font-sans mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Sharma"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#130D0A] border border-[#B87943]/30 text-sm text-[#F6F0E6] placeholder-[#D8C3A5]/40 focus:outline-none focus:border-[#B87943]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D8C3A5]/80 font-sans mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={inquiryDate}
                      onChange={(e) => setInquiryDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#130D0A] border border-[#B87943]/30 text-sm text-[#F6F0E6] focus:outline-none focus:border-[#B87943]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D8C3A5]/80 font-sans mb-1.5">
                      Guests
                    </label>
                    <select
                      value={inquiryGuests}
                      onChange={(e) => setInquiryGuests(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#130D0A] border border-[#B87943]/30 text-sm text-[#F6F0E6] focus:outline-none focus:border-[#B87943]"
                    >
                      <option value="1">1 Person (Solo Pause)</option>
                      <option value="2">2 Guests (Table for Two)</option>
                      <option value="3-4">3 - 4 Guests</option>
                      <option value="5+">5+ Guests (Group)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D8C3A5]/80 font-sans mb-1.5">
                    Notes or Drink Preference
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Quiet corner table, almond milk preference..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#130D0A] border border-[#B87943]/30 text-sm text-[#F6F0E6] placeholder-[#D8C3A5]/40 focus:outline-none focus:border-[#B87943] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#B87943] hover:bg-[#a36836] text-white text-xs font-semibold tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request via WhatsApp</span>
                </button>

                {submitted && (
                  <p className="text-xs text-center text-[#77785A] mt-2 font-medium">
                    WhatsApp opened with your prefilled details!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
