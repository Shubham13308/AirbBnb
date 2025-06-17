'use client';
// import { TbReload } from 'react-icons/tb';
// import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2, LuPenSquare } from 'react-icons/lu';

// SubmitButton component
export function SubmitButton({ className = '', text = 'submit', size = 'lg' }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending}
      className={`capitalize ${className}`}
      size={size}
    >
      {pending ? (
        <>
          {/* <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> */}
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

// CardSignInButton component
export const CardSignInButton = () => {
  return (

      <Button
        type='button'
        size='icon'
        variant='outline'
        className='p-2 cursor-pointer'
        asChild
      >
        <FaRegHeart />
      </Button>

  );
};

// CardSubmitButton component
export const CardSubmitButton = ({ isFavorite }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className='p-2 cursor-pointer'
    >
      {pending ? (
        <ReloadIcon className='animate-spin' />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

// IconButton component
export const IconButton = ({ actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        // return <LuPenSquare />;
      case 'delete':
        // return <LuTrash2 />;
      default:
        return null;
    }
  };

  return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer'
    >
      {pending ? <ReloadIcon className='animate-spin' /> : renderIcon()}
    </Button>
  );
};
