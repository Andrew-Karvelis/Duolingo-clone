import { motion } from 'framer-motion';
import { LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Lesson } from '@/types';

interface LessonCardProps {
  lesson: Lesson;
  onStart: (lesson: Lesson) => void;
}

export function LessonCard({ lesson, onStart }: LessonCardProps) {
  const { title, description, difficulty, xpReward, isLocked, isCompleted } = lesson;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-lg p-6 shadow-md ${
        isLocked
          ? 'bg-gray-100'
          : isCompleted
          ? 'bg-green-50'
          : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {isLocked ? (
          <LockClosedIcon className="w-6 h-6 text-gray-400" />
        ) : isCompleted ? (
          <CheckCircleIcon className="w-6 h-6 text-green-500" />
        ) : null}
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-sm font-medium
          ${difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'}`}
        >
          {difficulty}
        </span>
        
        <span className="text-sm font-medium text-purple-600">
          {xpReward} XP
        </span>
      </div>
      
      {!isLocked && !isCompleted && (
        <button
          onClick={() => onStart(lesson)}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg
            hover:bg-green-600 transition-colors duration-200"
        >
          Start Lesson
        </button>
      )}
    </motion.div>
  );
} 