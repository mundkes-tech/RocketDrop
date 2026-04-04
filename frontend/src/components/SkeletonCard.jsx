import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="rd-card overflow-hidden animate-pulse">
      <div className="h-52 bg-slate-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-slate-100" />
        <div className="h-3 w-1/2 rounded bg-slate-100" />
        <div className="h-9 w-full rounded-lg bg-slate-100" />
      </div>
    </div>
  );
};

export default SkeletonCard;
