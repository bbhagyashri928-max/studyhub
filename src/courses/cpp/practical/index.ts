import { PracticalProgram } from '@/types';

export const cppPracticals: PracticalProgram[] = [
  {
    id: 'cpp-pr-1',
    courseId: 'cpp',
    category: 'Basic Programs',
    title: 'Hello World and C++ Stream Output',
    difficulty: 'Beginner',
    problemStatement: 'Write a C++ program using <iostream> and std::cout to print academy welcome messages with std::endl.',
    sourceCode: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "Welcome to CODEVIVA C++ Object-Oriented Academy." << std::endl;
    return 0;
}`,
    explanation: [
      '<iostream> provides standard stream objects.',
      'std::cout represents the standard output stream.',
      '<< insertion operator streams string literals to stdout.',
      'std::endl flushes buffer and creates a line break.',
      'return 0 signals successful termination.'
    ],
    sampleInput: '(None)',
    expectedOutput: `Hello, World!\nWelcome to CODEVIVA C++ Object-Oriented Academy.`,
    keyConcepts: ['<iostream>', 'std::cout stream', '<< insertion operator', 'std::endl'],
    published: true
  },
  {
    id: 'cpp-pr-2',
    courseId: 'cpp',
    category: 'Basic Programs',
    title: 'Interactive Stream Calculator',
    difficulty: 'Beginner',
    problemStatement: 'Implement a basic arithmetic calculator that performs addition, subtraction, multiplication, and floating-point division using cin and cout.',
    sourceCode: `#include <iostream>

int main() {
    double a = 48.0;
    double b = 6.0;

    std::cout << "Operating on operands: " << a << " and " << b << std::endl;
    std::cout << "Addition:       " << (a + b) << std::endl;
    std::cout << "Subtraction:    " << (a - b) << std::endl;
    std::cout << "Multiplication: " << (a * b) << std::endl;
    if (b != 0) {
        std::cout << "Division:       " << (a / b) << std::endl;
    }
    return 0;
}`,
    explanation: [
      'Store numbers in high-precision double variables.',
      'Perform standard binary arithmetic (+, -, *, /).',
      'Validate that divisor b is non-zero before computing division.'
    ],
    sampleInput: '48.0 6.0',
    expectedOutput: `Operating on operands: 48 and 6\nAddition:       54\nSubtraction:    42\nMultiplication: 288\nDivision:       8`,
    keyConcepts: ['Stream output chaining', 'Double precision arithmetic', 'Division-by-zero guard'],
    published: true
  },
  {
    id: 'cpp-pr-3',
    courseId: 'cpp',
    category: 'Operators and Control Statements',
    title: 'Prime and Palindrome Number Verification',
    difficulty: 'Intermediate',
    problemStatement: 'Verify whether a given number is a prime number and check if another integer is a palindrome.',
    sourceCode: `#include <iostream>

bool checkPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

bool checkPalindrome(int n) {
    int original = n, reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + (n % 10);
        n /= 10;
    }
    return original == reversed;
}

int main() {
    int pTest = 37;
    int palTest = 12321;

    std::cout << "Number " << pTest << " is Prime? " 
              << (checkPrime(pTest) ? "YES" : "NO") << std::endl;

    std::cout << "Number " << palTest << " is Palindrome? " 
              << (checkPalindrome(palTest) ? "YES" : "NO") << std::endl;
    return 0;
}`,
    explanation: [
      'Prime check tests factors up to square root of n (i * i <= n).',
      'Palindrome check reconstructs reversed number using modulo and division arithmetic.',
      'Returns native C++ bool (true/false).'
    ],
    sampleInput: '37 12321',
    expectedOutput: `Number 37 is Prime? YES\nNumber 12321 is Palindrome? YES`,
    keyConcepts: ['Native bool type', 'Optimized prime testing O(sqrt(N))', 'Integer reverse algorithm'],
    published: true
  },
  {
    id: 'cpp-pr-4',
    courseId: 'cpp',
    category: 'Patterns',
    title: 'Diamond Number and Star Pattern',
    difficulty: 'Intermediate',
    problemStatement: 'Generate a symmetrical diamond star pattern of height 2N - 1 using nested loops.',
    sourceCode: `#include <iostream>

int main() {
    int n = 4;

    std::cout << "Symmetrical Diamond Pattern (N = 4):\\n";
    // Upper half
    for (int i = 1; i <= n; i++) {
        for (int s = 1; s <= n - i; s++) std::cout << " ";
        for (int j = 1; j <= 2 * i - 1; j++) std::cout << "*";
        std::cout << "\\n";
    }
    // Lower half
    for (int i = n - 1; i >= 1; i--) {
        for (int s = 1; s <= n - i; s++) std::cout << " ";
        for (int j = 1; j <= 2 * i - 1; j++) std::cout << "*";
        std::cout << "\\n";
    }
    return 0;
}`,
    explanation: [
      'First loop controls leading spaces: n - i.',
      'Second loop controls number of asterisks: 2 * i - 1.',
      'Mirrored logic creates the bottom taper.'
    ],
    sampleInput: '4',
    expectedOutput: `Symmetrical Diamond Pattern (N = 4):\n   *\n  ***\n *****\n*******\n *****\n  ***\n   *`,
    keyConcepts: ['Nested loops', 'Space coordinate calculation', 'Pattern symmetry'],
    published: true
  },
  {
    id: 'cpp-pr-5',
    courseId: 'cpp',
    category: 'Arrays and Strings',
    title: 'Modern String Manipulation and Vowel Count',
    difficulty: 'Beginner',
    problemStatement: 'Use std::string methods (length, substr, find) and range-based for loops to count vowels and analyze words.',
    sourceCode: `#include <iostream>
#include <string>
#include <cctype>

int main() {
    std::string text = "CODEVIVA Academy C++ Masterclass";
    int vowels = 0;

    for (char c : text) {
        char lower = std::tolower(c);
        if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u') {
            vowels++;
        }
    }

    std::cout << "Input String: \\"" << text << "\\"" << std::endl;
    std::cout << "Length:       " << text.length() << " characters" << std::endl;
    std::cout << "Total Vowels: " << vowels << std::endl;
    std::cout << "Substring:    " << text.substr(0, 9) << std::endl;
    return 0;
}`,
    explanation: [
      'std::string provides high-level memory managed string operations.',
      'Range-based for loop iterates through each char in the string.',
      'std::tolower() normalizes character casing.',
      'substr() extracts sub-phrases safely.'
    ],
    sampleInput: '"CODEVIVA Academy C++ Masterclass"',
    expectedOutput: `Input String: "CODEVIVA Academy C++ Masterclass"\nLength:       33 characters\nTotal Vowels: 11\nSubstring:    CODEVIVA`,
    keyConcepts: ['std::string class', 'std::tolower()', 'Range-based for loop', 'substr() method'],
    published: true
  },
  {
    id: 'cpp-pr-6',
    courseId: 'cpp',
    category: 'Functions',
    title: 'Function Overloading with Multiple Types',
    difficulty: 'Beginner',
    problemStatement: 'Overload a function area() to compute the area of a circle (single double parameter), rectangle (two doubles), and square (integer).',
    sourceCode: `#include <iostream>

// Overload 1: Circle
double area(double radius) {
    const double PI = 3.14159;
    return PI * radius * radius;
}

// Overload 2: Rectangle
double area(double length, double width) {
    return length * width;
}

// Overload 3: Square
int area(int side) {
    return side * side;
}

int main() {
    std::cout << "Circle (r=4.0):        " << area(4.0) << std::endl;
    std::cout << "Rectangle (l=5.0,w=8.0): " << area(5.0, 8.0) << std::endl;
    std::cout << "Square (side=6):       " << area(6) << std::endl;
    return 0;
}`,
    explanation: [
      'Same function name area() has three distinct signatures.',
      'Circle signature: area(double).',
      'Rectangle signature: area(double, double).',
      'Square signature: area(int).',
      'Resolved by compiler at compile-time.'
    ],
    sampleInput: '(Varying parameter types)',
    expectedOutput: `Circle (r=4.0):        50.2654\nRectangle (l=5.0,w=8.0): 40\nSquare (side=6):       36`,
    keyConcepts: ['Compile-time polymorphism', 'Signature differentiation', 'Function resolution'],
    published: true
  },
  {
    id: 'cpp-pr-7',
    courseId: 'cpp',
    category: 'Classes and Objects',
    title: 'Student Grade Management using Classes',
    difficulty: 'Intermediate',
    problemStatement: 'Create a Student class encapsulating student ID, name, test scores, with member methods to calculate grade and display report card.',
    sourceCode: `#include <iostream>
#include <string>
#include <vector>

class StudentRecord {
private:
    int id;
    std::string name;
    std::vector<int> scores;

public:
    StudentRecord(int id, std::string name, std::vector<int> s) 
        : id(id), name(name), scores(s) {}

    double calculateAverage() const {
        if (scores.empty()) return 0.0;
        double sum = 0;
        for (int s : scores) sum += s;
        return sum / scores.size();
    }

    char getGrade() const {
        double avg = calculateAverage();
        if (avg >= 90) return 'A';
        if (avg >= 80) return 'B';
        if (avg >= 70) return 'C';
        return 'D';
    }

    void displayCard() const {
        std::cout << "ID: " << id << " | Name: " << name 
                  << " | Avg: " << calculateAverage() 
                  << " | Grade: " << getGrade() << std::endl;
    }
};

int main() {
    StudentRecord s1(101, "Victoria Reed", {92, 88, 95});
    StudentRecord s2(102, "Brandon Scott", {78, 82, 75});

    std::cout << "=== STUDENT REPORT CARDS ===\\n";
    s1.displayCard();
    s2.displayCard();
    return 0;
}`,
    explanation: [
      'Encapsulates private state (id, name, scores vector).',
      'Member methods calculateAverage() and getGrade() operate on internal state.',
      'const member methods ensure read-only safety.'
    ],
    sampleInput: '(Pre-configured student objects)',
    expectedOutput: `=== STUDENT REPORT CARDS ===\nID: 101 | Name: Victoria Reed | Avg: 91.6667 | Grade: A\nID: 102 | Name: Brandon Scott | Avg: 78.3333 | Grade: C`,
    keyConcepts: ['Data encapsulation', 'Member functions', 'std::vector member', 'const methods'],
    published: true
  },
  {
    id: 'cpp-pr-8',
    courseId: 'cpp',
    category: 'Constructors and Destructors',
    title: 'Constructor Types and RAII Memory Management',
    difficulty: 'Intermediate',
    problemStatement: 'Demonstrate Default constructor, Parameterized constructor, Copy constructor, and Destructor execution order.',
    sourceCode: `#include <iostream>

class Tracker {
private:
    int id;

public:
    Tracker() : id(0) {
        std::cout << "[Constructor] Default Tracker #0 created\\n";
    }

    Tracker(int id) : id(id) {
        std::cout << "[Constructor] Parameterized Tracker #" << id << " created\\n";
    }

    Tracker(const Tracker& other) : id(other.id + 100) {
        std::cout << "[Constructor] Copy of Tracker #" << other.id << " -> #" << id << "\\n";
    }

    ~Tracker() {
        std::cout << "[Destructor] Tracker #" << id << " destroyed\\n";
    }
};

int main() {
    std::cout << "--- Entering main block ---\\n";
    Tracker t1(1);
    Tracker t2 = t1; // Copy constructor
    {
        Tracker t3(3); // Scoped inside nested block
    } // t3 destroyed here
    std::cout << "--- Exiting main block ---\\n";
    return 0;
}`,
    explanation: [
      'Constructors initialize object state upon instantiation.',
      'Destructors execute automatically in reverse order of creation when objects leave scope.',
      'Nested block demonstrates localized lifetime of t3.'
    ],
    sampleInput: '(Scope lifetime test)',
    expectedOutput: `--- Entering main block ---\n[Constructor] Parameterized Tracker #1 created\n[Constructor] Copy of Tracker #1 -> #101\n[Constructor] Parameterized Tracker #3 created\n[Destructor] Tracker #3 destroyed\n--- Exiting main block ---\n[Destructor] Tracker #101 destroyed\n[Destructor] Tracker #1 destroyed`,
    keyConcepts: ['Constructor overloading', 'Copy constructor semantics', 'Automatic destructor timing'],
    published: true
  },
  {
    id: 'cpp-pr-9',
    courseId: 'cpp',
    category: 'Inheritance',
    title: 'Multilevel and Multiple Inheritance',
    difficulty: 'Intermediate',
    problemStatement: 'Model an academic system where Teacher and Researcher inherit from Person, and Professor inherits from both (Multiple Inheritance).',
    sourceCode: `#include <iostream>
#include <string>

class Academic {
public:
    std::string institution = "CODEVIVA University";
};

class Researcher : virtual public Academic {
public:
    void publishPaper() const {
        std::cout << "Publishing research paper in IEEE journal.\\n";
    }
};

class Teacher : virtual public Academic {
public:
    void conductLecture() const {
        std::cout << "Delivering C++ Advanced Architecture lecture.\\n";
    }
};

// Multiple inheritance with virtual base to avoid diamond duplicates
class Professor : public Researcher, public Teacher {
private:
    std::string name;
public:
    Professor(std::string n) : name(n) {}
    void introduce() const {
        std::cout << "Professor: " << name << " at " << institution << "\\n";
    }
};

int main() {
    Professor prof("Dr. Elena Vance");
    prof.introduce();
    prof.conductLecture();
    prof.publishPaper();
    return 0;
}`,
    explanation: [
      'virtual public Academic solves the diamond problem in multiple inheritance.',
      'Professor gains capabilities of both Researcher and Teacher.',
      'Only one unified copy of institution is present.'
    ],
    sampleInput: '(Professor instance)',
    expectedOutput: `Professor: Dr. Elena Vance at CODEVIVA University\nDelivering C++ Advanced Architecture lecture.\nPublishing research paper in IEEE journal.`,
    keyConcepts: ['Multiple inheritance', 'Diamond problem', 'virtual base class'],
    published: true
  },
  {
    id: 'cpp-pr-10',
    courseId: 'cpp',
    category: 'Polymorphism',
    title: 'Virtual Functions and Dynamic Method Dispatch',
    difficulty: 'Advanced',
    problemStatement: 'Demonstrate runtime polymorphism with an abstract Base GraphicShape class and Circle and Rectangle subclasses.',
    sourceCode: `#include <iostream>
#include <vector>

class Shape {
public:
    virtual double calculateArea() const = 0; // Pure virtual
    virtual void printName() const = 0;
    virtual ~Shape() {} // Essential virtual destructor
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double calculateArea() const override { return 3.14159 * radius * radius; }
    void printName() const override { std::cout << "Circle (r=" << radius << ")"; }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double calculateArea() const override { return w * h; }
    void printName() const override { std::cout << "Rectangle (" << w << "x" << h << ")"; }
};

int main() {
    std::vector<Shape*> shapes;
    shapes.push_back(new Circle(5.0));
    shapes.push_back(new Rectangle(4.0, 6.0));

    for (Shape* s : shapes) {
        s->printName();
        std::cout << " -> Area = " << s->calculateArea() << "\\n";
    }

    for (Shape* s : shapes) delete s;
    return 0;
}`,
    explanation: [
      'Shape is an abstract base class with pure virtual functions (= 0).',
      'override keyword checks signature fidelity.',
      'Base pointers dispatch calls dynamically at runtime using the vtable.'
    ],
    sampleInput: '(Polymorphic shape list)',
    expectedOutput: `Circle (r=5) -> Area = 78.5397\nRectangle (4x6) -> Area = 24`,
    keyConcepts: ['Abstract class', 'Pure virtual function', 'override keyword', 'Virtual destructor'],
    published: true
  },
  {
    id: 'cpp-pr-11',
    courseId: 'cpp',
    category: 'Operator Overloading',
    title: 'Matrix 2D Overloaded Arithmetic Operators',
    difficulty: 'Advanced',
    problemStatement: 'Overload the + operator and stream insertion operator << for a 2D Vector class to allow mathematical vector addition.',
    sourceCode: `#include <iostream>

class Vector2 {
public:
    double x, y;
    Vector2(double x = 0, double y = 0) : x(x), y(y) {}

    Vector2 operator+(const Vector2& rhs) const {
        return Vector2(x + rhs.x, y + rhs.y);
    }

    bool operator==(const Vector2& rhs) const {
        return x == rhs.x && y == rhs.y;
    }

    friend std::ostream& operator<<(std::ostream& os, const Vector2& v) {
        os << "(" << v.x << ", " << v.y << ")";
        return os;
    }
};

int main() {
    Vector2 a(2.5, 4.0);
    Vector2 b(1.5, 3.5);
    Vector2 c = a + b;

    std::cout << "a = " << a << "\\n";
    std::cout << "b = " << b << "\\n";
    std::cout << "a + b = " << c << "\\n";
    std::cout << "Are a and b equal? " << ((a == b) ? "YES" : "NO") << "\\n";
    return 0;
}`,
    explanation: [
      'operator+ performs member-wise addition returning a new Vector2.',
      'operator== compares equality.',
      'friend operator<< formats vector stream output naturally.'
    ],
    sampleInput: '(2D vectors)',
    expectedOutput: `a = (2.5, 4)\nb = (1.5, 3.5)\na + b = (4, 7.5)\nAre a and b equal? NO`,
    keyConcepts: ['operator+ overloading', 'friend std::ostream& <<', 'operator== comparison'],
    published: true
  },
  {
    id: 'cpp-pr-12',
    courseId: 'cpp',
    category: 'Templates',
    title: 'Generic Stack Template Implementation',
    difficulty: 'Intermediate',
    problemStatement: 'Create a generic class template CustomStack<T> that supports push(), pop(), and top() for any data type.',
    sourceCode: `#include <iostream>
#include <vector>
#include <string>

template <typename T>
class CustomStack {
private:
    std::vector<T> elements;

public:
    void push(const T& item) {
        elements.push_back(item);
    }

    T pop() {
        if (elements.empty()) throw std::out_of_range("Stack is empty");
        T val = elements.back();
        elements.pop_back();
        return val;
    }

    T top() const {
        if (elements.empty()) throw std::out_of_range("Stack is empty");
        return elements.back();
    }

    bool isEmpty() const { return elements.empty(); }
};

int main() {
    // Integer Stack
    CustomStack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    std::cout << "Popped from intStack: " << intStack.pop() << "\\n";

    // String Stack
    CustomStack<std::string> strStack;
    strStack.push("CODEVIVA");
    strStack.push("Academy");
    std::cout << "Top of strStack: " << strStack.top() << "\\n";
    return 0;
}`,
    explanation: [
      'template <typename T> makes the class container type-agnostic.',
      'Works identically for primitive types (int) and complex objects (std::string).',
      'Compiler generates specialized classes during template compilation.'
    ],
    sampleInput: '(Generic stack test)',
    expectedOutput: `Popped from intStack: 20\nTop of strStack: Academy`,
    keyConcepts: ['Class template syntax', 'Type parameter T', 'Generic data structures'],
    published: true
  },
  {
    id: 'cpp-pr-13',
    courseId: 'cpp',
    category: 'Exception Handling',
    title: 'Custom Exception Class and Stack Unwinding',
    difficulty: 'Intermediate',
    problemStatement: 'Define a custom exception class inheriting from std::exception and demonstrate try, throw, and catch with resource cleanup.',
    sourceCode: `#include <iostream>
#include <exception>
#include <string>

class InsufficientFundsException : public std::exception {
private:
    std::string msg;
public:
    InsufficientFundsException(double deficit) {
        msg = "Error: Insufficient balance. Short by $" + std::to_string(deficit);
    }
    const char* what() const noexcept override {
        return msg.c_str();
    }
};

void withdraw(double balance, double amount) {
    if (amount > balance) {
        throw InsufficientFundsException(amount - balance);
    }
    std::cout << "Withdrew $" << amount << ". Remaining: $" << (balance - amount) << "\\n";
}

int main() {
    try {
        withdraw(100.0, 50.0);
        withdraw(100.0, 250.0); // Will throw
    }
    catch (const InsufficientFundsException& e) {
        std::cerr << "Caught Custom Exception: " << e.what() << "\\n";
    }
    return 0;
}`,
    explanation: [
      'Inherit from std::exception and override what() noexcept method.',
      'Throw custom exception when business constraints are violated.',
      'Catch by const reference to preserve polymorphic exception details.'
    ],
    sampleInput: 'withdraw(100.0, 250.0)',
    expectedOutput: `Withdrew $50. Remaining: $50\nCaught Custom Exception: Error: Insufficient balance. Short by $150.000000`,
    keyConcepts: ['std::exception subclassing', 'noexcept what() override', 'Clean error recovery'],
    published: true
  },
  {
    id: 'cpp-pr-14',
    courseId: 'cpp',
    category: 'STL Programs',
    title: 'STL Vector Sorting, Maps, and Lambda Expressions',
    difficulty: 'Intermediate',
    problemStatement: 'Use std::vector, std::map, and std::sort with modern C++ lambda predicates to rank and filter student test scores.',
    sourceCode: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
#include <string>

struct StudentRecord {
    std::string name;
    int score;
};

int main() {
    std::vector<StudentRecord> roster = {
        {"Alice", 85}, {"Bob", 92}, {"Charlie", 78}, {"Diana", 95}
    };

    // Sort descending using lambda predicate
    std::sort(roster.begin(), roster.end(), [](const StudentRecord& a, const StudentRecord& b) {
        return a.score > b.score;
    });

    std::cout << "=== RANKED LEADERBOARD ===\\n";
    for (size_t i = 0; i < roster.size(); i++) {
        std::cout << "#" << (i + 1) << " " << roster[i].name << " (" << roster[i].score << ")\\n";
    }

    // Associative Frequency Map
    std::map<char, int> gradeDistribution;
    for (const auto& s : roster) {
        char g = (s.score >= 90) ? 'A' : (s.score >= 80 ? 'B' : 'C');
        gradeDistribution[g]++;
    }

    std::cout << "\\nGrade Distribution:\\n";
    for (const auto& [grade, count] : gradeDistribution) {
        std::cout << "Grade " << grade << ": " << count << " student(s)\\n";
    }
    return 0;
}`,
    explanation: [
      'std::sort accepts a lambda comparator [](const auto& a, const auto& b) { ... }.',
      'Sorts in O(N log N) using introsort.',
      'std::map aggregates frequency distribution cleanly.'
    ],
    sampleInput: '(Student score roster)',
    expectedOutput: `=== RANKED LEADERBOARD ===\n#1 Diana (95)\n#2 Bob (92)\n#3 Alice (85)\n#4 Charlie (78)\n\nGrade Distribution:\nGrade A: 2 student(s)\nGrade B: 1 student(s)\nGrade C: 1 student(s)`,
    keyConcepts: ['std::sort with lambda predicate', 'std::map frequency counting', 'C++17 structured bindings'],
    published: true
  }
];
