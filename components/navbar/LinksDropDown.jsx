'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu'
import { LuAlignLeft } from 'react-icons/lu'
import { Button } from '../ui/button'
import UserIcon from './UserIcon'
import { links, authlinks } from '@/utils/links'
import SignOutLink from './SignOutLink'
import Link from 'next/link'
import { useDecodedToken } from '@/app/hooks/useDecodedToken'

const LinksDropDown = () => {
  const user = useDecodedToken()

  const isAuthenticated = !!user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon image={user?.image} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='start' sideOffset={10}>
        {(isAuthenticated ? links : authlinks).map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href} className='capitalize w-full'>
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}

        {isAuthenticated && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <SignOutLink />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropDown
