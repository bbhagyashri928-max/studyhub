import { Unit, Quiz } from '@/types';

export const cppUnit3: Unit = {
  id: 'cpp-unit-3',
  courseId: 'cpp',
  unitNumber: 3,
  title: 'Looping Statements and Arrays in C++',
  description: 'Comprehensive study of iteration control structures (while, for, do-while, nested loops up to 256 levels), loop control statements (break, continue, goto, return), infinite loops, and array architectures (concept, declaration, contiguous storage representation, initialization, 1D arrays, and 2D matrices).',
  estimatedHours: 6.0,
  quizId: 'quiz-cpp-3',
  published: true,
  topics: [
    {
      id: 'cpp-u3-t1',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 1,
      title: 'Looping Fundamentals & The while Loop (Entry-Controlled)',
      summary: 'Master the concept of iteration, entry-controlled loop mechanics, while loop syntax, condition evaluation, and flow diagrams.',
      content: {
        definition: 'A loop statement allows a set of instructions to be repeatedly executed as long as a specified condition evaluates to true (any non-zero value). The while loop is an entry-controlled loop, meaning it tests the condition BEFORE executing the loop body. If the condition is initially false, the loop body never runs.',
        syntax: 'while (condition) {\n    statement(s);\n}',
        codeSnippet: `#include <iostream>

int main() {
    // Local variable declaration
    int a = 10;

    std::cout << "--- WHILE LOOP EXECUTION ---" << std::endl;

    // while loop repeatedly executes while condition (a < 15) is true
    while (a < 15) {
        std::cout << "value of a: " << a << std::endl;
        a++; // Increment loop control variable
    }

    std::cout << "Loop terminated. Final value of a: " << a << std::endl;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int a = 10;', explanation: 'Initializes loop control variable.' },
          { line: 'while (a < 15)', explanation: 'Entry condition evaluated before each iteration. True if a < 15; false when a reaches 15.' },
          { line: 'std::cout << ...;', explanation: 'Loop body executed while condition remains true.' },
          { line: 'a++;', explanation: 'Crucial increment step to progress toward termination and avoid infinite loops.' }
        ],
        keyConcepts: [
          'Entry-Controlled Nature: The condition is checked at the top before entering the loop body.',
          'Zero-Iteration Possibility: If the condition is false on the very first evaluation, the loop body is skipped entirely.',
          'Condition Evaluation: In C++, any non-zero numeric value evaluates to true; 0 evaluates to false.',
          'Loop Control Variable: Must be updated inside the loop body to ensure the condition eventually becomes false.'
        ],
        commonMistakes: [
          'Forgetting to update the loop control variable (e.g. omitting a++), resulting in an accidental infinite loop.',
          'Placing a semicolon after the while condition (e.g. while (a < 15);), which creates an empty body loop.'
        ],
        quickRevision: [
          'while = Entry-controlled loop.',
          'Tests condition before executing loop body.',
          'May execute 0 times if condition is initially false.'
        ]
      }
    },
    {
      id: 'cpp-u3-t2',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 2,
      title: 'The for Loop & Infinite Loop Constructs',
      summary: 'Explore the 3-part repetition control structure of the for loop, flow of control sequence, and the for(;;) infinite loop idiom.',
      content: {
        definition: 'A for loop is a compact repetition control structure designed to efficiently execute a sequence of statements a predetermined number of times. It combines loop variable initialization, condition checking, and increment/decrement management in a single concise line. Leaving all three expressions empty (for(;;)) creates an intentional infinite loop.',
        syntax: 'for (init; condition; increment) {\n    statement(s);\n}\n\nInfinite Loop Idiom:\nfor ( ; ; ) {\n    // executes indefinitely\n}',
        codeSnippet: `#include <iostream>

int main() {
    std::cout << "--- FOR LOOP EXECUTION ---" << std::endl;

    // for loop: 1-time init (a = 10), condition (a < 15), increment (a = a + 1)
    for (int a = 10; a < 15; a = a + 1) {
        std::cout << "value of a: " << a << std::endl;
    }

    // Demonstrating controlled break from an intentional for(;;) loop
    int count = 1;
    std::cout << "\n--- CONTROLLED for(;;) DEMO ---" << std::endl;
    for ( ; ; ) {
        std::cout << "Cycle iteration: " << count << std::endl;
        count++;
        if (count > 3) break; // Controlled termination
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'for (int a = 10; a < 15; a = a + 1)', explanation: 'Combines initialization, condition testing, and iteration step.' },
          { line: 'Step 1: Init', explanation: 'Executed once at the beginning to declare and initialize control variables.' },
          { line: 'Step 2: Condition', explanation: 'Evaluated before every iteration. If true, body executes; if false, loop exits.' },
          { line: 'Step 3: Increment', explanation: 'Executed immediately after the loop body finishes, before re-testing the condition.' },
          { line: 'for ( ; ; )', explanation: 'When the condition expression is absent, it is assumed true by the compiler, creating an infinite loop.' }
        ],
        keyConcepts: [
          'Flow of Control Sequence:\n  1. Init step: runs once.\n  2. Condition evaluation: if true, executes body; if false, terminates.\n  3. Body execution: runs loop statements.\n  4. Increment step: updates control variables.\n  5. Loops back to step 2.',
          'Optional Expressions: Any or all of the three expressions in for(init; condition; increment) may be omitted, but the two separating semicolons are mandatory.',
          'Infinite Loop Construct: `for(;;)` is the canonical C++ construct to signify an endless loop; when condition is omitted, the compiler treats it as true.'
        ],
        commonMistakes: [
          'Using commas instead of semicolons to separate for-loop expressions (e.g. for (i=0, i<10, i++) causes a syntax error).',
          'Declaring loop variable with the wrong type or shadowing outer variables unintentionally.'
        ],
        quickRevision: [
          'for(init; condition; increment) = Compact 3-part loop.',
          'Init runs once -> Condition -> Body -> Increment -> Condition.',
          'for(;;) = Standard C++ infinite loop idiom.'
        ]
      }
    },
    {
      id: 'cpp-u3-t3',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 3,
      title: 'The do-while Loop (Exit-Controlled Mechanics)',
      summary: 'Understand bottom-tested exit-controlled loops, guaranteed minimum one-time execution, and mandatory semicolon syntax.',
      content: {
        definition: 'Unlike for and while loops which test their condition at the top, the do...while loop checks its condition at the bottom of the loop body. Because the condition is tested after the body executes, a do...while loop is guaranteed to execute at least one time, even if the condition is false from the start.',
        syntax: 'do {\n    statement(s);\n} while (condition); // Notice the required terminating semicolon!',
        codeSnippet: `#include <iostream>

int main() {
    int a = 10;

    std::cout << "--- DO-WHILE LOOP EXECUTION ---" << std::endl;

    // Executes body FIRST, then evaluates condition at the bottom
    do {
        std::cout << "value of a: " << a << std::endl;
        a = a + 1;
    } while (a < 15);

    // Demonstration of guaranteed single execution with initially false condition:
    int x = 50;
    std::cout << "\n--- GUARANTEED AT LEAST ONCE DEMO ---" << std::endl;
    do {
        std::cout << "This line runs even though condition (x < 10) is FALSE! x = " << x << std::endl;
    } while (x < 10);

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'do { ... }', explanation: 'Marks the start of the exit-controlled loop block.' },
          { line: 'std::cout << "value of a: " << a;', explanation: 'Statements inside the body execute immediately on the first pass without condition checking.' },
          { line: 'a = a + 1;', explanation: 'Updates control variable.' },
          { line: '} while (a < 15);', explanation: 'Condition tested at the bottom. If true, control jumps back up to do; if false, loop finishes. Note the semicolon.' }
        ],
        keyConcepts: [
          'Exit-Controlled Nature: Condition is tested at the end of the loop body.',
          'Guaranteed Execution: Always executes at least once, making it ideal for user input validation and menus.',
          'Terminating Semicolon: A do...while statement MUST end with a semicolon after the closing parenthesis: `while (condition);`.',
          'Loop Selection Guideline:\n  • Use `for` when iteration count is known in advance.\n  • Use `while` when iteration depends on an external condition that may never occur.\n  • Use `do...while` when the loop body must execute at least once (e.g. interactive menus).'
        ],
        commonMistakes: [
          'Forgetting the semicolon at the end of `while(condition);`.',
          'Assuming a do...while loop can be skipped on the first iteration.'
        ],
        quickRevision: [
          'do...while = Exit-controlled loop.',
          'Guaranteed to execute at least once.',
          'Mandatory semicolon at the end: } while (condition);.'
        ]
      }
    },
    {
      id: 'cpp-u3-t4',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 4,
      title: 'Nested Loops & Algorithmic Complexity',
      summary: 'Explore nesting loops within loops (up to 256 levels in ISO C++), coordinate grid iteration, and the prime number finding algorithm.',
      content: {
        definition: 'A nested loop is a loop statement placed inside the body of another loop. In a nested structure, for every single iteration of the outer loop, the inner loop executes its complete cycle from start to finish. C++ standard specifies that compilers must support at least 256 levels of loop nesting.',
        syntax: 'Nested for Loop:\nfor (init; condition; increment) {\n    for (init; condition; increment) {\n        statement(s);\n    }\n}\n\nNested while Loop:\nwhile (cond1) {\n    while (cond2) {\n        statement(s);\n    }\n}',
        codeSnippet: `#include <iostream>

int main() {
    std::cout << "--- PRIME NUMBERS FROM 2 TO 30 (NESTED FOR LOOPS) ---" << std::endl;

    int i, j;
    // Outer loop tests numbers from 2 to 30
    for (i = 2; i <= 30; i++) {
        // Inner loop checks for factors from 2 up to sqrt(i)
        for (j = 2; j <= (i / j); j++) {
            if (!(i % j)) {
                break; // Factor found, i is not prime
            }
        }
        // If no factors were found, j exceeded (i/j), confirming prime
        if (j > (i / j)) {
            std::cout << i << " ";
        }
    }

    std::cout << std::endl;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'for (i = 2; i <= 30; i++)', explanation: 'Outer loop iterating through potential prime candidate numbers.' },
          { line: 'for (j = 2; j <= (i / j); j++)', explanation: 'Inner loop testing potential divisors up to the square root of i.' },
          { line: 'if (!(i % j)) break;', explanation: 'If j evenly divides i, break terminates the INNER loop immediately.' },
          { line: 'if (j > (i / j)) cout << i;', explanation: 'If the inner loop completed without finding a divisor, i is a prime number.' }
        ],
        keyConcepts: [
          'Execution Order: The inner loop completes all its iterations before the outer loop advances to its next step.',
          'Algorithmic Complexity: Nesting loops multiplies total iterations (e.g. an outer loop of N and inner loop of M executes N * M times, giving O(N*M) time complexity).',
          'Nesting Limit: ISO C++ standards require compilers to support at least 256 levels of loop nesting.',
          'Flexibility: Any type of loop can be nested inside any other type (e.g. while inside for, do...while inside while).'
        ],
        commonMistakes: [
          'Accidentally reusing the same loop control variable in both outer and inner loops (e.g. using `i` for both loops corrupts state).',
          'Over-nesting loops causing performance bottlenecks (O(N^3) or O(N^4) operations on large datasets).'
        ],
        quickRevision: [
          'Inner loop completes fully for each single step of the outer loop.',
          'Total iterations = Outer count * Inner count.',
          'C++ allows at least 256 levels of loop nesting.',
          'Always use distinct variable names (e.g. i, j, k).'
        ]
      }
    },
    {
      id: 'cpp-u3-t5',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 5,
      title: 'Loop Control Statements: break, continue, goto & return',
      summary: 'Master control transfer statements to alter normal linear execution sequence, scope cleanup rules, and breaking deeply nested loops.',
      content: {
        definition: 'Loop control statements alter execution from its normal sequential flow. C++ supports break (terminates loop/switch immediately), continue (skips remainder of current iteration and retests condition), goto (unconditional jump to a labeled statement), and return (exits the enclosing function). When execution leaves a scope, all automatic local objects created in that scope are destroyed.',
        syntax: '• break;            // Terminates innermost loop or switch\n• continue;         // Skips to next iteration\n• goto label_name;  // Unconditional jump to label:\n• return value;     // Exits function returning value',
        codeSnippet: `#include <iostream>

int main() {
    // 1. break statement demonstration
    std::cout << "--- BREAK STATEMENT (Stops at a = 13) ---" << std::endl;
    for (int a = 10; a < 20; a++) {
        if (a == 13) {
            break; // Exits the loop entirely
        }
        std::cout << "a: " << a << " ";
    }
    std::cout << std::endl;

    // 2. continue statement demonstration
    std::cout << "\n--- CONTINUE STATEMENT (Skips a = 13) ---" << std::endl;
    for (int a = 10; a < 16; a++) {
        if (a == 13) {
            continue; // Skips printing 13 and jumps to a++
        }
        std::cout << "a: " << a << " ";
    }
    std::cout << std::endl;

    // 3. goto statement: Breaking out of deeply nested loops
    std::cout << "\n--- GOTO TO ESCAPE DEEPLY NESTED LOOPS ---" << std::endl;
    for (int r = 1; r <= 5; r++) {
        for (int c = 1; c <= 5; c++) {
            if (r == 3 && c == 3) {
                goto emergency_exit; // Jumps cleanly out of both loops
            }
        }
    }

emergency_exit:
    std::cout << "Cleanly jumped out of nested loops via labeled jump." << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'if (a == 13) break;', explanation: 'Terminates the for loop immediately; control jumps to the statement after the loop.' },
          { line: 'if (a == 13) continue;', explanation: 'Skips the rest of the loop body for a=13 and jumps directly to the increment step (a++).' },
          { line: 'goto emergency_exit;', explanation: 'Performs an unconditional jump to the labeled statement emergency_exit:.' },
          { line: 'emergency_exit:', explanation: 'Target label identifier followed by a colon (:).' }
        ],
        keyConcepts: [
          'break: Terminates the loop or switch statement immediately. In nested loops, break only terminates the innermost loop enclosing it.',
          'continue: Skips the remaining statements in the current iteration:\n  • In `for` loops, jumps directly to the increment step, then evaluates condition.\n  • In `while` and `do...while` loops, passes control directly to the conditional test.',
          'goto Statement:\n  • Syntax: `goto label; ... label: statement;`.\n  • Highly discouraged in standard programming because it makes control flow hard to trace (spaghetti code).\n  • Only accepted engineering use case: Breaking out of deeply nested multi-level loops where a single `break` cannot exit.',
          'return Statement: Exits the current function immediately and passes control back to the caller.',
          'Automatic Object Destruction: When execution leaves a block scope via break, continue, goto, or return, C++ automatically calls destructors for all local objects created in that scope.'
        ],
        commonMistakes: [
          'Confusing break with continue (break ends the loop; continue only skips to the next iteration).',
          'Expecting break to exit multiple nested loops at once (break only exits the single innermost loop).'
        ],
        quickRevision: [
          'break = Terminate loop or switch completely.',
          'continue = Skip rest of current iteration and proceed to next.',
          'goto = Unconditional jump to a label: (use only for multi-level loop exits).',
          'return = Exit function.'
        ]
      }
    },
    {
      id: 'cpp-u3-t6',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 6,
      title: 'Introduction to Arrays: Concept, Declaration & Contiguous Memory Storage',
      summary: 'Understand the array data structure, element indexing from base index 0, declaration rules, and contiguous memory layout.',
      content: {
        definition: 'An array is a fixed-size, sequential collection of elements of the same data type stored in contiguous (adjacent) memory locations. Instead of declaring individual variables (such as num0, num1, ..., num99), an array allows declaring one collection variable accessed via zero-based indices (num[0], num[1], ..., num[99]).',
        syntax: 'type arrayName[arraySize];\n\nRules:\n• arraySize must be an integer constant greater than zero\n• type can be any valid C++ data type (built-in or user-defined)\n• Elements are stored at contiguous physical memory addresses\n• Lowest address corresponds to first element (index 0 / base index)\n• Highest address corresponds to last element (index arraySize - 1)',
        codeSnippet: `#include <iostream>

int main() {
    // Declaring a 5-element double array called balance
    double balance[5];

    // Assigning values via 0-based indices
    balance[0] = 1000.0;
    balance[1] = 2.0;
    balance[2] = 3.4;
    balance[3] = 17.0;
    balance[4] = 50.0; // 5th element is at index 4 (base index is 0)

    std::cout << "--- CONTIGUOUS ARRAY STORAGE IN MEMORY ---" << std::endl;
    for (int i = 0; i < 5; i++) {
        std::cout << "balance[" << i << "] = " << balance[i]
                  << " | Memory Address: " << &balance[i] << std::endl;
    }

    // Accessing an individual element
    double salary = balance[0];
    std::cout << "\nAccessed salary (balance[0]): $" << salary << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'double balance[5];', explanation: 'Allocates memory for 5 consecutive double values (5 * 8 bytes = 40 bytes total).' },
          { line: 'balance[0] = 1000.0;', explanation: 'Assigns value to first element at index 0 (base index).' },
          { line: 'balance[4] = 50.0;', explanation: 'Assigns value to 5th (last) element at index 4.' },
          { line: '&balance[i]', explanation: 'Address-of operator showing contiguous sequential memory layout.' }
        ],
        keyConcepts: [
          'Fixed Size: Once declared, array capacity cannot dynamically grow or shrink in standard C++.',
          'Contiguous Memory Layout: Elements are stored sequentially in memory. The memory address of element i is: `Base Address + (i * sizeof(DataType))`.',
          'Zero-Based Indexing: Array indexing always begins at 0 (base index) and ends at `size - 1`.',
          'Subscript Operator ([]): Used after the array name to access or assign individual elements (`balance[2]`).'
        ],
        commonMistakes: [
          'Off-By-One Errors: Accessing `balance[5]` on a 5-element array (valid indices are 0 to 4; index 5 causes out-of-bounds memory access).',
          'Declaring array size with a non-constant variable in standard C++ (e.g. `int n; cin >> n; int arr[n];` is not standard ISO C++).'
        ],
        quickRevision: [
          'Array = Contiguous, fixed-size collection of identical types.',
          '0-indexed: First element is arr[0]; last is arr[size - 1].',
          'Memory address = Base + Index * ElementSize.'
        ]
      }
    },
    {
      id: 'cpp-u3-t7',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 7,
      title: 'Array Initialization, Traversal & Memory Formatting',
      summary: 'Master array initialization syntaxes (bracketed lists, omitted sizes), traversal algorithms, and formatted tabular output using setw.',
      content: {
        definition: 'Arrays can be initialized element-by-element or in a single statement using an initializer list enclosed in braces {}. If size is omitted during declaration with an initializer list, the compiler automatically sizes the array to fit the supplied values. Unspecified trailing elements in partial initializers are automatically zero-initialized.',
        syntax: 'Full Initialization:\ntype arr[5] = { val1, val2, val3, val4, val5 };\n\nOmitted Size (Compiler Inferred):\ntype arr[] = { val1, val2, val3, val4, val5 };\n\nPartial Initialization (Remaining Zero-filled):\ntype arr[5] = { 10, 20 }; // arr[2], arr[3], arr[4] become 0',
        codeSnippet: `#include <iostream>
#include <iomanip> // For std::setw formatting

int main() {
    // 1. Initializing array of 10 integers via loop
    int n[10];

    for (int i = 0; i < 10; i++) {
        n[i] = i + 100; // set element at location i to i + 100
    }

    // 2. Formatted tabular output using setw
    std::cout << std::setw(7) << "Element" << std::setw(13) << "Value" << std::endl;
    std::cout << "--------------------" << std::endl;

    for (int j = 0; j < 10; j++) {
        std::cout << std::setw(7) << j << std::setw(13) << n[j] << std::endl;
    }

    // 3. Array name decay to pointer
    std::cout << "\nArray name \'n\' acts as pointer to first element: " << n << std::endl;
    std::cout << "First element value (*n): " << *n << std::endl;
    std::cout << "Second element value *(n + 1): " << *(n + 1) << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int n[10];', explanation: 'Declares uninitialized 10-element integer array.' },
          { line: 'n[i] = i + 100;', explanation: 'Populates array elements via standard for loop.' },
          { line: 'std::setw(7) << j << std::setw(13) << n[j]', explanation: 'Formats output columns with specific widths using setw from <iomanip>.' },
          { line: '*n and *(n + 1)', explanation: 'Demonstrates pointer arithmetic: array name n decays to a pointer to its first element (&n[0]).' }
        ],
        keyConcepts: [
          'Initializer List: The number of elements inside braces `{}` cannot exceed the declared array size.',
          'Omitted Size Syntax: `double balance[] = {1000.0, 2.0, 3.4, 17.0, 50.0};` creates an array of exactly 5 elements.',
          'Partial Initialization: If fewer elements are provided than the array capacity, the compiler automatically sets all remaining elements to zero.',
          'Array Name as Pointer: In expressions, the name of an array decays into a constant pointer to its first element (`arr == &arr[0]`). Thus, `arr[i]` is identical to `*(arr + i)`.',
          'Output Formatting: `setw(width)` from `<iomanip>` right-aligns output numbers in clean tabular grids.'
        ],
        commonMistakes: [
          'Providing more initializer values than the declared array size (causes a compile-time error).',
          'Attempting to reassign an array name like a regular pointer (e.g. `arr = ptr;` is illegal because array names are constant pointers).'
        ],
        quickRevision: [
          'arr[] = {1, 2, 3} automatically infers size 3.',
          'Partial initialization zeroes out remaining elements.',
          'Array name decays to pointer to first element: arr[i] == *(arr + i).'
        ]
      }
    },
    {
      id: 'cpp-u3-t8',
      unitId: 'cpp-unit-3',
      courseId: 'cpp',
      order: 8,
      title: 'Multi-Dimensional & Two-Dimensional (2D) Arrays',
      summary: 'Master multi-dimensional array declarations, 2D matrix row-column tables, row-major storage representation, and nested loop traversal.',
      content: {
        definition: 'C++ allows multi-dimensional arrays, which are arrays of arrays. The simplest and most widely used form is the Two-Dimensional (2D) array, conceptually visualized as a table or matrix consisting of rows and columns. In physical memory, 2D arrays are stored contiguously in Row-Major order.',
        syntax: 'General Multidimensional Syntax:\ntype name[size1][size2]...[sizeN];\n\nTwo-Dimensional (2D) Array Syntax:\ntype arrayName[rows][columns];\n\nInitialization with Nested Braces:\ntype a[3][4] = {\n    {0, 1, 2, 3},   // Row 0\n    {4, 5, 6, 7},   // Row 1\n    {8, 9, 10, 11}  // Row 2\n};\n\nFlat Initialization:\ntype a[3][4] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11};',
        codeSnippet: `#include <iostream>

int main() {
    // Array with 5 rows and 2 columns
    int a[5][2] = {
        {0, 0},
        {1, 2},
        {2, 4},
        {3, 6},
        {4, 8}
    };

    std::cout << "--- 2D ARRAY (MATRIX) ROW-COLUMN TRAVERSAL ---" << std::endl;

    // Outer loop traverses rows (i = 0 to 4)
    for (int i = 0; i < 5; i++) {
        // Inner loop traverses columns (j = 0 to 1)
        for (int j = 0; j < 2; j++) {
            std::cout << "a[" << i << "][" << j << "]: " << a[i][j] << "  ";
        }
        std::cout << std::endl;
    }

    // Accessing individual element: row index 3, column index 1
    int val = a[3][1];
    std::cout << "\nDirectly accessed a[3][1]: " << val << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int a[5][2] = { ... };', explanation: 'Declares a 2D array of 5 rows and 2 columns (10 total integer elements).' },
          { line: 'for (int i = 0; i < 5; i++)', explanation: 'Outer loop iterating through row index subscripts i.' },
          { line: 'for (int j = 0; j < 2; j++)', explanation: 'Inner loop iterating through column index subscripts j.' },
          { line: 'cout << a[i][j];', explanation: 'Subscript notation a[i][j] accesses element at row i, column j.' },
          { line: 'int val = a[3][1];', explanation: 'Accesses 4th row (index 3), 2nd column (index 1), which holds value 6.' }
        ],
        keyConcepts: [
          '2D Array Concept: A 2D array is essentially a list of 1D arrays, viewed as a matrix of rows and columns.',
          'Row-Major Storage Order: In C++, 2D arrays are stored sequentially row-by-row in linear physical memory: all elements of Row 0 first, followed by Row 1, Row 2, etc.',
          'Element Address Calculation: In a 2D array `type a[R][C]`, the memory location of element `a[i][j]` is: `Base Address + (i * C + j) * sizeof(Type)`.',
          'Initialization Styles: Nested row braces `{ {row0}, {row1} }` enhance readability, but a single continuous flat list `{val0, val1, ...}` is equivalent.',
          'Accessing Elements: Dual indices `a[row_index][col_index]` where row_index is $0$ to $rows - 1$ and col_index is $0$ to $cols - 1$.'
        ],
        commonMistakes: [
          'Confusing row and column index order (writing `a[col][row]` instead of `a[row][col]`).',
          'Omitting column size when passing multidimensional arrays to functions (the column dimension must always be specified so the compiler can compute row offsets).'
        ],
        quickRevision: [
          '2D array = Matrix table: type arr[rows][cols].',
          'Stored in Row-Major order in contiguous memory.',
          'Access via dual subscripts: arr[row][col].',
          'Traversal requires nested for loops.'
        ]
      }
    }
  ]
};

export const cppUnit3Quiz: Quiz = {
  id: 'quiz-cpp-3',
  unitId: 'cpp-unit-3',
  courseId: 'cpp',
  unitTitle: 'Unit 3: Looping Statements and Arrays in C++',
  title: 'Unit 3 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-cpp3-1',
      question: 'How does a do...while loop differ fundamentally from for and while loops in C++?',
      options: [
        'It cannot be nested inside another loop',
        'It tests its condition at the bottom of the loop body and is guaranteed to execute at least once',
        'It can only iterate using integer counters',
        'It terminates automatically after 10 iterations'
      ],
      correctIndex: 1,
      explanation: 'Unlike for and while (which test at the top), do...while checks its condition at the bottom, guaranteeing at least one execution.'
    },
    {
      id: 'q-cpp3-2',
      question: 'Which C++ construct is standard idiom for creating an intentional infinite loop?',
      options: [
        'for ( ; ; )',
        'loop (infinite)',
        'repeat (always)',
        'while (false)'
      ],
      correctIndex: 0,
      explanation: 'When the condition expression in for(;;) is omitted, C++ compilers assume it to be true, creating an infinite loop.'
    },
    {
      id: 'q-cpp3-3',
      question: 'What is the minimum level of loop nesting that compliant C++ compilers are required to support?',
      options: [
        '16 levels',
        '32 levels',
        '64 levels',
        '256 levels'
      ],
      correctIndex: 3,
      explanation: 'The ISO C++ standard specifies that compilers must allow at least 256 levels of loop nesting.'
    },
    {
      id: 'q-cpp3-4',
      question: 'What does the continue statement do when executed inside a for loop?',
      options: [
        'Terminates the program immediately',
        'Exits the loop and jumps to the statement following the loop',
        'Skips the rest of the loop body and jumps directly to the increment step',
        'Resets the loop counter back to zero'
      ],
      correctIndex: 2,
      explanation: 'In a for loop, continue skips any remaining code in the loop body and transfers control directly to the increment step, then tests the condition.'
    },
    {
      id: 'q-cpp3-5',
      question: 'What is the legitimate engineering use case for a goto statement in modern C++?',
      options: [
        'To replace all while loops',
        'To exit cleanly from deeply nested multi-level loops where a simple break only exits the innermost loop',
        'To jump between different functions',
        'To allocate memory on the heap'
      ],
      correctIndex: 1,
      explanation: 'A simple break statement only terminates the innermost loop; goto can jump out of deeply nested multi-level loops to a single labeled cleanup statement.'
    },
    {
      id: 'q-cpp3-6',
      question: 'How are array elements stored in physical computer memory?',
      options: [
        'Randomly distributed across fragmented blocks',
        'In contiguous, sequential memory locations where the lowest address belongs to index 0',
        'In a linked list structure',
        'In CPU registers only'
      ],
      correctIndex: 1,
      explanation: 'All arrays in C++ are stored in contiguous (adjacent) sequential memory locations, with index 0 located at the base address.'
    },
    {
      id: 'q-cpp3-7',
      question: 'If you declare: "double balance[5] = {1000.0, 2.0};", what values do balance[2], balance[3], and balance[4] hold?',
      options: [
        'Garbage values',
        '0.0 (automatically zero-initialized)',
        '1000.0 (copies first element)',
        'The code causes a compiler error'
      ],
      correctIndex: 1,
      explanation: 'In C++, partial array initialization automatically sets all remaining unspecified elements to zero.'
    },
    {
      id: 'q-cpp3-8',
      question: 'In a 2D array "int a[3][4];", what order are elements arranged in physical memory?',
      options: [
        'Column-Major order',
        'Row-Major order (all elements of Row 0, then Row 1, then Row 2)',
        'Diagonal order',
        'Hashed order'
      ],
      correctIndex: 1,
      explanation: 'C++ stores multidimensional arrays in Row-Major order, storing elements sequentially row by row in contiguous memory.'
    }
  ]
};
