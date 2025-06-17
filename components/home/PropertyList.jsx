'use client';

import { usePathname } from "next/navigation";
import PropertyCard from "../card/PropertyCard";

function PropertiesList({ properties }) {
  const pathname = usePathname();


  let dataToRender = [];

  if (pathname === "/") {
    dataToRender = properties?.properties || [];
  } else if (pathname === "/favorites") {

    dataToRender = properties?.map((fav)=>fav?.propertyDetails)
  }

  return (
    <section className="mt-4 gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.isArray(dataToRender) && dataToRender.length > 0 ? (
        dataToRender.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))
      ) : (
        <p className="text-gray-500 col-span-full">No properties found.</p>
      )}
    </section>
  );
}

export default PropertiesList;
