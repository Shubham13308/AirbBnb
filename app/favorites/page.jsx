'use client'
import LoadingCards from '@/components/card/LoadingCards';
import PropertiesContainer from '@/components/home/PropertiesContainer';
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux';

const page = () => {
      const propertyList = useSelector((state) => state?.property?.properties?.favourites
);
 
  return (
    <>
    
    <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer property={propertyList}/>
    </Suspense>
    </>
  )
}

export default page