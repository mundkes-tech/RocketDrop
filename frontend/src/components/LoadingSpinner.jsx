import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ size = 40, message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader size={size} className="animate-spin text-[#1E1B6A] mb-4" />
      <p className="text-slate-500">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
