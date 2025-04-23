'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { UserSegmentation as UserSegmentationType } from '@/types/types';

interface UserSegmentationProps {
  userSegmentation: UserSegmentationType[];
}

export const UserSegmentation: React.FC<UserSegmentationProps> = ({ userSegmentation }) => {
  const COLORS = ['#36C6F3', '#F45DB7'];


  return (
    <Card className="shadow-none w-[338px] h-[458px] flex flex-col justify-between rounded-[29px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-gray-600">User Segmentation</CardTitle>
        <Select defaultValue="gender">
          <SelectTrigger className="w-[100px] h-8 text-xs">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gender">Gender</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={userSegmentation}
              cx="30%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              labelLine = {false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                
                return (
                  <text 
                    x={x} 
                    y={y} 
                    fill="white" 
                    textAnchor="middle" 
                    dominantBaseline="central"
                    fontWeight="bold"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {userSegmentation.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              className='absolute -top-[76%] lef-[5px]'
              layout="vertical"
              align="left"
              verticalAlign="top"
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-gray-600 ">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};