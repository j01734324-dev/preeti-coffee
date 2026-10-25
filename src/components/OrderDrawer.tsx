import React, { useState } from 'react';
import { MenuItem } from '../data/menu';
import { getWhatsAppOrderUrl, businessConfig } from '../data/config';
import { X, Trash2, Plus, Minus, MessageSquare, Coffee, Sparkles } from 'lucide-react';

export interface OrderItemEntry {
  item: MenuItem;
  quantity: number;
  milkChoice?: string;
  notes?: string;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderEntries: OrderItemEntry[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
  onExploreMenu: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  orderEntries,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  onExploreMenu,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');

  if (!isOpen) return null;

  const totalItems = orderEntries.reduce((acc, entry) => acc + entry.quantity, 0);

  const handleSendWhatsAppOrder = () => {
    if (orderEntries.length === 0) return;

    let text = `*New Order Inquiry for Preeti Coffee Shop*\n`;
    if (customerName.trim()) {
      text += `*Customer:* ${customerName.trim()}\n`;
    }
    text += `*Order Type:* ${orderType === 'dine-in' ? 'Dine-In' : 'Takeaway'}\n\n`;
    text += `*Items:*\n`;

    orderEntries.forEach((entry, i) => {
      text += `${i + 1}. *${entry.item.name}* x ${entry.quantity}\n`;
      if (entry.milkChoice) {
        text += `   - Milk: ${entry.milkChoice}\n`;
      }
    });

    text += `\n*Please confirm availability and preparation time. Thank you!*`;

    const url = getWhatsAppOrderUrl(text);
    window.open(url, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#1A100B] text-[#F6F0E6] h-full shadow-2xl flex flex-col border-l border-[#B87943]/30 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#B87943]/20 flex items-center justify-between bg-[#24150F]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#B87943]/20 text-[#B87943] flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#F6F0E6]">Your Order List</h3>
              <p className="text-[11px] text-[#D8C3A5] font-sans">
                {totalItems} item{totalItems !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#D8C3A5] hover:text-white transition-colors cursor-pointer"
            aria-label="Close Order Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orderEntries.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#24150F] border border-[#B87943]/30 flex items-center justify-center text-[#B87943] mb-4">
                <Coffee className="w-8 h-8 opacity-70" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#F6F0E6] mb-2">
                Your cup is waiting
              </h4>
              <p className="text-xs text-[#D8C3A5] font-sans max-w-xs mb-6">
                Browse our handcrafted espresso, cold brews, and fresh bakery selections to add them to your order.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreMenu();
                }}
                className="px-6 py-2.5 rounded-full bg-[#B87943] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#a36836] transition-colors"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <>
              {/* Order Items List */}
              <div className="space-y-3">
                {orderEntries.map((entry) => (
                  <div
                    key={entry.item.id}
                    className="p-3.5 rounded-xl bg-[#24150F] border border-[#B87943]/20 flex items-center gap-3"
                  >
                    <img
                      src={entry.item.image}
                      alt={entry.item.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif font-bold text-sm text-[#F6F0E6] truncate">
                        {entry.item.name}
                      </h5>
                      <span className="text-[10px] text-[#B87943] font-sans">
                        {entry.item.priceDisplay}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-[#B87943]/30 rounded-lg overflow-hidden bg-[#130D0A]">
                          <button
                            onClick={() => onUpdateQuantity(entry.item.id, -1)}
                            className="px-2 py-1 text-xs text-[#D8C3A5] hover:text-white hover:bg-white/5 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold text-[#F6F0E6]">
                            {entry.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(entry.item.id, 1)}
                            className="px-2 py-1 text-xs text-[#D8C3A5] hover:text-white hover:bg-white/5 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(entry.item.id)}
                          className="text-xs text-[#D8C3A5]/50 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div className="p-4 rounded-xl bg-[#24150F]/70 border border-[#B87943]/20 space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D8C3A5]/70 font-sans mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Siddharth"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#130D0A] border border-[#B87943]/30 text-xs text-[#F6F0E6] focus:outline-none focus:border-[#B87943]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D8C3A5]/70 font-sans mb-1">
                    Order Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('dine-in')}
                      className={`py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                        orderType === 'dine-in'
                          ? 'border-[#B87943] bg-[#B87943]/20 text-white'
                          : 'border-white/10 text-[#D8C3A5] hover:bg-white/5'
                      }`}
                    >
                      Dine In
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                        orderType === 'takeaway'
                          ? 'border-[#B87943] bg-[#B87943]/20 text-white'
                          : 'border-white/10 text-[#D8C3A5] hover:bg-white/5'
                      }`}
                    >
                      Takeaway
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {orderEntries.length > 0 && (
          <div className="p-5 border-t border-[#B87943]/20 bg-[#24150F] space-y-3">
            <button
              onClick={handleSendWhatsAppOrder}
              className="w-full py-3.5 rounded-xl bg-[#B87943] hover:bg-[#a36836] text-white text-xs font-semibold tracking-wide uppercase shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Order via WhatsApp</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-[#D8C3A5]/70">
              <button
                onClick={onClearOrder}
                className="hover:text-red-400 transition-colors cursor-pointer"
              >
                Clear all items
              </button>
              <span>Instant direct chat with café staff</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
