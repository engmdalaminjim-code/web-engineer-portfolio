import React from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
            Technical Stack & Engineering Mastery
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2">
            Languages, Systems & Security Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Rigorous computer science foundations honed through 4 years at DIU (CGPA 3.45) and real-world penetration testing at Goinnovior Ltd.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-900/50 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{cat.title}</span>
                </h3>

                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                        <span className="font-mono text-cyan-400 tabular-nums">{skill.level}%</span>
                      </div>

                      {/* Animated Progress Track */}
                      <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800/80 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <div className="text-[10px] text-slate-500">{skill.category}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Assurance Note */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                Verified in live enterprise production environments
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
