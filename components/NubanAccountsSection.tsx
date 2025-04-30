import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NubanAccountsData } from '@/types/types';
import { fetchNubanAccountsData } from '@/lib/api';

const NubanAccountsSection = () => {
  const [data, setData] = useState<NubanAccountsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const accountsData = await fetchNubanAccountsData();
        setData(accountsData);
      } catch (error) {
        console.error('Error fetching Nuban accounts data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="h-24 flex items-center justify-center">Loading accounts data...</div>;
  }

  if (!data) {
    return <div className="h-24 flex items-center justify-center">Unable to load accounts data</div>;
  }

  return (
    <Card className="mb-3 bg-[#F3F3F4] h-auto border border-[#D3D3D3] rounded-[7px] shadow-none">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className='flex justify-between items-center'>
            <p className="text-[16px] font-medium text-[#8B9DA4]">Nuban Accounts</p>
            <p className="text-2xl font-semibold text-[#0E3B4C]">{data.accounts}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className="text-[16px] font-medium text-[#8B9DA4]">Available Balance</p>
            <p className="text-2xl font-semibold text-[#0E3B4C]">{data.balance}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NubanAccountsSection;