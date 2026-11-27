import { Unit, Quiz } from '@/types';

export const cppUnit3: Unit = {
  id: 'cpp-unit-3',
  courseId: 'cpp',
  unitNumber: 3,
  title: 'Object-Oriented Programming: Classes & Objects',
  description: 'Master the core pillars of OOP: classes, objects, data encapsulation, access specifiers, constructors, destructors, and the this pointer.',
  estimatedHours: 6.0,
  quizId: 'quiz-cpp-3',
  published: true,
  topics: [
    {
      id: 'cpp-u3-t1',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 1,
      title: 'Introduction to OOP: Classes & Objects',
      summary: 'Transition from procedural programming to object-oriented thinking, modeling entities with state and behavior.',
      content: {
        definition: 'A class is a user-defined blueprint or template that binds data attributes (members) and operating methods (member functions) together. An object is a specific, instantiated instance of a class that occupies physical memory.',
        syntax: 'class ClassName {\n    // Access specifiers\npublic:\n    // Member variables and methods\n};\n\nClassName obj; // Object instantiation',
        codeSnippet: `#include <iostream>
#include <string>

class Student {
public:
    int id;
    std::string name;

    void displayInfo() {
        std::cout << "Student ID: " << id << " | Name: " << name << std::endl;
    }
};

int main() {
    Student s1; // Object instantiation
    s1.id = 101;
    s1.name = "Aria Montgomery";

    s1.displayInfo();
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'class Student { ... };', explanation: 'Class definition. Remember the trailing semicolon.' },
          { line: 'public:', explanation: 'Access specifier: members declared under public can be accessed from outside the class.' },
          { line: 'Student s1;', explanation: 'Creates an object instance of Student in stack memory.' }
        ],
        keyConcepts: [
          'State (attributes/variables) + Behavior (methods/functions) unified in one unit',
          'Default access in C++ classes is private; in structs it is public',
          'Classes define types; objects allocate memory'
        ],
        commonMistakes: [
          'Forgetting the semicolon after the class definition closing brace (class A { ... };)',
          'Attempting to access private members directly from main()'
        ],
        quickRevision: [
          'Class = Blueprint; Object = Instance.',
          'Default class access = private.',
          'Dot (.) operator accesses object members.'
        ]
      }
    },
    {
      id: 'cpp-u3-t2',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 2,
      title: 'Encapsulation, Abstraction & Access Specifiers',
      summary: 'Protect internal state with private data members, getters/setters, and public interfaces.',
      content: {
        definition: 'Encapsulation is bundling data and the methods that operate on that data into a single unit while restricting direct outside access. Abstraction hides internal complex implementation details, exposing only clean essential interfaces. Access specifiers are public, private, and protected.',
        syntax: 'class BankAccount {\nprivate:\n    double balance; // Hidden from outside tampering\npublic:\n    void deposit(double amount);\n    double getBalance() const; // Getter\n};',
        codeSnippet: `#include <iostream>

class BankAccount {
private:
    double balance; // Private data: encapsulated

public:
    BankAccount(double initialBalance) {
        balance = (initialBalance >= 0) ? initialBalance : 0.0;
    }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            std::cout << "Deposited $" << amount << " successfully." << std::endl;
        }
    }

    double getBalance() const {
        return balance;
    }
};

int main() {
    BankAccount account(500.0);
    account.deposit(250.0);
    std::cout << "Current Account Balance: $" << account.getBalance() << std::endl;
    // account.balance = 100000; // COMPILATION ERROR: balance is private!
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'private: double balance;', explanation: 'Shields balance from direct outside mutation; only member methods can modify it.' },
          { line: 'double getBalance() const', explanation: 'const member function guarantees it will not alter any object data members.' }
        ],
        keyConcepts: [
          'public: accessible from anywhere',
          'private: accessible ONLY from within member functions and friend classes',
          'protected: accessible within the class and derived (inherited) child classes',
          'Getters and setters validate data before modification'
        ],
        commonMistakes: [
          'Making all data members public, which completely violates encapsulation',
          'Returning non-const references to private members from getters'
        ],
        quickRevision: [
          'Encapsulation = data hiding + bundling.',
          'Abstraction = exposing what it does, hiding how it works.',
          'Keep member variables private, provide controlled public methods.'
        ]
      }
    },
    {
      id: 'cpp-u3-t3',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 3,
      title: 'Constructors, Types & Member Initialization Lists',
      summary: 'Initialize objects safely with default, parameterized, and copy constructors, using member initializer lists.',
      content: {
        definition: 'A constructor is a special member function with the exact same name as the class and no return type. It is invoked automatically when an object is instantiated. Modern C++ heavily favors member initializer lists (: member(val)) for optimal performance.',
        syntax: 'class Point {\n    int x, y;\npublic:\n    Point();                       // Default constructor\n    Point(int x, int y);           // Parameterized constructor\n    Point(const Point& other);     // Copy constructor\n};',
        codeSnippet: `#include <iostream>

class Vector2D {
private:
    double x;
    double y;

public:
    // 1. Default Constructor
    Vector2D() : x(0.0), y(0.0) {
        std::cout << "Default constructor invoked\\n";
    }

    // 2. Parameterized Constructor with Member Initializer List
    Vector2D(double xVal, double yVal) : x(xVal), y(yVal) {
        std::cout << "Parameterized constructor: (" << x << ", " << y << ")\\n";
    }

    // 3. Copy Constructor (Deep copy reference)
    Vector2D(const Vector2D& src) : x(src.x), y(src.y) {
        std::cout << "Copy constructor invoked\\n";
    }

    void print() const {
        std::cout << "Vector: (" << x << ", " << y << ")\\n";
    }
};

int main() {
    Vector2D v1;            // Default
    Vector2D v2(3.5, 7.2);   // Parameterized
    Vector2D v3 = v2;        // Copy
    v3.print();
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'Vector2D() : x(0.0), y(0.0)', explanation: 'Member initializer list: initializes members directly when memory is allocated.' },
          { line: 'Vector2D(const Vector2D& src)', explanation: 'Copy constructor taking a const reference to prevent infinite recursive copying.' }
        ],
        keyConcepts: [
          'No return type (not even void)',
          'Member initializer lists are faster because they avoid constructing a default value and then overwriting it in the body',
          'Copy constructor is called when passing objects by value or returning objects from functions'
        ],
        commonMistakes: [
          'Writing a return type for constructors (e.g. void Point())',
          'Passing the copy constructor argument by value (Point(Point src)) which causes an infinite recursive copy loop'
        ],
        quickRevision: [
          'Constructor shares class name, has no return type.',
          'Invoked automatically upon creation.',
          'Always use member initializer lists (: x(val)).'
        ]
      }
    },
    {
      id: 'cpp-u3-t4',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 4,
      title: 'Destructors & the "this" Pointer',
      summary: 'Clean up resources (RAII) with destructors (~ClassName) and disambiguate instance members with this.',
      content: {
        definition: 'A destructor is a special member function named with a tilde prefix (~ClassName) and no arguments, called automatically when an object goes out of scope or is deleted. The this pointer is an implicit pointer passed to all non-static member functions pointing to the calling object itself.',
        syntax: '~ClassName() { /* Free dynamic heap memory / close files */ }\nthis->member = value; // Disambiguates parameter from member',
        codeSnippet: `#include <iostream>

class DynamicBuffer {
private:
    int* data;
    int size;

public:
    DynamicBuffer(int s) : size(s) {
        data = new int[size]; // Dynamic heap allocation
        std::cout << "Buffer of size " << size << " allocated.\\n";
    }

    // Destructor: guarantees no memory leak (RAII)
    ~DynamicBuffer() {
        delete[] data;
        std::cout << "Buffer released and memory freed.\\n";
    }

    // "this" pointer usage
    DynamicBuffer& setSize(int size) {
        this->size = size; // Distinguishes member 'size' from parameter 'size'
        return *this;      // Allows method chaining: buf.setSize(10).doSomething()
    }
};

int main() {
    {
        DynamicBuffer buf(64);
    } // buf goes out of scope here; destructor automatically triggers!
    std::cout << "Returned safely after scope exit.\\n";
    return 0;
}`,
        lineByLineExplanation: [
          { line: '~DynamicBuffer()', explanation: 'Destructor. Releases the dynamic array allocated with new[] using delete[].' },
          { line: 'this->size = size;', explanation: 'this pointer resolves the ambiguity between parameter size and member variable size.' },
          { line: 'return *this;', explanation: 'Dereferencing this returns a reference to the invoking object, facilitating method chaining.' }
        ],
        keyConcepts: [
          'RAII (Resource Acquisition Is Initialization): destructors guarantee deterministic resource cleanup',
          'A class can have only ONE destructor; destructors cannot be overloaded or take parameters',
          'this is a pointer to the calling instance (ClassName* const this)'
        ],
        commonMistakes: [
          'Calling delete instead of delete[] on arrays allocated with new[]',
          'Trying to overload a destructor with arguments'
        ],
        quickRevision: [
          'Destructor (~Class): releases resources when object dies.',
          'this: pointer to the current instance.',
          'return *this enables fluent method chaining.'
        ]
      }
    }
  ]
};

export const cppUnit3Quiz: Quiz = {
  id: 'quiz-cpp-3',
  unitId: 'cpp-unit-3',
  courseId: 'cpp',
  unitTitle: 'Unit 3: Object-Oriented Programming',
  title: 'Unit 3 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-cpp3-1',
      question: 'What is the default access specifier for members of a C++ class if none is explicitly specified?',
      options: ['public', 'private', 'protected', 'global'],
      correctIndex: 1,
      explanation: 'In C++, all members of a class are private by default. In a struct, members are public by default.'
    },
    {
      id: 'q-cpp3-2',
      question: 'What is the return type of a C++ constructor or destructor?',
      options: ['void', 'int', 'bool', 'They have no return type, not even void'],
      correctIndex: 3,
      explanation: 'Constructors and destructors have no return type specification whatsoever.'
    },
    {
      id: 'q-cpp3-3',
      question: 'Why should the parameter of a copy constructor (e.g. MyClass(const MyClass& src)) be passed by reference?',
      options: [
        'To speed up arithmetic',
        'Passing by value would require calling the copy constructor itself, causing infinite recursive calls',
        'Because C++ does not allow const in values',
        'To convert it to a pointer'
      ],
      correctIndex: 1,
      explanation: 'If passed by value, creating the parameter copy would invoke the copy constructor, leading to infinite recursion.'
    },
    {
      id: 'q-cpp3-4',
      question: 'What does the implicit "this" pointer represent inside a non-static member function?',
      options: [
        'A pointer to the parent base class',
        'A pointer to the current object instance invoking the member function',
        'A reference to the main() function',
        'The total count of allocated objects'
      ],
      correctIndex: 1,
      explanation: 'The this pointer holds the memory address of the specific object instance that called the member function.'
    },
    {
      id: 'q-cpp3-5',
      question: 'What core C++ paradigm guarantees that dynamically allocated resources are freed as soon as an object goes out of scope?',
      options: [
        'Garbage Collection',
        'RAII (Resource Acquisition Is Initialization)',
        'Virtual Dispatch',
        'Type Casting'
      ],
      correctIndex: 1,
      explanation: 'RAII binds resource management to object lifetimes: resources acquired in constructors are guaranteed to be released in destructors upon scope exit.'
    }
  ]
};
