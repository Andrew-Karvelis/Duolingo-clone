import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/types';
import { popIn, successBounce } from '@/utils/animations';

interface QuizQuestionProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export function QuizQuestion({ exercise, onAnswer, onNext }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const isCorrect = selectedAnswer === exercise.correctAnswer;

  const handleAnswer = () => {
    if (!selectedAnswer || hasAnswered) return;
    setHasAnswered(true);
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    onNext();
  };

  return (
    <motion.div
      variants={popIn}
      initial="hidden"
      animate="visible"
      className="space-y-6 p-6 bg-white rounded-2xl shadow-lg"
    >
      <h3 className="text-xl font-semibold text-gray-900">
        {exercise.question}
      </h3>

      <div className="space-y-3">
        {exercise.options?.map((option) => (
          <motion.button
            key={option}
            onClick={() => !hasAnswered && setSelectedAnswer(option)}
            className={`
              w-full p-4 text-left rounded-xl border-2 transition-all
              ${selectedAnswer === option
                ? hasAnswered
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            whileHover={!hasAnswered ? { scale: 1.02 } : undefined}
            whileTap={!hasAnswered ? { scale: 0.98 } : undefined}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`
              flex items-center space-x-3 p-4 rounded-xl
              ${isCorrect ? 'bg-green-100' : 'bg-red-100'}
            `}
          >
            {isCorrect ? (
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-red-600" />
            )}
            <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${exercise.correctAnswer}`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end space-x-3">
        <Button
          variant={hasAnswered ? 'success' : 'primary'}
          disabled={!selectedAnswer || hasAnswered}
          onClick={handleAnswer}
        >
          Check Answer
        </Button>
        {hasAnswered && (
          <Button
            variant="primary"
            onClick={handleNext}
          >
            Next Question
          </Button>
        )}
      </div>
    </motion.div>
  );
} 