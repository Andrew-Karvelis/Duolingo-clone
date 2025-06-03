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

  const handleOptionClick = (option: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(option);
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
        {exercise.options?.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === exercise.correctAnswer;
          let optionStyle = 'border-gray-200 hover:border-gray-300';
          
          if (hasAnswered) {
            if (isCorrectAnswer) {
              optionStyle = 'border-green-500 bg-green-50';
            } else if (isSelected) {
              optionStyle = 'border-red-500 bg-red-50';
            }
          } else if (isSelected) {
            optionStyle = 'border-blue-500 bg-blue-50';
          }

          return (
            <motion.button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`
                w-full p-4 text-left rounded-xl border-2 transition-all
                ${optionStyle}
                ${hasAnswered && !isCorrectAnswer && !isSelected ? 'opacity-50' : ''}
              `}
              whileHover={!hasAnswered ? { scale: 1.02 } : undefined}
              whileTap={!hasAnswered ? { scale: 0.98 } : undefined}
              disabled={hasAnswered}
            >
              {option}
            </motion.button>
          );
        })}
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
        {!hasAnswered ? (
          <Button
            variant="primary"
            disabled={!selectedAnswer}
            onClick={handleAnswer}
          >
            Check Answer
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={handleNext}
          >
            Next Question
          </Button>
        )}
      </div>
    </motion.div>
  );
} 