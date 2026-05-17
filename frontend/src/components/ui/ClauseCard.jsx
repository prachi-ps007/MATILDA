import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export function ClauseCard({ title, originalText, translation, riskCategory, severity }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityColors = {
    High: "text-red-400 bg-red-400/10 border-red-400/20",
    Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    Low: "text-brand-mint bg-brand-mint/10 border-brand-mint/20"
  };

  const severityBorder = {
    High: "border-l-red-400",
    Medium: "border-l-amber-400",
    Low: "border-l-brand-mint"
  };

  return (
    <div className={`glass-panel bg-brand-surface-elevated/30 rounded-xl border-l-4 ${severityBorder[severity]} transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,182,255,0.1)] overflow-hidden`}>
      <div 
        className="p-5 cursor-pointer flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h4 className="font-semibold text-white text-lg">{title}</h4>
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${severityColors[severity]}`}>
              {severity} Severity
            </span>
            <span className="text-xs text-brand-lavender/70 border border-brand-lavender/20 rounded-full px-2.5 py-1">
              {riskCategory}
            </span>
          </div>
          {!isExpanded && (
            <p className="text-sm text-slate-400 line-clamp-1">{translation}</p>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-brand-surface-elevated flex items-center justify-center shrink-0 border border-brand-periwinkle/10">
          {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-lavender" /> : <ChevronDown className="w-4 h-4 text-brand-lavender" />}
        </div>
      </div>

      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-brand-periwinkle/10 animate-in slide-in-from-top-2 duration-300">
          <div className="mb-4">
            <p className="text-xs font-semibold text-brand-lavender uppercase tracking-wider mb-2">Original Clause Text</p>
            <div className="bg-brand-surface-elevated/50 p-4 rounded-lg border border-brand-periwinkle/5">
              <p className="text-sm text-slate-300 font-serif leading-relaxed italic">"{originalText}"</p>
            </div>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-brand-mint uppercase tracking-wider mb-2 flex items-center gap-1">
              <ArrowRight className="w-3 h-3" /> MATILDA Translation
            </p>
            <div className="bg-brand-mint/5 p-4 rounded-lg border border-brand-mint/10 shadow-[0_0_15px_rgba(183,228,199,0.05)]">
              <p className="text-sm text-white leading-relaxed font-medium">{translation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
