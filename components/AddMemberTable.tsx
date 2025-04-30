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
import { CheckCircle, X } from 'lucide-react';
import clipboard from '@/public/clipboard-icon.png';
import { AddMemberTableProps, Role } from '@/types/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const AddMemberTable = ({ customers, currentPage, itemsPerPage, onAddMember }: AddMemberTableProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = customers.slice(startIndex, startIndex + itemsPerPage);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | ''>('');

  const handleCopy = (phoneNo: string, id: string) => {
    navigator.clipboard.writeText(phoneNo);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getGenderStyles = (gender: string) => {
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
      case 'Active':
        return 'bg-[rgba(15,213,130,0.1)] text-[#0FD582] text-[10px] font-semibold px-[15px] w-[88px] h-[25px] rounded-[30px]';
      case 'Inactive':
        return 'bg-[rgba(232,40,40,0.3)] text-[#E82828] text-[10px] font-semibold px-[15px] w-[88px] h-[25px] rounded-[30px]';
      default:
        return '';
    }
  };

  const handleAddClick = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setSelectedRole('');
    setIsModalOpen(true);
  };

  const handleAddMember = () => {
    if (selectedCustomerId && selectedRole) {
      onAddMember(selectedCustomerId, selectedRole);
      setIsModalOpen(false);
      setSelectedCustomerId(null);
      setSelectedRole('');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomerId(null);
    setSelectedRole('');
  };

  return (
    <>
      <Table>
        <TableHeader className='px-6'>
          <TableRow className='px-4'>
            <TableHead className='py-7'>NAME</TableHead>
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
              <TableCell colSpan={8} className="text-center py-5">
                No customers found.
              </TableCell>
            </TableRow>
          ) : (
            paginatedCustomers.map((customer, index) => (
              <TableRow key={customer.id} className={index % 2 === 0 ? 'bg-[#F8FCFF] border-b-0' : 'bg-[#FFFFFF] border-b-0'}>
                <TableCell className="py-5 flex items-center gap-2">
                  <div className='w-[31px] h-[31px] bg-gray-200 rounded-full flex items-center justify-center'>
                    <span className="text-[12px] font-semibold text-gray-600">
                      {customer.customerName.split(' ').map(name => name[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  {customer.customerName}
                </TableCell>
                <TableCell className="py-5">{customer.age}</TableCell>
                <TableCell className="py-5">
                  <span className={getGenderStyles(customer.gender)}>
                    {customer.gender}
                  </span>
                </TableCell>
                <TableCell className="py-5">{customer.date}</TableCell>
                <TableCell className="py-5 flex items-center gap-2">
                  <span>{customer.phoneNo}</span>
                  <div className="flex items-center justify-center w-6 h-6 bg-[#E6F0FA] rounded-full">
                    {copiedId === customer.id ? (
                      <CheckCircle className="text-[#36C6F3]" size={16} />
                    ) : (
                      <Image
                        src={clipboard}
                        className="cursor-pointer"
                        alt='copy icon'
                        width={25}
                        height={25}
                        onClick={() => handleCopy(customer.phoneNo, customer.id)}
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-5">{customer.email}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center justify-center ${getStatusStyles(customer.status)}`}>
                    {customer.status.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="bg-[#36C6F3] hover:bg-[#2a9cbf] text-white text-sm px-4 py-1 rounded-[5px] flex items-center gap-1"
                    onClick={() => handleAddClick(customer.id)}
                  >
                    Add
                    <span className="text-lg">+</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(139,143,144,0.3)] w-[80%] left-[20%] top-[14.5%] backdrop-blur-[2px] z-2100">
          <div className="bg-white rounded-lg p-6 w-[604px] h-[228px] relative">
            <h2 className="text-[13px] font-medium text-[#0E3B4C] mb-5">Select Role</h2>
            <Select
              value={selectedRole || ''}
              onValueChange={(value) => setSelectedRole(value as Role)}
              defaultValue=""
            >
              <SelectTrigger className="w-full border-gray-300 mb-[55px] h-[85px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent className='z-2111'>
                <SelectItem value="Owner">Owner</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Customer Support">Customer Support</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-between">
              <Button
                className="bg-[#36C6F3] hover:bg-[#2a9cbf] text-white px-4 py-2 rounded-[5px]"
                onClick={handleAddMember}
                disabled={!selectedRole}
              >
                Done
              </Button>
              <Button
                variant="ghost"
                className="text-[#0E3B4C] flex items-center gap-1"
                onClick={handleCloseModal}
              >
                Close <X size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};