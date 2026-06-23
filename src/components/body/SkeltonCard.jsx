import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="min-w-[280px] max-w-[320px] h-[340px] bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between animate-pulse">
      <div className="space-y-4">
        {/* Top Badges */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-16 bg-slate-200 rounded-full"></div>
          <div className="h-5 w-20 bg-slate-200 rounded-full"></div>
        </div>
        
        {/* Course & Semester Lines */}
        <div className="space-y-2 pt-2">
          <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
          <div className="h-6 w-full bg-slate-200 rounded-lg"></div>
        </div>
        
        {/* Metadata Lines */}
        <div className="space-y-2 pt-4">
          <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
          <div className="h-3 w-2/3 bg-slate-200 rounded"></div>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="h-10 w-full bg-slate-200 rounded-xl mt-4"></div>
    </div>
  );
};

export default SkeletonCard;
