import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const LeftSection = () => {
  return (
    <div className='bg-white flex flex-col items-center justify-center w-full md:w-1/4 p-8 text-black border-r border-b border-gray-200 shadow-sm md:rounded-br-2xl min-h-[300px] md:min-h-0'>
      <TypeAnimation
        sequence={[
          '',
          1000,
          'Welcome!',
          1000,
        ]}
        speed={200}
        className="text-center text-5xl font-black text-slate-800 tracking-tight whitespace-pre-line mb-4"
      />
      <TypeAnimation
        sequence={[
          '',
          1000,
          'Skip the stress. \n\nGrab past papers for any semester, whenever you need them.',
          1000,
        ]}
        speed={50}
        className="text-lg font-medium text-slate-500 text-center whitespace-pre-line leading-relaxed"
      />
    </div>
  );
};

export default LeftSection;