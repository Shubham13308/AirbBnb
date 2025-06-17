'use client';

import React, { useMemo, useEffect, Suspense, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from './redux/actions/propertyAction';

import CategoryList from "@/components/home/CategoryList";
import PropertiesContainer from '@/components/home/PropertiesContainer';
import LoadingCards from '@/components/card/LoadingCards';
import SessionTimeoutModal from '@/components/ui/SessionTimeoutModal';
import { useDecodedToken } from './hooks/useDecodedToken';
import { useFormSubmit } from './hooks/useFormSubmit';
import { categories } from '@/utils/categories';


export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const property = useSelector((state) => state ?.property?.properties || []);
  const loading= useSelector((state)=>state?.property?.loading)
  console.log("loading: ", loading);
  
 
    
 
  const error = useSelector((state) => state?.property?.error); 
  const user = useDecodedToken()
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  const { submitForm } = useFormSubmit({
    onSessionExpired: () => setShowTimeoutModal(true),
  });

  
  useEffect(() => {
    
    if (error === "Invalid token" || error === "Token expired") {

      setShowTimeoutModal(true);
    }
  }, [error]);

const matchedCategories = useMemo(() => {
  const propertyList = Array.isArray(property?.properties) ? property?.properties : [];
  const unique = [...new Set(propertyList.map((p) => p.category))];
  return categories.filter((cat) => unique.includes(cat.label));
}, [property]);




 
useEffect(() => {
  if (pathname === "/") {
    const category = searchParams.get("category") ?? "0";
    const search = searchParams.get("search") ?? "0";
    const country = searchParams.get("country") ?? "0";


    dispatch(fetchProperties(category, search, country));
  }
}, [pathname, searchParams, dispatch, user?.user_id]);

  
  return (
    <section>
      <CategoryList property={property?.properties} categories={matchedCategories} />

      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer property={property} loading={loading} />
      </Suspense>

      <SessionTimeoutModal
        open={showTimeoutModal}
        onClose={() => setShowTimeoutModal(false)}
      />
    </section>
  );
}
