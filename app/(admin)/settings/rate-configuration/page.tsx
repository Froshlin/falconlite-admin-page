'use client';

import React, { useState, useEffect } from 'react';
import { fetchRates, updateRate } from '@/lib/api';
import { Rate } from '@/types/types';
import { RateCard } from '@/components/RateCard';
import { RateUpdateModal } from '@/components/RateUpdateModal';

export default function RateConfigurationPage() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);

  useEffect(() => {
    const loadRates = async () => {
      try {
        const ratesData: Rate[] = await fetchRates();
        setRates(ratesData);
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    loadRates();
  }, []);

  const handleUpdate = (id: string) => {
    const rateToEdit = rates.find(rate => rate.id === id);
    if (rateToEdit) {
      setSelectedRate(rateToEdit);
      setIsModalOpen(true);
    }
  };

  const handleSaveRate = async (id: string, newRate: number) => {
    try {
      await updateRate(id, newRate);
      // Refresh rates after update
      const updatedRates = await fetchRates();
      setRates(updatedRates);
    } catch (error) {
      console.error('Error updating rate:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRate(null);
  };

  return (
    <div className="py-6">
      <div className="mb-12">
        <h1 className="text-2xl font-semibold text-[#0E3B4C] mt-6">
          Rate Configuration
        </h1>
        <span className="text-[16px] text-[#8B9DA4]">Update Rates</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-14">
        {rates.map((rate) => (
          <RateCard key={rate.id} rate={rate} onUpdate={handleUpdate} />
        ))}
      </div>
      <RateUpdateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        rate={selectedRate}
        onSave={handleSaveRate}
      />
    </div>
  );
}