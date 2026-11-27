import { Course } from '@/types';
import { otherUnit1, otherUnit1Quiz } from './units/unit1';
import { otherUnit2, otherUnit2Quiz } from './units/unit2';
import { otherUnit3, otherUnit3Quiz } from './units/unit3';
import { otherUnit4, otherUnit4Quiz } from './units/unit4';
import { otherUnit5, otherUnit5Quiz } from './units/unit5';
import { otherPracticals } from './practical';

export const otherCourse: Course = {
  id: 'other',
  title: 'Systems & Academy Essentials',
  subtitle: 'Data structures, debugging tools, build systems & software engineering',
  description: 'Master vital engineering competencies complementary to C and C++: dynamic data structures, GDB and Valgrind memory debugging, Makefiles & CMake build systems, POSIX system calls, multithreading, and secure clean code practices.',
  badge: 'Tools & Systems Architecture',
  icon: 'Cpu',
  accentColor: '#AAA2D5',
  totalUnits: 5,
  totalPracticals: otherPracticals.length
};

export const otherUnits = [otherUnit1, otherUnit2, otherUnit3, otherUnit4, otherUnit5];
export const otherQuizzes = [otherUnit1Quiz, otherUnit2Quiz, otherUnit3Quiz, otherUnit4Quiz, otherUnit5Quiz];
export { otherPracticals };
