import { Unit, Quiz } from '@/types';

export const cppUnit5: Unit = {
  id: 'cpp-unit-5',
  courseId: 'cpp',
  unitNumber: 5,
  title: 'Advanced C++ Concepts & STL',
  description: 'Master generic programming with templates, RAII exception handling, file streams, static members, and the Standard Template Library (STL).',
  estimatedHours: 7.0,
  quizId: 'quiz-cpp-5',
  published: true,
  topics: [
    {
      id: 'cpp-u5-t1',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 1,
      title: 'Templates: Generic Functions and Classes',
      summary: 'Write type-agnostic algorithms and data structures using C++ generic templates.',
      content: {
        definition: 'Templates are the foundation of generic programming in C++. They allow functions and classes to operate with generic types without having to rewrite separate code for each individual data type.',
        syntax: 'template <typename T>\nT findMax(T a, T b) {\n    return (a > b) ? a : b;\n}\n\ntemplate <class T>\nclass Box { T data; };',
        codeSnippet: `#include <iostream>
#include <string>

// Function Template
template <typename T>
T getMaximum(T a, T b) {
    return (a > b) ? a : b;
}

// Class Template
template <typename T>
class StorageBox {
private:
    T item;
public:
    StorageBox(T val) : item(val) {}
    void inspect() const {
        std::cout << "Stored Item: " << item << " (Size: " << sizeof(T) << " bytes)\\n";
    }
};

int main() {
    std::cout << "Max int:    " << getMaximum(42, 99) << std::endl;
    std::cout << "Max double: " << getMaximum(3.1415, 2.7182) << std::endl;

    StorageBox<int> intBox(1024);
    StorageBox<std::string> strBox("Codeverse Premium");

    intBox.inspect();
    strBox.inspect();
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'template <typename T>', explanation: 'Declares T as a placeholder type parameter resolved during template instantiation.' },
          { line: 'getMaximum(42, 99)', explanation: 'Compiler automatically instantiates getMaximum<int>(int, int).' },
          { line: 'StorageBox<int> intBox(1024);', explanation: 'Class template explicitly specialized with int type.' }
        ],
        keyConcepts: [
          'Template instantiation: compiler generates real native code for each concrete type used',
          'Zero runtime overhead: templates are resolved entirely at compile time',
          'Can have multiple type parameters: template <typename T, typename U>'
        ],
        commonMistakes: [
          'Separating template declarations and definitions across .h and .cpp files (templates must be defined in header files)',
          'Using types that do not support required operators (e.g. comparing custom objects in getMaximum without operator>)'
        ],
        quickRevision: [
          'template <typename T> enables generic programming.',
          'Resolved at compile time with zero performance penalty.',
          'Templates power the entire C++ Standard Template Library.'
        ]
      }
    },
    {
      id: 'cpp-u5-t2',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 2,
      title: 'Exception Handling: try, catch & throw',
      summary: 'Build fault-tolerant systems using modern exception handling, stack unwinding, and standard exceptions.',
      content: {
        definition: 'Exception handling provides a robust way to transfer control from a point where a runtime error occurred to a handler that knows how to resolve it, using three keywords: try, throw, and catch.',
        syntax: 'try {\n    if (errorCondition) throw std::runtime_error("Detail");\n} catch (const std::exception& e) {\n    std::cerr << e.what() << std::endl;\n}',
        codeSnippet: `#include <iostream>
#include <stdexcept>

double safeDivide(double numerator, double denominator) {
    if (denominator == 0.0) {
        throw std::invalid_argument("Division by zero error encountered!");
    }
    return numerator / denominator;
}

int main() {
    try {
        std::cout << "100 / 4 = " << safeDivide(100.0, 4.0) << std::endl;
        std::cout << "100 / 0 = " << safeDivide(100.0, 0.0) << std::endl;
    } 
    catch (const std::invalid_argument& ex) {
        std::cerr << "Caught Exception: " << ex.what() << std::endl;
    }
    catch (...) {
        std::cerr << "Caught unknown generic exception!" << std::endl;
    }

    std::cout << "Program resumed and exited gracefully." << std::endl;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'throw std::invalid_argument(...)', explanation: 'Instantiates and throws a standard exception object inherited from std::exception.' },
          { line: 'catch (const std::invalid_argument& ex)', explanation: 'Catches the exception by const reference to avoid slicing and memory copying.' },
          { line: 'catch (...)', explanation: 'Default catch-all handler that catches any exception type.' }
        ],
        keyConcepts: [
          'Stack unwinding: destructors of all local objects are called automatically as the stack unwinds to the catch block',
          'Standard exceptions: <stdexcept> provides std::runtime_error, std::invalid_argument, std::out_of_range',
          'Always catch exceptions by const reference: catch (const std::exception& e)'
        ],
        commonMistakes: [
          'Catching by value: catch (std::exception e) causes object slicing and loses derived exception info',
          'Throwing raw integers or strings instead of proper standard exception classes'
        ],
        quickRevision: [
          'throw raises error.',
          'try encapsulates guarded operations.',
          'catch catches and handles exceptions.',
          'Always catch by const reference.'
        ]
      }
    },
    {
      id: 'cpp-u5-t3',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 3,
      title: 'File Handling & Streams: <fstream>, ifstream & ofstream',
      summary: 'Perform clean object-oriented persistent disk operations using C++ stream classes.',
      content: {
        definition: '<fstream> provides stream classes to manipulate files: std::ofstream for output writing, std::ifstream for input reading, and std::fstream for combined bidirectional operations.',
        syntax: '#include <fstream>\nstd::ofstream outFile("log.txt");\noutFile << "Data\\n";\noutFile.close();\n\nstd::ifstream inFile("log.txt");\nstd::string line;\nwhile (std::getline(inFile, line)) { ... }',
        codeSnippet: `#include <iostream>
#include <fstream>
#include <string>

int main() {
    // 1. Writing to file
    std::ofstream writer("academy_records.txt");
    if (writer.is_open()) {
        writer << "CODEVERSE C++ Academy Record\\n";
        writer << "Enrollments: 2450\\nStatus: Active\\n";
        writer.close();
        std::cout << "File written successfully.\\n";
    }

    // 2. Reading from file
    std::ifstream reader("academy_records.txt");
    if (reader.is_open()) {
        std::string line;
        std::cout << "\\nFile Contents:\\n";
        while (std::getline(reader, line)) {
            std::cout << ">> " << line << "\\n";
        }
        reader.close();
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'std::ofstream writer("academy_records.txt");', explanation: 'Creates output file stream object and opens file in write mode.' },
          { line: 'writer.is_open()', explanation: 'Verifies that the file stream was opened successfully without permission errors.' },
          { line: 'std::getline(reader, line)', explanation: 'Reads stream line by line into string until EOF.' }
        ],
        keyConcepts: [
          'ifstream: read-only input stream',
          'ofstream: write-only output stream',
          'RAII: file streams close automatically when their objects go out of scope, but explicit close() is good practice',
          'File modes: std::ios::app (append), std::ios::binary (raw bytes)'
        ],
        commonMistakes: [
          'Not checking if the stream is_open() before reading or writing',
          'Assuming file open will throw an exception (it sets failbit instead unless exceptions are enabled)'
        ],
        quickRevision: [
          'ifstream = reading.',
          'ofstream = writing.',
          'fstream = read & write.',
          'std::getline(file, str) reads lines cleanly.'
        ]
      }
    },
    {
      id: 'cpp-u5-t4',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 4,
      title: 'Standard Template Library (STL): Vectors, Stacks & Queues',
      summary: 'Leverage production-grade sequence containers with dynamic memory management, iterators, and fast operations.',
      content: {
        definition: 'The C++ Standard Template Library (STL) provides high-performance templated algorithms, containers, and iterators. std::vector provides dynamically resizable contiguous arrays, std::stack implements LIFO, and std::queue implements FIFO.',
        syntax: 'std::vector<int> vec = {1, 2, 3};\nvec.push_back(4); // O(1) amortized\n\nstd::stack<int> s; // LIFO\nstd::queue<int> q; // FIFO',
        codeSnippet: `#include <iostream>
#include <vector>
#include <stack>
#include <queue>
#include <algorithm>

int main() {
    // 1. Dynamic Vector
    std::vector<int> numbers = {45, 12, 89, 23};
    numbers.push_back(99);

    std::sort(numbers.begin(), numbers.end());
    std::cout << "Sorted Vector: ";
    for (int n : numbers) std::cout << n << " ";
    std::cout << "\\nVector size: " << numbers.size() << std::endl;

    // 2. Stack (LIFO)
    std::stack<std::string> navStack;
    navStack.push("Page A");
    navStack.push("Page B");
    std::cout << "Stack Top: " << navStack.top() << std::endl;

    // 3. Queue (FIFO)
    std::queue<int> taskQueue;
    taskQueue.push(101);
    taskQueue.push(102);
    std::cout << "Queue Front: " << taskQueue.front() << std::endl;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'std::vector<int> numbers = {45, 12, 89, 23};', explanation: 'Dynamic contiguous array that resizes automatically when capacity is reached.' },
          { line: 'std::sort(numbers.begin(), numbers.end());', explanation: 'High-performance introsort algorithm (O(N log N)) from <algorithm>.' },
          { line: 'navStack.push("Page B");', explanation: 'Pushes element onto the top of the LIFO stack.' }
        ],
        keyConcepts: [
          'vector: fast random access (O(1)), fast push_back (amortized O(1))',
          'stack: Last-In First-Out (push, pop, top)',
          'queue: First-In First-Out (push, pop, front)',
          'Iterators provide a uniform interface for traversing STL containers'
        ],
        commonMistakes: [
          'Calling top() or front() on an empty stack or queue (causes undefined behavior or crash)',
          'Iterator invalidation when resizing vectors during traversal'
        ],
        quickRevision: [
          'vector: dynamic array.',
          'stack: LIFO (top/push/pop).',
          'queue: FIFO (front/push/pop).',
          'Always verify !container.empty() before reading top/front.'
        ]
      }
    },
    {
      id: 'cpp-u5-t5',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 5,
      title: 'STL Associative Containers: Maps & Sets',
      summary: 'Store unique keys and key-value mappings efficiently with std::map (Red-Black Tree) and std::unordered_map (Hash Table).',
      content: {
        definition: 'Associative containers store elements referenced by key rather than sequential index. std::map stores sorted key-value pairs implemented using Red-Black trees (O(log N)), while std::unordered_map uses hash tables (O(1) average).',
        syntax: 'std::map<std::string, int> scores;\nscores["Alice"] = 98;\nif (scores.find("Alice") != scores.end()) { ... }',
        codeSnippet: `#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> courseRoster;

    courseRoster["C_Programming"] = 450;
    courseRoster["CPP_Programming"] = 520;
    courseRoster["Algorithms"] = 380;

    std::cout << "=== ACADEMY ENROLLMENT MAP ===" << std::endl;
    for (const auto& [course, count] : courseRoster) {
        std::cout << "Course: " << course << " -> Enrolled: " << count << std::endl;
    }

    // Lookup key with find()
    auto it = courseRoster.find("CPP_Programming");
    if (it != courseRoster.end()) {
        std::cout << "\\nFound: " << it->first << " has " << it->second << " active learners." << std::endl;
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'std::map<std::string, int> courseRoster;', explanation: 'Key-value associative map sorted alphabetically by string key.' },
          { line: 'for (const auto& [course, count] : courseRoster)', explanation: 'C++17 structured binding unpacking key-value pair elements.' },
          { line: 'courseRoster.find("...")', explanation: 'Searches tree in O(log N) time without accidentally inserting default keys.' }
        ],
        keyConcepts: [
          'std::map: keys are kept in sorted order (O(log N) lookup/insertion)',
          'std::unordered_map: hash table with O(1) average lookup',
          'Using map[key] inserts a default constructed value if the key does not exist; use find() to check existence safely'
        ],
        commonMistakes: [
          'Using operator[] for checking existence, which unintentionally inserts default keys into the map',
          'Expecting keys in std::unordered_map to stay in insertion order'
        ],
        quickRevision: [
          'map = sorted key-value pairs (Red-Black Tree).',
          'unordered_map = hash table (O(1) average).',
          'Use .find() to check if key exists without inserting it.'
        ]
      }
    }
  ]
};

export const cppUnit5Quiz: Quiz = {
  id: 'quiz-cpp-5',
  unitId: 'cpp-unit-5',
  courseId: 'cpp',
  unitTitle: 'Unit 5: Advanced C++ Concepts & STL',
  title: 'Unit 5 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-cpp5-1',
      question: 'When should template function definitions be implemented in C++?',
      options: [
        'In separate compiled .dll files only',
        'In header files (.h/.hpp) so the compiler can instantiate them for every concrete type used',
        'In main.cpp exclusively',
        'They do not require definitions'
      ],
      correctIndex: 1,
      explanation: 'Templates must be defined in header files because the compiler requires the full definition to generate code for each specific type instantiation.'
    },
    {
      id: 'q-cpp5-2',
      question: 'Why should C++ exceptions always be caught by reference (catch (const std::exception& e))?',
      options: [
        'To speed up CPU clock speed',
        'To avoid object slicing of derived exception types and prevent unnecessary copying',
        'Because catch by value is forbidden by the compiler',
        'To prevent memory from being released'
      ],
      correctIndex: 1,
      explanation: 'Catching by value slices away any derived exception information and creates an extra copy of the exception object.'
    },
    {
      id: 'q-cpp5-3',
      question: 'What is the internal data structure underlying std::map in standard C++ implementations?',
      options: ['Singly linked list', 'Balanced Binary Search Tree (Red-Black Tree)', 'Hash table', 'Dynamic array'],
      correctIndex: 1,
      explanation: 'std::map is implemented using a self-balancing binary search tree (typically a Red-Black Tree), offering logarithmic O(log N) operations.'
    },
    {
      id: 'q-cpp5-4',
      question: 'What happens if you use map[key] on a key that does not exist in a std::map?',
      options: [
        'It throws std::out_of_range',
        'It inserts the key with a default-constructed value and returns a reference to it',
        'It crashes the program',
        'It returns NULL'
      ],
      correctIndex: 1,
      explanation: 'operator[] automatically inserts a new element with a default value if the key does not already exist.'
    },
    {
      id: 'q-cpp5-5',
      question: 'What is the average time complexity for push_back() on a std::vector?',
      options: ['O(N)', 'O(log N)', 'Amortized O(1)', 'O(N^2)'],
      correctIndex: 2,
      explanation: 'std::vector push_back operates in amortized O(1) constant time, occasionally allocating a larger contiguous memory buffer when capacity is full.'
    }
  ]
};
