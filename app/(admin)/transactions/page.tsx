'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { TransactionTabs } from '@/components/TransactionTabs';
import { TransactionTable } from '@/components/TransactionTable';
import { SearchBar } from '@/components/SearchBar';
import { PaginationControls } from '@/components/PaginationControls';
import { ColumnsDropdown } from '@/components/ColumnsDropdown';
import { fetchTransactions } from '@/lib/api';
import { Transaction } from '@/types/types';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [timeRange, setTimeRange] = useState('today');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await fetchTransactions(timeRange);
      setTransactions(data);
      setCurrentPage(1);
    };
    loadTransactions();
  }, [timeRange]);

  // Filtered transactions based on status and search query
  const filteredTransactions = useMemo(() => {
    let result = transactions;

    // Filter by status
    if (filter !== 'all') {
      result = result.filter((tx) => tx.status.toLowerCase() === filter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.transaction.toLowerCase().includes(query) ||
          tx.customer.toLowerCase().includes(query) ||
          tx.amount.toLowerCase().includes(query) ||
          tx.date.toLowerCase().includes(query) ||
          tx.type.toLowerCase().includes(query) ||
          tx.channel.toLowerCase().includes(query) ||
          tx.status.toLowerCase().includes(query)
      );
    }

    return result;
  }, [transactions, filter, searchQuery]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="pt-10">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
        {/* Transaction Count */}
        <div>
          <h1 className="text-2xl font-semibold">
            {filteredTransactions.length} Transactions
          </h1>
          <p className="text-sm text-gray-500">
            Showing transactions from {timeRange}
          </p>
        </div>

        {/* Tabs and Filter */}
        <div className='w-full md:w-fit'>
          <TransactionTabs
            onTimeRangeChange={setTimeRange}
            onFilterChange={setFilter}
          />
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search transactions"
      />

      {/* Transaction Table */}
      <div className='border border-[#d7d9db] rounded-[7px] mt-8'>
        <TransactionTable
          transactions={filteredTransactions}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* Pagination and Columns */}
      <div className="flex items-center justify-between flex-wrap gap-6 my-6">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <ColumnsDropdown
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalRows={filteredTransactions.length}
        />
      </div>
    </div>
  );
}