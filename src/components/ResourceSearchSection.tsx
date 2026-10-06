import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Bookmark, 
  Star, 
  CheckCircle2, 
  FileText, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  ExternalLink, 
  UploadCloud, 
  ShieldCheck, 
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DepartmentCode, ResourceCategory, OfficialSyllabusItem, ResourceItem } from '../types';
import { AcademicEmptyIllustrationSVG } from '../assets/assetRegistry';

interface ResourceSearchSectionProps {
  initialSection?: 'all' | 'syllabus' | 'student';
}

export const ResourceSearchSection: React.FC<ResourceSearchSectionProps> = ({ 
  initialSection = 'all' 
}) => {
  const { 
    resources, 
    departments, 
    officialSyllabus,
    filters, 
    setFilters, 
    resetFilters,
    setSelectedResource,
    downloadResource,
    toggleSaveResource,
    currentUser,
    setActiveView,
    openFileViewer,
    showToast
  } = useApp();

  // Active section tab: 'all' (both sections), 'syllabus' (Official BEC Syllabus), or 'student' (Student Uploads)
  const [activeTab, setActiveTab] = useState<'all' | 'syllabus' | 'student'>(initialSection);
  
  // Official Syllabus specific filters
  const [syllabusDept, setSyllabusDept] = useState<DepartmentCode | 'ALL'>('ALL');
  const [syllabusYear, setSyllabusYear] = useState<string>('ALL');
  const [syllabusSem, setSyllabusSem] = useState<number | 'ALL'>('ALL');
  const [syllabusSearch, setSyllabusSearch] = useState<string>('');

  // Extract available academic years from official syllabus data
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(officialSyllabus.map(s => s.academicYear)));
    return years.sort().reverse();
  }, [officialSyllabus]);

  // Filtered Official Syllabus
  const filteredSyllabus = useMemo(() => {
    return officialSyllabus.filter(item => {
      if (syllabusDept !== 'ALL' && item.departmentId !== syllabusDept) return false;
      if (syllabusYear !== 'ALL' && item.academicYear !== syllabusYear) return false;
      if (syllabusSem !== 'ALL' && !item.semesters.includes(Number(syllabusSem))) return false;
      if (syllabusSearch.trim()) {
        const q = syllabusSearch.toLowerCase().trim();
        const matches = 
          item.title.toLowerCase().includes(q) ||
          item.departmentName.toLowerCase().includes(q) ||
          item.departmentId.toLowerCase().includes(q) ||
          item.scheme.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [officialSyllabus, syllabusDept, syllabusYear, syllabusSem, syllabusSearch]);

  // Filtered Student Resources (Strict Privacy & Moderation)
  const filteredStudentResources = useMemo(() => {
    return resources.filter((item) => {
      // Must be student uploaded
      if (item.originType !== 'student_uploaded') return false;

      // Status check: Approved for general viewing; uploader or admin can see pending
      if (item.status !== 'Approved') {
        const isOwner = currentUser.studentProfile && (item.uploaderEmail === currentUser.studentProfile.email || item.uploaderId === currentUser.studentProfile.id);
        const isAdmin = currentUser.role === 'admin';
        if (!isOwner && !isAdmin) return false;
      }

      // Query search
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matches = 
          item.title.toLowerCase().includes(q) ||
          item.subjectName.toLowerCase().includes(q) ||
          item.subjectCode.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some(tag => tag.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Department filter
      if (filters.department !== 'ALL' && item.departmentId !== filters.department) {
        return false;
      }

      // Semester filter
      if (filters.semester !== 'ALL' && item.semester !== Number(filters.semester)) {
        return false;
      }

      // Category filter
      if (filters.category !== 'ALL' && item.category !== filters.category) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'most_downloaded') {
        return b.downloadCount - a.downloadCount;
      }
      if (filters.sortBy === 'highest_rated') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'newest') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
      if (filters.sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [resources, filters, currentUser]);

  const savedIds = currentUser.studentProfile?.savedResourceIds || [];

  const handleDownloadSyllabus = (item: OfficialSyllabusItem) => {
    showToast(`Downloading official ${item.title}...`);
    const link = document.createElement('a');
    link.href = item.officialPdfUrl;
    link.download = `${item.departmentId}_Official_Syllabus_${item.academicYear}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetSyllabusFilters = () => {
    setSyllabusDept('ALL');
    setSyllabusYear('ALL');
    setSyllabusSem('ALL');
    setSyllabusSearch('');
  };

  return (
    <section id="resources" className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>BEC Academic Repository</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
              Academic Resources & Official Syllabus
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1.5 leading-relaxed">
              Official Autonomous syllabus copies directly from <span className="font-semibold text-blue-700">becbgk.edu</span> alongside verified student-contributed study materials.
            </p>
          </div>

          {/* Section Toggle Pill Bar */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-2xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Sections
            </button>
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'syllabus' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official BEC Syllabus</span>
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'student' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Student Uploads</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION A: OFFICIAL BEC SYLLABUS                                         */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'syllabus') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-200/90 shadow-sm space-y-6">
            
            {/* Section A Banner Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
                      Official BEC Syllabus
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      100% Verified from becbgk.edu
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Official Basaveshwara Engineering College (Autonomous), Bagalkot curriculum copies published by the Board of Studies and Academic Council.
                  </p>
                </div>
              </div>

              {/* Source Verification Link */}
              <a
                href="https://www.becbgk.edu/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors self-start lg:self-center"
              >
                <span>College Portal: becbgk.edu</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>

            {/* Section A Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={syllabusSearch}
                  onChange={(e) => setSyllabusSearch(e.target.value)}
                  placeholder="Search syllabus by title, course, or keyword..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department */}
              <div>
                <select
                  value={syllabusDept}
                  onChange={(e) => setSyllabusDept(e.target.value as DepartmentCode | 'ALL')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Departments</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.id} - {d.name}</option>
                  ))}
                </select>
              </div>

              {/* Academic Year */}
              <div>
                <select
                  value={syllabusYear}
                  onChange={(e) => setSyllabusYear(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Academic Years</option>
                  {availableYears.map(y => (
                    <option key={y} value={y}>Year {y}</option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div className="flex items-center gap-2">
                <select
                  value={syllabusSem}
                  onChange={(e) => setSyllabusSem(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Semesters</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>

                <button
                  onClick={resetSyllabusFilters}
                  title="Reset syllabus filters"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer flex-shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Official Syllabus Documents Grid */}
            {filteredSyllabus.length === 0 ? (
              <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-500">
                  No verified syllabus copies match your chosen filter combination.
                </p>
                <button
                  onClick={resetSyllabusFilters}
                  className="mt-3 text-xs font-bold text-blue-600 hover:underline"
                >
                  Reset Syllabus Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSyllabus.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold bg-blue-100 text-blue-800">
                          {item.departmentId} • {item.academicYear}
                        </span>
                        <span className="text-[10.5px] font-bold text-slate-500">
                          {item.semesterText}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-bold text-slate-900 font-['Outfit'] leading-snug mb-1.5">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Metadata Details */}
                      <div className="space-y-1 mb-4 text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-700">Academic Scheme:</span>
                          <span className="font-medium text-slate-600">{item.scheme}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-700">Source:</span>
                          <span className="text-blue-700 font-medium">becbgk.edu R2 Cloud</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-700">File Size:</span>
                          <span className="font-medium">{item.fileSize}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200">
                      <a
                        href={item.officialPdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View PDF</span>
                      </a>

                      <button
                        onClick={() => handleDownloadSyllabus(item)}
                        className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION B: STUDENT UPLOADED RESOURCES                                    */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'student') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            
            {/* Section B Header & Upload Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/20">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
                      Student Uploaded Resources
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Peer Knowledge Exchange
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Student-contributed academic notes, lab materials, assignments, and study materials moderated by autonomous faculty.
                  </p>
                </div>
              </div>

              {/* Upload Resource Button */}
              <button
                onClick={() => setActiveView('upload')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer self-start sm:self-center"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Resource</span>
              </button>
            </div>

            {/* Section B Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="Search student notes, subjects, or course code..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department */}
              <div>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value as DepartmentCode | 'ALL' }))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Departments</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.id} - {d.name}</option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div>
                <select
                  value={filters.semester}
                  onChange={(e) => setFilters(prev => ({ ...prev, semester: e.target.value === 'ALL' ? 'ALL' : Number(e.target.value) }))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Semesters</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as ResourceCategory | 'ALL' }))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Categories</option>
                  <option value="Notes">Notes</option>
                  <option value="Lab Manual">Lab Manual</option>
                  <option value="Assignment">Assignment</option>
                  <option value="Project">Project</option>
                  <option value="Study Material">Study Material</option>
                  <option value="Presentation">Presentation</option>
                </select>

                <button
                  onClick={resetFilters}
                  title="Reset filters"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer flex-shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Section B Content: Clean Empty State OR Cards */}
            {filteredStudentResources.length === 0 ? (
              <div className="text-center py-16 px-4 bg-[#F8FAFC] rounded-3xl border border-dashed border-slate-200 flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-inner">
                  <UploadCloud className="w-10 h-10" />
                </div>
                
                {/* STRICT REQUIRED TEXT */}
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-1">
                  No student resources uploaded yet.
                </h3>
                <p className="text-xs text-slate-500 max-w-md mb-6">
                  Be the first student to share a useful resource.
                </p>

                <button
                  onClick={() => setActiveView('upload')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Resource</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudentResources.map((res) => {
                  const isSaved = savedIds.includes(res.id);
                  return (
                    <div
                      key={res.id}
                      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-5 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top: Dept & Sem + Bookmark */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                              {res.departmentId} • Sem {res.semester}
                            </span>
                            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-600">
                              {res.category}
                            </span>
                          </div>

                          <button
                            onClick={() => toggleSaveResource(res.id)}
                            title={isSaved ? 'Remove from Bookmarks' : 'Bookmark Resource'}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isSaved 
                                ? 'text-amber-500 bg-amber-50' 
                                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        {/* Subject & Title */}
                        <div className="mb-2">
                          <div className="text-[11px] font-mono font-bold text-blue-600 tracking-wider mb-0.5">
                            {res.subjectCode} • {res.subjectName}
                          </div>
                          <h3 
                            onClick={() => setSelectedResource(res)}
                            className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 font-['Outfit']"
                          >
                            {res.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                          {res.description}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-slate-100">
                        {/* Privacy safe uploader details (no personal email/USN displayed) */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                              {res.uploaderName.charAt(0)}
                            </div>
                            <span className="font-medium truncate max-w-[120px] text-slate-700">
                              {res.uploaderName}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 font-bold text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{res.rating}</span>
                            </span>
                            <span>{res.downloadCount} dl</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => openFileViewer(res)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-bold text-blue-700 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>Preview</span>
                          </button>

                          <button
                            onClick={() => downloadResource(res.id)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs hover:shadow transition-all cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
