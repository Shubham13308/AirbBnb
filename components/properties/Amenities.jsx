import React from 'react';
import { LuFolderCheck } from 'react-icons/lu';
import Title from './Title';

const Amenities = ({ amenities }) => {
  // Fallback if no amenities provided
  if (!amenities || amenities.length === 0) {
    return (
      <div className='mt-4'>
        <Title text='What this place offers' />
        <p className='text-sm text-gray-500'>No amenities listed.</p>
      </div>
    );
  }

  return (
    <div className='mt-4'>
      <Title text='What this place offers' />
      <div className='grid md:grid-cols-2 gap-x-4'>
        {amenities.map((amenity, index) => (
          <div key={index} className='flex items-center gap-x-4 mb-2'>
            <LuFolderCheck className='h-6 w-6 text-primary' aria-hidden='true' />
            <span className='font-light text-sm capitalize'>
              {amenity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
