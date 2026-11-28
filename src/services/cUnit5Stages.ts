import { Stage } from '@/types';

/**
 * High-fidelity, syllabus-accurate stages for C Unit 5:
 * "User Defined Functions and Structures"
 * Directly derived from university syllabus and lecture notes (Unit- 5: STRUCTURES).
 */
export const cUnit5CustomStages: Stage[] = [
  {
    "id": "c-u5-t1-s1",
    "topicId": "c-u5-t1",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 1,
    "title": "Stage 1: Need for User-Defined Functions \u2014 Modularity, Code Reusability & Team Collaboration",
    "subtitle": "Modular Programming Level 1",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Writing an entire large application inside a single monolithic main() function causes massive code duplication, difficult debugging, and unmanageable code. User-Defined Functions solve this by decomposing large problems into smaller, reusable, testable sub-programs.",
      "definitions": [
        "User-Defined Function: A distinct, named sub-program written by the programmer to perform a specific task.",
        "Modularity: The software design technique of splitting a system into separate, independent modules.",
        "Code Reusability: The ability to write a function once and invoke it multiple times across the application."
      ],
      "syntax": "// Standard User-Defined Function Outline:\nreturn_type function_name(parameter_list) {\n    // executable statements\n    return value;\n}",
      "realLifeExample": "A commercial restaurant kitchen: The executive chef (main) delegates slicing to the prep cook, grilling to the grill chef, and plating to the pastry chef rather than cooking all 50 meals single-handedly.",
      "codeSnippet": "#include <stdio.h>\n\n// Modular helper function\nvoid printCompanyHeader(void) {\n    printf(\"***************************************\\n\");\n    printf(\"   CODEVIVA EDUCATIONAL TECHNOLOGIES  \\n\");\n    printf(\"***************************************\\n\");\n}\n\nint main(void) {\n    // Reusing the function 2 times without duplicating print statements\n    printCompanyHeader();\n    printf(\"System Initialized successfully.\\n\\n\");\n    printCompanyHeader();\n    printf(\"Generating Student Reports...\\n\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "void printCompanyHeader(void)",
          "explanation": "Defines a user-defined function named printCompanyHeader taking no parameters and returning nothing."
        },
        {
          "line": "printCompanyHeader(); in main()",
          "explanation": "Transfers program counter to the function body, executes it, and returns back to the next line in main()."
        }
      ],
      "expectedOutput": "***************************************\n   CODEVIVA EDUCATIONAL TECHNOLOGIES  \n***************************************\nSystem Initialized successfully.\n\n***************************************\n   CODEVIVA EDUCATIONAL TECHNOLOGIES  \n***************************************\nGenerating Student Reports...",
      "pointsToRemember": [
        "Functions reduce program length and eliminate copy-pasted code.",
        "Debugging becomes localized: if an equation is wrong, you only need to fix its dedicated function.",
        "Enables team collaboration: different developers can write different functions in parallel."
      ]
    },
    "quiz": {
      "question": "What is the primary architectural advantage of decomposing a monolithic program into user-defined functions?",
      "options": [
        "Improves modularity, code reusability, readability, and isolates debugging",
        "Forces the compiler to convert all variables into pointers",
        "Eliminates the requirement for the main() function",
        "Decreases RAM consumption to zero"
      ],
      "correctIndex": 0,
      "explanation": "Decomposing code into functions allows code reuse, reduces redundancy, improves readability, and allows developers to isolate and fix bugs quickly."
    }
  },
  {
    "id": "c-u5-t1-s2",
    "topicId": "c-u5-t1",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 2,
    "title": "Stage 2: Multi-Function Program Architecture \u2014 How main() Coordinates Helper Routines",
    "subtitle": "Program Structure Level 2",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "In a well-designed C program, main() acts as a high-level manager (orchestrator). It coordinates the overall program flow by calling helper functions in a logical sequence, passing data between them.",
      "definitions": [
        "Calling Function (Caller): The function that initiates a function call (frequently main()).",
        "Called Function (Callee): The function receiving control, executing its task, and returning back to the caller.",
        "Program Orchestration: Structuring main() as a high-level sequence of descriptive function invocations."
      ],
      "syntax": "int main(void) {\n    initializeSystem();\n    processData();\n    displaySummary();\n    return 0;\n}",
      "realLifeExample": "A project manager directing a team: The manager does not write the code, design the graphics, or test the database directly; they call meetings with the respective team leads in sequence.",
      "codeSnippet": "#include <stdio.h>\n\nvoid step1_ReadInput(void) {\n    printf(\"[Step 1] Sensor inputs read successfully.\\n\");\n}\n\nvoid step2_AnalyzeData(void) {\n    printf(\"[Step 2] Atmospheric algorithms evaluated.\\n\");\n}\n\nvoid step3_ExportReport(void) {\n    printf(\"[Step 3] Mission report saved to disk.\\n\");\n}\n\nint main(void) {\n    printf(\"=== INITIATING AUTOMATED PIPELINE ===\\n\");\n    // main orchestrates subroutines in order\n    step1_ReadInput();\n    step2_AnalyzeData();\n    step3_ExportReport();\n    printf(\"=== PIPELINE COMPLETED SUCCESSFULLY ===\\n\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "step1_ReadInput();",
          "explanation": "Caller (main) pauses execution and jumps to step1_ReadInput; when it finishes, main resumes."
        },
        {
          "line": "Sequential calls in main()",
          "explanation": "Provides a crystal-clear, self-documenting story of the application's overall execution lifecycle."
        }
      ],
      "expectedOutput": "=== INITIATING AUTOMATED PIPELINE ===\n[Step 1] Sensor inputs read successfully.\n[Step 2] Atmospheric algorithms evaluated.\n[Step 3] Mission report saved to disk.\n=== PIPELINE COMPLETED SUCCESSFULLY ===",
      "pointsToRemember": [
        "Execution of every C program ALWAYS starts at main(), regardless of where other functions are written.",
        "A function can call another function, which in turn can call yet another function (nested calls)."
      ]
    },
    "quiz": {
      "question": "At which function does CPU execution always begin in a standard C program?",
      "options": [
        "The main() function",
        "The first function declared in the file",
        "The function with the largest memory footprint",
        "The function containing return 0"
      ],
      "correctIndex": 0,
      "explanation": "In standard C, execution strictly starts at the entry-point function main(), regardless of the order of other function definitions in the source file."
    }
  },
  {
    "id": "c-u5-t1-s3",
    "topicId": "c-u5-t1",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 3,
    "title": "Stage 3: The Three Essential Elements \u2014 Function Declaration (Prototype), Call & Definition",
    "subtitle": "Function Foundations Level 3",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Every function in C requires three distinct syntactic components: (1) Function Declaration (Prototype) placed before main(), (2) Function Call inside caller code, and (3) Function Definition containing the executable algorithm.",
      "definitions": [
        "Function Prototype (Declaration): Informs compiler of the function's name, return type, and parameter types before it is used. Ends with a semicolon (;).",
        "Function Call: The statement that transfers control and passes arguments to the function.",
        "Function Definition: The actual implementation block containing the code statements. Does NOT have a semicolon after its header."
      ],
      "syntax": "// 1. Declaration (Prototype) - ends with semicolon:\nint calculateArea(int length, int width);\n\n// 2. Function Call - invokes with actual values:\nint result = calculateArea(10, 5);\n\n// 3. Function Definition - contains body (NO semicolon after header):\nint calculateArea(int length, int width) {\n    return length * width;\n}",
      "realLifeExample": "Ordering custom furniture: (1) Catalog specification (Prototype), (2) Placing the phone order (Function Call), (3) Carpenter building the table in the workshop (Definition).",
      "codeSnippet": "#include <stdio.h>\n\n// 1. Prototype Declaration\nint multiply(int a, int b);\n\nint main(void) {\n    int num1 = 12, num2 = 7;\n    \n    // 2. Function Call\n    int product = multiply(num1, num2);\n    \n    printf(\"Calculation: %d x %d = %d\\n\", num1, num2, product);\n    return 0;\n}\n\n// 3. Function Definition\nint multiply(int a, int b) {\n    int answer = a * b;\n    return answer; // Delivers answer back to main\n}",
      "lineByLineExplanation": [
        {
          "line": "int multiply(int a, int b);",
          "explanation": "Prototype notifies the compiler that multiply accepts two ints and returns an int."
        },
        {
          "line": "int product = multiply(num1, num2);",
          "explanation": "Passes actual arguments num1 and num2, receiving the returned integer into product."
        },
        {
          "line": "int multiply(int a, int b) { ... }",
          "explanation": "Executes the multiplication and returns the result."
        }
      ],
      "expectedOutput": "Calculation: 12 x 7 = 84",
      "pointsToRemember": [
        "Prototypes eliminate implicit declaration warnings in modern C compilers.",
        "Parameter names are optional in prototypes (e.g. \"int multiply(int, int);\" is completely valid).",
        "Never put a semicolon after the function header in its definition!"
      ]
    },
    "quiz": {
      "question": "Which component of a function informs the compiler of its return type and parameter types before main() executes?",
      "options": [
        "Function Declaration (Prototype)",
        "Function Call",
        "Function Definition",
        "Preprocessor Macro"
      ],
      "correctIndex": 0,
      "explanation": "The function declaration (or prototype) specifies the function's interface (name, return type, parameters) to the compiler before its actual definition or invocation."
    }
  },
  {
    "id": "c-u5-t1-s4",
    "topicId": "c-u5-t1",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 4,
    "title": "Stage 4: Actual Arguments vs. Formal Parameters \u2014 Pass-by-Value & Memory Copies",
    "subtitle": "Parameter Passing Mechanics Level 4",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "C uses the 'Pass-by-Value' parameter passing model. When you call a function with arguments, the compiler creates temporary copies of the actual arguments in memory and assigns them to the formal parameters. Modifying a formal parameter inside the function has ZERO effect on the caller's original variable.",
      "definitions": [
        "Actual Arguments: The expressions or variables passed inside parentheses during the function call in caller code.",
        "Formal Parameters: The local variables declared inside the function header that receive the copied values.",
        "Pass-by-Value: The mechanism where functions receive independent duplicate copies of data, protecting caller variables from unintentional modification."
      ],
      "syntax": "void modifyValue(int x) { // x is a formal parameter (a copy!)\n    x = 100;\n}\n\nint main(void) {\n    int a = 10; // a is an actual argument\n    modifyValue(a); // a remains 10!\n}",
      "realLifeExample": "Photocopying a document: If you hand a student a photocopy of your notes and they scribble notes on it, your original document remains pristine and unaltered.",
      "codeSnippet": "#include <stdio.h>\n\n// Demonstrating that formal parameter changes do not alter actual arguments\nvoid attemptModification(int x) {\n    printf(\"Inside function BEFORE change: x = %d\\n\", x);\n    x = 999; // Modifying local formal parameter\n    printf(\"Inside function AFTER change:  x = %d\\n\", x);\n}\n\nint main(void) {\n    int originalNumber = 50;\n\n    printf(\"In main() BEFORE calling function: originalNumber = %d\\n\", originalNumber);\n    \n    attemptModification(originalNumber); // Pass-by-value\n    \n    printf(\"In main() AFTER calling function:  originalNumber = %d\\n\", originalNumber);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "attemptModification(originalNumber);",
          "explanation": "The value 50 is evaluated and copied into a new memory location allocated for parameter x."
        },
        {
          "line": "x = 999;",
          "explanation": "Changes only the local copy in attemptModification's stack frame."
        },
        {
          "line": "originalNumber remains 50 in main()",
          "explanation": "Proves that caller's original variable was completely untouched."
        }
      ],
      "expectedOutput": "In main() BEFORE calling function: originalNumber = 50\nInside function BEFORE change: x = 50\nInside function AFTER change:  x = 999\nIn main() AFTER calling function:  originalNumber = 50",
      "pointsToRemember": [
        "All non-array parameters in C are strictly passed by value.",
        "To allow a function to modify a caller's variable, you must pass its memory address (pointer)."
      ]
    },
    "quiz": {
      "question": "If variable 'score' has value 75 in main() and is passed to a function void update(int s) { s = 100; }, what is the value of 'score' in main() after the call?",
      "options": [
        "75 (unmodified because C uses pass-by-value)",
        "100 (modified directly)",
        "0 (reset by compiler)",
        "Undefined behavior"
      ],
      "correctIndex": 0,
      "explanation": "Under C pass-by-value semantics, the function update receives a duplicate copy of the value 75 in parameter s. Modifying s has no effect on score in main()."
    }
  },
  {
    "id": "c-u5-t1-s5",
    "topicId": "c-u5-t1",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 5,
    "title": "Stage 5: Local Variable Scoping, Lifetime & Call Stack Frame Allocation",
    "subtitle": "Memory Architecture Level 5",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Variables declared inside a function are local to that function. When a function is called, the CPU pushes a Stack Frame (activation record) containing its parameters and local variables. When the function returns, its stack frame is popped and all local variables are destroyed.",
      "definitions": [
        "Scope: The region of program source code where a variable identifier can be accessed.",
        "Lifetime: The duration of time during program execution that a variable occupies storage in memory.",
        "Stack Frame: A block of memory allocated on the runtime call stack for a function call, holding its local variables and return address."
      ],
      "syntax": "void testFunction(void) {\n    int localVar = 10; // Created when function called, destroyed when it returns!\n}",
      "realLifeExample": "A hotel room during your stay: The room exists for your use while you are checked in; when you check out, the room is reset and your personal items are gone.",
      "codeSnippet": "#include <stdio.h>\n\nvoid computeScope(void) {\n    int counter = 0;\n    counter++;\n    printf(\"Inside computeScope(): counter = %d\\n\", counter);\n}\n\nint main(void) {\n    printf(\"First invocation:  \");\n    computeScope();\n\n    printf(\"Second invocation: \");\n    computeScope();\n\n    printf(\"Third invocation:  \");\n    computeScope();\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "int counter = 0;",
          "explanation": "Every time computeScope() is invoked, a fresh counter is allocated on the stack and initialized to 0."
        },
        {
          "line": "Function exit",
          "explanation": "Stack frame is popped; the counter variable ceases to exist. Hence each call prints 1."
        }
      ],
      "expectedOutput": "First invocation:  Inside computeScope(): counter = 1\nSecond invocation: Inside computeScope(): counter = 1\nThird invocation:  Inside computeScope(): counter = 1",
      "pointsToRemember": [
        "Local auto variables do not retain their values between function calls unless declared with the static keyword.",
        "Attempting to access a function's local variable outside its block produces a compile-time 'undeclared identifier' error."
      ]
    },
    "quiz": {
      "question": "What happens to the local variables of a normal C function when the function finishes execution and returns to caller?",
      "options": [
        "Their stack frame is popped and the memory is reclaimed / destroyed",
        "They are automatically copied into the global data segment",
        "They remain in memory and keep their values for the next call",
        "They are written to the system swap disk"
      ],
      "correctIndex": 0,
      "explanation": "Local (automatic) variables are allocated on the call stack. When the function returns, its stack frame is deallocated, destroying all local variables."
    }
  },
  {
    "id": "c-u5-t2-s1",
    "topicId": "c-u5-t2",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 1,
    "title": "Stage 1: Return Values & Data Types \u2014 Void Functions vs. Typed Computations",
    "subtitle": "Function Signatures Level 1",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "A function can transmit a result back to the caller using the 'return' statement. The return type specifies what kind of data the function outputs. If a function only performs side effects (like printing or hardware control), its return type is specified as 'void'.",
      "definitions": [
        "Return Statement: A control jump statement that terminates function execution and sends a value back to the calling expression.",
        "Void Return Type: A special type indicating that the function does not yield any return value.",
        "Return Type Compatibility: The returned expression must match or be implicitly convertible to the declared return type."
      ],
      "syntax": "// Non-void function must return an expression:\nfloat getPi(void) {\n    return 3.14159f;\n}\n\n// Void function returns nothing (return; is optional at end):\nvoid logError(void) {\n    printf(\"Error encountered!\\n\");\n    return; // optional\n}",
      "realLifeExample": "Asking a thermometer for the temperature (returns 98.6 deg F) vs. telling a light switch to turn on (executes the action, returns no value).",
      "codeSnippet": "#include <stdio.h>\n\n// Void function (no return value)\nvoid announceStart(void) {\n    printf(\">> Process started.\\n\");\n}\n\n// Double return type\ndouble calculateCircleArea(double radius) {\n    double pi = 3.1415926535;\n    return pi * radius * radius;\n}\n\nint main(void) {\n    announceStart();\n    \n    double r = 4.0;\n    double area = calculateCircleArea(r);\n    printf(\"Area of circle with radius %.1f = %.4f\\n\", r, area);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "void announceStart(void)",
          "explanation": "Declared with void return type; calling announceStart() cannot be used in assignments."
        },
        {
          "line": "return pi * radius * radius;",
          "explanation": "Evaluates expression and delivers double-precision float back to the variable area in main()."
        }
      ],
      "expectedOutput": ">> Process started.\nArea of circle with radius 4.0 = 50.2655",
      "pointsToRemember": [
        "A function can directly return only ONE value through the return statement.",
        "Reaching the closing brace } of a non-void function without a return statement causes undefined behavior in C."
      ]
    },
    "quiz": {
      "question": "What is the consequence of attempting to assign the result of a void function to a variable, like: int x = printMessage(); ?",
      "options": [
        "A compile-time error occurs because void functions produce no value",
        "Variable x is automatically assigned 0",
        "Variable x receives null",
        "The program compiles but generates a runtime warning"
      ],
      "correctIndex": 0,
      "explanation": "Void functions produce no return value. Attempting to assign or use their return value in an expression is a fatal compile-time type error."
    }
  },
  {
    "id": "c-u5-t2-s2",
    "topicId": "c-u5-t2",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 2,
    "title": "Stage 2: Category 1: Functions with No Arguments and No Return Values (void -> void)",
    "subtitle": "Function Categories Level 2",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Category 1 functions neither receive data from the caller nor send data back. They act as independent operational units that perform static, self-contained actions such as printing banners, menus, or system diagnostics.",
      "definitions": [
        "Category 1 Function: A function with signature 'void func(void)', having no parameters and no return value.",
        "Self-Contained Subroutine: A routine that operates purely via internal logic or global side effects without parameter communication."
      ],
      "syntax": "void functionName(void) {\n    // statements\n}",
      "realLifeExample": "A church bell tolling noon: It requires no instructions from passersby, and it sends no report back to anyone; it simply rings.",
      "codeSnippet": "#include <stdio.h>\n\n// Category 1: No arguments, No return value\nvoid displayOptionsMenu(void) {\n    printf(\"============================\\n\");\n    printf(\"    SYSTEM OPTIONS MENU     \\n\");\n    printf(\"============================\\n\");\n    printf(\" 1. Start Server\\n\");\n    printf(\" 2. Run Diagnostics\\n\");\n    printf(\" 3. Shutdown System\\n\");\n    printf(\"============================\\n\");\n}\n\nint main(void) {\n    printf(\"Application boot sequence initiated...\\n\\n\");\n    displayOptionsMenu(); // Pure invocation without inputs or outputs\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "void displayOptionsMenu(void)",
          "explanation": "Takes void (no arguments) and returns void (no return value)."
        },
        {
          "line": "displayOptionsMenu(); in main()",
          "explanation": "Calls the routine simply by name followed by empty parentheses."
        }
      ],
      "expectedOutput": "Application boot sequence initiated...\n\n============================\n    SYSTEM OPTIONS MENU     \n============================\n 1. Start Server\n 2. Run Diagnostics\n 3. Shutdown System\n============================",
      "pointsToRemember": [
        "Category 1 functions are primarily used for display banners, menu listings, or clearing screens.",
        "There is no data exchange between caller and callee."
      ]
    },
    "quiz": {
      "question": "Which of the following function prototypes represents a Category 1 function?",
      "options": [
        "void showHelp(void);",
        "int calculate(int x);",
        "void printScore(int score);",
        "double getPi(void);"
      ],
      "correctIndex": 0,
      "explanation": "void showHelp(void); accepts no arguments (parameter list is void) and returns no value (return type is void), which defines Category 1."
    }
  },
  {
    "id": "c-u5-t2-s3",
    "topicId": "c-u5-t2",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 3,
    "title": "Stage 3: Category 2: Functions with Arguments but No Return Values (inputs -> void)",
    "subtitle": "Function Categories Level 3",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Category 2 functions receive input parameters from the caller, but return nothing. They are used when a function needs dynamic data to perform its task (such as formatting and printing custom values or writing to a file), but does not need to send a result back.",
      "definitions": [
        "Category 2 Function: A function with parameters in its header and a void return type (e.g. 'void printReport(int id, float score)').",
        "One-Way Caller-to-Callee Data Flow: Data travels from caller to function, but no answer is returned."
      ],
      "syntax": "void printStudentCard(char name[], int roll, float gpa) {\n    // uses input arguments to format output\n}",
      "realLifeExample": "A postal mailbox: You drop an addressed envelope into the slot (arguments in), but the mailbox does not hand you anything back.",
      "codeSnippet": "#include <stdio.h>\n\n// Category 2: Arguments In, No Return Value\nvoid printEmployeeBadge(int id, const char *name, const char *dept) {\n    printf(\"+---------------------------------+\\n\");\n    printf(\"| CODEVIVA TECH CORP BADGE       |\\n\");\n    printf(\"| Employee ID: #%-18d |\\n\", id);\n    printf(\"| Name:        %-18s |\\n\", name);\n    printf(\"| Department:  %-18s |\\n\", dept);\n    printf(\"+---------------------------------+\\n\");\n}\n\nint main(void) {\n    printEmployeeBadge(101, \"Sophia Patel\", \"Robotics\");\n    printf(\"\\n\");\n    printEmployeeBadge(102, \"Alex Morgan\", \"AI Systems\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "void printEmployeeBadge(int id, ...)",
          "explanation": "Takes 3 parameters to customize badge formatting, but returns no computed value."
        },
        {
          "line": "printEmployeeBadge(101, ...);",
          "explanation": "Invokes the function with specific employee data."
        }
      ],
      "expectedOutput": "+---------------------------------+\n| CODEVIVA TECH CORP BADGE       |\n| Employee ID: #101                |\n| Name:        Sophia Patel       |\n| Department:  Robotics           |\n+---------------------------------+\n\n+---------------------------------+\n| CODEVIVA TECH CORP BADGE       |\n| Employee ID: #102                |\n| Name:        Alex Morgan        |\n| Department:  AI Systems         |\n+---------------------------------+",
      "pointsToRemember": [
        "Category 2 functions allow dynamic behavior tailored to different inputs.",
        "Caller cannot check calculation outcomes because no value is returned."
      ]
    },
    "quiz": {
      "question": "What characterizes a Category 2 function?",
      "options": [
        "It accepts parameters from the caller but has a void return type",
        "It accepts no parameters and returns an integer",
        "It accepts parameters and returns a double",
        "It cannot be called from main()"
      ],
      "correctIndex": 0,
      "explanation": "Category 2 functions take input arguments from the caller to perform an action, but return nothing (void return type)."
    }
  },
  {
    "id": "c-u5-t2-s4",
    "topicId": "c-u5-t2",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 4,
    "title": "Stage 4: Category 3: Functions with Arguments and Return Values (inputs -> output)",
    "subtitle": "Function Categories Level 4",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Category 3 is the most common, powerful, and mathematically pure function model in computer science. It receives input arguments, performs computations, and returns the result back to the caller for further use in expressions.",
      "definitions": [
        "Category 3 Function: A complete two-way communicating function that consumes input arguments and outputs a computed return value.",
        "Two-Way Data Communication: Caller sends inputs; function responds with output.",
        "Pure Function: A function where the output is determined solely by its input values without observable side effects."
      ],
      "syntax": "return_type functionName(type1 arg1, type2 arg2) {\n    return computed_result;\n}",
      "realLifeExample": "A handheld pocket calculator: You type 25 and 4 and press Multiply (arguments in), and the LCD screen displays 100 (result returned).",
      "codeSnippet": "#include <stdio.h>\n\n// Category 3: Arguments In, Return Value Out\nint findGreatestOfThree(int a, int b, int c) {\n    if (a >= b && a >= c) return a;\n    if (b >= a && b >= c) return b;\n    return c;\n}\n\nint main(void) {\n    int n1 = 45, n2 = 89, n3 = 62;\n    \n    // Calling function and capturing returned value in an expression\n    int largest = findGreatestOfThree(n1, n2, n3);\n    \n    printf(\"Input Numbers: %d, %d, %d\\n\", n1, n2, n3);\n    printf(\"The Greatest Value is: %d\\n\", largest);\n    \n    // Using the function directly inside printf\n    printf(\"Double the greatest value = %d\\n\", largest * 2);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "int findGreatestOfThree(int a, int b, int c)",
          "explanation": "Takes 3 integers as input, computes maximum, and returns an integer."
        },
        {
          "line": "int largest = findGreatestOfThree(...);",
          "explanation": "Captures the returned value into variable largest for subsequent use."
        }
      ],
      "expectedOutput": "Input Numbers: 45, 89, 62\nThe Greatest Value is: 89\nDouble the greatest value = 178",
      "pointsToRemember": [
        "Category 3 functions are reusable building blocks that can be nested inside complex expressions.",
        "They facilitate unit testing because inputs and outputs are clearly isolated."
      ]
    },
    "quiz": {
      "question": "Why is Category 3 (Arguments with Return Value) considered the most versatile function category in C?",
      "options": [
        "Because it accepts input data, computes an answer, and returns it so the caller can reuse the result in expressions",
        "Because it executes without allocating stack memory",
        "Because it bypasses compiler type checking",
        "Because it can only be used with integers"
      ],
      "correctIndex": 0,
      "explanation": "Category 3 functions support full two-way communication: they consume inputs and return results, allowing callers to store, print, or embed results into larger expressions."
    }
  },
  {
    "id": "c-u5-t2-s5",
    "topicId": "c-u5-t2",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 5,
    "title": "Stage 5: Category 4: Functions with No Arguments but Returning a Value (void -> output)",
    "subtitle": "Function Categories Level 5",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Category 4 functions accept no parameters from the caller, but generate and return a value. They are used to retrieve system states, generate random tokens, read user inputs, or supply configuration constants.",
      "definitions": [
        "Category 4 Function: A function with signature 'type func(void)' that takes no input arguments but returns a computed value.",
        "One-Way Callee-to-Caller Data Flow: Data originates inside the function and travels back to the caller."
      ],
      "syntax": "return_type functionName(void) {\n    return generated_value;\n}",
      "realLifeExample": "Rolling a six-sided die: You don't give the die any input parameters; you roll it, and it gives you back a number between 1 and 6.",
      "codeSnippet": "#include <stdio.h>\n\n// Category 4: No Arguments, Return Value Out\nint getStandardBufferCapacity(void) {\n    int baseCapacity = 1024; // 1 KB\n    int safetyMultiplier = 4;\n    return baseCapacity * safetyMultiplier; // Returns 4096\n}\n\nint main(void) {\n    // Caller provides no arguments, but receives value\n    int bufferSize = getStandardBufferCapacity();\n    \n    printf(\"Default Network Buffer Size: %d bytes (%.1f KB)\\n\", \n           bufferSize, bufferSize / 1024.0);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "int getStandardBufferCapacity(void)",
          "explanation": "Takes void (no inputs), computes configuration capacity, and returns an integer."
        },
        {
          "line": "int bufferSize = getStandardBufferCapacity();",
          "explanation": "Stores the returned 4096 into variable bufferSize in main()."
        }
      ],
      "expectedOutput": "Default Network Buffer Size: 4096 bytes (4.0 KB)",
      "pointsToRemember": [
        "Standard C library functions like getchar() are classic examples of Category 4: no arguments in, character code returned.",
        "Category 4 functions are useful for reading user inputs or providing environment constants."
      ]
    },
    "quiz": {
      "question": "Which of the following standard C library functions is an example of a Category 4 function (no arguments, returns a value)?",
      "options": [
        "getchar()",
        "printf()",
        "strcpy()",
        "exit()"
      ],
      "correctIndex": 0,
      "explanation": "getchar() takes no arguments (void) and reads/returns the next character code from standard input as an int."
    }
  },
  {
    "id": "c-u5-t3-s1",
    "topicId": "c-u5-t3",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 1,
    "title": "Stage 1: Returning Multiple Values from a Function \u2014 Pointer Output Parameters & Bundling",
    "subtitle": "Advanced Function Outputs Level 1",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "In C, a function's return statement can only return a single value. When an algorithm must output multiple values (e.g. both quotient and remainder, or both min and max), programmers use Pointer Output Parameters or bundle them into a struct.",
      "definitions": [
        "Output Parameter: A pointer parameter passed into a function so the function can write results directly back to the caller's memory.",
        "Dereferencing (*ptr): Accessing the value stored at the memory address pointed to by ptr."
      ],
      "syntax": "void divide(int dividend, int divisor, int *quotient, int *remainder) {\n    *quotient = dividend / divisor;\n    *remainder = dividend % divisor;\n}",
      "realLifeExample": "A medical blood test: You provide a blood sample, and the lab fills out a report card with multiple separate readings (glucose, cholesterol, hemoglobin).",
      "codeSnippet": "#include <stdio.h>\n\n// Function returning 2 results using pointer parameters\nvoid getDivisionResults(int numerator, int denominator, int *quotOut, int *remOut) {\n    *quotOut = numerator / denominator;\n    *remOut  = numerator % denominator;\n}\n\nint main(void) {\n    int num = 47, den = 5;\n    int q, r;\n\n    // Passing addresses (&q, &r) as output parameters\n    getDivisionResults(num, den, &q, &r);\n\n    printf(\"Division of %d by %d:\\n\", num, den);\n    printf(\"Quotient  = %d\\n\", q);\n    printf(\"Remainder = %d\\n\", r);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "void getDivisionResults(..., int *quotOut, int *remOut)",
          "explanation": "Receives memory addresses of variables q and r from main()."
        },
        {
          "line": "*quotOut = numerator / denominator;",
          "explanation": "Dereferences quotOut to write the quotient directly into variable q in main()."
        },
        {
          "line": "getDivisionResults(num, den, &q, &r);",
          "explanation": "The & address-of operator passes the memory locations of q and r."
        }
      ],
      "expectedOutput": "Division of 47 by 5:\nQuotient  = 9\nRemainder = 2",
      "pointsToRemember": [
        "A return statement cannot return two values (e.g. \"return a, b;\" only evaluates the comma operator and returns b).",
        "Passing pointers (&var) enables functions to simulate pass-by-reference and return multiple results."
      ]
    },
    "quiz": {
      "question": "What is the standard technique in C to return multiple computed values from a single function call?",
      "options": [
        "Pass pointer parameters (using & addresses) so the function can store multiple values directly in the caller's variables",
        "Write multiple return statements one after another: return x; return y;",
        "Separate the return values with commas: return a, b;",
        "Declare the function with multi-type return syntax: int, float myFunc()"
      ],
      "correctIndex": 0,
      "explanation": "Because C return statements can only return one value, passing pointers as output parameters allows a function to write multiple values back into the caller's variables."
    }
  },
  {
    "id": "c-u5-t3-s2",
    "topicId": "c-u5-t3",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 2,
    "title": "Stage 2: Nesting of Function Invocations \u2014 Composing Expressions & Call Hierarchies",
    "subtitle": "Function Composition Level 2",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "In C, nested function definitions (defining a function inside another function) are strictly illegal. However, Nesting of Function Calls (where one function calls another, or a function call is passed as an argument to another function) is fully supported and idiomatic.",
      "definitions": [
        "Nested Function Call: Passing the return value of one function directly as an actual argument to another function.",
        "Call Hierarchy: The chain of function calls (e.g. main calls funcA, which calls funcB).",
        "Nested Definitions: Writing a function body inside another function body (prohibited in standard C)."
      ],
      "syntax": "// Nested call syntax:\nint result = add(multiply(4, 5), subtract(10, 2));",
      "realLifeExample": "Russian nesting dolls (Matryoshka) or mathematical composition: f(g(x)), where the inner function g(x) is evaluated first and its result feeds f().",
      "codeSnippet": "#include <stdio.h>\n\nint square(int n) {\n    return n * n;\n}\n\nint sumOfSquares(int a, int b) {\n    // Nesting calls: square() called twice inside sumOfSquares()\n    return square(a) + square(b);\n}\n\nint main(void) {\n    int x = 3, y = 4;\n    \n    // Nested function invocation: 3^2 + 4^2 = 9 + 16 = 25\n    int result = sumOfSquares(x, y);\n    \n    printf(\"Sum of squares of %d and %d = %d\\n\", x, y, result);\n    \n    // Triple nested call\n    printf(\"Square of square of 3 = %d\\n\", square(square(3))); // square(9) = 81\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "return square(a) + square(b);",
          "explanation": "sumOfSquares delegates squaring to the square() function twice."
        },
        {
          "line": "square(square(3))",
          "explanation": "Inner square(3) evaluates to 9; outer square(9) evaluates to 81."
        }
      ],
      "expectedOutput": "Sum of squares of 3 and 4 = 25\nSquare of square of 3 = 81",
      "pointsToRemember": [
        "Inner nested calls are evaluated before outer calls.",
        "Remember: nested function definitions are forbidden in standard ISO C."
      ]
    },
    "quiz": {
      "question": "Is it valid in standard C to define a complete function body inside the body of main()?",
      "options": [
        "No, nested function definitions are not permitted in standard C",
        "Yes, provided it is marked static",
        "Yes, if declared before any variable declarations",
        "Yes, under modern C11 standards"
      ],
      "correctIndex": 0,
      "explanation": "Standard C does not permit nested function definitions. All functions in C must be defined at file scope (outside all other functions)."
    }
  },
  {
    "id": "c-u5-t3-s3",
    "topicId": "c-u5-t3",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 3,
    "title": "Stage 3: Fundamentals of Recursion \u2014 Self-Referential Functions & Stack Unwinding",
    "subtitle": "Recursion Foundations Level 3",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Recursion is a programming technique where a function calls itself directly or indirectly to solve a problem by dividing it into smaller sub-problems. Each recursive call allocates a new stack frame on the call stack, which unwinds once the base condition is reached.",
      "definitions": [
        "Recursion: The process of a function calling itself.",
        "Winding Phase: The sequence of nested recursive calls pushing stack frames onto the call stack.",
        "Unwinding Phase: The sequence of returns propagating calculated results back up the stack."
      ],
      "syntax": "void countdown(int n) {\n    if (n <= 0) { // Base case\n        printf(\"Blastoff!\\n\");\n        return;\n    }\n    printf(\"%d... \", n);\n    countdown(n - 1); // Recursive call\n}",
      "realLifeExample": "Looking into two parallel mirrors facing each other: You see an endless series of reflections of yourself, each slightly smaller than the previous one.",
      "codeSnippet": "#include <stdio.h>\n\n// Recursive countdown function\nvoid recursiveCountdown(int count) {\n    if (count == 0) {\n        printf(\"BLASTOFF!\\n\");\n        return; // Terminating base condition\n    }\n    \n    printf(\"%d... \", count);\n    recursiveCountdown(count - 1); // Self-call with smaller argument\n}\n\nint main(void) {\n    printf(\"Initiating countdown: \");\n    recursiveCountdown(5);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "if (count == 0) return;",
          "explanation": "Base condition: stops the recursion when count reaches 0."
        },
        {
          "line": "recursiveCountdown(count - 1);",
          "explanation": "Calls itself with decremented value (5 -> 4 -> 3 -> 2 -> 1 -> 0)."
        }
      ],
      "expectedOutput": "Initiating countdown: 5... 4... 3... 2... 1... BLASTOFF!",
      "pointsToRemember": [
        "Recursion provides natural, elegant solutions for tree traversal, divide-and-conquer, and mathematical series.",
        "Every recursive function requires stack memory proportional to the depth of recursion."
      ]
    },
    "quiz": {
      "question": "What is the technical term for a function that calls itself?",
      "options": [
        "Recursive function",
        "Polymorphic function",
        "Inline function",
        "Virtual function"
      ],
      "correctIndex": 0,
      "explanation": "A function that invokes itself either directly or indirectly is known as a recursive function."
    }
  },
  {
    "id": "c-u5-t3-s4",
    "topicId": "c-u5-t3",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 4,
    "title": "Stage 4: The Mandatory Base Condition \u2014 Preventing Stack Overflow (SIGSEGV) in Factorials (n!)",
    "subtitle": "Recursion Safety Level 4",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Every recursive function MUST have at least one Base Condition (terminating case). Without a base condition, the function calls itself indefinitely, exhausting the CPU call stack memory and crashing with a Stack Overflow (Segmentation Fault).",
      "definitions": [
        "Base Condition: The non-recursive exit branch that terminates further self-calls and starts stack unwinding.",
        "Stack Overflow: A fatal runtime crash occurring when the program exhausts available stack memory due to excessive recursive calls."
      ],
      "syntax": "long long factorial(int n) {\n    if (n <= 1) return 1;       // MANDATORY Base Condition\n    return n * factorial(n - 1); // Recursive Step\n}",
      "realLifeExample": "Descending a spiral staircase in the dark: The base condition is feeling the solid ground floor beneath your feet so you stop walking down; without it, you would fall into an endless abyss.",
      "codeSnippet": "#include <stdio.h>\n\n// Safe recursive factorial with base condition\nlong long factorial(int n) {\n    // Base Condition: 0! = 1, 1! = 1\n    if (n <= 1) {\n        return 1;\n    }\n    // Recursive relation: n! = n * (n - 1)!\n    return n * factorial(n - 1);\n}\n\nint main(void) {\n    int values[5] = {0, 1, 4, 5, 6};\n    printf(\"=== FACTORIAL COMPUTATION VIA RECURSION ===\\n\");\n    for (int i = 0; i < 5; i++) {\n        int v = values[i];\n        printf(\"%d! = %lld\\n\", v, factorial(v));\n    }\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "if (n <= 1) return 1;",
          "explanation": "When n reaches 1 or 0, returns 1 without making another recursive call."
        },
        {
          "line": "return n * factorial(n - 1);",
          "explanation": "For n=5: computes 5 * 4 * 3 * 2 * 1 = 120 during the stack unwinding phase."
        }
      ],
      "expectedOutput": "=== FACTORIAL COMPUTATION VIA RECURSION ===\n0! = 1\n1! = 1\n4! = 24\n5! = 120\n6! = 720",
      "pointsToRemember": [
        "Always write the base condition check first at the very top of a recursive function.",
        "Ensure the recursive call moves arguments closer to the base condition (e.g. n - 1)."
      ]
    },
    "quiz": {
      "question": "What happens if a recursive function does NOT contain a valid base condition?",
      "options": [
        "The program enters infinite recursion and crashes with a Stack Overflow",
        "The compiler replaces the function with a while loop automatically",
        "The function returns 0 after 100 calls",
        "The CPU throttles execution speed by 50%"
      ],
      "correctIndex": 0,
      "explanation": "Without a terminating base condition, recursive calls continue endlessly until the program exhausts its call stack memory, triggering a Stack Overflow (SIGSEGV) crash."
    }
  },
  {
    "id": "c-u5-t3-s5",
    "topicId": "c-u5-t3",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 5,
    "title": "Stage 5: Recursive Tree Algorithms \u2014 Generating the Fibonacci Sequence Term by Term",
    "subtitle": "Binary Tree Recursion Level 5",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Some problems branch into multiple recursive calls per step, forming a tree-like execution graph. The Fibonacci sequence (where each term is the sum of the preceding two terms: F(n) = F(n-1) + F(n-2)) is the textbook example of tree recursion.",
      "definitions": [
        "Tree Recursion: A recursion pattern where a function makes two or more recursive calls within its body.",
        "Fibonacci Series: The sequence 0, 1, 1, 2, 3, 5, 8, 13, 21... defined by F(0)=0, F(1)=1, and F(n)=F(n-1)+F(n-2)."
      ],
      "syntax": "int fibonacci(int n) {\n    if (n <= 0) return 0; // Base case 1\n    if (n == 1) return 1; // Base case 2\n    return fibonacci(n - 1) + fibonacci(n - 2); // Binary recursive branch\n}",
      "realLifeExample": "A family tree branching backwards: To find your two biological parents, you look at mother and father; each of them has two parents, branching exponentially.",
      "codeSnippet": "#include <stdio.h>\n\n// Tree-recursive Fibonacci function\nint fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main(void) {\n    int count = 9;\n    printf(\"Fibonacci sequence (first %d terms):\\n\", count);\n    for (int i = 0; i < count; i++) {\n        printf(\"F(%d)=%d  \", i, fibonacci(i));\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "if (n <= 0) return 0; if (n == 1) return 1;",
          "explanation": "Dual base cases for the first two foundational Fibonacci terms."
        },
        {
          "line": "return fibonacci(n - 1) + fibonacci(n - 2);",
          "explanation": "Forks execution into two separate recursive branches and sums their results."
        }
      ],
      "expectedOutput": "Fibonacci sequence (first 9 terms):\nF(0)=0  F(1)=1  F(2)=1  F(3)=2  F(4)=3  F(5)=5  F(6)=8  F(7)=13  F(8)=21  ",
      "pointsToRemember": [
        "Tree recursion on Fibonacci has exponential O(2^n) time complexity due to redundant calculations.",
        "In production, dynamic programming or iteration is preferred for large n to avoid duplicate work."
      ]
    },
    "quiz": {
      "question": "What is the mathematical recurrence relation defining the nth Fibonacci number for n >= 2?",
      "options": [
        "F(n) = F(n - 1) + F(n - 2)",
        "F(n) = F(n - 1) * F(n - 2)",
        "F(n) = 2 * F(n - 1)",
        "F(n) = F(n - 1) / 2"
      ],
      "correctIndex": 0,
      "explanation": "By definition, each Fibonacci number is the sum of the two preceding numbers: F(n) = F(n-1) + F(n-2)."
    }
  },
  {
    "id": "c-u5-t4-s1",
    "topicId": "c-u5-t4",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 1,
    "title": "Stage 1: What is a Structure? \u2014 Heterogeneous Data Packing & Real-World Entities",
    "subtitle": "Structure Foundations Level 1",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "While arrays can only store elements of the same data type (homogeneous), real-world data is inherently mixed (heterogeneous). A Structure in C is a constructed data type that groups related variables of different types (int, float, char arrays) under a single identifier name.",
      "definitions": [
        "Structure: A constructed, user-defined data type used for packing logically related data items of different data types.",
        "Heterogeneous Collection: A data structure capable of storing diverse data types together.",
        "Real-World Entities: Student (roll, name, marks), Book (title, author, pages, price), City (name, population)."
      ],
      "syntax": "struct tag_name {\n    data_type member1;\n    data_type member2;\n};",
      "realLifeExample": "An employee identity card: Contains a photograph, name (string), ID number (int), blood group (string), and salary (float) grouped into one physical plastic badge.",
      "codeSnippet": "#include <stdio.h>\n\n// Defining a structure representing a book in a library\nstruct book_bank {\n    char title[25];\n    char author[20];\n    int pages;\n    float price;\n};\n\nint main(void) {\n    printf(\"Size of struct book_bank blueprint: %zu bytes\\n\", sizeof(struct book_bank));\n    printf(\"Notice that struct book_bank packs char[], int, and float into one type!\\n\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "struct book_bank { ... };",
          "explanation": "Defines a new compound type blueprint named struct book_bank."
        },
        {
          "line": "char title[25]; char author[20]; int pages; float price;",
          "explanation": "Members of diverse types bundled together."
        }
      ],
      "expectedOutput": "Size of struct book_bank blueprint: 56 bytes\nNotice that struct book_bank packs char[], int, and float into one type!",
      "pointsToRemember": [
        "Structures help organize complex data in a meaningful, intuitive way.",
        "Each item declared inside a structure is called a 'member' or 'element'."
      ]
    },
    "quiz": {
      "question": "What is the primary technical reason to use a structure instead of an array in C?",
      "options": [
        "Structures can group data items of different types (heterogeneous) under a single name",
        "Structures consume zero RAM memory",
        "Structures execute faster than integer arithmetic",
        "Arrays cannot store more than 10 elements"
      ],
      "correctIndex": 0,
      "explanation": "Arrays only support homogeneous elements of the identical type. Structures allow grouping heterogeneous data of different types (int, float, strings) into one record."
    }
  },
  {
    "id": "c-u5-t4-s2",
    "topicId": "c-u5-t4",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 2,
    "title": "Stage 2: Defining a Structure Template \u2014 struct tag_name, Semicolon Rules & Memory Realities",
    "subtitle": "Template Syntax Level 2",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "A structure definition describes a format called a 'template'. Defining a structure template does NOT declare any variables, nor does it allocate any memory space. Memory is reserved only when structure variables are declared.",
      "definitions": [
        "Structure Template: The architectural blueprint describing the members and types of a structure.",
        "Structure Tag: The identifier name following the keyword 'struct' (e.g. 'book_bank').",
        "Memory Allocation Timing: Memory space is reserved only when a variable of the structure type is declared, NOT during template definition."
      ],
      "syntax": "struct tag_name {\n    type member1;\n    type member2;\n}; // MUST end with semicolon!",
      "realLifeExample": "An architect's blueprint for a house: Drawing the blueprint takes zero concrete or bricks; only when a homeowner uses the blueprint to build a house is physical ground occupied.",
      "codeSnippet": "#include <stdio.h>\n\n// Template definition: No memory is allocated here!\nstruct student_record {\n    int rollNumber;\n    float gpa;\n};\n\nint main(void) {\n    printf(\"Template defined. At this moment, no variable exists in RAM.\\n\");\n    \n    // Variable declaration: Memory is allocated NOW for s1 and s2\n    struct student_record s1;\n    struct student_record s2;\n    \n    printf(\"Memory allocated for s1: %zu bytes\\n\", sizeof(s1));\n    printf(\"Memory allocated for s2: %zu bytes\\n\", sizeof(s2));\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "struct student_record { ... };",
          "explanation": "Describes the blueprint. The terminating semicolon is mandatory."
        },
        {
          "line": "struct student_record s1;",
          "explanation": "Declares variable s1, causing the compiler to allocate memory on the stack."
        }
      ],
      "expectedOutput": "Template defined. At this moment, no variable exists in RAM.\nMemory allocated for s1: 8 bytes\nMemory allocated for s2: 8 bytes",
      "pointsToRemember": [
        "The structure template definition MUST terminate with a semicolon (;).",
        "Structure members themselves are not variables until associated with an actual variable like s1."
      ]
    },
    "quiz": {
      "question": "Does defining a structure template (e.g., struct book { char title[20]; float price; };) allocate memory space in RAM?",
      "options": [
        "No, it only defines a blueprint; memory is allocated when structure variables are declared",
        "Yes, it immediately allocates memory in the data segment",
        "Yes, it reserves heap memory",
        "It depends on compiler optimization flags"
      ],
      "correctIndex": 0,
      "explanation": "Defining a structure template merely creates a type blueprint. No memory is allocated until variables of that structure type are actually declared."
    }
  },
  {
    "id": "c-u5-t4-s3",
    "topicId": "c-u5-t4",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 3,
    "title": "Stage 3: Arrays vs. Structures \u2014 Comprehensive Architectural Comparison Matrix",
    "subtitle": "Data Type Contrast Level 3",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Both arrays and structures are structured data types, but they differ fundamentally in data homogeneity, creation steps, member access, and memory layout.",
      "definitions": [
        "Homogeneous Data: Data where every element shares the exact same type (Array).",
        "Heterogeneous Data: Data combining different types under one identifier (Structure).",
        "Programmer-Defined Type: A custom type created by the programmer (Structure) vs a built-in derived type (Array)."
      ],
      "syntax": "// Comparison:\nint scores[50]; // Array: 50 identical ints\nstruct Student { int id; float gpa; }; // Struct: int + float",
      "realLifeExample": "An egg tray holding 12 identical eggs (Array) vs. a student backpack holding books, lunchbox, pen, and water bottle (Structure).",
      "codeSnippet": "#include <stdio.h>\n\nint main(void) {\n    printf(\"===============================================================\\n\");\n    printf(\"Feature             | Array                 | Structure\\n\");\n    printf(\"===============================================================\\n\");\n    printf(\"Data Elements       | Homogeneous (Same)    | Heterogeneous (Different)\\n\");\n    printf(\"Type Classification | Derived data type     | Programmer-defined type\\n\");\n    printf(\"Declaration Pattern | Declare & use directly| Must define template first\\n\");\n    printf(\"Member Access       | Numeric Index arr[i]  | Dot operator var.member\\n\");\n    printf(\"Whole Assignment    | Not allowed (a2 = a1) | Allowed (s2 = s1)\\n\");\n    printf(\"===============================================================\\n\");\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "Whole Assignment",
          "explanation": "In C, you cannot copy an array with arr2 = arr1;, but you CAN copy whole structs directly with s2 = s1;."
        }
      ],
      "expectedOutput": "===============================================================\nFeature             | Array                 | Structure\n===============================================================\nData Elements       | Homogeneous (Same)    | Heterogeneous (Different)\nType Classification | Derived data type     | Programmer-defined type\nDeclaration Pattern | Declare & use directly| Must define template first\nMember Access       | Numeric Index arr[i]  | Dot operator var.member\nWhole Assignment    | Not allowed (a2 = a1) | Allowed (s2 = s1)\n===============================================================",
      "pointsToRemember": [
        "Arrays use numeric indexing (0, 1, 2...); structures use named member tags (.price, .title).",
        "Structures can be directly copied with the assignment operator (=), while arrays require loops or memcpy."
      ]
    },
    "quiz": {
      "question": "Which of the following operations is legally permitted on whole structures in C, but strictly forbidden on whole arrays?",
      "options": [
        "Direct whole assignment using the assignment operator (s2 = s1)",
        "Printing with printf(\"%s\")",
        "Bitwise AND operation (&)",
        "Dynamic heap allocation"
      ],
      "correctIndex": 0,
      "explanation": "In C, whole structures can be assigned directly (s2 = s1), performing a bitwise copy of all fields. Whole arrays cannot be copied using assignment (arr2 = arr1 is illegal)."
    }
  },
  {
    "id": "c-u5-t4-s4",
    "topicId": "c-u5-t4",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 4,
    "title": "Stage 4: Structure Variable Declarations \u2014 Separate, Combined & Anonymous Structs",
    "subtitle": "Declaration Styles Level 4",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "In C, structure variables can be declared in three distinct ways: (1) Separate declaration using tag name, (2) Combined declaration right after the template body, and (3) Anonymous structures without a tag name.",
      "definitions": [
        "Separate Declaration: Defining the template first, then declaring variables on separate lines: 'struct tag var;'.",
        "Combined Declaration: Declaring variables immediately between the closing brace and semicolon of the definition.",
        "Anonymous Structure: A structure defined without a tag name; cannot be declared again elsewhere in the program."
      ],
      "syntax": "// Method 1: Separate\nstruct Book { ... };\nstruct Book b1, b2;\n\n// Method 2: Combined\nstruct Book { ... } b1, b2;\n\n// Method 3: Anonymous\nstruct { ... } b1, b2;",
      "realLifeExample": "Registering a vehicle: Method 1 is filling out the standard DMV model form and getting tags later; Method 3 is building a one-off custom parade float that will never be manufactured again.",
      "codeSnippet": "#include <stdio.h>\n\n// Method 2: Combined definition and declaration\nstruct Vehicle {\n    int wheels;\n    float topSpeed;\n} car, motorcycle;\n\n// Method 3: Anonymous structure (no tag name)\nstruct {\n    int id;\n    char role[15];\n} adminUser;\n\nint main(void) {\n    car.wheels = 4;\n    car.topSpeed = 180.5f;\n    \n    motorcycle.wheels = 2;\n    motorcycle.topSpeed = 220.0f;\n    \n    adminUser.id = 1;\n    \n    printf(\"Car: %d wheels, Top Speed: %.1f km/h\\n\", car.wheels, car.topSpeed);\n    printf(\"Motorcycle: %d wheels, Top Speed: %.1f km/h\\n\", motorcycle.wheels, motorcycle.topSpeed);\n    printf(\"Admin ID: %d\\n\", adminUser.id);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "} car, motorcycle;",
          "explanation": "Declares two variables of type struct Vehicle immediately upon definition."
        },
        {
          "line": "struct { ... } adminUser;",
          "explanation": "Anonymous structure: valid, but no other variables of this type can be declared elsewhere."
        }
      ],
      "expectedOutput": "Car: 4 wheels, Top Speed: 180.5 km/h\nMotorcycle: 2 wheels, Top Speed: 220.0 km/h\nAdmin ID: 1",
      "pointsToRemember": [
        "Anonymous structures are discouraged because they cannot be reused in function prototypes or other source files.",
        "Always prefer defining a tagged structure or using typedef for clean, modular code."
      ]
    },
    "quiz": {
      "question": "What is the primary drawback of defining an anonymous structure without a tag name (e.g., struct { int a; } var;)?",
      "options": [
        "You cannot declare new variables of this structure type anywhere else in the program",
        "The structure cannot hold integer values",
        "The compiler forces it to be a global variable",
        "It cannot be printed using printf"
      ],
      "correctIndex": 0,
      "explanation": "Because an anonymous structure has no tag name, you cannot reference the type again to declare additional variables or use it in function signatures."
    }
  },
  {
    "id": "c-u5-t4-s5",
    "topicId": "c-u5-t4",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 5,
    "title": "Stage 5: Structure Type Declarations with typedef \u2014 Aliases & Complex Numbers",
    "subtitle": "Type Definitions Level 5",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Typing 'struct tag_name' repeatedly can clutter code. The 'typedef' keyword creates a new type alias, allowing programmers to treat user-defined structures exactly like primitive types (such as int or double). Complex numbers are a classic example of typedef structures.",
      "definitions": [
        "typedef: A C keyword that creates an alias (synonym) for an existing data type.",
        "Complex Number: A number with a real part and an imaginary part, elegantly modeled as a struct with two double fields."
      ],
      "syntax": "typedef struct {\n    double real;\n    double img;\n} Complex;\n\nComplex c1, c2; // No 'struct' keyword needed!",
      "realLifeExample": "Calling someone by their official title 'Doctor' instead of saying 'Person with a Doctorate Degree in Medicine' every time you address them.",
      "codeSnippet": "#include <stdio.h>\n\n// Defining Complex type using typedef\ntypedef struct {\n    double real; // Real part\n    double img;  // Imaginary part\n} Complex;\n\n// Function taking two Complex structs and returning their sum\nComplex addComplex(Complex c1, Complex c2) {\n    Complex result;\n    result.real = c1.real + c2.real;\n    result.img  = c1.img  + c2.img;\n    return result;\n}\n\nint main(void) {\n    Complex num1 = {4.5, 2.0};\n    Complex num2 = {1.5, 3.5};\n    \n    Complex sum = addComplex(num1, num2);\n    \n    printf(\"Number 1: %.1f + %.1fi\\n\", num1.real, num1.img);\n    printf(\"Number 2: %.1f + %.1fi\\n\", num2.real, num2.img);\n    printf(\"Sum:      %.1f + %.1fi\\n\", sum.real, sum.img);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "typedef struct { double real; double img; } Complex;",
          "explanation": "Binds the identifier Complex as a full type name."
        },
        {
          "line": "Complex num1 = {4.5, 2.0};",
          "explanation": "Directly declares and initializes num1 without having to write struct Complex."
        }
      ],
      "expectedOutput": "Number 1: 4.5 + 2.0i\nNumber 2: 1.5 + 3.5i\nSum:      6.0 + 5.5i",
      "pointsToRemember": [
        "typedef does not create a new data type in memory; it creates a convenient alias.",
        "Remember that typedef names are type names, NOT variable names."
      ]
    },
    "quiz": {
      "question": "What is the primary syntactic benefit of using 'typedef struct { ... } Point;' in C?",
      "options": [
        "It allows declaring variables simply as 'Point p1;' without having to write the 'struct' keyword",
        "It automatically initializes all members to zero",
        "It makes the structure immutable (read-only)",
        "It allocates memory on the heap instead of the stack"
      ],
      "correctIndex": 0,
      "explanation": "Using typedef creates an alias for the structure type, enabling clean declarations like 'Point p1;' without prepending the 'struct' keyword."
    }
  },
  {
    "id": "c-u5-t5-s1",
    "topicId": "c-u5-t5",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 1,
    "title": "Stage 1: Referencing Structure Members \u2014 The Dot (.) Operator, strcpy & Keyboard scanf",
    "subtitle": "Member Access Level 1",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Individual structure members cannot be accessed directly by name because member names have meaning only in relation to a specific structure variable. The link is established using the Member Selection (Dot) Operator (.). Once accessed, a member behaves exactly like an ordinary variable.",
      "definitions": [
        "Dot (.) Operator: The member access operator (also known as the period operator) used to select a field within a structure variable.",
        "Direct Member Access Syntax: 'variable_name.member_name'.",
        "String Copy (strcpy): Library function used to assign string literals to character array members."
      ],
      "syntax": "book1.price = 120.50;\nstrcpy(book1.title, \"BASIC\");\nscanf(\"%d\", &book1.pages);",
      "realLifeExample": "Pointing to an item on a menu: Saying 'price' is ambiguous; saying 'burger.price' identifies exactly which item's price you mean.",
      "codeSnippet": "#include <stdio.h>\n#include <string.h>\n\nstruct book_bank {\n    char title[20];\n    char author[20];\n    int pages;\n    float price;\n};\n\nint main(void) {\n    struct book_bank book1;\n\n    // Assigning values using dot operator and strcpy\n    strcpy(book1.title, \"BASIC\");\n    strcpy(book1.author, \"Balagurusamy\");\n    book1.pages = 250;\n    book1.price = 120.50f;\n\n    printf(\"Book Title:  %s\\n\", book1.title);\n    printf(\"Book Author: %s\\n\", book1.author);\n    printf(\"Book Pages:  %d\\n\", book1.pages);\n    printf(\"Book Price:  $%.2f\\n\", book1.price);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "strcpy(book1.title, \"BASIC\");",
          "explanation": "In C, string arrays cannot be assigned with =; we use strcpy to copy characters into book1.title."
        },
        {
          "line": "book1.pages = 250;",
          "explanation": "Directly assigns integer 250 to member pages of book1."
        }
      ],
      "expectedOutput": "Book Title:  BASIC\nBook Author: Balagurusamy\nBook Pages:  250\nBook Price:  $120.50",
      "pointsToRemember": [
        "The dot (.) operator has among the highest operator precedence in C.",
        "When using scanf() on scalar members (int, float), prepend with '&' (e.g. &book1.pages); for character arrays (strings), '&' is omitted (e.g. book1.title)."
      ]
    },
    "quiz": {
      "question": "Which operator is used to access an individual member of a structure variable in C?",
      "options": [
        "The dot (.) operator",
        "The arrow (->) operator",
        "The colon (:) operator",
        "The scope resolution (::) operator"
      ],
      "correctIndex": 0,
      "explanation": "The dot (.) operator (or period operator) links a structure variable to its members: variable.member."
    }
  },
  {
    "id": "c-u5-t5-s2",
    "topicId": "c-u5-t5",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 2,
    "title": "Stage 2: Referencing Whole Structures \u2014 The Personal Record System",
    "subtitle": "Record Operations Level 2",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "A whole structure can be processed, assigned, and passed as a single cohesive record. The classic university curriculum example is the 'struct personal' record representing an individual's name, day, month, year of birth, and salary.",
      "definitions": [
        "Whole Structure Referencing: Manipulating an entire structure variable as a single entity (assignment, passing to functions, returning from functions).",
        "Bitwise Shallow Copy: When one structure is assigned to another (p2 = p1), C copies every member value automatically."
      ],
      "syntax": "struct personal person1, person2;\n// Assigning all fields simultaneously:\nperson2 = person1;",
      "realLifeExample": "Filing a complete employee personnel folder into a cabinet: You don't file the resume, birth certificate, and contract on separate days; you handle the entire folder as a single unit.",
      "codeSnippet": "#include <stdio.h>\n\nstruct personal {\n    char name[20];\n    int day;\n    char month[10];\n    int year;\n    float salary;\n};\n\nint main(void) {\n    // Creating and populating primary record\n    struct personal person = {\"M.L.Goel\", 10, \"January\", 1945, 4500.00f};\n\n    printf(\"--- Employee Personal Record ---\\n\");\n    printf(\"Name:   %s\\n\", person.name);\n    printf(\"DOB:    %d %s %d\\n\", person.day, person.month, person.year);\n    printf(\"Salary: $%.2f\\n\", person.salary);\n\n    // Referencing whole structure: Direct copy\n    struct personal duplicatePerson = person;\n    printf(\"\\nDuplicate record verified for: %s (Salary: $%.2f)\\n\", \n           duplicatePerson.name, duplicatePerson.salary);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "struct personal person = {\"M.L.Goel\", 10, ...};",
          "explanation": "Initializes all 5 fields sequentially at declaration."
        },
        {
          "line": "struct personal duplicatePerson = person;",
          "explanation": "Performs whole structure assignment, copying all fields from person to duplicatePerson."
        }
      ],
      "expectedOutput": "--- Employee Personal Record ---\nName:   M.L.Goel\nDOB:    10 January 1945\nSalary: $4500.00\n\nDuplicate record verified for: M.L.Goel (Salary: $4500.00)",
      "pointsToRemember": [
        "Whole structure assignment is only valid between variables of the identical structure type.",
        "C does NOT support comparing whole structures with == (e.g. if (p1 == p2) is a compile error!)."
      ]
    },
    "quiz": {
      "question": "Can two structure variables of the same type be assigned to each other using the assignment operator (e.g. person2 = person1;)?",
      "options": [
        "Yes, C performs a direct bitwise copy of all member fields",
        "No, you must copy each member field one by one manually",
        "No, assignment only works for arrays",
        "Yes, but only if all members are integers"
      ],
      "correctIndex": 0,
      "explanation": "C natively permits whole structure assignment (s2 = s1) when both variables are of the identical structure type, performing a copy of all member values."
    }
  },
  {
    "id": "c-u5-t5-s3",
    "topicId": "c-u5-t5",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 3,
    "title": "Stage 3: Compile-Time Initialization of Structures \u2014 Sequential Braces {} & Tag Variations",
    "subtitle": "Initialization Patterns Level 3",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "Like primitive variables and arrays, structure variables can be initialized at compile time by enclosing comma-separated values inside curly braces {}. There must be a one-to-one correspondence between the values and the declared members.",
      "definitions": [
        "Compile-Time Initialization: Assigning initial values to a structure variable at the moment of its declaration.",
        "One-to-One Correspondence: The nth value in the initializer list {} is assigned to the nth member defined in the structure template."
      ],
      "syntax": "struct st_record {\n    int weight;\n    float height;\n};\nstruct st_record student = {60, 180.75};",
      "realLifeExample": "Pre-packaging a gift basket: Items are placed into the basket slots in a specific predefined order (wine first, chocolates second, card third).",
      "codeSnippet": "#include <stdio.h>\n\n// Defining student record structure\nstruct st_record {\n    int weight;\n    float height;\n};\n\n// Global structure initialization outside main\nstruct st_record student1 = {60, 180.75f};\n\nint main(void) {\n    // Local structure initialization inside main\n    struct st_record student2 = {53, 170.60f};\n\n    printf(\"Student 1: Weight = %d kg, Height = %.2f cm\\n\", \n           student1.weight, student1.height);\n    printf(\"Student 2: Weight = %d kg, Height = %.2f cm\\n\", \n           student2.weight, student2.height);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "struct st_record student1 = {60, 180.75f};",
          "explanation": "Assigns 60 to weight and 180.75 to height based on positional order."
        },
        {
          "line": "struct st_record student2 = {53, 170.60f};",
          "explanation": "Initializes a second independent structure variable."
        }
      ],
      "expectedOutput": "Student 1: Weight = 60 kg, Height = 180.75 cm\nStudent 2: Weight = 53 kg, Height = 170.60 cm",
      "pointsToRemember": [
        "The values inside {} must match the types of the structure members in their exact order of declaration.",
        "Structure variables can be initialized both globally (outside functions) and locally (inside functions)."
      ]
    },
    "quiz": {
      "question": "How are values in a structure initialization list { val1, val2 } mapped to the structure members?",
      "options": [
        "Positional one-to-one correspondence: val1 goes to member 1, val2 goes to member 2",
        "Alphabetical order of member names",
        "Random order resolved by the linker",
        "Largest data type gets initialized first"
      ],
      "correctIndex": 0,
      "explanation": "Standard C structure initialization uses sequential one-to-one correspondence: the order of values in braces {} must match the order of members in the structure definition."
    }
  },
  {
    "id": "c-u5-t5-s4",
    "topicId": "c-u5-t5",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 4,
    "title": "Stage 4: Rules for Structure Initialization \u2014 Forbidden Template Inits, Partial Inits & Default Values",
    "subtitle": "Initialization Constraints Level 4",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "The C language enforces strict rules for structure initialization: (1) Members CANNOT be initialized inside the structure template definition, (2) The order of values must match member order, (3) Partial initialization is permitted, and (4) Uninitialized trailing members automatically receive default zero values (0 for numeric, '\\0' for characters).",
      "definitions": [
        "Forbidden Template Initialization: Writing 'struct book { int pages = 100; };' is a syntax error in C because templates do not allocate storage.",
        "Partial Initialization: Providing values for only the first few members in braces {}; trailing members default to zero.",
        "Default Initialization Values: Numeric members default to 0 (or 0.0), characters and strings default to '\\0'."
      ],
      "syntax": "// ILLEGAL:\nstruct book { int pages = 100; }; // Error!\n\n// LEGAL Partial Init:\nstruct Point { int x; int y; int z; };\nstruct Point p = {10, 20}; // z automatically defaults to 0!",
      "realLifeExample": "Booking an airline seat: You specify First Name and Last Name at booking; dietary preference and frequent flyer number remain unassigned (defaulting to blank/none).",
      "codeSnippet": "#include <stdio.h>\n\nstruct inventory_item {\n    int itemCode;\n    int stock;\n    float unitPrice;\n    char status;\n};\n\nint main(void) {\n    // Partial initialization: only itemCode (101) and stock (50) provided\n    struct inventory_item item1 = {101, 50};\n\n    printf(\"=== Testing Partial Initialization Rules ===\\n\");\n    printf(\"Item Code:     %d (Explicitly initialized)\\n\", item1.itemCode);\n    printf(\"Stock Count:   %d (Explicitly initialized)\\n\", item1.stock);\n    printf(\"Unit Price:    $%.2f (Defaulted to 0.0)\\n\", item1.unitPrice);\n    printf(\"Status ASCII:  %d (Defaulted to '\\\\0' / 0)\\n\", item1.status);\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "struct inventory_item item1 = {101, 50};",
          "explanation": "Initializes itemCode=101, stock=50; remaining members unitPrice and status are omitted."
        },
        {
          "line": "printf(\"Unit Price: $%.2f...\", item1.unitPrice);",
          "explanation": "Prints 0.00, demonstrating that C zeroes out uninitialized trailing members."
        }
      ],
      "expectedOutput": "=== Testing Partial Initialization Rules ===\nItem Code:     101 (Explicitly initialized)\nStock Count:   50 (Explicitly initialized)\nUnit Price:    $0.00 (Defaulted to 0.0)\nStatus ASCII:  0 (Defaulted to '\\0' / 0)",
      "pointsToRemember": [
        "Never attempt to assign default values inside the struct definition template.",
        "Partial initialization requires uninitialized members to be at the END of the list.",
        "Uninitialized members in a partially initialized struct are guaranteed to be zeroed."
      ]
    },
    "quiz": {
      "question": "What value do trailing uninitialized members receive when a structure is partially initialized at compile time?",
      "options": [
        "Zero (0) for numeric and floating types, and '\\0' for characters",
        "Random uninitialized memory garbage",
        "A compile-time fatal error is raised",
        "Negative one (-1)"
      ],
      "correctIndex": 0,
      "explanation": "In C, when a structure variable is partially initialized, any remaining uninitialized members are automatically set to default zero values (0 for numbers, '\\0' for characters)."
    }
  },
  {
    "id": "c-u5-t5-s5",
    "topicId": "c-u5-t5",
    "unitId": "c-unit-5",
    "courseId": "c",
    "stageNumber": 5,
    "title": "Stage 5: Capstone Case Study \u2014 Complex Number Arithmetic & Record Management",
    "subtitle": "Applied Engineering Capstone Level 5",
    "published": true,
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-20T10:00:00Z",
    "content": {
      "explanation": "This capstone case study integrates all Unit 5 concepts: user-defined functions with parameters, returning whole structures from functions, typedef aliases, dot operator access, and record management.",
      "definitions": [
        "Compound Data Architecture: Building software by passing structured records through specialized computational functions.",
        "Complex Arithmetic: Operations on complex numbers (a + bi) returned directly across function call boundaries."
      ],
      "syntax": "typedef struct { double real; double img; } Complex;\nComplex add(Complex a, Complex b);\nComplex multiply(Complex a, Complex b);",
      "realLifeExample": "An electrical engineering CAD simulator: AC sinusoidal currents and voltages are modeled as complex impedances (R + jX) and passed between circuit simulation functions.",
      "codeSnippet": "#include <stdio.h>\n\ntypedef struct {\n    double real;\n    double img;\n} Complex;\n\n// Function to add two complex numbers\nComplex addComplex(Complex a, Complex b) {\n    Complex res;\n    res.real = a.real + b.real;\n    res.img  = a.img  + b.img;\n    return res;\n}\n\n// Function to multiply two complex numbers: (a+bi)(c+di) = (ac-bd) + (ad+bc)i\nComplex multComplex(Complex a, Complex b) {\n    Complex res;\n    res.real = (a.real * b.real) - (a.img * b.img);\n    res.img  = (a.real * b.img)  + (a.img * b.real);\n    return res;\n}\n\nvoid printComplex(const char *label, Complex c) {\n    printf(\"%s = %.1f + %.1fi\\n\", label, c.real, c.img);\n}\n\nint main(void) {\n    printf(\"=== CODEVIVA CAPSTONE: COMPLEX NUMBER ENGINE ===\\n\");\n    Complex z1 = {3.0, 2.0}; // 3 + 2i\n    Complex z2 = {1.0, 4.0}; // 1 + 4i\n\n    printComplex(\"Operand 1 (z1)\", z1);\n    printComplex(\"Operand 2 (z2)\", z2);\n\n    Complex sum  = addComplex(z1, z2);\n    Complex prod = multComplex(z1, z2);\n\n    printf(\"\\n--- Computed Results ---\\n\");\n    printComplex(\"Sum (z1 + z2)     \", sum);   // (3+1) + (2+4)i = 4 + 6i\n    printComplex(\"Product (z1 * z2) \", prod);  // (3*1 - 2*4) + (3*4 + 2*1)i = -5 + 14i\n    return 0;\n}",
      "lineByLineExplanation": [
        {
          "line": "Complex addComplex(Complex a, Complex b)",
          "explanation": "Takes two complete Complex structures by value and returns a new Complex structure by value."
        },
        {
          "line": "res.real = (a.real * b.real) - (a.img * b.img);",
          "explanation": "Applies algebraic formula for complex multiplication into member fields of res."
        },
        {
          "line": "printComplex(\"Sum...\", sum);",
          "explanation": "Passes the calculated whole structure to the display helper function."
        }
      ],
      "expectedOutput": "=== CODEVIVA CAPSTONE: COMPLEX NUMBER ENGINE ===\nOperand 1 (z1) = 3.0 + 2.0i\nOperand 2 (z2) = 1.0 + 4.0i\n\n--- Computed Results ---\nSum (z1 + z2)      = 4.0 + 6.0i\nProduct (z1 * z2)  = -5.0 + 14.0i",
      "pointsToRemember": [
        "Functions can return entire structures directly, providing a clean way to return multiple related data fields.",
        "This capstone integrates functions, return values, structures, typedef, and member manipulation into a unified software system."
      ]
    },
    "quiz": {
      "question": "Can a user-defined function in C return an entire structure directly to the caller via its return statement?",
      "options": [
        "Yes, a function can return a whole structure directly by value",
        "No, functions in C can only return basic types (int, float)",
        "No, structures can only be modified via global variables",
        "Yes, but only if the structure contains fewer than 3 members"
      ],
      "correctIndex": 0,
      "explanation": "Standard C fully supports returning whole structures directly from functions by value (e.g., Complex add(Complex a, Complex b) { ... return res; })."
    }
  }
];
