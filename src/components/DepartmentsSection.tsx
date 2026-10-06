import React from 'react';
import { 
  Database, 
  Code, 
  Cpu, 
  Zap, 
  Wrench, 
  Building2, 
  BrainCircuit, 
  FlaskConical,
  Car,
  Briefcase, 
  ArrowRight,
  BookOpen,
  Users,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DepartmentCode } from '../types';

export const DepartmentsSection: React.FC = () => {
  const { departments, applyQuickFilter } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database': return Database;
      case 'Code': return Code;
      case 'Cpu': return Cpu;
      case 'Zap': return Zap;
      case 'Wrench': return Wrench;
      case 'Building2': return Building2;
      case 'BrainCircuit': return BrainCircuit;
      case 'Briefcase': return Briefcase;
      case 'FlaskConical': return FlaskConical;
      case 'Car': return Car;
      default: return GraduationCap;
    }
  };

  const handleExplore = (deptId: DepartmentCode) => {
    applyQuickFilter('department', deptId);
  };

  return (
    <section id="departments" className="py-16 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Branches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-3">
            Explore Resources by Department
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your discipline to access syllabus copies, lab manuals, faculty lecture notes, and solved autonomous question banks tailored specifically for your curriculum.
          </p>
        </div>

        {/* 8 Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const Icon = getIcon(dept.iconName);
            return (
              <div
                key={dept.id}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5 cursor-pointer"
                onClick={() => handleExplore(dept.id)}
              >
                {/* Top: Icon + Code Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/10 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: dept.accentColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 tracking-wider">
                      {dept.code}
                    </span>
                  </div>

                  {/* Name & Desc */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2 font-['Outfit']">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {dept.description}
                  </p>
                </div>

                {/* Bottom: Total Resources & Explore Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>{dept.totalResources} Resources</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
