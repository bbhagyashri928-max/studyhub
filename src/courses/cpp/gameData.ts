export interface CppGameStep {
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

export const CPP_GAME_WORLDS = [
  { world: 1, title: 'World 1: OOP Genesis & Classes', unitId: 'cpp-unit-1', color: 'purple', icon: 'Box' },
  { world: 2, title: 'World 2: Constructors & Encapsulation', unitId: 'cpp-unit-2', color: 'blue', icon: 'Shield' },
  { world: 3, title: 'World 3: Inheritance & Polymorphism', unitId: 'cpp-unit-3', color: 'teal', icon: 'GitFork' },
  { world: 4, title: 'World 4: References, Pointers & Memory', unitId: 'cpp-unit-4', color: 'amber', icon: 'Cpu' },
  { world: 5, title: 'World 5: Templates & STL Dominion', unitId: 'cpp-unit-5', color: 'emerald', icon: 'Layers' },
];

export const CPP_GAME_STEPS: CppGameStep[] = [
  // --- WORLD 1: OOP Genesis & Classes (Steps 1 to 5) ---
  {
    id: 1,
    world: 1,
    worldTitle: 'World 1: OOP Genesis & Classes',
    unitId: 'cpp-unit-1',
    topicId: 'cpp-u1-t1',
    title: 'Step 1: The Blueprint Constructor',
    subtitle: 'Classes, Objects & Encapsulation',
    conceptSummary: 'A class is a blueprint (user-defined type), and an object is an instance in memory. By default in C++, class members are private!',
    ruleTip: 'Remember: In C++, class members default to private, whereas struct members default to public!',
    gameType: 'flow-order',
    challenge: {
      question: 'Arrange the C++ code blocks in correct syntactic order to declare a Class and instantiate an object:',
      itemsToOrder: [
        'class Hero {',
        'public:',
        '    int health = 100;',
        '};',
        'Hero player1;'
      ],
      correctOrder: [0, 1, 2, 3, 4],
      hint: 'Declare the class signature first, specify public access, add attributes, close with semicolon, then instantiate.',
      explanation: 'In C++, classes require the class keyword, access specifier (public:), member variables, semicolon after closing brace };, and then object instantiation.'
    },
    xp: 100,
    coins: 25
  },
  {
    id: 2,
    world: 1,
    worldTitle: 'World 1: OOP Genesis & Classes',
    unitId: 'cpp-unit-1',
    topicId: 'cpp-u1-t2',
    title: 'Step 2: Stream Mastery (cin / cout)',
    subtitle: 'Standard I/O & std::endl',
    conceptSummary: 'C++ replaces printf/scanf with type-safe streams: std::cout uses insertion (<<) and std::cin uses extraction (>>).',
    ruleTip: 'Arrows point where data flows: cin >> variable (into var); cout << data (into screen)!',
    gameType: 'spot-bug',
    challenge: {
      question: 'Find the bug in this C++ stream I/O snippet:',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age;\n    cout >> "Enter age: ";\n    cin << age;\n    return 0;\n}',
      options: [
        'Stream operators << and >> are inverted: cout uses << and cin uses >>',
        'using namespace std; is illegal in C++',
        'int main() cannot return 0',
        '#include <iostream> is missing .h extension'
      ],
      correctIndex: 0,
      hint: 'Think of << as sending data to the screen stream cout.',
      explanation: 'std::cout uses << (stream insertion) and std::cin uses >> (stream extraction). Using cout >> or cin << results in compilation errors!'
    },
    xp: 110,
    coins: 30
  },
  {
    id: 3,
    world: 1,
    worldTitle: 'World 1: OOP Genesis & Classes',
    unitId: 'cpp-unit-1',
    topicId: 'cpp-u1-t3',
    title: 'Step 3: Access Specifier Vault',
    subtitle: 'Public, Private & Protected',
    conceptSummary: 'Public members are accessible anywhere. Private members are only accessible inside class methods. Protected members are accessible within derived classes.',
    ruleTip: 'Encapsulation shields raw internal state from external tampering.',
    gameType: 'quick-quiz',
    challenge: {
      question: 'What happens if main() attempts to directly access a private member variable player.score = 50;?',
      options: [
        'Compiler error: member is inaccessible in this context',
        'The variable silently creates a global variable',
        'Warning emitted but compiles anyway',
        'Undefined behavior at runtime'
      ],
      correctIndex: 0,
      hint: 'C++ enforces access specifiers at compile-time.',
      explanation: 'C++ enforces access specifiers strictly at compile time. Accessing a private member outside class member functions triggers a compile-time fatal access error.'
    },
    xp: 120,
    coins: 30
  },
  {
    id: 4,
    world: 1,
    worldTitle: 'World 1: OOP Genesis & Classes',
    unitId: 'cpp-unit-1',
    topicId: 'cpp-u1-t4',
    title: 'Step 4: Scope Resolution Secret',
    subtitle: 'The :: Operator',
    conceptSummary: 'The scope resolution operator (::) defines member functions outside class declarations or resolves global namespace identifiers.',
    ruleTip: 'ClassName::functionName() binds the function body back to its class.',
    gameType: 'predict-output',
    challenge: {
      question: 'What does this C++ scope resolution code print?',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint val = 50;\nint main() {\n    int val = 10;\n    cout << ::val << " and " << val;\n    return 0;\n}',
      options: [
        '50 and 10',
        '10 and 50',
        '10 and 10',
        '50 and 50'
      ],
      correctIndex: 0,
      hint: '::val with no left prefix accesses the global variable val.',
      explanation: 'The unary scope resolution operator (::val) accesses the global namespace variable (50), while val without prefix accesses the local variable (10).'
    },
    xp: 130,
    coins: 35
  },
  {
    id: 5,
    world: 1,
    worldTitle: 'World 1: OOP Genesis & Classes',
    unitId: 'cpp-unit-1',
    topicId: 'cpp-u1-t5',
    title: 'Step 5: Function Overloading Arena',
    subtitle: 'Polymorphic Signatures',
    conceptSummary: 'Function overloading allows multiple functions with the same name as long as their parameter count or parameter types differ!',
    ruleTip: 'Return type alone is NOT sufficient to overload a function!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'Which of the following function pairs is an INVALID overload in C++?',
      options: [
        'int add(int a, int b) and double add(int a, int b)',
        'void print(int x) and void print(double x)',
        'void draw() and void draw(int size)',
        'int compute(int x) and int compute(int x, int y)'
      ],
      correctIndex: 0,
      hint: 'The compiler cannot distinguish overloads based on return type alone.',
      explanation: 'Functions cannot be overloaded based solely on return types. The compiler identifies overloads via the parameter list signature (mangling).'
    },
    xp: 140,
    coins: 35
  },

  // --- WORLD 2: Constructors & Encapsulation (Steps 6 to 10) ---
  {
    id: 6,
    world: 2,
    worldTitle: 'World 2: Constructors & Encapsulation',
    unitId: 'cpp-unit-2',
    topicId: 'cpp-u2-t1',
    title: 'Step 6: The Constructor Spawner',
    subtitle: 'Default & Parameterized Constructors',
    conceptSummary: 'A constructor is a special member function having the same name as the class and NO return type. It executes automatically when an object is created.',
    ruleTip: 'If you define ANY custom constructor, the compiler no longer creates the default no-argument constructor!',
    gameType: 'flow-order',
    challenge: {
      question: 'Arrange the constructor lifecycle sequence during object creation:',
      itemsToOrder: [
        'Memory allocated for object on stack/heap',
        'Member initializer list executed',
        'Constructor body statements run',
        'Object fully ready for method invocations'
      ],
      correctOrder: [0, 1, 2, 3],
      hint: 'Memory allocation precedes member initialization, followed by constructor body.',
      explanation: 'First memory is reserved, then member initializers initialize attributes, then the constructor body executes, leaving the object ready for use.'
    },
    xp: 150,
    coins: 40
  },
  {
    id: 7,
    world: 2,
    worldTitle: 'World 2: Constructors & Encapsulation',
    unitId: 'cpp-unit-2',
    topicId: 'cpp-u2-t2',
    title: 'Step 7: The Destructor Reaper',
    subtitle: 'Tilde (~) & Resource Cleanup (RAII)',
    conceptSummary: 'Destructors (~ClassName) take zero parameters and run automatically when an object goes out of scope, freeing dynamic memory.',
    ruleTip: 'Destructors execute in reverse order of object creation (Last In, First Out)!',
    gameType: 'predict-output',
    challenge: {
      question: 'What is the destruction order when objects A and B are created in sequence inside a function block?',
      codeSnippet: '{\n    Test A;\n    Test B;\n}',
      options: [
        'B destructs first (~B), then A destructs (~A)',
        'A destructs first (~A), then B destructs (~B)',
        'Both destruct simultaneously in undefined order',
        'Destructors only run if manually called'
      ],
      correctIndex: 0,
      hint: 'Stack unwinding follows LIFO (Last-In-First-Out) order.',
      explanation: 'Automatic stack variables destruct in reverse order of construction: B was constructed after A, so B is destroyed first.'
    },
    xp: 160,
    coins: 40
  },
  {
    id: 8,
    world: 2,
    worldTitle: 'World 2: Constructors & Encapsulation',
    unitId: 'cpp-unit-2',
    topicId: 'cpp-u2-t3',
    title: 'Step 8: Deep Copy vs Shallow Copy',
    subtitle: 'Copy Constructors & Pointers',
    conceptSummary: 'Default copy constructor performs shallow copying (copies pointer addresses). If class manages heap memory, you MUST implement deep copying!',
    ruleTip: 'Shallow copy of pointers leads to double-free crashes during destruction!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'What catastrophe occurs if two objects perform a shallow copy of a dynamically allocated int* buffer upon destruction?',
      options: [
        'Double-free runtime crash (both destructors delete the exact same pointer address)',
        'Compilation syntax error',
        'Memory is copied to GPU',
        'The program silently reallocates the pointer'
      ],
      correctIndex: 0,
      hint: 'Both objects try to free the exact same memory address in heap.',
      explanation: 'Shallow copy copies the address. When the first object destructs, it deletes the memory. When the second object destructs, it calls delete on already-freed memory (Double Free crash)!'
    },
    xp: 170,
    coins: 45
  },
  {
    id: 9,
    world: 2,
    worldTitle: 'World 2: Constructors & Encapsulation',
    unitId: 'cpp-unit-2',
    topicId: 'cpp-u2-t4',
    title: 'Step 9: The "this" Pointer Navigator',
    subtitle: 'Disambiguating Members & Cascading',
    conceptSummary: 'In C++, "this" is an implicit pointer to the current invoking object (e.g. this->score). It enables method chaining (return *this;).',
    ruleTip: 'Static member functions do NOT have a "this" pointer!',
    gameType: 'spot-bug',
    challenge: {
      question: 'Find the bug in this setter function:',
      codeSnippet: 'class Box {\n    int width;\npublic:\n    void setWidth(int width) {\n        width = width; // intention: set member variable\n    }\n};',
      options: [
        'width = width assigns the parameter to itself; should be this->width = width;',
        'Box class cannot have private members',
        'setWidth cannot take parameters',
        'void functions must return a pointer'
      ],
      correctIndex: 0,
      hint: 'The parameter name shadows the class member variable.',
      explanation: 'The parameter "width" shadows member "width". Writing width = width assigns the local parameter to itself. It must be this->width = width;'
    },
    xp: 180,
    coins: 45
  },
  {
    id: 10,
    world: 2,
    worldTitle: 'World 2: Constructors & Encapsulation',
    unitId: 'cpp-unit-2',
    topicId: 'cpp-u2-t5',
    title: 'Step 10: Static Class Members',
    subtitle: 'Shared Class-Level State',
    conceptSummary: 'Static members exist independently of any instance. All objects share a single copy of static data in memory.',
    ruleTip: 'Static variables must be explicitly defined outside the class definition!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'How do you access a public static function calculate() of class MathUtils without creating an object?',
      options: [
        'MathUtils::calculate()',
        'MathUtils.calculate()',
        'MathUtils->calculate()',
        'calculate() directly'
      ],
      correctIndex: 0,
      hint: 'Use the class scope resolution operator.',
      explanation: 'Static methods belong to the class type itself, not an individual instance, and are accessed via ClassName::methodName().'
    },
    xp: 190,
    coins: 50
  },

  // --- WORLD 3: Inheritance & Polymorphism (Steps 11 to 15) ---
  {
    id: 11,
    world: 3,
    worldTitle: 'World 3: Inheritance & Polymorphism',
    unitId: 'cpp-unit-3',
    topicId: 'cpp-u3-t1',
    title: 'Step 11: The Inheritance Tree',
    subtitle: 'Base & Derived Classes',
    conceptSummary: 'Inheritance enables code reusability: class Dog : public Animal inherits all public and protected properties of Animal.',
    ruleTip: 'Constructors of base classes run BEFORE derived class constructors!',
    gameType: 'flow-order',
    challenge: {
      question: 'Arrange the constructor/destructor lifecycle during creation and destruction of a Derived object:',
      itemsToOrder: [
        '1. Base Class Constructor executes',
        '2. Derived Class Constructor executes',
        '3. Derived Class Destructor executes',
        '4. Base Class Destructor executes'
      ],
      correctOrder: [0, 1, 2, 3],
      hint: 'Base constructs first; Derived destructs first.',
      explanation: 'Construction builds from base to derived (Base -> Derived). Destruction tears down in reverse order (Derived -> Base).'
    },
    xp: 200,
    coins: 50
  },
  {
    id: 12,
    world: 3,
    worldTitle: 'World 3: Inheritance & Polymorphism',
    unitId: 'cpp-unit-3',
    topicId: 'cpp-u3-t2',
    title: 'Step 12: Virtual Functions & V-Table',
    subtitle: 'Dynamic Dispatch & Runtime Polymorphism',
    conceptSummary: 'Prefixing a member function with "virtual" instructs C++ to use late (dynamic) binding via a Virtual Method Table (vtable).',
    ruleTip: 'Without virtual, C++ binds methods based on pointer type (early binding) rather than object type!',
    gameType: 'predict-output',
    challenge: {
      question: 'What does this polymorphic call output?',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n    virtual void speak() { cout << "Base"; }\n};\nclass Derived : public Base {\npublic:\n    void speak() override { cout << "Derived"; }\n};\n\nint main() {\n    Base* ptr = new Derived();\n    ptr->speak();\n    return 0;\n}',
      options: [
        'Derived',
        'Base',
        'BaseDerived',
        'Compiler error'
      ],
      correctIndex: 0,
      hint: 'Because speak() is marked virtual in Base, dynamic dispatch calls Derived::speak().',
      explanation: 'Since speak() is virtual, the vtable resolves the call at runtime to the actual object type (Derived), printing "Derived".'
    },
    xp: 210,
    coins: 55
  },
  {
    id: 13,
    world: 3,
    worldTitle: 'World 3: Inheritance & Polymorphism',
    unitId: 'cpp-unit-3',
    topicId: 'cpp-u3-t3',
    title: 'Step 13: Pure Virtual & Abstract Classes',
    subtitle: 'The Interface Contract (= 0)',
    conceptSummary: 'A class with at least one pure virtual function (virtual void run() = 0;) is an Abstract Class and CANNOT be instantiated directly.',
    ruleTip: 'Derived classes must override all pure virtual functions to become instantiable concrete classes.',
    gameType: 'quick-quiz',
    challenge: {
      question: 'What error occurs if you try to instantiate an abstract class: Shape s;?',
      options: [
        'Compiler error: cannot allocate an object of abstract type Shape',
        'Runtime crash on startup',
        'Instantiates an empty object with zeroes',
        'Shape transforms into a struct'
      ],
      correctIndex: 0,
      hint: 'Abstract classes are incomplete interfaces and cannot exist as standalone objects.',
      explanation: 'C++ compilers block direct instantiation of abstract classes at compile-time because they contain un-implemented pure virtual functions.'
    },
    xp: 220,
    coins: 55
  },
  {
    id: 14,
    world: 3,
    worldTitle: 'World 3: Inheritance & Polymorphism',
    unitId: 'cpp-unit-3',
    topicId: 'cpp-u3-t4',
    title: 'Step 14: Virtual Destructors Protocol',
    subtitle: 'Preventing Polymorphic Leaks',
    conceptSummary: 'Always declare base class destructors as virtual: virtual ~Base() {}. This ensures deleting a derived object via a base pointer cleans up derived resources.',
    ruleTip: 'Missing virtual destructor = derived destructor NEVER executes when deleting through base pointer!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'Why MUST a polymorphic base class declare a virtual destructor?',
      options: [
        'To ensure the derived class destructor is called when deleting through a base pointer',
        'To prevent memory from being allocated',
        'To speed up CPU clock cycles',
        'Virtual destructors are optional and have no effect'
      ],
      correctIndex: 0,
      hint: 'Without virtual, only the base destructor would be invoked.',
      explanation: 'When deleting through Base* ptr = new Derived();, a non-virtual destructor only calls ~Base(), completely skipping ~Derived() and leaking derived memory!'
    },
    xp: 230,
    coins: 60
  },
  {
    id: 15,
    world: 3,
    worldTitle: 'World 3: Inheritance & Polymorphism',
    unitId: 'cpp-unit-3',
    topicId: 'cpp-u3-t5',
    title: 'Step 15: The Diamond Problem & Virtual Inheritance',
    subtitle: 'Multiple Inheritance Resolution',
    conceptSummary: 'When two derived classes share a common base and are both inherited by a grandchild class, virtual inheritance prevents duplicate base subobjects.',
    ruleTip: 'Use: class B : virtual public A to share a single base instance.',
    gameType: 'quick-quiz',
    challenge: {
      question: 'What resolves ambiguous duplicate base instances in the Diamond problem?',
      options: [
        'Virtual inheritance (class B : virtual public A)',
        'Private inheritance',
        'Friend functions',
        'Templates'
      ],
      correctIndex: 0,
      hint: 'Look for the keyword that shares the base subobject.',
      explanation: 'Virtual inheritance guarantees that only one shared instance of the common base class exists in the most-derived object.'
    },
    xp: 240,
    coins: 60
  },

  // --- WORLD 4: References, Pointers & Memory (Steps 16 to 20) ---
  {
    id: 16,
    world: 4,
    worldTitle: 'World 4: References, Pointers & Memory',
    unitId: 'cpp-unit-4',
    topicId: 'cpp-u4-t1',
    title: 'Step 16: References vs Pointers',
    subtitle: 'Aliases without Nullability',
    conceptSummary: 'A reference (int &ref = x;) is an immutable alias for an existing variable. References cannot be null and cannot be reseated to another variable.',
    ruleTip: 'Pass-by-const-reference (const MyClass& obj) prevents costly object copies!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'Which of the following is TRUE about C++ references?',
      options: [
        'A reference must be initialized when declared and cannot be NULL',
        'A reference can be re-assigned to point to a different variable later',
        'References require the -> arrow operator to access members',
        'References store the hex address and can perform pointer arithmetic'
      ],
      correctIndex: 0,
      hint: 'Unlike pointers, references cannot float uninitialized or point to nothing.',
      explanation: 'In C++, references MUST be initialized at declaration and can never be null or redirected. They act as permanent syntactic aliases.'
    },
    xp: 250,
    coins: 65
  },
  {
    id: 17,
    world: 4,
    worldTitle: 'World 4: References, Pointers & Memory',
    unitId: 'cpp-unit-4',
    topicId: 'cpp-u4-t2',
    title: 'Step 17: Dynamic Memory (new & delete)',
    subtitle: 'Heap Allocation & delete[]',
    conceptSummary: 'C++ uses "new" to allocate heap memory and construct objects, and "delete" to destruct and deallocate. For arrays, always use delete[]!',
    ruleTip: 'Mismatching new[] with single delete results in undefined behavior and memory leaks!',
    gameType: 'spot-bug',
    challenge: {
      question: 'Find the critical memory management bug in this snippet:',
      codeSnippet: 'int* arr = new int[50];\n// ... work with array ...\ndelete arr;',
      options: [
        'Array allocated with new[] must be freed with delete[] arr, not single delete',
        'int* cannot be allocated on heap',
        '50 is too large for heap allocation',
        'delete must take the size: delete(50, arr)'
      ],
      correctIndex: 0,
      hint: 'Brackets on allocation require brackets on deletion.',
      explanation: 'When allocating an array using new T[size], you MUST deallocate using delete[] arr. Single delete only invokes the destructor for the first element!'
    },
    xp: 260,
    coins: 65
  },
  {
    id: 18,
    world: 4,
    worldTitle: 'World 4: References, Pointers & Memory',
    unitId: 'cpp-unit-4',
    topicId: 'cpp-u4-t3',
    title: 'Step 18: Smart Pointers: std::unique_ptr',
    subtitle: 'Exclusive Ownership & Zero Overhead',
    conceptSummary: 'std::unique_ptr provides exclusive ownership of heap memory. It cannot be copied (only moved with std::move) and deletes itself automatically.',
    ruleTip: 'Prefer std::make_unique<T>(args) to avoid raw new allocations.',
    gameType: 'quick-quiz',
    challenge: {
      question: 'What happens when a std::unique_ptr goes out of scope?',
      options: [
        'It automatically calls delete on the managed resource, preventing leaks',
        'It causes a memory leak unless manually freed',
        'It copies itself to the global namespace',
        'It requires a garbage collector to reclaim'
      ],
      correctIndex: 0,
      hint: 'Smart pointers follow RAII (Resource Acquisition Is Initialization).',
      explanation: 'std::unique_ptr destructor automatically frees the heap resource as soon as the pointer variable goes out of scope.'
    },
    xp: 270,
    coins: 70
  },
  {
    id: 19,
    world: 4,
    worldTitle: 'World 4: References, Pointers & Memory',
    unitId: 'cpp-unit-4',
    topicId: 'cpp-u4-t4',
    title: 'Step 19: Smart Pointers: std::shared_ptr',
    subtitle: 'Reference Counting & std::weak_ptr',
    conceptSummary: 'std::shared_ptr shares ownership via reference counting. The resource is destroyed when the last owner releases it. std::weak_ptr breaks circular references.',
    ruleTip: 'Circular shared_ptr references prevent the reference count from ever reaching zero!',
    gameType: 'predict-output',
    challenge: {
      question: 'What is the reference count after ptr2 is assigned: auto ptr1 = make_shared<int>(10); auto ptr2 = ptr1;?',
      options: [
        '2',
        '1',
        '0',
        'Undefined'
      ],
      correctIndex: 0,
      hint: 'Both ptr1 and ptr2 now hold shared ownership of the same integer.',
      explanation: 'Copying a std::shared_ptr increments its internal control block reference counter to 2.'
    },
    xp: 280,
    coins: 70
  },
  {
    id: 20,
    world: 4,
    worldTitle: 'World 4: References, Pointers & Memory',
    unitId: 'cpp-unit-4',
    topicId: 'cpp-u4-t5',
    title: 'Step 20: Operator Overloading Alchemy',
    subtitle: 'Customizing +, -, == & <<',
    conceptSummary: 'Operator overloading lets user-defined types act like primitive types (e.g. Complex c3 = c1 + c2;). Overload << with std::ostream& as a friend function.',
    ruleTip: 'You cannot create new operator symbols, change precedence, or overload ::, ., or sizeof.',
    gameType: 'flow-order',
    challenge: {
      question: 'Arrange the signature components of an overloaded stream insertion operator (operator<<):',
      itemsToOrder: [
        'friend std::ostream&',
        'operator<<(',
        'std::ostream& os,',
        'const MyClass& obj)',
        '{ os << obj.val; return os; }'
      ],
      correctOrder: [0, 1, 2, 3, 4],
      hint: 'Friend declaration -> function name -> left operand (stream) -> right operand (const ref) -> body.',
      explanation: 'Stream operator overloading follows: friend std::ostream& operator<<(std::ostream& os, const MyClass& obj) { return os; }.'
    },
    xp: 290,
    coins: 75
  },

  // --- WORLD 5: Templates & STL Dominion (Steps 21 to 25) ---
  {
    id: 21,
    world: 5,
    worldTitle: 'World 5: Templates & STL Dominion',
    unitId: 'cpp-unit-5',
    topicId: 'cpp-u5-t1',
    title: 'Step 21: Function Templates',
    subtitle: 'Generic Programming with template <typename T>',
    conceptSummary: 'Templates enable writing code that works with any data type. The compiler generates specialized functions at compile-time for each type used.',
    ruleTip: 'Templates have zero runtime overhead because specialization happens during compilation!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'How do you declare a generic function template in C++?',
      options: [
        'template <typename T> T maximum(T a, T b) { return (a > b) ? a : b; }',
        'generic <class T> T maximum(T a, T b);',
        'any <T> maximum(T a, T b);',
        'template: function maximum(T a, T b);'
      ],
      correctIndex: 0,
      hint: 'Look for template <typename T> or template <class T>.',
      explanation: 'In C++, generic programming begins with template <typename T> followed by the function signature using T.'
    },
    xp: 300,
    coins: 75
  },
  {
    id: 22,
    world: 5,
    worldTitle: 'World 5: Templates & STL Dominion',
    unitId: 'cpp-unit-5',
    topicId: 'cpp-u5-t2',
    title: 'Step 22: STL Dynamic Arrays: std::vector',
    subtitle: 'Push_back, Capacity & Size',
    conceptSummary: 'std::vector is a contiguous dynamic array that grows automatically. vec.push_back(val) adds to end, and elements are indexed via [].',
    ruleTip: 'Size is the number of active elements; Capacity is the allocated memory buffer!',
    gameType: 'predict-output',
    challenge: {
      question: 'What is the output after executing this vector code?',
      codeSnippet: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {10, 20};\n    nums.push_back(30);\n    nums.pop_back();\n    cout << nums.size() << " and " << nums.back();\n    return 0;\n}',
      options: [
        '2 and 20',
        '3 and 30',
        '2 and 10',
        '1 and 20'
      ],
      correctIndex: 0,
      hint: 'push_back added 30 (size=3), then pop_back removed 30 (size=2), leaving 20 at the back.',
      explanation: 'Initial {10, 20} -> push_back(30) makes it {10, 20, 30} -> pop_back() removes 30, returning size to 2 and back element to 20.'
    },
    xp: 310,
    coins: 80
  },
  {
    id: 23,
    world: 5,
    worldTitle: 'World 5: Templates & STL Dominion',
    unitId: 'cpp-unit-5',
    topicId: 'cpp-u5-t3',
    title: 'Step 23: Associative Maps: std::map',
    subtitle: 'Key-Value Pairs & Red-Black Trees',
    conceptSummary: 'std::map stores unique key-value pairs sorted automatically by key (O(log N) lookup). std::unordered_map uses hash tables (O(1) average).',
    ruleTip: 'Using map[key] will automatically insert a default value if the key does not exist!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'What data structure underpins std::map to maintain sorted keys and O(log N) operations?',
      options: [
        'Self-balancing Red-Black Binary Search Tree',
        'Linked List',
        'Hash Table with Chaining',
        'Simple Array'
      ],
      correctIndex: 0,
      hint: 'It is a self-balancing binary search tree.',
      explanation: 'std::map is implemented as a Red-Black Tree, guaranteeing logarithmic O(log N) time complexity for search, insertion, and deletion.'
    },
    xp: 320,
    coins: 80
  },
  {
    id: 24,
    world: 5,
    worldTitle: 'World 5: Templates & STL Dominion',
    unitId: 'cpp-unit-5',
    topicId: 'cpp-u5-t4',
    title: 'Step 24: STL Algorithms: std::sort',
    subtitle: 'Iterators & Custom Comparators / Lambdas',
    conceptSummary: 'STL separates algorithms from containers using iterators: std::sort(vec.begin(), vec.end(), [](int a, int b){ return a > b; }); sorts descending.',
    ruleTip: 'std::sort uses Introsort (QuickSort + HeapSort + InsertionSort) with guaranteed O(N log N) performance.',
    gameType: 'flow-order',
    challenge: {
      question: 'Arrange the tokens to sort a vector descending using a lambda expression:',
      itemsToOrder: [
        'std::sort(',
        'vec.begin(), vec.end(),',
        '[](int a, int b) {',
        'return a > b;',
        '});'
      ],
      correctOrder: [0, 1, 2, 3, 4],
      hint: 'std::sort takes start iterator, end iterator, and a comparator lambda.',
      explanation: 'std::sort(vec.begin(), vec.end(), [](int a, int b) { return a > b; }); efficiently sorts the container in descending order.'
    },
    xp: 330,
    coins: 85
  },
  {
    id: 25,
    world: 5,
    worldTitle: 'World 5: Templates & STL Dominion',
    unitId: 'cpp-unit-5',
    topicId: 'cpp-u5-t5',
    title: 'Step 25: Exception Citadel (try / catch / throw)',
    subtitle: 'Robust Error Handling & std::exception',
    conceptSummary: 'C++ exceptions decouple error detection from handling: throw std::runtime_error("msg"); transfer control to the nearest matching catch block.',
    ruleTip: 'Catch by const reference: catch (const std::exception& e) to avoid object slicing!',
    gameType: 'quick-quiz',
    challenge: {
      question: 'Why should you always catch standard exceptions by reference (catch (const std::exception& e))?',
      options: [
        'To prevent object slicing and preserve polymorphic derived exception messages (e.what())',
        'Exceptions cannot be caught by value in C++',
        'To allocate memory on heap',
        'To suppress compiler warnings only'
      ],
      correctIndex: 0,
      hint: 'Catching by value slices away derived class attributes and methods.',
      explanation: 'Catching by const reference prevents object slicing, ensuring polymorphism works properly so e.what() invokes the derived class implementation.'
    },
    xp: 350,
    coins: 100
  }
];
