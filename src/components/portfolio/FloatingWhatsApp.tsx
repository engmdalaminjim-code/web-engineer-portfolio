import React from 'react';
import { MessageSquare } from 'lucide-react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={PORTFOLIO_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat directly with Al Amin on WhatsApp"
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-2xl hover:shadow-emerald-500/30 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
    >
      <MessageSquare className="w-6 h-6 fill-black" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold text-xs pl-0 group-hover:pl-2">
        Chat on WhatsApp
      </span>
    </a>
  );
};
