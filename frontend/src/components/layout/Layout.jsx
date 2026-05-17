import React from 'react';
import { Navbar } from './Navbar';
import { BackgroundGlow } from '../effects/BackgroundGlow';

export function Layout({ children, currentPage, navigate }) {
  return (
    <div className="min-h-screen bg-brand-dark text-white relative selection:bg-brand-periwinkle/30 selection:text-brand-mint">
      <BackgroundGlow />
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main className="relative z-10 pt-32 pb-20 px-6 flex flex-col items-center">
        <div className="max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
