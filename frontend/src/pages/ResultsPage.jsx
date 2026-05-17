import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { FileText, ShieldAlert, AlertTriangle, ArrowRight, Zap, ListChecks, Eye, TrendingDown, ShieldOff, Scale, ChevronLeft } from 'lucide-react';
import { ClauseCard } from '../components/ui/ClauseCard';
import { ConsequenceCard } from '../components/ui/ConsequenceCard';

export function ResultsPage({ data, onReset }) {
  const [activeTab, setActiveTab] = useState('analyze');

  if (!data) return null;

  const { analysis, consequence_simulator, risk_dashboard } = data;
  
  const riskScore = risk_dashboard.overall_risk;
  const rawVerdict = risk_dashboard.verdict || "";
  const isDangerous = rawVerdict.includes("Dangerous") || riskScore >= 70;
  const isCaution = rawVerdict.includes("Caution") || (riskScore >= 40 && riskScore < 70);
  
  const riskStatus = isDangerous ? "Dangerous" : isCaution ? "Caution" : "Safe";

  const statusColors = {
    Dangerous: "text-red-400 bg-red-400/10 border-red-400/30",
    Caution: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    Safe: "text-brand-mint bg-brand-mint/10 border-brand-mint/30"
  };

  const tabs = [
    { id: 'analyze', label: 'Analyze Document', icon: FileText },
    { id: 'simulate', label: 'Consequence Simulator', icon: Zap },
    { id: 'dashboard', label: 'Risk Dashboard', icon: ListChecks }
  ];

  // Helper to map risk score to severity string
  const getSeverity = (score) => {
    if (score >= 70) return "High";
    if (score >= 40) return "Medium";
    return "Low";
  };

  // Derived Category Scores (simulated from clauses since backend doesn't explicitly return 4 fixed categories)
  const calculateCategoryScore = (keywords) => {
    const relevantClauses = analysis.clauses.filter(c => 
      keywords.some(k => c.category.toLowerCase().includes(k) || c.original.toLowerCase().includes(k))
    );
    if (relevantClauses.length === 0) return 10; // default low score if no relevant clauses
    const total = relevantClauses.reduce((acc, c) => acc + c.risk, 0);
    return Math.min(100, Math.round(total / relevantClauses.length));
  };

  const categories = [
    { 
      name: "Privacy Score", 
      desc: "Analysis of data collection & tracking",
      score: calculateCategoryScore(["privacy", "data", "cookie", "track"]),
    },
    { 
      name: "Legal Liability", 
      desc: "Arbitration, indemnification & severability",
      score: calculateCategoryScore(["legal", "arbitration", "liability", "court", "sue"]),
    },
    { 
      name: "Financial Exposure", 
      desc: "Hidden fees, auto-renewals & penalties",
      score: calculateCategoryScore(["payment", "fee", "bill", "money", "financial", "charge"]),
    },
    { 
      name: "Data-Sharing Policies", 
      desc: "Third-party sales and API access",
      score: calculateCategoryScore(["share", "third-party", "sell"]),
    }
  ];

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button onClick={onReset} className="flex items-center gap-2 text-brand-lavender hover:text-white mb-6 transition-colors text-sm font-medium">
        <ChevronLeft className="w-4 h-4" /> Back to Upload
      </button>

      {/* Top Summary Section */}
      <section className="mb-10 w-full">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between glass-panel p-6 rounded-3xl relative overflow-hidden">
          <div className="absolute top-[-50%] right-[-10%] w-[40%] h-[200%] bg-brand-periwinkle/10 blur-[60px] -z-10 rounded-full rotate-45" />
          
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-brand-lavender uppercase tracking-wider mb-2">Analysis Complete</h2>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              Contract Analysis Results
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">MATILDA has parsed your document and identified {analysis.clauses.filter(c => c.risk >= 70).length} critical clauses requiring attention.</p>
          </div>

          <div className="flex items-center gap-6 glass-panel bg-brand-surface-elevated/50 py-4 px-6 rounded-2xl border-brand-periwinkle/20">
            <div className="flex flex-col items-end">
              <span className="text-xs text-brand-lavender uppercase tracking-wider mb-1">Risk Score</span>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold glow-text text-white">{riskScore}</span>
                <span className="text-slate-400 font-medium mb-1">/100</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${statusColors[riskStatus]}`}>
              {riskStatus === 'Dangerous' ? <ShieldAlert className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span className="font-semibold text-sm tracking-wide">{riskStatus}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="flex space-x-2 mb-8 glass-panel p-1.5 rounded-full mx-auto w-fit overflow-x-auto max-w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-[0_0_20px_rgba(54,5,104,0.6)] border border-brand-periwinkle/30' 
                  : 'text-brand-lavender hover:text-white hover:bg-brand-surface-elevated/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Area */}
      <Card glow className="min-h-[500px] relative overflow-hidden transition-all duration-500">
        {activeTab === 'analyze' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-periwinkle" />
              Document Analysis
            </h3>
            <div className="space-y-4">
              {analysis.clauses.map((clause, idx) => (
                <ClauseCard 
                  key={idx}
                  title={`Clause ${idx + 1}: ${clause.category}`}
                  riskCategory={clause.category}
                  severity={getSeverity(clause.risk)}
                  originalText={clause.original}
                  translation={clause.translation}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'simulate' && (
          <div className="animate-in fade-in duration-700 w-full py-6">
            <div className="text-center mb-14 mt-4 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-40 bg-red-500/10 blur-[100px] -z-10 rounded-full" />
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white glow-text">
                {consequence_simulator.preview}
              </h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                MATILDA has simulated the real-world consequences of the clauses you are about to sign.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {consequence_simulator.items.map((item, idx) => {
                // Determine icon based on title context
                let Icon = AlertTriangle;
                const titleLower = (item.title || "").toLowerCase();
                if (titleLower.includes("data") || titleLower.includes("privacy")) Icon = Eye;
                else if (titleLower.includes("financial")) Icon = TrendingDown;
                else if (titleLower.includes("account") || titleLower.includes("termination")) Icon = ShieldOff;
                else if (titleLower.includes("legal") || titleLower.includes("liability")) Icon = Scale;

                return (
                  <ConsequenceCard 
                    key={idx}
                    delay={100 + (idx * 150)}
                    title={item.title || "Risk Scenario"}
                    icon={Icon}
                    severity={item.severity || "Medium"}
                    description={item.description || "Action is taken against your account."}
                    impact={item.impact || "You may lose rights or incur liabilities."}
                  />
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-700 w-full py-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-2 text-white glow-text">
                <ListChecks className="w-6 h-6 text-brand-periwinkle" />
                Risk Intelligence Dashboard
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Overall Meter & Verdict */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="glass-panel p-8 rounded-3xl border border-white/5 relative flex flex-col items-center justify-center group hover:border-brand-periwinkle/30 transition-colors duration-500">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-primary/10 blur-[50px] -z-10 rounded-full group-hover:bg-brand-primary/20 transition-colors duration-700" />
                  
                  <h4 className="text-sm font-semibold text-brand-lavender uppercase tracking-widest mb-6">Overall Risk Index</h4>
                  
                  {/* SVG Circular Progress */}
                  <div className="relative w-56 h-56 flex items-center justify-center mb-4">
                    <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="6" 
                        strokeDasharray="283" 
                        strokeDashoffset={283 - (283 * riskScore) / 100} 
                        strokeLinecap="round" 
                        className={`${statusColors[riskStatus].split(' ')[0]} animate-[stroke_1.5s_ease-out]`}
                        style={{ filter: `drop-shadow(0 0 15px currentColor)` }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-6xl font-bold text-white glow-text tracking-tighter">{riskScore}</span>
                      <div className={`flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full border ${statusColors[riskStatus]}`}>
                        <AlertTriangle className="w-3 h-3" />
                        <span className="text-xs font-bold uppercase tracking-wider">{riskStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl border border-brand-periwinkle/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-50" />
                  <div className="relative z-10">
                    <h4 className="font-semibold text-brand-lavender uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" />
                      Final Verdict & Recommendation
                    </h4>
                    <p className="text-white text-xl font-medium mb-3">{rawVerdict.replace(/[^\w\s]/gi, '')}</p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      Based on MATILDA's analysis, the overall risk is categorized as {riskStatus}. 
                      {isDangerous ? " Do not sign this document without major amendments." : 
                       isCaution ? " Consider renegotiating specific clauses." : " The document appears standard."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Category Breakdown */}
              <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-white/5 flex flex-col">
                <h4 className="text-sm font-semibold text-brand-lavender uppercase tracking-widest mb-8">Category Breakdown</h4>
                
                <div className="space-y-8 flex-1 flex flex-col justify-center">
                  {categories.map((cat, idx) => {
                    const sevStatus = getSeverity(cat.score);
                    let color = "bg-brand-mint";
                    let textColor = "text-brand-mint";
                    if (sevStatus === "High") { color = "bg-red-400"; textColor = "text-red-400"; }
                    else if (sevStatus === "Medium") { color = "bg-amber-400"; textColor = "text-amber-400"; }

                    return (
                      <div className="group" key={idx}>
                        <div className="flex justify-between items-end mb-3">
                          <div>
                            <span className="text-white font-medium text-lg block mb-1">{cat.name}</span>
                            <span className="text-slate-400 text-xs">{cat.desc}</span>
                          </div>
                          <div className="text-right">
                            <span className={`${textColor} font-bold text-xl block`}>{cat.score}<span className="text-sm text-slate-500 font-normal">/100</span></span>
                            <span className={`${textColor} text-xs uppercase font-semibold tracking-wider`}>{sevStatus === "High" ? "Dangerous" : sevStatus === "Medium" ? "Moderate" : "Safe"}</span>
                          </div>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-brand-surface-elevated overflow-hidden border border-white/5">
                          <div 
                            className={`h-full ${color} rounded-full transition-all duration-1000 ease-out group-hover:brightness-125`}
                            style={{ width: `${Math.max(10, cat.score)}%`, filter: `drop-shadow(0 0 10px currentColor)` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
