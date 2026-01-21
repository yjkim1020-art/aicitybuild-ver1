
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, UserCheck, Briefcase } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deep-navy flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-vibrant-orange/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="z-10 w-full max-w-sm flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="w-20 h-20 bg-vibrant-orange rounded-[28px] flex items-center justify-center shadow-2xl shadow-orange-500/30 rotate-3">
          <Rocket size={40} className="text-white -rotate-3" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black leading-tight tracking-tight">
            CEO이자<br />
            실무자인 당신을 위한
          </h1>
          <p className="text-lg text-white/60 font-medium">
            전략적인 시간 관리와<br />
            직관적인 업무 흐름의 완성
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full pt-4">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
            <UserCheck size={24} className="text-vibrant-orange" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">CEO Mode</span>
            <span className="text-xs font-bold">비전 및 통계</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
            <Briefcase size={24} className="text-blue-400" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Work Mode</span>
            <span className="text-xs font-bold">실무 타임라인</span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/today')}
          className="group w-full h-16 bg-white text-deep-navy rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-vibrant-orange hover:text-white transition-all active:scale-95 shadow-xl"
        >
          나의 하루 시작하기
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
          TimeFlow for Solo Entrepreneurs v1.0
        </p>
      </div>
    </div>
  );
};
