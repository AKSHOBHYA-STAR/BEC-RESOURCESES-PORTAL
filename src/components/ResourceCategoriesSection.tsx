import React from 'react';
import { 
  FileText, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Bell, 
  ArrowRight,
  CheckCircle,
  Sparkles,
  Download,
  CalendarCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ResourceCategory } from '../types';

export const ResourceCategoriesSection: React.FC = () => {
  const { applyQuickFilter, setActiveView } = useApp();

  const categories = [
    {
      title: 'Student Lecture & Personal Notes',
      categoryKey: 'Notes' as ResourceCategory,
      badge: 'Student Contributed',
      color: 'from-blue-600 to-indigo-600',
      icon: FileText,
      items: [
        'Handwritten module-by-module notes',
        'Solved class examples and derivations',
        'Student-compiled revision summaries'
      ],
      description: 'Comprehensive study notes, formulas, diagrams, and peer-reviewed summaries created by BEC students.'
    },
    {
      title: 'Official BEC Syllabus',
      isSyllabusLink: true,
      badge: 'Official BEC (becbgk.edu)',
      color: 'from-indigo-600 to-purple-600',
      icon: BookOpen,
      items: [
        'Official BEC Autonomous Scheme Copies',
        'Department curriculum & credit structures',
        'Semester-wise course outcomes & textbooks'
      ],
      description: 'Verified curriculum documents directly referenced from the official BEC Bagalkot website.'
    },
    {
      title: 'Lab Materials & Practical Records',
      categoryKey: 'Lab Manual' as ResourceCategory,
      badge: 'Practical Work',
      color: 'from-emerald-500 to-teal-600',
      icon: Layers,
      items: [
        'Laboratory manual guidelines',
        'Observation data sheets and record templates',
        'Simulation codes and circuit schematics'
      ],
      description: 'Step-by-step experiment instructions, procedures, and student-prepared lab records.'
    },
    {
      title: 'Assignments & Practice Problems',
      categoryKey: 'Assignment' as ResourceCategory,
      badge: 'Continuous Evaluation',
      color: 'from-amber-500 to-orange-600',
      icon: HelpCircle,
      items: [
        'Department CIE assignment solutions',
        'Analytical problem sets & numericals',
        'Self-study topic write-ups'
      ],
      description: 'Homework submissions, question sets, and practice materials contributed for peer learning.'
    },
    {
      title: 'Student Projects & Documentation',
      categoryKey: 'Project' as ResourceCategory,
      badge: 'Innovation',
      color: 'from-purple-600 to-pink-600',
      icon: Sparkles,
      items: [
        'Mini-project reports & system architecture',
        'Capstone documentation & presentations',
        'Source code documentation guides'
      ],
      description: 'Academic project reports, presentations, and technical documentation by BEC students.'
    },
    {
      title: 'Study Materials & Reference Guides',
      categoryKey: 'Study Material' as ResourceCategory,
      badge: 'Labs & Presentations',
      color: 'from-emerald-500 to-teal-600',
      icon: Layers,
      items: [
        'Official Department Laboratory Manuals',
        'Presentation PPT slides & code repositories',
        'Standard reference books & cheat sheets'
      ],
      description: 'Step-by-step experiment instructions, circuit diagrams, and digital slide decks.'
    },
    {
      title: 'Academic Updates & Circulars',
      isUpdateLink: true,
      badge: 'Live Bulletin',
      color: 'from-rose-500 to-pink-600',
      icon: Bell,
      items: [
        'Controller of Examinations (CoE) notices',
        'SEE/CIE timetables & rescheduled circulars',
        'Campus placement drives & scholarship alerts'
      ],
      description: 'Direct administrative broadcasts, academic calendar updates, and urgent alerts.'
    }
  ];

  return (
    <section className="py-16 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Learning Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-3">
            Resource Categories Designed for Engineering Success
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every academic resource categorized cleanly to accelerate exam preparation, lab practice, and project completion.
          </p>
        </div>

        {/* 5 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  if (cat.isSyllabusLink) {
                    setActiveView('syllabus');
                  } else if (cat.isUpdateLink) {
                    setActiveView('updates');
                  } else if (cat.categoryKey) {
                    applyQuickFilter('category', cat.categoryKey);
                  }
                }}
                className={`group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-md shadow-blue-500/10 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 font-['Outfit']">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 mb-6">
                    {cat.items.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore {cat.title.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
