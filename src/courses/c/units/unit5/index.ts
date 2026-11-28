import { Unit, Quiz } from '@/types';

export const cUnit5: Unit = {
  id: 'c-unit-5',
  courseId: 'c',
  unitNumber: 5,
  title: 'User Defined Functions and Structures',
  description: 'Master modular programming through user-defined functions (prototypes, function calls, definitions, the 4 canonical function categories, recursion, and parameter passing) and heterogeneous compound data structures (struct definitions, templates, typedef, member access, whole structure operations, and compile-time initialization).',
  estimatedHours: 8.0,
  quizId: 'quiz-c-5',
  published: true,
  topics: [
    {
      id: 'c-u5-t1',
      unitId: 'c-unit-5',
      courseId: 'c',
      order: 1,
      title: 'User Defined Functions: Need, Multi-Function Architecture & Elements',
      summary: 'Build clean, modular programs by decomposing complex problems into reusable user-defined functions.',
      content: {
        definition: 'A User-Defined Function is a self-contained block of code designed to perform a specific computational task, written by the programmer to achieve modularity, readability, and reusability. A Multi-Function Program structures execution by having main() orchestrate and delegate sub-tasks to dedicated helper functions. The Three Core Elements of any function in C are: 1. Function Declaration (Prototype), 2. Function Call, and 3. Function Definition.',
        syntax: `// 1. Function Declaration (Prototype): Declares name, return type, and parameter types before main()
return_type function_name(parameter_type1, parameter_type2);

// 2. Function Call: Transmits actual arguments and transfers control to the function
function_name(actual_argument1, actual_argument2);

// 3. Function Definition: Contains the actual algorithm body
return_type function_name(type1 param1, type2 param2) {
    // Function body statements
    return result_value; // if return_type is not void
}`,
        codeSnippet: `#include <stdio.h>

// 1. Function Declarations (Prototypes)
void displayBanner(void);
int calculateArea(int length, int width);

int main(void) {
    // 2. Function Call: Invoking banner
    displayBanner();

    int l = 15, w = 8;
    // Calling calculateArea with actual arguments l and w
    int area = calculateArea(l, w);

    printf("Calculated Room Area (%d m x %d m): %d sq. meters\\n", l, w, area);
    return 0;
}

// 3. Function Definition: Banner
void displayBanner(void) {
    printf("=========================================\\n");
    printf("   CODEVIVA MODULAR MULTI-FUNCTION LAB  \\n");
    printf("=========================================\\n");
}

// Function Definition: Area Calculator
int calculateArea(int length, int width) {
    // length and width are formal parameters
    int result = length * width;
    return result; // Transmits calculated integer back to caller
}`,
        lineByLineExplanation: [
          { line: 'int calculateArea(int length, int width);', explanation: 'Function prototype informing the compiler of expected argument types and return type before invocation in main().' },
          { line: 'int area = calculateArea(l, w);', explanation: 'Transfers control, pushes a stack frame, and copies actual arguments l and w into formal parameters length and width.' },
          { line: 'return result;', explanation: 'Terminates helper function, pops the stack frame, and delivers the integer value back to the caller in main().' }
        ],
        keyConcepts: [
          'Need for functions: Eliminates redundant code, eases debugging, enables collaborative team development, and improves code readability.',
          'Actual Arguments: The actual values or variables passed into the function call (e.g., l, w).',
          'Formal Parameters: The placeholder variables defined in the function header that receive the incoming values (e.g., length, width).',
          'Prototypes allow main() to appear at the top of the file without compiler implicit declaration warnings.'
        ],
        commonMistakes: [
          'Mismatching argument count or data types between function prototype, call, and definition.',
          'Putting an accidental semicolon after the function definition header: "int add(int a, int b); { ... }" is a syntax error!',
          'Confusing formal parameters (in definition) with actual arguments (in function call).'
        ],
        quickRevision: [
          'Declaration (prototype) -> informs compiler.',
          'Call -> executes function.',
          'Definition -> implements logic.',
          'Prototypes prevent implicit declaration warnings.'
        ]
      }
    },
    {
      id: 'c-u5-t2',
      unitId: 'c-unit-5',
      courseId: 'c',
      order: 2,
      title: 'Return Values, Types & Categories of Functions',
      summary: 'Explore the 4 canonical categories of C functions based on parameter inputs and return value outputs.',
      content: {
        definition: 'Functions communicate with callers via inputs (arguments) and output (return value). Functions can return primary data types (int, float, char, double, pointers, structures) or void (no value returned). Based on inputs and outputs, C functions fall into 4 distinct categories.',
        syntax: `/* The 4 Canonical Categories of Functions:
   Category 1: No Arguments and No Return Values (void -> void)
   void printHeader(void);

   Category 2: Arguments but No Return Values (inputs -> void)
   void printReport(char studentName[], int score);

   Category 3: Arguments with Return Values (inputs -> output, Most Common)
   double calculateTax(double income, double taxRate);

   Category 4: No Arguments but Returns a Value (void -> output)
   int getCurrentYear(void); */`,
        codeSnippet: `#include <stdio.h>

// Category 1: No Arguments, No Return
void printSeparator(void) {
    printf("----------------------------------------\\n");
}

// Category 2: Arguments, No Return
void displayGrade(char studentName[], int score) {
    printf("Student: %-8s | Score: %3d | Status: %s\\n", 
           studentName, score, (score >= 50) ? "PASS" : "FAIL");
}

// Category 3: Arguments, With Return (Standard)
int findMaximum(int a, int b) {
    return (a > b) ? a : b;
}

// Category 4: No Arguments, With Return
int getStandardPort(void) {
    return 8080; // Returns default server port
}

int main(void) {
    printSeparator(); // Category 1 call
    
    displayGrade("Alex", 88);   // Category 2 call
    displayGrade("Jordan", 44);
    
    int maxVal = findMaximum(45, 92); // Category 3 call
    printf("Higher value: %d\\n", maxVal);
    
    int port = getStandardPort(); // Category 4 call
    printf("Default Server Port: %d\\n", port);
    
    printSeparator();
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'void printSeparator(void)', explanation: 'Takes no inputs and yields no return value; purely performs output side effects.' },
          { line: 'void displayGrade(char studentName[], int score)', explanation: 'Consumes two arguments to format and print a grade, returning nothing to caller.' },
          { line: 'int findMaximum(int a, int b)', explanation: 'Consumes two inputs, computes the maximum, and returns the result back to caller.' },
          { line: 'int getStandardPort(void)', explanation: 'Takes zero arguments from caller, but produces and returns a configuration integer.' }
        ],
        keyConcepts: [
          'void return type means the function does not yield any value (a return; without an expression is optional).',
          'A function can return only one value directly through its return statement.',
          'In C, arguments are passed by value: the function works on temporary copies of the caller\'s data.',
          'Category 3 (Arguments with Return Value) is the most versatile and modular function pattern.'
        ],
        commonMistakes: [
          'Trying to assign the result of a void function: "int x = printSeparator();" causes a compilation error.',
          'Forgetting to return a value in a non-void function (leads to undefined garbage values returned to caller).'
        ],
        quickRevision: [
          'Cat 1: No args, No return.',
          'Cat 2: Args, No return.',
          'Cat 3: Args, With return (Standard).',
          'Cat 4: No args, With return.'
        ]
      }
    },
    {
      id: 'c-u5-t3',
      unitId: 'c-unit-5',
      courseId: 'c',
      order: 3,
      title: 'Multiple Return Values, Nesting of Functions & Recursion',
      summary: 'Return multiple outputs using pointers, nest function invocations, and solve self-similar problems with recursive call stacks.',
      content: {
        definition: 'While C’s return statement can send back only a single value directly, functions can return multiple values by passing pointers as output parameters or bundling them into a structure. Nesting of Functions refers to calling one function from within another. Recursion is a programming technique where a function calls itself directly or indirectly to solve smaller instances of the same problem.',
        syntax: `// 1. Returning Multiple Values via Pointers (Output Parameters):
void computeStats(int a, int b, int *sumOut, int *diffOut);

// 2. Nesting of Function Calls:
int result = add(multiply(2, 3), 4); // multiply() executes first, its output feeds add()

// 3. Recursion Anatomy:
int factorial(int n) {
    if (n <= 1) return 1;          // Base condition (essential to terminate recursion)
    return n * factorial(n - 1);    // Recursive step
}`,
        codeSnippet: `#include <stdio.h>

// Returning Multiple Values via Pointer Parameters
void computeStats(int a, int b, int *sumOut, int *diffOut, int *prodOut) {
    *sumOut = a + b;
    *diffOut = a - b;
    *prodOut = a * b;
}

// Recursive Function: Factorial computation (n!)
long long factorial(int n) {
    if (n <= 1) {
        return 1; // Base case: 0! = 1! = 1
    }
    return n * factorial(n - 1); // Recursive step
}

// Recursive Function: Fibonacci term
int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main(void) {
    // 1. Multiple Return Values demonstration
    int s, d, p;
    computeStats(10, 4, &s, &d, &p);
    printf("Multi-Output of (10, 4):\\n");
    printf("  Sum = %d | Difference = %d | Product = %d\\n", s, d, p);

    // 2. Recursion: Factorial of 5 (5 * 4 * 3 * 2 * 1 = 120)
    int num = 5;
    printf("\\nFactorial of %d (%d!): %lld\\n", num, num, factorial(num));

    // 3. Recursion: Fibonacci series
    printf("Fibonacci sequence (first 7 terms): ");
    for (int i = 0; i < 7; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'void computeStats(..., int *sumOut, ...)', explanation: 'Dereferences caller-provided memory addresses (*sumOut = ...) to write multiple return values.' },
          { line: 'if (n <= 1) return 1;', explanation: 'Base case prevents infinite stack growth and terminates the recursion chain.' },
          { line: 'return n * factorial(n - 1);', explanation: 'Pushes successive stack frames until the base case is hit, then unwinds multiplicatively.' }
        ],
        keyConcepts: [
          'A function in standard C cannot be defined inside another function (nested definitions are illegal).',
          'Every recursive function MUST have a well-defined base condition to avoid Stack Overflow (SIGSEGV).',
          'Pointer parameters allow functions to simulate pass-by-reference and produce multiple outputs.',
          'Call Stack: Each recursive call adds a new stack frame storing local variables and the return address.'
        ],
        commonMistakes: [
          'Missing or faulty base condition causing infinite recursion and stack overflow crash.',
          'Attempting to define a function inside main() (e.g. "void foo() { void bar() { ... } }" is invalid in standard C).'
        ],
        quickRevision: [
          'Pointers allow returning multiple values.',
          'Recursion = function calling itself.',
          'Base condition is mandatory in recursion to prevent stack overflow.'
        ]
      }
    },
    {
      id: 'c-u5-t4',
      unitId: 'c-unit-5',
      courseId: 'c',
      order: 4,
      title: 'Structures: What is a Structure, Declarations, typedef & Arrays vs Structures',
      summary: 'Package heterogeneous data attributes together into custom compound types using struct and typedef.',
      content: {
        definition: 'A Structure (struct) is a user-defined compound data type that groups variables of different data types (heterogeneous) under a single identifier name. While an array can only represent a collection of identical data types, structures allow modeling real-world entities with diverse attributes (such as a Book with title, author, pages, and price, or a Student with roll number, name, and marks). The keyword typedef allows defining convenient aliases for structure types.',
        syntax: `// 1. Structure Definition Template:
struct tag_name {
    data_type member1;
    data_type member2;
}; // Semicolon is mandatory!

// 2. Declaring Structure Variables:
struct tag_name var1, var2;

// 3. Combining Definition & Declaration:
struct tag_name {
    data_type member1;
} var1, var2;

// 4. Structure Type Declaration with typedef:
typedef struct {
    double real;
    double img;
} Complex;

Complex c1, c2; // Direct declaration without 'struct' keyword!`,
        codeSnippet: `#include <stdio.h>
#include <string.h>

// 1. Defining Structure with Tag Name: book_bank
struct book_bank {
    char title[20];
    char author[15];
    int pages;
    float price;
};

// 2. Defining Structure with typedef: Complex Numbers
typedef struct {
    double real;
    double img;
} Complex;

// Function adding two complex numbers and returning a whole structure
Complex addComplex(Complex c1, Complex c2) {
    Complex c3;
    c3.real = c1.real + c2.real;
    c3.img = c1.img + c2.img;
    return c3;
}

int main(void) {
    // Declaring structure variables of type struct book_bank
    struct book_bank book1;

    // Populating book1 members
    strcpy(book1.title, "Programming in C");
    strcpy(book1.author, "Balagurusamy");
    book1.pages = 450;
    book1.price = 399.50f;

    printf("=== 1. Book Bank Database Record ===\\n");
    printf("Title:  %s\\n", book1.title);
    printf("Author: %s\\n", book1.author);
    printf("Pages:  %d\\n", book1.pages);
    printf("Price:  $%.2f\\n", book1.price);

    // Using typedef Complex structure
    Complex num1 = {3.5, 2.0};
    Complex num2 = {1.5, 4.5};
    Complex sum = addComplex(num1, num2);

    printf("\\n=== 2. Complex Number Arithmetic ===\\n");
    printf("Sum = %.1f + %.1fi\\n", sum.real, sum.img);

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'struct book_bank { ... };', explanation: 'Defines the structure format (template). Note: No memory is allocated until variables like book1 are declared.' },
          { line: 'struct book_bank book1;', explanation: 'Declares book1 as a structure variable, allocating memory space for all 4 member fields.' },
          { line: 'typedef struct { ... } Complex;', explanation: 'Creates a type alias Complex so we can declare variables without writing "struct Complex".' },
          { line: 'Complex addComplex(...)', explanation: 'Functions in C can take whole structures as parameters and return a whole structure directly.' }
        ],
        keyConcepts: [
          'Structures group heterogeneous data elements into one logical entity.',
          'Defining a structure template does NOT allocate memory; memory is allocated when variables of that structure type are declared.',
          'Arrays vs. Structures: Arrays hold homogeneous elements of the same type; structures hold heterogeneous elements of diverse types.',
          'Arrays are derived types; structures are programmer-defined constructed data types.',
          'The template MUST terminate with a semicolon (;).'
        ],
        commonMistakes: [
          'Forgetting the mandatory terminating semicolon (;) after the closing brace of a struct definition.',
          'Attempting to initialize members inside the struct template definition (e.g. struct book { int pages = 100; }; is strictly forbidden in C!).',
          'Omitting the tag name when defining a struct without declaring variables immediately.'
        ],
        quickRevision: [
          'struct tag_name { type member; }; (needs semicolon).',
          'Heterogeneous: can mix int, char[], float, double.',
          'Memory is allocated only when variables are declared.',
          'typedef creates a clean type alias without "struct".'
        ]
      }
    },
    {
      id: 'c-u5-t5',
      unitId: 'c-unit-5',
      courseId: 'c',
      order: 5,
      title: 'Referencing Structure Members, Initialization & Whole Structures',
      summary: 'Access members using the dot operator (.), initialize records at compile time, and perform whole structure assignments and function passing.',
      content: {
        definition: 'Structure members are accessed using the Member Selection (Dot) Operator (.). Structures can be initialized at compile time using curly braces {}. In C, Whole Structures can be copied directly using the assignment operator (=), passed by value to functions, and returned from functions.',
        syntax: `// 1. Referencing Members via Dot Operator:
variable_name.member_name

// 2. Compile-Time Initialization:
struct personal {
    char name[20];
    int day;
    char month[10];
    int year;
    float salary;
};
struct personal person = {"M.L.Goel", 10, "January", 1945, 4500.00};

// 3. Whole Structure Assignment (Copies all members bit-for-bit):
struct personal backupPerson = person;`,
        codeSnippet: `#include <stdio.h>
#include <string.h>

// Personal record structure from university curriculum
struct personal {
    char name[20];
    int day;
    char month[10];
    int year;
    float salary;
};

// Function accepting whole structure as argument (pass by value)
void printPersonRecord(struct personal p) {
    printf("Name:   %s\\n", p.name);
    printf("DOB:    %d %s %d\\n", p.day, p.month, p.year);
    printf("Salary: $%.2f\\n", p.salary);
}

int main(void) {
    // 1. Compile-Time Initialization
    struct personal person1 = {"M.L.Goel", 10, "January", 1945, 4500.00f};

    printf("=== 1. Primary Record (Initialized at Compile Time) ===\\n");
    printPersonRecord(person1);

    // 2. Referencing Members via Dot (.) Operator and Updating
    person1.salary = 5200.00f; // Salary increment
    printf("\\nUpdated Salary for %s: $%.2f\\n", person1.name, person1.salary);

    // 3. Whole Structure Assignment
    struct personal person2 = person1; // Bitwise copy of all members
    printf("\\n=== 2. Backup Record (Whole Structure Assignment) ===\\n");
    printPersonRecord(person2);

    // 4. Partial Initialization Demonstration
    // Remaining uninitialized members are automatically set to 0 or '\\0'
    struct personal partialPerson = {"A.K.Sharma", 15, "March"};
    printf("\\n=== 3. Partial Initialization (Uninitialized fields default to 0) ===\\n");
    printf("Name: %s | Day: %d | Month: %s | Year: %d | Salary: $%.2f\\n",
           partialPerson.name, partialPerson.day, partialPerson.month, 
           partialPerson.year, partialPerson.salary);

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'person1.salary = 5200.00f;', explanation: 'Uses the dot (.) operator to select and update the salary member of person1.' },
          { line: 'struct personal person2 = person1;', explanation: 'C performs a shallow bitwise copy of all member fields from person1 to person2.' },
          { line: 'struct personal partialPerson = {"A.K.Sharma", 15, "March"};', explanation: 'Partial initialization: year and salary are omitted and automatically receive default 0 values.' }
        ],
        keyConcepts: [
          'Dot (.) operator (also called period operator) links structure variables to their members.',
          'Compile-time initialization requires values inside curly braces {} in the exact declared member order.',
          'Partial initialization is permitted: uninitialized numeric members default to 0, characters/strings default to \'\\0\'.',
          'Whole structure assignment (s2 = s1) copies all fields automatically.',
          'C does NOT allow comparing whole structures with == (e.g. if (p1 == p2) is a compiler error!).'
        ],
        commonMistakes: [
          'Trying to initialize members within the struct template definition.',
          'Comparing two structure variables directly using == operator.',
          'Mismatching the order of data types in the compile-time initialization list {}.'
        ],
        quickRevision: [
          'Access members via dot: var.member.',
          'Initialization: struct tag var = {val1, val2, ...};',
          'Uninitialized members default to 0 or \'\\0\'.',
          'Whole structure copy: var2 = var1.'
        ]
      }
    }
  ]
};

export const cUnit5Quiz: Quiz = {
  id: 'quiz-c-5',
  unitId: 'c-unit-5',
  courseId: 'c',
  unitTitle: 'Unit 5: User Defined Functions and Structures',
  title: 'Functions & Structures Certification Quiz',
  passingScorePercent: 80,
  questions: [
    {
      id: 'q-c5-1',
      question: 'What is the primary technical distinction between an Array and a Structure in C?',
      options: [
        'Arrays hold homogeneous elements of the same type; structures group heterogeneous elements of diverse types',
        'Arrays are allocated on the heap; structures are allocated on the stack',
        'Arrays can be passed to functions; structures cannot be passed to functions',
        'Arrays have member names; structures only use numeric indices'
      ],
      correctIndex: 0,
      explanation: 'Arrays are homogeneous (storing identical data types), whereas structures are heterogeneous (grouping diverse data types under one named entity).'
    },
    {
      id: 'q-c5-2',
      question: 'What is mandatory for any recursive function to avoid infinite execution and stack overflow?',
      options: [
        'A while loop in the header',
        'A well-defined base condition that stops recursive calls',
        'At least two return statements',
        'A pointer argument'
      ],
      correctIndex: 1,
      explanation: 'A base condition terminates the recursion tree. Without it, the function calls itself indefinitely until stack memory is exhausted.'
    },
    {
      id: 'q-c5-3',
      question: 'Can you compare two structure variables directly using the equality operator (e.g., if (student1 == student2)) in standard C?',
      options: [
        'Yes, C automatically compares each field',
        'No, C does not support direct structure comparison with ==; you must compare members individually',
        'Yes, but only if they have no pointers',
        'Yes, provided both are defined with typedef'
      ],
      correctIndex: 1,
      explanation: 'In C, the == operator cannot be used directly on whole structure variables due to memory padding discrepancies. You must compare individual members.'
    },
    {
      id: 'q-c5-4',
      question: 'Which operator is used to access an individual member of a structure variable?',
      options: ['Dot (.) operator', 'Arrow (->) operator', 'Scope resolution (::) operator', 'Comma (,) operator'],
      correctIndex: 0,
      explanation: 'The dot (.) operator selects members from direct structure variables. The arrow (->) operator is used when accessing through a pointer.'
    },
    {
      id: 'q-c5-5',
      question: 'What happens to the uninitialized members when a structure variable is partially initialized in C?',
      options: [
        'They are automatically set to default values: 0 for numeric types and \'\\0\' for characters and strings',
        'They contain unpredictable garbage memory values',
        'The compiler throws a fatal syntax error',
        'The entire structure is zeroed out completely'
      ],
      correctIndex: 0,
      explanation: 'Under C rules for partial structure initialization, any trailing uninitialized members automatically receive default zero values (0 for numbers, \'\\0\' for characters).'
    }
  ]
};
