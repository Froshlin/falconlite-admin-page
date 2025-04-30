'use client';

import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from '@/public/images/main-logo.png';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';
import { Menu as MenuIcon, X } from 'lucide-react';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className={`h-screen flex flex-col ${montserrat.className}`}>
            {/* Container Holding Navbar and Logo */}
            <div className="flex fixed z-2200 w-full bg-white border-b border-[#D9D9D9]">
              <div className="w-full md:w-[20%] bg-[#EEF8FE] py-4 flex items-center px-4">
                {/* Hamburger Icon */}
                <button
                  className="md:hidden focus:outline-none bg-white px-1.5 py-0.5 rounded-sm"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X size={24} className="text-accent" />
                  ) : (
                    <MenuIcon size={24} className="text-accent" />
                  )}
                </button>
                {/* Logo Section */}
                <Link href="/overview" className="flex items-center">
                  <Image
                    src={Logo}
                    alt="logo"
                    width={182}
                    height={35}
                    className="w-32 md:w-40 lg:w-[182px]" // Responsive logo size
                  />
                </Link>
              </div>

              {/* Navbar Section */}
              <div className="w-[80%] bg-white">
                <Navbar />
              </div>
            </div>

            {/* Horizontal line */}
            <div className="w-full border-b border-[#D9D9D9]"></div>

            {/* Menu Section and Content Section */}
            <div className="flex pt-[110px]">
              {/* Menu Section */}
              <div
                className={`fixed inset-y-0 left-0 pt-28 z-40 w-full md:w-[20%] bg-[#EEF8FE] h-screen flex flex-col transform transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
              >
                <div
                  className="flex-1 overflow-y-auto py-6"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(135,140,141,0.15) transparent',
                  }}
                >
                  <Menu />
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-[80%] md:ml-[20%] bg-white pb-3 pt-7 px-4 md:px-14">
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}