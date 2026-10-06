import { Department, ResourceItem, StudentProfile, AcademicUpdate } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'ISE',
    name: 'Information Science & Engineering',
    code: 'ISE',
    description: 'Empowering students with cutting-edge knowledge in Cloud Computing, Big Data, Full Stack Development, and Cyber Security.',
    iconName: 'Database',
    hodName: 'Dr. S. R. Patil',
    totalResources: 0,
    totalStudents: 480,
    establishedYear: 2000,
    accentColor: '#3B82F6'
  },
  {
    id: 'CSE',
    name: 'Computer Science & Engineering',
    code: 'CSE',
    description: 'Focusing on algorithmic thinking, system software, networks, and advanced software engineering architectures.',
    iconName: 'Code',
    hodName: 'Dr. B. R. Hiremath',
    totalResources: 0,
    totalStudents: 560,
    establishedYear: 1983,
    accentColor: '#4A90E2'
  },
  {
    id: 'ECE',
    name: 'Electronics & Communication Engineering',
    code: 'ECE',
    description: 'Specializing in VLSI design, embedded systems, signal processing, IoT, and high-speed wireless telecommunications.',
    iconName: 'Cpu',
    hodName: 'Dr. C. M. Veerendrakumar',
    totalResources: 0,
    totalStudents: 490,
    establishedYear: 1978,
    accentColor: '#8B5CF6'
  },
  {
    id: 'EEE',
    name: 'Electrical & Electronics Engineering',
    code: 'EEE',
    description: 'Leading innovations in smart electrical grids, renewable energy, power electronics, and modern EV drives.',
    iconName: 'Zap',
    hodName: 'Dr. V. G. Katti',
    totalResources: 0,
    totalStudents: 380,
    establishedYear: 1963,
    accentColor: '#F59E0B'
  },
  {
    id: 'ME',
    name: 'Mechanical Engineering',
    code: 'ME',
    description: 'Excellence in robotics, CAD/CAM simulation, thermodynamics, advanced manufacturing, and green metallurgy.',
    iconName: 'Wrench',
    hodName: 'Dr. P. S. Jadhav',
    totalResources: 0,
    totalStudents: 420,
    establishedYear: 1963,
    accentColor: '#64748B'
  },
  {
    id: 'CV',
    name: 'Civil Engineering',
    code: 'CV',
    description: 'Constructing modern infrastructure, geotechnical engineering, sustainable hydraulics, and smart urban planning.',
    iconName: 'Building2',
    hodName: 'Dr. G. V. Belgaumkar',
    totalResources: 0,
    totalStudents: 360,
    establishedYear: 1963,
    accentColor: '#10B981'
  },
  {
    id: 'AIDS',
    name: 'Artificial Intelligence & Data Science',
    code: 'AI&DS',
    description: 'Pioneering Deep Learning, NLP, Computer Vision, predictive analytics, and enterprise data intelligence systems.',
    iconName: 'BrainCircuit',
    hodName: 'Dr. M. S. Biradar',
    totalResources: 0,
    totalStudents: 320,
    establishedYear: 2021,
    accentColor: '#6366F1'
  },
  {
    id: 'BT',
    name: 'Biotechnology',
    code: 'BT',
    description: 'Bioprocess engineering, bioinformatics, molecular biology, genomics, and industrial fermentation research.',
    iconName: 'FlaskConical',
    hodName: 'Dr. Bharati S. Meti',
    totalResources: 0,
    totalStudents: 190,
    establishedYear: 2003,
    accentColor: '#14B8A6'
  },
  {
    id: 'AU',
    name: 'Automobile Engineering',
    code: 'AU',
    description: 'Vehicle dynamics, IC engines, alternative fuel tech, chassis design, and electric/hybrid automotive systems.',
    iconName: 'Car',
    hodName: 'Dr. S. N. Kurbet',
    totalResources: 0,
    totalStudents: 180,
    establishedYear: 2004,
    accentColor: '#F97316'
  },
  {
    id: 'MBA',
    name: 'Master of Business Administration',
    code: 'MBA',
    description: 'Cultivating leadership, financial management, strategic marketing, entrepreneurship, and organizational governance.',
    iconName: 'Briefcase',
    hodName: 'Dr. R. S. Deshpande',
    totalResources: 0,
    totalStudents: 240,
    establishedYear: 2006,
    accentColor: '#EC4899'
  }
];

export const COLLEGE_DETAILS = {
  name: 'Basaveshwara Engineering College (Autonomous)',
  location: 'Vidyagiri, Bagalkot - 587 102, Karnataka, India',
  establishedYear: 1963,
  parentSociety: 'Basaveshwar Veerashaiva Vidyavardhak Sangha (B.V.V. Sangha)',
  parentSocietyEstd: 1906,
  motto: 'Kayakave Kailasa ("Work is Worship")',
  autonomousSince: '2007-2008 (Granted by VTU Belagavi)',
  accreditation: "NAAC 'A' Grade, NBA Accredited Programs, AICTE Approved, UGC 2(f) & 12(B)",
  principal: 'Dr. B. R. Hiremath, M.Tech., Ph.D.',
  deanAcademic: 'Dr. S. R. Patil',
  controllerOfExams: 'Dr. S. G. Kambalimath',
  campusArea: '30+ Acres lush green campus',
  officialWebsite: 'https://www.becbgk.edu/',
  teqipAchievements: [
    { phase: 'TEQIP-I (2004-2009)', grant: '₹14.16 Crores', impact: 'Enhanced UG programs, leading to acquisition of Academic Autonomy in 2007' },
    { phase: 'TEQIP-II (2011)', grant: '₹17.50 Crores', impact: 'Scaled PG & R&D activities, NBA accreditation, named Best-Performing Institute by NPIU' },
    { phase: 'TEQIP-III (2017)', grant: '₹8.47 Crores', impact: 'R&D infrastructure upgrade & selected to mentor Rajakiya Engineering College, Bijnor (UP)' }
  ]
};

/**
 * ALL OLD PRELOADED VTU NOTES, OLD PDFs, AND DEMO RESOURCES HAVE BEEN REMOVED.
 * Genuine student uploads populate this array upon student contribution and admin approval.
 */
export const INITIAL_RESOURCES: ResourceItem[] = [];

/**
 * Default authenticated student profile (Private to current student only)
 */
export const CURRENT_STUDENT: StudentProfile = {
  id: 'stu-current-01',
  name: 'Vilas Patil',
  email: 'patilvilas496@gmail.com',
  usn: '2BA22IS045',
  department: 'ISE',
  semester: 6,
  phone: '+91 94812 34567',
  joinedDate: 'August 2022',
  uploadedCount: 0,
  approvedCount: 0,
  pendingCount: 0,
  downloadsCount: 0,
  savedResourceIds: [],
  recentActivities: []
};

export const ACADEMIC_UPDATES: AcademicUpdate[] = [
  {
    id: 'upd-01',
    title: 'Autonomous Even Semester End Examination (SEE) Timetable Released - May/June 2026',
    category: 'Exam Notification',
    priority: 'Urgent',
    publishedDate: '2026-04-18',
    departmentId: 'ALL',
    issuer: 'Controller of Examinations (CoE), BEC Bagalkot',
    summary: 'The official timetable for B.E / M.Tech / MBA / MCA Even Semester End Examinations has been finalized and uploaded for student reference.',
    content: 'All autonomous undergraduate and postgraduate students are hereby notified that the Even Semester End Examinations (SEE) for academic year 2025-26 will commence from May 22, 2026. Hall tickets will be downloadable via the portal starting May 10 after clearance of lab dues. Please verify your course codes thoroughly.',
    attachmentName: 'BEC_Autonomous_SEE_Timetable_Even_2026.pdf',
    isPinned: true
  },
  {
    id: 'upd-02',
    title: 'BEC Research Grant & Hackathon Registration Open for 3rd & 4th Year Students',
    category: 'Department Announcement',
    priority: 'Important',
    publishedDate: '2026-04-14',
    departmentId: 'ISE',
    issuer: 'Department of ISE & Innovation Cell',
    summary: 'Eligible student teams can submit project proposals under AI, IoT, and Clean Energy for college sponsorship up to ₹50,000.',
    content: 'The BEC Innovation & Entrepreneurship Development Cell (IEDC) invites project proposals from 5th to 7th semester engineering students. Top 3 selected prototypes will receive direct industry mentorship and entry to State Level Tech Exhibition.',
    attachmentName: 'IEDC_Project_Guidelines_2026.pdf',
    isPinned: true
  },
  {
    id: 'upd-03',
    title: 'Continuous Internal Evaluation (CIE - II) Rescheduling Circular',
    category: 'Circular',
    priority: 'Important',
    publishedDate: '2026-04-10',
    departmentId: 'ALL',
    issuer: 'Dean Academics, Basaveshwara Engineering College',
    summary: 'CIE-II examination schedule has been updated to avoid clash with regional university sports meets.',
    content: 'Please find attached the revised dates for CIE-II. Students participating in university sports tournaments will be eligible for compensatory re-tests on prior approval from physical education director.',
    attachmentName: 'Revised_CIE_II_Circular.pdf'
  },
  {
    id: 'upd-04',
    title: 'TCS, Infosys & Cognizant Core Placement Drive Registration for 2026 Graduating Batch',
    category: 'Placement Update',
    priority: 'Urgent',
    publishedDate: '2026-04-05',
    departmentId: 'ALL',
    issuer: 'Department of Training & Placement, BEC Bagalkot',
    summary: 'Eligibility criteria: Minimum 6.75 CGPA with no active backlogs. Last date to register is April 25.',
    content: 'Students eligible for IT recruitment must register their latest updated resumes on the T&P portal. Mandatory mock coding and aptitude assessment sessions will be conducted in the Computing Centre every Saturday.',
    attachmentName: 'Placement_Drive_Eligibility_Schedule.pdf'
  },
  {
    id: 'upd-05',
    title: 'Post-Matric & Vidyasiri Scholarship Renewal Window Extended to May 15',
    category: 'Scholarship Notice',
    priority: 'General',
    publishedDate: '2026-03-28',
    departmentId: 'ALL',
    issuer: 'Student Welfare Office',
    summary: 'SSP portal verification for OBC, SC/ST, and Minority category fee reimbursement is now live.',
    content: 'Students must submit their SSP acknowledgement receipt along with college fee challan to the scholarship clerk at the Administrative Block before 4:00 PM on May 15.',
    attachmentName: 'SSP_Scholarship_Checklist.pdf'
  }
];

export const ANALYTICS_DATA = {
  totalResources: 0,
  totalNotes: 0,
  totalStudents: 3450,
  totalDownloads: 0,
  departmentDistribution: [
    { name: 'CSE', resources: 0, color: '#3B82F6' },
    { name: 'ISE', resources: 0, color: '#60A5FA' },
    { name: 'ECE', resources: 0, color: '#8B5CF6' },
    { name: 'ME', resources: 0, color: '#64748B' },
    { name: 'EEE', resources: 0, color: '#F59E0B' },
    { name: 'CV', resources: 0, color: '#10B981' },
    { name: 'AI&DS', resources: 0, color: '#6366F1' },
    { name: 'MBA', resources: 0, color: '#EC4899' }
  ]
};
