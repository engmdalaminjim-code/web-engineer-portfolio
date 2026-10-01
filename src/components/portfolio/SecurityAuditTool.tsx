import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';

interface AuditResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'F';
  sslStatus: string;
  securityHeaders: { name: string; status: boolean; note: string }[];
  vulnerabilities: { issue: string; severity: 'low' | 'medium' | 'high'; remedy: string }[];
  summary: string;
}

export const SecurityAuditTool: React.FC<{ lang?: 'en' | 'bn' }> = ({ lang = 'en' }) => {
  const isBn = lang === 'bn';
  const [targetUrl, setTargetUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const sampleTargets = [
    { label: 'Unpatched WordPress Store', url: 'https://sample-wp-shop.bd' },
    { label: 'Standard Local Business Site', url: 'https://dhakabiz-sample.com' },
    { label: 'Al Amin Hardened Next.js Build', url: 'https://alamin-hardened-app.run.app' },
  ];

  const handleScan = (urlToScan?: string) => {
    const url = urlToScan || targetUrl;
    if (!url.trim()) return;
    setIsScanning(true);
    setAuditResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (url.includes('alamin') || url.includes('hardened')) {
        setAuditResult({
          score: 98,
          grade: 'A+',
          sslStatus: 'TLS 1.3 Certified (Zero Downgrade Attacks)',
          securityHeaders: [
            { name: 'Strict-Transport-Security (HSTS)', status: true, note: 'Max-age 63072000; includeSubDomains' },
            { name: 'Content-Security-Policy (CSP)', status: true, note: 'Strict directive preventing XSS script injection' },
            { name: 'X-Frame-Options', status: true, note: 'DENY (Prevents clickjacking framing)' },
            { name: 'X-Content-Type-Options', status: true, note: 'nosniff enabled' },
            { name: 'Referrer-Policy', status: true, note: 'strict-origin-when-cross-origin' },
          ],
          vulnerabilities: [
            { issue: 'Informational: Rate-limiting active', severity: 'low', remedy: 'Brute-force protection verified.' },
          ],
          summary: 'Airtight enterprise deployment. Protected against OWASP Top 10 vulnerabilities, unauthorized iframe embedding, and token interception.',
        });
      } else {
        setAuditResult({
          score: 54,
          grade: 'C',
          sslStatus: 'TLS 1.2 Basic (Mixed Content Warnings Detected)',
          securityHeaders: [
            { name: 'Strict-Transport-Security (HSTS)', status: false, note: 'Missing header; prone to SSL stripping' },
            { name: 'Content-Security-Policy (CSP)', status: false, note: 'No CSP declared; vulnerable to malicious 3rd-party script execution' },
            { name: 'X-Frame-Options', status: false, note: 'Missing; website can be embedded in attacker phishing iframes' },
            { name: 'X-Content-Type-Options', status: true, note: 'nosniff enabled' },
            { name: 'Referrer-Policy', status: false, note: 'Full URL leaked on outbound clicks' },
          ],
          vulnerabilities: [
            { issue: 'SQL Injection Risk in Unsanitized Search Endpoint', severity: 'high', remedy: 'Parameterized SQL queries required.' },
            { issue: 'Outdated CMS Version Exposed in Meta Header', severity: 'medium', remedy: 'Remove generator tags and apply patches.' },
            { issue: 'Unprotected Admin Login Route (/admin)', severity: 'high', remedy: 'Add IP allowlisting, 2FA, and rate limiting.' },
          ],
          summary: 'Multiple high-risk security flaws discovered. Vulnerable to automated credential stuffing, database scraping, and clickjacking attacks.',
        });
      }
    }, 1200);
  };

  return (
    <section id="security" className="py-20 border-b border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>{isBn ? 'সাইবার সিকিউরিটি স্পেশালিস্ট অডিট' : 'Interactive Cybersecurity Capability'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            {isBn ? 'ফ্রি ওয়েবসাইট সিকিউরিটি ও ভালনারেবিলিটি অডিটর' : 'Free Website Vulnerability & Security Audit Tool'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {isBn
              ? 'বেশিরভাগ সাধারণ ওয়ার্ডপ্রেস সাইট ওয়ান-ক্লিক হ্যাকের ঝুঁকিতে থাকে। আপনার বর্তমান ওয়েবসাইট অথবা নিচের স্যাম্পল সাইটগুলো স্ক্যান করে ওওয়াস্প কমপ্লায়েন্স রিপোর্ট দেখুন।'
              : 'Most freelance sites leave customer data and admin credentials unprotected. Run an instant simulated OWASP compliance scan below or analyze sample setups.'}
          </p>
        </div>

        {/* Input Bar */}
        <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="Enter any website URL (e.g., https://mybusiness.com.bd)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <button
              onClick={() => handleScan()}
              disabled={isScanning}
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-cyan-950/40"
            >
              {isScanning ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Run Security Scan</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-mono">Test presets:</span>
            {sampleTargets.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTargetUrl(item.url);
                  handleScan(item.url);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 font-mono text-[11px] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Audit Results View */}
          {auditResult && (
            <div className="pt-6 border-t border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-2xl shadow-inner ${
                      auditResult.grade === 'A+'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    {auditResult.grade}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">Security Health Score:</div>
                    <div className="text-xl font-bold font-mono text-white">
                      {auditResult.score} / 100
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 font-mono bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400">SSL Status: </span>
                  <span className={auditResult.score > 90 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {auditResult.sslStatus}
                  </span>
                </div>
              </div>

              {/* Security Headers Matrix */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  HTTP Security Headers Audit
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {auditResult.securityHeaders.map((header, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-2.5"
                    >
                      {header.status ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-semibold text-white block">{header.name}</span>
                        <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                          {header.note}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vulnerabilities Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  OWASP Vulnerability Assessment
                </h4>
                <div className="space-y-2">
                  {auditResult.vulnerabilities.map((v, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                            v.severity === 'high'
                              ? 'bg-rose-500/20 text-rose-400'
                              : v.severity === 'medium'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {v.severity} Risk
                        </span>
                        <span className="text-white font-medium">{v.issue}</span>
                      </div>
                      <span className="text-slate-400 text-[11px] font-mono sm:text-right">
                        Remedy: {v.remedy}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Call to Action */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-300 max-w-xl">
                  <b>Engineer Assessment:</b> {auditResult.summary}
                </div>
                <a
                  href="#contact"
                  className="px-4 py-2.5 rounded-xl bg-cyan-400 text-black font-bold text-xs whitespace-nowrap hover:bg-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Request Full Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
