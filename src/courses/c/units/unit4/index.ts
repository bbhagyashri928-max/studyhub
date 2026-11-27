import { Unit, Quiz } from '@/types';

export const cUnit4: Unit = {
  id: 'c-unit-4',
  courseId: 'c',
  unitNumber: 4,
  title: 'Functions and Pointers',
  description: 'Master modular software design with user-defined functions, recursion, call-by-value vs reference, pointer arithmetic, and memory addressing.',
  estimatedHours: 6.0,
  quizId: 'quiz-c-4',
  published: true,
  topics: [
    {
      id: 'c-u4-t1',
      unitId: 'c-unit-4',
      courseId: 'c',
      order: 1,
      title: 'Functions: Declaration, Definition, Arguments & Return Values',
      summary: 'Break complex systems into modular, testable, and reusable functional components.',
      content: {
        definition: 'A function is a self-contained block of statements designed to perform a specific task. Function declaration (prototype) informs the compiler about the function name, return type, and parameters. The definition contains the actual executable implementation.',
        syntax: '// Function Prototype\nint calculateSum(int a, int b);\n\n// Function Definition\nint calculateSum(int a, int b) {\n    return a + b;\n}',
        codeSnippet: `#include <stdio.h>

// Prototype
double calculateArea(double radius);

int main() {
    double r = 5.0;
    double area = calculateArea(r);
    printf("Radius: %.2f | Circle Area: %.2f\\n", r, area);
    return 0;
}

// Definition
double calculateArea(double radius) {
    const double PI = 3.1415926535;
    return PI * radius * radius;
}`,
        lineByLineExplanation: [
          { line: 'double calculateArea(double radius);', explanation: 'Forward declaration (prototype) allowing main() to call calculateArea before its definition appears.' },
          { line: 'calculateArea(r);', explanation: 'Function invocation passing argument r by value to parameter radius.' },
          { line: 'return PI * radius * radius;', explanation: 'Calculates result and returns value to the caller, terminating function execution.' }
        ],
        keyConcepts: [
          'Modularity: reduces code duplication and eases debugging',
          'Pass-by-value: C copies parameter values into the function call stack frame',
          'Scope: local variables created inside functions are destroyed upon return'
        ],
        commonMistakes: [
          'Forgetting the semicolon after a function prototype',
          'Type mismatch between the return expression and the declared return type'
        ],
        quickRevision: [
          'Prototype tells compiler: return type, name, argument types.',
          'Pass-by-value means modifications inside the function do not affect the caller\'s original variable.'
        ]
      }
    },
    {
      id: 'c-u4-t2',
      unitId: 'c-unit-4',
      courseId: 'c',
      order: 2,
      title: 'Recursion & The Call Stack',
      summary: 'Solve problems elegantly by self-referencing functions, base condition design, and stack frame unwinding.',
      content: {
        definition: 'Recursion is a programming technique in which a function calls itself directly or indirectly to solve smaller instances of the same problem. Every recursive function requires a base case to terminate execution and prevent stack overflow.',
        syntax: 'int factorial(int n) {\n    if (n <= 1) return 1; // Base case\n    return n * factorial(n - 1); // Recursive case\n}',
        codeSnippet: `#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) {
        return 1; // Base case terminates recursion
    }
    return n * factorial(n - 1); // Recursive call
}

int main() {
    int num = 6;
    printf("Factorial of %d = %lld\\n", num, factorial(num));
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'if (n <= 1) return 1;', explanation: 'Base case: halts recursive descent when n reaches 1 or 0.' },
          { line: 'return n * factorial(n - 1);', explanation: 'Pushes a new frame onto the stack and evaluates sub-problem until base case triggers unwinding.' }
        ],
        keyConcepts: [
          'Base Case: condition under which the function returns without recursing',
          'Call Stack: each recursive call allocates its own stack frame containing local variables and return address',
          'Stack Overflow: occurs if recursion is infinite or depth exceeds available stack memory'
        ],
        commonMistakes: [
          'Omitting the base case, leading to infinite recursion and segmentation fault (stack overflow)',
          'Incorrectly advancing toward the base case (e.g. calling factorial(n) instead of factorial(n - 1))'
        ],
        quickRevision: [
          'Every recursive function MUST have at least one base case.',
          'Divide-and-conquer algorithms like Quicksort, Mergesort, and Tree traversals rely heavily on recursion.'
        ]
      }
    },
    {
      id: 'c-u4-t3',
      unitId: 'c-unit-4',
      courseId: 'c',
      order: 3,
      title: 'Storage Classes: auto, register, static & extern',
      summary: 'Explore variable lifetime, scope, visibility, and memory placement across translation units.',
      content: {
        definition: 'A storage class defines the scope (visibility) and lifetime of a variable or function within a C program. The four storage classes are auto (default for locals), register (CPU register storage hint), static (retains value between calls), and extern (global across multiple files).',
        syntax: 'static int callCount = 0; // Retains value across function calls\nextern int globalConfig;   // Defined in another file',
        codeSnippet: `#include <stdio.h>

void trackVisits() {
    // static variable retains its value between function invocations
    static int visitCounter = 0;
    int localTemp = 0; // auto variable reset every call

    visitCounter++;
    localTemp++;

    printf("Visit Counter (static): %d | Local Temp (auto): %d\\n", visitCounter, localTemp);
}

int main() {
    printf("Call 1: "); trackVisits();
    printf("Call 2: "); trackVisits();
    printf("Call 3: "); trackVisits();
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'static int visitCounter = 0;', explanation: 'Allocated in the data segment once at program startup. Retains its state across function calls.' },
          { line: 'int localTemp = 0;', explanation: 'Standard auto storage class allocated on the stack and reinitialized to 0 on every call.' }
        ],
        keyConcepts: [
          'auto: default local variables with block scope and automatic duration',
          'static: preserves value throughout the entire program lifetime; file-scope static restricts visibility to the current translation unit',
          'extern: declares a variable defined in another file or scope without allocating storage again'
        ],
        commonMistakes: [
          'Attempting to get the memory address (&) of a register variable (registers do not have RAM addresses)',
          'Redefining an extern variable with conflicting types'
        ],
        quickRevision: [
          'static local: retains value between calls.',
          'static global: limits visibility to current file.',
          'extern: references a global variable defined elsewhere.'
        ]
      }
    },
    {
      id: 'c-u4-t4',
      unitId: 'c-unit-4',
      courseId: 'c',
      order: 4,
      title: 'Pointers: Declaration, Initialization & Dereferencing',
      summary: 'Demystify direct memory access, the address-of operator (&), and dereferencing operator (*).',
      content: {
        definition: 'A pointer is a variable that stores the memory address of another variable. By dereferencing a pointer using the unary * operator, a program can directly read or mutate the value located at that physical memory address.',
        syntax: 'int value = 42;\nint *ptr = &value; // ptr stores address of value\n*ptr = 100;        // modifies value directly through memory address',
        codeSnippet: `#include <stdio.h>

int main() {
    int score = 75;
    int *ptr = &score; // Pointer declaration and initialization

    printf("Value of score:          %d\\n", score);
    printf("Address of score (&score): %p\\n", (void*)&score);
    printf("Value stored in ptr:     %p\\n", (void*)ptr);
    printf("Dereferenced (*ptr):     %d\\n", *ptr);

    // Modify score through pointer dereferencing
    *ptr = 98;
    printf("\\nAfter updating via pointer, score is now: %d\\n", score);
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int *ptr = &score;', explanation: 'Declares pointer ptr to an int and assigns it the memory address of score obtained via &.' },
          { line: '*ptr = 98;', explanation: 'Dereferences ptr to write the integer 98 directly into score\'s memory slot.' }
        ],
        keyConcepts: [
          'Address-of operator (&): retrieves the memory address of a variable',
          'Dereference operator (*): accesses or alters the data residing at the address held by the pointer',
          'NULL pointer: points to address 0, used to represent an uninitialized or empty pointer safely'
        ],
        commonMistakes: [
          'Dereferencing an uninitialized or wild pointer (causes crashes or corrupts arbitrary memory)',
          'Confusing * in pointer declaration (type marker) with * in expressions (dereference operator)'
        ],
        quickRevision: [
          '& = address of variable.',
          '* = value at pointer address.',
          'Always initialize pointers to NULL or a valid address before use.'
        ]
      }
    },
    {
      id: 'c-u4-t5',
      unitId: 'c-unit-4',
      courseId: 'c',
      order: 5,
      title: 'Pointer Arithmetic & Pointers with Arrays',
      summary: 'Explore pointer offsets, scaling by data type size, passing arrays as pointers, and pass-by-reference.',
      content: {
        definition: 'When an integer is added to or subtracted from a pointer, the address is scaled automatically by sizeof(DataType). Array names decay into pointers to their first element, enabling efficient pointer traversal.',
        syntax: 'int arr[3] = {10, 20, 30};\nint *p = arr;\n*(p + 1) = 25; // Equivalent to arr[1] = 25',
        codeSnippet: `#include <stdio.h>

void swapNumbers(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 99;
    printf("Before swap: x = %d, y = %d\\n", x, y);
    swapNumbers(&x, &y);
    printf("After swap:  x = %d, y = %d\\n", x, y);

    // Pointer traversal of array
    int numbers[4] = {100, 200, 300, 400};
    int *ptr = numbers;
    printf("\\nArray via pointer arithmetic:\\n");
    for (int i = 0; i < 4; i++) {
        printf("*(ptr + %d) = %d at address %p\\n", i, *(ptr + i), (void*)(ptr + i));
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'void swapNumbers(int *a, int *b)', explanation: 'Simulates pass-by-reference in C by accepting pointers to caller variables.' },
          { line: '*(ptr + i)', explanation: 'Evaluates to address ptr + (i * sizeof(int)) and dereferences it to fetch the element value.' }
        ],
        keyConcepts: [
          'Pointer addition scales by sizeof(DataType). Adding 1 to an int* on a 64-bit system adds 4 bytes to the memory address',
          'arr[i] is syntactically identical to *(arr + i)',
          'Pass-by-reference is achieved in C by passing pointer arguments'
        ],
        commonMistakes: [
          'Assuming ptr + 1 adds 1 byte: it adds 1 element size (e.g. 4 bytes for int, 8 for double)',
          'Dangling pointers: holding a pointer to a local variable after its enclosing function returns'
        ],
        quickRevision: [
          'arr[i] == *(arr + i).',
          'Pass pointers to functions to allow functions to modify caller variables.',
          'Pointer arithmetic only makes sense within contiguous arrays or allocated blocks.'
        ]
      }
    }
  ]
};

export const cUnit4Quiz: Quiz = {
  id: 'quiz-c-4',
  unitId: 'c-unit-4',
  courseId: 'c',
  unitTitle: 'Unit 4: Functions and Pointers',
  title: 'Unit 4 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-c4-1',
      question: 'What is the consequence of omitting the base case in a recursive function?',
      options: [
        'The function returns 0 immediately',
        'The program encounters infinite recursion and terminates with a stack overflow',
        'The compiler converts it to a while loop automatically',
        'Execution continues normally with default values'
      ],
      correctIndex: 1,
      explanation: 'Without a base case to halt recursion, stack frames continue to be pushed until memory is exhausted, causing a stack overflow crash.'
    },
    {
      id: 'q-c4-2',
      question: 'Which storage class allows a local variable to preserve its value between multiple calls to the same function?',
      options: ['auto', 'register', 'static', 'extern'],
      correctIndex: 2,
      explanation: 'static local variables are allocated once in the data segment and maintain their persisted value across subsequent calls.'
    },
    {
      id: 'q-c4-3',
      question: 'If int *ptr points to address 0x1000, what address will (ptr + 2) point to, assuming sizeof(int) is 4 bytes?',
      options: ['0x1002', '0x1004', '0x1008', '0x1016'],
      correctIndex: 2,
      explanation: 'Pointer arithmetic scales by sizeof(type). 2 * 4 bytes = 8 bytes. Thus 0x1000 + 8 = 0x1008.'
    },
    {
      id: 'q-c4-4',
      question: 'How do you simulate pass-by-reference in C so a function can modify variables in the caller\'s scope?',
      options: [
        'By using the global keyword',
        'By passing pointers to the variables and dereferencing them inside the function',
        'By returning an array of values',
        'By declaring all variables as const'
      ],
      correctIndex: 1,
      explanation: 'Passing memory addresses (pointers) allows the called function to dereference the pointer and write modifications directly into the caller\'s memory.'
    },
    {
      id: 'q-c4-5',
      question: 'What does the expression *(arr + 3) evaluate to?',
      options: [
        'arr[3]',
        'Address of arr[3]',
        'arr + 3 bytes',
        'Undefined behavior'
      ],
      correctIndex: 0,
      explanation: 'In C, array subscript notation arr[i] is defined as syntactic sugar for *(arr + i).'
    }
  ]
};
