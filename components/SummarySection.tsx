import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SummaryData } from '@/types/types';
import { fetchSummaryData } from '@/lib/api';

const SummarySection = () => {
  const [data, setData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const summaryData = await fetchSummaryData();
        setData(summaryData);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="h-48 flex items-center justify-center">Loading summary data...</div>;
  }

  if (!data) {
    return <div className="h-48 flex items-center justify-center">Unable to load summary data</div>;
  }

  return (
    <Card className="mb-4 border border-border gap-0 py-0 shadow-none rounded-[29px]">
      <CardHeader className="px-0 gap-0">
        <CardTitle className="text-xl py-6 px-6 border-b border-border">Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Transaction Limit Section */}
          <div className="pb-14 pt-4 pr-4 sm:border-r border-border">
            <p className="py-2 text-sm text-muted-foreground">Transaction Limit</p>
            <p className="py-4 text-2xl font-bold text-foreground">{data.transactionLimit}</p>
          </div>

          {/* Amount Section */}
          <div className="pb-14 pt-6 px-4 sm:border-r border-border">
            <p className="py-2 text-sm text-muted-foreground">Amount</p>
            <p className="py-4 text-2xl font-bold text-foreground">{data.amount.value}</p>
            <p className="text-xs text-muted-foreground">{data.amount.formatted}</p>
            <p className="text-xs text-muted-foreground">{data.amount.description}</p>
          </div>

          {/* Profit Section */}
          <div className="pb-14 pt-6 pl-4">
            <p className="py-2 text-sm text-muted-foreground">Profit</p>
            <p className="py-4 text-2xl font-bold text-foreground">{data.profit.value}</p>
            <p className="text-xs text-muted-foreground">{data.profit.formatted}</p>
            <p className="text-xs text-muted-foreground">{data.profit.description}</p>
          </div>
        </div>
        {/* Note: Amount and Profit are identical (₦281,651K). Investigate if this is intentional or a data issue. */}
      </CardContent>
    </Card>
  );
};

export default SummarySection;