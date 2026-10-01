import React from 'react';
import { Sparkles, ArrowRight, ExternalLink, Monitor, Smartphone, CheckCircle, Database, Eye } from 'lucide-react';
import { DEMO_PROJECTS } from '../../data/portfolioData';
import { DemoProject } from '../../types/portfolio';

interface DemosShowcaseProps {
  onOpenDemo: (route: string) => void;
  onPreviewDemo?: (route: string) => void;
  lang?: 'en' | 'bn';
}

export const DemosShowcase: React.FC<DemosShowcaseProps> = ({ onOpenDemo, onPreviewDemo, lang = 'en' }) => {
  const isBn = lang === 'bn';
  return (
    <section id="demos" className="py-24 border-b border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Proof */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{isBn ? 'ইন্টারঅ্যাক্টিভ পোর্টফোলিও · রিয়েল ডাটাবেজ ব্যাকএন্ড' : 'Interactive Portfolio · Real Database Backend'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
              {isBn ? '৪টি ১০০% কার্যকর লাইভ ওয়েবসাইট ডেমো টেস্ট করুন' : 'Test 4 Live, Fully Functional Demo Sites'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              {isBn
                ? 'কোনো ফেক স্ক্রিনশট নয়। প্রতিটি ডেমোতে রয়েছে লাইভ কার্ট, ৩ডি ভিউয়ার, কিউআর কোড জেনারেশন এবং কিচেন অডিও অ্যালার্ট।'
                : 'No static mockup screenshots. Click any project below to test real checkout, 3D orbit inspection, table QR generation, audio kitchen alerts, and appointment booking.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono hidden lg:block">
            <span className="text-cyan-400 font-bold">100% Operational</span> · Persistent State
          </div>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DEMO_PROJECTS.map((demo: DemoProject) => (
            <div
              key={demo.id}
              className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-950/20 p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative"
            >
              <div>
                {/* Header Meta */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: demo.accentColor }}
                    />
                    <span className="text-xs font-mono font-semibold text-slate-300">
                      {demo.category}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-cyan-300">
                    {demo.badge}
                  </span>
                </div>

                {/* Device Mockup Graphic Visual Frame */}
                <div
                  onClick={() => onOpenDemo(demo.route)}
                  className="relative w-full h-52 sm:h-64 rounded-2xl bg-slate-950 border border-slate-800/90 overflow-hidden cursor-pointer group-hover:border-cyan-500/40 transition-all flex flex-col justify-between p-4 my-4"
                >
                  {/* Subtle Background Radial Gradient */}
                  <div
                    className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: demo.accentColor }}
                  />

                  {/* Browser Bar Mockup */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      alamin.dev{demo.route}
                    </span>
                    <span className="w-4" />
                  </div>

                  {/* Dynamic Visual Content */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-3">
                    <span
                      className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
                      style={{ color: demo.accentColor }}
                    >
                      {demo.title}
                    </span>
                    <p className="text-xs text-slate-400 max-w-sm mt-1">
                      {demo.tagline}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-cyan-300 font-semibold group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                      <span>{isBn ? 'ইন্টারঅ্যাক্টিভ ডেমো চালু করুন' : 'Launch Interactive Demo'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Metric Bar */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{demo.metrics}</span>
                    <span className="text-cyan-400 font-mono">Live DB Connected</span>
                  </div>
                </div>

                {/* Details Prose */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {demo.title} — {demo.tagline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {demo.description}
                </p>

                {/* Key Features Pill list */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {demo.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {demo.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {onPreviewDemo && (
                    <button
                      onClick={() => onPreviewDemo(demo.route)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                      title="Quick preview in device simulator"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">{isBn ? 'ডিভাইস ফ্রেম' : 'Device Preview'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => onOpenDemo(demo.route)}
                    className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold transition-transform active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{isBn ? 'লাইভ ডেমো খুলুন' : 'Open Live Demo'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
