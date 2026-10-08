/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, forwardRef } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Filter from '@/public/filter.png';
import Image from 'next/image';
import { X, Calendar } from 'lucide-react';
import { CustomerFilter, CustomerFilterModalProps } from '@/types/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Custom input component for DatePicker with clickable calendar icon
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomDateInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <div className="relative">
    <input
      value={value}
      onClick={onClick}
      readOnly
      placeholder="mm/dd/yyyy"
      className="max-w-full w-full sm:w-[253px] px-3 py-2 border border-input rounded text-[13px] text-muted-foreground"
    />
    <Calendar
      onClick={onClick}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer"
      size={20}
    />
  </div>
));
CustomDateInput.displayName = 'CustomDateInput';

export const CustomerFilterModal = ({
  timeRange,
  setTimeRange,
  onFilterChange,
}: CustomerFilterModalProps) => {
  const [selectedTab, setSelectedTab] = useState(timeRange);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<CustomerFilter>({
    dateRange: '',
    startDate: '',
    endDate: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setTimeRange(value);
  };

  const handleDateRangeClick = (range: string) => {
    setFilter({ ...filter, dateRange: range });
  };

  const handleApplyFilter = () => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
    setIsModalOpen(false);
  };

  // Format date to mm/dd/yyyy
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Parse the string date back to a Date object for DatePicker
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const [month, day, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
  };

  const handleStartDateChange = (date: Date | null) => {
    setFilter({ ...filter, startDate: formatDate(date) });
  };

  const handleEndDateChange = (date: Date | null) => {
    setFilter({ ...filter, endDate: formatDate(date) });
  };

  useEffect(() => {
    setSelectedTab(timeRange);
  }, [timeRange]);

  return (
    <div className="flex items-center gap-2 border border-border [@media(max-width:498px)]:max-w-full md:px-4 px-1 py-4 rounded-[8px] overflow-x-auto">
      {/* Time Range Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-auto"
      >
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

      {/* Filter Icon to Open Modal */}
      <div>
        <Image
          className="cursor-pointer w-[27px]"
          src={Filter}
          style={{height: '100%', maxWidth: '27px'}}
          alt="filter-icon"
          width={27}
          height={27}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <div className="fixed top-5 inset-0 flex items-center justify-center z-2100">
          {/* Blurred Backdrop */}
          <div
            className="absolute inset-0 bg-[rgba(139,143,144,0.3)] w-[80%] left-[20%] top-[14.5%] backdrop-blur-[2px]"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-card rounded-lg w-[90vw] max-w-[604px] md:ml-auto md:mr-10 shadow-lg">
            <div className="flex justify-between items-center border-b border-border pt-12 pb-4 px-6">
              <h2 className="text-[16px] font-medium text-muted-foreground">
                Filter by
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-card-foreground border border-border py-2 px-4 rounded-sm text-[12px] font-medium flex items-center gap-1 cursor-pointer"
              >
                Close
                <X size={15} className="text-card-foreground font-medium" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Date Range Buttons */}
              <div>
                <h3 className="text-[13px] font-medium text-card-foreground mb-2">
                  Choose Data Range
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleDateRangeClick('last-week')}
                    className={`cursor-pointer px-4 py-2 text-sm rounded border ${
                      filter.dateRange === 'last-week'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    } text-muted-foreground`}
                  >
                    Last Week
                  </button>
                  <button
                    onClick={() => handleDateRangeClick('last-month')}
                    className={`cursor-pointer px-4 py-2 text-sm rounded border ${
                      filter.dateRange === 'last-month'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    } text-muted-foreground`}
                  >
                    Last Month
                  </button>
                  <button
                    onClick={() => handleDateRangeClick('last-2-month')}
                    className={`cursor-pointer px-4 py-2 text-sm rounded border ${
                      filter.dateRange === 'last-2-month'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    } text-muted-foreground`}
                  >
                    Last 2 Month
                  </button>
                  <button
                    onClick={() => handleDateRangeClick('last-3-month')}
                    className={`cursor-pointer px-4 py-2 text-sm rounded border ${
                      filter.dateRange === 'last-3-month'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    } text-muted-foreground`}
                  >
                    Last 3 Month
                  </button>
                </div>
              </div>

              {/* Start and End Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
                <div>
                  <label className="text-[13px] font-medium text-card-foreground mb-2 block">
                    Start Date
                  </label>
                  <DatePicker
                    selected={parseDate(filter.startDate || '')}
                    onChange={handleStartDateChange}
                    placeholderText="mm/dd/yyyy"
                    customInput={<CustomDateInput />}
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-medium text-card-foreground mb-2 block">
                    End Date
                  </label>
                  <DatePicker
                    selected={parseDate(filter.endDate || '')}
                    onChange={handleEndDateChange}
                    placeholderText="mm/dd/yyyy"
                    customInput={<CustomDateInput />}
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
              </div>

              {/* First Name */}
              <div>
                <label className="text-[13px] font-medium text-card-foreground mb-2 block">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={filter.firstName}
                  onChange={(e) =>
                    setFilter({ ...filter, firstName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded text-[13px] text-muted-foreground"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="text-[13px] font-medium text-card-foreground mb-2 block">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={filter.lastName}
                  onChange={(e) =>
                    setFilter({ ...filter, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded text-[13px] text-muted-foreground"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[13px] font-medium text-card-foreground mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={filter.email}
                  onChange={(e) =>
                    setFilter({ ...filter, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded text-[13px] text-muted-foreground"
                />
              </div>

              {/* Apply Filter Button */}
              <button
                onClick={handleApplyFilter}
                className="w-full sm:w-[183px] h-[43px] bg-primary text-primary-foreground py-2 rounded text-[13px] font-medium"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
