import React from 'react';
import { ASSETS, SafeImage, BVVSBECCrestSVG } from '../assets/assetRegistry';

interface BECLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'light' | 'dark' | 'full';
  useVectorCrest?: boolean;
}

export const BECLogo: React.FC<BECLogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true,
  variant = 'light',
  useVectorCrest = false
}) => {
  const imgDimensions = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24'
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl'
  };

  // High-fidelity scalable vector fallback of official BVVS BEC Crest
  const vectorCrestElement = (
    <div className="w-full h-full rounded-full bg-white p-0.5 filter drop-shadow-sm flex items-center justify-center">
      <BVVSBECCrestSVG />
    </div>
  );

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official BVVS BEC Crest Emblem Image / Vector */}
      <div className={`relative ${imgDimensions[size]} flex-shrink-0 flex items-center justify-center`}>
        {useVectorCrest ? (
          vectorCrestElement
        ) : (
          <SafeImage
            primarySrc={ASSETS.crest.src}
            fallbackSrc={ASSETS.crest.publicUrl}
            legacySrc="/images/bvvs_bec_crest.svg"
            fallbackElement={vectorCrestElement}
            alt={ASSETS.crest.alt}
            className="w-full h-full object-contain filter drop-shadow-sm hover:scale-105 transition-transform duration-300 rounded-full bg-white p-0.5"
          />
        )}
      </div>

      {/* College & Society Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-black tracking-tight leading-tight font-['Outfit'] ${titleSizes[size]} ${
            variant === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            BASAVESHWARA <span className="text-blue-600">ENGINEERING COLLEGE</span>
          </span>
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] font-extrabold bg-blue-100 text-blue-700 tracking-wide border border-blue-200">
            AUTONOMOUS
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            <span className={`text-[10.5px] font-semibold ${
              variant === 'dark' ? 'text-blue-200' : 'text-blue-700'
            }`}>
              B.V.V. Sangha, Bagalkote
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className={`text-[10px] italic font-medium ${
              variant === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              "Work is Worship"
            </span>
            <span className="text-slate-300 hidden md:inline">•</span>
            <span className="text-[10px] font-bold text-emerald-600 hidden md:inline">
              NAAC 'A' Grade
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
