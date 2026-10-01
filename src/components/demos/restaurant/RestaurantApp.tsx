import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Utensils,
  Plus,
  Minus,
  Clock,
  Flame,
  Leaf,
  BellRing,
  CheckCircle,
  Receipt,
  QrCode,
  ChefHat,
  Trash2,
  X,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DemoBanner } from '../DemoBanner';
import { MenuItem, RestaurantTable, RestaurantOrder, RestaurantOrderItem } from '../../../types/demos';
import { appStorage } from '../../../lib/storage';
import { soundManager } from '../../../lib/sound';

interface RestaurantAppProps {
  onBackToPortfolio: () => void;
}

export const RestaurantApp: React.FC<RestaurantAppProps> = ({ onBackToPortfolio }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [orders, setOrders] = useState<RestaurantOrder[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Customer table view
  const [activeTableNum, setActiveTableNum] = useState<number>(3);
  const [customerCart, setCustomerCart] = useState<RestaurantOrderItem[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('Tariqul Islam');
  const [customerOrderPlaced, setCustomerOrderPlaced] = useState<RestaurantOrder | null>(null);
  const [waiterCalledSuccess, setWaiterCalledSuccess] = useState(false);

  // Tab mode: 'customer-menu' | 'kitchen-live' | 'table-qr-admin'
  const [activeTab, setActiveTab] = useState<'customer-menu' | 'kitchen-live' | 'table-qr-admin'>('customer-menu');

  // Modals
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedTableForQr, setSelectedTableForQr] = useState<RestaurantTable | null>(null);
  const [billOrder, setBillOrder] = useState<RestaurantOrder | null>(null);

  // New Item State for Admin
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(450);
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('Burgers');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemIsVeg, setNewItemIsVeg] = useState(false);
  const [newItemIsSpicy, setNewItemIsSpicy] = useState(false);

  useEffect(() => {
    const load = () => {
      setMenuItems(appStorage.getMenuItems());
      setTables(appStorage.getTables());
      setOrders(appStorage.getRestaurantOrders());
    };
    load();
    const u1 = appStorage.subscribe('menu_items', load);
    const u2 = appStorage.subscribe('tables', load);
    const u3 = appStorage.subscribe('restaurant_orders', load);
    return () => {
      u1();
      u2();
      u3();
    };
  }, []);

  // Filter menu
  const filteredMenu = menuItems.filter(
    (m) => selectedCategory === 'All' || m.category === selectedCategory
  );

  // Cart operations
  const addToCart = (item: MenuItem) => {
    soundManager.playBeep(700, 0.08);
    setCustomerCart((prev) => {
      const existing = prev.find((i) => i.itemId === item.id);
      if (existing) {
        return prev.map((i) => (i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { itemId: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const updateCartQty = (itemId: string, delta: number) => {
    setCustomerCart((prev) =>
      prev
        .map((i) => {
          if (i.itemId === itemId) {
            const nextQ = i.quantity + delta;
            return nextQ > 0 ? { ...i, quantity: nextQ } : null;
          }
          return i;
        })
        .filter(Boolean) as RestaurantOrderItem[]
    );
  };

  const cartTotal = customerCart.reduce((s, i) => s + i.price * i.quantity, 0);

  // Place Table Order
  const handlePlaceOrder = () => {
    if (customerCart.length === 0) return;

    const newOrder: RestaurantOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      tableNumber: activeTableNum,
      customerName: customerName.trim() || `Guest at Table ${activeTableNum}`,
      items: customerCart.map((item) => ({
        ...item,
        specialInstructions: specialInstructions || undefined
      })),
      total: cartTotal,
      status: 'new',
      paymentMethod: 'counter',
      createdAt: new Date().toISOString(),
      waiterCalled: false
    };

    appStorage.placeRestaurantOrder(newOrder);
    setCustomerOrderPlaced(newOrder);
    setCustomerCart([]);
    setSpecialInstructions('');

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // fallback
    }
  };

  const handleCallWaiter = () => {
    appStorage.callWaiter(activeTableNum);
    setWaiterCalledSuccess(true);
    setTimeout(() => setWaiterCalledSuccess(false), 3000);
  };

  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;
    const newItem: MenuItem = {
      id: 'm-' + Date.now(),
      name: newItemName,
      category: newItemCategory,
      price: newItemPrice,
      description: newItemDesc || 'Freshly prepared specialty dish.',
      isVeg: newItemIsVeg,
      isSpicy: newItemIsSpicy,
      isAvailable: true,
      preparationTime: '12-15 min',
      rating: 4.8
    };
    appStorage.saveMenuItem(newItem);
    setNewItemName('');
    setNewItemDesc('');
    soundManager.playSuccessChime();
  };

  // Find customer's active live order
  const tableOrder = orders.find(
    (o) => o.tableNumber === activeTableNum && o.status !== 'paid'
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DemoBanner
        demoName="TasteHub QR-Code Restaurant & Kitchen POS"
        adminCredentials={{ email: 'admin@tastehub.com', pass: 'taste123', role: 'Kitchen & Manager' }}
        onBackToPortfolio={onBackToPortfolio}
      />

      {/* Restaurant Subnav / Switcher */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-bold text-amber-400 flex items-center gap-1.5">
              <Utensils className="w-5 h-5 text-amber-400" />
              <span>TasteHub Bistro</span>
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              · QR Dine-In & Live Kitchen System
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('customer-menu')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'customer-menu'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Guest QR Menu (Table #{activeTableNum})
            </button>
            <button
              onClick={() => setActiveTab('kitchen-live')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'kitchen-live'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Live Kitchen KDS</span>
              {orders.filter((o) => o.status === 'new' || o.waiterCalled).length > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('table-qr-admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'table-qr-admin'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Table QRs & Menu Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {/* TAB 1: CUSTOMER QR MENU VIEW */}
        {activeTab === 'customer-menu' && (
          <div>
            {/* Table Header Bar */}
            <div className="mb-6 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center font-bold text-amber-400">
                  #{activeTableNum}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Table {activeTableNum} — Dine-In Menu</h2>
                  <p className="text-xs text-slate-400">
                    Scan table QR code to order with zero waiting. Pay at table or counter.
                  </p>
                </div>
              </div>

              {/* Table Switcher Simulation & Call Waiter */}
              <div className="flex items-center gap-2">
                <select
                  value={activeTableNum}
                  onChange={(e) => setActiveTableNum(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 font-mono"
                >
                  {tables.map((t) => (
                    <option key={t.id} value={t.id}>
                      Switch to Table {t.id}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleCallWaiter}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-semibold"
                >
                  <BellRing className="w-3.5 h-3.5" />
                  <span>{waiterCalledSuccess ? 'Waiter Alerted!' : 'Call Waiter'}</span>
                </button>
              </div>
            </div>

            {/* Active Live Order Tracker for this table */}
            {tableOrder && (
              <div className="mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Live Order #{tableOrder.id} — Status: {tableOrder.status.toUpperCase()}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {tableOrder.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')} · Total: ৳{tableOrder.total}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      tableOrder.status === 'new'
                        ? 'bg-blue-500/20 text-blue-300'
                        : tableOrder.status === 'preparing'
                        ? 'bg-amber-500/20 text-amber-300'
                        : tableOrder.status === 'ready'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-purple-500/20 text-purple-300'
                    }`}
                  >
                    {tableOrder.status}
                  </span>
                  <button
                    onClick={() => setBillOrder(tableOrder)}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>View Bill</span>
                  </button>
                </div>
              </div>
            )}

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
              {['All', 'Burgers', 'Pizzas', 'Gourmet Mains', 'Beverages', 'Desserts'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Layout: Menu Items (left) + Order Slip (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Menu Items Grid */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredMenu.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-white">{item.name}</h3>
                        <span className="font-mono font-bold text-amber-400 text-sm whitespace-nowrap">
                          ৳{item.price}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>

                      <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                        {item.isVeg && (
                          <span className="text-emerald-400 flex items-center gap-0.5">
                            <Leaf className="w-3 h-3" /> Vegetarian
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="text-rose-400 flex items-center gap-0.5">
                            <Flame className="w-3 h-3" /> Spicy
                          </span>
                        )}
                        <span>· {item.preparationTime}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-400">★ {item.rating}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-transform active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Cart & Checkout Slip */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 sticky top-28">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-white">Table {activeTableNum} Order</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {customerCart.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                </div>

                <div className="py-3 max-h-64 overflow-y-auto space-y-2.5">
                  {customerCart.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">
                      Your order ticket is empty. Select items from the menu above.
                    </p>
                  ) : (
                    customerCart.map((i) => (
                      <div
                        key={i.itemId}
                        className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40"
                      >
                        <div className="flex-1 pr-2">
                          <span className="text-white font-medium block truncate">{i.name}</span>
                          <span className="text-slate-400 font-mono">৳{i.price * i.quantity}</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded border border-slate-800">
                          <button
                            onClick={() => updateCartQty(i.itemId, -1)}
                            className="p-0.5 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono px-1">{i.quantity}</span>
                          <button
                            onClick={() => updateCartQty(i.itemId, 1)}
                            className="p-0.5 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {customerCart.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">
                        Kitchen Special Instructions
                      </label>
                      <input
                        type="text"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="e.g. Less spicy, extra sauce"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm font-bold text-white pt-2">
                      <span>Total Bill</span>
                      <span className="text-amber-400 font-mono text-base">৳{cartTotal}</span>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Send to Kitchen (Table #{activeTableNum})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE KITCHEN KDS (KITCHEN DISPLAY SYSTEM) */}
        {activeTab === 'kitchen-live' && (
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <ChefHat className="w-6 h-6 text-amber-400" />
                <div>
                  <h2 className="text-lg font-bold text-white">Live Kitchen Display System (KDS)</h2>
                  <p className="text-xs text-slate-400">
                    Real-time audio alert triggers when table orders arrive. Auto-sorts by elapsed preparation time.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Audio Chimes Active</span>
              </div>
            </div>

            {/* Orders Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {orders
                .filter((o) => o.status !== 'paid')
                .map((order) => (
                  <div
                    key={order.id}
                    className={`rounded-2xl border p-4 flex flex-col justify-between transition-all ${
                      order.waiterCalled
                        ? 'border-rose-500 bg-rose-950/20 animate-pulse'
                        : order.status === 'new'
                        ? 'border-blue-500/50 bg-slate-900/90'
                        : order.status === 'preparing'
                        ? 'border-amber-500/50 bg-slate-900/90'
                        : 'border-emerald-500/50 bg-slate-900/90'
                    }`}
                  >
                    <div>
                      {/* Order Header */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-amber-400 text-black font-bold flex items-center justify-center text-xs">
                            T{order.tableNumber}
                          </span>
                          <div>
                            <span className="font-mono text-xs font-bold text-white">#{order.id}</span>
                            <span className="text-[10px] text-slate-400 block">{order.customerName}</span>
                          </div>
                        </div>

                        {order.waiterCalled && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500 text-white flex items-center gap-1">
                            <BellRing className="w-3 h-3" /> Waiter Call!
                          </span>
                        )}
                      </div>

                      {/* Items */}
                      <div className="py-3 space-y-1.5 text-xs">
                        {order.items.map((i, idx) => (
                          <div key={idx} className="flex justify-between text-slate-200">
                            <span>
                              <b className="text-amber-400 mr-1.5">{i.quantity}x</b> {i.name}
                            </span>
                            <span className="font-mono text-slate-400">৳{i.price * i.quantity}</span>
                          </div>
                        ))}

                        {order.items.some((i) => i.specialInstructions) && (
                          <div className="mt-2 p-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-amber-300">
                            <b>Note:</b> {order.items.find((i) => i.specialInstructions)?.specialInstructions}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div className="font-mono text-xs font-bold text-white">৳{order.total}</div>

                      <div className="flex items-center gap-2">
                        {order.waiterCalled && (
                          <button
                            onClick={() => appStorage.dismissWaiterCall(order.id)}
                            className="text-[10px] px-2 py-1 rounded bg-rose-900 text-white"
                          >
                            Dismiss Call
                          </button>
                        )}

                        <select
                          value={order.status}
                          onChange={(e) =>
                            appStorage.updateRestaurantOrderStatus(order.id, e.target.value as any)
                          }
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white capitalize"
                        >
                          <option value="new">New</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="served">Served</option>
                          <option value="paid">Paid & Closed</option>
                        </select>

                        <button
                          onClick={() => setBillOrder(order)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Print Receipt"
                        >
                          <Receipt className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {orders.filter((o) => o.status !== 'paid').length === 0 && (
              <div className="text-center py-16 text-slate-500">
                <ChefHat className="w-12 h-12 mx-auto stroke-1 text-slate-600 mb-2" />
                <p className="text-sm">All tables served! Kitchen queue is clear.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TABLE QR GENERATOR & MENU ADMIN */}
        {activeTab === 'table-qr-admin' && (
          <div className="space-y-8">
            {/* Table QR Management */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Table QR Codes (Printable)</h3>
                  <p className="text-xs text-slate-400">
                    System generates unique dynamic QR codes for each table. Click any table to download or preview the printable table stand.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const name = prompt('New Table Name:', `Table ${tables.length + 1}`);
                    if (name) appStorage.addTable(name, 4);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-black font-bold text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Table</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {tables.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSelectedTableForQr(t);
                      setIsQrModalOpen(true);
                    }}
                    className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 cursor-pointer flex flex-col items-center text-center transition-transform hover:scale-105"
                  >
                    <div className="bg-white p-2 rounded-xl mb-2">
                      <QRCodeSVG
                        value={`${window.location.origin}/demo/restaurant?table=${t.id}`}
                        size={80}
                      />
                    </div>
                    <span className="text-xs font-bold text-white">{t.name}</span>
                    <span className="text-[10px] text-slate-400">{t.seats} Seats</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu Admin: Add New Dish */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4">Add New Food Item to Menu</h3>
              <form onSubmit={handleCreateNewItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Dish Name</label>
                  <input
                    type="text"
                    required
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g. Crispy Calamari Rings"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="Burgers">Burgers</option>
                    <option value="Pizzas">Pizzas</option>
                    <option value="Gourmet Mains">Gourmet Mains</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Price in BDT</label>
                  <input
                    type="number"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] text-slate-400 block mb-1">Description</label>
                  <input
                    type="text"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="Ingredients and culinary presentation notes..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-1.5 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={newItemIsVeg}
                      onChange={(e) => setNewItemIsVeg(e.target.checked)}
                      className="rounded"
                    />
                    <span>Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={newItemIsSpicy}
                      onChange={(e) => setNewItemIsSpicy(e.target.checked)}
                      className="rounded"
                    />
                    <span>Spicy</span>
                  </label>
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs hover:bg-amber-300"
                  >
                    Publish Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* QR Code Printable Modal */}
      {isQrModalOpen && selectedTableForQr && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center relative">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              TasteHub Table Stand
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{selectedTableForQr.name}</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Scan with smartphone camera to view digital menu & order directly.
            </p>

            <div className="bg-white p-5 rounded-2xl inline-block shadow-2xl">
              <QRCodeSVG
                value={`${window.location.origin}/demo/restaurant?table=${selectedTableForQr.id}`}
                size={180}
              />
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setActiveTableNum(selectedTableForQr.id);
                  setActiveTab('customer-menu');
                  setIsQrModalOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs hover:bg-amber-300"
              >
                Open Table Menu
              </button>
              <button
                onClick={() => window.print()}
                className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              >
                Print Stand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bill Receipt Modal */}
      {billOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-sm w-full p-5 relative font-mono text-xs">
            <button
              onClick={() => setBillOrder(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white font-sans"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">TASTEHUB BISTRO</h3>
              <p className="text-slate-400 text-[11px]">Dine-In Invoice</p>
              <div className="text-slate-400 mt-1">
                Order #{billOrder.id} · Table {billOrder.tableNumber}
              </div>
            </div>

            <div className="py-3 space-y-1.5 border-b border-slate-800">
              {billOrder.items.map((i, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>
                    {i.quantity}x {i.name}
                  </span>
                  <span>৳{i.price * i.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>৳{billOrder.total}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (0% Promo):</span>
                <span>৳0</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-slate-800">
                <span>TOTAL DUE:</span>
                <span className="text-amber-400">৳{billOrder.total}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <button
                onClick={() => {
                  appStorage.updateRestaurantOrderStatus(billOrder.id, 'paid');
                  setBillOrder(null);
                }}
                className="w-full py-2 rounded-lg bg-emerald-500 text-black font-bold font-sans hover:bg-emerald-400 text-xs"
              >
                Mark Paid & Close Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
