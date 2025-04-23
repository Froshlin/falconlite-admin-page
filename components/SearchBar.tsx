'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { SearchBarProps } from '@/types/types';

export function SearchBar({ value, onChange, placeholder = "Search" }: SearchBarProps) {
  return (
    <div className="relative mb-4 border border-gray-400 rounded-[3px] w-full h-[50px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 py-2 h-[50px] rounded-[3px]"
      />
    </div>
  );
}