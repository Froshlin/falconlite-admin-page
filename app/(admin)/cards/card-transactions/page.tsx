'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { SearchBar } from '@/components/SearchBar';
import { PaginationControls } from '@/components/PaginationControls';
import { ColumnsDropdown } from '@/components/ColumnsDropdown';
import { CardTransactionTable } from '@/components/CardTransactionTable';
import { TransactionFilterModal } from '@/components/TransactionFilterModal';
import { fetchCardTransactions, fetchCardNotification, fetchCardStats } from '@/lib/api';
import { CardTransaction, Notification, TransactionFilter, StatusOption, Stat } from '@/types/types';

export default function CardTransactionsPage() {
  const [transactions, setTransactions] = useState<CardTransaction[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [timeRange, setTimeRange] = useState('today');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filter, setFilter] = useState<TransactionFilter>({});

  const statusOptions: StatusOption[] = [
    { value: 'all', label: 'All' },
    { value: 'SUCCESSFUL', label: 'Active' },
    { value: 'FAILED', label: 'Terminated' },
  ];

  useEffect(() => {
    const loadData = async () => {
      const transactionData = await fetchCardTransactions(timeRange, filter);
      const notificationData = await fetchCardNotification();
      const statsData = await fetchCardStats(timeRange);
      console.log('Fetched Transactions:', transactionData); // Debug log
      setTransactions(transactionData);
      setNotification(notificationData);
      setStats(statsData);
      setCurrentPage(1);
    };
    loadData();
  }, [timeRange, filter]);

  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (statusFilter) {
      result = result.filter((transaction) => transaction.status === statusFilter);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (transaction) =>
          transaction.cardId.toLowerCase().includes(query) ||
          transaction.merchantId.toLowerCase().includes(query) ||
          transaction.merchantName.toLowerCase().includes(query) ||
          transaction.maskedPan.toLowerCase().includes(query) ||
          transaction.amount.toLowerCase().includes(query) ||
          transaction.currency.toLowerCase().includes(query) ||
          transaction.date.toLowerCase().includes(query) ||
          transaction.status.toLowerCase().includes(query)
      );
    }
    console.log('Filtered Transactions:', result); // Debug log
    return result;
  }, [transactions, searchQuery, statusFilter]);

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

  const handleFilterChange = (newFilter: TransactionFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="pt-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#0A0E3F]">{filteredTransactions.length} Total Transactions</h1>
          {notification && (
            <p className="text-sm text-gray-500">
              {notification.message}
            </p>
          )}
        </div>

        <TransactionFilterModal
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          statusOptions={statusOptions}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-start gap-3 p-4 bg-white border border-[#d7d9db] rounded-[20px]">
            <Image src={stat.image} alt={stat.title} width={40} height={40} />
            <div>
              <p className="text-sm text-gray-500 py-0.5">{stat.title}</p>
              <h2 className="text-[28px] font-semibold text-[#0A0E3F] py-2">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search transactions"
      />

      <div className="border border-[#d7d9db] rounded-[7px] mt-8">
        <CardTransactionTable
          transactions={filteredTransactions}
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
          totalRows={filteredTransactions.length}
        />
      </div>
    </div>
  );
}