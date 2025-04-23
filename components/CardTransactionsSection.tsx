import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CardTransactionsData } from '@/types/types';
import { fetchCardTransactionsData } from '@/lib/api';

const CardTransactionsSection = () => {
  const [data, setData] = useState<CardTransactionsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const transactionsData = await fetchCardTransactionsData();
        setData(transactionsData);
      } catch (error) {
        console.error("Error fetching card transaction data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="h-48 flex items-center justify-center">Loading card transaction data...</div>;
  }

  if (!data) {
    return <div className="h-48 flex items-center justify-center">Unable to load card transaction data</div>;
  }

  return (
    <Card className="mb-4 border border-gray-[#8B9DA4] gap-0 py-0 shadow-none rounded-[29px]">
      <CardHeader className="px-0 gap-0">
        <CardTitle className="text-xl py-6 px-6 border-b border-gray-[#8B9DA4]">Card Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {data.categories.map((category, index) => (
            <div key={index} className={`px-4 pt-4 ${index !== data.categories.length - 1 ? 'border-r border-[#D3D3D3]' : ''}`}>
              <p className="text-[#8B9DA4] mb-3">{category.label}</p>
              <p className="text-xl font-bold text-[#0E3B4C]">{category.count}</p>
              
              <div>
                <div className="flex justify-between text-sm border-b border-[#D3D3D3] text-[#0E3B4C] py-1 pt-6">
                  <span className="font-medium">Amount</span>
                  <span className="font-medium">{category.amount}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-[#D3D3D3] text-[#0E3B4C] py-1 pt-6">
                  <span className="font-medium">Charge</span>
                  <span className="font-medium">{category.charge}</span>
                </div>
                <div className="flex justify-between text-sm text-[#0E3B4C] pt-6 pb-8">
                  <span className="font-medium">Profit</span>
                  <span className="font-medium text-green-500">{category.profit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTransactionsSection;