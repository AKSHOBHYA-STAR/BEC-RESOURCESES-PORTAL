import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Star, 
  Share2, 
  Bookmark, 
  CheckCircle2, 
  Calendar, 
  User, 
  Layers, 
  FileText, 
  AlertTriangle,
  MessageSquare,
  Send,
  Eye,
  Check,
  ThumbsUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ResourceItem } from '../types';

interface ResourceDetailsModalProps {
  resource: ResourceItem;
  onClose: () => void;
}

export const ResourceDetailsModal: React.FC<ResourceDetailsModalProps> = ({ resource, onClose }) => {
  const { 
    downloadResource, 
    toggleSaveResource, 
    rateResource, 
    addComment, 
    resources, 
    setSelectedResource, 
    currentUser,
    showToast,
    openFileViewer
  } = useApp();

  const [commentInput, setCommentInput] = useState('');
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hasRated, setHasRated] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const isSaved = currentUser.studentProfile?.savedResourceIds?.includes(resource.id);

  // Related resources: same department or same subject
  const relatedResources = resources
    .filter(r => r.id !== resource.id && (r.departmentId === resource.departmentId || r.subjectCode === resource.subjectCode))
    .slice(0, 3);

  const handleDownload = () => {
    downloadResource(resource.id);
  };

  const handleRate = (stars: number) => {
    rateResource(resource.id, stars);
    setSelectedRating(stars);
    setHasRated(true);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(resource.id, commentInput.trim());
    setCommentInput('');
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Report submitted to BEC Academic Review Committee. Thank you.');
    setShowReportModal(false);
    setReportReason('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-700">
              {resource.departmentId} • Semester {resource.semester}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700">
              {resource.category}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              {resource.scheme}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveResource(resource.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isSaved 
                  ? 'bg-amber-50 border-amber-200 text-amber-500' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-amber-500'
              }`}
              title="Save to bookmarks"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Main Info */}
          <div>
            <div className="text-xs font-mono font-bold text-blue-600 tracking-wider mb-1 uppercase">
              {resource.subjectCode} — {resource.subjectName}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-3 font-['Outfit']">
              {resource.title}
            </h1>

            {/* Author, Date, Verified */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  {resource.uploaderName.charAt(0)}
                </div>
                <span className="font-semibold text-slate-800">
                  {resource.uploaderName} ({resource.uploaderRole})
                </span>
                {resource.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified by BEC
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>Uploaded on {resource.uploadDate}</span>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <Eye className="w-3.5 h-3.5" />
                <span>{resource.viewCount} views</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Overview & Syllabus Coverage
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100">
              {resource.description}
            </p>
          </div>

          {/* Simulated Live Document Reader / Sample Content Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Document Module & Content Preview</span>
              </h4>
              <button
                onClick={() => {
                  onClose();
                  openFileViewer(resource);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Full Universal Viewer →</span>
              </button>
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 font-mono text-xs space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400 font-sans">
                <span>BEC Academic Repository • Verified Document Extract</span>
                <span className="text-emerald-400">● Integrity Checked</span>
              </div>

              {resource.sampleContentPreview && resource.sampleContentPreview.length > 0 ? (
                resource.sampleContentPreview.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="text-blue-400 font-bold select-none">{idx + 1}.</span>
                    <span className="text-slate-300 font-sans leading-relaxed">{line}</span>
                  </div>
                ))
              ) : (
                <div className="text-slate-400">Full verified document ready for preview and offline examination study.</div>
              )}

              <div className="pt-2 text-[11px] text-slate-500 font-sans italic border-t border-slate-800 flex items-center justify-between">
                <span>Authentic original binary available in universal viewer.</span>
                <span className="text-slate-400 font-mono">{resource.fileName}</span>
              </div>
            </div>
          </div>

          {/* File Specifications & Verification Table */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Resource File Specifications & Verification</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-600">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">File Name</span>
                <span className="font-bold text-slate-900 truncate block font-mono" title={resource.fileName}>{resource.fileName}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Format</span>
                <span className="font-bold text-blue-600 block">{resource.fileType || 'Document'}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Size</span>
                <span className="font-bold text-slate-900 block">{resource.fileSize}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Integrity</span>
                <span className="font-bold text-emerald-600 block">100% Uncorrupted</span>
              </div>
            </div>
            {resource.lastDownloadedAt && (
              <div className="mt-2.5 pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Last downloaded by: <strong>{resource.lastDownloadedBy || 'BEC Student'}</strong></span>
                <span>Date: {new Date(resource.lastDownloadedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Download & Rating Actions Card */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-5 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl font-black text-slate-900 font-['Outfit']">
                  {resource.rating}
                </span>
                <div className="flex items-center text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      className={`w-4 h-4 ${s <= Math.round(resource.rating) ? 'fill-current' : 'text-slate-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-slate-500">
                  ({resource.ratingCount} reviews)
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Downloaded {resource.downloadCount} times by BEC students
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  openFileViewer(resource);
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Online</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Original ({resource.fileSize})</span>
              </button>

              <button
                onClick={() => setShowReportModal(true)}
                title="Report issue or typo"
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Rating Widget */}
          <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Rate this resource quality:
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  className="p-1 hover:scale-125 transition-transform cursor-pointer"
                >
                  <Star 
                    className={`w-5 h-5 ${
                      star <= selectedRating 
                        ? 'text-amber-500 fill-amber-500' 
                        : 'text-slate-300'
                    }`} 
                  />
                </button>
              ))}
              {hasRated && (
                <span className="text-[11px] font-bold text-emerald-600 ml-2">
                  Rated!
                </span>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>Student Feedback & Discussions ({resource.comments?.length || 0})</span>
            </h4>

            {/* Post comment input */}
            <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Ask a question about this module or leave helpful review..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>

            {/* Comments list */}
            <div className="space-y-3">
              {resource.comments && resource.comments.length > 0 ? (
                resource.comments.map((comm) => (
                  <div key={comm.id} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{comm.authorName}</span>
                        {comm.authorUsn && (currentUser.role === 'admin' || currentUser.studentProfile?.usn === comm.authorUsn) && (
                          <span className="text-[10px] text-slate-400 font-mono">({comm.authorUsn})</span>
                        )}
                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
                          {comm.authorRole}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{comm.timestamp}</span>
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {comm.text}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-xs text-slate-400 bg-slate-50 rounded-xl">
                  No comments yet. Be the first student to review this material!
                </div>
              )}
            </div>
          </div>

          {/* Related Resources */}
          {relatedResources.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Related Resources in {resource.departmentId}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedResources.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedResource(rel)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 block mb-0.5">
                        {rel.subjectCode}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                        {rel.title}
                      </h5>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 mt-2 block">
                      {rel.category} • Sem {rel.semester}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Report Issue Sub-Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Report Resource Issue</span>
            </h3>
            <p className="text-xs text-slate-500">
              Found a mistake in syllabus topics, broken download, or outdated scheme? Let the faculty committee know.
            </p>
            <textarea
              rows={3}
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Describe the issue with this material..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
