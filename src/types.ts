export type UserRole = 'student' | 'admin';

export type ActiveView = 
  | 'home' 
  | 'departments' 
  | 'resources' 
  | 'syllabus' 
  | 'upload' 
  | 'student-login' 
  | 'student-dashboard' 
  | 'admin-login' 
  | 'admin-dashboard';

export type DepartmentCode = 'ISE' | 'CSE' | 'ECE' | 'EEE' | 'ME' | 'CV' | 'AIDS' | 'MBA' | 'BT' | 'AU' | 'MCA';

export interface Department {
  id: DepartmentCode;
  name: string;
  code: string;
  description: string;
  iconName: string;
  hodName: string;
  totalResources: number;
  totalStudents: number;
  establishedYear: number;
  accentColor: string;
}

export type ResourceCategory = 
  | 'Notes'
  | 'Assignment'
  | 'Lab Manual'
  | 'Project'
  | 'Study Material'
  | 'Presentation';

export type ResourceStatus = 'Approved' | 'Pending' | 'Rejected' | 'Draft';

export interface CommentItem {
  id: string;
  resourceId: string;
  authorName: string;
  authorRole: 'Student' | 'Faculty' | 'Admin';
  authorUsn?: string;
  text: string;
  rating?: number;
  timestamp: string;
  helpfulCount: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  subjectName: string;
  subjectCode: string;
  departmentId: DepartmentCode;
  semester: number;
  category: ResourceCategory;
  subcategory?: string;
  description: string;
  // Privacy safe: author display name only. Personal USN/Phone/Email are never exposed publicly.
  uploaderName: string;
  uploaderEmail: string;
  uploaderId?: string;
  uploaderUsn?: string;
  uploaderRole: 'Student' | 'Faculty' | 'Admin';
  originType: 'student_uploaded' | 'official_syllabus';
  fileUrl: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  status: ResourceStatus;
  adminRemarks?: string;
  downloadCount: number;
  viewCount: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  scheme: string;
  isVerified: boolean;
  comments: CommentItem[];
  sampleContentPreview?: string[];
  mimeType?: string;
  originalExtension?: string;
  storageKey?: string;
  hasBinary?: boolean;
  pageCount?: number;
  lastDownloadedAt?: string;
  lastDownloadedBy?: string;
  fileTextContent?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  usn: string;
  department: DepartmentCode;
  semester: number;
  phone?: string;
  avatar?: string;
  joinedDate: string;
  uploadedCount: number;
  approvedCount: number;
  pendingCount: number;
  downloadsCount: number;
  savedResourceIds: string[];
  recentActivities: {
    id: string;
    type: 'upload' | 'download' | 'rating' | 'approval';
    title: string;
    timestamp: string;
    status?: string;
  }[];
}

export interface AcademicUpdate {
  id: string;
  title: string;
  category: 'Circular' | 'Exam Notification' | 'Department Announcement' | 'Timetable Update' | 'Placement Update' | 'Scholarship Notice';
  priority: 'Urgent' | 'Important' | 'General';
  publishedDate: string;
  departmentId?: DepartmentCode | 'ALL';
  issuer: string;
  summary: string;
  content: string;
  attachmentName?: string;
  attachmentUrl?: string;
  isPinned?: boolean;
}

export interface FilterOptions {
  searchQuery: string;
  department: DepartmentCode | 'ALL';
  semester: number | 'ALL';
  category: ResourceCategory | 'ALL';
  scheme: string | 'ALL';
  sortBy: 'most_downloaded' | 'highest_rated' | 'newest' | 'alphabetical';
}

export type { OfficialSyllabusItem } from './data/officialSyllabusData';
