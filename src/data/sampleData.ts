import { User, Lesson } from '@/types';

export const sampleUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  streak: 3,
  xp: 450,
  level: 2,
  completedLessons: ['lesson1'],
};

export const sampleLessons: Lesson[] = [
  {
    id: 'lesson1',
    title: 'Basic Greetings',
    description: 'Learn how to say hello and introduce yourself',
    difficulty: 'beginner',
    xpReward: 20,
    isCompleted: true,
    isLocked: false,
    exercises: [
      {
        id: 'ex1',
        type: 'multiple-choice',
        question: 'How do you say "hello"?',
        correctAnswer: 'Hola',
        options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
      },
    ],
  },
  {
    id: 'lesson2',
    title: 'Numbers 1-10',
    description: 'Master counting from one to ten',
    difficulty: 'beginner',
    xpReward: 25,
    isCompleted: false,
    isLocked: false,
    exercises: [
      {
        id: 'ex2',
        type: 'multiple-choice',
        question: 'What is "one" in Spanish?',
        correctAnswer: 'Uno',
        options: ['Uno', 'Dos', 'Tres', 'Cuatro'],
      },
    ],
  },
  {
    id: 'lesson3',
    title: 'Common Phrases',
    description: 'Learn everyday expressions',
    difficulty: 'intermediate',
    xpReward: 30,
    isCompleted: false,
    isLocked: true,
    exercises: [
      {
        id: 'ex3',
        type: 'translation',
        question: 'Translate: "How are you?"',
        correctAnswer: '¿Cómo estás?',
      },
    ],
  },
]; 