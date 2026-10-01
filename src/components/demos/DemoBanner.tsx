import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, RotateCcw, Check, Sparkles } from 'lucide-react';
import { appStorage } from '../../lib/storage';
import { PORTFOLIO_INFO } from '../../data/portfolioData';

interface DemoBannerProps {
  demoName: string;
  adminCredentials?: { email: string; pass: string; role: string };
  onBackToPortfolio: () => void;
  onOpenAdminModal?: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  demoName,
  adminCredentials,
  onBackToPortfolio,
  onOpenAdminModal
}) => {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    appStorage.resetAllData();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2200);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-cyan-500/30 px-3 sm:px-6 py-2.5 shadow-xl text-slate-100">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Back + Demo Marker */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortfolio}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-white">
              {demoName}
            </span>
            <span className="hidden md:inline-block text-xs text-slate-400 font-normal">
              · Built by Al Amin (DIU CSE & Cybersecurity)
            </span>
          </div>
        </div>

        {/* Center: Admin Credentials Helper if provided */}
        {adminCredentials && (
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono bg-slate-900/90 px-3 py-1 rounded-md border border-slate-800">
            <span className="text-slate-400">Demo Admin:</span>
            <span className="text-cyan-400 font-semibold">{adminCredentials.email}</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400 font-semibold">{adminCredentials.pass}</span>
            {onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                className="ml-2 text-xs font-sans text-cyan-300 underline hover:text-cyan-200"
              >
                Log In
              </button>
            )}
          </div>
        )}

        {/* Right: Actions (Reset + Hire Me / Contact) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            title="Reset demo data to initial state"
            className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 px-2.5 py-1.5 rounded-lg transition-all"
          >
            {resetSuccess ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Reset Done</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3 h-3 text-slate-400" />
                <span className="hidden sm:inline">Reset Demo</span>
              </>
            )}
          </button>

          <a
            href={PORTFOLIO_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black px-3 py-1.5 rounded-lg shadow-sm transition-transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>Want a site like this?</span>
          </a>
        </div>
      </div>
    </header>
  );
};
