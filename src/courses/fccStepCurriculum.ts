import { CourseId } from '@/types';

export interface FccStepTest {
  id: string;
  description: string;
  failureHint: string;
  // Code validation rule (regex pattern, substring check, or custom assertion)
  validate: (code: string, stdout: string) => boolean;
}

export interface FccStep {
  id: number;
  stepNumber: number;
  title: string;
  conceptExplanation: string;
  syntaxTip?: string;
  taskInstruction: string;
  starterCode: string;
  solutionCode: string;
  tests: FccStepTest[];
  expectedOutput?: string;
}

export interface FccProject {
  id: string;
  courseId: CourseId;
  title: string;
  subtitle: string;
  description: string;
  totalSteps: number;
  steps: FccStep[];
}

export const FCC_PROJECTS: FccProject[] = [
  // =========================================================================
  // PROJECT 1: C PROGRAMMING - "Build a Student Grade Evaluator & Statistics Engine"
  // =========================================================================
  {
    id: 'c-project-grades',
    courseId: 'c',
    title: 'Build a Student Grade Evaluator in C',
    subtitle: 'Learn C Fundamentals Step by Step',
    description: 'In this hands-on project, you will build a complete grade evaluator and statistics analyzer in C from scratch, step by step.',
    totalSteps: 10,
    steps: [
      {
        id: 1,
        stepNumber: 1,
        title: 'Include Standard Headers and Define main()',
        conceptExplanation:
          'Every C program begins by including header files. `#include <stdio.h>` provides access to standard input and output functions like `printf`.\n\nThe `main()` function is the entry point of every C program. By convention, returning `0` signals to the operating system that the program executed successfully.',
        syntaxTip: '#include <stdio.h>\n\nint main() {\n    return 0;\n}',
        taskInstruction:
          'Include the `<stdio.h>` library at the top of the file, define the `main` function returning an `int`, and write `return 0;` inside the function body.',
        starterCode: '// Step 1: Set up the skeleton of your C program\n\n',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    return 0;\n}',
        tests: [
          {
            id: 't1',
            description: 'Your code should include the `<stdio.h>` header.',
            failureHint: 'Add `#include <stdio.h>` at the very top of your file.',
            validate: (code) => /#include\s*<stdio\.h>/.test(code),
          },
          {
            id: 't2',
            description: 'Your code should declare an `int main()` function.',
            failureHint: 'Define `int main() { ... }` with braces.',
            validate: (code) => /int\s+main\s*\(\s*\)/.test(code),
          },
          {
            id: 't3',
            description: 'Your `main` function should return `0;`.',
            failureHint: 'Add `return 0;` before the closing brace of `main`.',
            validate: (code) => /return\s+0\s*;/.test(code),
          },
        ],
      },
      {
        id: 2,
        stepNumber: 2,
        title: 'Declare Integer Variables for Student Scores',
        conceptExplanation:
          'Variables in C are strongly typed. To store integers, use the `int` keyword.\n\nYou can declare and initialize variables in a single statement: `int score = 85;`. Multiple variables of the same type can be declared sequentially.',
        syntaxTip: 'int mathScore = 85;\nint scienceScore = 90;',
        taskInstruction:
          'Inside the `main` function, declare two `int` variables: `mathScore` initialized to `85`, and `scienceScore` initialized to `90`.',
        starterCode: '#include <stdio.h>\n\nint main() {\n    // Declare mathScore and scienceScore below:\n\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    int mathScore = 85;\n    int scienceScore = 90;\n    return 0;\n}',
        tests: [
          {
            id: 't1',
            description: 'You should declare an `int` variable named `mathScore` with value `85`.',
            failureHint: 'Ensure you write `int mathScore = 85;`.',
            validate: (code) => /int\s+mathScore\s*=\s*85\s*;/.test(code),
          },
          {
            id: 't2',
            description: 'You should declare an `int` variable named `scienceScore` with value `90`.',
            failureHint: 'Ensure you write `int scienceScore = 90;`.',
            validate: (code) => /int\s+scienceScore\s*=\s*90\s*;/.test(code),
          },
        ],
      },
      {
        id: 3,
        stepNumber: 3,
        title: 'Calculate the Total Score and Print Output',
        conceptExplanation:
          'You can perform arithmetic operations like addition (`+`) on integer variables and store the result in a new variable: `int total = a + b;`.\n\nTo print integer values to the screen, use `printf` with the `%d` format specifier.',
        syntaxTip: 'int total = mathScore + scienceScore;\nprintf("Total: %d\\n", total);',
        taskInstruction:
          'Declare a variable `totalScore` equal to `mathScore + scienceScore`. Then print `"Total Score: %d\\n"` passing `totalScore`.',
        starterCode: '#include <stdio.h>\n\nint main() {\n    int mathScore = 85;\n    int scienceScore = 90;\n\n    // Calculate totalScore and print it:\n\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    int mathScore = 85;\n    int scienceScore = 90;\n    int totalScore = mathScore + scienceScore;\n    printf("Total Score: %d\\n", totalScore);\n    return 0;\n}',
        tests: [
          {
            id: 't1',
            description: 'You should declare `totalScore` as `mathScore + scienceScore`.',
            failureHint: 'Write `int totalScore = mathScore + scienceScore;`.',
            validate: (code) => /int\s+totalScore\s*=\s*mathScore\s*\+\s*scienceScore\s*;/.test(code),
          },
          {
            id: 't2',
            description: 'You should use `printf` to display the total score.',
            failureHint: 'Call `printf("Total Score: %d\\n", totalScore);`.',
            validate: (code) => /printf\s*\(\s*"Total Score:\s*%d\\n"\s*,\s*totalScore\s*\)/.test(code),
          },
        ],
        expectedOutput: 'Total Score: 175',
      },
      {
        id: 4,
        stepNumber: 4,
        title: 'Compute Average with Floating-Point Type Casting',
        conceptExplanation:
          'When dividing two integers in C, integer truncation occurs (`175 / 2 = 87` instead of `87.5`).\n\nTo calculate an exact decimal average, cast one of the operands to `float` using `(float)totalScore / 2.0f;` and store it in a `float` variable. Use `%f` or `%.2f` to format the float.',
        syntaxTip: 'float average = (float)totalScore / 2.0f;\nprintf("Average: %.2f\\n", average);',
        taskInstruction:
          'Declare a `float` variable named `average` equal to `(float)totalScore / 2.0f`. Print it using `printf("Average: %.2f\\n", average);`.',
        starterCode: '#include <stdio.h>\n\nint main() {\n    int mathScore = 85;\n    int scienceScore = 90;\n    int totalScore = mathScore + scienceScore;\n    printf("Total Score: %d\\n", totalScore);\n\n    // Calculate float average and print with %.2f:\n\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    int mathScore = 85;\n    int scienceScore = 90;\n    int totalScore = mathScore + scienceScore;\n    printf("Total Score: %d\\n", totalScore);\n    float average = (float)totalScore / 2.0f;\n    printf("Average: %.2f\\n", average);\n    return 0;\n}',
        tests: [
          {
            id: 't1',
            description: 'You should declare a `float` variable named `average`.',
            failureHint: 'Ensure you write `float average = (float)totalScore / 2.0f;` or `totalScore / 2.0;`.',
            validate: (code) => /float\s+average\s*=\s*.*totalScore/.test(code),
          },
          {
            id: 't2',
            description: 'You should print the average using `%.2f`.',
            failureHint: 'Call `printf("Average: %.2f\\n", average);`.',
            validate: (code) => /printf\s*\(\s*"Average:\s*%\.2f\\n"\s*,\s*average\s*\)/.test(code),
          },
        ],
        expectedOutput: 'Total Score: 175\nAverage: 87.50',
      },
      {
        id: 5,
        stepNumber: 5,
        title: 'Determine Grade with Conditional If-Else Branching',
        conceptExplanation:
          'Conditional statements allow programs to make decisions.\n\nAn `if - else if - else` structure tests conditions sequentially:\n`if (average >= 90.0) { grade = \'A\'; } else if (average >= 80.0) { grade = \'B\'; } else { grade = \'C\'; }`',
        syntaxTip: "char grade = 'F';\nif (average >= 80.0f) {\n    grade = 'A';\n} else {\n    grade = 'B';\n}",
        taskInstruction:
          'Declare a `char grade;`. If `average >= 80.0f`, assign `grade = \'A\';`, otherwise assign `grade = \'B\';`. Then print `"Grade: %c\\n"` passing `grade`.',
        starterCode: '#include <stdio.h>\n\nint main() {\n    int mathScore = 85;\n    int scienceScore = 90;\n    int totalScore = mathScore + scienceScore;\n    printf("Total Score: %d\\n", totalScore);\n    float average = (float)totalScore / 2.0f;\n    printf("Average: %.2f\\n", average);\n\n    // Implement grade check logic and print grade:\n\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    int mathScore = 85;\n    int scienceScore = 90;\n    int totalScore = mathScore + scienceScore;\n    printf("Total Score: %d\\n", totalScore);\n    float average = (float)totalScore / 2.0f;\n    printf("Average: %.2f\\n", average);\n\n    char grade;\n    if (average >= 80.0f) {\n        grade = \'A\';\n    } else {\n        grade = \'B\';\n    }\n    printf("Grade: %c\\n", grade);\n    return 0;\n}',
        tests: [
          {
            id: 't1',
            description: 'You should declare a `char grade;` variable.',
            failureHint: 'Write `char grade;`.',
            validate: (code) => /char\s+grade\s*;/.test(code),
          },
          {
            id: 't2',
            description: 'You should check `if (average >= 80` to determine the grade.',
            failureHint: 'Add `if (average >= 80.0f) { grade = \'A\'; } else { grade = \'B\'; }`.',
            validate: (code) => /if\s*\(\s*average\s*>=\s*80/.test(code),
          },
          {
            id: 't3',
            description: 'You should print the grade using `%c`.',
            failureHint: 'Add `printf("Grade: %c\\n", grade);`.',
            validate: (code) => /printf\s*\(\s*"Grade:\s*%c\\n"\s*,\s*grade\s*\)/.test(code),
          },
        ],
        expectedOutput: 'Total Score: 175\nAverage: 87.50\nGrade: A',
      },
    ],
  },

  // =========================================================================
  // PROJECT 2: C++ OOP - "Build an RPG Hero & Inventory System in C++"
  // =========================================================================
  {
    id: 'cpp-project-rpg',
    courseId: 'cpp',
    title: 'Build an RPG Hero Class in C++',
    subtitle: 'Learn Object-Oriented C++ Step by Step',
    description: 'Build a battle-ready RPG Hero class from the ground up, implementing encapsulation, constructors, and member methods step by step.',
    totalSteps: 5,
    steps: [
      {
        id: 1,
        stepNumber: 1,
        title: 'Include <iostream> and Use the std Namespace',
        conceptExplanation:
          'In C++, `<iostream>` provides standard input and output streams like `std::cout` and `std::cin`.\n\n`using namespace std;` allows writing `cout` instead of having to type `std::cout` everywhere.',
        syntaxTip: '#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}',
        taskInstruction:
          'Include `<iostream>`, write `using namespace std;`, and declare `int main()` returning `0;`.',
        starterCode: '// Step 1: Initialize your modern C++ program\n\n',
        solutionCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}',
        tests: [
          {
            id: 't1',
            description: 'Your code should include `<iostream>`.',
            failureHint: 'Add `#include <iostream>` at the top.',
            validate: (code) => /#include\s*<iostream>/.test(code),
          },
          {
            id: 't2',
            description: 'Your code should include `using namespace std;`.',
            failureHint: 'Add `using namespace std;`.',
            validate: (code) => /using\s+namespace\s+std\s*;/.test(code),
          },
          {
            id: 't3',
            description: 'Your code should define `int main()` returning `0;`.',
            failureHint: 'Ensure `int main() { ... return 0; }` is defined.',
            validate: (code) => /int\s+main\s*\(\s*\)/.test(code) && /return\s+0\s*;/.test(code),
          },
        ],
      },
      {
        id: 2,
        stepNumber: 2,
        title: 'Define the Hero Class with Public Attributes',
        conceptExplanation:
          'In C++, classes bundle data and behaviors together. Classes are declared with `class ClassName { ... };`.\n\nBy default, class members are private. Use the `public:` access specifier to make variables accessible outside the class.',
        syntaxTip: 'class Hero {\npublic:\n    string name;\n    int health;\n};',
        taskInstruction:
          'Above `main()`, define a `class Hero`. Under `public:`, declare a `string name;` and `int health;`. Do not forget the closing semicolon `};`.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\n// Define class Hero here:\n\nint main() {\n    return 0;\n}',
        solutionCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hero {\npublic:\n    string name;\n    int health;\n};\n\nint main() {\n    return 0;\n}',
        tests: [
          {
            id: 't1',
            description: 'You should define a `class Hero` with a closing semicolon.',
            failureHint: 'Write `class Hero { ... };` above `main`.',
            validate: (code) => /class\s+Hero\s*\{[\s\S]*\};/.test(code),
          },
          {
            id: 't2',
            description: 'Your class should have `public:` section with `string name;` and `int health;`.',
            failureHint: 'Add `public:` followed by `string name;` and `int health;`.',
            validate: (code) => /public:\s*string\s+name\s*;[\s\S]*int\s+health\s*;/.test(code) || /public:\s*int\s+health\s*;[\s\S]*string\s+name\s*;/.test(code),
          },
        ],
      },
      {
        id: 3,
        stepNumber: 3,
        title: 'Add a Constructor to Initialize Hero Stats',
        conceptExplanation:
          'A constructor is a special member function that initializes objects upon creation. It has the exact same name as the class and has NO return type.\n\nParameterized constructors allow passing arguments during object instantiation: `Hero(string hName, int hHealth) { ... }`.',
        syntaxTip: 'Hero(string hName, int hHealth) {\n    name = hName;\n    health = hHealth;\n}',
        taskInstruction:
          'Inside `public:` in `Hero`, add a constructor `Hero(string hName, int hHealth)` that sets `name = hName;` and `health = hHealth;`.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hero {\npublic:\n    string name;\n    int health;\n\n    // Add constructor here:\n\n};\n\nint main() {\n    return 0;\n}',
        solutionCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hero {\npublic:\n    string name;\n    int health;\n\n    Hero(string hName, int hHealth) {\n        name = hName;\n        health = hHealth;\n    }\n};\n\nint main() {\n    return 0;\n}',
        tests: [
          {
            id: 't1',
            description: 'You should add a constructor `Hero(string hName, int hHealth)`.',
            failureHint: 'Write `Hero(string hName, int hHealth) { name = hName; health = hHealth; }`.',
            validate: (code) => /Hero\s*\(\s*string\s+\w+\s*,\s*int\s+\w+\s*\)/.test(code),
          },
          {
            id: 't2',
            description: 'The constructor should assign the name and health parameters to the member variables.',
            failureHint: 'Assign `name = hName;` and `health = hHealth;` inside the constructor body.',
            validate: (code) => /name\s*=\s*\w+;/.test(code) && /health\s*=\s*\w+;/.test(code),
          },
        ],
      },
      {
        id: 4,
        stepNumber: 4,
        title: 'Add a Member Function displayStats()',
        conceptExplanation:
          'Member functions define behaviors for a class. Inside member functions, you can directly access member variables.\n\nUse `cout << name << " HP: " << health << endl;` to print the hero’s statistics.',
        syntaxTip: 'void displayStats() {\n    cout << "Hero: " << name << " | HP: " << health << endl;\n}',
        taskInstruction:
          'Add a member function `void displayStats()` inside `Hero` that outputs: `cout << "Hero: " << name << " | HP: " << health << endl;`.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hero {\npublic:\n    string name;\n    int health;\n\n    Hero(string hName, int hHealth) {\n        name = hName;\n        health = hHealth;\n    }\n\n    // Add void displayStats() here:\n\n};\n\nint main() {\n    return 0;\n}',
        solutionCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hero {\npublic:\n    string name;\n    int health;\n\n    Hero(string hName, int hHealth) {\n        name = hName;\n        health = hHealth;\n    }\n\n    void displayStats() {\n        cout << "Hero: " << name << " | HP: " << health << endl;\n    }\n};\n\nint main() {\n    return 0;\n}',
        tests: [
          {
            id: 't1',
            description: 'You should add a `void displayStats()` function in the `Hero` class.',
            failureHint: 'Define `void displayStats() { ... }` inside the public section.',
            validate: (code) => /void\s+displayStats\s*\(\s*\)/.test(code),
          },
          {
            id: 't2',
            description: '`displayStats` should print the hero name and health with `cout`.',
            failureHint: 'Use `cout << "Hero: " << name << " | HP: " << health << endl;`.',
            validate: (code) => /cout\s*<<[\s\S]*name[\s\S]*health/.test(code),
          },
        ],
      },
      {
        id: 5,
        stepNumber: 5,
        title: 'Instantiate a Hero Object and Call displayStats()',
        conceptExplanation:
          'To create an instance of a class, supply the required constructor arguments: `Hero knight("Arthur", 100);`.\n\nCall member methods on the instance using the dot (`.`) operator: `knight.displayStats();`.',
        syntaxTip: 'Hero knight("Arthur", 100);\nknight.displayStats();',
        taskInstruction:
          'Inside `main()`, instantiate an object `Hero knight("Arthur", 100);` and call `knight.displayStats();`.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hero {\npublic:\n    string name;\n    int health;\n\n    Hero(string hName, int hHealth) {\n        name = hName;\n        health = hHealth;\n    }\n\n    void displayStats() {\n        cout << "Hero: " << name << " | HP: " << health << endl;\n    }\n};\n\nint main() {\n    // Create knight object and call displayStats():\n\n    return 0;\n}',
        solutionCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hero {\npublic:\n    string name;\n    int health;\n\n    Hero(string hName, int hHealth) {\n        name = hName;\n        health = hHealth;\n    }\n\n    void displayStats() {\n        cout << "Hero: " << name << " | HP: " << health << endl;\n    }\n};\n\nint main() {\n    Hero knight("Arthur", 100);\n    knight.displayStats();\n    return 0;\n}',
        tests: [
          {
            id: 't1',
            description: 'You should instantiate a `Hero` object named `knight` with `"Arthur"` and `100`.',
            failureHint: 'Write `Hero knight("Arthur", 100);` inside `main()`.',
            validate: (code) => /Hero\s+knight\s*\(\s*"Arthur"\s*,\s*100\s*\)\s*;/.test(code),
          },
          {
            id: 't2',
            description: 'You should call `knight.displayStats();`.',
            failureHint: 'Write `knight.displayStats();` after creating the object.',
            validate: (code) => /knight\s*\.\s*displayStats\s*\(\s*\)\s*;/.test(code),
          },
        ],
        expectedOutput: 'Hero: Arthur | HP: 100',
      },
    ],
  },
];
