import React from 'react';

const styles = {
  accent: 'bg-[#F2D3A3] text-[#1E1B6A] border-[#ebc58b] font-bold',
  live: 'bg-[#F2D3A3] text-[#1E1B6A] border-[#ebc58b] font-bold',
  upcoming: 'bg-white text-[#64748B] border-[#E5E7EB]',
  soldout: 'bg-slate-100 text-slate-600 border-slate-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
};

const Badge = ({ variant = 'accent', className = '', children }) => {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide ${styles[variant] || styles.accent} ${className}`.trim()}>
      {children}
    </span>
  );
};

export default Badge;
