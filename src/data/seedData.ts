import { Product, MenuItem, RestaurantTable, RestaurantOrder, BusinessArticle, BookingService, Appointment, Order } from '../types/demos';

export const INITIAL_ECOMMERCE_ORDERS: Order[] = [
  {
    id: 'ORD-SN849201',
    customerName: 'Rahim Chowdhury',
    email: 'rahim.bd@gmail.com',
    phone: '01819-234567',
    address: 'House 14, Road 5, Sector 3, Uttara',
    city: 'Dhaka',
    paymentMethod: 'bkash',
    transactionId: 'TRX9182746',
    items: [
      {
        productId: 'prod-1',
        productName: 'NovaSound Pro ANC Studio Headphones',
        price: 8500,
        quantity: 1
      }
    ],
    subtotal: 8500,
    discount: 850,
    deliveryCharge: 60,
    total: 7710,
    status: 'shipped',
    statusLog: [
      {
        status: 'placed',
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
        note: 'Order placed by customer via bKash'
      },
      {
        status: 'confirmed',
        timestamp: new Date(Date.now() - 3600000 * 17.5).toISOString(),
        note: 'bKash TrxID TRX9182746 verified. Items packed at Banani Hub'
      },
      {
        status: 'shipped',
        timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
        note: 'Package assigned to Pathao Express rider (Tracking: PTH-849201BD)'
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: 'ORD-SN739102',
    customerName: 'Nusrat Jahan',
    email: 'nusrat.j@example.com',
    phone: '01712-987654',
    address: 'Flat 4B, South Breeze Square, Dhanmondi 27',
    city: 'Dhaka',
    paymentMethod: 'nagad',
    transactionId: 'NAG7823901',
    items: [
      {
        productId: 'prod-2',
        productName: 'NovaPulse Ultra Titanium Smartwatch',
        price: 6200,
        quantity: 1
      },
      {
        productId: 'prod-4',
        productName: 'NovaBass 360 Acoustic Cylinder Speaker',
        price: 5400,
        quantity: 1
      }
    ],
    subtotal: 11600,
    discount: 1160,
    deliveryCharge: 60,
    total: 10500,
    status: 'confirmed',
    statusLog: [
      {
        status: 'placed',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        note: 'Order placed by customer via Nagad'
      },
      {
        status: 'confirmed',
        timestamp: new Date(Date.now() - 3600000 * 3.8).toISOString(),
        note: 'Nagad payment confirmed. Preparing for courier dispatch'
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'NovaSound Pro ANC Studio Headphones',
    category: 'Audio',
    price: 8500,
    originalPrice: 10500,
    rating: 4.9,
    reviewsCount: 128,
    stock: 15,
    description: 'Flagship hybrid active noise cancelling headphones with custom 40mm titanium drivers, 45-hour battery life, and ultra-low latency wireless audio streaming.',
    features: ['Hybrid 42dB Active Noise Cancellation', '45h Playtime with Quick Charge', 'Hi-Res Certified Wireless Audio', 'Plush Memory Foam Earcups'],
    color: '#0284c7',
    modelType: 'headphones',
    isNew: true
  },
  {
    id: 'prod-2',
    name: 'NovaPulse Ultra Titanium Smartwatch',
    category: 'Wearables',
    price: 6200,
    originalPrice: 7500,
    rating: 4.8,
    reviewsCount: 94,
    stock: 22,
    description: 'Aerospace-grade titanium casing with always-on AMOLED display, comprehensive heart rate & SpO2 tracking, GPS navigation, and 7-day battery life.',
    features: ['1.43-inch Sapphire AMOLED Display', 'ECG, Heart Rate & Blood Oxygen Monitor', '5ATM Water Resistant', 'Dual-Frequency GPS Tracking'],
    color: '#0f172a',
    modelType: 'smartwatch',
    isNew: true
  },
  {
    id: 'prod-3',
    name: 'Lumina 75% Custom Wireless Mechanical Keyboard',
    category: 'Workspace',
    price: 7800,
    originalPrice: 9200,
    rating: 5.0,
    reviewsCount: 76,
    stock: 9,
    description: 'Gasket-mounted aluminum body keyboard with pre-lubed linear switches, hot-swappable PCB, south-facing RGB, and tri-mode Bluetooth/2.4G/USB connectivity.',
    features: ['Gasket Mount Structure with Sound Dampening', 'Hot-Swappable 5-pin Sockets', 'PBT Dye-Sub Keycaps', '4000mAh Battery with Tri-mode Connectivity'],
    color: '#06b6d4',
    modelType: 'keyboard',
    isNew: false
  },
  {
    id: 'prod-4',
    name: 'NovaBass 360 Acoustic Cylinder Speaker',
    category: 'Audio',
    price: 5400,
    originalPrice: 6500,
    rating: 4.7,
    reviewsCount: 63,
    stock: 18,
    description: 'Room-filling 360-degree omnidirectional acoustic driver with passive dual radiators for deep punchy bass, IP67 waterproof rating, and 24h battery.',
    features: ['360° Omnidirectional Room Audio', 'IP67 Waterproof & Dustproof', 'Dual Bass Radiators', 'True Wireless Stereo Pairing'],
    color: '#3b82f6',
    modelType: 'speaker',
    isNew: false
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'm-1',
    name: 'Truffle Brioche Angus Burger',
    category: 'Burgers',
    price: 650,
    description: 'Double smashed Black Angus beef patties, aged cheddar cheese, caramelized balsamic onions, and black truffle garlic aioli on a toasted butter brioche bun.',
    isVeg: false,
    isSpicy: false,
    isAvailable: true,
    preparationTime: '12-15 min',
    rating: 4.9,
    calories: 720
  },
  {
    id: 'm-2',
    name: 'Smoky Firehouse Jalapeño Burger',
    category: 'Burgers',
    price: 580,
    description: 'Crispy seasoned chicken fillet or beef patty with smoked gouda, charred pickled jalapeños, and signature house ghost chili glaze.',
    isVeg: false,
    isSpicy: true,
    isAvailable: true,
    preparationTime: '10-14 min',
    rating: 4.8,
    calories: 680
  },
  {
    id: 'm-3',
    name: 'Classic Neapolitan Buffalo Margherita Pizza',
    category: 'Pizzas',
    price: 820,
    description: 'San Marzano Italian tomato sauce, fresh buffalo mozzarella, fragrant sweet basil leaves, and cold-pressed extra virgin olive oil on 48h fermented sourdough crust.',
    isVeg: true,
    isSpicy: false,
    isAvailable: true,
    preparationTime: '15-18 min',
    rating: 4.9,
    calories: 890
  },
  {
    id: 'm-4',
    name: 'Diablo Spicy Pepperoni Sourdough Pizza',
    category: 'Pizzas',
    price: 940,
    description: 'Spicy beef pepperoni ribbons, smoked provolone, roasted chili flakes, and hot honey drizzle on charred artisan sourdough.',
    isVeg: false,
    isSpicy: true,
    isAvailable: true,
    preparationTime: '15-20 min',
    rating: 4.9,
    calories: 960
  },
  {
    id: 'm-5',
    name: 'Wild Forest Truffle Risotto',
    category: 'Gourmet Mains',
    price: 790,
    description: 'Creamy Carnaroli arborio rice slow-stirred with sautéed porcini and shiitake mushrooms, Parmigiano-Reggiano, and white truffle emulsion.',
    isVeg: true,
    isSpicy: false,
    isAvailable: true,
    preparationTime: '18-22 min',
    rating: 4.8,
    calories: 610
  },
  {
    id: 'm-6',
    name: 'Slow-Braised Rosemary Lamb Shank',
    category: 'Gourmet Mains',
    price: 1350,
    description: 'Tender New Zealand lamb shank simmered for 6 hours in rich rosemary red reduction, served over garlic whipped potato puree and roasted Dutch carrots.',
    isVeg: false,
    isSpicy: false,
    isAvailable: true,
    preparationTime: '20-25 min',
    rating: 5.0,
    calories: 840
  },
  {
    id: 'm-7',
    name: 'Blue Ocean Citrus Fizz',
    category: 'Beverages',
    price: 260,
    description: 'Refreshing sparkling mocktail crafted with blue curaçao botanical syrup, fresh kaffir lime juice, fresh mint, and chilled sparkling soda.',
    isVeg: true,
    isSpicy: false,
    isAvailable: true,
    preparationTime: '4-6 min',
    rating: 4.7,
    calories: 140
  },
  {
    id: 'm-8',
    name: 'Valrhona Molten Dark Chocolate Soufflé',
    category: 'Desserts',
    price: 390,
    description: 'Warm French molten dark chocolate cake with an oozy chocolate center, served with Madagascan vanilla bean gelato.',
    isVeg: true,
    isSpicy: false,
    isAvailable: true,
    preparationTime: '10-12 min',
    rating: 5.0,
    calories: 450
  }
];

export const INITIAL_TABLES: RestaurantTable[] = [
  { id: 1, name: 'Table 1 (Window View)', seats: 2, status: 'available' },
  { id: 2, name: 'Table 2 (Center Dining)', seats: 4, status: 'available' },
  { id: 3, name: 'Table 3 (Cozy Booth)', seats: 4, status: 'occupied' },
  { id: 4, name: 'Table 4 (Garden Terrace)', seats: 6, status: 'available' },
  { id: 5, name: 'Table 5 (VIP Alcove)', seats: 4, status: 'occupied' },
  { id: 6, name: 'Table 6 (High Top Bar)', seats: 2, status: 'available' }
];

export const INITIAL_RESTAURANT_ORDERS: RestaurantOrder[] = [
  {
    id: 'ORD-9821',
    tableNumber: 3,
    customerName: 'Rahim Ahmed',
    items: [
      { itemId: 'm-1', name: 'Truffle Brioche Angus Burger', price: 650, quantity: 2, specialInstructions: 'Medium well, extra napkins' },
      { itemId: 'm-7', name: 'Blue Ocean Citrus Fizz', price: 260, quantity: 2 }
    ],
    total: 1820,
    status: 'preparing',
    paymentMethod: 'counter',
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
    waiterCalled: false
  },
  {
    id: 'ORD-9822',
    tableNumber: 5,
    customerName: 'Nusrat Jahan',
    items: [
      { itemId: 'm-3', name: 'Classic Neapolitan Buffalo Margherita Pizza', price: 820, quantity: 1 },
      { itemId: 'm-8', name: 'Valrhona Molten Dark Chocolate Soufflé', price: 390, quantity: 2 }
    ],
    total: 1600,
    status: 'new',
    paymentMethod: 'online',
    createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
    waiterCalled: true
  }
];

export const INITIAL_BUSINESS_ARTICLES: BusinessArticle[] = [
  {
    id: 'art-1',
    title: 'How Next-Gen Web Architecture Cuts E-Commerce Bounce Rates by 42%',
    category: 'Web Engineering',
    readTime: '4 min read',
    excerpt: 'Modern consumers abandon slow pages in under 2.5 seconds. Learn how sub-second asset hydration and edge servers drive conversions.',
    content: 'Speed is not merely a technical vanity metric; for small and medium retailers in emerging markets, every 100ms shaved from load latency elevates checkout completion rates by 7%...',
    publishedAt: 'Oct 2024'
  },
  {
    id: 'art-2',
    title: 'Securing SMB Web Applications Against Automated Credential Stuffing',
    category: 'Cybersecurity',
    readTime: '6 min read',
    excerpt: 'Actionable defense strategies: Rate-limiting, cryptographic token rotation, and SQL injection sanitization for growing businesses.',
    content: 'Security breaches are catastrophic for small enterprises. A thorough vulnerability assessment reveals that 80% of exploits target unpatched endpoints and default configuration flaws...',
    publishedAt: 'Nov 2024'
  }
];

export const INITIAL_BOOKING_SERVICES: BookingService[] = [
  {
    id: 'srv-1',
    name: 'Executive Precision Hair Styling & Scalp Treatment',
    category: 'Salon & Spa',
    durationMinutes: 45,
    price: 1800,
    practitioner: 'Senior Stylist Fahim',
    description: 'Consultation, scalp detox massage, precision cut, hot towel treatment, and luxury styling.'
  },
  {
    id: 'srv-2',
    name: 'Comprehensive Dental Health Check & Ultrasonic Scaling',
    category: 'Healthcare Clinic',
    durationMinutes: 30,
    price: 2500,
    practitioner: 'Dr. S. K. Roy, BDS',
    description: 'Digital intraoral imaging, full mouth ultrasonic scaling, stain polish, and oral hygiene prescription.'
  },
  {
    id: 'srv-3',
    name: 'Deluxe Suite Reservation (1 Night Stay w/ Breakfast)',
    category: 'Boutique Hotel',
    durationMinutes: 1440,
    price: 7500,
    practitioner: 'Concierge Team',
    description: 'King bed suite with panoramic city skyline view, complimentary artisan buffet breakfast, high-speed WiFi, and late checkout.'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-4401',
    serviceId: 'srv-1',
    serviceName: 'Executive Precision Hair Styling & Scalp Treatment',
    customerName: 'Tanvir Hossain',
    customerEmail: 'tanvir.h@example.com',
    customerPhone: '+880 1712-345678',
    date: '2026-10-02',
    timeSlot: '11:00 AM',
    notes: 'Please keep sides short',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];
