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
import { UnverifiedCustomerTableProps } from '@/types/types';
import { CustomerActions } from './CustomerActions';

export const UnverifiedCustomerTable = ({ customers, currentPage, itemsPerPage }: UnverifiedCustomerTableProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = customers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Table>
      <TableHeader className='px-6'>
        <TableRow className='px-4'>
          <TableHead className='py-7'>
            <input type="checkbox" className="mr-2" />
            ID
          </TableHead>
          <TableHead className='py-7'>EMAIL</TableHead>
          <TableHead className='py-7'>DATE</TableHead>
          <TableHead className="text-right py-7"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedCustomers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-5">
              No customers found.
            </TableCell>
          </TableRow>
        ) : (
          paginatedCustomers.map((customer, index) => (
            <TableRow key={customer.id} className={index % 2 === 0 ? 'bg-[#F8FCFF] border-b-0' : 'bg-[#FFFFFF] border-b-0'}>
              <TableCell className="py-5 flex items-center gap-2">
                <input type="checkbox" className="mr-2" />
                {customer.id}
              </TableCell>
              <TableCell className="py-5">{customer.email || 'N/A'}</TableCell>
              <TableCell className="py-5">{customer.date || 'N/A'}</TableCell>
              <TableCell className="text-right">
              <CustomerActions customer={customer} tableType="unverified" onCustomerUpdate={() => window.location.reload()} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};