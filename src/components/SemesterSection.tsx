import React from 'react';
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  FolderGit2, 
  ArrowRight,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SemesterSection: React.FC = () => {
  const { applyQuickFilter } = useApp();

  const semesters = [
    { sem: 1, name: '1st Semester', stage: 'First Year (Physics/Chem Cycle)', notes: 140, syllabus: 18, qp: 65, studyMat: 92 },
    { sem: 2, name: '2nd Semester', stage: 'First Year (Physics/Chem Cycle)', notes: 155, syllabus: 18, qp: 70, studyMat: 88 },
    { sem: 3, name: '3rd Semester', stage: 'Second Year (Core Foundation)', notes: 210, syllabus: 24, qp: 95, studyMat: 130 },
    { sem: 4, name: '4th Semester', stage: 'Second Year (Core Foundation)', notes: 225, syllabus: 24, qp: 104, studyMat: 142 },
    { sem: 5, name: '5th Semester', stage: 'Third Year (Advanced Core & Labs)', notes: 280, syllabus: 26, qp: 120, studyMat: 165 },
    { sem: 6, name: '6th Semester', stage: 'Third Year (Open & Prof Electives)', notes: 260, syllabus: 26, qp: 110, studyMat: 150 },
    { sem: 7, name: '7th Semester', stage: 'Final Year (Specializations & AI)', notes: 190, syllabus: 22, qp: 85, studyMat: 120 },
    { sem: 8, name: '8th Semester', stage: 'Final Year (Internship & Projects)', notes: 120, syllabus: 20, qp: 60, studyMat: 95 },
  ];

  const handleSelectSemester = (semNumber: number) => {
    applyQuickFilter('semester', semNumber);
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Structured Curriculum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
              Semester-Wise Resource Repository
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Browse student study materials, lab manuals, and official BEC syllabus documents organized precisely according to semester roadmaps.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            BEC Autonomous 2021 & 2022 NEP Schemes
          </div>
        </div>

        {/* 8 Semesters Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {semesters.map((item) => (
            <div
              key={item.sem}
              onClick={() => handleSelectSemester(item.sem)}
              className="group bg-[#F8FAFC] hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center font-extrabold text-sm shadow-xs">
                    S{item.sem}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    <span>View all</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mb-0.5 font-['Outfit']">
                  {item.name}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 mb-4">
                  {item.stage}
                </p>

                {/* Breakdown List */}
                <div className="space-y-1.5 pt-3 border-t border-slate-200/60 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                      <span>Available Notes</span>
                    </span>
                    <span className="font-bold text-slate-800">{item.notes}+</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                      <span>Syllabus Copies</span>
                    </span>
                    <span className="font-bold text-slate-800">{item.syllabus}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                      <span>Question Papers</span>
                    </span>
                    <span className="font-bold text-slate-800">{item.qp}+</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <FolderGit2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Study Materials</span>
                    </span>
                    <span className="font-bold text-slate-800">{item.studyMat}+</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  Open Semester {item.sem} Hub →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
