import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Eye, Terminal, ArrowUpRight } from 'lucide-react';
import { Navbar } from './components/portfolio/Navbar';
import { Hero3D } from './components/portfolio/Hero3D';
import { AboutSection } from './components/portfolio/AboutSection';
import { ServicesSection } from './components/portfolio/ServicesSection';
import { DemosShowcase } from './components/portfolio/DemosShowcase';
import { BenchmarkComparison } from './components/portfolio/BenchmarkComparison';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { EducationTimeline } from './components/portfolio/EducationTimeline';
import { ExperienceSection } from './components/portfolio/ExperienceSection';
import { SecurityAuditTool } from './components/portfolio/SecurityAuditTool';
import { AchievementsSection } from './components/portfolio/AchievementsSection';
import { PricingSection } from './components/portfolio/PricingSection';
import { ProcessSection } from './components/portfolio/ProcessSection';
import { ClientProjectTracker } from './components/portfolio/ClientProjectTracker';
import { ArchitectureVisualizer } from './components/portfolio/ArchitectureVisualizer';
import { TestimonialsSection } from './components/portfolio/TestimonialsSection';
import { FaqSection } from './components/portfolio/FaqSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { Footer } from './components/portfolio/Footer';
import { CvModal } from './components/portfolio/CvModal';
import { FloatingWhatsApp } from './components/portfolio/FloatingWhatsApp';
import { AiStudioModal } from './components/ai/AiStudioModal';
import { DevicePreviewModal } from './components/portfolio/DevicePreviewModal';
import { FloatingBatFairy } from './components/effects/FloatingBatFairy';

import { EcommerceApp } from './components/demos/ecommerce/EcommerceApp';
import { RestaurantApp } from './components/demos/restaurant/RestaurantApp';
import { BusinessApp } from './components/demos/business/BusinessApp';
import { BookingApp } from './components/demos/booking/BookingApp';
import { PORTFOLIO_INFO } from './data/portfolioData';
import { TRANSLATIONS, Language } from './lib/translations';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const [lang, setLang] = useState<Language>('en');
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiModalTab, setAiModalTab] = useState<'chat' | 'voice' | 'search' | 'image' | 'video' | 'transcribe'>('chat');

  // Device Simulation Modal
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewRoute, setPreviewRoute] = useState<string>('/demo/ecommerce');

  const openDevicePreview = (route: string) => {
    setPreviewRoute(route);
    setIsPreviewOpen(true);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openAiStudio = (tab: 'chat' | 'voice' | 'search' | 'image' | 'video' | 'transcribe' = 'chat') => {
    setAiModalTab(tab);
    setIsAiModalOpen(true);
  };

  // Route Dispatcher
  if (currentPath.startsWith('/demo/ecommerce')) {
    return <EcommerceApp onBackToPortfolio={() => navigateTo('/')} />;
  }

  if (currentPath.startsWith('/demo/restaurant')) {
    return <RestaurantApp onBackToPortfolio={() => navigateTo('/')} />;
  }

  if (currentPath.startsWith('/demo/business')) {
    return <BusinessApp onBackToPortfolio={() => navigateTo('/')} />;
  }

  if (currentPath.startsWith('/demo/booking')) {
    return <BookingApp onBackToPortfolio={() => navigateTo('/')} />;
  }

  const heroT = TRANSLATIONS[lang].hero;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black font-sans">
      {/* Top Bar Nav */}
      <Navbar
        onNavigateDemo={navigateTo}
        onOpenCvModal={() => setIsCvOpen(true)}
        onOpenAiModal={() => openAiStudio('chat')}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'en' ? 'bn' : 'en'))}
      />

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-20 border-b border-slate-900 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Left: Value Proposition */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/40">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-semibold">{heroT.badge}</span>
              </div>

              {/* Commanding High-Impact Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-white tracking-tight leading-[1.08] text-balance">
                {lang === 'bn' ? (
                  <>
                    আমি এমন ওয়েবসাইট তৈরি করি যা আপনার{' '}
                    <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                      ব্যবসার সেলস বহুগুণ বাড়াবে
                    </span>
                  </>
                ) : (
                  <>
                    I Build High-Performance Websites That{' '}
                    <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                      Grow Your Revenue
                    </span>
                  </>
                )}
              </h1>

              {/* Subheadline with high legibility */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {lang === 'bn' ? heroT.subheadline : PORTFOLIO_INFO.subheadline}
              </p>

              {/* High-Converting Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="#demos"
                  className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>{heroT.viewDemos}</span>
                </a>

                <a
                  href={PORTFOLIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/50 text-emerald-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/40"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WhatsApp Al Amin</span>
                </a>

                <a
                  href="#contact"
                  className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>{heroT.hireMe}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => openAiStudio('chat')}
                  className="px-4 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-900/60 text-cyan-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  title="Explore Gemini AI Live APIs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{heroT.aiSuite}</span>
                </button>
              </div>

              {/* Quantitative Proof Strip */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-4 gap-3 text-center lg:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-cyan-400">4/4</div>
                  <div className="text-[11px] text-slate-400 font-medium">Working Demos</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-white">&lt;0.8s</div>
                  <div className="text-[11px] text-slate-400 font-medium">Ultra-Fast Load</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">OWASP</div>
                  <div className="text-[11px] text-slate-400 font-medium">Hardened Security</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-amber-400">3.45</div>
                  <div className="text-[11px] text-slate-400 font-medium">DIU BSc CSE</div>
                </div>
              </div>

              {/* Quick 1-Click Demo Launcher Chips */}
              <div className="pt-3">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block mb-2">
                  ⚡ 1-Click Launch Working Demos:
                </span>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {[
                    { label: '🛍️ E-Commerce Store', route: '/demo/ecommerce' },
                    { label: '🍽️ Restaurant QR Menu', route: '/demo/restaurant' },
                    { label: '🏢 Corporate Portal', route: '/demo/business' },
                    { label: '📅 Booking System', route: '/demo/booking' },
                  ].map((demo) => (
                    <button
                      key={demo.route}
                      onClick={() => navigateTo(demo.route)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-850 text-slate-300 hover:text-cyan-300 font-medium text-xs transition-all active:scale-95 shadow-sm"
                    >
                      {demo.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Right: 3D Scene */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* Main Portfolio Sections */}
      <AboutSection />
      <ServicesSection onOpenDemo={navigateTo} />
      <DemosShowcase onOpenDemo={navigateTo} onPreviewDemo={openDevicePreview} lang={lang} />
      <BenchmarkComparison lang={lang} />
      <SkillsSection />
      <ArchitectureVisualizer lang={lang} />
      <EducationTimeline />
      <ExperienceSection />
      <SecurityAuditTool lang={lang} />
      <AchievementsSection />
      <PricingSection lang={lang} />
      <ProcessSection />
      <ClientProjectTracker lang={lang} />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />

      {/* Footer */}
      <Footer
        onOpenCvModal={() => setIsCvOpen(true)}
        onNavigateDemo={navigateTo}
      />

      {/* Printable CV Modal */}
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />

      {/* Gemini AI Studio Suite Modal */}
      <AiStudioModal
        isOpen={isAiModalOpen}
        initialTab={aiModalTab}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Interactive Device Viewport Simulation Modal */}
      <DevicePreviewModal
        isOpen={isPreviewOpen}
        demoRoute={previewRoute}
        onClose={() => setIsPreviewOpen(false)}
        onOpenFullScreen={(route) => {
          setIsPreviewOpen(false);
          navigateTo(route);
        }}
      />

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Whimsical Harry Potter Fairy Bat Babe Ghost Flight Animation */}
      <FloatingBatFairy />
    </div>
  );
}
