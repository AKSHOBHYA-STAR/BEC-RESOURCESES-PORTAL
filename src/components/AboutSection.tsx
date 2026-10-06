import React from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  GraduationCap, 
  FileCheck2,
  Award,
  Building,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ASSETS, SafeImage, BVVSBECCrestSVG } from '../assets/assetRegistry';

export const AboutSection: React.FC = () => {
  const { setActiveView } = useApp();

  const keyPoints = [
    {
      title: 'Administered by B.V.V. Sangha (Estd. 1906)',
      desc: 'Guided by Lord Basaveshwara’s 12th century philosophy: "Work is Worship" (Kayakave Kailasa).'
    },
    {
      title: 'Autonomous Status Since 2007-08',
      desc: 'Granted academic autonomy by Visvesvaraya Technological University (VTU) Belagavi with NAAC ‘A’ Grade.'
    },
    {
      title: 'Comprehensive Learning & Academic Support',
      desc: '1,30,000+ curriculum volumes, e-journals, authenticated digital materials, and peer-reviewed student notes.'
    },
    {
      title: 'World Bank TEQIP-I, II & III Recipient',
      desc: 'Over ₹40.13 Crores in competitive quality grants, recognized as a top national mentor institute.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Official Crest & Illustration Combination */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl p-4 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-amber-50/30 border border-blue-200/80 shadow-xl overflow-hidden">
              
              {/* Official Emblem Banner */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1 flex-shrink-0 shadow-md border border-slate-200">
                  <SafeImage
                    primarySrc={ASSETS.crest.src}
                    fallbackSrc={ASSETS.crest.publicUrl}
                    legacySrc="/images/bvvs_bec_crest.svg"
                    fallbackElement={<BVVSBECCrestSVG />}
                    alt={ASSETS.crest.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    Official Institutional Seal
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 font-['Outfit'] mt-1 leading-snug">
                    Basaveshwar Veerashaiva Vidyavardhak Sangha
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-[10px] tracking-wide">
                      WORK IS WORSHIP
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Bagalkote, Estd. 1906</span>
                  </div>
                </div>
              </div>

              {/* Campus Illustration */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 shadow-inner">
                <SafeImage
                  primarySrc={ASSETS.studentLogin.src}
                  fallbackSrc={ASSETS.studentLogin.publicUrl}
                  legacySrc={ASSETS.studentLogin.relativeUrl}
                  alt={ASSETS.studentLogin.alt}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 text-white text-xs font-semibold">
                  Basaveshwara Engineering College (Autonomous) • Bagalkot Campus
                </div>
              </div>

              {/* Verified seal overlay */}
              <div className="mt-4 p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">Dr. B. R. Hiremath, Principal</div>
                    <div className="text-[11px] text-slate-500">Autonomous Academic Council & Quality Assurance</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10.5px] font-extrabold rounded-lg">
                  NAAC 'A' Grade
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content & Action */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold w-fit mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Official Institutional Information</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 font-['Outfit']">
              Basaweshwara Engineering College Academic Resources Portal
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              The portal serves as the official academic platform for Basaveshwara Engineering College students to share personal lecture notes, lab records, assignments, and projects, while accessing verified official BEC syllabus documents from the college website. Student uploads undergo administrative moderation to ensure academic authenticity and student privacy.
            </p>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
              Established in 1963 by the historic Basaveshwar Veerashaiva Vidyavardhak Sangha (B.V.V. Sangha, Bagalkote, founded 1906), BEC has pioneered technical education in Karnataka for over 6 decades across a picturesque 30+ acre campus. This portal empowers collaborative learning through authentic student-shared academic materials and verified BEC autonomous curriculums.
            </p>

            {/* Key feature list */}
            <div className="space-y-3 mb-8">
              {keyPoints.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveView('resources')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <span>Browse College Resources</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('departments')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>View All 10 Departments</span>
              </button>

              <a
                href="https://becbgk.edu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors"
              >
                <span>becbgk.edu</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
