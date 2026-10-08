'use client';

import React from 'react';
import { RateCardProps } from '@/types/types';
import { Button } from '@/components/ui/button';

export const RateCard = ({ rate, onUpdate }: RateCardProps) => {
  return (
    <div className="border border-border bg-card rounded-[29px] p-5 flex flex-col items-start gap-3">
      <p className="text-sm text-muted-foreground font-medium">{rate.label}</p>
      <p className="text-[20px] text-foreground font-semibold">{rate.rate}</p>
      <Button
        className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-sm w-[127px] h-[41px] px-6 py-1 cursor-pointer"
        onClick={() => onUpdate(rate.id)}
      >
        Update
      </Button>
    </div>
  );
};