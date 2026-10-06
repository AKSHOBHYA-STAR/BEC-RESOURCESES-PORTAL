import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { AboutSection } from './components/AboutSection';
import { DepartmentsSection } from './components/DepartmentsSection';
import { SemesterSection } from './components/SemesterSection';
import { ResourceCategoriesSection } from './components/ResourceCategoriesSection';
import { ResourceSearchSection } from './components/ResourceSearchSection';
import { StudentLoginPage } from './components/StudentLoginPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ResourceUploadModal } from './components/ResourceUploadModal';
import { AcademicUpdatesSection } from './components/AcademicUpdatesSection';
import { ResourceDetailsModal } from './components/ResourceDetailsModal';
import { FileViewerModal } from './components/FileViewerModal';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    activeView, 
    selectedResource, 
    setSelectedResource, 
    toastMessage,
    previewingResource,
    closeFileViewer
  } = useApp();

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Glassmorphism Navigation */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <Stats />
            <AboutSection />
            <DepartmentsSection />
            <SemesterSection />
            <ResourceCategoriesSection />
            <ResourceSearchSection />
            <AcademicUpdatesSection />
          </>
        )}

        {activeView === 'departments' && (
          <>
            <div className="pt-4">
              <DepartmentsSection />
            </div>
            <ResourceSearchSection />
          </>
        )}

        {(activeView === 'resources' || activeView === 'syllabus') && (
          <div className="pt-4">
            <ResourceSearchSection initialSection={activeView === 'syllabus' ? 'syllabus' : 'all'} />
          </div>
        )}

        {activeView === 'updates' && (
          <AcademicUpdatesSection />
        )}

        {activeView === 'upload' && (
          <ResourceUploadModal />
        )}

        {activeView === 'login_student' && (
          <StudentLoginPage />
        )}

        {activeView === 'login_admin' && (
          <AdminLoginPage />
        )}

        {activeView === 'student_dashboard' && (
          <StudentDashboard />
        )}

        {activeView === 'admin_dashboard' && (
          <AdminDashboard />
        )}
      </main>

      {/* Resource Details Interactive Modal */}
      {selectedResource && (
        <ResourceDetailsModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}

      {/* Universal Document Preview & File Viewer Modal */}
      {previewingResource && (
        <FileViewerModal
          resource={previewingResource}
          onClose={closeFileViewer}
        />
      )}

      {/* University Footer */}
      <Footer />

      {/* Floating System Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold leading-snug">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
