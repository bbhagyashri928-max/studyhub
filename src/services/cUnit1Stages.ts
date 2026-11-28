import { Stage } from '@/types';

/**
 * High-fidelity, syllabus-accurate stages for C Unit 1:
 * "Introduction to Program Planning & C Programming"
 * Directly derived from university syllabus and lecture notes (FCP_Unit_1.pdf).
 */
export const cUnit1CustomStages: Stage[] = [
  // =========================================================================
  // TOPIC 1: Program Design Tools (Algorithms & Flowcharts) -> Stages 1 to 6
  // =========================================================================
  {
    id: 'c-u1-t1-s1',
    topicId: 'c-u1-t1',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: The Art of Programming & 5 Characteristics of Algorithms',
    subtitle: 'Foundation Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Before writing any code in C, a software engineer must analyze the problem and design a structured solution. An algorithm is a finite, ordered sequence of unambiguous instructions that transforms valid inputs into correct outputs.',
      definitions: [
        'Algorithm: A finite step-by-step procedure of clear instructions to solve a given problem.',
        'Finiteness: The algorithm must terminate after a finite, countable number of execution steps.',
        'Definiteness: Every step must be unambiguous, clear, and possess only one logical interpretation.',
        'Effectiveness: Each instruction must be basic enough to be carried out practically and feasibly.'
      ],
      syntax: `/* The 5 Golden Characteristics of Algorithms:
   1. Input         : Zero or more quantities supplied externally.
   2. Output        : At least one result or value produced.
   3. Finiteness    : Must stop after a finite number of steps.
   4. Definiteness  : Every step is clear and unambiguous.
   5. Effectiveness : Every instruction is feasible and basic. */`,
      realLifeExample: 'Think of a cooking recipe: it lists exact ingredients (inputs), unambiguous preparation steps in strict order (algorithm), and produces a delicious cake (output). If the recipe said "bake forever", it would violate finiteness!',
      codeSnippet: `// Conceptual C representation of an unambiguous algorithmic step
#include <stdio.h>

int main(void) {
    printf("Algorithm Principle Check:\\n");
    printf("1. Finite Steps -> Guaranteed Termination\\n");
    printf("2. Clear Logic  -> Zero Ambiguity\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: '#include <stdio.h>', explanation: 'Includes standard input/output declarations for screen printing.' },
        { line: 'printf(...)', explanation: 'Outputs the foundational principles of algorithmic design.' },
        { line: 'return 0;', explanation: 'Terminates the program execution safely.' }
      ],
      expectedOutput: `Algorithm Principle Check:\n1. Finite Steps -> Guaranteed Termination\n2. Clear Logic  -> Zero Ambiguity`,
      pointsToRemember: [
        'Never jump straight into coding without first formulating an algorithm.',
        'An algorithm without termination is an infinite loop bug.',
        'Algorithms are independent of any specific programming language.'
      ]
    },
    quiz: {
      question: 'Which characteristic dictates that an algorithm must terminate after a finite number of operations?',
      options: ['Finiteness', 'Definiteness', 'Generality', 'Effectiveness'],
      correctIndex: 0,
      explanation: 'Finiteness guarantees that the algorithm will execute a finite count of steps and come to an end.'
    }
  },
  {
    id: 'c-u1-t1-s2',
    topicId: 'c-u1-t1',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Algorithm 1 – Addition of Two Numbers',
    subtitle: 'Practical Implementation Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The simplest arithmetic algorithm takes two numerical values as input, computes their sum using addition, and displays the result.',
      definitions: [
        'Input Step: Reading or accepting values from the user.',
        'Processing Step: Performing arithmetic or logical manipulation (e.g., sum = num1 + num2).',
        'Output Step: Presenting the computed result to the user.'
      ],
      syntax: `Algorithm: Add Two Numbers
Step 1: Start
Step 2: Declare variables num1, num2, and sum
Step 3: Read values of num1 and num2
Step 4: Compute sum = num1 + num2
Step 5: Display sum
Step 6: Stop`,
      realLifeExample: 'Like using a pocket calculator: you enter 25 (+), then 15 (=), and the calculator processor displays 40 on the screen.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int num1 = 25;
    int num2 = 15;
    int sum;
    
    // Process: add num1 and num2
    sum = num1 + num2;
    
    // Output: display result
    printf("Sum of %d and %d is: %d\\n", num1, num2, sum);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int num1 = 25, num2 = 15, sum;', explanation: 'Allocates memory for inputs and the sum result variable.' },
        { line: 'sum = num1 + num2;', explanation: 'Executes the mathematical processing step.' },
        { line: 'printf(...)', explanation: 'Displays the final calculated sum to the user.' }
      ],
      expectedOutput: `Sum of 25 and 15 is: 40`,
      pointsToRemember: [
        'Every algorithm starts with "Start" and terminates with "Stop".',
        'Variables must be declared before they can store values in C.'
      ]
    },
    quiz: {
      question: 'In the Addition algorithm, which step performs the actual computation?',
      options: ['Declare variables', 'Read values', 'Compute sum = num1 + num2', 'Stop'],
      correctIndex: 2,
      explanation: 'The step "sum = num1 + num2" is the processing step where the CPU calculates the sum.'
    }
  },
  {
    id: 'c-u1-t1-s3',
    topicId: 'c-u1-t1',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Algorithm 2 – Calculating the Area of a Circle',
    subtitle: 'Geometric Formulas Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'This algorithm calculates the surface area of a circle using the formula Area = PI * Radius * Radius, where PI is approximated as 3.14159.',
      definitions: [
        'Radius (R): Distance from the circle center to its circumference.',
        'Area: The space occupied by the circle (π * R²).'
      ],
      syntax: `Algorithm: Area of Circle
Step 1: Start
Step 2: Initialize PI = 3.14159
Step 3: Read radius R
Step 4: Compute Area = PI * R * R
Step 5: Display Area
Step 6: Stop`,
      realLifeExample: 'Measuring how much turf grass is needed to cover a circular botanical garden plot with a radius of 7 meters.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    const float PI = 3.14159f;
    float radius = 7.0f;
    float area;
    
    area = PI * radius * radius;
    printf("Radius: %.2f | Calculated Area: %.2f\\n", radius, area);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'const float PI = 3.14159f;', explanation: 'Defines PI as a read-only floating-point constant.' },
        { line: 'area = PI * radius * radius;', explanation: 'Calculates the area formula.' },
        { line: 'printf("... %.2f")', explanation: 'Prints floating-point output formatted to 2 decimal places.' }
      ],
      expectedOutput: `Radius: 7.00 | Calculated Area: 153.94`,
      pointsToRemember: [
        'Floating-point variables (float/double) are required for real numbers with decimals.',
        'Formula: Area = 3.14 * R * R.'
      ]
    },
    quiz: {
      question: 'Why should the radius and area variables be declared as float rather than int?',
      options: [
        'Because circles can have fractional dimensions and multiplying by PI produces decimals',
        'Because integers cannot be multiplied in C',
        'Because float consumes less memory than int',
        'Because printf only supports floats'
      ],
      correctIndex: 0,
      explanation: 'Circle geometry involves decimal fractions (e.g. 3.14159), so float or double is required to avoid truncating decimals.'
    }
  },
  {
    id: 'c-u1-t1-s4',
    topicId: 'c-u1-t1',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: Algorithm 3 – Swapping Two Numbers Using a Temp Variable',
    subtitle: 'Data Manipulation Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Swapping interchanges the values stored in two separate variables. To prevent overwriting and losing one value, an auxiliary third variable named "temp" is used as temporary storage.',
      definitions: [
        'Swapping: Exchanging the values of two variables so variable A gets B\'s value and variable B gets A\'s original value.',
        'Temporary Variable (temp): Intermediate buffer used to hold a value safely during transfer.'
      ],
      syntax: `Algorithm: Swap Two Numbers
Step 1: Start
Step 2: Read values of A and B
Step 3: Assign temp = A  (Back up A)
Step 4: Assign A = B     (Copy B into A)
Step 5: Assign B = temp  (Copy original A into B)
Step 6: Display A and B
Step 7: Stop`,
      realLifeExample: 'Two cups: Cup A contains orange juice, Cup B contains milk. To swap liquids without mixing, you pour Cup A into an empty third cup (temp), pour Cup B into Cup A, and then pour the third cup (temp) into Cup B!',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20, temp;
    
    printf("Before Swap: a = %d, b = %d\\n", a, b);
    
    // The 3-Step Swap:
    temp = a;
    a = b;
    b = temp;
    
    printf("After Swap:  a = %d, b = %d\\n", a, b);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'temp = a;', explanation: 'Stores the original value of a (10) into temp.' },
        { line: 'a = b;', explanation: 'Transfers b (20) into a. Now a holds 20.' },
        { line: 'b = temp;', explanation: 'Restores original value from temp (10) into b. Swap complete!' }
      ],
      expectedOutput: `Before Swap: a = 10, b = 20\nAfter Swap:  a = 20, b = 10`,
      pointsToRemember: [
        'Writing `a = b; b = a;` without temp will overwrite a and destroy its original value!',
        'The 3 steps are: temp = a; a = b; b = temp;'
      ]
    },
    quiz: {
      question: 'What happens if you execute "a = b; b = a;" without using a temporary variable?',
      options: [
        'Both a and b end up with the initial value of b',
        'Both a and b end up with 0',
        'The numbers swap correctly',
        'The program crashes with a syntax error'
      ],
      correctIndex: 0,
      explanation: 'Without temp, `a = b` immediately overwrites `a`, so the second step `b = a` copies `b` back into itself.'
    }
  },
  {
    id: 'c-u1-t1-s5',
    topicId: 'c-u1-t1',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Algorithm 4 – Finding the Largest of Three Numbers',
    subtitle: 'Branching & Decisions Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Finding the largest among three numbers requires decision-making and conditional branching using logical comparison operators.',
      definitions: [
        'Conditional Branching: Diverting program execution path based on whether a condition evaluates to TRUE or FALSE.',
        'Relational Operators: Symbols like > (greater than) and >= (greater than or equal to) used in comparisons.'
      ],
      syntax: `Algorithm: Largest of Three Numbers
Step 1: Start
Step 2: Read three numbers a, b, and c
Step 3: If (a >= b AND a >= c) then
           Display "a is largest"
        Else If (b >= a AND b >= c) then
           Display "b is largest"
        Else
           Display "c is largest"
Step 4: Stop`,
      realLifeExample: 'A podium finish in athletics: comparing the finish times of 3 sprinters to declare the gold medal winner.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 45, b = 82, c = 33;
    int largest;
    
    if (a >= b && a >= c) {
        largest = a;
    } else if (b >= a && b >= c) {
        largest = b;
    } else {
        largest = c;
    }
    
    printf("Among %d, %d, and %d -> Largest is: %d\\n", a, b, c, largest);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'if (a >= b && a >= c)', explanation: 'Evaluates if a is greater than or equal to both other candidates.' },
        { line: 'else if (b >= a && b >= c)', explanation: 'If a failed, checks if b is greater than or equal to both.' },
        { line: 'else { largest = c; }', explanation: 'If both a and b failed, c is mathematically guaranteed to be largest.' }
      ],
      expectedOutput: `Among 45, 82, and 33 -> Largest is: 82`,
      pointsToRemember: [
        '&& is the logical AND operator in C; both conditions must be true.',
        'Every branch path must eventually converge to Stop.'
      ]
    },
    quiz: {
      question: 'In the Largest of 3 algorithm, why can we conclude c is largest in the final "else" without another "if"?',
      options: [
        'Because if neither a nor b is the largest, c is mathematically the only remaining candidate',
        'Because c is always larger than a',
        'Because C does not allow more than one if statement',
        'Because else automatically sets c to 100'
      ],
      correctIndex: 0,
      explanation: 'By process of elimination, if both candidates `a` and `b` have been tested and disqualified, `c` is guaranteed to be the largest.'
    }
  },
  {
    id: 'c-u1-t1-s6',
    topicId: 'c-u1-t1',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 6,
    title: 'Stage 6: Flowchart Shapes & Visual Logic Diagrams',
    subtitle: 'Visual Modeling Level 6',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'A flowchart represents an algorithm visually using standard ANSI geometric shapes. Each shape represents a specific kind of operation, and arrows indicate the sequence of execution.',
      definitions: [
        'Oval (Terminal): Marks the Start or Stop of the program.',
        'Parallelogram (I/O): Represents reading input from user or printing output to screen.',
        'Rectangle (Process): Represents computation, data manipulation, or assignment.',
        'Diamond (Decision): Represents condition evaluation with two exit paths (True/False or Yes/No).',
        'Circle (Connector): Joins flow lines on the same page.',
        'Arrow (Flowline): Indicates the exact direction of program flow.'
      ],
      syntax: `Standard ANSI Flowchart Shapes:
[ Start / Stop ]   -> Oval / Rounded Rectangle
/ Read / Print /   -> Parallelogram
| sum = a + b  |   -> Rectangle
< Is a > b ?   >   -> Diamond (Yes / No exits)
( O )              -> Small Circle (Connector)
----->             -> Arrow Flowline`,
      realLifeExample: 'Road traffic signs: a red hexagon means Stop, an arrow tells you which way to turn, and a fork in the road is a decision diamond.',
      codeSnippet: `/* Even / Odd Flowchart logic translated to C code */
#include <stdio.h>

int main(void) {
    int num = 14;
    printf("Evaluating Number: %d\\n", num);
    
    // Diamond Decision Shape: Is num % 2 == 0?
    if (num % 2 == 0) {
        // Output Parallelogram (Yes branch)
        printf("%d is EVEN\\n", num);
    } else {
        // Output Parallelogram (No branch)
        printf("%d is ODD\\n", num);
    }
    // Terminal Oval: Stop
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'if (num % 2 == 0)', explanation: 'Corresponds to the Diamond Decision shape in a flowchart.' },
        { line: 'printf("%d is EVEN\\n", num);', explanation: 'Parallelogram shape on the True/Yes branch.' },
        { line: 'printf("%d is ODD\\n", num);', explanation: 'Parallelogram shape on the False/No branch.' }
      ],
      expectedOutput: `Evaluating Number: 14\n14 is EVEN`,
      pointsToRemember: [
        'Oval = Start / Stop',
        'Parallelogram = Input / Output',
        'Rectangle = Calculation / Process',
        'Diamond = Decision / Branching with Yes/No exits.'
      ]
    },
    quiz: {
      question: 'Which geometric shape is used in flowcharts to represent input or output operations?',
      options: ['Parallelogram', 'Rectangle', 'Diamond', 'Circle'],
      correctIndex: 0,
      explanation: 'A parallelogram is the standard ANSI symbol for reading input (Read) or displaying output (Print).'
    }
  },

  // =========================================================================
  // TOPIC 2: Overview of C: History & Lifecycle -> Stages 1 to 6
  // =========================================================================
  {
    id: 'c-u1-t2-s1',
    topicId: 'c-u1-t2',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Genesis of C & Dennis Ritchie at Bell Labs',
    subtitle: 'History & Roots Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C was created in 1972 by computer scientist Dennis M. Ritchie at Bell Telephone Laboratories in Murray Hill, New Jersey. It was designed to overcome the limitations of earlier languages like B and BCPL and rewrite the UNIX operating system.',
      definitions: [
        'Dennis Ritchie: American computer scientist who designed the C programming language and co-developed the UNIX operating system.',
        'Bell Labs: Iconic research institution where C, C++, UNIX, and the transistor were invented.'
      ],
      syntax: `Historical Summary:
Creator    : Dennis M. Ritchie
Year       : 1972
Location   : Bell Telephone Laboratories (USA)
Key Goal   : Rewrite the UNIX Operating System in a portable structured language`,
      realLifeExample: 'Before C, operating systems had to be rewritten in assembly language for every single brand of computer. C made operating systems portable so the same software could run on different hardware!',
      codeSnippet: `#include <stdio.h>

int main(void) {
    printf("Language: C Programming Language\\n");
    printf("Creator : Dennis Ritchie (1972)\\n");
    printf("Lab     : Bell Laboratories\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: '#include <stdio.h>', explanation: 'Standard input/output header inclusion.' },
        { line: 'printf(...)', explanation: 'Prints the historical milestone of C\'s inception.' },
        { line: 'return 0;', explanation: 'Standard exit status code.' }
      ],
      expectedOutput: `Language: C Programming Language\nCreator : Dennis Ritchie (1972)\nLab     : Bell Laboratories`,
      pointsToRemember: [
        'Dennis Ritchie invented C in 1972 at Bell Labs.',
        'C was created specifically to build the UNIX operating system.'
      ]
    },
    quiz: {
      question: 'Who developed the C programming language and in which year?',
      options: [
        'Dennis Ritchie in 1972',
        'Bjarne Stroustrup in 1985',
        'Ken Thompson in 1960',
        'James Gosling in 1995'
      ],
      correctIndex: 0,
      explanation: 'Dennis Ritchie created C in 1972 at AT&T Bell Laboratories.'
    }
  },
  {
    id: 'c-u1-t2-s2',
    topicId: 'c-u1-t2',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: The Evolutionary Ancestry of C (ALGOL to C)',
    subtitle: 'Evolutionary Timeline Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C did not appear overnight; it evolved through a lineage of languages: ALGOL 60 introduced structured programming, CPL attempted broad utility, BCPL simplified CPL for compilers, B distilled BCPL for early UNIX, and C added data types and powerful operators.',
      definitions: [
        'ALGOL 60 (1960): Introduced block structure and structured programming.',
        'BCPL (1967): Basic Combined Programming Language created by Martin Richards.',
        'B Language (1970): Created by Ken Thompson at Bell Labs; typeless language.'
      ],
      syntax: `C Evolution Timeline:
1960 : ALGOL 60 (International Group)
1963 : CPL (Cambridge & Univ of London)
1967 : BCPL (Martin Richards)
1970 : B Language (Ken Thompson, Bell Labs)
1972 : C Language (Dennis Ritchie, Bell Labs)
1989 : ANSI C (C89 Standard)
1990 : ISO C (International Standard)`,
      realLifeExample: 'Like the evolution of the smartphone: telegraph -> telephone -> mobile phone -> smartphone. Each generation kept the good ideas and solved earlier bottlenecks.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    printf("Evolution: ALGOL 60 -> CPL -> BCPL -> B -> C (1972)\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf(...)', explanation: 'Outputs the chronological evolution path leading to C.' }
      ],
      expectedOutput: `Evolution: ALGOL 60 -> CPL -> BCPL -> B -> C (1972)`,
      pointsToRemember: [
        'Martin Richards designed BCPL in 1967.',
        'Ken Thompson created B in 1970 at Bell Labs.',
        'C solved B\'s limitation by introducing distinct data types (char, int, float).'
      ]
    },
    quiz: {
      question: 'Which direct predecessor language was created by Ken Thompson before C was developed?',
      options: ['B Language', 'BCPL', 'ALGOL', 'Pascal'],
      correctIndex: 0,
      explanation: 'Ken Thompson developed the B language in 1970 at Bell Labs, which directly inspired Dennis Ritchie\'s C.'
    }
  },
  {
    id: 'c-u1-t2-s3',
    topicId: 'c-u1-t2',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Core Features & Why C is the Mother of Languages',
    subtitle: 'Language Architecture Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C is called a "middle-level language" because it bridges high-level procedural syntax (loops, functions, structured blocks) with low-level hardware control (pointers, direct bitwise manipulation, memory addresses).',
      definitions: [
        'Portability: Ability of C programs to run across different computer architectures with little or no change.',
        'Modularity: Organizing code into small, self-contained functions.',
        'Middle-Level: Combining high-level abstractions with low-level assembly-like memory control.'
      ],
      syntax: `Key Features of C:
1. Compact & Simple (Only 32 standard keywords)
2. Ultra-Fast Execution Speed (Compiles directly to machine code)
3. Direct Memory Manipulation (Pointers and memory addresses)
4. Highly Portable across OS and CPU architectures
5. Rich Built-in Library Functions (libc)`,
      realLifeExample: 'A manual sports car: automatic cars (Python/JS) handle gear changes for you, but C gives you direct control of the manual clutch and gearbox for maximum speed and performance!',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int x = 100;
    // Low-level feature: inspecting raw memory address of variable x
    printf("Value of x: %d\\n", x);
    printf("Hardware Memory Address of x: %p\\n", (void*)&x);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int x = 100;', explanation: 'High-level variable declaration.' },
        { line: '&x', explanation: 'Low-level address-of operator retrieving exact RAM byte location.' },
        { line: 'printf("%p", ...)', explanation: 'Prints the hexadecimal memory address.' }
      ],
      expectedOutput: `Value of x: 100\nHardware Memory Address of x: 0x...`,
      pointsToRemember: [
        'C combines high-level structured programming with low-level memory addressing.',
        'C has only 32 standard ANSI keywords.'
      ]
    },
    quiz: {
      question: 'Why is C often referred to as a "middle-level" programming language?',
      options: [
        'Because it combines high-level structured syntax with low-level direct hardware memory manipulation',
        'Because it is of average difficulty to learn',
        'Because it was developed in the middle of the 20th century',
        'Because it can only execute on medium-sized computers'
      ],
      correctIndex: 0,
      explanation: 'C bridges high-level abstraction (functions, control loops) with low-level hardware access (pointers, bit manipulation).'
    }
  },
  {
    id: 'c-u1-t2-s4',
    topicId: 'c-u1-t2',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: 6 Key Real-World Applications of C',
    subtitle: 'Industrial Relevance Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Virtually all foundational modern computing systems rely on C for maximum performance, minimal runtime overhead, and direct silicon access.',
      definitions: [
        'Operating System Kernel: Core layer of an OS managing CPU, RAM, and hardware devices (e.g. Linux kernel).',
        'Embedded Systems: Microcontroller hardware found in cars, medical devices, and satellites.'
      ],
      syntax: `The 6 Major Application Areas of C:
1. Operating Systems        -> UNIX, Linux Kernel, Windows NT Kernel, macOS Darwin
2. Embedded Systems         -> Automotive ECUs, IoT smart devices, Aerospace avionics
3. Compilers & Interpreters -> Python (CPython runtime), GCC, JVM core
4. Databases                -> MySQL, PostgreSQL, SQLite, Oracle backend
5. Game Engines & 3D        -> Physics simulations, graphics pipelines, Unreal Engine core
6. Network Drivers          -> High-throughput routers, TCP/IP network protocol stacks`,
      realLifeExample: 'When you tap an elevator button or brake in a modern car, microcontroller firmware written in C executes in microseconds without freezing.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    printf("C Powers the World:\\n");
    printf("- Linux Kernel & Windows NT\\n");
    printf("- MySQL & PostgreSQL\\n");
    printf("- CPython & V8 JavaScript Engine\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf(...)', explanation: 'Lists world-class software powered by C.' }
      ],
      expectedOutput: `C Powers the World:\n- Linux Kernel & Windows NT\n- MySQL & PostgreSQL\n- CPython & V8 JavaScript Engine`,
      pointsToRemember: [
        'Linux, Windows kernel, and macOS are written predominantly in C.',
        'CPython (the official Python interpreter) is implemented in C.'
      ]
    },
    quiz: {
      question: 'Which of the following major pieces of software is written primarily in C?',
      options: ['The Linux OS Kernel', 'HTML', 'CSS', 'JSON'],
      correctIndex: 0,
      explanation: 'The Linux kernel is written almost entirely in C for performance and hardware control.'
    }
  },
  {
    id: 'c-u1-t2-s5',
    topicId: 'c-u1-t2',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Anatomy of a First C Program',
    subtitle: 'Code Structure Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Every executable C program adheres to a standard anatomy: preprocessor directives (`#include`), the global entry point function (`int main()`), a block enclosed in curly braces `{ }`, and a return statement.',
      definitions: [
        '#include <stdio.h>: Tells the preprocessor to pull in the Standard Input Output header file before compiling.',
        'main(): Mandatory entry point where computer CPU begins program execution.',
        'return 0: Tells the operating system that the program terminated successfully without error.'
      ],
      syntax: `General C Program Skeleton:
#include <stdio.h>  // 1. Preprocessor directive

// 2. Global declarations (optional)

int main(void) {    // 3. Main function entry point
    // 4. Local declarations
    // 5. Executable statements
    return 0;       // 6. Return statement
}                   // 7. Closing brace`,
      realLifeExample: 'Like entering a building through the front door: `main()` is the front door of every C program. The OS enters here and exits through `return 0;`.',
      codeSnippet: `/* Anatomy of a Simple C Program */
#include <stdio.h>

int main(void) {
    // Single-line comment
    /* Multi-line comment:
       printing a welcome banner */
    printf("Welcome to DIT & CODEVIVA C Academy!\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: '#include <stdio.h>', explanation: 'Header inclusion providing printf() prototype.' },
        { line: 'int main(void)', explanation: 'Function signature returning integer to host OS.' },
        { line: 'printf(...)', explanation: 'Library routine streaming characters to console stdout.' },
        { line: 'return 0;', explanation: 'Clean program termination code.' }
      ],
      expectedOutput: `Welcome to DIT & CODEVIVA C Academy!`,
      pointsToRemember: [
        'C statements must end with a semicolon (;).',
        'Curly braces { } define the scope and boundaries of functions and blocks.'
      ]
    },
    quiz: {
      question: 'What is the purpose of "#include <stdio.h>" at the top of a C program?',
      options: [
        'It includes definitions for standard input and output functions like printf and scanf',
        'It tells the computer to turn on the monitor',
        'It executes the main function',
        'It allocates 100MB of RAM'
      ],
      correctIndex: 0,
      explanation: 'stdio.h is the standard I/O header containing prototypes for printf, scanf, and stream handlers.'
    }
  },
  {
    id: 'c-u1-t2-s6',
    topicId: 'c-u1-t2',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 6,
    title: 'Stage 6: Program Development & Execution Pipeline',
    subtitle: 'Compiler Pipeline Level 6',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Turning human-written C source code into running software involves distinct stages: Preprocessor -> Compiler -> Linker -> Loader -> CPU Execution.',
      definitions: [
        'Preprocessor: Expands macros (#define) and includes headers (#include), outputting .i file.',
        'Compiler: Analyzes syntax and translates C code into machine assembly object code (.obj / .o).',
        'Linker: Combines your object code with external system libraries (like libc), producing an executable (.exe).',
        'Loader: Loads executable binary from storage disk into RAM for CPU execution.'
      ],
      syntax: `Software Development Cycle:
1. Problem Definition -> 2. Algorithm & Flowchart -> 3. Coding (.c) ->
4. Compilation (Alt+F9) -> 5. Linking -> 6. Execution (Ctrl+F9) -> 7. Testing & Debugging`,
      realLifeExample: 'An architect blueprints a house (algorithm), writes construction orders (C code), a manufacturing factory builds the pre-fabricated walls (compiler), utility pipes and electricity are connected (linker), and the homeowner moves in (loader & execution).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    printf("Compilation Pipeline:\\n");
    printf("Source (.c) -> Preprocessor (.i) -> Compiler (.obj) -> Linker (.exe) -> CPU!\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf(...)', explanation: 'Demonstrates the sequential stages of the compilation pipeline.' }
      ],
      expectedOutput: `Compilation Pipeline:\nSource (.c) -> Preprocessor (.i) -> Compiler (.obj) -> Linker (.exe) -> CPU!`,
      pointsToRemember: [
        'Turbo C shortcut: Alt + F9 = Compile; Ctrl + F9 = Run.',
        'Linker errors occur when referenced functions or libraries cannot be found.'
      ]
    },
    quiz: {
      question: 'Which tool combines object code (.obj) with library files to create the final executable (.exe)?',
      options: ['Linker', 'Preprocessor', 'Text Editor', 'Assembler'],
      correctIndex: 0,
      explanation: 'The Linker links compiled object modules with runtime system libraries to create the runnable binary.'
    }
  },

  // =========================================================================
  // TOPIC 3: C Character Set, Lexical Tokens & Identifiers -> Stages 1 to 5
  // =========================================================================
  {
    id: 'c-u1-t3-s1',
    topicId: 'c-u1-t3',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: The C Character Set & Escape Whitespace',
    subtitle: 'Lexical Foundations Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The C character set consists of all valid characters that can be used in source code. It includes uppercase and lowercase letters, decimal digits, special symbols, and whitespace characters.',
      definitions: [
        'Letters: A-Z (uppercase) and a-z (lowercase). C is strictly case-sensitive.',
        'Digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.',
        'Special Characters: Punctuation and symbols like , . ; : ? \' " ! | / \\ ~ _ $ % # & * - + < > ( ) [ ] { } ^',
        'Whitespace: Characters that format text: space, tab (\\t), newline (\\n), carriage return (\\r).'
      ],
      syntax: `C Character Set Breakdown:
1. Letters            : A-Z, a-z
2. Digits             : 0-9
3. Special Characters : + - * / = < > ( ) { } [ ] ; : , . " ' _ & | !
4. Whitespace         : ' ', '\\t', '\\n', '\\r', '\\f'`,
      realLifeExample: 'Just as the English alphabet has 26 letters and punctuation marks to construct sentences, C uses its character set to construct tokens and valid instructions.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    char uppercase = 'Z';
    char lowercase = 'z';
    int digit = 9;
    
    // C differentiates between 'Z' and 'z' because their ASCII codes differ
    printf("Uppercase: %c (ASCII %d)\\n", uppercase, uppercase);
    printf("Lowercase: %c (ASCII %d)\\n", lowercase, lowercase);
    printf("Digit    : %d\\n", digit);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'char uppercase = \'Z\';', explanation: 'Z has ASCII value 90.' },
        { line: 'char lowercase = \'z\';', explanation: 'z has ASCII value 122. Proves C case sensitivity.' }
      ],
      expectedOutput: `Uppercase: Z (ASCII 90)\nLowercase: z (ASCII 122)\nDigit    : 9`,
      pointsToRemember: [
        'C is strictly case-sensitive: count, Count, and COUNT are three different identifiers.',
        'Whitespace is ignored by compiler except inside string literals.'
      ]
    },
    quiz: {
      question: 'Is C case-sensitive or case-insensitive when interpreting identifiers and character sets?',
      options: ['Strictly Case-Sensitive', 'Case-Insensitive', 'Only numbers are case-sensitive', 'Only keywords are case-insensitive'],
      correctIndex: 0,
      explanation: 'C is strictly case-sensitive; uppercase and lowercase characters have distinct ASCII values.'
    }
  },
  {
    id: 'c-u1-t3-s2',
    topicId: 'c-u1-t3',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Lexical Tokens – The 6 Atomic Classifications',
    subtitle: 'Lexical Analysis Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'A token is the smallest individual grammatical unit in a C program recognized by the compiler during lexical analysis. Every statement in C is composed of a sequence of tokens.',
      definitions: [
        'Token: The smallest independent lexical element of a C program.',
        'The 6 Token Types: 1. Keywords, 2. Identifiers, 3. Constants, 4. Strings, 5. Special Symbols, 6. Operators.'
      ],
      syntax: `The 6 C Token Classifications:
1. Keywords        : int, return, if, while (Reserved system words)
2. Identifiers     : total, student_name, calculateSum (User-defined names)
3. Constants       : 100, 3.14, 'A' (Fixed values)
4. Strings         : "CODEVIVA", "Hello World" (Literal text in double quotes)
5. Special Symbols : [ ], ( ), { }, ,, ;, *
6. Operators       : +, -, *, /, %, &&, ||, == (Symbols performing operations)`,
      realLifeExample: 'In human language, tokens are individual words, punctuation marks, and numbers that together form a complete sentence.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // Statement: int count = 10;
    // Tokens:
    // 1. int   -> Keyword
    // 2. count -> Identifier
    // 3. =     -> Operator
    // 4. 10    -> Constant
    // 5. ;     -> Special Symbol
    int count = 10;
    printf("Tokens assembled into valid code: count = %d\\n", count);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int count = 10;', explanation: 'Consists of exactly 5 tokens: keyword, identifier, operator, constant, symbol.' }
      ],
      expectedOutput: `Tokens assembled into valid code: count = 10`,
      pointsToRemember: [
        'A token cannot be broken down into smaller meaningful units in C.',
        'Compilers scan programs token-by-token during lexical analysis.'
      ]
    },
    quiz: {
      question: 'How many different classifications of tokens exist in the C programming language?',
      options: ['6 classifications', '3 classifications', '10 classifications', '32 classifications'],
      correctIndex: 0,
      explanation: 'C defines exactly 6 token types: Keywords, Identifiers, Constants, Strings, Special Symbols, and Operators.'
    }
  },
  {
    id: 'c-u1-t3-s3',
    topicId: 'c-u1-t3',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: The 32 Standard ANSI Keywords',
    subtitle: 'Language Vocabulary Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Keywords are words that have fixed, predefined meanings in C. The ANSI standard specifies exactly 32 keywords. All keywords are strictly lowercase and cannot be redefined or used as identifier names.',
      definitions: [
        'Keyword (Reserved Word): A word reserved by the programming language syntax that has a specific meaning to the compiler.'
      ],
      syntax: `The 32 Standard ANSI C Keywords:
Data Types       : char, int, float, double, void, short, long, signed, unsigned
Control Flow     : if, else, switch, case, default, for, while, do, break, continue, goto, return
User-Defined     : struct, union, enum, typedef
Storage Classes  : auto, register, static, extern
Type Qualifiers  : const, volatile
Operator/Size    : sizeof`,
      realLifeExample: 'In law, words like "Plaintiff", "Defendant", or "Subpoena" have specific legal definitions. You cannot rename your pet dog "Subpoena" and expect a courtroom to treat it normally!',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // Correct usage of keywords: int, return
    int totalKeywords = 32;
    printf("ANSI C defines exactly %d reserved keywords.\\n", totalKeywords);
    printf("All 32 keywords are strictly written in lowercase.\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int totalKeywords = 32;', explanation: 'Uses keyword int to declare an integer variable.' }
      ],
      expectedOutput: `ANSI C defines exactly 32 reserved keywords.\nAll 32 keywords are strictly written in lowercase.`,
      pointsToRemember: [
        'There are exactly 32 keywords in ANSI C89/C90.',
        'Keywords are always spelled in lowercase (e.g. while, not While).',
        'Keywords CANNOT be used as variable, function, or array names.'
      ]
    },
    quiz: {
      question: 'Which of the following words is NOT a reserved keyword in C?',
      options: ['integer', 'int', 'float', 'static'],
      correctIndex: 0,
      explanation: '`int` is the reserved keyword; `integer` is not a C keyword and could legally be used as a variable name.'
    }
  },
  {
    id: 'c-u1-t3-s4',
    topicId: 'c-u1-t3',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: Identifiers & The 4 Golden Naming Rules',
    subtitle: 'Naming Standards Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'An identifier is a custom name chosen by the programmer to identify a variable, function, array, or structure. Identifiers must follow strict syntactic rules to be accepted by the C compiler.',
      definitions: [
        'Identifier: User-defined name given to an entity in C.',
        'Rule 1: First character MUST be an alphabet letter (A-Z, a-z) or an underscore (_).',
        'Rule 2: Subsequent characters can be letters, digits (0-9), or underscores (_).',
        'Rule 3: No spaces or special punctuation characters (e.g. $, @, -, #) are permitted.',
        'Rule 4: A keyword cannot be used as an identifier name.'
      ],
      syntax: `Identifier Rules:
Valid First Char      : a-z, A-Z, _
Valid Remaining Chars : a-z, A-Z, 0-9, _
Significant Length    : First 31 characters are significant in ANSI C
Case Sensitivity      : sum != Sum != SUM`,
      realLifeExample: 'Government passport numbers: they follow strict rules (e.g., must start with a letter followed by digits, no blank spaces allowed).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // Valid identifiers following all 4 golden rules:
    int studentAge = 21;
    float _gpa = 3.9f;
    int rank1 = 1;
    
    printf("Age: %d | GPA: %.1f | Rank: %d\\n", studentAge, _gpa, rank1);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int studentAge = 21;', explanation: 'Valid: begins with letter, letters only.' },
        { line: 'float _gpa = 3.9f;', explanation: 'Valid: begins with underscore.' },
        { line: 'int rank1 = 1;', explanation: 'Valid: digits are allowed after the first character.' }
      ],
      expectedOutput: `Age: 21 | GPA: 3.9 | Rank: 1`,
      pointsToRemember: [
        'Identifiers can never start with a digit (e.g. 1stName is invalid).',
        'Underscore (_) is the only valid special character permitted in an identifier.'
      ]
    },
    quiz: {
      question: 'Which of the following is a VALID identifier name in C?',
      options: ['_student_score', '2nd_student', 'student-score', 'float'],
      correctIndex: 0,
      explanation: '`_student_score` starts with an underscore and uses only letters and underscores. `2nd_student` starts with a digit, `student-score` uses a hyphen, and `float` is a keyword.'
    }
  },
  {
    id: 'c-u1-t3-s5',
    topicId: 'c-u1-t3',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Valid vs. Invalid Identifiers Master Table',
    subtitle: 'Syntax Pitfalls Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'To avoid compilation errors, study this comprehensive table comparing valid identifiers with invalid ones and the exact compiler reasons for rejection.',
      definitions: [
        'Compile-time Error: Syntax mistake detected by the compiler preventing executable creation.'
      ],
      syntax: `Comparison Table:
Identifier        Status    Reason
-----------------------------------------------------------
total_sum         VALID     Letters and underscore
_tempValue        VALID     Starts with underscore
student1          VALID     Alphanumeric with trailing digit
MAX_VAL           VALID     Uppercase letters and underscore
1stRank           INVALID   Cannot start with a digit (0-9)
total-marks       INVALID   Hyphen (-) is treated as subtraction operator
student age       INVALID   Spaces are strictly forbidden
char              INVALID   'char' is a reserved ANSI keyword
salary$           INVALID   Dollar sign ($) is an illegal character`,
      realLifeExample: 'Airport baggage tags: tags with valid alphanumeric bar codes pass the scanner; tags with handwritten scribble or unauthorized characters get flagged by security.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int valid_identifier = 100;
    // int 1st_rank = 1;     // UNCOMMENTING CAUSES COMPILER ERROR: invalid suffix on integer constant
    // int student-id = 5;   // UNCOMMENTING CAUSES COMPILER ERROR: expected ';' before '-' token
    
    printf("Identifier verified: %d\\n", valid_identifier);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int valid_identifier = 100;', explanation: 'Compiles cleanly without warnings.' }
      ],
      expectedOutput: `Identifier verified: 100`,
      pointsToRemember: [
        'Hyphens (-) are subtraction operators, not identifier characters.',
        'Never use spaces inside variable names.'
      ]
    },
    quiz: {
      question: 'Why is the identifier "total-cost" rejected by the C compiler?',
      options: [
        'The hyphen (-) is interpreted as the subtraction arithmetic operator',
        'It is longer than 5 characters',
        'It does not start with an uppercase letter',
        'C requires all variable names to be in camelCase'
      ],
      correctIndex: 0,
      explanation: 'In C, `-` is the subtraction operator. The compiler parses `total - cost` as an expression subtracting cost from total.'
    }
  },

  // =========================================================================
  // TOPIC 4: Constants, Variables & Data Types -> Stages 1 to 6
  // =========================================================================
  {
    id: 'c-u1-t4-s1',
    topicId: 'c-u1-t4',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Numeric Constants – Integer & Real/Float Forms',
    subtitle: 'Numeric Literals Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'A constant is a value that cannot be altered during program execution. Numeric constants fall into two classes: Integer constants (whole numbers without decimals) and Real/Floating constants (numbers with decimal points or exponents).',
      definitions: [
        'Decimal Integer: Base 10 numbers using digits 0-9 (e.g. 150, -25).',
        'Octal Integer: Base 8 numbers prefixed with a leading zero `0` (e.g. 037 evaluates to 31 decimal).',
        'Hexadecimal Integer: Base 16 numbers prefixed with `0x` or `0X` (e.g. 0x1F evaluates to 31 decimal).',
        'Exponential Notation: Form `m * 10^e` written as `me` (e.g. 2.1565e2 = 215.65).'
      ],
      syntax: `Integer Constants:
Decimal : 123, -45
Octal   : Starts with 0 (e.g., 077, 012)
Hex     : Starts with 0x or 0X (e.g., 0xFF, 0x1A)

Real Constants:
Fractional  : 3.14159, -0.005
Exponential : 2.5e3 (2.5 * 10^3 = 2500.0)`,
      realLifeExample: 'A clock displays whole integers (3 o\'clock). A kitchen scale displays real numbers (1.25 kg). A scientific calculator writes microscopic cell weights as 1.5e-6 grams.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int dec = 42;
    int oct = 052;     // Octal 52 = (5*8) + 2 = 42 decimal
    int hex = 0x2A;    // Hex 2A = (2*16) + 10 = 42 decimal
    float real = 3.14f;
    double sci = 1.5e3; // 1500.0
    
    printf("Dec: %d | Octal 052: %d | Hex 0x2A: %d\\n", dec, oct, hex);
    printf("Real: %.2f | Scientific 1.5e3: %.1f\\n", real, sci);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int oct = 052;', explanation: 'Leading 0 instructs compiler to interpret digits as base-8 octal.' },
        { line: 'int hex = 0x2A;', explanation: 'Leading 0x instructs compiler to interpret digits as base-16 hexadecimal.' },
        { line: 'double sci = 1.5e3;', explanation: 'Scientific exponential notation multiplying 1.5 by 10^3.' }
      ],
      expectedOutput: `Dec: 42 | Octal 052: 42 | Hex 0x2A: 42\nReal: 3.14 | Scientific 1.5e3: 1500.0`,
      pointsToRemember: [
        'A leading zero (0) makes an integer octal: 015 is decimal 13, NOT decimal 15!',
        'Hexadecimal numbers begin with 0x or 0X.'
      ]
    },
    quiz: {
      question: 'What decimal integer value does the octal constant "012" represent in C?',
      options: ['10', '12', '8', '14'],
      correctIndex: 0,
      explanation: 'In octal, 012 = (1 * 8^1) + (2 * 8^0) = 8 + 2 = 10 in decimal.'
    }
  },
  {
    id: 'c-u1-t4-s2',
    topicId: 'c-u1-t4',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Character vs String Constants & The Null Terminator (\\0)',
    subtitle: 'Textual Constants Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'In C, single characters and strings are fundamentally different in memory. A character constant is enclosed in single quotes and stores a 1-byte integer ASCII code. A string constant is enclosed in double quotes and automatically appends an invisible null terminator character (`\\0`) to mark the end of the string.',
      definitions: [
        'Character Constant: Single character in single quotes (\'A\'). Occupies 1 byte in RAM.',
        'String Constant: Sequence of characters in double quotes ("A"). Occupies 2 bytes in RAM (\'A\' and \'\\0\').',
        'Null Terminator (\\0): ASCII value 0, used by C library functions to detect the end of a string.'
      ],
      syntax: `Character vs String Comparison:
'A'  -> 1 byte in RAM: Stores ASCII integer 65
"A"  -> 2 bytes in RAM: Stores 'A' (65) followed by '\\0' (0)`,
      realLifeExample: 'A single train passenger sitting in seat 12 vs. a train compartment with a passenger followed by a "Train Ends Here" sign.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    char ch = 'A';
    char str[] = "A";
    
    printf("Character 'A': %c (ASCII %d)\\n", ch, ch);
    printf("Size of char 'A' variable: %zu byte\\n", sizeof(ch));
    printf("Size of string \\"A\\" array : %zu bytes (includes '\\\\0')\\n", sizeof(str));
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'char ch = \'A\';', explanation: 'Allocates 1 byte storing ASCII 65.' },
        { line: 'char str[] = "A";', explanation: 'Allocates 2 bytes: str[0]=\'A\', str[1]=\'\\0\'.' },
        { line: 'sizeof(str)', explanation: 'Returns 2 bytes because of the automatic null terminator.' }
      ],
      expectedOutput: `Character 'A': A (ASCII 65)\nSize of char 'A' variable: 1 byte\nSize of string "A" array : 2 bytes (includes '\\0')`,
      pointsToRemember: [
        'Single quotes (\'x\') for single characters.',
        'Double quotes ("x") for string literals.',
        'Every string in C ends with the invisible null character \\0.'
      ]
    },
    quiz: {
      question: 'How many bytes of memory does the string constant "HELLO" occupy in C?',
      options: ['6 bytes', '5 bytes', '4 bytes', '10 bytes'],
      correctIndex: 0,
      explanation: '"HELLO" has 5 characters (H, E, L, L, O) plus 1 byte for the terminating null character (`\\0`), totaling 6 bytes.'
    }
  },
  {
    id: 'c-u1-t4-s3',
    topicId: 'c-u1-t4',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Backslash Escape Sequences Reference Table',
    subtitle: 'Output Formatting Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Escape sequences are special non-printable character combinations starting with a backslash (`\\`) used to control terminal cursor movements, alert beeps, and output formatting.',
      definitions: [
        'Escape Sequence: Two-character combination starting with `\\` that the compiler translates into a single non-printable control character.'
      ],
      syntax: `ANSI C Escape Sequence Table:
Sequence   Meaning / Function
------------------------------------------------------
\\a         Audible Alert (Bell)
\\b         Backspace (Moves cursor back one position)
\\f         Form Feed (Page eject)
\\n         New Line (Moves cursor to beginning of next line)
\\r         Carriage Return (Moves cursor to start of current line)
\\t         Horizontal Tab (Moves cursor to next tab stop)
\\v         Vertical Tab
\\\\         Literal Backslash character (\\)
\\'         Literal Single Quote character (')
\\"         Literal Double Quote character (")
\\?         Literal Question Mark (?)
\\0         Null Character (Terminates strings, ASCII 0)`,
      realLifeExample: 'The Enter key on your keyboard is `\\n` (newline), and the Tab key is `\\t` (horizontal tab).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // Demonstrating \\n, \\t, \\", and \\\\
    printf("Item\\tQty\\tPrice\\n");
    printf("Apple\\t10\\t$1.50\\n");
    printf("She said, \\"Learning C is fun!\\"\\\\\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("Item\\tQty\\tPrice\\n");', explanation: 'Formats headers into aligned columns using horizontal tabs (\\t).' },
        { line: 'She said, \\"...', explanation: 'Uses \\" to print quotation marks without confusing the C compiler.' }
      ],
      expectedOutput: `Item\tQty\tPrice\nApple\t10\t$1.50\nShe said, "Learning C is fun!"\\`,
      pointsToRemember: [
        'To print a backslash itself, you must escape it: \\\\.',
        '\\n moves to the next line; \\t jumps to the next 8-space column tab stop.'
      ]
    },
    quiz: {
      question: 'Which escape sequence produces an audible alert (bell sound) in the console terminal?',
      options: ['\\a', '\\b', '\\bell', '\\alert'],
      correctIndex: 0,
      explanation: '`\\a` represents the audible bell/alert signal in standard C.'
    }
  },
  {
    id: 'c-u1-t4-s4',
    topicId: 'c-u1-t4',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: Variables vs. Constants & Memory Representation',
    subtitle: 'Memory Architecture Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'A variable is a named location in computer memory that holds data that can change during program execution. A constant is an immutable fixed literal. Understanding the difference between a variable\'s name, its stored value, and its physical memory address is critical.',
      definitions: [
        'Variable: A named storage location in RAM whose value can be altered.',
        'L-Value: Location in memory (must be a modifiable variable on left side of assignment).',
        'R-Value: Data value expression (on right side of assignment).'
      ],
      syntax: `Variable vs. Constant Comparison:
Feature          Variable                     Constant
-------------------------------------------------------------
Value Mutation   Can change during run        Cannot change (Fixed)
Memory Storage   Allocated in RAM             Stored in code/literal pool
Address-of (&)   Has valid memory address     No address for literal constants
Example          int count = 5; count = 10;   3.14, 'A', 500`,
      realLifeExample: 'A labeled cardboard storage box: the box label is the Variable Name, the item placed inside the box is the Value, and the warehouse shelf number where the box sits is the Memory Address.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int score = 50;  // initial assignment
    printf("Initial score: %d (Address: %p)\\n", score, (void*)&score);
    
    score = 95;      // variable value modified during run!
    printf("Updated score: %d (Address stays same: %p)\\n", score, (void*)&score);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'score = 95;', explanation: 'Overwrites the previous value (50) in the exact same memory location.' },
        { line: '(void*)&score', explanation: 'Demonstrates that the memory location remains identical while the stored value changes.' }
      ],
      expectedOutput: `Initial score: 50 (Address: 0x...)\nUpdated score: 95 (Address stays same: 0x...)`,
      pointsToRemember: [
        'Variables can be reassigned; constants cannot.',
        'Every variable has a data type, name, value, and memory address.'
      ]
    },
    quiz: {
      question: 'When the value of a variable is updated in C, what happens to its memory address?',
      options: [
        'The memory address remains the same; only the binary content at that address changes',
        'The compiler moves the variable to a completely new memory address',
        'The variable is deleted and recreated',
        'The address becomes NULL'
      ],
      correctIndex: 0,
      explanation: 'A variable represents a fixed memory address; reassigning it simply overwrites the data stored at that address.'
    }
  },
  {
    id: 'c-u1-t4-s5',
    topicId: 'c-u1-t4',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Primary Data Types, Sizing & Ranges (16-bit vs 32-bit)',
    subtitle: 'Type Systems Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C provides 5 fundamental primary data types: `char`, `int`, `float`, `double`, and `void`. Memory allocation and value ranges depend on whether the target machine architecture is 16-bit (e.g. Turbo C) or 32/64-bit (modern GCC/Clang).',
      definitions: [
        'char: Character type, exactly 1 byte (8 bits). Holds ASCII characters.',
        'int: Integer type for whole numbers (2 bytes on 16-bit; 4 bytes on 32-bit).',
        'float: Single-precision floating point, 4 bytes (approx 6 decimal digits precision).',
        'double: Double-precision floating point, 8 bytes (approx 14 decimal digits precision).',
        'void: Empty data type representing no value or empty function parameters.'
      ],
      syntax: `Data Types & Machine Architecture Table:
Type            16-bit Size   32-bit Size   Range (32-bit Architecture)
-------------------------------------------------------------------------
char            1 byte        1 byte        -128 to 127
unsigned char   1 byte        1 byte        0 to 255
int             2 bytes       4 bytes       -2,147,483,648 to 2,147,483,647
unsigned int    2 bytes       4 bytes       0 to 4,294,967,295
short int       2 bytes       2 bytes       -32,768 to 32,767
long int        4 bytes       4 bytes       -2^31 to 2^31 - 1
float           4 bytes       4 bytes       3.4E-38 to 3.4E+38 (6 digits)
double          8 bytes       8 bytes       1.7E-308 to 1.7E+308 (14 digits)
void            0 bytes       0 bytes       Valueless`,
      realLifeExample: 'Different size shipping containers: an envelope (char), a small cardboard box (short int), a large trunk (int), and an intermodal shipping container (double).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    printf("Memory Footprint on this Machine:\\n");
    printf("sizeof(char)   = %zu byte\\n", sizeof(char));
    printf("sizeof(short)  = %zu bytes\\n", sizeof(short));
    printf("sizeof(int)    = %zu bytes\\n", sizeof(int));
    printf("sizeof(long)   = %zu bytes\\n", sizeof(long));
    printf("sizeof(float)  = %zu bytes\\n", sizeof(float));
    printf("sizeof(double) = %zu bytes\\n", sizeof(double));
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'sizeof(type)', explanation: 'Compile-time operator returning memory footprint in bytes.' }
      ],
      expectedOutput: `Memory Footprint on this Machine:\nsizeof(char)   = 1 byte\nsizeof(short)  = 2 bytes\nsizeof(int)    = 4 bytes\nsizeof(long)   = 4 bytes\nsizeof(float)  = 4 bytes\nsizeof(double) = 8 bytes`,
      pointsToRemember: [
        'On legacy 16-bit systems (Turbo C), int is 2 bytes (-32768 to 32767).',
        'On modern 32-bit and 64-bit systems, int is 4 bytes.',
        'Unsigned types can store only non-negative numbers, doubling their positive range.'
      ]
    },
    quiz: {
      question: 'What is the size of standard `int` on a 16-bit architecture (like Turbo C) vs a 32-bit architecture?',
      options: [
        '2 bytes on 16-bit, 4 bytes on 32-bit',
        '4 bytes on 16-bit, 2 bytes on 32-bit',
        '1 byte on 16-bit, 2 bytes on 32-bit',
        'Always 8 bytes on both'
      ],
      correctIndex: 0,
      explanation: 'In 16-bit architectures, integers take 2 bytes (16 bits); in 32-bit and 64-bit systems, integers occupy 4 bytes (32 bits).'
    }
  },
  {
    id: 'c-u1-t4-s6',
    topicId: 'c-u1-t4',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 6,
    title: 'Stage 6: User-Defined Data Types – typedef & enum',
    subtitle: 'Custom Types Level 6',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C allows programmers to define custom type aliases using `typedef` and create named integer sets using `enum` (enumerations), making code significantly cleaner and self-documenting.',
      definitions: [
        'typedef: Keyword used to create an alias or synonym for an existing data type.',
        'enum (Enumeration): User-defined data type consisting of a set of named integer constants.'
      ],
      syntax: `1. typedef Syntax:
typedef existing_type new_type_alias;
Example: typedef unsigned long int ULONG;

2. enum Syntax:
enum TagName { CONST1 = 0, CONST2, CONST3 };
Example: enum TrafficLight { RED, YELLOW, GREEN };`,
      realLifeExample: 'Giving a nickname to a friend: "Alexander" is the official name, but everyone calls him "Alex" (typedef). Or the days of the week: Monday to Sunday (enum).',
      codeSnippet: `#include <stdio.h>

// Type alias: MARKS represents unsigned int
typedef unsigned int MARKS;

// Enumeration: traffic signal states
enum Signal { RED = 1, YELLOW, GREEN };

int main(void) {
    MARKS studentScore = 98;
    enum Signal currentSignal = GREEN; // value 3
    
    printf("Score using typedef: %u\\n", studentScore);
    printf("Signal using enum: %d (1=Red, 2=Yellow, 3=Green)\\n", currentSignal);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'typedef unsigned int MARKS;', explanation: 'Declares MARKS as a synonym for unsigned int.' },
        { line: 'enum Signal { RED = 1, YELLOW, GREEN };', explanation: 'RED=1, YELLOW=2, GREEN=3 automatically numbered.' }
      ],
      expectedOutput: `Score using typedef: 98\nSignal using enum: 3 (1=Red, 2=Yellow, 3=Green)`,
      pointsToRemember: [
        'typedef does not create a brand new type; it creates a readable synonym.',
        'enum elements default to integer numbers starting from 0 unless explicitly initialized.'
      ]
    },
    quiz: {
      question: 'What is the default starting integer value assigned to the first identifier in an enum if not explicitly specified?',
      options: ['0', '1', '-1', 'NULL'],
      correctIndex: 0,
      explanation: 'By default, the C compiler assigns 0 to the first enumerator and increments by 1 for each subsequent member.'
    }
  },

  // =========================================================================
  // TOPIC 5: Declarations, Storage Classes, Modifiers -> Stages 1 to 6
  // =========================================================================
  {
    id: 'c-u1-t5-s1',
    topicId: 'c-u1-t5',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Variable Declaration, Value Assignment & Chained Assignments',
    subtitle: 'Variable Initialization Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Variables must be declared before they can be used. Declaration informs the compiler of the variable name and memory allocation type. Value assignment stores data into the allocated space.',
      definitions: [
        'Declaration: Notifying compiler of variable type and identifier name (e.g. `int x;`).',
        'Initialization: Assigning an initial value at the time of declaration (e.g. `int x = 10;`).',
        'Chained Assignment: Assigning the same value to multiple variables simultaneously (e.g. `a = b = c = 0;`).'
      ],
      syntax: `Syntax Variations:
1. Basic Declaration: data_type var_name;
2. Declaration with Initialization: data_type var = value;
3. Multiple Declarations: data_type v1, v2, v3;
4. Chained Assignment: a = b = c = 0;`,
      realLifeExample: 'Renting a locker: reserving the locker with the facility manager (declaration), putting your backpack inside (initialization), or clearing all lockers to empty (chained assignment).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int x, y, z;
    // Chained assignment
    x = y = z = 50;
    
    printf("Chained Assignment Result:\\n");
    printf("x = %d, y = %d, z = %d\\n", x, y, z);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int x, y, z;', explanation: 'Declares three integer variables.' },
        { line: 'x = y = z = 50;', explanation: 'Evaluates right-to-left: z gets 50, y gets z, x gets y.' }
      ],
      expectedOutput: `Chained Assignment Result:\nx = 50, y = 50, z = 50`,
      pointsToRemember: [
        'Uninitialized local variables contain unpredictable garbage values!',
        'Assignment operator (=) evaluates right-to-left.'
      ]
    },
    quiz: {
      question: 'In what associativity direction does the assignment operator (=) evaluate in C?',
      options: ['Right-to-Left', 'Left-to-Right', 'Top-to-Bottom', 'Arbitrary'],
      correctIndex: 0,
      explanation: 'The assignment operator `=` has right-to-left associativity, meaning `a = b = c = 10` assigns 10 to c, then b, then a.'
    }
  },
  {
    id: 'c-u1-t5-s2',
    topicId: 'c-u1-t5',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Interactive Console Input with scanf() & Address-of (&)',
    subtitle: 'Console Input Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'While printf() displays output, scanf() reads interactive formatted input from the user keyboard. Because scanf must write data directly into the variable\'s RAM location, it requires the address-of operator (`&`).',
      definitions: [
        'scanf(): Standard input library function formatted to read keyboard streams.',
        '& (Address-of Operator): Returns the memory address of a variable.',
        'Format Specifiers: Codes like %d (int), %f (float), %c (char) indicating data type.'
      ],
      syntax: `scanf Syntax:
scanf("format_specifier", &variable_name);
Examples:
scanf("%d", &age);          // integer
scanf("%f", &salary);       // float
scanf("%d %d", &n1, &n2);   // multiple inputs`,
      realLifeExample: 'When ordering an Amazon package, you cannot just tell the courier your name — you must provide your street address (&) so the package can be placed inside your home!',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int age = 20; // Simulated input for safe headless execution
    printf("Demonstrating scanf(&age) principle:\\n");
    printf("Variable value: %d\\n", age);
    printf("Memory address passed to scanf: %p\\n", (void*)&age);
    return 0;
}`,
      lineByLineExplanation: [
        { line: '&age', explanation: 'Retrieves memory pointer passed to scanf() so input can be written into RAM.' }
      ],
      expectedOutput: `Demonstrating scanf(&age) principle:\nVariable value: 20\nMemory address passed to scanf: 0x...`,
      pointsToRemember: [
        'Omitting & in scanf (e.g. scanf("%d", age)) is a major bug leading to segmentation faults.',
        'String arrays (char str[]) do NOT need & because array names already represent memory addresses.'
      ]
    },
    quiz: {
      question: 'Why is the & (address-of) operator mandatory when reading an integer with scanf("%d", &num)?',
      options: [
        'Because scanf needs the physical memory address of num to write user input directly into RAM',
        'Because & converts the number to positive',
        'Because & makes the number run faster',
        'Because the C compiler will not compile any code without &'
      ],
      correctIndex: 0,
      explanation: 'C passes arguments by value. To allow scanf to modify `num`, its actual memory address (`&num`) must be passed.'
    }
  },
  {
    id: 'c-u1-t5-s3',
    topicId: 'c-u1-t5',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Scope & Lifetime: Local vs. Global Variables',
    subtitle: 'Scope Architecture Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Scope defines the region of a program where a variable is accessible. Lifetime defines the duration for which the variable retains its memory allocation during program execution.',
      definitions: [
        'Local Variable: Declared inside a function or block `{ }`. Accessible only within that block; created on stack and destroyed on block exit.',
        'Global Variable: Declared outside of all functions. Accessible throughout the entire source file; allocated in data segment and lives until program terminates.'
      ],
      syntax: `Comparison Table: Local vs Global Variables:
Feature           Local Variable                  Global Variable
------------------------------------------------------------------------
Declaration       Inside a function or block      Outside all functions
Memory Location   Stack RAM frame                 Data Segment RAM
Scope             Limited to declaring block      Entire program
Lifetime          Created on call, destroyed      Created at start, persists
                  on return                       until program ends
Default Value     Indeterminate Garbage value     Zero (0)
Access Collision  Hides global variable of same   Hidden if local name shadows
                  name inside the block`,
      realLifeExample: 'Local currency vs Global currency: Metro transit tokens (local) work only inside one subway station; US Dollars or Gold (global) are accepted everywhere.',
      codeSnippet: `#include <stdio.h>

// Global variable: visible everywhere, initialized to 0
int globalCounter = 0;

void testFunction(void) {
    int localVal = 50; // Local to testFunction
    globalCounter += 10;
    printf("testFunction: localVal=%d | globalCounter=%d\\n", localVal, globalCounter);
}

int main(void) {
    testFunction();
    testFunction();
    // printf("%d", localVal); // COMPILER ERROR: localVal is undefined here!
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int globalCounter = 0;', explanation: 'Global variable declared outside functions; accessible by both functions.' },
        { line: 'int localVal = 50;', explanation: 'Local variable allocated on the stack; inaccessible from main().' }
      ],
      expectedOutput: `testFunction: localVal=50 | globalCounter=10\ntestFunction: localVal=50 | globalCounter=20`,
      pointsToRemember: [
        'Global variables default to 0; local variables default to garbage.',
        'Use local variables wherever possible to minimize unintended side effects.'
      ]
    },
    quiz: {
      question: 'What is the default initial value of an uninitialized global variable in C?',
      options: ['Zero (0)', 'Garbage value', '-1', 'NULL'],
      correctIndex: 0,
      explanation: 'Global variables reside in the data segment (BSS) and are automatically initialized to 0 by the C runtime loader.'
    }
  },
  {
    id: 'c-u1-t5-s4',
    topicId: 'c-u1-t5',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: The 4 Storage Classes in C (auto, register, static, extern)',
    subtitle: 'Memory Storage Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Every variable in C has a storage class that dictates its storage place (RAM stack, CPU register, or data segment), initial default value, visibility scope, and execution lifetime.',
      definitions: [
        'auto: Default for local variables. Stored on stack, garbage default, block scope.',
        'register: Requests compiler to store variable in a high-speed CPU register instead of RAM. Cannot use address-of (&).',
        'static: Retains value across function invocations. Initialized once, persists in data segment, default 0.',
        'extern: Global variable declaration sharing definition across multiple files.'
      ],
      syntax: `The 4 Storage Classes Matrix:
Storage Class   Storage Location    Default Value   Scope          Lifetime
---------------------------------------------------------------------------------
auto            Stack RAM           Garbage         Local Block    Until block exits
register        CPU Register        Garbage         Local Block    Until block exits
static          Data Segment (RAM)  Zero (0)        Local Block    Permanent (program life)
extern          Data Segment (RAM)  Zero (0)        Global/Files   Permanent (program life)`,
      realLifeExample: 'auto is a sticky note thrown away after a task; static is a permanent white-board in an office where tallies persist across meetings!',
      codeSnippet: `#include <stdio.h>

void demoCounters(void) {
    auto int normalCount = 0;
    static int persistentCount = 0;
    
    normalCount++;
    persistentCount++;
    printf("auto: %d | static: %d\\n", normalCount, persistentCount);
}

int main(void) {
    printf("Call 1: "); demoCounters();
    printf("Call 2: "); demoCounters();
    printf("Call 3: "); demoCounters();
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'auto int normalCount = 0;', explanation: 'Re-initialized to 0 on every call; always prints 1.' },
        { line: 'static int persistentCount = 0;', explanation: 'Initialized only once; retains accumulated value across calls (1, 2, 3).' }
      ],
      expectedOutput: `Call 1: auto: 1 | static: 1\nCall 2: auto: 1 | static: 2\nCall 3: auto: 1 | static: 3`,
      pointsToRemember: [
        'static preserves values between function calls.',
        'You CANNOT use & on a register variable (&regVar causes compiler error).',
        'auto is the default storage class for local variables.'
      ]
    },
    quiz: {
      question: 'Which storage class preserves a local variable\'s value between successive calls to the enclosing function?',
      options: ['static', 'auto', 'register', 'volatile'],
      correctIndex: 0,
      explanation: '`static` variables retain their stored values throughout the lifetime of the program across multiple function invocations.'
    }
  },
  {
    id: 'c-u1-t5-s5',
    topicId: 'c-u1-t5',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Defining Symbolic Constants with #define (Rules & Pitfalls)',
    subtitle: 'Preprocessor Macros Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Symbolic constants give meaningful names to fixed constants using the `#define` preprocessor directive. Before compilation, the preprocessor replaces every occurrence of the symbolic constant with its assigned replacement text.',
      definitions: [
        '#define: Preprocessor directive used to define macros and symbolic constants.',
        'Magic Number: Hardcoded numerical literal (e.g. 3.14159) that obscures code meaning and is hard to update.'
      ],
      syntax: `#define Directive Rules:
Syntax: #define CONSTANT_NAME value

Rules:
1. No semicolon (;) at the end of the line!
2. No assignment operator (=) between name and value!
3. By convention, write symbolic constant names in UPPERCASE.
4. Preprocessor performs direct textual substitution before compilation.`,
      realLifeExample: 'Global find-and-replace in Microsoft Word: replacing all instances of "TBD" with "APPROVED" throughout a 500-page document before printing.',
      codeSnippet: `#include <stdio.h>

#define MAX_USERS 500
#define PI 3.14159
#define COLLEGE "CODEVIVA ACADEMY"

int main(void) {
    printf("Institution: %s\\n", COLLEGE);
    printf("Max Users  : %d\\n", MAX_USERS);
    printf("PI Value   : %.5f\\n", PI);
    return 0;
}`,
      lineByLineExplanation: [
        { line: '#define MAX_USERS 500', explanation: 'Replaces all occurrences of MAX_USERS with 500 textually.' },
        { line: 'printf("%d", MAX_USERS);', explanation: 'Preprocessor transforms this into printf("%d", 500); prior to compiling.' }
      ],
      expectedOutput: `Institution: CODEVIVA ACADEMY\nMax Users  : 500\nPI Value   : 3.14159`,
      pointsToRemember: [
        'NEVER put a semicolon at the end of #define (e.g. #define PI 3.14; will break math expressions!).',
        '#define does not allocate memory; it performs pre-compilation text substitution.'
      ]
    },
    quiz: {
      question: 'Why is "#define PI 3.14;" (with a trailing semicolon) an error in C?',
      options: [
        'The preprocessor substitutes "3.14;" verbatim, inserting unexpected semicolons into mathematical expressions',
        'The C compiler forbids the letters P and I together',
        'The semicolon deletes the macro from memory',
        'C only supports constants with capital letters'
      ],
      correctIndex: 0,
      explanation: 'Because `#define` is textual substitution, writing `float area = PI * r * r;` becomes `float area = 3.14; * r * r;`, which is invalid syntax.'
    }
  },
  {
    id: 'c-u1-t5-s6',
    topicId: 'c-u1-t5',
    unitId: 'c-unit-1',
    courseId: 'c',
    stageNumber: 6,
    title: 'Stage 6: Read-Only const & Hardware Memory Safety with volatile',
    subtitle: 'Type Qualifiers Level 6',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The type qualifiers `const` and `volatile` provide fine-grained control over memory mutability and compiler optimization. `const` marks a variable as read-only, while `volatile` alerts the compiler that a variable may change unexpectedly outside the program (e.g. by hardware sensors or interrupt routines).',
      definitions: [
        'const: Type qualifier making a variable immutable (read-only) after initialization.',
        'volatile: Informs compiler that variable value can be altered externally by hardware, disabling CPU register caching optimizations.',
        'volatile const: Read-only hardware register (the program cannot write to it, but hardware can change it).'
      ],
      syntax: `Type Qualifier Syntax:
1. const:
   const data_type var_name = initial_value;
   const float TAX_RATE = 0.08f;
   // TAX_RATE = 0.10f; // ERROR: assignment of read-only variable

2. volatile:
   volatile int hardware_sensor_port;

3. volatile const:
   volatile const int system_timer_register;`,
      realLifeExample: '`const` is a signed contract that cannot be altered. `volatile` is a live weather thermometer outside your window: its value can change anytime due to nature without your software executing an assignment statement!',
      codeSnippet: `#include <stdio.h>

int main(void) {
    const int MAX_SCORE = 100;
    // MAX_SCORE = 105; // COMPILER ERROR if uncommented!
    
    // volatile tells compiler: always read from RAM, never cache in CPU register
    volatile int sensorInput = 42;
    
    printf("Read-only const MAX_SCORE = %d\\n", MAX_SCORE);
    printf("Hardware-monitored volatile sensorInput = %d\\n", sensorInput);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'const int MAX_SCORE = 100;', explanation: 'Type-checked read-only variable enforced by compiler.' },
        { line: 'volatile int sensorInput = 42;', explanation: 'Disables caching; forces CPU to re-read from memory on every access.' }
      ],
      expectedOutput: `Read-only const MAX_SCORE = 100\nHardware-monitored volatile sensorInput = 42`,
      pointsToRemember: [
        '#define is preprocessor text replacement; const is a type-safe variable.',
        'volatile is vital for embedded systems, interrupt service routines (ISR), and memory-mapped hardware I/O.'
      ]
    },
    quiz: {
      question: 'What is the primary effect of qualifying a variable as "volatile" in C?',
      options: [
        'It tells the compiler never to cache the variable in a CPU register because external hardware may modify it',
        'It causes the variable to disappear when the function finishes',
        'It prevents the variable from ever being modified',
        'It encrypts the variable in RAM'
      ],
      correctIndex: 0,
      explanation: '`volatile` informs the compiler that the variable value can change asynchronously outside the program, preventing the optimizer from caching reads in CPU registers.'
    }
  }
];
