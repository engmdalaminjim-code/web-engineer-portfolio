// E-COMMERCE TYPES
export interface Product {
  id: string;
  name: string;
  category: 'Audio' | 'Wearables' | 'Workspace' | 'Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  description: string;
  features: string[];
  color: string;
  modelType: 'headphones' | 'smartwatch' | 'keyboard' | 'speaker';
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  transactionId?: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  status: 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  statusLog?: {
    status: Order['status'];
    timestamp: string;
    note: string;
  }[];
  driverNotes?: string;
  deliveryNotes?: string;
  createdAt: string;
}

// RESTAURANT TYPES
export interface MenuItem {
  id: string;
  name: string;
  category: 'Burgers' | 'Pizzas' | 'Gourmet Mains' | 'Beverages' | 'Desserts';
  price: number;
  description: string;
  isVeg: boolean;
  isSpicy: boolean;
  isAvailable: boolean;
  preparationTime: string;
  rating: number;
  calories?: number;
}

export interface RestaurantTable {
  id: number;
  name: string;
  seats: number;
  status: 'available' | 'occupied' | 'reserved';
}

export interface RestaurantOrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export interface RestaurantOrder {
  id: string;
  tableNumber: number;
  customerName?: string;
  items: RestaurantOrderItem[];
  total: number;
  status: 'new' | 'preparing' | 'ready' | 'served' | 'paid';
  paymentMethod: 'counter' | 'online';
  createdAt: string;
  waiterCalled?: boolean;
}

// BUSINESS TYPES
export interface BusinessArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  publishedAt: string;
}

export interface BusinessInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  serviceNeeded: string;
  message: string;
  createdAt: string;
}

// BOOKING TYPES
export interface BookingService {
  id: string;
  name: string;
  category: 'Salon & Spa' | 'Healthcare Clinic' | 'Boutique Hotel';
  durationMinutes: number;
  price: number;
  practitioner: string;
  description: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}
