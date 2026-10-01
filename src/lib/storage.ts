import {
  Product,
  Order,
  MenuItem,
  RestaurantTable,
  RestaurantOrder,
  BusinessArticle,
  BusinessInquiry,
  BookingService,
  Appointment
} from '../types/demos';
import {
  INITIAL_PRODUCTS,
  INITIAL_ECOMMERCE_ORDERS,
  INITIAL_MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_RESTAURANT_ORDERS,
  INITIAL_BUSINESS_ARTICLES,
  INITIAL_BOOKING_SERVICES,
  INITIAL_APPOINTMENTS
} from '../data/seedData';
import { soundManager } from './sound';

type Listener = () => void;

class AppStorage {
  private listeners: Map<string, Set<Listener>> = new Map();

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem('alamin_products')) {
      localStorage.setItem('alamin_products', JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem('alamin_ecommerce_orders')) {
      localStorage.setItem('alamin_ecommerce_orders', JSON.stringify(INITIAL_ECOMMERCE_ORDERS));
    }
    if (!localStorage.getItem('alamin_menu_items')) {
      localStorage.setItem('alamin_menu_items', JSON.stringify(INITIAL_MENU_ITEMS));
    }
    if (!localStorage.getItem('alamin_tables')) {
      localStorage.setItem('alamin_tables', JSON.stringify(INITIAL_TABLES));
    }
    if (!localStorage.getItem('alamin_restaurant_orders')) {
      localStorage.setItem('alamin_restaurant_orders', JSON.stringify(INITIAL_RESTAURANT_ORDERS));
    }
    if (!localStorage.getItem('alamin_business_articles')) {
      localStorage.setItem('alamin_business_articles', JSON.stringify(INITIAL_BUSINESS_ARTICLES));
    }
    if (!localStorage.getItem('alamin_business_inquiries')) {
      localStorage.setItem('alamin_business_inquiries', JSON.stringify([]));
    }
    if (!localStorage.getItem('alamin_booking_services')) {
      localStorage.setItem('alamin_booking_services', JSON.stringify(INITIAL_BOOKING_SERVICES));
    }
    if (!localStorage.getItem('alamin_appointments')) {
      localStorage.setItem('alamin_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
    }
    if (!localStorage.getItem('alamin_contact_leads')) {
      localStorage.setItem('alamin_contact_leads', JSON.stringify([]));
    }
  }

  public subscribe(key: string, listener: Listener): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(listener);
    return () => {
      this.listeners.get(key)?.delete(listener);
    };
  }

  private notify(key: string) {
    this.listeners.get(key)?.forEach((fn) => fn());
  }

  public resetAllData() {
    if (typeof window === 'undefined') return;
    localStorage.setItem('alamin_products', JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem('alamin_ecommerce_orders', JSON.stringify(INITIAL_ECOMMERCE_ORDERS));
    localStorage.setItem('alamin_menu_items', JSON.stringify(INITIAL_MENU_ITEMS));
    localStorage.setItem('alamin_tables', JSON.stringify(INITIAL_TABLES));
    localStorage.setItem('alamin_restaurant_orders', JSON.stringify(INITIAL_RESTAURANT_ORDERS));
    localStorage.setItem('alamin_business_articles', JSON.stringify(INITIAL_BUSINESS_ARTICLES));
    localStorage.setItem('alamin_business_inquiries', JSON.stringify([]));
    localStorage.setItem('alamin_booking_services', JSON.stringify(INITIAL_BOOKING_SERVICES));
    localStorage.setItem('alamin_appointments', JSON.stringify(INITIAL_APPOINTMENTS));

    // Notify all listeners
    this.listeners.forEach((set) => set.forEach((fn) => fn()));
  }

  // --- E-COMMERCE ---
  public getProducts(): Product[] {
    this.ensureInitialized();
    try {
      return JSON.parse(localStorage.getItem('alamin_products') || '[]');
    } catch {
      return INITIAL_PRODUCTS;
    }
  }

  public saveProduct(product: Product) {
    const list = this.getProducts();
    const idx = list.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      list[idx] = product;
    } else {
      list.unshift(product);
    }
    localStorage.setItem('alamin_products', JSON.stringify(list));
    this.notify('products');
  }

  public deleteProduct(id: string) {
    const list = this.getProducts().filter((p) => p.id !== id);
    localStorage.setItem('alamin_products', JSON.stringify(list));
    this.notify('products');
  }

  public getEcommerceOrders(): Order[] {
    this.ensureInitialized();
    try {
      return JSON.parse(localStorage.getItem('alamin_ecommerce_orders') || '[]');
    } catch {
      return [];
    }
  }

  public placeEcommerceOrder(order: Order) {
    const list = this.getEcommerceOrders();
    if (!order.statusLog || order.statusLog.length === 0) {
      order.statusLog = [
        {
          status: 'placed',
          timestamp: order.createdAt || new Date().toISOString(),
          note: `Order registered in system · Payment via ${order.paymentMethod.toUpperCase()}`
        }
      ];
    }
    list.unshift(order);
    localStorage.setItem('alamin_ecommerce_orders', JSON.stringify(list));
    this.notify('ecommerce_orders');
    soundManager.playSuccessChime();
  }

  public updateEcommerceOrderStatus(orderId: string, status: Order['status'], customNote?: string) {
    const list = this.getEcommerceOrders();
    const target = list.find((o) => o.id === orderId);
    if (target) {
      target.status = status;
      if (!target.statusLog) {
        target.statusLog = [
          {
            status: 'placed',
            timestamp: target.createdAt,
            note: 'Order placed by customer'
          }
        ];
      }

      const defaultNotes: Record<Order['status'], string> = {
        placed: 'Order registered in system',
        confirmed: 'Payment verified & order confirmed for packaging',
        shipped: 'Handed over to Pathao Express courier (Tracking: PTH-' + target.id.slice(-6) + 'BD)',
        delivered: 'Package delivered to doorstep & signed by customer',
        cancelled: 'Order cancelled by customer or store admin'
      };

      target.statusLog.push({
        status,
        timestamp: new Date().toISOString(),
        note: customNote || defaultNotes[status]
      });

      localStorage.setItem('alamin_ecommerce_orders', JSON.stringify(list));
      this.notify('ecommerce_orders');
    }
  }

  public updateOrderDeliveryNotes(orderId: string, deliveryNotes: string) {
    const list = this.getEcommerceOrders();
    const target = list.find((o) => o.id === orderId);
    if (target) {
      target.deliveryNotes = deliveryNotes;
      target.driverNotes = deliveryNotes;
      localStorage.setItem('alamin_ecommerce_orders', JSON.stringify(list));
      this.notify('ecommerce_orders');
    }
  }

  public updateOrderDriverNotes(orderId: string, driverNotes: string) {
    this.updateOrderDeliveryNotes(orderId, driverNotes);
  }

  // --- RESTAURANT ---
  public getMenuItems(): MenuItem[] {
    this.ensureInitialized();
    try {
      return JSON.parse(localStorage.getItem('alamin_menu_items') || '[]');
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  }

  public saveMenuItem(item: MenuItem) {
    const list = this.getMenuItems();
    const idx = list.findIndex((m) => m.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    localStorage.setItem('alamin_menu_items', JSON.stringify(list));
    this.notify('menu_items');
  }

  public deleteMenuItem(id: string) {
    const list = this.getMenuItems().filter((m) => m.id !== id);
    localStorage.setItem('alamin_menu_items', JSON.stringify(list));
    this.notify('menu_items');
  }

  public getTables(): RestaurantTable[] {
    this.ensureInitialized();
    try {
      return JSON.parse(localStorage.getItem('alamin_tables') || '[]');
    } catch {
      return INITIAL_TABLES;
    }
  }

  public addTable(name: string, seats: number): RestaurantTable {
    const tables = this.getTables();
    const newId = tables.length > 0 ? Math.max(...tables.map((t) => t.id)) + 1 : 1;
    const newTable: RestaurantTable = { id: newId, name, seats, status: 'available' };
    tables.push(newTable);
    localStorage.setItem('alamin_tables', JSON.stringify(tables));
    this.notify('tables');
    return newTable;
  }

  public updateTableStatus(id: number, status: RestaurantTable['status']) {
    const tables = this.getTables();
    const target = tables.find((t) => t.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem('alamin_tables', JSON.stringify(tables));
      this.notify('tables');
    }
  }

  public getRestaurantOrders(): RestaurantOrder[] {
    this.ensureInitialized();
    try {
      return JSON.parse(localStorage.getItem('alamin_restaurant_orders') || '[]');
    } catch {
      return INITIAL_RESTAURANT_ORDERS;
    }
  }

  public placeRestaurantOrder(order: RestaurantOrder) {
    const list = this.getRestaurantOrders();
    list.unshift(order);
    localStorage.setItem('alamin_restaurant_orders', JSON.stringify(list));
    this.updateTableStatus(order.tableNumber, 'occupied');
    this.notify('restaurant_orders');
    soundManager.playKitchenChime();
  }

  public updateRestaurantOrderStatus(orderId: string, status: RestaurantOrder['status']) {
    const list = this.getRestaurantOrders();
    const target = list.find((o) => o.id === orderId);
    if (target) {
      target.status = status;
      localStorage.setItem('alamin_restaurant_orders', JSON.stringify(list));
      this.notify('restaurant_orders');
    }
  }

  public callWaiter(tableNumber: number) {
    const list = this.getRestaurantOrders();
    const activeOrder = list.find((o) => o.tableNumber === tableNumber && o.status !== 'paid');
    if (activeOrder) {
      activeOrder.waiterCalled = true;
      localStorage.setItem('alamin_restaurant_orders', JSON.stringify(list));
    }
    soundManager.playBell();
    this.notify('restaurant_orders');
  }

  public dismissWaiterCall(orderId: string) {
    const list = this.getRestaurantOrders();
    const target = list.find((o) => o.id === orderId);
    if (target) {
      target.waiterCalled = false;
      localStorage.setItem('alamin_restaurant_orders', JSON.stringify(list));
      this.notify('restaurant_orders');
    }
  }

  // --- BUSINESS ---
  public getBusinessArticles(): BusinessArticle[] {
    this.ensureInitialized();
    try {
      return JSON.parse(localStorage.getItem('alamin_business_articles') || '[]');
    } catch {
      return INITIAL_BUSINESS_ARTICLES;
    }
  }

  public saveBusinessArticle(article: BusinessArticle) {
    const list = this.getBusinessArticles();
    const idx = list.findIndex((a) => a.id === article.id);
    if (idx >= 0) {
      list[idx] = article;
    } else {
      list.unshift(article);
    }
    localStorage.setItem('alamin_business_articles', JSON.stringify(list));
    this.notify('business_articles');
  }

  public getBusinessInquiries(): BusinessInquiry[] {
    this.ensureInitialized();
    try {
      return JSON.parse(localStorage.getItem('alamin_business_inquiries') || '[]');
    } catch {
      return [];
    }
  }

  public addBusinessInquiry(inquiry: BusinessInquiry) {
    const list = this.getBusinessInquiries();
    list.unshift(inquiry);
    localStorage.setItem('alamin_business_inquiries', JSON.stringify(list));
    this.notify('business_inquiries');
    soundManager.playSuccessChime();
  }

  // --- BOOKING ---
  public getBookingServices(): BookingService[] {
    this.ensureInitialized();
    try {
      return JSON.parse(localStorage.getItem('alamin_booking_services') || '[]');
    } catch {
      return INITIAL_BOOKING_SERVICES;
    }
  }

  public getAppointments(): Appointment[] {
    this.ensureInitialized();
    try {
      return JSON.parse(localStorage.getItem('alamin_appointments') || '[]');
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  }

  public addAppointment(apt: Appointment) {
    const list = this.getAppointments();
    list.unshift(apt);
    localStorage.setItem('alamin_appointments', JSON.stringify(list));
    this.notify('appointments');
    soundManager.playSuccessChime();
  }

  public updateAppointmentStatus(id: string, status: Appointment['status']) {
    const list = this.getAppointments();
    const target = list.find((a) => a.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem('alamin_appointments', JSON.stringify(list));
      this.notify('appointments');
    }
  }

  // --- CONTACT / LEADS ---
  public saveContactLead(data: Record<string, string>) {
    const list = JSON.parse(localStorage.getItem('alamin_contact_leads') || '[]');
    list.unshift({ ...data, id: 'lead-' + Date.now(), createdAt: new Date().toISOString() });
    localStorage.setItem('alamin_contact_leads', JSON.stringify(list));
    soundManager.playSuccessChime();
  }
}

export const appStorage = new AppStorage();
