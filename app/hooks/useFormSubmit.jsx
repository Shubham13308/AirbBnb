'use client';

import { toast } from 'sonner';

export function useFormSubmit({ onSessionExpired } = {}) {
  const submitForm = async ({ url, method = 'POST', formData, onSuccess, onError }) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const res = await fetch(url, {
        method,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          toast.error(result.message || 'Session expired. Please log in again.');
          onSessionExpired?.();
        } else {
          toast.error(result.error || 'Request failed');
        }
        onError?.(result);
      } else {
        toast.success(result.message || 'Success');
        onSuccess?.(result);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      onError?.(error);
    }
  };

  return { submitForm };
}
