"use client";

import { Button } from "../ui/button";
import { useRedirect } from "@/app/hooks/useRedirect";
import { useFormSubmit } from "@/app/hooks/useFormSubmit";
import SessionTimeoutModal from "../ui/SessionTimeoutModal";
import { useState } from "react";
function ConfirmBooking({ totalNights, bookingrange, bookingprice , propertyId }) {
  const token = localStorage.getItem("token");
 const { submitForm } = useFormSubmit();
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  const checkIn = new Date("2025-07-10");
  const checkOut = new Date("2025-07-14");
  const redirectTo = useRedirect();

  const createBooking = async (e) => {
     e.preventDefault();

    const formData=new FormData();
    formData.append('from',bookingrange?.from);
    formData.append('to',bookingrange?.to);
    formData.append('totalnights',totalNights);
    formData.append('bookingprice',bookingprice);
    formData.append('property',propertyId);
    formData.append('booking_status',1)
    await submitForm ({
      url:"/api/booking/create",
      formData,
      onSuccess:(result)=>{

      },
      onError:(error)=>{
        console.log(error)
        if (error === "Invalid token" || error === "Token expired") {
          setShowTimeoutModal(true);
        }
      }


    })
  
  };

  if (!token) {
    return (
      <Button
        type="button"
        className="w-full"
        onClick={() => redirectTo("/login")}>
        Sign In to Complete Booking
      </Button>
    );
  }

  return (
    <>
        <SessionTimeoutModal
            open={showTimeoutModal}
            onClose={() => setShowTimeoutModal(false)}
          />
    <section>
      <Button onClick={createBooking} className="w-full">
        Reserve
      </Button>
    </section>
    </>
  );
}

export default ConfirmBooking;
