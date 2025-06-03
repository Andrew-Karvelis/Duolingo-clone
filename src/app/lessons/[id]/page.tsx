'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { useStore } from '@/store/useStore';
import { Exercise } from '@/types';

export default function LessonPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { currentLesson, setCurrentLesson, completeLesson, availableLessons } = useStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const lesson = availableLessons.find(l => l.id === params.id);
    if (!lesson) {
      router.push('/dashboard');
      return;
    }
    setCurrentLesson(lesson);
  }, [params.id, availableLessons, setCurrentLesson, router]);

  if (!currentLesson || !currentLesson.exercises || currentLesson.exercises.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === 9) {
      setIsComplete(true);
      completeLesson(currentLesson.id);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Create an array of 10 exercises by repeating the available exercises if necessary
  const exercises: Exercise[] = Array.from({ length: 10 }, (_, index) => {
    const sourceExercise = currentLesson.exercises[index % currentLesson.exercises.length];
    return {
      ...sourceExercise,
      id: `${sourceExercise.id}-${index}`,
    };
  });

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Lesson Complete! 🎉</h1>
          <p className="text-xl mb-6">You scored {score} out of 10</p>
          <p className="text-green-600 font-semibold mb-8">
            +{currentLesson.xpReward} XP Earned
          </p>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Continue
            </button>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setScore(0);
                setIsComplete(false);
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry Lesson
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of 10</p>
          <p className="text-green-600 font-semibold">Score: {score}/10</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestionIndex + 1) * 10}%` }}
          />
        </div>
      </div>

      <QuizQuestion
        exercise={exercises[currentQuestionIndex]}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
} 