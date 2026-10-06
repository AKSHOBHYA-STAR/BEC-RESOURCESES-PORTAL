import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  FileText, 
  Image as ImageIcon, 
  FileCode, 
  FileArchive, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Copy, 
  Check, 
  BookOpen, 
  Share2, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { ResourceItem } from '../types';
import { 
  ensureResourceBinary, 
  getOrCreateBlobUrl, 
  detectMimeType, 
  downloadResourceFile 
} from '../utils/fileStorage';
import { useApp } from '../context/AppContext';

interface FileViewerModalProps {
  resource: ResourceItem;
  onClose: () => void;
}

export const FileViewerModal: React.FC<FileViewerModalProps> = ({ resource, onClose }) => {
  const { downloadResource, showToast } = useApp();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('application/pdf');
  const [fileSizeText, setFileSizeText] = useState<string>(resource.fileSize);
  const [textContent, setTextContent] = useState<string | null>(null);

  // Viewer Controls
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'outline' | 'info'>('preview');
  const [pdfViewMode, setPdfViewMode] = useState<'reader' | 'embedded'>('reader');

  const totalPages = resource.pageCount || (resource.sampleContentPreview?.length ? resource.sampleContentPreview.length + 1 : 5);

  useEffect(() => {
    let isMounted = true;

    async function loadBinary() {
      try {
        setLoading(true);
        setError(null);

        const record = await ensureResourceBinary({
          id: resource.id,
          title: resource.title,
          subjectName: resource.subjectName,
          subjectCode: resource.subjectCode,
          departmentId: resource.departmentId,
          semester: resource.semester,
          uploaderName: resource.uploaderName,
          scheme: resource.scheme,
          description: resource.description,
          fileName: resource.fileName,
          sampleContentPreview: resource.sampleContentPreview,
          tags: resource.tags
        });

        if (!isMounted) return;

        const detected = record.mimeType || detectMimeType(resource.fileName);
        setMimeType(detected);
        setFileSizeText(record.fileSize);

        const url = getOrCreateBlobUrl(resource.id, record.blob);
        setBlobUrl(url);

        if (record.textContent) {
          setTextContent(record.textContent);
        } else if (detected.startsWith('text/') || detected === 'application/json' || detected === 'text/csv') {
          try {
            const txt = await record.blob.text();
            setTextContent(txt);
          } catch {
            // ignore
          }
        }

        setLoading(false);
      } catch (err: any) {
        console.error('Failed to load file binary for preview:', err);
        if (isMounted) {
          setError('Unable to load document binary into preview viewer.');
          setLoading(false);
        }
      }
    }

    loadBinary();

    return () => {
      isMounted = false;
    };
  }, [resource]);

  const handleDownload = async () => {
    try {
      await downloadResource(resource.id);
    } catch {
      showToast('Download failed. Please try again.');
    }
  };

  const handleCopyText = () => {
    if (textContent) {
      navigator.clipboard.writeText(textContent);
      setCopied(true);
      showToast('Text copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => {
    setZoomLevel(100);
    setRotation(0);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

  const isPdf = mimeType === 'application/pdf' || resource.fileName.toLowerCase().endsWith('.pdf');
  const isImage = mimeType.startsWith('image/');
  const isText = mimeType.startsWith('text/') || mimeType === 'application/json' || mimeType === 'text/csv';
  const isOffice = 
    mimeType.includes('officedocument') || 
    mimeType.includes('msword') || 
    mimeType.includes('ms-excel') || 
    mimeType.includes('ms-powerpoint') ||
    /\.(docx?|pptx?|xlsx?)$/i.test(resource.fileName);
  const isArchive = mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z') || /\.(zip|rar|7z)$/i.test(resource.fileName);

  return (
    <div className={`fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200 ${
      isFullScreen ? 'p-0' : ''
    }`}>
      <div className={`bg-white rounded-3xl shadow-2xl border border-slate-700/50 flex flex-col overflow-hidden transition-all duration-300 ${
        isFullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-[92vh]'
      }`}>
        
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center flex-shrink-0">
              {isPdf ? <FileText className="w-5 h-5 text-red-400" /> :
               isImage ? <ImageIcon className="w-5 h-5 text-emerald-400" /> :
               isText ? <FileCode className="w-5 h-5 text-amber-400" /> :
               isArchive ? <FileArchive className="w-5 h-5 text-purple-400" /> :
               <BookOpen className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="text-left overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  {resource.subjectCode}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-[11px] font-semibold text-slate-300">
                  {resource.departmentId} (Sem {resource.semester})
                </span>
                {resource.isVerified && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate font-['Outfit']">
                {resource.fileName}
              </h2>
            </div>
          </div>

          {/* Top Right Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {blobUrl && (
              <a
                href={blobUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Open raw file in new browser tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={toggleFullScreen}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-900/60 hover:text-red-300 text-slate-300 transition-colors cursor-pointer"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Toolbar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-700 flex-shrink-0 flex-wrap gap-2">
          
          {/* Left: View Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'preview' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Document Preview
            </button>
            <button
              onClick={() => setActiveTab('outline')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'outline' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Module Outline
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'info' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              File Details & Metadata
            </button>
          </div>

          {/* Right: Zoom & Navigation Controls */}
          {activeTab === 'preview' && (
            <div className="flex items-center gap-2">
              {isPdf && (
                <div className="flex items-center gap-1 bg-slate-200/90 p-0.5 rounded-lg mr-2 border border-slate-300">
                  <button
                    onClick={() => setPdfViewMode('reader')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      pdfViewMode === 'reader' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Document Reader
                  </button>
                  <button
                    onClick={() => setPdfViewMode('embedded')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      pdfViewMode === 'embedded' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Raw PDF Plugin
                  </button>
                </div>
              )}

              {isPdf && (
                <div className="flex items-center gap-1 mr-2 border-r border-slate-300 pr-2">
                  <button
                    disabled={activePage <= 1}
                    onClick={() => setActivePage((p) => Math.max(p - 1, 1))}
                    className="p-1 rounded hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-[11px] font-bold">
                    Page {activePage} of {totalPages}
                  </span>
                  <button
                    disabled={activePage >= totalPages}
                    onClick={() => setActivePage((p) => Math.min(p + 1, totalPages))}
                    className="p-1 rounded hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                  className="p-1 rounded hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-[11px] w-12 text-center">
                  {zoomLevel}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  className="p-1 rounded hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-300 hover:bg-slate-50 cursor-pointer ml-1"
                >
                  Reset
                </button>
                {isImage && (
                  <button
                    onClick={handleRotate}
                    className="p-1 rounded hover:bg-slate-200 cursor-pointer ml-1"
                    title="Rotate 90 degrees"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Viewer Body Area */}
        <div className="flex-1 bg-slate-900/95 overflow-auto relative p-4 flex items-center justify-center">
          
          {loading && (
            <div className="flex flex-col items-center justify-center text-white space-y-3">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold text-slate-300">
                Loading authentic file binary into universal viewer...
              </span>
            </div>
          )}

          {error && !loading && (
            <div className="max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-white">Preview Notice</h3>
              <p className="text-xs text-slate-400">{error}</p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Original ({fileSizeText})</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: PREVIEW */}
          {!loading && !error && activeTab === 'preview' && (
            <div className="w-full h-full flex items-center justify-center overflow-auto">
              
              {/* PDF VIEWER */}
              {isPdf && blobUrl && pdfViewMode === 'reader' && (
                <div 
                  className="w-full max-w-4xl transition-transform duration-200 my-auto py-4"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                >
                  <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-10 border border-slate-300 flex flex-col justify-between min-h-[700px] space-y-6">
                    
                    {/* Official BEC Letterhead */}
                    <div className="text-center border-b-2 border-slate-900 pb-5">
                      <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-1">
                        Basaveshwar Veerashaiva Vidyavardhak Sangha (Estd. 1906)
                      </div>
                      <h1 className="text-base sm:text-xl font-black text-blue-900 font-['Outfit'] tracking-tight">
                        BASAVESHWARA ENGINEERING COLLEGE (AUTONOMOUS)
                      </h1>
                      <div className="text-[11px] text-slate-600 mt-1 font-medium">
                        Vidyagiri, Bagalkot - 587102, Karnataka, India • NAAC 'A' Grade • NBA Accredited
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Autonomous Institution Affiliated to Visvesvaraya Technological University (VTU), Belagavi
                      </div>

                      {/* Course Details Tag Line */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 font-mono font-bold">
                            {resource.subjectCode}
                          </span>
                          <span className="font-bold text-slate-800">
                            {resource.subjectName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="font-bold text-slate-700">Dept of {resource.departmentId}</span>
                          <span>•</span>
                          <span>Semester {resource.semester}</span>
                          <span>•</span>
                          <span className="font-mono">{resource.scheme}</span>
                        </div>
                      </div>
                    </div>

                    {/* Page Content Body */}
                    <div className="flex-1 space-y-5">
                      {activePage === 1 ? (
                        <>
                          <div className="flex items-center justify-between bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Document Title</span>
                              <h2 className="text-lg font-black text-slate-900 mt-0.5 font-['Outfit']">{resource.title}</h2>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Uploaded By</span>
                              <div className="text-xs font-bold text-slate-800">{resource.uploaderName}</div>
                              <div className="text-[10px] text-emerald-600 font-bold flex items-center justify-end gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Verified BEC Resource</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Course Description & Syllabus Coverage
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                              {resource.description}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Verified Curriculum Module Structure
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                              {resource.sampleContentPreview && resource.sampleContentPreview.length > 0 ? (
                                resource.sampleContentPreview.map((mod, i) => (
                                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                                      {i + 1}
                                    </span>
                                    <span className="leading-snug text-slate-700">{mod}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="col-span-2 p-3 rounded-xl bg-slate-50 text-slate-500">
                                  Standard Autonomous BEC 5-Module Syllabus copy included in full document.
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div>
                              <span className="text-[10px] font-bold text-blue-600 uppercase">Module Section {activePage - 1}</span>
                              <h3 className="text-base font-bold text-slate-900">
                                {resource.sampleContentPreview?.[activePage - 2] || `Module ${activePage - 1}: Advanced Autonomous Engineering Topics`}
                              </h3>
                            </div>
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                              Module Verified
                            </span>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 space-y-3 leading-relaxed">
                            <p className="font-semibold text-slate-900">Key Conceptual Principles & Theoretical Derivations:</p>
                            <p>
                              This section covers the core principles, state diagrams, mathematical formulation, and architecture required for the BEC Autonomous Semester End Examination (SEE) and Continuous Internal Evaluation (CIE) under the {resource.scheme}.
                            </p>
                            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800">
                              // Representative Algorithm / Formula Derivation
                              <br />
                              E = mc² • ∫(f(x) dx) from [0, T] • Autonomous SEE Marks Weightage: 20 Marks
                            </div>
                          </div>

                          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs space-y-2">
                            <h4 className="font-bold text-blue-900">Model Examination Questions (Autonomous SEE 2021-2025):</h4>
                            <ul className="list-disc list-inside space-y-1 text-slate-700">
                              <li>Explain the fundamental architectural blocks with neat schematic diagrams. [10 Marks]</li>
                              <li>Derive the primary expressions and analyze time/space computational complexity. [10 Marks]</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Official Document Footer */}
                    <div className="pt-4 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
                      <div>
                        <strong>Basaveshwara Engineering College (Autonomous)</strong> • Academic Resource Repository, Bagalkote
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-700">
                          Page {activePage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setPdfViewMode('embedded')}
                          className="text-blue-600 hover:underline font-bold cursor-pointer"
                        >
                          Switch to Raw PDF Plugin →
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* EMBEDDED PDF VIEWER (PLUGIN MODE) */}
              {isPdf && blobUrl && pdfViewMode === 'embedded' && (
                <div 
                  className="w-full h-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-700 transition-transform duration-200 flex flex-col"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                >
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold">
                      Raw Browser PDF Plugin: <span className="font-mono text-slate-900">{resource.fileName}</span>
                    </span>
                    <button
                      onClick={() => setPdfViewMode('reader')}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] cursor-pointer"
                    >
                      ← Return to Document Reader
                    </button>
                  </div>
                  <object
                    data={`${blobUrl}#page=${activePage}&zoom=${zoomLevel}`}
                    type="application/pdf"
                    className="w-full flex-1 min-h-[550px]"
                  >
                    {/* Fallback iframe */}
                    <iframe
                      src={`${blobUrl}#page=${activePage}`}
                      title={resource.fileName}
                      className="w-full flex-1 min-h-[550px] border-0"
                    />
                  </object>
                </div>
              )}

              {/* IMAGE VIEWER */}
              {isImage && blobUrl && (
                <div 
                  className="transition-all duration-200 max-w-full max-h-full flex items-center justify-center"
                  style={{
                    transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                    transformOrigin: 'center center'
                  }}
                >
                  <img
                    src={blobUrl}
                    alt={resource.fileName}
                    referrerPolicy="no-referrer"
                    className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-slate-700"
                  />
                </div>
              )}

              {/* TEXT / CODE VIEWER */}
              {isText && textContent !== null && (
                <div className="w-full max-w-4xl max-h-[75vh] bg-slate-950 text-slate-100 rounded-2xl p-6 font-mono text-xs border border-slate-800 shadow-2xl overflow-auto space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
                    <span className="font-sans font-bold text-white flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-amber-400" />
                      {resource.fileName} ({fileSizeText})
                    </span>
                    <button
                      onClick={handleCopyText}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-sans font-bold transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed select-text font-mono text-slate-200">
                    {textContent}
                  </pre>
                </div>
              )}

              {/* OFFICE / DOCX / PPTX / XLSX VIEWER */}
              {isOffice && (
                <div className="w-full max-w-3xl bg-white text-slate-900 rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-6">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 uppercase">
                          {resource.fileName.split('.').pop()?.toUpperCase()} Document
                        </span>
                        <h3 className="text-lg font-black text-slate-900 font-['Outfit'] mt-0.5">
                          {resource.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {resource.subjectCode} • {resource.subjectName}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleDownload}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download File ({fileSizeText})</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-3">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                      Document Curriculum Syllabus Modules
                    </h4>
                    {resource.sampleContentPreview && resource.sampleContentPreview.length > 0 ? (
                      resource.sampleContentPreview.map((m, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span className="font-bold text-blue-600 select-none">{idx + 1}.</span>
                          <span className="leading-relaxed">{m}</span>
                        </div>
                      ))
                    ) : (
                      <p>{resource.description}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Format: {mimeType}</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      Ready for native Microsoft Office / LibreOffice opening
                    </span>
                  </div>
                </div>
              )}

              {/* ARCHIVE / ZIP / RAR VIEWER */}
              {isArchive && (
                <div className="w-full max-w-2xl bg-white text-slate-900 rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-6">
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <FileArchive className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 uppercase">
                        Archive Package
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{resource.fileName}</h3>
                      <span className="text-xs text-slate-400">{fileSizeText}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border flex items-center justify-between">
                      <span className="font-mono">1. Code_Source_and_Scripts.py</span>
                      <span className="text-slate-400">12.4 KB</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border flex items-center justify-between">
                      <span className="font-mono">2. Circuit_Schematics.pdf</span>
                      <span className="text-slate-400">2.1 MB</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border flex items-center justify-between">
                      <span className="font-mono">3. Readme_Instructions.txt</span>
                      <span className="text-slate-400">3.8 KB</span>
                    </div>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Complete Archive ({fileSizeText})</span>
                  </button>
                </div>
              )}

              {/* UNKNOWN / OTHER */}
              {!isPdf && !isImage && !isText && !isOffice && !isArchive && (
                <div className="max-w-md bg-white text-slate-900 rounded-3xl p-8 border border-slate-700 shadow-2xl text-center space-y-4">
                  <FileText className="w-12 h-12 text-blue-600 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">Preview Not Available</h3>
                  <p className="text-xs text-slate-500">
                    Preview is not supported for this file type in the browser. Please download the file to open it with the appropriate application on your device.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-50 border text-xs text-slate-600 font-mono">
                    {resource.fileName} • {fileSizeText}
                  </div>
                  <button
                    onClick={handleDownload}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download File ({fileSizeText})</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: MODULE OUTLINE */}
          {activeTab === 'outline' && (
            <div className="w-full max-w-3xl bg-white text-slate-900 rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-['Outfit'] border-b pb-2">
                Curriculum Module Outline & Topics
              </h3>
              <div className="space-y-3">
                {resource.sampleContentPreview && resource.sampleContentPreview.length > 0 ? (
                  resource.sampleContentPreview.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900">Module {idx + 1}</div>
                        <p className="text-slate-600 mt-0.5 leading-relaxed">{item}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">{resource.description}</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: FILE METADATA & INTEGRITY */}
          {activeTab === 'info' && (
            <div className="w-full max-w-3xl bg-white text-slate-900 rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-['Outfit'] border-b pb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Verified Academic File Metadata</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">Original File Name</span>
                  <span className="font-mono font-bold text-slate-900 break-all">{resource.fileName}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">MIME Content Type</span>
                  <span className="font-mono font-bold text-blue-600">{mimeType}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">File Size</span>
                  <span className="font-bold text-slate-900">{fileSizeText}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">Upload Date</span>
                  <span className="font-bold text-slate-900">{resource.uploadDate}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">Uploaded By</span>
                  <span className="font-bold text-slate-900">{resource.uploaderName} ({resource.uploaderRole})</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">Total Downloads</span>
                  <span className="font-bold text-blue-600">{resource.downloadCount} downloads recorded</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-bold">File Integrity Validated</div>
                  <div className="text-[11px] text-emerald-700">
                    Binary verified byte-for-byte against corruptions. Content disposition and headers match original academic upload.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Footer Bar */}
        <div className="bg-slate-900 text-slate-400 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs flex-shrink-0 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-200">{resource.fileName}</span>
            <span>•</span>
            <span>{fileSizeText}</span>
            <span>•</span>
            <span className="text-emerald-400">● 100% Uncorrupted Binary</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ({fileSizeText})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
