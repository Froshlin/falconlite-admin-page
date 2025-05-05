'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stat } from '@/types/types';
import { ChevronRight, TrendingUp} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CardComponentProps{
    stats: Stat[]
}

export const CardComponent: React.FC<CardComponentProps> = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return <div className="text-center py-4">No stats available.</div>;
  }

  return (
    <div className="grid grid-cols-1 min-[520px]:grid-cols-2 min-[875px]:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
      {/* Stats Cards */}
      {stats.map((stat, index) => (
        <Card key={index} className="max-w-full rounded-4xl h-auto shadow-none">
          <div className='flex items-center justify-between px-6'>
            <Image src={stat.image} alt={`${stat.title} icon`} width={40} height={40}/>
            <Link href="#" className="flex items-center gap-0.5 text-xs text-[#36C6F3] hover:underline">
              View Stats
              <ChevronRight className='w-3 h-3'/>
            </Link>
          </div>
            
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8B9DA4]">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="md:text-3xl text-2xl font-semibold text-[#0E3B4C">{stat.value}</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className='text-[#0FD582]'/>
                <p className='font-medium text-[11px] text-[#0FD582]'>{stat.change}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
