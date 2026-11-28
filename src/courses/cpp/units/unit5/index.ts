import { Unit, Quiz } from '@/types';

export const cppUnit5: Unit = {
  id: 'cpp-unit-5',
  courseId: 'cpp',
  unitNumber: 5,
  title: 'Functions, Memory Management & Class Architecture',
  description: 'Master functions in C++, prototype declarations, parameter passing mechanisms (value, reference, array decay), class member visibility, attribute management (get, set, delete), static methods, and manual heap memory management vs garbage collection.',
  estimatedHours: 6.0,
  quizId: 'quiz-cpp-5',
  published: true,
  topics: [
    {
      id: 'cpp-u5-t1',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 1,
      title: 'Functions Architecture: In-Built vs User-Defined & Modular Programming',
      summary: 'Explore modular programming in C++, the DRY principle, and the architectural differences between standard library and custom user-defined functions.',
      content: {
        definition: 'A function in C++ is a self-contained block of code that performs a specific task. Functions serve as the fundamental building blocks of modular programming, allowing developers to break a complex problem into smaller, manageable, and reusable pieces. Functions enforce the DRY (Don\'t Repeat Yourself) principle, enhance code readability, reduce redundancy, and make debugging straightforward. C++ categorizes functions into two main types based on who created them: In-built (Library) Functions and User-defined Functions.',
        syntax: '// In-built Library Function Usage (via headers):\n#include <cmath>\ndouble result = sqrt(25.0);\n\n// User-defined Function Declaration:\nreturn_type function_name(parameter_list);',
        codeSnippet: `#include <iostream>
#include <cmath>   // For in-built math functions: sqrt(), pow()
#include <cctype>  // For in-built char functions: toupper()
using namespace std;

// User-defined Function: Custom logic to calculate circle area
double calculateCircleArea(double radius) {
    const double PI = 3.141592653589793;
    return PI * pow(radius, 2); // Utilizing in-built pow() function
}

// User-defined Function: Validates a student password length
bool validatePassword(string password) {
    return password.length() >= 8;
}

int main() {
    cout << "=== 1. In-built Library Functions ===" << endl;
    double num = 64.0;
    cout << "Square root of " << num << " is: " << sqrt(num) << endl;
    cout << "2 raised to power 5 is: " << pow(2, 5) << endl;
    cout << "Uppercase of 'c' is: " << (char)toupper('c') << endl;

    cout << "\\n=== 2. User-defined Functions ===" << endl;
    double r = 7.0;
    cout << "Area of circle with radius " << r << " is: " << calculateCircleArea(r) << endl;

    string pass = "CODEVIVA2026";
    cout << "Is password '" << pass << "' valid? " 
         << (validatePassword(pass) ? "YES (Valid)" : "NO (Too short)") << endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: '#include <cmath>', explanation: 'Includes pre-defined functions provided by the C++ Standard Library, such as sqrt() and pow().' },
          { line: 'double calculateCircleArea(double radius)', explanation: 'A user-defined function created by the programmer to perform custom mathematical computations.' },
          { line: 'return PI * pow(radius, 2);', explanation: 'Combines user-defined modular logic with highly optimized standard library routines.' },
          { line: 'validatePassword(pass)', explanation: 'Encapsulates business rules into reusable helper functions, preventing duplicated checks.' }
        ],
        keyConcepts: [
          'Modular Programming: Decomposing a large monolithic system into independent, single-responsibility functional modules.',
          'In-built Functions: Highly optimized, rigorously tested routines provided by standard headers saving developers from reinventing the wheel.',
          'User-defined Functions: Custom blocks written by programmers to structure domain logic, isolate changes, and simplify unit testing.',
          'DRY Principle (Don\'t Repeat Yourself): Eliminating copy-pasted logic by centralizing routines in callable functions.'
        ],
        commonMistakes: [
          'Re-implementing standard algorithms and functions manually instead of leveraging standard headers like <cmath> and <algorithm>.',
          'Creating excessively large functions that perform multiple unrelated responsibilities (violating Single Responsibility Principle).'
        ],
        quickRevision: [
          'Functions are self-contained modular code blocks.',
          'In-built functions come from standard headers (<cmath>, <cctype>).',
          'User-defined functions organize custom application logic.'
        ]
      }
    },
    {
      id: 'cpp-u5-t2',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 2,
      title: 'The Three Components: Prototype, Definition & Call Mechanics',
      summary: 'Understand the three distinct lifecycles of a function: compiler prototype forward declarations, execution definitions, and invocation call mechanics.',
      content: {
        definition: 'To use any user-defined function in C++, a programmer must understand three distinct components: the Function Prototype (Declaration), the Function Definition, and Calling a Function. A prototype tells the compiler about the function\'s signature (name, return type, parameters) before it is actually called in main(), acting as a forward declaration. The definition provides the actual implementation body, and the function call transfers execution control to the function body.',
        syntax: '// 1. Function Prototype (Above main):\nreturn_type function_name(parameter_list);\n\n// 2. Calling a Function (Inside main):\nvariable = function_name(arguments);\n\n// 3. Function Definition (Below main):\nreturn_type function_name(parameters) {\n    // Statements\n    return value;\n}',
        codeSnippet: `#include <iostream>
using namespace std;

// 1. FUNCTION PROTOTYPE (Forward Declaration)
// Placement: Above main()
// Purpose: Tells the compiler that addNumbers exists and expects two integers.
int addNumbers(int a, int b);

int main() {
    int sum;

    // 2. FUNCTION CALL
    // Placement: Inside main()
    // Execution Flow: Control jumps to addNumbers definition, executes, and returns.
    sum = addNumbers(5, 10);

    cout << "The sum is: " << sum << endl;
    return 0;
}

// 3. FUNCTION DEFINITION
// Placement: Below main() or in a separate module
// Purpose: Contains the actual logic and executable statements.
int addNumbers(int a, int b) {
    return a + b; // Return statement sends computed data back to caller
}`,
        lineByLineExplanation: [
          { line: 'int addNumbers(int a, int b);', explanation: 'Function prototype: declares return type int, name addNumbers, and two int formal parameters before main() executes.' },
          { line: 'sum = addNumbers(5, 10);', explanation: 'Function call: passes actual arguments (5, 10) and assigns the resulting return value to variable sum.' },
          { line: 'int addNumbers(int a, int b) { ... }', explanation: 'Function definition: implements the logic below main(), made possible by the forward prototype declaration.' },
          { line: 'return a + b;', explanation: 'Return statement terminates function execution and yields the computed result back to the calling context.' }
        ],
        keyConcepts: [
          'Component Roles & Placement Table:',
          '  - Prototype: Tells compiler function exists | Placed above main()',
          '  - Definition: Contains actual logic and body | Placed below main() or in a header',
          '  - Call: Executes the function | Placed inside main() or another function',
          '  - Return Statement: Transmits result to caller | Placed inside the function definition body',
          'Compiler Forward Checking: Prototypes allow compilers to enforce strict argument count and type matching even when the definition appears later in the file.'
        ],
        commonMistakes: [
          'Omitting the terminating semicolon on a function prototype (e.g., int func(int x) without semicolon causes compile errors).',
          'Mismatching types between the prototype declaration and the function definition (e.g., prototype takes double, definition takes int).'
        ],
        quickRevision: [
          'Prototype declares signature above main(): int func(int);',
          'Call triggers execution inside caller: func(10);',
          'Definition supplies actual logic: int func(int x) { return x * 2; }'
        ]
      }
    },
    {
      id: 'cpp-u5-t3',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 3,
      title: 'Function Arguments: Formal vs Actual Parameters & Call by Value',
      summary: 'Differentiate between formal parameters and actual arguments, and examine how Call by Value isolates memory to protect original data.',
      content: {
        definition: 'When working with C++ functions, "parameters" and "arguments" refer to data at two distinct stages: Formal Parameters are the variables declared in the function header that act as local placeholders within the function scope. Actual Parameters (Arguments) are the real values, expressions, or variables passed to the function during invocation in main(). In Call by Value, an independent copy of the actual parameter is created in a brand new memory location for the formal parameter; any modifications inside the function do NOT affect the original caller variable.',
        syntax: 'void compute(int formalParam) { // Formal parameter in header\n    formalParam = 500; // Changes do NOT affect the caller\n}\n\nint main() {\n    int actualArg = 10; // Actual argument\n    compute(actualArg);  // Passed by value\n}',
        codeSnippet: `#include <iostream>
using namespace std;

// 'val' is a Formal Parameter (Call by Value)
void callByValueDemo(int val) {
    cout << "[Inside Function] Initial formal parameter val = " << val << endl;
    cout << "[Inside Function] Memory address of val = " << &val << endl;
    
    val = 500; // Local change only!
    cout << "[Inside Function] Modified formal parameter val = " << val << endl;
}

int main() {
    int originalNumber = 10; // Actual Parameter (Argument)

    cout << "[Inside Main] Before function call: originalNumber = " << originalNumber << endl;
    cout << "[Inside Main] Memory address of originalNumber = " << &originalNumber << endl;

    // Passing actual parameter by value
    callByValueDemo(originalNumber);

    cout << "\\n[Inside Main] After function call: originalNumber = " << originalNumber << endl;
    cout << "[Conclusion] Original variable remains completely unchanged (10)!" << endl;

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'void callByValueDemo(int val)', explanation: 'val is the formal parameter declared in the function header, allocated on the function\'s call stack frame.' },
          { line: '&val vs &originalNumber', explanation: 'Displaying addresses proves val occupies a distinct memory location separate from originalNumber.' },
          { line: 'val = 500;', explanation: 'Mutates only the temporary local copy inside the function frame; leaves the caller variable untouched.' },
          { line: 'cout << originalNumber;', explanation: 'Verifies that originalNumber in main retained its original value of 10.' }
        ],
        keyConcepts: [
          'Formal vs Actual: Formal parameters exist in function headers; actual arguments are supplied at the call site.',
          'Call by Value Isolation: Generates an isolated copy, safeguarding caller data against inadvertent corruption.',
          'Memory Cost: Passing large structures or classes by value copies all internal bytes, introducing performance overhead.'
        ],
        commonMistakes: [
          'Expecting a call by value function to update the caller\'s variable (e.g., attempting a swap(x, y) with pass-by-value).',
          'Passing heavy objects by value when read-only inspection could be done with const reference (const Type&).'
        ],
        quickRevision: [
          'Formal: placeholder in function signature.',
          'Actual: real data passed during function call.',
          'Call by Value copies data into a new address; caller is 100% safe.'
        ]
      }
    },
    {
      id: 'cpp-u5-t4',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 4,
      title: 'Call by Reference & Passing Arrays to Functions',
      summary: 'Pass variables by reference using aliases (&) for direct mutation, and understand array pointer decay and array sizing rules.',
      content: {
        definition: 'In Call by Reference, instead of creating an independent copy, the function receives a reference (an alias) to the original variable using the & symbol. Any modification inside the function directly updates the caller\'s variable. When passing Arrays to functions, C++ applies the Array Decay Rule: an array automatically decays into a raw pointer to its first element (&arr[0]). Because raw pointers do not carry dimension boundaries, the programmer must explicitly pass the array size as a second argument.',
        syntax: '// Call by Reference using & alias:\nvoid update(int &ref);\n\n// Passing Arrays (decays to pointer):\nvoid processArray(double arr[], int size); // or (double* arr, int size)',
        codeSnippet: `#include <iostream>
using namespace std;

// Demonstrating Parameter Passing:
// 'val' is Call by Value (copy created)
// 'ref' is Call by Reference (alias to original variable)
void systemUpdate(int val, int &ref) {
    val = 500; // Local change only (Actual parameter in main won't change)
    ref = 500; // Direct change (Actual parameter in main WILL change!)
}

// Function demonstrating Passing Arrays to Functions
// Arrays decay to pointers; 'size' is needed because the function doesn't know array bounds
void processTransactions(double transactions[], int size) {
    cout << "\\n[processTransactions] Pointer to array start: " << transactions << endl;
    for (int i = 0; i < size; i++) {
        cout << "Processing transaction [" << i << "]: $" << transactions[i] << endl;
    }
}

int main() {
    int a = 10, b = 10;

    cout << "=== 1. Call by Value vs Reference ===" << endl;
    cout << "Initial: a = " << a << ", b = " << b << endl;

    systemUpdate(a, b);

    cout << "After update - Value (a): " << a << ", Reference (b): " << b << endl;

    cout << "\\n=== 2. Passing Arrays to Functions ===" << endl;
    double dailyTrans[3] = {100.5, 20.0, -50.0};

    // Passing array name (dailyTrans decays to &dailyTrans[0]) along with size 3
    processTransactions(dailyTrans, 3);

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'void systemUpdate(int val, int &ref)', explanation: 'val receives a local copy; ref receives a direct reference alias bound to the caller\'s actual variable.' },
          { line: 'ref = 500;', explanation: 'Directly modifies variable b in main() through its reference alias.' },
          { line: 'void processTransactions(double transactions[], int size)', explanation: 'transactions[] parameter decays into double* pointer; size must be supplied explicitly.' },
          { line: 'processTransactions(dailyTrans, 3);', explanation: 'Passes the base address of dailyTrans and its length 3.' }
        ],
        keyConcepts: [
          'Call by Reference (&): Avoids copying overhead for large objects and enables functions to return multiple results by modifying arguments.',
          'Array Decay Rule: When an array is passed to a function, it decays into a pointer pointing to its first element (arr == &arr[0]).',
          'Size Requirement: Because pointers do not preserve array length, size must always be passed as an auxiliary parameter to prevent out-of-bounds memory access.'
        ],
        commonMistakes: [
          'Using sizeof(arr) inside a function receiving an array: sizeof returns the size of the pointer (4 or 8 bytes), NOT the total array elements!',
          'Forgetting the & symbol in a reference parameter, causing the function to silently fall back to call-by-value.'
        ],
        quickRevision: [
          'Call by reference uses & and mutates the original variable.',
          'Arrays decay to pointers when passed to functions.',
          'Always pass array size as a parameter alongside array pointers.'
        ]
      }
    },
    {
      id: 'cpp-u5-t5',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 5,
      title: 'Class Members: Public & Private Visibility in OOP',
      summary: 'Explore OOP access specifiers, information protection, private data encapsulation, and public steering wheel interfaces.',
      content: {
        definition: 'In Object-Oriented Programming (OOP), access specifiers control the visibility and accessibility of class members. Private members (data variables or internal helper functions) are hidden from the outside world and can only be accessed by other member functions of the same class. This serves as the foundation of Encapsulation and Data Hiding. Public members are accessible from anywhere within the program scope where the object is defined. In professional class design, state data attributes are kept private, while member functions providing the interface are made public.',
        syntax: 'class Account {\nprivate:\n    // Private members: Hidden from outside world (Encapsulation)\n    double balance;\npublic:\n    // Public members: Accessible interface (Steering wheel)\n    void deposit(double amount);\n};',
        codeSnippet: `#include <iostream>
#include <string>
using namespace std;

class StudentRecord {
private:
    // Private members: Hidden from outside world
    // Foundation of Encapsulation: Prevents unauthorized modification
    string studentName;
    int rollNumber;
    double gpa;

public:
    // Constructor initializes private state
    StudentRecord(string name, int roll, double grade) {
        studentName = name;
        rollNumber = roll;
        gpa = grade;
    }

    // Public member function acting as public interface
    void displayCard() const {
        cout << "Student: " << studentName 
             << " | Roll No: " << rollNumber 
             << " | GPA: " << gpa << endl;
    }
};

int main() {
    StudentRecord s1("Rohan Sharma", 101, 3.85);

    // Accessing through public interface:
    s1.displayCard();

    // The following statements would trigger COMPILER ERRORS:
    // s1.studentName = "Hacker"; // Error: 'studentName' is private
    // s1.gpa = 4.0;              // Error: 'gpa' is private

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'private: string studentName;', explanation: 'Declares studentName as private, making it inaccessible to external code outside the class.' },
          { line: 'public: void displayCard() const', explanation: 'Public member function acting as the visible interface to present data safely.' },
          { line: 's1.gpa = 4.0; // COMPILER ERROR', explanation: 'Direct modification of private members is prevented by the C++ compiler.' }
        ],
        keyConcepts: [
          'Foundation of Encapsulation: Grouping private state variables together with public methods that operate upon them.',
          'Interface Separation: Public functions serve as the "steering wheel" of an object, shielding users from raw private memory.',
          'Default Class Access: If no specifier is provided in a class, all members default to private.'
        ],
        commonMistakes: [
          'Exposing all member variables as public to avoid writing methods, violating OOP encapsulation principles.',
          'Returning non-const raw pointers or references to private member variables, accidentally leaking internal state.'
        ],
        quickRevision: [
          'private: visible only inside the class; foundation of data hiding.',
          'public: accessible anywhere the object exists; the class interface.',
          'Class data should be private, member methods typically public.'
        ]
      }
    },
    {
      id: 'cpp-u5-t6',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 6,
      title: 'Attribute Management: Getters (Accessors), Setters (Mutators) & Destructors',
      summary: 'Manage private class attributes using getter accessors, validating setter mutators, and RAII destructors for attribute deletion.',
      content: {
        definition: 'Because class attributes (state variables) are kept private, C++ provides controlled mechanisms to check, get, set, and delete them. A Getter (Accessor) is a public method used to read the value of a private attribute safely. A Setter (Mutator) is a public method used to update the value of a private attribute, typically enforcing validation logic (e.g., verifying a deposit amount is positive). While languages like Python have an explicit "del" statement, C++ accomplishes attribute deletion and cleanup through Destructors (~ClassName()), which release memory associated with attributes (especially heap pointers) when an object is destroyed.',
        syntax: 'class AttributeManager {\npublic:\n    // Getter (Accessor)\n    string getName() const { return name; }\n\n    // Setter (Mutator) with validation\n    void setAge(int a) {\n        if (a > 0) age = a;\n    }\n\n    // Destructor (Attribute deallocation & cleanup)\n    ~AttributeManager() {\n        // Free attribute memory\n    }\n};',
        codeSnippet: `#include <iostream>
#include <string>
using namespace std;

class ProductItem {
private:
    string productName;
    double* price; // Dynamic pointer attribute requiring manual deletion

public:
    // Constructor: Allocates dynamic attribute
    ProductItem(string name, double p) {
        productName = name;
        price = new double(p); // Dynamic memory allocation
    }

    // 1. GETTER (Accessor): Public method to read private attribute
    string getProductName() const {
        return productName;
    }

    double getPrice() const {
        return *price;
    }

    // 2. SETTER (Mutator): Public method to update attribute with validation
    void setProductName(string newName) {
        if (!newName.empty()) {
            productName = newName;
        }
    }

    void setPrice(double newPrice) {
        if (newPrice > 0.0) {
            *price = newPrice;
        } else {
            cout << "Validation Error: Price must be positive!" << endl;
        }
    }

    // 3. "DELETE" ATTRIBUTE: Destructor cleans up attribute memory on object destruction
    ~ProductItem() {
        delete price; // Frees dynamic memory allocated for price attribute
        cout << "Destructor: Deleted attribute memory for product '" << productName << "'." << endl;
    }
};

int main() {
    // Instantiate object
    ProductItem item1("CODEVIVA Laptop", 1200.0);

    // Using Getters
    cout << "Item: " << item1.getProductName() << " | Price: $" << item1.getPrice() << endl;

    // Using Setters with validation
    item1.setPrice(1350.0);  // Valid update
    item1.setPrice(-100.0);  // Blocked by validation logic

    cout << "Updated Price: $" << item1.getPrice() << endl;

    // Destructor automatically called when item1 goes out of scope, releasing price attribute
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'string getProductName() const', explanation: 'Getter accessor marked const so it guarantees read-only access without mutating object state.' },
          { line: 'void setPrice(double newPrice)', explanation: 'Setter mutator enforcing business logic before modifying internal state.' },
          { line: '~ProductItem() { delete price; }', explanation: 'Destructor acts as the attribute cleanup mechanism in C++, freeing heap memory allocated for attributes.' }
        ],
        keyConcepts: [
          'Getter (Accessor): Exposes state safely without granting direct modification access.',
          'Setter (Mutator): Intercepts state modifications to assert invariants and business rules.',
          'Attribute Deletion in C++: C++ relies on deterministic Destructors (~ClassName()) to deallocate dynamic attributes rather than garbage collectors.'
        ],
        commonMistakes: [
          'Writing trivial getters and setters for every variable without validation, which defeats the purpose of encapsulation.',
          'Failing to delete dynamically allocated attribute pointers in the destructor, causing memory leaks.'
        ],
        quickRevision: [
          'Getters read private attributes; Setters validate and update them.',
          'C++ has no "del" keyword for attributes; Destructors clean up attribute memory.',
          'Destructor syntax: ~ClassName().'
        ]
      }
    },
    {
      id: 'cpp-u5-t7',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 7,
      title: 'Class Methods (Instance Methods) vs Static Methods & Static Members',
      summary: 'Distinguish between instance methods operating via the this pointer and static methods operating at the class level without instances.',
      content: {
        definition: 'In C++, class methods are divided into two classifications: Class Methods (Instance Methods) operate on a specific instance (object) of a class and have implicit access to that object\'s unique data via the hidden \'this\' pointer. In contrast, Static Methods are declared with the static keyword and belong to the class itself rather than any specific object. Static methods can be called directly without instantiating an object (e.g., ClassName::method()), but they cannot access non-static instance members or the \'this\' pointer.',
        syntax: 'class Example {\npublic:\n    static int sharedCounter; // Static member variable\n    static void displayStats(); // Static method (no object required)\n    void instanceMethod();      // Instance method (operates on this object)\n};\n\n// Static member initialization outside class:\nint Example::sharedCounter = 0;\n\n// Calling static method:\nExample::displayStats();',
        codeSnippet: `#include <iostream>
using namespace std;

class ServerSession {
private:
    int sessionId; // Instance attribute (unique per object)

public:
    // Static member variable: Shared across all instances of the class
    static int activeConnections;

    // Constructor increments shared static counter
    ServerSession(int id) : sessionId(id) {
        activeConnections++;
    }

    // Destructor decrements shared static counter
    ~ServerSession() {
        activeConnections--;
    }

    // 1. Instance Method (Class Method): Operates on this specific object's data
    void showSessionDetails() const {
        cout << "Session ID: " << sessionId 
             << " (Uses implicit 'this' pointer to access sessionId)" << endl;
    }

    // 2. Static Method: Belongs to the class itself; no object instance required
    static void displayNetworkStats() {
        // Can access static members directly:
        cout << "[Static Method] Current Active Connections: " << activeConnections << endl;
        // Cannot access 'sessionId' because there is no 'this' pointer in static scope!
    }
};

// Initialize static member at file scope (mandatory in C++)
int ServerSession::activeConnections = 0;

int main() {
    cout << "=== Calling Static Method with NO instances ===" << endl;
    ServerSession::displayNetworkStats(); // Invoked directly on class name

    cout << "\\n=== Creating Instances ===" << endl;
    ServerSession* s1 = new ServerSession(1001);
    ServerSession* s2 = new ServerSession(1002);

    s1->showSessionDetails(); // Instance method
    s2->showSessionDetails(); // Instance method

    // Static method reflects current shared count
    ServerSession::displayNetworkStats();

    cout << "\\n=== Terminating an Instance ===" << endl;
    delete s1; // Destructor decrements activeConnections

    ServerSession::displayNetworkStats();

    delete s2;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'static int activeConnections;', explanation: 'Declares a single variable shared among all instances of ServerSession in memory.' },
          { line: 'int ServerSession::activeConnections = 0;', explanation: 'Allocates storage and initializes static member variable at file scope.' },
          { line: 'static void displayNetworkStats()', explanation: 'Static member function that can be called via ClassName:: without creating an object.' },
          { line: 's1->showSessionDetails();', explanation: 'Instance method receives the implicit this pointer pointing to s1.' }
        ],
        keyConcepts: [
          'Instance Methods: Bound to an object, receive this pointer, manipulate individual instance attributes.',
          'Static Methods: Global to the class, no this pointer, cannot reference non-static variables.',
          'Scope Resolution Operator (::): Used to invoke static methods (ClassName::method()) and initialize static member variables.'
        ],
        commonMistakes: [
          'Attempting to access non-static instance variables (like sessionId) from inside a static method.',
          'Forgetting to define and initialize static member variables outside the class body, resulting in unresolved external linker errors.'
        ],
        quickRevision: [
          'Instance methods operate on objects via this pointer.',
          'static methods belong to the class itself: Class::method().',
          'static methods cannot access non-static attributes.'
        ]
      }
    },
    {
      id: 'cpp-u5-t8',
      unitId: 'cpp-unit-5',
      courseId: 'cpp',
      order: 8,
      title: 'Memory Management & Garbage Collection: Heap, Stack & RAII Cleanup',
      summary: 'Master manual memory management, compare C++ deterministic cleanup against garbage collection, and review the unified BankAccount architecture.',
      content: {
        definition: 'Unlike managed languages like Java or Python which run background automated Garbage Collection (GC) daemons, C++ is a manually managed language. Variables on the Stack are automatically created and destroyed when they go out of scope. However, memory allocated on the Heap (free store) using the new keyword stays in memory until the programmer explicitly releases it using the delete keyword. In professional C++, the RAII (Resource Acquisition Is Initialization) pattern uses class Destructors to perform deterministic, manual "garbage collection" as soon as an object goes out of scope.',
        syntax: '// Stack allocation (automatic cleanup upon leaving scope):\nint x = 10;\n\n// Heap allocation (manual management required):\ndouble* ptr = new double(100.5);\n// ... use ptr ...\ndelete ptr; // Manual release\n\n// RAII Destructor cleanup:\n~ClassName() {\n    delete ptr;\n}',
        codeSnippet: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

class BankAccount {
private:
    // Private members (Encapsulation) - cannot be accessed directly from outside
    string accountHolder;
    double* balance; // Pointer to demonstrate heap memory / manual garbage collection

public:
    // Static member - shared across all instances of the class
    static int totalAccounts;

    // Constructor: Initializes attributes & allocates Heap memory
    BankAccount(string name, double initialDeposit) {
        accountHolder = name;
        balance = new double(initialDeposit); // Manual memory allocation on Heap
        totalAccounts++;
    }

    // Destructor: Acts as manual 'Garbage Collection' for the dynamic attribute
    ~BankAccount() {
        delete balance; // Releasing heap memory
        totalAccounts--;
        cout << "System: Memory for " << accountHolder << "'s account released.\\n";
    }

    // SETTER: To modify private attribute
    void setAccountName(string newName) {
        accountHolder = newName;
    }

    // GETTER: To view private attribute
    string getAccountName() const {
        return accountHolder;
    }

    // Static Method: Belongs to the class, not a specific object
    static void displayBankStats() {
        cout << "Bank Stats: " << totalAccounts << " active accounts.\\n";
    }

    // Class Method: Operates on object data
    void displayBalance() {
        cout << accountHolder << "'s Balance: $" << *balance << endl;
    }
};

// Initialize static member
int BankAccount::totalAccounts = 0;

// Function demonstrating Parameter Passing:
// 'val' is Call by Value; 'ref' is Call by Reference
void systemUpdate(int val, int &ref) {
    val = 500; // Local change only (Actual parameter in main won't change)
    ref = 500; // Direct change (Actual parameter in main WILL change)
}

// Function demonstrating Passing Arrays to Functions
// Arrays decay to pointers; 'size' is needed because the function doesn't know array bounds
void processTransactions(double transactions[], int size) {
    for (int i = 0; i < size; i++) {
        cout << "Processing transaction: $" << transactions[i] << endl;
    }
}

int main() {
    // 1. Static Method call (no object needed)
    BankAccount::displayBankStats();

    // 2. Creating an Object (Actual Parameters: "Alice", 1200.50)
    BankAccount account1("Alice", 1200.50);

    // 3. Demonstrating Call by Value vs Reference
    int a = 10, b = 10;
    systemUpdate(a, b);
    cout << "After update - Value (a): " << a << ", Reference (b): " << b << endl;

    // 4. Passing an Array
    double dailyTrans[3] = {100.5, 20.0, -50.0};
    processTransactions(dailyTrans, 3);

    // 5. Using Getter and Setter
    account1.setAccountName("Alice Smith");
    cout << "Updated Name: " << account1.getAccountName() << endl;
    account1.displayBalance();
    BankAccount::displayBankStats();

    return 0; // Destructor called here for account1 (Deterministic Garbage Collection)
}`,
        lineByLineExplanation: [
          { line: 'balance = new double(initialDeposit);', explanation: 'Allocates memory on the heap; returns pointer stored in private member balance.' },
          { line: 'delete balance;', explanation: 'Deallocates dynamic memory in destructor, ensuring zero memory leaks when object terminates.' },
          { line: 'BankAccount::displayBankStats();', explanation: 'Invokes static method without an object instance.' },
          { line: 'systemUpdate(a, b);', explanation: 'Contrasts call by value (a remains 10) with call by reference (b becomes 500).' },
          { line: 'processTransactions(dailyTrans, 3);', explanation: 'Passes decayed array pointer and explicit length 3 to processing routine.' }
        ],
        keyConcepts: [
          'Stack vs Heap:',
          '  - Stack: Automatic scope-based lifetime; fast, managed by compiler.',
          '  - Heap: Manual lifetime; allocated with new, persists until delete.',
          'No Automated GC Daemon: C++ does not incur Java/Python GC pauses or background overhead, giving developers deterministic performance.',
          'Feature Comparison Summary:',
          '  - Call by Value: Original variable is safe from changes.',
          '  - Call by Reference: Efficient for large objects; modifies original.',
          '  - Private Members: Essential for data security/hiding.',
          '  - Static Method: Global to the class; no instance required.',
          '  - Garbage Collection: Manual in C++ (requires delete or RAII destructors).'
        ],
        commonMistakes: [
          'Memory leaks: Allocating with new without calling delete in the corresponding destructor or cleanup path.',
          'Dangling pointers: Accessing heap memory after calling delete.',
          'Double deletion: Calling delete twice on the same pointer.'
        ],
        quickRevision: [
          'C++ has no automatic garbage collector.',
          'new allocates on Heap; delete frees memory.',
          'RAII destructors execute deterministic cleanup upon leaving scope.'
        ]
      }
    }
  ]
};

export const cppUnit5Quiz: Quiz = {
  id: 'quiz-cpp-5',
  unitId: 'cpp-unit-5',
  courseId: 'cpp',
  unitTitle: 'Unit 5: Functions, Memory Management & Class Architecture',
  title: 'Unit 5 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-cpp5-1',
      question: 'What is the primary role of a function prototype declaration in C++ placed above main()?',
      options: [
        'It reserves heap memory for the function',
        'It tells the compiler the function exists, its return type, and its parameter list, allowing forward type checking',
        'It executes the function before main() runs',
        'It converts local variables into global variables'
      ],
      correctIndex: 1,
      explanation: 'A function prototype acts as a forward declaration, enabling the compiler to verify argument types and counts before the actual function definition is parsed.'
    },
    {
      id: 'q-cpp5-2',
      question: 'In the function header "void compute(int x)", what is "x" formally called?',
      options: [
        'Actual Parameter (Argument)',
        'Formal Parameter',
        'Global Parameter',
        'Reference Pointer'
      ],
      correctIndex: 1,
      explanation: 'Formal parameters are variables declared in the function header that serve as local placeholders for incoming data.'
    },
    {
      id: 'q-cpp5-3',
      question: 'What happens to the caller\'s original variable when passed into a function via Call by Value?',
      options: [
        'It is modified directly by the function',
        'It is deleted from memory',
        'It remains completely unchanged because an independent copy is created in a separate memory location',
        'It causes a compilation error if modified'
      ],
      correctIndex: 2,
      explanation: 'Call by Value copies the argument into a new memory location for the formal parameter, ensuring changes inside the function do not alter the caller\'s variable.'
    },
    {
      id: 'q-cpp5-4',
      question: 'Why must the size of an array typically be passed as a separate argument when passing arrays to functions in C++?',
      options: [
        'Because arrays automatically expand on the heap',
        'Because arrays decay into pointers to their first element, losing information about their dimension and bounds',
        'Because C++ functions cannot accept arrays',
        'Because arrays are always passed by value'
      ],
      correctIndex: 1,
      explanation: 'When an array is passed to a function, it decays into a pointer (double*). Because a raw pointer does not store length, the size must be passed explicitly to prevent buffer overruns.'
    },
    {
      id: 'q-cpp5-5',
      question: 'In Object-Oriented C++, how is attribute deletion and heap cleanup handled when an object terminates?',
      options: [
        'Through an automated background garbage collector like in Java or Python',
        'Using the explicit "del" keyword',
        'Through the class Destructor (~ClassName()), which manually deletes dynamic attributes',
        'Attributes cannot be cleaned up in C++'
      ],
      correctIndex: 2,
      explanation: 'C++ has no automated garbage collector or "del" attribute keyword; it relies on Destructors (~ClassName()) to deterministically deallocate memory (e.g. delete balance).'
    },
    {
      id: 'q-cpp5-6',
      question: 'Which of the following statements about C++ Static Methods is TRUE?',
      options: [
        'Static methods belong to an individual object and require instantiating an instance first',
        'Static methods belong to the class itself, can be called without an object (ClassName::method()), and cannot access non-static data members',
        'Static methods can access the "this" pointer freely',
        'Static methods cannot access static member variables'
      ],
      correctIndex: 1,
      explanation: 'Static methods belong to the class itself, do not receive an implicit "this" pointer, and can only access static members.'
    },
    {
      id: 'q-cpp5-7',
      question: 'What is the key difference between Stack and Heap memory in C++?',
      options: [
        'Heap memory is automatically managed when leaving scope; Stack must be freed with delete',
        'Stack memory is automatically managed and freed when leaving scope; Heap memory allocated with "new" stays in memory until manually freed with "delete"',
        'Stack memory is slower than Heap memory',
        'Heap memory cannot store class objects'
      ],
      correctIndex: 1,
      explanation: 'Stack variables are managed automatically by scope lifetimes. Heap memory allocated using new must be explicitly freed with delete, otherwise memory leaks occur.'
    },
    {
      id: 'q-cpp5-8',
      question: 'Which C++ operator is used to call a static member function without instantiating an object?',
      options: [
        '. (Dot operator)',
        '-> (Arrow operator)',
        ':: (Scope resolution operator)',
        '# (Preprocessor directive)'
      ],
      correctIndex: 2,
      explanation: 'The Scope Resolution Operator (::) is used to call static methods on a class directly, e.g., BankAccount::displayBankStats().'
    }
  ]
};
