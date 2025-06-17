

import { serviceFees } from '@/utils/services';
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';

function BookingForm({  totalNights , propertyprice ,onTotalChange }) {
  
  const subTotal = propertyprice * totalNights;
  const { cleaning, service, tax } = serviceFees;
  const orderTotal = subTotal + cleaning + service + tax;
  
useEffect(() => {
    if (onTotalChange) {
      onTotalChange(orderTotal);
    }
  }, [orderTotal, onTotalChange]);
  return (
    <Card className='p-8 mb-4 w-full'>
      <CardTitle className='mb-8'>Summary</CardTitle>
      <FormRow label={`$${propertyprice} x ${totalNights} nights`} amount={subTotal} />
      <FormRow label='Cleaning Fee' amount={cleaning} />
      <FormRow label='Service Fee' amount={service} />
      <FormRow label='Tax' amount={tax} />
      <Separator className='mt-4' />
      <div className='mt-8'>
        <FormRow label='Booking Total' amount={orderTotal} />
      </div>
    </Card>
  );
}

function FormRow({ label, amount }) {
  return (
    <p className='flex justify-between text-sm mb-2'>
      <span>{label}</span>
      <span>${amount.toFixed(2)}</span>
    </p>
  );
}

export default BookingForm;
