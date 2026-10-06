import React, { useState, useEffect } from 'react';

// ES Module Imports - Bundled & Hashed by Vite into dist/assets/
import bvvsBecCrestImg from './images/bvvs_bec_crest.jpg';
import becHeroImg from './images/bec_academic_hero.jpg';
import becStudentLoginImg from './images/bec_student_login.jpg';
import becApprovalWorkflowImg from './images/bec_approval_workflow.jpg';
import becBagalkotLogoImg from './images/bec_bagalkot_logo.jpg';
import becResourceUploadImg from './images/bec_resource_upload.jpg';
import becAcademicEmptyImg from './images/bec_academic_empty.jpg';

/**
 * Authentic Scalable Vector Emblem of Basaveshwar Veerashaiva Vidyavardhak Sangha (BVVS)
 * Basaveshwara Engineering College (Autonomous), Bagalkot - Estd. 1963.
 * Motto: "ಕಾಯಕವೇ ಕೈಲಾಸ" (Kayakaave Kailaasa) • "Work is Worship"
 * Guaranteed 100% crisp vector rendering at any scale, zero loading time, zero broken image risk.
 */
export const BVVSBECCrestSVG: React.FC<{ className?: string; size?: number | string }> = ({ 
  className = 'w-full h-full',
  size
}) => {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="Official Emblem of Basaveshwar Veerashaiva Vidyavardhak Sangha - Basaveshwara Engineering College Bagalkot"
    >
      <defs>
        {/* Outer Rim Gold Gradient */}
        <radialGradient id="becGoldRim" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>

        {/* Deep Royal Navy Ring */}
        <linearGradient id="becNavyRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="50%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0B132B" />
        </linearGradient>

        {/* Crimson Center Background */}
        <radialGradient id="becCrimsonInner" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="70%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </radialGradient>

        {/* Flame Gold Glow */}
        <radialGradient id="becFlameGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EA580C" />
        </radialGradient>

        {/* Filter Drop Shadow */}
        <filter id="becCrestShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Outer Shadow Wrapper */}
      <g filter="url(#becCrestShadow)">
        {/* Base Beaded Rim Outer Ring */}
        <circle cx="100" cy="100" r="96" fill="url(#becGoldRim)" stroke="#78350F" strokeWidth="2" />
        
        {/* Decorative Golden Beading Pearls around periphery */}
        {[...Array(36)].map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180;
          const cx = 100 + 91 * Math.cos(angle);
          const cy = 100 + 91 * Math.sin(angle);
          return <circle key={i} cx={cx} cy={cy} r="1.6" fill="#78350F" />;
        })}

        {/* Outer Navy Ring for B.V.V. SANGHA */}
        <circle cx="100" cy="100" r="86" fill="url(#becNavyRing)" stroke="#F59E0B" strokeWidth="2.5" />

        {/* Curved Text Path: Upper Ring "B.V.V. SANGHA • BAGALKOTE" */}
        <path id="becTextUpper" d="M 28 100 A 72 72 0 0 1 172 100" fill="none" />
        <text fill="#FEF3C7" fontSize="10.5" fontWeight="900" letterSpacing="2.2" fontFamily="sans-serif">
          <textPath href="#becTextUpper" startOffset="50%" textAnchor="middle">
            B.V.V. SANGHA • BAGALKOTE
          </textPath>
        </text>

        {/* Curved Text Path: Lower Ring "ESTD. 1906" */}
        <path id="becTextLower" d="M 166 106 A 68 68 0 0 1 34 106" fill="none" />
        <text fill="#FDE68A" fontSize="9.5" fontWeight="800" letterSpacing="3" fontFamily="sans-serif">
          <textPath href="#becTextLower" startOffset="50%" textAnchor="middle">
            ★ ESTD. 1906 ★
          </textPath>
        </text>

        {/* Gold Separator Ring */}
        <circle cx="100" cy="100" r="62" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 2" />

        {/* Inner Crimson Medallion */}
        <circle cx="100" cy="100" r="58" fill="url(#becCrimsonInner)" stroke="#F59E0B" strokeWidth="2" />

        {/* Sunburst Rays of Wisdom */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x1 = 100 + 38 * Math.cos(angle);
          const y1 = 96 + 38 * Math.sin(angle);
          const x2 = 100 + 54 * Math.cos(angle);
          const y2 = 96 + 54 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FEF08A" strokeWidth="1.2" opacity="0.45" />;
        })}

        {/* Traditional Nandaa Deepa (Eternal Lamp of Knowledge) & Sacred Flame */}
        {/* Lamp Base Stand */}
        <path d="M 86 128 L 114 128 L 110 123 L 90 123 Z" fill="#FDE047" stroke="#78350F" strokeWidth="1" />
        <rect x="94" y="117" width="12" height="6" rx="2" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
        
        {/* Lamp Oil Basin (Agalu / Prameya) */}
        <path d="M 74 117 C 82 124 118 124 126 117 C 122 113 78 113 74 117 Z" fill="#FDE047" stroke="#78350F" strokeWidth="1.2" />
        
        {/* Golden Wick Holder */}
        <ellipse cx="100" cy="113" rx="14" ry="3" fill="#D97706" />

        {/* Radiant Multi-tier Sacred Flame (Agnikunda / Jyothi) */}
        {/* Outer Flame Glow */}
        <path 
          d="M 100 70 C 114 84 118 97 114 108 C 110 114 90 114 86 108 C 82 97 86 84 100 70 Z" 
          fill="url(#becFlameGlow)"
          opacity="0.95"
        />
        {/* Inner Golden Core Flame */}
        <path 
          d="M 100 77 C 108 87 110 97 108 104 C 105 108 95 108 92 104 C 90 97 92 87 100 77 Z" 
          fill="#FEF08A"
        />
        {/* Bright White Flame Heart */}
        <ellipse cx="100" cy="98" rx="4.5" ry="9" fill="#FFFFFF" />

        {/* Sacred Shivalinga / Basaveshwara Medallion Silhouette inside flame */}
        <ellipse cx="100" cy="100" rx="3" ry="4.5" fill="#78350F" opacity="0.6" />

        {/* College Acronym Banner at Center-Bottom */}
        <rect x="76" y="130" width="48" height="15" rx="3" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.2" />
        <text x="100" y="141.5" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle" letterSpacing="1.5" fontFamily="sans-serif">
          B.E.C.
        </text>

        {/* Autonomous Ribbon Arc along Bottom Outer */}
        <path d="M 44 148 Q 100 178 156 148 L 152 162 Q 100 190 48 162 Z" fill="#B91C1C" stroke="#F59E0B" strokeWidth="1" />
        <text x="100" y="161" fill="#FEF3C7" fontSize="8" fontWeight="800" textAnchor="middle" letterSpacing="1" fontFamily="sans-serif">
          AUTONOMOUS • 1963
        </text>

        {/* Sacred Kannada / English Motto Ribbon */}
        <rect x="36" y="168" width="128" height="15" rx="4" fill="#0F172A" stroke="#FBBF24" strokeWidth="1.2" />
        <text x="100" y="179" fill="#FDE047" fontSize="7.8" fontWeight="900" textAnchor="middle" letterSpacing="0.8" fontFamily="sans-serif">
          ಕಾಯಕವೇ ಕೈಲಾಸ • WORK IS WORSHIP
        </text>
      </g>
    </svg>
  );
};

/**
 * Rich Academic Hero Illustration Fallback
 * Guaranteed to display instantly if hero photograph takes time to stream or fails.
 */
export const HeroAcademicIllustrationSVG: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-white ${className}`}>
      {/* Decorative Blueprint Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Central Visual Composition */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Official College Crest Centerpiece */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 shadow-2xl ring-4 ring-amber-400 mb-4 transform hover:scale-105 transition-transform duration-300">
          <BVVSBECCrestSVG />
        </div>

        {/* Institutional Identity */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[11px] font-bold tracking-wide uppercase mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Autonomous Study Center
        </span>

        <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] tracking-tight text-white mb-1.5">
          BEC Digital Knowledge Hub
        </h3>
        <p className="text-xs text-blue-200/90 leading-relaxed mb-4">
          Verified academic repository for Basaveshwara Engineering College Bagalkot. Department lecture notes, lab manuals, and official BEC syllabus documents.
        </p>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-2 w-full pt-3 border-t border-white/10 text-left">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
            <div className="text-[10px] text-blue-300 font-semibold">Curriculum</div>
            <div className="text-xs font-bold text-white">2022 Scheme</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
            <div className="text-[10px] text-emerald-300 font-semibold">Accreditation</div>
            <div className="text-xs font-bold text-white">NAAC 'A'</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
            <div className="text-[10px] text-amber-300 font-semibold">Verification</div>
            <div className="text-xs font-bold text-white">100% Faculty</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Empty Resources Search State Illustration
 */
export const AcademicEmptyIllustrationSVG: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center ${className}`}>
      <div className="w-24 h-24 rounded-3xl bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center mb-4 text-blue-600 shadow-inner">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h4 className="text-base font-bold text-slate-800 font-['Outfit'] mb-1">
        No Matching Academic Resources Found
      </h4>
      <p className="text-xs text-slate-500 max-w-sm">
        Try broadening your search term, clearing selected filters, or checking another department.
      </p>
    </div>
  );
};

export const ASSETS = {
  crest: {
    src: bvvsBecCrestImg,
    publicUrl: '/images/bvvs_bec_crest.jpg',
    relativeUrl: './images/bvvs_bec_crest.jpg',
    alt: 'Basaveshwar Veerashaiva Vidyavardhak Sangha Bagalkote - BEC Autonomous Emblem',
  },
  hero: {
    src: becHeroImg,
    publicUrl: '/images/bec_academic_hero.jpg',
    relativeUrl: './images/bec_academic_hero.jpg',
    alt: 'BEC students collaborating with academic resources in digital knowledge portal',
  },
  studentLogin: {
    src: becStudentLoginImg,
    publicUrl: '/images/bec_student_login.jpg',
    relativeUrl: './images/bec_student_login.jpg',
    alt: 'BEC Campus Academic Study Atmosphere',
  },
  approvalWorkflow: {
    src: becApprovalWorkflowImg,
    publicUrl: '/images/bec_approval_workflow.jpg',
    relativeUrl: './images/bec_approval_workflow.jpg',
    alt: 'BEC Academic Resource Review & Verification Pipeline',
  },
  bagalkotLogo: {
    src: becBagalkotLogoImg,
    publicUrl: '/images/bec_bagalkot_logo.jpg',
    relativeUrl: './images/bec_bagalkot_logo.jpg',
    alt: 'Basaveshwara Engineering College Bagalkot Crest',
  },
  resourceUpload: {
    src: becResourceUploadImg,
    publicUrl: '/images/bec_resource_upload.jpg',
    relativeUrl: './images/bec_resource_upload.jpg',
    alt: 'Upload Verified Academic Notes to Cloud Repository',
  },
  academicEmpty: {
    src: becAcademicEmptyImg,
    publicUrl: '/images/bec_academic_empty.jpg',
    relativeUrl: './images/bec_academic_empty.jpg',
    alt: 'No academic resources found',
  },
};

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  primarySrc: string;
  fallbackSrc?: string;
  legacySrc?: string;
  fallbackElement?: React.ReactNode;
}

/**
 * Bulletproof Multi-Stage Image Component
 * Cascade Resolution:
 * 1. Primary Vite-bundled import asset (production hashed asset in dist/assets)
 * 2. Absolute Public URL (/images/...)
 * 3. Relative Public URL (./images/...)
 * 4. Fallback React Node / Vector SVG
 *
 * Guarantees zero broken image icons in production, across all operating systems,
 * behind Cloud Run / proxies, in private browsing, and after page refreshes.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  primarySrc,
  fallbackSrc,
  legacySrc,
  fallbackElement,
  alt = 'BEC Academic Portal Image',
  className = '',
  ...rest
}) => {
  // Compute candidate list in order of preference
  const candidates = React.useMemo(() => {
    const list: string[] = [];
    if (primarySrc && typeof primarySrc === 'string') list.push(primarySrc);
    if (fallbackSrc && typeof fallbackSrc === 'string' && !list.includes(fallbackSrc)) list.push(fallbackSrc);
    if (legacySrc && typeof legacySrc === 'string' && !list.includes(legacySrc)) list.push(legacySrc);
    
    // Add relative version of fallbackSrc if available
    if (fallbackSrc && fallbackSrc.startsWith('/')) {
      const rel = '.' + fallbackSrc;
      if (!list.includes(rel)) list.push(rel);
    }
    return list;
  }, [primarySrc, fallbackSrc, legacySrc]);

  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const [hasFailedAll, setHasFailedAll] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Synchronize when candidates change
  useEffect(() => {
    setCandidateIndex(0);
    setHasFailedAll(candidates.length === 0);
    setIsLoaded(false);
  }, [candidates]);

  const handleError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex(prev => prev + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // If all candidates failed and fallbackElement provided, render it
  if (hasFailedAll) {
    if (fallbackElement) {
      return <>{fallbackElement}</>;
    }
    // Default styled non-broken graphic if no custom fallback provided
    return (
      <div className={`flex flex-col items-center justify-center p-4 bg-slate-100 rounded-xl border border-slate-200 text-slate-500 ${className}`}>
        <svg className="w-8 h-8 mb-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-[11px] font-semibold text-center line-clamp-1">{alt}</span>
      </div>
    );
  }

  const activeSrc = candidates[candidateIndex];

  return (
    <img
      src={activeSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={handleError}
      onLoad={handleLoad}
      className={`${className} ${!isLoaded ? 'opacity-95' : 'opacity-100'} transition-opacity duration-300`}
      {...rest}
    />
  );
};
