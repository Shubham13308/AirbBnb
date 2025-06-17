'use client';

import { Button } from '@/components/ui/button';
import FormContainer from '@/components/form/FormContainer';
import { Trash2 } from 'lucide-react';
import { useFormSubmit } from '@/app/hooks/useFormSubmit';
function DeleteBooking({ bookingId, disabled }) {
  const {submitForm}=useFormSubmit();
  const handleDelete = async (e) => {
    const formData= new FormData();
    e.preventDefault();
    if (!disabled) {
      formData.append('booking',bookingId);
      await submitForm({
        url:"api/booking/delete",
        formData,
        onSuccess:(result)=>{
          if(result.status === 200){
            console.log(result);
          }
        },
        onError:(error)=>{
          console.error('Failed To Delete The Booking',error)

        }

      })

      
     
    }
  };

  return (
    <FormContainer>
      <Button
        variant={disabled ? 'outline' : 'destructive'}
        disabled={disabled}
        onClick={handleDelete}
        size="icon"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </FormContainer>
  );
}

export default DeleteBooking;
