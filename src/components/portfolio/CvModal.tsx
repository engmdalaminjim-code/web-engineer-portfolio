import React from 'react';
import { X, Printer, Download, GraduationCap, ShieldCheck, Mail, Phone, MapPin, Award, CheckCircle } from 'lucide-react';
import { PORTFOLIO_INFO, EDUCATION, EXPERIENCE, ACHIEVEMENTS, SKILL_CATEGORIES } from '../../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-10 relative max-h-[92vh] overflow-y-auto shadow-2xl text-slate-100">
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Curriculum Vitae Preview</span>
            <span className="text-xs font-mono text-cyan-400">· Ready for PDF Print</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Content */}
        <div className="space-y-6 text-slate-200">
          {/* Header */}
          <div className="border-b border-slate-800 pb-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Al Amin
            </h1>
            <p className="text-sm text-cyan-400 font-medium mt-0.5">
              Computer Science & Engineering Graduate (DIU) · Full-Stack Web Engineer & Cybersecurity Specialist
            </p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-cyan-400" /> {PORTFOLIO_INFO.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-cyan-400" /> {PORTFOLIO_INFO.phone}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> {PORTFOLIO_INFO.location}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">
              Professional Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              BSc graduate in Computer Science & Engineering from Daffodil International University (CGPA 3.45) with practical industry experience in cybersecurity vulnerability assessment and penetration testing at Goinnovior Limited. Specialized in architecting high-converting, resilient web platforms for small and medium enterprises—integrating responsive user interfaces, real-time databases, local payment systems (bKash/Nagad), and rigorous security auditing.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-3">
              Education & Academic Credentials
            </h2>
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                  <div className="flex flex-wrap justify-between items-baseline font-bold text-white">
                    <span>{edu.degree}</span>
                    <span className="text-cyan-400 font-mono text-[11px]">{edu.grade}</span>
                  </div>
                  <div className="text-slate-400 mt-0.5">
                    {edu.institution} · <span className="font-mono">{edu.duration}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-1">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-3">
              Professional Experience
            </h2>
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                <div className="flex justify-between items-baseline font-bold text-white">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="text-cyan-400 font-mono text-[11px]">{exp.period}</span>
                </div>
                <div className="text-slate-400 text-[11px]">{exp.location} · {exp.type}</div>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-300 text-[11px]">
                  {exp.responsibilities.map((r, rIdx) => (
                    <li key={rIdx}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">
              Technical Core Competencies
            </h2>
            <div className="text-xs text-slate-300 space-y-1">
              <div>
                <b className="text-white">Programming:</b> C, C++, Python, Java, JavaScript (ES6+), PHP
              </div>
              <div>
                <b className="text-white">Web & Data:</b> HTML5, CSS3, Tailwind CSS, MySQL, REST APIs, WebSockets
              </div>
              <div>
                <b className="text-white">Cybersecurity & Tools:</b> Vulnerability Assessment, OWASP Risk Testing, Linux Administration, MS Office, Google Workspace
              </div>
              <div>
                <b className="text-white">Languages:</b> Bengali (Native), English (Professional Working)
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">
              Honors & Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {ACHIEVEMENTS.map((a, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="font-bold text-white">{a.title}</div>
                  <div className="text-[11px] text-slate-400">{a.organization} ({a.year})</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
