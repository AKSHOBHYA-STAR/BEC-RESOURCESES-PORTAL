import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Key, 
  GraduationCap, 
  AlertCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminLoginPage: React.FC = () => {
  const { loginAsAdmin, setActiveView } = useApp();

  const [email, setEmail] = useState('admin@becbgk.edu');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in both Email and Password.');
      return;
    }
    // Accept valid test credentials
    loginAsAdmin();
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@becbgk.edu');
    setPassword('admin123');
  };

  return (
    <div className="min-h-[85vh] py-12 flex items-center justify-center bg-gradient-to-b from-slate-900/5 via-white to-slate-100">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-2xl shadow-slate-900/10 space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-md shadow-slate-900/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
              College Faculty & Moderation Portal
            </span>
            <h1 className="text-2xl font-black text-slate-900 font-['Outfit'] mt-2">
              Admin & Faculty Login
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Authenticate with your BEC institutional faculty credentials to moderate resources and publish circulars.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            
            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Staff / Faculty Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@becbgk.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Please contact the BEC Bagalkot Central Computing Centre (CCC) to reset staff password.')}
                className="text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4 text-amber-400" />
              <span>Login to Admin Control Panel</span>
            </button>

          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Quick Review Credentials
              </span>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="px-2 py-0.5 rounded bg-amber-200/80 text-amber-900 font-bold text-[10px] hover:bg-amber-300 cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <p className="text-[11px] text-amber-800">
              Email: <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">admin@becbgk.edu</code> • Password: <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">admin123</code>
            </p>
          </div>

          <div className="text-center pt-2 border-t border-slate-100">
            <button
              onClick={() => setActiveView('login_student')}
              className="text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer"
            >
              Are you a student? Switch to Google Student Login →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
