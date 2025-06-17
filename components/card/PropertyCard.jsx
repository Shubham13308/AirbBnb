import Image from "next/image";
import Link from "next/link";

import CountryFlagAndName from "./CountryFlagandName";
import PropertyRating from "./PropertyRating";
import FavoriteToggleButton from "./FavoriteToggleButton";
import { formatCurrency } from "@/utils/format";

function PropertyCard({ property }) {
  return (
    <article className="group relative">
      <div className="relative h-[300px] mb-2 overflow-hidden rounded-md">
        <Link href={`/properties/${property?.property_id}`}>
          <Image
            src={property?.image}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            alt={name}
            className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold mt-1">
          {property?.property_name}
        </h3>
        <PropertyRating inPage={false} property={property} />
      </div>

      <p className="text-sm mt-1 text-muted-foreground">
        {property?.tagline.substring(0, 40)}
      </p>

      <div className="flex justify-between items-center mt-1">
        <p className="text-sm mt-1">
          <span className="font-semibold">
            {formatCurrency(property?.price)}{" "}
          </span>
        </p>
        <CountryFlagAndName countryCode={property?.country} />
      </div>

      <div className="absolute top-5 right-5 z-5">
        <FavoriteToggleButton propertyId={property?.property_id} />
      </div>
    </article>
  );
}

export default PropertyCard;
