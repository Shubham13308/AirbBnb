'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

const initialState = {
  message: '',
};

function FormContainer({ action, children }) {
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast.error(state.message); 
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
}

export default FormContainer;
