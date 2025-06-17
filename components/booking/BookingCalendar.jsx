'use client';

import { useEffect, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { eachDayOfInterval, format, isBefore, startOfDay } from 'date-fns';

function BookingCalendar({ range, setRange, bookingDetails }) {
  const currentDate = startOfDay(new Date()); // normalize to start of day to avoid time issues

  const blockedDates = useMemo(() => {
    if (!bookingDetails || !Array.isArray(bookingDetails)) return [];

    return bookingDetails.flatMap(({ from, to }) => {
      const start = typeof from === 'string' ? new Date(from) : from;
      const end = typeof to === 'string' ? new Date(to) : to;
      return eachDayOfInterval({ start, end });
    });
  }, [bookingDetails]);

  useEffect(() => {
    if (!range?.from || !range?.to) return;

    const selectedDates = eachDayOfInterval({ start: range.from, end: range.to });

    const hasConflict = selectedDates.some(
      (date) =>
        isBefore(startOfDay(date), currentDate) || // check if date is before today
        blockedDates.some(
          (d) => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        )
    );

    if (hasConflict) {
      setRange(undefined);
    }
  }, [range, setRange, blockedDates, currentDate]);

  const isDateBlocked = (date) => {
    const normalizedDate = startOfDay(date);
    return (
      isBefore(normalizedDate, currentDate) || 
      blockedDates.some(
        (d) => format(d, 'yyyy-MM-dd') === format(normalizedDate, 'yyyy-MM-dd')
      )
    );
  };

  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      disabled={isDateBlocked}
    />
  );
}

export default BookingCalendar;
