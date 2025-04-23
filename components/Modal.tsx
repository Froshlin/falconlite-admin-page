'use client';

import React from 'react';
import { X } from 'lucide-react';
import { ModalProps } from '@/types/types';
import '../styles/globals.css';

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-2100">
      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(139,143,144,0.3)] w-[80%] left-[20%] top-[14.5%] backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg py-6 w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[50vw] lg:max-w-[45vw] md:ml-auto md:mr-10 shadow-lg">
        <div className="flex justify-between items-center mb-4 border-b border-[#d7d9db] pt-5 pb-4 px-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#0A0E3F]">{title}</h2>
          <button onClick={onClose} className="text-[#0E3B4C] border border-[rgba(135,140,141,0.5)] py-2 px-4 rounded-sm text-[12px] font-medium flex items-center gap-1 cursor-pointer">
            Close
            <X size={15} className='text-[#0E3B4C] font-medium'/>
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto px-6 pt-4 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};