'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationControlsProps } from '@/types/types';

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  // Responsive state
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  
  // Update viewport width on resize
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine max pages to show based on viewport width
  const getMaxPagesToShow = () => {
    if (viewportWidth < 480) return 3; // Mobile: just show current page and ellipses
    if (viewportWidth < 640) return 5; // Small screens
    return 7; // Larger screens
  };
  
  const maxPagesToShow = getMaxPagesToShow();
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);
  
  // Calculation for the range of pages to be displayed
  let startPage = Math.max(1, currentPage - halfPagesToShow);
  let endPage = Math.min(totalPages, currentPage + halfPagesToShow);
  
  // Adjust start and end pages if necessary
  if (endPage - startPage + 1 < maxPagesToShow) {
    if (currentPage <= halfPagesToShow + 1) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }
  }
  
  // Create the array of page numbers and ellipses
  const pages: (number | string)[] = [];
  
  // Special handling for very small screens or small number of total pages
  if (viewportWidth < 480 && totalPages > 3) {
    if (currentPage <= 2) {
      pages.push(1, 2);
      if (totalPages > 2) pages.push('...', totalPages);
    } else if (currentPage >= totalPages - 1) {
      pages.push(1, '...', totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage, '...', totalPages);
    }
  } else {
    // Regular pagination logic for larger screens
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
    
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  }
  
  return (
    <div className="flex items-center gap-1 sm:gap-2">
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
            <span className="px-1 sm:px-2">...</span>
          ) : (
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className="cursor-pointer w-8 sm:w-auto"
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