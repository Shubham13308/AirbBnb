'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { LuShare2, LuClipboardCheck } from 'react-icons/lu';
import { useState } from 'react';

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from 'react-share';

function ShareButton({ propertyId, name }) {
  const [copied, setCopied] = useState(false);

  const shareLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}/properties/${propertyId}`
      : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); 
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon' className='p-2'>
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='end'
        sideOffset={10}
        className='flex items-center gap-x-2 justify-center w-full'
      >
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton url={shareLink} subject={`Check out ${name}`}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        <Button
          onClick={handleCopy}
          size='icon'
          variant='outline'
          className='p-2'
          title='Copy link'
        >
          <LuClipboardCheck className={copied ? 'text-green-600' : ''} />
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default ShareButton;
