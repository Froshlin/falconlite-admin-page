'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { TopPlatform } from '@/types/types';
import Image from 'next/image';
import { format } from 'date-fns';

interface TopPlatformsProps {
  topPlatforms: TopPlatform[];
}

export const TopPlatforms: React.FC<TopPlatformsProps> = ({ topPlatforms }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="shadow-none max-w-full h-[295px] rounded-[29px] bg-[var(--card)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
          Top Platforms
        </CardTitle>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] cursor-pointer hover:text-[var(--foreground)] bg-gray-100 py-1 px-2 rounded-md">
              <CalendarIcon className="w-4 h-4" />
              <span>{date ? format(date, 'MMMM') : 'This Month'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[var(--card)] border-[var(--border)]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                setIsOpen(false);
              }}
              initialFocus
              className="rounded-md bg-[var(--card)] text-[var(--foreground)]"
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className="">
          {topPlatforms.map((platform, index) => (
            <div 
              key={index} 
              className="relative flex items-center z-50 py-2"
            >
              <div className="flex items-center pr-2 w-full">
                <div className="flex items-center">
                  {platform.percentage.includes('-') ? (
                    <svg
                      width="8"
                      height="6"
                      viewBox="0 0 8 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-red-500 mr-2"
                    >
                      <path d="M4 6L0 0H8L4 6Z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg
                      width="8"
                      height="6"
                      viewBox="0 0 8 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#0FD582] mr-2"
                    >
                      <path d="M4 0L8 6H0L4 0Z" fill="currentColor" />
                    </svg>
                  )}
                  
                </div>
              <div className=' bg-[#FBFBFB] rounded-[6px] py-2 px-2 flex items-center justify-between w-full z-10' style={{
                backgroundImage: 'url(\'/line-background.png\')',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}>
                <div className='flex items-center gap-1'>
                  {platform.image ? (
                    <Image
                      src={platform.image}
                      alt={`${platform.name} icon`}
                      width={20}
                      height={20}
                      className="rounded-md"
                      onError={() => console.error(`Failed to load image: ${platform.image}`)}
                    />
                  ) : (
                    <span className="h-5 w-5 text-[var(--muted-foreground)]">?</span>
                  )}
                <span className="text-sm text-[var(--muted-foreground)] ml-1">{platform.name}</span>
                </div>

                <div className="flex items-center gap-2 pl-2">
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {platform.amount}
                </span>
                <span
                  className={`text-xs px-1 rounded ${
                    platform.percentage.includes('-')
                      ? 'text-red-500'
                      : 'text-[#0FD582]'
                  }`}
                >
                  {platform.percentage}
                </span>
                </div>
              </div>
                
              </div>
              
              
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};