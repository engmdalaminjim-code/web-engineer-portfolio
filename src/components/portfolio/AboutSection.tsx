import React from 'react';
import { ShieldCheck, Award, Globe, Code2, GraduationCap, CheckCircle } from 'lucide-react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Photo / Visual Identity Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Subtle Back Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-xl opacity-70" />

              <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl overflow-hidden">
                {/* Visual Avatar / Photo Container with Zero-Broken-Image Policy */}
                <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 border border-slate-800/80 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center shadow-inner relative mb-4">
                    <span className="text-4xl font-display font-extrabold text-cyan-300">AA</span>
                    <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-950 border border-cyan-400 text-cyan-400 shadow-md">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">Al Amin</h3>
                  <div className="text-xs text-cyan-400 font-mono mt-0.5">
                    BSc CSE (DIU) · Cybersecurity Intern
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <span>Dhaka & Jessore</span>
                    <span aria-hidden="true">·</span>
                    <span>Full-Stack Web Architect</span>
                  </div>
                </div>

                {/* Language Proficiency Matrix */}
                <div className="mt-5 pt-4 border-t border-slate-800 space-y-2.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Language Proficiency
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                      <div className="font-semibold text-white">Bengali</div>
                      <div className="text-[11px] text-cyan-400 mt-0.5">Native Speaker</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                      <div className="font-semibold text-white">English</div>
                      <div className="text-[11px] text-cyan-400 mt-0.5">Professional Working</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
                About The Engineer & Agency Founder
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mt-2 leading-tight">
                Engineering Commercial Websites That Never Compromise On Speed Or Security
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {PORTFOLIO_INFO.bio}
            </p>

            {/* Key Differentiators Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <GraduationCap className="w-4 h-4" />
                  <span>Daffodil International University</span>
                </div>
                <p className="text-xs text-slate-400">
                  BSc in Computer Science & Engineering with CGPA 3.45. Deep foundations in algorithms, databases, and system design.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Goinnovior Cybersecurity Intern</span>
                </div>
                <p className="text-xs text-slate-400">
                  Practical vulnerability assessment, penetration testing, and risk remediation protecting businesses against exploits.
                </p>
              </div>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>100% Working Live Demos Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>No WordPress Bloat · Custom Code</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>bKash, Nagad & Card Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
