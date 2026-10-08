'use client';

import React from 'react';
import { X } from 'lucide-react';
import { ModalProps } from '@/types/types';

export const CustomerModal = ({ isOpen, onClose, title, children, className }: ModalProps & { className?: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-2150">
      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(139,143,144,0.3)] backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative bg-card rounded-lg py-6 ${className || 'w-[90vw] max-w-[604px] max-h-[90vh] shadow-lg rounded-lg'}`}>
        <div className="flex justify-between items-center mb-4 border-b border-border pt-5 pb-4 px-6">
          <h2 className="text-[16px] font-medium text-muted-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="text-card-foreground border border-border py-2 px-4 rounded-sm text-[12px] font-medium flex items-center gap-1 cursor-pointer"
          >
            Close
            <X size={15} className="text-card-foreground font-medium" />
          </button>
        </div>
        <div className="max-w-[604px] max-h-[calc(90vh-120px)] overflow-y-auto px-6 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};