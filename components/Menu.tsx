'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

const menuItems = [
  {
    title: 'Overview',
    icon: '/overview.svg',
    url: '/overview',
    isActive: true,
  },
  {
    title: 'Transactions',
    icon: '/transactions.svg',
    url: '/transactions',
  },
  {
    title: 'Accounts',
    icon: '/accounts.svg',
    url: '#',
    items: [
      { title: 'NGN Accounts', url: '/accounts/ngn' },
      { title: 'USD Accounts', url: '/accounts/usd' },
      { title: 'EUR Accounts', url: '/accounts/eur' },
      { title: 'GBP Accounts', url: '/accounts/gbp' },
    ],
  },
  {
    title: 'Cards',
    icon: '/cards.svg',
    url: '#',
    items: [
      { title: 'Cards', url: '/cards/all-cards' },
      { title: 'Card Customers', url: '/cards/card-customers' },
      { title: 'Card Transactions', url: '/cards/card-transactions' },
    ],
  },
  {
    title: 'Customers',
    icon: '/customers.svg',
    url: '#',
    items: [
      { title: 'Verified', url: '/customers/verified' },
      { title: 'Unverified', url: '/customers/unverified' },
      { title: 'PND', url: '/customers/pnd' },
    ],
  },
  {
    title: 'Bill Payment',
    icon: '/bill.svg',
    url: '#',
    items: [],
  },
  {
    title: 'Crypto',
    icon: '/crypto.svg',
    url: '/crypto',
  },
  {
    title: 'Settings',
    icon: '/settings.svg',
    url: '#',
    items: [
      {title: 'Team', url: '/settings/team'},
      {title: 'Audit Log', url: '/settings/audit-log'},
      {title: 'Rate Configuration', url: '/settings/rate-configuration'},
      {title: 'Profile', url: '/settings/profile'},
      {title: 'General', url: '/settings/general'},
    ],
  },
];

const Menu = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  
  useEffect(() => {
    const activeMenu = menuItems.find((item) => {
      if (item.items && item.items.length > 0) {
        return pathname.startsWith(item.url === '#' ? `/${item.title.toLowerCase()}` : item.url);
      }
      return false;
    });
    if (activeMenu) {
      setOpenMenu(activeMenu.title);
    }
  }, [pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  return (
    <div className='h-[calc(130vh-10px)] shadow-[2px_0px_33.2px_rgba(78,76,76,0.1)]'>
      {menuItems.map((item) => {
        const hasChildren = item.items && item.items.length > 0;
        const isOpen = openMenu === item.title;
        const isActive =
          item.url !== '#' && pathname === item.url ||
          (hasChildren && pathname.startsWith(item.url === '#' ? `/${item.title.toLowerCase()}` : item.url));

        return (
          <div key={item.title}>
            <div
              className={`flex items-center justify-between px-8 py-0.5 mt-4 mb-5 cursor-pointer ${
                isActive
                  ? 'text-[#36C6F3] border-l-[5px] border-[#36C6F3]'
                  : 'text-[#8B9DA4] hover:text-[#36C6F3]'
              }`}
              onClick={() => hasChildren && toggleMenu(item.title)}
            >
              <Link href={item.url} className="flex my-3 items-center gap-3">
                <Image src={item.icon} alt={item.title} width={30} height={30} />
                <span className="text-[18px] font-medium">{item.title}</span>
              </Link>
              {hasChildren && (
                <span className="transition-transform duration-300 ease-in-out">
                  {isOpen ? (
                    <ChevronDown size={16} className="rotate-0" />
                  ) : (
                    <ChevronRight size={16} className="rotate-0" />
                  )}
                </span>
              )}
            </div>

            {hasChildren && (
              <div
                className={`ml-20 mt-1 space-y-3 border-l border-gray-300 pl-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.title}
                    href={subItem.url}
                    className={`block text-sm ${
                      pathname === subItem.url
                        ? 'text-[#36C6F3]'
                        : 'text-gray-500 hover:text-[#36C6F3]'
                    }`}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className='flex justify-center mt-5'>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Menu;