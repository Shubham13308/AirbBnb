import NextImage from 'next/image';

export function Image({ src, alt, className, ...props }) {
  // Optional: you can add more custom logic here if needed
  if (!src || src.trim() === '') {
    // Optionally handle missing src here or in parent component
    return null;
  }

  return (
    <NextImage
      src={src}
      alt={alt || 'image'}
      className={className}
      {...props}
    />
  );
}
