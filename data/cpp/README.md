# CODEVIVA C++ Programming Data

This folder contains all educational data, curriculum syllabus, and standalone executable `.cpp` programs for the **C++ Object-Oriented Programming** curriculum track.

## Directory Structure
- `programs/` – 14 runnable standalone C++ source code exercises.
  - `01_hello_world_and_c___stream_output.cpp`
  - `02_interactive_stream_calculator.cpp`
  - `03_prime_and_palindrome_number_verification.cpp`
  - `04_diamond_number_and_star_pattern.cpp`
  - `05_modern_string_manipulation_and_vowel_count.cpp`
  - `06_function_overloading_with_multiple_types.cpp`
  - `07_student_grade_management_using_classes.cpp`
  - `08_constructor_types_and_raii_memory_management.cpp`
  - `09_multilevel_and_multiple_inheritance.cpp`
  - `10_virtual_functions_and_dynamic_method_dispatch.cpp`
  - `11_matrix_2d_overloaded_arithmetic_operators.cpp`
  - `12_generic_stack_template_implementation.cpp`
  - `13_custom_exception_class_and_stack_unwinding.cpp`
  - `14_stl_vector_sorting__maps__and_lambda_expressions.cpp`

## Units Covered
1. **Unit 1: Introduction to C++ Programming (6hrs)**:
   - **Program Design Tools**: Algorithm definition, 4-step problem solving, 5 algorithm characteristics (finiteness, definiteness, effectiveness, generality, input/output).
   - **Flowchart Design**: Standard geometrical symbols (oval, parallelogram, rectangle, diamond, connector, directed flow lines) and circle area walk-through.
   - **Pseudocode**: Rules for writing, advantages (logic verification, brain-machine bridge, documentation, team communication, interview readiness), even/odd check.
   - **Overview of C++**: History & evolution from 1979 "C with Classes" to C++20 and C++23, features of C++, 8 principal benefits of OOP, and real-world industrial applications.
   - **Program Structure & Lexical Units**: Anatomy of a C++ program (#include, using namespace std, main entrypoint, cin/cout stream mechanics, return 0), comments (single-line // and multi-line /* */).
   - **Tokens & Language Elements**: 6 token types, 95+ C++ reserved keywords, 7 strict identifier rules, constants & literals hierarchy (numeric, octal, hexadecimal, real, single character vs string), complete backslash escape sequences table, variable definitions, and comprehensive constants vs variables comparison.
2. **Unit 2: Basics of C++ and Conditional Statements (6hrs)**:
   - **Data Types Hierarchy**: Built-in (integral `int`/`char`, floating `float`/`double`, `void`), User-defined (`struct`, `union`, `class`, `enum`), Derived (`array`, `pointer`, `reference`, `function`).
   - **Data Representation**: Byte sizes, ranges, signed/unsigned modifiers, and C++ strict `void*` explicit cast requirements.
   - **User-Defined & Derived Types**: Structs vs unions (shared memory), OOP classes, type-safe enums (tag names, explicit int-to-enum casts, anonymous enums, class scoping), arrays, pointers, and reference aliases.
   - **Operators Toolkit**: Arithmetic (integer division truncation, modulo), relational, logical (short-circuiting), compound assignment, prefix vs postfix increment trap (`++x` vs `x++`), bitwise manipulation (`&`, `|`, `^`, `~`, `<<`, `>>`), ternary (`?:`), and `sizeof`.
   - **C++ Dedicated Operators**: Scope Resolution (`::`) for unshadowing global variables, dynamic memory (`new`, `delete`, `new[]`, `delete[]`), and `<iomanip>` stream manipulators (`endl`, `setw`).
   - **Expressions**: Constant, integral, float, relational, logical, and bitwise expressions, operator precedence, and Lvalues vs Rvalues.
   - **Conditional Statements**: Decision-making structures, flow diagrams, `if` statement, `if-else` branching, `if-else-if` ladder, and nested `if` statements.
   - **Switch Statements**: Integral/enum case testing, compile-time constants, `break` and fall-through behavior, `default` case, and nested `switch` statements (supported up to 256 nesting levels).
3. **Unit 3: Looping Statements and Arrays in C++ (6hrs)**:
   - **Looping Fundamentals**: Definition of iteration and loops, components of a loop (initialization, test condition, body, update), entry-controlled vs exit-controlled loops.
   - **The while Loop**: Syntax, flowchart, entry-controlled execution flow, zero-iteration possibility, counter & sentinel examples.
   - **The for Loop**: 3-part header execution sequence, infinite loops (`for(;;)`) and intentional termination, comma expressions in initialization and updates.
   - **The do-while Loop**: Exit-controlled mechanics, mandatory terminating semicolon (`;`), guaranteed minimum 1 execution cycle, comparison with `while` and `for`.
   - **Nested Loops & Algorithmic Complexity**: Outer vs inner loop iteration multiplication, compiler nesting depth limit (up to 256 levels), prime number generator algorithm (2 to 100), quadratic $O(N^2)$ algorithmic complexity.
   - **Loop Control Statements**: `break` (immediate loop termination, inner-most scope exit), `continue` (skipping remaining body to next iteration), `goto` and named labels (cautionary use, escaping deeply nested loops), `return` statement.
   - **Introduction to Arrays**: Fixed-size contiguous sequential memory storage, zero-based indexing, element address calculation formula ($\text{Address} = \text{Base} + (\text{Index} \times \text{Size})$), bounds checking caveats.
   - **Array Initialization, Traversal & Memory Formatting**: Complete initialization, omitted size auto-deduction, partial zero-filling, memory alignment, formatted table output with `<iomanip>` `setw()`, pointer decay (`arr == &arr[0]`).
   - **Multi-Dimensional & Two-Dimensional (2D) Arrays**: Matrix representation (rows $\times$ columns), contiguous Row-Major order memory mapping ($\text{Address} = \text{Base} + (i \times C + j) \times \text{Size}$), nested loop matrix traversal, scalar multiplication.
4. **Unit 4: Strings in C++ and Features of OOP (6hrs)**:
   - **C-Style Character Strings**: Declaration and initialization (`char s[6] = {'H','e','l','l','o','\0'}` and `char s[] = "Hello"`), null-terminator `'\0'` mechanics, contiguous memory representation (indices, variables, hex memory addresses).
   - **C-Style String Built-in Functions (`<cstring>`)**: `strcpy()` string copying, `strcat()` string concatenation, `strlen()` character counting up to `'\0'`, `strcmp()` lexicographical comparison, `strchr()` character lookup, `strstr()` substring search.
   - **Modern `std::string` Class (`<string>`)**: Dynamic memory sizing, operator overloading (`+`, `=`, `==`), `.size()` / `.length()`, built-in methods table (`substr`, `find`, `replace`, `insert`, `erase`, `compare`, `c_str()`).
   - **OOP Fundamentals**: Adding object orientation to C, `class` definitions as user-defined blueprints, data members (program data) and member functions (program statements/code), terminating semicolon requirement, object instantiation (`Box Box1, Box2`), independent memory states, volume computation.
   - **Data Abstraction**: Separation of interface and implementation, Television real-world analogy, standard library stream abstractions (`cout`), access labels (`public`, `private`), protection against inadvertent corruption and evolution stability, `Adder` class implementation.
   - **Data Encapsulation**: Bundling data and functions into cohesive units, encapsulation leading to data hiding, default `private` access in C++ classes, `Box` private dimension encapsulation with `getVolume()`, trade-offs of the `friend` specifier.
   - **Inheritance & The IS-A Relationship**: Code reusability and fast development, base (parent) and derived (child) classes, derivation syntax (`class Dog : public Animal`), IS-A relationship hierarchies.
   - **Polymorphism & Advanced Data Hiding**: "Having many forms", dynamic method dispatch with `virtual` functions and base pointers (`Animal* ptr = &myDog`), `override` specifier, compilation-phase logical barrier of data hiding, access specifiers (`private`, `protected`, `public`), defensive setter/getter validation patterns (`Employee` salary integrity), compiler-enforced access errors.
5. **Unit 5: Functions, Memory Management & Class Architecture (6hrs)**:
   - **Functions Architecture**: Definition of functions in C++, building blocks of modular programming, DRY principle (Don't Repeat Yourself), In-built Library functions (`<cmath>` `sqrt()`, `pow()`, `<cctype>` `toupper()`) vs User-defined functions.
   - **Three Components of a Function**: Function Prototype / forward declaration (placement above `main()`, signature definition, compiler type checking), Function Definition (body statements, placement below `main()` or in header), Calling a Function (execution jump, placement inside caller), Return Statement.
   - **Function Arguments**: Formal parameters (placeholders in function header) vs Actual parameters / arguments (real values/variables passed during call site).
   - **Parameter Passing Mechanisms**: Call by Value (isolated memory copy, caller variable completely safe), Call by Reference (`&` alias, direct modification of caller data, performance efficiency).
   - **Passing Arrays to Functions**: The Decay Rule (arrays decay into pointers to first element `&arr[0]`), loss of dimension bounds, requirement of passing `size` parameter explicitly.
   - **Class Members & Visibility**: Private members (hidden from outside world, foundation of Encapsulation and Data Hiding) vs Public members (accessible interface, object steering wheel).
   - **Attribute Management**: Getters (Accessors) for safe read-only retrieval, Setters (Mutators) with business validation logic, Attribute "Deletion" via class Destructors (`~ClassName()`) to reclaim dynamic memory.
   - **Class Methods vs Static Methods**: Instance methods (operate on specific object data via `this` pointer) vs Static methods (`static` keyword, belong to class itself, called with `ClassName::method()` without objects, cannot access non-static data members), Static member variables (`static int totalAccounts`).
   - **Memory Management & Garbage Collection**: C++ manual memory management vs managed automated GC (Java/Python), Stack (automatic scope allocation/destruction) vs Heap (manual allocation with `new`, persistent until `delete`), RAII Destructors as manual deterministic garbage collection, complete enterprise `BankAccount` architecture.
