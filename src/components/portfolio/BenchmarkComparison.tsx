import React, { useState } from 'react';
import { Gauge, ShieldCheck, Zap, DollarSign, Database, Check, X, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface MetricProps {
  label: string;
  customScore: string;
  customDetail: string;
  wpScore: string;
  wpDetail: string;
  isCustomWinner: boolean;
}

export const BenchmarkComparison: React.FC<{ lang?: 'en' | 'bn' }> = ({ lang = 'en' }) => {
  const [activeTab, setActiveTab] = useState<'performance' | 'security' | 'financial'>('performance');

  const isBn = lang === 'bn';

  return (
    <section id="benchmark" className="py-24 border-b border-slate-900 bg-slate-950/70 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-xs font-mono text-cyan-300 mb-3">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isBn ? 'আধুনিক প্রযুক্তির সুবিধা' : 'Why Custom Architecture Wins'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
              {isBn
                ? 'কাস্টম Next.js ইঞ্জিনিয়ারিং বনাম ধীরগতির ওয়ার্ডপ্রেস'
                : 'Custom Next.js Stack vs. Bloated WordPress Sites'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              {isBn
                ? 'প্রতি ১ সেকেন্ড লোডিং বিলম্ব ব্যবসার কনভার্সন ৭% কমিয়ে দেয়। জেনে নিন কেন আল আমিনের কাস্টম আর্কিটেকচার আপনার ব্যবসাকে শীর্ষ অবস্থানে রাখবে।'
                : 'A 1-second delay in page load causes a 7% drop in customer conversions. See how my zero-slop custom engineering beats slow plugins.'}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'performance' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'গতি ও এসইও' : 'Speed & SEO'}
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'security' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'সাইবার নিরাপত্তা' : 'Cybersecurity'}
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'financial' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'লাভ ও খরচ' : 'ROI & Zero Fees'}
            </button>
          </div>
        </div>

        {/* Visual Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card Left: Al Amin Custom Architecture (The Winner) */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-cyan-400/80 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 relative flex flex-col justify-between">
            <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-400 text-black font-extrabold text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? 'প্রস্তাবিত পছন্দ' : 'Al Amin Standard'}</span>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Next.js + Tailwind + Edge API</h3>
                  <span className="text-xs font-mono text-cyan-400">Custom Built from Ground Up</span>
                </div>
              </div>

              {activeTab === 'performance' && (
                <div className="space-y-4 my-6">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'গুগল লাইটহাউস স্কোর' : 'Google Lighthouse Score'}</span>
                      <span className="text-2xl font-mono font-extrabold text-cyan-400">98 - 100 / 100</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      {isBn ? 'শীর্ষ গতি' : 'Ultra Fast'}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'প্রথম বাইট রেসপন্স (TTFB)' : 'Time to First Byte (TTFB)'}</span>
                      <span className="text-xl font-mono font-bold text-white">&lt; 45 ms</span>
                    </div>
                    <span className="text-xs text-slate-400">{isBn ? 'গ্লোবাল এজ সিডিএন' : 'Global Edge Edge CDN'}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'ইন্টারঅ্যাক্টিভ ৩ডি ও অ্যানিমেশন' : '3D Orbit Viewer & Smooth Animations'}</span>
                      <span className="text-sm font-semibold text-cyan-300">60 FPS Hardware-Accelerated Three.js</span>
                    </div>
                    <Check className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-4 my-6">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'ওওয়াস্প টপ ১০ সুরক্ষা' : 'OWASP Top 10 Hardening'}</span>
                      <span className="text-lg font-bold text-emerald-400">100% Protected (No SQLi / XSS)</span>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs text-slate-400 block">{isBn ? 'সিকিউরিটি হেডার ও এনক্রিপশন' : 'Strict Security Headers'}</span>
                    <span className="text-xs font-mono text-cyan-300 block mt-1">HSTS, CSP Strict, X-Frame-Options: DENY, TLS 1.3</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'প্লাগইন নিরাপত্তা ঝুঁকি' : 'Third-Party Plugin Vulnerability'}</span>
                      <span className="text-sm font-semibold text-white">0% External Plugin Exploits</span>
                    </div>
                    <Check className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              )}

              {activeTab === 'financial' && (
                <div className="space-y-4 my-6">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'মাসিক প্লাগইন লাইসেন্স ফি' : 'Monthly Recurring Plugin Fees'}</span>
                      <span className="text-2xl font-mono font-bold text-cyan-400">৳0 / month</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{isBn ? '১০০% আপনার নিজস্ব কোড' : '100% Client Owned'}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'হোস্টিং খরচ' : 'Cloud Hosting Overhead'}</span>
                      <span className="text-sm font-semibold text-emerald-400">Free Tier Eligible on Vercel / Cloud Run</span>
                    </div>
                    <Check className="w-5 h-5 text-cyan-400" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'কনভার্সন রেট ও সেলস' : 'Average E-Commerce Conversion Rate'}</span>
                      <span className="text-xl font-mono font-bold text-white">4.2% - 5.8%</span>
                    </div>
                    <span className="text-xs text-cyan-400 font-bold">+180% More Orders</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {isBn ? 'প্রফেশনাল সাইবার সিকিউরিটি কোডিং' : 'Audited by Al Amin (DIU CSE)'}
              </span>
              <a
                href="#contact"
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>{isBn ? 'পরামর্শ নিন' : 'Get This Stack'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card Right: Slow WordPress / Freelancer Template (The Problem) */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-900/40 border border-rose-950/60 p-6 sm:p-8 flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-950/40 border border-rose-800/40 flex items-center justify-center text-rose-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-300">Generic WordPress / Nulled Themes</h3>
                  <span className="text-xs font-mono text-rose-400">Standard 25+ Plugin Marketplace Template</span>
                </div>
              </div>

              {activeTab === 'performance' && (
                <div className="space-y-4 my-6">
                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-rose-950/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'গুগল লাইটহাউস স্কোর' : 'Google Lighthouse Score'}</span>
                      <span className="text-2xl font-mono font-bold text-rose-400">38 - 54 / 100</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-bold">
                      {isBn ? 'অত্যন্ত ধীর' : 'Sluggish / Fails Core Web Vitals'}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'প্রথম বাইট রেসপন্স' : 'Time to First Byte (TTFB)'}</span>
                      <span className="text-xl font-mono font-bold text-slate-400">850 ms - 2,400 ms</span>
                    </div>
                    <span className="text-xs text-rose-400">{isBn ? 'সার্ভার হ্যাং করে' : 'Database Bottlenecks'}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'মোবাইল ইউজার এক্সপেরিয়েন্স' : 'Mobile Experience'}</span>
                      <span className="text-sm text-slate-400">Heavy JS scripts cause jitter & crash</span>
                    </div>
                    <X className="w-5 h-5 text-rose-400" />
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-4 my-6">
                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-rose-950/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'হ্যাকিং ঝুঁকি' : 'Vulnerability Profile'}</span>
                      <span className="text-lg font-bold text-rose-400">90%+ of CMS hacks target WP plugins</span>
                    </div>
                    <X className="w-5 h-5 text-rose-400" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                    <span className="text-xs text-slate-400 block">{isBn ? 'কমন দুর্বলতা' : 'Frequent Threat Vectors'}</span>
                    <span className="text-xs font-mono text-rose-300 block mt-1">Nulled theme backdoors, SQL injection, automated bot attacks</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'সাপোর্ট ও আপডেট' : 'Maintenance Reality'}</span>
                      <span className="text-sm text-slate-400">Plugin updates frequently break website layout</span>
                    </div>
                    <X className="w-5 h-5 text-rose-400" />
                  </div>
                </div>
              )}

              {activeTab === 'financial' && (
                <div className="space-y-4 my-6">
                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'লুকায়িত বার্ষিক খরচ' : 'Hidden Annual License Fees'}</span>
                      <span className="text-2xl font-mono font-bold text-rose-400">৳25,000 - ৳50,000 / yr</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">Elementor + WooCommerce extensions</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'সার্ভার রিসোর্স অপচয়' : 'Heavy Server Resource Needs'}</span>
                      <span className="text-sm text-slate-400">Requires expensive VPS just to stay online</span>
                    </div>
                    <X className="w-5 h-5 text-rose-400" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{isBn ? 'গড় কনভার্সন রেট' : 'Average E-Commerce Conversion'}</span>
                      <span className="text-xl font-mono font-bold text-slate-400">0.8% - 1.4%</span>
                    </div>
                    <span className="text-xs text-rose-400">Customers bounce on slow loading</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-500 italic">
              {isBn
                ? 'ওয়ার্ডপ্রেসের ভারী প্লাগইন বারবার আপডেট দিতে গিয়ে সাইট ক্র্যাশ করার তিক্ত অভিজ্ঞতা থেকে বাঁচুন।'
                : 'Avoid fragile WordPress setups that crash after plugin updates and leave customer data exposed.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
