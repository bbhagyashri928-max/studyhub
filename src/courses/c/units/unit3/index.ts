import { Unit, Quiz } from '@/types';

export const cUnit3: Unit = {
  id: 'c-unit-3',
  courseId: 'c',
  unitNumber: 3,
  title: 'Control Flow',
  description: 'Master program decision making, two-way and multi-way branching (Simple If, If-Else, Else-If Ladder, Switch, Goto), entry-controlled and exit-controlled looping constructs (While, Do-While, For), jump statements (Break, Continue), pattern printing, and interactive case studies.',
  estimatedHours: 8.0,
  quizId: 'quiz-c-3',
  published: true,
  topics: [
    {
      id: 'c-u3-t1',
      unitId: 'c-unit-3',
      courseId: 'c',
      order: 1,
      title: 'Decision Making & Branching: Simple If, If-Else & Nested If Statements',
      summary: 'Direct CPU control flow conditionally using simple one-way if checks, two-way if-else alternatives, and nested hierarchical validation.',
      content: {
        definition: 'Decision Making constructs alter sequential program execution based on whether a boolean condition evaluates to True (non-zero) or False (zero). In C, control flow statements allow programs to choose alternate execution paths. The Simple If statement executes a statement block only if its condition is true. The If-Else statement provides an alternate false-block that executes whenever the condition evaluates to false. Nested If-Else statements embed one conditional check inside another to handle multi-tiered decisions.',
        syntax: `// 1. Simple If Statement (One-way decision):
if (condition) {
    // Statement-block executed only if condition is True (non-zero)
}

// 2. If-Else Statement (Two-way decision):
if (condition) {
    // True-block statements executed if condition evaluates to True
} else {
    // False-block statements executed if condition evaluates to False
}

// 3. Nested If-Else:
if (condition1) {
    if (condition2) {
        // Executed only when BOTH condition1 and condition2 are True
    } else {
        // Executed when condition1 is True, but condition2 is False
    }
} else {
    // Executed when condition1 is False
}`,
        codeSnippet: `#include <stdio.h>

int main(void) {
    // --- 1. Simple If: Voting Eligibility Check ---
    int age = 19;
    printf("--- 1. Simple If: Voting Eligibility ---\\n");
    if (age >= 18) {
        printf("Candidate age is %d: Eligible to vote!\\n", age);
    }

    // --- 2. If-Else: Even or Odd Number Classifier ---
    int number = 47;
    printf("\\n--- 2. If-Else: Parity Classifier ---\\n");
    if (number % 2 == 0) {
        printf("%d is an EVEN number.\\n", number);
    } else {
        printf("%d is an ODD number.\\n", number);
    }

    // --- 3. Nested If-Else: Number Sign Classifier (+ / - / 0) ---
    int val = -15;
    printf("\\n--- 3. Nested If-Else: Sign Classification ---\\n");
    if (val != 0) {
        if (val > 0) {
            printf("%d is POSITIVE.\\n", val);
        } else {
            printf("%d is NEGATIVE.\\n", val);
        }
    } else {
        printf("The value is ZERO.\\n");
    }

    // --- 4. Leap Year Complex Condition ---
    int year = 2024;
    printf("\\n--- 4. Leap Year Evaluation ---\\n");
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        printf("%d is a LEAP YEAR (366 days).\\n", year);
    } else {
        printf("%d is a COMMON YEAR (365 days).\\n", year);
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'if (age >= 18)', explanation: 'Evaluates the relational expression (19 >= 18) which yields 1 (True); the body statement executes.' },
          { line: 'if (number % 2 == 0) ... else ...', explanation: 'If the remainder when divided by 2 is 0, executes true-block; otherwise, the else false-block runs.' },
          { line: 'Nested check: if (val != 0) { if (val > 0) ... }', explanation: 'Outer if eliminates 0 first; inner if determines whether the non-zero quantity is positive or negative.' },
          { line: '(year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)', explanation: 'A century year must be divisible by 400; all other leap years must be divisible by 4 but not by 100.' }
        ],
        keyConcepts: [
          'In C, any non-zero integer is evaluated as True; exactly 0 is evaluated as False.',
          'Simple If is a one-way branch; statements are either executed or bypassed entirely.',
          'If-Else is a two-way branch guaranteeing that exactly one of the two blocks will execute.',
          'Nested If allows testing secondary conditions only when the primary condition holds true.',
          'Always enclose statement blocks in curly braces {} to maintain clarity and avoid the dangling-else pitfall.'
        ],
        commonMistakes: [
          'Accidental semicolon after if: "if (x > 5);" immediately terminates the conditional block, making the following braces execute unconditionally!',
          'Confusing the assignment operator "=" with the equality operator "==": "if (x = 5)" assigns 5 to x and always evaluates to True (non-zero)!',
          'Dangling Else ambiguity: In unbraced nested code, an "else" always pairs with the closest preceding unmatched "if".'
        ],
        quickRevision: [
          'if (cond) { ... } -> 1-way branch.',
          'if (cond) { ... } else { ... } -> 2-way branch.',
          'Non-zero = True, Zero = False in C conditions.',
          'Leap year formula: (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0).'
        ]
      }
    },
    {
      id: 'c-u3-t2',
      unitId: 'c-unit-3',
      courseId: 'c',
      order: 2,
      title: 'Decision Making & Branching: Else-If Ladder, Switch & Goto',
      summary: 'Explore multi-path decision making using else-if ladders, jump tables with switch-case, and unconditional goto jumps.',
      content: {
        definition: 'When decisions involve choosing among multiple mutually exclusive paths, C provides the Else-If Ladder and the Switch statement. The Else-If Ladder tests conditions sequentially from top to bottom until one matches. The Switch statement provides multi-way branching by evaluating an integral expression and jumping directly to a matching case constant label. The Goto statement performs an unconditional jump to a labeled statement within the same function.',
        syntax: `// 1. Else-If Ladder (Multi-path sequential evaluation):
if (condition1) {
    // statement 1
} else if (condition2) {
    // statement 2
} else if (condition3) {
    // statement 3
} else {
    // default statement when no condition is met
}

// 2. Switch Statement (Direct integral jump table):
switch (expression) { // expression MUST evaluate to int or char
    case constant1:
        // statements 1
        break; // exits switch
    case constant2:
        // statements 2
        break;
    default:
        // fallback statements if no case matches
        break;
}

// 3. Goto Statement (Unconditional jump):
goto label_name;
// ... intervening code ...
label_name:
    // target statements`,
        codeSnippet: `#include <stdio.h>

int main(void) {
    // --- 1. Else-If Ladder: Academic Grading ---
    int marks = 85;
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
    printf("Marks: %d -> Grade: %c\\n", marks, grade);

    // --- 2. Switch-Case: Vowel or Consonant Checker ---
    char ch = 'E';
    printf("\\nTesting character '%c' with switch:\\n", ch);
    switch (ch) {
        case 'a':
        case 'A':
        case 'e':
        case 'E':
        case 'i':
        case 'I':
        case 'o':
        case 'O':
        case 'u':
        case 'U':
            printf("'%c' is a VOWEL.\\n", ch);
            break;
        default:
            printf("'%c' is a CONSONANT or symbol.\\n", ch);
            break;
    }

    // --- 3. Goto Statement: Multiplication Loop Simulation ---
    int count = 1;
    int tableOf = 7;
    printf("\\nTable of %d using goto backward jump:\\n", tableOf);
repeat_loop:
    printf("%d x %d = %d\\n", tableOf, count, tableOf * count);
    count++;
    if (count <= 5) {
        goto repeat_loop; // Backward jump creates loop
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'if (marks >= 90) ... else if (marks >= 80) ...', explanation: 'Sequential evaluation: 85 >= 90 is False, so it evaluates 85 >= 80, which is True, setting grade = \'B\' and skipping subsequent else-if checks.' },
          { line: 'switch (ch) { case \'a\': case \'A\': ... break; }', explanation: 'Multi-case grouping: multiple case labels share a single body of code using intentional fall-through.' },
          { line: 'break;', explanation: 'Terminates the switch construct immediately; without break, execution falls through into subsequent cases.' },
          { line: 'goto repeat_loop;', explanation: 'Transfers program counter back to the label "repeat_loop:", forming an unconditional jump.' }
        ],
        keyConcepts: [
          'Switch expression MUST evaluate to an integral type (int, char, enum); floats and strings are strictly prohibited in C.',
          'Each case value must be a unique, compile-time constant expression.',
          'Break is essential to prevent unintended case fall-through.',
          'Multiple case constants can share the same execution block (e.g. upper and lowercase vowels).',
          'Goto can jump forward or backward, but cannot jump across function boundaries.'
        ],
        commonMistakes: [
          'Using floating point numbers in switch expressions: "switch (3.14)" causes a compilation error in C.',
          'Omitting the break statement: causes fall-through where all subsequent case blocks execute indiscriminately.',
          'Duplicate case constants: having two "case 1:" labels within the same switch causes a compiler error.',
          'Overusing goto: creates spaghetti code that is difficult to trace, maintain, and optimize.'
        ],
        quickRevision: [
          'else-if ladder: evaluated top-to-bottom sequentially.',
          'switch: integral/char jump table, fast O(1) branch dispatch.',
          'case labels must be constants; break prevents fall-through.',
          'goto label: unconditional jump within the same function.'
        ]
      }
    },
    {
      id: 'c-u3-t3',
      unitId: 'c-unit-3',
      courseId: 'c',
      order: 3,
      title: 'Decision Making & Looping: While and For Statements',
      summary: 'Harness entry-controlled loops to automate repetitive computational tasks with while and for loops.',
      content: {
        definition: 'A Loop in C executes a block of statements repeatedly as long as a test condition remains true. All loops require four essential elements: (1) Initialization, (2) Test Condition, (3) Loop Body, and (4) Update Expression. Both While and For loops are Entry-Controlled (pre-test) loops: the condition is checked at the top before executing the body. If the condition is false initially, the body does not execute at all (0 iterations).',
        syntax: `// 1. While Loop (Entry-controlled, condition tested first):
initialization;
while (test_condition) {
    // Loop body statements
    update_expression; // counter update
}

// 2. For Loop (Compact 3-part header):
for (initialization; test_condition; update_expression) {
    // Loop body statements
}

// 3. Infinite loop idioms:
// while (1) { ... }
// for (;;) { ... }`,
        codeSnippet: `#include <stdio.h>

int main(void) {
    // --- 1. While Loop: Sum of Squares (1^2 + 2^2 + ... + 10^2) ---
    int i = 1;
    int sumOfSquares = 0;
    while (i <= 10) {
        sumOfSquares += (i * i);
        i++; // Counter increment
    }
    printf("1. Sum of squares (1 to 10): %d\\n", sumOfSquares); // Expected: 385

    // --- 2. While Loop: Reversing an Integer & Palindrome Check ---
    int original = 12321;
    int temp = original;
    int reversed = 0;
    while (temp > 0) {
        int digit = temp % 10;
        reversed = (reversed * 10) + digit;
        temp /= 10;
    }
    printf("2. Original: %d, Reversed: %d -> ", original, reversed);
    if (original == reversed) {
        printf("PALINDROME NUMBER!\\n");
    } else {
        printf("NOT A PALINDROME.\\n");
    }

    // --- 3. For Loop: Factorial Calculation (5!) ---
    int n = 5;
    long long factorial = 1;
    for (int k = 1; k <= n; k++) {
        factorial *= k;
    }
    printf("3. Factorial of %d (%d!): %lld\\n", n, n, factorial); // Expected: 120

    // --- 4. Nested For Loop: 3x3 Multiplication Coordinate Grid ---
    printf("\\n4. Nested For Loop (3x3 Grid):\\n");
    for (int row = 1; row <= 3; row++) {
        for (int col = 1; col <= 3; col++) {
            printf("%4d", row * col);
        }
        printf("\\n");
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'while (i <= 10)', explanation: 'Condition tested at entry. Body repeats as long as i <= 10. When i reaches 11, the loop terminates.' },
          { line: 'reversed = (reversed * 10) + digit;', explanation: 'Shifts existing reversed digits left by one base-10 position and adds the extracted least significant digit.' },
          { line: 'for (int k = 1; k <= n; k++)', explanation: 'Initializes k=1 once, tests k<=5, executes body, and increments k++ after each pass.' },
          { line: 'Nested loops (row and col)', explanation: 'Outer loop iterates rows; for each row iteration, the inner loop executes completely from col=1 to col=3.' }
        ],
        keyConcepts: [
          'Pre-test execution: If the condition is false initially, the loop body executes 0 times.',
          'Four loop components: Initialization, Condition, Body, and Increment/Update.',
          'While loops are ideal when the number of iterations is not known in advance (e.g. processing digits of a number).',
          'For loops are ideal when the number of iterations is fixed and known beforehand.',
          'ANSI C supports nested loops up to 15 levels deep.'
        ],
        commonMistakes: [
          'Omitting the update step inside a while loop, which results in a 100% CPU lock infinite loop!',
          'Putting an accidental semicolon after loop header: "for (i=0; i<10; i++);" causes the empty statement to repeat 10 times, executing the block only once with i=10!',
          'Off-by-one errors: using "<" instead of "<=" causing one fewer iteration than expected.'
        ],
        quickRevision: [
          'Entry-controlled: condition checked first, min iterations = 0.',
          'while (cond) { body; update; }',
          'for (init; cond; step) { body; }',
          'Infinite loops: while(1) or for(;;).'
        ]
      }
    },
    {
      id: 'c-u3-t4',
      unitId: 'c-unit-3',
      courseId: 'c',
      order: 4,
      title: 'Decision Making & Looping: Do-While Statement & Loop Comparison',
      summary: 'Implement exit-controlled loops ensuring at least one execution pass, ideal for user menus and interactive validation.',
      content: {
        definition: 'The Do-While statement is an Exit-Controlled (post-test) Loop where the test condition is evaluated at the bottom after the loop body has already executed. As a result, the loop body is guaranteed to execute at least once (minimum 1 iteration), even if the condition is false on the very first evaluation.',
        syntax: `// Do-While Syntax (Exit-controlled, post-test):
initialization;
do {
    // Loop body statements (executes AT LEAST once!)
    update_expression;
} while (test_condition); // CRITICAL: Semicolon is MANDATORY here!`,
        codeSnippet: `#include <stdio.h>

int main(void) {
    // --- 1. Guaranteed Execution Test ---
    int counter = 100;
    printf("--- 1. Testing Do-While with False Condition ---\\n");
    do {
        printf("Body executed even though condition (counter < 10) is False! counter = %d\\n", counter);
        counter++;
    } while (counter < 10); // Condition is 101 < 10 (False!) -> Terminates immediately

    // --- 2. Interactive Menu-Driven Loop Simulation ---
    int choice;
    int attempt = 0;
    printf("\\n--- 2. Menu-Driven System Simulation ---\\n");
    do {
        attempt++;
        printf("\\n=== ATM SERVICE MENU (Pass %d) ===\\n", attempt);
        printf("1. Check Balance\\n");
        printf("2. Deposit Funds\\n");
        printf("3. Exit System\\n");
        
        // Simulating user inputs: attempt 1 selects 1, attempt 2 selects 3 (Exit)
        choice = (attempt == 1) ? 1 : 3;
        printf("User selected option: [%d]\\n", choice);

        switch (choice) {
            case 1:
                printf(">> Available Balance: $2,450.00\\n");
                break;
            case 2:
                printf(">> Deposit window activated.\\n");
                break;
            case 3:
                printf(">> Thank you for banking with CodeVerse! Exiting.\\n");
                break;
            default:
                printf(">> Invalid option! Try again.\\n");
                break;
        }
    } while (choice != 3);

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'do { ... } while (counter < 10);', explanation: 'Body executes once unconditionally before evaluating 101 < 10. Since False, loop finishes with 1 pass.' },
          { line: '; after while (test_condition);', explanation: 'Unlike while and for, the do-while loop header at the bottom requires a terminating semicolon.' },
          { line: 'Menu pattern with do-while', explanation: 'Guarantees the user sees the menu options at least once before testing whether they selected Exit.' }
        ],
        keyConcepts: [
          'Exit-controlled loop: Minimum iterations = 1 (guaranteed).',
          'While vs Do-While: While evaluates condition before entry (0 or more); Do-While evaluates condition after execution (1 or more).',
          'Mandatory semicolon: "while (condition);" in do-while MUST have a trailing semicolon.',
          'Best suited for: interactive menus, user input validation (e.g. asking "Do you want to continue? (Y/N)").'
        ],
        commonMistakes: [
          'Forgetting the trailing semicolon after "while(condition);" in do-while.',
          'Using do-while when 0 executions are required (e.g. iterating over an empty file or empty array).'
        ],
        quickRevision: [
          'do-while is exit-controlled: min executions = 1.',
          'Syntax: do { body; update; } while (condition);',
          'Must end with a semicolon (;).',
          'Ideal for menus and password/input validation prompts.'
        ]
      }
    },
    {
      id: 'c-u3-t5',
      unitId: 'c-unit-3',
      courseId: 'c',
      order: 5,
      title: 'Loop Control: Break, Continue, Pattern Printing & Calculator Case Study',
      summary: 'Master fine-grained iteration jumps (break & continue), 2D pattern printing algorithms, and a complete calculator case study.',
      content: {
        definition: 'Loop control jumping statements alter the sequential iteration of loops. The Break statement causes an immediate, premature exit from the innermost enclosing loop or switch construct. The Continue statement skips the remaining statements in the current iteration and jumps directly to the update expression (in for loops) or test condition (in while/do-while loops). Patterns and case studies demonstrate real-world application of control flow.',
        syntax: `// 1. Break Statement:
for (int i = 0; i < 100; i++) {
    if (i == 10) break; // Exits loop entirely when i reaches 10
}

// 2. Continue Statement:
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue; // Skips even numbers, jumps to i++
    printf("%d ", i); // Prints only odd numbers: 1 3 5 7 9
}`,
        codeSnippet: `#include <stdio.h>

int main(void) {
    // --- 1. Break: Early Search Termination ---
    int target = 7;
    printf("1. Searching for target %d in range 1..20:\\n", target);
    for (int i = 1; i <= 20; i++) {
        if (i == target) {
            printf("Found target %d at index %d! Breaking early.\\n", target, i);
            break; // Stop scanning remaining 13 numbers
        }
    }

    // --- 2. Continue: Printing Odd Numbers Only ---
    printf("\\n2. Continue statement (skipping even numbers 1..10):\\n");
    for (int k = 1; k <= 10; k++) {
        if (k % 2 == 0) {
            continue; // Skip rest of body for evens
        }
        printf("%d ", k);
    }
    printf("\\n");

    // --- 3. Pattern Printing: Half Pyramid of Stars ---
    printf("\\n3. Pattern: Half Pyramid of Stars (4 rows):\\n");
    for (int r = 1; r <= 4; r++) {
        for (int c = 1; c <= r; c++) {
            printf("* ");
        }
        printf("\\n");
    }

    // --- 4. Pattern Printing: Character Pyramid (A, BB, CCC, DDD) ---
    printf("\\n4. Pattern: Character Pyramid:\\n");
    for (int r = 1; r <= 4; r++) {
        char letter = 'A' + r - 1;
        for (int c = 1; c <= r; c++) {
            printf("%c ", letter);
        }
        printf("\\n");
    }

    // --- 5. Case Study: Interactive Arithmetic Calculator ---
    printf("\\n5. Case Study: Calculator Simulation with Switch:\\n");
    double num1 = 24.0, num2 = 6.0;
    char op = '/';

    switch (op) {
        case '+':
            printf("%.2f + %.2f = %.2f\\n", num1, num2, num1 + num2);
            break;
        case '-':
            printf("%.2f - %.2f = %.2f\\n", num1, num2, num1 - num2);
            break;
        case '*':
            printf("%.2f * %.2f = %.2f\\n", num1, num2, num1 * num2);
            break;
        case '/':
            if (num2 != 0.0) {
                printf("%.2f / %.2f = %.2f\\n", num1, num2, num1 / num2);
            } else {
                printf("Error: Division by zero is undefined!\\n");
            }
            break;
        default:
            printf("Error: Unsupported operator '%c'!\\n", op);
            break;
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'if (i == target) break;', explanation: 'Terminates the for loop immediately upon finding target 7, saving 13 unnecessary iterations.' },
          { line: 'if (k % 2 == 0) continue;', explanation: 'Skips the printf statement for all even numbers and moves directly to the increment step (k++).' },
          { line: 'Pattern nested loop: for (c=1; c<=r; c++)', explanation: 'Inner loop column count is governed by current row number r, generating a triangular half pyramid.' },
          { line: 'char letter = \'A\' + r - 1;', explanation: 'Calculates the ASCII character for each row (row 1 = \'A\', row 2 = \'B\', etc.).' },
          { line: 'Calculator switch (op)', explanation: 'Dispatches operation based on arithmetic symbol with explicit divide-by-zero protection.' }
        ],
        keyConcepts: [
          'break exits only the innermost enclosing loop or switch construct.',
          'continue skips the remainder of the current iteration and jumps to the update/test step.',
          'In while loops, beware using continue before updating the counter to prevent infinite loops.',
          'Patterns leverage outer loops for row navigation and inner loops for column/character rendering.',
          'Case studies synthesize decisions, loops, and validation into robust software tools.'
        ],
        commonMistakes: [
          'Using continue in a while loop without incrementing the counter first, causing an infinite loop!',
          'Assuming break exits all nested loops; break exits ONLY the immediate innermost loop.',
          'Omitting division-by-zero checks when implementing arithmetic calculators.'
        ],
        quickRevision: [
          'break: terminates loop or switch immediately.',
          'continue: skips remaining statements in current iteration.',
          'Pyramid patterns: outer loop = rows, inner loop = columns.',
          'Calculator case study uses switch with operator validation.'
        ]
      }
    }
  ]
};

export const cUnit3Quiz: Quiz = {
  id: 'quiz-c-3',
  unitId: 'c-unit-3',
  courseId: 'c',
  unitTitle: 'Unit 3: Control Flow',
  title: 'Control Flow & Looping Certification Quiz',
  passingScorePercent: 80,
  questions: [
    {
      id: 'q-c3-1',
      question: 'What is the minimum number of times a "do-while" loop is guaranteed to execute its body?',
      options: ['0 times', '1 time', '2 times', 'Depends on compiler settings'],
      correctIndex: 1,
      explanation: 'Because do-while is an exit-controlled loop with condition evaluation at the bottom, its body is guaranteed to execute at least 1 time.'
    },
    {
      id: 'q-c3-2',
      question: 'Which of the following data types CANNOT be used as the control expression of a switch statement in standard C?',
      options: ['int', 'char', 'float', 'enum'],
      correctIndex: 2,
      explanation: 'Switch statements in C require integral expressions (such as int, char, or enum). Floating point types (float/double) cannot be used in switch expressions.'
    },
    {
      id: 'q-c3-3',
      question: 'What happens when a "break" statement is executed inside an inner loop of a nested loop structure?',
      options: [
        'Both inner and outer loops are terminated immediately',
        'Only the innermost enclosing loop is terminated',
        'The program halts with an exit code 0',
        'Execution restarts from the top of the outer loop'
      ],
      correctIndex: 1,
      explanation: 'break terminates only the innermost loop or switch construct that directly encloses it.'
    },
    {
      id: 'q-c3-4',
      question: 'What is the output of: for (int i = 1; i <= 4; i++) { if (i == 2) continue; printf("%d", i); } ?',
      options: ['1234', '134', '12', '34'],
      correctIndex: 1,
      explanation: 'When i == 2, the continue statement skips printf and jumps directly to i++, producing output: 134.'
    },
    {
      id: 'q-c3-5',
      question: 'What is the behavior of the switch statement if a case matches, but the programmer omitted the "break" statement?',
      options: [
        'A compile-time syntax error is raised',
        'The program crashes with a segmentation fault',
        'Fall-through occurs: subsequent cases execute sequentially until a break or the end of the switch is reached',
        'The switch statement skips directly to the default label'
      ],
      correctIndex: 2,
      explanation: 'Omitting break causes case fall-through, executing all following case statements regardless of their conditions.'
    }
  ]
};
