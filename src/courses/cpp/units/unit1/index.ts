import { Unit, Quiz } from '@/types';

export const cppUnit1: Unit = {
  id: 'cpp-unit-1',
  courseId: 'cpp',
  unitNumber: 1,
  title: 'Introduction to C++ Programming',
  description: 'Discover Bjarne Stroustrup’s creation, comparing C and C++, understanding stream-based I/O with cin and cout, namespaces, and modern types.',
  estimatedHours: 4.5,
  quizId: 'quiz-cpp-1',
  published: true,
  topics: [
    {
      id: 'cpp-u1-t1',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 1,
      title: 'Introduction to C++, History & Evolution',
      summary: 'Explore how Bjarne Stroustrup developed "C with Classes" in 1979 to merge high performance with object-oriented abstractions.',
      content: {
        definition: 'C++ is a powerful multi-paradigm programming language created by Bjarne Stroustrup at Bell Labs starting in 1979 as an extension of C. It supports procedural, object-oriented, functional, and generic programming paradigms with zero-overhead abstractions.',
        syntax: '#include <iostream>\n\nint main() {\n    std::cout << "Welcome to CODEVERSE C++ Academy!" << std::endl;\n    return 0;\n}',
        codeSnippet: `#include <iostream>

int main() {
    std::cout << "================================" << std::endl;
    std::cout << "CODEVERSE C++ MASTER ACADEMY" << std::endl;
    std::cout << "High Performance & Modern OOP" << std::endl;
    std::cout << "================================" << std::endl;
    return 0;
}`,
        lineByLineExplanation: [
          { line: '#include <iostream>', explanation: 'Header defining standard input/output streams (cin, cout, cerr, clog).' },
          { line: 'std::cout', explanation: 'Standard character output stream object associated with the console stdout.' },
          { line: '<< insertion operator', explanation: 'Stream insertion operator used to push data sequentially into the output stream.' },
          { line: 'std::endl', explanation: 'Inserts a newline character and flushes the output stream buffer.' }
        ],
        keyConcepts: [
          'Superset of C: retains high performance and direct hardware memory access',
          'Zero-overhead principle: what you don\'t use, you don\'t pay for',
          'Multi-paradigm: procedural, OOP, generic (templates), and functional'
        ],
        commonMistakes: [
          'Forgetting the std:: namespace prefix when using cout or cin without a using directive',
          'Confusing the stream insertion operator (<<) with stream extraction (>>)'
        ],
        quickRevision: [
          'Created by Bjarne Stroustrup in 1979 as "C with Classes".',
          'Multi-paradigm language with direct hardware mapping and rich OOP features.'
        ]
      }
    },
    {
      id: 'cpp-u1-t2',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 2,
      title: 'C vs C++: Key Architectural Differences',
      summary: 'Understand the fundamental design differences between procedural C and multi-paradigm C++.',
      content: {
        definition: 'While C focuses on functions and structured top-down procedures with data detached from actions, C++ centers on data encapsulation through classes and objects, type safety, reference variables, exception handling, and generic templates.',
        syntax: '/* Reference variables in C++ */\nint original = 50;\nint& ref = original; // ref is an alias for original (not supported in C)\nref = 99; // modifies original directly',
        codeSnippet: `#include <iostream>

int main() {
    int val = 100;
    int& alias = val; // C++ reference variable

    std::cout << "Original: " << val << " | Alias: " << alias << std::endl;
    alias = 250;
    std::cout << "After modifying alias, original is: " << val << std::endl;

    // bool is a primitive keyword in C++ without needing <stdbool.h>
    bool isComplete = true;
    std::cout << "Boolean isComplete: " << std::boolalpha << isComplete << std::endl;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int& alias = val;', explanation: 'Creates a reference: an alternative alias bound to the memory of val.' },
          { line: 'bool isComplete = true;', explanation: 'Native bool type in C++ with true/false keywords.' },
          { line: 'std::boolalpha', explanation: 'Stream manipulator that displays booleans as "true" or "false" instead of 1 or 0.' }
        ],
        keyConcepts: [
          'C++ has native support for classes, objects, and encapsulation',
          'C++ supports function overloading and operator overloading; C does not',
          'C++ introduces true reference types (&) alongside raw pointers',
          'C++ memory management uses new and delete; C uses malloc and free'
        ],
        commonMistakes: [
          'Creating an uninitialized reference (e.g. int& ref; is illegal syntax)',
          'Mixing malloc with delete or new with free'
        ],
        quickRevision: [
          'C is procedural; C++ is multi-paradigm & object-oriented.',
          'C++ supports classes, references, function overloading, namespaces, and templates.'
        ]
      }
    },
    {
      id: 'cpp-u1-t3',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 3,
      title: 'Namespaces & std:: Scope Resolution',
      summary: 'Prevent naming collisions in large software codebases using namespaces and the :: scope resolution operator.',
      content: {
        definition: 'A namespace is a declarative region that provides a scope to the identifiers (names of types, functions, variables) inside it, eliminating naming collisions in collaborative software engineering.',
        syntax: 'namespace Physics {\n    const double GRAVITY = 9.8;\n}\n\nstd::cout << Physics::GRAVITY;\nusing namespace std; // Makes std members visible globally',
        codeSnippet: `#include <iostream>

namespace Academy {
    int studentCount = 1200;
    void printStatus() {
        std::cout << "Academy is operating at peak capacity." << std::endl;
    }
}

int main() {
    // Accessing through scope resolution operator (::)
    std::cout << "Enrolled students: " << Academy::studentCount << std::endl;
    Academy::printStatus();
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'namespace Academy { ... }', explanation: 'Encapsulates studentCount and printStatus inside the Academy identifier realm.' },
          { line: 'Academy::studentCount', explanation: 'Scope resolution operator (::) accesses the variable scoped within Academy.' }
        ],
        keyConcepts: [
          'Prevents naming conflicts across third-party libraries and modules',
          'Scope resolution operator (::) unambiguously specifies which namespace an identifier belongs to',
          'Avoid "using namespace std;" in header files to prevent global namespace pollution'
        ],
        commonMistakes: [
          'Placing "using namespace std;" in shared .h / .hpp header files',
          'Forgetting that :: also accesses global variables shadowed by local variables (e.g. ::globalVar)'
        ],
        quickRevision: [
          'namespace Groups identifiers.',
          ':: is the scope resolution operator.',
          'Prefer explicit std:: prefixes in clean production code.'
        ]
      }
    },
    {
      id: 'cpp-u1-t4',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 4,
      title: 'Stream I/O: cin, cout & Format Manipulators',
      summary: 'Master type-safe input and output streams without format specifiers, along with <iomanip> manipulators.',
      content: {
        definition: 'C++ replaces C\'s printf and scanf with type-safe stream objects: std::cin (standard input) using extraction >> and std::cout (standard output) using insertion <<. The <iomanip> library provides fine-grained control over formatting.',
        syntax: 'std::cin >> variable;\nstd::cout << "Text: " << variable << std::endl;\nstd::cout << std::fixed << std::setprecision(2) << 3.14159;',
        codeSnippet: `#include <iostream>
#include <iomanip>
#include <string>

int main() {
    std::string studentName = "Elena Vance";
    double gpa = 3.9248;
    int credits = 48;

    std::cout << "--- STUDENT PROFILE ---" << std::endl;
    std::cout << "Name:    " << studentName << std::endl;
    std::cout << "Credits: " << credits << std::endl;
    // Format precision to exactly 2 decimal places
    std::cout << "GPA:     " << std::fixed << std::setprecision(2) << gpa << std::endl;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'std::string studentName = "Elena Vance";', explanation: 'Modern C++ dynamic string class managing memory automatically.' },
          { line: 'std::fixed << std::setprecision(2)', explanation: 'Stream manipulators from <iomanip> formatting floating-point output with 2 fixed decimal places.' }
        ],
        keyConcepts: [
          'Type-safe: compiler resolves correct formatting automatically without %d or %f mistakes',
          'Stream chaining: multiple variables and strings can be chained in a single statement',
          'std::getline(std::cin, str) reads full lines of text including spaces'
        ],
        commonMistakes: [
          'Using >> with std::cin when reading strings with spaces (cin >> str stops at whitespace; use getline instead)',
          'Confusing << (output) with >> (input)'
        ],
        quickRevision: [
          'cin >> : stream extraction (input).',
          'cout << : stream insertion (output).',
          'std::getline() reads strings with spaces.'
        ]
      }
    }
  ]
};

export const cppUnit1Quiz: Quiz = {
  id: 'quiz-cpp-1',
  unitId: 'cpp-unit-1',
  courseId: 'cpp',
  unitTitle: 'Unit 1: Introduction to C++',
  title: 'Unit 1 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-cpp1-1',
      question: 'Who created the C++ programming language and what was its original name in 1979?',
      options: [
        'Dennis Ritchie - "Modern C"',
        'Bjarne Stroustrup - "C with Classes"',
        'Ken Thompson - "B Language"',
        'James Gosling - "Oak"'
      ],
      correctIndex: 1,
      explanation: 'Bjarne Stroustrup created C++ at Bell Labs in 1979, originally titled "C with Classes".'
    },
    {
      id: 'q-cpp1-2',
      question: 'Which operator is used to insert data into the standard output stream (cout)?',
      options: ['>> (extraction)', '<< (insertion)', ':: (scope)', '-> (arrow)'],
      correctIndex: 1,
      explanation: 'The << stream insertion operator pushes data into the output stream object (std::cout).'
    },
    {
      id: 'q-cpp1-3',
      question: 'What is a key difference between a reference variable (int& ref = a) and a raw pointer (int* ptr = &a)?',
      options: [
        'A reference can be null, whereas a pointer cannot',
        'A reference must be initialized when declared and cannot be reseated to refer to another variable',
        'References take 16 bytes of memory, pointers take 4',
        'References only work with strings'
      ],
      correctIndex: 1,
      explanation: 'A reference is an alias that must be initialized upon declaration and cannot be rebound to refer to a different object.'
    },
    {
      id: 'q-cpp1-4',
      question: 'Why is putting "using namespace std;" in header (.h/.hpp) files considered poor practice?',
      options: [
        'It causes the compiler to crash',
        'It pulls the entire standard namespace into any file that includes the header, leading to potential name collisions',
        'It slows down runtime execution speed by 50%',
        'It converts all integers to unsigned'
      ],
      correctIndex: 1,
      explanation: 'Including "using namespace std;" in headers pollutes the global namespace for all translation units that include the header.'
    },
    {
      id: 'q-cpp1-5',
      question: 'Which header file must be included to use std::cout and std::cin?',
      options: ['<stdio.h>', '<iostream>', '<iomanip>', '<stdlib.h>'],
      correctIndex: 1,
      explanation: '<iostream> declares the standard C++ input and output stream objects.'
    }
  ]
};
