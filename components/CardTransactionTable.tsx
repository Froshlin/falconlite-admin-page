'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { CheckCircle, MoreVertical } from 'lucide-react';
import clipboard from '@/public/clipboard-icon.png';
import { CardTransactionTableProps } from '@/types/types';

export const CardTransactionTable = ({ transactions, currentPage, itemsPerPage }: CardTransactionTableProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);
  console.log('Paginated Transactions:', paginatedTransactions); // Debug log

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (fullPan: string, id: string) => {
    navigator.clipboard.writeText(fullPan);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'SUCCESSFUL':
        return 'bg-[rgba(15,213,130,0.1)] text-[#0FD582] text-[10px] font-semibold px-[10px] py-[5px] w-[88px] h-[25px] rounded-[30px]';
      case 'FAILED':
        return 'bg-[rgba(232,40,40,0.3)] text-[#E82828] text-[10px] font-semibold px-[10px] py-[5px] w-[88px] h-[25px] rounded-[30px]';
      default:
        return 'bg-[rgba(223,197,0,0.3)] text-[#DFC500] text-[10px] font-semibold px-[10px] py-[5px] w-[88px] h-[25px] rounded-[30px]';
    }
  };

  return (
    <Table>
      <TableHeader className='px-6'>
        <TableRow className='px-4'>
          <TableHead className='py-7'>CARD ID</TableHead>
          <TableHead className='py-7'>MERCHANT ID</TableHead>
          <TableHead className='py-7'>MERCHANT NAME</TableHead>
          <TableHead className='py-7'>MASKED PAN</TableHead>
          <TableHead className='py-7'>AMT</TableHead>
          <TableHead className='py-7'>CUR</TableHead>
          <TableHead className='py-7'>DATE</TableHead>
          <TableHead className="text-center py-7">STATUS</TableHead>
          <TableHead className="text-right py-7">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedTransactions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-5">
              No transactions found.
            </TableCell>
          </TableRow>
        ) : (
          paginatedTransactions.map((transaction, index) => (
            <TableRow key={transaction.id} className={index % 2 === 0 ? 'bg-[#F8FCFF] border-b-0' : 'bg-[#FFFFFF] border-b-0'}>
              <TableCell className="py-5">{transaction.cardId}</TableCell>
              <TableCell className="py-5">{transaction.merchantId}</TableCell>
              <TableCell className="py-5">{transaction.merchantName}</TableCell>
              <TableCell className="flex items-center gap-2 py-5">
                <span>{transaction.maskedPan}</span>
                <div className="flex items-center justify-center w-6 h-6 bg-[#E6F0FA] rounded-full">
                  {copiedId === transaction.id ? (
                    <CheckCircle className="text-[#36C6F3]" size={16} />
                  ) : (
                    <Image
                      className="cursor-pointer"
                      src={clipboard}
                      alt='clipboard icon'
                      width={25}
                      height={25}
                      onClick={() => handleCopy(transaction.fullPan, transaction.id)}
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="py-5">{transaction.amount}</TableCell>
              <TableCell className="py-5">{transaction.currency}</TableCell>
              <TableCell className="py-5">{transaction.date}</TableCell>
              <TableCell className="text-center">
                <span className={`inline-flex items-center justify-center ${getStatusStyles(transaction.status)}`}>
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <MoreVertical className="cursor-pointer inline-block" size={20} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};