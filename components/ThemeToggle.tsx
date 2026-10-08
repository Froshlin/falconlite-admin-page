'use client';

import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = mounted && theme === 'dark';

  return (
    <div className="flex items-center space-x-2 bg-[#0E3B4C] w-[250px] h-[74px] rounded-2xl px-4 py-2">
      <Switch
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-white data-[state=unchecked]:bg-gray-400"
      />
      <Label htmlFor="theme-toggle" className="flex items-center gap-2 text-white">
        {isDark ? <Moon size={16} className="text-white" /> : <Sun size={16} className="text-white" />}
        <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      </Label>
    </div>
  );
}