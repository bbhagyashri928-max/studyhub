import { Course } from '@/types';
import { cUnit1, cUnit1Quiz } from './units/unit1';
import { cUnit2, cUnit2Quiz } from './units/unit2';
import { cUnit3, cUnit3Quiz } from './units/unit3';
import { cUnit4, cUnit4Quiz } from './units/unit4';
import { cUnit5, cUnit5Quiz } from './units/unit5';
import { cPracticals } from './practical';

export const cCourse: Course = {
  id: 'c',
  title: 'C Programming',
  subtitle: 'Master Algorithms, Operators, Control Flow, Arrays & Functions',
  description: 'A comprehensive journey through procedural systems programming: from algorithmic planning and flowcharts to low-level operators, structured control flow, multi-dimensional arrays, strings, modular user-defined functions, and memory structures.',
  badge: 'Foundation & Systems',
  icon: 'Terminal',
  accentColor: '#24B8A6',
  totalUnits: 5,
  totalPracticals: cPracticals.length
};

export const cUnits = [cUnit1, cUnit2, cUnit3, cUnit4, cUnit5];
export const cQuizzes = [cUnit1Quiz, cUnit2Quiz, cUnit3Quiz, cUnit4Quiz, cUnit5Quiz];
export { cPracticals };

// Export the 25-step gamified curriculum steps
export { C_GAME_STEPS, C_GAME_WORLDS } from './gameData';
export type { GameStep } from './gameData';
