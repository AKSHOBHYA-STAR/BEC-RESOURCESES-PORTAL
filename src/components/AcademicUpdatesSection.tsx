import React, { useState } from 'react';
import { 
  Bell, 
  Download, 
  Calendar, 
  AlertCircle, 
  FileText, 
  Search, 
  Pin, 
  Building2, 
  ChevronRight,
  Filter,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AcademicUpdate } from '../types';

export const AcademicUpdatesSection: React.FC = () => {
  const { academicUpdates, currentUser, setActiveView, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedUpdate, setSelectedUpdate] = useState<AcademicUpdate | null>(null);

  const categories = [
    'ALL',
    'Exam Notification',
    'Circular',
    'Department Announcement',
    'Timetable Update',
    'Placement Update',
    'Scholarship Notice'
  ];

  const filteredUpdates = academicUpdates.filter((upd) => {
    if (selectedCategory !== 'ALL' && upd.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleDownloadAttachment = (upd: AcademicUpdate) => {
    showToast(`Downloading official circular: "${upd.attachmentName || 'Notice.pdf'}"...`);
  };

  return (
    <section className="py-16 bg-[#F8FAFC] min-h-[700px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <Bell className="w-3.5 h-3.5" />
              <span>Official Institutional Noticeboard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
              Academic Updates & Circulars
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Authentic circulars issued by the Controller of Examinations (CoE), Dean Academics, and Department HODs.
            </p>
          </div>

          {currentUser.role === 'admin' && (
            <button
              onClick={() => setActiveView('admin_dashboard')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
            >
              <span>+ Publish Notice (Admin)</span>
            </button>
          )}
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'ALL' ? 'All Updates' : cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUpdates.map((upd) => (
            <div
              key={upd.id}
              className={`group bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-blue-500/5 ${
                upd.isPinned ? 'border-blue-300 ring-2 ring-blue-100' : 'border-slate-200/90 hover:border-blue-300'
              }`}
            >
              <div>
                {/* Top Row: Category, Priority, Date, Pin */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      upd.priority === 'Urgent' ? 'bg-red-100 text-red-700' :
                      upd.priority === 'Important' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {upd.priority}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {upd.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {upd.isPinned && (
                      <span className="flex items-center gap-1 text-blue-600 font-bold text-[10px]">
                        <Pin className="w-3 h-3 fill-current" />
                        Pinned
                      </span>
                    )}
                    <span>{upd.publishedDate}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => setSelectedUpdate(upd)}
                  className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer mb-2 font-['Outfit'] leading-snug"
                >
                  {upd.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {upd.summary}
                </p>

                {/* Issuer */}
                <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 mb-4">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{upd.issuer}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedUpdate(upd)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Full Notice</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {upd.attachmentName && (
                  <button
                    onClick={() => handleDownloadAttachment(upd)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-blue-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Circular</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Update Modal */}
      {selectedUpdate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                {selectedUpdate.category} • {selectedUpdate.publishedDate}
              </span>
              <button
                onClick={() => setSelectedUpdate(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 font-['Outfit'] mb-2">
                {selectedUpdate.title}
              </h2>
              <div className="text-xs font-semibold text-slate-500 mb-4">
                Issued by: {selectedUpdate.issuer}
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>{selectedUpdate.content}</p>
              </div>
            </div>

            {selectedUpdate.attachmentName && (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs">
                <div className="flex items-center gap-2 text-blue-900 font-bold">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>{selectedUpdate.attachmentName}</span>
                </div>
                <button
                  onClick={() => handleDownloadAttachment(selectedUpdate)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 cursor-pointer"
                >
                  Download PDF
                </button>
              </div>
            )}

            <div className="text-right pt-2">
              <button
                onClick={() => setSelectedUpdate(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
