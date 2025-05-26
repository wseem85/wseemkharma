import React from 'react';

const BarsSeperator = ({ color = 'bg-red-ground' }: { color: string }) => {
  return (
    <div className="flex items-center gap-2 mt-4 sm:mt-5 mb-4  xs:flex">
      {/* Main bars */}
      <div className={`h-5 w-[3px] ${color} opacity-90`} />
      <div className={`h-4 w-[3px] ${color} opacity-80`} />
      <div className={`h-3 w-[3px] ${color} opacity-70`} />
      <div className={`h-2 w-[3px] ${color} opacity-60`} />
      <div className={`h-1 w-[3px] ${color} opacity-50`} />

      {/* Small bars - hidden on lg, shown on xl */}
      <div className="hidden lg:hidden xl:flex items-center gap-2">
        <div className={`h-[3px] w-[3px] ${color} opacity-30`} />
        <div className={`h-[2px] w-[3px] ${color} opacity-20`} />
        <div className={`h-[1px] w-[3px] ${color} opacity-10`} />
      </div>
    </div>
  );
};

export default BarsSeperator;
