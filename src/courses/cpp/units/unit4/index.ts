import { Unit, Quiz } from '@/types';

export const cppUnit4: Unit = {
  id: 'cpp-unit-4',
  courseId: 'cpp',
  unitNumber: 4,
  title: 'Inheritance and Polymorphism',
  description: 'Understand single/multiple/hybrid inheritance hierarchies, compile-time vs runtime polymorphism, virtual functions, vtables, and operator overloading.',
  estimatedHours: 6.5,
  quizId: 'quiz-cpp-4',
  published: true,
  topics: [
    {
      id: 'cpp-u4-t1',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 1,
      title: 'Inheritance: Modes and Hierarchy Typologies',
      summary: 'Derive child classes from base classes using public, protected, and private inheritance; single, multiple, and multilevel hierarchies.',
      content: {
        definition: 'Inheritance is a fundamental mechanism of OOP where a derived (child) class inherits properties and behaviors from one or more base (parent) classes. It fosters code reuse and establishes "is-a" relationships.',
        syntax: 'class Derived : public Base {\n    // Inherits public and protected members of Base\n};',
        codeSnippet: `#include <iostream>
#include <string>

// Base Class
class Person {
protected:
    std::string name;
    int age;

public:
    Person(std::string n, int a) : name(n), age(a) {}

    void introduce() const {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
};

// Derived Class (Single Inheritance)
class Student : public Person {
private:
    std::string major;

public:
    // Base constructor initialization
    Student(std::string n, int a, std::string m) 
        : Person(n, a), major(m) {}

    void displayStudent() const {
        introduce(); // Accessing inherited method
        std::cout << "Major: " << major << std::endl;
    }
};

int main() {
    Student s("Devon Hall", 21, "Computer Science");
    s.displayStudent();
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'class Student : public Person', explanation: 'Public inheritance: public members of Person remain public in Student; protected members remain protected.' },
          { line: 'Student(...) : Person(n, a), major(m)', explanation: 'Explicitly invokes the base class constructor before executing the derived constructor body.' }
        ],
        keyConcepts: [
          'Types: Single, Multiple (class C : public A, public B), Multilevel (A -> B -> C), Hierarchical, and Hybrid',
          'protected access: visible to derived classes but hidden from outside users',
          'Diamond problem in multiple inheritance resolved using virtual base classes: class B : virtual public A'
        ],
        commonMistakes: [
          'Forgetting to invoke the parameterized base constructor, causing the compiler to attempt a non-existent default constructor',
          'Private inheritance accidental usage: class B : A defaults to private inheritance in C++'
        ],
        quickRevision: [
          'Derived inherits from Base.',
          'Always initialize base class in the member initializer list.',
          'Use virtual base classes to fix diamond inheritance.'
        ]
      }
    },
    {
      id: 'cpp-u4-t2',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 2,
      title: 'Polymorphism & Virtual Functions (Runtime Dispatch)',
      summary: 'Achieve dynamic runtime dispatch using the virtual keyword, abstract classes, pure virtual functions, and vtables.',
      content: {
        definition: 'Polymorphism ("many forms") enables a base class pointer or reference to invoke overridden derived class methods at runtime. Marking a base method virtual signals the compiler to use dynamic dispatch through a virtual method table (vtable).',
        syntax: 'class Shape {\npublic:\n    virtual void draw() = 0; // Pure virtual function -> Abstract class\n    virtual ~Shape() {}       // Always use virtual destructors in polymorphic bases!\n};',
        codeSnippet: `#include <iostream>
#include <vector>

// Abstract Base Class
class Entity {
public:
    virtual void render() const = 0; // Pure virtual method
    virtual ~Entity() { std::cout << "Entity destroyed.\\n"; } // Virtual destructor
};

class Player : public Entity {
public:
    void render() const override {
        std::cout << ">> Rendering Player Sprite at (10, 20)\\n";
    }
    ~Player() override { std::cout << "Player memory freed.\\n"; }
};

class Enemy : public Entity {
public:
    void render() const override {
        std::cout << ">> Rendering Enemy Boss at (80, 50)\\n";
    }
};

int main() {
    // Polymorphic collection using base pointers
    std::vector<Entity*> entities;
    entities.push_back(new Player());
    entities.push_back(new Enemy());

    std::cout << "Executing polymorphic render loop:\\n";
    for (Entity* e : entities) {
        e->render(); // Dynamically dispatches to Player::render or Enemy::render!
    }

    // Clean up
    for (Entity* e : entities) delete e;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'virtual void render() const = 0;', explanation: 'Pure virtual function: makes Entity an abstract class that cannot be directly instantiated.' },
          { line: 'void render() const override', explanation: 'override keyword instructs the compiler to verify that the method correctly overrides a base virtual function.' },
          { line: 'virtual ~Entity()', explanation: 'Virtual destructor: essential so delete basePtr correctly invokes the derived class destructor first.' }
        ],
        keyConcepts: [
          'Compile-time polymorphism: function overloading and templates',
          'Runtime polymorphism: virtual functions, override keyword, base pointers/references',
          'vtable (Virtual Method Table): lookup table of function pointers created for each polymorphic class',
          'Always declare a virtual destructor in polymorphic base classes'
        ],
        commonMistakes: [
          'Non-virtual destructor in base class causing memory leaks when deleting derived objects via base pointers',
          'Accidental signature mismatch when intending to override (always use the override keyword!)'
        ],
        quickRevision: [
          'virtual keyword enables dynamic dispatch.',
          '= 0 denotes a pure virtual function (abstract class).',
          'Base class destructors MUST be virtual.'
        ]
      }
    },
    {
      id: 'cpp-u4-t3',
      unitId: 'cpp-unit-4',
      courseId: 'cpp',
      order: 3,
      title: 'Operator Overloading: Customizing Operators',
      summary: 'Extend the functionality of built-in operators (+, -, ==, <<) for user-defined classes.',
      content: {
        definition: 'Operator overloading enables custom types (classes) to define how standard C++ operators (+, -, *, ==, <<, etc.) behave when applied to their instances, providing clean, mathematical, and readable syntax.',
        syntax: 'ClassName operator+(const ClassName& rhs) const;\nfriend std::ostream& operator<<(std::ostream& os, const ClassName& obj);',
        codeSnippet: `#include <iostream>

class Complex {
private:
    double real;
    double imag;

public:
    Complex(double r = 0.0, double i = 0.0) : real(r), imag(i) {}

    // Overload binary '+' operator
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }

    // Overload stream insertion '<<' operator as friend
    friend std::ostream& operator<<(std::ostream& out, const Complex& c) {
        out << c.real << " + " << c.imag << "i";
        return out;
    }
};

int main() {
    Complex c1(3.0, 4.5);
    Complex c2(1.5, 2.5);

    Complex sum = c1 + c2; // Clean syntax invoking operator+()

    std::cout << "c1 = " << c1 << std::endl;
    std::cout << "c2 = " << c2 << std::endl;
    std::cout << "c1 + c2 = " << sum << std::endl;
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'Complex operator+(const Complex& other) const', explanation: 'Defines addition for two Complex numbers returning a new Complex instance.' },
          { line: 'friend std::ostream& operator<<(...)', explanation: 'Friend function allows << to access private members real and imag for printing.' }
        ],
        keyConcepts: [
          'Cannot create new operators (e.g. **); can only overload existing C++ operators',
          'Operators that cannot be overloaded: . (dot), :: (scope), ?: (ternary), sizeof, typeid',
          'Precedence and associativity of operators remain unchanged'
        ],
        commonMistakes: [
          'Overloading operators with unintuitive behavior (e.g. using + to perform subtraction)',
          'Attempting to overload the ternary ?:'
        ],
        quickRevision: [
          'returnType operatorSYMBOL(params).',
          'Overload << with friend std::ostream& for natural printing.',
          'Keep operator semantics logical and intuitive.'
        ]
      }
    }
  ]
};

export const cppUnit4Quiz: Quiz = {
  id: 'quiz-cpp-4',
  unitId: 'cpp-unit-4',
  courseId: 'cpp',
  unitTitle: 'Unit 4: Inheritance and Polymorphism',
  title: 'Unit 4 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-cpp4-1',
      question: 'Why must base class destructors be declared virtual in polymorphic class hierarchies?',
      options: [
        'To speed up CPU caching',
        'To ensure that deleting an object via a base pointer correctly calls the derived destructor first, preventing memory leaks',
        'Virtual destructors allow copying private members',
        'The compiler will not compile any class without a virtual destructor'
      ],
      correctIndex: 1,
      explanation: 'Without a virtual destructor, deleting a derived object through a Base* pointer only invokes ~Base(), leaking resources owned by the derived class.'
    },
    {
      id: 'q-cpp4-2',
      question: 'What turns a C++ class into an Abstract Base Class (ABC)?',
      options: [
        'Declaring the class as static',
        'Having at least one pure virtual function (e.g. virtual void func() = 0;)',
        'Inheriting from more than two classes',
        'Placing all members under private'
      ],
      correctIndex: 1,
      explanation: 'A pure virtual function (= 0) makes the class abstract, meaning it cannot be instantiated directly and derived classes must implement the pure virtual methods.'
    },
    {
      id: 'q-cpp4-3',
      question: 'Which of the following operators CANNOT be overloaded in C++?',
      options: ['+ (Addition)', '<< (Stream insertion)', '. (Member access dot operator)', '[] (Subscript)'],
      correctIndex: 2,
      explanation: 'The dot (.) operator, scope resolution (::), ternary (?:), and sizeof cannot be overloaded in C++.'
    },
    {
      id: 'q-cpp4-4',
      question: 'How is the Diamond Problem (duplicate base class subobjects) resolved in multiple inheritance in C++?',
      options: [
        'By using the override keyword',
        'By using virtual inheritance (e.g. class B : virtual public A)',
        'By deleting the destructor',
        'By moving all methods to a namespace'
      ],
      correctIndex: 1,
      explanation: 'Virtual inheritance ensures that only one shared instance of the common ancestor base class is included in the most derived class.'
    },
    {
      id: 'q-cpp4-5',
      question: 'What is the purpose of the override keyword in C++11 and later?',
      options: [
        'It forces a function to run asynchronously',
        'It causes the compiler to check that a method matches a virtual function signature in the base class, catching typos at compile-time',
        'It makes private members accessible to friends',
        'It converts runtime polymorphism into compile-time polymorphism'
      ],
      correctIndex: 1,
      explanation: 'override instructs the compiler to verify that the method actually overrides a virtual base function with identical signature, preventing accidental bugs from mismatched parameters.'
    }
  ]
};
