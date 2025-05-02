'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fetchAdminProfile } from '@/lib/api';
import { AdminProfile } from '@/types/types';
import signOut from '@/public/signout-btn.png';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentPath = pathname.split('/').pop() || '';

  // State for user profile
  const [user, setUser] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile on mount
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userData = await fetchAdminProfile();
        setUser(userData);
        setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load user profile');
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

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
    'audit-log': 'Logs',
    'rate-configuration': 'Rate Configurations',
  };

  const displayTitle = pathTitles[currentPath] || currentPath.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Check if we're on the Single Card Transactions page
  const isSingleCardTransactions = pathname.startsWith('/cards/all-cards/') && currentPath !== 'all-cards';

  return (
    <div className='flex justify-between items-center h-[117px] md:px-14 px-4'>
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
        <div className='font-semibold text-[#A0B6C0] md:block hidden'>{displayTitle}</div>
      </div>
      {/* Admin Profile */}
      <div className='flex items-center gap-3.5'>
        {loading ? (
          <div className="flex items-center gap-3 border-[1px] border-[#D9D9D9] px-4 py-2 rounded-[6px]">
            <div className="w-[30px] h-[30px] bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : error || !user ? (
          <div className="flex items-center gap-3 border-[1px] border-[#D9D9D9] px-4 py-2 rounded-[6px]">
            <div className="w-[30px] h-[30px] bg-gray-200 rounded-full"></div>
            <h3 className="font-medium text-[16px] text-[#8B9DA4]">Error</h3>
          </div>
        ) : (
          <div className='flex items-center gap-3 border-[1px] border-[#D9D9D9] px-4 py-2 rounded-[6px]'>
            <Image
              src={user.image || '/default-profile.png'}
              alt='profile picture'
              width={30}
              height={30}
              className='cursor-pointer rounded-full'
            />
            <h3 className='font-medium text-[16px] text-[#8B9DA4]'>{user.name}</h3>
          </div>
        )}
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