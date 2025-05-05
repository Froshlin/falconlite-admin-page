// app/overview/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CardComponent } from '@/components/CardComponent';
import { OverviewTabs } from '@/components/OverviewTabs';
import { TransactionAnalytics } from '@/components/TransactionAnalytics';
import { UserSegmentation } from '@/components/UserSegmentation';
import { TopPlatforms } from '@/components/TopPlatforms';
import {
  Stat,
  UserInfo,
  Notification,
  TransactionDataPoint,
  UserSegmentation as UserSegmentationType,
  TopPlatform,
} from '@/types/types';
import {
  fetchStats,
  fetchUserInfo,
  fetchNotification,
  fetchNubanTransactionData,
  fetchUserSegmentation,
  fetchTopPlatforms,
} from '@/lib/api';
import SummarySection from '@/components/SummarySection';
import CardTransactionsSection from '@/components/CardTransactionsSection';
import NubanTransactionsSection from '@/components/NubanTransactionsSection';
import NubanAccountsSection from '@/components/NubanAccountsSection';

const OverviewPage = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '' });
  const [notification, setNotification] = useState<Notification>({
    message: '',
  });
  const [transactionData, setTransactionData] = useState<
    TransactionDataPoint[]
  >([]);
  const [userSegmentation, setUserSegmentation] = useState<
    UserSegmentationType[]
  >([]);
  const [topPlatforms, setTopPlatforms] = useState<TopPlatform[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [
          statsData,
          userData,
          notificationData,
          transactionData,
          userSegmentationData,
          topPlatformsData,
        ] = await Promise.all([
          fetchStats(selectedTimeRange),
          fetchUserInfo(),
          fetchNotification(),
          fetchNubanTransactionData(),
          fetchUserSegmentation(),
          fetchTopPlatforms(),
        ]);
        setStats(statsData);
        setUserInfo(userData);
        setNotification(notificationData);
        setTransactionData(transactionData);
        setUserSegmentation(userSegmentationData);
        setTopPlatforms(topPlatformsData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedTimeRange]);

  const handleTimeRangeChange = (timeRange: string) => {
    setSelectedTimeRange(timeRange);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="pt-10">
      <div className="flex flex-col lg:flex-row lg:gap-0 gap-6 lg:items-center justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-2xl text-[#0E3B4C]">
            {getGreeting()}, {userInfo.name}!
          </h1>
          <div className="flex items-center gap-1">
            <div className="bg-[#0E3B4C] w-4 h-4 rounded-full"></div>
            <p className="text-sm text-[#8B9DA4]">{notification.message}</p>
          </div>
        </div>
        <OverviewTabs onTimeRangeChange={handleTimeRangeChange} />
      </div>
      <div className="py-8 w-full">
        <CardComponent stats={stats} />
      </div>
      <div className="py-8 flex flex-col xl:flex-row justify-between gap-6">
        <div className="flex flex-col gap-14">
          <TransactionAnalytics
            transactionData={transactionData}
            title="Nuban Transaction Analytics"
          />
          <TransactionAnalytics
            transactionData={transactionData}
            title="Card Transaction Analytics"
          />
        </div>
        <div className="flex flex-row max-[650px]:flex-col max-[768px]:flex-row max-[921px]:flex-col xl:flex-col max-[1280px]:justify-between items-end gap-14">
          <UserSegmentation userSegmentation={userSegmentation} />
          <TopPlatforms topPlatforms={topPlatforms} />
        </div>
      </div>
      <div className="py-8">
        <div className="py-8"><SummarySection/></div>
        <div className="py-8"><CardTransactionsSection/></div>
        <div className="py-8"><NubanTransactionsSection/></div>
        <div className="py-8"><NubanAccountsSection/></div>
        
      </div>
    </div>
  );
};

export default OverviewPage;
