import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, MessageSquare, DollarSign } from 'lucide-react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';

export const CostCalculator: React.FC = () => {
  const [projectType, setProjectType] = useState<'ecommerce' | 'restaurant' | 'corporate' | 'booking'>('ecommerce');
  const [pageCount, setPageCount] = useState<number>(5);
  const [hasPaymentGateway, setHasPaymentGateway] = useState<boolean>(true);
  const [has3DViewer, setHas3DViewer] = useState<boolean>(true);
  const [hasSecurityAudit, setHasSecurityAudit] = useState<boolean>(true);
  const [hasMultiLang, setHasMultiLang] = useState<boolean>(false);

  // Price Calculation Logic
  const basePrices: Record<string, number> = {
    ecommerce: 28000,
    restaurant: 22000,
    corporate: 18000,
    booking: 24000,
  };

  const basePrice = basePrices[projectType] || 20000;
  const pageCost = (pageCount - 1) * 1200;
  const paymentCost = hasPaymentGateway ? 6000 : 0;
  const threeDCost = has3DViewer ? 8000 : 0;
  const securityCost = hasSecurityAudit ? 5000 : 0;
  const multiLangCost = hasMultiLang ? 4000 : 0;

  const totalEstimateBDT = basePrice + pageCost + paymentCost + threeDCost + securityCost + multiLangCost;

  // Estimated ROI Benefit
  const roiImpacts: Record<string, string> = {
    ecommerce: '+40% higher online sales with 3D product previews and instant bKash checkout',
    restaurant: '2.5x faster table turnover and zero server errors during rush dining hours',
    corporate: '+120% qualified inbound B2B client inquiries with high-speed landing pages',
    booking: '100% elimination of appointment double-bookings and automated SMS reminders',
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Al Amin, I used your website project calculator:
- Project Type: ${projectType.toUpperCase()}
- Pages: ${pageCount}
- bKash/Card Payment: ${hasPaymentGateway ? 'Yes' : 'No'}
- 3D Viewer: ${has3DViewer ? 'Yes' : 'No'}
- Security Audit: ${hasSecurityAudit ? 'Yes' : 'No'}
- Estimated Quote: ৳${totalEstimateBDT.toLocaleString()}
I would like to discuss building this for my business!`
  );

  return (
    <div className="mt-14 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase">
            <Calculator className="w-4 h-4" />
            <span>Interactive Project Estimation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Build Your Custom Package & Calculate Investment
          </h3>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40">
          Transparent BDT Rates
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left: Configuration controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Project Type */}
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase font-semibold block mb-2">
              Select Business Domain:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ecommerce', label: 'E-Commerce Store' },
                { id: 'restaurant', label: 'Restaurant QR Menu' },
                { id: 'corporate', label: 'Corporate Flagship' },
                { id: 'booking', label: 'Appointment Engine' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setProjectType(item.id as any)}
                  className={`p-3 rounded-xl text-xs font-bold transition-all text-left ${
                    projectType === item.id
                      ? 'bg-cyan-500 text-black shadow-md'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Page Count Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400 font-mono">Estimated Page / View Count:</span>
              <span className="text-white font-mono font-bold">{pageCount} Pages</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={pageCount}
              onChange={(e) => setPageCount(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
            />
          </div>

          {/* Feature Add-ons */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold block">
              Optional High-Value Modules:
            </span>

            {[
              {
                label: 'bKash, Nagad & Card Automated Payment Gateway',
                checked: hasPaymentGateway,
                toggle: () => setHasPaymentGateway(!hasPaymentGateway),
                price: '+৳6,000',
              },
              {
                label: 'Interactive 3D Three.js Product Inspection Orbit',
                checked: has3DViewer,
                toggle: () => setHas3DViewer(!has3DViewer),
                price: '+৳8,000',
              },
              {
                label: 'Comprehensive OWASP Penetration Test & Security Hardening',
                checked: hasSecurityAudit,
                toggle: () => setHasSecurityAudit(!hasSecurityAudit),
                price: '+৳5,000',
              },
              {
                label: 'Dual Language Support (Bengali & English)',
                checked: hasMultiLang,
                toggle: () => setHasMultiLang(!hasMultiLang),
                price: '+৳4,000',
              },
            ].map((mod, idx) => (
              <div
                key={idx}
                onClick={mod.toggle}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center ${
                      mod.checked ? 'bg-cyan-500 text-black' : 'border border-slate-700'
                    }`}
                  >
                    {mod.checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={mod.checked ? 'text-white font-medium' : 'text-slate-400'}>
                    {mod.label}
                  </span>
                </div>
                <span className="text-cyan-400 font-mono text-[11px] font-semibold">{mod.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary & Instant Quote */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
              Estimated Investment
            </span>
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1 font-mono tracking-tight">
              ৳{totalEstimateBDT.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              One-time full delivery with source code & 30-day warranty
            </p>

            {/* Expected Business ROI */}
            <div className="mt-5 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs">
              <span className="text-cyan-400 font-bold block mb-1">Expected Commercial Impact:</span>
              <p className="text-slate-300 leading-relaxed">{roiImpacts[projectType]}</p>
            </div>

            <div className="mt-4 space-y-1 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Estimated Timeline:</span>
                <span className="text-white font-medium">7 - 12 Days</span>
              </div>
              <div className="flex justify-between">
                <span>Domain & SSL Setup:</span>
                <span className="text-emerald-400 font-medium">Included Free</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <a
              href={`https://wa.me/8801837684439?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950/40"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Lock Quote on WhatsApp</span>
            </a>

            <a
              href="#contact"
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Book Discovery Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
