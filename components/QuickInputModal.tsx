
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Clock, Calendar, Hash, ArrowRight } from 'lucide-react';
import { parseNaturalLanguageSchedule } from '../services/geminiService';
import { ScheduleItem, NLPResult, TaskTag } from '../types';

interface QuickInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: ScheduleItem) => void;
}

export const QuickInputModal: React.FC<QuickInputModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedResult, setParsedResult] = useState<NLPResult | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setParsedResult(null);
      setInputText('');
    }
  }, [isOpen]);

  const handleParse = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    const result = await parseNaturalLanguageSchedule(inputText);
    setParsedResult(result);
    setIsLoading(false);
  };

  const handleConfirm = () => {
    if (parsedResult) {
      onConfirm({
        id: Date.now().toString(),
        title: parsedResult.title,
        date: parsedResult.date,
        startTime: parsedResult.startTime,
        durationMinutes: parsedResult.durationMinutes,
        tag: parsedResult.tag as TaskTag,
        completed: false
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-lg mx-auto bg-white dark:bg-navy-card rounded-t-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles size={20} className="text-vibrant-orange" />
            새로운 일정 추가
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="예: 내일 오후 2시 디자인 미팅 한 시간 동안"
            className="w-full h-32 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl p-4 text-xl font-medium focus:ring-2 focus:ring-vibrant-orange resize-none"
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-8 h-8 border-4 border-vibrant-orange border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 animate-pulse">일정을 분석하고 있습니다...</p>
          </div>
        ) : parsedResult ? (
          <div className="space-y-4 mb-8 animate-in zoom-in-95 duration-300">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">인식된 정보</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Calendar size={18} className="text-vibrant-orange" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400">날짜</span>
                  <span className="text-sm font-bold">{parsedResult.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Clock size={18} className="text-vibrant-orange" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400">시간</span>
                  <span className="text-sm font-bold">{parsedResult.startTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Hash size={18} className="text-vibrant-orange" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400">태그</span>
                  <span className="text-sm font-bold">{parsedResult.tag}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <ArrowRight size={18} className="text-vibrant-orange" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400">소요 시간</span>
                  <span className="text-sm font-bold">{parsedResult.durationMinutes}분</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {!parsedResult ? (
          <button
            onClick={handleParse}
            disabled={!inputText.trim()}
            className="w-full bg-vibrant-orange text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            분석하기
            <Send size={20} />
          </button>
        ) : (
          <button
            onClick={handleConfirm}
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 h-14 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2"
          >
            일정 등록하기
            <ArrowRight size={20} />
          </button>
        )}
        
        <div className="h-6"></div>
      </div>
    </div>
  );
};
