import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ResourceItem, 
  Department, 
  StudentProfile, 
  AcademicUpdate, 
  FilterOptions,
  DepartmentCode,
  ResourceCategory,
  ResourceStatus,
  OfficialSyllabusItem
} from '../types';
import { 
  DEPARTMENTS, 
  CURRENT_STUDENT, 
  ACADEMIC_UPDATES 
} from '../data/mockData';
import { OFFICIAL_BEC_SYLLABUS } from '../data/officialSyllabusData';
import { 
  saveFileBinary, 
  downloadResourceFile, 
  detectMimeType 
} from '../utils/fileStorage';

export type ActiveView = 
  | 'home' 
  | 'departments' 
  | 'resources' 
  | 'syllabus' 
  | 'updates' 
  | 'student_dashboard' 
  | 'admin_dashboard' 
  | 'upload' 
  | 'login_student' 
  | 'login_admin'
  | 'resource_detail';

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currentUser: {
    role: 'student' | 'admin' | null;
    studentProfile?: StudentProfile;
    adminName?: string;
  };
  loginAsStudent: (customData?: Partial<StudentProfile>) => void;
  loginAsAdmin: () => void;
  logout: () => void;
  
  // Official BEC Syllabus (from becbgk.edu)
  officialSyllabus: OfficialSyllabusItem[];
  addOfficialSyllabus: (item: Omit<OfficialSyllabusItem, 'id' | 'isOfficial'>) => void;
  deleteOfficialSyllabus: (id: string) => void;

  // Student Uploaded Resources
  resources: ResourceItem[];
  departments: Department[];
  academicUpdates: AcademicUpdate[];
  
  // Selection for details / modal
  selectedResource: ResourceItem | null;
  setSelectedResource: (res: ResourceItem | null) => void;

  // Universal File Viewer Modal
  previewingResource: ResourceItem | null;
  openFileViewer: (res: ResourceItem) => void;
  closeFileViewer: () => void;
  
  // Filtering & search
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  applyQuickFilter: (key: keyof FilterOptions, value: any) => void;

  // Actions
  uploadResource: (newResourceData: {
    title: string;
    subjectName: string;
    subjectCode: string;
    departmentId: DepartmentCode;
    semester: number;
    category: ResourceCategory;
    subcategory?: string;
    description: string;
    scheme: string;
    tags: string[];
    fileName: string;
    fileSize: string;
    previewContent?: string[];
    fileBlob?: Blob | File;
  }) => Promise<void>;
  approveResource: (id: string, remarks?: string) => void;
  rejectResource: (id: string, remarks: string) => void;
  requestChanges: (id: string, remarks: string) => void;
  deleteResource: (id: string) => void;
  downloadResource: (id: string) => Promise<void>;
  toggleSaveResource: (id: string) => void;
  rateResource: (id: string, rating: number) => void;
  addComment: (id: string, text: string) => void;
  publishUpdate: (update: Omit<AcademicUpdate, 'id' | 'publishedDate'>) => void;
  deleteUpdate: (id: string) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [departments] = useState<Department[]>(DEPARTMENTS);
  
  // --- Official BEC Syllabus Persistence (Preserving verified documents from becbgk.edu) ---
  const [officialSyllabus, setOfficialSyllabus] = useState<OfficialSyllabusItem[]>(() => {
    try {
      const saved = localStorage.getItem('bec_official_syllabus_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return OFFICIAL_BEC_SYLLABUS;
    } catch {
      return OFFICIAL_BEC_SYLLABUS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bec_official_syllabus_v1', JSON.stringify(officialSyllabus));
    } catch (e) {
      console.error(e);
    }
  }, [officialSyllabus]);

  // --- Student Resources: STRICT MIGRATION & PURGE OF OLD PRELOADED VTU RESOURCES ---
  const [resources, setResources] = useState<ResourceItem[]>(() => {
    try {
      // Clean out obsolete localStorage keys from previous versions that contained mock VTU notes
      localStorage.removeItem('bec_portal_resources'); // Purge old v1/v2 key
      localStorage.removeItem('bec_academic_resources_v2');

      const savedV3 = localStorage.getItem('bec_portal_student_resources_v3');
      if (savedV3) {
        const parsed = JSON.parse(savedV3);
        if (Array.isArray(parsed)) {
          // Strictly filter out any old demo/mock VTU notes (e.g. res-101 to res-110, or faculty seeded items)
          const genuineStudentUploads = parsed.filter(
            r => r && r.originType === 'student_uploaded' && !r.id.startsWith('res-10') && !r.id.startsWith('res-11')
          );
          return genuineStudentUploads;
        }
      }
      // Start completely fresh for student uploads: NO old VTU notes or fake placeholder resources!
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bec_portal_student_resources_v3', JSON.stringify(resources));
    } catch (e) {
      console.error(e);
    }
  }, [resources]);

  const [academicUpdates, setAcademicUpdates] = useState<AcademicUpdate[]>(() => {
    try {
      const saved = localStorage.getItem('bec_portal_updates');
      return saved ? JSON.parse(saved) : ACADEMIC_UPDATES;
    } catch {
      return ACADEMIC_UPDATES;
    }
  });

  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [previewingResource, setPreviewingResource] = useState<ResourceItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openFileViewer = (res: ResourceItem) => {
    setPreviewingResource(res);
  };

  const closeFileViewer = () => {
    setPreviewingResource(null);
  };

  // Authentication State
  const [currentUser, setCurrentUser] = useState<{
    role: 'student' | 'admin' | null;
    studentProfile?: StudentProfile;
    adminName?: string;
  }>(() => {
    try {
      const savedAuth = localStorage.getItem('bec_portal_auth_v3');
      if (savedAuth) {
        return JSON.parse(savedAuth);
      }
    } catch (e) {
      console.error(e);
    }
    // Default logged in student session for Vilas Patil
    return {
      role: 'student',
      studentProfile: CURRENT_STUDENT
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('bec_portal_auth_v3', JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Unified Filter State
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    department: 'ALL',
    semester: 'ALL',
    category: 'ALL',
    scheme: 'ALL',
    sortBy: 'newest'
  });

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      department: 'ALL',
      semester: 'ALL',
      category: 'ALL',
      scheme: 'ALL',
      sortBy: 'newest'
    });
  };

  const applyQuickFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setActiveView('resources');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const loginAsStudent = (customData?: Partial<StudentProfile>) => {
    const updatedProfile: StudentProfile = {
      ...CURRENT_STUDENT,
      ...(customData || {})
    };
    setCurrentUser({
      role: 'student',
      studentProfile: updatedProfile
    });
    showToast(`Welcome back, ${updatedProfile.name}! Private student session active.`);
    setActiveView('student_dashboard');
  };

  const loginAsAdmin = () => {
    setCurrentUser({
      role: 'admin',
      adminName: 'Prof. B. R. Hiremath (Academic Dean)'
    });
    showToast('Administrator session activated. Welcome to Admin Control Panel.');
    setActiveView('admin_dashboard');
  };

  const logout = () => {
    setCurrentUser({ role: null });
    showToast('You have been signed out.');
    setActiveView('home');
  };

  // --- Student Resource Upload Handler ---
  const uploadResource = async (data: {
    title: string;
    subjectName: string;
    subjectCode: string;
    departmentId: DepartmentCode;
    semester: number;
    category: ResourceCategory;
    subcategory?: string;
    description: string;
    scheme: string;
    tags: string[];
    fileName: string;
    fileSize: string;
    previewContent?: string[];
    fileBlob?: Blob | File;
  }) => {
    const isUploaderAdmin = currentUser.role === 'admin';
    const authorName = isUploaderAdmin ? (currentUser.adminName || 'Admin') : (currentUser.studentProfile?.name || 'Student Contributor');
    const authorEmail = currentUser.studentProfile?.email || 'contributor@becbgk.edu';
    const authorId = currentUser.studentProfile?.id || 'stu-unknown';
    const newId = `stu-res-${Date.now()}`;
    const detectedMime = detectMimeType(data.fileName);
    const ext = data.fileName.split('.').pop()?.toLowerCase() || '';

    // If fileBlob was provided, store its raw binary in IndexedDB
    if (data.fileBlob) {
      try {
        await saveFileBinary(newId, data.fileBlob, data.fileName, detectedMime);
      } catch (err) {
        console.error('Failed to save file binary to IndexedDB:', err);
      }
    }

    const newResource: ResourceItem = {
      id: newId,
      title: data.title,
      subjectName: data.subjectName,
      subjectCode: data.subjectCode.toUpperCase(),
      departmentId: data.departmentId,
      semester: data.semester,
      category: data.category,
      subcategory: data.subcategory || `${data.category}`,
      description: data.description,
      // Privacy safe: author display name only.
      uploaderName: authorName,
      uploaderEmail: authorEmail,
      uploaderId: authorId,
      uploaderUsn: currentUser.studentProfile?.usn,
      uploaderRole: isUploaderAdmin ? 'Admin' : 'Student',
      originType: 'student_uploaded',
      fileUrl: '#',
      fileName: data.fileName,
      fileSize: data.fileSize,
      fileType: detectedMime === 'application/pdf' ? 'PDF Document' :
                detectedMime.startsWith('image/') ? 'Image Asset' :
                data.fileName.endsWith('.pptx') ? 'PowerPoint Presentation' :
                data.fileName.endsWith('.docx') ? 'Word Document' : 'Academic Material',
      uploadDate: new Date().toISOString().split('T')[0],
      status: isUploaderAdmin ? 'Approved' : 'Pending',
      downloadCount: 0,
      viewCount: 1,
      rating: 5.0,
      ratingCount: 1,
      tags: data.tags,
      scheme: data.scheme,
      isVerified: isUploaderAdmin,
      mimeType: detectedMime,
      originalExtension: ext,
      hasBinary: true,
      sampleContentPreview: data.previewContent || [
        `Student contributed study resource: ${data.title}`,
        `Course: ${data.subjectCode} (${data.departmentId}) • Semester ${data.semester}`,
        'Submitted for faculty academic moderation.'
      ],
      comments: []
    };

    setResources(prev => [newResource, ...prev]);

    // Update current student profile metrics
    if (currentUser.role === 'student' && currentUser.studentProfile) {
      const updatedProfile: StudentProfile = {
        ...currentUser.studentProfile,
        uploadedCount: currentUser.studentProfile.uploadedCount + 1,
        pendingCount: currentUser.studentProfile.pendingCount + (isUploaderAdmin ? 0 : 1),
        approvedCount: currentUser.studentProfile.approvedCount + (isUploaderAdmin ? 1 : 0),
        recentActivities: [
          {
            id: `act-${Date.now()}`,
            type: 'upload',
            title: `Uploaded: ${data.title}`,
            timestamp: 'Just now',
            status: isUploaderAdmin ? 'Approved' : 'Pending'
          },
          ...currentUser.studentProfile.recentActivities
        ]
      };
      setCurrentUser(prev => ({
        ...prev,
        studentProfile: updatedProfile
      }));
    }

    showToast(isUploaderAdmin ? 'Resource published successfully!' : 'Upload submitted for moderation! Visible to other students once approved.');
  };

  // --- Admin Moderation Workflow ---
  const approveResource = (id: string, remarks?: string) => {
    if (currentUser.role !== 'admin') {
      showToast('Unauthorized: Only administrators can approve resources.');
      return;
    }
    setResources(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              status: 'Approved',
              isVerified: true,
              adminRemarks: remarks || 'Approved by BEC Autonomous Academic Committee'
            }
          : r
      )
    );
    showToast('Resource approved and published to student body.');
  };

  const rejectResource = (id: string, remarks: string) => {
    if (currentUser.role !== 'admin') {
      showToast('Unauthorized: Only administrators can reject resources.');
      return;
    }
    setResources(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              status: 'Rejected',
              adminRemarks: remarks
            }
          : r
      )
    );
    showToast('Resource marked as rejected. Only uploader can see feedback.');
  };

  const requestChanges = (id: string, remarks: string) => {
    if (currentUser.role !== 'admin') {
      showToast('Unauthorized: Only administrators can request changes.');
      return;
    }
    setResources(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              status: 'Pending',
              adminRemarks: `Revisions requested: ${remarks}`
            }
          : r
      )
    );
    showToast('Revision request sent to the student.');
  };

  const deleteResource = (id: string) => {
    const target = resources.find(r => r.id === id);
    if (!target) return;

    // Only Admin or the owner can delete
    const isOwner = currentUser.studentProfile && (target.uploaderEmail === currentUser.studentProfile.email || target.uploaderId === currentUser.studentProfile.id);
    const isAdmin = currentUser.role === 'admin';

    if (!isOwner && !isAdmin) {
      showToast('Unauthorized: You cannot delete another student’s resource.');
      return;
    }

    setResources(prev => prev.filter(r => r.id !== id));
    showToast('Resource removed successfully.');
  };

  // --- Official BEC Syllabus Management (Admin Only) ---
  const addOfficialSyllabus = (item: Omit<OfficialSyllabusItem, 'id' | 'isOfficial'>) => {
    if (currentUser.role !== 'admin') {
      showToast('Unauthorized: Only administrators can add official syllabus documents.');
      return;
    }
    const newDoc: OfficialSyllabusItem = {
      ...item,
      id: `syl-${Date.now()}`,
      isOfficial: true
    };
    setOfficialSyllabus(prev => [newDoc, ...prev]);
    showToast('Official BEC syllabus document added successfully.');
  };

  const deleteOfficialSyllabus = (id: string) => {
    if (currentUser.role !== 'admin') {
      showToast('Unauthorized: Only administrators can delete official syllabus documents.');
      return;
    }
    setOfficialSyllabus(prev => prev.filter(s => s.id !== id));
    showToast('Official BEC syllabus document deleted.');
  };

  // --- File Download Handler ---
  const downloadResource = async (id: string) => {
    const res = resources.find(r => r.id === id);
    if (!res) {
      showToast('Resource not found.');
      return;
    }

    // Check authorization: only Approved, or student's own pending/rejected, or Admin
    const isOwner = currentUser.studentProfile && (res.uploaderEmail === currentUser.studentProfile.email || res.uploaderId === currentUser.studentProfile.id);
    const isAdmin = currentUser.role === 'admin';
    const isApproved = res.status === 'Approved';

    if (!isApproved && !isOwner && !isAdmin) {
      showToast('Unauthorized: This resource is under private moderation.');
      return;
    }

    try {
      showToast(`Downloading uncorrupted ${res.fileName}...`);
      await downloadResourceFile(res);

      // Increment download counter
      setResources(prev =>
        prev.map(r =>
          r.id === id
            ? {
                ...r,
                downloadCount: r.downloadCount + 1,
                lastDownloadedAt: new Date().toISOString().split('T')[0],
                lastDownloadedBy: currentUser.studentProfile?.name || 'Anonymous'
              }
            : r
        )
      );

      // Record in current student's private history
      if (currentUser.role === 'student' && currentUser.studentProfile) {
        setCurrentUser(prev => ({
          ...prev,
          studentProfile: prev.studentProfile
            ? {
                ...prev.studentProfile,
                downloadsCount: prev.studentProfile.downloadsCount + 1,
                recentActivities: [
                  {
                    id: `dl-${Date.now()}`,
                    type: 'download',
                    title: `Downloaded: ${res.title}`,
                    timestamp: 'Just now'
                  },
                  ...prev.studentProfile.recentActivities
                ]
              }
            : undefined
        }));
      }
    } catch (err: any) {
      console.error(err);
      showToast('Download failed. Please try again.');
    }
  };

  const toggleSaveResource = (id: string) => {
    if (!currentUser.studentProfile) {
      showToast('Please log in to bookmark resources.');
      return;
    }
    const currentSaved = currentUser.studentProfile.savedResourceIds || [];
    const isSaved = currentSaved.includes(id);

    const updatedSaved = isSaved
      ? currentSaved.filter(x => x !== id)
      : [...currentSaved, id];

    setCurrentUser(prev => ({
      ...prev,
      studentProfile: prev.studentProfile
        ? {
            ...prev.studentProfile,
            savedResourceIds: updatedSaved
          }
        : undefined
    }));

    showToast(isSaved ? 'Removed from saved collection.' : 'Saved to your private study collection.');
  };

  const rateResource = (id: string, rating: number) => {
    setResources(prev =>
      prev.map(r => {
        if (r.id === id) {
          const newRatingCount = r.ratingCount + 1;
          const newRating = Number(((r.rating * r.ratingCount + rating) / newRatingCount).toFixed(1));
          return {
            ...r,
            rating: newRating,
            ratingCount: newRatingCount
          };
        }
        return r;
      })
    );
    showToast(`Thank you! You rated this resource ${rating} stars.`);
  };

  const addComment = (id: string, text: string) => {
    const authorName = currentUser.studentProfile?.name || currentUser.adminName || 'BEC Student';
    const authorRole = currentUser.role === 'admin' ? 'Admin' : 'Student';

    const newComment = {
      id: `c-${Date.now()}`,
      resourceId: id,
      authorName,
      authorRole: authorRole as 'Student' | 'Admin',
      text,
      timestamp: 'Just now',
      helpfulCount: 0
    };

    setResources(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              comments: [newComment, ...r.comments]
            }
          : r
      )
    );
    showToast('Comment added.');
  };

  const publishUpdate = (data: Omit<AcademicUpdate, 'id' | 'publishedDate'>) => {
    if (currentUser.role !== 'admin') {
      showToast('Unauthorized: Only administrators can publish academic circulars.');
      return;
    }
    const newUpdate: AcademicUpdate = {
      ...data,
      id: `upd-${Date.now()}`,
      publishedDate: new Date().toISOString().split('T')[0]
    };
    setAcademicUpdates(prev => [newUpdate, ...prev]);
    showToast('Academic circular published to student body.');
  };

  const deleteUpdate = (id: string) => {
    if (currentUser.role !== 'admin') {
      showToast('Unauthorized: Only administrators can delete academic circulars.');
      return;
    }
    setAcademicUpdates(prev => prev.filter(u => u.id !== id));
    showToast('Academic circular removed.');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        currentUser,
        loginAsStudent,
        loginAsAdmin,
        logout,
        officialSyllabus,
        addOfficialSyllabus,
        deleteOfficialSyllabus,
        resources,
        departments,
        academicUpdates,
        selectedResource,
        setSelectedResource,
        previewingResource,
        openFileViewer,
        closeFileViewer,
        filters,
        setFilters,
        resetFilters,
        applyQuickFilter,
        uploadResource,
        approveResource,
        rejectResource,
        requestChanges,
        deleteResource,
        downloadResource,
        toggleSaveResource,
        rateResource,
        addComment,
        publishUpdate,
        deleteUpdate,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
