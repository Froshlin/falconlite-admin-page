'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import cancel from '@/public/cancel-icon.png';
import { TeamTableProps } from '@/types/types';
import { toggleTeamMemberStatus } from '@/lib/api';
import ConfirmModal from '@/components/ConfirmModal';

const TeamTable: React.FC<TeamTableProps> = ({ teamMembers, onRemoveMember }) => {
  const [members, setMembers] = useState(teamMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{ id: string; name: string } | null>(null);

  // Sync local state with prop changes
  useEffect(() => {
    setMembers(teamMembers);
  }, [teamMembers]);

  const getRoleStyles = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'bg-[#36C6F3] w-[68px] h-[27px] text-white text-[12px] text-center font-semibold px-[10px] py-[5px] rounded-[30px]';
      case 'Admin':
        return 'bg-[#0FD582] w-[68px] h-[27px] text-white text-[12px] text-center font-semibold px-[10px] py-[5px] rounded-[30px]';
      case 'Customer Support':
        return 'bg-[#F79E1B] w-[125px] h-[27px] text-white text-[12px] text-center font-semibold py-[5px] rounded-[30px]';
      default:
        return '';
    }
  };

  const getLoginStatusStyles = (status: string) => {
    return status === 'Logged In' ? 'text-[#0FD582]' : 'text-[#E82828]';
  };

  const handleRemoveClick = (memberId: string, memberName: string) => {
    setMemberToRemove({ id: memberId, name: memberName });
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (memberToRemove) {
      onRemoveMember(memberToRemove.id);
    }
    setIsModalOpen(false);
    setMemberToRemove(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMemberToRemove(null);
  };

  const handleToggleStatus = async (memberId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    setMembers(members.map(member =>
      member.id === memberId ? { ...member, isActive: newStatus } : member
    ));

    const { success } = await toggleTeamMemberStatus(memberId, newStatus);
    if (!success) {

      setMembers(members.map(member =>
        member.id === memberId ? { ...member, isActive: currentStatus } : member
      ));
      alert('Failed to update team member status.');
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="py-4 text-[#0E3B4C] font-medium text-sm">
              <input type="checkbox" className="mr-2" />
              NAME
            </TableHead>
            <TableHead className="py-4 text-[#0E3B4C] font-medium text-sm"></TableHead>
            <TableHead className="py-4 text-[#0E3B4C] font-medium text-sm">EMAIL</TableHead>
            <TableHead className="py-4 text-[#0E3B4C] font-medium text-sm">USER ROLE</TableHead>
            <TableHead className="py-4 text-[#0E3B4C] font-medium text-sm text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-5 text-gray-500">
                No team members found.
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow key={member.id} className="bg-white">
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="mr-2" />
                    <Image
                      src={member.image}
                      alt="member-icon"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm text-[#0E3B4C]">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`font-semibold text-xs ${getLoginStatusStyles(member.loginStatus)}`}>
                      {member.loginStatus}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-sm text-[#0E3B4C]">{member.email}</TableCell>
                <TableCell className="py-4">
                  <div className="flex gap-2">
                    {member.roles.map((role, key_role) => (
                      <span key={key_role} className={getRoleStyles(role)}>
                        {role}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Switch
                      checked={member.isActive}
                      onCheckedChange={() => handleToggleStatus(member.id, member.isActive)}
                      className='cursor-pointer'
                    />
                    <Button
                      variant="ghost"
                      className="flex items-center justify-center gap-0.5 hover:bg-transparent cursor-pointer"
                      onClick={() => handleRemoveClick(member.id, member.name)}
                    >
                      <Image src={cancel} alt='cancel-icon' width={19} height={19}/>
                      <span className='font-semibold text-[15px] text-[#E82828]'>Remove</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {memberToRemove && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmRemove}
          memberName={memberToRemove.name}
        />
      )}
    </>
  );
};

export default TeamTable;