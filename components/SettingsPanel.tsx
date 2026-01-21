
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Shield, Moon, Globe, HelpCircle, ChevronRight, LogOut } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const navigate = useNavigate();
  const settingGroups = [
    {
      title: '개인 설정',
      items: [
        { icon: <User size={20} />, label: '프로필 관리', value: '김대표' },
        { icon: <Bell size={20} />, label: '알림 설정', value: '켜짐' },
        { icon: <Shield size={20} />, label: '보안 및 데이터', value: '' },
      ]
    },
    {
      title: '앱 설정',
      items: [
        { icon: <Moon size={20} />, label: '다크 모드', value: '시스템 설정' },
        { icon: <Globe size={20} />, label: '언어 및 지역', value: '한국어' },
        { icon: <HelpCircle size={20} />, label: '고객 센터 및 도움말', value: '' },
      ]
    }
  ];

  return (
    <div className="p-6 pb-32 animate-in slide-in-from-right duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">설정</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">1인 기업가 모드 활성화 중</p>
      </header>

      {/* Profile Card Summary */}
      <div className="bg-deep-navy dark:bg-navy-card p-6 rounded-[32px] text-white shadow-xl mb-10 relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
            <User size={32} />
          </div>
          <h2 className="text-xl font-bold">김대표 (CEO)</h2>
          <p className="text-white/60 text-xs">Premium Solo Member</p>
        </div>
        {/* Decorative Circle */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-vibrant-orange rounded-full opacity-20"></div>
      </div>

      <div className="space-y-8">
        {settingGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-4">{group.title}</h3>
            <div className="bg-white dark:bg-navy-card rounded-[24px] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
              {group.items.map((item, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b last:border-b-0 border-gray-50 dark:border-gray-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-gray-400 dark:text-gray-500">{item.icon}</div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-medium">{item.value}</span>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/')}
        className="w-full mt-10 flex items-center justify-center gap-2 p-4 text-red-500 font-bold text-sm bg-red-50 dark:bg-red-900/10 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors active:scale-95"
      >
        <LogOut size={18} />
        로그아웃 (첫 화면으로)
      </button>
    </div>
  );
};
