import { Unit, Quiz } from '@/types';

export const cppUnit4: Unit = {
  id: 'cpp-unit-4',
  courseId: 'cpp',
  unitNumber: 4,
  title: 'Strings in C++ and Features of OOP',
  description: 'Master C-style strings and the standard string class, along with the foundational pillars of Object-Oriented Programming: classes, objects, data abstraction, encapsulation, inheritance, polymorphism, and data hiding.',
  estimatedHours: 6.0,
  quizId: 'quiz-cpp-4',
  published: true,
  topics: [
    {
      id: 'cpp-u4-t1',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 1,
      title: 'C-Style Character Strings (Null-Terminated Arrays)',
      summary: 'Explore the legacy C-style character string representation in C++, null character termination, and contiguous byte memory layouts.',
      content: {
        definition: 'In C++, strings can be represented in two ways: legacy C-style character strings and the modern C++ std::string class. A C-style character string originated within the C language and continues to be fully supported in C++. It is a one-dimensional array of characters terminated by a null character (\'\\0\'). The null character indicates the boundary of the string data in contiguous memory.',
        syntax: '// Explicit null character initialization:\nchar greeting[6] = {\'H\', \'e\', \'l\', \'l\', \'o\', \'\\0\'};\n\n// String literal auto-initialization (null character added automatically):\nchar greeting[] = "Hello";',
        codeSnippet: `#include <iostream>
using namespace std;

int main() {
    // 1. Explicit character array initialization with null character
    char greeting1[6] = {'H', 'e', 'l', 'l', 'o', '\\0'};

    // 2. String literal shorthand (compiler automatically appends '\\0')
    char greeting2[] = "Hello";

    // 3. Printing strings to standard output
    cout << "Greeting message 1: " << greeting1 << endl;
    cout << "Greeting message 2: " << greeting2 << endl;

    // 4. Memory Inspection: Display characters, indices, and memory addresses
    cout << "\\nContiguous Memory Representation of 'Hello':" << endl;
    cout << "Index\\tChar\\tASCII\\tAddress" << endl;
    cout << "------------------------------------------" << endl;
    for (int i = 0; i < 6; i++) {
        char ch = greeting2[i];
        cout << i << "\\t" 
             << (ch == '\\0' ? "\\\\0" : string(1, ch)) << "\\t"
             << (int)ch << "\\t"
             << (void*)&greeting2[i] << endl;
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: "char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\\0'};", explanation: 'Declares an array of 6 characters. To hold the word "Hello" (5 letters) and the terminating null character, the array size must be at least 6.' },
          { line: 'char greeting[] = "Hello";', explanation: 'String literal syntax. The C++ compiler calculates length 5 + 1 and automatically inserts the null character \'\\0\' at the end of the array.' },
          { line: 'cout << greeting1;', explanation: 'The << stream operator iterates through the character array until it encounters the \'\\0\' byte, printing each character along the way.' },
          { line: '(void*)&greeting2[i]', explanation: 'Casting &char to void* forces cout to print the hexadecimal memory address instead of treating it as a null-terminated string.' }
        ],
        keyConcepts: [
          'Null-Terminator (\'\\0\'): ASCII value 0. Crucial for indicating the end of a C-string in memory.',
          'Array Dimension Rule: For a word of N characters, the character array must be sized to at least N + 1 elements.',
          'Memory Layout: Each character occupies exactly 1 byte at contiguous memory addresses (e.g., 0x23451 to 0x23456).',
          'Read-only String Literals: String literals like "Hello" stored in read-only data segments must not be modified in place.'
        ],
        commonMistakes: [
          'Forgetting the null character byte: char s[5] = "Hello"; causes a compiler buffer overflow or un-terminated memory reading garbage.',
          'Confusing \'0\' (ASCII 48) with \'\\0\' (ASCII 0): The null character is not the character zero, it is the zero byte byte marker.',
          'Assigning string literals to existing arrays using the = operator after declaration (e.g., char s[10]; s = "Hello"; is invalid in C++).'
        ],
        quickRevision: [
          'C-strings are null-terminated 1D char arrays: char s[] = "Hello".',
          'Size must always accommodate the trailing \'\\0\' (length + 1).',
          'cout stops printing characters when it encounters byte 0x00 (\'\\0\').'
        ]
      }
    },
    {
      id: 'cpp-u4-t2',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 2,
      title: 'C-Style String Built-in Functions (<cstring>)',
      summary: 'Master the fundamental standard C library string manipulation functions including strcpy, strcat, strlen, strcmp, strchr, and strstr.',
      content: {
        definition: 'C++ provides a wide range of standard library functions inherited from the C library (defined in the <cstring> header) to manipulate null-terminated character strings. These functions operate by traversing the character pointer until reaching the null character terminator.',
        syntax: '#include <cstring>\n\nstrcpy(dest, src);    // Copies src into dest\nstrcat(dest, src);    // Concatenates src onto end of dest\nstrlen(str);          // Returns length excluding \'\\0\'\nstrcmp(s1, s2);       // Returns 0 if equal, <0 if s1<s2, >0 if s1>s2\nstrchr(str, ch);      // Returns pointer to first occurrence of character ch\nstrstr(s1, s2);       // Returns pointer to first occurrence of substring s2 in s1',
        codeSnippet: `#include <iostream>
#include <cstring>
using namespace std;

int main() {
    char str1[20] = "Hello";
    char str2[10] = "World";
    char str3[20];
    int len;

    // 1. strcpy(s1, s2): copy str1 into str3
    strcpy(str3, str1);
    cout << "strcpy(str3, str1) : " << str3 << endl;

    // 2. strcat(s1, s2): concatenates str2 onto the end of str1
    strcat(str1, str2);
    cout << "strcat(str1, str2): " << str1 << endl;

    // 3. strlen(s1): total length of str1 after concatenation
    len = strlen(str1);
    cout << "strlen(str1) : " << len << endl;

    // 4. strcmp(s1, s2): lexicographical comparison
    int cmpResult = strcmp(str3, "Hello");
    cout << "strcmp(str3, \\"Hello\\"): " << cmpResult << " (0 means identical)" << endl;

    // 5. strchr(s1, ch): find first occurrence of character 'l'
    char* charPtr = strchr(str3, 'l');
    if (charPtr != nullptr) {
        cout << "strchr(str3, 'l') found at index: " << (charPtr - str3) << endl;
    }

    // 6. strstr(s1, s2): find substring in string
    char text[] = "Learning C++ Programming at Codeverse";
    char* subPtr = strstr(text, "C++");
    if (subPtr != nullptr) {
        cout << "strstr found substring: " << subPtr << endl;
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'strcpy(str3, str1);', explanation: 'Copies characters from str1 into str3 sequentially, including the terminating null character.' },
          { line: 'strcat(str1, str2);', explanation: 'Appends characters of str2 onto str1, overwriting the null character of str1 and placing a new null character at the end.' },
          { line: 'len = strlen(str1);', explanation: 'Iterates through str1 counting characters until \'\\0\' is reached; does not include the null character in the count.' },
          { line: 'strcmp(str3, "Hello");', explanation: 'Compares ASCII values. Returns 0 if strings match, a negative value if str3 < "Hello", or positive if str3 > "Hello".' }
        ],
        keyConcepts: [
          'Buffer Capacity Requirement: When using strcpy() or strcat(), the destination array must have enough allocated space to store the combined string plus \'\\0\'.',
          'strlen() vs sizeof(): strlen(str) counts active characters before \'\\0\', while sizeof(str) returns the total allocated memory in bytes.',
          'Null Pointer Handling: strchr and strstr return a pointer to the matching position, or nullptr/NULL if the target is not found.'
        ],
        commonMistakes: [
          'Buffer overflow: Concatenating or copying into a character array that is too small corrupts adjacent stack memory.',
          'Passing non-null-terminated character arrays to string functions leads to undefined behavior and segmentation faults.',
          'Comparing C-strings with == (e.g., if (str1 == "Hello")): This compares memory pointers, not string contents! Always use strcmp().'
        ],
        quickRevision: [
          'strcpy(dest, src) -> copies string.',
          'strcat(dest, src) -> concatenates src onto dest.',
          'strlen(s) -> returns character count up to \'\\0\'.',
          'strcmp(s1, s2) -> 0 indicates equal strings.'
        ]
      }
    },
    {
      id: 'cpp-u4-t3',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 3,
      title: 'The C++ Standard string Class & Built-in Methods',
      summary: 'Leverage the modern C++ std::string class for intuitive, memory-safe text manipulation, operators, and member methods.',
      content: {
        definition: 'The standard C++ library provides a string class type (defined in header <string>) that encapsulates dynamic memory management, automatic resizing, and intuitive operators. It eliminates manual memory management and buffer overflows while offering high-level methods like substr(), find(), replace(), insert(), erase(), compare(), and c_str().',
        syntax: '#include <string>\nusing namespace std;\n\nstring str1 = "Hello";\nstring str2 = "World";\nstring str3 = str1 + str2;    // Natural operator overloading\nint len = str3.size();         // or str3.length()',
        codeSnippet: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string str1 = "Hello";
    string str2 = "World";
    string str3;
    int len;

    // 1. Copy str1 into str3 using operator=
    str3 = str1;
    cout << "str3 : " << str3 << endl;

    // 2. Concatenate str1 and str2 using operator+
    str3 = str1 + str2;
    cout << "str1 + str2 : " << str3 << endl;

    // 3. Total length of str3 using .size()
    len = str3.size();
    cout << "str3.size() : " << len << endl;

    // 4. Built-in string methods Demonstration
    string s = "Hello Codeverse";

    // substr(start, length): extracts portion
    cout << "s.substr(6, 9): " << s.substr(6, 9) << endl;

    // find(search_str): searches for substring
    size_t pos = s.find("Code");
    cout << "s.find(\\"Code\\") at index: " << pos << endl;

    // insert(position, string)
    s.insert(5, " Amazing");
    cout << "After insert: " << s << endl;

    // replace(pos, length, new_str)
    s.replace(6, 7, "Brilliant");
    cout << "After replace: " << s << endl;

    // erase(pos, length)
    s.erase(0, 6);
    cout << "After erase: " << s << endl;

    // compare()
    cout << "Comparison result: " << s.compare("Brilliant Codeverse") << endl;

    // c_str(): converts to C-style const char* for legacy C libraries
    const char* cStr = s.c_str();
    cout << "C-style pointer representation: " << cStr << endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'string str3 = str1 + str2;', explanation: 'Uses the overloaded + operator to concatenate strings without manual buffer allocation or memory tracking.' },
          { line: 'len = str3.size();', explanation: 'Returns the number of characters in the string in O(1) constant time (equivalent to .length()).' },
          { line: 's.substr(6, 9);', explanation: 'Extracts a new substring starting at index 6 containing up to 9 characters.' },
          { line: 's.c_str();', explanation: 'Returns a pointer to a null-terminated array of characters representing the current contents of the string object.' }
        ],
        keyConcepts: [
          'Dynamic Memory Allocation: std::string handles allocation, expansion, and deallocation automatically on the heap/free store.',
          'Small String Optimization (SSO): Most modern C++ implementations store strings shorter than 15-22 characters directly on the stack without heap allocation.',
          'Intuitive Operator Syntax: Supports assignment (=), concatenation (+, +=), comparison (==, !=, <, >), and indexing ([]).'
        ],
        commonMistakes: [
          'Invoking s.c_str() and storing the raw pointer after modifying or destroying the std::string object, creating a dangling pointer.',
          'Assuming s.find() returns -1 on failure: It actually returns string::npos (a large unsigned integer). Always compare: if (pos != string::npos).'
        ],
        quickRevision: [
          '#include <string> provides the robust std::string type.',
          'Use + for concatenation and .size() / .length() for length.',
          'c_str() bridges C++ string objects to legacy C const char* functions.'
        ]
      }
    },
    {
      id: 'cpp-u4-t4',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 4,
      title: 'OOP Fundamentals: Classes, Objects & Member Definitions',
      summary: 'Understand the central features of OOP: class blueprints, user-defined types, data members, member functions, and object instantiation.',
      content: {
        definition: 'The main purpose of C++ programming is to add object orientation to the C programming language. Classes are the central feature of C++ that supports object-oriented programming and are often called user-defined types. A class is used to specify the form of an object, combining data representation and methods for manipulating that data into one neat package. When you define a class, you define a blueprint for a data type that specifies what an object consists of and what operations can be performed on it.',
        syntax: 'class ClassName {\npublic:\n    // Public member variables (data)\n    // Public member functions (methods)\n};\n\n// Object Instantiation:\nClassName obj1;\nClassName obj2;',
        codeSnippet: `#include <iostream>
using namespace std;

// Class Definition: Blueprint for a Box data type
class Box {
public:
    double length;   // Length of a box
    double breadth;  // Breadth of a box
    double height;   // Height of a box
};

int main() {
    // Declare two distinct objects of type Box
    Box Box1; // Declare Box1 of type Box
    Box Box2; // Declare Box2 of type Box
    double volume = 0.0; // Store the volume of a box here

    // box 1 specification
    Box1.height = 5.0;
    Box1.length = 6.0;
    Box1.breadth = 7.0;

    // box 2 specification
    Box2.height = 10.0;
    Box2.length = 12.0;
    Box2.breadth = 13.0;

    // volume of box 1
    volume = Box1.height * Box1.length * Box1.breadth;
    cout << "Volume of Box1 : " << volume << endl;

    // volume of box 2
    volume = Box2.height * Box2.length * Box2.breadth;
    cout << "Volume of Box2 : " << volume << endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'class Box { ... };', explanation: 'Class definition begins with the keyword class, followed by class name, curly braces enclosing members, and a mandatory terminating semicolon.' },
          { line: 'public:', explanation: 'Access specifier determining access attributes. Members following public can be accessed from outside the class anywhere within the scope of the object.' },
          { line: 'Box Box1; Box Box2;', explanation: 'Declares two independent instances (objects) of the class Box. Each object possesses its own distinct copy of data members.' },
          { line: 'Box1.height = 5.0;', explanation: 'Dot operator (.) is used to access individual member variables and methods of an object.' }
        ],
        keyConcepts: [
          'Class vs Object: A class is an abstract blueprint/data type; an object is a concrete, physical instance in memory.',
          'Program Statements & Program Data: C++ programs combine statements (functions/actions) and data (information manipulated by functions).',
          'Independent State: Modifying data members of Box1 has zero effect on the data members of Box2.',
          'Mandatory Semicolon: In C++, class definitions must always terminate with a semicolon (;).'
        ],
        commonMistakes: [
          'Forgetting the semicolon after the closing curly brace of a class definition: class Box { ... } causes compiler errors.',
          'Attempting to access class members before instantiating an object or through uninitialized pointers.'
        ],
        quickRevision: [
          'class is a user-defined blueprint; object is an instance.',
          'Dot operator (.) accesses member variables and functions.',
          'Every object has its own separate copy of non-static data members.'
        ]
      }
    },
    {
      id: 'cpp-u4-t5',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 5,
      title: 'Data Abstraction & Access Labels',
      summary: 'Separate interface from internal implementation using access labels, public APIs, and abstract data types.',
      content: {
        definition: 'Data abstraction refers to providing only essential information to the outside world and hiding their background details, representing the needed information in a program without presenting implementation details. It relies on the clear separation of interface and implementation. A real-world example is a Television: you use buttons or a remote control to adjust volume or change channels without needing to know how it receives signals or translates electronic currents to display pictures on the screen.',
        syntax: 'class AbstractType {\npublic:\n    // Public Interface: Accessible to all parts of the program\n    void operation();\nprivate:\n    // Hidden Implementation: Inaccessible to external code\n    int internalState;\n};',
        codeSnippet: `#include <iostream>
using namespace std;

class Adder {
public:
    // Constructor initializes internal state
    Adder(int i = 0) {
        total = i;
    }

    // Public Interface to the outside world
    void addNum(int number) {
        total += number;
    }

    // Public Interface to retrieve computed state
    int getTotal() {
        return total;
    }

private:
    // Hidden data from the outside world (implementation detail)
    int total;
};

int main() {
    Adder a;

    // Interacting solely via the public interface
    a.addNum(10);
    a.addNum(20);
    a.addNum(30);

    // Retrieving the computed total
    cout << "Total " << a.getTotal() << endl;

    // The following statement would cause a COMPILER ERROR:
    // a.total = 100; // Error: 'total' is private within this context

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'class Adder { public: ... private: ... };', explanation: 'Defines the abstract interface using public and private access labels.' },
          { line: 'public: void addNum(int number)', explanation: 'Exposes an interface function to the outside world to manipulate state in a controlled manner.' },
          { line: 'private: int total;', explanation: 'Hides the variable total from the outside world so unauthorized code cannot tamper with or corrupt internal state.' },
          { line: 'cout << "Total " << a.getTotal() << endl;', explanation: 'Client code retrieves output through public methods without needing direct variable access.' }
        ],
        keyConcepts: [
          'Separation of Concerns: The public interface specifies WHAT the class does, while the private section controls HOW it achieves it.',
          'Standard Library Abstraction: When streaming text via cout << "Hello", you interact with the ostream interface without knowing low-level display driver algorithms.',
          'Evolution Safety: The author can rewrite internal algorithms (or switch data types) without breaking client code that depends on the public interface.',
          'Error Protection: Inadvertent external modifications that could violate object integrity are prevented.'
        ],
        commonMistakes: [
          'Making member variables public to avoid writing getter/setter methods, destroying abstraction and leaving data vulnerable to corruption.',
          'Assuming abstraction impacts runtime speed: Abstraction is verified during compilation with zero runtime overhead.'
        ],
        quickRevision: [
          'Abstraction = Show essential interface, hide internal complexity.',
          'public members define the visible interface.',
          'private members hide implementation specifics.'
        ]
      }
    },
    {
      id: 'cpp-u4-t6',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 6,
      title: 'Data Encapsulation & Class Protection Boundaries',
      summary: 'Bind program data and manipulation functions into cohesive classes, establish default private scoping, and examine friend specifier trade-offs.',
      content: {
        definition: 'All C++ programs are composed of two fundamental elements: Program statements (code/functions that perform actions) and Program data (information affected by functions). Encapsulation is an Object-Oriented Programming concept that binds together the data and the functions that manipulate the data, keeping both safe from outside interference and misuse. While Data Encapsulation is the mechanism of bundling data and functions, Data Abstraction is the mechanism of exposing only interfaces and hiding implementation.',
        syntax: 'class EncapsulatedBox {\npublic:\n    double getVolume(void) {\n        return length * breadth * height;\n    }\nprivate:\n    double length;\n    double breadth;\n    double height;\n};',
        codeSnippet: `#include <iostream>
using namespace std;

class Box {
public:
    // Public method: Member function manipulating encapsulated private data
    double getVolume(void) {
        return length * breadth * height;
    }

    // Public setters to establish controlled modification
    void setDimensions(double l, double b, double h) {
        if (l > 0 && b > 0 && h > 0) {
            length = l;
            breadth = b;
            height = h;
        } else {
            cout << "Invalid box dimensions provided!" << endl;
        }
    }

private:
    // Private data members: Encapsulated and hidden from external interference
    double length;
    double breadth;
    double height;
};

int main() {
    Box myBox;

    // Initializing dimensions through verified setter
    myBox.setDimensions(5.0, 6.0, 7.0);

    // Calculating and outputting volume through public method
    cout << "Calculated Box Volume: " << myBox.getVolume() << endl;

    // Direct access to private members is strictly prevented:
    // myBox.length = 10.0; // Compiler Error: 'double Box::length' is private

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'public: double getVolume(void)', explanation: 'Member function that has privileged access to the encapsulated private variables length, breadth, and height.' },
          { line: 'private: double length, breadth, height;', explanation: 'Data members are placed under private, preventing external direct modification.' },
          { line: 'myBox.setDimensions(5.0, 6.0, 7.0);', explanation: 'Encapsulation ensures modifications pass through validation logic before affecting the object state.' }
        ],
        keyConcepts: [
          'Default Access Specifier: By default, all members in a C++ class are private (whereas in a struct, members are public by default).',
          'Data Hiding Genesis: Data encapsulation naturally leads to the OOP concept of data hiding.',
          'The Friend Mechanism: Declaring a function or class as a friend grants it access to private members, but weakens encapsulation and should be used judiciously.'
        ],
        commonMistakes: [
          'Confusing Abstraction with Encapsulation: Encapsulation is the packaging/container (bundling data + code); Abstraction is the selective hiding of complexity.',
          'Overusing friend classes or making internal details public to bypass class architecture.'
        ],
        quickRevision: [
          'Encapsulation bundles data and functions together into a single unit.',
          'Class members are private by default in C++.',
          'Protects object state from accidental external modification.'
        ]
      }
    },
    {
      id: 'cpp-u4-t7',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 7,
      title: 'Inheritance: Base & Derived Classes and the IS-A Relationship',
      summary: 'Reuse code and structure hierarchical architectures using base and derived classes, derivation lists, and IS-A relationships.',
      content: {
        definition: 'Inheritance is one of the most important concepts in object-oriented programming. It allows us to define a class in terms of another class, which makes it easier to create and maintain an application while providing an opportunity to reuse code functionality and accelerate implementation time. When creating a class, instead of writing completely new data members and member functions, the programmer designates that the new class should inherit the members of an existing class. The existing class is called the base class, and the new class is called the derived class. Inheritance implements the IS-A relationship (e.g., Mammal IS-A Animal, Dog IS-A Mammal, hence Dog IS-A Animal).',
        syntax: 'class derived-class : access-specifier base-class {\n    // Additional derived members\n};',
        codeSnippet: `#include <iostream>
#include <string>
using namespace std;

// 1. Base Class (Parent)
class Animal {
public:
    void eat() {
        cout << "This animal is eating." << endl;
    }

    void sleep() {
        cout << "This animal is sleeping." << endl;
    }
};

// 2. Derived Class (Child)
// The ":" symbol designates "inherits from", public specifies public inheritance
class Dog : public Animal {
public:
    void bark() {
        cout << "The dog says: Woof! Woof!" << endl;
    }
};

int main() {
    // Create an object of the Child class
    Dog myDog;

    // Use inherited methods from the Parent class (Animal)
    myDog.eat();
    myDog.sleep();

    // Use specialized method from the Child class (Dog)
    myDog.bark();

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'class Dog : public Animal', explanation: 'Class derivation syntax. Dog is derived from Animal with public inheritance, granting Dog access to Animal\'s public members.' },
          { line: 'myDog.eat();', explanation: 'Invokes the eat() method inherited directly from the base class Animal without duplicating its code.' },
          { line: 'myDog.bark();', explanation: 'Invokes the child class\'s own specialized method.' }
        ],
        keyConcepts: [
          'Code Reusability: Common attributes and behaviors are written once in the base class and inherited by multiple derived classes.',
          'IS-A Relationship: Establishes a taxonomic hierarchy where a derived class object can substitute for a base class object.',
          'Derivation List: A derived class can inherit from one base class (single inheritance) or multiple base classes (multiple inheritance).'
        ],
        commonMistakes: [
          'Using private inheritance accidentally by omitting the access specifier: class Dog : Animal defaults to private inheritance, making public methods of Animal inaccessible.',
          'Violating the IS-A relationship (e.g., deriving Car from Engine rather than using composition: a Car HAS-A Engine, not IS-A Engine).'
        ],
        quickRevision: [
          'Base class = Parent class; Derived class = Child class.',
          'Syntax: class Derived : public Base { ... };',
          'Models IS-A relationships and promotes code reuse.'
        ]
      }
    },
    {
      id: 'cpp-u4-t8',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 8,
      title: 'Polymorphism & Advanced Data Hiding (Runtime Dispatch & Access Control Mechanics)',
      summary: 'Explore polymorphism with virtual functions and base pointers, alongside the compilation-phase mechanics of data hiding, access specifiers, and setters/getters.',
      content: {
        definition: 'The word polymorphism means "having many forms." Typically, polymorphism occurs when there is a hierarchy of classes related by inheritance. C++ polymorphism means that a call to a member function will cause a different function to be executed depending on the type of object that invokes the function. In addition, Data Hiding is a logical barrier enforced during the compilation phase by access specifiers (private, protected, public) and validated setter/getter methods. Once code compiles into machine binary instructions, access specifiers disappear; they are purely tools for developer safety and integrity.',
        syntax: '// Polymorphism using virtual keyword:\nclass Base {\npublic:\n    virtual void action() { /* default */ }\n};\n\nclass Derived : public Base {\npublic:\n    void action() override { /* specialized */ }\n};\n\nBase* ptr = new Derived();\nptr->action(); // Dynamically dispatches to Derived::action()',
        codeSnippet: `#include <iostream>
#include <string>
using namespace std;

// ==========================================
// PART 1: POLYMORPHISM IN ACTION
// ==========================================
class Animal {
public:
    // "virtual" tells C++ to look for a redefined version in the child class at runtime
    virtual void makeSound() {
        cout << "The animal makes a generic sound." << endl;
    }
};

class Dog : public Animal {
public:
    void makeSound() override { // "override" shows we are changing parent behavior
        cout << "The dog says: Woof! Woof!" << endl;
    }
};

class Cat : public Animal {
public:
    void makeSound() override {
        cout << "The cat says: Meow!" << endl;
    }
};

// ==========================================
// PART 2: DATA HIDING MECHANICS
// ==========================================
class Employee {
private:
    // 1. DATA HIDING: State variables cannot be accessed directly from outside
    int salary;
    string name;

public:
    // Constructor to initialize data safely
    Employee(string n, int s) {
        name = n;
        setSalary(s); // Use setter to ensure validation logic runs
    }

    // 2. SETTER: Controlled way to change hidden data with validation logic
    void setSalary(int s) {
        if (s > 0) {
            salary = s;
        } else {
            cout << "Error: Invalid salary amount!" << endl;
        }
    }

    // 3. GETTER: Controlled way to view hidden data
    void displayInfo() {
        cout << "Employee: " << name << " | Salary: $" << salary << endl;
    }
};

int main() {
    cout << "--- 1. Polymorphism with Base Pointers ---" << endl;
    Animal* myAnimal;
    Dog myDog;
    Cat myCat;

    // Point to Dog
    myAnimal = &myDog;
    myAnimal->makeSound(); // Output: Woof! Woof!

    // Point to Cat
    myAnimal = &myCat;
    myAnimal->makeSound(); // Output: Meow!

    cout << "\\n--- 2. Data Hiding with Setters/Getters ---" << endl;
    Employee emp1("Alice", 50000);
    emp1.displayInfo();

    // Valid modification
    emp1.setSalary(55000);
    emp1.displayInfo();

    // Invalid modification blocked by validation logic
    emp1.setSalary(-500); // Logic prevents this hack/mistake
    emp1.displayInfo();

    // Direct access to private members causes a COMPILER ERROR:
    // emp1.salary = -100; // Error: 'salary' is private

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'virtual void makeSound()', explanation: 'Declaring the method virtual instructs the C++ compiler to use dynamic binding (runtime dispatch via vtable).' },
          { line: 'void makeSound() override', explanation: 'override keyword guarantees at compile-time that the signature matches a virtual method in the base class.' },
          { line: 'Animal* myAnimal = &myDog; myAnimal->makeSound();', explanation: 'A base class pointer pointing to a derived object dispatches the call to Dog::makeSound() at runtime.' },
          { line: 'void setSalary(int s) { if (s > 0) ... }', explanation: 'Data hiding protects internal integrity: setters enforce business rules and reject invalid states.' },
          { line: 'emp1.salary = -100; // COMPILER ERROR', explanation: 'The compiler prevents external direct modification of private variables, enforcing the access boundary.' }
        ],
        keyConcepts: [
          'Polymorphism Mechanics: Different behaviors invoked through a unified base class interface.',
          'Compile-Time vs Runtime: Data hiding is enforced at compile time; virtual method dispatch resolves at runtime.',
          'Access Specifiers Summary:',
          '  - private: Accessible only within class and friends. For state variables.',
          '  - protected: Accessible within class, friends, and derived classes. For frameworks.',
          '  - public: Accessible everywhere. Acts as the interface / steering wheel for the object.'
        ],
        commonMistakes: [
          'Forgetting the virtual keyword in the base class: without virtual, pointer calls statically bind to the base implementation.',
          'Bypassing setter validation by making variables public or returning non-const references to private data.'
        ],
        quickRevision: [
          'Polymorphism = One interface, multiple implementations.',
          'virtual keyword enables dynamic runtime dispatch.',
          'Data hiding uses private variables + public getters/setters for integrity.'
        ]
      }
    }
  ]
};

export const cppUnit4Quiz: Quiz = {
  id: 'quiz-cpp-4',
  unitId: 'cpp-unit-4',
  courseId: 'cpp',
  unitTitle: 'Unit 4: Strings in C++ and Features of OOP',
  title: 'Unit 4 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-cpp4-1',
      question: 'In C++, how many bytes must be allocated in a character array to store the string "Codeverse" (9 characters) as a C-style string?',
      options: [
        '9 bytes',
        '10 bytes (9 characters plus 1 byte for the null terminator \'\\0\')',
        '16 bytes (always rounded to powers of 2)',
        '8 bytes'
      ],
      correctIndex: 1,
      explanation: 'A null-terminated C-style character string requires N + 1 bytes: one byte for each character plus an additional byte at the end for the null character \'\\0\'.'
    },
    {
      id: 'q-cpp4-2',
      question: 'What does the function strcmp(s1, s2) return when both strings s1 and s2 are identical?',
      options: [
        '1',
        '-1',
        '0',
        'true'
      ],
      correctIndex: 2,
      explanation: 'strcmp(s1, s2) returns 0 if s1 and s2 are identical, a negative integer if s1 < s2, and a positive integer if s1 > s2 in lexicographical order.'
    },
    {
      id: 'q-cpp4-3',
      question: 'Which method of the C++ standard std::string class extracts a portion of a string beginning at start_pos for length characters?',
      options: [
        's.slice(start_pos, length)',
        's.substr(start_pos, length)',
        's.part(start_pos, length)',
        's.extract(start_pos, length)'
      ],
      correctIndex: 1,
      explanation: 's.substr(start_pos, length) extracts and returns a newly constructed string object with a copy of a substring.'
    },
    {
      id: 'q-cpp4-4',
      question: 'In C++, what is the default access specifier for members defined within a class if no access label is specified?',
      options: [
        'public',
        'protected',
        'private',
        'internal'
      ],
      correctIndex: 2,
      explanation: 'By default, all members defined in a C++ class are private. (In contrast, struct members default to public).'
    },
    {
      id: 'q-cpp4-5',
      question: 'What is the primary difference between Data Abstraction and Data Encapsulation in C++?',
      options: [
        'Data Abstraction is used only in C, while Encapsulation is used in C++',
        'Data Encapsulation is bundling data and functions together into a class; Data Abstraction is exposing only the interface and hiding background implementation details',
        'Data Abstraction makes all members private, while Encapsulation makes all members public',
        'There is no difference; they are exact synonyms'
      ],
      correctIndex: 1,
      explanation: 'Encapsulation is the packaging mechanism that bundles data with functions that manipulate that data, keeping both safe. Abstraction is the design technique of exposing the public interface while hiding internal implementation details.'
    },
    {
      id: 'q-cpp4-6',
      question: 'Which C++ access specifier allows member variables to be accessed by derived (child) classes while remaining hidden from general external code?',
      options: [
        'private',
        'protected',
        'public',
        'friend'
      ],
      correctIndex: 1,
      explanation: 'The protected access specifier provides a middle ground: it hides data from the outside world but allows derived classes to inherit and access it directly.'
    },
    {
      id: 'q-cpp4-7',
      question: 'What relationship is established between a base class and a derived class through inheritance?',
      options: [
        'HAS-A relationship',
        'IS-A relationship (e.g., Dog IS-A Animal)',
        'USES-A relationship',
        'OWNS-A relationship'
      ],
      correctIndex: 1,
      explanation: 'Inheritance models the IS-A relationship: a derived class object is a specialized type of the base class (e.g. Dog IS-A Animal).'
    },
    {
      id: 'q-cpp4-8',
      question: 'In C++, which keyword must be used in the base class method declaration to enable runtime dynamic dispatch (polymorphism) when called through a base class pointer?',
      options: [
        'static',
        'virtual',
        'override',
        'inline'
      ],
      correctIndex: 1,
      explanation: 'The virtual keyword in the base class declaration instructs the compiler to perform dynamic dispatch via the virtual method table (vtable) at runtime, executing the derived class method.'
    }
  ]
};
