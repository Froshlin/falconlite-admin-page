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
import { Account } from '@/types/types';
import { MoreVertical, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import clipboard from '@/public/clipboard-icon.png';


interface AccountTableProps {
  accounts: Account[];
  currentPage: number;
  itemsPerPage: number;
}

export function AccountTable({ accounts, currentPage, itemsPerPage }: AccountTableProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAccounts = accounts.slice(startIndex, startIndex + itemsPerPage);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (accountNumber: string, id: string) => {
    navigator.clipboard.writeText(accountNumber.replace(/\s-\s/g, '')); // Remove spaces and dashes for clean copying
    setCopiedId(id); // Set the copied state for this row
    setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
  };

  return (
    <Table>
      <TableHeader className='px-6'>
        <TableRow className='px-4'>
          <TableHead className='py-7 w-[50px]'>No</TableHead>
          <TableHead className='py-7'>Account ID</TableHead>
          <TableHead className='py-7'>Account Name</TableHead>
          <TableHead className='py-7'>Account Number</TableHead>
          <TableHead className='py-7'>Bank Name</TableHead>
          <TableHead className='py-7'>Date</TableHead>
          <TableHead className="text-right py-7">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedAccounts.map((account, index) => (
          <TableRow key={account.id} className={index % 2 === 0 ? 'bg-[#F8FCFF] border-b-0' : 'bg-[#FFFFFF] border-b-0'}>
            <TableCell className="py-5">
              <input type="checkbox" className="mr-2 w-5 h-5 rounded-[10px]" />
            </TableCell>
            <TableCell>{account.accountId}</TableCell>
            <TableCell>{account.accountName}</TableCell>
            <TableCell className="flex items-center gap-2 translate-y-3">
              <span>{account.accountNumber}</span>
              <div className="flex items-center justify-center w-6 h-6 bg-[#E6F0FA] rounded-full">
                {copiedId === account.id ? (
                  <CheckCircle className="text-[#36C6F3]" size={16} />
                ) : (
                  <Image
                    className="cursor-pointer"
                    src={clipboard}
                    alt='clipboard icon'
                    width={25}
                    height={25}
                    onClick={() => handleCopy(account.accountNumber, account.id)}
                  />
                )}
              </div>
            </TableCell>
            <TableCell>{account.bankName}</TableCell>
            <TableCell>{account.date}</TableCell>
            <TableCell className="text-right">
              <MoreVertical className="cursor-pointer inline-block" size={20} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}