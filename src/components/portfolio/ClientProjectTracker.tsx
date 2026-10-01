import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Download,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Code,
  Layers,
  Server,
  Terminal,
  Calendar
} from 'lucide-react';

interface ProjectMilestone {
  step: number;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  date: string;
  description: string;
}

interface TrackedProject {
  code: string;
  clientName: string;
  businessName: string;
  projectType: string;
  startDate: string;
  targetLaunchDate: string;
  progressPercent: number;
  statusText: string;
  domain: string;
  totalBudgetBDT: string;
  milestones: ProjectMilestone[];
  securityStatus: string;
  invoiceNumber: string;
}

const SAMPLE_PROJECTS: Record<string, TrackedProject> = {
  'DEMO-2026': {
    code: 'DEMO-2026',
    clientName: 'Shahriar Ahmed',
    businessName: 'Apex Artisan Leather & Goods',
    projectType: 'E-Commerce Store + 3D Viewer + bKash Gateway',
    startDate: '2026-09-15',
    targetLaunchDate: '2026-10-08',
    progressPercent: 85,
    statusText: 'OWASP Security Testing & Final QA',
    domain: 'apexartisan.com.bd',
    totalBudgetBDT: '৳38,000',
    securityStatus: 'A+ Hardening Pass (TLS 1.3, CSP Strict)',
    invoiceNumber: 'INV-2026-098',
    milestones: [
      {
        step: 1,
        title: 'Discovery & System Specification',
        status: 'completed',
        date: 'Sep 16, 2026',
        description: 'Finalized product catalogue hierarchy, bKash merchant API credentials, and delivery zone logic.'
      },
      {
        step: 2,
        title: 'High-Fidelity UI & Three.js 3D Viewer',
        status: 'completed',
        date: 'Sep 22, 2026',
        description: 'Built interactive 3D leather bag orbit view and responsive mobile-first cart drawer.'
      },
      {
        step: 3,
        title: 'Database Schema & Admin Dashboard',
        status: 'completed',
        date: 'Sep 28, 2026',
        description: 'PostgreSQL inventory tables, real-time order dispatcher, and multi-status courier sync.'
      },
      {
        step: 4,
        title: 'Cybersecurity Penetration Test',
        status: 'in-progress',
        date: 'Oct 02, 2026',
        description: 'Executing OWASP Top 10 vulnerability test (SQL injection, XSS, rate-limiting, CSRF token validation).'
      },
      {
        step: 5,
        title: 'Production Launch & DNS Pointing',
        status: 'upcoming',
        date: 'Oct 08, 2026',
        description: 'Custom domain connection, edge CDN caching, and 30-day post-launch warranty handover.'
      }
    ]
  },
  'REST-501': {
    code: 'REST-501',
    clientName: 'Tanvir Hossain',
    businessName: 'Saffron Bistro & Lounge (Gulshan)',
    projectType: 'Restaurant Dine-In QR Menu + Live Kitchen KDS',
    startDate: '2026-09-20',
    targetLaunchDate: '2026-10-05',
    progressPercent: 100,
    statusText: 'Launched & Handed Over to Restaurant Staff',
    domain: 'saffronbistro.menu',
    totalBudgetBDT: '৳28,000',
    securityStatus: 'Verified & Active in Production',
    invoiceNumber: 'INV-2026-104',
    milestones: [
      {
        step: 1,
        title: 'Menu Architecture & Table Layout',
        status: 'completed',
        date: 'Sep 21, 2026',
        description: 'Generated 24 unique high-res QR codes for ground and mezzanine floor tables.'
      },
      {
        step: 2,
        title: 'Instant Customer Mobile Menu',
        status: 'completed',
        date: 'Sep 25, 2026',
        description: 'Zero-app-install lightweight mobile menu with chef recommendations and spicy tags.'
      },
      {
        step: 3,
        title: 'Live Kitchen Display (KDS) & Sound Alerts',
        status: 'completed',
        date: 'Sep 28, 2026',
        description: 'Sound synthesizer triggers immediate beep when a customer places an order.'
      },
      {
        step: 4,
        title: 'Staff Training & Handover',
        status: 'completed',
        date: 'Oct 01, 2026',
        description: 'Waitstaff trained on thermal receipt printing and status updates (Preparing -> Ready -> Served).'
      }
    ]
  }
};

export const ClientProjectTracker: React.FC<{ lang?: 'en' | 'bn' }> = ({ lang = 'en' }) => {
  const [projectCodeInput, setProjectCodeInput] = useState('DEMO-2026');
  const [currentProject, setCurrentProject] = useState<TrackedProject | null>(SAMPLE_PROJECTS['DEMO-2026']);
  const [errorMessage, setErrorMessage] = useState('');

  const isBn = lang === 'bn';

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = projectCodeInput.trim().toUpperCase();
    if (SAMPLE_PROJECTS[query]) {
      setCurrentProject(SAMPLE_PROJECTS[query]);
      setErrorMessage('');
    } else {
      setErrorMessage(
        isBn
          ? 'প্রজেক্ট কোড পাওয়া যায়নি। অনুগ্রহ করে DEMO-2026 অথবা REST-501 চেষ্টা করুন।'
          : 'Project code not found. Try testing with DEMO-2026 or REST-501.'
      );
    }
  };

  return (
    <section id="tracker" className="py-24 border-b border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-xs font-mono text-cyan-300 mb-3">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isBn ? 'কাজের শতভাগ স্বচ্ছতা' : 'Client Transparency'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
              {isBn ? 'লাইভ ক্লায়েন্ট প্রজেক্ট ট্র্যাকার' : 'Live Client Project Milestone Tracker'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              {isBn
                ? 'যখন আপনি আল আমিনের সাথে কাজ করবেন, তখন আপনার প্রজেক্টের প্রতিটি ধাপ আপনি রিয়েল-টাইমে ট্র্যাক করতে পারবেন।'
                : 'No ghosting or wondering what stage your website is at. Enter your project reference code to view live milestones and security audit reports.'}
            </p>
          </div>

          {/* Quick Demo Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">{isBn ? 'নমুনা কোড:' : 'Demo codes:'}</span>
            <button
              onClick={() => {
                setProjectCodeInput('DEMO-2026');
                setCurrentProject(SAMPLE_PROJECTS['DEMO-2026']);
                setErrorMessage('');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 hover:border-cyan-500/50"
            >
              DEMO-2026
            </button>
            <button
              onClick={() => {
                setProjectCodeInput('REST-501');
                setCurrentProject(SAMPLE_PROJECTS['REST-501']);
                setErrorMessage('');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 hover:border-cyan-500/50"
            >
              REST-501
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
          <div className="relative flex items-center">
            <input
              type="text"
              value={projectCodeInput}
              onChange={(e) => setProjectCodeInput(e.target.value)}
              placeholder="Enter Project ID (e.g. DEMO-2026)"
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <Search className="w-5 h-5 text-slate-500 absolute left-4 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
            >
              {isBn ? 'খুঁজুন' : 'Track'}
            </button>
          </div>
          {errorMessage && (
            <p className="text-xs text-rose-400 mt-2 text-center font-medium">{errorMessage}</p>
          )}
        </form>

        {/* Project Card */}
        {currentProject && (
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Top Bar: Project Meta */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-xs font-mono text-cyan-300 font-bold">
                    {currentProject.code}
                  </span>
                  <span className="text-xs text-slate-400">
                    {isBn ? 'ক্লায়েন্ট:' : 'Client:'} <strong className="text-white">{currentProject.clientName}</strong>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {isBn ? 'ইনভয়েস:' : 'Invoice:'} {currentProject.invoiceNumber}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-2">
                  {currentProject.businessName}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-400 font-medium mt-1">
                  {currentProject.projectType}
                </p>
              </div>

              {/* Progress Ring / Percentage */}
              <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 self-start lg:self-auto">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">{isBn ? 'সামগ্রিক অগ্রগতি' : 'Overall Progress'}</span>
                  <span className="text-2xl font-mono font-extrabold text-cyan-400">
                    {currentProject.progressPercent}%
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">{isBn ? 'শুরুর তারিখ' : 'Kickoff Date'}</span>
                <span className="text-white font-mono font-semibold">{currentProject.startDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isBn ? 'টার্গেট লঞ্চ' : 'Target Launch'}</span>
                <span className="text-cyan-400 font-mono font-semibold">{currentProject.targetLaunchDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isBn ? 'ডোমেইন' : 'Target Domain'}</span>
                <span className="text-white font-mono font-semibold">{currentProject.domain}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isBn ? 'সাইবার অডিট' : 'Security Hardening'}</span>
                <span className="text-emerald-400 font-semibold">{currentProject.securityStatus}</span>
              </div>
            </div>

            {/* Milestones Flow */}
            <div className="mt-8">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{isBn ? 'প্রজেক্ট মাইলস্টোন ও কাজের ধাপ' : 'Project Milestones & Deliverables'}</span>
              </h4>

              <div className="space-y-4">
                {currentProject.milestones.map((m) => {
                  const isDone = m.status === 'completed';
                  const isProg = m.status === 'in-progress';
                  return (
                    <div
                      key={m.step}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isDone
                          ? 'bg-slate-950/60 border-slate-800'
                          : isProg
                          ? 'bg-cyan-950/30 border-cyan-500/50 shadow-lg shadow-cyan-950/20'
                          : 'bg-slate-950/20 border-slate-900 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                            isDone
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : isProg
                              ? 'bg-cyan-400 text-black animate-pulse'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : m.step}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm sm:text-base font-bold text-white">
                              {m.title}
                            </h5>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                isDone
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                                  : isProg
                                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/50'
                                  : 'bg-slate-900 text-slate-500'
                              }`}
                            >
                              {isDone ? 'Completed' : isProg ? 'In Progress' : 'Upcoming'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 font-mono shrink-0 sm:text-right pl-11 sm:pl-0">
                        {m.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Client Action Bar */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Protected by Al Amin Cybersecurity Protocol & NDA</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/8801837684439?text=${encodeURIComponent(
                    `Hello Al Amin, checking on my project ${currentProject.code} (${currentProject.businessName})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>{isBn ? 'সরাসরি প্রশ্ন করুন' : 'Ask Question'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#contact"
                  className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-extrabold flex items-center gap-1.5 transition-all"
                >
                  <span>{isBn ? 'নতুন প্রজেক্ট শুরু করুন' : 'Start Your Project'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
