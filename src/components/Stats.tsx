import React from 'react';
import { 
  FileText, 
  Layers, 
  GraduationCap, 
  BookCheck, 
  Users, 
  Award,
  TrendingUp,
  Download
} from 'lucide-react';
import { ANALYTICS_DATA } from '../data/mockData';

export const Stats: React.FC = () => {
  const statsList = [
    {
      label: 'Official BEC Syllabus',
      value: '48+',
      description: 'Verified curriculums from becbgk.edu',
      icon: BookCheck,
      trend: 'Official BEC',
      color: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700'
    },
    {
      label: 'Student Shared Notes',
      value: 'Community',
      description: 'Personal notes, records & assignments',
      icon: FileText,
      trend: 'Student Contributed',
      color: 'from-sky-500 to-blue-600',
      badgeBg: 'bg-sky-50 text-sky-700'
    },
    {
      label: 'Engineering Departments',
      value: '8 Branches',
      description: 'Autonomous UG & PG branches',
      icon: GraduationCap,
      trend: 'Autonomous BEC',
      color: 'from-indigo-600 to-purple-600',
      badgeBg: 'bg-indigo-50 text-indigo-700'
    },
    {
      label: 'Moderated Quality',
      value: '100%',
      description: 'Reviewed before publishing',
      icon: Layers,
      trend: 'Admin Approved',
      color: 'from-purple-600 to-pink-600',
      badgeBg: 'bg-purple-50 text-purple-700'
    },
    {
      label: 'Active Students',
      value: '3,450+',
      description: 'Sharing & learning securely',
      icon: Users,
      trend: 'Private & Secure',
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Impact & Academic Reach
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
              Trusted by BEC Engineering Students & Faculty
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-2 sm:mt-0">
            Real-time knowledge sharing repository powering semester preparation across all autonomous branches.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#F8FAFC] hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Row: Icon & Trend */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.badgeBg}`}>
                    {stat.trend}
                  </span>
                </div>

                {/* Counter & Label */}
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit'] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 leading-snug">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-tight">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
