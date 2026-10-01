# Al Amin — Web Engineering & Agency Portfolio

A production-grade portfolio and agency platform for **Al Amin**, Computer Science & Engineering graduate from Daffodil International University (BSc CSE CGPA 3.45) and cybersecurity intern at Goinnovior Limited. Built as a high-converting commercial sales engine featuring 4 live, 100% operational demo sites with persistent database state.

---

## Live Demo Applications Inside

1. **ShopNova (E-Commerce Store)** — `/demo/ecommerce`
   - Interactive 3D product model inspection (orbit, rotate, zoom with Three.js).
   - Category filtering, live search, wishlist persistence.
   - Dynamic cart drawer with coupon validation (`ALAMIN10` for 10% off, `FREESHIP`).
   - Checkout with bKash, Nagad, and Cash on Delivery (COD) workflows.
   - Order confirmation & real-time delivery status tracker (`Placed` > `Confirmed` > `Shipped` > `Delivered`).
   - Store Owner Admin Portal (`admin@shopnova.com` / `admin123`): catalog control, stock editor, and sales analytics.

2. **TasteHub (Smart QR-Code Restaurant & Kitchen POS)** — `/demo/restaurant`
   - Contactless dine-in ordering: auto-generates unique printable QR codes per table using `qrcode.react`.
   - Table menu (`/demo/restaurant?table=X`) with zero login requirement for diners.
   - Live Kitchen Display System (KDS) with synthesized Web Audio chimes on incoming orders.
   - "Call Waiter" alert broadcasting directly to the kitchen terminal.
   - On-demand receipt/bill generator with payment settlement.
   - Admin Table & Dish Manager (`admin@tastehub.com` / `taste123`).

3. **BizPro (Corporate Agency & B2B Portal)** — `/demo/business`
   - High-authority corporate flagship with quantified proof metrics.
   - Interactive services bento grid and case studies.
   - Integrated enterprise lead capture pipeline.
   - Lightweight CMS Admin (`admin@bizpro.com` / `biz123`) for publishing strategic insights.

4. **BookEasy (Multi-Vertical Appointment Engine)** — `/demo/booking`
   - Multi-vertical service scheduler (Spa & Salon, Medical Clinic, Hotel Suites).
   - Interactive calendar and time slot selector with clash-prevention engine.
   - Instant digital confirmation slip with print support.
   - Booking Management Dashboard (`admin@bookeasy.com` / `book123`).

---

## Database Schema (SQL) for Supabase / PostgreSQL

For deployment to Supabase or PostgreSQL, execute the following SQL migration:

```sql
-- 1. E-Commerce Products & Orders
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    stock INT DEFAULT 10,
    description TEXT,
    features JSONB,
    color TEXT,
    model_type TEXT,
    is_new BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ecommerce_orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    transaction_id TEXT,
    items JSONB NOT NULL,
    subtotal NUMERIC NOT NULL,
    discount NUMERIC DEFAULT 0,
    delivery_charge NUMERIC DEFAULT 60,
    total NUMERIC NOT NULL,
    status TEXT DEFAULT 'placed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Restaurant Tables, Menu Items & Orders
CREATE TABLE IF NOT EXISTS restaurant_tables (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    seats INT DEFAULT 4,
    status TEXT DEFAULT 'available'
);

CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    description TEXT,
    is_veg BOOLEAN DEFAULT false,
    is_spicy BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    preparation_time TEXT,
    rating NUMERIC DEFAULT 4.9,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS restaurant_orders (
    id TEXT PRIMARY KEY,
    table_number INT REFERENCES restaurant_tables(id),
    customer_name TEXT,
    items JSONB NOT NULL,
    total NUMERIC NOT NULL,
    status TEXT DEFAULT 'new',
    payment_method TEXT DEFAULT 'counter',
    waiter_called BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Appointments & Bookings
CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    service_id TEXT NOT NULL,
    service_name TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Inbound Client Contact Leads
CREATE TABLE IF NOT EXISTS contact_leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    budget TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Seed Data Insert Script

```sql
INSERT INTO products (id, name, category, price, original_price, rating, reviews_count, stock, description, color, model_type, is_new)
VALUES
('prod-1', 'NovaSound Pro ANC Studio Headphones', 'Audio', 8500, 10500, 4.9, 128, 15, 'Flagship hybrid active noise cancelling headphones with custom 40mm titanium drivers.', '#0284c7', 'headphones', true),
('prod-2', 'NovaPulse Ultra Titanium Smartwatch', 'Wearables', 6200, 7500, 4.8, 94, 22, 'Aerospace-grade titanium casing with always-on AMOLED display and SpO2 tracking.', '#0f172a', 'smartwatch', true),
('prod-3', 'Lumina 75% Custom Wireless Mechanical Keyboard', 'Workspace', 7800, 9200, 5.0, 76, 9, 'Gasket-mounted aluminum body keyboard with pre-lubed linear switches.', '#06b6d4', 'keyboard', false),
('prod-4', 'NovaBass 360 Acoustic Cylinder Speaker', 'Audio', 5400, 6500, 4.7, 63, 18, 'Room-filling 360-degree omnidirectional acoustic driver with IP67 waterproofing.', '#3b82f6', 'speaker', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO restaurant_tables (id, name, seats, status)
VALUES
(1, 'Table 1 (Window View)', 2, 'available'),
(2, 'Table 2 (Center Dining)', 4, 'available'),
(3, 'Table 3 (Cozy Booth)', 4, 'occupied'),
(4, 'Table 4 (Garden Terrace)', 6, 'available'),
(5, 'Table 5 (VIP Alcove)', 4, 'occupied'),
(6, 'Table 6 (High Top Bar)', 2, 'available')
ON CONFLICT (id) DO NOTHING;
```

---

## Deployment Instructions

### Option 1: Vercel (Recommended)
1. Push repository to GitHub.
2. Import project on [Vercel](https://vercel.com).
3. Set Framework to **Vite** or **Other**.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**.

### Option 2: Supabase Connection (Optional)
To connect the live app to a remote Supabase project:
1. Create a free project at [supabase.com](https://supabase.com).
2. Execute the schema above in the Supabase SQL Editor.
3. Provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in environment variables.

---

## Contact & Hiring Al Amin
- **Email:** `eng.md.alaminjim@gmail.com`
- **Phone / WhatsApp:** `+880 1837-684439`
- **LinkedIn:** `linkedin.com/in/al-amin`
- **Location:** Dhaka / Jessore, Bangladesh
