import React from 'react';
import { Award, Trophy, Sparkles, BookOpen } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-20 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
            Recognitions & Honors
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2">
            Notable Achievements & Leadership
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Recognitions spanning competitive academic olympiads, community youth leadership, and cultural contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-900/50 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-semibold">{item.year}</span>
                </div>

                <span className="text-[11px] font-mono text-cyan-400 block mb-1">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <div className="text-xs text-slate-300 font-medium mb-3">{item.organization}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                Official Credential Verified
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
