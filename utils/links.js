import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const links = [
  { href: '/', label: 'home' },
  { href: '/favorites', label: 'favorites' },
  { href: '/bookings', label: 'bookings' },
  { href: '/reviews', label: 'reviews' },
  { href: '/rentals/create', label: 'create rental' },
  { href: '/rentals', label: 'my rentals' },
 
  { href: '/profile', label: 'profile' },
];

export const authlinks=[
{href:'/login', label :'login'},
{href:'/signup', label:'signup'}
]
