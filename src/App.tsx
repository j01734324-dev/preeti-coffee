/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { MenuSection } from './components/MenuSection';
import { SignatureSection } from './components/SignatureSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { OrderDrawer, OrderItemEntry } from './components/OrderDrawer';
import { MenuItem } from './data/menu';
import { businessConfig } from './data/config';

export default function App() {
  const [orderEntries, setOrderEntries] = useState<OrderItemEntry[]>([]);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);

  // Add menu item to order list
  const handleAddToCart = (item: MenuItem) => {
    setOrderEntries((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  // Modify quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setOrderEntries((prev) =>
      prev
        .map((entry) => {
          if (entry.item.id === id) {
            const newQty = entry.quantity + delta;
            return newQty > 0 ? { ...entry, quantity: newQty } : null;
          }
          return entry;
        })
        .filter((entry): entry is OrderItemEntry => entry !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setOrderEntries((prev) => prev.filter((entry) => entry.item.id !== id));
  };

  const handleClearOrder = () => {
    setOrderEntries([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = orderEntries.reduce((sum, entry) => sum + entry.quantity, 0);

  // Structured Data Schema.org for Café
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: businessConfig.name,
    description: businessConfig.subtagline,
    telephone: businessConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessConfig.address.street,
      addressLocality: businessConfig.address.cityAndPin,
    },
    openingHours: ['Mo-Fr 07:00-21:00', 'Sa-Su 08:00-22:00'],
    servesCuisine: 'Artisanal Coffee, Pastries, Teas',
    priceRange: '$$',
  };

  return (
    <div className="min-h-screen bg-[#130D0A] text-[#F6F0E6] flex flex-col antialiased selection:bg-[#B87943] selection:text-white">
      {/* JSON-LD Structured Data for Local Business SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Global Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsOrderDrawerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onExploreMenu={() => scrollToSection('menu')}
          onFindCafe={() => scrollToSection('visit')}
        />

        <StorySection />

        <MenuSection
          onAddToCart={handleAddToCart}
          cartItems={orderEntries.map((e) => e.item)}
        />

        <SignatureSection />

        <GallerySection />

        <AboutSection />

        <VisitSection />
      </main>

      {/* Footer & Final Call to Action */}
      <Footer
        onExploreMenu={() => scrollToSection('menu')}
        onFindCafe={() => scrollToSection('visit')}
      />

      {/* Slide-over Order Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        orderEntries={orderEntries}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        onExploreMenu={() => scrollToSection('menu')}
      />
    </div>
  );
}
