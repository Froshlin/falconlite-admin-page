'use client';

import React from 'react';
import { RateCardProps } from '@/types/types';
import { Button } from '@/components/ui/button';

export const RateCard = ({ rate, onUpdate }: RateCardProps) => {
  return (
    <div className="border border-gray-200 rounded-[29px] p-5 flex flex-col items-start gap-3">
      <p className="text-sm text-[#8B9DA4] font-medium">{rate.label}</p>
      <p className="text-[20px] text-[#0E3B4C] font-semibold">{rate.rate}</p>
      <Button
        className="bg-[#36C6F3] hover:bg-[#2a9cbf] text-white text-sm font-medium rounded-sm w-[127px] h-[41px] px-6 py-1 cursor-pointer"
        onClick={() => onUpdate(rate.id)}
      >
        Update
      </Button>
    </div>
  );
};