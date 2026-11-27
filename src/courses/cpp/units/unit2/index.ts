import { Unit, Quiz } from '@/types';

export const cppUnit2: Unit = {
  id: 'cpp-unit-2',
  courseId: 'cpp',
  unitNumber: 2,
  title: 'Control Statements and Functions',
  description: 'Control program flow with modern constructs, understand function overloading, default arguments, inline functions, and recursive problem-solving.',
  estimatedHours: 5.0,
  quizId: 'quiz-cpp-2',
  published: true,
  topics: [
    {
      id: 'cpp-u2-t1',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 1,
      title: 'Conditional Logic and Iteration Loops',
      summary: 'Explore if-else branching, switch expressions, while/for loops, and range-based for loops in modern C++.',
      content: {
        definition: 'C++ provides standard control structures along with modern enhancements such as range-based for loops for cleanly traversing collections without manual index management.',
        syntax: 'for (const auto& item : collection) {\n    std::cout << item << " ";\n}',
        codeSnippet: `#include <iostream>
#include <vector>

int main() {
    int scores[] = {85, 92, 78, 96, 88};

    std::cout << "Traversing array with modern C++ Range-Based for loop:" << std::endl;
    for (int score : scores) {
        std::cout << score << " ";
    }
    std::cout << std::endl;

    // Switch case with characters
    char grade = 'A';
    switch (grade) {
        case 'A': std::cout << "Honors achievement!" << std::endl; break;
        case 'B': std::cout << "Commendable score." << std::endl; break;
        default:  std::cout << "Passing standard." << std::endl; break;
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'for (int score : scores)', explanation: 'Range-based for loop: automatically iterates over each element without manual bounds checking.' },
          { line: 'switch (grade)', explanation: 'Integral multi-way branching statement.' }
        ],
        keyConcepts: [
          'Range-based for loops eliminate off-by-one index bugs',
          'auto keyword allows the compiler to automatically deduce variable types',
          'Standard break and continue operate consistently across all loop types'
        ],
        commonMistakes: [
          'Modifying elements in a range loop without using references (e.g. for (auto x : vec) modifies a copy, not original)',
          'Omitting break statements in switch cases'
        ],
        quickRevision: [
          'Range-based for loop: for (auto item : container).',
          'Use references (auto&) to avoid copying expensive objects.'
        ]
      }
    },
    {
      id: 'cpp-u2-t2',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 2,
      title: 'Function Overloading: Compile-Time Polymorphism',
      summary: 'Define multiple functions sharing the same name but possessing distinct parameter signatures.',
      content: {
        definition: 'Function overloading allows multiple functions to share the exact same identifier in the same scope, provided their parameter lists differ in number, types, or order. The compiler resolves which function to call at compile time (compile-time polymorphism).',
        syntax: 'int add(int a, int b);\ndouble add(double a, double b);\nint add(int a, int b, int c);',
        codeSnippet: `#include <iostream>

int multiply(int a, int b) {
    std::cout << "[Integer overload called] ";
    return a * b;
}

double multiply(double a, double b) {
    std::cout << "[Double overload called] ";
    return a * b;
}

int main() {
    std::cout << multiply(6, 7) << std::endl;
    std::cout << multiply(2.5, 4.0) << std::endl;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int multiply(int a, int b)', explanation: 'Integer parameter overload.' },
          { line: 'double multiply(double a, double b)', explanation: 'Double parameter overload with identical function name.' },
          { line: 'multiply(6, 7)', explanation: 'Compiler resolves to the integer version based on argument types.' }
        ],
        keyConcepts: [
          'Signatures must differ in argument types or count',
          'Differing solely by return type is NOT valid for function overloading (triggers compile error)',
          'Name mangling is the compiler technique used to encode argument types into internal symbol names'
        ],
        commonMistakes: [
          'Attempting to overload based only on return type: int foo() and void foo() will not compile',
          'Ambiguous calls caused by implicit type conversions'
        ],
        quickRevision: [
          'Same name + different parameter list = function overloading.',
          'Resolved at compile time.',
          'Return type alone cannot differentiate overloads.'
        ]
      }
    },
    {
      id: 'cpp-u2-t3',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 3,
      title: 'Default Arguments & Inline Functions',
      summary: 'Enhance function flexibility with default parameter values and optimize small function calls with the inline specifier.',
      content: {
        definition: 'Default arguments allow functions to be called without specifying all arguments; omitted arguments assume preset default values. An inline function suggests to the compiler to substitute the function body directly at each call site, eliminating function call overhead.',
        syntax: 'void logMessage(std::string msg, int level = 1); // level defaults to 1\ninline int square(int x) { return x * x; }',
        codeSnippet: `#include <iostream>

inline int square(int x) {
    return x * x; // Compiler replaces square(5) directly with 5 * 5
}

void printBanner(std::string title, char border = '=', int count = 25) {
    for (int i = 0; i < count; i++) std::cout << border;
    std::cout << " " << title << " ";
    for (int i = 0; i < count; i++) std::cout << border;
    std::cout << std::endl;
}

int main() {
    printBanner("CODEVERSE");            // Uses default '=' and 25
    printBanner("SPECIAL LAB", '-', 10); // Overrides both defaults
    std::cout << "Square of 8: " << square(8) << std::endl;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'inline int square(int x)', explanation: 'inline hint reduces stack frame push/pop overhead for tiny, frequently executed functions.' },
          { line: 'char border = \'=\', int count = 25', explanation: 'Default arguments must be specified from right to left in the parameter list.' }
        ],
        keyConcepts: [
          'Default parameters must be placed at the end (trailing positions) of the parameter list',
          'inline is a compiler suggestion, not a mandate; compilers may ignore it if the function is complex',
          'Inline functions should be defined in header files'
        ],
        commonMistakes: [
          'Placing non-default parameters after default parameters (e.g. void fn(int a = 1, int b) is illegal)',
          'Overusing inline on large functions causing executable code bloat'
        ],
        quickRevision: [
          'Default arguments must appear right-to-left.',
          'inline replaces call site with code to avoid call overhead.',
          'Keep inline functions short.'
        ]
      }
    }
  ]
};

export const cppUnit2Quiz: Quiz = {
  id: 'quiz-cpp-2',
  unitId: 'cpp-unit-2',
  courseId: 'cpp',
  unitTitle: 'Unit 2: Control Statements and Functions',
  title: 'Unit 2 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-cpp2-1',
      question: 'Which of the following functions CANNOT legally overload int calculate(int x, int y)?',
      options: [
        'double calculate(double x, double y)',
        'int calculate(int x, int y, int z)',
        'double calculate(int x, int y)',
        'int calculate(double x, int y)'
      ],
      correctIndex: 2,
      explanation: 'Overloading requires different parameter types or counts. Differing only by return type (double vs int) causes a compile error.'
    },
    {
      id: 'q-cpp2-2',
      question: 'Where must default parameters be placed in a function signature?',
      options: [
        'Only at the beginning of the parameter list',
        'At trailing positions (from right to left)',
        'In the middle surrounded by non-default arguments',
        'Anywhere regardless of position'
      ],
      correctIndex: 1,
      explanation: 'Default arguments must appear from right to left; once a parameter has a default, all parameters after it must also have defaults.'
    },
    {
      id: 'q-cpp2-3',
      question: 'What is the primary benefit of declaring a small function with the inline keyword?',
      options: [
        'It allows the function to be called from C code',
        'It prompts the compiler to replace the call site with code directly, saving call-overhead time',
        'It encrypts the function binary',
        'It enables runtime dynamic dispatch'
      ],
      correctIndex: 1,
      explanation: 'Inlining substitutes the function body directly at call sites to eliminate the runtime overhead of stack frame setup and branch jumps.'
    },
    {
      id: 'q-cpp2-4',
      question: 'What is the correct syntax for a C++ range-based for loop over std::vector<int> numbers?',
      options: [
        'for (int i = 0 to numbers.size())',
        'foreach (numbers as num)',
        'for (const auto& num : numbers)',
        'loop (num in numbers)'
      ],
      correctIndex: 2,
      explanation: 'for (const auto& num : numbers) is the idiomatic C++11+ range-based for loop syntax.'
    },
    {
      id: 'q-cpp2-5',
      question: 'What happens if you iterate using for (auto item : vector) and modify item inside the loop?',
      options: [
        'The vector element is updated in place',
        'Only the local copy item is modified, leaving the vector unchanged',
        'A compile error occurs',
        'The vector element is deleted'
      ],
      correctIndex: 1,
      explanation: 'auto item creates a copy of each element. To modify the vector in-place, one must bind a reference: auto& item.'
    }
  ]
};
