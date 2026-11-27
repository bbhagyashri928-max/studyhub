export interface GameStep {
  id: number;
  world: number;
  worldTitle: string;
  unitId: string;
  topicId: string;
  title: string;
  subtitle: string;
  conceptSummary: string;
  ruleTip: string;
  gameType: 'predict-output' | 'spot-bug' | 'flow-order' | 'token-sort' | 'quick-quiz';
  challenge: {
    question: string;
    codeSnippet?: string;
    itemsToOrder?: string[];
    options?: string[];
    correctIndex?: number;
    correctOrder?: number[]; // indices in correct sequence
    hint: string;
    explanation: string;
  };
  xp: number;
  coins: number;
}

export const C_GAME_WORLDS = [
  { world: 1, title: 'World 1: Genesis of Planning & C', unitId: 'c-unit-1', color: 'teal', icon: 'Terminal' },
  { world: 2, title: 'World 2: Operators & Expression Arena', unitId: 'c-unit-2', color: 'blue', icon: 'Cpu' },
  { world: 3, title: 'World 3: Control Flow & Decision Maze', unitId: 'c-unit-3', color: 'amber', icon: 'GitBranch' },
  { world: 4, title: 'World 4: Arrays & String Matrix', unitId: 'c-unit-4', color: 'emerald', icon: 'Layers' },
  { world: 5, title: 'World 5: Functions & Structures Citadel', unitId: 'c-unit-5', color: 'purple', icon: 'Boxes' },
];

export const C_GAME_STEPS: GameStep[] = [
  // --- WORLD 1: UNIT-I (Steps 1 to 5) ---
  {
    id: 1,
    world: 1,
    worldTitle: 'World 1: Genesis of Planning & C',
    unitId: 'c-unit-1',
    topicId: 'c-u1-t1',
    title: 'Step 1: The Blueprint Architect',
    subtitle: 'Algorithms & Flowcharts',
    conceptSummary: 'An algorithm is step-by-step logic. A flowchart visually charts it using Ovals (Start/End), Parallelograms (I/O), Rectangles (Process), and Diamonds (Decisions).',
    ruleTip: 'Always use a Diamond for conditional questions (e.g., Is N > 0?).',
    gameType: 'flow-order',
    challenge: {
      question: 'Arrange the computational steps in the correct logical execution order to find the sum of two numbers:',
      itemsToOrder: [
        'Read values of num1 and num2 from user',
        'Start Program',
        'Stop / Terminate',
        'Calculate sum = num1 + num2',
        'Display the value of sum on screen'
      ],
      correctOrder: [1, 0, 3, 4, 2], // Start -> Read -> Calculate -> Display -> Stop
      hint: 'Every flowchart begins with Start (Oval) and concludes with Stop.',
      explanation: 'Logical flow strictly follows: Start -> Input (num1, num2) -> Process (sum = num1 + num2) -> Output (sum) -> Stop.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 2,
    world: 1,
    worldTitle: 'World 1: Genesis of Planning & C',
    unitId: 'c-unit-1',
    topicId: 'c-u1-t2',
    title: 'Step 2: The Birth of C & Character Set',
    subtitle: 'History, Significance & C Character Set',
    conceptSummary: 'Dennis Ritchie crafted C in 1972 at Bell Labs to build UNIX. C is strictly case-sensitive and its character set comprises Letters (A-Z, a-z), Digits (0-9), Special Symbols, and Whitespaces.',
    ruleTip: 'In C, "main" is valid, but "Main" or "MAIN" will trigger a linker error!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'Which of the following statements about C and its character set is 100% TRUE?',
      options: [
        'C was created by James Gosling in 1995 for web browsers',
        'C is completely case-insensitive; "printf" and "Printf" are identical',
        'Dennis Ritchie created C in 1972 at Bell Labs, and C is strictly case-sensitive',
        'C does not allow underscores (_) in identifiers'
      ],
      correctIndex: 2,
      hint: 'Remember Dennis Ritchie at Bell Labs rewriting the UNIX kernel.',
      explanation: 'Dennis Ritchie designed C in 1972 at Bell Labs. C is strictly case-sensitive.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 3,
    world: 1,
    worldTitle: 'World 1: Genesis of Planning & C',
    unitId: 'c-unit-1',
    topicId: 'c-u1-t3',
    title: 'Step 3: The Token Detective',
    subtitle: 'Keywords, Identifiers & Constants',
    conceptSummary: 'Tokens are the smallest units in C. ANSI C has exactly 32 reserved keywords (cannot be variable names). Identifiers cannot start with a digit!',
    ruleTip: 'Valid: score_1, _total. Invalid: 1st_score, int, total-score.',
    gameType: 'spot-bug',
    challenge: {
      question: 'A programmer wrote 4 variable declarations. Which one is an ILLEGAL identifier that causes a compilation failure?',
      options: [
        'int _systemStatus = 1;',
        'int 2ndHighScore = 99;',
        'int total_score_value = 50;',
        'int studentScore2 = 85;'
      ],
      correctIndex: 1,
      hint: 'Rule: Identifiers must start with a letter or underscore. They can never begin with a digit.',
      explanation: '"2ndHighScore" begins with a decimal digit (2), which violates C grammar rules.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 4,
    world: 1,
    worldTitle: 'World 1: Genesis of Planning & C',
    unitId: 'c-unit-1',
    topicId: 'c-u1-t4',
    title: 'Step 4: Memory Vaults & Storage Classes',
    subtitle: 'Data Types, Declarations & Storage Classes',
    conceptSummary: 'C has 4 primary data types: char (1B), int (4B), float (4B), double (8B). Storage classes: auto (stack), register (CPU), static (persists across calls), extern (global).',
    ruleTip: 'static preserves its value even after the function finishes executing!',
    gameType: 'predict-output',
    challenge: {
      question: 'What is printed after calling counter() two consecutive times?',
      codeSnippet: `#include <stdio.h>
void counter() {
    static int hitCount = 10;
    hitCount += 5;
    printf("%d ", hitCount);
}
int main() {
    counter();
    counter();
    return 0;
}`,
      options: ['15 15', '15 20', '10 15', '20 25'],
      correctIndex: 1,
      hint: 'static variables are initialized only once and retain their updated value across function calls.',
      explanation: 'First call: hitCount becomes 10 + 5 = 15. Second call: hitCount starts at 15 and becomes 15 + 5 = 20. Output: 15 20.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 5,
    world: 1,
    worldTitle: 'World 1: Genesis of Planning & C',
    unitId: 'c-unit-1',
    topicId: 'c-u1-t5',
    title: 'Step 5: The Immutable & The Volatile',
    subtitle: 'Symbolic Constants (#define), const & volatile',
    conceptSummary: '#define creates preprocessor text substitutions. const marks variables read-only. volatile forces the compiler to read RAM every time (crucial for hardware pins).',
    ruleTip: 'Never put a semicolon after #define PI 3.1415!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'Why must hardware status flags in embedded systems be declared with "volatile"?',
      options: [
        'To speed up CPU math operations',
        'To tell the compiler not to cache the variable in a CPU register because hardware can change it unexpectedly',
        'To prevent anyone from reading its address in memory',
        'To make the variable automatically reset to 0 every clock cycle'
      ],
      correctIndex: 1,
      hint: 'Compilers optimize by caching variables in registers unless told hardware can alter memory asynchronously.',
      explanation: 'volatile prevents compiler register caching, ensuring every read fetches fresh data directly from RAM/hardware pins.'
    },
    xp: 100,
    coins: 25
  },

  // --- WORLD 2: UNIT-II (Steps 6 to 10) ---
  {
    id: 6,
    world: 2,
    worldTitle: 'World 2: Operators & Expression Arena',
    unitId: 'c-unit-2',
    topicId: 'c-u2-t1',
    title: 'Step 6: Arithmetic & Prefix vs Postfix Clash',
    subtitle: 'Arithmetic, Assignment & Increment/Decrement',
    conceptSummary: '+, -, *, /, % (modulo). ++x increments first and yields new value; x++ yields current value first, then increments.',
    ruleTip: 'Integer division (7 / 2) truncates decimals and yields 3, not 3.5!',
    gameType: 'predict-output',
    challenge: {
      question: 'What is printed by this increment code?',
      codeSnippet: `#include <stdio.h>
int main() {
    int a = 5;
    int b = ++a; // prefix
    int c = a++; // postfix
    printf("a=%d b=%d c=%d\\n", a, b, c);
    return 0;
}`,
      options: ['a=7 b=6 c=6', 'a=7 b=5 c=6', 'a=6 b=6 c=5', 'a=7 b=6 c=5'],
      correctIndex: 0,
      hint: 'Trace step-by-step: a=5 -> ++a makes a=6, b=6 -> a++ assigns c=6, then a becomes 7.',
      explanation: '1. ++a increments a to 6, then assigns to b (b=6). 2. a++ assigns 6 to c (c=6), then increments a to 7. Result: a=7 b=6 c=6.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 7,
    world: 2,
    worldTitle: 'World 2: Operators & Expression Arena',
    unitId: 'c-unit-2',
    topicId: 'c-u2-t2',
    title: 'Step 7: The Logic Gate & Ternary Quest',
    subtitle: 'Relational, Logical & Conditional (?:) Operators',
    conceptSummary: 'Relational: ==, !=, <, >, <=, >=. Logical: &&, ||, !. The ternary operator evaluates: condition ? value_if_true : value_if_false.',
    ruleTip: 'In C, 0 is False and any non-zero number is True!',
    gameType: 'predict-output',
    challenge: {
      question: 'What is the output of this ternary and logical code?',
      codeSnippet: `#include <stdio.h>
int main() {
    int score = 85;
    int bonus = (score > 80 && score < 90) ? 10 : 0;
    printf("Bonus: %d\\n", bonus);
    return 0;
}`,
      options: ['Bonus: 0', 'Bonus: 10', 'Bonus: 85', 'Compilation Error'],
      correctIndex: 1,
      hint: 'Is 85 > 80? Yes (1). Is 85 < 90? Yes (1). 1 && 1 is True (1).',
      explanation: 'Both relational conditions are True, so the ternary operator picks the true branch (10).'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 8,
    world: 2,
    worldTitle: 'World 2: Operators & Expression Arena',
    unitId: 'c-unit-2',
    topicId: 'c-u2-t3',
    title: 'Step 8: Bit Shifter & Special Operators',
    subtitle: 'Bitwise (&, |, ^, ~, <<, >>) & sizeof Operator',
    conceptSummary: 'Bitwise operators manipulate raw binary bits. x << 1 doubles x. sizeof() returns byte size in memory at compile time.',
    ruleTip: '12 in binary is 1100. 12 >> 2 shifts right by 2, leaving 0011 (3 in decimal).',
    gameType: 'quick-quiz',
    challenge: {
      question: 'What is the result of shifting integer 8 to the left by 2 positions (8 << 2)?',
      options: ['16', '32', '4', '64'],
      correctIndex: 1,
      hint: 'Left shift by N multiplies the number by 2^N: 8 * (2^2) = 8 * 4.',
      explanation: '8 << 2 multiplies 8 by 4 (2^2), yielding 32.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 9,
    world: 2,
    worldTitle: 'World 2: Operators & Expression Arena',
    unitId: 'c-unit-2',
    topicId: 'c-u2-t4',
    title: 'Step 9: The Truncation Trap & Castings',
    subtitle: 'Arithmetic Expressions & Type Casting',
    conceptSummary: 'When two integers divide in C, any fractional part is discarded. To preserve decimal accuracy, explicitly cast an operand to double: (double)sum / count.',
    ruleTip: 'Writing (double)(15 / 4) will truncate to 3 first, then cast to 3.0!',
    gameType: 'spot-bug',
    challenge: {
      question: 'Which line of code correctly computes the decimal average of 15 and 4 (3.75)?',
      options: [
        'double avg = 15 / 4;',
        'double avg = (double)(15 / 4);',
        'double avg = (double)15 / 4;',
        'double avg = (int)15.0 / 4;'
      ],
      correctIndex: 2,
      hint: 'The cast (double) must happen on 15 BEFORE the division occurs.',
      explanation: '(double)15 / 4 promotes 15 to 15.0, causing floating-point division 15.0 / 4.0 = 3.75.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 10,
    world: 2,
    worldTitle: 'World 2: Operators & Expression Arena',
    unitId: 'c-unit-2',
    topicId: 'c-u2-t5',
    title: 'Step 10: Precedence Master & Math Functions',
    subtitle: 'Operator Precedence, Associativity & <math.h>',
    conceptSummary: 'Multiplication/Division have higher precedence than Addition/Subtraction. Math library <math.h> provides sqrt(), pow(), ceil(), and floor().',
    ruleTip: 'ceil(4.1) rounds UP to 5.0; floor(4.9) rounds DOWN to 4.0!',
    gameType: 'predict-output',
    challenge: {
      question: 'What is the evaluated output of: 10 + 20 * 2 / 4 ?',
      codeSnippet: `#include <stdio.h>
int main() {
    int ans = 10 + 20 * 2 / 4;
    printf("%d\\n", ans);
    return 0;
}`,
      options: ['15', '20', '10', '25'],
      correctIndex: 1,
      hint: '* and / take priority over +: (20 * 2) = 40, (40 / 4) = 10, then 10 + 10 = 20.',
      explanation: 'Higher precedence * and / evaluate left to right: 20 * 2 = 40 -> 40 / 4 = 10 -> 10 + 10 = 20.'
    },
    xp: 100,
    coins: 25
  },

  // --- WORLD 3: UNIT-III (Steps 11 to 15) ---
  {
    id: 11,
    world: 3,
    worldTitle: 'World 3: Control Flow & Decision Maze',
    unitId: 'c-unit-3',
    topicId: 'c-u3-t1',
    title: 'Step 11: The Fork in the Code',
    subtitle: 'Simple If & If-Else Branching',
    conceptSummary: 'If statements evaluate a condition. If true, the if-block executes; otherwise, the else-block executes.',
    ruleTip: 'Beware of: if (x = 5); the single = is an assignment that returns 5 (True)!',
    gameType: 'spot-bug',
    challenge: {
      question: 'What major bug exists in this if statement?',
      codeSnippet: `int userScore = 50;
if (userScore = 100) {
    printf("Perfect score!\\n");
}`,
      options: [
        'The variable userScore is missing an integer type',
        'Single "=" is assignment; it assigns 100 to userScore and always evaluates True instead of checking equality (==)',
        'printf is missing a semicolon',
        'Curly braces are illegal for if statements'
      ],
      correctIndex: 1,
      hint: 'Assignment is "=", whereas equality comparison is "==".',
      explanation: 'Using "=" assigns 100 into userScore. Since 100 is non-zero (True), the if-block always executes!'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 12,
    world: 3,
    worldTitle: 'World 3: Control Flow & Decision Maze',
    unitId: 'c-unit-3',
    topicId: 'c-u3-t2',
    title: 'Step 12: The Switchboard & The Fall-Through',
    subtitle: 'Else-If Ladder, Switch-Case & Goto',
    conceptSummary: 'Switch tests integral expressions against constant case values. Without "break", execution falls through into subsequent cases!',
    ruleTip: 'Always include "break;" at the end of each case block unless intentional.',
    gameType: 'predict-output',
    challenge: {
      question: 'What is printed by this switch without break statements?',
      codeSnippet: `#include <stdio.h>
int main() {
    int code = 2;
    switch (code) {
        case 1: printf("One ");
        case 2: printf("Two ");
        case 3: printf("Three ");
        default: printf("Done");
    }
    return 0;
}`,
      options: ['Two ', 'Two Three Done', 'Two Three', 'One Two Three Done'],
      correctIndex: 1,
      hint: 'Notice there are NO break statements! Once case 2 matches, execution cascades downward.',
      explanation: 'Because break is absent, execution enters case 2 and falls through case 3 and default, printing "Two Three Done".'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 13,
    world: 3,
    worldTitle: 'World 3: Control Flow & Decision Maze',
    unitId: 'c-unit-3',
    topicId: 'c-u3-t3',
    title: 'Step 13: Loop Runners: While & For',
    subtitle: 'Entry-Controlled Repetition',
    conceptSummary: 'While and For loops evaluate condition before running the body (Entry-Controlled). If condition is false initially, body runs 0 times.',
    ruleTip: 'for (init; condition; update) combines all 3 loop stages in one line.',
    gameType: 'predict-output',
    challenge: {
      question: 'How many times does "CODE" print in this loop?',
      codeSnippet: `#include <stdio.h>
int main() {
    for (int i = 0; i < 3; i++) {
        printf("CODE ");
    }
    return 0;
}`,
      options: ['2 times', '3 times', '4 times', 'Infinite times'],
      correctIndex: 1,
      hint: 'i starts at 0, runs for i=0, i=1, i=2. When i=3, the condition 3 < 3 is false.',
      explanation: 'The loop executes for i = 0, 1, and 2 — exactly 3 iterations.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 14,
    world: 3,
    worldTitle: 'World 3: Control Flow & Decision Maze',
    unitId: 'c-unit-3',
    topicId: 'c-u3-t4',
    title: 'Step 14: The One-Time Guarantee',
    subtitle: 'Do-While Loop (Exit-Controlled)',
    conceptSummary: 'Do-While checks the condition at the end (Exit-Controlled). It is guaranteed to run AT LEAST once, even if condition is false from the start!',
    ruleTip: 'A do-while loop header MUST terminate with a semicolon: } while(cond);',
    gameType: 'quick-quiz',
    challenge: {
      question: 'If int x = 100, how many times will "do { x++; } while(x < 50);" execute its body?',
      options: ['0 times', 'Exactly 1 time', '50 times', '100 times'],
      correctIndex: 1,
      hint: 'Exit-controlled loops execute the body first before checking the condition at the bottom.',
      explanation: 'Because condition checking happens at the exit, the body executes once, increments x to 101, finds 101 < 50 is False, and stops.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 15,
    world: 3,
    worldTitle: 'World 3: Control Flow & Decision Maze',
    unitId: 'c-unit-3',
    topicId: 'c-u3-t5',
    title: 'Step 15: Loop Master: Break & Continue',
    subtitle: 'Terminating Loops vs. Skipping Iterations',
    conceptSummary: 'break immediately terminates and exits the loop. continue skips the remaining code of the current iteration and starts the next cycle.',
    ruleTip: 'continue does NOT stop the loop; it just jumps to the next turn!',
    gameType: 'predict-output',
    challenge: {
      question: 'What is the output of this loop?',
      codeSnippet: `#include <stdio.h>
int main() {
    for (int k = 1; k <= 5; k++) {
        if (k == 3) continue; // skip 3
        if (k == 5) break;    // exit before printing 5
        printf("%d", k);
    }
    return 0;
}`,
      options: ['1245', '124', '1234', '12'],
      correctIndex: 1,
      hint: 'k=1 (print 1), k=2 (print 2), k=3 (skip!), k=4 (print 4), k=5 (break loop!).',
      explanation: 'k=3 is skipped by continue; when k=5, break halts the loop before printing 5. Output: 124.'
    },
    xp: 100,
    coins: 25
  },

  // --- WORLD 4: UNIT-IV (Steps 16 to 20) ---
  {
    id: 16,
    world: 4,
    worldTitle: 'World 4: Arrays & String Matrix',
    unitId: 'c-unit-4',
    topicId: 'c-u4-t1',
    title: 'Step 16: The Contiguous Vault (1D Arrays)',
    subtitle: 'Declaration, Memory Layout & Zero-Based Indexing',
    conceptSummary: '1D Arrays store elements of identical type contiguously in memory. First element is at index [0]; last element is at index [size - 1].',
    ruleTip: 'Accessing arr[10] on an array of size 10 causes a buffer overflow bug!',
    gameType: 'spot-bug',
    challenge: {
      question: 'What error will occur when executing this array traversal?',
      codeSnippet: `int data[5] = {10, 20, 30, 40, 50};
for (int i = 0; i <= 5; i++) {
    printf("%d ", data[i]);
}`,
      options: [
        'The loop works properly and prints all 5 elements',
        'Off-by-one error: i <= 5 causes reading data[5], which is out of bounds memory!',
        'Arrays must be initialized with round brackets ()',
        'data[i] must be written as data(i)'
      ],
      correctIndex: 1,
      hint: 'For size 5, valid indices are 0, 1, 2, 3, 4. Index 5 is outside the allocated bounds!',
      explanation: 'Valid indices for an array of size 5 are 0 to 4. Using "<=" causes access to data[5] which is an out-of-bounds memory read.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 17,
    world: 4,
    worldTitle: 'World 4: Arrays & String Matrix',
    unitId: 'c-unit-4',
    topicId: 'c-u4-t2',
    title: 'Step 17: The 2D Grid & Row-Major Order',
    subtitle: '2D Arrays & Matrix Mathematics',
    conceptSummary: '2D Arrays model tables and matrices. C arranges 2D arrays in Row-Major Order: all row 0 elements, then all row 1 elements.',
    ruleTip: 'mat[row][col] is accessed using two nested for loops.',
    gameType: 'predict-output',
    challenge: {
      question: 'What is the value of matrix[1][2] in this declaration?',
      codeSnippet: `#include <stdio.h>
int main() {
    int matrix[2][3] = {
        {10, 20, 30}, // Row 0
        {40, 50, 60}  // Row 1
    };
    printf("%d\\n", matrix[1][2]);
    return 0;
}`,
      options: ['20', '50', '60', '30'],
      correctIndex: 2,
      hint: 'Row index 1 is the second row ({40, 50, 60}). Column index 2 is the 3rd element in that row.',
      explanation: 'Row 1 corresponds to {40, 50, 60}. Index [2] selects the third element, which is 60.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 18,
    world: 4,
    worldTitle: 'World 4: Arrays & String Matrix',
    unitId: 'c-unit-4',
    topicId: 'c-u4-t3',
    title: 'Step 18: The Null-Terminator Secret',
    subtitle: 'Character Arrays & "\\0" Strings',
    conceptSummary: 'A string in C is a character array ending with the null terminator \'\\0\' (ASCII 0). Always allocate size >= characters + 1.',
    ruleTip: '\'A\' is a 1-byte char; "A" is a 2-byte string containing \'A\' and \'\\0\'!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'How many bytes does the compiler allocate for: char str[] = "VITE"; ?',
      options: ['4 bytes', '5 bytes', '8 bytes', '3 bytes'],
      correctIndex: 1,
      hint: 'Count the 4 letters (\'V\', \'I\', \'T\', \'E\') plus the invisible terminating null byte (\'\\0\').',
      explanation: '4 characters + 1 null terminator (\'\\0\') = 5 bytes total in memory.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 19,
    world: 4,
    worldTitle: 'World 4: Arrays & String Matrix',
    unitId: 'c-unit-4',
    topicId: 'c-u4-t4',
    title: 'Step 19: Safe Terminal String I/O',
    subtitle: 'Reading (scanf vs. fgets) & Writing (printf vs. puts)',
    conceptSummary: 'scanf("%s") stops reading at the first space. Standard fgets(str, size, stdin) safely reads full lines including spaces.',
    ruleTip: 'NEVER use gets(); it causes buffer overflows and was removed from standard C!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'If a user enters "Dennis Ritchie", what will char name[50]; scanf("%s", name); store into name?',
      options: [
        '"Dennis Ritchie"',
        'Only "Dennis" (stops at the whitespace)',
        'Only "Ritchie"',
        'An empty string ""'
      ],
      correctIndex: 1,
      hint: 'scanf with %s treats spaces, tabs, and newlines as delimiters.',
      explanation: 'scanf("%s") terminates reading upon encountering the first whitespace character, so only "Dennis" is captured.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 20,
    world: 4,
    worldTitle: 'World 4: Arrays & String Matrix',
    unitId: 'c-unit-4',
    topicId: 'c-u4-t5',
    title: 'Step 20: The String Toolbelt (<string.h>)',
    subtitle: 'strlen, strcpy, strcat, strcmp',
    conceptSummary: '<string.h> functions: strlen(s) gets length; strcpy(dst, src) copies; strcat(dst, src) appends; strcmp(a, b) == 0 checks equality.',
    ruleTip: 'Never compare strings using (s1 == s2); that compares memory pointer addresses, not letters!',
    gameType: 'predict-output',
    challenge: {
      question: 'What is printed by this string operation?',
      codeSnippet: `#include <stdio.h>
#include <string.h>
int main() {
    char greeting[30] = "Code";
    strcat(greeting, "verse");
    printf("%zu %s\\n", strlen(greeting), greeting);
    return 0;
}`,
      options: ['4 Code', '5 verse', '9 Codeverse', '10 Codeverse'],
      correctIndex: 2,
      hint: '"Code" (4) + "verse" (5) = "Codeverse" (9 characters). strlen excludes \'\\0\'.',
      explanation: 'strcat appends "verse" onto "Code", resulting in "Codeverse". strlen counts visible characters (9).'
    },
    xp: 100,
    coins: 25
  },

  // --- WORLD 5: UNIT-V (Steps 21 to 25) ---
  {
    id: 21,
    world: 5,
    worldTitle: 'World 5: Functions & Structures Citadel',
    unitId: 'c-unit-5',
    topicId: 'c-u5-t1',
    title: 'Step 21: The Modular Architect',
    subtitle: 'Function Prototype, Definition & Call',
    conceptSummary: 'Functions eliminate code duplication. Three elements: 1. Prototype (declaration before main), 2. Definition (body), 3. Call (invocation).',
    ruleTip: 'Function prototypes inform the compiler of parameter types to prevent implicit conversion bugs.',
    gameType: 'flow-order',
    challenge: {
      question: 'Order the chronological execution lifecycle of a user-defined function:',
      itemsToOrder: [
        'main() calls the helper function with actual arguments',
        'Compiler reads Function Prototype declaration before main()',
        'Helper function executes its statements and hits "return"',
        'Execution control resumes in main() with the returned value'
      ],
      correctOrder: [1, 0, 2, 3], // Prototype -> Call -> Execute/Return -> Resume in main
      hint: 'The prototype informs the compiler first, then main calls it.',
      explanation: '1. Prototype declared -> 2. Function called from main -> 3. Body executes & returns -> 4. Control resumes in main.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 22,
    world: 5,
    worldTitle: 'World 5: Functions & Structures Citadel',
    unitId: 'c-unit-5',
    topicId: 'c-u5-t2',
    title: 'Step 22: The 4 Function Categories',
    subtitle: 'Parameters In, Return Values Out',
    conceptSummary: 'Category 1: No Arg, No Return. Category 2: Arg, No Return. Category 3: Arg, With Return (Standard). Category 4: No Arg, With Return.',
    ruleTip: 'If a function does not return any data, its return type is void.',
    gameType: 'quick-quiz',
    challenge: {
      question: 'To which category does: int rollDice(void) belong?',
      options: [
        'Category 1: No Arguments and No Return Values',
        'Category 2: Arguments but No Return Values',
        'Category 3: Arguments with Return Values',
        'Category 4: No Arguments but Returns a Value'
      ],
      correctIndex: 3,
      hint: 'Notice (void) means no arguments, but "int" before the name means it returns an integer.',
      explanation: 'rollDice takes no parameters (void) and yields an int return value to the caller, making it Category 4.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 23,
    world: 5,
    worldTitle: 'World 5: Functions & Structures Citadel',
    unitId: 'c-unit-5',
    topicId: 'c-u5-t3',
    title: 'Step 23: The Recursive Mirror',
    subtitle: 'Recursion, Call Stacks & Base Condition',
    conceptSummary: 'Recursion is a function calling itself to break problems into smaller instances. A Base Condition is mandatory to stop infinite recursion and avoid Stack Overflow.',
    ruleTip: 'Factorial: fact(n) = n * fact(n-1) with base case fact(1) = 1.',
    gameType: 'predict-output',
    challenge: {
      question: 'What is the return value of factorial(4)?',
      codeSnippet: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
      options: ['12', '24', '16', '4'],
      correctIndex: 1,
      hint: '4! = 4 * 3 * 2 * 1 = 24.',
      explanation: 'factorial(4) unwinds as 4 * 3 * 2 * 1 = 24.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 24,
    world: 5,
    worldTitle: 'World 5: Functions & Structures Citadel',
    unitId: 'c-unit-5',
    topicId: 'c-u5-t4',
    title: 'Step 24: The Heterogeneous Blueprint (struct)',
    subtitle: 'What is a Structure, Declarations & typedef',
    conceptSummary: 'Unlike arrays (which store only one type), structures group heterogeneous data types (int, float, char[], pointers) under one named entity.',
    ruleTip: 'Don’t forget the semicolon after closing struct: struct Box { int w; };',
    gameType: 'spot-bug',
    challenge: {
      question: 'What is the syntax error in this structure declaration?',
      codeSnippet: `struct Student {
    int roll;
    char name[30];
    float gpa;
}`,
      options: [
        'Structures cannot hold strings',
        'Missing a semicolon (;) after the closing curly brace "}"',
        'gpa cannot be float',
        'Student must be lowercase'
      ],
      correctIndex: 1,
      hint: 'Look at the very end of the struct declaration.',
      explanation: 'In C, a structure type declaration must conclude with a terminating semicolon: struct Student { ... };'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 25,
    world: 5,
    worldTitle: 'World 5: Functions & Structures Citadel',
    unitId: 'c-unit-5',
    topicId: 'c-u5-t5',
    title: 'Step 25: Master of the Dot Operator',
    subtitle: 'Member Referencing (.), Initialization & Whole Assignment',
    conceptSummary: 'Members of a structure variable are accessed using the dot (.) operator. Whole structures can be copied with assignment (s2 = s1) and passed to functions.',
    ruleTip: 's1.name accesses the name field; s2 = s1 copies all fields instantly!',
    gameType: 'predict-output',
    challenge: {
      question: 'What is printed after whole structure assignment and member modification?',
      codeSnippet: `#include <stdio.h>
struct Player { int id; int score; };
int main() {
    struct Player p1 = {101, 500};
    struct Player p2 = p1; // whole copy
    p2.score += 250;
    printf("p1=%d p2=%d\\n", p1.score, p2.score);
    return 0;
}`,
      options: ['p1=500 p2=750', 'p1=750 p2=750', 'p1=500 p2=500', 'Compilation Error'],
      correctIndex: 0,
      hint: 'Whole structure assignment performs a value copy. Mutating p2 does not modify p1!',
      explanation: 'p2 receives a copy of p1. Mutating p2.score to 750 leaves p1.score unchanged at 500. Output: p1=500 p2=750.'
    },
    xp: 100,
    coins: 25
  }
];
