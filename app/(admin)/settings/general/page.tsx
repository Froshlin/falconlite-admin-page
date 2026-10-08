'use client';

import React, { useState, useEffect } from 'react';
import { fetchOrganization } from '@/lib/api';
import { Organization } from '@/types/types';

export default function GeneralPage() {
  const [organization, setOrganization] = useState<Organization>({
    name: '',
    id: '',
  });

  useEffect(() => {
    const loadOrganization = async () => {
      try {
        const orgData = await fetchOrganization();
        setOrganization(orgData);
      } catch (error) {
        console.error('Error fetching organization details:', error);
      }
    };

    loadOrganization();
  }, []);

  return (
    <div className="py-8 mt-8 min-h-screen">
      <h1 className="text-2xl font-semibold text-foreground mb-20">
        General
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border border-border rounded-lg p-4">
          <label className="block sm:text-xs text-[9px] text-muted-foreground font-medium">
            Organisation Name
          </label>
          <div className="text-muted-foreground sm:text-sm text-[10px]">{organization.name}</div>
        </div>

        {/* Organization ID */}
        <div className="flex items-center justify-between flex-wrap gap-2 border border-border rounded-lg p-4">
          <label className="block sm:text-xs text-[9px] text-muted-foreground font-medium">
            Organisation ID
          </label>
          <div className="text-muted-foreground sm:text-sm text-[10px]">{organization.id}</div>
        </div>
      </div>
    </div>
  );
}
