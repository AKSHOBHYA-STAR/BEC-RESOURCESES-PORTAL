import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Users, 
  Download, 
  Plus, 
  Trash2, 
  Eye, 
  Send, 
  Search, 
  Filter, 
  Bell, 
  BarChart3, 
  Settings, 
  LogOut, 
  Check, 
  X, 
  AlertTriangle,
  FileCheck2,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ResourceItem, DepartmentCode, AcademicUpdate } from '../types';
import { AnalyticsDashboard } from './AnalyticsDashboard';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    resources, 
    departments, 
    academicUpdates, 
    approveResource, 
    rejectResource, 
    requestChanges, 
    deleteResource, 
    publishUpdate, 
    deleteUpdate,
    setSelectedResource, 
    setActiveView, 
    logout,
    openFileViewer,
    downloadResource
  } = useApp();

  const [adminTab, setAdminTab] = useState<
    'dashboard' | 'approvals' | 'resources' | 'departments' | 'students' | 'updates' | 'analytics'
  >('dashboard');

  // Approval remarks modal
  const [remarkTarget, setRemarkTarget] = useState<{ id: string; type: 'reject' | 'changes' } | null>(null);
  const [remarksText, setRemarksText] = useState('');

  // Publish Announcement Form State
  const [newUpdateTitle, setNewUpdateTitle] = useState('');
  const [newUpdateCategory, setNewUpdateCategory] = useState<AcademicUpdate['category']>('Circular');
  const [newUpdatePriority, setNewUpdatePriority] = useState<AcademicUpdate['priority']>('Important');
  const [newUpdateSummary, setNewUpdateSummary] = useState('');
  const [newUpdateContent, setNewUpdateContent] = useState('');

  // Search in resources management
  const [resSearch, setResSearch] = useState('');
  const [resStatusFilter, setResStatusFilter] = useState<string>('ALL');

  const pendingApprovals = resources.filter(r => r.status === 'Pending');
  const totalApproved = resources.filter(r => r.status === 'Approved').length;
  const totalDownloads = resources.reduce((acc, curr) => acc + curr.downloadCount, 48000);

  const handleRemarkSubmit = () => {
    if (!remarkTarget) return;
    if (remarkTarget.type === 'reject') {
      rejectResource(remarkTarget.id, remarksText || 'Does not meet autonomous syllabus guidelines.');
    } else {
      requestChanges(remarkTarget.id, remarksText || 'Please clarify Module 3 derivations.');
    }
    setRemarkTarget(null);
    setRemarksText('');
  };

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdateTitle || !newUpdateSummary) return;

    publishUpdate({
      title: newUpdateTitle,
      category: newUpdateCategory,
      priority: newUpdatePriority,
      issuer: 'College Administration & Academic Council, BEC Bagalkot',
      summary: newUpdateSummary,
      content: newUpdateContent || newUpdateSummary,
      attachmentName: 'Official_BEC_Notification.pdf'
    });

    setNewUpdateTitle('');
    setNewUpdateSummary('');
    setNewUpdateContent('');
  };

  const filteredManagementResources = resources.filter(r => {
    if (resStatusFilter !== 'ALL' && r.status !== resStatusFilter) return false;
    if (resSearch.trim()) {
      const q = resSearch.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.subjectCode.toLowerCase().includes(q) || r.uploaderName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200/80 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-lg shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
                  Academic Administrator Control Panel
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                  STAFF MODE
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Logged in as {currentUser.adminName || 'Dr. B. K. Hiremath (Academic Dean)'} • Basaveshwara Engineering College
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveView('home')}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              Public View
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-bold hover:bg-red-100 cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2 bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs">
            {[
              { id: 'dashboard', label: 'Overview Dashboard', icon: Layers },
              { id: 'approvals', label: `Resource Approvals (${pendingApprovals.length})`, icon: Clock, badge: pendingApprovals.length > 0 ? pendingApprovals.length : undefined },
              { id: 'resources', label: `Manage Resources (${resources.length})`, icon: FileText },
              { id: 'departments', label: 'Departments & HODs', icon: GraduationCap },
              { id: 'students', label: 'Students & Contributors', icon: Users },
              { id: 'updates', label: 'Academic Updates / Circulars', icon: Bell },
              { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-900 font-extrabold text-[10px] flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* OVERVIEW DASHBOARD */}
            {adminTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* 5 Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Total Resources</span>
                    <div className="text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
                      {resources.length}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold">{totalApproved} Approved</span>
                  </div>

                  <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Pending Review</span>
                    <div className="text-2xl font-black text-amber-600 font-['Outfit'] mt-1">
                      {pendingApprovals.length}
                    </div>
                    <span className="text-[10px] text-amber-600 font-bold">Needs verification</span>
                  </div>

                  <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Active Students</span>
                    <div className="text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
                      3,450+
                    </div>
                    <span className="text-[10px] text-blue-600 font-bold">Across 8 branches</span>
                  </div>

                  <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Total Downloads</span>
                    <div className="text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
                      {totalDownloads.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-purple-600 font-bold">Campus-wide</span>
                  </div>

                  <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Departments</span>
                    <div className="text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
                      8
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold">Autonomous</span>
                  </div>
                </div>

                {/* Pending Approvals Quick Feed */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span>Recent Submissions Awaiting Moderation</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Review syllabus alignment, correct course code, and document quality before publishing.
                      </p>
                    </div>

                    <button
                      onClick={() => setAdminTab('approvals')}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      View All Approvals ({pendingApprovals.length}) →
                    </button>
                  </div>

                  {pendingApprovals.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-2xl">
                      ✓ No pending approvals! The moderation queue is clean.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingApprovals.slice(0, 3).map((res) => (
                        <div
                          key={res.id}
                          className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-lg">
                                {res.departmentId} • Sem {res.semester}
                              </span>
                              <span className="text-xs font-mono font-bold text-slate-600">
                                {res.subjectCode}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                by {res.uploaderName} ({res.uploaderUsn || 'Faculty'})
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">
                              {res.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {res.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openFileViewer(res)}
                              className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 hover:bg-blue-100 flex items-center gap-1 cursor-pointer"
                              title="Open authentic document in universal viewer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View File</span>
                            </button>
                            <button
                              onClick={() => setSelectedResource(res)}
                              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => approveResource(res.id)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setRemarkTarget({ id: res.id, type: 'reject' })}
                              className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold border border-red-200 cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Add Resource CTA */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                  <div>
                    <h3 className="text-lg font-bold font-['Outfit']">
                      Direct Faculty Resource Publishing
                    </h3>
                    <p className="text-xs text-blue-100 mt-0.5">
                      Publish official syllabus blueprints, circular copies, or model examination papers with instant approval.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveView('upload')}
                    className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-md hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    + Upload & Publish
                  </button>
                </div>

              </div>
            )}

            {/* RESOURCE APPROVAL PANEL */}
            {adminTab === 'approvals' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-['Outfit']">
                    Resource Moderation Queue ({pendingApprovals.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Review academic resources contributed by BEC students against the official BEC autonomous curriculum.
                  </p>
                </div>

                {pendingApprovals.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 text-xs bg-slate-50 rounded-2xl">
                    ✓ All submitted materials have been moderated!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingApprovals.map((res) => (
                      <div
                        key={res.id}
                        className="p-5 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-700">
                              {res.departmentId} • Sem {res.semester}
                            </span>
                            <span className="px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-slate-100 text-slate-700">
                              {res.subjectCode}
                            </span>
                            <span className="text-xs font-bold text-slate-500">
                              {res.category}
                            </span>
                          </div>

                          <div className="text-xs text-slate-400">
                            Uploaded on {res.uploadDate}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-slate-900 leading-snug">
                            {res.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1">
                            {res.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 pt-2 border-t border-slate-50">
                            <span><strong>Uploader:</strong> {res.uploaderName}</span>
                            <span><strong>USN:</strong> {res.uploaderUsn || 'N/A'}</span>
                            <span><strong>File:</strong> {res.fileName} ({res.fileSize})</span>
                          </div>
                        </div>

                        {/* Admin Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openFileViewer(res)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs cursor-pointer"
                              title="Open authentic document in universal viewer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View File</span>
                            </button>
                            <button
                              onClick={() => setSelectedResource(res)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                            >
                              <span>Details</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setRemarkTarget({ id: res.id, type: 'changes' })}
                              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 cursor-pointer"
                            >
                              Request Changes
                            </button>
                            <button
                              onClick={() => setRemarkTarget({ id: res.id, type: 'reject' })}
                              className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 cursor-pointer"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => approveResource(res.id)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                            >
                              ✓ Approve & Publish
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* RESOURCE MANAGEMENT */}
            {adminTab === 'resources' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-['Outfit']">
                      All Academic Resources
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage, edit, archive or delete cataloged college resources.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveView('upload')}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Resource</span>
                  </button>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={resSearch}
                      onChange={(e) => setResSearch(e.target.value)}
                      placeholder="Search resources by title, course code, author..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <select
                    value={resStatusFilter}
                    onChange={(e) => setResStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Approved">Approved Only</option>
                    <option value="Pending">Pending Only</option>
                    <option value="Rejected">Rejected Only</option>
                  </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-[#F8FAFC] text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-3">Resource / Subject</th>
                        <th className="p-3">Branch</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Downloads</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredManagementResources.map((res) => (
                        <tr key={res.id} className="hover:bg-slate-50/70">
                          <td className="p-3 font-semibold text-slate-900 max-w-xs">
                            <div className="truncate">{res.title}</div>
                            <div className="text-[10px] text-blue-600 font-mono">{res.subjectCode}</div>
                          </td>
                          <td className="p-3 font-bold text-slate-700">
                            {res.departmentId} (Sem {res.semester})
                          </td>
                          <td className="p-3">{res.category}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              res.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                              res.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {res.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono">{res.downloadCount}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openFileViewer(res)}
                                className="p-1.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 cursor-pointer"
                                title="View & Preview Original File"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => downloadResource(res.id)}
                                className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                                title="Download Original Binary"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setSelectedResource(res)}
                                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
                                title="Details & Comments"
                              >
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteResource(res.id)}
                                className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* DEPARTMENTS TAB */}
            {adminTab === 'departments' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-lg font-black text-slate-900 font-['Outfit']">
                  Academic Departments & Department Leads
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {departments.map((dept) => (
                    <div key={dept.id} className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                          {dept.code}
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          {dept.totalResources} Resources
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{dept.name}</h4>
                      <div className="text-xs text-slate-500">
                        <strong>Head of Department:</strong> {dept.hodName}
                      </div>
                      <div className="text-xs text-slate-400">
                        {dept.totalStudents} enrolled students • Estd. {dept.establishedYear}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STUDENTS DIRECTORY TAB */}
            {adminTab === 'students' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-lg font-black text-slate-900 font-['Outfit']">
                  Student Contributor Directory
                </h3>
                <p className="text-xs text-slate-500">
                  Track top contributors, uploaded notes status, and awarded scholar points.
                </p>
                <div className="space-y-3">
                  {[
                    { name: 'Sneha R. Kulkarni', usn: '2BA21CS098', branch: 'CSE', sem: 7, points: 1840, uploads: 24, status: 'Active' },
                    { name: 'Praveen S. Joshi', usn: '2BA21EC042', branch: 'ECE', sem: 7, points: 1420, uploads: 19, status: 'Active' },
                    { name: 'Vilas Patil', usn: '2BA22IS045', branch: 'ISE', sem: 6, points: 920, uploads: 8, status: 'Active' },
                    { name: 'Aishwarya M. Patil', usn: '2BA22AD014', branch: 'AIDS', sem: 6, points: 810, uploads: 9, status: 'Active' },
                  ].map((stu, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                          {stu.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{stu.name}</div>
                          <div className="text-[11px] font-mono text-slate-500">
                            {stu.usn} • {stu.branch} Sem {stu.sem}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="font-bold text-amber-600">{stu.points} pts</span>
                          <div className="text-[10px] text-slate-400">{stu.uploads} notes shared</div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {stu.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACADEMIC UPDATES / CIRCULARS TAB */}
            {adminTab === 'updates' && (
              <div className="space-y-6">
                
                {/* Publish Form */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <span>Publish Official Academic Circular / Update</span>
                  </h3>

                  <form onSubmit={handlePublishAnnouncement} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Title / Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={newUpdateTitle}
                        onChange={(e) => setNewUpdateTitle(e.target.value)}
                        placeholder="e.g. Schedule for Autonomous B.E 6th Sem CIE-II Examinations"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Category
                        </label>
                        <select
                          value={newUpdateCategory}
                          onChange={(e) => setNewUpdateCategory(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                        >
                          <option value="Circular">Circular</option>
                          <option value="Exam Notification">Exam Notification</option>
                          <option value="Department Announcement">Department Announcement</option>
                          <option value="Timetable Update">Timetable Update</option>
                          <option value="Placement Update">Placement Update</option>
                          <option value="Scholarship Notice">Scholarship Notice</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Priority Badge
                        </label>
                        <select
                          value={newUpdatePriority}
                          onChange={(e) => setNewUpdatePriority(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                        >
                          <option value="Urgent">Urgent (Red Alert)</option>
                          <option value="Important">Important (Amber)</option>
                          <option value="General">General (Blue)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Summary Brief *
                      </label>
                      <input
                        type="text"
                        required
                        value={newUpdateSummary}
                        onChange={(e) => setNewUpdateSummary(e.target.value)}
                        placeholder="Short summary for the noticeboard banner..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Broadcast to Students</span>
                    </button>
                  </form>
                </div>

                {/* Published Updates List */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">
                    Active Published Circulars ({academicUpdates.length})
                  </h4>

                  <div className="space-y-2">
                    {academicUpdates.map((upd) => (
                      <div
                        key={upd.id}
                        className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              upd.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {upd.priority} • {upd.category}
                            </span>
                            <span className="text-[10px] text-slate-400">{upd.publishedDate}</span>
                          </div>
                          <h5 className="font-bold text-slate-900">{upd.title}</h5>
                        </div>

                        <button
                          onClick={() => deleteUpdate(upd.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                          title="Delete update"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ANALYTICS TAB */}
            {adminTab === 'analytics' && (
              <AnalyticsDashboard />
            )}

          </div>

        </div>

      </div>

      {/* Remarks Sub-Modal */}
      {remarkTarget && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900">
              {remarkTarget.type === 'reject' ? 'Reject Resource Submission' : 'Request Changes from Student'}
            </h3>
            <p className="text-xs text-slate-500">
              Provide constructive feedback on syllabus discrepancies or document issues.
            </p>
            <textarea
              rows={3}
              value={remarksText}
              onChange={(e) => setRemarksText(e.target.value)}
              placeholder="e.g. Please re-scan page 4 with better lighting; or add missing Module 5 derivations."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRemarkTarget(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRemarkSubmit}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
              >
                Confirm Remarks
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
