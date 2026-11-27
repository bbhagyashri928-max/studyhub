import { Unit, Quiz } from '@/types';

export const cUnit1: Unit = {
  id: 'c-unit-1',
  courseId: 'c',
  unitNumber: 1,
  title: 'Introduction to Program Planning & C Programming',
  description: 'Master the fundamentals of problem solving with algorithms and flowcharts, explore C history, tokens, 32 keywords, identifiers, constants, variables, data types, storage classes, and variable modifiers.',
  estimatedHours: 6.0,
  quizId: 'quiz-c-1',
  published: true,
  topics: [
    {
      id: 'c-u1-t1',
      unitId: 'c-unit-1',
      courseId: 'c',
      order: 1,
      title: 'Program Design Tools: Algorithms & Flowcharts',
      summary: 'Learn the foundational art of programming by formulating unambiguous step-by-step algorithms and standard ANSI flowchart diagrams before writing code.',
      content: {
        definition: 'An Algorithm is a finite, step-by-step sequence of well-defined, unambiguous instructions designed to solve a specific computational problem. A Flowchart is a standardized graphical representation of an algorithm using standard geometric symbols connected by directional flowlines.',
        syntax: `/* Standard Flowchart Geometric Symbols (ANSI Specification):
   1. Oval / Rounded Rectangle : Terminal (Start / Stop / Begin / End)
   2. Parallelogram            : Input / Output (Read / Print / Display)
   3. Rectangle                : Process / Computation (e.g., sum = a + b)
   4. Diamond                  : Decision / Branching (e.g., Is num > 0? Yes / No)
   5. Small Circle             : Connector (Connects flow lines on the same page)
   6. Directional Arrows (→↓←↑): Flow Lines (Indicates program execution sequence) */`,
        codeSnippet: `/* Comprehensive Demonstration of the 4 Essential Unit-1 Algorithms in C */
#include <stdio.h>

// 1. Algorithm: Add Two Numbers
void calculateSum(void) {
    int num1 = 25, num2 = 15, sum;
    sum = num1 + num2;
    printf("[Algorithm 1] Sum of %d and %d = %d\\n", num1, num2, sum);
}

// 2. Algorithm: Area of Circle (Area = 3.14 * R * R)
void calculateCircleArea(void) {
    float radius = 5.0f, area;
    area = 3.14159f * radius * radius;
    printf("[Algorithm 2] Area of Circle with radius %.2f = %.2f\\n", radius, area);
}

// 3. Algorithm: Swap Two Numbers Using a Temporary Variable
void swapNumbers(void) {
    int a = 10, b = 20, temp;
    printf("[Algorithm 3] Before Swap: a = %d, b = %d\\n", a, b);
    temp = a; // Step 1: Backup a into temp
    a = b;    // Step 2: Copy b into a
    b = temp; // Step 3: Copy temp into b
    printf("[Algorithm 3] After Swap:  a = %d, b = %d\\n", a, b);
}

// 4. Algorithm: Find the Largest of Three Numbers
void findLargest(void) {
    int n1 = 45, n2 = 82, n3 = 33, largest;
    if (n1 >= n2 && n1 >= n3) {
        largest = n1;
    } else if (n2 >= n1 && n2 >= n3) {
        largest = n2;
    } else {
        largest = n3;
    }
    printf("[Algorithm 4] Largest among %d, %d, %d = %d\\n", n1, n2, n3, largest);
}

int main(void) {
    printf("================ UNIT 1: PROGRAM DESIGN ALGORITHMS ================\\n");
    calculateSum();
    calculateCircleArea();
    swapNumbers();
    findLargest();
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'calculateSum()', explanation: 'Step-by-step implementation of adding two inputs and producing one distinct sum output.' },
          { line: 'area = 3.14159f * radius * radius;', explanation: 'Implements the Process step calculating geometric area from radius input.' },
          { line: 'temp = a; a = b; b = temp;', explanation: 'Classic three-step swapping algorithm preserving data integrity using an auxiliary variable.' },
          { line: 'if (n1 >= n2 && n1 >= n3) ...', explanation: 'Implements the Diamond Decision flowchart construct branching based on logical comparisons.' }
        ],
        keyConcepts: [
          '5 Golden Characteristics of an Algorithm: Finiteness (must terminate after finite steps), Definiteness (each step unambiguous), Input (zero or more inputs), Output (at least one output), Effectiveness (all operations feasible and basic).',
          'Flowchart Shapes: Oval (Start/Stop), Parallelogram (Input/Output), Rectangle (Process/Assignment), Diamond (Decision/Condition), Circle (Connector), Arrow (Flowline).',
          'Algorithm 1 (Sum): Read A, B -> Compute Sum = A + B -> Print Sum.',
          'Algorithm 2 (Circle Area): Read Radius R -> Compute Area = 3.14 * R * R -> Print Area.',
          'Algorithm 3 (Swap with Temp): Temp = A -> A = B -> B = Temp.',
          'Algorithm 4 (Largest of 3): Compare N1 with N2 and N3; if false, compare N2 with N3; else N3 is largest.'
        ],
        commonMistakes: [
          'Confusing Parallelogram (Input/Output) with Rectangle (Computation/Assignment)',
          'Omitting directional arrows on flowchart lines leading to an unreadable logic sequence',
          'Writing infinite algorithms without explicit termination or loop exit condition',
          'Overwriting variable A before preserving its value in a temporary storage during swapping'
        ],
        quickRevision: [
          'Algorithm = Finite, unambiguous step-by-step problem-solving instructions.',
          'Flowchart = Standard visual diagram using ANSI geometric symbols.',
          'Oval = Terminal | Parallelogram = I/O | Rectangle = Process | Diamond = Decision.'
        ]
      }
    },
    {
      id: 'c-u1-t2',
      unitId: 'c-unit-1',
      courseId: 'c',
      order: 2,
      title: 'Overview of C: History, Architecture & Program Lifecycle',
      summary: 'Explore Dennis Ritchie’s genesis of C at Bell Labs in 1972, its evolutionary ancestors, 6 key industry applications, and the complete compilation-to-execution pipeline.',
      content: {
        definition: 'C is a general-purpose, structured procedural programming language developed in 1972 by Dennis M. Ritchie at Bell Telephone Laboratories (USA) to rewrite the UNIX operating system. It combines high-level structured control flow with low-level direct hardware memory manipulation.',
        syntax: `/* C Evolutionary Timeline:
   - 1960: ALGOL 60 (International Group) -> Introduced structured programming
   - 1963: CPL (Combined Programming Language, Cambridge/Univ of London)
   - 1967: BCPL (Basic CPL, Martin Richards) -> Simplified for compiler writing
   - 1970: B Language (Ken Thompson at Bell Labs) -> Used for early UNIX
   - 1972: C Language (Dennis Ritchie at Bell Labs) -> Restructured UNIX & systems
   - 1989: ANSI C (C89) / 1990: ISO C (Standardized international baseline) */

/* Program Execution Pipeline:
   Source Code (.c) 
      ↓ [Preprocessor: expands #include, #define]
   Expanded Code (.i)
      ↓ [Compiler: checks syntax, generates assembly]
   Assembly / Object Code (.obj / .o)
      ↓ [Linker: links library functions e.g. printf from libc]
   Executable Binary (.exe / a.out)
      ↓ [Loader: places binary in RAM]
   CPU Execution */`,
        codeSnippet: `/* Anatomy of a Standard C Program with Complete Header & Return Semantics */
#include <stdio.h>  // Preprocessor directive for Standard Input/Output library

// Execution entry point required by every executable C program
int main(void) {
    // Single-line comment: explaining program output
    /* Multi-line comment:
       Demonstrating the fundamental building blocks of C */
       
    printf("============================================\\n");
    printf("Welcome to CODEVERSE C Programming Academy!\\n");
    printf("Developed by: Dennis Ritchie (1972, Bell Labs)\\n");
    printf("Applications: Operating Systems, Compilers, DBs\\n");
    printf("============================================\\n");
    
    // Return status code 0 indicating successful termination to the host OS
    return 0;
}`,
        lineByLineExplanation: [
          { line: '#include <stdio.h>', explanation: 'Preprocessor directive instructing compiler to include declarations for standard I/O functions like printf().' },
          { line: 'int main(void)', explanation: 'Main function entry point where operating system transfers CPU execution control.' },
          { line: 'printf(...)', explanation: 'Standard library function responsible for formatting and sending character streams to stdout.' },
          { line: 'return 0;', explanation: 'Returns exit code 0 to operating system, indicating that the program executed without runtime error.' }
        ],
        keyConcepts: [
          'History: Dennis Ritchie developed C at Bell Labs in 1972 as an evolution of Ken Thompson’s B language.',
          'UNIX Milestone: UNIX was rewritten in C, making operating systems portable across hardware architectures.',
          '6 Core Applications: 1. Operating Systems (Linux, Windows kernel), 2. Embedded Systems & Microcontrollers, 3. Game Engines & Graphics, 4. Compilers & Interpreters, 5. Database Engines (MySQL, PostgreSQL), 6. Network Drivers & Protocols.',
          'Execution Lifecycle: Problem Definition -> Algorithm -> Coding -> Debugging -> Testing -> Documentation.',
          'Compilation Pipeline: Preprocessor -> Compiler -> Linker -> Loader -> CPU Execution (Turbo C shortcuts: Alt+F9 compile, Ctrl+F9 run).'
        ],
        commonMistakes: [
          'Missing #include <stdio.h> leading to implicit declaration warnings for printf() and scanf()',
          'Omitting the main() function or spelling it as Main() (C is strictly case-sensitive)',
          'Forgetting the semicolon (;) at the end of statements',
          'Confusing compilation errors (syntax issues) with linker errors (unresolved symbols/missing libraries)'
        ],
        quickRevision: [
          'Dennis Ritchie created C in 1972 at Bell Labs to build UNIX.',
          'Execution cycle: Preprocessor -> Compiler -> Linker -> Loader.',
          'C provides 32 keywords, high execution speed, portability, and pointer memory control.'
        ]
      }
    },
    {
      id: 'c-u1-t3',
      unitId: 'c-unit-1',
      courseId: 'c',
      order: 3,
      title: 'C Character Set, Lexical Tokens, Keywords & Identifiers',
      summary: 'Master the atomic building blocks of C: source character set, the 6 token categories, 32 standard ANSI keywords, and strict identifier naming rules.',
      content: {
        definition: 'A C Token is the smallest individual unit in a C program recognized by the compiler. C divides tokens into 6 categories: Keywords, Identifiers, Constants, Strings, Special Symbols, and Operators. Keywords are pre-defined reserved words with fixed system meanings. Identifiers are user-defined names given to variables, functions, and arrays.',
        syntax: `/* 1. C Source Character Set:
   - Letters: Uppercase A-Z, Lowercase a-z (C is strictly case-sensitive)
   - Digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
   - Special Characters: , . : ; ? ' " ! | / \\ ~ _ $ % # & * - + < > ( ) [ ] { } ^
   - White Spaces: Blank space (' '), Horizontal Tab ('\\t'), Newline ('\\n'), Carriage Return ('\\r'), Form Feed ('\\f') */

/* 2. Exactly 32 Reserved ANSI C Keywords (All Lowercase):
   auto, break, case, char, const, continue, default, do,
   double, else, enum, extern, float, for, goto, if,
   int, long, register, return, short, signed, sizeof, static,
   struct, switch, typedef, union, unsigned, void, volatile, while */

/* 3. Strict Identifier Naming Rules:
   - Rule 1: First character must be an alphabet letter (A-Z, a-z) or an underscore (_)
   - Rule 2: Subsequent characters can be letters, digits (0-9), or underscores
   - Rule 3: Only the first 31 characters are significant in ANSI C
   - Rule 4: No spaces or special characters (like $, @, -, #) are allowed
   - Rule 5: Keywords CANNOT be used as identifiers */`,
        codeSnippet: `/* Valid vs. Invalid Identifiers Demonstration in C */
#include <stdio.h>

int main(void) {
    // VALID Identifiers:
    int student_age = 20;       // starts with letter, uses underscore
    float _totalScore = 95.5f;   // starts with underscore
    char grade1 = 'A';           // alphanumeric with trailing digit
    double MAX_CAPACITY = 5000;  // uppercase identifier (convention for constants)
    
    /* INVALID Identifiers (will cause compiler error if uncommented):
       int 1stRank = 1;        // ERROR: cannot begin with a decimal digit
       float student-score;    // ERROR: hyphen (-) is interpreted as subtraction operator
       char float = 'x';       // ERROR: 'float' is a reserved ANSI keyword
       int total marks = 100;  // ERROR: whitespace is strictly forbidden */

    printf("Valid Identifier Demonstrations:\\n");
    printf("student_age: %d | _totalScore: %.1f | grade1: %c\\n", 
           student_age, _totalScore, grade1);
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int student_age = 20;', explanation: 'student_age is a valid identifier (letters and underscore).' },
          { line: 'float _totalScore = 95.5f;', explanation: '_totalScore is valid because identifiers can begin with an underscore.' },
          { line: 'char grade1 = \'A\';', explanation: 'grade1 is valid because digits are permitted anywhere after the first character.' },
          { line: 'int 1stRank; // INVALID', explanation: 'Compilers reject identifiers starting with a numeric digit.' }
        ],
        keyConcepts: [
          '6 Token Types: 1. Keywords, 2. Identifiers, 3. Constants, 4. Strings, 5. Special Symbols, 6. Operators.',
          '32 ANSI Keywords: Always written in lowercase, reserved exclusively for the C language syntax.',
          'Identifier Rules: First character must be a letter or underscore; no spaces or punctuation allowed; cannot match any keyword.',
          'Keywords vs. Identifiers: Keywords have fixed, predefined meanings defined by the language; identifiers are user-created names defined by the programmer.',
          'Case Sensitivity: sum, Sum, and SUM represent three entirely distinct identifiers in C memory.'
        ],
        commonMistakes: [
          'Starting variable names with numbers (e.g., 2nd_value instead of value_2nd)',
          'Using hyphens instead of underscores (e.g., roll-no is treated as roll MINUS no)',
          'Attempting to name a variable after a keyword (e.g., int while = 5; will trigger a syntax error)',
          'Assuming C is case-insensitive like SQL or Pascal'
        ],
        quickRevision: [
          'Token = Smallest lexical unit recognized by compiler (6 types).',
          'Exactly 32 ANSI keywords (all lowercase, cannot be variable names).',
          'Identifiers must start with a letter or underscore (A-Z, a-z, _).'
        ]
      }
    },
    {
      id: 'c-u1-t4',
      unitId: 'c-unit-1',
      courseId: 'c',
      order: 4,
      title: 'Constants, Variables & Data Types',
      summary: 'Explore numeric and character constants, escape sequences, memory representation of variables, 16-bit vs 32-bit data type ranges, typedef, and enum.',
      content: {
        definition: 'A Constant is a fixed value that cannot be altered by the program during execution. A Variable is a named storage location in computer memory that holds data values that can be modified during execution. A Data Type specifies the type of data a variable can store and determines the amount of memory allocated for it.',
        syntax: `/* 1. Classification of Constants:
   - Integer Constants:
       * Decimal (base 10): 0 to 9 (e.g., 125, -45)
       * Octal (base 8): starts with 0 (e.g., 037, 077)
       * Hexadecimal (base 16): starts with 0x or 0X (e.g., 0x2A, 0xFF)
   - Real / Floating-Point Constants:
       * Fractional Form: 3.1415, -0.005
       * Exponential Form: 2.1565e2 (means 2.1565 × 10²)
   - Character Constants: Single character enclosed in single quotes ('a', '9', '$')
   - String Constants: Sequence of characters in double quotes ("Hello", "DIT")
   - Escape Sequences: '\\n' (newline), '\\t' (tab), '\\0' (null), '\\\\', '\\'', '\\"' */

/* 2. Data Types Hierarchy:
   - Primary / Fundamental: int, char, float, double, void
   - User-Defined: typedef, enum
   - Derived: Arrays, Pointers, Structures, Unions */

/* 3. Sizes & Ranges Comparison (16-bit vs 32-bit Architecture):
   Type                 16-bit Size   32-bit Size   Range (32-bit)
   char                 1 byte        1 byte        -128 to 127
   unsigned char        1 byte        1 byte        0 to 255
   int                  2 bytes       4 bytes       -2,147,483,648 to 2,147,483,647
   unsigned int         2 bytes       4 bytes       0 to 4,294,967,295
   short int            2 bytes       2 bytes       -32,768 to 32,767
   long int             4 bytes       4 bytes       -2^31 to 2^31 - 1
   float                4 bytes       4 bytes       3.4E-38 to 3.4E+38 (6 digits precision)
   double               8 bytes       8 bytes       1.7E-308 to 1.7E+308 (14 digits) */`,
        codeSnippet: `/* Demonstrating Constants, Escape Sequences, typedef and enum */
#include <stdio.h>

// User-defined data type using typedef
typedef unsigned long int ULONG;

// User-defined enumerated data type
enum Weekday { SUNDAY = 1, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY };

int main(void) {
    // Numeric Constants: Decimal, Octal (leading 0), Hexadecimal (leading 0x)
    int decimalVal = 42;
    int octalVal = 052;     // 052 in octal = 42 in decimal
    int hexVal = 0x2A;      // 0x2A in hex = 42 in decimal
    
    // Character and String Constants
    char ch = 'A';          // ASCII 65
    char newline = '\\n';    // Escape sequence
    char str[] = "CODEVERSE";
    
    // Real constants in fractional and exponential scientific format
    float pi = 3.14159f;
    double avogadro = 6.022e23;
    
    // Using typedef and enum
    ULONG memoryAddress = 0xFFFFFFFF;
    enum Weekday today = WEDNESDAY; // evaluates to 4

    printf("Constants: Dec=%d | Oct=%d | Hex=%d%c", decimalVal, octalVal, hexVal, newline);
    printf("Char: %c (ASCII %d) | String: %s\\n", ch, ch, str);
    printf("Float PI: %.2f | Avogadro: %.3e\\n", pi, avogadro);
    printf("Typedef ULONG size: %zu bytes\\n", sizeof(ULONG));
    printf("Enum Weekday today (Wednesday) = %d\\n", today);
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int octalVal = 052;', explanation: 'Leading 0 designates an octal integer constant (5*8^1 + 2*8^0 = 42 decimal).' },
          { line: 'int hexVal = 0x2A;', explanation: 'Leading 0x designates a hexadecimal constant (2*16^1 + 10*16^0 = 42 decimal).' },
          { line: 'typedef unsigned long int ULONG;', explanation: 'Creates a custom type alias ULONG for unsigned long int.' },
          { line: 'enum Weekday today = WEDNESDAY;', explanation: 'Assigns enumerated integer constant WEDNESDAY (value 4) to enum variable today.' }
        ],
        keyConcepts: [
          'Constants vs. Variables: Constants are immutable literals; variables are mutable named memory addresses.',
          'Octal numbers begin with 0 (e.g. 037); Hexadecimal numbers begin with 0x or 0X (e.g. 0x1F).',
          'Single vs. Double Quotes: Single quotes (\'A\') represent a 1-byte char constant; double quotes ("A") represent a 2-byte null-terminated string (\'A\' + \'\\0\').',
          'Escape Sequences: Special character combinations beginning with a backslash (\\) used to format console output.',
          'Primary Data Types: char (1B), int (2B/4B), float (4B), double (8B), void (0B / empty return type).',
          'typedef: Provides an alternate synonym for an existing data type.',
          'enum: Defines a user-created set of named integer constants.'
        ],
        commonMistakes: [
          'Writing an accidental leading zero on a number (e.g., 015 is octal 13, not decimal 15)',
          'Enclosing multiple characters inside single quotes (e.g., \'abc\' is an illegal character constant)',
          'Confusing char \'5\' (ASCII value 53) with integer 5',
          'Forgetting that float constants default to double unless suffixed with f or F'
        ],
        quickRevision: [
          'Constants: Fixed values (Octal starts with 0, Hex with 0x).',
          'Single quotes = char (\'a\'), Double quotes = string ("a" + \'\\0\').',
          'Primary types: char (1B), int (4B), float (4B), double (8B), void.',
          'typedef creates type aliases; enum creates named integer sets.'
        ]
      }
    },
    {
      id: 'c-u1-t5',
      unitId: 'c-unit-1',
      courseId: 'c',
      order: 5,
      title: 'Declarations, Storage Classes, Assigning Values & Modifiers',
      summary: 'Master variable declarations, assignments with interactive scanf(), the 4 C storage classes (auto, register, static, extern), symbolic constants (#define), const, and volatile.',
      content: {
        definition: 'Variable Declaration informs the compiler of a variable’s name and type before use. Assignment binds a runtime value to a declared variable. Storage Classes (auto, register, static, extern) dictate the storage location, default initial value, scope (visibility), and lifetime (longevity) of a variable. Modifiers like const and volatile inform the compiler of immutability and asynchronous hardware modifications.',
        syntax: `/* 1. Variable Declaration & Value Assignment:
   data_type var1, var2;                 // Declaration
   var1 = 10;                            // Direct assignment
   int a = 1, b = 2, c = 3;              // Declaration with initialization
   x = y = z = 0;                        // Chained / Multiple assignment
   scanf("%d %f", &var1, &floatVar);     // Interactive input (& address-of operator) */

/* 2. The 4 Storage Classes Matrix:
   Storage Class   Storage Location    Default Value   Scope (Visibility)    Lifetime
   auto            Stack RAM           Garbage value   Local to block        Until block exits
   register        CPU Register        Garbage value   Local to block        Until block exits
   static          Data Segment (RAM)  Zero (0)        Local to block/file   Permanent (whole program)
   extern          Data Segment (RAM)  Zero (0)        Global (all files)    Permanent (whole program) */

/* 3. Symbolic Constants vs const vs volatile:
   #define MAX_USERS 100       // Macro preprocessor text replacement (No semicolon!)
   const float PI = 3.14159f;  // Read-only typed variable checked by compiler
   volatile int sensorPin;     // Tells compiler not to cache in CPU register (hardware I/O)
   volatile const int timer;   // Read-only hardware register altered externally */`,
        codeSnippet: `/* Comprehensive Demonstration of Storage Classes, scanf, #define, const, and volatile */
#include <stdio.h>

// 1. Defining Symbolic Constants with #define (Preprocessor)
#define COLLEGE_NAME "CODEVERSE ACADEMY"
#define MAX_ATTEMPTS 3

// 2. Global Variable (Extern by default across files)
int globalSessionCount = 100;

// Demonstrating static vs auto variable behavior across repeated calls
void trackingFunction(void) {
    auto int localCalls = 0;       // re-initialized to 0 on every invocation
    static int persistentCalls = 0; // initialized ONCE; persists across all calls
    
    localCalls++;
    persistentCalls++;
    printf("trackingFunction() -> auto local: %d | static persistent: %d\\n", 
           localCalls, persistentCalls);
}

int main(void) {
    // 3. const variable: cannot be reassigned
    const double TUITION_FEE = 4500.50;
    // TUITION_FEE = 5000.0; // COMPILER ERROR: assignment of read-only variable
    
    // 4. volatile variable: prevents compiler register caching for hardware registers
    volatile int hardwareFlag = 1;
    
    // 5. Interactive Assignment demonstration
    int studentID;
    printf("Institution: %s | Max Attempts: %d\\n", COLLEGE_NAME, MAX_ATTEMPTS);
    printf("Fixed Tuition Fee: $%.2f | Hardware Flag: %d\\n", TUITION_FEE, hardwareFlag);
    
    // Calling trackingFunction 3 times to observe static persistence
    printf("\\n--- Observing Storage Class Behavior ---\\n");
    trackingFunction(); // local: 1, static: 1
    trackingFunction(); // local: 1, static: 2
    trackingFunction(); // local: 1, static: 3
    
    return 0;
}`,
        lineByLineExplanation: [
          { line: '#define COLLEGE_NAME "CODEVERSE ACADEMY"', explanation: 'Pre-compiler textual macro substitution. Semicolons must never be placed at the end.' },
          { line: 'static int persistentCalls = 0;', explanation: 'Allocated in the data segment; retains its value between function calls and initializes to 0.' },
          { line: 'auto int localCalls = 0;', explanation: 'Allocated on the stack frame; destroyed every time the function finishes executing.' },
          { line: 'const double TUITION_FEE = 4500.50;', explanation: 'Creates a type-safe read-only constant; attempts to reassign trigger compile-time errors.' },
          { line: 'volatile int hardwareFlag = 1;', explanation: 'Disables aggressive compiler caching so CPU re-reads hardwareFlag from RAM every access.' }
        ],
        keyConcepts: [
          'Variable Declaration: Must precede usage in C. Reserves memory space according to the data type.',
          'Interactive Input: scanf("%d", &var) requires the address-of operator (&) to pass the memory location.',
          'Local vs. Global Variables: Local variables are limited to their enclosing { } block; global variables are accessible throughout the entire program.',
          'auto: Default for local variables. Stored on the stack. Holds garbage value if uninitialized.',
          'register: Requests compiler to store variable inside a CPU register for ultra-fast access. Address-of operator (&) cannot be used.',
          'static: Preserves its value between function calls. Initialized only once. Defaults to 0.',
          'extern: Global variable shared across multiple source files.',
          '#define vs. const: #define is textual preprocessor substitution without type checking; const creates a typed read-only memory variable.',
          'volatile: Signals that external hardware, interrupts, or threads may modify the variable without CPU program instruction.'
        ],
        commonMistakes: [
          'Putting a semicolon at the end of a #define line (e.g. #define PI 3.14; causes unexpected syntax errors)',
          'Forgetting the address-of operator (&) in scanf (e.g. scanf("%d", x) instead of &x causes segmentation faults)',
          'Trying to use & on a register variable (e.g. &regVar triggers a compilation error)',
          'Relying on auto variables to have 0 by default (they contain indeterminate garbage memory)',
          'Attempting to reassign a const variable after initial initialization'
        ],
        quickRevision: [
          'scanf requires & (address-of) for input variables.',
          'static retains value across function calls (persists in data segment, default 0).',
          'register requests CPU register allocation (no & operator allowed).',
          '#define = preprocessor macro | const = typed read-only | volatile = disables CPU caching.'
        ]
      }
    }
  ]
};

export const cUnit1Quiz: Quiz = {
  id: 'quiz-c-1',
  unitId: 'c-unit-1',
  courseId: 'c',
  unitTitle: 'Unit 1: Introduction to Program Planning & C Programming',
  title: 'Program Planning & C Basics Certification Quiz',
  passingScorePercent: 80,
  questions: [
    {
      id: 'q-c1-1',
      question: 'Which geometric shape is universally used in standard flowcharts to indicate a Decision or Conditional Branching?',
      options: ['Rectangle', 'Diamond', 'Parallelogram', 'Oval'],
      correctIndex: 1,
      explanation: 'A diamond shape represents a decision/branch point with condition evaluation leading to two or more alternative paths (Yes/No).'
    },
    {
      id: 'q-c1-2',
      question: 'Which of the following is an INVALID identifier name according to ANSI C rules?',
      options: ['_studentCount', 'total_score_2', '2ndRank', 'averageValue'],
      correctIndex: 2,
      explanation: 'C identifiers cannot begin with a decimal digit (0-9). They must start with an alphabet letter or an underscore.'
    },
    {
      id: 'q-c1-3',
      question: 'How many standard reserved keywords are defined in the ANSI C (C89/C90) specification?',
      options: ['24', '32', '48', '64'],
      correctIndex: 1,
      explanation: 'Standard ANSI C defines exactly 32 reserved keywords, including auto, break, case, int, const, volatile, etc.'
    },
    {
      id: 'q-c1-4',
      question: 'Which storage class preserves the variable value across multiple function calls and defaults to 0 if uninitialized?',
      options: ['auto', 'register', 'static', 'extern'],
      correctIndex: 2,
      explanation: 'static variables reside in the data segment, persist for the lifetime of the program, and retain their values across function invocations.'
    },
    {
      id: 'q-c1-5',
      question: 'What is the primary purpose of declaring a variable with the "volatile" keyword in C?',
      options: [
        'To make the variable permanent and immutable across runs',
        'To instruct the compiler not to optimize away or cache memory reads because its value may change externally',
        'To allocate the variable in high-speed CPU registers',
        'To allow the variable to be accessed by other programming languages'
      ],
      correctIndex: 1,
      explanation: 'volatile informs the compiler that the variable may be altered asynchronously by hardware peripherals or interrupts, forcing direct memory reads on every access.'
    }
  ]
};
