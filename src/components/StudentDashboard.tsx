import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  FileText, 
  Bookmark, 
  History, 
  Bell, 
  User, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Download, 
  Star, 
  ArrowRight, 
  Eye, 
  Plus,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentTracker } from './StudentTracker';

export const StudentDashboard: React.FC = () => {
  const { 
    currentUser, 
    resources, 
    academicUpdates, 
    setActiveView, 
    logout, 
    setSelectedResource,
    downloadResource,
    toggleSaveResource,
    openFileViewer 
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'uploads' | 'saved' | 'downloads' | 'notifications' | 'profile'
  >('dashboard');

  const student = currentUser.studentProfile;

  if (!student) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Please log in as a student</h2>
        <button 
          onClick={() => setActiveView('login_student')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs"
        >
          Go to Student Login
        </button>
      </div>
    );
  }

  // Student's own uploads (strictly isolated to authenticated student)
  const myUploads = resources.filter(
    r => (r.uploaderId && r.uploaderId === student.id) ||
         (r.uploaderEmail && r.uploaderEmail === student.email) ||
         (r.uploaderUsn && r.uploaderUsn === student.usn)
  );

  // Saved resources
  const savedResources = resources.filter(
    r => student.savedResourceIds?.includes(r.id)
  );

  // Recommended for student's department and semester
  const recommendedResources = resources
    .filter(r => r.status === 'Approved' && r.departmentId === student.department)
    .slice(0, 3);

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'uploads', label: `My Uploads (${myUploads.length})`, icon: FileText },
    { id: 'saved', label: `Saved Resources (${savedResources.length})`, icon: Bookmark },
    { id: 'downloads', label: 'Download History', icon: History },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Activity Tracker & Profile', icon: User },
  ];

  return (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Student Mini Profile Box */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {student.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {student.name}
                </h4>
                <div className="text-[11px] font-mono text-blue-600 font-semibold truncate">
                  {student.usn}
                </div>
                <div className="text-[10px] text-slate-400">
                  {student.department} • Sem {student.semester}
                </div>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="bg-white rounded-3xl p-3 border border-slate-200/90 shadow-xs space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}

              <div className="pt-2 border-t border-slate-100 mt-2">
                <button
                  onClick={() => setActiveView('upload')}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Resource</span>
                </button>
              </div>

              <div className="pt-1">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-400 hover:text-red-600 text-xs font-semibold rounded-2xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Private Data Security Notice */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-4 border border-blue-200/80 text-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-900">Protected Student Session</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Your submissions, USN, contact info, and activity log are strictly private to you.
              </p>
            </div>

          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* View Tab 1: Dashboard Home */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  
                  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Uploaded</span>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                      {student.uploadedCount}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Total materials</div>
                  </div>

                  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Downloads</span>
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Download className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                      {student.downloadsCount}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Study sessions</div>
                  </div>

                  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Approved</span>
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                      {student.approvedCount}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-bold mt-1">Faculty verified</div>
                  </div>

                  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Pending</span>
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Clock className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                      {student.pendingCount}
                    </div>
                    <div className="text-[11px] text-amber-600 font-bold mt-1">Under moderation</div>
                  </div>

                </div>

                {/* Recommended Resources for this semester */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Recommended for You ({student.department} • Sem {student.semester})</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Based on your branch syllabus and current autonomous exam schedules.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveView('resources')}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Browse All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recommendedResources.map((res) => (
                      <div
                        key={res.id}
                        onClick={() => setSelectedResource(res)}
                        className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-blue-600 block mb-1">
                            {res.subjectCode} • {res.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                            {res.title}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-200/70 mt-3 text-[11px]">
                          <span className="flex items-center gap-1 font-bold text-amber-500">
                            <Star className="w-3 h-3 fill-current" />
                            {res.rating}
                          </span>
                          <span className="text-slate-400">{res.downloadCount} downloads</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Academic Updates Announcement Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-600" />
                      <span>Official Academic Bulletin</span>
                    </h3>
                    <button
                      onClick={() => setActiveView('updates')}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      All Bulletins →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {academicUpdates.slice(0, 3).map((upd) => (
                      <div
                        key={upd.id}
                        className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 transition-colors flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              upd.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {upd.category}
                            </span>
                            <span className="text-[10px] text-slate-400">{upd.publishedDate}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">
                            {upd.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {upd.summary}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Student Activity */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 mb-3 font-['Outfit']">
                    Your Recent Actions
                  </h3>
                  <div className="space-y-2">
                    {student.recentActivities.map((act) => (
                      <div
                        key={act.id}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                            ✓
                          </div>
                          <span className="font-semibold text-slate-800">{act.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* View Tab 2: My Uploads */}
            {activeTab === 'uploads' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                    My Uploaded Resources
                  </h3>
                  <button
                    onClick={() => setActiveView('upload')}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload New</span>
                  </button>
                </div>

                {myUploads.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    You have not uploaded any study materials yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myUploads.map((res) => (
                      <div
                        key={res.id}
                        className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-blue-600 font-mono">
                              {res.subjectCode}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              res.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                              res.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {res.status}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900">{res.title}</h4>
                          <span className="text-[10px] text-slate-400">
                            Uploaded {res.uploadDate} • {res.downloadCount} downloads
                          </span>
                          {res.adminRemarks && (
                            <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg mt-2 border border-amber-200">
                              Remarks: {res.adminRemarks}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => openFileViewer(res)}
                            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                            title="Open original uncorrupted file in universal viewer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View File</span>
                          </button>
                          <button
                            onClick={() => downloadResource(res.id)}
                            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-slate-500" />
                            <span>Download</span>
                          </button>
                          <button
                            onClick={() => setSelectedResource(res)}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View Tab 3: Saved Resources */}
            {activeTab === 'saved' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  Saved Bookmarks ({savedResources.length})
                </h3>

                {savedResources.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No saved resources yet. Click the bookmark icon on any resource card to save it here for fast revision!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedResources.map((res) => (
                      <div
                        key={res.id}
                        className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-blue-600">
                              {res.subjectCode} • Sem {res.semester}
                            </span>
                            <button
                              onClick={() => toggleSaveResource(res.id)}
                              className="text-amber-500 hover:text-slate-400 cursor-pointer"
                            >
                              <Bookmark className="w-4 h-4 fill-current" />
                            </button>
                          </div>
                          <h4 
                            onClick={() => setSelectedResource(res)}
                            className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-blue-600 cursor-pointer mb-2"
                          >
                            {res.title}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-200/70 text-xs">
                          <span className="text-[11px] text-slate-400">{res.fileSize}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openFileViewer(res)}
                              className="text-slate-600 hover:text-blue-600 font-bold flex items-center gap-1 cursor-pointer"
                              title="View File"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => downloadResource(res.id)}
                              className="text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View Tab 4: Downloads */}
            {activeTab === 'downloads' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  Download History
                </h3>
                <p className="text-xs text-slate-500">
                  Total of {student.downloadsCount} documents downloaded during this academic term.
                </p>
                <div className="space-y-2">
                  {student.recentActivities
                    .filter(a => a.type === 'download')
                    .map((d) => (
                      <div key={d.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <Download className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-slate-800">{d.title}</span>
                        </div>
                        <span className="text-slate-400">{d.timestamp}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* View Tab 5: Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  Student Notifications
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-blue-900">
                      <span>Resource Approved & Published</span>
                      <span className="text-[10px] text-blue-500">Yesterday</span>
                    </div>
                    <p className="text-slate-600">
                      Your upload "Database Management Systems Complete Unit 1-5" was approved by Dr. S. R. Patil. You earned 50 Scholar Points!
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-amber-900">
                      <span>CIE-II Exam Timetable Notice</span>
                      <span className="text-[10px] text-amber-600">2 days ago</span>
                    </div>
                    <p className="text-slate-600">
                      Continuous Internal Evaluation (CIE-II) schedule has been released for Semester 6. Please download from the Academic Updates tab.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* View Tab 6: Profile & Activity Tracker */}
            {activeTab === 'profile' && (
              <StudentTracker profile={student} />
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
