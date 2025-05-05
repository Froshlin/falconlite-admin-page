'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { AccountCard } from '@/components/AccountCard';
import { AccountTable } from '@/components/AccountTable';
import { PaginationControls } from '@/components/PaginationControls';
import { ColumnsDropdown } from '@/components/ColumnsDropdown';
import { fetchAccountCards, fetchAccounts } from '@/lib/api';
import { AccountCard as AccountCardType, Account } from '@/types/types';

export default function EURAccountsPage() {
  const [cards, setCards] = useState<AccountCardType[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    const loadData = async () => {
      const cardData = await fetchAccountCards('EUR');
      const accountData = await fetchAccounts('EUR');
      setCards(cardData);
      setAccounts(accountData);
      setCurrentPage(1); // Reset to first page on new data
    };
    loadData();
  }, []);

  // Filtered accounts based on search query
  const filteredAccounts = useMemo(() => {
    if (!searchQuery) return accounts;
    const query = searchQuery.toLowerCase();
    return accounts.filter(
      (account) =>
        account.accountId.toLowerCase().includes(query) ||
        account.accountName.toLowerCase().includes(query) ||
        account.accountNumber.toLowerCase().includes(query) ||
        account.bankName.toLowerCase().includes(query) ||
        account.date.toLowerCase().includes(query)
    );
  }, [accounts, searchQuery]);

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

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
      {/* Cards */}
      <div className="grid [@media(max-width:390px)]:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8 cursor-pointer">
        {cards.map((card, index) => (
          <AccountCard key={index} card={card} />
        ))}
      </div>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search transaction"
      />

      {/* Account Table */}
      <div className="border border-[#d7d9db] rounded-[7px] mt-8">
        <AccountTable
          accounts={filteredAccounts}
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
          totalRows={filteredAccounts.length}
        />
      </div>
    </div>
  );
}