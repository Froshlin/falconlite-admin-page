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
import EyeIcon from '@/public/eye-icon.png';
import { AuditLogTableProps } from '@/types/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const AuditLogTable = ({ auditLogs, currentPage, itemsPerPage, onViewDetails }: AuditLogTableProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAuditLogs = auditLogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='py-7'>MEMBER</TableHead>
          <TableHead className='py-7'>USER ROLE</TableHead>
          <TableHead className='py-7'>ACTIVITY</TableHead>
          <TableHead className='py-7'>DATE</TableHead>
          <TableHead className="text-right py-7"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedAuditLogs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-5">
              No audit logs found.
            </TableCell>
          </TableRow>
        ) : (
          paginatedAuditLogs.map((log, index) => (
            <TableRow key={log.id} className={index % 2 === 0 ? 'bg-[#F8FCFF] border-b-0' : 'bg-[#FFFFFF] border-b-0'}>
              <TableCell className="py-5">{log.member}</TableCell>
              <TableCell className="py-5">
                <div className="flex gap-2">
                  {log.roles.map((role, selected_role) => (
                    <span
                      key={selected_role}
                      className={
                        role === 'Owner'
                          ? 'bg-[#36C6F3] text-white text-[12px] font-semibold px-[15px] h-[25px] rounded-[30px] flex items-center'
                          : 'bg-[#0FD582] text-white text-[12px] font-semibold px-[15px] h-[25px] rounded-[30px] flex items-center'
                      }
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="py-5">{log.activity}</TableCell>
              <TableCell className="py-5">{log.date}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => onViewDetails && onViewDetails(log.id)}
                  className="cursor-pointer hover:bg-transparent"
                >
                  <Image src={EyeIcon} alt='eye icon' width={24} height={24}/>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};