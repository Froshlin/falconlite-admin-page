'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import profile from '@/public/admin-profile.png';
import signOut from '@/public/signout-btn.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentPath = pathname.split('/').pop() || '';

  // Defining path titles
  interface pathTitles {
    [key: string]: string;
  }

  // Map paths to custom titles
  const pathTitles: pathTitles = {
    'overview': 'Admin Overview',
    'ngn': 'NGN Accounts',
    'usd': 'USD Accounts',
    'eur': 'EUR Accounts',
    'gbp': 'GBP Accounts',
    'all-cards': 'All Cards',
    'hvaf4e-42bhb522-bibib-ei773c': 'Single Card Transactions',
    'card-customers': 'Card Customers',
    'card-transactions': 'Card Transactions',
    'verified': 'Verified Customers',
    'unverified': 'Unverified Customers',
    'pnd': 'PND Customers',
  };

  const displayTitle = pathTitles[currentPath] || currentPath.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Check if we're on the Single Card Transactions page
  const isSingleCardTransactions = pathname.startsWith('/cards/all-cards/') && currentPath !== 'all-cards';

  return (
    <div className='flex justify-between items-center h-[117px] px-14'>
      {/* Path Title with Back Button */}
      <div className='flex items-center gap-1'>
        {isSingleCardTransactions && (
          <button
            onClick={() => router.back()}
            className="text-[#6B7280] flex items-center gap-1 mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <div className='font-semibold text-[#A0B6C0]'>{displayTitle}</div>
      </div>
      {/* Admin Profile */}
      <div className='flex items-center gap-3.5'>
        <div className='flex items-center gap-3 border-[1px] border-[#D9D9D9] px-4 py-2 rounded-[6px]'>
          <Image src={profile} alt='profile picture' width={30} height={30} className='cursor-pointer'/>
          <h3 className='font-medium text-[16px] text-[#8B9DA4]'>Jerry Omonefe</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image src={signOut} alt='sign out' width={40} height={40} className='cursor-pointer'/>
          </DropdownMenuTrigger>
          <DropdownMenuSeparator/>
          <DropdownMenuContent className="w-48 transition-all duration-200 ease-in-out transform origin-top-right scale-95 opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 z-1200"
            align="end">
            <DropdownMenuItem className='cursor-pointer'>Return to account</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;