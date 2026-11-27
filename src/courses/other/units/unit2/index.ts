import { Unit, Quiz } from '@/types';

export const otherUnit2: Unit = {
  id: 'other-unit-2',
  courseId: 'other',
  unitNumber: 2,
  title: 'Debugging, Memory Profiling & Tooling',
  description: 'Master systems debugging with GNU Debugger (GDB), Valgrind memory leak detectors, LLVM AddressSanitizer (ASan), and crash dump analysis.',
  estimatedHours: 5.0,
  quizId: 'quiz-other-2',
  published: true,
  topics: [
    {
      id: 'other-u2-t1',
      unitId: 'other-unit-2',
      courseId: 'other',
      order: 1,
      title: 'GNU Debugger (GDB): Breakpoints & Stack Inspection',
      summary: 'Inspect live executing programs, step through assembly, examine variables, and inspect stack frames.',
      content: {
        definition: 'GDB (GNU Project Debugger) is the premier tool for debugging programs written in C, C++, and assembly. It enables developers to pause execution at breakpoints, step instruction by instruction, and inspect register/stack memory states.',
        syntax: '/* Common GDB Command Flow */\ngcc -g program.c -o program  # Compile with debug symbols (-g)\ngdb ./program                # Launch GDB session\n(gdb) break main             # Set breakpoint at main()\n(gdb) run                    # Start execution\n(gdb) print myVar            # Inspect variable\n(gdb) next / step            # Step over / into\n(gdb) backtrace              # View call stack frames',
        codeSnippet: `#include <stdio.h>

void calculateMetrics(int x) {
    int factor = 10;
    int product = x * factor;
    // In GDB: 'print factor' reveals 10, 'backtrace' shows calculateMetrics <- main
    printf("Result: %d\\n", product);
}

int main() {
    int inputVal = 42;
    printf("Starting debuggable program...\\n");
    calculateMetrics(inputVal);
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'gcc -g program.c', explanation: 'The -g flag tells the compiler to emit DWARF debug symbols linking machine addresses back to source code line numbers.' },
          { line: '(gdb) backtrace', explanation: 'Prints the entire active call stack frame trace showing how execution reached the current function.' }
        ],
        keyConcepts: [
          'Compile with -g to include debug symbols and variable names in the binary',
          'Breakpoints pause program flow right before a specific line or function executes',
          'Watchpoints pause execution whenever a specific memory address or variable changes value'
        ],
        commonMistakes: [
          'Debugging an optimized binary compiled with -O3 without -g (compiler optimizes variables into registers or removes them entirely)',
          'Attempting to step through code after a program has already crashed without running under GDB'
        ],
        quickRevision: [
          '-g: generates debug symbols.',
          'break: sets pause point.',
          'backtrace (bt): prints call stack.',
          'step (s): steps into function; next (n): steps over.'
        ]
      }
    },
    {
      id: 'other-u2-t2',
      unitId: 'other-unit-2',
      courseId: 'other',
      order: 2,
      title: 'Valgrind & Memcheck: Eliminating Memory Leaks',
      summary: 'Detect heap leaks, invalid pointer writes, use-after-free errors, and uninitialized memory reads.',
      content: {
        definition: 'Valgrind is an instrumentation framework for building dynamic analysis tools. Its flagship tool, Memcheck, tracks all memory allocations (malloc/new) and frees (free/delete), immediately detecting invalid reads/writes, double frees, and memory leaks.',
        syntax: 'valgrind --leak-check=full --show-leak-kinds=all ./my_program',
        codeSnippet: `#include <stdio.h>
#include <stdlib.h>

void demonstrateCleanAllocation() {
    // Correct memory lifecycle: allocate -> use -> free
    int* numbers = (int*)malloc(5 * sizeof(int));
    if (numbers == NULL) return;

    for (int i = 0; i < 5; i++) {
        numbers[i] = (i + 1) * 10;
    }

    printf("Safely allocated 5 elements. Sum: %d\\n", numbers[0] + numbers[4]);

    // Mandatory cleanup: prevents "definitely lost" memory leak in Valgrind!
    free(numbers);
}

int main() {
    demonstrateCleanAllocation();
    printf("Program finished with 0 memory leaks!\\n");
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'free(numbers);', explanation: 'Releases the allocated heap block back to the OS memory allocator, preventing memory leaks.' },
          { line: '--leak-check=full', explanation: 'Valgrind flag instructing the analyzer to print detailed stack traces for each leaked heap allocation.' }
        ],
        keyConcepts: [
          'Definitely lost: memory leaked with no remaining pointers pointing to it',
          'Invalid read/write: attempting to access memory past allocated array boundaries',
          'Use-after-free: reading or modifying memory after calling free() on it'
        ],
        commonMistakes: [
          'Allocating memory in a loop without freeing previous iterations',
          'Double freeing the same pointer address, which corrupts the heap management metadata'
        ],
        quickRevision: [
          'Valgrind detects leaks and buffer overruns at runtime.',
          'Always pair every malloc() with free() and new with delete.',
          'Valgrind output: "0 errors from 0 contexts" signifies clean memory hygiene.'
        ]
      }
    },
    {
      id: 'other-u2-t3',
      unitId: 'other-unit-2',
      courseId: 'other',
      order: 3,
      title: 'AddressSanitizer (ASan) & Core Dump Analysis',
      summary: 'Fast compile-time memory bug detection and post-mortem crash inspection with core dumps.',
      content: {
        definition: 'AddressSanitizer (ASan) is a fast memory error detector tool built directly into GCC and Clang compilers via -fsanitize=address. It has only ~2x slowdown (much faster than Valgrind\'s 20x) and catches out-of-bounds accesses on stack, global, and heap variables.',
        syntax: 'gcc -fsanitize=address -g program.c -o program\n./program # Crashes with instantaneous detailed trace on memory error',
        codeSnippet: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int safeArray[4] = {10, 20, 30, 40};

    // Safe bounds: valid indices 0 to 3
    printf("Safe access index 2: %d\\n", safeArray[2]);

    // ASan would instantly flag: int invalid = safeArray[10]; (Stack buffer overflow)
    printf("Compiled with -fsanitize=address for zero-defect reliability.\\n");
    return 0;
}`,
        lineByLineExplanation: [
          { line: '-fsanitize=address', explanation: 'Instruments memory accesses with shadow byte checking in compiler-generated assembly.' },
          { line: 'Stack buffer overflow', explanation: 'ASan detects stack and global array bounds violations that Valgrind cannot catch.' }
        ],
        keyConcepts: [
          'ASan detects heap-buffer-overflow, stack-buffer-overflow, and global-buffer-overflow',
          'UndefinedBehaviorSanitizer (-fsanitize=undefined) detects integer overflows and null pointer dereferences',
          'Core dumps: snapshot of program memory at the exact instant of crash, readable in GDB via gdb ./prog core'
        ],
        commonMistakes: [
          'Running with ASan in production without profiling CPU impact',
          'Ignoring core files generated during segmentation faults'
        ],
        quickRevision: [
          '-fsanitize=address catches out-of-bounds and use-after-free fast.',
          'Core dumps allow post-mortem inspection in GDB.',
          'Use ASan in test and debug builds by default.'
        ]
      }
    }
  ]
};

export const otherUnit2Quiz: Quiz = {
  id: 'quiz-other-2',
  unitId: 'other-unit-2',
  courseId: 'other',
  unitTitle: 'Unit 2: Debugging, Memory Profiling & Tooling',
  title: 'Unit 2 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-o2-1',
      question: 'Which compiler flag must be passed to GCC/Clang to generate DWARF debug symbols for GDB inspection?',
      options: ['-O3', '-g', '-Wall', '-shared'],
      correctIndex: 1,
      explanation: '-g instructs the compiler to embed debugging symbols mapping machine instructions back to source lines and variables.'
    },
    {
      id: 'q-o2-2',
      question: 'What type of defect does Valgrind Memcheck flag when dynamic heap memory is allocated with malloc() but never released with free()?',
      options: ['Stack overflow', 'Definitely lost memory leak', 'Deadlock', 'Syntax error'],
      correctIndex: 1,
      explanation: 'When heap memory remains allocated upon program exit with no pointers pointing to it, Valgrind classifies it as "definitely lost".'
    },
    {
      id: 'q-o2-3',
      question: 'Why is LLVM/GCC AddressSanitizer (-fsanitize=address) widely used during test suites instead of Valgrind?',
      options: [
        'Because it runs with only ~2x slowdown and catches stack/global overflows that Valgrind cannot',
        'Because Valgrind only works on Windows',
        'Because ASan requires no compiler support',
        'Because ASan replaces the need for unit tests'
      ],
      correctIndex: 0,
      explanation: 'ASan instruments code directly at compile-time with shadow memory checks, running ~10x faster than Valgrind and catching stack/global bounds violations.'
    }
  ]
};
