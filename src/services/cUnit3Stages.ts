import { Stage } from '@/types';

/**
 * High-fidelity, syllabus-accurate stages for C Unit 3:
 * "Control Flow (Decision Making, Branching, Looping, Jumps & Patterns)"
 * Directly derived from university syllabus and lecture notes (FCP_Unit_3.pdf).
 */
export const cUnit3CustomStages: Stage[] = [
  {
    "id": "c-u3-t1-s1",
    "topicId": "c-u3-t1",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 1,
    "title": "Stage 1: Control Flow Overview \u2014 Sequential vs. Conditional Execution",
    "subtitle": "Control Flow Foundations Level 1",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "By default, a C program executes instructions sequentially from top to bottom, one statement after another. Control Flow constructs alter this default linear order, allowing programs to make decisions, branch down alternate paths, or repeat actions.",
      "definitions": [
        "Sequential Execution: The default execution mode where CPU executes instructions in the exact textual order in which they appear.",
        "Control Flow: The order in which individual statements, instructions, or function calls are executed or evaluated in a computing program.",
        "Conditional Branching: Jumping to a specific section of code only when a designated boolean condition evaluates to True (non-zero)."
      ],
      "syntax": "// Default Sequential Flow:\nstatement_1;\nstatement_2;\nstatement_3;\n\n// Conditional Flow:\nif (condition) {\n    // Branch taken only if condition is true!\n}",
      "realLifeExample": "Walking down a straight hallway with closed doors: sequential flow is walking straight; conditional branching is opening and entering Room B only if your key fits the lock.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    printf(\"1. Program initialization (Sequential)\\n\");\n    \n    int securityClearance = 1; // 1 = Authorized, 0 = Denied\n\n    // Conditional Branching\n    if (securityClearance == 1) {\n        printf(\"2. Security check passed: Vault unlocked! (Branch Taken)\\n\");\n    }\n\n    printf(\"3. Program execution completed (Sequential)\\n\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "printf(\"1. Program initialization (Sequential)\\n\");",
          "explanation": "Executes first in standard sequential order."
        },
        {
          "line": "if (securityClearance == 1)",
          "explanation": "Evaluates relational equality; since 1 == 1 is True (1), CPU branches into the inner block."
        },
        {
          "line": "printf(\"3. Program execution completed (Sequential)\\n\");",
          "explanation": "Linear execution resumes after the conditional construct finishes."
        }
      ],
      "expectedOutput": "1. Program initialization (Sequential)\n2. Security check passed: Vault unlocked! (Branch Taken)\n3. Program execution completed (Sequential)",
      "pointsToRemember": [
        "Without control flow, computer programs could only perform simple, static calculations.",
        "In C, any non-zero integer is logically True, while exactly 0 is False.",
        "Control statements allow dynamic reactivity based on user input and system conditions."
      ]
    },
    "quiz": {
      "question": "What is the default execution flow in a C program when no branching or looping statements are present?",
      "options": [
        "Sequential execution from top to bottom",
        "Random parallel execution across available CPU cores",
        "Reverse order from bottom to top",
        "Circular polling execution"
      ],
      "correctIndex": 0,
      "explanation": "In C, statements execute sequentially line-by-line from top to bottom unless altered by control flow statements."
    }
  },
  {
    "id": "c-u3-t1-s2",
    "topicId": "c-u3-t1",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 2,
    "title": "Stage 2: The Simple If Statement & Voting Eligibility Check",
    "subtitle": "One-Way Conditional Branching Level 2",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "The Simple If statement is a one-way decision construct. It tests a condition inside parentheses: if the condition is True (non-zero), the statement or block inside executes. If the condition is False (0), the entire block is bypassed.",
      "definitions": [
        "Simple If: A one-way branching statement that executes a block of code conditionally based on a single boolean test.",
        "Test Condition: A relational or logical expression enclosed in parentheses that evaluates to an integer (0 for false, non-zero for true)."
      ],
      "syntax": "if (test_condition) {\n    // Statement-block executed ONLY if test_condition is True (non-zero)\n}",
      "realLifeExample": "An automated umbrella dispenser that dispenses an umbrella only if the rain sensor detects precipitation; otherwise, it does nothing and you keep walking.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int candidateAge = 20;\n\n    printf(\"Candidate age entered: %d\\n\", candidateAge);\n\n    // Simple If Statement\n    if (candidateAge >= 18) {\n        printf(\"ELIGIBILITY CONFIRMED: You are legally eligible to vote!\\n\");\n    }\n\n    printf(\"Verification routine completed.\\n\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "if (candidateAge >= 18)",
          "explanation": "Evaluates 20 >= 18, which evaluates to 1 (True)."
        },
        {
          "line": "printf(\"ELIGIBILITY CONFIRMED...\\n\");",
          "explanation": "Executes because the condition was non-zero."
        },
        {
          "line": "printf(\"Verification routine completed.\\n\");",
          "explanation": "Runs unconditionally after the if statement completes."
        }
      ],
      "expectedOutput": "Candidate age entered: 20\nELIGIBILITY CONFIRMED: You are legally eligible to vote!\nVerification routine completed.",
      "pointsToRemember": [
        "Never put a semicolon directly after the if condition: if (age >= 18); terminates the if statement immediately!",
        "Always use curly braces {} to enclose the if body, even for single statements, to avoid bugs during future edits."
      ]
    },
    "quiz": {
      "question": "What is the consequence of placing a semicolon after the if condition, like: if (x > 10); { printf(\"Hello\"); } ?",
      "options": [
        "The if statement terminates immediately, and \"Hello\" is printed unconditionally regardless of x",
        "A compile-time fatal syntax error is produced",
        "The program halts and throws a runtime exception",
        "The block inside the braces executes only when x <= 10"
      ],
      "correctIndex": 0,
      "explanation": "In C, a semicolon creates an empty statement. The if condition guards only the empty statement, so the following block executes unconditionally."
    }
  },
  {
    "id": "c-u3-t1-s3",
    "topicId": "c-u3-t1",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 3,
    "title": "Stage 3: Two-Way Decision Making with If-Else & Parity Classifier",
    "subtitle": "Two-Way Branching Level 3",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "When a program must perform one action if a condition is met and an alternate action if the condition is not met, the If-Else statement is used. It guarantees that exactly one of the two blocks will execute.",
      "definitions": [
        "If-Else Statement: A two-way selection construct that directs program execution to a True-block if the condition is non-zero, or to an Else-block if the condition is zero.",
        "True-Block: The set of statements executed when the if condition evaluates to True.",
        "False-Block (Else-Block): The set of statements executed when the if condition evaluates to False."
      ],
      "syntax": "if (condition) {\n    // True-block statements (executed if condition != 0)\n} else {\n    // False-block statements (executed if condition == 0)\n}",
      "realLifeExample": "A traffic light sensor: If the light is Green, proceed driving; Else, bring the vehicle to a complete stop.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int testNumber = 27;\n\n    printf(\"Analyzing integer: %d\\n\", testNumber);\n\n    // Two-way decision: Even vs Odd Parity\n    if (testNumber % 2 == 0) {\n        printf(\"%d is an EVEN number (remainder = 0).\\n\", testNumber);\n    } else {\n        printf(\"%d is an ODD number (remainder = %d).\\n\", testNumber, testNumber % 2);\n    }\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "if (testNumber % 2 == 0)",
          "explanation": "Calculates 27 % 2 which equals 1. Evaluates 1 == 0 which is 0 (False)."
        },
        {
          "line": "else { printf(\"%d is an ODD number...\\n\"); }",
          "explanation": "Since the condition was False, execution jumps directly to the false-block."
        }
      ],
      "expectedOutput": "Analyzing integer: 27\n27 is an ODD number (remainder = 1).",
      "pointsToRemember": [
        "An else statement can never exist by itself without a preceding if statement.",
        "Exactly one of the two blocks (if or else) will execute; both can never execute simultaneously.",
        "The remainder operator % 2 determines whether any integer is even (0) or odd (1)."
      ]
    },
    "quiz": {
      "question": "Can both the if block and the else block execute during a single run of an if-else statement?",
      "options": [
        "No, they are mutually exclusive; exactly one will execute",
        "Yes, if the condition is equal to 0.5",
        "Yes, if both operands are positive numbers",
        "Yes, when compiled with optimization flags"
      ],
      "correctIndex": 0,
      "explanation": "The if-else construct is strictly mutually exclusive. If the condition is true, the if-block runs; otherwise, the else-block runs."
    }
  },
  {
    "id": "c-u3-t1-s4",
    "topicId": "c-u3-t1",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 4,
    "title": "Stage 4: Nested If-Else Structures & Number Sign Classifier (+ / - / 0)",
    "subtitle": "Hierarchical Branching Level 4",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "When a decision depends on the outcome of a prior decision, an if or else block can contain another complete if-else construct. This nesting enables hierarchical multi-level decision logic.",
      "definitions": [
        "Nested If-Else: An if-else construct placed entirely inside the body of another if or else statement.",
        "Dangling Else: A classic ambiguity in unbraced code where an else inadvertently pairs with the nearest preceding unmatched if."
      ],
      "syntax": "if (outer_condition) {\n    if (inner_condition) {\n        // outer is True AND inner is True\n    } else {\n        // outer is True BUT inner is False\n    }\n} else {\n    // outer is False\n}",
      "realLifeExample": "An airport boarding gate: First check if passenger has a valid boarding pass (outer if). If yes, check if their seat is First Class or Economy (inner if-else). If no pass, deny boarding (outer else).",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int value = -14;\n\n    printf(\"Classifying number: %d\\n\", value);\n\n    // Nested If-Else: Sign Classification (+, -, 0)\n    if (value != 0) {\n        // Inner decision: Non-zero values can be positive or negative\n        if (value > 0) {\n            printf(\"%d is POSITIVE.\\n\", value);\n        } else {\n            printf(\"%d is NEGATIVE.\\n\", value);\n        }\n    } else {\n        printf(\"The number is exactly ZERO.\\n\");\n    }\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "if (value != 0)",
          "explanation": "Outer condition checks if value is non-zero (-14 != 0 is True)."
        },
        {
          "line": "if (value > 0) ... else ...",
          "explanation": "Inner condition evaluates -14 > 0 (False), so inner else branch runs, printing NEGATIVE."
        }
      ],
      "expectedOutput": "Classifying number: -14\n-14 is NEGATIVE.",
      "pointsToRemember": [
        "To prevent the dangling-else problem, always use curly braces {} around all nested blocks.",
        "Keep nesting depth manageable (preferably under 3 levels) to maintain code readability."
      ]
    },
    "quiz": {
      "question": "To which \"if\" statement does an \"else\" clause attach in unbraced C code?",
      "options": [
        "To the closest preceding unmatched \"if\" at the same nesting level",
        "To the first \"if\" statement at the top of the function",
        "To the \"if\" statement with the most complex condition",
        "It generates a compiler error unless explicit braces are provided"
      ],
      "correctIndex": 0,
      "explanation": "In C, an else always binds to the closest preceding unmatched if unless curly braces explicitly specify otherwise."
    }
  },
  {
    "id": "c-u3-t1-s5",
    "topicId": "c-u3-t1",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 5,
    "title": "Stage 5: Multi-Condition Decision Logic & Leap Year Calculation",
    "subtitle": "Compound Expressions Level 5",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Many real-world algorithms require testing multiple conditions combined using logical AND (&&) and logical OR (||). The Gregorian leap year calculation is a classic example of compound boolean decision making.",
      "definitions": [
        "Compound Condition: An expression combining two or more relational tests using logical operators (&&, ||, !).",
        "Leap Year Rule: A year is a leap year if it is divisible by 4 but NOT by 100, UNLESS it is also divisible by 400."
      ],
      "syntax": "// Leap year compound logic:\nif ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {\n    // Leap year (366 days, February has 29 days)\n} else {\n    // Common year (365 days, February has 28 days)\n}",
      "realLifeExample": "Bank loan eligibility: An applicant qualifies if (Credit Score > 750 AND Income > $50,000) OR (Collateral Value > $200,000).",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int testYears[4] = {2000, 1900, 2024, 2023};\n\n    printf(\"--- Gregorian Calendar Leap Year Tester ---\\n\");\n    for (int i = 0; i < 4; i++) {\n        int yr = testYears[i];\n        if ((yr % 4 == 0 && yr % 100 != 0) || (yr % 400 == 0)) {\n            printf(\"Year %d: LEAP YEAR (366 days)\\n\", yr);\n        } else {\n            printf(\"Year %d: COMMON YEAR (365 days)\\n\", yr);\n        }\n    }\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "yr % 4 == 0 && yr % 100 != 0",
          "explanation": "Checks regular leap years (like 2024): divisible by 4 and not a century year."
        },
        {
          "line": "|| (yr % 400 == 0)",
          "explanation": "Century years like 2000 are leap years because 2000 % 400 == 0, whereas 1900 is NOT because 1900 % 400 != 0."
        }
      ],
      "expectedOutput": "--- Gregorian Calendar Leap Year Tester ---\nYear 2000: LEAP YEAR (366 days)\nYear 1900: COMMON YEAR (365 days)\nYear 2024: LEAP YEAR (366 days)\nYear 2023: COMMON YEAR (365 days)",
      "pointsToRemember": [
        "Logical AND (&&) has higher precedence than logical OR (||).",
        "Use explicit parentheses to make compound conditions unambiguous.",
        "C evaluates logical expressions using short-circuit evaluation: if the left side of || is True, the right side is not evaluated."
      ]
    },
    "quiz": {
      "question": "Why is the year 1900 NOT a leap year, even though it is divisible by 4?",
      "options": [
        "Because century years divisible by 100 must also be divisible by 400 to be leap years",
        "Because 1900 is an odd century",
        "Because the Gregorian calendar only started in the year 2000",
        "Because 1900 is divisible by 3"
      ],
      "correctIndex": 0,
      "explanation": "Under the Gregorian calendar rule, century years (divisible by 100) are only leap years if they are also evenly divisible by 400. 1900 % 400 == 300 != 0."
    }
  },
  {
    "id": "c-u3-t2-s1",
    "topicId": "c-u3-t2",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 1,
    "title": "Stage 1: The Else-If Ladder & Academic Grading Systems",
    "subtitle": "Multi-Path Branching Level 1",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "When a decision involves choosing among several mutually exclusive conditions, the Else-If Ladder is the standard construct. Conditions are evaluated from top to bottom. As soon as a True condition is encountered, its block executes and the rest of the entire ladder is bypassed.",
      "definitions": [
        "Else-If Ladder: A multi-path decision structure where multiple condition checks are chained sequentially using \"else if\".",
        "Default Else: The optional final block at the bottom of the ladder that executes if none of the preceding conditions were True."
      ],
      "syntax": "if (condition_1) {\n    // statement 1\n} else if (condition_2) {\n    // statement 2\n} else if (condition_3) {\n    // statement 3\n} else {\n    // default statement when all conditions are False\n}",
      "realLifeExample": "Income tax brackets: 0-$10k taxed at 0%, $10k-$50k at 10%, $50k-$100k at 20%, and above $100k at 30%.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int marks = 83;\n    char grade;\n\n    // Academic grade determination\n    if (marks >= 90) {\n        grade = 'A';\n    } else if (marks >= 80) {\n        grade = 'B';\n    } else if (marks >= 70) {\n        grade = 'C';\n    } else if (marks >= 60) {\n        grade = 'D';\n    } else {\n        grade = 'F';\n    }\n\n    printf(\"Student Marks: %d -> Grade Assigned: %c\\n\", marks, grade);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "if (marks >= 90)",
          "explanation": "Evaluates 83 >= 90 (False)."
        },
        {
          "line": "else if (marks >= 80)",
          "explanation": "Evaluates 83 >= 80 (True). Assigns grade = 'B'."
        },
        {
          "line": "skips remaining else if blocks",
          "explanation": "Once a condition matches, the program skips all subsequent checks and exits the ladder."
        }
      ],
      "expectedOutput": "Student Marks: 83 -> Grade Assigned: B",
      "pointsToRemember": [
        "Conditions must be ordered logically (e.g. descending score thresholds).",
        "As soon as one condition matches, execution skips all remaining else-if checks.",
        "The final else is optional but highly recommended as a fallback catch-all."
      ]
    },
    "quiz": {
      "question": "What happens in an else-if ladder when the first condition evaluates to True?",
      "options": [
        "Its block executes, and all remaining conditions in the ladder are skipped",
        "All remaining conditions are still evaluated in case another is also True",
        "The program throws an ambiguity warning",
        "The final else block is forced to execute"
      ],
      "correctIndex": 0,
      "explanation": "In an else-if ladder, execution exits the entire structure immediately after the first matching block completes."
    }
  },
  {
    "id": "c-u3-t2-s2",
    "topicId": "c-u3-t2",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 2,
    "title": "Stage 2: The Switch Statement Anatomy \u2014 Syntax, Cases & Default",
    "subtitle": "Multi-Way Jump Tables Level 2",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "The Switch statement provides a clean, high-performance alternative to long else-if ladders when comparing a single integral variable against several discrete constant values. Compilers often optimize switch statements into high-speed jump tables.",
      "definitions": [
        "Switch Statement: A control statement that dispatches execution to one of several labeled case statements based on the value of an integer or character expression.",
        "Case Label: A compile-time constant expression followed by a colon (e.g. \"case 1:\").",
        "Default Label: The fallback case that executes when no case constant matches the control expression."
      ],
      "syntax": "switch (integral_expression) {\n    case constant_1:\n        // statement 1\n        break;\n    case constant_2:\n        // statement 2\n        break;\n    default:\n        // default statement\n        break;\n}",
      "realLifeExample": "A floor elevator button panel: Pressing button 3 jumps your elevator directly to Floor 3 without stopping on floors 1 or 2.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int dayNumber = 4;\n\n    printf(\"Day %d of the week: \", dayNumber);\n    switch (dayNumber) {\n        case 1: printf(\"Monday\\n\"); break;\n        case 2: printf(\"Tuesday\\n\"); break;\n        case 3: printf(\"Wednesday\\n\"); break;\n        case 4: printf(\"Thursday\\n\"); break;\n        case 5: printf(\"Friday\\n\"); break;\n        case 6: printf(\"Saturday\\n\"); break;\n        case 7: printf(\"Sunday\\n\"); break;\n        default: printf(\"Invalid Day Number! (Must be 1-7)\\n\"); break;\n    }\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "switch (dayNumber)",
          "explanation": "Evaluates the integer expression dayNumber (which holds 4)."
        },
        {
          "line": "case 4: printf(\"Thursday\\n\"); break;",
          "explanation": "Jumps directly to case 4, prints \"Thursday\", and break exits the switch."
        }
      ],
      "expectedOutput": "Day 4 of the week: Thursday",
      "pointsToRemember": [
        "The switch expression must evaluate to an integral type: int, char, short, long, or enum.",
        "Floating-point types (float, double) and strings are strictly forbidden in C switch expressions.",
        "Case values must be compile-time constants (e.g. 5 or 'A'), never variables (e.g. case x: is illegal)."
      ]
    },
    "quiz": {
      "question": "Which of the following types CANNOT be used as the control expression of a switch statement in C?",
      "options": [
        "float or double",
        "int",
        "char",
        "enum"
      ],
      "correctIndex": 0,
      "explanation": "In C, switch statements only work with integral types (int, char, enum). Floating-point values cannot be used because equality comparison on floats is imprecise."
    }
  },
  {
    "id": "c-u3-t2-s3",
    "topicId": "c-u3-t2",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 3,
    "title": "Stage 3: Case Fall-Through & Grouping Vowels with break;",
    "subtitle": "Switch Flow Mechanics Level 3",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "In C, if a case does not end with a \"break;\" statement, execution continues seamlessly into the code of the next case, regardless of whether that case matches. This phenomenon is called \"fall-through\". While often a bug when accidental, it can be intentionally used to group multiple cases.",
      "definitions": [
        "Fall-Through: The sequential execution of subsequent case statements when the break statement is omitted from the preceding case.",
        "Break in Switch: A keyword that terminates the switch construct and transfers control to the statement following the closing brace."
      ],
      "syntax": "switch (ch) {\n    case 'a':\n    case 'e':\n    case 'i':\n    case 'o':\n    case 'u':\n        // Shared block for all 5 vowels!\n        printf(\"Vowel!\\n\");\n        break; // Crucial break\n}",
      "realLifeExample": "Subway fare categories: Ages 0 to 5 all qualify for the \"Free Toddler\" ticket tier without needing separate pricing rules.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    char testChar = 'O';\n\n    printf(\"Testing character: '%c'\\n\", testChar);\n\n    // Grouping lowercase and uppercase vowels using intentional fall-through\n    switch (testChar) {\n        case 'a': case 'A':\n        case 'e': case 'E':\n        case 'i': case 'I':\n        case 'o': case 'O':\n        case 'u': case 'U':\n            printf(\"Result: '%c' is an English VOWEL.\\n\", testChar);\n            break;\n        default:\n            printf(\"Result: '%c' is a CONSONANT or other character.\\n\", testChar);\n            break;\n    }\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "case 'o': case 'O':",
          "explanation": "Matches 'O', falls through into the shared printf block."
        },
        {
          "line": "break;",
          "explanation": "Terminates the switch block so it does not fall through into the default label."
        }
      ],
      "expectedOutput": "Testing character: 'O'\nResult: 'O' is an English VOWEL.",
      "pointsToRemember": [
        "Omission of break causes unintentional fall-through, a very common and insidious bug in C.",
        "Intentional fall-through should be commented or documented clearly in production code.",
        "The default label does not strictly need a break if it is at the very end, but adding one is good practice."
      ]
    },
    "quiz": {
      "question": "What happens if you omit the \"break;\" statement at the end of a matched case block?",
      "options": [
        "Execution falls through into the next case and executes its statements as well",
        "The compiler rejects the program with an error",
        "The program halts with a runtime exception",
        "The switch block automatically restarts from the first case"
      ],
      "correctIndex": 0,
      "explanation": "In C, without a break statement, execution continues sequentially into the statements of subsequent cases regardless of their labels."
    }
  },
  {
    "id": "c-u3-t2-s4",
    "topicId": "c-u3-t2",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 4,
    "title": "Stage 4: Switch vs. Else-If Ladder \u2014 Deep Architecture & Restrictions",
    "subtitle": "Branching Strategy Comparison Level 4",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Both the else-if ladder and the switch statement handle multi-path decisions, but they have distinct strengths, performance characteristics, and language restrictions that determine which to choose.",
      "definitions": [
        "Jump Table: A data structure used by compilers to implement switch statements, providing O(1) branch dispatch by indexing directly into a table of code addresses.",
        "Sequential Search: The O(N) evaluation method used by else-if ladders, testing each condition one by one from top to bottom."
      ],
      "syntax": "// Switch: Exact integral constants only (Fast O(1))\nswitch (val) {\n    case 1: ... break;\n    case 2: ... break;\n}\n\n// Else-If Ladder: Arbitrary relational/range conditions (Flexible O(N))\nif (score >= 90 && score <= 100) { ... }\nelse if (score >= 80) { ... }",
      "realLifeExample": "A direct phone speed-dial button (Switch: instant connection to Contact 4) vs. scrolling through your contact list one by one (Else-If ladder: testing each entry).",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    printf(\"=== Comparison Matrix: Switch vs. Else-If ===\\n\");\n    printf(\"Feature        | Switch Statement     | Else-If Ladder\\n\");\n    printf(\"---------------+----------------------+------------------\\n\");\n    printf(\"Condition Type | Integral equality    | Any boolean expr\\n\");\n    printf(\"Ranges (>=, <=)| Not natively supported| Fully supported\\n\");\n    printf(\"Data Types     | int, char, enum only | Any valid C type\\n\");\n    printf(\"Performance    | O(1) via Jump Table  | O(N) Sequential\\n\");\n    printf(\"Float/String   | Strictly Forbidden   | Fully Supported\\n\");\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "Condition Type",
          "explanation": "Switch tests only for strict equality against constants; else-if evaluates any relational or boolean expression."
        },
        {
          "line": "Performance",
          "explanation": "For many cases (e.g. > 5), switch can be much faster because of compiler jump table optimization."
        }
      ],
      "expectedOutput": "=== Comparison Matrix: Switch vs. Else-If ===\nFeature        | Switch Statement     | Else-If Ladder\n---------------+----------------------+------------------\nCondition Type | Integral equality    | Any boolean expr\nRanges (>=, <=)| Not natively supported| Fully supported\nData Types     | int, char, enum only | Any valid C type\nPerformance    | O(1) via Jump Table  | O(N) Sequential\nFloat/String   | Strictly Forbidden   | Fully Supported",
      "pointsToRemember": [
        "Use switch when testing a single variable against multiple discrete integer or character constants.",
        "Use else-if when testing floating-point numbers, relational ranges, or complex logical expressions with && and ||."
      ]
    },
    "quiz": {
      "question": "Under which scenario is an else-if ladder MANDATORY over a switch statement?",
      "options": [
        "When evaluating ranges of numbers (e.g. score >= 80 && score < 90) or floating-point expressions",
        "When testing whether an integer equals 1, 2, or 3",
        "When testing whether a character is 'A' or 'B'",
        "When writing code for microcontrollers"
      ],
      "correctIndex": 0,
      "explanation": "Switch statements cannot natively evaluate relational ranges (e.g. x >= 80) or floating-point numbers; such logic requires an else-if ladder."
    }
  },
  {
    "id": "c-u3-t2-s5",
    "topicId": "c-u3-t2",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 5,
    "title": "Stage 5: The Goto Statement \u2014 Unconditional Jumps & Cleanups",
    "subtitle": "Unconditional Control Transfer Level 5",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "The Goto statement causes an unconditional jump to a specified label within the current function. It can jump forward or backward. While widely discouraged in application code because it leads to \"spaghetti code\", it is accepted in low-level systems programming (e.g. Linux Kernel) for centralized error recovery and resource cleanup.",
      "definitions": [
        "Goto Statement: An unconditional branching construct that transfers control directly to a named label within the same function.",
        "Label: An identifier followed by a colon (e.g. \"error_cleanup:\") marking a jump target in the code.",
        "Forward Jump: Jumping ahead to a label later in the function (used for error exit).",
        "Backward Jump: Jumping back to a label earlier in the function (forms a manual loop)."
      ],
      "syntax": "// Syntax:\ngoto label_name;\n\n// ... intervening code ...\n\nlabel_name:\n    // statements executed after the jump",
      "realLifeExample": "An emergency fire alarm evacuation: When the alarm sounds, all workers immediately bypass normal exit procedures and jump directly to the Emergency Exit door.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    // 1. Backward Jump: Simulating a multiplication loop\n    int count = 1;\n    int table = 5;\n\n    printf(\"--- Backward Jump (Loop Simulation) ---\\n\");\ntable_loop:\n    printf(\"%d x %d = %d\\n\", table, count, table * count);\n    count++;\n    if (count <= 3) {\n        goto table_loop; // Backward jump creates loop\n    }\n\n    // 2. Forward Jump: Centralized Error Cleanup Pattern\n    printf(\"\\n--- Forward Jump (Error Handling Pattern) ---\\n\");\n    int allocationStatus = 0; // 0 = allocation failed\n\n    if (allocationStatus == 0) {\n        printf(\"Allocation failed! Jumping to cleanup label...\\n\");\n        goto cleanup_resources; // Forward jump skips normal processing\n    }\n\n    printf(\"Processing data safely...\\n\");\n    return 0;\n\ncleanup_resources:\n    printf(\"[CLEANUP] Releasing allocated buffers and shutting down safely.\\n\");\n    return 1;\n}",
      "lineByLineExplanation": [
        {
          "line": "goto table_loop;",
          "explanation": "Jumps backward to the label \"table_loop:\", repeating the block as long as count <= 3."
        },
        {
          "line": "goto cleanup_resources;",
          "explanation": "Jumps forward over normal processing directly to the error handling block."
        },
        {
          "line": "cleanup_resources:",
          "explanation": "Defines the label target identifier followed by a colon."
        }
      ],
      "expectedOutput": "--- Backward Jump (Loop Simulation) ---\n5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n\n--- Forward Jump (Error Handling Pattern) ---\nAllocation failed! Jumping to cleanup label...\n[CLEANUP] Releasing allocated buffers and shutting down safely.",
      "pointsToRemember": [
        "A goto statement cannot jump across different functions; it is strictly local to its enclosing function.",
        "Avoid using goto for standard looping or branching; use while, for, or if-else instead.",
        "Forward jumps to a centralized error cleanup label at the end of a function are standard in the Linux kernel."
      ]
    },
    "quiz": {
      "question": "Can a \"goto\" statement jump to a label defined inside a completely different function?",
      "options": [
        "No, goto is strictly scoped within the current function",
        "Yes, by prefixing the function name before the label",
        "Yes, if the label is declared with the extern keyword",
        "Yes, when compiled with GCC flags"
      ],
      "correctIndex": 0,
      "explanation": "In C, goto labels have function scope. A goto statement cannot jump outside of its enclosing function boundary."
    }
  },
  {
    "id": "c-u3-t3-s1",
    "topicId": "c-u3-t3",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 1,
    "title": "Stage 1: The Anatomy of a Loop \u2014 4 Core Components of Iteration",
    "subtitle": "Loop Architecture Level 1",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "A loop executes a block of statements repeatedly as long as a test condition remains true. Regardless of syntax (while, for, or do-while), every robust loop consists of 4 foundational building blocks.",
      "definitions": [
        "Initialization: Setting the starting value of the loop control variable before entering the loop.",
        "Test Condition: The boolean expression evaluated before (or after) each iteration to decide whether to continue.",
        "Body of the Loop: The collection of statements executed repeatedly during each iteration.",
        "Update Expression: The increment or decrement statement that modifies the loop variable so the condition eventually becomes false."
      ],
      "syntax": "// 4 Core Components:\n1. initialization;             // e.g., int i = 1;\nwhile (2. test_condition) {    // e.g., i <= 5;\n    3. loop_body_statements;   // e.g., printf(\"%d\\n\", i);\n    4. update_expression;      // e.g., i++;\n}",
      "realLifeExample": "Running laps on a track: 1. Put on running shoes (Init), 2. Check if completed 10 laps (Condition), 3. Run lap (Body), 4. Add 1 to lap count on your watch (Update).",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    // Demonstrating the 4 parts explicitly\n    int i = 1;              // 1. Initialization\n    printf(\"Starting loop...\\n\");\n\n    while (i <= 4) {\n        printf(\"Iterating: i = %d\\n\", i); // 3. Loop Body\n        i++;                // 4. Update Expression\n    }\n\n    printf(\"Loop finished! Final value of i = %d\\n\", i);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "int i = 1;",
          "explanation": "Initializes the loop counter variable to 1."
        },
        {
          "line": "while (i <= 4)",
          "explanation": "Evaluates the test condition prior to each pass."
        },
        {
          "line": "printf(\"Iterating: i = %d\\n\", i);",
          "explanation": "The body statement executing 4 times."
        },
        {
          "line": "i++;",
          "explanation": "Increments the counter so the loop eventually reaches i = 5 and terminates."
        }
      ],
      "expectedOutput": "Starting loop...\nIterating: i = 1\nIterating: i = 2\nIterating: i = 3\nIterating: i = 4\nLoop finished! Final value of i = 5",
      "pointsToRemember": [
        "If the update expression is omitted, the loop condition will never become false, causing an infinite loop.",
        "When the while loop terminates, the loop counter variable holds the value that caused the condition to fail (here, 5)."
      ]
    },
    "quiz": {
      "question": "What occurs if the programmer forgets to include the update expression inside a while loop?",
      "options": [
        "The loop runs indefinitely as an infinite loop, potentially freezing program execution",
        "The compiler detects it and inserts an automatic counter increment",
        "The loop executes only once and terminates normally",
        "The variable overflows and terminates after 256 iterations"
      ],
      "correctIndex": 0,
      "explanation": "Without updating the control variable, the test condition remains perpetually True, resulting in an infinite loop."
    }
  },
  {
    "id": "c-u3-t3-s2",
    "topicId": "c-u3-t3",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 2,
    "title": "Stage 2: The While Statement & Sum of Squares Series",
    "subtitle": "Pre-Test Iteration Level 2",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "The While loop is an entry-controlled loop. The condition is evaluated at the top before any statements in the body are executed. If the condition is false initially, the body does not execute even once (0 iterations).",
      "definitions": [
        "Entry-Controlled Loop: A loop whose control condition is evaluated before entering the loop body.",
        "Zero-Execution Capability: If the initial condition is False, the while loop body executes 0 times."
      ],
      "syntax": "initialization;\nwhile (test_condition) {\n    // statement(s);\n    update_expression;\n}",
      "realLifeExample": "Boarding a train with a ticket: The conductor checks your ticket before you board; if your ticket is invalid, you board 0 times.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    // Problem: Compute the Sum of Squares: 1^2 + 2^2 + 3^2 + ... + 10^2\n    int num = 1;\n    int sumOfSquares = 0;\n\n    printf(\"--- Calculating Sum of Squares (1 to 10) ---\\n\");\n    while (num <= 10) {\n        sumOfSquares += (num * num);\n        printf(\"num = %2d -> Square = %3d | Running Sum = %3d\\n\", num, num * num, sumOfSquares);\n        num++;\n    }\n\n    printf(\"\\nFinal Sum of Squares for 1..10 is: %d\\n\", sumOfSquares);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "while (num <= 10)",
          "explanation": "Evaluates num <= 10 before every single iteration."
        },
        {
          "line": "sumOfSquares += (num * num);",
          "explanation": "Adds the square of the current integer to the accumulator."
        },
        {
          "line": "num++;",
          "explanation": "Advances counter by 1 each pass."
        }
      ],
      "expectedOutput": "--- Calculating Sum of Squares (1 to 10) ---\nnum =  1 -> Square =   1 | Running Sum =   1\nnum =  2 -> Square =   4 | Running Sum =   5\nnum =  3 -> Square =   9 | Running Sum =  14\nnum =  4 -> Square =  16 | Running Sum =  30\nnum =  5 -> Square =  25 | Running Sum =  55\nnum =  6 -> Square =  36 | Running Sum =  91\nnum =  7 -> Square =  49 | Running Sum = 140\nnum =  8 -> Square =  64 | Running Sum = 204\nnum =  9 -> Square =  81 | Running Sum = 285\nnum = 10 -> Square = 100 | Running Sum = 385\n\nFinal Sum of Squares for 1..10 is: 385",
      "pointsToRemember": [
        "The sum of squares of the first 10 integers is 385, matching the mathematical formula n(n+1)(2n+1)/6.",
        "While loops are the ideal choice when the number of iterations depends on runtime values rather than a fixed counter."
      ]
    },
    "quiz": {
      "question": "What is the minimum number of times a while loop body can execute?",
      "options": [
        "0 times",
        "1 time",
        "2 times",
        "Infinite times"
      ],
      "correctIndex": 0,
      "explanation": "Because while is an entry-controlled loop, if the condition evaluates to False on the very first check, the body executes 0 times."
    }
  },
  {
    "id": "c-u3-t3-s3",
    "topicId": "c-u3-t3",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 3,
    "title": "Stage 3: Number Manipulation with While \u2014 Reversing Digits & Palindromes",
    "subtitle": "Algorithmic Digits Level 3",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "A classic computer science problem is extracting and reversing the digits of an integer. Because we do not know how many digits a number has in advance, a while loop is the natural choice.",
      "definitions": [
        "Modulo Extraction: Using \"% 10\" to isolate the least significant (rightmost) digit of an integer.",
        "Integer Division Truncation: Using \"/ 10\" to discard the rightmost digit of an integer.",
        "Palindrome Number: A number that reads the same backward as forward (e.g. 12321, 404, 7557)."
      ],
      "syntax": "// Algorithmic Digit Reversal Pattern:\nint reversed = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    reversed = (reversed * 10) + digit;\n    num /= 10;\n}",
      "realLifeExample": "An odometer rolling backward, or reading a mirror reflection of numeric digits.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int original = 12321;\n    int temp = original;\n    int reversed = 0;\n\n    printf(\"Original Number: %d\\n\", original);\n\n    // Reversing digits step-by-step\n    while (temp > 0) {\n        int remainder = temp % 10;              // Extract rightmost digit\n        reversed = (reversed * 10) + remainder; // Append to reversed\n        temp /= 10;                             // Discard rightmost digit\n    }\n\n    printf(\"Reversed Number: %d\\n\", reversed);\n\n    // Palindrome Verification\n    if (original == reversed) {\n        printf(\"VERDICT: %d is a PALINDROME NUMBER!\\n\", original);\n    } else {\n        printf(\"VERDICT: %d is NOT a palindrome.\\n\", original);\n    }\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "int remainder = temp % 10;",
          "explanation": "Extracts the last digit (e.g. 12321 % 10 = 1)."
        },
        {
          "line": "reversed = (reversed * 10) + remainder;",
          "explanation": "Multiplies existing reversed number by 10 to shift digits left, then adds the new digit."
        },
        {
          "line": "temp /= 10;",
          "explanation": "Performs integer division by 10 to eliminate the extracted digit."
        }
      ],
      "expectedOutput": "Original Number: 12321\nReversed Number: 12321\nVERDICT: 12321 is a PALINDROME NUMBER!",
      "pointsToRemember": [
        "Always preserve the original number in a separate variable if you need to compare it later, because the loop reduces the working variable to 0.",
        "The digit reversal idiom (reversed = reversed * 10 + digit) is fundamental for competitive programming and interview questions."
      ]
    },
    "quiz": {
      "question": "What is the arithmetic operation used to isolate the rightmost digit of an integer in base 10?",
      "options": [
        "Modulo by 10 (num % 10)",
        "Division by 10 (num / 10)",
        "Multiplication by 10 (num * 10)",
        "Bitwise left shift (num << 1)"
      ],
      "correctIndex": 0,
      "explanation": "The expression num % 10 returns the remainder after integer division by 10, which corresponds exactly to the rightmost digit."
    }
  },
  {
    "id": "c-u3-t3-s4",
    "topicId": "c-u3-t3",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 4,
    "title": "Stage 4: The For Loop \u2014 Compact 3-Part Header & Factorial (n!)",
    "subtitle": "Counter-Controlled Iteration Level 4",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "The For loop provides a concise and structured syntax for counter-controlled loops. It packs the three loop maintenance expressions \u2014 initialization, condition, and update \u2014 into a single line at the top of the construct.",
      "definitions": [
        "For Loop: A compact entry-controlled loop structure that consolidates initialization, condition check, and loop variable update into a single header line.",
        "Factorial (n!): The product of all positive integers less than or equal to n (e.g., 5! = 5 * 4 * 3 * 2 * 1 = 120)."
      ],
      "syntax": "for (initialization; test_condition; update_expression) {\n    // Loop body statements\n}",
      "realLifeExample": "An automated assembly line: Inspect item 1 of 500, test quality, package item, advance counter to item 2.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int n = 6;\n    long long factorial = 1;\n\n    printf(\"Calculating Factorial of %d (%d!):\\n\", n, n);\n\n    for (int i = 1; i <= n; i++) {\n        factorial *= i;\n        printf(\"Step %d: Cumulative Factorial = %lld\\n\", i, factorial);\n    }\n\n    printf(\"\\nResult: %d! = %lld\\n\", n, factorial);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "for (int i = 1; i <= n; i++)",
          "explanation": "i is initialized to 1; condition i <= 6 checked; i incremented after each iteration."
        },
        {
          "line": "factorial *= i;",
          "explanation": "Multiplies the accumulator by the current loop counter."
        }
      ],
      "expectedOutput": "Calculating Factorial of 6 (6!):\nStep 1: Cumulative Factorial = 1\nStep 2: Cumulative Factorial = 2\nStep 3: Cumulative Factorial = 6\nStep 4: Cumulative Factorial = 24\nStep 5: Cumulative Factorial = 120\nStep 6: Cumulative Factorial = 720\n\nResult: 6! = 720",
      "pointsToRemember": [
        "All three components in a for loop header are optional: \"for (;;) { ... }\" creates a standard infinite loop in C.",
        "Variables declared in the for loop header (e.g. int i = 0) have scope limited strictly to the loop body in modern C (C99+).",
        "Factorials grow extremely rapidly; use long long or double for n > 12 to avoid 32-bit integer overflow."
      ]
    },
    "quiz": {
      "question": "What is the exact execution order of the expressions in a for loop header during each normal iteration?",
      "options": [
        "Condition evaluated -> Body executed -> Update expression executed",
        "Update expression executed -> Condition evaluated -> Body executed",
        "Initialization executed -> Body executed -> Condition evaluated",
        "Body executed -> Update expression executed -> Initialization executed"
      ],
      "correctIndex": 0,
      "explanation": "Initialization happens only once. Then, for each iteration: Condition is evaluated -> Body executes -> Update expression executes."
    }
  },
  {
    "id": "c-u3-t3-s5",
    "topicId": "c-u3-t3",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 5,
    "title": "Stage 5: Nested For Loops \u2014 2D Matrix Grids & Multiplication Tables",
    "subtitle": "Multi-Dimensional Iteration Level 5",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "A loop placed inside the body of another loop is called a nested loop. For every single iteration of the outer loop, the inner loop executes through all of its iterations from start to finish. Nested loops are fundamental for processing 2D arrays, matrices, image pixels, and coordinate grids.",
      "definitions": [
        "Nested Loop: A loop construct placed inside another loop.",
        "Outer Loop: The containing loop, typically controlling rows in a 2D grid.",
        "Inner Loop: The enclosed loop, typically controlling columns across each row."
      ],
      "syntax": "for (int r = 1; r <= rows; r++) {\n    for (int c = 1; c <= cols; c++) {\n        // executes (rows * cols) total times\n    }\n    printf(\"\\n\"); // newline after each row\n}",
      "realLifeExample": "A wall calendar: The outer loop cycles through the 12 months; for each month, the inner loop cycles through days 1 to 31.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int rows = 4, cols = 5;\n\n    printf(\"--- 4x5 Multiplication Grid Table ---\\n\");\n    for (int r = 1; r <= rows; r++) {\n        for (int c = 1; c <= cols; c++) {\n            printf(\"%4d\", r * c);\n        }\n        printf(\"\\n\");\n    }\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "for (int r = 1; r <= rows; r++)",
          "explanation": "Outer loop iterates 4 times, controlling row values 1 through 4."
        },
        {
          "line": "for (int c = 1; c <= cols; c++)",
          "explanation": "Inner loop iterates 5 times for EACH outer row iteration, printing values 1..5."
        },
        {
          "line": "printf(\"\\n\");",
          "explanation": "Prints a newline after all columns of the current row finish, wrapping to the next line."
        }
      ],
      "expectedOutput": "--- 4x5 Multiplication Grid Table ---\n   1   2   3   4   5\n   2   4   6   8  10\n   3   6   9  12  15\n   4   8  12  16  20",
      "pointsToRemember": [
        "The total number of inner loop executions is (Outer Iterations * Inner Iterations). Here: 4 * 5 = 20 times.",
        "ANSI C supports nested loops up to 15 levels deep, though code rarely exceeds 3 levels in practice.",
        "Always use distinct variable names for outer and inner loop counters (e.g. r and c, or i and j)."
      ]
    },
    "quiz": {
      "question": "If an outer loop runs 5 times and its inner loop runs 8 times, how many total times will the statement inside the inner loop execute?",
      "options": [
        "40 times (5 * 8)",
        "13 times (5 + 8)",
        "8 times",
        "5 times"
      ],
      "correctIndex": 0,
      "explanation": "In nested loops, the inner loop executes its full cycle for every single pass of the outer loop: 5 * 8 = 40 total executions."
    }
  },
  {
    "id": "c-u3-t4-s1",
    "topicId": "c-u3-t4",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 1,
    "title": "Stage 1: The Exit-Controlled Loop \u2014 How do-while Guarantees >= 1 Pass",
    "subtitle": "Post-Test Mechanics Level 1",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "The Do-While statement is an exit-controlled (post-test) loop. The loop body executes first, and the test condition is evaluated at the very bottom. Consequently, the body is guaranteed to execute at least once (minimum 1 iteration), even if the condition is false from the start.",
      "definitions": [
        "Exit-Controlled Loop: A loop whose control condition is evaluated at the exit point (bottom) after the body statements have executed.",
        "Guaranteed Execution: The property of do-while ensuring that the body runs at least 1 time under all circumstances."
      ],
      "syntax": "initialization;\ndo {\n    // Loop body statements (Executes AT LEAST once!)\n    update_expression;\n} while (test_condition); // MANDATORY semicolon!",
      "realLifeExample": "A restaurant menu tasting: You must taste the sample once before you can decide whether you want to continue eating more.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int score = 100;\n\n    printf(\"Testing Do-While with a condition that is initially FALSE:\\n\");\n\n    // Condition is (score < 50), which is completely False initially!\n    do {\n        printf(\">> Body executed successfully! score = %d\\n\", score);\n        score += 10;\n    } while (score < 50);\n\n    printf(\"Loop exited cleanly. Final score: %d\\n\", score);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "do { ... }",
          "explanation": "Enters loop unconditionally without checking any condition."
        },
        {
          "line": "printf(\">> Body executed successfully!...\\n\");",
          "explanation": "Prints the message on the first pass."
        },
        {
          "line": "while (score < 50);",
          "explanation": "Evaluates 110 < 50 (False). Loop terminates immediately after having executed exactly 1 time."
        }
      ],
      "expectedOutput": "Testing Do-While with a condition that is initially FALSE:\n>> Body executed successfully! score = 100\nLoop exited cleanly. Final score: 110",
      "pointsToRemember": [
        "While loops execute 0 or more times; Do-While loops execute 1 or more times.",
        "Use do-while whenever an action must occur prior to the condition test (such as prompting a user for input)."
      ]
    },
    "quiz": {
      "question": "What is the fundamental difference in execution count between a while loop and a do-while loop?",
      "options": [
        "A while loop can execute 0 times, whereas a do-while loop is guaranteed to execute at least 1 time",
        "A while loop executes faster because it skips the update expression",
        "A do-while loop can only execute an even number of times",
        "There is no functional difference; they are completely interchangeable"
      ],
      "correctIndex": 0,
      "explanation": "Because while tests conditions at the top, it can execute 0 times. Do-while tests at the bottom, guaranteeing at least 1 execution."
    }
  },
  {
    "id": "c-u3-t4-s2",
    "topicId": "c-u3-t4",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 2,
    "title": "Stage 2: Syntax Rules of do-while \u2014 Semicolon Requirement & Execution Flow",
    "subtitle": "Compiler Strictness Level 2",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "The do-while loop has a unique syntactic requirement compared to while and for loops: it MUST end with a semicolon (;) following the while condition parenthesis. Omitting this semicolon results in a compilation error.",
      "definitions": [
        "Mandatory Semicolon: The required semicolon character (;) terminating the while(condition) line of a do-while loop.",
        "Post-Condition Evaluation: Testing the condition after every body execution cycle."
      ],
      "syntax": "// Correct do-while syntax:\ndo {\n    statement;\n} while (condition); // <--- NOTICE THIS SEMICOLON!\n\n// Comparison:\nwhile (condition) { ... }    // NO semicolon here!\nfor (init; cond; step) { ... } // NO semicolon here!",
      "realLifeExample": "Signing the bottom of a contract: The document is not valid in the eyes of the law until the terminating signature mark is placed at the end.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int countdown = 3;\n\n    printf(\"Initiating countdown with do-while:\\n\");\n    do {\n        printf(\"T-minus: %d\\n\", countdown);\n        countdown--;\n    } while (countdown > 0); // Semicolon is mandatory!\n\n    printf(\"Liftoff!\\n\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "do { ... } while (countdown > 0);",
          "explanation": "Repeats countdown until value reaches 0, ending with the mandatory semicolon."
        }
      ],
      "expectedOutput": "Initiating countdown with do-while:\nT-minus: 3\nT-minus: 2\nT-minus: 1\nLiftoff!",
      "pointsToRemember": [
        "Forgetting the semicolon after \"while(condition);\" in a do-while loop is one of the most frequent syntax errors in C.",
        "Do-while is the ONLY loop construct in C that terminates with a semicolon."
      ]
    },
    "quiz": {
      "question": "Which loop construct in C strictly requires a terminating semicolon after its condition header?",
      "options": [
        "The do-while loop",
        "The while loop",
        "The for loop",
        "All loops require a terminating semicolon"
      ],
      "correctIndex": 0,
      "explanation": "Only the do-while loop requires a terminating semicolon at the end: do { ... } while (condition);"
    }
  },
  {
    "id": "c-u3-t4-s3",
    "topicId": "c-u3-t4",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 3,
    "title": "Stage 3: Interactive Menu-Driven Systems with do-while & Validation",
    "subtitle": "Practical Systems Pattern Level 3",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "The predominant use case for do-while loops in real-world C software is interactive console menus and input validation. The menu must be printed at least once before the program can read the user's choice.",
      "definitions": [
        "Menu-Driven System: A program architecture where options are displayed to the user repeatedly until an explicit exit command is chosen.",
        "Input Validation Loop: A loop that forces the user to re-enter data until the input satisfies validation criteria."
      ],
      "syntax": "int choice;\ndo {\n    // 1. Display menu\n    // 2. Read user choice\n    // 3. Process choice using switch\n} while (choice != EXIT_OPTION);",
      "realLifeExample": "An ATM machine: The main banking menu is displayed first; after completing a transaction, the screen asks if you want to perform another transaction or exit.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int simulatedChoice;\n    int iteration = 0;\n\n    printf(\"=== CODEVIVA BANKING TERMINAL ===\\n\");\n    do {\n        iteration++;\n        printf(\"\\n[Menu Iteration #%d]\\n\", iteration);\n        printf(\"1. Check Balance\\n\");\n        printf(\"2. Transfer Credits\\n\");\n        printf(\"3. Logout & Exit\\n\");\n\n        // Simulating user inputs: Pass 1 selects option 1; Pass 2 selects option 3\n        simulatedChoice = (iteration == 1) ? 1 : 3;\n        printf(\"User selected option: [%d]\\n\", simulatedChoice);\n\n        switch (simulatedChoice) {\n            case 1:\n                printf(\">> Account Balance: $4,850.50\\n\");\n                break;\n            case 2:\n                printf(\">> Transfer credits window open.\\n\");\n                break;\n            case 3:\n                printf(\">> Session ended. Thank you!\\n\");\n                break;\n            default:\n                printf(\">> Invalid selection!\\n\");\n                break;\n        }\n    } while (simulatedChoice != 3);\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "do { ... } while (simulatedChoice != 3);",
          "explanation": "Guarantees the menu displays at least once, and repeats until the user chooses option 3."
        },
        {
          "line": "switch (simulatedChoice)",
          "explanation": "Dispatches the appropriate service based on the chosen integer option."
        }
      ],
      "expectedOutput": "=== CODEVIVA BANKING TERMINAL ===\n\n[Menu Iteration #1]\n1. Check Balance\n2. Transfer Credits\n3. Logout & Exit\nUser selected option: [1]\n>> Account Balance: $4,850.50\n\n[Menu Iteration #2]\n1. Check Balance\n2. Transfer Credits\n3. Logout & Exit\nUser selected option: [3]\n>> Session ended. Thank you!",
      "pointsToRemember": [
        "Do-while is the universal industry standard for CLI menu loops.",
        "Combining do-while with switch-case yields modular, easily extendable command-line interfaces."
      ]
    },
    "quiz": {
      "question": "Why is a do-while loop preferred over a while loop for creating interactive console menus?",
      "options": [
        "Because the menu options must be displayed on screen before user input can be read and evaluated",
        "Because while loops cannot contain switch statements",
        "Because do-while loops consume less stack memory",
        "Because compiler optimizers convert do-while into assembly faster"
      ],
      "correctIndex": 0,
      "explanation": "In an interactive menu, the options must be rendered on the terminal at least once so the user can see them and make a selection."
    }
  },
  {
    "id": "c-u3-t4-s4",
    "topicId": "c-u3-t4",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 4,
    "title": "Stage 4: Loop Comparison Matrix \u2014 for vs. while vs. do-while",
    "subtitle": "Loop Architecture Synthesis Level 4",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Choosing the optimal loop construct is a hallmark of clean software engineering. Understanding the tradeoffs among for, while, and do-while ensures efficient, readable, and bug-free code.",
      "definitions": [
        "Pre-Test Loops: Loops that test the condition before executing the body (for, while). Minimum iterations: 0.",
        "Post-Test Loops: Loops that test the condition after executing the body (do-while). Minimum iterations: 1."
      ],
      "syntax": "// 1. for loop: Definite counter iterations\nfor (int i = 0; i < N; i++) { ... }\n\n// 2. while loop: Indefinite iterations, condition checked first\nwhile (fileHasMoreData) { ... }\n\n// 3. do-while loop: Indefinite iterations, must run at least once\ndo { promptUser(); } while (inputIsInvalid);",
      "realLifeExample": "Walking a dog for 30 minutes (for: fixed duration), waiting for water to boil (while: condition tested before cooking), or taking a sip of soup to check seasoning (do-while: must taste once).",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    printf(\"=================================================================\\n\");\n    printf(\"Feature         | for Loop           | while Loop         | do-while Loop\\n\");\n    printf(\"=================================================================\\n\");\n    printf(\"Control Type    | Entry-Controlled   | Entry-Controlled   | Exit-Controlled\\n\");\n    printf(\"Condition Check | At the top (entry) | At the top (entry) | At the bottom (exit)\\n\");\n    printf(\"Min Executions  | 0 times            | 0 times            | 1 time (Guaranteed)\\n\");\n    printf(\"Trailing ';'    | No semicolon       | No semicolon       | Mandatory ';'\\n\");\n    printf(\"Best Use Case   | Known iteration count| Unknown count    | Menus & validation\\n\");\n    printf(\"=================================================================\\n\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "Control Type",
          "explanation": "For and while test at entry; do-while tests at exit."
        },
        {
          "line": "Min Executions",
          "explanation": "For and while may skip completely (0); do-while always runs at least 1 time."
        }
      ],
      "expectedOutput": "=================================================================\nFeature         | for Loop           | while Loop         | do-while Loop\n=================================================================\nControl Type    | Entry-Controlled   | Entry-Controlled   | Exit-Controlled\nCondition Check | At the top (entry) | At the top (entry) | At the bottom (exit)\nMin Executions  | 0 times            | 0 times            | 1 time (Guaranteed)\nTrailing ';'    | No semicolon       | No semicolon       | Mandatory ';'\nBest Use Case   | Known iteration count| Unknown count    | Menus & validation\n=================================================================",
      "pointsToRemember": [
        "Use \"for\" when the number of iterations is fixed and known beforehand.",
        "Use \"while\" when the condition depends on runtime states and might be false immediately.",
        "Use \"do-while\" when the body must run at least once."
      ]
    },
    "quiz": {
      "question": "If you need to iterate through all 100 elements of an array, which loop is traditionally the most concise and idiomatic in C?",
      "options": [
        "for loop",
        "do-while loop",
        "goto loop",
        "nested switch statements"
      ],
      "correctIndex": 0,
      "explanation": "The for loop is designed specifically for known, counter-controlled iterations like traversing an array of known size."
    }
  },
  {
    "id": "c-u3-t5-s1",
    "topicId": "c-u3-t5",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 1,
    "title": "Stage 1: The Break Statement \u2014 Premature Loop Termination in Linear Search",
    "subtitle": "Loop Jumps Level 1",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "The Break statement causes an immediate, premature exit from the innermost enclosing loop (while, for, or do-while) or switch block. Control passes to the statement immediately following the loop.",
      "definitions": [
        "Break Statement: A jumping keyword that immediately aborts execution of the enclosing loop or switch construct.",
        "Early Exit Optimization: Terminating a search loop as soon as the target item is located, avoiding wasted iterations."
      ],
      "syntax": "for (int i = 0; i < N; i++) {\n    if (items[i] == target) {\n        // Target located!\n        break; // Exits loop immediately\n    }\n}",
      "realLifeExample": "Searching for your car keys on a key hook with 20 keys: As soon as you find your key on hook 4, you stop looking and leave.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int dataset[8] = {12, 45, 78, 33, 99, 21, 64, 50};\n    int target = 33;\n    int foundAt = -1;\n\n    printf(\"Searching for target %d in array of 8 elements:\\n\", target);\n\n    for (int i = 0; i < 8; i++) {\n        printf(\"Checking index %d (value = %d)...\\n\", i, dataset[i]);\n        if (dataset[i] == target) {\n            foundAt = i;\n            printf(\">> MATCH FOUND at index %d! Breaking early.\\n\", i);\n            break; // Stop scanning indices 4, 5, 6, 7\n        }\n    }\n\n    printf(\"Search completed. Saved %d unnecessary checks.\\n\", 8 - 1 - foundAt);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "if (dataset[i] == target) break;",
          "explanation": "When index 3 matches target 33, break terminates the loop immediately."
        },
        {
          "line": "Saved checks",
          "explanation": "Indices 4 through 7 are never visited, optimizing CPU cycles."
        }
      ],
      "expectedOutput": "Searching for target 33 in array of 8 elements:\nChecking index 0 (value = 12)...\nChecking index 1 (value = 45)...\nChecking index 2 (value = 78)...\nChecking index 3 (value = 33)...\n>> MATCH FOUND at index 3! Breaking early.\nSearch completed. Saved 4 unnecessary checks.",
      "pointsToRemember": [
        "Break terminates ONLY the innermost enclosing loop; outer loops continue running.",
        "Break is valid only inside loop constructs (for, while, do-while) and switch statements."
      ]
    },
    "quiz": {
      "question": "When executed inside the inner loop of a double-nested loop, how many loops does \"break\" terminate?",
      "options": [
        "Only the innermost enclosing loop",
        "Both the inner and outer loops",
        "The entire program",
        "None; it only skips the current iteration"
      ],
      "correctIndex": 0,
      "explanation": "A break statement exits only the immediate innermost enclosing loop or switch block."
    }
  },
  {
    "id": "c-u3-t5-s2",
    "topicId": "c-u3-t5",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 2,
    "title": "Stage 2: The Continue Statement \u2014 Skipping Iteration Tail & Advancing Counter",
    "subtitle": "Loop Jumps Level 2",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Unlike break, which terminates the entire loop, the Continue statement skips only the remaining statements in the CURRENT iteration and jumps directly to the next iteration cycle (the update expression in a for loop, or the test condition in while/do-while).",
      "definitions": [
        "Continue Statement: A jumping keyword that bypasses all remaining code in the current iteration and jumps directly to the loop's next iteration cycle.",
        "Iteration Tail: The remaining statements inside a loop body located below the continue statement."
      ],
      "syntax": "// Printing only odd numbers:\nfor (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0) {\n        continue; // Bypasses printf for even numbers\n    }\n    printf(\"%d \", i); // Prints 1 3 5 7 9\n}",
      "realLifeExample": "A quality control inspector on an apple conveyor line: When a bruised apple passes by, they skip packing it and immediately wait for the next apple.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    printf(\"Printing numbers from 1 to 10 except multiples of 3:\\n\");\n\n    for (int i = 1; i <= 10; i++) {\n        if (i % 3 == 0) {\n            printf(\"[Skip %d] \", i);\n            continue; // Jumps directly to i++\n        }\n        printf(\"%d \", i);\n    }\n\n    printf(\"\\nLoop finished cleanly!\\n\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "if (i % 3 == 0) continue;",
          "explanation": "When i is 3, 6, or 9, continue bypasses the standard print statement and jumps to i++."
        }
      ],
      "expectedOutput": "Printing numbers from 1 to 10 except multiples of 3:\n1 2 [Skip 3] 4 5 [Skip 6] 7 8 [Skip 9] 10 \nLoop finished cleanly!",
      "pointsToRemember": [
        "In a for loop, continue jumps to the update_expression (e.g. i++).",
        "In a while loop, continue jumps directly to the test_condition; make sure you increment counter before calling continue in a while loop to avoid an infinite loop!"
      ]
    },
    "quiz": {
      "question": "What happens when a \"continue\" statement is executed inside a for loop?",
      "options": [
        "Remaining statements in the current iteration are skipped, and execution jumps directly to the update expression",
        "The entire loop is immediately terminated",
        "The loop restarts from iteration 1",
        "The program halts and prompts the user"
      ],
      "correctIndex": 0,
      "explanation": "In a for loop, continue skips the rest of the current iteration body and transfers control directly to the update step."
    }
  },
  {
    "id": "c-u3-t5-s3",
    "topicId": "c-u3-t5",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 3,
    "title": "Stage 3: break vs. continue \u2014 Deep Architectural Comparison Matrix",
    "subtitle": "Jump Statement Contrast Level 3",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Both break and continue alter loop execution, but their scope of effect is completely different: break terminates the loop entirely, while continue only terminates the current pass.",
      "definitions": [
        "Break: Terminates the loop construct entirely; no further iterations occur.",
        "Continue: Terminates only the current iteration; subsequent iterations continue normally."
      ],
      "syntax": "// Contrast:\nwhile (cond) {\n    if (critical_error) break;    // STOP the loop completely\n    if (minor_warning)  continue; // SKIP this item, continue with next\n    process();\n}",
      "realLifeExample": "A teacher grading exam papers: Break = Fire alarm rings, stop grading all papers and leave. Continue = Student submitted a blank paper, assign 0 and move to the next student's paper.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    printf(\"--- Demonstrating BREAK vs CONTINUE ---\\n\");\n\n    printf(\"\\n1. Using CONTINUE at i == 3:\\n\");\n    for (int i = 1; i <= 5; i++) {\n        if (i == 3) continue;\n        printf(\"%d \", i);\n    }\n    printf(\" (Notice: 3 is skipped, but 4 and 5 still executed)\\n\");\n\n    printf(\"\\n2. Using BREAK at i == 3:\\n\");\n    for (int i = 1; i <= 5; i++) {\n        if (i == 3) break;\n        printf(\"%d \", i);\n    }\n    printf(\" (Notice: Loop stopped completely at 3; 4 and 5 never ran)\\n\");\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "if (i == 3) continue;",
          "explanation": "Only iteration 3 is skipped; output is 1 2 4 5."
        },
        {
          "line": "if (i == 3) break;",
          "explanation": "Loop terminates at 3; output is 1 2."
        }
      ],
      "expectedOutput": "--- Demonstrating BREAK vs CONTINUE ---\n\n1. Using CONTINUE at i == 3:\n1 2 4 5  (Notice: 3 is skipped, but 4 and 5 still executed)\n\n2. Using BREAK at i == 3:\n1 2  (Notice: Loop stopped completely at 3; 4 and 5 never ran)",
      "pointsToRemember": [
        "Break can be used in both loops and switch statements.",
        "Continue can ONLY be used inside loops (while, for, do-while); it is illegal inside switch unless inside a loop."
      ]
    },
    "quiz": {
      "question": "Can the \"continue\" statement be used inside a standalone switch statement (not enclosed in any loop)?",
      "options": [
        "No, continue is strictly valid only inside loop constructs",
        "Yes, it behaves identically to break",
        "Yes, it jumps to the default label",
        "Yes, if compiled under C99 mode"
      ],
      "correctIndex": 0,
      "explanation": "In C, continue can only appear inside loops. Using continue inside a switch statement that is not inside a loop produces a compilation error."
    }
  },
  {
    "id": "c-u3-t5-s4",
    "topicId": "c-u3-t5",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 4,
    "title": "Stage 4: 2D Algorithmic Patterns \u2014 Half Pyramid & Character Stars",
    "subtitle": "Pattern Printing Algorithms Level 4",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Pattern printing with nested loops is a standard university exercise designed to build mastery over loop bounds, coordinate mapping, and mathematical relations between row indices and column counts.",
      "definitions": [
        "Pattern Printing: Generating geometric shapes (triangles, pyramids, matrices) in the console using nested iteration.",
        "Row Variable (r): Usually maps to the vertical axis.",
        "Column Variable (c): Usually maps to the horizontal character count per line."
      ],
      "syntax": "// Half Pyramid Pattern:\nfor (int r = 1; r <= rows; r++) {\n    for (int c = 1; c <= r; c++) {\n        printf(\"* \");\n    }\n    printf(\"\\n\");\n}",
      "realLifeExample": "A bricklayer building a stepped stone staircase: Layer 1 has 1 brick, Layer 2 has 2 bricks, Layer 3 has 3 bricks.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    int totalRows = 4;\n\n    // Pattern 1: Half Pyramid of Stars\n    printf(\"Pattern 1: Half Pyramid of Stars\\n\");\n    for (int r = 1; r <= totalRows; r++) {\n        for (int c = 1; c <= r; c++) {\n            printf(\"* \");\n        }\n        printf(\"\\n\");\n    }\n\n    // Pattern 2: Inverted Pyramid of Numbers\n    printf(\"\\nPattern 2: Inverted Number Pyramid\\n\");\n    for (int r = totalRows; r >= 1; r--) {\n        for (int c = 1; c <= r; c++) {\n            printf(\"%d \", c);\n        }\n        printf(\"\\n\");\n    }\n\n    // Pattern 3: Character Pyramid (A, BB, CCC, DDDD)\n    printf(\"\\nPattern 3: Character Pyramid\\n\");\n    for (int r = 1; r <= totalRows; r++) {\n        char ch = 'A' + r - 1;\n        for (int c = 1; c <= r; c++) {\n            printf(\"%c \", ch);\n        }\n        printf(\"\\n\");\n    }\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "for (int c = 1; c <= r; c++)",
          "explanation": "Inner loop runs from 1 up to current row r, creating the widening triangular shape."
        },
        {
          "line": "char ch = 'A' + r - 1;",
          "explanation": "Calculates the letter for row r ('A' + 0 = 'A', 'A' + 1 = 'B', etc.)."
        }
      ],
      "expectedOutput": "Pattern 1: Half Pyramid of Stars\n* \n* * \n* * * \n* * * * \n\nPattern 2: Inverted Number Pyramid\n1 2 3 4 \n1 2 3 \n1 2 \n1 \n\nPattern 3: Character Pyramid\nA \nB B \nC C C \nD D D D ",
      "pointsToRemember": [
        "The outer loop always governs the number of lines (rows) printed.",
        "The inner loop governs what is printed on each individual line (columns).",
        "Always print a newline (\\n) right after the inner loop finishes to start the next row."
      ]
    },
    "quiz": {
      "question": "In a half pyramid of stars with 5 rows, what condition in the inner loop ensures that row r prints exactly r stars?",
      "options": [
        "for (int c = 1; c <= r; c++)",
        "for (int c = 1; c <= 5; c++)",
        "for (int c = r; c <= 5; c++)",
        "for (int c = 5; c >= 1; c--)"
      ],
      "correctIndex": 0,
      "explanation": "Setting the inner loop condition to c <= r guarantees that the column loop iterates exactly r times for row r."
    }
  },
  {
    "id": "c-u3-t5-s5",
    "topicId": "c-u3-t5",
    "unitId": "c-unit-3",
    "courseId": "c",
    "stageNumber": 5,
    "title": "Stage 5: Comprehensive Case Study \u2014 Interactive Arithmetic Calculator with switch",
    "subtitle": "Applied Engineering Capstone Level 5",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "This capstone case study integrates all core Unit 3 topics \u2014 conditional decision making, switch statement dispatch, operator evaluation, division-by-zero protection, and defensive input handling \u2014 into a complete, working calculator program.",
      "definitions": [
        "Defensive Programming: Designing code to anticipate and safely handle edge cases (such as division by zero) without crashing.",
        "Dispatch Table: Using a switch-case statement on an operator character ('+', '-', '*', '/') to trigger specific math operations."
      ],
      "syntax": "switch (operator) {\n    case '+': result = a + b; break;\n    case '-': result = a - b; break;\n    case '*': result = a * b; break;\n    case '/': \n        if (b != 0) result = a / b;\n        else // handle division by zero error!\n        break;\n}",
      "realLifeExample": "The logic inside a handheld pocket calculator: Pressing 24, then /, then 6, then = evaluates the division operator and displays 4.00.",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    double num1 = 48.0;\n    double num2 = 6.0;\n    char operations[5] = {'+', '-', '*', '/', '%'};\n\n    printf(\"=== CODEVIVA CASE STUDY: MULTI-OPERATOR CALCULATOR ===\\n\");\n    printf(\"Operands: num1 = %.2f, num2 = %.2f\\n\\n\", num1, num2);\n\n    for (int i = 0; i < 4; i++) {\n        char op = operations[i];\n        printf(\"Executing operation [%c]: \", op);\n\n        switch (op) {\n            case '+':\n                printf(\"%.2f + %.2f = %.2f\\n\", num1, num2, num1 + num2);\n                break;\n            case '-':\n                printf(\"%.2f - %.2f = %.2f\\n\", num1, num2, num1 - num2);\n                break;\n            case '*':\n                printf(\"%.2f * %.2f = %.2f\\n\", num1, num2, num1 * num2);\n                break;\n            case '/':\n                if (num2 != 0.0) {\n                    printf(\"%.2f / %.2f = %.2f\\n\", num1, num2, num1 / num2);\n                } else {\n                    printf(\"ERROR: Division by zero is mathematically undefined!\\n\");\n                }\n                break;\n            default:\n                printf(\"ERROR: Operator '%c' not supported.\\n\", op);\n                break;\n        }\n    }\n\n    // Testing Division by Zero Protection\n    printf(\"\\nTesting Division by Zero Edge Case (48.0 / 0.0):\\n\");\n    double zeroDivisor = 0.0;\n    if (zeroDivisor != 0.0) {\n        printf(\"Result: %.2f\\n\", num1 / zeroDivisor);\n    } else {\n        printf(\">> [SAFETY INTERCEPT] Division by 0 prevented successfully!\\n\");\n    }\n\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "switch (op)",
          "explanation": "Evaluates the char operator and jumps directly to the matching arithmetic case."
        },
        {
          "line": "if (num2 != 0.0) ... else ...",
          "explanation": "Defensive check preventing floating-point exception or IEEE infinity in integer math."
        },
        {
          "line": "break;",
          "explanation": "Terminates each case cleanly after printing the calculated result."
        }
      ],
      "expectedOutput": "=== CODEVIVA CASE STUDY: MULTI-OPERATOR CALCULATOR ===\nOperands: num1 = 48.00, num2 = 6.00\n\nExecuting operation [+]: 48.00 + 6.00 = 54.00\nExecuting operation [-]: 48.00 - 6.00 = 42.00\nExecuting operation [*]: 48.00 * 6.00 = 288.00\nExecuting operation [/]: 48.00 / 6.00 = 8.00\n\nTesting Division by Zero Edge Case (48.0 / 0.0):\n>> [SAFETY INTERCEPT] Division by 0 prevented successfully!",
      "pointsToRemember": [
        "Always validate divisors before performing division: division by integer zero produces a hardware divide-by-zero trap and immediate program crash (SIGFPE).",
        "Characters in C are stored as ASCII integers, making them 100% valid as switch control expressions.",
        "This case study encapsulates Unit 3 mastery: decision branching, input handling, loop iteration, and defensive programming."
      ]
    },
    "quiz": {
      "question": "Why must a calculator program perform an explicit check if the divisor is zero before executing the \"/\" operation?",
      "options": [
        "Because division by zero is mathematically undefined and can trigger a fatal runtime signal (SIGFPE) or program crash",
        "Because the switch statement cannot handle fractions",
        "Because the C compiler refuses to compile any program with division operators unless checked",
        "Because it slows down CPU cache performance"
      ],
      "correctIndex": 0,
      "explanation": "Dividing an integer by zero triggers an unrecoverable CPU exception (arithmetic exception / SIGFPE) which immediately terminates the program."
    }
  }
];
