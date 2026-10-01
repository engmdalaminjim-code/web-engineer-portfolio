import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, FileDown, ArrowUp, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';

interface FooterProps {
  onOpenCvModal: () => void;
  onNavigateDemo: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCvModal, onNavigateDemo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Brand & Value */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-xl font-display font-extrabold text-white tracking-tight flex items-center gap-1.5">
              <span>Al Amin</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </span>
            <p className="text-slate-400 leading-relaxed text-xs">
              Computer Science & Engineering graduate (DIU) & cybersecurity specialist building high-performance web applications for businesses.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OWASP Audited Web Engineering</span>
            </div>
          </div>

          {/* Working Demo Links */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Working Demos
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigateDemo('/demo/ecommerce')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  ShopNova (3D E-Commerce)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDemo('/demo/restaurant')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  TasteHub (Restaurant QR Menu)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDemo('/demo/business')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  BizPro (Corporate Agency)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDemo('/demo/booking')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  BookEasy (Appointment Engine)
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Navigation
            </span>
            <ul className="space-y-1.5">
              <li><a href="#services" className="hover:text-cyan-400">Services & Offerings</a></li>
              <li><a href="#skills" className="hover:text-cyan-400">Technical Skills</a></li>
              <li><a href="#education" className="hover:text-cyan-400">Education Timeline</a></li>
              <li><a href="#experience" className="hover:text-cyan-400">Cybersecurity Experience</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400">Pricing Packages (BDT)</a></li>
              <li><a href="#contact" className="hover:text-cyan-400">Contact & Project Inquiries</a></li>
            </ul>
          </div>

          {/* Download & Social */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Credentials & Contact
            </span>
            <div className="space-y-2">
              <button
                onClick={onOpenCvModal}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Download Official CV (PDF)</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div>Email: <a href={`mailto:${PORTFOLIO_INFO.email}`} className="text-slate-200 hover:underline">{PORTFOLIO_INFO.email}</a></div>
              <div>Phone: <span className="text-slate-200">{PORTFOLIO_INFO.phone}</span></div>
              <div>Location: <span className="text-slate-200">{PORTFOLIO_INFO.location}</span></div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} Al Amin. All rights reserved. Built with Next-gen React, Three.js, and TypeScript.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
