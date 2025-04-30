'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Transaction } from '@/types/types';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';

interface TransactionTableProps {
  transactions: Transaction[];
  currentPage: number;
  itemsPerPage: number;
}

export function TransactionTable({ transactions, currentPage, itemsPerPage }: TransactionTableProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

  const getStatusStyles = (status: Transaction['status']) => {
    switch (status) {
      case 'SUCCESSFUL':
        return 'bg-[rgba(15,213,130,0.1)] text-[#0FD582] text-[10px] font-semibold px-[10px] px-[15px] w-[88px] h-[25px] rounded-[30px]';
      case 'FAILED':
        return 'bg-[rgba(232,40,40,0.3)] text-[#E82828] text-[10px] font-semibold px-[10px] px-[15px] w-[88px] h-[25px] rounded-[30px]';
      case 'PENDING':
        return 'bg-[rgba(223,197,0,0.3)] text-[#DFC500] text-[10px] font-semibold px-[10px] px-[15px] w-[88px] h-[25px] rounded-[30px]';
      default:
        return '';
    }
  };

  return (
    <Table>
      <TableHeader className='px-6'>
        <TableRow className='px-4'>
          <TableHead className='py-7'>Transaction</TableHead>
          <TableHead className='py-7'>Amount</TableHead>
          <TableHead className='py-7'>Date</TableHead>
          <TableHead className='py-7'>Customer</TableHead>
          <TableHead className='py-7'>Type</TableHead>
          <TableHead className='py-7'>Channel</TableHead>
          <TableHead className="text-center py-7">Status</TableHead>
          <TableHead className="text-right py-7">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedTransactions.map((transaction, index) => (
          <TableRow key={transaction.id} className={index % 2 === 0 ? 'bg-[#F8FCFF] border-b-0' : 'bg-[#FFFFFF] border-b-0'}>
            <TableCell className="flex items-center gap-2 py-5">
              <Image src={transaction.image} alt="transaction-icon" width={32} height={32} className="rounded-full" />
              <div className="flex flex-col">
                <span>{transaction.transaction}</span>
                <span className="text-sm text-gray-500">{transaction.type}</span>
              </div>
            </TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.customer}</TableCell>
            <TableCell>{transaction.type}</TableCell>
            <TableCell>{transaction.channel}</TableCell>
            <TableCell className="text-center">
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(transaction.status)}`}>
                {transaction.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <MoreVertical className="cursor-pointer inline-block" size={20} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}