import React from 'react';
import { 
  UploadCloud, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Globe,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { ASSETS, SafeImage } from '../assets/assetRegistry';

interface ApprovalWorkflowVisualizerProps {
  currentStage?: number; // 1 to 5
}

export const ApprovalWorkflowVisualizer: React.FC<ApprovalWorkflowVisualizerProps> = ({ 
  currentStage = 2 
}) => {
  const stages = [
    {
      step: 1,
      title: 'Student Upload',
      desc: 'Student inputs course codes, attaches verified notes or question papers.',
      icon: UploadCloud,
      color: 'blue'
    },
    {
      step: 2,
      title: 'Pending Review',
      desc: 'Automated file scan and queueing in department moderation feed.',
      icon: Clock,
      color: 'amber'
    },
    {
      step: 3,
      title: 'Admin Verification',
      desc: 'Department faculty or admin verifies syllabus compliance and quality.',
      icon: ShieldCheck,
      color: 'indigo'
    },
    {
      step: 4,
      title: 'Approved',
      desc: 'Resource is authenticated with official BEC verified scholar seal.',
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      step: 5,
      title: 'Published',
      desc: 'Live in central repository for all BEC students to view and download.',
      icon: Globe,
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
      
      {/* Top Banner with Infographic Image */}
      <div className="relative rounded-2xl overflow-hidden mb-8 aspect-[16/6] bg-slate-900 shadow-md">
        <SafeImage
          primarySrc={ASSETS.approvalWorkflow.src}
          fallbackSrc={ASSETS.approvalWorkflow.publicUrl}
          legacySrc={ASSETS.approvalWorkflow.relativeUrl}
          alt={ASSETS.approvalWorkflow.alt}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent flex items-center p-6 sm:p-8">
          <div className="max-w-md text-white">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/80 text-white mb-2 inline-block">
              Quality Assurance Pipeline
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] leading-tight mb-2">
              How BEC Moderates Study Materials
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              Every document is verified against the official BEC autonomous syllabus by department educators before publishing.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Workflow Timeline */}
      <div className="relative">
        
        {/* Connecting line on desktop */}
        <div className="hidden lg:block absolute top-7 left-10 right-10 h-1 bg-slate-100 z-0">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-500" 
            style={{ width: `${((currentStage - 1) / 4) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {stages.map((st) => {
            const Icon = st.icon;
            const isCompleted = st.step < currentStage;
            const isCurrent = st.step === currentStage;

            return (
              <div
                key={st.step}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-blue-50/70 border-blue-400 shadow-md shadow-blue-500/5'
                    : isCompleted
                    ? 'bg-white border-emerald-300'
                    : 'bg-slate-50/50 border-slate-200/70 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : isCurrent
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    Stage {st.step}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mb-1 font-['Outfit']">
                  {st.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
