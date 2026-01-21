
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronLeft, ChevronRight, TrendingUp, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { ScheduleItem } from '../types';

interface WeeklySummaryProps {
  schedules: ScheduleItem[];
}

export const WeeklySummary: React.FC<WeeklySummaryProps> = ({ schedules }) => {
  const completedCount = schedules.filter(s => s.completed).length;
  const completionRate = schedules.length > 0 ? Math.round((completedCount / schedules.length) * 100) : 0;

  // Mock data for weekly distribution
  const data = [
    { name: '실무', value: 15, color: '#1A237E' },
    { name: '영업', value: 10, color: '#AA8D7C' },
    { name: '관리', value: 7, color: '#355941' },
    { name: '회계', value: 4, color: '#4DA66B' },
  ];

  return (
    <div className="p-6 pb-32">
      <header className="flex items-center justify-between mb-8">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">주간 요약</h1>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronRight size={24} />
        </button>
      </header>

      <div className="flex justify-center mb-8">
        <div className="bg-white dark:bg-navy-card rounded-full px-6 py-2 shadow-sm border border-gray-100 dark:border-gray-800 font-bold text-sm">
          10월 23일 - 10월 29일
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Metric Card */}
        <div className="bg-white dark:bg-navy-card p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">완료된 업무</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-extrabold">{completedCount + 28}<span className="text-lg font-bold ml-1 text-gray-400">개</span></h2>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                  <TrendingUp size={12} />
                  +12%
                </div>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full">
              <CheckCircle2 size={24} />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-400">
              <span>주간 목표 달성률</span>
              <span>82%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-deep-navy dark:bg-indigo-500 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white dark:bg-navy-card p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg">프로젝트별 현황</h3>
            <button className="text-xs font-bold text-blue-500">상세보기</button>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 700, fill: '#9CA3AF' }} 
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">상세 내역 (Details)</h3>
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-navy-card rounded-2xl border border-gray-50 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="font-bold text-sm">{item.name}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Growth Strategy</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">{item.value}건</p>
              <p className="text-[10px] font-bold text-gray-400">{Math.round((item.value/36)*100)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
