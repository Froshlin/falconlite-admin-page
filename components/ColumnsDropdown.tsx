'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { ColumnsDropdownProps } from '@/types/types';

export function ColumnsDropdown({
  itemsPerPage,
  onItemsPerPageChange,
}: ColumnsDropdownProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 border border-gray-300 rounded px-3 py-2 text-sm cursor-pointer">
          <span>{itemsPerPage} columns</span>
          <ChevronDown size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onItemsPerPageChange(7)}>
            7 columns
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onItemsPerPageChange(12)}>
            12 columns
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onItemsPerPageChange(16)}>
            16 columns
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onItemsPerPageChange(20)}>
            20 columns
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

