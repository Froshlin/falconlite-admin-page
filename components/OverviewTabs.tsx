'use client';

import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import Filter from '@/public/filter.png';
import Image from 'next/image';


interface OverviewTabsProps {
  onTimeRangeChange?: (timeRange: string) => void;
}

export function OverviewTabs({ onTimeRangeChange }: OverviewTabsProps) {
  const [selectedTab, setSelectedTab] = useState('today');


  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    if (onTimeRangeChange) {
      onTimeRangeChange(value);
    }
  };


  useEffect(() => {
    if (onTimeRangeChange) {
      onTimeRangeChange(selectedTab);
    }
  }, [onTimeRangeChange, selectedTab]); 

  return (
    <div className="flex items-center gap-2 flex-wrap border-1 border-border min-[480px]:w-fit [@media(max-width:498px)]:max-w-full md:px-4 px-1 py-4 rounded-[8px] overflow-x-auto">
      <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-auto">
        <TabsList className="flex w-auto bg-transparent p-0">
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
          <TabsTrigger
            value="this-year"
            className="h-[32px] px-4 py-2 text-sm font-medium rounded-[5px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground cursor-pointer"
          >
            This Year
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {/* Filter Icon */}
      <Image 
        className='cursor-pointer w-[27px]'
        src={Filter}
        style={{height: '27px', maxWidth: '27px'}} 
        alt='filter-icon' 
        width={27} 
        height={27} 
      />
    </div>
  );
}