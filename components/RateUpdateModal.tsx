'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { RateUpdateModalProps } from '@/types/types';


export const RateUpdateModal = ({ isOpen, onClose, rate, onSave }: RateUpdateModalProps) => {
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [addedRate, setAddedRate] = useState<number>(0);
  const [finalRate, setFinalRate] = useState<number>(0);

  useEffect(() => {
    if (rate) {
      // Extract the numeric value from the rate string (e.g., "$1 → NGN1,800.98" -> 1800.98)
      const rateValue = parseFloat(rate.rate.split('NGN')[1].replace(',', ''));
      setCurrentRate(rateValue);
      setAddedRate(0);
      setFinalRate(rateValue);
    }
  }, [rate]);

  const handleAddedRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAddedRate(value);
    setFinalRate(currentRate + value);
  };

  const handleSave = () => {
    if (rate) {
      onSave(rate.id, finalRate);
      onClose();
    }
  };

  return (
    <div className="flex items-center justify-center z-2100">
        <Modal isOpen={isOpen} onClose={onClose} title="MIDEN Current Rate">
        <div className="flex flex-col gap-4">
            {/* Current Rate */}
            <div>
            <label className="text-[13px] text-[#0E3B4C] mb-1 font-medium">MIDEN Current Rate</label>
            <input
                type="text"
                value={currentRate.toFixed(2)}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-[5px] focus:outline-none text-[#0E3B4C] text-sm"
            />
            </div>

            {/* Added Rate */}
            <div>
            <label className="block text-sm text-[#0E3B4C] mb-1 font-medium">Added Rate</label>
            <input
                type="number"
                value={addedRate}
                onChange={handleAddedRateChange}
                className="w-full p-2 border border-gray-300 rounded-[5px] focus:outline-none text-[#0E3B4C] text-sm"
            />
            </div>

            {/* Final Rate */}
            <div>
            <label className="block text-sm text-[#0E3B4C] mb-1 font-medium">Final Rate</label>
            <input
                type="text"
                value={finalRate.toFixed(2)}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-[5px] focus:outline-none text-[#0E3B4C] text-sm"
            />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-6">
            <Button
                className="bg-[#36C6F3] hover:bg-[#2a9cbf] text-white text-sm font-medium rounded-sm px-4 py-2"
                onClick={handleSave}
            >
                Save New Rate
            </Button>
            </div>
        </div>
        </Modal>
    </div>
  );
};