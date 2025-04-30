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
import { CheckCircle} from 'lucide-react';
import clipboard from '@/public/clipboard-icon.png';
import { VerifiedCustomerTableProps } from '@/types/types';
import { CustomerActions } from './CustomerActions';

export const VerifiedCustomerTable = ({ customers, currentPage, itemsPerPage }: VerifiedCustomerTableProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = customers.slice(startIndex, startIndex + itemsPerPage);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (phoneNo: string, id: string) => {
    navigator.clipboard.writeText(phoneNo);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getGenderStyles = (gender: string | undefined) => {
    switch (gender) {
      case 'M':
        return 'bg-[#FF5F00] font-semibold text-[12px] text-white w-[31px] h-[31px] flex items-center justify-center rounded-full';
      case 'F':
        return 'bg-[#F79E1B] font-semibold text-[12px] text-white w-[31px] h-[31px] flex items-center justify-center rounded-full';
      default:
        return 'bg-gray-300 font-semibold text-[12px] text-white w-[31px] h-[31px] flex items-center justify-center rounded-full';
    }
  };

  const getStatusStyles = (status: string) => {
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
          <TableHead className='py-7'>
            <input type="checkbox" className="mr-2" />
            NAME
          </TableHead>
          <TableHead className='py-7'>ROLE</TableHead>
          <TableHead className='py-7'>AGE</TableHead>
          <TableHead className='py-7'>GENDER</TableHead>
          <TableHead className='py-7'>DATE</TableHead>
          <TableHead className='py-7'>PHONE NO</TableHead>
          <TableHead className='py-7'>EMAIL</TableHead>
          <TableHead className="text-center py-7">STATUS</TableHead>
          <TableHead className="text-right py-7"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedCustomers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-5">
              No customers found.
            </TableCell>
          </TableRow>
        ) : (
          paginatedCustomers.map((customer, index) => (
            <TableRow key={customer.id} className={index % 2 === 0 ? 'bg-[#F8FCFF] border-b-0' : 'bg-[#FFFFFF] border-b-0'}>
              <TableCell className="py-5 flex items-center gap-2">
                <input type="checkbox" className="mr-2" />
                <div className='flex items-center gap-2'>
                    <Image
                        src={customer.image}
                        alt="customer-icon"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                    {customer.customerName}
                </div>
              </TableCell>
              <TableCell className="py-5">{customer.role || 'N/A'}</TableCell>
              <TableCell className="py-5">{customer.age || 'N/A'}</TableCell>
              <TableCell className="py-5">
                <span className={getGenderStyles(customer.gender)}>
                  {customer.gender || 'N/A'}
                </span>
              </TableCell>
              <TableCell className="py-5">{customer.date || 'N/A'}</TableCell>
              <TableCell className="py-5 flex items-center gap-2">
                <span>{customer.phoneNo}</span>
                <div className="flex items-center justify-center w-6 h-6 bg-[#E6F0FA] rounded-full">
                    {copiedId === customer.id ? (
                        <CheckCircle className="text-[#36C6F3]" size={16} />
                    ) : (
                        <Image
                        className="cursor-pointer"
                        src={clipboard}
                        alt='copy icon'
                        width={25}
                        height={25}
                        onClick={() => handleCopy(customer.phoneNo, customer.id)}
                        />
                    )}
                </div>
              </TableCell>
              <TableCell className="py-5">{customer.email || 'N/A'}</TableCell>
              <TableCell className="text-center">
                <span className={`inline-flex items-center justify-center ${getStatusStyles(customer.status)}`}>
                  {customer.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
              <CustomerActions customer={customer} tableType="verified" onCustomerUpdate={() => window.location.reload()} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};