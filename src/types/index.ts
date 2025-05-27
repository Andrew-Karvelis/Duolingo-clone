export interface User {
  id: string;
  name: string;
  email: string;
  streak: number;
  xp: number;
  level: number;
  completedLessons: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  exercises: Exercise[];
  isCompleted: boolean;
  isLocked: boolean;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'translation' | 'matching' | 'speaking';
  question: string;
  correctAnswer: string;
  options?: string[];
  hint?: string;
}

export interface Progress {
  userId: string;
  completedLessons: string[];
  currentStreak: number;
  totalXP: number;
  lastPracticeDate: string;
} 