import React from 'react';
import { Card } from '../components/ui/Card';
import { ShieldAlert, Zap, FileSearch, Sparkles, Server, Target, Cpu, CheckCircle } from 'lucide-react';

export function AboutPage() {
  const steps = [
    { step: "Step 1", title: "Upload Document", desc: "Drag and drop your PDF, DOCX, or simply paste the raw contract text into MATILDA's secure environment." },
    { step: "Step 2", title: "AI Extracts Clauses", desc: "Our proprietary AI engine instantly scans the document to extract critical and predatory clauses hidden in legalese." },
    { step: "Step 3", title: "Risk Analysis", desc: "Each clause is analyzed against a vast database of corporate agreements to flag financial, legal, and privacy risks." },
    { step: "Step 4", title: "Consequence Simulation", desc: "MATILDA forecasts the real-world impact of signing the document, visualizing scenarios like early termination fees or data sales." },
    { step: "Step 5", title: "Final Dashboard", desc: "You receive a comprehensive, color-coded report with a final verdict and recommendations on what to renegotiate." }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
      {/* Hero Section */}
      <section className="text-center mb-20 mt-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-48 bg-brand-periwinkle/10 blur-[100px] -z-10 rounded-full" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white glow-text">
          About MATILDA
        </h1>
        <p className="text-xl md:text-2xl font-light text-brand-lavender max-w-3xl mx-auto leading-relaxed">
          The autonomous legal-tech intelligence platform designed to decode the fine print and expose hidden risks.
        </p>
      </section>

      {/* Product Vision & Explanation */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card glow className="p-8 group hover:-translate-y-2 transition-all duration-500">
          <div className="w-14 h-14 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6 border border-brand-periwinkle/20 group-hover:scale-110 transition-transform">
            <Target className="w-7 h-7 text-brand-mint" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">What MATILDA Does</h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            MATILDA bridges the gap between complex legal jargon and everyday understanding. By leveraging advanced natural language processing, MATILDA translates convoluted terms of service, NDAs, and employment contracts into plain English, empowering users to make informed decisions.
          </p>
        </Card>

        <Card glow className="p-8 group hover:-translate-y-2 transition-all duration-500">
          <div className="w-14 h-14 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6 border border-brand-periwinkle/20 group-hover:scale-110 transition-transform">
            <Cpu className="w-7 h-7 text-brand-periwinkle" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">AI-Powered Risk Analysis</h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            At the core of MATILDA is a high-speed inference engine that not only reads text but understands legal context. It automatically flags predatory clauses, assesses severity levels (Low, Medium, High), and categorizes risks across Privacy, Legal Liability, and Financial Exposure.
          </p>
        </Card>

        <Card glow className="p-8 group hover:-translate-y-2 transition-all duration-500">
          <div className="w-14 h-14 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6 border border-brand-periwinkle/20 group-hover:scale-110 transition-transform">
            <Zap className="w-7 h-7 text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Consequence Simulation</h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            Reading a contract is one thing; understanding its implications is another. MATILDA's Consequence Simulator dynamically generates real-world "what-if" scenarios based on the specific clauses you are about to sign, vividly visualizing the financial and legal fallout of a breach.
          </p>
        </Card>

        <Card glow className="p-8 group hover:-translate-y-2 transition-all duration-500">
          <div className="w-14 h-14 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6 border border-brand-periwinkle/20 group-hover:scale-110 transition-transform">
            <Sparkles className="w-7 h-7 text-red-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Vision & Architecture</h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            Built during a high-stakes hackathon, MATILDA aims to democratize legal intelligence. By utilizing a lightweight React + Tailwind frontend paired with a robust Python/Flask analysis backend, MATILDA delivers cinematic, instantaneous insights without compromising on technical rigor.
          </p>
        </Card>
      </section>

      {/* How It Works Section */}
      <section className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">How It Works</h2>
          <p className="text-brand-lavender">A seamless, five-step pipeline to total document transparency.</p>
        </div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary via-brand-periwinkle/50 to-transparent -translate-x-1/2" />
          
          <div className="space-y-12">
            {steps.map((item, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>
                
                {/* Center Node */}
                <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-brand-surface-elevated border-2 border-brand-periwinkle/50 shadow-[0_0_15px_rgba(200,182,255,0.3)] z-10 group-hover:scale-110 transition-transform group-hover:border-brand-mint group-hover:shadow-[0_0_20px_rgba(183,228,199,0.5)]">
                  <CheckCircle className="w-5 h-5 text-brand-lavender group-hover:text-brand-mint transition-colors" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                  <div className={`glass-panel p-6 rounded-2xl border-l-4 border-l-brand-periwinkle group-hover:border-l-brand-mint transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${idx % 2 === 0 ? 'md:ml-12' : 'md:mr-12'}`}>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-periwinkle group-hover:text-brand-mint mb-2 block">{item.step}</span>
                    <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
