export interface MenuItem {
  id: string;
  name: string;
  category: 'hot' | 'cold' | 'signature' | 'snacks' | 'tea';
  description: string;
  tastingNotes?: string[];
  priceDisplay: string; // Clearly editable placeholder or price
  isSignature?: boolean;
  isPopular?: boolean;
  image: string;
  calories?: string;
}

export type MenuCategory = 'all' | 'hot' | 'cold' | 'signature' | 'snacks' | 'tea';

export const MENU_CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'all', label: 'All Creations' },
  { id: 'hot', label: 'Hot Coffee' },
  { id: 'cold', label: 'Cold Brew & Iced' },
  { id: 'signature', label: 'Signature Moments' },
  { id: 'tea', label: 'Artisanal Teas' },
  { id: 'snacks', label: 'Bakery & Bites' },
];

export const menuItems: MenuItem[] = [
  {
    id: 'caramel-affogato-noir',
    name: 'Caramel Affogato Noir',
    category: 'signature',
    description: 'Double ristretto espresso poured over handcrafted vanilla bean gelato, finished with sea-salted caramel drizzle and crushed roasted hazelnut.',
    tastingNotes: ['Bourbon Vanilla', 'Salted Caramel', 'Velvety Crema'],
    priceDisplay: 'Price to be added', // Owner editable placeholder
    isSignature: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'single-origin-espresso',
    name: 'Single Origin Espresso',
    category: 'hot',
    description: 'Extracted precisely at 9 bars of pressure. Characterized by a thick hazelnut-colored crema, vibrant fruit acidity, and deep cocoa undertones.',
    tastingNotes: ['Dark Chocolate', 'Ripe Berry', 'Toasted Almond'],
    priceDisplay: 'Price to be added',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'velvet-cappuccino',
    name: 'Velvet Cappuccino',
    category: 'hot',
    description: 'Equal parts single-origin espresso, steamed organic whole milk, and dense micro-foam dusted with raw Peruvian cocoa nibs.',
    tastingNotes: ['Creamy Cocoa', 'Honeycomb', 'Silky Body'],
    priceDisplay: 'Price to be added',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'artisanal-cafe-latte',
    name: 'Artisanal Café Latte',
    category: 'hot',
    description: 'A harmonious pour of mellow espresso and velvety steamed milk with delicate pour-over latte art. Sweet, comforting, and smooth.',
    tastingNotes: ['Sweet Milk', 'Nutmeg', 'Soft Caramel'],
    priceDisplay: 'Price to be added',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'belgian-dark-mocha',
    name: 'Belgian Dark Mocha',
    category: 'hot',
    description: 'Slow-melted 70% dark Belgian chocolate whisked into freshly pulled espresso and steamed milk, capped with chantilly cream.',
    tastingNotes: ['70% Dark Chocolate', 'Roasted Espresso', 'Brown Sugar'],
    priceDisplay: 'Price to be added',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'spiced-cardamom-cold-coffee',
    name: 'Spiced Cardamom Cold Coffee',
    category: 'cold',
    description: 'Our house specialty: double-strength cold extraction blended with sweet condensed milk, ice, and freshly crushed green cardamom pods.',
    tastingNotes: ['Aromatic Cardamom', 'Sweet Toffee', 'Iced Silk'],
    priceDisplay: 'Price to be added',
    isSignature: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'hazelnut-nitro-cold-brew',
    name: 'Hazelnut Cold Brew',
    category: 'cold',
    description: 'Steeped for 18 hours in cold filtered mountain water. Infused with natural roasted hazelnut notes for a crisp, low-acidity glass.',
    tastingNotes: ['Toasted Hazelnut', 'Molasses', 'Clean Finish'],
    priceDisplay: 'Price to be added',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'salted-caramel-frappe',
    name: 'Salted Caramel Cold Frappé',
    category: 'cold',
    description: 'Frosty blended cold coffee churned with house caramel sauce, crystal sea salt, and whipped cream topping.',
    tastingNotes: ['Buttery Caramel', 'Sea Salt', 'Crisp Ice'],
    priceDisplay: 'Price to be added',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'kashmiri-saffron-chai',
    name: 'Saffron & Spiced Reserve Tea',
    category: 'tea',
    description: 'First-flush Assam black leaves brewed with roasted cinnamon, ginger, whole cloves, and crushed Kashmiri saffron strands.',
    tastingNotes: ['Golden Saffron', 'Wild Cinnamon', 'Warm Ginger'],
    priceDisplay: 'Price to be added',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'ceremonial-matcha-latte',
    name: 'Uji Matcha Cloud Latte',
    category: 'tea',
    description: 'Stone-ground ceremonial Uji matcha whisked with warm oat milk and crowned with a delicate vanilla cream cloud.',
    tastingNotes: ['Sweet Umami', 'Floral Grass', 'Creamy Vanilla'],
    priceDisplay: 'Price to be added',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'almond-frangipane-croissant',
    name: 'Artisanal Almond Croissant',
    category: 'snacks',
    description: 'Twice-baked French butter croissant filled with luscious almond frangipane cream and toasted sliced almonds.',
    tastingNotes: ['Flaky Butter', 'Toasted Almond', 'Vanilla Bean'],
    priceDisplay: 'Price to be added',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'sourdough-brioche-toast',
    name: 'Espresso Butter Brioche',
    category: 'snacks',
    description: 'Thick toasted artisanal sourdough brioche served warm with churned espresso sea-salt butter and fresh blackberry preserve.',
    tastingNotes: ['Golden Crust', 'Espresso Salt', 'Tangy Berry'],
    priceDisplay: 'Price to be added',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=900&auto=format&fit=crop',
  },
];
