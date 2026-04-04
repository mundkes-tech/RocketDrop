import React from 'react';

const SectionContainer = ({ title, subtitle, rightNode, className = '', children }) => {
  return (
    <section className={`py-12 md:py-16 ${className}`.trim()}>
      <div className="container">
        {(title || subtitle || rightNode) && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              {title && <h2 className="text-2xl md:text-3xl font-bold text-[#1E1B6A]">{title}</h2>}
              {subtitle && <p className="mt-2 text-sm md:text-base text-slate-500">{subtitle}</p>}
            </div>
            {rightNode}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
