import { Unit, Quiz } from '@/types';

export const cppUnit2: Unit = {
  id: 'cpp-unit-2',
  courseId: 'cpp',
  unitNumber: 2,
  title: 'Basics of C++ and Conditional Statements',
  description: 'Comprehensive study of C++ data types (built-in, user-defined, derived), type modifiers, void pointers, enumerations, operators, scope resolution (::), dynamic memory (new/delete), stream manipulators, expressions (Lvalues/Rvalues), and conditional statements (if, if-else, if-else-if ladder, nested if, switch, nested switch).',
  estimatedHours: 6.0,
  quizId: 'quiz-cpp-2',
  published: true,
  topics: [
    {
      id: 'cpp-u2-t1',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 1,
      title: 'C++ Data Types Hierarchy: Built-in, User-Defined & Derived Types',
      summary: 'Explore the complete classification of C++ data types, byte sizes, ranges, signed/unsigned modifiers, and special void pointer mechanics.',
      content: {
        definition: 'Data types in C++ specify the type and size of data that a variable can store. C++ classifies data types into three main categories: Built-in (fundamental) types, User-defined types, and Derived types. With the exception of void, basic data types can be modified using signed, unsigned, short, and long qualifiers.',
        syntax: 'C++ Data Types Hierarchy:\n• Built-in Types: Integral (int, char), Floating-point (float, double, long double), Void\n• User-Defined Types: Structure (struct), Union (union), Class (class), Enumeration (enum)\n• Derived Types: Array, Pointer, Reference, Function\n\nModifiers: signed, unsigned, short, long (can be applied to int/char; long also applies to double)',
        codeSnippet: `#include <iostream>
#include <iomanip>

int main() {
    // 1. Primitive Integral Types with Modifiers
    char c = 'Z';
    unsigned char uc = 250;
    short int s = -32768;
    unsigned short int us = 65535;
    int i = -2147483648;
    unsigned int ui = 4294967295U;
    long long int lli = 9223372036854775807LL;

    // 2. Floating-point Types
    float f = 3.14159f;
    double d = 1.79769e+308;

    std::cout << "--- C++ DATA TYPES AND SIZES ---" << std::endl;
    std::cout << "char:               " << sizeof(c) << " byte  | Value: " << c << std::endl;
    std::cout << "unsigned char:      " << sizeof(uc) << " byte  | Value: " << (int)uc << std::endl;
    std::cout << "short int:          " << sizeof(s) << " bytes | Value: " << s << std::endl;
    std::cout << "unsigned short int: " << sizeof(us) << " bytes | Value: " << us << std::endl;
    std::cout << "int:                " << sizeof(i) << " bytes | Value: " << i << std::endl;
    std::cout << "unsigned int:       " << sizeof(ui) << " bytes | Value: " << ui << std::endl;
    std::cout << "float:              " << sizeof(f) << " bytes | Value: " << f << std::endl;
    std::cout << "double:             " << sizeof(d) << " bytes | Value: " << d << std::endl;

    // 3. Generic Void Pointer Mechanics
    int number = 100;
    void *genericPtr = &number; // Allowed without cast in C++

    // In C++, assigning void* to typed pointer REQUIRES an explicit cast:
    int *intPtr = (int *)genericPtr;
    std::cout << "Dereferenced via cast: " << *intPtr << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'unsigned char uc = 250;', explanation: 'Unsigned 1-byte character type with value range 0 to 255.' },
          { line: 'unsigned int ui = 4294967295U;', explanation: 'Unsigned 32-bit integer holding non-negative values up to 4,294,967,295.' },
          { line: 'void *genericPtr = &number;', explanation: 'Generic pointer that can point to any data type without type-checking.' },
          { line: 'int *intPtr = (int *)genericPtr;', explanation: 'Crucial C++ rule: unlike ANSI C, C++ strictly requires an explicit type cast when assigning a void* pointer to a typed pointer.' }
        ],
        keyConcepts: [
          'Data Types Classification:\n  • Built-in: char (1 byte: -128 to 127), unsigned char (0 to 255), int (2/4 bytes), unsigned int (0 to 65535 or 4294967295), short int (2 bytes), long int (4/8 bytes), float (4 bytes: 3.4E-38 to 3.4E+38), double (8 bytes: 1.7E-308 to 1.7E+308), long double (10/16 bytes).\n  • User-defined: struct, union, class, enum.\n  • Derived: array, pointer, reference, function.',
          'Type Modifiers: signed (default for numeric types), unsigned (doubles positive range by removing negative numbers), short (reduces storage), long (expands storage capacity).',
          'The void Type: Used to specify that a function returns no value (`void func()`), to indicate an empty parameter list (`int func(void)`), or to declare generic pointers (`void *gp`).',
          'Strict C++ void Pointer Rule: In C, `int *p = voidPtr;` is legal without a cast. In C++, this triggers a compile error; an explicit cast `int *p = (int *)voidPtr;` is strictly mandatory.'
        ],
        commonMistakes: [
          'Attempting to dereference a void pointer directly without casting (e.g. `*genericPtr` is illegal because the compiler does not know the object size).',
          'Assuming `int` is always 4 bytes; on 16-bit embedded systems, `int` is 2 bytes (-32768 to 32767).'
        ],
        quickRevision: [
          'Built-in = int, char, float, double, void.',
          'User-defined = struct, union, class, enum | Derived = arrays, pointers, references, functions.',
          'C++ requires an explicit cast when assigning void* to typed pointers.'
        ]
      }
    },
    {
      id: 'cpp-u2-t2',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 2,
      title: 'User-Defined Types: Structs, Unions, Classes & Advanced Enums',
      summary: 'Master user-defined data structures, classes, and C++ type-safe enumerations (custom values, anonymous enums, and class scoping).',
      content: {
        definition: 'User-defined types allow programmers to construct custom data representations. In C++, struct groups heterogeneous variables under one name; union shares a single memory location across all members; class adds encapsulation, methods, and access control (private/public); and enum attaches symbolic names to integer constants.',
        syntax: 'Enum Syntax:\nenum Shape { circle, square, triangle };\nenum Color { red, blue = 4, green = 8 };\nenum { off = 0, on = 1 }; // Anonymous enum\n\nClass Syntax:\nclass ClassName {\nprivate:\n    // Hidden data members\npublic:\n    // Public member functions\n};',
        codeSnippet: `#include <iostream>

// 1. Enumeration Type in C++
enum Color { RED, GREEN, BLUE = 5, YELLOW };
enum Position { OFF = 0, ON = 1 }; // Anonymous-style constants

// 2. Class definition (C++ OOP backbone)
class StudentRecord {
private:
    int studentId;
    double gpa;

public:
    void setData(int id, double g) {
        studentId = id;
        gpa = g;
    }
    void display() {
        std::cout << "Student ID: " << studentId << " | GPA: " << gpa << std::endl;
    }
};

int main() {
    // In C++, the enum tag 'Color' becomes a standalone type name:
    Color bg = RED; // value 0
    Color border = YELLOW; // value 6 (BLUE + 1)

    std::cout << "Enum bg (RED): " << bg << " | border (YELLOW): " << border << std::endl;

    // C++ Type Safety: Cannot implicitly assign an int to an enum:
    // Color c = 2; // ERROR in C++
    Color c = (Color)2; // Valid in C++ with explicit cast

    // Enumerator can be implicitly promoted to int:
    int code = GREEN; // Valid: GREEN is promoted to int (1)
    std::cout << "Promoted int code: " << code << std::endl;

    // Using Class
    StudentRecord s1;
    s1.setData(101, 3.85);
    s1.display();

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'enum Color { RED, GREEN, BLUE = 5, YELLOW };', explanation: 'Enumeration where RED=0, GREEN=1, BLUE=5, and YELLOW=6.' },
          { line: 'Color bg = RED;', explanation: 'In C++, the tag name Color is a true type name (unlike C which requires "enum Color bg").' },
          { line: 'Color c = (Color)2;', explanation: 'C++ does not allow an int to be implicitly assigned to an enum; explicit casting is required.' },
          { line: 'int code = GREEN;', explanation: 'An enum value is automatically promoted to an integer.' },
          { line: 'class StudentRecord { ... };', explanation: 'Defines an object-oriented class with private data encapsulation and public interface.' }
        ],
        keyConcepts: [
          'struct vs union: A struct allocates separate memory for every member; a union allocates one shared memory block equal to its largest member, saving memory.',
          'class: The foundational pillar of OOP. Unlike struct (where members are public by default), class members are private by default, securing data.',
          'C++ enum Type Name: In C++, enum tags automatically become new type names (`Color c;` instead of `enum Color c;`).',
          'C++ enum Type Safety: In ANSI C, enums are treated loosely as ints. In C++, each enum is an independent type. Converting an int to an enum requires an explicit cast (`c = (Color)7;`).',
          'Default & Custom Enumerator Values: Enumerators begin at 0 by default and increment by 1. Assigning custom values sets subsequent enumerators to continue sequentially.',
          'Anonymous enums: Enums declared without tag names (`enum { off, on };`) define global symbolic constants without creating a type.',
          'Class-Local Scope: In C++, an enum defined inside a class has local class scope, preventing global identifier pollution.'
        ],
        commonMistakes: [
          'Attempting to assign an integer directly to a C++ enum variable without an explicit cast.',
          'Storing data in multiple union members simultaneously (writing to one union member overwrites the others).'
        ],
        quickRevision: [
          'struct = Separate memory | union = Shared memory | class = Private by default + methods.',
          'enum tag names are first-class type names in C++.',
          'Int to enum requires explicit cast; enum to int promotes automatically.'
        ]
      }
    },
    {
      id: 'cpp-u2-t3',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 3,
      title: 'Derived Data Types: Arrays, Pointers, References & Functions',
      summary: 'Understand types derived from primitives that organize, point to, or create memory aliases for runtime data.',
      content: {
        definition: 'Derived data types are types constructed from fundamental primitive types. Rather than storing independent scalar values, they organize data collections, store memory addresses, create variable aliases, or represent callable subroutines with distinct signatures.',
        syntax: '• Array: type arrayName[size];\n• Pointer: type *pointerName = &variable;\n• Reference: type &referenceName = variable;\n• Function: returnType functionName(parameterTypes);',
        codeSnippet: `#include <iostream>

// Function type definition with signature int(int, int)
int calculateSum(int a, int b) {
    return a + b;
}

int main() {
    // 1. Array: Contiguous memory storage of identical types
    int scores[3] = {88, 92, 95};

    // 2. Pointer: Variable storing the memory address of another variable
    int value = 42;
    int *ptr = &value;

    // 3. Reference: An immutable alias sharing the exact same memory location
    int &ref = value;

    std::cout << "Array element [0]: " << scores[0] << std::endl;
    std::cout << "Original Value:    " << value << std::endl;
    std::cout << "Pointer Address:   " << ptr << " | Dereferenced: " << *ptr << std::endl;
    std::cout << "Reference Alias:   " << ref << std::endl;

    // Modifying reference alters the original value
    ref = 99;
    std::cout << "After modifying ref, value is: " << value << std::endl;

    // 4. Function call
    int total = calculateSum(value, scores[0]);
    std::cout << "Function Result: " << total << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int scores[3] = {88, 92, 95};', explanation: 'Derived array type storing 3 integers contiguously in memory.' },
          { line: 'int *ptr = &value;', explanation: 'Pointer variable storing the address-of (&) value.' },
          { line: 'int &ref = value;', explanation: 'C++ reference creating an alias directly bound to value.' },
          { line: 'ref = 99;', explanation: 'Modifying ref directly mutates value since they share the same memory cell.' }
        ],
        keyConcepts: [
          'Arrays: Indexed collections storing elements of identical types in contiguous sequential memory slots.',
          'Pointers: Variables that store the hexadecimal memory address of another variable. Pointers can be null, re-assigned, and support pointer arithmetic.',
          'References: Unique to C++; an alias bound permanently to an existing object upon declaration. References cannot be null and cannot be re-seated.',
          'Functions as Types: Functions have signatures determined by their parameter types and return type, allowing function pointers and callbacks.'
        ],
        commonMistakes: [
          'Declaring an uninitialized reference (e.g. `int &ref;` is illegal in C++).',
          'Confusing pointer dereference (`*p`) with multiplication (`a * b`) or reference declaration (`&r`) with address-of (`&x`).'
        ],
        quickRevision: [
          'Array = Contiguous collection.',
          'Pointer = Address variable (can be null, can point elsewhere).',
          'Reference = Permanent alias (cannot be null, cannot re-bind).',
          'Function = Type defined by parameter types and return type.'
        ]
      }
    },
    {
      id: 'cpp-u2-t4',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 4,
      title: 'C++ Operators: Arithmetic, Relational, Logical, Bitwise & Ternary',
      summary: 'Master the complete operator toolkit in C++, evaluation mechanics, prefix vs postfix traps, bitwise manipulation, and the ternary shorthand.',
      content: {
        definition: 'Operators are symbolic tokens that direct the compiler to perform specific mathematical, relational, logical, or bitwise operations on operands. C++ features a comprehensive set of operators categorized into Arithmetic, Relational, Logical, Assignment, Increment/Decrement, Bitwise, Ternary, and Miscellaneous.',
        syntax: 'Operator Categories:\n• Arithmetic: +, -, *, /, % (modulo returns remainder; 7/2 = 3 integer division)\n• Relational: ==, !=, >, <, >=, <= (evaluates to true or false)\n• Logical: && (AND), || (OR), ! (NOT)\n• Compound Assignment: +=, -=, *=, /=, %=\n• Increment/Decrement: ++x (Prefix: increment before use), x++ (Postfix: increment after use)\n• Bitwise: & (AND), | (OR), ^ (XOR), ~ (NOT), << (Left Shift: *2), >> (Right Shift: /2)\n• Ternary (?:): condition ? value_if_true : value_if_false;\n• Miscellaneous: sizeof, & (address), * (pointer), << (stream insertion), >> (stream extraction)',
        codeSnippet: `#include <iostream>
#include <string>

int main() {
    // 1. Arithmetic & Division Rules
    int a = 10, b = 3;
    int intDiv = a / b;       // 3 (integer division truncates remainder)
    double realDiv = (double)a / b; // 3.33333 (promoted floating-point division)
    int remainder = a % b;    // 1 (modulo)

    std::cout << "Integer Division (10/3): " << intDiv << " | Modulo: " << remainder << std::endl;
    std::cout << "Real Division: " << realDiv << std::endl;

    // 2. Prefix vs Postfix Trap
    int x = 5;
    int pre = ++x;  // Increments x to 6, then assigns 6 to pre
    std::cout << "Prefix: x=" << x << ", pre=" << pre << std::endl;

    int y = 5;
    int post = y++; // Assigns 5 to post, then increments y to 6
    std::cout << "Postfix: y=" << y << ", post=" << post << std::endl;

    // 3. Bitwise Operators
    unsigned char bits = 0b00000101; // 5 in binary
    unsigned char shiftedLeft = bits << 2; // Shifts left by 2 (5 * 4 = 20)
    std::cout << "Bitwise Left Shift (5 << 2): " << (int)shiftedLeft << std::endl;

    // 4. Ternary Operator (?:)
    int score = 85;
    std::string result = (score >= 50) ? "Passed" : "Failed";
    std::cout << "Ternary Result for score " << score << ": " << result << std::endl;

    // 5. sizeof Operator
    std::cout << "Memory size of double: " << sizeof(double) << " bytes" << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int intDiv = a / b;', explanation: 'When both operands are integers, C++ drops the fractional part (10 / 3 = 3).' },
          { line: 'int pre = ++x;', explanation: 'Prefix operator: variable x is incremented BEFORE its value is consumed in the expression.' },
          { line: 'int post = y++;', explanation: 'Postfix operator: current value of y is consumed first, and y is incremented AFTER.' },
          { line: 'unsigned char shiftedLeft = bits << 2;', explanation: 'Bitwise left shift shifts bits left by 2 positions, multiplying the number by 2^2 (4).' },
          { line: 'std::string result = (score >= 50) ? "Passed" : "Failed";', explanation: 'Ternary operator: concise 3-operand replacement for if-else.' }
        ],
        keyConcepts: [
          'Integer Division Rule: Dividing two integers produces an integer (e.g. 7 / 2 = 3). At least one operand must be a float or double to obtain 3.5.',
          'Modulo Operator (%): Operates strictly on integral types (integers and characters); using % with floating-point values causes a compile-time error.',
          'Prefix vs Postfix:\n  • ++x (Prefix): Increments x first, then evaluates expression.\n  • x++ (Postfix): Evaluates expression with current x, then increments x.',
          'Logical Short-Circuiting: In `A && B`, if A is false, B is not evaluated. In `A || B`, if A is true, B is not evaluated.',
          'Bitwise Operators: Manipulate raw binary bits directly; essential for hardware drivers, embedded systems, and cryptography.',
          'Ternary Operator (?:): The only operator in C++ taking three operands: `condition ? expr1 : expr2`.'
        ],
        commonMistakes: [
          'Confusing the assignment operator (=) with the equality comparison operator (==).',
          'Attempting to use modulo (%) on float or double operands.'
        ],
        quickRevision: [
          '7 / 2 = 3 (Integer division drops decimals).',
          '++x increments before use; x++ increments after use.',
          'Logical: && (AND), || (OR), ! (NOT).',
          'Ternary: condition ? true_val : false_val.'
        ]
      }
    },
    {
      id: 'cpp-u2-t5',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 5,
      title: 'C++ Specific Operators: Scope Resolution, Memory Management & Manipulators',
      summary: 'Master C++ exclusive operators: Scope Resolution (::) for unshadowing global variables, dynamic memory (new and delete), and stream manipulators (endl, setw).',
      content: {
        definition: 'In addition to standard C operators, C++ introduces powerful dedicated operators: the Scope Resolution Operator (::) to access hidden global identifiers; dynamic memory operators (new and delete) for type-safe heap management; and stream manipulators (endl, setw) for formatted terminal output.',
        syntax: '• Scope Resolution Operator: ::variable_name\n• Dynamic Object Allocation: type *p = new type(initial_value);\n• Dynamic Object Deletion: delete p;\n• Dynamic Array Allocation: type *arr = new type[size];\n• Dynamic Array Deletion: delete[] arr;\n• Stream Manipulators: std::cout << std::endl; std::cout << std::setw(width);',
        codeSnippet: `#include <iostream>
#include <iomanip> // Required for std::setw

// Global variable
int m = 10;

int main() {
    int m = 20; // Local variable shadows global m

    {
        int k = m;
        int m = 30; // Innermost local variable shadows both

        std::cout << "--- SCOPE RESOLUTION (::) DEMO ---" << std::endl;
        std::cout << "Inner local m:  " << m << std::endl;
        std::cout << "Outer local k:  " << k << std::endl;
        std::cout << "Global ::m:     " << ::m << std::endl; // Uncovers global m (10)
    }

    std::cout << "Outer local m:  " << m << std::endl;
    std::cout << "Global ::m:     " << ::m << std::endl;

    // --- DYNAMIC MEMORY MANAGEMENT (new and delete) ---
    // 1. Allocate single integer with initial value 25
    int *pInt = new int(25);
    std::cout << "\nDynamic int value: " << *pInt << std::endl;
    delete pInt; // Free single memory block

    // 2. Allocate dynamic array of 5 integers
    int *arr = new int[5];
    for (int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 10;
    }

    // --- STREAM MANIPULATORS (endl and setw) ---
    std::cout << "\n--- MANIPULATORS (setw & right-aligned columns) ---" << std::endl;
    std::cout << std::setw(10) << "Index" << std::setw(10) << "Value" << std::endl;
    for (int i = 0; i < 5; i++) {
        std::cout << std::setw(10) << i << std::setw(10) << arr[i] << std::endl;
    }

    delete[] arr; // Free dynamic array memory block

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int m = 10; ... int m = 20; ... int m = 30;', explanation: 'Demonstrates nested scope variable shadowing where inner declarations hide outer declarations.' },
          { line: 'std::cout << ::m;', explanation: 'Scope Resolution Operator (::) bypasses local scopes to directly access the global variable m (10).' },
          { line: 'int *pInt = new int(25);', explanation: 'new operator allocates heap memory for one integer, initializes it to 25, and returns its address.' },
          { line: 'delete pInt;', explanation: 'delete operator frees dynamically allocated heap memory to prevent memory leaks.' },
          { line: 'int *arr = new int[5];', explanation: 'new[] allocates contiguous heap space for an array of 5 elements.' },
          { line: 'delete[] arr;', explanation: 'delete[] releases heap memory allocated for dynamic arrays.' },
          { line: 'std::cout << std::setw(10) << ...', explanation: 'setw(10) sets field width to 10 characters, right-aligning output data.' }
        ],
        keyConcepts: [
          'Scope Resolution Operator (::):\n  • In C, a global variable hidden by a local variable cannot be accessed inside that block.\n  • In C++, `::var` uncovers and accesses the shadowed global variable.\n  • Also used to define class member functions outside class bodies (`ClassName::method`).',
          'Memory Management: new vs malloc():\n  • `new` is an operator that calculates size automatically, returns a typed pointer, and calls constructors.\n  • `malloc()` is a C library function returning `void*` and requires manual byte size calculations without calling constructors.',
          'Memory Release: delete vs free():\n  • `delete p;` deallocates a single object and calls its destructor.\n  • `delete[] p;` deallocates a dynamically allocated array and calls destructors for every element.',
          'Manipulators:\n  • `endl`: Inserts a line feed character (\'\\n\') and flushes the stream output buffer.\n  • `setw(width)`: From `<iomanip>`, sets the field display width for the next printed item (right-justified).'
        ],
        commonMistakes: [
          'Using `delete` instead of `delete[]` on memory allocated with `new[]` (leads to undefined behavior and memory leaks).',
          'Forgetting `#include <iomanip>` when using `setw`.'
        ],
        quickRevision: [
          ':: uncovers hidden global variables.',
          'new allocates and initializes heap memory; delete releases it.',
          'Always match new with delete, and new[] with delete[].',
          'setw(w) sets field column width; endl inserts newline and flushes.'
        ]
      }
    },
    {
      id: 'cpp-u2-t6',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 6,
      title: 'Expressions, Precedence, Lvalues & Rvalues',
      summary: 'Understand the 6 expression categories in C++, operator precedence rules, and the fundamental distinction between Lvalues and Rvalues.',
      content: {
        definition: 'An expression is a combination of operators, constants, and variables arranged according to language syntax rules. Every expression evaluates to produce a single value and has a distinct data type. C++ evaluates expressions according to operator precedence and classifies expressions into Lvalues (identifiable memory locations) and Rvalues (temporary values).',
        syntax: 'The 6 Expression Types:\n1. Constant Expressions: Only literal values; evaluated at compile-time (15 + 5)\n2. Integral Expressions: Produce integer results after conversions (x + y * 2, \'A\' + 1)\n3. Float Expressions: Produce decimal floating-point results (7.5 * 2, float(total)/3)\n4. Relational Expressions: Compare values returning boolean (score >= 50, x != y)\n5. Logical Expressions: Combine conditions returning boolean ((a > b) && (c < d))\n6. Bitwise Expressions: Manipulate raw bits (x << 2, flags & mask)\n\nLvalue vs Rvalue:\n• Lvalue (Left value): An expression identifying a persistent memory location (can appear on left of =)\n• Rvalue (Right value): A temporary data value itself that has no permanent memory location until assigned',
        codeSnippet: `#include <iostream>

int main() {
    // 1. Constant Expression (Evaluated at compile-time)
    const int maxCapacity = 100 + 50; // Constant expression: 150

    // 2. Integral Expression
    int x = 10, y = 4;
    int intResult = x + (y * 2); // 18
    int asciiResult = 'A' + 1;   // 66 (ASCII for 'B')

    // 3. Float Expression
    double floatResult = 7.5 * 2.0; // 15.0

    // 4. Relational & Logical Expressions
    int score = 85;
    bool hasPassed = (score >= 50); // Relational: true
    bool isHonors = (score >= 80) && (score <= 100); // Logical: true

    // 5. Bitwise Expression
    int mask = 0x0F;
    int bitResult = x & mask; // Bitwise AND

    // 6. Lvalue vs Rvalue Demonstration
    int a = 10;
    int b = 20;
    a = b + 5; // 'a' is an Lvalue (has memory address)
               // 'b + 5' is an Rvalue (temporary value 25 without permanent location)

    // 10 = a; // COMPILE ERROR: 10 is an rvalue, cannot be on the left side of assignment!

    std::cout << "Compile-time Constant: " << maxCapacity << std::endl;
    std::cout << "Integral Result: " << intResult << " | ASCII: " << asciiResult << std::endl;
    std::cout << "Float Result: " << floatResult << std::endl;
    std::cout << "Booleans: Passed=" << hasPassed << ", Honors=" << isHonors << std::endl;
    std::cout << "Lvalue a: " << a << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'const int maxCapacity = 100 + 50;', explanation: 'Constant expression: calculated by the compiler before the program even runs.' },
          { line: 'int asciiResult = \'A\' + 1;', explanation: 'Integral expression: char \'A\' (ASCII 65) promoted to int, resulting in 66.' },
          { line: 'a = b + 5;', explanation: 'a is an Lvalue (can be assigned to); b + 5 evaluates to temporary Rvalue (25).' },
          { line: '10 = a;', explanation: 'Illegal because literal 10 is an Rvalue without an addressable memory location.' }
        ],
        keyConcepts: [
          'Constant Expressions: Evaluated entirely at compile-time; commonly used for fixed array bounds and template parameters.',
          'Type Promotion in Expressions: If an expression mixes integers and floats, the compiler promotes the entire calculation to the higher precision floating type.',
          'Operator Precedence: Determines the evaluation order in complex expressions (e.g. `*` and `/` precede `+` and `-`). Parentheses `()` override precedence.',
          'Lvalue (Locator Value): Refers to an object that occupies an identifiable location in memory (an address). Lvalues can appear on the left side of an assignment operator.',
          'Rvalue (Read Value): Refers to a temporary value, literal, or expression result that does not persist beyond the expression unless stored in an Lvalue.'
        ],
        commonMistakes: [
          'Attempting to assign a value to an Rvalue (e.g. `(x + 5) = 20;` or `10 = x;` is a fatal compiler error).',
          'Assuming integer division inside an expression promotes to float without an explicit cast.'
        ],
        quickRevision: [
          'Constant expressions evaluate at compile time.',
          'Lvalue = Has a memory address (can be on left of =).',
          'Rvalue = Temporary value/literal (appears on right of =).',
          'Use parentheses () to make operator precedence explicit.'
        ]
      }
    },
    {
      id: 'cpp-u2-t7',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 7,
      title: 'Conditional Statements: if, if-else & if-else-if Ladder',
      summary: 'Explore decision-making constructs, conditional control flow diagrams, two-way branching, and multi-way if-else-if ladders.',
      content: {
        definition: 'Conditional statements allow a program to test conditions and branch execution along alternative code paths depending on whether boolean expressions evaluate to true or false. C++ provides three fundamental linear branching structures: the simple if statement, the two-way if-else statement, and the multi-way if-else-if ladder.',
        syntax: '1. Simple if:\nif (boolean_expression) {\n    // executes if true\n}\n\n2. if-else:\nif (boolean_expression) {\n    // executes if true\n} else {\n    // executes if false\n}\n\n3. if-else-if Ladder:\nif (condition_1) {\n    // executes if condition 1 is true\n} else if (condition_2) {\n    // executes if condition 2 is true\n} else {\n    // executes if none of the above are true\n}',
        codeSnippet: `#include <iostream>

int main() {
    // 1. Simple if statement
    int score = 85;
    if (score >= 50) {
        std::cout << "Student has passed the threshold." << std::endl;
    }

    // 2. if-else statement
    int attendancePercent = 72;
    if (attendancePercent >= 75) {
        std::cout << "Exam Eligibility: Approved" << std::endl;
    } else {
        std::cout << "Exam Eligibility: Denied (Attendance < 75%)" << std::endl;
    }

    // 3. if-else-if Ladder (Multi-way decision grading)
    int marks = 88;
    char grade;

    if (marks >= 90) {
        grade = 'A';
    } else if (marks >= 80) {
        grade = 'B';
    } else if (marks >= 70) {
        grade = 'C';
    } else if (marks >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    std::cout << "For marks " << marks << ", awarded Grade is: " << grade << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'if (score >= 50)', explanation: 'Evaluates boolean expression; if true, executes the enclosed block.' },
          { line: 'if (attendancePercent >= 75) ... else ...', explanation: 'Two-way decision: executes if-block if true, or else-block if false.' },
          { line: 'else if (marks >= 80)', explanation: 'Evaluated only if the preceding if condition (marks >= 90) was false.' },
          { line: 'else { grade = \'F\'; }', explanation: 'Default fallback branch executed when none of the preceding conditions evaluate to true.' }
        ],
        keyConcepts: [
          'Decision-Making Logic: Directs execution flow based on condition testing (evaluating to true non-zero or false zero).',
          'Single Statement vs Blocks: An if or else body can contain a single statement without braces, but using curly braces `{}` is strongly recommended to prevent logic bugs.',
          'if-else-if Ladder Rules:\n  • An if can have zero or one `else`, and it must always appear after all `else if` statements.\n  • An if can have zero to many `else if` conditions.\n  • Once any condition in the ladder evaluates to true, its block executes and the rest of the ladder is skipped (short-circuit completion).'
        ],
        commonMistakes: [
          'Placing a semicolon immediately after the if condition (e.g. `if (x > 10); { ... }`), which terminates the statement and executes the block unconditionally.',
          'Using `=` (assignment) instead of `==` (equality comparison) in condition expressions (e.g. `if (a = 20)` always evaluates to true).'
        ],
        quickRevision: [
          'Simple if executes code only when condition is true.',
          'if-else provides a two-way branch (true path vs false path).',
          'if-else-if ladder checks conditions sequentially until one succeeds.',
          'Never put a semicolon directly after the condition parentheses.'
        ]
      }
    },
    {
      id: 'cpp-u2-t8',
      unitId: 'cpp-unit-2',
      courseId: 'cpp',
      order: 8,
      title: 'Switch Statements, Nested if & Nested switch Statements',
      summary: 'Master multi-way equality branching using switch, case constant rules, break fall-through behavior, nested if logic, and nested switches (up to 256 levels).',
      content: {
        definition: 'A switch statement tests an integral or enumerated variable for equality against a list of constant case values. C++ also supports nesting decision statements: placing if statements inside other if statements, and embedding inner switch statements inside outer switch statements up to at least 256 levels of nesting.',
        syntax: 'Switch Statement Syntax:\nswitch (integral_expression) {\n    case constant_1:\n        statement(s);\n        break; // optional exit\n    case constant_2:\n        statement(s);\n        break;\n    default: // optional\n        statement(s);\n}\n\nNested if Syntax:\nif (condition_1) {\n    if (condition_2) {\n        // executes when both condition 1 and 2 are true\n    }\n}',
        codeSnippet: `#include <iostream>

int main() {
    // 1. Standard switch statement with break and default
    char grade = 'B';
    std::cout << "--- GRADE EVALUATION ---" << std::endl;

    switch (grade) {
        case 'A':
            std::cout << "Excellent achievement!" << std::endl;
            break;
        case 'B':
        case 'C':
            // Fall-through: B and C share the same message
            std::cout << "Well done! High performance standard." << std::endl;
            break;
        case 'D':
            std::cout << "You passed the course." << std::endl;
            break;
        case 'F':
            std::cout << "Better try again." << std::endl;
            break;
        default:
            std::cout << "Invalid grade supplied." << std::endl;
            break;
    }

    // 2. Nested if statement
    int a = 100, b = 200;
    std::cout << "\n--- NESTED IF DEMONSTRATION ---" << std::endl;
    if (a == 100) {
        if (b == 200) {
            std::cout << "Both conditions met: a is 100 and b is 200." << std::endl;
        }
    }

    // 3. Nested switch statement (allowed up to 256 levels)
    int category = 1;
    int subItem = 2;
    std::cout << "\n--- NESTED SWITCH DEMONSTRATION ---" << std::endl;

    switch (category) {
        case 1:
            std::cout << "Outer Switch: Category 1 selected." << std::endl;
            switch (subItem) {
                case 1:
                    std::cout << "  Inner Switch: SubItem 1" << std::endl;
                    break;
                case 2:
                    std::cout << "  Inner Switch: SubItem 2 verified." << std::endl;
                    break;
            }
            break;
        case 2:
            std::cout << "Outer Switch: Category 2 selected." << std::endl;
            break;
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'switch (grade) { ... }', explanation: 'Evaluates the char variable grade against each case literal.' },
          { line: 'case \'B\': case \'C\':', explanation: 'Intentional fall-through: groups multiple case constants together so both execute the same block.' },
          { line: 'break;', explanation: 'Terminates the switch block and jumps to the next line following the closing brace.' },
          { line: 'default:', explanation: 'Optional fallback branch executed when none of the case constants match.' },
          { line: 'if (a == 100) { if (b == 200) { ... } }', explanation: 'Nested if statement: the inner condition is only tested if the outer condition succeeds.' },
          { line: 'switch (category) { ... switch (subItem) { ... } }', explanation: 'Nested switch statement: inner and outer switches can share case constant numbers without conflict.' }
        ],
        keyConcepts: [
          'Switch Rules:\n  1. The expression must evaluate to an integral or enumerated type (int, char, enum). Floats, doubles, and strings are NOT permitted.\n  2. Each case value must be a compile-time constant or literal.\n  3. Duplicate case constants are illegal and cause compile errors.\n  4. Execution starts at the matching case and continues sequentially until a `break` is encountered.\n  5. Omitting `break` causes control to fall through into subsequent cases regardless of their condition.\n  6. The `default` case is optional and executes if no case matches.',
          'Nested if Statements: An if or if-else statement placed inside another if or else block. Useful for hierarchical decision dependencies.',
          'Nested switch Statements: It is completely legal to place an inner switch inside an outer switch case. Even if both switches use the same case values (e.g. `case 1:`), no conflict arises because scopes are distinct.',
          'Nesting Limits: C++ specifies that compilers must allow at least **256 levels of nesting** for switch statements.'
        ],
        commonMistakes: [
          'Attempting to use a float, double, or string in a switch expression (e.g. `switch (3.14)` is illegal).',
          'Accidentally omitting `break`, causing unintentional fall-through and executing subsequent case statements.'
        ],
        quickRevision: [
          'switch requires integral or enum types (no floats/strings).',
          'case values must be compile-time constants.',
          'break exits the switch; without break, execution falls through.',
          'default executes when no cases match.',
          'C++ supports up to at least 256 levels of nested switch statements.'
        ]
      }
    }
  ]
};

export const cppUnit2Quiz: Quiz = {
  id: 'quiz-cpp-2',
  unitId: 'cpp-unit-2',
  courseId: 'cpp',
  unitTitle: 'Unit 2: Basics of C++ and Conditional Statements',
  title: 'Unit 2 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-cpp2-1',
      question: 'Which of the following data types belongs to the "User-Defined" category in C++?',
      options: [
        'int',
        'double',
        'Structure (struct) and Class',
        'Array'
      ],
      correctIndex: 2,
      explanation: 'In C++, struct, union, class, and enum are classified as User-Defined data types. Fundamental types (int, double) are built-in, while arrays are derived.'
    },
    {
      id: 'q-cpp2-2',
      question: 'In C++, what happens when you assign a void pointer (void *gp) to a typed integer pointer (int *p) without an explicit cast?',
      options: [
        'It compiles normally just like in ANSI C',
        'The compiler issues a compile-time error because C++ strictly requires an explicit type cast (e.g. p = (int *)gp;)',
        'It automatically allocates 4 bytes on the heap',
        'It causes a runtime segmentation fault'
      ],
      correctIndex: 1,
      explanation: 'Unlike ANSI C which permits assigning void* to any typed pointer implicitly, C++ enforces type safety and strictly requires an explicit cast.'
    },
    {
      id: 'q-cpp2-3',
      question: 'Which operator is used in C++ to uncover and access a global variable that has been shadowed by a local variable of the same name?',
      options: [
        '-> (Arrow operator)',
        ':: (Scope resolution operator)',
        '.* (Pointer to member operator)',
        '& (Address-of operator)'
      ],
      correctIndex: 1,
      explanation: 'The scope resolution operator (::) can be prefixed to an identifier (e.g. ::m) to access the global variable even when shadowed by an inner local variable.'
    },
    {
      id: 'q-cpp2-4',
      question: 'Which C++ operators are used for dynamic memory allocation and deallocation on the heap, replacing C\'s malloc() and free()?',
      options: [
        'alloc and dealloc',
        'new and delete',
        'create and destroy',
        'push and pop'
      ],
      correctIndex: 1,
      explanation: 'C++ provides the unary operators new and delete (and new[] / delete[]) for type-safe dynamic memory management.'
    },
    {
      id: 'q-cpp2-5',
      question: 'Given the code snippet:\nint x = 5;\nint a = ++x;\nint b = x++;\nWhat are the final values of a, b, and x?',
      options: [
        'a = 6, b = 6, x = 7',
        'a = 5, b = 6, x = 7',
        'a = 6, b = 7, x = 7',
        'a = 5, b = 5, x = 6'
      ],
      correctIndex: 0,
      explanation: '++x (prefix) increments x to 6 and returns 6 (so a = 6). Then x++ (postfix) returns current value 6 (so b = 6) and increments x to 7.'
    },
    {
      id: 'q-cpp2-6',
      question: 'In the expression "x = 10 + 5;", which component is an Lvalue and why?',
      options: [
        '10 + 5 is an Lvalue because it is on the right',
        'x is an Lvalue because it refers to an identifiable memory location that can be assigned to',
        'Both 10 and 5 are Lvalues',
        'There are no Lvalues in this expression'
      ],
      correctIndex: 1,
      explanation: 'An Lvalue (locator value) represents an identifiable memory location that persists beyond an expression, allowing it to appear on the left side of an assignment.'
    },
    {
      id: 'q-cpp2-7',
      question: 'Which data types are strictly NOT permitted as the controlling expression in a C++ switch statement?',
      options: [
        'int and char',
        'enum and short',
        'float, double, and string',
        'unsigned int and long'
      ],
      correctIndex: 2,
      explanation: 'A switch statement in C++ requires an integral or enumerated type. Floating-point numbers (float, double) and strings cannot be used in a switch.'
    },
    {
      id: 'q-cpp2-8',
      question: 'What is the minimum level of switch statement nesting that every standard C++ compiler must support?',
      options: [
        '8 levels',
        '16 levels',
        '64 levels',
        '256 levels'
      ],
      correctIndex: 3,
      explanation: 'The ISO C++ standard specifies that compliant compilers must allow at least 256 levels of nested switch statements.'
    }
  ]
};
