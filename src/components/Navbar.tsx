import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Layers, 
  Bell, 
  UploadCloud, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  LogOut, 
  ChevronRight,
  Award,
  Sparkles,
  Search
} from 'lucide-react';
import { BECLogo } from './BECLogo';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    currentUser, 
    logout, 
    applyQuickFilter,
    resetFilters
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', action: () => { setActiveView('home'); resetFilters(); }, active: activeView === 'home' },
    { label: 'Official BEC Syllabus', action: () => { setActiveView('syllabus'); }, active: activeView === 'syllabus' },
    { label: 'Student Resources', action: () => { setActiveView('resources'); resetFilters(); }, active: activeView === 'resources' },
    { label: 'Departments', action: () => setActiveView('departments'), active: activeView === 'departments' },
    { label: 'Academic Updates', action: () => setActiveView('updates'), active: activeView === 'updates' },
  ];

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-sm py-2.5'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: University & Portal Logo */}
          <div 
            onClick={() => { setActiveView('home'); resetFilters(); }}
            className="cursor-pointer group flex items-center"
          >
            <BECLogo size="md" />
          </div>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden xl:flex items-center gap-1 text-[13.5px] font-semibold text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer ${
                  item.active
                    ? 'text-blue-600 bg-blue-50 font-bold shadow-xs'
                    : 'hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Upload CTA */}
            <button
              onClick={() => setActiveView('upload')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 transition-colors shadow-xs cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-blue-600" />
              <span>Upload Notes</span>
            </button>

            {/* Auth States */}
            {currentUser.role === 'student' && currentUser.studentProfile ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button
                  onClick={() => setActiveView('student_dashboard')}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    activeView === 'student_dashboard'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] overflow-hidden">
                    {currentUser.studentProfile.name.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="leading-none">{currentUser.studentProfile.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-slate-400 font-normal leading-tight">
                      {currentUser.studentProfile.usn}
                    </span>
                  </div>
                </button>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : currentUser.role === 'admin' ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button
                  onClick={() => setActiveView('admin_dashboard')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeView === 'admin_dashboard'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('login_student')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-sm hover:shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V13.4h6.887C18.2 16.14 15.645 18 12.24 18c-3.315 0-6-2.685-6-6s2.685-6 6-6c1.665 0 3.105.615 4.2 1.62l2.43-2.43C17.37 3.72 14.97 3 12.24 3 7.275 3 3.24 7.035 3.24 12s4.035 9 9 9c5.205 0 8.655-3.66 8.655-8.805 0-.615-.06-1.2-.165-1.91H12.24z"/>
                  </svg>
                  <span>Login with Google</span>
                </button>
                <button
                  onClick={() => setActiveView('login_admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Admin Login</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setActiveView('upload')}
              className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <UploadCloud className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1 mb-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-left ${
                  item.active
                    ? 'text-blue-600 bg-blue-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {currentUser.role === 'student' && currentUser.studentProfile ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setActiveView('student_dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>My Student Dashboard ({currentUser.studentProfile.name})</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-red-200 text-red-600 font-bold text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : currentUser.role === 'admin' ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setActiveView('admin_dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white font-bold text-sm"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Admin Control Dashboard</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-red-200 text-red-600 font-bold text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Admin</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setActiveView('login_student');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V13.4h6.887C18.2 16.14 15.645 18 12.24 18c-3.315 0-6-2.685-6-6s2.685-6 6-6c1.665 0 3.105.615 4.2 1.62l2.43-2.43C17.37 3.72 14.97 3 12.24 3 7.275 3 3.24 7.035 3.24 12s4.035 9 9 9c5.205 0 8.655-3.66 8.655-8.805 0-.615-.06-1.2-.165-1.91H12.24z"/>
                  </svg>
                  <span>Student Login with Google</span>
                </button>
                <button
                  onClick={() => {
                    setActiveView('login_admin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>College Admin Portal</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
