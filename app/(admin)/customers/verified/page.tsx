'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { PaginationControls } from '@/components/PaginationControls';
import { ColumnsDropdown } from '@/components/ColumnsDropdown';
import { TransactionTabs } from '@/components/TransactionTabs';
import { VerifiedCustomerTable } from '@/components/VerifiedCustomerTable';
import { fetchVerifiedCustomers, fetchCustomerNotification } from '@/lib/api';
import { CardCustomer, Notification, CustomerFilter } from '@/types/types';

export default function VerifiedCustomersPage() {
  const [customers, setCustomers] = useState<CardCustomer[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [timeRange, setTimeRange] = useState('today');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [filter] = useState<CustomerFilter>({});

  useEffect(() => {
    const loadData = async () => {
      const customerData = await fetchVerifiedCustomers(timeRange, filter);
      const notificationData = await fetchCustomerNotification();
      setCustomers(customerData);
      setNotification(notificationData);
      setCurrentPage(1);
    };
    loadData();
  }, [timeRange, filter]);

  const filteredCustomers = useMemo(() => {
    let result = customers;
    if (statusFilter !== 'all') {
      result = result.filter((customer) => customer.status.toLowerCase() === statusFilter.toLowerCase());
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (customer) =>
          customer.customerName.toLowerCase().includes(query) ||
          customer.country.toLowerCase().includes(query) ||
          customer.phoneNo.toLowerCase().includes(query) ||
          customer.status.toLowerCase().includes(query) ||
          (customer.role && customer.role.toLowerCase().includes(query)) ||
          (customer.age && customer.age.toString().includes(query)) ||
          (customer.gender && customer.gender.toLowerCase().includes(query)) ||
          (customer.date && customer.date.toLowerCase().includes(query)) ||
          (customer.email && customer.email.toLowerCase().includes(query))
      );
    }
    return result;
  }, [customers, searchQuery, statusFilter]);

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

  const handleFilterChange = (filter: string) => {
    setStatusFilter(filter);
  };

  return (
    <div className="pt-10 py-6">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
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
          onFilterChange={handleFilterChange}
        />
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search Customer"
      />

      <div className="border border-[#d7d9db] rounded-[7px] mt-8">
        <VerifiedCustomerTable
          customers={filteredCustomers}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="flex items-center justify-between flex-wrap my-6 gap-6">
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