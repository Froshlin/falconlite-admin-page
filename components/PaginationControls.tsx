'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationControlsProps } from '@/types/types';

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const maxPagesToShow = 7;
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);

  // Calculation for the range of pages to displayed
  let startPage = Math.max(1, currentPage - halfPagesToShow);
  let endPage = Math.min(totalPages, currentPage + halfPagesToShow);

  if (endPage - startPage + 1 < maxPagesToShow) {
    if (currentPage <= halfPagesToShow + 1) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }
  }

  
  const pages: (number | string)[] = [];

  pages.push(1);

  if (startPage > 2) {
    pages.push('...');
  }

  for (let i = startPage; i <= endPage; i++) {
    if (i !== 1 && i !== totalPages) {
      pages.push(i);
    }
  }

  if (endPage < totalPages - 1) {
    pages.push('...');
  }

  if (endPage < totalPages) {
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer"
      >
        <ChevronLeft size={16} />
      </Button>

      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'string' ? (
            <span className="px-2">...</span>
          ) : (
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className="cursor-pointer"
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}