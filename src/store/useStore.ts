import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Progress, Lesson } from '@/types';

interface AppState {
  user: User | null;
  progress: Progress | null;
  currentLesson: Lesson | null;
  availableLessons: Lesson[];
  // Actions
  setUser: (user: User | null) => void;
  updateProgress: (progress: Partial<Progress>) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  addXP: (amount: number) => void;
  updateStreak: () => void;
  completeLesson: (lessonId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      progress: null,
      currentLesson: null,
      availableLessons: [],

      setUser: (user) => set({ user }),
      
      updateProgress: (newProgress) =>
        set((state) => ({
          progress: state.progress
            ? { ...state.progress, ...newProgress }
            : null,
        })),

      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

      addXP: (amount) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, xp: state.user.xp + amount }
            : null,
          progress: state.progress
            ? { ...state.progress, totalXP: state.progress.totalXP + amount }
            : null,
        })),

      updateStreak: () => {
        set((state) => {
          if (!state.user) return state;
          
          const lastLogin = localStorage.getItem('lastLogin');
          const today = new Date().toDateString();
          
          if (lastLogin !== today) {
            localStorage.setItem('lastLogin', today);
            return {
              user: {
                ...state.user,
                streak: state.user.streak + 1,
              },
            };
          }
          
          return state;
        });
      },

      completeLesson: (lessonId) => {
        set((state) => {
          if (!state.user) return state;
          
          const lesson = state.availableLessons.find((l) => l.id === lessonId);
          if (!lesson) return state;
          
          return {
            user: {
              ...state.user,
              xp: state.user.xp + lesson.xpReward,
              completedLessons: [...state.user.completedLessons, lessonId],
            },
            availableLessons: state.availableLessons.map((l) =>
              l.id === lessonId ? { ...l, isCompleted: true } : l
            ),
          };
        });
      },
    }),
    {
      name: 'language-app-storage',
    }
  )
); 