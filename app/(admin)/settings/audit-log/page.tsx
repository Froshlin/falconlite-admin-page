'use client';

import React, { useState, useEffect } from 'react';
import { fetchAuditLogs, fetchAuditNotification } from '@/lib/api';
import { AuditLog, Notification } from '@/types/types';
import { AuditLogTable } from '@/components/AuditLogTable';
import { SearchBar } from '@/components/SearchBar';
import { PaginationControls } from '@/components/PaginationControls';
import { ColumnsDropdown } from '@/components/ColumnsDropdown';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Upload } from 'lucide-react';
import '@/styles/globals.css';

export default function AuditLogsPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [notification, setNotification] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(7);

  // Fetch audit logs and notification
  useEffect(() => {
    const loadData = async () => {
      try {
        const logs: AuditLog[] = await fetchAuditLogs();
        const notificationData: Notification = await fetchAuditNotification();
        setAuditLogs(logs);
        setNotification(notificationData.message);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      }
    };

    loadData();
  }, []);

  // Filter audit logs based on search query
  const filteredAuditLogs = auditLogs.filter(log =>
    log.member.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalItems = filteredAuditLogs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  // Placeholder for export functionality
  const handleExport = () => {
    console.log('Export functionality to be implemented');
  };

  // Placeholder for live toggle
  const [isLive, setIsLive] = useState<boolean>(false);
  const handleToggleLive = () => {
    setIsLive(!isLive);
    console.log('Live toggle:', !isLive);
  };

  // Placeholder for view details
  const handleViewDetails = (id: string) => {
    console.log('View details for audit log ID:', id);
  };

  return (
    <div className="py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 mt-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0E3B4C]">Audit Logs</h1>
          <p className="text-sm text-gray-500">{notification}</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1">
            <Switch checked={isLive} onCheckedChange={handleToggleLive}/>
            <span className="text-[20px] font-medium text-[#0E3B4C]">Live</span>
          </div>
          <Button
            className="bg-[#36C6F3] hover:bg-[#2a9cbf] w-[140px] h-[46px] rounded-sm text-white flex items-center gap-1 cursor-pointer"
            onClick={handleExport}
          >
            <span className='text-sm font-medium'>Export</span>
            <Upload size={16} />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search team member"
        />
      </div>

      {/* Audit Logs Table */}
      <div className="border border-[#d7d9db] rounded-[7px] mt-8">
        <AuditLogTable
          auditLogs={filteredAuditLogs}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Pagination and Columns Dropdown */}
      <div className="flex justify-between items-center mt-4">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <ColumnsDropdown
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalRows={totalItems}
        />
      </div>
    </div>
  );
}