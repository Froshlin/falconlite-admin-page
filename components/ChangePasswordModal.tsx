'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { ChangePasswordModalProps } from '@/types/types';

export const ChangePasswordModal = ({ isOpen, onClose, onSave }: ChangePasswordModalProps) => {
  const [newPassword, setNewPassword] = useState<string>('');

  const handleSave = () => {
    onSave(newPassword);
    setNewPassword('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-[#0E3B4C] mb-1 font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-[5px] focus:outline-none text-[#0E3B4C] text-sm"
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            className="bg-[#36C6F3] hover:bg-[#2a9cbf] text-white text-sm font-medium rounded-sm px-4 py-2"
            onClick={handleSave}
          >
            Save Password
          </Button>
        </div>
      </div>
    </Modal>
  );
};