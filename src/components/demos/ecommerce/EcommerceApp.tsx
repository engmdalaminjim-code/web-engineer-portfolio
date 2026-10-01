import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  SlidersHorizontal,
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  CreditCard,
  PhoneCall,
  Sparkles,
  ArrowRight,
  Lock,
  Edit3,
  BarChart3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { DemoBanner } from '../DemoBanner';
import { Product3DViewer } from './Product3DViewer';
import { OrderTrackingModal } from './OrderTrackingModal';
import { Product, CartItem, Order } from '../../../types/demos';
import { appStorage } from '../../../lib/storage';
import { soundManager } from '../../../lib/sound';

interface EcommerceAppProps {
  onBackToPortfolio: () => void;
}

export const EcommerceApp: React.FC<EcommerceAppProps> = ({ onBackToPortfolio }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Checkout modal & Tracking
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | undefined>(undefined);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [deliveryArea, setDeliveryArea] = useState<'inside-dhaka' | 'outside-dhaka'>('inside-dhaka');

  // Checkout form
  const [custName, setCustName] = useState('Kamrul Hassan');
  const [custEmail, setCustEmail] = useState('kamrul@example.com');
  const [custPhone, setCustPhone] = useState('01711223344');
  const [custAddress, setCustAddress] = useState('House 42, Road 11, Block D, Banani');
  const [custCity, setCustCity] = useState('Dhaka');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('bkash');
  const [bkashNumber, setBkashNumber] = useState('01711223344');
  const [bkashTrxId, setBkashTrxId] = useState('TRX9827361');

  // Admin state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const load = () => {
      setProducts(appStorage.getProducts());
      setAllOrders(appStorage.getEcommerceOrders());
    };
    load();
    const unsubProd = appStorage.subscribe('products', load);
    const unsubOrders = appStorage.subscribe('ecommerce_orders', load);
    return () => {
      unsubProd();
      unsubOrders();
    };
  }, []);

  // Filter & Sort
  const filteredProducts = products
    .filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  // Cart operations
  const addToCart = (product: Product) => {
    soundManager.playBeep(750, 0.08);
    setCartBounce(true);
    setJustAddedId(product.id);
    setTimeout(() => {
      setCartBounce(false);
      setJustAddedId(null);
    }, 600);

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    soundManager.playBeep(900, 0.05);
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Pricing calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCharge = cart.length === 0 ? 0 : deliveryArea === 'inside-dhaka' ? 60 : 120;
  const discountAmount = Math.round((cartSubtotal * couponDiscount) / 100);
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryCharge);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'ALAMIN10') {
      setCouponDiscount(10);
      soundManager.playSuccessChime();
    } else if (couponCode.toUpperCase() === 'FREESHIP') {
      setCouponDiscount(5);
      soundManager.playSuccessChime();
    } else {
      alert('Invalid coupon code. Try "ALAMIN10" for 10% off!');
    }
  };

  // Place Order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: 'ORD-SN' + Math.floor(100000 + Math.random() * 900000),
      customerName: custName,
      email: custEmail,
      phone: custPhone,
      address: custAddress,
      city: custCity,
      paymentMethod,
      transactionId: paymentMethod !== 'cod' ? bkashTrxId || 'TXN-' + Date.now().toString().slice(-6) : undefined,
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        price: c.product.price,
        quantity: c.quantity
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      deliveryCharge,
      total: grandTotal,
      status: 'placed',
      createdAt: new Date().toISOString()
    };

    appStorage.placeEcommerceOrder(newOrder);
    setActiveOrder(newOrder);
    setTrackingOrderId(newOrder.id);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsTrackingModalOpen(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  // Admin login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'admin@shopnova.com' && adminPass === 'admin123') {
      setIsAdminLoggedIn(true);
      setAdminError('');
    } else {
      setAdminError('Invalid credentials. Use admin@shopnova.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DemoBanner
        demoName="ShopNova 3D E-Commerce"
        adminCredentials={{ email: 'admin@shopnova.com', pass: 'admin123', role: 'Store Owner' }}
        onBackToPortfolio={onBackToPortfolio}
        onOpenAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Main E-commerce Header */}
      <nav className="border-b border-slate-800 bg-slate-900/60 sticky top-12 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-display font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              ShopNova
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              3D Storefront
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audio, watches, keyboards..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            {/* Dedicated Order Tracking Button */}
            <button
              onClick={() => {
                setTrackingOrderId(activeOrder ? activeOrder.id : undefined);
                setIsTrackingModalOpen(true);
              }}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
              title="Track order status in real-time"
            >
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline font-medium">Track Order</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <motion.button
              onClick={() => setIsCartOpen(true)}
              animate={
                cartBounce
                  ? { scale: [1, 1.25, 0.9, 1.12, 1], rotate: [0, -4, 4, -2, 0] }
                  : { scale: 1 }
              }
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative p-2 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors flex items-center gap-2 shadow-lg shadow-cyan-950/40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">৳{grandTotal.toLocaleString()}</span>
              {cart.length > 0 && (
                <motion.span
                  key={cart.reduce((s, i) => s + i.quantity, 0)}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [1.35, 0.88, 1], opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-lg"
                >
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {/* Active Order Tracking Notification if available */}
        {activeOrder && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Order Placed Successfully: #{activeOrder.id}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Recipient: {activeOrder.customerName} · {activeOrder.phone} · Total: ৳{activeOrder.total.toLocaleString()} ({activeOrder.paymentMethod.toUpperCase()})
              </p>
            </div>

            {/* Stepper & Full Modal Button */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4 text-xs">
                {(['placed', 'confirmed', 'shipped', 'delivered'] as const).map((step, idx) => {
                  const currentIdx = ['placed', 'confirmed', 'shipped', 'delivered'].indexOf(activeOrder.status);
                  const isPassed = idx <= currentIdx;
                  return (
                    <div key={step} className="flex items-center gap-1.5">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] ${
                          isPassed ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className={`capitalize ${isPassed ? 'text-cyan-300 font-medium' : 'text-slate-500'}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setTrackingOrderId(activeOrder.id);
                  setIsTrackingModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-cyan-950/40"
              >
                <span>Live Tracking Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Promo Hero Banner */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/50 border border-slate-800 relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">
              Spring Showcase 2026
            </span>
            <h1 className="text-2xl sm:text-4xl font-display font-bold text-white mt-2 leading-tight">
              Next-Gen Tech Gadgets with 3D Precision Inspection
            </h1>
            <p className="text-sm text-slate-400 mt-2.5">
              Experience products before buying with real-time 3D orbit inspection. Free delivery inside Dhaka with code{' '}
              <span className="text-cyan-400 font-mono font-bold">ALAMIN10</span>.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {['All', 'Audio', 'Wearables', 'Workspace'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black font-semibold'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const isLiked = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 p-4 transition-all hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
              >
                <div>
                  {/* Card Visual / 3D Prompt */}
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="relative w-full h-44 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden cursor-pointer flex flex-col items-center justify-center p-3 text-center transition-transform group-hover:scale-[1.02]"
                  >
                    <div
                      className="w-20 h-20 rounded-full blur-xl absolute"
                      style={{ backgroundColor: product.color, opacity: 0.25 }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-lg"
                        style={{ backgroundColor: `${product.color}25`, border: `1px solid ${product.color}60` }}
                      >
                        <Package className="w-7 h-7" style={{ color: product.color }} />
                      </div>
                      <span className="text-[11px] text-cyan-400 font-mono flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Click for 3D View
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {product.isNew && (
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-3.5">
                    <span className="text-[11px] text-slate-500">{product.category}</span>
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1 mt-0.5"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{product.description}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-white">৳{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-500 line-through ml-1.5">
                        ৳{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <motion.button
                    onClick={() => addToCart(product)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.86 }}
                    animate={
                      justAddedId === product.id
                        ? { scale: [1, 1.35, 0.9, 1.1, 1], backgroundColor: '#06b6d4', color: '#000000' }
                        : {}
                    }
                    transition={{ duration: 0.45 }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-cyan-400 transition-colors shadow-sm"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Product Detail & 3D Inspection Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-3xl w-full p-5 sm:p-7 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <Product3DViewer product={selectedProduct} />
              </div>

              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  {selectedProduct.category} · Stock: {selectedProduct.stock} units
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl font-bold text-cyan-400">
                    ৳{selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      ৳{selectedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-amber-400 font-medium">
                    ★ {selectedProduct.rating} ({selectedProduct.reviewsCount} reviews)
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="mt-4 space-y-1.5">
                  <span className="text-xs font-semibold text-slate-400 uppercase font-mono">Highlights:</span>
                  {selectedProduct.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <motion.button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart — ৳{selectedProduct.price.toLocaleString()}</span>
                  </motion.button>

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-500"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlist.includes(selectedProduct.id) ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer with Smooth Spring Slide and Item Transitions */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Slide-in Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="relative z-10 w-full max-w-md bg-slate-950 border-l border-slate-800 h-full flex flex-col p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingBag className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <span className="font-semibold text-white">Your Shopping Cart</span>
                  <span className="text-xs text-slate-400">({cart.length} items)</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-slate-600 mb-2" />
                    <p className="text-sm">Your cart is currently empty</p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 30, scale: 0.95 }}
                        transition={{ duration: 0.22 }}
                        key={item.product.id}
                        className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-3 shadow-sm"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">{item.product.name}</h4>
                          <span className="text-xs text-cyan-400 font-mono">
                            ৳{item.product.price.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-slate-950 rounded-lg p-1 border border-slate-800">
                          <button
                            onClick={() => updateCartQty(item.product.id, -1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(item.product.id, 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  {/* Coupon Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon (e.g. ALAMIN10)"
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 uppercase font-mono"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-cyan-400 hover:bg-slate-700 font-semibold"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-mono">৳{cartSubtotal.toLocaleString()}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({couponDiscount}%)</span>
                        <span className="font-mono">-৳{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Delivery</span>
                      <span className="text-white font-mono">৳{deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                      <span>Total</span>
                      <span className="text-cyan-400 font-mono">৳{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-display font-bold text-white mb-4">Complete Your Order</h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Phone Number (Bangladeshi)</label>
                  <input
                    type="text"
                    required
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={custAddress}
                  onChange={(e) => setCustAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Delivery Region</label>
                  <select
                    value={deliveryArea}
                    onChange={(e) => setDeliveryArea(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="inside-dhaka">Inside Dhaka (৳60)</option>
                    <option value="outside-dhaka">Outside Dhaka (৳120)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={custCity}
                    onChange={(e) => setCustCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-2">
                <label className="text-[11px] text-slate-400 block mb-2">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-500 bg-pink-950/40 text-pink-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span className="font-bold">bKash</span>
                    <span className="text-[10px] text-slate-500">Instant</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-500 bg-orange-950/40 text-orange-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span className="font-bold">Nagad</span>
                    <span className="text-[10px] text-slate-500">Instant</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 ${
                      paymentMethod === 'cod'
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span className="font-bold">COD</span>
                    <span className="text-[10px] text-slate-500">Cash on Del.</span>
                  </button>
                </div>
              </div>

              {/* bKash / Nagad Trx Details */}
              {paymentMethod !== 'cod' && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Merchant bKash Number:</span>
                    <span className="font-mono text-cyan-400">01837-684439</span>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Your bKash / Nagad TrxID</label>
                    <input
                      type="text"
                      value={bkashTrxId}
                      onChange={(e) => setBkashTrxId(e.target.value)}
                      placeholder="e.g. 9J28KLS0"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Grand Total:</span>
                  <div className="text-lg font-bold text-cyan-400 font-mono">৳{grandTotal.toLocaleString()}</div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Panel Modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!isAdminLoggedIn ? (
              <div className="max-w-sm mx-auto py-8">
                <div className="text-center mb-6">
                  <Lock className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <h2 className="text-lg font-bold text-white">ShopNova Admin Login</h2>
                  <p className="text-xs text-slate-400 mt-1">Credentials pre-filled for evaluation:</p>
                  <code className="text-xs text-cyan-400 font-mono block mt-1">admin@shopnova.com / admin123</code>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <div>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@shopnova.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="admin123"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                  {adminError && <p className="text-xs text-rose-400">{adminError}</p>}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors"
                  >
                    Log In to Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminEmail('admin@shopnova.com');
                      setAdminPass('admin123');
                    }}
                    className="w-full text-xs text-slate-400 hover:text-cyan-400 mt-1"
                  >
                    Quick Auto-Fill
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-white">ShopNova Store Admin</h2>
                    <span className="text-xs text-slate-400">Real-time inventory and customer order management</span>
                  </div>
                  <button
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Metrics Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400">Total Products</span>
                    <div className="text-xl font-bold text-white font-mono mt-1">{products.length}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400">Total Orders</span>
                    <div className="text-xl font-bold text-cyan-400 font-mono mt-1">{allOrders.length}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400">Revenue (Recorded)</span>
                    <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                      ৳{allOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Orders Management */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-white mb-3">Recent Orders</h3>
                  {allOrders.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4">No customer orders placed yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {allOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <span className="font-mono font-bold text-white">#{ord.id}</span>
                            <span className="text-slate-400 ml-2">
                              {ord.customerName} ({ord.phone})
                            </span>
                            <div className="text-slate-400 text-[11px]">
                              {ord.items.map((i) => `${i.productName} (x${i.quantity})`).join(', ')}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-cyan-400">
                              ৳{ord.total.toLocaleString()}
                            </span>
                            <select
                              value={ord.status}
                              onChange={(e) =>
                                appStorage.updateEcommerceOrderStatus(ord.id, e.target.value as any)
                              }
                              className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white capitalize"
                            >
                              <option value="placed">Placed</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Products Editor */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Catalog & Stock Control</h3>
                  <div className="space-y-2">
                    {products.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-white">{prod.name}</span>
                          <span className="text-slate-400 ml-2 font-mono">
                            ৳{prod.price.toLocaleString()} · Stock: {prod.stock}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const newPrice = prompt('Update price in BDT:', prod.price.toString());
                              if (newPrice) {
                                appStorage.saveProduct({ ...prod, price: parseInt(newPrice) || prod.price });
                              }
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                          >
                            Edit Price
                          </button>
                          <button
                            onClick={() => {
                              const newStock = prompt('Update stock units:', prod.stock.toString());
                              if (newStock) {
                                appStorage.saveProduct({ ...prod, stock: parseInt(newStock) || prod.stock });
                              }
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                          >
                            Edit Stock
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dedicated Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingModalOpen}
        initialOrderId={trackingOrderId}
        onClose={() => setIsTrackingModalOpen(false)}
      />
    </div>
  );
};
