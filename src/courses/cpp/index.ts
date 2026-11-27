import { Course } from '@/types';
import { cppUnit1, cppUnit1Quiz } from './units/unit1';
import { cppUnit2, cppUnit2Quiz } from './units/unit2';
import { cppUnit3, cppUnit3Quiz } from './units/unit3';
import { cppUnit4, cppUnit4Quiz } from './units/unit4';
import { cppUnit5, cppUnit5Quiz } from './units/unit5';
import { cppPracticals } from './practical';

export const cppCourse: Course = {
  id: 'cpp',
  title: 'C++ Programming',
  subtitle: 'Learn object-oriented programming and advanced concepts',
  description: 'Master modern object-oriented programming, classes, encapsulation, inheritance, polymorphism, generic templates, exception handling, and the Standard Template Library (STL) created by Bjarne Stroustrup.',
  badge: 'OOP & Modern Systems',
  icon: 'Layers',
  accentColor: '#F08068',
  totalUnits: 5,
  totalPracticals: cppPracticals.length
};

export const cppUnits = [cppUnit1, cppUnit2, cppUnit3, cppUnit4, cppUnit5];
export const cppQuizzes = [cppUnit1Quiz, cppUnit2Quiz, cppUnit3Quiz, cppUnit4Quiz, cppUnit5Quiz];
export { cppPracticals };
