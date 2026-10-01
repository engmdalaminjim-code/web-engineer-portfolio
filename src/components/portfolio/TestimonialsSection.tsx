import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const item = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
            Client Endorsements & Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2">
            Trusted By Businesses Across Bangladesh
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Real outcomes from local restaurateurs, retail founders, and healthcare directors.
          </p>
        </div>

        {/* Testimonials Slider Card */}
        <div className="relative rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 overflow-hidden max-w-4xl mx-auto">
          <Quote className="w-16 h-16 text-cyan-500/10 absolute top-6 right-6 pointer-events-none" />

          <div className="flex items-center gap-1 mb-6 text-amber-400">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>

          <blockquote className="text-base sm:text-xl text-slate-200 leading-relaxed italic mb-8 font-light">
            &ldquo;{item.quote}&rdquo;
          </blockquote>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
            <div>
              <div className="font-bold text-white text-base">{item.clientName}</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {item.clientRole} · <span className="text-cyan-400 font-medium">{item.businessName}</span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                <span>{item.location}</span>
                <span>·</span>
                <span className="text-emerald-400 font-mono font-medium">{item.metric}</span>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous review"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400 px-2">
                {currentIndex + 1} / {TESTIMONIALS.length}
              </span>
              <button
                onClick={next}
                aria-label="Next review"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
