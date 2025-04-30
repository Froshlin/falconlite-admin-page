'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { PaginationControls } from '@/components/PaginationControls';
import { ColumnsDropdown } from '@/components/ColumnsDropdown';
import TeamTable from '@/components/TeamTable';
import { TeamMember } from '@/types/types';
import { fetchTeamMembers, removeTeamMember } from '@/lib/api';
import { SquarePlus } from 'lucide-react';

const TeamManagement = () => {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7); // Default to 3 as per screenshot

  useEffect(() => {
    const loadTeamMembers = async () => {
      const members = await fetchTeamMembers();
      setTeamMembers(members);
      setFilteredMembers(members);
    };
    loadTeamMembers();
  }, []);

  useEffect(() => {
    const filtered = teamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [searchTerm, teamMembers]);

  const handleRemoveMember = async (id: string) => {
    const { success } = await removeTeamMember(id);
    if (success) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    }
  };

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = filteredMembers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4 mt-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0E3B4C]">
            Team Management
          </h1>
          <p className="text-sm text-gray-500">Add and remove team members</p>
        </div>
        <Button
          className="bg-[#36C6F3] hover:bg-[#2a9cbf] text-white w-[189px] h-[46px] rounded-[4px] flex items-center justify-center gap-x-0 cursor-pointer"
          onClick={() => router.push('/settings/team/add-member')}
        >
          <span>Add Member</span>
          <SquarePlus className="ml-2" size={21} color="white" />
        </Button>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search team member"
      />

      <div className="border border-[#d7d9db] rounded-[7px] mt-8">
        <TeamTable
          teamMembers={paginatedMembers}
          onRemoveMember={handleRemoveMember}
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <ColumnsDropdown
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          totalRows={filteredMembers.length}
        />
      </div>
    </div>
  );
};

export default TeamManagement;
