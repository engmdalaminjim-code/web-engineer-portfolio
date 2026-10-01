import React from 'react';
import { WORK_PROCESS } from '../../data/portfolioData';

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
            Methodology & Delivery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mt-2 leading-tight">
            How I Work: From Initial Idea to Profitable Launch
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            A transparent, 5-phase engineering protocol engineered to eliminate surprises, keep budgets intact, and guarantee on-time delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {WORK_PROCESS.map((proc, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-cyan-400/40 block mb-4">
                  {proc.step}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{proc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{proc.description}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/60 text-[10px] font-mono text-cyan-300">
                Phase {idx + 1} Milestone
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
