import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Download, 
  FileText,
  User,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentTrackerProps {
  profile: StudentProfile;
}

export const StudentTracker: React.FC<StudentTrackerProps> = ({ profile }) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner Profile Summary - Private & Isolated */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center font-extrabold text-2xl text-white shadow-inner flex-shrink-0">
              {profile.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
                  {profile.department} • Semester {profile.semester}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 text-[11px] font-extrabold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Student
                </span>
              </div>
              <h2 className="text-2xl font-black font-['Outfit'] leading-tight">
                {profile.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-blue-100 font-medium mt-1">
                <span className="font-mono">USN: {profile.usn}</span>
                <span>•</span>
                <span>{profile.email}</span>
              </div>
            </div>
          </div>

          {/* Privacy badge */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-xs text-blue-100 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Private Account Isolation</span>
            </div>
            <p className="text-[11px] text-blue-200 leading-tight">
              Your profile, personal contact details, and submissions are strictly private to you.
            </p>
          </div>
        </div>
      </div>

      {/* Tracker Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Uploaded</div>
            <div className="text-xl font-black text-slate-900 font-['Outfit']">
              {profile.uploadedCount}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Approved</div>
            <div className="text-xl font-black text-slate-900 font-['Outfit']">
              {profile.approvedCount}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Pending</div>
            <div className="text-xl font-black text-slate-900 font-['Outfit']">
              {profile.pendingCount}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Downloads</div>
            <div className="text-xl font-black text-slate-900 font-['Outfit']">
              {profile.downloadsCount}
            </div>
          </div>
        </div>

      </div>

      {/* Recent Activities & Upload Timeline */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 font-['Outfit']">
          Your Activity Log
        </h3>

        {profile.recentActivities.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No recent activity recorded yet. Upload study materials or download syllabus copies to see your history here.
          </div>
        ) : (
          <div className="space-y-3">
            {profile.recentActivities.map((act) => (
              <div 
                key={act.id} 
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${
                    act.type === 'upload' ? 'bg-blue-600' :
                    act.type === 'approval' ? 'bg-emerald-600' :
                    act.type === 'download' ? 'bg-purple-600' : 'bg-slate-600'
                  }`}>
                    {act.type === 'upload' ? <FileText className="w-4 h-4" /> :
                     act.type === 'approval' ? <CheckCircle2 className="w-4 h-4" /> :
                     act.type === 'download' ? <Download className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="font-semibold text-slate-800">{act.title}</div>
                    <div className="text-[10px] text-slate-400">{act.timestamp}</div>
                  </div>
                </div>

                {act.status && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    act.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                    act.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {act.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
