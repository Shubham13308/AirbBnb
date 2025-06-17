import { formatQuantity } from '@/utils/format';

function PropertyDetails({ details }) {
  // const { bedrooms, baths, guests, beds } = details;

  

  return (
    <p className='text-md font-light'>
      <span>{formatQuantity(details?.bedrooms, 'bedroom')} &middot;</span>{' '}
      <span>{formatQuantity(details?.baths, 'bath')} &middot;</span>{' '}
      <span>{formatQuantity(details?.guest, 'guest')} &middot;</span>{' '}
      <span>{formatQuantity(details?.beds, 'bed')}</span>
    </p>
  );
}

export default PropertyDetails;
