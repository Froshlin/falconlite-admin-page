'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faSquarePollVertical,
  faCreditCard,
  faAddressCard,
  faReceipt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeToggle } from './ThemeToggle';
import { MenuItem, SubMenuItem } from '@/types/types';

const OverviewKeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={38}
    viewBox="0 0 24 24"
  >
    <path
      fill={props.fill}
      d="M3 19q-.825 0-1.412-.587T1 17V7q0-.825.588-1.412T3 5h10q.825 0 1.413.588T15 7v10q0 .825-.587 1.413T13 19zm15 0q-.425 0-.712-.288T17 18V6q0-.425.288-.712T18 5t.713.288T19 6v12q0 .425-.288.713T18 19m4 0q-.425 0-.712-.288T21 18V6q0-.425.288-.712T22 5t.713.288T23 6v12q0 .425-.288.713T22 19"
    />
  </svg>
);

const SettingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={38}
    height={38}
    viewBox="0 0 24 24"
  >
    <path 
      fill={props.fill} 
      d="M7.5 13.75v.5q0 .325.213.538T8.25 15t.538-.213T9 14.25v-2.5q0-.325-.213-.537T8.25 11t-.537.213t-.213.537v.5h-.75q-.325 0-.537.213T6 13t.213.538t.537.212zm3.25 0h6.5q.325 0 .538-.213T18 13t-.213-.537t-.537-.213h-6.5q-.325 0-.537.213T10 13t.213.538t.537.212m5.75-4h.75q.325 0 .538-.213T18 9t-.213-.537t-.537-.213h-.75v-.5q0-.325-.213-.537T15.75 7t-.537.213T15 7.75v2.5q0 .325.213.538t.537.212t.538-.213t.212-.537zm-9.75 0h6.5q.325 0 .538-.213T14 9t-.213-.537t-.537-.213h-6.5q-.325 0-.537.213T6 9t.213.538t.537.212M4 19q-.825 0-1.412-.587T2 17V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v12q0 .825-.587 1.413T20 19h-4v1q0 .425-.288.713T15 21H9q-.425 0-.712-.288T8 20v-1z"
    />
  </svg>
);

const CryptoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={38}
    height={38}
    viewBox="0 0 24 24"
  >
    <path 
      fill={props.fill} 
      d="M12 11q3.75 0 6.375-1.175T21 7t-2.625-2.825T12 3T5.625 4.175T3 7t2.625 2.825T12 11m0 2.5q1.025 0 2.563-.213t2.962-.687t2.45-1.237T21 9.5V12q0 1.1-1.025 1.863t-2.45 1.237t-2.962.688T12 16t-2.562-.213t-2.963-.687t-2.45-1.237T3 12V9.5q0 1.1 1.025 1.863t2.45 1.237t2.963.688T12 13.5m0 5q1.025 0 2.563-.213t2.962-.687t2.45-1.237T21 14.5V17q0 1.1-1.025 1.863t-2.45 1.237t-2.962.688T12 21t-2.562-.213t-2.963-.687t-2.45-1.237T3 17v-2.5q0 1.1 1.025 1.863t2.45 1.237t2.963.688T12 18.5"
    />
  </svg>
);

const menuItems: MenuItem[] = [
  {
    title: 'Overview',
    icon: { type: 'inline-svg', component: OverviewKeyIcon },
    url: '/overview',
    isActive: true,
  },
  {
    title: 'Transactions',
    icon: { type: 'fontawesome', component: faSquarePollVertical },
    url: '/transactions',
  },
  {
    title: 'Accounts',
    icon: { type: 'fontawesome', component: faWallet },
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
    icon: { type: 'fontawesome', component: faCreditCard },
    url: '#',
    items: [
      { title: 'Cards', url: '/cards/all-cards' },
      { title: 'Card Customers', url: '/cards/card-customers' },
      { title: 'Card Transactions', url: '/cards/card-transactions' },
    ],
  },
  {
    title: 'Customers',
    icon: { type: 'fontawesome', component: faAddressCard },
    url: '#',
    items: [
      { title: 'Verified', url: '/customers/verified' },
      { title: 'Unverified', url: '/customers/unverified' },
      { title: 'PND', url: '/customers/pnd' },
    ],
  },
  {
    title: 'Bill Payment',
    icon: { type: 'fontawesome', component: faReceipt },
    url: '#',
    items: [],
  },
  {
    title: 'Crypto',
    icon: { type: 'inline-svg', component: CryptoIcon },
    url: '/crypto',
  },
  {
    title: 'Settings',
    icon: { type: 'inline-svg', component: SettingIcon },
    url: '#',
    items: [
      { title: 'Team', url: '/settings/team' },
      { title: 'Audit Log', url: '/settings/audit-log' },
      { title: 'Rate Configuration', url: '/settings/rate-configuration' },
      { title: 'Profile', url: '/settings/profile' },
      { title: 'General', url: '/settings/general' },
    ],
  },
];

const Menu = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const activeMenu = menuItems.find((item) => {
      if (item.items && item.items.length > 0) {
        return pathname.startsWith(
          item.url === '#' ? `/${item.title.toLowerCase()}` : item.url
        );
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
    <div className="h-[calc(130vh-10px)]">
      {menuItems.map((item) => {
        const hasChildren = item.items && item.items.length > 0;
        const isOpen = openMenu === item.title;
        const isActive =
          (item.url !== '#' && pathname === item.url) ||
          (hasChildren &&
            pathname.startsWith(
              item.url === '#' ? `/${item.title.toLowerCase()}` : item.url
            ));

        // Extract the icon component
        const LucideComponent =
          item.icon.type === 'lucide' ? item.icon.component : null;
        const FontAwesomeComponent =
          item.icon.type === 'fontawesome' ? item.icon.component : null;
        const InlineSvgComponent =
          item.icon.type === 'inline-svg' ? item.icon.component : null;

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
                <span>
                  {item.icon.type === 'lucide' && LucideComponent ? (
                    <LucideComponent
                      size={30}
                      className={isActive ? 'text-[#36C6F3]' : 'text-[#8B9DA4]'}
                    />
                  ) : item.icon.type === 'fontawesome' &&
                    FontAwesomeComponent ? (
                    <FontAwesomeIcon
                      icon={FontAwesomeComponent}
                      size="2x"
                      className={isActive ? 'text-[#36C6F3]' : 'text-[#8B9DA4]'}
                    />
                  ) : item.icon.type === 'inline-svg' && InlineSvgComponent ? (
                    <InlineSvgComponent
                      fill={isActive ? '#36C6F3' : '#8B9DA4'}
                    />
                  ) : null}
                </span>
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

            {hasChildren && item.items && (
              <div
                className={`ml-20 mt-1 space-y-3 border-l border-gray-300 pl-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {item.items.map((subItem: SubMenuItem) => (
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
      <div className="flex justify-center mt-5">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Menu;
