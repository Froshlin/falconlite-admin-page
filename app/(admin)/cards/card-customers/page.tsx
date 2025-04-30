'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { PaginationControls } from '@/components/PaginationControls';
import { ColumnsDropdown } from '@/components/ColumnsDropdown';
import { CardCustomerTable } from '@/components/CardCustomerTable';
import { CustomerFilterModal } from '@/components/CustomerFilterModal';
import { fetchCardCustomers, fetchCustomerNotification } from '@/lib/api';
import { CardCustomer, Notification, CustomerFilter } from '@/types/types';

export default function CardCustomersPage() {
  const [customers, setCustomers] = useState<CardCustomer[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [timeRange, setTimeRange] = useState('today');
  const [filter, setFilter] = useState<CustomerFilter>({});

  useEffect(() => {
    const loadData = async () => {
      const customerData = await fetchCardCustomers(timeRange, filter);
      const notificationData = await fetchCustomerNotification();
      setCustomers(customerData);
      setNotification(notificationData);
      setCurrentPage(1);
    };
    loadData();
  }, [timeRange, filter]);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return customers;
    const query = searchQuery.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.customerName.toLowerCase().includes(query) ||
        customer.country.toLowerCase().includes(query) ||
        customer.phoneNo.toLowerCase().includes(query) ||
        customer.status.toLowerCase().includes(query)
    );
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

  const handleFilterChange = (newFilter: CustomerFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="pt-10 py-6">
      <div className="flex justify-between items-center mb-8">
        {/* Customer Count */}
        <div>
          <h1 className="text-2xl font-semibold text-[#0A0E3F]">{filteredCustomers.length} Total Customers</h1>
          {notification && (
            <p className="text-sm text-gray-500">
              {notification.message}
            </p>
          )}
        </div>

        {/* Customer Filter Modal */}
        <CustomerFilterModal
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search customer"
      />

      {/* Customer Table */}
      <div className="border border-[#d7d9db] rounded-[7px] mt-8">
        <CardCustomerTable
          customers={filteredCustomers}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* Pagination and Columns */}
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