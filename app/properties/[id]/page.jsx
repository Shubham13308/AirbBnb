"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFormSubmit } from "@/app/hooks/useFormSubmit";

import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import Description from "@/components/properties/Description";
import Amenities from "@/components/properties/Amenities";
import PropertyMap from "@/components/properties/PropertyMap";
import SubmitReview from "@/components/reviews/SubmitReview";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import BookingWrapper from "@/components/booking/BookingWrapper";

function PropertyDetailsPage() {
  const pathname = usePathname();
  const propertyId = pathname.split("/").pop();
  const { submitForm } = useFormSubmit();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appendReview, setAppendReview] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      await submitForm({
        url: `/api/property/${propertyId}`,
        method: "GET",
        onSuccess: (result) => {
          setProperty(result.data);
          setLoading(false);
        },
        onError: () => setLoading(false),
      });
    };

    fetchProperty();
  }, [propertyId]);


  
  return (
    <section>
      <BreadCrumbs name={property?.property_name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold capitalize">{property?.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton name={property?.property_name} propertyId={property?.property_id} />
        </div>
      </header>

      <ImageContainer
        mainImage={property?.image}
        name={property?.property_name}
      />

      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property?.property_name}</h1>
            <PropertyRating inPage={false} property={property} />
          </div>

          <PropertyDetails details={property} />
          <UserInfo user={property?.user} createdAt={property?.createdAt} />

          <Separator className="mt-4" />
          <Description description={property?.description} />
          <Amenities amenities={property?.amenities} />

          <PropertyMap countryCode={property?.country} />
        </div>

        <div className="lg:col-span-4 flex flex-col items-center">

          <BookingWrapper propertyprice={property?.price} propertyId={property?.property_id} bookingDetails={property?.bookings}  />
        </div>
      </section>

      <div className="mt-8 p-4 border rounded text-gray-600">
        <SubmitReview
          propertyID={property?.property_id}
          setAppenData={(review) => setAppendReview(review)}
        />
      </div>

      <div className="mt-4 p-4 border rounded text-gray-600">
              <PropertyReviews reviews={property?.reviews} appendReview={appendReview}/>
      </div>
    </section>
  );
}

export default PropertyDetailsPage;
