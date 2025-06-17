import { Image } from '../ui/Image'; 


function ImageContainer({ mainImage, name }) {
  if (!mainImage || mainImage.trim() === '') {
    return (
      <section className='h-[300px] md:h-[500px] relative mt-8 bg-gray-100 flex items-center justify-center rounded'>
        <span className='text-gray-400'>No image available</span>
      </section>
    );
  }

  return (
    <section className='h-[300px] md:h-[500px] relative mt-8'>
      <Image
        src={mainImage}
        alt={name}
        fill
        sizes='100vw'
        className='object-cover rounded'
        priority
      />
    </section>
  );
}

export default ImageContainer;
