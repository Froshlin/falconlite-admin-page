'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { PaginationControls } from '@/components/PaginationControls';
import { ColumnsDropdown } from '@/components/ColumnsDropdown';
import { TransactionTabs } from '@/components/TransactionTabs';
import { UnverifiedCustomerTable } from '@/components/UnverifiedCustomerTable';
import { fetchUnverifiedCustomers, fetchUnverifiedCustomerNotification } from '@/lib/api';
import { UnverifiedCustomer, Notification, CustomerFilter } from '@/types/types';

export default function UnverifiedCustomersPage() {
  const [customers, setCustomers] = useState<UnverifiedCustomer[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [timeRange, setTimeRange] = useState('today');
  const [filter] = useState<CustomerFilter>({});

  useEffect(() => {
    const loadData = async () => {
      const customerData = await fetchUnverifiedCustomers(timeRange, filter);
      const notificationData = await fetchUnverifiedCustomerNotification();
      setCustomers(customerData);
      setNotification(notificationData);
      setCurrentPage(1);
    };
    loadData();
  }, [timeRange, filter]);

  const filteredCustomers = useMemo(() => {
    let result = customers;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (customer) =>
          customer.id.toLowerCase().includes(query) ||
          (customer.email && customer.email.toLowerCase().includes(query)) ||
          (customer.date && customer.date.toLowerCase().includes(query))
      );
    }
    return result;
  }, [customers, searchQuery]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange);
  };

  return (
    <div className="pt-10 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#0A0E3F]">{filteredCustomers.length} Customers</h1>
          {notification && (
            <p className="text-sm text-gray-500">
              {notification.message}.
            </p>
          )}
        </div>

        <TransactionTabs
          onTimeRangeChange={handleTimeRangeChange}
        />
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search Customer"
      />

      <div className="border border-[#d7d9db] rounded-[7px] mt-8">
        <UnverifiedCustomerTable
          customers={filteredCustomers}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="flex items-center justify-between my-6">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <ColumnsDropdown
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalRows={filteredCustomers.length}
        />
      </div>
    </div>
  );
}