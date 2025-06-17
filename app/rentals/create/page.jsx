"use client";

import React, { useState } from "react";
import AmenitiesInput from "@/components/form/AmenitiesInput";
import CategoriesInput from "@/components/form/CategoriesInput";
import CounterInput from "@/components/form/CounterInput";
import CountriesInput from "@/components/form/CountriesInput";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { categories } from "@/utils/categories";
import { useFormSubmit } from "@/app/hooks/useFormSubmit";
import { useSelector } from 'react-redux';
import Loader from "@/components/ui/Loader";
import { useRedirect } from "@/app/hooks/useRedirect";
import SessionTimeoutModal from "@/components/ui/SessionTimeoutModal";
const CreateProperty = () => {
    const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  
  const [formValues, setFormValues] = useState({
    name: "",
    tagline: "",
    price: "",
    category: categories[0].label,
    country: "",
    image: null,
    guest: 0,
    bedrooms: 0,
    beds: 0,
    baths: 0,
    description: "",
    amenities: [],
  });
  const user = useSelector((state) => state?.user?.user || null);
  const redirectTo= useRedirect()
  const { submitForm } = useFormSubmit();
  const [loader, setLoader] = useState(false);
  
  const handleChange = (eOrData) => {
    if (
      eOrData &&
      typeof eOrData === "object" &&
      "name" in eOrData &&
      "value" in eOrData
    ) {
      const { name, value } = eOrData;
      setFormValues((prev) => {
        if (prev[name] === value) return prev;
        return { ...prev, [name]: value };
      });
    } else if (eOrData?.target) {
      const { name, value, files } = eOrData.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("tagline", formValues.tagline);
      formData.append("price", formValues.price);
      formData.append("category", formValues.category);
      formData.append("country", formValues.country);
      formData.append("image", formValues.image);
      formData.append("guest", formValues.guest.toString());
      formData.append("bedrooms", formValues.bedrooms.toString());
      formData.append("beds", formValues.beds.toString());
      formData.append("baths", formValues.baths.toString());
      formData.append("description", formValues.description);
      formData.append("amenities", JSON.stringify(formValues.amenities));
      formData.append("user_id",user?.user_id || "")
      
    
      await submitForm({
        url: "/api/property/create",
        formData,
        onSuccess: (result) => {
          if (result.status === 200) {
            
            redirectTo('/')
          }
        },
          onError: (errorResponse) => {
            if(errorResponse?.message === "Invalid token"){
               setShowTimeoutModal(true);
            }
        
       
      }
      });
      setLoader(false);
    } catch {
      console.log("error",);
      setLoader(false);
    } finally {
      setLoader(false);
    }
    
  };

  return (
    <section>
        <SessionTimeoutModal
              open={showTimeoutModal}
              onClose={() => setShowTimeoutModal(false)}
            />
      {loader === true ? <Loader/> :
      <>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Create Property
      </h1>
      <div className="border p-8 rounded-md">
        <h3 className="text-lg mb-4 font-medium">General Info</h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Name (20 limit)"
              value={formValues.name}
              onChange={handleChange}
            />
            <FormInput
              name="tagline"
              type="text"
              label="Tagline (30 limit)"
              value={formValues.tagline}
              onChange={handleChange}
            />
            <PriceInput
              value={formValues.price}
              onChange={(e) => handleChange(e)}
            />
            <CategoriesInput
              value={formValues.category}
              onChange={(val) => handleChange({ name: "category", value: val })}
            />
          </div>

          <TextAreaInput
            name="description"
            labelText="Description (10-100 words)"
            value={formValues.description}
            onChange={handleChange}
          />

          <div className="grid sm:grid-cols-2 gap-8 mt-4">
            <CountriesInput
              value={formValues.country}
              onChange={handleChange}
            />

            <ImageInput name="image" onChange={handleChange} />
          </div>

          <h3 className="text-lg mt-8 mb-4 font-medium">
            Accommodation Details
          </h3>
          <CounterInput
            detail="guest"
            value={formValues.guest}
            onChange={handleChange}
          />
          <CounterInput
            detail="bedrooms"
            value={formValues.bedrooms}
            onChange={handleChange}
          />
          <CounterInput
            detail="beds"
            value={formValues.beds}
            onChange={handleChange}
          />
          <CounterInput
            detail="baths"
            value={formValues.baths}
            onChange={handleChange}
          />

          <h3 className="text-lg mt-10 mb-6 font-medium">Amenities</h3>
          <AmenitiesInput
            value={formValues.amenities}
            onChange={handleChange}
          />

          <div className="pt-6">
            <button
              type="submit"
              className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
              Create Rental
            </button>
          </div>
        </form>
      </div>
      </> 
      }
      
      
    </section>
  );
};

export default CreateProperty;
