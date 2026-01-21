
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Bell, MoreHorizontal, CheckCircle2, Circle, Clock, Palette, Briefcase, Calculator, Users, HelpCircle, Home as HomeIcon } from 'lucide-react';
import { ScheduleItem, TodoItem, TaskTag } from '../types';
import { QuickInputModal } from './QuickInputModal';

interface TodayDashboardProps {
  schedules: ScheduleItem[];
  todos: TodoItem[];
  onAddSchedule: (item: ScheduleItem) => void;
  onToggleTodo: (id: string) => void;
  onAddTodo: (title: string) => void;
}

const getTagIcon = (tag: TaskTag) => {
  switch (tag) {
    case '미팅': return <Users size={16} />;
    case '실무': return <Briefcase size={16} />;
    case '회계': return <Calculator size={16} />;
    case '개발': return <Palette size={16} />;
    default: return <HelpCircle size={16} />;
  }
};

const getTagColorClass = (tag: TaskTag) => {
  switch (tag) {
    case '미팅': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300';
    case '실무': return 'bg-orange-100 text-vibrant-orange dark:bg-orange-900/40 dark:text-orange-300';
    case '회계': return 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300';
    case '개발': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300';
    default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  }
};

export const TodayDashboard: React.FC<TodayDashboardProps> = ({ 
  schedules, 
  todos, 
  onAddSchedule, 
  onToggleTodo,
  onAddTodo
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');

  const today = new Date();
  const dateStr = today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' });

  const handleAddTodoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      onAddTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-start mb-8">
        <div className="flex items-start gap-3">
          <button 
            onClick={() => navigate('/')}
            className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-400 hover:text-vibrant-orange transition-colors"
            title="첫 화면으로 돌아가기"
          >
            <HomeIcon size={18} />
          </button>
          <div>
            <p className="text-vibrant-orange font-bold text-sm uppercase tracking-widest mb-1">Today's Focus</p>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {dateStr.split(',')[0]}<br/>
              <span className="text-slate-400 dark:text-slate-500">{dateStr.split(',')[1]}</span>
            </h1>
          </div>
        </div>
        <button className="text-slate-400 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <MoreHorizontal size={24} />
        </button>
      </header>

      {/* Timeline Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">오늘의 타임라인</h2>
          <div className="h-[1px] flex-1 bg-gray-100 dark:bg-gray-800"></div>
        </div>

        <div className="relative pl-6 space-y-8 border-l-2 border-gray-100 dark:border-gray-800">
          {schedules.map((item) => (
            <div key={item.id} className="relative">
              {/* Timeline Dot */}
              <div className={`absolute -left-[31px] top-4 w-4 h-4 rounded-full border-2 bg-white dark:bg-dark-gray transition-colors ${item.completed ? 'border-gray-200 dark:border-gray-700' : 'border-vibrant-orange shadow-[0_0_8px_rgba(255,109,0,0.5)]'}`} />
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${item.completed ? 'text-gray-400' : 'text-vibrant-orange'}`}>
                    {item.startTime}
                  </span>
                  <span className="text-xs text-gray-400">({item.durationMinutes}분)</span>
                </div>
                
                <div className={`p-4 rounded-2xl border transition-all ${
                  item.completed 
                  ? 'bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 opacity-60' 
                  : 'bg-white dark:bg-navy-card border-gray-100 dark:border-gray-700 shadow-sm'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold ${item.completed ? 'line-through text-gray-500' : 'text-slate-800 dark:text-white'}`}>
                      {item.title}
                    </h3>
                    <div className={`p-1.5 rounded-lg ${getTagColorClass(item.tag)}`}>
                      {getTagIcon(item.tag)}
                    </div>
                  </div>
                  {item.description && <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>}
                </div>
              </div>
            </div>
          ))}
          {schedules.length === 0 && (
            <p className="text-sm text-gray-400 italic">오늘 등록된 일정이 없습니다.</p>
          )}
        </div>
      </section>

      {/* Todo List Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            할 일 목록
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">
              {todos.filter(t => !t.completed).length}
            </span>
          </h2>
        </div>

        <form onSubmit={handleAddTodoSubmit} className="mb-4">
          <input 
            type="text" 
            placeholder="빠르게 할 일 추가..." 
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-vibrant-orange transition-all"
          />
        </form>

        <div className="space-y-3">
          {todos.map((todo) => (
            <div 
              key={todo.id}
              onClick={() => onToggleTodo(todo.id)}
              className="flex items-center gap-4 p-4 bg-white dark:bg-navy-card border border-gray-50 dark:border-gray-800 rounded-2xl cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
            >
              {todo.completed ? (
                <CheckCircle2 size={22} className="text-vibrant-orange" />
              ) : (
                <Circle size={22} className="text-gray-300 dark:text-gray-600" />
              )}
              <span className={`flex-1 text-sm font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-slate-800 dark:text-white'}`}>
                {todo.title}
              </span>
              {todo.priority === 'high' && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-8 w-14 h-14 bg-vibrant-orange text-white rounded-full shadow-[0_8px_20px_rgba(255,109,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* NLP Modal */}
      <QuickInputModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={onAddSchedule} 
      />
    </div>
  );
};
