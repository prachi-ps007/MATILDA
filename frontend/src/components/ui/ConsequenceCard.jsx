import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ConsequenceCard({ title, icon: Icon, description, severity, impact, delay }) {
  const severities = {
    Extreme: "bg-red-500/5 border-red-500/40 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.15)]",
    High: "bg-amber-500/5 border-amber-500/40 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.1)]",
    Medium: "bg-brand-periwinkle/5 border-brand-periwinkle/40 text-brand-periwinkle shadow-[0_0_20px_rgba(157,132,255,0.1)]"
  };

  const glowColors = {
    Extreme: "bg-red-500",
    High: "bg-amber-500",
    Medium: "bg-brand-periwinkle"
  };

  return (
    <div 
      className={`relative overflow-hidden glass-panel rounded-2xl border p-6 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(200,182,255,0.2)] animate-in fade-in slide-in-from-bottom-8 fill-mode-both ${severities[severity]} group`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background ambient glow */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-30 group-hover:opacity-60 transition-opacity duration-700 ${glowColors[severity]}`} />
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className={`p-4 rounded-xl bg-brand-surface-elevated/80 backdrop-blur-md border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-surface-elevated border border-white/10 shadow-inner text-xs font-bold uppercase tracking-wider">
          <AlertCircle className={`w-3.5 h-3.5 ${severity === 'Extreme' ? 'animate-pulse' : ''}`} />
          {severity} Risk
        </div>
      </div>

      <h4 className="text-xl font-bold text-white mb-3 tracking-tight relative z-10">{title}</h4>
      
      <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium relative z-10">
        {description}
      </p>

      <div className="border-t border-white/10 pt-5 mt-auto relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 block">Real-world Impact</span>
        <p className="text-sm font-semibold leading-snug">
          {impact}
        </p>
      </div>
    </div>
  );
}
