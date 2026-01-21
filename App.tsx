
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TodayDashboard } from './components/TodayDashboard';
import { WeeklySummary } from './components/WeeklySummary';
import { StatsDashboard } from './components/StatsDashboard';
import { SettingsPanel } from './components/SettingsPanel';
import { LandingPage } from './components/LandingPage';
import { ScheduleItem, TodoItem } from './types';

const INITIAL_SCHEDULES: ScheduleItem[] = [
  {
    id: '1',
    title: '디자인 리뷰',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    durationMinutes: 90,
    tag: '실무',
    description: 'UI/UX 개선안 검토 및 피드백 반영',
    completed: true
  },
  {
    id: '2',
    title: '점심 식사',
    date: new Date().toISOString().split('T')[0],
    startTime: '12:00',
    durationMinutes: 60,
    tag: '기타',
    description: '팀 점심 회식 @ 강남역',
    completed: false
  },
  {
    id: '3',
    title: '클라이언트 미팅',
    date: new Date().toISOString().split('T')[0],
    startTime: '14:00',
    durationMinutes: 60,
    tag: '미팅',
    description: '신규 프로젝트 계약 조건 협의',
    completed: false
  }
];

const INITIAL_TODOS: TodoItem[] = [
  { id: '101', title: '송장 보내기', completed: false, priority: 'high' },
  { id: '102', title: '주간 보고서 작성', completed: false, priority: 'medium' },
  { id: '103', title: '이메일 정리', completed: true, priority: 'low' }
];

const App: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(INITIAL_SCHEDULES);
  const [todos, setTodos] = useState<TodoItem[]>(INITIAL_TODOS);

  const addSchedule = (item: ScheduleItem) => {
    setSchedules(prev => [...prev, item].sort((a, b) => a.startTime.localeCompare(b.startTime)));
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTodo = (title: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority: 'medium'
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-off-white dark:bg-dark-gray transition-colors">
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/today" 
              element={
                <TodayDashboard 
                  schedules={schedules} 
                  todos={todos} 
                  onAddSchedule={addSchedule} 
                  onToggleTodo={toggleTodo}
                  onAddTodo={addTodo}
                />
              } 
            />
            <Route path="/weekly" element={<WeeklySummary schedules={schedules} />} />
            <Route path="/stats" element={<StatsDashboard schedules={schedules} />} />
            <Route path="/settings" element={<SettingsPanel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    </HashRouter>
  );
};

export default App;
