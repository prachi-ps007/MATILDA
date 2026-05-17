import React from 'react';

export function Card({ children, className = '', glow = false }) {
  return (
    <div className={`glass-panel rounded-3xl p-6 md:p-8 transition-all duration-500 ${glow ? 'glow-box-hover' : ''} ${className}`}>
      {children}
    </div>
  );
}
