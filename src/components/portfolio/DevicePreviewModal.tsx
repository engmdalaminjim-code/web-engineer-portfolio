import React, { useState } from 'react';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EcommerceApp } from '../demos/ecommerce/EcommerceApp';
import { RestaurantApp } from '../demos/restaurant/RestaurantApp';
import { BusinessApp } from '../demos/business/BusinessApp';
import { BookingApp } from '../demos/booking/BookingApp';

interface DevicePreviewModalProps {
  isOpen: boolean;
  demoRoute: string; // e.g. '/demo/ecommerce', '/demo/restaurant'
  onClose: () => void;
  onOpenFullScreen: (route: string) => void;
}

export const DevicePreviewModal: React.FC<DevicePreviewModalProps> = ({
  isOpen,
  demoRoute,
  onClose,
  onOpenFullScreen
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen) return null;

  const getDemoTitle = () => {
    switch (demoRoute) {
      case '/demo/ecommerce':
        return 'ShopNova 3D Audio & Tech Store';
      case '/demo/restaurant':
        return 'TasteHub Artisan Dine-In & QR Menu';
      case '/demo/business':
        return 'BizPro Enterprise Corporate Studio';
      case '/demo/booking':
        return 'BookEasy Multi-Category Booking Engine';
      default:
        return 'Live Demo Preview';
    }
  };

  const renderDemoApp = () => {
    switch (demoRoute) {
      case '/demo/ecommerce':
        return <EcommerceApp onBackToPortfolio={onClose} />;
      case '/demo/restaurant':
        return <RestaurantApp onBackToPortfolio={onClose} />;
      case '/demo/business':
        return <BusinessApp onBackToPortfolio={onClose} />;
      case '/demo/booking':
        return <BookingApp onBackToPortfolio={onClose} />;
      default:
        return null;
    }
  };

  const getDeviceFrameStyles = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[375px] max-w-full h-[760px] rounded-[48px] border-[12px] border-slate-900 shadow-2xl overflow-hidden ring-1 ring-slate-800 relative';
      case 'tablet':
        return 'w-[768px] max-w-full h-[850px] rounded-[36px] border-[14px] border-slate-900 shadow-2xl overflow-hidden ring-1 ring-slate-800 relative';
      case 'desktop':
      default:
        return 'w-full h-[85vh] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-7xl h-[95vh] bg-slate-950 border border-slate-800 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Control Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/80">
          {/* Left: Title & Live indicator */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {getDemoTitle()}
              </h3>
              <span className="text-[11px] font-mono text-cyan-400 block">
                Interactive Responsive Viewport Simulator
              </span>
            </div>
          </div>

          {/* Center: Device Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                deviceMode === 'desktop' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View (Full Width)"
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden md:inline">Desktop</span>
            </button>

            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                deviceMode === 'tablet' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="iPad / Tablet View (768px)"
            >
              <Tablet className="w-4 h-4" />
              <span className="hidden md:inline">Tablet</span>
            </button>

            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                deviceMode === 'mobile' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="iPhone / Mobile View (375px)"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden md:inline">Mobile</span>
            </button>
          </div>

          {/* Right: Fullscreen & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenFullScreen(demoRoute)}
              className="px-3 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-extrabold flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <span>Full Route</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Simulation Area */}
        <div className="flex-1 bg-slate-900/30 overflow-y-auto p-4 sm:p-6 flex items-start justify-center">
          <div className={getDeviceFrameStyles()}>
            {/* Notch / Speaker for phone/tablet */}
            {deviceMode === 'mobile' && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-40 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-1 ring-slate-800" />
              </div>
            )}

            <div className="w-full h-full overflow-y-auto bg-slate-950">
              {renderDemoApp()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
