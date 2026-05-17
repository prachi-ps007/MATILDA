import React from 'react';

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-primary/20 blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-periwinkle/10 blur-[150px] mix-blend-screen" />
      <div className="absolute top-[30%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-brand-mint/5 blur-[100px] mix-blend-screen" />
    </div>
  );
}
