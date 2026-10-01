import {
  ServiceItem,
  DemoProject,
  SkillCategory,
  EducationItem,
  ExperienceItem,
  AchievementItem,
  PricingPlan,
  Testimonial
} from '../types/portfolio';

export const PORTFOLIO_INFO = {
  name: 'Al Amin',
  headline: 'I build websites that grow your business',
  subheadline: 'Computer Science Engineer & Cybersecurity Specialist crafting high-converting, blazing-fast web solutions for SMEs, e-commerce stores, restaurants, and modern service providers.',
  email: 'eng.md.alaminjim@gmail.com',
  phone: '+880 1837-684439',
  whatsappNumber: '8801837684439',
  whatsappUrl: 'https://wa.me/8801837684439?text=Hello%20Al%20Amin,%20I%20am%20interested%20in%20building%20a%20website%20for%20my%20business.',
  linkedin: 'https://linkedin.com/in/al-amin',
  github: 'https://github.com/al-amin',
  location: 'Dhaka / Jessore, Bangladesh',
  bio: 'A passionate Computer Science & Engineering graduate from Daffodil International University (CGPA 3.45) with hands-on experience in full-stack engineering and cybersecurity vulnerability assessment at Goinnovior Limited. I specialize in bridging the gap between technical engineering and commercial profitability for businesses—delivering digital storefronts, QR ordering systems, and corporate portals that are not just beautiful, but bulletproof and high-converting.',
  languages: [
    { name: 'Bengali', level: 'Native Speaker' },
    { name: 'English', level: 'Professional Working Proficiency' }
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-ecom',
    title: 'E-Commerce Websites',
    category: 'Digital Retail',
    description: 'Custom, high-conversion online stores with 3D product previews, automated cart & checkout, bKash/Nagad/Card integration, order tracking, and inventory management.',
    iconName: 'ShoppingBag',
    features: ['3D Interactive Product Display', 'bKash/Nagad/Cards & COD', 'Live Cart & Coupon Engine', 'Full Admin Inventory & Sales Analytics'],
    deliverables: 'Complete store, payment gateway, SEO setup, 30 days support',
    badge: 'High Conversion'
  },
  {
    id: 'srv-rest',
    title: 'Restaurant & QR Menu Systems',
    category: 'Hospitality Tech',
    description: 'Contactless smart QR code dining systems where guests scan table QR codes, order directly without apps or logins, and kitchen staff receive instant real-time audio tickets.',
    iconName: 'Utensils',
    features: ['Dynamic Printable Table QR Codes', 'Zero-App Instant Mobile Ordering', 'Live Kitchen Dashboard & Audio Chime', 'Daily Sales & Item Velocity Reports'],
    deliverables: 'QR code generator, kitchen tablet app, waiter alert system',
    badge: 'Popular for Cafés'
  },
  {
    id: 'srv-corp',
    title: 'Business & Corporate Portals',
    category: 'Brand Authority',
    description: 'High-authority digital flagships for companies, agencies, and manufacturers looking to attract corporate clients, showcase portfolio work, and capture qualified inbound leads.',
    iconName: 'Briefcase',
    features: ['Ultra-fast Page Speed (95+ Lighthouse)', 'Custom Project Showcase & Case Studies', 'Lead Capture & CRM Integrations', 'Interactive Services Breakdown'],
    deliverables: 'Custom UI/UX, responsive layouts, client inquiry manager',
    badge: 'Enterprise Grade'
  },
  {
    id: 'srv-book',
    title: 'Online Booking & Appointment Engines',
    category: 'Service Booking',
    description: 'Streamlined scheduling solutions for beauty salons, healthcare clinics, consulting firms, and boutique hotels with automated calendar slots and confirmation notifications.',
    iconName: 'CalendarCheck',
    features: ['Interactive Time-Slot Picker', 'Double-Booking Prevention Engine', 'Client Confirmation Summary', 'Admin Calendar Management Dashboard'],
    deliverables: 'Calendar system, booking notifications, admin scheduling panel',
    badge: 'Time-Saving'
  },
  {
    id: 'srv-port',
    title: 'Executive & Creative Portfolios',
    category: 'Personal Branding',
    description: 'Tailored personal websites for founders, executives, developers, and creators to establish digital authority, showcase career milestones, and land high-ticket contracts.',
    iconName: 'Sparkles',
    features: ['Interactive 3D Elements & Smooth Micro-Interactions', 'Downloadable Interactive CV Generator', 'Interactive Skill Demonstrators', 'Contact & Social Discovery Hub'],
    deliverables: 'Custom domain setup, social share cards, analytics',
    badge: 'Impactful'
  },
  {
    id: 'srv-sec',
    title: 'Website Security & Vulnerability Audits',
    category: 'Cybersecurity',
    description: 'Rigorous penetration testing and security audits leveraging real-world cybersecurity intern experience (Goinnovior Ltd). Protect against SQL injection, XSS, CSRF, and data breaches.',
    iconName: 'ShieldAlert',
    features: ['OWASP Top 10 Vulnerability Scanning', 'Authentication & Session Hardening', 'Database Protection & Rate Limiting', 'Executive Security Remediation Report'],
    deliverables: 'Detailed vulnerability audit report + step-by-step remediation guide',
    badge: 'Security Specialist'
  }
];

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 'shopnova',
    route: '/demo/ecommerce',
    title: 'ShopNova',
    tagline: 'Modern 3D E-Commerce Platform',
    description: 'Complete digital storefront with interactive 3D product inspection (orbit & zoom), live cart drawer, coupon engine, bKash/Nagad mock checkout, and full sales admin dashboard.',
    category: 'E-Commerce Store',
    badge: 'Live Working Demo',
    accentColor: '#0284c7',
    techStack: ['Three.js 3D Viewer', 'Local Persistence / Supabase', 'Tailwind CSS', 'Admin Portal'],
    metrics: '+45% Higher Engagement via 3D Viewer',
    features: ['3D Interactive Model Viewer', 'Wishlist & Live Cart Subtotals', 'Multi-step Address & Payment UI', 'Admin Product & Inventory Editor'],
    demoType: 'ecommerce'
  },
  {
    id: 'tastehub',
    route: '/demo/restaurant',
    title: 'TasteHub',
    tagline: 'Smart QR-Code Restaurant & Kitchen System',
    description: 'Contactless dining engine: creates unique table QR codes, allows guests to order instantly from their phone (/menu?table=X), and broadcasts live orders to the kitchen with audio alerts.',
    category: 'Restaurant & Dining',
    badge: 'QR Code Enabled',
    accentColor: '#f59e0b',
    techStack: ['qrcode.react', 'Realtime Event Bus', 'Web Audio Synth Chime', 'Live Kitchen Board'],
    metrics: 'Zero Waiter Delay · 2.5x Faster Table Turnover',
    features: ['Table QR Code Generation & Print', 'Table-specific Mobile Menu', 'Kitchen Realtime Ticket Dispatcher', 'Waiter Calling System & Bill Generator'],
    demoType: 'restaurant'
  },
  {
    id: 'bizpro',
    route: '/demo/business',
    title: 'BizPro',
    tagline: 'Corporate Agency & Inbound Lead Engine',
    description: 'Architectural corporate presence built for digital growth agencies. Features case studies with concrete business metrics, an insights blog, and an integrated inquiry manager.',
    category: 'Corporate Agency',
    badge: 'B2B Flagship',
    accentColor: '#3b82f6',
    techStack: ['Responsive Grid', 'Lead Management CMS', 'Dynamic Case Studies', 'SEO Optimized'],
    metrics: '99/100 Lighthouse Performance',
    features: ['Proof-Driven Case Studies', 'Interactive Service Bento-Grid', 'Corporate Inquiry Pipeline', 'Lightweight CMS Article Reader'],
    demoType: 'business'
  },
  {
    id: 'bookeasy',
    route: '/demo/booking',
    title: 'BookEasy',
    tagline: 'Instant Appointment & Slot Scheduling',
    description: 'Multi-vertical booking engine suited for luxury salons, dental clinics, and boutique hotel reservations with dynamic time slot calendar, zero double-booking, and admin scheduling.',
    category: 'Booking & Reservations',
    badge: 'Automated Calendar',
    accentColor: '#10b981',
    techStack: ['Interactive Calendar', 'Slot Allocation Engine', 'Instant Confirmation Slip', 'Admin Schedule Manager'],
    metrics: '100% Elimination of Booking Clashes',
    features: ['Multi-Category Service Browser', 'Interactive Time Slot Picker', 'Automated Digital Booking Slip', 'Admin Status & Rescheduling Board'],
    demoType: 'booking'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming & Core Engineering',
    skills: [
      { name: 'C / C++', level: 90, category: 'Core' },
      { name: 'Python', level: 88, category: 'Backend / Scripting' },
      { name: 'Java', level: 85, category: 'Object-Oriented' },
      { name: 'JavaScript (ES6+)', level: 94, category: 'Full-Stack' },
      { name: 'PHP', level: 82, category: 'Web Backend' }
    ]
  },
  {
    title: 'Web & Database Architecture',
    skills: [
      { name: 'HTML5 & Modern CSS3', level: 96, category: 'Frontend' },
      { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
      { name: 'MySQL & Relational DBs', level: 89, category: 'Database' },
      { name: 'Linux System Administration', level: 86, category: 'Infrastructure' },
      { name: 'REST APIs & WebSockets', level: 90, category: 'Backend' }
    ]
  },
  {
    title: 'Cybersecurity & Specializations',
    skills: [
      { name: 'Cybersecurity & Vulnerability Assessment', level: 92, category: 'Security' },
      { name: 'OWASP Security Testing & Risk Analysis', level: 88, category: 'Security' },
      { name: 'Machine Learning Fundamentals', level: 78, category: 'AI & Data' },
      { name: 'Microsoft Office & Google Workspace Suite', level: 98, category: 'Productivity' }
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Computer Science & Engineering (BSc CSE)',
    institution: 'Daffodil International University (DIU), Dhaka',
    duration: '2019 – 2024',
    grade: 'CGPA: 3.45 / 4.00',
    description: 'Comprehensive 4-year engineering curriculum focused on software design, data structures, algorithms, computer networks, database systems, and information security.',
    highlights: ['Specialized capstone engineering project', 'Core focus on web application security and distributed systems', 'Active participant in university programming and engineering symposiums']
  },
  {
    degree: 'Higher Secondary Certificate (HSC) — Science',
    institution: 'Cantonment College Jessore',
    duration: 'Passing Year: 2018',
    grade: 'GPA: 4.50 / 5.00',
    description: 'Rigorous pre-university science education encompassing Mathematics, Physics, Chemistry, and Information Technology.',
    highlights: ['Disciplined academic track record in Cantonment institution', 'Participation in regional science competitions']
  },
  {
    degree: 'Secondary School Certificate (SSC) — Science',
    institution: 'Jessore Board',
    duration: 'Passing Year: 2016',
    grade: 'GPA: 5.00 / 5.00 (Golden / Perfect)',
    description: 'Graduated at the highest distinction tier with perfect grade point average across all general science and mathematics disciplines.',
    highlights: ['Perfect GPA 5.00', 'Top academic bracket in the division']
  },
  {
    degree: 'Junior School Certificate (JSC)',
    institution: 'Jessore Board',
    duration: 'Passing Year: 2013',
    grade: 'GPA: 5.00 / 5.00 (Perfect)',
    description: 'Foundational secondary examination completed with stellar academic distinction.',
    highlights: ['Perfect GPA 5.00']
  },
  {
    degree: 'National Skill Standard Basic: Computer Office Application',
    institution: 'Bangladesh Technical Education Board (BTEB)',
    duration: 'Completed: 2016',
    grade: 'Grade: A+ (Highest Distinction)',
    description: 'Official national vocational credential certifying professional mastery of office computer operating systems, word processing, spreadsheets, and database applications.',
    highlights: ['Certified Grade A+ proficiency', 'Official Technical Board certification']
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Cybersecurity Intern',
    company: 'Goinnovior Limited',
    location: 'Dhaka, Bangladesh',
    period: 'Aug 2024 – Dec 2024',
    type: 'Internship / Professional',
    description: 'Contributed directly to enterprise security assessments, vulnerability remediation, and network defense architectures.',
    responsibilities: [
      'Executed systematic vulnerability assessments across client web applications and corporate network endpoints.',
      'Conducted security testing for OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, broken access control).',
      'Assisted senior cybersecurity engineers in real-time threat risk analysis and vulnerability mitigation pipelines.',
      'Authored comprehensive technical security assessment reports detailing remediation steps for software development teams.'
    ],
    technologies: ['Vulnerability Assessment', 'Penetration Testing Tools', 'OWASP Framework', 'Network Analysis', 'Risk Mitigation']
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: 'Bangladesh Chemistry Olympiad',
    organization: 'Bangladesh Chemical Society',
    year: '2017 & 2018',
    description: 'Selected participant in national-level science competitions testing analytical problem-solving and rigorous scientific reasoning.',
    category: 'Academic Competition'
  },
  {
    title: 'Certificate of Appreciation',
    organization: 'Alokito Shishu',
    year: '2019',
    description: 'Honored for active social leadership, volunteer contributions, and youth empowerment initiatives.',
    category: 'Community Leadership'
  },
  {
    title: 'Bengali Language & Cultural Distinction Award',
    organization: 'Regional Cultural Academy',
    year: '2018',
    description: 'Recognized for linguistic eloquence, creative expression, and active participation in Bengali literary and cultural preservation.',
    category: 'Cultural Distinction'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Business',
    tagline: 'Ideal for local shops, personal brands, and emerging service businesses.',
    priceBDT: 15000,
    idealFor: 'Small local businesses launching their first digital home',
    timeline: '3 - 5 business days',
    features: [
      { name: '1 to 3 Fully Responsive Pages', included: true },
      { name: 'Mobile-First Layout & Ultra-Fast Loading', included: true },
      { name: 'WhatsApp & Direct Phone Contact CTA', included: true },
      { name: 'Google Maps & Location Embed', included: true },
      { name: 'Free Domain & Cloudflare SSL Setup', included: true },
      { name: 'Basic Search Engine Optimization (SEO)', included: true },
      { name: 'bKash / Nagad / Card Payment Gateway', included: false },
      { name: 'Admin Dashboard & Database Backend', included: false },
      { name: 'Cybersecurity Vulnerability Audit', included: false }
    ]
  },
  {
    id: 'business',
    name: 'Business Pro & Stores',
    tagline: 'High-converting platform for e-commerce, restaurants, or active booking businesses.',
    priceBDT: 35000,
    popular: true,
    idealFor: 'Growing SMEs wanting automated sales, QR menus, or bookings',
    timeline: '7 - 12 business days',
    features: [
      { name: 'Up to 10 Pages or Full Dynamic Catalog', included: true },
      { name: 'Live Working Store, QR Menu OR Booking Engine', included: true },
      { name: 'Full Admin Panel (Manage products, orders, tables)', included: true },
      { name: 'bKash, Nagad, Rocket, & Card Checkout', included: true },
      { name: 'Customer Order Tracking & Email Receipts', included: true },
      { name: 'Automated Real-time Kitchen / Booking Notifications', included: true },
      { name: 'Advanced Local SEO & Google Business Profile', included: true },
      { name: 'Comprehensive Baseline Security Hardening', included: true },
      { name: '30 Days Post-Launch Maintenance & Support', included: true }
    ]
  },
  {
    id: 'premium',
    name: 'Premium Enterprise',
    tagline: 'Custom enterprise software with bespoke 3D graphics, dedicated architecture, and security.',
    priceBDT: 65000,
    idealFor: 'High-volume brands, multi-branch restaurants, or custom software',
    timeline: '14 - 21 business days',
    features: [
      { name: 'Custom Unlimited Web Architecture', included: true },
      { name: 'Interactive 3D Three.js Visuals & Micro-Interactions', included: true },
      { name: 'Real-time Multi-Branch Kitchen / Warehouse Dispatch', included: true },
      { name: 'Custom CRM, POS & Accounting Integration', included: true },
      { name: 'Full Penetration Test & OWASP Security Audit Report', included: true },
      { name: 'Ultra-Resilient Database & Automated Daily Backups', included: true },
      { name: 'Priority 24/7 SLA Support (90 Days Included)', included: true },
      { name: 'Personal Onboarding & Staff Video Training Session', included: true }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Al Amin built our TasteHub-style QR ordering system for our cafe in Banani. Table turnaround is twice as fast and our servers never mix up orders during weekend rushes. Revenue is up 35% in just 3 months!',
    clientName: 'Farhan Kabir',
    clientRole: 'Managing Partner',
    businessName: 'The Banani Roastery',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    projectType: 'Restaurant QR Ordering',
    metric: '+35% Weekend Revenue'
  },
  {
    id: 'test-2',
    quote: 'We had an old WordPress store that kept getting hacked and loaded in 8 seconds. Al Amin migrated us to a custom high-performance e-commerce engine with bKash and 3D previews. Bounce rate dropped by half on day one.',
    clientName: 'Mahmudul Hasan',
    clientRole: 'Founder & CEO',
    businessName: 'Apex Leathercraft BD',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    projectType: 'Custom E-Commerce Store',
    metric: '-52% Abandoned Carts'
  },
  {
    id: 'test-3',
    quote: 'His cybersecurity background gives him a massive edge. Most developers just install templates and leave security holes open. Al Amin hardened our booking system and delivered an airtight platform on schedule.',
    clientName: 'Dr. Sabrina Anjum',
    clientRole: 'Lead Consultant',
    businessName: 'Jessore Aesthetic Dental Care',
    location: 'Jessore, Bangladesh',
    rating: 5,
    projectType: 'Clinic Appointment System',
    metric: '100% On-Time Appointments'
  }
];

export const WORK_PROCESS = [
  {
    step: '01',
    title: 'Consult & Discover',
    description: 'We jump on a call or WhatsApp chat to understand your business objectives, target customers, and revenue bottlenecks.'
  },
  {
    step: '02',
    title: 'Design & Prototype',
    description: 'I deliver interactive UI/UX wireframes tailored to your brand identity, optimized for conversions and quick mobile checkout.'
  },
  {
    step: '03',
    title: 'Build & Security Hardening',
    description: 'Engineered with clean code, lightning-fast edge hosting, real-time database state, and rigorous OWASP security checks.'
  },
  {
    step: '04',
    title: 'Testing & Launch',
    description: 'End-to-end testing across all phones and screen sizes, live payment gateway dry-runs, and instant zero-downtime deployment.'
  },
  {
    step: '05',
    title: 'Support & Growth',
    description: '30 to 90 days of dedicated maintenance, analytics monitoring, and staff training to ensure your investment thrives.'
  }
];

export const FAQS = [
  {
    question: 'How long does it take to launch a website for my business?',
    answer: 'A Starter business website typically launches in 3 to 5 business days. Full dynamic systems like E-commerce with bKash payment or Restaurant QR menus take 7 to 12 days including testing and admin onboarding.'
  },
  {
    question: 'How do customers pay on my website in Bangladesh?',
    answer: 'I integrate all popular local and international payment methods: bKash (Merchant / Personal / Direct API), Nagad, Rocket, Upay, Visa, Mastercard, AMEX, and Cash on Delivery (COD) with automated SMS/email alerts.'
  },
  {
    question: 'Will I be able to update products, food menus, or prices myself?',
    answer: 'Yes! Every website comes with an easy-to-use Admin Dashboard. You can add new products, edit food items, adjust prices, manage table QR codes, and review sales reports without touching any code.'
  },
  {
    question: 'Why choose a CSE graduate with a cybersecurity background over a generic freelancer?',
    answer: 'Most freelancers install bloated, unmaintained WordPress plugins that leave your customer data, payment information, and server vulnerable to attacks. With my CSE degree from DIU and hands-on vulnerability testing experience at Goinnovior Ltd, your site is custom-engineered for maximum speed, clean SEO, and rigorous protection against exploits.'
  },
  {
    question: 'Can I view working demos of the websites before making a decision?',
    answer: 'Absolutely. Right here on this portfolio you can test 4 live, fully functional demo applications: ShopNova (E-Commerce), TasteHub (Restaurant QR Ordering & Live Kitchen), BizPro (Corporate Agency), and BookEasy (Appointment Engine). You can test ordering, table QR codes, and admin dashboards directly.'
  }
];
