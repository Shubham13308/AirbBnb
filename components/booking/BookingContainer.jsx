'use client';

import { useState } from 'react';
import BookingForm from './BookingForm';
import ConfirmBooking from './ConfirmBooking';

function BookingContainer({bookingrange ,propertyprice ,propertyId}) {
  const [bookingprice,setBookingPrice]=useState('')  


  if (!bookingrange || !bookingrange.from || !bookingrange.to) return null;
  if (bookingrange.to.getTime() === bookingrange.from.getTime()) return null;

  const totalNights = Math.round(
    (bookingrange.to - bookingrange.from) / (1000 * 60 * 60 * 24)
  );
  const onTotalChange=(newTotal)=>{
    setBookingPrice(newTotal)
  }


  return (
    <div className="w-full">
      <BookingForm totalNights={totalNights} propertyprice={propertyprice} onTotalChange={onTotalChange} />
      <ConfirmBooking totalNights={totalNights} bookingrange={bookingrange} bookingprice={bookingprice} propertyId={propertyId} />
    </div>
  );
}

export default BookingContainer;
