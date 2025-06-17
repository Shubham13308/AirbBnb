'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Title from './Title';
import {
  isDescriptionLong,
  getTrimmedDescription,
} from '@/utils/textHelpers'; 

const Description = ({description = ''}) => {
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);

 

  const long = isDescriptionLong(description);
  const displayedDescription =
    long && !isFullDescriptionShown
      ? getTrimmedDescription(description)
      : description;

  const toggleDescription = () =>
    setIsFullDescriptionShown((prev) => !prev);

  return (
    <article className='mt-4'>
      <Title text='Description' />
      <p className='text-muted-foreground font-light leading-loose'>
        {displayedDescription}
      </p>
      {long && (
        <Button variant='link' className='pl-0' onClick={toggleDescription}>
          {isFullDescriptionShown ? 'Show less' : 'Show more'}
        </Button>
      )}
    </article>
  );
};

export default Description;
