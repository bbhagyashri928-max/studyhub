import { Unit, Quiz } from '@/types';

export const cppUnit1: Unit = {
  id: 'cpp-unit-1',
  courseId: 'cpp',
  unitNumber: 1,
  title: 'Introduction to C++ Programming',
  description: 'Program Design Tools (Algorithm, Flowchart, Pseudocode), Overview of C++ (History, Features, OOP Benefits, Real-World Applications), Program Structure, Stream I/O, Comments, Tokens, Keywords, Identifiers, Constants, and Variables.',
  estimatedHours: 6.0,
  quizId: 'quiz-cpp-1',
  published: true,
  topics: [
    {
      id: 'cpp-u1-t1',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 1,
      title: 'Program Design Tools: Algorithm Design & Principles',
      summary: 'Master the definition, four-step design process, and 5 key characteristics of computational algorithms with concrete examples.',
      content: {
        definition: 'An algorithm is a precise, step-by-step set of ordered instructions written in simple English language for solving a computational problem. Algorithms help the programmer plan the actual logic of a program on paper, validate it with pencil and paper, and correct errors before writing code.',
        syntax: 'Algorithm Steps:\n1. Define the Problem (Input, Output, Constraints)\n2. Design the Logic (Pseudocode)\n3. Choose the Right Data Structure (vector, set, map)\n4. Implementation (Coding Phase with DRY principle)',
        codeSnippet: `#include <iostream>

// C++ Implementation of "Find Largest Number Amongst Three Numbers"
int main() {
    int num1, num2, num3;
    num1 = 45;
    num2 = 82;
    num3 = 63;

    std::cout << "Input Numbers: " << num1 << ", " << num2 << ", " << num3 << std::endl;

    if (num1 > num2 && num1 > num3) {
        std::cout << "Result: " << num1 << " is the Largest Number." << std::endl;
    } else if (num2 > num1 && num2 > num3) {
        std::cout << "Result: " << num2 << " is the Largest Number." << std::endl;
    } else {
        std::cout << "Result: " << num3 << " is the Largest Number." << std::endl;
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int num1 = 45, num2 = 82, num3 = 63;', explanation: 'Phase 1: Defining problem inputs as three comparable integer values.' },
          { line: 'if (num1 > num2 && num1 > num3)', explanation: 'Phase 2: Evaluating algorithmic decision conditions to determine if the first value is greatest.' },
          { line: 'else if (num2 > num1 && num2 > num3)', explanation: 'Alternative path: checking if second value exceeds the others.' },
          { line: 'else { ... num3 is Largest }', explanation: 'Default path when neither num1 nor num2 is largest.' }
        ],
        keyConcepts: [
          'Finiteness: The algorithm must terminate in a finite number of steps without infinite loops.',
          'Definiteness: Each instruction must be clear, unambiguous, and precisely stated.',
          'Effectiveness: Every step must be basic enough to be converted into executable code and performed in finite time.',
          'Generality: The algorithm must be complete in itself to solve all problems of a given type for any valid input.',
          'Input/Output: Must accept zero or more quantities as input and produce one or more output values.',
          'Data Structure Selection: In C++, choose std::vector for general lists and frequent access, std::set for unique sorted elements, and std::map for key-value pairs.'
        ],
        commonMistakes: [
          'Skipping problem definition (inputs, expected outputs, constraints) and jumping directly into syntax coding.',
          'Writing algorithms that lack finiteness (infinite loop traps without clear termination conditions).'
        ],
        quickRevision: [
          'Algorithm = Ordered, finite step-by-step instructions in plain language.',
          '5 Characteristics: Finiteness, Definiteness, Effectiveness, Generality, and Input/Output.',
          'Follow the 4 phases: Problem Definition -> Logic Design -> Data Structure Selection -> Implementation.'
        ]
      }
    },
    {
      id: 'cpp-u1-t2',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 2,
      title: 'Program Design Tools: Flowcharts & Standard Symbols',
      summary: 'Learn graphical representation of algorithms using standard flowchart symbols such as terminals, processes, decisions, and flow lines.',
      content: {
        definition: 'A Flowchart is a graphical representation of an algorithm. The sequence of steps in an algorithm is maintained and represented pictorially using standard geometric symbols and directed flow lines, making program logic intuitive and easy to trace.',
        syntax: 'Flowchart Symbols Guide:\n• Oval (Terminal): Start / Stop / Begin / End\n• Parallelogram (Input/Output): Data read or printed\n• Rectangle (Process): Calculation, action, or operation\n• Diamond (Decision): Branching condition (True/False)\n• Circle (Connector): Connects separate flowchart segments\n• Arrow (Flow Line): Joins symbols and indicates execution flow',
        codeSnippet: `#include <iostream>
#include <iomanip>

// C++ Implementation of Flowchart: Calculate Area of Circle
// Flowchart: Start -> Input: Radius -> Calculate: Area = 3.14159 * Radius * Radius -> Display Area -> End
int main() {
    const double PI = 3.141592653589793;
    double radius = 7.0;

    // Process: Calculate area
    double area = PI * radius * radius;

    // Output: Display area
    std::cout << "Circle Radius: " << radius << std::endl;
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "Calculated Area: " << area << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'const double PI = 3.141592653589793;', explanation: 'Initializes a fixed mathematical constant representing Pi.' },
          { line: 'double radius = 7.0;', explanation: 'Corresponds to the Parallelogram (Input) symbol in the flowchart.' },
          { line: 'double area = PI * radius * radius;', explanation: 'Corresponds to the Rectangle (Process) symbol performing arithmetic calculation.' },
          { line: 'std::cout << "Calculated Area: " << area;', explanation: 'Corresponds to the Parallelogram (Output) symbol displaying final data.' },
          { line: 'return 0;', explanation: 'Corresponds to the Oval (Terminal - End) symbol completing the program execution.' }
        ],
        keyConcepts: [
          'Oval (Terminal): Marks the entry (Start/Begin) and exit (End/Stop) points of an execution path.',
          'Parallelogram (Input/Output): Used whenever the program accepts external input or sends data to display/storage.',
          'Rectangle (Process): Represents computations, variable assignments, and internal algorithmic actions.',
          'Diamond (Decision): Evaluates boolean conditions and branches flow into alternative paths (e.g. Yes/No, True/False).',
          'Connector (Circle): Used to link multi-page or complex intersecting diagram sections without clutter.',
          'Directed Arrows: Clearly establish the unambiguous chronological flow of control.'
        ],
        commonMistakes: [
          'Using a rectangle instead of a parallelogram for input/output operations.',
          'Forgetting exit arrows on decision diamonds (every diamond must have at least two outbound flow paths: True and False).'
        ],
        quickRevision: [
          'Flowchart = Pictorial diagram of an algorithm.',
          'Oval = Terminal | Parallelogram = I/O | Rectangle = Processing | Diamond = Decision | Circle = Connector.',
          'Always maintain clear directed flow arrows from Start to End.'
        ]
      }
    },
    {
      id: 'cpp-u1-t3',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 3,
      title: 'Program Design Tools: Pseudocode Rules & Advantages',
      summary: 'Understand informal algorithmic description using plain English, formatting conventions, and key advantages in engineering workflows.',
      content: {
        definition: 'Pseudocode is a simplified, informal way to describe an algorithm\'s steps using plain English and basic programming structures without strict syntax. It acts as a bridge between human thoughts and computer programs, focusing on logic rather than language specifics using keywords like IF-THEN-ELSE, WHILE, FOR, and REPEAT.',
        syntax: 'Key Rules for Writing Pseudocode:\n1. CAPITALIZE keywords (IF, ELSE, THEN, WHILE, FOR, REPEAT, START, STOP)\n2. Indent nested blocks to show hierarchy (just like C++ code blocks)\n3. Use clear simple terms for I/O (READ, GET, INPUT, PRINT, DISPLAY)\n4. Initialize variables clearly (e.g. SET sum = 0)',
        codeSnippet: `#include <iostream>

/*
 * PSEUDOCODE FOR EVEN / ODD NUMBER CHECK:
 * Start
 * Declare integer variable num
 * Input num
 * If num % 2 == 0 then
 *     Print "Number is Even"
 * Else
 *     Print "Number is Odd"
 * End If
 * Stop
 */

int main() {
    int num = 28;

    std::cout << "Testing Integer: " << num << std::endl;

    if (num % 2 == 0) {
        std::cout << "Result: Number is Even" << std::endl;
    } else {
        std::cout << "Result: Number is Odd" << std::endl;
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'Start / Stop', explanation: 'Delimits the pseudocode lifecycle, directly translated to main() and return 0; in C++.' },
          { line: 'Declare integer variable num', explanation: 'Sets variable name and type (int num = 28;).' },
          { line: 'If num % 2 == 0 then', explanation: 'Capitalized keyword condition checking remainder after division by 2.' },
          { line: 'Print "Number is Even"', explanation: 'Simple output verb directly translating to std::cout << "Number is Even".' }
        ],
        keyConcepts: [
          'Logic Verification: It is far easier to catch and fix architectural bugs in 5 lines of English than in 200 lines of complex C++ code.',
          'Bridge Between Brain & Machine: Thinking in C++ requires managing memory, types, and semicolons simultaneously; pseudocode lets you solve the logic first.',
          'High-Level Documentation: Serves as a lasting conceptual map explaining the intent of the software regardless of library updates.',
          'Universal Team Communication: Allows collaboration with frontend engineers, product managers, and data scientists who may not know C++ syntax.',
          'Technical Interview Preparation: Demonstrates structured problem-solving ability over rote syntax memorization.',
          'Core Characteristics: Language independence, structured flow, human-centric language, indentation-based hierarchy, and no rigid compiler syntax rules.'
        ],
        commonMistakes: [
          'Writing actual C++ syntax (like #include, std::cout, semicolons) inside pseudocode.',
          'Lacking indentation, making nested loops and conditional branches impossible to read.'
        ],
        quickRevision: [
          'Pseudocode = Informal plain-English algorithm description with structured logic.',
          'Capitalize control keywords: IF, ELSE, FOR, WHILE, PRINT.',
          'Always separate "How to solve the problem" (Pseudocode) from "How to code the syntax" (C++ Implementation).'
        ]
      }
    },
    {
      id: 'cpp-u1-t4',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 4,
      title: 'Overview of C++: History, Evolution & Standards Timeline',
      summary: 'Explore Bjarne Stroustrup’s creation of C++ at Bell Labs, from "C with Classes" in 1979 to ISO C++20 and C++23.',
      content: {
        definition: 'C++ is a middle-level, multi-paradigm programming language created by Danish computer scientist Bjarne Stroustrup at Bell Telephone Laboratories (now Nokia Bell Labs) in Murray Hill, New Jersey. Begun in 1979 as an extension called "C with Classes", it was designed to combine the bare-metal efficiency of C with object-oriented abstractions inspired by Simula 67.',
        syntax: 'Key Historical Milestones:\n• 1979: Bjarne Stroustrup starts "C with Classes" at Bell Labs\n• 1983: Renamed to C++ (the ++ operator signifies an increment over C)\n• 1985: First commercial release & "The C++ Programming Language" book\n• 1989-1990: Multiple inheritance, abstract classes, templates, Turbo C++\n• 1998: ISO/IEC 14882:1998 (C++98) standard with STL\n• 2011: C++11 major revolution (auto, lambdas, smart pointers, threads)\n• 2017: C++17 structured bindings, filesystem library, parallel STL\n• 2020: C++20 concepts, ranges, coroutines, and modules\n• 2023-2024: C++23 modern efficiency, safety, and performance enhancements',
        codeSnippet: `#include <iostream>

// Demonstrating C++ Evolution: From Classic C-style to Modern C++
int main() {
    std::cout << "========================================" << std::endl;
    std::cout << "CODEVIVA C++ HISTORICAL EVOLUTION" << std::endl;
    std::cout << "From 1979 (C with Classes) to Modern C++23" << std::endl;
    std::cout << "========================================" << std::endl;

    // C++11 introduced 'auto' type deduction and modern ranged loops
    auto yearOrigin = 1979;
    auto yearStandard = 1998;
    auto yearModern = 2011;

    std::cout << "Inception (C with Classes): " << yearOrigin << std::endl;
    std::cout << "First ISO Standard (C++98): " << yearStandard << std::endl;
    std::cout << "Modern Era Revolution (C++11): " << yearModern << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'auto yearOrigin = 1979;', explanation: 'Demonstrates modern C++ type deduction introduced in C++11.' },
          { line: 'std::cout << ...', explanation: 'Stream-based output introduced to replace C\'s printf with type-safe operations.' },
          { line: 'return 0;', explanation: 'Signals clean exit to the OS operating environment.' }
        ],
        keyConcepts: [
          'Simula 67 Influence: Stroustrup used Simula 67 during his PhD thesis, finding OOP great for simulations but far too slow for real-world software.',
          'The "++" Meaning: In 1983, Rick Mascitti suggested the name C++ from C\'s increment operator (++) to convey "an improvement over C".',
          'Feature Additions in 1983: Virtual functions, function overloading, references with const, and single-line // comments (borrowed from BCPL).',
          'Commercial Launch (1985): Stroustrup published the definitive reference book "The C++ Programming Language".',
          'Standardization (1998): ISO C++98 established a global specification and incorporated Alexander Stepanov\'s Standard Template Library (STL).',
          'C++11 Renaissance: Brought auto keywords, nullptr, smart pointers (std::unique_ptr, std::shared_ptr), lambda expressions, and move semantics.'
        ],
        commonMistakes: [
          'Believing C++ is just C with minor additions; C++ is an entirely distinct multi-paradigm language with different best practices.',
          'Assuming C++ requires an interpreter; C++ is always compiled directly into native machine code.'
        ],
        quickRevision: [
          'Created by Bjarne Stroustrup at Bell Labs starting in 1979.',
          'Renamed C++ in 1983; commercial release in 1985.',
          'Major milestones: C++98 (STL), C++11 (Modern C++), C++20 (Modules & Concepts), C++23.'
        ]
      }
    },
    {
      id: 'cpp-u1-t5',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 5,
      title: 'Features of C++, Benefits of OOP & Real-World Applications',
      summary: 'Explore the 8 pillars of object-oriented design, core language features, and industrial applications in gaming, browsers, and operating systems.',
      content: {
        definition: 'C++ is a multi-paradigm, middle-level language combining high-level abstraction with low-level memory control. Object-Oriented Programming (OOP) in C++ organizes software around data and objects rather than loose functions, providing modularity, security through data hiding, reusability via inheritance, and manageability of large software projects.',
        syntax: 'Core Pillars of OOP:\n• Encapsulation: Bundling data and methods into a single unit (class)\n• Data Hiding: Restricting direct access using private/protected specifiers\n• Inheritance: Reusing and extending existing class features\n• Polymorphism: Methods behaving differently based on context (overloading & overriding)\n• Abstraction: Exposing essential interfaces while concealing implementation details',
        codeSnippet: `#include <iostream>
#include <string>

// Demonstration of OOP Encapsulation & Abstraction
class SystemEngine {
private:
    std::string engineName;
    int coreFrequencyMHz;

public:
    // Constructor
    SystemEngine(std::string name, int freq) : engineName(name), coreFrequencyMHz(freq) {}

    // Public Abstraction Interface
    void displaySpecifications() {
        std::cout << "Engine: " << engineName << " | Frequency: " << coreFrequencyMHz << " MHz" << std::endl;
    }
};

int main() {
    SystemEngine unreal("Unreal Engine Core", 4200);
    unreal.displaySpecifications();
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'class SystemEngine { private: ... };', explanation: 'Encapsulates data members privately to prevent unauthorized external modification.' },
          { line: 'public: void displaySpecifications()', explanation: 'Provides an abstraction interface for external code to interact with the engine.' },
          { line: 'SystemEngine unreal("...", 4200);', explanation: 'Instantiates an active object with encapsulated attributes.' }
        ],
        keyConcepts: [
          'Middle-Level Nature: Combines high-level classes and abstraction with direct memory address manipulation via pointers.',
          'Portability: Compiled executables run directly on Windows, Linux, macOS, and embedded architectures.',
          '8 Principal Benefits of OOP: Redundant code elimination via inheritance, modular communication, data hiding security, multi-instance co-existence, clear project partitioning, effortless system upgrades, clean message passing, and simplified software complexity.',
          'High Performance & Zero-Overhead: Fine-grained control over system resources makes C++ the premier choice for performance-critical software.',
          'Real-World Applications: Game engines (Unreal Engine), GUI desktop software (Adobe Photoshop, Illustrator), Database engines (MySQL, MongoDB), Operating Systems (Windows, macOS, Linux kernels), Web Browsers (Chrome V8/Blink, Firefox, Safari), Financial High-Frequency Trading, Compilers (GCC, Clang), and Embedded IoT Devices.'
        ],
        commonMistakes: [
          'Confusing Procedural programming (C) with Object-Oriented programming (C++).',
          'Making class data members public, which destroys encapsulation and data hiding.'
        ],
        quickRevision: [
          'OOP Pillars: Encapsulation, Abstraction, Inheritance, Polymorphism.',
          'C++ offers zero-overhead abstraction with bare-metal speed.',
          'Powers gaming, operating systems, browsers, databases, and high-frequency trading.'
        ]
      }
    },
    {
      id: 'cpp-u1-t6',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 6,
      title: 'Structure of a C++ Program, Stream I/O & Comments',
      summary: 'Dissect the anatomy of a complete C++ program, preprocessor directives, main() entrypoint, cin/cout stream mechanics, and comment formats.',
      content: {
        definition: 'Every C++ program follows a structured architecture consisting of preprocessor directives (#include), namespace declarations (using namespace std;), the global entrypoint function (int main()), executable statement sequences delimited by semicolons, and termination return codes.',
        syntax: '#include <iostream>        // Preprocessor directive\nusing namespace std;       // Namespace declaration\n\nint main() {               // Program execution entrypoint\n    // Single-line comment\n    /* Multi-line \n       comment block */\n    cout << "Message" << endl;  // Stream insertion\n    cin >> variable;            // Stream extraction\n    return 0;                   // Exit status code\n}',
        codeSnippet: `#include <iostream>

int main() {
    // 1. Single-line comment: explaining output logic
    std::cout << "Hello, World! Welcome to C++" << std::endl;

    /* 
     * 2. Multi-line comment:
     * Prompting the user for integer input via std::cin stream
     */
    int studentScore = 95;
    std::cout << "Assigned Academic Score: " << studentScore << std::endl;

    // Return code 0 indicates normal, successful execution to OS
    return 0;
}`,
        lineByLineExplanation: [
          { line: '#include <iostream>', explanation: 'Preprocessor directive instructing compiler to include header declarations for standard stream I/O objects.' },
          { line: 'int main()', explanation: 'Mandatory entry point function where execution of every C++ binary begins.' },
          { line: 'std::cout << ...', explanation: 'Standard character output stream object pushing data to stdout via << insertion operator.' },
          { line: 'std::endl', explanation: 'Inserts a newline character and flushes the standard output buffer.' },
          { line: 'return 0;', explanation: 'Causes main() to finish, returning code 0 to the operating system signaling success.' }
        ],
        keyConcepts: [
          'Preprocessor Directives: Lines starting with hash (#) are handled before compilation to include headers or define macros.',
          'Stream Insertion (<<): Sends formatted character sequences into an output stream (e.g. cout).',
          'Stream Extraction (>>): Pulls formatted input characters from an input stream (e.g. cin) into variables.',
          'Statement Terminator (;): Every executable expression statement in C++ must end with a semicolon.',
          'Code Blocks ({}): Curly braces group statements into compound blocks and define scope.',
          'Single-Line Comments (//): Ignore everything from the double slash to the end of the line.',
          'Multi-Line Comments (/* ... */): Ignore all text enclosed between opening and closing delimiters.'
        ],
        commonMistakes: [
          'Forgetting the terminating semicolon (;) at the end of an expression statement.',
          'Nesting multi-line comments (/* /* */ */ is illegal syntax and causes compile errors).'
        ],
        quickRevision: [
          'main() is the execution entrypoint for all C++ programs.',
          '#include <iostream> enables cin and cout.',
          '<< is insertion (output); >> is extraction (input).',
          'Single-line: // | Multi-line: /* ... */.'
        ]
      }
    },
    {
      id: 'cpp-u1-t7',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 7,
      title: 'Tokens & C++ Keywords',
      summary: 'Understand the fundamental lexical tokens of C++ and the reserved keywords table (~95+ words) that define language syntax.',
      content: {
        definition: 'The smallest individual lexical units in a C++ program recognized by the compiler are known as tokens. C++ features six main types of tokens: Keywords, Identifiers, Constants (Literals), Strings, Operators, and Punctuators (Separators). Keywords are explicitly reserved predefined words that cannot be repurposed by programmers.',
        syntax: 'The 6 Main Token Categories:\n1. Keywords: Reserved words with compiler-fixed meanings (int, class, if, return)\n2. Identifiers: Programmer-defined names for variables, functions, and arrays\n3. Constants (Literals): Fixed values (10, 3.14, \'A\', true)\n4. Strings: Sequence of characters in double quotes ("Hello") ending in \\0\n5. Operators: Action symbols (+, -, *, ==, &&, ||)\n6. Punctuators/Separators: Syntax organizational symbols (; , { } ( ) [ ])',
        codeSnippet: `#include <iostream>

// Identifying Tokens in a Valid C++ Statement
int main() {
    // Keyword: 'const', 'int' | Identifier: 'maxScore' | Operator: '=' | Literal: '100' | Punctuator: ';'
    const int maxScore = 100;

    // String Token: "Final Score Threshold: "
    std::cout << "Final Score Threshold: " << maxScore << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'const int maxScore = 100;', explanation: 'Statement containing keyword (const, int), identifier (maxScore), operator (=), literal (100), and punctuator (;).' },
          { line: 'return 0;', explanation: 'Keyword (return) returning integer literal token (0).' }
        ],
        keyConcepts: [
          'Reserved Status: Keywords implement language grammar and cannot be used as variable, function, or class names.',
          'Case-Sensitivity: All standard C++ keywords are strictly lowercase (e.g. `while`, not `While` or `WHILE`).',
          'Keyword Count: Modern C++ (C++17/20) defines ~95–97 reserved keywords.',
          'Core Keyword Categories:\n  - Primitive Types: int, char, float, double, void, bool, wchar_t\n  - Control Flow: if, else, switch, case, default, for, while, do, break, continue, goto, return\n  - OOP & Access: class, struct, union, public, private, protected, friend, this, virtual\n  - Memory & Modifiers: new, delete, const, static, inline, sizeof, volatile, mutable\n  - Templates & Exceptions: template, typename, try, catch, throw\n  - Modern C++: auto, nullptr, constexpr, noexcept, override, final'
        ],
        commonMistakes: [
          'Attempting to name a variable after a keyword (e.g. int class = 5; or float return = 3.2; causes compile-time errors).',
          'Writing keywords with uppercase letters (e.g. If or Return).'
        ],
        quickRevision: [
          'Token = Smallest individual building block of a C++ program.',
          '6 Types: Keywords, Identifiers, Constants, Strings, Operators, Punctuators.',
          'Keywords are reserved lowercase words that cannot be redefined.'
        ]
      }
    },
    {
      id: 'cpp-u1-t8',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 8,
      title: 'Identifiers: Rules, Naming Conventions & Best Practices',
      summary: 'Learn the strict rules for constructing legal C++ identifiers, case sensitivity behavior, and professional naming conventions.',
      content: {
        definition: 'Identifiers are programmer-defined names assigned to various program elements, including variables, functions, arrays, structures, classes, and namespaces. Identifiers must follow strict lexical rules to be accepted by the C++ compiler.',
        syntax: 'Rules for C++ Identifiers:\n1. Allowed characters: Letters (A-Z, a-z), digits (0-9), and underscore (_)\n2. Starting character: Must be a letter or underscore (cannot start with a digit)\n3. Case-sensitive: myVar, MyVar, and myvar are 3 completely distinct identifiers\n4. Reserved keywords forbidden: Cannot use keywords like int, float, class, return\n5. No spaces or special characters: Spaces and symbols like #, $, %, @, - are prohibited\n6. Length: No arbitrary limit in C++ (unlike classic ANSI C\'s 32-character limit)\n7. Avoid reserved identifiers: Double underscore (__) or leading underscore with uppercase (_Var) are reserved for compiler implementations',
        codeSnippet: `#include <iostream>

int main() {
    // Valid Identifiers
    int studentAge = 20;
    double _accountBalance = 1500.75;
    int roll_number_2024 = 101;
    int totalScore = 98;
    int TotalScore = 100; // Distinct from totalScore due to case sensitivity

    std::cout << "Age: " << studentAge << std::endl;
    std::cout << "Balance: $" << _accountBalance << std::endl;
    std::cout << "Roll: " << roll_number_2024 << std::endl;
    std::cout << "totalScore (" << totalScore << ") != TotalScore (" << TotalScore << ")" << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int studentAge = 20;', explanation: 'Valid identifier using camelCase convention.' },
          { line: 'double _accountBalance = 1500.75;', explanation: 'Valid identifier starting with an underscore followed by lowercase.' },
          { line: 'int roll_number_2024 = 101;', explanation: 'Valid identifier using snake_case with letters, underscores, and digits.' },
          { line: 'int totalScore vs TotalScore', explanation: 'Demonstrates case-sensitivity where differing capitalization creates two independent variables.' }
        ],
        keyConcepts: [
          'Valid Identifiers: `sum`, `total_marks`, `_temp`, `student1`, `MAX_BUFFER`, `nodePtr`.',
          'Invalid Identifiers:\n  - `2ndNumber` (Cannot begin with a digit)\n  - `student-name` (Hyphens are interpreted as subtraction operators)\n  - `class` (Reserved C++ keyword)\n  - `total score` (Whitespace is illegal in identifiers)\n  - `net$` (Special characters other than underscore are forbidden)',
          'Case Sensitivity: `count`, `Count`, and `COUNT` occupy three completely different memory locations.',
          'Meaningful Naming: Always use descriptive names (`totalSum`, `calculateAverage`) instead of cryptic abbreviations (`ts`, `ca`).'
        ],
        commonMistakes: [
          'Starting variable names with digits (e.g. 1stValue = 10;).',
          'Using hyphens (-) instead of underscores (_) for compound words.'
        ],
        quickRevision: [
          'Identifiers = Names for variables, functions, and classes.',
          'Allowed: Letters, digits, underscores. Must start with letter or underscore.',
          'Case-sensitive: variable != Variable.'
        ]
      }
    },
    {
      id: 'cpp-u1-t9',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 9,
      title: 'Constants & Escape Sequences: Numeric, Character & String Literals',
      summary: 'Explore constant classifications (Numeric, Real, Character, String), the const keyword, and the complete escape sequences table.',
      content: {
        definition: 'Constants (literals) refer to fixed values that cannot be altered by the program during execution. In C++, constants are classified into Numeric Constants (Integer & Real), Character Constants (Single characters & Strings), and Backslash Escape Sequences. They are declared as immutable variables using the const keyword.',
        syntax: 'const type CONSTANT_NAME = value;\n\nConstant Classifications:\n• Numeric: Integer (Decimal: 276, Octal: 012, Hexadecimal: 0x1F) and Real/Floating (45.382, -12.07)\n• Character: Single character enclosed in single quotes (\'A\', \'7\', \';\')\n• String: Sequence of characters in double quotes ("hello") terminated by \\0',
        codeSnippet: `#include <iostream>

int main() {
    // 1. Numeric Constants
    const int decimalVal = 100;
    const int octalVal = 0144;      // 0 prefix: Octal 144 = 100 in decimal
    const int hexVal = 0x64;        // 0x prefix: Hex 64 = 100 in decimal
    const double realVal = 45.382;

    // 2. Character and String Constants
    const char letterA = 'A';       // Single quote: 1 byte char
    const char newline = '\\n';      // Escape sequence
    const char quoteChar = '\\'';

    // String constant automatically null-terminated with '\\0'
    const char message[] = "Welcome to CODEVIVA";

    std::cout << "Decimal: " << decimalVal << " | Octal: " << octalVal << " | Hex: " << hexVal << newline;
    std::cout << "Real Constant: " << realVal << newline;
    std::cout << "Character: " << quoteChar << letterA << quoteChar << newline;
    std::cout << "String: " << message << newline;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'const int decimalVal = 100;', explanation: 'Declares an immutable decimal integer constant.' },
          { line: 'const int octalVal = 0144;', explanation: 'Leading 0 designates an octal integer literal (evaluated as base 8).' },
          { line: 'const int hexVal = 0x64;', explanation: 'Leading 0x designates a hexadecimal integer literal (evaluated as base 16).' },
          { line: 'const char letterA = \'A\';', explanation: 'Single character constant with ASCII integer value 65.' },
          { line: 'const char message[] = "...";', explanation: 'String constant stored as a character array terminated by null character (\'\\0\').' }
        ],
        keyConcepts: [
          'Integer Constant Rules: Must have at least one digit, no decimal points, no commas or embedded spaces, may have + or - sign. 16-bit range is -32768 to +32767.',
          'Octal Integer Constants: Formed from digits 0 through 7 with a leading 0 (e.g. `012`, `07777`).',
          'Hexadecimal Integer Constants: Prefixed with `0x` or `0X` followed by digits 0–9 and letters a–f / A–F (e.g. `0x1F`, `0xFF`).',
          'Real (Floating-Point) Constants: Numbers containing fractional parts with decimal points (e.g. `45.382`, `-12.07`) used for continuous quantities.',
          'Single Character vs String Literal: \'A\' is a single character constant occupying 1 byte; "A" is a string literal containing \'A\' followed by \'\\0\' occupying 2 bytes.',
          'Complete Escape Sequences Table:\n  • \\\' : Single quote\n  • \\" : Double quote\n  • \\? : Question mark\n  • \\\\ : Backslash\n  • \\a : Audible alert (bell)\n  • \\b : Backspace\n  • \\n : Newline\n  • \\r : Carriage return\n  • \\t : Horizontal tab\n  • \\v : Vertical tab\n  • \\0 : Null character (string terminator)'
        ],
        commonMistakes: [
          'Confusing single quotes for characters (\'A\') with double quotes for strings ("A").',
          'Accidentally writing leading zeros on decimal numbers (e.g. int num = 025; is parsed as Octal 21, not Decimal 25).'
        ],
        quickRevision: [
          'const keyword makes a value immutable.',
          'Octal starts with 0 | Hexadecimal starts with 0x.',
          '\'A\' is 1 byte character; "A" is 2 bytes (character + \'\\0\').',
          'Escape sequences: \\n (newline), \\t (tab), \\0 (null character).'
        ]
      }
    },
    {
      id: 'cpp-u1-t10',
      unitId: 'cpp-unit-1',
      courseId: 'cpp',
      order: 10,
      title: 'Variables: Definition, Initialization & Constants vs Variables',
      summary: 'Master variable storage definition, declaration vs definition mechanics, extern keyword, and comprehensive differences between constants and variables.',
      content: {
        definition: 'A variable definition instructs the compiler where and how much storage memory to allocate for a named container. While a variable declaration provides assurance to the compiler that a variable exists with a given name and type (for multi-file linking), a definition actually allocates memory. Variables hold mutable values that can change throughout execution, unlike constants.',
        syntax: 'Variable Definition Syntax:\ntype variable_list;\n\nVariable Initialization Syntax:\ntype variable_name = value;\n\nDeclaration using extern:\nextern int a, b; // Declaration only (defined in another file)',
        codeSnippet: `#include <iostream>

int main() {
    // 1. Variable Definition & Initialization
    int num1 = 10;
    int num2; // Defined without initial value

    // 2. Value Mutation: Variables can be modified anytime
    num2 = num1; // Assigning num1\'s value to num2
    std::cout << "num1: " << num1 << " | num2: " << num2 << std::endl;

    num2 = 250;  // Modifying variable value
    std::cout << "Updated num2: " << num2 << std::endl;

    // 3. Constant: Value cannot be changed after initial assignment
    const int MAX_USERS = 500;
    // MAX_USERS = 600; // COMPILE ERROR: assignment of read-only variable

    std::cout << "Immutable Constant MAX_USERS: " << MAX_USERS << std::endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int num1 = 10, num2;', explanation: 'Defines memory storage for two int variables and initializes num1 to 10.' },
          { line: 'num2 = num1;', explanation: 'Copies the current value of num1 into num2.' },
          { line: 'num2 = 250;', explanation: 'Demonstrates variable mutability by assigning a new value to num2 at runtime.' },
          { line: 'const int MAX_USERS = 500;', explanation: 'Declares an immutable constant that cannot be altered after initialization.' }
        ],
        keyConcepts: [
          'Variable Definition: Allocates actual memory storage and defines variable type (e.g. `int i, j, k; float f, salary; double d;`).',
          'Declaration vs Definition: A declaration (using `extern`) informs the compiler of an identifier\'s existence and type without allocating memory. A definition allocates physical storage. An identifier can be declared multiple times but defined only once.',
          'Static Storage Initialization: Variables with static storage duration are implicitly initialized to zero (NULL); local variables without initializers hold garbage values.',
          'Comprehensive Comparison: Constants vs Variables:\n  1. Value Change: Variables can be changed or modified anytime; Constants cannot be changed after initial assignment.\n  2. Representation: Constants represent known fixed values; Variables represent unknown or dynamically changing quantities.\n  3. Declaration Syntax: Variables use `type x = 5;`; Constants use `const type X = 5;` or `constexpr`.\n  4. Initialization Timing: Variables can be declared and initialized later; Constants MUST be initialized at the time of declaration.'
        ],
        commonMistakes: [
          'Using uninitialized local variables before assigning them a value (resulting in garbage memory values).',
          'Declaring a const variable without an initial value (e.g. const int x; causes a compiler error).'
        ],
        quickRevision: [
          'Definition allocates memory; Declaration informs compiler of name & type.',
          'Variable values can change; Constant values are locked upon declaration.',
          'Constants must be initialized when declared; variables can be assigned later.'
        ]
      }
    }
  ]
};

export const cppUnit1Quiz: Quiz = {
  id: 'quiz-cpp-1',
  unitId: 'cpp-unit-1',
  courseId: 'cpp',
  unitTitle: 'Unit 1: Introduction to C++',
  title: 'Unit 1 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-cpp1-1',
      question: 'Which flowchart symbol is used to represent an algorithm decision or conditional branching?',
      options: [
        'Rectangle',
        'Diamond',
        'Parallelogram',
        'Oval'
      ],
      correctIndex: 1,
      explanation: 'A diamond represents decision or switching operations that evaluate boolean conditions and branch flow into alternative paths.'
    },
    {
      id: 'q-cpp1-2',
      question: 'Which of the following is NOT one of the five essential characteristics of an algorithm?',
      options: [
        'Finiteness (must terminate in a finite number of steps)',
        'Definiteness (each step must be precisely stated)',
        'Effectiveness (each step must be convertible to code)',
        'Machine Dependence (must only run on a specific hardware processor)'
      ],
      correctIndex: 3,
      explanation: 'Algorithms are general and language/machine-independent; machine dependence is not a characteristic of an algorithm.'
    },
    {
      id: 'q-cpp1-3',
      question: 'Who created the C++ programming language at Bell Labs, and in what year did the project begin under the name "C with Classes"?',
      options: [
        'Dennis Ritchie in 1972',
        'Bjarne Stroustrup in 1979',
        'James Gosling in 1991',
        'Ken Thompson in 1983'
      ],
      correctIndex: 1,
      explanation: 'Danish computer scientist Bjarne Stroustrup began creating C++ at Bell Laboratories in 1979 as "C with Classes".'
    },
    {
      id: 'q-cpp1-4',
      question: 'Why was the language officially named "C++" in 1983?',
      options: [
        'Because it was written in 2 passes by the compiler',
        'The ++ operator in C is the increment operator, symbolizing an improvement over C',
        'Because it required two licenses to run commercially',
        'It was named after Bell Labs building C, floor 2'
      ],
      correctIndex: 1,
      explanation: 'In 1983, the name was changed to C++, where the ++ operator in C signifies incrementing and improving upon the C language.'
    },
    {
      id: 'q-cpp1-5',
      question: 'Which of the following is a VALID C++ identifier?',
      options: [
        '2nd_student',
        'total-score',
        '_studentRoll2024',
        'class'
      ],
      correctIndex: 2,
      explanation: 'Identifiers can only contain letters, digits, and underscores, cannot begin with a digit, and cannot be a keyword like class or contain hyphens (-).'
    },
    {
      id: 'q-cpp1-6',
      question: 'What is the fundamental difference between the single character constant \'A\' and the string literal "A"?',
      options: [
        '\'A\' is 1 byte containing the ASCII character; "A" is a null-terminated string containing \'A\' and \'\\0\' taking 2 bytes',
        'There is no difference; they are completely identical in memory',
        '\'A\' is stored in heap memory; "A" is stored in registers',
        '\'A\' can hold 5 characters, while "A" can only hold one'
      ],
      correctIndex: 0,
      explanation: '\'A\' is a single character constant taking 1 byte, while "A" is a string literal containing \'A\' followed by the null terminator \'\\0\' taking 2 bytes.'
    },
    {
      id: 'q-cpp1-7',
      question: 'In C++, how is an Octal integer constant distinguished from a Decimal integer constant?',
      options: [
        'An octal constant begins with a leading zero (e.g. 012)',
        'An octal constant begins with 0x (e.g. 0x12)',
        'An octal constant ends with the letter \'o\'',
        'An octal constant must be written in quotation marks'
      ],
      correctIndex: 0,
      explanation: 'Octal integer constants consist of digits 0 through 7 and always begin with a leading zero (e.g. 012 represents decimal 10).'
    },
    {
      id: 'q-cpp1-8',
      question: 'Which of the following statements about constants vs variables in C++ is FALSE?',
      options: [
        'Variables can be reassigned a new value anytime after declaration',
        'Constants cannot be changed after initial assignment (causes a compile error)',
        'Constants must be initialized at the time of declaration',
        'Constants can be left uninitialized and assigned a value later in the code'
      ],
      correctIndex: 3,
      explanation: 'Constants in C++ must always be initialized at the time of declaration; attempting to declare a const variable without an initial value causes a compiler error.'
    }
  ]
};
