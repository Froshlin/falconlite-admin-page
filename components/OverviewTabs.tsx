'use client';

import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  }, []); 

  return (
    <div className="flex items-center gap-2 border-1 border-[#8B9DA4] px-4 py-4 rounded-[8px]">
      <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-auto">
        <TabsList className="flex w-auto bg-transparent p-0">
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
          <TabsTrigger
            value="this-year"
            className="h-[32px] px-4 py-2 text-sm font-medium rounded-[5px] data-[state=active]:bg-[#36C6F3] data-[state=active]:text-white data-[state=inactive]:text-[#8B9DA4] cursor-pointer"
          >
            This Year
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {/* Filter Icon */}
      <Image className='cursor-pointer' src={Filter} alt='filter-icon' width={27} height={27} />
    </div>
  );
}