import { FaStar } from 'react-icons/fa';

function PropertyRating({ inPage, property }) {
  const rating = property?.averageRating ?? 0;
  const count = property?.reviewsCount ?? 0;

  const className = `flex gap-1 items-center ${inPage ? 'text-md' : 'text-xs'}`;
  const countText = count === 1 ? 'review' : 'reviews';
  const countValue = count > 0 ? `(${count}) ${inPage ? countText : ''}` : '';

  
let starColor = 'text-gray-500'; 

if (rating === 5) {
  starColor = 'text-green-500';
} else if (rating > 3 && rating < 5) {
  starColor = 'text-yellow-500';
} else if (rating > 2 && rating <= 3) {
  starColor = 'text-orange-500';
} else if (rating > 0 && rating <= 2) {
  starColor = 'text-red-500';
}


  return (
    <span className={className}>
      {starColor && <FaStar className={`w-3 h-3 ${starColor}`} />}
      <span>{rating.toFixed(1)}</span>
      {countValue && <span className="ml-1 text-gray-600">{countValue}</span>}
    </span>
  );
}

export default PropertyRating;
