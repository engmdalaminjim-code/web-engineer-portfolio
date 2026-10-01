import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../../data/portfolioData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 border-b border-slate-900 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
            Answers & Clarity
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Everything business owners ask before commissioning an e-commerce store, restaurant menu, or corporate web platform.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-cyan-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
