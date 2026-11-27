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
  subtitle: 'Master the fundamentals of procedural programming',
  description: 'Build a rock-solid foundation in procedural programming, computer architecture, memory allocation, pointers, and high-performance system programming with Dennis Ritchie’s legendary language.',
  badge: 'Foundation & Systems',
  icon: 'Terminal',
  accentColor: '#24B8A6',
  totalUnits: 5,
  totalPracticals: cPracticals.length
};

export const cUnits = [cUnit1, cUnit2, cUnit3, cUnit4, cUnit5];
export const cQuizzes = [cUnit1Quiz, cUnit2Quiz, cUnit3Quiz, cUnit4Quiz, cUnit5Quiz];
export { cPracticals };
