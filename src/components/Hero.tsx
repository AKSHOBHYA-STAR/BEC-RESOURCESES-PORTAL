import React, { useState } from 'react';
import { 
  ArrowRight, 
  UploadCloud, 
  Search, 
  CheckCircle2, 
  BookOpen, 
  ShieldCheck, 
  GraduationCap, 
  Layers, 
  Sparkles, 
  FileCheck2, 
  Download 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ASSETS, SafeImage, BVVSBECCrestSVG, HeroAcademicIllustrationSVG } from '../assets/assetRegistry';

export const Hero: React.FC = () => {
  const { setActiveView, setFilters, applyQuickFilter } = useApp();
  const [searchInput, setSearchInput] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilters(prev => ({ ...prev, searchQuery: searchInput.trim() }));
      setActiveView('resources');
    } else {
      setActiveView('resources');
    }
  };

  const trustIndicators = [
    { label: 'Department Wise Resources', icon: Layers },
    { label: 'Faculty Verified Notes', icon: FileCheck2 },
    { label: 'Semester Wise Organization', icon: BookOpen },
    { label: 'Secure Student Access', icon: ShieldCheck }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-[#F8FAFC]">
      {/* Decorative Soft Floating Geometric Shapes */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-6 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy, Actions & Trust Badges */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Pill Tag with Official Crest */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-blue-200/90 text-slate-800 text-xs font-bold w-fit mb-5 shadow-xs">
              <SafeImage
                primarySrc={ASSETS.crest.src}
                fallbackSrc={ASSETS.crest.publicUrl}
                legacySrc="/images/bvvs_bec_crest.svg"
                fallbackElement={<BVVSBECCrestSVG className="w-5 h-5" />}
                alt="BVVS Crest"
                className="w-5 h-5 object-contain rounded-full"
              />
              <span className="font-extrabold text-blue-700">B.V.V. Sangha's</span>
              <span className="text-slate-300">•</span>
              <span>Basaveshwara Engineering College (Autonomous), Bagalkot</span>
              <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded bg-red-100 text-red-700 text-[10px] font-black uppercase">
                Work is Worship
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-5 font-['Outfit']">
              One Platform for Every Academic Resource at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Basaveshwara Engineering College</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-4">
              Share and access student lecture notes, assignments, lab records, projects, and verified official BEC syllabus documents organized department-wise and semester-wise.
            </p>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-8">
              A centralized student knowledge-sharing platform with private account security, admin moderation, and official curriculum copies directly referenced from becbgk.edu.
            </p>

            {/* Quick Live Search Bar */}
            <form onSubmit={handleHeroSearch} className="relative mb-8 max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by subject code (e.g. 21IS52), topic, or exam paper..."
                  className="w-full pl-11 pr-32 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-md shadow-blue-500/5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2.5 text-xs text-slate-500">
                <span className="font-semibold text-slate-600">Popular:</span>
                {['DBMS (21IS52)', 'ATC (21CS51)', 'DSP Manual', '2022 Scheme'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setFilters(prev => ({ ...prev, searchQuery: tag.split(' ')[0] }));
                      setActiveView('resources');
                    }}
                    className="hover:text-blue-600 underline decoration-slate-300 underline-offset-2 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={() => setActiveView('resources')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer"
              >
                <span>Explore Resources</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('upload')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200/90 shadow-sm hover:border-blue-200 transition-all cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-blue-600" />
                <span>Upload Notes</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
              {trustIndicators.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 leading-tight">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Hero Illustration & Glass Floating Cards */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Glass Backplate */}
            <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-tr from-white/80 to-white/40 backdrop-blur-xl border border-white shadow-2xl shadow-blue-900/10 overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 shadow-inner">
                <SafeImage
                  primarySrc={ASSETS.hero.src}
                  fallbackSrc={ASSETS.hero.publicUrl}
                  legacySrc={ASSETS.hero.relativeUrl}
                  fallbackElement={<HeroAcademicIllustrationSVG className="w-full h-full" />}
                  alt={ASSETS.hero.alt}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Glassmorphism Badge 1: Verified Repository */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:left-6 glass-panel rounded-2xl p-3.5 shadow-xl border border-white/90 flex items-center gap-3 animate-float max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>100% Verified Notes</span>
                    <Sparkles className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">
                    Moderated for BEC Autonomous Curriculum
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphism Badge 2: Downloads count */}
              <div className="absolute -top-3 -right-3 sm:top-5 sm:right-5 glass-panel rounded-2xl p-3 shadow-lg border border-white/90 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">48,000+</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Semester Downloads</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
