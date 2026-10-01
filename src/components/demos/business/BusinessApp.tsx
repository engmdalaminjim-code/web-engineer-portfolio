import React, { useState, useEffect } from 'react';
import {
  Building2,
  TrendingUp,
  Shield,
  Layers,
  Users,
  FileText,
  Mail,
  ArrowRight,
  CheckCircle2,
  Lock,
  Plus,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DemoBanner } from '../DemoBanner';
import { BusinessArticle, BusinessInquiry } from '../../../types/demos';
import { appStorage } from '../../../lib/storage';

interface BusinessAppProps {
  onBackToPortfolio: () => void;
}

export const BusinessApp: React.FC<BusinessAppProps> = ({ onBackToPortfolio }) => {
  const [articles, setArticles] = useState<BusinessArticle[]>([]);
  const [inquiries, setInquiries] = useState<BusinessInquiry[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Inquiry form
  const [companyName, setCompanyName] = useState('Apex Industrial BD');
  const [contactPerson, setContactPerson] = useState('Nafis Chowdhury');
  const [email, setEmail] = useState('nafis@apexbd.com');
  const [serviceNeeded, setServiceNeeded] = useState('Enterprise Cloud Migration');
  const [message, setMessage] = useState('Looking to build an automated B2B portal with high security standards.');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // New Article Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Tech Strategy');
  const [newExcerpt, setNewExcerpt] = useState('');

  useEffect(() => {
    const load = () => {
      setArticles(appStorage.getBusinessArticles());
      setInquiries(appStorage.getBusinessInquiries());
    };
    load();
    const u1 = appStorage.subscribe('business_articles', load);
    const u2 = appStorage.subscribe('business_inquiries', load);
    return () => {
      u1();
      u2();
    };
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInq: BusinessInquiry = {
      id: 'inq-' + Date.now(),
      companyName,
      contactPerson,
      email,
      serviceNeeded,
      message,
      createdAt: new Date().toISOString()
    };
    appStorage.addBusinessInquiry(newInq);
    setInquirySuccess(true);
    setTimeout(() => setInquirySuccess(false), 3500);

    try {
      confetti({ particleCount: 50, spread: 50 });
    } catch {
      // fallback
    }
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const art: BusinessArticle = {
      id: 'art-' + Date.now(),
      title: newTitle,
      category: newCategory,
      readTime: '3 min read',
      excerpt: newExcerpt || 'Strategic insight on enterprise scaling.',
      content: 'Full editorial insight published through BizPro CMS.',
      publishedAt: 'Oct 2026'
    };
    appStorage.saveBusinessArticle(art);
    setNewTitle('');
    setNewExcerpt('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DemoBanner
        demoName="BizPro Corporate & B2B Flagship"
        adminCredentials={{ email: 'admin@bizpro.com', pass: 'biz123', role: 'CMS Manager' }}
        onBackToPortfolio={onBackToPortfolio}
        onOpenAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Corporate Nav */}
      <header className="border-b border-slate-800 bg-slate-900/60 sticky top-12 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            <span className="text-xl font-display font-bold text-white tracking-tight">BizPro Global</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#services" className="hover:text-blue-400">Services</a>
            <a href="#projects" className="hover:text-blue-400">Case Studies</a>
            <a href="#team" className="hover:text-blue-400">Leadership</a>
            <a href="#articles" className="hover:text-blue-400">Insights</a>
            <a href="#contact" className="hover:text-blue-400">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              CMS Admin
            </button>
            <a
              href="#contact"
              className="text-xs px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              Get Consultation
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 space-y-16">
        {/* Corporate Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-widest">
            Enterprise Digital Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
            We Engineer Mission-Critical Systems for High-Growth Enterprises
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            From modern automated client portals to hardened cloud infrastructures, we build software that turns complex operations into sustained competitive advantages.
          </p>
        </section>

        {/* Quantified Business Metrics */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { metric: '$4.2M+', label: 'Client Revenue Facilitated' },
            { metric: '99.98%', label: 'Infrastructure Uptime SLA' },
            { metric: '-42%', label: 'Average Bounce Latency' },
            { metric: '0 Breaches', label: 'OWASP Verified Records' }
          ].map((m, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-400">{m.metric}</div>
              <div className="text-xs text-slate-400 mt-1">{m.label}</div>
            </div>
          ))}
        </section>

        {/* Services Bento */}
        <section id="services" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase">Capabilities</span>
              <h2 className="text-2xl font-bold text-white mt-1">End-to-End Enterprise Services</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Each engagement is spearheaded by senior software engineers and cybersecurity specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Layers,
                title: 'High-Performance Web Flagships',
                desc: 'Bespoke corporate websites engineered with sub-second page transitions, responsive layout math, and lead automation.'
              },
              {
                icon: Shield,
                title: 'Application Security & Penetration Testing',
                desc: 'Pre-production code auditing, dependency vulnerability patching, and strict OWASP top 10 compliance.'
              },
              {
                icon: TrendingUp,
                title: 'Automated CRM & Inbound Pipelines',
                desc: 'Direct integrations with customer databases, automated email dispatchers, and conversion analytics.'
              }
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Case Studies */}
        <section id="projects" className="space-y-6">
          <div>
            <span className="text-xs font-mono text-blue-400 uppercase">Proof of Impact</span>
            <h2 className="text-2xl font-bold text-white mt-1">Featured Enterprise Case Studies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-[11px] font-mono text-cyan-400">Dhaka FinTech Gateway</span>
              <h3 className="text-lg font-bold text-white">Modernizing Micro-Lending Portal for 50,000 Users</h3>
              <p className="text-xs text-slate-400">
                Re-engineered the legacy core into an encrypted single-page app, reducing user drop-off during document verification by 38%.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-emerald-400 font-mono">
                <span>+38% Verification Completion</span>
                <span>·</span>
                <span>Zero Downtime Migration</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-[11px] font-mono text-blue-400">Artisan Leather Exporters</span>
              <h3 className="text-lg font-bold text-white">Global Wholesale Catalog with Realtime Inquiries</h3>
              <p className="text-xs text-slate-400">
                Created a high-resolution 3D inspection showcase allowing international buyers from Europe and Japan to place direct container inquiries.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-emerald-400 font-mono">
                <span>+240% Inbound B2B Inquiries</span>
                <span>·</span>
                <span>Sub-second Load in EU</span>
              </div>
            </div>
          </div>
        </section>

        {/* Insights / Blog Articles (CMS Powered) */}
        <section id="articles" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase">Executive Thought Leadership</span>
              <h2 className="text-2xl font-bold text-white mt-1">Latest Engineering Articles</h2>
            </div>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs text-blue-400 hover:underline"
            >
              CMS Admin Editor →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {articles.map((art) => (
              <div key={art.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="text-blue-400 font-medium">{art.category}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                  <span>·</span>
                  <span>{art.publishedAt}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{art.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{art.excerpt}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Consultation / Inquiry Form */}
        <section id="contact" className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-blue-400 uppercase">Get in Touch</span>
              <h2 className="text-2xl font-bold text-white">Initiate a Strategic Consultation</h2>
              <p className="text-xs text-slate-400">
                Responses are reviewed directly by Al Amin and our senior architecture team within 24 hours.
              </p>
            </div>

            {inquirySuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center text-xs text-emerald-300">
                Thank you! Your enterprise inquiry has been recorded in the BizPro CMS. We will follow up via email shortly.
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Company / Organization</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Contact Person</label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Business Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Service Needed</label>
                    <input
                      type="text"
                      required
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Project Scope & Milestones</label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                >
                  Submit Enterprise Inquiry
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* CMS Admin Modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!isAdminLoggedIn ? (
              <div className="max-w-sm mx-auto py-6 text-center space-y-3">
                <Lock className="w-8 h-8 text-blue-500 mx-auto" />
                <h3 className="text-base font-bold text-white">BizPro CMS Login</h3>
                <p className="text-xs text-slate-400">Evaluation Credentials: admin@bizpro.com / biz123</p>
                <button
                  onClick={() => setIsAdminLoggedIn(true)}
                  className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-bold text-xs"
                >
                  Auto Login to CMS
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white">BizPro CMS Management</h3>
                  <button
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Logout
                  </button>
                </div>

                {/* Published Articles List */}
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">Publish New Insight</h4>
                  <form onSubmit={handleAddArticle} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Article Title..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Short Excerpt..."
                      value={newExcerpt}
                      onChange={(e) => setNewExcerpt(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs"
                    >
                      Publish Article
                    </button>
                  </form>
                </div>

                {/* Inquiries */}
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">
                    Inbound Client Inquiries ({inquiries.length})
                  </h4>
                  {inquiries.length === 0 ? (
                    <p className="text-xs text-slate-500">No client submissions yet.</p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                          <div className="flex justify-between font-bold text-white">
                            <span>{inq.companyName} ({inq.contactPerson})</span>
                            <span className="text-slate-500 font-mono text-[10px]">{inq.email}</span>
                          </div>
                          <p className="text-slate-400 text-[11px] mt-1">{inq.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
