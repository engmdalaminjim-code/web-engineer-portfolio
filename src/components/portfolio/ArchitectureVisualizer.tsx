import React, { useState } from 'react';
import {
  Server,
  Cpu,
  Layers,
  ShieldCheck,
  CreditCard,
  Zap,
  Sparkles,
  ArrowRight,
  Database,
  CheckCircle2,
  Box,
  Radio,
  Globe
} from 'lucide-react';

interface TechNode {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ElementType;
  metric: string;
  metricLabel: string;
  details: string;
  features: string[];
  color: string;
}

const ARCHITECTURE_NODES: TechNode[] = [
  {
    id: 'edge',
    title: 'Global Edge CDN & DNS',
    subtitle: 'Vercel / Cloudflare Network',
    category: 'Layer 1: Network Ingress',
    icon: Globe,
    metric: '< 45ms',
    metricLabel: 'Time to First Byte',
    details: 'Worldwide static caching and anycast DNS routing ensures instant load times across all Bangladeshi telecom networks (Grameenphone, Banglalink, Robi, Teletalk) and international ISPs.',
    features: ['Brotli compression', 'Auto HTTP/3 support', 'Automatic TLS 1.3 SSL handshake'],
    color: '#38bdf8'
  },
  {
    id: 'frontend',
    title: 'React 19 & Tailwind v4',
    subtitle: 'Component Architecture',
    category: 'Layer 2: Presentation & UI',
    icon: Layers,
    metric: '99/100',
    metricLabel: 'Lighthouse Performance',
    details: 'Zero-slop declarative UI engineered with typed component contracts, accessible semantic markup, and hardware-accelerated animations.',
    features: ['Zero CSS bundle bloat', 'Dynamic route prefetching', 'Mobile-first fluid responsive layouts'],
    color: '#34d399'
  },
  {
    id: 'threejs',
    title: 'Three.js 3D Engine',
    subtitle: 'WebGL Spatial Hardware Acceleration',
    category: 'Layer 3: 3D Visualization',
    icon: Box,
    metric: '60 FPS',
    metricLabel: 'Turntable Smoothness',
    details: 'Embedded 3D graphics rendered with WebGL shaders allowing customers to inspect 3D products in 360-degree orbit directly inside the browser without apps.',
    features: ['Studio ambient lighting', 'Mouse/touch orbital controls', 'Low-poly optimized memory buffer'],
    color: '#a78bfa'
  },
  {
    id: 'database',
    title: 'Realtime Database Bus',
    subtitle: 'Supabase / Firebase Firestore',
    category: 'Layer 4: Data Persistence',
    icon: Database,
    metric: '< 100ms',
    metricLabel: 'Realtime Sync Latency',
    details: 'Reactive event synchronization connecting customer checkout directly to the kitchen display screen and admin inventory ledger without page reloads.',
    features: ['Attribute-Based Access Control', 'Automated indexing', 'Zero-downtime database migrations'],
    color: '#f59e0b'
  },
  {
    id: 'payment',
    title: 'Payment & Notifications',
    subtitle: 'bKash / Nagad / Web Audio',
    category: 'Layer 5: Commercial Conversion',
    icon: CreditCard,
    metric: '100%',
    metricLabel: 'Checkout Success',
    details: 'Frictionless Bangladeshi payment flows with QR scanning, transaction ID verification, and browser audio chime alerts when orders arrive.',
    features: ['bKash & Nagad quick pay', 'Instant invoice generation', 'Thermal receipt printing support'],
    color: '#ec4899'
  },
  {
    id: 'security',
    title: 'OWASP Security Shield',
    subtitle: 'Cybersecurity Intern Protocols',
    category: 'Layer 6: Platform Defense',
    icon: ShieldCheck,
    metric: 'A+',
    metricLabel: 'Security Grade',
    details: 'Engineered by a Daffodil International University CSE graduate and former cybersecurity intern. Hardened against SQLi, XSS, CSRF, and clickjacking attacks.',
    features: ['Strict CSP directives', 'X-Frame-Options: DENY', 'HSTS 63072000 max-age'],
    color: '#06b6d4'
  }
];

export const ArchitectureVisualizer: React.FC<{ lang?: 'en' | 'bn' }> = ({ lang = 'en' }) => {
  const [selectedNode, setSelectedNode] = useState<TechNode>(ARCHITECTURE_NODES[0]);

  const isBn = lang === 'bn';

  return (
    <section id="architecture" className="py-24 border-b border-slate-900 bg-slate-950/80 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-xs font-mono text-cyan-300 mb-3">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isBn ? 'প্রযুক্তিগত উৎকর্ষতা' : 'Engineered For Extreme Reliability'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
              {isBn ? 'আল আমিনের সিস্টেম আর্কিটেকচার এক্সপ্লোরার' : 'Interactive System Architecture Explorer'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              {isBn
                ? 'একটি সফল ওয়েবসাইটের প্রতিটি স্তরের কার্যপ্রণালী দেখুন। নিচের যে কোনো লেয়ারে ক্লিক করে বিস্তারিত টেকনিক্যাল মেট্রিক্স জানুন।'
                : 'Click through each layer of the production stack to explore how frontend speed, 3D rendering, database sync, and cybersecurity combine.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono hidden lg:block">
            <span className="text-cyan-400 font-bold">Six-Layer</span> Modern Web Pipeline
          </div>
        </div>

        {/* Visual Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Node Selector */}
          <div className="lg:col-span-5 space-y-3">
            {ARCHITECTURE_NODES.map((node, idx) => {
              const isSelected = selectedNode.id === node.id;
              const Icon = node.icon;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-950/30'
                      : 'bg-slate-950 hover:bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                      style={{
                        backgroundColor: `${node.color}15`,
                        color: node.color,
                        border: `1px solid ${node.color}35`
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">
                        0{idx + 1}. {node.category}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {node.title}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-extrabold text-cyan-400 block">
                      {node.metric}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {node.metricLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Inspection Panel */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div
              className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: selectedNode.color }}
            />

            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold block">
                  {selectedNode.category}
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white mt-1">
                  {selectedNode.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {selectedNode.subtitle}
                </p>
              </div>

              {/* Big Metric Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-400 block">
                  {selectedNode.metric}
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {selectedNode.metricLabel}
                </span>
              </div>
            </div>

            {/* Prose */}
            <p className="text-sm text-slate-300 py-6 leading-relaxed border-b border-slate-800">
              {selectedNode.details}
            </p>

            {/* Features Checklist */}
            <div className="pt-6 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                {isBn ? 'মূল প্রযুক্তিগত বৈশিষ্ট্যসমূহ:' : 'Key Engineering Capabilities:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedNode.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Callout */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                Audited & Maintained by Al Amin (DIU CSE & Cybersecurity)
              </span>

              <a
                href="#contact"
                className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <span>{isBn ? 'এই আর্কিটেকচারে সাইট তৈরি করুন' : 'Deploy This Architecture'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
