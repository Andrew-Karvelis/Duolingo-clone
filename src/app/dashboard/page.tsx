'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FireIcon } from '@heroicons/react/24/solid';
import { LessonCard } from '@/components/lessons/LessonCard';
import { useStore } from '@/store/useStore';
import { staggerContainer } from '@/utils/animations';
import { sampleUser, sampleLessons } from '@/data/sampleData';

export default function DashboardPage() {
  const { user, availableLessons, setUser, updateStreak } = useStore();

  // Initialize with sample data
  useEffect(() => {
    if (!user) {
      setUser(sampleUser);
      useStore.setState({ availableLessons: sampleLessons });
    }
    updateStreak();
  }, [user, setUser, updateStreak]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <div className="mt-4 flex space-x-6">
          <div className="flex items-center space-x-2">
            <FireIcon className="w-6 h-6 text-orange-500" />
            <span className="text-lg font-semibold">
              {user.streak} Day Streak
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-green-600">
              {user.xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {availableLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onStart={(lesson) => {
              // Handle lesson start - implement navigation
              console.log('Starting lesson:', lesson.id);
            }}
          />
        ))}
      </motion.div>
    </div>
  );
} 