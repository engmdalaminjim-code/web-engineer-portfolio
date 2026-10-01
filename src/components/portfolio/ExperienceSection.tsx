import React from 'react';
import { ShieldCheck, Calendar, MapPin, CheckCircle, Bug, Lock, FileText } from 'lucide-react';
import { EXPERIENCE } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
            Professional Industry Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mt-2 leading-tight">
            Cybersecurity & Web Defense Engineering
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Hands-on vulnerability testing experience with enterprise systems at Goinnovior Limited, directly elevating the security standard of every website built for clients.
          </p>
        </div>

        <div className="space-y-8">
          {EXPERIENCE.map((exp, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-9 relative overflow-hidden"
            >
              {/* Back Accent Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white tracking-tight">{exp.role}</span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                      {exp.type}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-cyan-400 mt-1">
                    {exp.company}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>OWASP Top 10 Assessment Certified</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Responsibilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
                {exp.responsibilities.map((resp, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/70 flex items-start gap-2.5 text-xs text-slate-300"
                  >
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2">Key Competencies:</span>
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
