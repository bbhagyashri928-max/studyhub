import { Stage } from '@/types';

/**
 * High-fidelity, syllabus-accurate stages for C Unit 2:
 * "Operators and Expressions"
 * Directly derived from university syllabus and lecture notes (FCP_Unit_2.pdf).
 */
export const cUnit2CustomStages: Stage[] = [
  // =========================================================================
  // TOPIC 1: Arithmetic, Assignment, Increment & Decrement -> Stages 1 to 5
  // =========================================================================
  {
    id: 'c-u2-t1-s1',
    topicId: 'c-u2-t1',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: What is an Operator? Operators, Operands & Classification',
    subtitle: 'Foundation Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'In C, operators are symbols that tell the computer to perform mathematical or logical manipulations on one or more data items. The data items acted upon by operators are called operands.',
      definitions: [
        'Operator: A symbol that represents an operation to be performed on operands (e.g., +, -, *).',
        'Operand: A constant, variable, or expression upon which an operator acts (e.g., in `a + b`, a and b are operands).',
        'Unary Operator: Operates on a single operand (e.g., -x, ++x, !x).',
        'Binary Operator: Operates on two operands (e.g., a + b, x * y).'
      ],
      syntax: `The 8 Major Types of Operators in C:
1. Arithmetic Operators        (+, -, *, /, %)
2. Relational Operators        (==, !=, >, <, >=, <=)
3. Logical Operators           (&&, ||, !)
4. Assignment Operators        (=, +=, -=, *=, /=, %=)
5. Increment & Decrement       (++, --)
6. Conditional Operator        (? :)
7. Bitwise Operators           (&, |, ^, ~, <<, >>)
8. Special Operators           (sizeof, comma, &, *)`,
      realLifeExample: 'Think of an arithmetic problem on a chalkboard: "5 + 3". Here, "5" and "3" are the raw ingredients (operands), and the "+" sign is the action tool (operator) combining them.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 15; // Operand 1
    int b = 5;  // Operand 2
    int sum = a + b; // '+' is operator acting on a and b
    
    printf("Operands: a = %d, b = %d\\n", a, b);
    printf("Operator '+' result: %d\\n", sum);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int sum = a + b;', explanation: 'Binary operator + evaluates the sum of operands a and b, storing the result in sum.' }
      ],
      expectedOutput: `Operands: a = 15, b = 5\nOperator '+' result: 20`,
      pointsToRemember: [
        'Operators manipulate data; operands are the data being manipulated.',
        'Unary operators need 1 operand; binary need 2; ternary need 3.'
      ]
    },
    quiz: {
      question: 'In the expression "x = a * b", what are "a" and "b" called?',
      options: ['Operands', 'Operators', 'Keywords', 'Constants'],
      correctIndex: 0,
      explanation: 'The values or variables upon which an operator acts are called operands.'
    }
  },
  {
    id: 'c-u2-t1-s2',
    topicId: 'c-u2-t1',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Arithmetic Operators & Integer vs Floating Division',
    subtitle: 'Arithmetic Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C provides 5 basic arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), and modulo division (%). A critical feature of C is that integer division truncates any fractional decimal part.',
      definitions: [
        'Modulo Operator (%): Yields the integer remainder of division (e.g., 5 % 3 = 2). Can ONLY be used on integer types!',
        'Integer Truncation: In integer division (int / int), C truncates the fractional portion towards zero (e.g., 7 / 2 = 3, not 3.5).',
        'Unary Minus (-): Multiplies a single operand by -1, inverting its algebraic sign.'
      ],
      syntax: `Arithmetic Operators:
+ : Addition (5 + 3 = 8)
- : Subtraction (5 - 3 = 2)
* : Multiplication (5 * 3 = 15)
/ : Division (6 / 3 = 2, 7 / 2 = 3)
% : Modulus (5 % 3 = 2) -- INTEGERS ONLY!`,
      realLifeExample: 'Distributing 7 apples equally among 2 children: each child receives 3 whole apples (integer division 7 / 2 = 3), and 1 apple remains in the basket (modulus 7 % 2 = 1).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 10, b = 3;
    printf("Addition      : 10 + 3 = %d\\n", a + b);
    printf("Subtraction   : 10 - 3 = %d\\n", a - b);
    printf("Multiplication: 10 * 3 = %d\\n", a * b);
    printf("Division      : 10 / 3 = %d (Truncated integer!)\\n", a / b);
    printf("Modulus       : 10 %% 3 = %d (Remainder)\\n", a % b);
    
    // Floating point division preserving decimals:
    float realDiv = 10.0f / 3.0f;
    printf("Float Division: 10.0 / 3.0 = %.2f\\n", realDiv);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("Division: 10 / 3 = %d", a / b);', explanation: 'Both a and b are integers, so C discards the .3333 fraction and outputs 3.' },
        { line: 'printf("Modulus: 10 %% 3 = %d", a % b);', explanation: 'Computes remainder: 10 = (3 * 3) + 1, so 10 % 3 yields 1.' }
      ],
      expectedOutput: `Addition      : 10 + 3 = 13\nSubtraction   : 10 - 3 = 7\nMultiplication: 10 * 3 = 30\nDivision      : 10 / 3 = 3 (Truncated integer!)\nModulus       : 10 % 3 = 1 (Remainder)\nFloat Division: 10.0 / 3.0 = 3.33`,
      pointsToRemember: [
        'Modulo (%) CANNOT be used on float or double; doing so causes a compiler error.',
        'To get fractional answers from division, at least one operand must be float or double.'
      ]
    },
    quiz: {
      question: 'What is the result of the expression "14 % 4" in C?',
      options: ['2', '3', '3.5', '0'],
      correctIndex: 0,
      explanation: '14 divided by 4 is 3 with a remainder of 2. Modulo (%) returns the remainder: 2.'
    }
  },
  {
    id: 'c-u2-t1-s3',
    topicId: 'c-u2-t1',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Shorthand Assignment Operators (+=, -=, *=, /=, %=)',
    subtitle: 'Assignments Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C provides shorthand (compound) assignment operators of the form `v op= exp;`. This is equivalent to `v = v op (exp);`, but the left-hand variable `v` is evaluated only once.',
      definitions: [
        'Shorthand Assignment: Combining an arithmetic operation with assignment into a single operator (+=, -=, *=, /=, %=).',
        '3 Advantages: (1) Left-hand side variable is not repeated, (2) Code is more concise and readable, (3) More efficient compiler execution.'
      ],
      syntax: `Shorthand Equivalence Table:
Simple Assignment   Shorthand Form
a = a + 1           a += 1
a = a - 1           a -= 1
a = a * (n + 1)     a *= (n + 1)
a = a / (n + 1)     a /= (n + 1)
a = a % b           a %= b`,
      realLifeExample: 'A scoreboard: instead of saying "The score is the old score plus 5", the referee simply says "Add 5 to the score" (`score += 5`).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 25, b = 5;
    printf("Initial a = %d, b = %d\\n", a, b);
    
    a += b; // a = 25 + 5 = 30
    printf("a += b -> a = %d\\n", a);
    
    a -= b; // a = 30 - 5 = 25
    printf("a -= b -> a = %d\\n", a);
    
    a *= b; // a = 25 * 5 = 125
    printf("a *= b -> a = %d\\n", a);
    
    a /= b; // a = 125 / 5 = 25
    printf("a /= b -> a = %d\\n", a);
    
    a %= b; // a = 25 % 5 = 0
    printf("a %%= b -> a = %d\\n", a);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'a += b;', explanation: 'Evaluates a = a + b and updates a in-place.' },
        { line: 'a %= b;', explanation: 'Calculates remainder 25 % 5 = 0 and stores 0 into a.' }
      ],
      expectedOutput: `Initial a = 25, b = 5\na += b -> a = 30\na -= b -> a = 25\na *= b -> a = 125\na /= b -> a = 25\na %= b -> a = 0`,
      pointsToRemember: [
        'In `x *= y + 1`, the entire right side `(y + 1)` is evaluated first: `x = x * (y + 1)`.',
        'Shorthand operators evaluate the destination variable only once.'
      ]
    },
    quiz: {
      question: 'If x = 5 and y = 2, what is the value of x after executing: x += y + 1 ?',
      options: ['8', '11', '12', '10'],
      correctIndex: 0,
      explanation: '`x += y + 1` expands to `x = x + (y + 1)`. Since y = 2, y + 1 = 3. Therefore x = 5 + 3 = 8.'
    }
  },
  {
    id: 'c-u2-t1-s4',
    topicId: 'c-u2-t1',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: Increment & Decrement Operators (++ and --)',
    subtitle: 'Unary Operators Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C provides two unique unary operators: `++` (adds 1 to its operand) and `--` (subtracts 1 from its operand). They require a variable as their operand and cannot be applied to constants.',
      definitions: [
        'Prefix (++m or --m): Increments/decrements the operand FIRST, then uses the updated value in the expression.',
        'Postfix (m++ or m--): Uses the ORIGINAL value in the expression first, and then increments/decrements the operand.'
      ],
      syntax: `Prefix vs Postfix Forms:
++m;  -> equivalent to:  m = m + 1; (Incremented FIRST)
m++;  -> equivalent to:  m = m + 1; (Incremented AFTER)
--m;  -> equivalent to:  m = m - 1; (Decremented FIRST)
m--;  -> equivalent to:  m = m - 1; (Decremented AFTER)`,
      realLifeExample: 'Prefix: Paying for an item before boarding a bus (pay first, then ride). Postfix: Paying a toll tag bill at the end of the month (ride first, billed afterwards).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int m = 5;
    printf("Initial m = %d\\n", m);
    
    // Prefix: increments before printing
    printf("Prefix  (++m): %d (m is now %d)\\n", ++m, m); // prints 6, m is 6
    
    // Postfix: prints current value, then increments
    printf("Postfix (m++): %d (m is now %d)\\n", m++, m); // prints 6, m is 7
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("Prefix: %d", ++m);', explanation: 'm increases from 5 to 6 first; 6 is passed to printf.' },
        { line: 'printf("Postfix: %d", m++);', explanation: 'Current value 6 is passed to printf; only then does m increase to 7.' }
      ],
      expectedOutput: `Initial m = 5\nPrefix  (++m): 6 (m is now 6)\nPostfix (m++): 6 (m is now 7)`,
      pointsToRemember: [
        '++ and -- can ONLY be used on variables (writing ++5 is a compile-time error!).',
        'Prefix = Change then Use; Postfix = Use then Change.'
      ]
    },
    quiz: {
      question: 'Which of the following expressions is syntactically INVALID in C?',
      options: ['++10', '++x', 'x++', 'x--'],
      correctIndex: 0,
      explanation: 'Increment and decrement operators require a mutable variable as their operand. A literal constant like `10` cannot be modified.'
    }
  },
  {
    id: 'c-u2-t1-s5',
    topicId: 'c-u2-t1',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Tracing Increment & Decrement in Expressions & Loops',
    subtitle: 'Trace Mastery Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Tracing prefix and postfix operators inside real statements (like assignments, output statements, and loops) is a core university examination topic.',
      definitions: [
        'Expression Trace: Step-by-step substitution of variable values during runtime evaluation.'
      ],
      syntax: `University Question Bank Example:
int x = 5;
printf("%d\\n", x++); // Postfix: prints 5, x becomes 6
printf("%d\\n", ++x); // Prefix : x becomes 7, prints 7`,
      realLifeExample: 'A turnstile counter at a stadium: the display may show the ticket count before you step through, or increment as the gate clicks forward.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int x = 5;
    printf("Question Bank Snippet:\\n");
    printf("Line 1 (x++): %d\\n", x++); // prints 5, then x becomes 6
    printf("Line 2 (++x): %d\\n", ++x); // x becomes 7, then prints 7
    
    // In a loop:
    printf("\\nLoop using postfix (i++):\\n");
    for (int i = 0; i < 3; i++) {
        printf("i = %d ", i);
    }
    printf("\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("%d\\n", x++);', explanation: 'Original value 5 is sent to console; x is incremented to 6 in RAM.' },
        { line: 'printf("%d\\n", ++x);', explanation: 'x increments from 6 to 7 in RAM first; new value 7 is sent to console.' }
      ],
      expectedOutput: `Question Bank Snippet:\nLine 1 (x++): 5\nLine 2 (++x): 7\n\nLoop using postfix (i++):\ni = 0 i = 1 i = 2 `,
      pointsToRemember: [
        'When standalone on a line (e.g. x++; or ++x;), prefix and postfix behave identically.',
        'They only differ when embedded inside a larger expression or statement.'
      ]
    },
    quiz: {
      question: 'What is printed by: int x = 5; printf("%d ", x++); printf("%d", ++x); ?',
      options: ['5 7', '5 6', '6 7', '6 6'],
      correctIndex: 0,
      explanation: 'x++ prints original value 5 (x becomes 6). Then ++x increments 6 to 7 and prints 7.'
    }
  },

  // =========================================================================
  // TOPIC 2: Relational, Logical & Conditional -> Stages 1 to 5
  // =========================================================================
  {
    id: 'c-u2-t2-s1',
    topicId: 'c-u2-t2',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Relational Operators (<, <=, >, >=, ==, !=) & Truth Values',
    subtitle: 'Relational Logic Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Relational operators are used to compare two quantities. In C, a relational expression evaluates to an integer: 1 if the relation is TRUE, and 0 if the relation is FALSE.',
      definitions: [
        'Relational Expression: An expression containing a relational operator (e.g., 10 < 20).',
        'Truth Value: C represents TRUE as 1 and FALSE as 0.'
      ],
      syntax: `The 6 Relational Operators:
== : Equal to (5 == 5 yields 1)
!= : Not equal to (5 != 3 yields 1)
>  : Greater than (5 > 3 yields 1)
<  : Less than (5 < 6 yields 1)
>= : Greater than or equal to (5 >= 5 yields 1)
<= : Less than or equal to (5 <= 6 yields 1)`,
      realLifeExample: 'Checking eligibility at a movie theater: "Is your age >= 18?" If yes, result is True (1); if no, result is False (0).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 10, b = 3;
    printf("a == b: %d (false)\\n", a == b);
    printf("a != b: %d (true)\\n",  a != b);
    printf("a > b : %d (true)\\n",  a > b);
    printf("a < b : %d (false)\\n", a < b);
    printf("a >= b: %d (true)\\n",  a >= b);
    printf("a <= b: %d (false)\\n", a <= b);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("a == b: %d", a == b);', explanation: 'Since 10 is not equal to 3, the expression yields 0.' },
        { line: 'printf("a > b : %d", a > b);', explanation: 'Since 10 is greater than 3, the expression yields 1.' }
      ],
      expectedOutput: `a == b: 0 (false)\na != b: 1 (true)\na > b : 1 (true)\na < b : 0 (false)\na >= b: 1 (true)\na <= b: 0 (false)`,
      pointsToRemember: [
        'Equal-to is `==` (two equals signs). Single `=` is assignment!',
        'Relational expressions always produce either 0 or 1.'
      ]
    },
    quiz: {
      question: 'What does the expression (10 < 20) evaluate to in C?',
      options: ['1', '0', 'true', '20'],
      correctIndex: 0,
      explanation: 'In C, true relational expressions evaluate to integer 1.'
    }
  },
  {
    id: 'c-u2-t2-s2',
    topicId: 'c-u2-t2',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Logical Operators (&&, ||, !) & Compound Conditions',
    subtitle: 'Compound Logic Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Logical operators combine two or more relational expressions to test complex conditions. Logical AND (&&) requires both conditions to be true; Logical OR (||) requires at least one; Logical NOT (!) negates a condition.',
      definitions: [
        '&& (Logical AND): Yields 1 only if BOTH operands are non-zero (true).',
        '|| (Logical OR): Yields 1 if EITHER or BOTH operands are non-zero (true).',
        '! (Logical NOT): Unary operator reversing truth value (!1 = 0, !0 = 1).'
      ],
      syntax: `Truth Table:
A   B   A && B   A || B   !A
0   0     0        0       1
0   1     0        1       1
1   0     0        1       0
1   1     1        1       0`,
      realLifeExample: 'Logging into online banking: you need both the correct username AND the correct password (&&). Either a fingerprint OR a face scan unlocks your phone (||).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 1, b = 0;
    printf("a && b: %d (1 AND 0 = 0)\\n", a && b);
    printf("a || b: %d (1 OR 0  = 1)\\n", a || b);
    printf("!a    : %d (NOT 1   = 0)\\n", !a);
    
    // Compound condition: (5 > 3) && (3 < 2)
    int result = (5 > 3) && (3 < 2);
    printf("(5 > 3) && (3 < 2) = %d (True && False = False)\\n", result);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int result = (5 > 3) && (3 < 2);', explanation: '5 > 3 is 1 (True), but 3 < 2 is 0 (False). 1 && 0 produces 0.' }
      ],
      expectedOutput: `a && b: 0 (1 AND 0 = 0)\na || b: 1 (1 OR 0  = 1)\n!a    : 0 (NOT 1   = 0)\n(5 > 3) && (3 < 2) = 0 (True && False = False)`,
      pointsToRemember: [
        '&& requires ALL conditions to be true.',
        '|| requires only ONE condition to be true.',
        '! inverts 0 to 1, and any non-zero value to 0.'
      ]
    },
    quiz: {
      question: 'What is the evaluated result of the expression: (5 > 1) && (3 < 5) ?',
      options: ['1 (True)', '0 (False)', '-1', 'Undefined'],
      correctIndex: 0,
      explanation: '5 > 1 is true (1) and 3 < 5 is true (1). 1 && 1 produces 1 (True).'
    }
  },
  {
    id: 'c-u2-t2-s3',
    topicId: 'c-u2-t2',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Short-Circuit Evaluation in Logical AND and OR',
    subtitle: 'Optimization Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C employs "short-circuit evaluation" for logical expressions: in an AND (`&&`) expression, if the first operand is 0 (false), the second operand is NEVER evaluated. In an OR (`||`) expression, if the first operand is 1 (true), the second operand is NEVER evaluated.',
      definitions: [
        'Short-Circuit Evaluation: Stopping evaluation of a logical expression as soon as the final truth value is guaranteed.'
      ],
      syntax: `Short-Circuit Rules:
0 && (anything) -> 0 immediately (second part skipped)
1 || (anything) -> 1 immediately (second part skipped)`,
      realLifeExample: 'Walking through two locked security doors: if Door 1 fails to open, you don\'t even walk to Door 2 because access is already denied!',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int x = 0;
    int y = 10;
    
    // Because x is 0, (x != 0) is false.
    // The second condition (y / x > 2) is NEVER evaluated, preventing a divide-by-zero crash!
    if (x != 0 && (y / x > 2)) {
        printf("Condition True\\n");
    } else {
        printf("Short-circuit protected against division by zero!\\n");
    }
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'if (x != 0 && (y / x > 2))', explanation: 'Since x != 0 is False, C short-circuits and skips (y / x), avoiding a fatal runtime crash.' }
      ],
      expectedOutput: `Short-circuit protected against division by zero!`,
      pointsToRemember: [
        'Short-circuiting is crucial for preventing null-pointer or divide-by-zero crashes.',
        'Avoid side-effects (like ++x) in the right-hand operand of && or ||, as it may not execute!'
      ]
    },
    quiz: {
      question: 'In the expression "0 && (++x > 5)", will the variable x be incremented?',
      options: [
        'No, because the first operand is 0, C short-circuits and skips the second expression',
        'Yes, C always evaluates both sides',
        'Only on 64-bit systems',
        'It causes a compilation error'
      ],
      correctIndex: 0,
      explanation: 'Under short-circuit rules, if the left operand of && is 0, the right operand is completely bypassed.'
    }
  },
  {
    id: 'c-u2-t2-s4',
    topicId: 'c-u2-t2',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: The Conditional (Ternary) Operator (? : )',
    subtitle: 'Ternary Logic Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The conditional operator `? :` is C\'s only ternary operator because it operates on three operands. It is an inline shorthand for an if-else statement that returns a value.',
      definitions: [
        'Ternary Operator: An operator taking 3 operands: (condition) ? exp1 : exp2.',
        'Condition: Tested first. If True (non-zero), exp1 is evaluated; if False (zero), exp2 is evaluated.'
      ],
      syntax: `Conditional Operator Syntax:
variable = (condition) ? expression1 : expression2;
Equivalent to:
if (condition)
    variable = expression1;
else
    variable = expression2;`,
      realLifeExample: 'Checking weather before leaving the house: `clothing = (isRaining) ? "Umbrella" : "Sunglasses";`',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 10, b = 5;
    // Finding max using ternary operator
    int max = (a > b) ? a : b;
    printf("a = %d, b = %d\\n", a, b);
    printf("Maximum value is: %d\\n", max);
    
    // Inline parity check
    int num = 7;
    printf("Number %d is %s\\n", num, (num % 2 == 0) ? "Even" : "Odd");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int max = (a > b) ? a : b;', explanation: 'Tests if 10 > 5. Since true, returns a (10), assigning it to max.' }
      ],
      expectedOutput: `a = 10, b = 5\nMaximum value is: 10\nNumber 7 is Odd`,
      pointsToRemember: [
        '? : takes exactly three operands.',
        'It produces an expression value that can be assigned directly to a variable.'
      ]
    },
    quiz: {
      question: 'How many operands does the conditional operator (? :) require in C?',
      options: ['3 operands', '2 operands', '1 operand', '4 operands'],
      correctIndex: 0,
      explanation: 'The conditional operator is called "ternary" because it takes exactly 3 operands.'
    }
  },
  {
    id: 'c-u2-t2-s5',
    topicId: 'c-u2-t2',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Nested Ternary Operators & Finding Largest of 3 Numbers',
    subtitle: 'Advanced Decisions Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Ternary operators can be nested to test multiple conditions hierarchically, such as finding the maximum among three numbers in a single assignment expression.',
      definitions: [
        'Nested Ternary: Placing another `? :` expression inside the true or false branch of an existing ternary operator.'
      ],
      syntax: `Nested Ternary for Largest of 3:
max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);`,
      realLifeExample: 'A tournament bracket: Team A plays Team B; the winner advances to play Team C in the finals.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 45, b = 82, c = 33;
    // Single-line nested ternary decision
    int largest = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
    
    printf("Among %d, %d, and %d -> Largest is: %d\\n", a, b, c, largest);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int largest = (a > b) ? ...', explanation: 'Since 45 > 82 is False, takes the right branch: (b > c ? b : c). 82 > 33 is True, so largest is 82.' }
      ],
      expectedOutput: `Among 45, 82, and 33 -> Largest is: 82`,
      pointsToRemember: [
        'Use parentheses when nesting ternary operators to prevent ambiguity.',
        'The conditional operator has Right-to-Left associativity.'
      ]
    },
    quiz: {
      question: 'What is the associativity direction of the conditional ternary operator (? :)?',
      options: ['Right-to-Left', 'Left-to-Right', 'Top-to-Bottom', 'Arbitrary'],
      correctIndex: 0,
      explanation: 'The conditional operator `? :` evaluates with Right-to-Left associativity.'
    }
  },

  // =========================================================================
  // TOPIC 3: Bitwise & Special Operators -> Stages 1 to 5
  // =========================================================================
  {
    id: 'c-u2-t3-s1',
    topicId: 'c-u2-t3',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Bitwise Logic Operators (&, |, ^, ~)',
    subtitle: 'Bitwise Fundamentals Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Bitwise operators manipulate data at the individual bit level (0 and 1). C provides bitwise AND (&), bitwise OR (|), bitwise XOR (^), and bitwise NOT (~). They can NEVER be used on float or double.',
      definitions: [
        '& (Bitwise AND): Bit is 1 only if BOTH operand bits are 1.',
        '| (Bitwise OR): Bit is 1 if EITHER operand bit is 1.',
        '^ (Bitwise XOR): Bit is 1 if bits are DIFFERENT; 0 if they are identical.',
        '~ (Bitwise NOT): Inverts every bit (1 becomes 0, 0 becomes 1; produces two\'s complement).'
      ],
      syntax: `Bit Truth Table:
Bit1 Bit2   Bit1 & Bit2   Bit1 | Bit2   Bit1 ^ Bit2
 0    0          0             0             0
 0    1          0             1             1
 1    0          0             1             1
 1    1          1             1             0`,
      realLifeExample: 'A row of 8 light switches: bitwise operators flip or inspect individual switches without affecting the rest of the board.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // 5 = 0000 0101 in binary | 3 = 0000 0011 in binary
    int a = 5, b = 3;
    printf("a & b : %d (0101 & 0011 = 0001 = 1)\\n", a & b);
    printf("a | b : %d (0101 | 0011 = 0111 = 7)\\n", a | b);
    printf("a ^ b : %d (0101 ^ 0011 = 0110 = 6)\\n", a ^ b);
    printf("~a    : %d (inverts bits = -6)\\n", ~a);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("a & b : %d", a & b);', explanation: 'Only bit 0 is set in both 5 (101) and 3 (011), giving 1 (001).' },
        { line: 'printf("~a : %d", ~a);', explanation: '~5 inverts bits; in two\'s complement system, ~x = -(x + 1) = -6.' }
      ],
      expectedOutput: `a & b : 1 (0101 & 0011 = 0001 = 1)\na | b : 7 (0101 | 0011 = 0111 = 7)\na ^ b : 6 (0101 ^ 0011 = 0110 = 6)\n~a    : -6 (inverts bits = -6)`,
      pointsToRemember: [
        'Bitwise operators work strictly on integer types (char, int, short, long).',
        'In two\'s complement C systems, ~n evaluates to -(n + 1).'
      ]
    },
    quiz: {
      question: 'What is the result of the bitwise XOR operation: 5 ^ 3 in C?',
      options: ['6', '7', '1', '15'],
      correctIndex: 0,
      explanation: '5 is 0101 in binary and 3 is 0011. XOR produces 1 when bits differ: 0110 in binary = 6.'
    }
  },
  {
    id: 'c-u2-t3-s2',
    topicId: 'c-u2-t3',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Bitwise Shift Operators (<< and >>)',
    subtitle: 'Bit Shift Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The shift operators move binary bits left or right by a specified number of positions. Left shift (`<<`) multiplies by powers of 2; Right shift (`>>`) divides by powers of 2.',
      definitions: [
        'Left Shift (x << n): Shifts bits left by n positions, filling right vacated bits with 0s. Multiplies x by 2^n.',
        'Right Shift (x >> n): Shifts bits right by n positions. For positive integers, divides x by 2^n.'
      ],
      syntax: `Shift Formulas:
x << n  =>  x * 2^n  (e.g., 5 << 1 = 5 * 2 = 10; 5 << 2 = 5 * 4 = 20)
x >> n  =>  x / 2^n  (e.g., 20 >> 2 = 20 / 4 = 5; 5 >> 1 = 5 / 2 = 2)`,
      realLifeExample: 'Moving digits on an odometer or cash register: shifting "5" one column to the left makes it "50" (multiplied by 10 in decimal). In binary, shifting left multiplies by 2!',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 5; // binary 0000 0101
    printf("Original a = %d\\n", a);
    printf("a << 1 = %d (5 * 2^1 = 10)\\n", a << 1);
    printf("a << 2 = %d (5 * 2^2 = 20)\\n", a << 2);
    
    int b = 20; // binary 0001 0100
    printf("Original b = %d\\n", b);
    printf("b >> 1 = %d (20 / 2^1 = 10)\\n", b >> 1);
    printf("b >> 2 = %d (20 / 2^2 = 5)\\n", b >> 2);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("a << 1 = %d", a << 1);', explanation: 'Shifting 5 (0101) left by 1 bit produces 1010 (10 in decimal).' },
        { line: 'printf("b >> 2 = %d", b >> 2);', explanation: 'Shifting 20 (0001 0100) right by 2 bits produces 0000 0101 (5 in decimal).' }
      ],
      expectedOutput: `Original a = 5\na << 1 = 10 (5 * 2^1 = 10)\na << 2 = 20 (5 * 2^2 = 20)\nOriginal b = 20\nb >> 1 = 10 (20 / 2^1 = 10)\nb >> 2 = 5 (20 / 2^2 = 5)`,
      pointsToRemember: [
        'Shift operators provide ultra-fast hardware multiplication and division by powers of 2.',
        'Never shift by negative numbers or values >= word size.'
      ]
    },
    quiz: {
      question: 'What is the output of the bitwise left shift operation: 5 << 1 ?',
      options: ['10', '25', '2', '6'],
      correctIndex: 0,
      explanation: '5 in binary is 0101. Shifting left by 1 position gives 1010 in binary, which is 10 in decimal (5 * 2^1 = 10).'
    }
  },
  {
    id: 'c-u2-t3-s3',
    topicId: 'c-u2-t3',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Special Operator: sizeof (Memory Footprint)',
    subtitle: 'Memory Analysis Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The `sizeof` operator is a compile-time operator that returns the size of its operand in bytes. The operand can be a variable, literal constant, or data type.',
      definitions: [
        'sizeof Operator: Compile-time operator returning the number of bytes occupied in memory.',
        'size_t: The unsigned integer type returned by sizeof.'
      ],
      syntax: `sizeof Syntax:
sizeof(variable_name)
sizeof(data_type)
sizeof(constant)
Examples:
sizeof(int)        // 4 bytes (on 32-bit)
sizeof(long int)   // 4 or 8 bytes
sizeof(235L)       // size of long constant`,
      realLifeExample: 'Measuring the physical dimensions of a parcel before shipping to know how much cargo space it will occupy.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 10;
    float f = 3.14f;
    double d = 3.14159;
    char c = 'A';
    
    printf("Size of char   : %zu byte\\n", sizeof(c));
    printf("Size of int    : %zu bytes\\n", sizeof(a));
    printf("Size of float  : %zu bytes\\n", sizeof(f));
    printf("Size of double : %zu bytes\\n", sizeof(d));
    printf("Size of 235L   : %zu bytes\\n", sizeof(235L));
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("Size of int: %zu bytes", sizeof(a));', explanation: 'Returns the exact byte count allocated for variable a on the current machine architecture.' }
      ],
      expectedOutput: `Size of char   : 1 byte\nSize of int    : 4 bytes\nSize of float  : 4 bytes\nSize of double : 8 bytes\nSize of 235L   : 4 bytes`,
      pointsToRemember: [
        'sizeof is an operator, NOT a function; it is evaluated at compile time.',
        'Often used in dynamic memory allocation (`malloc(sizeof(int) * n)`).'
      ]
    },
    quiz: {
      question: 'When is the sizeof operator evaluated in C?',
      options: ['At compile time', 'At runtime', 'During linking', 'During pre-processing'],
      correctIndex: 0,
      explanation: 'sizeof is evaluated at compile time by the compiler, not during program execution.'
    }
  },
  {
    id: 'c-u2-t3-s4',
    topicId: 'c-u2-t3',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: Special Operator: The Comma Operator ( , )',
    subtitle: 'Chaining Expressions Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The comma operator links related expressions together. Expressions in a comma-separated list evaluate strictly from left to right, and the value of the rightmost expression becomes the value of the entire combined expression.',
      definitions: [
        'Comma Operator (,): Evaluates expressions left-to-right, discarding all but the rightmost result.',
        'Precedence: Has the absolute LOWEST precedence of ALL operators in C (Level 15).'
      ],
      syntax: `Comma Operator Syntax:
value = (x = 10, y = 5, x + y);
1. Assigns 10 to x
2. Assigns 5 to y
3. Calculates x + y (15) and assigns 15 to value

Applications:
In for loops   : for (n = 1, m = 10; n <= m; n++, m++)
In swapping    : t = x, x = y, y = t;`,
      realLifeExample: 'Following a multi-step checklist: "Wash car, dry car, apply wax". The final status of your car is based on the last step completed (waxed).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int x, y;
    // Comma-linked expression
    int value = (x = 10, y = 5, x + y);
    printf("x = %d, y = %d, combined value = %d\\n", x, y, value);
    
    // Multiple loop variables using comma operator
    printf("For loop using comma operator:\\n");
    for (int i = 1, j = 5; i <= 3; i++, j--) {
        printf("i=%d, j=%d | ", i, j);
    }
    printf("\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int value = (x = 10, y = 5, x + y);', explanation: 'Evaluates x=10, y=5, then x+y=15. Result 15 is assigned to value.' }
      ],
      expectedOutput: `x = 10, y = 5, combined value = 15\nFor loop using comma operator:\ni=1, j=5 | i=2, j=4 | i=3, j=3 | `,
      pointsToRemember: [
        'The comma operator has the lowest precedence in C; parentheses are mandatory!',
        'Without parentheses: `int a = 1, 2;` causes a syntax error.'
      ]
    },
    quiz: {
      question: 'What is the value of variable result after: int result = (a = 2, b = 4, a * b); ?',
      options: ['8', '2', '4', '6'],
      correctIndex: 0,
      explanation: 'The comma operator evaluates left to right: a=2, b=4, then evaluates rightmost expression a * b = 8.'
    }
  },
  {
    id: 'c-u2-t3-s5',
    topicId: 'c-u2-t3',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Special Pointer Operators: Address-of (&) and Value (*)',
    subtitle: 'Pointer Operators Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Pointers allow C to interact directly with hardware memory. Two fundamental operators govern pointers: `&` (address-of operator) and `*` (dereference / value-at-address operator).',
      definitions: [
        '& (Address-of Operator): Returns the physical memory address where a variable is stored.',
        '* (Dereference Operator): Accesses or retrieves the data value stored at a given memory address.'
      ],
      syntax: `Pointer Operators:
int a = 10;
int *p = &a; // p stores the address of a
int val = *p; // *p retrieves the value at address p (10)`,
      realLifeExample: 'An envelope with an address written on the outside: `&letter` is the street address written on the envelope; `*letter` is opening the envelope and reading the paper inside.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 10;
    int *p = &a; // p points to a
    
    printf("Value of a              : %d\\n", a);
    printf("Address of a (&a)       : %p\\n", (void*)&a);
    printf("Pointer p contains      : %p\\n", (void*)p);
    printf("Value at address (*p)   : %d\\n", *p);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int *p = &a;', explanation: 'Stores the RAM byte coordinate of variable a into pointer p.' },
        { line: 'printf("%d", *p);', explanation: 'Dereferences p to retrieve the value 10 stored at that address.' }
      ],
      expectedOutput: `Value of a              : 10\nAddress of a (&a)       : 0x...\nPointer p contains      : 0x...\nValue at address (*p)   : 10`,
      pointsToRemember: [
        '& gets the address; * gets the value at that address.',
        'Both & and * have higher precedence than arithmetic operators.'
      ]
    },
    quiz: {
      question: 'If int a = 20; and int *p = &a; what does "*p" yield?',
      options: ['20', 'Memory address of a', 'Memory address of p', '0'],
      correctIndex: 0,
      explanation: '*p dereferences the pointer, fetching the value stored at that address (20).'
    }
  },

  // =========================================================================
  // TOPIC 4: Arithmetic Expressions & Order of Evaluation -> Stages 1 to 4
  // =========================================================================
  {
    id: 'c-u2-t4-s1',
    topicId: 'c-u2-t4',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Algebraic Expressions vs C Expressions',
    subtitle: 'Expression Syntax Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'In algebra, multiplication is often implied (e.g., `ab` or `3x`), and powers use superscripts ($x^2$). In C, every single operation must be explicitly specified with an operator, and there is no built-in exponentiation operator.',
      definitions: [
        'Arithmetic Expression: Combination of variables, constants, and operators obeying C grammar rules.',
        'Missing Exponentiation: In C, `^` is bitwise XOR, NOT power! Must write `x * x` or `pow(x, 2)`.'
      ],
      syntax: `Algebraic to C Translation Table:
Algebraic Expression    C Equivalent Expression
a x b - c               a * b - c
(m + n)(x + y)          (m + n) * (x + y)
ab / c                  a * b / c
3x^2 + 2x + 1           3 * x * x + 2 * x + 1
(x / y) + c             x / y + c`,
      realLifeExample: 'Translating shorthand texting ("wbu") into formal speech ("What about you?"). Compilers cannot guess implied operations.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    float x = 2.0f;
    // Algebraic: 3x^2 + 2x + 1
    // C Syntax : 3 * x * x + 2 * x + 1
    float result = 3 * x * x + 2 * x + 1;
    printf("Evaluating 3x^2 + 2x + 1 for x = %.1f -> Result: %.1f\\n", x, result);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'float result = 3 * x * x + 2 * x + 1;', explanation: 'Translates 3x^2 explicitly into 3 * x * x.' }
      ],
      expectedOutput: `Evaluating 3x^2 + 2x + 1 for x = 2.0 -> Result: 17.0`,
      pointsToRemember: [
        'Never write `ab` in C; always write `a * b`.',
        'Never use `x^2` for powers; use `x * x` or `pow(x, 2)`.`'
      ]
    },
    quiz: {
      question: 'How should the algebraic expression "(m + n)(x + y)" be written in C?',
      options: ['(m + n) * (x + y)', '(m + n)(x + y)', 'm + n * x + y', '(m + n) ^ (x + y)'],
      correctIndex: 0,
      explanation: 'Multiplication cannot be implied in C; the `*` operator must be explicitly written between parenthesized expressions.'
    }
  },
  {
    id: 'c-u2-t4-s2',
    topicId: 'c-u2-t4',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Expression Formats: Infix, Prefix & Postfix',
    subtitle: 'Notation Architecture Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Expressions can be classified based on where the operator sits relative to its operands: Infix, Prefix (Polish notation), and Postfix (Reverse Polish notation RPN).',
      definitions: [
        'Infix: Operator is placed BETWEEN operands (e.g., `3 + 4 * 2`). Standard notation in C.',
        'Prefix (Polish): Operator is placed BEFORE operands (e.g., `+ 3 4`).',
        'Postfix (Reverse Polish): Operator is placed AFTER operands (e.g., `3 4 +`). Ideal for computer stack evaluation.'
      ],
      syntax: `Notation Comparison:
Expression Type    Operator Placement    Example
Infix              Between operands      A + B
Prefix (Polish)    Before operands       + A B
Postfix (RPN)      After operands        A B +`,
      realLifeExample: 'English grammar vs other languages: saying "Eat the apple" (verb first) vs "The apple is eaten" (verb last). Computers prefer Postfix because it eliminates parentheses!',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // Infix expression natively evaluated by C
    int infixResult = 3 + 4 * 2; // 3 + 8 = 11
    printf("Infix expression (3 + 4 * 2) = %d\\n", infixResult);
    printf("Equivalent Prefix : + 3 * 4 2\\n");
    printf("Equivalent Postfix: 3 4 2 * +\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int infixResult = 3 + 4 * 2;', explanation: 'Standard C infix expression evaluated using operator precedence.' }
      ],
      expectedOutput: `Infix expression (3 + 4 * 2) = 11\nEquivalent Prefix : + 3 * 4 2\nEquivalent Postfix: 3 4 2 * +`,
      pointsToRemember: [
        'C source code is written in Infix format.',
        'Compilers convert Infix expressions to Postfix for stack evaluation.'
      ]
    },
    quiz: {
      question: 'Which notation places the operator AFTER its operands (e.g. "3 4 +")?',
      options: ['Postfix (Reverse Polish Notation)', 'Infix Notation', 'Prefix Notation', 'Polish Notation'],
      correctIndex: 0,
      explanation: 'Postfix notation (Reverse Polish Notation) places operators after their operands.'
    }
  },
  {
    id: 'c-u2-t4-s3',
    topicId: 'c-u2-t4',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Two-Pass Evaluation of Arithmetic Expressions',
    subtitle: 'Evaluation Hierarchy Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'When evaluating an arithmetic expression without parentheses, C performs a two-pass left-to-right procedure: Pass 1 evaluates High Priority operators (*, /, %), and Pass 2 evaluates Low Priority operators (+, -).',
      definitions: [
        'High Priority Operators: `*`, `/`, `%`',
        'Low Priority Operators: `+`, `-`',
        'Pass 1: High priority operators applied as encountered from left to right.',
        'Pass 2: Low priority operators applied as encountered from left to right.'
      ],
      syntax: `Worked University Syllabus Example:
Evaluate: x = a - b / 3 + c * 2 - 1
Given   : a = 9, b = 12, c = 3
Equation: x = 9 - 12 / 3 + 3 * 2 - 1

PASS 1 (High priority * and / left-to-right):
Step 1: 12 / 3 = 4   => x = 9 - 4 + 3 * 2 - 1
Step 2: 3 * 2  = 6   => x = 9 - 4 + 6 - 1

PASS 2 (Low priority + and - left-to-right):
Step 3: 9 - 4  = 5   => x = 5 + 6 - 1
Step 4: 5 + 6  = 11  => x = 11 - 1
Step 5: 11 - 1 = 10  => x = 10`,
      realLifeExample: 'BODMAS in school mathematics: doing multiplication and division first before addition and subtraction.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    float a = 9, b = 12, c = 3;
    float x = a - b / 3 + c * 2 - 1;
    printf("Expression: 9 - 12/3 + 3*2 - 1\\n");
    printf("Two-pass evaluated result: %.1f\\n", x);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'float x = a - b / 3 + c * 2 - 1;', explanation: 'Follows Pass 1 (division and multiplication) then Pass 2 (subtraction and addition).' }
      ],
      expectedOutput: `Expression: 9 - 12/3 + 3*2 - 1\nTwo-pass evaluated result: 10.0`,
      pointsToRemember: [
        '*, /, % share the same high priority level.',
        '+ and - share the same low priority level.',
        'Within the same pass, evaluation proceeds strictly left to right.'
      ]
    },
    quiz: {
      question: 'In the expression "10 + 5 * 2", what is the evaluated result in C?',
      options: ['20', '30', '25', '100'],
      correctIndex: 0,
      explanation: '* has higher precedence than +. 5 * 2 = 10 is evaluated first, then 10 + 10 = 20.'
    }
  },
  {
    id: 'c-u2-t4-s4',
    topicId: 'c-u2-t4',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: The 6 Rules for Evaluation of Expressions',
    subtitle: 'Evaluation Rules Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C compilers follow 6 formal, unambiguous rules when parsing and executing complex nested expressions with parentheses.',
      definitions: [
        'Parentheses Hierarchy: Parentheses `()` possess the highest priority of all constructs in C.'
      ],
      syntax: `The 6 Official Evaluation Rules:
1. First, parenthesized sub-expressions from left to right are evaluated.
2. If parentheses are nested, evaluation begins with the innermost sub-expression.
3. The precedence rule is applied in determining the order of operators in sub-expressions.
4. The associativity rule is applied when two or more operators of the same precedence appear.
5. Arithmetic expressions are evaluated from left to right using rules of precedence.
6. When parentheses are used, expressions within parentheses assume highest priority.`,
      realLifeExample: 'Russian nesting dolls (Matryoshka): to see the whole doll, you must open the innermost doll first before moving outward.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    float a = 9, b = 12, c = 3;
    
    // Rule 2: Innermost parentheses (3 + c) evaluated first
    float z = a - (b / (3 + c) * 2) - 1;
    // Step 1: (3 + 3) = 6
    // Step 2: (12 / 6 * 2) = (2 * 2) = 4
    // Step 3: 9 - 4 - 1 = 4
    
    printf("Evaluating nested parentheses: %.1f\\n", z);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'float z = a - (b / (3 + c) * 2) - 1;', explanation: 'Innermost (3+c) evaluates first, followed by outer parentheses, then subtraction.' }
      ],
      expectedOutput: `Evaluating nested parentheses: 4.0`,
      pointsToRemember: [
        'Always evaluate innermost parentheses first.',
        'Use parentheses whenever in doubt to make intent explicit.'
      ]
    },
    quiz: {
      question: 'When parentheses are nested inside an expression, which sub-expression is evaluated first?',
      options: ['The innermost sub-expression', 'The outermost sub-expression', 'The leftmost operator outside parentheses', 'Arbitrary order'],
      correctIndex: 0,
      explanation: 'Rule 2 states that if parentheses are nested, evaluation always begins with the innermost sub-expression.'
    }
  },

  // =========================================================================
  // TOPIC 5: Operator Precedence, Associativity & Math Functions -> Stages 1 to 5
  // =========================================================================
  {
    id: 'c-u2-t5-s1',
    topicId: 'c-u2-t5',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Precedence vs. Associativity — Resolving Operator Ties',
    subtitle: 'Precedence & Ties Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Precedence determines which operator acts first when operators of DIFFERENT levels appear. Associativity resolves ties when two or more operators of the SAME precedence level appear in an expression.',
      definitions: [
        'Precedence: Priority ranking of different operators (e.g. * has higher precedence than +).',
        'Associativity: Direction of binding (Left-to-Right or Right-to-Left) for operators of equal precedence.'
      ],
      syntax: `Precedence vs Associativity:
1. Precedence Example:
   10 + 20 * 30 => * wins over + => 10 + 600 = 610

2. Associativity Example (/ and % have equal precedence, Left-to-Right):
   100 / 5 % 2 => (100 / 5) evaluated first = 20 => 20 % 2 = 0`,
      realLifeExample: 'Precedence is emergency vehicles getting priority over regular cars. Associativity is four cars arriving at an intersection at the same time and following right-of-way rules.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // 100 / 5 % 2: / and % have equal precedence
    // Left-to-Right associativity dictates: (100 / 5) % 2 = 20 % 2 = 0
    int res = 100 / 5 % 2;
    printf("100 / 5 %% 2 = %d (evaluated Left-to-Right)\\n", res);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int res = 100 / 5 % 2;', explanation: '/ and % share priority level 3. Left-to-right rule evaluates 100/5 first, then 20%2.' }
      ],
      expectedOutput: `100 / 5 % 2 = 0 (evaluated Left-to-Right)`,
      pointsToRemember: [
        'Precedence decides order between different operators.',
        'Associativity decides order between same-level operators.'
      ]
    },
    quiz: {
      question: 'When is operator associativity applied during expression evaluation?',
      options: [
        'When two or more operators of the SAME precedence level appear in an expression',
        'When operators of different precedence appear',
        'Only when parentheses are missing',
        'Only during compilation errors'
      ],
      correctIndex: 0,
      explanation: 'Associativity breaks ties when multiple operators have the same precedence.'
    }
  },
  {
    id: 'c-u2-t5-s2',
    topicId: 'c-u2-t5',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: The 15-Level Precedence Table & PUMA\'S REBL TAC',
    subtitle: 'Precedence Table Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C defines a strict 15-level operator precedence table. To memorize this hierarchy easily for exams, use the standard university mnemonic: PUMA\'S REBL TAC.',
      definitions: [
        'PUMA\'S REBL TAC: Mnemonic acronym representing the 11 functional tiers of operator precedence.'
      ],
      syntax: `The PUMA'S REBL TAC Mnemonic:
P = Postfix operators          () [] . -> ++ -- (Level 1)
U = Unary operators            ++ -- + - ! ~ * & sizeof (Level 2)
M = Multiplicative operators   * / % (Level 3)
A = Additive operators         + - (Level 4)
S = Shift operators            << >> (Level 5)
R = Relational operators       < <= > >= (Level 6)
E = Equality operators         == != (Level 7)
B = Bitwise operators          & ^ | (Levels 8-10)
L = Logical operators          && || (Levels 11-12)
T = Ternary conditional        ?: (Level 13)
A = Assignment operators       = += -= *= /= etc. (Level 14)
C = Comma operator             , (Level 15 - LOWEST)`,
      realLifeExample: 'Like "Please Excuse My Dear Aunt Sally" (PEMDAS) in math, "PUMA\'S REBL TAC" is the master key for C operator precedence.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    printf("Master Mnemonic for Operator Precedence:\\n");
    printf("P - Postfix       (Highest)\\n");
    printf("U - Unary\\n");
    printf("M - Multiplicative (* / %%)\\n");
    printf("A - Additive       (+ -)\\n");
    printf("S - Shift          (<< >>)\\n");
    printf("R - Relational     (< <= > >=)\\n");
    printf("E - Equality       (== !=)\\n");
    printf("B - Bitwise        (& ^ |)\\n");
    printf("L - Logical        (&& ||)\\n");
    printf("T - Ternary        (?:)\\n");
    printf("A - Assignment     (= += -=)\\n");
    printf("C - Comma          (Lowest)\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf(...)', explanation: 'Outputs the complete PUMA\'S REBL TAC hierarchy.' }
      ],
      expectedOutput: `Master Mnemonic for Operator Precedence:\nP - Postfix       (Highest)\nU - Unary\nM - Multiplicative (* / %)\nA - Additive       (+ -)\nS - Shift          (<< >>)\nR - Relational     (< <= > >=)\nE - Equality       (== !=)\nB - Bitwise        (& ^ |)\nL - Logical        (&& ||)\nT - Ternary        (?:)\nA - Assignment     (= += -=)\nC - Comma          (Lowest)`,
      pointsToRemember: [
        'Comma operator (,) has the lowest precedence in C.',
        'Parentheses `()` and postfix operators have the highest precedence.'
      ]
    },
    quiz: {
      question: 'Which operator has the absolute LOWEST precedence of all operators in C?',
      options: ['Comma operator (,)', 'Assignment operator (=)', 'Addition (+)', 'Logical OR (||)'],
      correctIndex: 0,
      explanation: 'The comma operator (`,`) has Level 15 precedence, the lowest of all operators in C.'
    }
  },
  {
    id: 'c-u2-t5-s3',
    topicId: 'c-u2-t5',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Left-to-Right vs. Right-to-Left Associativity Groups',
    subtitle: 'Associativity Groups Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Almost all binary operators in C evaluate Left-to-Right. However, three critical operator categories evaluate from Right-to-Left: Unary operators, the Ternary conditional operator, and Assignment operators.',
      definitions: [
        'Left-to-Right Associativity: Evaluates `(a op b) op c`.',
        'Right-to-Left Associativity: Evaluates `a op (b op c)`.'
      ],
      syntax: `The 3 Right-to-Left Operator Groups:
1. Unary Operators (Level 2)     : ++, --, +, -, !, ~, *, &, sizeof
2. Ternary Operator (Level 13)   : ?:
3. Assignment Operators (Level 14): =, +=, -=, *=, /=, %=, <<=, >>=, &=, ^=, |=
(All other operators associate Left-to-Right!)`,
      realLifeExample: 'Passing a baton in a relay race: Left-to-Right. Hanging coats in a closet from back to front: Right-to-Left.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a, b, c;
    // Right-to-Left assignment:
    // Step 1: c = 10
    // Step 2: b = c (10)
    // Step 3: a = b (10)
    a = b = c = 10;
    printf("Right-to-Left assignment: a=%d, b=%d, c=%d\\n", a, b, c);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'a = b = c = 10;', explanation: 'Right-to-Left: (c = 10) executes first, returning 10, then b = 10, then a = 10.' }
      ],
      expectedOutput: `Right-to-Left assignment: a=10, b=10, c=10`,
      pointsToRemember: [
        'Only Unary, Ternary, and Assignment operators evaluate Right-to-Left.',
        'All arithmetic, relational, bitwise, and logical operators evaluate Left-to-Right.'
      ]
    },
    quiz: {
      question: 'Which of the following operators evaluates with Right-to-Left associativity?',
      options: ['Assignment operator (=)', 'Addition (+)', 'Multiplication (*)', 'Bitwise OR (|)'],
      correctIndex: 0,
      explanation: 'Assignment operators (=, +=, -=, etc.) evaluate from Right to Left.'
    }
  },
  {
    id: 'c-u2-t5-s4',
    topicId: 'c-u2-t5',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: Mathematical Library (<math.h>): sqrt, pow, ceil, floor',
    subtitle: 'Math Library Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C provides advanced mathematical functions via the `<math.h>` standard library. Functions accept `double` arguments and return `double` results.',
      definitions: [
        '<math.h>: Standard C library header declaring mathematical functions.',
        'ceil(x): Returns the smallest integer greater than or equal to x (rounds UP).',
        'floor(x): Returns the largest integer less than or equal to x (rounds DOWN).'
      ],
      syntax: `Common <math.h> Functions:
Function       Description                Example        Result
sqrt(x)        Square root of x           sqrt(25.0)     5.0
pow(x, y)      x raised to power y        pow(2.0, 3.0)  8.0
ceil(x)        Rounds up to integer       ceil(2.3)      3.0
floor(x)       Rounds down to integer     floor(2.7)     2.0
log(x)         Natural logarithm (base e) log(2.71828)   1.0
log10(x)       Base-10 logarithm          log10(100.0)   2.0
exp(x)         Exponential (e^x)          exp(1.0)       2.71828
sin(x), tan(x) Trig functions in radians  sin(0.0)       0.0`,
      realLifeExample: 'Billing taxi fares: any fraction of a mile is rounded UP to the next full mile using `ceil()`. Measuring age: you remain 19 until your 20th birthday using `floor()`.',
      codeSnippet: `#include <stdio.h>
#include <math.h>

int main(void) {
    printf("sqrt(49.0)    = %.1f\\n", sqrt(49.0));
    printf("pow(3.0, 4.0) = %.1f (3^4)\\n", pow(3.0, 4.0));
    printf("ceil(5.1)     = %.1f (Rounds up)\\n", ceil(5.1));
    printf("floor(5.9)    = %.1f (Rounds down)\\n", floor(5.9));
    printf("log10(1000.0) = %.1f\\n", log10(1000.0));
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("ceil(5.1) = %.1f", ceil(5.1));', explanation: 'Rounds 5.1 up to 6.0.' },
        { line: 'printf("floor(5.9) = %.1f", floor(5.9));', explanation: 'Rounds 5.9 down to 5.0.' }
      ],
      expectedOutput: `sqrt(49.0)    = 7.0\npow(3.0, 4.0) = 81.0 (3^4)\nceil(5.1)     = 6.0 (Rounds up)\nfloor(5.9)    = 5.0 (Rounds down)\nlog10(1000.0) = 3.0`,
      pointsToRemember: [
        'Always include `#include <math.h>` when using math functions.',
        'ceil rounds UP; floor rounds DOWN.'
      ]
    },
    quiz: {
      question: 'What is the return value of ceil(4.2) in C?',
      options: ['5.0', '4.0', '4.5', '4.2'],
      correctIndex: 0,
      explanation: 'ceil() rounds up to the nearest integer ceiling, so 4.2 becomes 5.0.'
    }
  },
  {
    id: 'c-u2-t5-s5',
    topicId: 'c-u2-t5',
    unitId: 'c-unit-2',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Capstone Challenge: Solving Quadratic Equations (ax^2 + bx + c = 0)',
    subtitle: 'Practice Program Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The classic practice program in Unit 2 computes the roots of a quadratic equation $ax^2 + bx + c = 0$ using the discriminant $D = b^2 - 4ac$ and math functions from `<math.h>`.',
      definitions: [
        'Quadratic Equation: Polynomial equation of the second degree: ax^2 + bx + c = 0.',
        'Discriminant (D): b^2 - 4ac. If D >= 0, roots are real; if D < 0, roots are complex.',
        'Quadratic Formula: r1, r2 = (-b ± sqrt(D)) / (2a).'
      ],
      syntax: `Quadratic Formula:
D = b * b - 4 * a * c;
root1 = (-b + sqrt(D)) / (2 * a);
root2 = (-b - sqrt(D)) / (2 * a);`,
      realLifeExample: 'Calculating trajectory in physics: determining the exact seconds when a launched rocket will reach ground level.',
      codeSnippet: `#include <stdio.h>
#include <math.h>

int main(void) {
    // Equation: x^2 - 5x + 6 = 0 (a = 1, b = -5, c = 6)
    // Expected roots: (x - 2)(x - 3) = 0 -> roots are 3 and 2
    double a = 1.0, b = -5.0, c = 6.0;
    double d = b * b - 4 * a * c; // Discriminant: 25 - 24 = 1
    
    if (d > 0) {
        double r1 = (-b + sqrt(d)) / (2 * a);
        double r2 = (-b - sqrt(d)) / (2 * a);
        printf("Two Distinct Real Roots:\\n");
        printf("Root 1 = %.2f\\n", r1);
        printf("Root 2 = %.2f\\n", r2);
    } else if (d == 0) {
        double r = -b / (2 * a);
        printf("One Real Repeated Root: %.2f\\n", r);
    } else {
        printf("Roots are imaginary/complex.\\n");
    }
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'double d = b * b - 4 * a * c;', explanation: 'Calculates the discriminant b^2 - 4ac without using the missing ^ operator.' },
        { line: 'double r1 = (-b + sqrt(d)) / (2 * a);', explanation: 'Computes first root using sqrt() from math.h and parenthesizing (2 * a).' }
      ],
      expectedOutput: `Two Distinct Real Roots:\nRoot 1 = 3.00\nRoot 2 = 2.00`,
      pointsToRemember: [
        'Always write `(2 * a)` with parentheses; writing `/ 2 * a` will divide by 2 then multiply by a!',
        'Discriminant D determines whether roots are real or complex.'
      ]
    },
    quiz: {
      question: 'Why must the denominator in the quadratic formula be written as "/ (2 * a)" instead of "/ 2 * a"?',
      options: [
        'Because without parentheses, / and * evaluate left-to-right, dividing by 2 and then multiplying by a',
        'Because 2 is not an integer in C',
        'Because math.h forbids multiplying by 2',
        'It makes no difference'
      ],
      correctIndex: 0,
      explanation: 'In `/ 2 * a`, left-to-right associativity divides by 2 first, and then multiplies the entire result by a, producing an erroneous answer.'
    }
  }
];
