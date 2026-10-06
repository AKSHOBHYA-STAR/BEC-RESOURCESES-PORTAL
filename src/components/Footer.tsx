import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ArrowUp, 
  BookOpen, 
  ShieldCheck, 
  FileText,
  Heart
} from 'lucide-react';
import { BECLogo } from './BECLogo';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveView, applyQuickFilter, resetFilters } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: About Portal (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BECLogo variant="dark" size="lg" />

            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Official centralized repository for Basaveshwara Engineering College (Autonomous), Bagalkot. Founded in 1963 by the historic Basaveshwar Veerashaiva Vidyavardhak Sangha (B.V.V. Sangha, Estd. 1906). Dedicated to the noble principle: <em>"Work is Worship"</em>.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs text-blue-300 font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NAAC 'A' Grade • NBA Accredited • AICTE Approved</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <span>Autonomous under VTU Belagavi since 2007-08</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => { setActiveView('home'); resetFilters(); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('syllabus'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Official BEC Syllabus
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('resources'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Student Resources
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('updates'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Academic Updates
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('upload'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Upload Study Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Branches (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">
              Departments
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-400">
              <button 
                onClick={() => applyQuickFilter('department', 'ISE')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Information Science
              </button>
              <button 
                onClick={() => applyQuickFilter('department', 'CSE')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Computer Science
              </button>
              <button 
                onClick={() => applyQuickFilter('department', 'ECE')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Electronics & Comm.
              </button>
              <button 
                onClick={() => applyQuickFilter('department', 'EEE')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Electrical & Electronics
              </button>
              <button 
                onClick={() => applyQuickFilter('department', 'ME')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Mechanical Engg.
              </button>
              <button 
                onClick={() => applyQuickFilter('department', 'CV')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Civil Engineering
              </button>
              <button 
                onClick={() => applyQuickFilter('department', 'AIDS')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                AI & Data Science
              </button>
              <button 
                onClick={() => applyQuickFilter('department', 'BT')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Biotechnology
              </button>
              <button 
                onClick={() => applyQuickFilter('department', 'AU')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Automobile Engg.
              </button>
              <button 
                onClick={() => applyQuickFilter('department', 'MBA')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                MBA Program
              </button>
            </div>
          </div>

          {/* Col 4: Campus Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">
              College Campus Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Basaveshwara Engineering College, Vidyagiri, Bagalkot - 587102, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>+91 8354 234060 / 234204</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>academicportal@becbgk.edu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="https://becbgk.edu" target="_blank" rel="noreferrer" className="hover:text-white">
                  www.becbgk.edu (Official)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Basaveshwara Engineering College, Bagalkot. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveView('login_admin')}
              className="hover:text-slate-300 font-semibold cursor-pointer"
            >
              Faculty Admin Access
            </button>
            <button
              onClick={() => setActiveView('login_student')}
              className="hover:text-slate-300 font-semibold cursor-pointer"
            >
              Student SSO
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
