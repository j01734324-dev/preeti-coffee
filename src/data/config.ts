/**
 * Preeti Coffee Shop — Business & Brand Configuration
 * All content, contact numbers, hours, and addresses can be easily updated here.
 */

export interface BusinessConfig {
  name: string;
  wordmark: string;
  tagline: string;
  subtagline: string;
  address: {
    street: string;
    cityAndPin: string;
    landmark?: string;
    isPlaceholder: boolean;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsappNumber: string; // digits only with country code, e.g., '15550192834'
    whatsappDisplay: string;
    email: string;
    isPlaceholder: boolean;
  };
  hours: {
    weekdays: string;
    weekends: string;
    note?: string;
  };
  links: {
    googleMapsUrl: string;
    instagramUrl: string;
    facebookUrl?: string;
  };
  features: {
    wifiAvailable: boolean;
    indoorOutdoorSeating: boolean;
    takeawayAvailable: boolean;
    petFriendly: boolean;
  };
}

export const businessConfig: BusinessConfig = {
  name: "Preeti Coffee Shop",
  wordmark: "PREETI",
  tagline: "A Little Pause. A Better Brew.",
  subtagline: "Your everyday escape, served one cup at a time.",
  address: {
    street: "14 Artisanal Lane, Roasted Oak Quarter",
    cityAndPin: "Metro City, PIN: 110001 (Editable in config.ts)",
    landmark: "Opposite The Botanical Conservatory",
    isPlaceholder: true, // Marked for owner replacement
  },
  contact: {
    phone: "+15550192834",
    phoneDisplay: "+1 (555) 019-2834",
    whatsappNumber: "15550192834",
    whatsappDisplay: "+1 (555) 019-2834",
    email: "hello@preeticoffeeshop.com",
    isPlaceholder: true,
  },
  hours: {
    weekdays: "Mon – Fri: 7:00 AM – 9:00 PM",
    weekends: "Sat – Sun: 8:00 AM – 10:00 PM",
    note: "Fresh bakery batches out at 8:00 AM & 3:30 PM daily",
  },
  links: {
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Preeti+Coffee+Shop",
    instagramUrl: "https://www.instagram.com/",
    facebookUrl: "https://www.facebook.com/",
  },
  features: {
    wifiAvailable: true,
    indoorOutdoorSeating: true,
    takeawayAvailable: true,
    petFriendly: true,
  },
};

/**
 * Generates a direct WhatsApp link with a prefilled message for inquiry or ordering.
 */
export function getWhatsAppOrderUrl(message?: string): string {
  const defaultMsg = encodeURIComponent(
    message || `Hello Preeti Coffee Shop! I'd like to ask about your menu and place an order.`
  );
  return `https://wa.me/${businessConfig.contact.whatsappNumber}?text=${defaultMsg}`;
}
