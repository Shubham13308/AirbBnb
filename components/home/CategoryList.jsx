'use client';

import React, { useMemo, useState } from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { fetchProperties } from '@/app/redux/actions/propertyAction';
import { MdOutlineDensitySmall } from 'react-icons/md';
import { formattedCountries } from '@/utils/countries';

const CategoryList = ({ categories = [], selectedCategory = '' }) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const properties = useSelector((state) => state ?.property?.properties?.properties || []);
  
 
  const handleSubmit = () => {
    const category = searchParams.get("category") ?? "0";
    const search = searchParams.get("search") ?? "0";
    dispatch(fetchProperties(category, search));
  };

 
  const handleCategoryClick = (label) => {
    
    setActiveCategory(label);
    const country = searchParams.get("country") ?? "0";
    const search = searchParams.get("search") ?? "0";
    dispatch(fetchProperties(label, search,country));
  };

 
  const uniquecountry = useMemo(() => {
    const unique = [...new Set(properties.map((c) => c.country))];
    return formattedCountries.filter((cat) => unique.includes(cat.label));
  }, [properties]);
    
    

  return (
    <section className="w-full">
      {/* Country Dropdown */}
      <div className="flex items-center justify-start px-4 pb-2">
        <label htmlFor="country" className="mr-2 text-sm font-medium">
          Country:
        </label>
        <select
          id="country"
          className="border border-border rounded px-3 py-1 text-sm shadow-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"

          onChange={(e) => {
            const selectedCountry = e.target.value;
            const category = searchParams.get("category") ?? "0";
            const search = searchParams.get("search")?? "0"
            dispatch(fetchProperties(category, search,selectedCountry));
          }}
        >
          <option value="0">All</option>
          {uniquecountry.map((country) => (
            <option key={country.code} value={country.label}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>
      </div>

     
      <ScrollArea className="py-6 h-full">
        <div className="flex gap-x-4 px-4 h-full items-center">
          <article className="p-3 flex flex-col items-center cursor-pointer duration-300 w-[100px] hover:text-primary">
            <button onClick={handleSubmit}>
              <MdOutlineDensitySmall className="w-6 h-6 mb-1" />
              All
            </button>
          </article>

          {categories.map((item) => {
            const isActive = item.label === activeCategory;

            return (
              <article
                key={item.label}
                onClick={() => handleCategoryClick(item.label)}
                className={`p-3 flex flex-col items-center cursor-pointer duration-300 w-[100px] hover:text-primary ${
                  isActive
                    ? 'text-primary shadow-[0_0_15px_rgba(255,115,0,0.6)] rounded-xl bg-orange-50'
                    : 'text-muted-foreground'
                }`}
              >
                <item.icon className="w-8 h-8" />
                <p className="capitalize text-sm mt-1">{item.label}</p>
              </article>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default CategoryList;
