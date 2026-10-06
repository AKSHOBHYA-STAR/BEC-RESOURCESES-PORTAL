# Basaveshwara Engineering College (Autonomous), Bagalkote
## Academic Resource Sharing Platform & Official BEC Syllabus Portal

A production-grade, privacy-first academic resource sharing portal designed for the students and faculty of **Basaveshwara Engineering College (BEC Bagalkot)**, established in 1963 by the historic **Basaveshwar Veerashaiva Vidyavardhak Sangha (B.V.V. Sangha, Estd. 1906)**.

---

## 🌟 Key Capabilities

### 1. Student-Centric Resource Sharing
- **Student Upload Pipeline**: Students can contribute handwritten lecture notes, assignment solutions, lab records & observation manuals, project reports, and course presentations.
- **Universal Multi-Format Support**: Native handling for PDF, Word (`.docx`), PowerPoint (`.pptx`), Excel (`.xlsx`), Text/JSON/CSV, images, and ZIP archives with client-side mime detection and byte-level storage.
- **Quality Assurance Workflow**:
  ```text
  Student Upload ➔ Pending Moderation ➔ Administrative Review ➔ Published to College Body
  ```

### 2. Official BEC Syllabus & Curriculum
- **100% Grounded in Official College Documents**: Sourced directly from [www.becbgk.edu](https://www.becbgk.edu/).
- **Structured Hierarchy**:
  - Organized by Department: CSE, ISE, ECE, EEE, ME, CV, AI&DS, BT, MBA, and MCA.
  - Organized by Academic Year: Autonomous 2022 Scheme, 2021 Scheme, and NEP regulations.
  - Filterable by Semester (1st through 8th Semester) and Subject.
- **Direct Reference Links**: Each syllabus item retains its official PDF link and official BEC college page citation.
- **Administrative Syllabus Management**: Authorized administrators can introduce newly ratified Board of Studies (BoS) syllabus copies.

### 3. Strict Student Data Privacy & Isolation
- **Session Isolation**: Each student has exclusive access to their private dashboard, drafts, pending uploads, and personal download history.
- **No Data Leakage**: Student USNs, email addresses, phone numbers, and private activity logs are never displayed in public cards, search results, or comments.
- **Server/Data Layer Enforcement**: Authorization checks ensure that student A cannot view, edit, or delete student B's submissions by altering parameters or URLs.
- **Administrative Privileges**: Only verified administrators can moderate submissions, approve/reject resources, or manage official syllabus copies.

### 4. Zero Unwanted Bloat
- **No Leaderboard**: Point rankings, competitive badges, and student leaderboards have been completely removed to focus purely on academic collaboration.
- **No Outdated VTU Notes**: Old preloaded notes, mock papers, and third-party textbooks have been purged in favor of authentic student contributions and official college curriculum copies.

---

## 🏗️ Architecture & Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with glassmorphism design tokens
- **Icons**: Lucide React icons
- **Build System**: Vite 8 with ES Module bundling
- **Asset Resilience**: Multi-stage asset resolution cascading through bundled imports, static public paths, and high-fidelity vector SVGs (BVVS BEC Crest)
- **Local / Session Storage**: Resilient IndexedDB binary file storage with fallback

---

## 📂 Project Structure

```text
├── index.html                 # HTML entry point with synchronized metadata
├── metadata.json              # AI Studio project descriptor
├── package.json               # Dependencies and build scripts
├── vite.config.ts             # Vite configuration with Tailwind CSS v4
├── tsconfig.json              # TypeScript compilation rules
├── public/
│   └── images/                # Static image assets and BVVS BEC Crest SVG
└── src/
    ├── main.tsx               # Application bootstrap
    ├── App.tsx                # View router and layout orchestration
    ├── types.ts               # Core TypeScript definitions (ResourceItem, StudentProfile, etc.)
    ├── assets/
    │   └── assetRegistry.tsx  # Asset dictionary & SafeImage fallback component
    ├── components/
    │   ├── Navbar.tsx         # Responsive header navigation
    │   ├── Hero.tsx           # Institutional hero section with quick search
    │   ├── BECLogo.tsx        # Official BVVS BEC Crest logo component
    │   ├── Stats.tsx          # Institutional metric cards
    │   ├── ResourceSearchSection.tsx # Split browse for Official Syllabus & Student Uploads
    │   ├── ResourceUploadModal.tsx   # Multi-stage file upload modal
    │   ├── ResourceDetailsModal.tsx  # Resource details, preview & comments
    │   ├── FileViewerModal.tsx       # Universal document and PDF viewer
    │   ├── DepartmentsSection.tsx    # 8 Autonomous engineering branch cards
    │   ├── SemesterSection.tsx       # Semester-wise roadmap
    │   ├── ApprovalWorkflowVisualizer.tsx # Transparency visualizer for moderation
    │   ├── AcademicUpdatesSection.tsx# Official circulars and exam timetables
    │   ├── StudentDashboard.tsx      # Private student portal (Uploads, History, Bookmarks)
    │   ├── StudentTracker.tsx        # Private student profile and activity log
    │   ├── StudentLoginPage.tsx      # Secure student sign-in / profile registration
    │   ├── AdminDashboard.tsx        # Moderation queue, syllabus manager, analytics
    │   ├── AdminLoginPage.tsx        # Protected administrative authentication
    │   ├── AnalyticsDashboard.tsx    # Portal usage & branch distribution metrics
    │   ├── AboutSection.tsx          # College heritage (Estd. 1963, B.V.V. Sangha 1906)
    │   └── Footer.tsx                # College accreditation, quick links & disclaimer
    ├── context/
    │   └── AppContext.tsx     # Centralized state machine, auth, permissions & moderation
    ├── data/
    │   ├── mockData.ts        # Department definitions and institutional profile
    │   └── officialSyllabusData.ts # Verified BEC autonomous syllabus entries
    └── utils/
        └── fileStorage.ts     # Client-side IndexedDB binary storage & download manager
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/bec-academic-portal.git
cd bec-academic-portal

# Install dependencies
npm install
```

### Development
```bash
# Run local development server on port 3000
npm run dev
```
Open your browser at `http://localhost:3000` to interact with the application.

### Production Build
```bash
# Compile and package for production
npm run build

# Preview production build locally
npm run preview
```

### Type Checking & Linting
```bash
# Verify TypeScript compilation with zero errors
npm run lint
```

---

## 🔒 Security & Privacy Guidelines

1. **Authenticated Operations**:
   - Access to `/student-dashboard` requires an active student session.
   - Access to `/admin-dashboard` requires administrative credentials.
2. **Access Control**:
   - Only the uploader and administrators may access non-approved uploads.
   - Once approved, only student academic documents (not personal student identifiers) become accessible.
3. **Download Verification**:
   - Downloads check document status and permissions before streaming blobs.

---

## 🏛️ Institutional Accreditation
- **Institution**: Basaveshwara Engineering College (Autonomous), Bagalkote
- **Governing Body**: Basaveshwar Veerashaiva Vidyavardhak Sangha (B.V.V. Sangha, Estd. 1906)
- **Affiliation**: Autonomous under Visvesvaraya Technological University (VTU), Belagavi
- **Accreditation**: NAAC ‘A’ Grade, NBA Accredited Programs
- **Motto**: *"Kayakave Kailasa"* (Work is Worship)
- **Official Website**: [https://www.becbgk.edu/](https://www.becbgk.edu/)
