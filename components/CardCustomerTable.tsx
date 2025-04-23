'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import clipboard from '@/public/clipboard-icon.png';
import { CardCustomerTableProps } from '@/types/types';

export const CardCustomerTable = ({ customers, currentPage, itemsPerPage }: CardCustomerTableProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = customers.slice(startIndex, startIndex + itemsPerPage);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (phoneNo: string, id: string) => {
    navigator.clipboard.writeText(phoneNo);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[rgba(15,213,130,0.1)] text-[#0FD582] text-[10px] font-semibold px-[10px] py-[5px] w-[88px] h-[25px] rounded-[30px]';
      default:
        return 'bg-[rgba(128,128,128,0.3)] text-gray-600 text-[10px] font-semibold px-[10px] py-[5px] w-[88px] h-[25px] rounded-[30px]';
    }
  };

  return (
    <Table>
      <TableHeader className='px-6'>
        <TableRow className='px-4'>
          <TableHead className='py-7'>CUSTOMER NAME</TableHead>
          <TableHead className='py-7'>COUNTRY</TableHead>
          <TableHead className='py-7'>PHONE NO</TableHead>
          <TableHead className='py-7 text-center'>STATUS</TableHead>
          <TableHead className="text-right py-7"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedCustomers.map((customer, index) => (
          <TableRow key={customer.id} className={index % 2 === 0 ? 'bg-[#F8FCFF] border-b-0' : 'bg-[#FFFFFF] border-b-0'}>
            <TableCell className="py-5">{customer.customerName}</TableCell>
            <TableCell className="py-5">{customer.country}</TableCell>
            <TableCell className="flex items-center gap-2 py-5">
              <span>{customer.phoneNo}</span>
              <div className="flex items-center justify-center w-6 h-6 bg-[#E6F0FA] rounded-full">
                {copiedId === customer.id ? (
                  <CheckCircle className="text-[#36C6F3]" size={16} />
                ) : (
                  <Image
                    className="cursor-pointer"
                    src={clipboard}
                    alt='clipboard icon'
                    width={25}
                    height={25}
                    onClick={() => handleCopy(customer.phoneNo, customer.id)}
                  />
                )}
              </div>
            </TableCell>
            <TableCell className="text-center">
              <span className={`inline-flex items-center justify-center ${getStatusStyles(customer.status)}`}>
                {customer.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <button className="text-[#36C6F3] text-sm">View Details</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};