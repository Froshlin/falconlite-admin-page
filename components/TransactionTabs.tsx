/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import Filter from '@/public/filter.png';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TransactionTabsProps } from '@/types/types';

export function TransactionTabs({ onTimeRangeChange, onFilterChange }: TransactionTabsProps) {
  const [selectedTab, setSelectionTab] = useState('today');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleTabChange = (value: string) => {
    setSelectionTab(value);
    if (onTimeRangeChange) {
      onTimeRangeChange(value);
    }
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  useEffect(() => {
    if (onTimeRangeChange) {
      onTimeRangeChange(selectedTab);
    }
  }, [onTimeRangeChange, selectedTab]);

  return (
    <div className="flex items-center gap-2 border border-[#8B9DA4] [@media(max-width:498px)]:max-w-full md:px-4 px-1 py-4 rounded-[8px] overflow-x-auto">
      {/* Filter Image and Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image 
            className='cursor-pointer w-[27px]' 
            src={Filter} 
            style={{height: '100%', maxWidth: '27px'}} 
            alt='filter-icon' 
            width={27} 
            height={27} 
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleFilterChange('all')}>
            All
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('successful')}>
            Successful
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('failed')}>
            Failed
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('pending')}>
            Pending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-auto">
        <TabsList className="flex w-auto bg-transparent p-0">
          <TabsTrigger
            value="yesterday"
            className="h-[32px] px-4 py-2 text-sm font-medium rounded-[5px] data-[state=active]:bg-[#36C6F3] data-[state=active]:text-white data-[state=inactive]:text-[#8B9DA4] cursor-pointer"
          >
            Yesterday
          </TabsTrigger>
          <TabsTrigger
            value="today"
            className="h-[32px] px-4 py-2 text-sm font-medium rounded-[5px] data-[state=active]:bg-[#36C6F3] data-[state=active]:text-white data-[state=inactive]:text-[#8B9DA4] cursor-pointer"
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="this-week"
            className="h-[32px] px-4 py-2 text-sm font-medium rounded-[5px] data-[state=active]:bg-[#36C6F3] data-[state=active]:text-white data-[state=inactive]:text-[#8B9DA4] cursor-pointer"
          >
            This Week
          </TabsTrigger>
          <TabsTrigger
            value="this-month"
            className="h-[32px] px-4 py-2 text-sm font-medium rounded-[5px] data-[state=active]:bg-[#36C6F3] data-[state=active]:text-white data-[state=inactive]:text-[#8B9DA4] cursor-pointer"
          >
            This Month
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}