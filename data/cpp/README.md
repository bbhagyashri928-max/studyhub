# CODEVERSE C++ Programming Data

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
4. **Unit 4: Inheritance & Polymorphism** – Inheritance hierarchies, virtual functions, operator overloading.
5. **Unit 5: Advanced C++ Concepts** – Function & class templates, exception handling, STL vector/map/stack.
