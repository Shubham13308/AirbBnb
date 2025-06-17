'use client';

import { useEffect, useState } from 'react';
import { useFormSubmit } from '../hooks/useFormSubmit';
import Link from 'next/link';
import EmptyList from '@/components/home/EmptyList';
import CountryFlagAndName from '@/components/card/CountryFlagandName';
import DeleteBooking from '@/components/booking/DeleteBooking';
import { formatDate, formatCurrency } from '@/utils/format';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function BookingsPage() {
  const { submitForm } = useFormSubmit();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append('booking', 1);

      await submitForm({
        url: '/api/booking/fetch',
        formData,
        onSuccess: (result) => {
          if (result.status === 200) {
            setBookings(result.data);
          }
          setLoading(false);
        },
        onError: (error) => {
          console.error('Failed to fetch bookings', error);
          setLoading(false);
        },
      });
    };

    fetchBookings();
  }, []);

  const activeBookings = bookings.filter((b) => b.booking_status === '1');
  const expiredBookings = bookings.filter((b) => b.booking_status === '0');

  const getTotal = (list) =>
    list.reduce((sum, b) => sum + parseFloat(b?.booking_price || 0), 0);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (bookings.length === 0) return <EmptyList />;

  return (
    <div className="mt-16 space-y-12">
      {expiredBookings.length > 0 && (
        <div>
          <h4 className="mb-4 text-red-600 font-semibold text-xl">
            Expired Bookings: {expiredBookings.length}
          </h4>
          <BookingTable bookings={expiredBookings} disabled />
          <div className="mt-2 text-right font-semibold text-red-600">
            Total: {formatCurrency(getTotal(expiredBookings))}
          </div>
        </div>
      )}
      {activeBookings.length > 0 && (
        <div>
          <h4 className="mb-4 text-green-700 font-semibold text-xl">
            Active Bookings: {activeBookings.length}
          </h4>
          <BookingTable bookings={activeBookings} />
          <div className="mt-2 text-right font-semibold text-green-700">
            Total: {formatCurrency(getTotal(activeBookings))}
          </div>
        </div>
      )}
    </div>
  );
}

function BookingTable({ bookings, disabled = false }) {
  return (
    <Table>
      <TableCaption>
        {disabled ? 'Expired bookings (read-only)' : 'A list of your active bookings'}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Property Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Nights</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Check Out</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => {
          const property = booking?.propertyDetails?.[0];
          const propertyName = property?.property_name ?? 'N/A';
          const propertyCountry = property?.country ?? 'IN';
          const propertyId = property?.property_id;

          return (
            <TableRow key={booking._id}>
              <TableCell>
                <Link
                  href={`/properties/${propertyId}`}
                  className={`underline tracking-wide ${
                    disabled ? 'text-gray-400' : 'text-muted-foreground'
                  }`}
                >
                  {propertyName}
                </Link>
              </TableCell>
              <TableCell>
                <CountryFlagAndName countryCode={propertyCountry} />
              </TableCell>
              <TableCell>{booking?.totalnight}</TableCell>
              <TableCell>{formatCurrency(booking?.booking_price)}</TableCell>
              <TableCell>{formatDate(booking?.from)}</TableCell>
              <TableCell>{formatDate(booking?.to)}</TableCell>
              <TableCell>
                <DeleteBooking bookingId={booking.booking_id} disabled={disabled} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default BookingsPage;
