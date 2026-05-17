import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer";
  
  const variants = {
    primary: "bg-brand-primary hover:bg-brand-periwinkle text-white shadow-[0_0_20px_rgba(54,5,104,0.6)] hover:shadow-[0_0_30px_rgba(157,132,255,0.8)] border border-brand-periwinkle/30",
    secondary: "glass-panel hover:bg-brand-surface-elevated text-brand-lavender hover:text-white",
    ghost: "text-brand-lavender hover:text-white hover:bg-brand-surface-elevated/50"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
