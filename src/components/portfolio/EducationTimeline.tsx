import React from 'react';
import { GraduationCap, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { EDUCATION } from '../../data/portfolioData';

export const EducationTimeline: React.FC = () => {
  return (
    <section id="education" className="py-24 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
            Academic Background & Certified Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mt-2 leading-tight">
            Education & Academic Track Record
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            A consistent record of distinction across top institutions in Bangladesh, culminating in a 3.45 CGPA Bachelor of Science in Computer Science & Engineering.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {EDUCATION.map((edu, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform shadow-lg shadow-cyan-950">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Education Card */}
              <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 p-6 sm:p-7 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.duration}</span>
                  </span>

                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 font-bold">
                    {edu.grade}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {edu.degree}
                </h3>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  {edu.institution}
                </div>

                <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                  {edu.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap gap-3">
                  {edu.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
