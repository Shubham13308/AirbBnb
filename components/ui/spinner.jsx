import { Loader2 } from 'lucide-react';
import React from 'react';

export default function Spinner({ size = 24, className = '' }) {
  return (
    <Loader2
      className={`animate-spin text-muted-foreground ${className}`}
      size={size}
    />
  );
}
