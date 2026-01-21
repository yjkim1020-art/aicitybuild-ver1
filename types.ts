
export type TaskTag = '미팅' | '실무' | '회계' | '개발' | '영업' | '행정' | '기타';

export interface ScheduleItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
  tag: TaskTag;
  description?: string;
  completed: boolean;
}

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface NLPResult {
  title: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  tag: TaskTag;
}
