'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { PaginationControls } from '@/components/PaginationControls';
import { ColumnsDropdown } from '@/components/ColumnsDropdown';
import { CardTransactionTable } from '@/components/CardTransactionTable';
import { TimeRangeFilter } from '@/components/TimeRangeFilter';
import { fetchTransactionsByCardId } from '@/lib/api';
import { CardTransaction } from '@/types/types';

export default function CardTransactionsPage() {
  const { cardId } = useParams();
  const [transactions, setTransactions] = useState<CardTransaction[]>([]);
  const [searchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [timeRange, setTimeRange] = useState('today');

  useEffect(() => {
    const loadTransactions = async () => {
      if (typeof cardId === 'string') {
        const transactionData = await fetchTransactionsByCardId(cardId);
        setTransactions(transactionData);
      }
    };
    loadTransactions();
  }, [cardId, timeRange]);

  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions;
    const query = searchQuery.toLowerCase();
    return transactions.filter(
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
  }, [transactions, searchQuery]);

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
    <div className="flex-1 p-6 h-screen">
      {/* Time Range Filter */}
      <div className="flex justify-end items-center mb-8">
        <TimeRangeFilter
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          statusFilter={null}
          setStatusFilter={() => {}}
          statusOptions={[]}
        />
      </div>

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