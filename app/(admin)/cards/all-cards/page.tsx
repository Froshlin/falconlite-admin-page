'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { PaginationControls } from '@/components/PaginationControls';
import { ColumnsDropdown } from '@/components/ColumnsDropdown';
import { CardTable } from '@/components/CardTable';
import { TimeRangeFilter } from '@/components/TimeRangeFilter';
import { fetchCards, fetchCardNotification } from '@/lib/api';
import { Card, Notification, CardFilter, StatusOption } from '@/types/types';

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [timeRange, setTimeRange] = useState('today');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filter, setFilter] = useState<CardFilter>({}); // State to hold filter options

  const statusOptions: StatusOption[] = [
    { value: 'Active', label: 'Active' },
    { value: 'Terminated', label: 'Terminated' },
    { value: 'Freezed', label: 'Freezed' },
  ];

  useEffect(() => {
    const loadData = async () => {
      const cardData = await fetchCards(filter); // Use filter to fetch cards
      const notificationData = await fetchCardNotification();
      setCards(cardData);
      setNotification(notificationData);
      setCurrentPage(1);
    };
    loadData();
  }, [timeRange, filter]); // Refetch when timeRange or filter changes

  const filteredCards = useMemo(() => {
    let filtered = cards;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (card) =>
          card.cardId.toLowerCase().includes(query) ||
          card.balance.toLowerCase().includes(query) ||
          card.date.toLowerCase().includes(query) ||
          card.cardBrand.toLowerCase().includes(query) ||
          card.cardType.toLowerCase().includes(query) ||
          card.cardNumber.toLowerCase().includes(query) ||
          card.status.toLowerCase().includes(query)
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((card) => card.status === statusFilter);
    }
    return filtered;
  }, [cards, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleDeleteCard = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.cardId !== cardId));
  };

  const handleFilterChange = (newFilter: CardFilter) => {
    setFilter(newFilter); // Update filter state when modal applies filters
  };

  return (
    <div className="pt-10 py-6">
      <div className="flex justify-between items-center flex-wrap mb-8">
        {/* Card Count */}
        <div>
          <h1 className="text-2xl font-semibold text-[#0A0E3F]">{filteredCards.length} Total Cards</h1>
          {notification && (
            <p className="text-sm text-gray-500">
              {notification.message}
            </p>
          )}
        </div>

        {/* Time Range Filter */}
        <TimeRangeFilter
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          statusOptions={statusOptions}
          onFilterChange={handleFilterChange} // Pass filter change handler
        />
      </div>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search card"
      />

      {/* Card Table */}
      <div className="border border-[#d7d9db] rounded-[7px] mt-8">
        <CardTable
          cards={filteredCards}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onDeleteCard={handleDeleteCard}
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
          totalRows={filteredCards.length}
        />
      </div>
    </div>
  );
}