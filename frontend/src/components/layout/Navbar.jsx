import React from 'react';
import { Button } from '../ui/Button';
import { Scale } from 'lucide-react';

export function Navbar({ currentPage, navigate }) {
  // If navigate is undefined (e.g. not passed for some reason), fallback safely
  const handleNav = (page) => {
    if (navigate) {
      navigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-6">
      <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between">
        <button onClick={() => handleNav('landing')} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shadow-[0_0_15px_rgba(200,182,255,0.5)] group-hover:scale-110 transition-transform">
            <Scale className="w-5 h-5 text-brand-mint" />
          </div>
          <span className="font-bold text-2xl tracking-wider text-white glow-text group-hover:text-brand-mint transition-colors">MATILDA</span>
        </button>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button 
            onClick={() => handleNav('landing')} 
            className={`transition-colors ${currentPage === 'landing' || currentPage === 'results' ? 'text-brand-mint font-semibold' : 'text-brand-lavender hover:text-white'}`}
          >
            Analysis Console
          </button>
          <button 
            onClick={() => handleNav('about')} 
            className={`transition-colors ${currentPage === 'about' ? 'text-brand-mint font-semibold' : 'text-brand-lavender hover:text-white'}`}
          >
            About & How it Works
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:flex py-2 px-4 text-sm" onClick={() => handleNav('landing')}>Back to Analysis</Button>
          <Button variant="primary" className="py-2 px-6 text-sm" onClick={() => handleNav('landing')}>Get Started</Button>
        </div>
      </div>
    </nav>
  );
}
