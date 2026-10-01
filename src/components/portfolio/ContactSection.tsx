import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  MessageSquare,
  CheckCircle2,
  Send,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_INFO } from '../../data/portfolioData';
import { appStorage } from '../../lib/storage';
import { db, auth, handleFirestoreError, OperationType } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('E-Commerce Website');
  const [budget, setBudget] = useState('৳35,000 (Business Pro)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // 1. Local AppStorage
    appStorage.saveContactLead({
      name,
      email,
      phone,
      service,
      budget,
      message
    });

    // 2. Firebase Firestore persistence
    const leadId = 'lead-' + Date.now();
    try {
      await setDoc(doc(db, 'leads', leadId), {
        name,
        email,
        phone: phone || '',
        service,
        budget,
        message,
        userId: auth.currentUser?.uid || 'guest',
        status: 'new',
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Firestore lead sync notice:', err);
    }

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');

    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch {
      // fallback
    }

    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact" className="py-24 border-b border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Trust Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
                Start Your Project
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mt-2 leading-tight">
                Let&apos;s Build A Website That Grows Your Revenue
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-3">
                Have a project idea, store concept, or restaurant requiring smart QR ordering? Reach out directly via WhatsApp or fill the project brief form.
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-3 pt-2">
              <a
                href={PORTFOLIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 hover:border-emerald-400 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Fastest Reply via WhatsApp</span>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300">
                      {PORTFOLIO_INFO.phone}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-semibold">Chat Now →</span>
              </a>

              <a
                href={`mailto:${PORTFOLIO_INFO.email}`}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 text-cyan-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Direct Email</span>
                  <span className="text-sm font-semibold text-white">{PORTFOLIO_INFO.email}</span>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-blue-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Location Base</span>
                  <span className="text-sm font-semibold text-white">{PORTFOLIO_INFO.location}</span>
                </div>
              </div>

              <a
                href={PORTFOLIO_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 flex items-center gap-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-blue-400 flex items-center justify-center">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">LinkedIn Profile</span>
                  <span className="text-sm font-semibold text-white">linkedin.com/in/al-amin</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl relative">
              <h3 className="text-xl font-bold text-white mb-1">Send a Project Brief</h3>
              <p className="text-xs text-slate-400 mb-6">
                All submissions are securely encrypted and dispatched directly to Al Amin with immediate notifications.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Message Dispatched Successfully!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you for reaching out. Al Amin will review your project details and follow up via email or WhatsApp within a few hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Asif Rahman"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. asif@company.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Phone / WhatsApp</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 1..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Service Needed</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="E-Commerce Website">E-Commerce Website (3D/Store)</option>
                        <option value="Restaurant QR Menu & Kitchen System">Restaurant QR Menu & Kitchen System</option>
                        <option value="Corporate / Company Flagship">Corporate / Company Flagship</option>
                        <option value="Online Booking & Scheduling Engine">Online Booking & Scheduling Engine</option>
                        <option value="Website Security & Penetration Audit">Website Security & Penetration Audit</option>
                        <option value="Executive Portfolio">Executive Portfolio</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Project Budget Target</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="৳15,000 (Starter Business)">৳15,000 (Starter Business)</option>
                      <option value="৳35,000 (Business Pro & Stores)">৳35,000 (Business Pro & Stores — Recommended)</option>
                      <option value="৳65,000+ (Premium Enterprise)">৳65,000+ (Premium Enterprise)</option>
                      <option value="Custom Scope / Retainer">Custom Scope / Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Project Details & Requirements</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your business, current website or goals..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Project Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
