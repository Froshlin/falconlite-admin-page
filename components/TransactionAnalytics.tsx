'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TransactionDataPoint, TransactionAnalyticsProps } from '@/types/types';

export const TransactionAnalytics: React.FC<TransactionAnalyticsProps> = ({
  transactionData,
  title,
}) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <Card className="col-span-2 shadow-none w-[709px] h-[376px] px-6 rounded-[29px]">
      <CardContent className="bg-[url('/chart-bg.png')] bg-cover bg-center rounded-[29px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Line type="monotone" dataKey="red" stroke="#E82828" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="green" stroke="#0FD582" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-[#8B9DA4]">{title}</CardTitle>
            <span className="text-xs text-gray-400">Updated 50secs ago</span>
        </CardHeader>
    </Card>
  );
};