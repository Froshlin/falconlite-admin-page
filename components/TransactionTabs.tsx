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
    <div className="flex items-center gap-2 flex-wrap border border-border min-[480px]:w-fit [@media(max-width:498px)]:max-w-full md:px-4 px-1 py-4 rounded-[8px] overflow-x-auto">
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
            className="h-[32px] px-4 py-2 text-sm font-medium rounded-[5px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground cursor-pointer"
          >
            Yesterday
          </TabsTrigger>
          <TabsTrigger
            value="today"
            className="h-[32px] px-4 py-2 text-sm font-medium rounded-[5px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground cursor-pointer"
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="this-week"
            className="h-[32px] px-4 py-2 text-sm font-medium rounded-[5px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground cursor-pointer"
          >
            This Week
          </TabsTrigger>
          <TabsTrigger
            value="this-month"
            className="h-[32px] px-4 py-2 text-sm font-medium rounded-[5px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground cursor-pointer"
          >
            This Month
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}