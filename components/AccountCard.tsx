'use client';

import React from 'react';
import { AccountCard as AccountCardType } from '@/types/types';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface AccountCardProps {
  card: AccountCardType;
}

export function AccountCard({ card }: AccountCardProps) {
  return (
    <div className="bg-white border border-[#d7d9db] rounded-[20px] p-4 flex flex-col items-start gap-3">
      <Image src={card.icon} alt={`${card.title}-icon`} width={36} height={37} />
      <div>
        <p className="font-medium text-sm text-[#8B9DA4] py-2">{card.title}</p>
        <div className="flex items-center gap-2">
          <h3 className="lg:text-[28px] md:text-[19px] [@media(max-width:390px)]:text-2xl font-semibold">{card.value}</h3>
          <div className="flex items-center gap-1 text-[#0FD582]">
            <TrendingUp size={16} />
            <span className="text-[11px]">{card.change}</span>
          </div>
        </div>
      </div>
    </div>
  );
}