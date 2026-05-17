import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Upload, FileText, Sparkles, ShieldAlert, FileSearch, Languages, FileWarning } from 'lucide-react';

export function LandingPage({ onAnalyze, isLoading }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleAnalyzeClick = () => {
    if (!file && !text.trim()) {
      alert("Please upload a file or paste text to analyze.");
      return;
    }
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (text.trim()) formData.append("text", text);
    
    onAnalyze(formData);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-periwinkle/30 mb-8 cursor-default">
          <Sparkles className="w-4 h-4 text-brand-mint animate-pulse" />
          <span className="text-sm font-medium text-brand-lavender">Next-Gen Legal AI</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
          <span className="glow-text">MATILDA</span>
        </h1>
        
        <p className="text-2xl md:text-4xl font-light text-brand-lavender mb-6">
          Understand hidden risks before you accept.
        </p>
        
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          The futuristic AI assistant that dissects complex legal jargon into plain language. Upload your contracts and let MATILDA highlight exactly what you are agreeing to.
        </p>
      </section>

      {/* Upload Section */}
      <section id="upload" className="max-w-4xl w-full mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
        <Card glow className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px] -z-10" />
          
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-2xl font-semibold mb-2">Analyze Your Document</h2>
            <p className="text-brand-lavender text-sm">Upload a file or paste text from your contract.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
            {/* File Upload Zone */}
            <div 
              className="border-2 border-dashed border-brand-periwinkle/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-brand-surface-elevated/50 transition-colors cursor-pointer group"
              onClick={() => document.getElementById('file-upload').click()}
            >
              <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                accept=".pdf,.docx,.txt"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-brand-lavender group-hover:text-white" />
              </div>
              <p className="font-medium mb-1">
                {file ? file.name : "Drop PDF or DOCX here"}
              </p>
              <p className="text-xs text-brand-lavender mb-4">Max file size 50MB</p>
              <Button variant="secondary" className="py-2 text-sm w-full">Browse Files</Button>
            </div>

            {/* Paste Text Zone */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 glass-panel rounded-2xl p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-sm text-brand-lavender font-medium">
                  <FileText className="w-4 h-4" />
                  <span>Paste Text</span>
                </div>
                <textarea 
                  className="w-full flex-1 bg-transparent resize-none outline-none text-sm placeholder:text-slate-400" 
                  placeholder="Paste your contract text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-center relative z-10">
            <Button variant="primary" className="w-full md:w-auto md:px-12 py-4 text-lg group" onClick={handleAnalyzeClick} disabled={isLoading}>
              <FileSearch className={`w-5 h-5 ${isLoading ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
              {isLoading ? "Analyzing..." : "Analyze Document"}
            </Button>
          </div>
        </Card>
      </section>

      {/* Feature Preview Cards */}
      <section id="features" className="w-full mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Powered by Firefly</h2>
          <p className="text-brand-lavender max-w-2xl mx-auto">Advanced artificial intelligence working to decode the fine print.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:-translate-y-2 group cursor-default">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
              <ShieldAlert className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Risk Score</h3>
            <p className="text-brand-lavender text-sm leading-relaxed">
              Instantly gauge the danger level of any contract. MATILDA scores documents based on predatory clauses, hidden fees, and unfavorable terms.
            </p>
          </Card>

          <Card className="hover:-translate-y-2 group cursor-default">
            <div className="w-12 h-12 rounded-full bg-brand-mint/10 flex items-center justify-center mb-6 group-hover:bg-brand-mint/20 transition-colors">
              <FileWarning className="w-6 h-6 text-brand-mint" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Consequence Simulator</h3>
            <p className="text-brand-lavender text-sm leading-relaxed">
              Play out "what-if" scenarios. Understand exactly what happens financially and legally if you breach the agreement or miss a deadline.
            </p>
          </Card>

          <Card className="hover:-translate-y-2 group cursor-default">
            <div className="w-12 h-12 rounded-full bg-brand-periwinkle/10 flex items-center justify-center mb-6 group-hover:bg-brand-periwinkle/20 transition-colors">
              <Languages className="w-6 h-6 text-brand-periwinkle" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Human Translation</h3>
            <p className="text-brand-lavender text-sm leading-relaxed">
              Say goodbye to legalese. We translate complex, convoluted paragraphs into simple, everyday language that anyone can understand.
            </p>
          </Card>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="max-w-3xl mx-auto mb-12 animate-in fade-in duration-1000 delay-500 fill-mode-both">
        <div className="glass-panel bg-brand-surface-elevated/20 rounded-2xl p-6 text-center border-dashed border-brand-lavender/20">
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-brand-lavender">Legal Disclaimer:</span> MATILDA is an AI assistant designed to help you understand common legal concepts and identify potential risks in documents. It does not provide formal legal advice, representation, or guaranteed outcomes. Always consult with a qualified attorney for specific legal counsel.
          </p>
        </div>
      </section>
    </>
  );
}
