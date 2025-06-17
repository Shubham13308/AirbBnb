'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ named import

export function useDecodedToken() {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    if (!token) {
      setDecodedToken(null);
      return;
    }

    try {
      const decoded = jwtDecode(token); 
      setDecodedToken(decoded);
    } catch (err) {
      console.error('Invalid token:', err.message);
      setDecodedToken(null);
    }
  }, []);

  return decodedToken;
}
