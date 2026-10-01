import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, LogIn, LogOut, User as UserIcon, Globe } from 'lucide-react';
import { auth, signInWithGoogle, logOut } from '../../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { TRANSLATIONS } from '../../lib/translations';

interface NavbarProps {
  onNavigateDemo?: (demoRoute: string) => void;
  onOpenCvModal: () => void;
  onOpenAiModal: () => void;
  lang?: 'en' | 'bn';
  onToggleLang?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateDemo,
  onOpenCvModal,
  onOpenAiModal,
  lang = 'en',
  onToggleLang
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  const t = TRANSLATIONS[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <span>Al Amin</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </a>

        {/* Zone 2: clean text navigation links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-300">
          <a href="#services" className="hover:text-cyan-400 transition-colors">
            {t.services}
          </a>
          <a href="#demos" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.demos}</span>
          </a>
          <a href="#benchmark" className="hover:text-cyan-400 transition-colors">
            {t.speedVsWp}
          </a>
          <a href="#security" className="hover:text-cyan-400 transition-colors">
            {t.security}
          </a>
          <a href="#tracker" className="hover:text-cyan-400 transition-colors">
            {t.tracker}
          </a>
          <a href="#pricing" className="hover:text-cyan-400 transition-colors">
            {t.pricing}
          </a>
          <button
            onClick={onOpenAiModal}
            className="hover:text-cyan-400 text-cyan-400 font-bold transition-colors flex items-center gap-1 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Studio Suite</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions + Firebase Auth + Language Switcher */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Toggle */}
          {onToggleLang && (
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 hover:text-cyan-400 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors"
              title="Switch language between English and Bangla"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-2 p-1 pl-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-4 h-4 text-cyan-400" />
              )}
              <span className="font-medium text-white max-w-[100px] truncate">
                {currentUser.displayName || currentUser.email}
              </span>
              <button
                onClick={() => logOut()}
                title="Sign out of Firebase"
                className="p-1 rounded-lg text-slate-400 hover:text-rose-400"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sign In</span>
            </button>
          )}

          <button
            onClick={onOpenCvModal}
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors"
          >
            CV
          </button>

          <a
            href="#contact"
            className="text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 px-4 py-2 rounded-lg shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <span>{t.contact}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          {onToggleLang && (
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-cyan-400"
            >
              {lang === 'en' ? 'বাংলা' : 'EN'}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiModal();
              }}
              className="text-left text-cyan-400 font-bold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Gemini AI Studio Suite</span>
            </button>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>{t.services}</a>
            <a href="#demos" onClick={() => setMobileMenuOpen(false)}>{t.demos}</a>
            <a href="#benchmark" onClick={() => setMobileMenuOpen(false)}>{t.speedVsWp}</a>
            <a href="#security" onClick={() => setMobileMenuOpen(false)}>{t.security}</a>
            <a href="#tracker" onClick={() => setMobileMenuOpen(false)}>{t.tracker}</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)}>{t.skills}</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#education" onClick={() => setMobileMenuOpen(false)}>{t.education}</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>{t.pricing}</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t.contact}</a>
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between text-xs py-2">
                <span className="text-slate-300 truncate">{currentUser.email}</span>
                <button onClick={() => logOut()} className="text-rose-400 font-semibold">Sign Out</button>
              </div>
            ) : (
              <button
                onClick={() => signInWithGoogle()}
                className="w-full py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-center text-cyan-400 font-semibold flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Google Sign-In (Firebase)</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="w-full py-2.5 rounded-lg border border-slate-800 text-xs text-center text-slate-300 font-semibold"
            >
              Download Full CV (PDF)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
