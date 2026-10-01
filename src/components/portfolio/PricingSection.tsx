import React, { useState } from 'react';
import { Check, X, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { PRICING_PLANS } from '../../data/portfolioData';
import { CostCalculator } from './CostCalculator';

interface PricingSectionProps {
  onSelectPlan?: (planName: string) => void;
  lang?: 'en' | 'bn';
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan, lang = 'en' }) => {
  const [plans, setPlans] = useState(PRICING_PLANS);
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');

  const isBn = lang === 'bn';
  const exchangeRate = 120; // 1 USD ~ 120 BDT

  const formatPrice = (bdtPrice: number) => {
    if (currency === 'USD') {
      return `$${Math.round(bdtPrice / exchangeRate).toLocaleString()}`;
    }
    return `৳${bdtPrice.toLocaleString()}`;
  };

  return (
    <section id="pricing" className="py-24 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
              Investment & Commercial Rates
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mt-2 leading-tight">
              Transparent, High-ROI Packages for Growing Businesses
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              All plans include custom production code, lightning-fast edge hosting setup, and zero monthly template fees.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                currency === 'BDT' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              BDT (৳)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                currency === 'USD' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-400 shadow-2xl shadow-cyan-950/40 md:-translate-y-2'
                  : 'bg-slate-900/50 border border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-400 text-black text-[11px] font-extrabold font-mono uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                </div>

                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                    {formatPrice(plan.priceBDT)}
                  </span>
                  <span className="text-xs text-slate-500">/ one-time</span>
                </div>

                <p className="text-xs text-slate-400 mb-4">{plan.tagline}</p>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300 mb-6">
                  <div className="text-slate-400">Estimated Delivery:</div>
                  <div className="font-semibold text-cyan-400 mt-0.5">{plan.timeline}</div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                    What&apos;s Included:
                  </span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      {feat.included ? (
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      )}
                      <span className={feat.included ? 'text-slate-200' : 'text-slate-500 line-through'}>
                        {feat.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#contact"
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 overflow-x-auto">
          <h3 className="text-lg font-bold text-white mb-6">Feature Comparison Matrix</h3>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="pb-3 pr-4">Feature / Capability</th>
                <th className="pb-3 px-4 text-center">Starter</th>
                <th className="pb-3 px-4 text-center text-cyan-400 font-bold">Business Pro</th>
                <th className="pb-3 pl-4 text-center">Premium Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 pr-4 font-medium text-white">Full Responsive Mobile-First Design</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-cyan-400 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-cyan-400 mx-auto" /></td>
                <td className="py-3 pl-4 text-center"><Check className="w-4 h-4 text-cyan-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-white">Online Store / QR Menu / Booking Engine</td>
                <td className="py-3 px-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-cyan-400 mx-auto" /></td>
                <td className="py-3 pl-4 text-center"><Check className="w-4 h-4 text-cyan-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-white">bKash, Nagad & Card Payment Gateways</td>
                <td className="py-3 px-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-cyan-400 mx-auto" /></td>
                <td className="py-3 pl-4 text-center"><Check className="w-4 h-4 text-cyan-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-white">Admin Dashboard & Database Backend</td>
                <td className="py-3 px-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-cyan-400 mx-auto" /></td>
                <td className="py-3 pl-4 text-center"><Check className="w-4 h-4 text-cyan-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-white">Interactive 3D Graphics & Three.js</td>
                <td className="py-3 px-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="py-3 pl-4 text-center"><Check className="w-4 h-4 text-cyan-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-white">Vulnerability Audit & OWASP Hardening</td>
                <td className="py-3 px-4 text-center">Basic SSL</td>
                <td className="py-3 px-4 text-center text-cyan-400 font-semibold">Standard Hardening</td>
                <td className="py-3 pl-4 text-center text-cyan-300 font-semibold">Full Pentest Report</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-white">Free Maintenance & Support</td>
                <td className="py-3 px-4 text-center">14 Days</td>
                <td className="py-3 px-4 text-center text-cyan-400 font-bold">30 Days</td>
                <td className="py-3 pl-4 text-center text-cyan-300 font-bold">90 Days Priority</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Interactive Custom Quote & Cost Calculator */}
        <CostCalculator />
      </div>
    </section>
  );
};
