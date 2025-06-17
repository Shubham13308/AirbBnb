'use client';

import { useEffect, useState } from 'react';
import BookingCalendar from './BookingCalendar';
import BookingContainer from './BookingContainer';
import { addDays } from 'date-fns';

export default function BookingWrapper({ propertyprice, propertyId ,bookingDetails}) {
  
  const currentDate = new Date();

  const [range, setRange] = useState({
    from: addDays(currentDate, 1),
    to: addDays(currentDate, 3),
  });



  return (
    <>
      <BookingCalendar range={range} setRange={setRange} bookingDetails={bookingDetails} />
      <BookingContainer bookingrange={range} propertyprice={propertyprice} propertyId={propertyId} />
    </>
  );
}
