import { Unit, Quiz } from '@/types';

export const cUnit2: Unit = {
  id: 'c-unit-2',
  courseId: 'c',
  unitNumber: 2,
  title: 'Operators and Expressions',
  description: 'Master all 8 categories of C operators, algebraic expression translation, two-pass evaluation, the 15-level precedence hierarchy with PUMA\'S REBL TAC, standard <math.h> functions, and quadratic equation solving.',
  estimatedHours: 6.0,
  quizId: 'quiz-c-2',
  published: true,
  topics: [
    {
      id: 'c-u2-t1',
      unitId: 'c-unit-2',
      courseId: 'c',
      order: 1,
      title: 'Arithmetic, Assignment, Increment & Decrement Operators',
      summary: 'Explore basic math operations (+, -, *, /, %), shorthand assignment operators (+=, -=, *=, /=, %=), and the subtle differences between prefix and postfix increment/decrement.',
      content: {
        definition: 'An Operator is a symbol that tells the computer to perform mathematical or logical manipulations on operands. Arithmetic operators perform basic arithmetic computations; Assignment operators assign expression results to variables; Increment (++) and Decrement (--) operators increase or decrease the value of a variable by exactly 1.',
        syntax: `/* 1. Arithmetic Operators:
   + : Addition or unary plus (e.g. 5 + 3 = 8)
   - : Subtraction or unary minus (e.g. 5 - 3 = 2, -x negates x)
   * : Multiplication (e.g. 5 * 3 = 15)
   / : Division (e.g. 6 / 3 = 2; integer division truncates fractions: 7 / 2 = 3)
   % : Modulo division (returns remainder: 5 % 3 = 2; integer types ONLY) */

/* 2. Shorthand Assignment Operators:
   Format: v op= exp;  is equivalent to:  v = v op (exp);
   += : a += 1  => a = a + 1
   -= : a -= 1  => a = a - 1
   *= : a *= n+1 => a = a * (n + 1)
   /= : a /= n+1 => a = a / (n + 1)
   %= : a %= b   => a = a % b
   Advantages: (1) concise to read, (2) left-hand side evaluated once, (3) more efficient. */

/* 3. Increment and Decrement Operators:
   ++m (Prefix)  : m is incremented FIRST, then expression is evaluated using new value.
   m++ (Postfix) : Expression is evaluated using original value FIRST, then m is incremented.
   --m (Prefix)  : Decrements first, then uses new value.
   m-- (Postfix) : Uses original value, then decrements. */`,
        codeSnippet: `/* Comprehensive Demonstration of Arithmetic, Shorthand, and Increment/Decrement */
#include <stdio.h>

int main(void) {
    int a = 10, b = 3;
    printf("--- 1. Basic Arithmetic Operators ---\\n");
    printf("Addition      : %d + %d = %d\\n", a, b, a + b);
    printf("Subtraction   : %d - %d = %d\\n", a, b, a - b);
    printf("Multiplication: %d * %d = %d\\n", a, b, a * b);
    printf("Division      : %d / %d = %d (Integer division truncates!)\\n", a, b, a / b);
    printf("Modulus       : %d %% %d = %d (Remainder)\\n", a, b, a % b);

    printf("\\n--- 2. Shorthand Assignment Operators ---\\n");
    int x = 25;
    x += 5; // x = x + 5 = 30
    printf("x += 5 -> %d\\n", x);
    x *= 2; // x = x * 2 = 60
    printf("x *= 2 -> %d\\n", x);
    x %= 7; // x = x % 7 = 4
    printf("x %%= 7 -> %d\\n", x);

    printf("\\n--- 3. Prefix vs Postfix Demonstration ---\\n");
    int count = 5;
    printf("Initial count = %d\\n", count);
    printf("Prefix  (++count) prints: %d (incremented before printing)\\n", ++count); // 6
    printf("Postfix (count++) prints: %d (printed first, then incremented)\\n", count++); // 6
    printf("Final value of count    : %d\\n", count); // 7

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'printf("Division: %d / %d = %d\\n", a, b, a / b);', explanation: 'When both operands are integers, C drops fractional parts (10 / 3 = 3).' },
          { line: 'x += 5;', explanation: 'Shorthand for x = x + 5. Operates in-place with fewer CPU instructions.' },
          { line: 'printf("Prefix ++count: %d", ++count);', explanation: 'Prefix: count increments from 5 to 6, then 6 is passed to printf.' },
          { line: 'printf("Postfix count++: %d", count++);', explanation: 'Postfix: current value 6 is passed to printf first, and then count becomes 7.' }
        ],
        keyConcepts: [
          'Modulo (%) operator can ONLY be applied to integer operands (char, int, short, long); it cannot be used on float or double.',
          'Integer division (e.g. 5 / 2) results in 2, not 2.5.',
          'Unary minus (-x) multiplies single operand by -1, changing its algebraic sign.',
          'Shorthand operators evaluate the variable on the left-hand side only once.',
          'Prefix (++x) = Increment then Use; Postfix (x++) = Use then Increment.'
        ],
        commonMistakes: [
          'Trying to use % with floating point numbers (e.g. 5.5 % 2 causes compiler error)',
          'Confusing postfix (x++) with prefix (++x) inside conditional tests or output statements',
          'Writing x =+ 1 instead of x += 1 (the former assigns positive 1 to x!)'
        ],
        quickRevision: [
          '+, -, *, /, % are the 5 arithmetic operators.',
          'v op= exp is equivalent to v = v op (exp).',
          '++x increments first; x++ increments after evaluation.'
        ]
      }
    },
    {
      id: 'c-u2-t2',
      unitId: 'c-unit-2',
      courseId: 'c',
      order: 2,
      title: 'Relational, Logical & Conditional (Ternary) Operators',
      summary: 'Evaluate comparisons with relational operators, combine conditions with logical AND/OR/NOT, and make compact decisions with the ternary operator.',
      content: {
        definition: 'Relational operators compare two operands and yield an integer truth value: 1 for True and 0 for False. Logical operators (&&, ||, !) combine multiple relational expressions into compound conditions. The Conditional Operator (? :) is C’s unique ternary operator that evaluates conditions and returns one of two expressions.',
        syntax: `/* 1. Relational Operators (Produce 1 for TRUE, 0 for FALSE):
   == : Equal to (5 == 5 yields 1)
   != : Not equal to (5 != 3 yields 1)
   >  : Greater than (5 > 3 yields 1)
   <  : Less than (5 < 6 yields 1)
   >= : Greater than or equal to (5 >= 5 yields 1)
   <= : Less than or equal to (5 <= 6 yields 1) */

/* 2. Logical Operators:
   && : Logical AND (True only if BOTH conditions are true)
   || : Logical OR  (True if AT LEAST ONE condition is true)
   !  : Logical NOT (Reverses truth value: !1 = 0, !0 = 1) */

/* 3. Conditional / Ternary Operator (? :):
   Syntax: variable = (condition) ? expression1 : expression2;
   - If condition is TRUE (non-zero)  -> expression1 is evaluated and returned.
   - If condition is FALSE (zero)     -> expression2 is evaluated and returned. */`,
        codeSnippet: `/* Demonstrating Relational, Logical, and Conditional Operators */
#include <stdio.h>

int main(void) {
    int a = 10, b = 3;

    printf("--- Relational Expressions (1 = True, 0 = False) ---\\n");
    printf("a == b : %d\\n", a == b); // 0 (false)
    printf("a != b : %d\\n", a != b); // 1 (true)
    printf("a > b  : %d\\n", a > b);  // 1 (true)
    printf("a < b  : %d\\n", a < b);  // 0 (false)

    printf("\\n--- Logical Operators with Compound Conditions ---\\n");
    int x = 1, y = 0;
    printf("x && y : %d (Logical AND)\\n", x && y); // 0
    printf("x || y : %d (Logical OR)\\n", x || y);  // 1
    printf("!x     : %d (Logical NOT)\\n", !x);     // 0

    // Relational + Logical combination: (5 > 3) && (3 < 2)
    int test = (5 > 3) && (3 < 2);
    printf("(5 > 3) && (3 < 2) yields: %d (since True && False = False)\\n", test);

    printf("\\n--- Conditional / Ternary Operator ---\\n");
    // Find largest of two numbers in a single concise line
    int max = (a > b) ? a : b;
    printf("Largest between %d and %d is: %d\\n", a, b, max);

    // Even or Odd check using ternary operator
    int num = 14;
    printf("Number %d is %s\\n", num, (num % 2 == 0) ? "EVEN" : "ODD");

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'printf("a == b : %d", a == b);', explanation: 'Equality test returns 0 because 10 does not equal 3.' },
          { line: 'int test = (5 > 3) && (3 < 2);', explanation: '5 > 3 is 1 (True), 3 < 2 is 0 (False). 1 && 0 evaluates to 0.' },
          { line: 'int max = (a > b) ? a : b;', explanation: 'Ternary operator: if (a > b) is true, assigns a; otherwise assigns b.' },
          { line: '(num % 2 == 0) ? "EVEN" : "ODD"', explanation: 'Inline ternary decision formatting string output without needing full if-else block.' }
        ],
        keyConcepts: [
          'In C, there is no separate boolean type in classic C89: 0 is False, any non-zero value is True.',
          'Short-Circuit Evaluation: In (A && B), if A is false (0), B is NEVER evaluated. In (A || B), if A is true (1), B is NEVER evaluated.',
          'Conditional operator (? :) is the only ternary operator in C because it requires exactly 3 operands.',
          'Parentheses improve readability in compound relational expressions.'
        ],
        commonMistakes: [
          'Confusing assignment (=) with equality comparison (==). Writing if (a = b) assigns b to a!',
          'Writing chained comparisons like (10 < x < 20). In C, this evaluates (10 < x) first (yields 0 or 1), then checks 0/1 < 20, which is always True! Use: (x > 10 && x < 20)'
        ],
        quickRevision: [
          'Relational: ==, !=, >, <, >=, <= (result is 1 or 0).',
          'Logical: && (AND), || (OR), ! (NOT).',
          'Ternary: (condition) ? exp_if_true : exp_if_false.'
        ]
      }
    },
    {
      id: 'c-u2-t3',
      unitId: 'c-unit-2',
      courseId: 'c',
      order: 3,
      title: 'Bitwise Operators & Special Operators (sizeof, comma, &, *)',
      summary: 'Manipulate data at the bit level with AND, OR, XOR, NOT, and shift operators; inspect memory with sizeof, chain expressions with comma, and use pointer operators.',
      content: {
        definition: 'Bitwise operators manipulate individual binary bits (0 and 1) of integer data types. They are used for testing bits, setting flags, or shifting bits left and right. Special operators include sizeof (returns byte size at compile time), comma (evaluates expressions left-to-right and yields rightmost value), and pointer operators (& for address and * for dereference).',
        syntax: `/* 1. Bitwise Operators (Operate ONLY on char, int, short, long - NOT float/double):
   &  : Bitwise AND (1 only if both corresponding bits are 1)
   |  : Bitwise OR  (1 if either corresponding bit is 1)
   ^  : Bitwise XOR (1 if bits are different; 0 if same)
   ~  : Bitwise NOT (One's complement: inverts all bits)
   << : Left Shift  (x << n shifts bits left, multiplies by 2^n)
   >> : Right Shift (x >> n shifts bits right, divides by 2^n) */

/* 2. Special Operators:
   sizeof  : Compile-time operator returning memory size in bytes of a variable, constant, or data type.
   Comma , : Links related expressions. Evaluates left-to-right; value of rightmost expression is returned.
             Has the LOWEST precedence of all operators in C!
   &       : Address-of operator (returns memory address of variable).
   *       : Pointer dereference operator (accesses value stored at memory address). */`,
        codeSnippet: `/* Comprehensive Demonstration of Bitwise and Special Operators */
#include <stdio.h>

int main(void) {
    // 5 in binary: 0000 0101 | 3 in binary: 0000 0011
    int a = 5, b = 3;

    printf("--- 1. Bitwise Operators (a = 5, b = 3) ---\\n");
    printf("a & b : %d (Binary 0001 = 1)\\n", a & b);
    printf("a | b : %d (Binary 0111 = 7)\\n", a | b);
    printf("a ^ b : %d (Binary 0110 = 6)\\n", a ^ b);
    printf("~a    : %d (Two's complement of 5 = -6)\\n", ~a);
    printf("a << 1: %d (Left shift 5 * 2^1 = 10)\\n", a << 1);
    printf("a >> 1: %d (Right shift 5 / 2^1 = 2)\\n", a >> 1);

    printf("\\n--- 2. Special Operator: sizeof ---\\n");
    printf("sizeof(char)     : %zu byte\\n", sizeof(char));
    printf("sizeof(int)      : %zu bytes\\n", sizeof(int));
    printf("sizeof(float)    : %zu bytes\\n", sizeof(float));
    printf("sizeof(double)   : %zu bytes\\n", sizeof(double));
    printf("sizeof(long int) : %zu bytes\\n", sizeof(long int));

    printf("\\n--- 3. Special Operator: Comma (,) ---\\n");
    // Comma operator links expressions: assigns 10 to x, 5 to y, then returns x + y
    int val = (a = 10, b = 5, a + b);
    printf("Result of (a = 10, b = 5, a + b) = %d\\n", val); // 15

    printf("\\n--- 4. Special Operators: Pointer Address (&) and Value (*) ---\\n");
    int num = 42;
    int *p = &num; // p stores memory address of num
    printf("Address of num (&num) : %p\\n", (void*)p);
    printf("Value at address (*p) : %d\\n", *p);

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'printf("a & b : %d", a & b);', explanation: 'Bitwise AND: compares each bit of 5 (0101) and 3 (0011), giving 0001 (1).' },
          { line: 'printf("a << 1: %d", a << 1);', explanation: 'Left shift by 1 bit multiplies 5 by 2^1 = 10.' },
          { line: 'printf("~a : %d", ~a);', explanation: 'Bitwise NOT flips all bits; in two\'s complement representation, ~5 = -(5+1) = -6.' },
          { line: 'int val = (a = 10, b = 5, a + b);', explanation: 'Comma operator evaluates left to right. Evaluates to the rightmost expression 15.' }
        ],
        keyConcepts: [
          'Bitwise operators cannot be applied to float or double operands.',
          'x << n is equivalent to x * 2^n (fast multiplication).',
          'x >> n is equivalent to x / 2^n (fast integer division).',
          'sizeof is a compile-time operator, not a runtime function.',
          'The comma operator has the lowest precedence of ALL operators in C; parentheses are mandatory around comma expressions.'
        ],
        commonMistakes: [
          'Confusing bitwise & (single ampersand) with logical && (double ampersand)',
          'Attempting to perform bitwise operations on float or double variables',
          'Omitting parentheses when using the comma operator in assignments'
        ],
        quickRevision: [
          'Bitwise: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift).',
          'sizeof returns memory footprint in bytes.',
          'Comma operator evaluates left to right, returning rightmost value.'
        ]
      }
    },
    {
      id: 'c-u2-t4',
      unitId: 'c-unit-2',
      order: 4,
      courseId: 'c',
      title: 'Arithmetic Expressions & Evaluation of Expressions',
      summary: 'Translate algebraic formulas into C syntax, master infix/prefix/postfix notation, understand two-pass evaluation, and apply the 6 rules of expression evaluation.',
      content: {
        definition: 'An Arithmetic Expression is a syntactic combination of variables, constants, and arithmetic operators arranged as per the rules of C. C does not have an exponentiation operator. Expressions are evaluated using the precedence hierarchy via a two-pass left-to-right evaluation model.',
        syntax: `/* 1. Algebraic vs. C Expression Mapping Table:
   Algebraic Expression    C Expression
   ---------------------------------------------------
   a * b - c               a * b - c
   (m + n)(x + y)          (m + n) * (x + y)
   ab / c                  a * b / c
   3x^2 + 2x + 1           3 * x * x + 2 * x + 1  (or 3*pow(x,2) + 2*x + 1)
   (x / y) + c             x / y + c
   NOTE: In C, ^ is bitwise XOR, NOT exponentiation! Use pow(x, y) from <math.h>. */

/* 2. Types of Expressions:
   - Infix   : Operator placed between operands (e.g. 3 + 4 * 2) -> Standard in C
   - Prefix  : Operator placed before operands (Polish notation: + 3 4)
   - Postfix : Operator placed after operands (Reverse Polish notation: 3 4 +) */

/* 3. The 6 Rules for Evaluation of Expressions:
   1. Parenthesized sub-expressions are evaluated first from left to right.
   2. If parentheses are nested, evaluation begins with the innermost sub-expression.
   3. Precedence rules determine the order of operators in sub-expressions.
   4. Associativity resolves ties when two operators of the same level appear.
   5. Arithmetic expressions are evaluated in two left-to-right passes:
      - Pass 1: High priority operators (*, /, %)
      - Pass 2: Low priority operators (+, -)
   6. Parentheses override all precedence rules. */`,
        codeSnippet: `/* Step-by-Step Two-Pass Evaluation Demonstration in C */
#include <stdio.h>

int main(void) {
    /* Tracing the evaluation of: x = a - b / 3 + c * 2 - 1
       Given: a = 9, b = 12, c = 3
       Expression becomes: x = 9 - 12 / 3 + 3 * 2 - 1
       
       PASS 1 (High priority: / and * left to right):
         Step 1: 12 / 3 = 4    => x = 9 - 4 + 3 * 2 - 1
         Step 2: 3 * 2  = 6    => x = 9 - 4 + 6 - 1
         
       PASS 2 (Low priority: - and + left to right):
         Step 3: 9 - 4  = 5    => x = 5 + 6 - 1
         Step 4: 5 + 6  = 11   => x = 11 - 1
         Step 5: 11 - 1 = 10   => Result: x = 10 */

    float a = 9, b = 12, c = 3;
    float x = a - b / 3 + c * 2 - 1;
    float y = a - b / (3 + c) * (2 - 1);
    float z = a - (b / (3 + c) * 2) - 1;

    printf("Evaluating with precedence rules:\\n");
    printf("x = a - b / 3 + c * 2 - 1       -> x = %.1f\\n", x); // 10.0
    printf("y = a - b / (3 + c) * (2 - 1)   -> y = %.1f\\n", y); // 7.0
    printf("z = a - (b / (3 + c) * 2) - 1   -> z = %.1f\\n", z); // 4.0

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'float x = a - b / 3 + c * 2 - 1;', explanation: 'High priority operators (/ and *) evaluate first: 12/3=4 and 3*2=6, then 9-4+6-1=10.' },
          { line: 'float y = a - b / (3 + c) * (2 - 1);', explanation: 'Parentheses evaluate first: (3+c)=6, (2-1)=1. Then b/6*1 = 12/6*1 = 2. Then a-2 = 9-2 = 7.' },
          { line: 'float z = a - (b / (3 + c) * 2) - 1;', explanation: 'Innermost (3+c)=6 evaluates first, then (12/6*2)=4, then 9-4-1=4.' }
        ],
        keyConcepts: [
          'C does not have an exponentiation operator: writing x^2 performs bitwise XOR, not x squared!',
          'Two-pass evaluation model: High priority (*, /, %) first, Low priority (+, -) second.',
          'Parentheses have highest priority; nested parentheses resolve innermost first.',
          'Associativity dictates left-to-right evaluation when operators share identical precedence.'
        ],
        commonMistakes: [
          'Using ^ for exponentiation (e.g. 2^3 is 1 in binary XOR, not 8!)',
          'Forgetting that integer division truncates fractions in sub-expressions',
          'Misinterpreting algebraic multiplication (ab must be written explicitly as a * b)'
        ],
        quickRevision: [
          'Write ab as a * b; write x^2 as x * x or pow(x, 2).',
          'High priority: *, /, % | Low priority: +, -.',
          'Parentheses () evaluate first (innermost to outermost).'
        ]
      }
    },
    {
      id: 'c-u2-t5',
      unitId: 'c-unit-2',
      order: 5,
      courseId: 'c',
      title: 'Operator Precedence, Associativity & Mathematical Functions',
      summary: 'Master the 15-level precedence table using the PUMA\'S REBL TAC mnemonic, use standard math functions from <math.h>, and solve quadratic equations.',
      content: {
        definition: 'Operator Precedence determines which operation is performed first in an expression with competing operators. Operator Associativity defines whether operators of identical precedence evaluate from Left-to-Right or Right-to-Left. The C math library (<math.h>) provides standard functions like sqrt(), pow(), sin(), ceil(), and floor().',
        syntax: `/* The 15-Level Operator Precedence & Associativity Hierarchy:
   Level 1  : () [] . -> ++ -- (postfix)                -> Left-to-Right
   Level 2  : ++ -- (prefix) + - (unary) ! ~ * & sizeof  -> Right-to-Left
   Level 3  : * / % (multiplicative)                    -> Left-to-Right
   Level 4  : + - (additive)                            -> Left-to-Right
   Level 5  : << >> (bitwise shifts)                    -> Left-to-Right
   Level 6  : < <= > >= (relational)                    -> Left-to-Right
   Level 7  : == != (equality)                          -> Left-to-Right
   Level 8  : & (bitwise AND)                           -> Left-to-Right
   Level 9  : ^ (bitwise XOR)                           -> Left-to-Right
   Level 10 : | (bitwise OR)                            -> Left-to-Right
   Level 11 : && (logical AND)                          -> Left-to-Right
   Level 12 : || (logical OR)                           -> Left-to-Right
   Level 13 : ?: (ternary conditional)                  -> Right-to-Left
   Level 14 : = += -= *= /= %= &= ^= |= <<= >>= (assign)-> Right-to-Left
   Level 15 : , (comma separator)                       -> Left-to-Right */

/* MEMORY TRICK / MNEMONIC: PUMA'S REBL TAC
   P = Postfix (Level 1)
   U = Unary (Level 2)
   M = Multiplicative (Level 3)
   A = Additive (Level 4)
   S = Shift (Level 5)
   R = Relational (Level 6)
   E = Equality (Level 7)
   B = Bitwise (Levels 8-10)
   L = Logical (Levels 11-12)
   T = Ternary (Level 13)
   A = Assignment (Level 14)
   C = Comma (Level 15) */

/* Mathematical Functions in <math.h>:
   sqrt(x)    : Square root of x
   pow(x, y)  : x raised to power y (x^y)
   sin(x)     : Sine of x in radians
   tan(x)     : Tangent of x in radians
   log(x)     : Natural logarithm (base e)
   log10(x)   : Base-10 logarithm
   exp(x)     : Exponential (e^x)
   ceil(x)    : Rounds UP to nearest integer (ceil(2.3) = 3.0)
   floor(x)   : Rounds DOWN to nearest integer (floor(2.7) = 2.0) */`,
        codeSnippet: `/* Complete Demonstration of Precedence, math.h Functions, and Quadratic Equation */
#include <stdio.h>
#include <math.h>

int main(void) {
    printf("--- 1. Precedence & Associativity Evaluation ---\\n");
    // 10 + 20 * 30: * has higher precedence than +
    int res1 = 10 + 20 * 30; // 10 + 600 = 610
    printf("10 + 20 * 30 = %d\\n", res1);

    // 100 / 5 % 2: / and % have SAME precedence -> evaluated Left-to-Right
    // (100 / 5) = 20 -> 20 % 2 = 0
    int res2 = 100 / 5 % 2;
    printf("100 / 5 %% 2  = %d\\n", res2);

    printf("\\n--- 2. Standard Mathematical Functions (<math.h>) ---\\n");
    printf("sqrt(25.0)     = %.2f\\n", sqrt(25.0));
    printf("pow(2.0, 3.0)  = %.2f\\n", pow(2.0, 3.0));
    printf("log10(100.0)   = %.2f\\n", log10(100.0));
    printf("exp(1.0)       = %.5f\\n", exp(1.0));
    printf("ceil(2.3)      = %.2f\\n", ceil(2.3));
    printf("floor(2.7)     = %.2f\\n", floor(2.7));

    printf("\\n--- 3. Practice Program: Solving Quadratic Equation (ax^2 + bx + c = 0) ---\\n");
    // Example: x^2 - 5x + 6 = 0 -> roots are 3 and 2
    double a = 1.0, b = -5.0, c = 6.0;
    double discriminant = b * b - 4 * a * c;
    
    if (discriminant >= 0) {
        double root1 = (-b + sqrt(discriminant)) / (2 * a);
        double root2 = (-b - sqrt(discriminant)) / (2 * a);
        printf("Quadratic (1x^2 - 5x + 6 = 0):\\n");
        printf("Root 1 = %.2f | Root 2 = %.2f\\n", root1, root2);
    } else {
        printf("Complex roots exist.\\n");
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int res1 = 10 + 20 * 30;', explanation: '* evaluates before + according to precedence level 3 vs level 4, yielding 610.' },
          { line: 'int res2 = 100 / 5 % 2;', explanation: '/ and % have equal precedence. Left-to-right associativity calculates (100/5)=20, then 20%2=0.' },
          { line: 'ceil(2.3) vs floor(2.7)', explanation: 'ceil rounds up to 3.0; floor rounds down to 2.0.' },
          { line: '(-b + sqrt(discriminant)) / (2 * a)', explanation: 'Implements the quadratic formula using math.h sqrt() function.' }
        ],
        keyConcepts: [
          'Precedence decides the order in which different operators are applied.',
          'Associativity decides the order in which multiple operators of the same level are applied.',
          'Right-to-Left Associativity applies only to: Unary (level 2), Ternary (level 13), and Assignment (level 14).',
          'Mnemonic: PUMA\'S REBL TAC (Postfix, Unary, Multiplicative, Additive, Shift, Relational, Equality, Bitwise, Logical, Ternary, Assignment, Comma).',
          '<math.h> functions work with floating-point double arguments and return double.'
        ],
        commonMistakes: [
          'Assuming multiplication has higher precedence than division (they have EQUAL precedence; associativity decides order from left to right)',
          'Writing (-b + sqrt(D)) / 2 * a instead of / (2 * a) (the former divides by 2, then multiplies the whole quotient by a!)',
          'Forgetting that pow(x, y) returns a double, not an int'
        ],
        quickRevision: [
          'PUMA\'S REBL TAC is the master precedence memory trick.',
          '* and / have equal precedence; evaluated left to right.',
          'Assignment (=) and Ternary (?:) evaluate right to left.',
          '<math.h> provides sqrt, pow, ceil, floor, log, sin, exp.'
        ]
      }
    }
  ]
};

export const cUnit2Quiz: Quiz = {
  id: 'quiz-c-2',
  unitId: 'c-unit-2',
  courseId: 'c',
  unitTitle: 'Unit 2: Operators and Expressions',
  title: 'Operators & Expressions Certification Quiz',
  passingScorePercent: 80,
  questions: [
    {
      id: 'q-c2-1',
      question: 'What is the output of the expression "100 / 5 % 2" in C, and which rule determines this order?',
      options: [
        '0, determined by Left-to-Right associativity of multiplicative operators',
        '10, determined by % having higher precedence than /',
        '20, determined by Right-to-Left associativity',
        '2, determined by integer truncation'
      ],
      correctIndex: 0,
      explanation: 'Both / and % share identical precedence (level 3). Left-to-right associativity evaluates (100 / 5) = 20 first, followed by 20 % 2 = 0.'
    },
    {
      id: 'q-c2-2',
      question: 'In the memory mnemonic "PUMA\'S REBL TAC" for C operator precedence, what does "M" stand for?',
      options: ['Multiplicative operators (*, /, %)', 'Modulo operator only', 'Memory operators (&, *)', 'Main functions'],
      correctIndex: 0,
      explanation: 'In PUMA\'S REBL TAC, M stands for Multiplicative operators (*, /, %), which rank higher than Additive (A) operators (+, -).'
    },
    {
      id: 'q-c2-3',
      question: 'Which of the following operator categories evaluates with Right-to-Left associativity in C?',
      options: [
        'Assignment operators (=, +=, -=) and Unary operators',
        'Arithmetic operators (+, -, *, /)',
        'Relational operators (<, <=, >, >=)',
        'Bitwise operators (&, |, ^)'
      ],
      correctIndex: 0,
      explanation: 'Unary operators, conditional ternary operator (?:), and assignment operators (=, +=, etc.) evaluate with Right-to-Left associativity.'
    },
    {
      id: 'q-c2-4',
      question: 'What is the value of result after evaluating: int a = 5; int result = a++; ?',
      options: ['result = 5, a = 6', 'result = 6, a = 6', 'result = 6, a = 5', 'result = 5, a = 5'],
      correctIndex: 0,
      explanation: 'Postfix increment (a++) evaluates the expression using the original value (5) first, and then increments a to 6.'
    },
    {
      id: 'q-c2-5',
      question: 'Which function from <math.h> rounds a floating-point number UP to the nearest integer (e.g. 2.3 to 3.0)?',
      options: ['ceil()', 'floor()', 'round()', 'pow()'],
      correctIndex: 0,
      explanation: 'ceil(x) rounds up to the ceiling integer (e.g. ceil(2.3) = 3.0), whereas floor(x) rounds down (floor(2.7) = 2.0).'
    }
  ]
};
