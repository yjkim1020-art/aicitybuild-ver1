
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Target, Zap, Clock, TrendingUp } from 'lucide-react';
import { ScheduleItem } from '../types';

interface StatsDashboardProps {
  schedules: ScheduleItem[];
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ schedules }) => {
  const categoryData = [
    { name: '실무', value: 45, color: '#FF6D00' },
    { name: '미팅', value: 25, color: '#1A237E' },
    { name: '행정', value: 15, color: '#4DA66B' },
    { name: '기타', value: 15, color: '#9CA3AF' },
  ];

  const trendData = [
    { day: '월', score: 65 },
    { day: '화', score: 85 },
    { day: '수', score: 78 },
    { day: '목', score: 92 },
    { day: '금', score: 88 },
    { day: '토', score: 45 },
    { day: '일', score: 30 },
  ];

  return (
    <div className="p-6 pb-32 animate-in fade-in duration-500">
      <header className="mb-8">
        <p className="text-vibrant-orange font-bold text-sm uppercase tracking-widest mb-1">Performance Insight</p>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">업무 통계 분석</h1>
      </header>

      {/* Summary Row */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-navy-card p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/40 text-vibrant-orange rounded-2xl flex items-center justify-center mb-3">
            <Zap size={20} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1">생산성 지수</p>
          <h3 className="text-2xl font-black">84.2</h3>
        </div>
        <div className="bg-white dark:bg-navy-card p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-2xl flex items-center justify-center mb-3">
            <Clock size={20} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1">총 집중 시간</p>
          <h3 className="text-2xl font-black">32h</h3>
        </div>
      </div>

      {/* Pie Chart: Task Distribution */}
      <section className="bg-white dark:bg-navy-card p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <Target size={20} className="text-vibrant-orange" />
          시간 사용 분포
        </h3>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black">100%</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold">Allocated</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {categoryData.map((cat, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{cat.name} {cat.value}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Area Chart: Productivity Trend */}
      <section className="bg-white dark:bg-navy-card p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-vibrant-orange" />
          주간 몰입도 추이
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6D00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF6D00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#FF6D00" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};
