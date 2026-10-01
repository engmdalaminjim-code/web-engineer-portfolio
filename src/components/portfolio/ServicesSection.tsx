import React from 'react';
import {
  ShoppingBag,
  Utensils,
  Briefcase,
  CalendarCheck,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Check
} from 'lucide-react';
import { SERVICES } from '../../data/portfolioData';

interface ServicesSectionProps {
  onSelectServiceCta?: (serviceTitle: string) => void;
  onOpenDemo?: (demoType: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceCta, onOpenDemo }) => {
  const iconMap: Record<string, React.ElementType> = {
    ShoppingBag,
    Utensils,
    Briefcase,
    CalendarCheck,
    Sparkles,
    ShieldAlert
  };

  return (
    <section id="services" className="py-24 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
            Commercial Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mt-2 leading-tight">
            High-Performance Web Solutions Engineered To Convert & Scale
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            I don’t just deliver code—I deliver working sales channels, automated order dispatchers, and hardened platforms for businesses across Bangladesh and abroad.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, idx) => {
            const Icon = iconMap[srv.iconName] || Briefcase;
            return (
              <div
                key={srv.id}
                className="rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 p-6 sm:p-7 transition-all hover:shadow-2xl hover:shadow-cyan-950/20 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    {srv.badge && (
                      <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/40">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 block">
                    0{idx + 1}. {srv.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-slate-800/60">
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables & Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Includes: </span>
                    <span className="text-slate-300 font-medium">{srv.deliverables}</span>
                  </div>

                  <a
                    href="#contact"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-cyan-400 transition-colors shrink-0"
                    title="Inquire about this service"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
