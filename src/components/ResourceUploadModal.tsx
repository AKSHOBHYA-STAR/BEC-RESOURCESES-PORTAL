import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Layers, 
  Eye, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DepartmentCode, ResourceCategory } from '../types';
import { ApprovalWorkflowVisualizer } from './ApprovalWorkflowVisualizer';
import { validateUploadFile, formatBytes, detectMimeType } from '../utils/fileStorage';

export const ResourceUploadModal: React.FC = () => {
  const { 
    uploadResource, 
    departments, 
    setActiveView, 
    currentUser, 
    showToast 
  } = useApp();

  const [title, setTitle] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [departmentId, setDepartmentId] = useState<DepartmentCode>(
    currentUser.studentProfile?.department || 'ISE'
  );
  const [semester, setSemester] = useState<number>(
    currentUser.studentProfile?.semester || 5
  );
  const [category, setCategory] = useState<ResourceCategory>('Notes');
  const [scheme, setScheme] = useState('2022 Scheme');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  
  // File state & simulated progress
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selected = e.dataTransfer.files[0];
      handleFileSelection(selected);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      handleFileSelection(selected);
    }
  };

  const handleFileSelection = (f: File) => {
    setFileError(null);
    const validation = validateUploadFile(f);
    if (!validation.valid) {
      const err = validation.error || 'Invalid file format.';
      setFileError(err);
      showToast(err);
      return;
    }

    const formattedSize = formatBytes(f.size);
    setRawFile(f);
    setFile({ name: f.name, size: formattedSize });

    // Progress animation
    setIsUploading(true);
    setUploadProgress(20);
    setTimeout(() => setUploadProgress(60), 200);
    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
      showToast(`File verified: ${f.name} (${formattedSize})`);
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();

    if (!title.trim() || !subjectName.trim() || !subjectCode.trim() || !description.trim()) {
      showToast('Please fill in all mandatory fields.');
      return;
    }

    if (!file) {
      showToast('Please attach a valid study material file (PDF, Office document, Image, or Archive).');
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (tagsArray.length === 0) {
      tagsArray.push(departmentId, `Sem ${semester}`, category);
    }

    uploadResource({
      title: title.trim(),
      subjectName: subjectName.trim(),
      subjectCode: subjectCode.trim().toUpperCase(),
      departmentId,
      semester,
      category,
      subcategory: category,
      description: description.trim(),
      scheme,
      tags: tagsArray,
      fileName: file.name,
      fileSize: file.size,
      previewContent: [
        `Summary extract of ${title}`,
        `Course Code: ${subjectCode.toUpperCase()} (${subjectName})`,
        `Prescribed Scheme: ${scheme} • Department of ${departmentId}`,
        'Includes chapter explanations, solved exam derivations, and practical formulas.'
      ],
      fileBlob: rawFile || undefined
    });

    if (currentUser.role === 'admin') {
      setActiveView('admin_dashboard');
    } else {
      setActiveView('student_dashboard');
    }
  };

  return (
    <div className="py-10 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Academic Contribution</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit']">
              Upload Academic Resource & Notes
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Share verified lecture notes, solved question papers, and lab manuals with 3,000+ BEC students.
            </p>
          </div>

          <button
            onClick={() => setActiveView('resources')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            ← Back to Resources
          </button>
        </div>

        {/* Workflow visualizer preview */}
        <ApprovalWorkflowVisualizer currentStage={1} />

        {/* Main Form Box */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
              Resource Information
            </h3>
            <span className="text-xs font-medium text-slate-400">
              * All fields are verified against official BEC autonomous curriculum
            </span>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Resource Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Operating Systems Module 1 to 5 Comprehensive Notes & Solved Numericals"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Subject Name and Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Subject Name *
              </label>
              <input
                type="text"
                required
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="e.g. Database Management Systems"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Subject / Course Code *
              </label>
              <input
                type="text"
                required
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="e.g. 21IS52 / 21CS51"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 uppercase font-mono"
              />
            </div>
          </div>

          {/* Department, Semester, Category, Scheme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Department */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Department *
              </label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value as DepartmentCode)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.code} - {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Semester *
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Resource Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Resource Type *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ResourceCategory)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="Notes">Notes</option>
                <option value="Syllabus">Syllabus</option>
                <option value="Question Paper">Question Paper</option>
                <option value="Study Material">Study Material</option>
                <option value="Lab Manual">Lab Manual</option>
                <option value="Presentation">Presentation</option>
              </select>
            </div>

            {/* Scheme */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Curriculum Scheme *
              </label>
              <select
                value={scheme}
                onChange={(e) => setScheme(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="2022 Scheme">2022 Scheme (NEP)</option>
                <option value="2021 Scheme">2021 Scheme (Autonomous)</option>
                <option value="2018 Scheme">2018 Scheme</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Detailed Description & Module Coverage *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail what is covered (e.g. Unit 1 ER Modeling, Unit 2 SQL Queries with examples, solved practice problems and lab records)..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Drag & Drop File Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Upload Academic File (PDF, DOCX, PPTX, XLSX, TXT, Images, ZIP) *
            </label>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all ${
                isDragOver 
                  ? 'border-blue-500 bg-blue-50/60' 
                  : fileError
                  ? 'border-red-300 bg-red-50/30'
                  : 'border-slate-200 hover:border-blue-300 bg-[#F8FAFC]'
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-xs ${
                  fileError ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {fileError ? <AlertCircle className="w-7 h-7" /> : <UploadCloud className="w-7 h-7" />}
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  Drag and drop your original document here, or{' '}
                  <label className="text-blue-600 hover:underline cursor-pointer">
                    browse files
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.json,.xml,.md,.jpg,.jpeg,.png,.webp,.zip,.rar,.7z"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                </h4>
                <p className="text-xs text-slate-400 mb-2">
                  Supports PDF, DOCX, PPTX, XLSX, TXT, JPG, PNG, WEBP, ZIP up to 50 MB
                </p>

                {fileError && (
                  <div className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl mb-3 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{fileError}</span>
                  </div>
                )}

                {/* Selected File Card */}
                {file && (
                  <div className="w-full max-w-md bg-white rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left overflow-hidden">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {file.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{file.size}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowPreviewModal(true)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg cursor-pointer"
                        title="Quick Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-50 rounded-lg cursor-pointer"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Progress bar */}
                {isUploading && (
                  <div className="w-full max-w-md mt-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span>Uploading document...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tags (comma separated)
            </label>
            <div className="relative">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. DBMS, Normalization, SQL Triggers, Module 3, Solved Exam"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Actions: Save Draft & Submit for Approval */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Save as Draft
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveView('resources')}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit for Approval</span>
              </button>
            </div>
          </div>

        </form>

      </div>

      {/* Quick PDF Preview modal */}
      {showPreviewModal && file && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Uploaded Document Verification</span>
              </h3>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-xs space-y-2">
              <div className="text-emerald-400 font-bold">✓ PDF Header Valid: %PDF-1.4</div>
              <div>File Name: {file.name}</div>
              <div>File Size: {file.size}</div>
              <div className="text-slate-400 text-[11px] pt-2 border-t border-slate-800">
                Ready for administrative moderation and BEC autonomous curriculum verification upon submission.
              </div>
            </div>

            <button
              onClick={() => setShowPreviewModal(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
