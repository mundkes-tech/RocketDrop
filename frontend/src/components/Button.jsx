import React from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-[#F2D3A3] text-[#1E1B6A] hover:bg-[#ebc58b] hover:scale-[1.03] hover:brightness-105 hover:shadow-xl focus:ring-[#F2D3A3]/60 font-bold',
  secondary:
    'border-2 border-[#1E1B6A] text-[#1E1B6A] bg-white hover:bg-[#1E1B6A] hover:text-white focus:ring-[#1E1B6A]/40',
  dark:
    'bg-[#1E1B6A] text-white hover:bg-[#1a1a9e] focus:ring-[#1E1B6A]/50 shadow-lg',
  ghost:
    'text-[#1E1B6A] hover:bg-[#F2D3A3]/20 focus:ring-[#1E1B6A]/25',
  outline:
    'border-2 border-white text-white hover:bg-white hover:text-[#1E1B6A] focus:ring-white/40 font-semibold shadow-md',
  gradient:
    'bg-gradient-to-r from-[#F2D3A3] to-[#ebc58b] text-[#1E1B6A] hover:from-[#ebc58b] hover:to-[#deb578] hover:scale-[1.03] shadow-lg font-bold focus:ring-[#F2D3A3]/60',
};

const Button = ({ as: Component = 'button', className = '', variant = 'primary', type = 'button', ...props }) => {
  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={`${base} ${variants[variant] || variants.primary} ${className}`.trim()}
      {...props}
    />
  );
};

export default Button;
