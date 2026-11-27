import { Unit, Quiz } from '@/types';

export const cUnit2: Unit = {
  id: 'c-unit-2',
  courseId: 'c',
  unitNumber: 2,
  title: 'Operators and Control Statements',
  description: 'Master binary & unary arithmetic, logical short-circuiting, branching conditionals, switch cases, iterative loops, and control jump statements.',
  estimatedHours: 5.0,
  quizId: 'quiz-c-2',
  published: true,
  topics: [
    {
      id: 'c-u2-t1',
      unitId: 'c-unit-2',
      courseId: 'c',
      order: 1,
      title: 'Operators: Arithmetic, Relational, Logical & Bitwise',
      summary: 'Explore all C operator categories, operator precedence, associativity, and short-circuit evaluation in logical AND/OR operations.',
      content: {
        definition: 'Operators are special symbols that trigger mathematical or logical computations on operands. C provides Arithmetic (+, -, *, /, %), Relational (==, !=, <, >, <=, >=), Logical (&&, ||, !), Assignment (=, +=, -=), and Bitwise (&, |, ^, ~, <<, >>) operators.',
        syntax: 'int sum = a + b;\nint remainder = 17 % 5; // 2\nbool flag = (x > 0) && (y < 10); // Logical short-circuiting\nint shifted = 1 << 3; // Bitwise left-shift (evaluates to 8)',
        codeSnippet: `#include <stdio.h>

int main() {
    int a = 14, b = 4;
    printf("Arithmetic: a + b = %d, a / b = %d, a %% b = %d\\n", a + b, a / b, a % b);
    
    // Increment operators: Pre vs Post
    int x = 5;
    int y = x++; // y gets 5, then x becomes 6
    int z = ++x; // x becomes 7, z gets 7
    printf("x: %d, y: %d, z: %d\\n", x, y, z);

    // Short-circuiting demonstration
    int check = 0;
    if (a < 10 && ++check) {
        // Will never execute because a < 10 is false
    }
    printf("Check value after short-circuit: %d\\n", check); // Remains 0
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int y = x++;', explanation: 'Post-increment operator assigns current value of x (5) to y first, then increments x to 6.' },
          { line: 'int z = ++x;', explanation: 'Pre-increment increments x first (from 6 to 7), and then evaluates and assigns 7 to z.' },
          { line: 'a < 10 && ++check', explanation: 'Logical AND short-circuits: since left operand is false, C skips evaluating ++check entirely.' }
        ],
        keyConcepts: [
          'Precedence: Multiplication and division take priority over addition and subtraction',
          'Modulo operator (%) is only defined for integer types in C',
          'Short-circuit evaluation in && and || avoids redundant or dangerous evaluations (e.g. ptr != NULL && *ptr == 5)'
        ],
        commonMistakes: [
          'Confusing the assignment operator (=) with equality comparison (==) inside if condition (e.g. if (x = 5))',
          'Attempting to use the % modulo operator on floating point variables'
        ],
        quickRevision: [
          '++x increments before use; x++ increments after evaluation.',
          '&& requires all true, || requires at least one true.',
          'Always use parentheses to explicitly enforce intended precedence.'
        ]
      }
    },
    {
      id: 'c-u2-t2',
      unitId: 'c-unit-2',
      courseId: 'c',
      order: 2,
      title: 'Conditional Branching: if, if-else & Nested if',
      summary: 'Learn how to control decision flow in programs using boolean expressions and nested decision trees.',
      content: {
        definition: 'Conditional statements allow programs to make decisions and execute specific blocks of code depending on whether a given condition evaluates to non-zero (true) or zero (false).',
        syntax: 'if (condition) {\n    // executes if true\n} else if (anotherCondition) {\n    // executes if anotherCondition is true\n} else {\n    // fallback default branch\n}',
        codeSnippet: `#include <stdio.h>

int main() {
    int marks = 84;

    printf("Evaluation for marks = %d: ", marks);
    if (marks >= 90) {
        printf("Grade A+ (Distinction)\\n");
    } else if (marks >= 75) {
        printf("Grade A (First Class)\\n");
    } else if (marks >= 50) {
        printf("Grade B (Pass)\\n");
    } else {
        printf("Fail (Needs Improvement)\\n");
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'if (marks >= 90)', explanation: 'Evaluates the primary condition. If true, prints and skips all subsequent else-if branches.' },
          { line: 'else if (marks >= 75)', explanation: 'Evaluated only if the preceding if test returned false (marks < 90).' },
          { line: 'else', explanation: 'Default catch-all block executed if none of the preceding conditions matched.' }
        ],
        keyConcepts: [
          'In C, any non-zero integer is treated as true, and 0 is treated as false',
          'The dangling else problem is resolved by matching else with the nearest unmatched if',
          'Ternary conditional operator: condition ? expr1 : expr2'
        ],
        commonMistakes: [
          'Accidental semicolon after if: if (x > 0); { printf("Positive"); } executes block unconditionally',
          'Writing chained comparisons like if (10 < x < 20) which parses as ((10 < x) < 20) instead of (10 < x && x < 20)'
        ],
        quickRevision: [
          'Non-zero = True, Zero = False.',
          'Use curly braces even for single line if statements to avoid bug-prone code.'
        ]
      }
    },
    {
      id: 'c-u2-t3',
      unitId: 'c-unit-2',
      courseId: 'c',
      order: 3,
      title: 'The switch Statement & Jump Tables',
      summary: 'Implement multi-way branching efficiently with switch-case constructs, fall-through mechanics, and break statements.',
      content: {
        definition: 'The switch statement allows a variable to be tested for equality against a list of constant integral or character values. Each value is called a case, and the switch branches directly using an internal compiler jump table.',
        syntax: 'switch (integral_expression) {\n    case CONST1:\n        // statements\n        break;\n    case CONST2:\n        // statements\n        break;\n    default:\n        // default fallback\n}',
        codeSnippet: `#include <stdio.h>

int main() {
    char operator = '*';
    double n1 = 12.0, n2 = 4.0;

    switch (operator) {
        case '+':
            printf("%.1f + %.1f = %.1f\\n", n1, n2, n1 + n2);
            break;
        case '-':
            printf("%.1f - %.1f = %.1f\\n", n1, n2, n1 - n2);
            break;
        case '*':
            printf("%.1f * %.1f = %.1f\\n", n1, n2, n1 * n2);
            break;
        case '/':
            if (n2 != 0) printf("%.1f / %.1f = %.1f\\n", n1, n2, n1 / n2);
            else printf("Error: Division by zero!\\n");
            break;
        default:
            printf("Error: Unsupported operator \'%c\'\\n", operator);
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'switch (operator)', explanation: 'Evaluates character operator. Characters are internally stored as integer ASCII values.' },
          { line: 'case \'*\':', explanation: 'Direct label match when operator equals the asterisk character constant.' },
          { line: 'break;', explanation: 'Exits the switch block immediately. Without break, execution falls through to the next case.' },
          { line: 'default:', explanation: 'Executes when no case constant matches the selector expression.' }
        ],
        keyConcepts: [
          'Switch expressions must evaluate to an integral type (int, char, enum). Floats and strings are illegal',
          'Case labels must be compile-time constants or literals',
          'Fall-through occurs when break is omitted, which can be intentional or an accidental bug'
        ],
        commonMistakes: [
          'Passing a float or string to switch (e.g. switch(3.14))',
          'Duplicate case constants in the same switch block'
        ],
        quickRevision: [
          'switch requires integral or char constants.',
          'Always include break unless deliberate fall-through is required.',
          'default is optional but recommended as a safety catch.'
        ]
      }
    },
    {
      id: 'c-u2-t4',
      unitId: 'c-unit-2',
      courseId: 'c',
      order: 4,
      title: 'Iterative Loops: for, while & do-while',
      summary: 'Harness the power of repetitive execution using entry-controlled and exit-controlled loop architectures.',
      content: {
        definition: 'Loops execute a block of code repeatedly until a specified condition becomes false. C provides entry-controlled loops (for, while) where the condition is verified prior to execution, and exit-controlled loops (do-while) which guarantee at least one execution.',
        syntax: '// for loop\nfor (initialization; condition; update) { ... }\n\n// while loop\nwhile (condition) { ... }\n\n// do-while loop\ndo { ... } while (condition);',
        codeSnippet: `#include <stdio.h>

int main() {
    printf("1. for loop counting up:\\n");
    for (int i = 1; i <= 4; i++) {
        printf("%d ", i);
    }

    printf("\\n2. while loop doubling power of 2:\\n");
    int val = 1;
    while (val <= 16) {
        printf("%d ", val);
        val *= 2;
    }

    printf("\\n3. do-while executing guaranteed once:\\n");
    int attempts = 0;
    do {
        printf("Verification check #%d executed\\n", ++attempts);
    } while (attempts < 1);

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'for (int i = 1; i <= 4; i++)', explanation: 'Compact header combining loop counter initialization, loop continuation condition, and counter increment.' },
          { line: 'while (val <= 16)', explanation: 'Entry-controlled loop: condition is evaluated before every iteration.' },
          { line: 'do { ... } while (attempts < 1);', explanation: 'Exit-controlled loop: executes body first, then checks condition. Notice the trailing semicolon.' }
        ],
        keyConcepts: [
          'Entry-controlled (for, while): 0 or more iterations possible',
          'Exit-controlled (do-while): 1 or more iterations guaranteed',
          'Infinite loops: for(;;) or while(1) run until interrupted by break or return'
        ],
        commonMistakes: [
          'Forgetting to update the loop variable, causing an infinite freeze',
          'Off-by-one errors (using < when <= was intended)'
        ],
        quickRevision: [
          'for: best when number of iterations is known in advance.',
          'while: best when loop depends on dynamic conditions.',
          'do-while: best when the loop body must run at least once (e.g. menus).'
        ]
      }
    },
    {
      id: 'c-u2-t5',
      unitId: 'c-unit-2',
      courseId: 'c',
      order: 5,
      title: 'Loop Control Statements: break and continue',
      summary: 'Learn how to prematurely terminate loop execution with break or skip current iterations with continue.',
      content: {
        definition: 'Jump statements alter the normal sequential flow of loop execution. The break statement immediately terminates the innermost enclosing loop or switch, while continue skips the remainder of the current iteration and jumps directly to the loop update/condition step.',
        syntax: 'while (1) {\n    if (terminateCondition) break; // exit loop\n    if (skipCondition) continue;   // skip to next cycle\n}',
        codeSnippet: `#include <stdio.h>

int main() {
    printf("Numbers 1 through 10, skipping multiples of 3, stopping before 9:\\n");
    for (int i = 1; i <= 10; i++) {
        if (i == 9) {
            printf("[Break at %d] ", i);
            break; // Stop loop entirely
        }
        if (i % 3 == 0) {
            continue; // Skip printing for 3 and 6
        }
        printf("%d ", i);
    }
    printf("\\nLoop finished safely.\\n");
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'if (i == 9) break;', explanation: 'Instantly breaks out of the for loop when i hits 9, transferring execution directly past the closing brace.' },
          { line: 'if (i % 3 == 0) continue;', explanation: 'Skips the remaining lines in the loop body for multiples of 3 and advances directly to i++.' }
        ],
        keyConcepts: [
          'break applies only to the innermost loop or switch in nested scenarios',
          'continue cannot be used inside a switch statement (unless enclosed within an outer loop)',
          'In a for loop, continue jumps to the increment step (e.g. i++), while in a while loop it jumps to the condition'
        ],
        commonMistakes: [
          'Using continue in a while loop without incrementing the counter first, triggering an infinite loop',
          'Thinking break exits nested loops: it only exits one level'
        ],
        quickRevision: [
          'break: terminates the loop completely.',
          'continue: skips remaining body of current iteration and moves to next.',
          'Avoid excessive break/continue that obscures code flow readability.'
        ]
      }
    }
  ]
};

export const cUnit2Quiz: Quiz = {
  id: 'quiz-c-2',
  unitId: 'c-unit-2',
  courseId: 'c',
  unitTitle: 'Unit 2: Operators and Control Statements',
  title: 'Unit 2 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-c2-1',
      question: 'Given int a = 5; int b = a++; what are the values of a and b after execution?',
      options: [
        'a = 6, b = 6',
        'a = 5, b = 6',
        'a = 6, b = 5',
        'a = 5, b = 5'
      ],
      correctIndex: 2,
      explanation: 'Post-increment a++ assigns the initial value of a (5) to b, then increments a to 6.'
    },
    {
      id: 'q-c2-2',
      question: 'Which of the following data types is NOT permissible as the expression inside a C switch statement?',
      options: [
        'int',
        'char',
        'float',
        'enum'
      ],
      correctIndex: 2,
      explanation: 'In C, switch statements can only test integral or enumeration types. Floating-point numbers (float and double) cannot be used in a switch.'
    },
    {
      id: 'q-c2-3',
      question: 'How many times will the body of a do-while loop execute if its condition is false from the start?',
      options: [
        '0 times',
        'At least 1 time',
        '2 times',
        'It causes a compilation error'
      ],
      correctIndex: 1,
      explanation: 'do-while is an exit-controlled loop. Its body always executes at least once before the condition is evaluated.'
    },
    {
      id: 'q-c2-4',
      question: 'What is the purpose of the continue statement inside a loop?',
      options: [
        'To exit the loop permanently',
        'To skip the rest of the current iteration and move to the next cycle',
        'To restart the loop from index 0',
        'To pause execution for 1 second'
      ],
      correctIndex: 1,
      explanation: 'continue halts execution of the current iteration body and jumps immediately to the loop\'s condition/update step for the next iteration.'
    },
    {
      id: 'q-c2-5',
      question: 'What happens due to short-circuiting in the expression: (0 && ++x)?',
      options: [
        '++x is evaluated and x increases',
        'The program crashes with a segmentation fault',
        '++x is never evaluated because the left operand is 0 (false)',
        'The compiler replaces it with 1'
      ],
      correctIndex: 2,
      explanation: 'In logical AND (&&), if the left operand evaluates to false (0), C short-circuits and skips the right operand entirely.'
    }
  ]
};
