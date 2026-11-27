import { Unit, Quiz } from '@/types';

export const cUnit1: Unit = {
  id: 'c-unit-1',
  courseId: 'c',
  unitNumber: 1,
  title: 'Introduction to C Programming',
  description: 'Understand the genesis of procedural programming, program architecture, compilation pipeline, tokens, and fundamental standard I/O.',
  estimatedHours: 4.5,
  quizId: 'quiz-c-1',
  published: true,
  topics: [
    {
      id: 'c-u1-t1',
      unitId: 'c-unit-1',
      courseId: 'c',
      order: 1,
      title: 'Introduction to C, History & Features',
      summary: 'Explore the origin of C by Dennis Ritchie at Bell Labs and why it remains the bedrock of modern systems programming.',
      content: {
        definition: 'C is a general-purpose, procedural computer programming language developed in 1972 by Dennis Ritchie at Bell Telephone Laboratories to develop the UNIX operating system. It provides low-level memory access while maintaining a structured high-level procedural syntax.',
        syntax: '/* Minimal C Program Structure */\n#include <stdio.h>\n\nint main(void) {\n    printf("Welcome to Codeverse!\\n");\n    return 0;\n}',
        codeSnippet: `#include <stdio.h>

int main() {
    printf("Welcome to CODEVERSE C Academy\\n");
    printf("Procedural, Fast, and Hardware-Efficient.\\n");
    return 0;
}`,
        lineByLineExplanation: [
          { line: '#include <stdio.h>', explanation: 'Preprocessor directive instructing the compiler to paste the standard input/output library definitions before compilation.' },
          { line: 'int main()', explanation: 'The mandatory entry-point function where every C program begins execution. Returns an integer exit code to the operating system.' },
          { line: 'printf(...)', explanation: 'Standard library function formatted to output characters directly to the standard output console stream (stdout).' },
          { line: 'return 0;', explanation: 'Terminates main() and returns code 0 to the OS kernel, signaling successful program execution without runtime errors.' }
        ],
        keyConcepts: [
          'High performance and near bare-metal execution speed',
          'Rich set of built-in operators and low-level memory control via pointers',
          'Modularity through reusable user-defined functions',
          'High portability across diverse CPU architectures'
        ],
        commonMistakes: [
          'Forgetting the semicolon (;) at the end of statements',
          'Omitting #include <stdio.h> when calling printf() or scanf()',
          'Case sensitivity errors: c is strictly case sensitive (Main vs main)'
        ],
        quickRevision: [
          'Developed by Dennis Ritchie in 1972 at Bell Labs.',
          'Compiled language: Source code (.c) -> Preprocessed (.i) -> Assembly (.s) -> Object (.o) -> Binary executable.',
          'main() is the execution entry point.'
        ]
      }
    },
    {
      id: 'c-u1-t2',
      unitId: 'c-unit-1',
      courseId: 'c',
      order: 2,
      title: 'Structure of a C Program & Compilation Stages',
      summary: 'Deep dive into the 6 sections of a C program and the 4 phases of compiling source code into native machine code.',
      content: {
        definition: 'A standard C program follows a modular section structure: Documentation section, Link section (#include), Definition section (#define), Global declaration section, main() function section, and Subprogram/user-functions section.',
        syntax: '/* Documentation Section */\n// Link Section\n#include <stdio.h>\n\n// Definition Section\n#define PI 3.14159\n\n// Global Declaration\nint globalCounter = 0;\n\n// Main function\nint main() {\n    // Statements\n    return 0;\n}',
        codeSnippet: `#include <stdio.h>
#define APP_NAME "CODEVERSE"

int sessionCount = 1;

void displayBanner() {
    printf("=== %s ACADEMY ===\\n", APP_NAME);
}

int main() {
    displayBanner();
    printf("Active Session: #%d\\n", sessionCount);
    return 0;
}`,
        lineByLineExplanation: [
          { line: '#define APP_NAME "CODEVERSE"', explanation: 'Macro preprocessor definition that replaces all occurrences of APP_NAME with the string literal prior to compilation.' },
          { line: 'void displayBanner()', explanation: 'Declaration and definition of a custom helper function that performs console printing and returns nothing (void).' },
          { line: 'displayBanner();', explanation: 'Function call from within main() transferring execution control to displayBanner().' }
        ],
        keyConcepts: [
          'Preprocessing: Resolves #include and macros (#define)',
          'Compilation: Translates preprocessed C code into assembly code',
          'Assembly: Converts assembly mnemonics into machine object code (.obj / .o)',
          'Linking: Merges object files with system library code to form the standalone executable'
        ],
        commonMistakes: [
          'Placing a semicolon after #define macros (e.g. #define PI 3.14;)',
          'Calling custom functions before declaring or defining them'
        ],
        quickRevision: [
          'Compilation pipeline: Preprocessor -> Compiler -> Assembler -> Linker.',
          'Macros are expanded textually before compilation.'
        ]
      }
    },
    {
      id: 'c-u1-t3',
      unitId: 'c-unit-1',
      courseId: 'c',
      order: 3,
      title: 'Character Set, Tokens, Keywords & Identifiers',
      summary: 'Master lexical analysis in C: the smallest individual units including keywords, identifiers, constants, strings, and operators.',
      content: {
        definition: 'A token is the smallest individual unit in a C program recognized by the compiler. C tokens include Keywords (32 reserved words), Identifiers (names given to variables/functions), Constants, Strings, Special Symbols, and Operators.',
        syntax: '// Identifier naming rules:\n// 1. Must start with a letter (a-z, A-Z) or underscore (_)\n// 2. Cannot contain spaces or special symbols (@, $, %, etc.)\n// 3. Cannot use C reserved keywords (int, return, for, etc.)\n\nint studentAge = 20; // Valid identifier\nfloat _netScore = 95.5; // Valid identifier',
        codeSnippet: `#include <stdio.h>

int main() {
    // 32 Keywords in standard C89/C99 like: int, float, char, if, else, return
    const int MAX_STUDENTS = 100;
    int roll_number = 1042;
    float marks = 88.5f;

    printf("Roll: %d | Marks: %.1f | Max Capacity: %d\\n", roll_number, marks, MAX_STUDENTS);
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'const int MAX_STUDENTS = 100;', explanation: 'const qualifier creates a read-only variable whose value cannot be altered during execution.' },
          { line: 'int roll_number = 1042;', explanation: 'Declaration of integer identifier roll_number following snake_case naming conventions.' },
          { line: 'float marks = 88.5f;', explanation: 'Single precision 32-bit floating point literal designated with the f suffix.' }
        ],
        keyConcepts: [
          'Total 32 standard ANSI C keywords that cannot be used as variable names',
          'Case sensitivity: score, Score, and SCORE are 3 distinct identifiers',
          'Whitespace characters are ignored by the compiler except within string literals'
        ],
        commonMistakes: [
          'Starting an identifier with a digit (e.g., int 1stNumber = 5;)',
          'Attempting to reassign a const variable'
        ],
        quickRevision: [
          'Tokens: Keywords, Identifiers, Constants, Strings, Operators, Special symbols.',
          'C has 32 standard keywords (auto, break, case, char, const, continue, default, do, double, else, enum, extern, float, for, goto, if, int, long, register, return, short, signed, sizeof, static, struct, switch, typedef, union, unsigned, void, volatile, while).'
        ]
      }
    },
    {
      id: 'c-u1-t4',
      unitId: 'c-unit-1',
      courseId: 'c',
      order: 4,
      title: 'Data Types, Constants & Variables',
      summary: 'Explore primitive data types (int, float, double, char, void), type modifiers, bit widths, and variable initialization.',
      content: {
        definition: 'A data type specifies the classification of data a variable can hold and how many bytes of memory are allocated by the system architecture.',
        syntax: '/* Type Modifiers: short, long, signed, unsigned */\nint a;             // typically 4 bytes (-2B to +2B)\nunsigned int b;    // 4 bytes (0 to 4.29B)\nchar c = \'A\';      // 1 byte (-128 to 127)\nfloat f = 3.14f;   // 4 bytes (6-7 decimal digits)\ndouble d = 3.1415; // 8 bytes (15 decimal digits)',
        codeSnippet: `#include <stdio.h>

int main() {
    printf("Memory Allocation on this Platform:\\n");
    printf("Size of char:        %zu byte\\n", sizeof(char));
    printf("Size of int:         %zu bytes\\n", sizeof(int));
    printf("Size of float:       %zu bytes\\n", sizeof(float));
    printf("Size of double:      %zu bytes\\n", sizeof(double));
    printf("Size of long long:   %zu bytes\\n", sizeof(long long));
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'sizeof(char)', explanation: 'sizeof is a compile-time operator returning the size of an expression or type in bytes.' },
          { line: '%zu format specifier', explanation: 'Correct format specifier for size_t values returned by the sizeof operator.' }
        ],
        keyConcepts: [
          'Primary types: char (1B), int (2B/4B), float (4B), double (8B), void (0B)',
          'Type modifiers: signed, unsigned, short, long',
          'Integer overflow occurs when arithmetic exceeds max storage limit'
        ],
        commonMistakes: [
          'Using single quotes for strings or double quotes for characters (e.g. char c = "A"; is invalid)',
          'Integer division truncation: 5 / 2 evaluates to 2, not 2.5'
        ],
        quickRevision: [
          'char: 1 byte, int: 4 bytes, float: 4 bytes, double: 8 bytes on standard 64-bit systems.',
          'Unsigned variables cannot store negative values but double the positive range.'
        ]
      }
    },
    {
      id: 'c-u1-t5',
      unitId: 'c-unit-1',
      courseId: 'c',
      order: 5,
      title: 'Standard Input & Output: printf() and scanf()',
      summary: 'Master formatted I/O operations, format specifiers, escape sequences, buffer handling, and address-of (&) operator semantics.',
      content: {
        definition: 'printf() and scanf() are standard library functions declared in <stdio.h> for formatted console output and input streams. printf converts binary values to character sequences, while scanf parses character streams into binary variables.',
        syntax: 'printf("format string with specifiers", arg1, arg2, ...);\nscanf("format specifiers", &var1, &var2, ...); // & is address-of',
        codeSnippet: `#include <stdio.h>

int main() {
    int age;
    float gpa;
    char grade;

    printf("Enter student age, GPA and letter grade: ");
    // Note: & is required to pass the memory address
    if (scanf("%d %f %c", &age, &gpa, &grade) == 3) {
        printf("\\n--- Student Summary ---\\n");
        printf("Age:   %d years\\n", age);
        printf("GPA:   %.2f / 4.00\\n", gpa);
        printf("Grade: \'%c\'\\n", grade);
    } else {
        printf("Invalid input format received!\\n");
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'scanf("%d %f %c", &age, &gpa, &grade)', explanation: 'Reads an integer, float, and character from stdin. The & operator passes the variable memory address so scanf can write directly into memory.' },
          { line: 'if (scanf(...) == 3)', explanation: 'scanf returns the count of successfully matched and assigned input items. Checking for 3 guards against invalid user input.' },
          { line: '%.2f', explanation: 'Format modifier specifying a floating point number rendered with exactly two digits after the decimal point.' }
        ],
        keyConcepts: [
          'Format specifiers: %d (int), %f (float), %lf (double), %c (char), %s (string), %p (pointer)',
          'Address-of operator (&): provides the memory location where input data is saved',
          'Common escape sequences: \\n (newline), \\t (tab), \\\\ (backslash), \\" (quote)'
        ],
        commonMistakes: [
          'Forgetting the & symbol in scanf (e.g. scanf("%d", age); triggers undefined behavior or segmentation fault)',
          'Mixing %f and %lf: use %lf for scanning a double, and %f for scanning a float'
        ],
        quickRevision: [
          'printf() writes formatted data to stdout.',
          'scanf() reads formatted data from stdin using memory addresses (&).',
          'Always validate the return value of scanf() in production software.'
        ]
      }
    }
  ]
};

export const cUnit1Quiz: Quiz = {
  id: 'quiz-c-1',
  unitId: 'c-unit-1',
  courseId: 'c',
  unitTitle: 'Unit 1: Introduction to C Programming',
  title: 'Unit 1 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-c1-1',
      question: 'Who developed the C programming language and at what facility?',
      options: [
        'Bjarne Stroustrup at MIT',
        'Dennis Ritchie at Bell Telephone Laboratories',
        'James Gosling at Sun Microsystems',
        'Guido van Rossum at CWI'
      ],
      correctIndex: 1,
      explanation: 'Dennis Ritchie developed C in 1972 at Bell Labs to re-implement and power the UNIX operating system.'
    },
    {
      id: 'q-c1-2',
      question: 'What is the correct sequence of stages in the C compilation process?',
      options: [
        'Preprocessing -> Linking -> Compilation -> Assembly',
        'Compilation -> Assembly -> Preprocessing -> Execution',
        'Preprocessing -> Compilation -> Assembly -> Linking',
        'Assembly -> Preprocessing -> Linking -> Compilation'
      ],
      correctIndex: 2,
      explanation: 'The C pipeline runs Preprocessing (macro expansion, header inclusion) -> Compilation (C to assembly) -> Assembly (assembly to machine object code) -> Linking (resolving library references into executable).'
    },
    {
      id: 'q-c1-3',
      question: 'Which of the following is an INVALID identifier in C?',
      options: [
        '_systemClock',
        'totalSum2024',
        '2ndAttempt',
        'student_record'
      ],
      correctIndex: 2,
      explanation: 'Identifiers in C cannot start with a numerical digit. "2ndAttempt" begins with 2 and is illegal syntax.'
    },
    {
      id: 'q-c1-4',
      question: 'Why is the address-of operator (&) essential in standard scanf() calls for scalar variables?',
      options: [
        'It converts the variable type to string automatically',
        'It allows scanf to allocate new dynamic heap memory',
        'It passes the memory address of the variable so scanf can store the parsed value directly into it',
        'It guarantees that input is encrypted in memory'
      ],
      correctIndex: 2,
      explanation: 'C passes arguments by value. To allow scanf() to modify the caller\'s variable, the caller must pass the variable\'s memory address using &.'
    },
    {
      id: 'q-c1-5',
      question: 'What is the result of evaluating the expression (7 / 2) in C when both operands are integers?',
      options: [
        '3.5',
        '3',
        '4',
        'Compilation Error'
      ],
      correctIndex: 1,
      explanation: 'Integer division in C truncates the fractional part, yielding 3 rather than 3.5.'
    }
  ]
};
