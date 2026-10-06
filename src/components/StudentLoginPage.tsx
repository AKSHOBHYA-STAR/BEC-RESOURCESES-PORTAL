import React, { useState } from 'react';
import { 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck,
  User,
  Mail,
  Hash,
  Layers,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DepartmentCode, StudentProfile } from '../types';
import { ASSETS, SafeImage } from '../assets/assetRegistry';

export const StudentLoginPage: React.FC = () => {
  const { loginAsStudent, departments, setActiveView } = useApp();

  // Step 1: Google OAuth prompt, Step 2: Complete BEC Student Profile
  const [authStep, setAuthStep] = useState<'oauth' | 'profile'>('oauth');
  const [isSimulatingGoogle, setIsSimulatingGoogle] = useState(false);

  // Student Profile details
  const [studentName, setStudentName] = useState('Vilas Patil');
  const [email, setEmail] = useState('patilvilas496@gmail.com');
  const [usn, setUsn] = useState('2BA22IS045');
  const [department, setDepartment] = useState<DepartmentCode>('ISE');
  const [semester, setSemester] = useState<number>(6);

  const handleGoogleAuthClick = () => {
    setIsSimulatingGoogle(true);
    setTimeout(() => {
      setIsSimulatingGoogle(false);
      setAuthStep('profile');
    }, 700);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsStudent({
      name: studentName,
      email,
      usn: usn.toUpperCase(),
      department,
      semester
    });
  };

  return (
    <div className="min-h-[85vh] py-12 flex items-center justify-center bg-gradient-to-b from-blue-50/50 via-white to-[#F8FAFC]">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-blue-500/10 overflow-hidden">
          
          {/* Left Column: Educational Illustration & College Highlights */}
          <div className="md:col-span-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
            
            {/* Top Badge */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold mb-4">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Basaveshwara Engineering College</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight leading-tight">
                Single Sign-On for BEC Engineering Students
              </h2>
            </div>

            {/* Illustration */}
            <div className="my-6 relative z-10 rounded-2xl overflow-hidden shadow-lg border border-white/20 aspect-[4/3]">
              <SafeImage
                primarySrc={ASSETS.studentLogin.src}
                fallbackSrc={ASSETS.studentLogin.publicUrl}
                legacySrc={ASSETS.studentLogin.relativeUrl}
                alt={ASSETS.studentLogin.alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom perks */}
            <div className="space-y-2 relative z-10 text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Free high-speed downloads for all semesters</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Private personal dashboard & secure document sharing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Official BEC Autonomous 2021 & 2022 NEP schemes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Login Card & Profile Setup */}
          <div className="md:col-span-6 p-8 sm:p-10 flex flex-col justify-center">
            
            {authStep === 'oauth' ? (
              <div className="space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <User className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl font-black text-slate-900 font-['Outfit'] mb-2">
                    Student Login
                  </h1>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Access academic resources securely using your Google account.
                  </p>
                </div>

                {/* Continue with Google Button */}
                <button
                  type="button"
                  onClick={handleGoogleAuthClick}
                  disabled={isSimulatingGoogle}
                  className="w-full py-3.5 px-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/30 text-slate-700 font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  {isSimulatingGoogle ? (
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating with Google...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span className="group-hover:text-blue-600 transition-colors">
                        Continue with Google
                      </span>
                    </>
                  )}
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Institutional Access
                  </span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>BEC College Domain Recommended</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Use your official college or personal Google account for instant single-click sign on.
                  </p>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveView('login_admin')}
                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Faculty or Admin? Switch to Admin Login →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleProfileSubmit} className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 mb-1 inline-block">
                    ✓ Google Authenticated
                  </span>
                  <h2 className="text-xl font-black text-slate-900 font-['Outfit']">
                    Complete Student Profile
                  </h2>
                  <p className="text-xs text-slate-500">
                    Provide your BEC academic identity to associate your downloads and uploads.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* USN */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    University Seat Number (USN)
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={usn}
                      onChange={(e) => setUsn(e.target.value.toUpperCase())}
                      placeholder="e.g. 2BA22IS045"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-blue-500 uppercase"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Department & Semester */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value as DepartmentCode)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-500"
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.code}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Semester
                    </label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <option key={s} value={s}>
                          Semester {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Complete Setup & Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
